import { FootnoteTool } from './FootnoteTool.js';

export class FootnoteManager {

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
            {text: "HelloWorld: " + id},
            undefined,
            undefined,
            undefined,
            true
        );
    }

    getKeys() {
        return this.keys;
    }
}
