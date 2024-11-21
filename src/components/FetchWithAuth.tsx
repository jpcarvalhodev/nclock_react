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
            toast.error('Dados inválidos. Por favor, verifique os dados inseridos e tente novamente.');
            console.error('Erro 400: Requisição inválida');
            break;
        case 401:
            console.error('Erro 401: Você não tem permissão para acessar esta página');
            window.location.href = '/';
            break;
        case 403:
            console.error('Erro 403: Você não tem licenciamento para acessar esta página');
            break;
        case 404:
            toast.error('Página não encontrada. Por favor, verifique a URL e tente novamente.');
            console.error('Erro 404: Página não encontrada');
            window.location.href = '/errors/notfound';
            break;
        case 405:
            console.error('Erro 405: Método não permitido');
            break;
        case 408:
            console.error('Erro 408: Tempo de requisição esgotado');
            break;
        case 415:
            console.error('Erro 415: Tipo de mídia não suportado');
            break;
        case 422:
            console.error('Erro 422: Erro de validação, entidade não processável');
            break;
        case 429:
            console.error('Erro 429: Muitas requisições. Tente novamente mais tarde.');
            break;
        case 500:
            console.error('Erro 500: Serviço indisponível. Tente novamente mais tarde.');
            break;
        case 501:
            console.error('Erro 501: Não implementado, serviço indisponível');
            break;
        case 502:
            console.error('Erro 502: Problema de Gateway, serviço indisponível');
            break;
        case 503:
            console.error('Erro 503: Serviço indisponível');
            break;
        case 504:
            console.error('Erro 504: Tempo de Gateway esgotado, serviço indisponível');
            break
        case 505:
            console.error('Erro 505: Versão HTTP não suportada, serviço indisponível');
            break;
        default:
            console.error('Erro desconhecido');
            break;
    }
};