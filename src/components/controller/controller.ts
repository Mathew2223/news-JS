import { NewsResponse } from '../../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: (data: NewsResponse) => void): void {
        super.getResp<NewsResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: (data: NewsResponse) => void): void {
        let target = e.target;
        if (!(target instanceof HTMLElement)) return;

        const newsContainer = e.currentTarget;
        if (!(newsContainer instanceof HTMLElement)) return;

        let currentNode: HTMLElement | null = target;

        while (currentNode !== newsContainer && currentNode !== null) {
            if (currentNode.classList.contains('source__item')) {
                const sourceId = currentNode.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            currentNode = currentNode.parentElement;
        }
    }
}

export default AppController;
