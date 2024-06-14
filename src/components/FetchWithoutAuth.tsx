import { toast } from "react-toastify";

// Define a URL base da API
const BASE_URL = 'https://localhost:9090/api/';

// Define as opções de requisição
interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

// Função para fazer requisições à API sem autenticação
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

// Função para lidar com erros HTTP
const handleHTTPError = async (response: Response) => {
    switch (response.status) {
        case 401:
            toast.error('Você não tem permissão para acessar esta página');
            window.location.href = '/unauthorized';
            break;
        case 404:
            toast.error('Página não encontrada');
            window.location.href = '/notfound';
            break;
        case 502:
        case 503:
        case 504:
            toast.error('Serviço indisponível. Tente novamente mais tarde.');
            window.location.href = '/notfound';
            break;
        default:
            const responseError = await response.json();
            const error = responseError.errors.Name ? responseError.errors.Name[0] : "Erro desconhecido";
            toast.error(error);
            break;
    }
};