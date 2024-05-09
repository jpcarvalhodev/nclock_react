import { toast } from "react-toastify";

const BASE_URL = 'https://localhost:7129/api/';
const REDIRECT_DELAY = 3000;

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
            toast.error('Você não tem permissão para acessar esta página');
            setTimeout(() => {
                window.location.href = '/unauthorized';
            }, REDIRECT_DELAY);
            break;
        case 404:
            toast.error('Página não encontrada');
            setTimeout(() => {
                window.location.href = '/notfound';
            }, REDIRECT_DELAY);
            break;
        case 502:
        case 503:
        case 504:
            toast.error('Página não encontrada');
            setTimeout(() => {
                window.location.href = '/notfound';
            }, REDIRECT_DELAY);
            break;
        default:
            toast.error(`Erro ao tentar executar a operação. Código de erro: ${response.status}`);
            break;
    }
};