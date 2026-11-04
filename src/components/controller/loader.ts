import { RequestOptions } from '../../types';

export interface LoaderOptions {
    apiKey: string;
    [key: string]: string | number;
}

export interface RequestConfig {
    endpoint: string;
    options?: RequestOptions;
}

class Loader {
    private readonly baseLink: string;
    private readonly options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: RequestConfig,
        callback: (data: T) => void
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw new Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions: Record<string, string | number | undefined> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            const value = urlOptions[key];
            if (value !== undefined) {
                url += `${key}=${value}&`;
            }
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, endpoint: string, callback: (data: T) => void, options: RequestOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json() as Promise <T>)
            .then((data: T) => callback(data))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.error('Произошла неизвестная ошибка')
                }
            });
    }
}

export default Loader;
