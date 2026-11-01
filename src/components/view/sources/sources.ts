import './sources.css';
import { Source } from '../../../types';

class Sources {
    public draw(data: ReadonlyArray<Source>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        if (!sourceItemTemp) {
            console.error('Template #sourceItemTemp if not found');
            return;
        }

        data.forEach((item: Source) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const itemName = sourceClone.querySelector('.source__item-name') as HTMLElement;
            if (itemName) {
                itemName.textContent = item.name;
            }
            const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement;
            if (sourceItem && item.id) {
                sourceItem.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources')
        
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
