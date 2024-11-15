import { toast } from "react-toastify";
import * as apiService from "../helpers/apiService";

// Define as opções de requisição
interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

// Função para fazer requisições à API com autenticação
export const fetchWithAuth = async (endpoint: string, options: FetchOptions = {}): Promise<Response> => {
    const url = `${apiService.BASE_URL}${endpoint}`;
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
        throw error;
    }
};

// Função para lidar com erros HTTP
const handleHTTPError = async (response: Response) => {

    switch (response.status) {
        case 400:
            const badRequest = await response.json();
            toast.error(badRequest.message || 'Erro 400: Requisição inválida');
            break;
        case 401:
            const unauthorized = await response.json();
            toast.error(unauthorized.message || 'Erro 401: Você não tem permissão para acessar esta página');
            window.location.href = '/';
            break;
        case 403:
            const forbidden = await response.json();
            toast.error(forbidden.message || 'Erro 403: Você não tem licenciamento para acessar esta página');
            break;
        case 404:
            const notFound = await response.json();
            toast.error(notFound.message || 'Erro 404: Página não encontrada');
            window.location.href = '/errors/notfound';
            break;
        case 405:
            const methodNotAllowed = await response.json();
            toast.error(methodNotAllowed.message || 'Erro 405: Método não permitido');
            break;
        case 408:
            const requestTimeout = await response.json();
            toast.error(requestTimeout.message || 'Erro 408: Tempo de requisição esgotado');
            break;
        case 415:
            const unsupportedMediaType = await response.json();
            toast.error(unsupportedMediaType.message || 'Erro 415: Tipo de mídia não suportado');
            break;
        case 422:
            const unprocessableEntity = await response.json();
            toast.error(unprocessableEntity.message || 'Erro 422: Erro de validação, entidade não processável');
            break;
        case 429:
            const tooManyRequests = await response.json();
            toast.error(tooManyRequests.message || 'Erro 429: Muitas requisições. Tente novamente mais tarde.');
            break;
        case 500:
            const serverError = await response.json();
            toast.error(serverError.message || 'Erro 500: Serviço indisponível. Tente novamente mais tarde.');
            break;
        case 501:
            const notImplemented = await response.json();
            toast.error(notImplemented.message || 'Erro 501: Não implementado, serviço indisponível');
            break;
        case 502:
            const badGateway = await response.json();
            toast.error(badGateway.message || 'Erro 502: Problema de Gateway, serviço indisponível');
            break;
        case 503:
            const serviceUnavailable = await response.json();
            toast.error(serviceUnavailable.message || 'Erro 503: Serviço indisponível');
            break;
        case 504:
            const gatewayTimeout = await response.json();
            toast.error(gatewayTimeout.message || 'Erro 504: Tempo de Gateway esgotado, serviço indisponível');
            break
        case 505:
            const httpVersionNotSupported = await response.json();
            toast.error(httpVersionNotSupported.message || 'Erro 505: Versão HTTP não suportada, serviço indisponível');
            break;
        default:
            const responseError = await response.json();
            toast.error(responseError.message || 'Erro desconhecido');
            break;
    }
};