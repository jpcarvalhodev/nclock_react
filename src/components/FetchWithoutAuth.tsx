import { toast } from "react-toastify";

const BASE_URL = 'https://localhost:7129/api/';

interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

export const fetchWithoutAuth = async (endpoint: string, options: FetchOptions = {}): Promise<Response> => {
    const url = `${BASE_URL}${endpoint}`;

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
    switch (response.status) {
        case 401:
            window.location.href = '/unauthorized';
            toast.error('Você não tem permissão para acessar esta página');
            break;
        case 404:
            window.location.href = '/notfound';
            toast.error('Página não encontrada');
            break;
        case 502:
        case 503:
        case 504:
            window.location.href = '/notfound';
            toast.error('Página não encontrada');
            break;
        default:
            toast.error(`Erro ao tentar executar a operação. Código de erro: ${response.status}`);
            break;
    }
};