import { toast } from "react-toastify";

interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

export const fetchWithAuth = async (url: string, options: FetchOptions = {}): Promise<Response> => {
    const token = localStorage.getItem('token');

    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        };
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            handleHTTPError(response);
            return response;
        }

        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Erro de rede. Por favor, verifique sua conexão ou tente novamente mais tarde.');
        throw error;
    }
};

const handleHTTPError = async (response: Response) => {
    const responseBody = await response.text();

    switch (response.status) {
        case 401:
            window.location.href = '/unauthorized';
            toast.error('Você não tem permissão para acessar esta página');
            break;
        case 404:
            window.location.href = '/notfound';
            toast.error('Página não encontrada');
            break;
        default:
            toast.error(`Erro ${response.status}: ${responseBody}`);
            break;
    }
};