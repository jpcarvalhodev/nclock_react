import { toast } from "react-toastify";
import * as apiService from "../helpers/apiService";

// Define as opções de requisição
interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

// Função para fazer requisições à API sem autenticação
export const fetchWithoutAuth = async (endpoint: string, options: FetchOptions = {}): Promise<Response> => {
    const url = `${apiService.BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            handleHTTPError(response);
            return response;
        }

        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

// Função para lidar com erros HTTP
const handleHTTPError = async (response: Response) => {

    switch (response.status) {
        case 404:
            toast.error('Página não encontrada');
            window.location.href = '/errors/notfound';
            break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
            const serverError = await response.json();
            toast.error(serverError.message || 'Serviço indisponível. Tente novamente mais tarde.');
            break;
        default:
            const responseError = await response.json();
            toast.error(responseError.message || 'Erro desconhecido');
            break;
    }
};