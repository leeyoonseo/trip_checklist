const DEV_DATA = [
    { 
        id : 'S001',
        name : '테스트1',
        checked : false
    },
    { 
        id : 'S002',
        name : '테스트2',
        checked : false
    },
    { 
        id : 'S003',
        name : '테스트3',
        checked : false
    },
    { 
        id : 'S004',
        name : '테스트4',
        checked : false
    },
];

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

        this.element = { data, className };
        this.attachEvent = { clickabled, clickFunction };

        return this;
    }

    set attachEvent({ clickabled, clickFunction }){
        if(!clickabled) return false;

        this.element.querySelector('button').addEventListener('click', clickFunction);
        return this;
    }

    set changeChecked(isChecked){
        this.itemData.checked = isChecked;
    }

    set element({ data, className }){
        const { id, name } = data;
        const wrapStr = `<div class="checklist__items ${className}" data-id="${ id }">
            <span class="checkList__items-name">${ name }</span>
            <button type="button"></button>
        </div>`;
        const dom = new DOMParser().parseFromString(wrapStr, "text/html");

        this.itemData = data;
        this._node = dom;

        return this;
    }

    get element(){
        return this._node;
    }

    get data(){
        return this.itemData;
    }
}

const checkListNode = document.querySelector('#checkList');

[...DEV_DATA].map((obj) => {
    const items = new CheckItem({
        data : obj,
        className : 'test',
        clickabled : true,
        clickFunction : function(){
            console.log('test');
        }
    });

    checkListNode.append(items.element.querySelector('div'));
});

