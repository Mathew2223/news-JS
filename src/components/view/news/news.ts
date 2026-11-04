import './news.css';
import { Article } from '../../../types';

class News {
    public draw(data: ReadonlyArray<Article>): void {
        const news = data.length >= 10 ? data.filter((_item: Article, idx: number) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: Article, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) {
                const newsItem = newsItemTemp.querySelector('.news__item') as HTMLElement;
                if (newsItem) {
                    newsItem.classList.add('alt');
                }
            }

            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const metaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }

            const metaDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
            if (metaDate) {
                metaDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }

            const descriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
            if (descriptionTitle) {
                descriptionTitle.textContent = item.title;
            }

            const descriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement;
            if (descriptionSource) {
                descriptionSource.textContent = item.source.name;
            }

            const descriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement;
            if (descriptionContent) {
                descriptionContent.textContent = item.description || '';
            }

            const readMoreLink = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
            if (readMoreLink) {
                readMoreLink.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
