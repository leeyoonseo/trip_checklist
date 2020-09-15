
class CheckItem {
    
    /**
     * data {Object}
     * data.name {String}
     * data.id {String}
     * data.checked {Boolean}
     * className {String} - 아이템 클래스
     * clickabled {Boolean} - 아이템 클릭 기능 여부
     * clickFunction {Function} - 아이템 클릭 기능이 true일 경우 실행될 함수
     */
    constructor({
        data = null,
        className = '',
        clickabled = false,
        clickFunction = null
    }) {
        this.name = 'CheckItem';
        this.version = '1.1.0';
        this.el;
        
        this.html = { data, className };
        this.clickabled = clickabled;

        if(clickabled && clickFunction){
            this.attachEvent = clickFunction;
        } 

        return this;
    }

    set attachEvent(clickFunc){
        this.el.querySelector('button').addEventListener('click', () => {
            clickFunc(this.el, this.itemData);
        });
        return this;
    }

    set changeChecked(isChecked){
        this.itemData.checked = isChecked;

        return this;
    }

    set html({ data, className }){
        const { id, name } = data;
        let htmlStr = `
            <div class="checklist__items ${className}" data-id="${ id }">
                <span class="checkList__items-name">${ name }</span>
                <button type="button"></button>
            </div>
        `;

        const parseHtml = new DOMParser().parseFromString(htmlStr, "text/html").querySelector('div');

        this.itemData = data;
        this.el = parseHtml;

        return this;
    }

    set addEvent(callback){
        if(!this.clickabled) return false;

        this.attachEvent = callback;

        return this;
    }

    get data(){
        return this.itemData;
    }
}

export default CheckItem;

// const checkListNode = document.querySelector('#checkList');

// [...DEV_DATA].map((obj) => {
//     const items = new CheckItem({
//         data : obj,
//         className : 'test',
//         clickabled : true,
//         callback : function(){
//             console.log('test');
//         }
//     });

//     checkListNode.append(items.element.querySelector('div'));
// });



// class CheckItem {
//     constructor() {
//         this.name = 'CheckItem';
//         return this;
//     }

//     set element(data){
//         const { id, name } = data;
//         const wrapStr = `<div class="checklist__items" data-id="${ id }">
//             <span class="checkList__items-name">${ name }</span>
//             <button type="button"></button>
//         </div>`;
//         const dom = new DOMParser().parseFromString(wrapStr, "text/html");

//         this._data = data;
//         this._node = dom;
//     }

//     set changeChecked(isChecked){
//         this._data.checked = isChecked;
//     }

//     get element(){
//         return this._node;
//     }

//     get data(){
//         return this._data;
//     }
// }

// [TODO] checkitem으로 하고... useritem과 totalitem은 별도로 필요한 것들..
// class UserItem extends CheckItem {
//     constructor(){
//         super();
//         this.name = 'UserItem';

//         return this;
//     }

//     set itemElement(data){
//         const { id, name } = data;
//         const wrapStr = `<div class="checklist__items" data-id="${ id }">
//             ${ name }
//             <button type="button"></button>
//         </div>`;
//         const dom = new DOMParser().parseFromString(wrapStr, "text/html");

//         this._data = data;
//         this._node = dom;
//     }

//     set changeChecked(isChecked){
//         this._data.checked = isChecked;
//     }

//     get itemElement(){
//         return this._node;
//     }

//     get data(){
//         return this._data;
//     }
// }

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

// export { CheckItem, 
//     // UserItem,
//     // TotalItem 
// };



// const DEV_DATA = [
//     { 
//         id : 'S001',
//         name : '테스트1',
//         checked : false
//     },
//     { 
//         id : 'S002',
//         name : '테스트2',
//         checked : false
//     },
//     { 
//         id : 'S003',
//         name : '테스트3',
//         checked : false
//     },
//     { 
//         id : 'S004',
//         name : '테스트4',
//         checked : false
//     },
// ];
