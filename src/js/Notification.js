class Notification {
    constructor(opts) {
        this.options = Object.assign({},{
            timer : 1,
            text : MESSAGE.NOTI_TEXT_DEFAULT,
            imageUrl : '',
            target : 'body' // id, class, tag 
        }, opts);

        this.setup();
        return this;
    }

    setup() {
        const targetNode = document.querySelector(this.options.target);
        const wrapNode = document.createElement('div');
        const innerNode = document.createElement('div');

        wrapNode.classList.add('app__notification');
        innerNode.classList.add('inner');
        wrapNode.append(innerNode);
        targetNode.append(wrapNode);

        this.node = wrapNode;

        return this;
    }

    open(opts) {
        if(opts) {
            this.options = Object.assign({}, this.options, opts);
        } 

        const self = this;

        this.node.childNodes[0].innerText = this.options.text;
        this.node.classList.add('on');

        setTimeout(function(){
            self.close();
        }, self.options.timer * 1000); // millisecond
    }

    close() {
        this.node.classList.remove('on');
    }
};

export default Notification;