export interface Source {
    id: string | null;
    name: string;
}

export interface Article {
    source: Source;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: ReadonlyArray<Article>;
}

export enum Category {
    BUSINESS = 'business',
    ENTERTAINMENT = 'entertainment',
    GENERAL = 'general',
    HEALTH = 'health',
    SCIENCE = 'science',
    SPORTS = 'sports',
    TECHNOLOGY = 'technology',
}

export type SortBy = 'relevancy' | 'popularity' | 'publishedAt';

export type ArticlePreview = Pick<Article, 'title' | 'url' | 'publishedAt'>
export type UpdateCriteria = Partial<Article>;