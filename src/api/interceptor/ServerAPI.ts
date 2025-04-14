import { cookies, headers } from 'next/headers';

interface FetchOptions extends RequestInit {
    revalidate?: number | false;
    tags?: string[];
}

class ServerAPI {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async fetchWithInterceptor(endpoint: string, options: FetchOptions = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const cookieStore = cookies();
        const refreshToken = cookieStore.get('refreshToken')?.value;

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`,
                    ...options.headers,
                },
                // 캐시 설정
                cache: options.revalidate === false ? 'no-store' : 'force-cache',
                next: options.revalidate ? {
                    revalidate: options.revalidate,
                    tags: options.tags
                } : undefined
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Server API Error:', error);
            throw error;
        }
    }

    async get(endpoint: string, options: FetchOptions = {}) {
        return this.fetchWithInterceptor(endpoint, {
            ...options,
            method: 'GET'
        });
    }

    async post(endpoint: string, data: any, options: FetchOptions = {}) {
        return this.fetchWithInterceptor(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // 다른 메서드들도 필요에 따라 추가
}

// 인스턴스 생성
export const API = new ServerAPI('http://localhost:8080');