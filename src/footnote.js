function cleanChars(chars, regex) {
    return chars.match(regex).join('')
}

function getRandomID(n) {
    function getSomeChars() {
        const min = 1000 * 1000 * 1000
        const max = 10 * min - 1
        return (Math.random() * (max - min) + min).toString(36)
    }

    let ret = ''
    while (ret.length < n) {
        ret = ret.concat(cleanChars(getSomeChars().toLowerCase(), /[a-z0-9]/g))
    }

    return '#fn-' + ret.slice(0, n)
}

class FootnoteTool {

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


class FootnoteBlock {
    static get toolbox() {
        return {
            title: 'Image',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
    }

    constructor({ api, config, data }) {
        this.api = api;
        this.config = config;
        this.data = data;
    }

    render() {
        const template = '<div>{{noteId}}</div><div class="fnb-content">Hello There</div>';
        const container = document.createElement('div');
        container.innerHTML = Mustache.render(template, {noteId:'#12345'});
        let elms = container.querySelectorAll('.fnb-content');
        [].forEach.call(elms, (e) => {
            e.contentEditable = true;
        });

        return container;
    }

    save(elm) {
        return {
            ref: 'test'
        }
    }
}

class FootnoteManager {

    constructor() {
        this.editor;
        this.keys = {};
    }

    registerEditor(editor) {
        this.editor = editor;
    }

    editorChange() {
        const b = this.editor.blocks;
        const n = b.getBlocksCount();
        for (let i = 0; i < n; i++) {
            let block = b.getBlockByIndex(i);
            let elms = block.holder.querySelectorAll('.'+FootnoteTool.CSS);

            [].forEach.call(elms, (e) => {
                let id = e.innerText;
                if (!this.keys[id]) {
                    this.keys[id] = (new Date).getTime();
                }
            });
        }
    }

    focusOnBlock(id) {
        this.noteEditor.blocks.insert(
            'paragraph',
            {text: "Hello World: " + id},
            undefined,
            undefined,
            undefined,
            true
        );
    }
}

