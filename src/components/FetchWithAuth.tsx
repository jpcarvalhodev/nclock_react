interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

export const fetchWithAuth = async (url: string, options: FetchOptions = {}) => {
    const token = localStorage.getItem('token');

    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        };
    }

    try {
        const response = await fetch(url, options);

        if (response.status === 401) {
            window.location.href = '/unauthorized';
            throw new Error('Redirection due to unauthorized');
        }

        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
