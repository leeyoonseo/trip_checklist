class Notification {
    constructor(opts) {
        this.options = Object.assign({},{
            time : 1000, // ms
            text : 'is notification'
        }, opts);

        this.el;
        this.messageEl;

        this.message = this.options.text;

        this.createNode();
        return this;
    }

    set text(msg){
        this.message = msg;
    }

    get element(){
        return this.el;
    }

    createNode() {
        const el = document.createElement('div');
        const messageEl = document.createElement('div');

        el.classList.add('app__notification');
        messageEl.classList.add('inner');

        el.append(messageEl);

        this.el = el;
        this.messageEl = messageEl;
    }

    open(){
        this.messageEl.innerText = this.message;

        setTimeout(() => this.close(), this.options.time);
        this.el.classList.add('on');
    }

    close(){
        this.el.classList.remove('on');
    }
};

export default Notification;