class CheckItem {
    constructor(data) {
        this.data = data;
        this.setup();   
        
        return this;
    }
    
    setup() {
        const wrapNode = document.createElement('div');
        wrapNode.classList.add('checklist__items');
        wrapNode.innerText = this.data.name;
        wrapNode.dataset.id = this.data.id;

        this.node = wrapNode;

        // this.attachEvent();
        return this;
    }
}

class UserItem extends CheckItem {
    constructor(data) {
        // [TODO] super 인자전달에 대해 알아볼것!
        super(data);
        this.data = data;
        // [TODO] mode? options?
        // this.item = new CheckItem(data);
        this.setOptionUp();

        return this.item;
    }

    // [TODO] 합치기
    setOptionUp(){
        const buttonNode = document.createElement('button');
        buttonNode.data = this.data;

        buttonNode.addEventListener('click', this.onClick);
        this.node.append(buttonNode);

        return this;
    }

    // [TODO]
    onClick() {
        const data = this.data;
        this.parentNode.remove();
        
        Object.values(data).map(function(val){
            if(val === data.id){
                data.checked = false;
            }
        });

        appendToBody(checkedData);

        return this;
    }
} 

class TotalItem extends CheckItem {
    constructor(data) {
        super(data);
        this.data = data;
        this.setOptionUp();
        
        return this.item;
    }

    // [TODO] 합치기
    setOptionUp(){
        const buttonNode = document.createElement('button');
        buttonNode.data = this.data;

        buttonNode.addEventListener('click', this.onClick);
        this.node.append(buttonNode);
    }

    onClick() {
        const data = this.data;
        this.parentNode.remove();
        
        Object.values(data).map(function(val){
            if(val === data.id){
                data.checked = true;
            }
        });

        appendToBody(checkedData);
        
        return this;
    }
}