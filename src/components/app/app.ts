import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsResponse } from '../../types';


interface IAppView {
    drawNews: (data: NewsResponse) => void;
    drawSources: (data: NewsResponse) => void;
}

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView() as AppView;
    }

    public start(): void {
        const sourcesElement = document
            .querySelector('.sources') as HTMLElement;
        
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: MouseEvent) => {
                this.controller.getNews(e, (data: NewsResponse) => this.view.drawNews(data))
            });
        }
        this.controller.getSources((data: NewsResponse) => this.view.drawSources(data));
    }
}

export default App;
