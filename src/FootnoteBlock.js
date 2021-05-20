import icon from './assets/sticky-notes.svg';
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

    render() {
        const container = document.createElement('div');
        container.classList.add('cdx-footnote-block');
        container.innerHTML = template({noteId:'#12345'});
        let elms = container.querySelectorAll('.fnb-content');
        [].forEach.call(elms, (e) => {
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

