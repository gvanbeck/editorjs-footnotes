
export class FootnoteBlockTune {
    constructor({ api, data, config, block }) {
        this.api = api;
        this.data = data;
        this.config = config;
        this.block = block;
    }

    static get isTune() {
        return true;
    }

    render() {
        const button = document.createElement('button');

        button.classList.add(this.api.styles.button);
        button.textContent = 'H';

        return button; 
    }
}
