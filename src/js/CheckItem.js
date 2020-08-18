class CheckItem {
    constructor() {
        this.name = 'CheckItem';
        return this;
    }
}

// [TODO] checkitem으로 하고... useritem과 totalitem은 별도로 필요한 것들..
class UserItem extends CheckItem {
    constructor(){
        super();
        this.name = 'UserItem';

        return this;
    }

    set itemElement(data){
        const { id, name } = data;
        const wrapStr = `<div class="checklist__items" data-id="${ id }">
            <button type="button">
                ${ name }
            </button>
        </div>`;
        const dom = new DOMParser().parseFromString(wrapStr, "text/html");

        this._data = data;
        this._node = dom;
    }

    set changeChecked(isChecked){
        this._data.checked = isChecked;
    }

    get itemElement(){
        return this._node;
    }

    get data(){
        return this._data;
    }
}

// class UserItem extends CheckItem {
//     constructor({ data, callback }) {
//         // [TODO] super 인자전달에 대해 알아볼것!
//         super({ data, callback });
//         this.setOptionUp();

//         return this.item;
//     }

//     // [TODO] 합치기
//     setOptionUp(){
//         const that = this;
//         const buttonNode = document.createElement('button');
//         buttonNode.data = this.data;

//         buttonNode.addEventListener('click', e => {
//             this.onClick(e);
//         });

//         this.node.append(buttonNode);
//         return this;
//     }

//     onClick({ target }) {
//         target.parentNode.remove();
//         const { data } = this;
// console.log(data)
//         const newData = Object.values(data).map(val => {
//             let { id, checked } = data;

//             if(val === id){
//                 checked = false;
//             }
//         });
//         console.log(newData)
//         // this.callback(this.data);
//         return this;
//     }
// } 

// class TotalItem extends CheckItem {
//     constructor({ data, callback }) {
//         super({ data, callback });
//         this.data = data;    
//         this.setOptionUp();
        
//         return this.item;
//     }

//     // [TODO] 합치기
//     setOptionUp(){
//         const that = this;
//         const buttonNode = document.createElement('button');
//         buttonNode.data = this.data;

//         buttonNode.addEventListener('click', e => {
//             this.onClick(e);
//         });

//         this.node.append(buttonNode);
//         return this;
//     }

//     onClick({ target }) {
//         target.parentNode.remove();
     
//         Object.values(this.data).map((val) => {
//             if(val === this.data.id){
//                 this.data.checked = true;
//             }
//         });

//         this.callback(this.data);
//         return this;
//     }
// }

export { CheckItem, UserItem
    // TotalItem 
};