class CheckItem {
    constructor({ data, callback = null }) {
        this.data = data;
        this.callback = callback;
        this.setup();   
        
        return this;
    }
    
    setup() {
        const wrapNode = document.createElement('div');
        wrapNode.classList.add('checklist__items');
        wrapNode.innerText = this.data.name;
        wrapNode.dataset.id = this.data.id;

        this.node = wrapNode;

        return this;
    }
}

class UserItem extends CheckItem {
    constructor({ data, callback }) {
        // [TODO] super 인자전달에 대해 알아볼것!
        super({ data, callback });
        this.setOptionUp();

        return this.item;
    }

    // [TODO] 합치기
    setOptionUp(){
        const that = this;
        const buttonNode = document.createElement('button');
        buttonNode.data = this.data;

        buttonNode.addEventListener('click', function(e){
            that.onClick(e);
        });

        this.node.append(buttonNode);
        return this;
    }

    onClick(e) {
        e.target.parentNode.remove();
        
        Object.values(this.data).map((val) => {
            if(val === this.data.id){
                this.data.checked = false;
            }
        });

        this.callback();
        return this;
    }
} 

class TotalItem extends CheckItem {
    constructor({ data, callback }) {
        super({ data, callback });
        this.data = data;
        this.setOptionUp();
        
        return this.item;
    }

    // [TODO] 합치기
    setOptionUp(){
        const that = this;
        const buttonNode = document.createElement('button');
        buttonNode.data = this.data;

        buttonNode.addEventListener('click', function({ target }){
            that.onClick(target);
        });

        this.node.append(buttonNode);
        return this;
    }

    onClick(target) {
        target.parentNode.remove();
        
        Object.values(this.data).map((val) => {
            if(val === this.data.id){
                this.data.checked = true;
            }
        });

        this.callback();
        return this;
    }
}

export { CheckItem, UserItem, TotalItem };