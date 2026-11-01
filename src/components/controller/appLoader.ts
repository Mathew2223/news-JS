import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = (process.env.API_URL as string) || 'https://rss-news-api.onrender.com/v2/';
        const apiKey = (process.env.API_KEY as string) || 'demo';

        super(apiUrl, {
            apiKey: apiKey,
        })
    }
}

export default AppLoader;
