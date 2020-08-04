(function(){

    const CHECK_LIST_DATA = 'CHECK_LIST_DATA';

    // [TODO] flow 관리
    const APP_FLOW = {
        GUIDE : 'GUIDE',
        MAIN : 'MAIN',
        MENU_LIST : 'MENU',
        LIST_EDIT : 'LIST_EDIT'
    };

    const MESSAGE = {
        NOTI_TEXT_DEFAULT : '완료되었습니다.',
        NOTI_TEXT_SAVE : '저장되었습니다.',
        NOTI_TEXT_SEARCH_EMPTY : '검색어를 입력해주세요.',
        NOTI_TEXT_ERROR : '오류입니다.'
    };
    
    // dev
    // localStorage.removeItem(MESSAGE.CHECK_LIST_DATA);
    // db에 넣어야..
    const expired = localStorage.getItem('expired') || false;
    const myListNode = document.querySelector('.app__mylist .list__wrap');
    const listNode = document.querySelector('.app__list .list__wrap');
    const searchInputNode = document.querySelector('#searchInput');
    const saveBtnNode = document.querySelector('#saveButton');    
    let checkedData = localStorage.getItem(MESSAGE.CHECK_LIST_DATA) || '[{"id":"C01","checked":true,"name":"여벌 옷"},{"id":"C02","checked":false,"name":"실내 복"},{"id":"C03","checked":false,"name":"수영복"},{"id":"C04","checked":false,"name":"모자"},{"id":"C05","checked":false,"name":"슬리퍼"},{"id":"C06","checked":false,"name":"샴푸&린스"},{"id":"C07","checked":false,"name":"바디워시"},{"id":"C08","checked":false,"name":"클렌징"},{"id":"C09","checked":false,"name":"스킨케어"},{"id":"C010","checked":false,"name":"마스크팩"},{"id":"C011","checked":false,"name":"드라이기&고데기"},{"id":"C012","checked":false,"name":"수건"},{"id":"C013","checked":false,"name":"화장품"},{"id":"C014","checked":false,"name":"여권"},{"id":"C015","checked":false,"name":"휴지&물티슈"},{"id":"C016","checked":false,"name":"카메라"},{"id":"C017","checked":false,"name":"충전기"},{"id":"C018","checked":false,"name":"노트북"},{"id":"C019","checked":false,"name":"선글라스"},{"id":"C020","checked":false,"name":"선크림"},{"id":"C021","checked":false,"name":"우산, 비옷"},{"id":"C022","checked":false,"name":"이어폰"},{"id":"C023","checked":false,"name":"비상약"},{"id":"C024","checked":false,"name":"서브가방"},{"id":"C025","checked":false,"name":"지퍼백"},{"id":"C026","checked":false,"name":"속옷"},{"id":"C027","checked":false,"name":"면도기"},{"id":"C028","checked":false,"name":"가이드북"},{"id":"C029","checked":false,"name":"돼지코"}]';
    // let myListData = [];
    // let listData = [];

    const guide = function() {
        const INFO = [
            {
                className : 'guide__menu',
                text : '클릭해서 메뉴를 확인하세요.'
            },
            {
                className : 'guide__search',
                text : '검색어를 입력하여 찾고자하는 아이템을 찾으세요.'
            },
            {
                className : 'guide__save',
                text : '저장 아이콘을 클릭해서 체크리스트의 상태를 저장하세요!'
            },
            {
                className : 'guide__remove__item',
                text : 'x 버튼을 클릭해서<br>내 캐리어에서 아이템을 제거하세요.'
            },
            {
                className : 'guide__add__item',
                text : '텍스트를 클릭해서 내 캐리어에 아이템을 추가하세요.'
            }
        ];
        
        const itemNode = function(className, text) {
            var itemEl = document.createElement('div');
            var iconEl = document.createElement('span');
            var textEl = document.createElement('span');

            itemEl.classList.add('guide__items');
            itemEl.classList.add(className);
            iconEl.classList.add('icon__pointer');
            textEl.classList.add('text');

            textEl.innerText = text;
            itemEl.append(iconEl, textEl);

            return itemEl;   

        };

        return getNode();

        function getNode() {
            const wrapNode = document.createElement('div');
            const innerNode = document.createElement('div');
            const expiredNode = document.createElement('div');
            const expiredBtnNode = document.createElement('button');
            const expiredTextNode = document.createElement('span');

            wrapNode.classList.add('app__guide');
            innerNode.classList.add('inner');
            expiredNode.classList.add('expired');
            expiredBtnNode.classList.add('expiredBtn');

            expiredBtnNode.innerText = '체크';
            expiredTextNode.innerText = '다시 보지 않기';
            // expiredNode.append(expiredNode, expiredTextNode);

            // expiredBtnNode.addEventListener('click', function(){
            //     wrapNode.remove();
            //     localStorage.setItem('expired', true);
            // });

            INFO.map(function(obj){
                innerNode.append(itemNode(obj.className, obj.text));
            });
            
            innerNode.append(expiredNode);
            wrapNode.append(innerNode);

            return wrapNode;            
        }
    };

    class CheckItem {
        constructor(data) {
            this.data = data;
            this.setup();   
            
            return this;
        }
        
        setup() {
            const wrapNode = document.createElement('div');
            wrapNode.classList.add('list__items');
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
    
    class Notification {
        constructor(opts) {
            this.options = Object.assign({},{
                timer : 1,
                text : MESSAGE.NOTI_TEXT_DEFAULT,
                imageUrl : '',
                target : 'section' // id, class, tag 
            }, opts);

            this.setup();
            return this;
        }

        setup() {
            const targetNode = document.querySelector(this.options.target);
            const wrapNode = document.createElement('div');
            const innerNode = document.createElement('div');

            wrapNode.classList.add('app__noti');
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

    // [TODO] 매번 데이터를 새로 그리지 않도록 해야하는데, 방법을 찾아보자!!
    function appendToBody(data){
        myListNode.innerHTML = '';
        listNode.innerHTML = '';

        if(isExistData(data)){
            data.map(function(obj, idx) {
                if(obj.checked){
                    let item = new UserItem(obj);
                    myListNode.append(item.node);
                    // myListData.push(obj);

                }else{
                    let item = new TotalItem(obj);
                    listNode.append(item.node);
                    // listData.push(obj);
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
            node.classList.add('empty__text');
            node.innerText = '비었다.';

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
    // var guide = createGuide();
    const bodyNode = document.querySelector('body');
    const guideNode = guide();

    checkedData = JSON.parse(checkedData).sort(function(a, b){
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });


    bodyNode.prepend(guideNode);

    // localStorage.removeItem('expired');
    if(expired) {
        currentFlow = APP_FLOW.MAIN;
        // guide.remove();
    
    }else{
        currentFlow = APP_FLOW.MAIN;
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
})();
  





//    

//     var notification = new Notification();
//     var init = function(){
//         var guide = createGuide();
//         var doc = document.querySelector('body');

//         data = JSON.parse(data).sort(function(a, b){
//             return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
//         });

//         doc.prepend(guide);
    
//         // localStorage.removeItem('expired');
//         if(expired) {
//             currentFlow = APP_FLOW.MAIN;
//             guide.remove();
        
//         }else{
//             currentFlow = APP_FLOW.MAIN;
//         }
        
//         appendToBody(data);
//         searchInputNode.focus();
//     };
    
//     init();






//     // menu
//     var menuBtnEl = document.querySelector('.menu__button');
//     var menuWrapEl = document.querySelector('.menu__wrap');
//     var listEditButton = document.querySelector('.list__edit__button');

//     menuBtnEl.addEventListener('click', function(){
//         console.log('menu')

//         if(menuWrapEl.classList.contains('on')){
//             menuWrapEl.classList.remove('on');

//         }else{
//             menuWrapEl.classList.add('on');
//         }
//     });

//     var editList = document.querySelector('.edit__list');

//     listEditButton.addEventListener('click', function(){
//         console.log('list', data);
//         setEditList(data);
//     });


//     function setEditList(data){
//         editList.innerHTML = '';

//         if(!data) return false;

//         for(var i = 0; i < data.length; i++){
//             var item = new CheckItem('true', data[i]);
//             editList.append(item);
//         }
        
//     }
// })();