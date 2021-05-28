import icon from './assets/sticky-notes.svg';
import selectIcon from './assets/touchscreen.svg';
import toggleSizeIcon from './assets/minimize.svg';
import template from './templates/footnote-block.mustache';
import jsu from 'handle-events';
import { FootnoteTool } from './FootnoteTool.js';
import { forEach } from 'lodash';

export class FootnoteBlock {
    static get toolbox() {
        return {
            title: 'Footnote',
            icon: icon
        };
    }

    constructor({ api, config, data }) {
        this.api = api;
        this.config = config;
        this.data = data;
    }

    renderSettings(){
        const settings = [
            {
                name: 'select',
                icon: selectIcon
            },
            {
                name: 'open/close',
                icon: toggleSizeIcon
            },
        ];
        const wrapper = document.createElement('div');

        settings.forEach( tune => {
            let button = document.createElement('div');

            button.classList.add('cdx-settings-button');
            button.innerHTML = tune.icon;
            wrapper.appendChild(button);
            jsu.addEventListener(button, 'click', () => {
                this._toggleTune(tune.name);
                button.classList.add('cdx-footnote-icon');
                button.classList.toggle('cdx-settings-button--active');
            });
        });

        return wrapper;
    }

    _toggleTune(tune) {
        console.log('Image tune clicked', tune);
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('cdx-footnote-block');
        container.innerHTML = template({noteId:'#12345'});
        let elms = container.querySelectorAll('.fnb-content');
        forEach(elms, (e) => {
            e.contentEditable = true;
        });

        jsu.addEventListener(container, 'click.footnote', (e) => {
            const b = this.api.blocks;
            const n = b.getBlocksCount();

            for (let i = 0; i < n; i++) {
                let block = b.getBlockByIndex(i);
                let elms = block.holder.querySelectorAll('.'+FootnoteTool.CSS);

                forEach(elms, (e) => {
                    let id = e.innerText;
                    console.log(id);
                });
            }
        }, true);

        return container;
    }

    save(elm) {
        return {
            ref: 'test'
        }
    }
}

