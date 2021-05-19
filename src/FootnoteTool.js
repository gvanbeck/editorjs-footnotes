import { getRandomID } from './Utilities.js';

export class FootnoteTool {

    static get isInline() {
        return true;
    }

    static get CSS() {
        return 'cdx-footnote';
    }

    static get sanitize() {
        return {
            span: {
                class: FootnoteTool.CSS
            }
        }
    }


    constructor({ api, config }) {
        this.api = api;
        this.config = config;
        this.button = null;
        this.state = false;
        this.tag = 'span';
        this.iconClasses = {
            base: this.api.styles.inlineToolButton,
            active: this.api.styles.inlineToolButtonActive
        };
        this.notePicker = null;
    }

    render() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.classList.add(this.iconClasses.base);
        this.button.textContent = 'F';

        return this.button;
    }


    surround(range) {

        if (this.state) {
            //if this is a footnote reference do nothing
            return;
        }

        this.addToRange(range);
    }

    renderActions() {
        this.notePicker = document.createElement('input');
        this.notePicker.type = 'text';
        this.notePicker.hidden = true;

        return this.notePicker;
    }

    showActions(tag) {
        // this.notePicker.value = tag.innerHTML;
        // this.notePicker.onchange = () => {
        //     tag.innerHTML = this.notePicker.value;
        // }
        this.notePicker.hidden = false;
    }

    hideActions() {
        this.notePicker.onchange = null;
        this.notePicker.hidden = true;
    }

    addToRange(range) {
        const id = getRandomID(10);
        const selectedText = range.extractContents();
        const fragment = new DocumentFragment();
        const noteElement = document.createElement('span');
        noteElement.contentEditable = false;
        noteElement.classList.add(FootnoteTool.CSS);
        noteElement.innerText = id;
        fragment.appendChild(selectedText);
        fragment.appendChild(noteElement);
        range.insertNode(fragment);
    }

    checkState(selection) {
        const text = selection.anchorNode;

        if (!text){
            return;
        }

        const anchorElement = text instanceof Element ? text : text.parentElement;
        const tag = anchorElement.closest(this.tag);
        this.state = !!tag;

        if (this.state) {
            // console.log('IN');
            this.showActions(tag);
        } else {
            // console.log('out');
            this.hideActions();
        }
    }
}
