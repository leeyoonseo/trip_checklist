import { APP_FLOW } from './lang';

console.log('APP_FLOW', APP_FLOW);



    // dev
    // localStorage.removeItem(MESSAGE.CHECK_LIST_DATA);
    // db에 넣어야..
    const expired = localStorage.getItem('expired') || false;
    const myListNode = document.querySelector('#myListNode');
    const listNode = document.querySelector('#allListNode');
    const searchInputNode = document.querySelector('#searchInput');
    const saveBtnNode = document.querySelector('#listSave');    
    let checkedData = localStorage.getItem(MESSAGE.CHECK_LIST_DATA);
    // let myListData = [];
    // let listData = [];

    
    
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

    class coachingCover {
        constructor(){
            this.el = this.create();
    
            return this;
        }
    
        create(){
            const cover = document.createElement('div');
            const inner = document.createElement('div');
            const nav = document.createElement('div');
            const close = document.createElement('div');
            const closeButton = document.createElement('button');
    
    
            cover.classList.add('coaching-cover');
            inner.classList.add('coaching-cover__inner');
            nav.classList.add('coaching-cover__nav');
            close.classList.add('coaching-cover__close');
            closeButton.innerText = '닫기';
    
            close.append(closeButton);
            inner.append(nav).append(close);
            cover.append(inner);
    
            return cover;
        }
    }

    // [TODO] 매번 데이터를 새로 그리지 않도록 해야하는데, 방법을 찾아보자!!
    function appendToBody(data){
        myListNode.innerHTML = '';
        listNode.innerHTML = '';

        if(isExistData(data)){
            data.map(function(obj, idx) {
                if(obj.checked){
                    let item = new UserItem(obj);
                    myListNode.append(item.node);
                }else{
                    let item = new TotalItem(obj);
                    listNode.append(item.node);
                }
            });
        }

        setEmptyList();
    };

    function isExistData(data) {
        if(data.length > 0) {
            return true;
        }

        return false;
    };

    function setEmptyList(){
        appendEmptyEl(myListNode, createEmptyEl());
        appendEmptyEl(listNode, createEmptyEl());

        function createEmptyEl(){
            const node = document.createElement('div');
            node.classList.add('checklist__text--empty');
            node.innerText = '아이템이 없습니다';

            return node;
        }

        function appendEmptyEl(listNode, emptyNode){
            if(listNode.childNodes.length < 1){
                listNode.append(emptyNode);
                return false;
            }
        }
    };

    // init
    const bodyNode = document.querySelector('body');
    // const coachingNode = document.querySelector('#coachingCover');
    // const coachingCloseNode = document.querySelector('#coachingCover');
    // const listEditNode = document.querySelector('#listEdit');
    const appEditNode = document.querySelector('#appEdit');

    checkedData = JSON.parse(checkedData).sort(function(a, b){
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

    // localStorage.removeItem('expired');
    // localStorage.removeItem('isFirstVisit');
    if(localStorage.getItem('isFirstVisit') === null){
        // coachingNode.classList.add('on');

        // coachingCloseNode.addEventListener('click', function(){
        //     // coachingNode.classList.remove('on');
        //     localStorage.setItem('isFirstVisit', true);
        // });
    }

    appendToBody(checkedData);
    searchInputNode.focus();

    // handler    
    const notification = new Notification();
    saveBtnNode.addEventListener('click', function(){
        if(storageAvailable('localStorage')){
            localStorage.setItem(MESSAGE.CHECK_LIST_DATA, JSON.stringify(checkedData));
            notification.open({ 
                text : MESSAGE.NOTI_TEXT_SAVE
            });

        }else {
            notification.open({
                text : MESSAGE.NOTI_TEXT_ERROR
            });
        }
    });

    searchInputNode.addEventListener('input', function(e){
        const val = e.target.value;
        let searchData = clone(checkedData);
        
        if(val !== ''){
            searchData = setSearchData(checkedData, val);
        }

        appendToBody(searchData);
    });

    // listEditNode.addEventListener('click', function(){
    //     appEditNode.calssList.add('on');
    //     setEditAllList();
    // });


    const editListNode = document.querySelector('#editList');
    
    // [TODO] 제거할 것
    setEditAllList();

    function setEditAllList(){
        if(isExistData(checkedData)){
            checkedData.map(function(obj) {
                let item = new CheckItem(obj);
                // editListNode.append(item.node);
            });
        }

        // setEmptyList();
    }



    function setSearchData(data, val){
        let arr = [];

        data.find(function(obj){
            if(obj.name.includes(val)){
                arr.push(obj);
            }
        });

        return arr;
    };

    // polyfill
    function storageAvailable(type){
        let storage;

        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            (storage && storage.length !== 0);
        }
    };

    if (!String.prototype.includes) {
        String.prototype.includes = function(search, start) {
            if (typeof start !== 'number') start = 0;
            if (start + search.length > this.length) {
                return false;
        
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    };

    function clone(obj) {
        if (obj === null || typeof(obj) !== 'object')
        return obj;
      
        var copy = obj.constructor();
      
        for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) {
            copy[attr] = clone(obj[attr]);
          }
        }
      
        return copy;
      }