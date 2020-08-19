 class Notification {
    constructor(opts) {
        this.options = Object.assign({},{
            time : 1000, // ms
            text : 'is notification'
        }, opts);

        this.createNode();
        return this;
    }

    createNode() {
        const wrapStr = `<div class="app__notification">
            <div class="inner">${ this.options.text }</div>
        </div>`;

        const dom = new DOMParser().parseFromString(wrapStr, "text/html");
        this._node = dom.body.firstChild;
    }

    set text(text){
        const innerNode = this._node.firstElementChild;
        innerNode.innerText = text;
    }

    get element(){
        return this._node;
    }

    open(){
        setTimeout(() => this.close(), this.options.time);
        this._node.classList.add('on');
    }

    close(){
        this._node.classList.remove('on');
    }
};

export default Notification;