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
    let data = localStorage.getItem(MESSAGE.CHECK_LIST_DATA) || '[{"id":"C01","checked":true,"name":"여벌 옷"},{"id":"C02","checked":false,"name":"실내 복"},{"id":"C03","checked":false,"name":"수영복"},{"id":"C04","checked":false,"name":"모자"},{"id":"C05","checked":false,"name":"슬리퍼"},{"id":"C06","checked":false,"name":"샴푸&린스"},{"id":"C07","checked":false,"name":"바디워시"},{"id":"C08","checked":false,"name":"클렌징"},{"id":"C09","checked":false,"name":"스킨케어"},{"id":"C010","checked":false,"name":"마스크팩"},{"id":"C011","checked":false,"name":"드라이기&고데기"},{"id":"C012","checked":false,"name":"수건"},{"id":"C013","checked":false,"name":"화장품"},{"id":"C014","checked":false,"name":"여권"},{"id":"C015","checked":false,"name":"휴지&물티슈"},{"id":"C016","checked":false,"name":"카메라"},{"id":"C017","checked":false,"name":"충전기"},{"id":"C018","checked":false,"name":"노트북"},{"id":"C019","checked":false,"name":"선글라스"},{"id":"C020","checked":false,"name":"선크림"},{"id":"C021","checked":false,"name":"우산, 비옷"},{"id":"C022","checked":false,"name":"이어폰"},{"id":"C023","checked":false,"name":"비상약"},{"id":"C024","checked":false,"name":"서브가방"},{"id":"C025","checked":false,"name":"지퍼백"},{"id":"C026","checked":false,"name":"속옷"},{"id":"C027","checked":false,"name":"면도기"},{"id":"C028","checked":false,"name":"가이드북"},{"id":"C029","checked":false,"name":"돼지코"}]';
    let myListData = [];
    let listData = [];

    class CheckItem {
        constructor(data) {
            this.data = data;
            this.setup();   
            
            return this;
        }
        
        setup() {
            const wrapNode = document.createElement('div');
            const btnNode = document.createElement('button');
            // const textNode = document.createElement('span');
            wrapNode.classList.add('list__items');
            wrapNode.innerText = this.data.name;
            wrapNode.dataset.id = this.data.id;
            btnNode.data = this.data;
            // textNode.classList.add('hidden');
            // textNode.innerText = '아이템 버튼';
            // btnNode.append(textNode);
            // wrapNode.append(btnNode);  

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
            return this.item;
        }

        onClick(e) {
            console.log(e.target)
            // this.remove();

        }
    } 

    // [TODO] 각 리스트 클릭 시  
    // onClick(e) {
        //             const { target } = e;
        //             const { parentNode } = target;
        //             const { id } = parentNode.dataset;
        //             const { checked } = target.data;
        //             const thisNode = document.querySelector('[data-id='+ id +']');
            
        //             if(checked.includes(true)){
        //                 thisNode.remove();
        //                 listNode.append(parentNode);
        //                 target.data.checked = false;
            
        //             }else{
        //                 thisNode.remove();
        //                 myListNode.append(parentNode);
        //                 target.data.checked = true;
        //             }
        
        //         }

    class TotalItem extends CheckItem {
        constructor(data) {
            super(data);
            this.data = data;
            // this.item = new CheckItem(data);
            return this.item;
        }

        onClick(e) {
            console.log(e.target)
            // this.remove();

        }
    }

    const isExistData = function(data){
        if(data.length > 0){
            return true;
        }

        return false;
    };

    const setEmptyList = function(targetNode){
        if(targetNode.childNodes.length < 1){
            const node = document.createElement('div');
            // [TODO] 클래스명 변경
            node.classList.add('empty__text');
            node.innerText = '비었다.';

            targetNode.append(node);
        }
    };

    const appendDataNodeToBody = function(data){
        myListNode.innerHTML = '';
        listNode.innerHTML = '';

        if(isExistData(data)){
            
            data.map(function(obj, idx) {
                // checked가 true일 경우 사용자 리스트
                if(obj.checked){
                    let item = new UserItem(obj);
                    myListNode.append(item.node);
                    myListData.push(obj);

                }else{
                    let item = new TotalItem(obj);
                    listNode.append(item.node);
                    listData.push(obj);
                }
            });

            // [TODO] 비어있을때 
            setEmptyList(myListNode);
        }
    };

    // init
    // var guide = createGuide();
    const bodyNode = document.querySelector('body');

    data = JSON.parse(data).sort(function(a, b){
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

    // bodyNode.prepend(guide);

    // localStorage.removeItem('expired');
    if(expired) {
        currentFlow = APP_FLOW.MAIN;
        // guide.remove();
    
    }else{
        currentFlow = APP_FLOW.MAIN;
    }
    
    appendDataNodeToBody(data);
    searchInputNode.focus();

    // polyfill
    if (!String.prototype.includes) {
        String.prototype.includes = function(search, start) {
            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    };

})();
  
//     var Notification = function(opts){
//         this.options = Object.assign({},{
//             timer : 1,
//             text : MESSAGE.NOTI_TEXT_DEFAULT,
//             imageUrl : '',
//             target : 'section' // id, class, tag 
//         }, opts);

//         this.notiEl = this.createHtml();
//         var target = document.querySelector(this.options.target);
//         target.append(this.notiEl);
//     };

//     Notification.prototype = {
//         createHtml : function(){
//             var wrap = document.createElement('div');
//             var inner = document.createElement('div');
    
//             wrap.classList.add('app__noti');
//             inner.classList.add('inner');
    
//             wrap.append(inner);
    
//             return wrap;
//         },

//         open : function(opts){
//             if(opts) this.options = Object.assign({}, this.options, opts);
//             var self = this;

//             this.notiEl.childNodes[0].innerText = this.options.text;

//             // if(imageUrl){}
//             this.notiEl.classList.add('on');

//             setTimeout(function(){
//                 self.close();
//             }, self.options.timer * 1000); // millisecond
//         },

//         close : function(){
//             this.notiEl.classList.remove('on');
//         }
//     };

//     var storageAvailable = function(type){
//         var storage;

//         try {
//             storage = window[type];
//             var x = '__storage_test__';
//             storage.setItem(x, x);
//             storage.removeItem(x);
//             return true;
//         }
//         catch(e) {
//             return e instanceof DOMException && (
//                 // Firefox를 제외한 모든 브라우저
//                 e.code === 22 ||
//                 // Firefox
//                 e.code === 1014 ||
//                 // 코드가 존재하지 않을 수도 있기 떄문에 이름 필드도 확인합니다.
//                 // Firefox를 제외한 모든 브라우저
//                 e.name === 'QuotaExceededError' ||
//                 // Firefox
//                 e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
//                 // 이미 저장된 것이있는 경우에만 QuotaExceededError를 확인하십시오.
//                 (storage && storage.length !== 0);
//         }
//     };
//    
//     var saveData = function(){
//         var newData = myListData.concat(listData);

//         newData.sort(function(a, b){
//             return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
//         });

//         localStorage.setItem(MESSAGE.CHECK_LIST_DATA, JSON.stringify(newData));
//         notification.open({ 
//             text : MESSAGE.NOTI_TEXT_SAVE
//         });
//     };

//     var showSearchResult = function(val){
//         var searchData = [];

//         for(var i = 0; i < data.length; i++){
//             if(data[i].name.includes(val)){
//                 searchData.push(data[i]);
//             }
//         }

//         myListNode.innerHTML = '';
//         listNode.innerHTML = '';

//         for(var i = 0; i < searchData.length; i++){
//             if(searchData[i].checked === true){
//                 var item = new CheckItem('true', searchData[i]);
//                 myListNode.append(item);
    
//             }else{
//                 var item = new CheckItem('false', searchData[i]);
//                 listNode.append(item);
//             }
//         } 
//     };

//     var createGuide = function(){
//         var guideInfo = [
//             { 
//                 className : 'guide__menu',
//                 text : '클릭해서 메뉴를 확인하세요' 
//             },
//             {
//                 className : 'guide__search',
//                 text : '검색어를 입력하여 찾고자하는 아이템을 찾으세요.'
//             },
//             {
//                 className : 'guide__save',
//                 text : '저장 아이콘을 클릭해서 체크리스트의 상태를 저장하세요!'
//             },
//             {
//                 className : 'guide__remove__item',
//                 text : 'x 버튼을 클릭해서<br>내 캐리어에서 아이템을 제거하세요.'
//             },
//             {
//                 className : 'guide__add__item',
//                 text : '텍스트를 클릭해서 내 캐리어에 아이템을 추가하세요.'
//             }

//         ]

//         var wrap = document.createElement('div');
//         var inner = document.createElement('div');
//         var expired = document.createElement('div');
//         var expiredBtn = document.createElement('button');
//         var expiredText = document.createElement('span');

//         APP_FLOW.GUIDE;

//         wrap.classList.add('app__guide');
//         inner.classList.add('inner');
//         expired.classList.add('expired');
//         expiredBtn.classList.add('expiredBtn');

//         expiredBtn.innerText = '체크';
//         expiredText.innerText = '다시 보지 않기';
//         expiredBtn.addEventListener('click', function(){
//             wrap.remove();
//             localStorage.setItem('expired', true);
//         });

//         expired.append(expiredBtn, expiredText);

//         for(var i = 0; i < guideInfo.length; i++){
//             inner.append(getGuideItemStr(guideInfo[i].className, guideInfo[i].text))
//         }
//         inner.append(expired);
//         wrap.append(inner);

//         return wrap;

//         function getGuideItemStr(className, text){
//             var itemEl = document.createElement('div');
//             var iconEl = document.createElement('span');
//             var textEl = document.createElement('span');

//             itemEl.classList.add('guide__items');
//             itemEl.classList.add(className);
//             iconEl.classList.add('icon__pointer');
//             textEl.classList.add('text');

//             textEl.innerText = text;
//             itemEl.append(iconEl, textEl);

//             return itemEl;            
//         }
//     };

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

//     // handler
//     saveBtnNode.addEventListener('click', function(){
//         if(storageAvailable('localStorage')){
//             saveData();
            
//         }else {
//             notification.open({
//                 text : MESSAGE.NOTI_TEXT_ERROR
//             });
//         }
//     });

//     searchInputNode.addEventListener('input', function(e){
//         var val = e.target.value;

//         if(val === ''){
//             appendToBody(data);

//         }else{
//             showSearchResult(val);
//         }
//     });


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

// // [TODO]
// // 리스트가 하나도 없을때 안내
// // 초성검색..?