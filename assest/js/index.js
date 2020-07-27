(function(){
    'use strict';

    var TRIP_CHECK_LIST = {
        CHECK_LIST_DATA : 'CHECK_LIST_DATA',
        NOTI_TEXT_DEFAULT : '완료되었습니다.',
        NOTI_TEXT_SAVE : '저장되었습니다.',
        NOTI_TEXT_SEARCH_EMPTY : '검색어를 입력해주세요.',
        NOTI_TEXT_ERROR : '오류입니다.'
    };

    // dev
    // localStorage.removeItem(TRIP_CHECK_LIST.CHECK_LIST_DATA);

    var expired = localStorage.getItem('expired');
    var data = localStorage.getItem(TRIP_CHECK_LIST.CHECK_LIST_DATA) || '[{"id":"C01","checked":"true","name":"여벌 옷"},{"id":"C02","checked":"false","name":"실내 복"},{"id":"C03","checked":"false","name":"수영복"},{"id":"C04","checked":"false","name":"모자"},{"id":"C05","checked":"false","name":"슬리퍼"},{"id":"C06","checked":"false","name":"샴푸&린스"},{"id":"C07","checked":"false","name":"바디워시"},{"id":"C08","checked":"false","name":"클렌징"},{"id":"C09","checked":"false","name":"스킨케어"},{"id":"C010","checked":"false","name":"마스크팩"},{"id":"C011","checked":"false","name":"드라이기&고데기"},{"id":"C012","checked":"false","name":"수건"},{"id":"C013","checked":"false","name":"화장품"},{"id":"C014","checked":"false","name":"여권"},{"id":"C015","checked":"false","name":"휴지&물티슈"},{"id":"C016","checked":"false","name":"카메라"},{"id":"C017","checked":"false","name":"충전기"},{"id":"C018","checked":"false","name":"노트북"},{"id":"C019","checked":"false","name":"선글라스"},{"id":"C020","checked":"false","name":"선크림"},{"id":"C021","checked":"false","name":"우산, 비옷"},{"id":"C022","checked":"false","name":"이어폰"},{"id":"C023","checked":"false","name":"비상약"},{"id":"C024","checked":"false","name":"서브가방"},{"id":"C025","checked":"false","name":"지퍼백"},{"id":"C026","checked":"false","name":"속옷"},{"id":"C027","checked":"false","name":"면도기"},{"id":"C028","checked":"false","name":"가이드북"},{"id":"C029","checked":"false","name":"돼지코"}]';
    var myListArr = [];
    var listArr = [];

    var myListEl = document.querySelector('.app__mylist .list__wrap');
    var listEl = document.querySelector('.app__list .list__wrap');
    var searchInput = document.querySelector('#searchInput');
    var saveBtnEl = document.querySelector('#saveButton');

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

    var CheckItem = function(mode, data){
        this.mode = mode;
        this.data = data;
        
        return this.create();
    };

    CheckItem.prototype.create = function(){
        var data = this.data;
        var wrapEl = document.createElement('div');
        var btnEl = document.createElement('button');
        var spanEl = document.createElement('span');

        wrapEl.classList.add('list__items');
        wrapEl.innerText = data.name;
        
        wrapEl.dataset.id = data.id;

        btnEl.data = data;             
        spanEl.classList.add('hidden');
        spanEl.innerText = (this.mode) ? '추가 버튼' : '삭제 버튼';

        btnEl.addEventListener('click', this.onClick);

        btnEl.append(spanEl);
        wrapEl.append(btnEl);

        return wrapEl;   
    
    };

    CheckItem.prototype.onClick = function(e){
        var target = e.target;
        var parentNode = target.parentNode;
        var id = parentNode.dataset.id;
        var thisDOM = document.querySelector('[data-id='+ id +']');
        var checked = target.data.checked;

        if(checked === "true"){
            thisDOM.remove();
            listEl.append(parentNode);
            target.data.checked = "false";

        }else{
            thisDOM.remove();
            myListEl.append(parentNode);
            target.data.checked = "true";
        }
    };

    var Notification = function(opts){
        this.options = Object.assign({},{
            timer : 1,
            text : TRIP_CHECK_LIST.NOTI_TEXT_DEFAULT,
            imageUrl : '',
            target : 'section' // id, class, tag 
        }, opts);

        this.notiEl = this.createHtml();
        var target = document.querySelector(this.options.target);
        target.append(this.notiEl);
    };

    Notification.prototype.createHtml = function(){
        var wrap = document.createElement('div');
        var inner = document.createElement('div');

        wrap.classList.add('app__noti');
        inner.classList.add('inner');

        wrap.append(inner);

        return wrap;
    }

    Notification.prototype.open = function(opts){
        console.log('??')
        if(opts) this.options = Object.assign({}, this.options, opts);
        var self = this;

        this.notiEl.childNodes[0].innerText = this.options.text;

        // if(imageUrl){}
        this.notiEl.classList.add('on');

        setTimeout(function(){
            self.close();
        }, self.options.timer * 1000); // millisecond
    };

    Notification.prototype.close = function(){
        this.notiEl.classList.remove('on');
    };

    var storageAvailable = function(type){
        var storage;

        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // Firefox를 제외한 모든 브라우저
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // 코드가 존재하지 않을 수도 있기 떄문에 이름 필드도 확인합니다.
                // Firefox를 제외한 모든 브라우저
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // 이미 저장된 것이있는 경우에만 QuotaExceededError를 확인하십시오.
                (storage && storage.length !== 0);
        }
    };

    var appendToBody = function(data){
        myListEl.innerHTML = '';
        listEl.innerHTML = '';

        if(!data) return false;

        for(var i = 0; i < data.length; i++){
            if(data[i].checked === "true"){
                var item = new CheckItem('true', data[i]);
                myListEl.append(item);
                myListArr.push(data[i]);
    
            }else{
                var item = new CheckItem('false', data[i]);
                listEl.append(item);
                listArr.push(data[i]);
            }
        } 
    };

    var saveData = function(){
        var newData = myListArr.concat(listArr);

        newData.sort(function(a, b){
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });

        localStorage.setItem(TRIP_CHECK_LIST.CHECK_LIST_DATA, JSON.stringify(newData));
        notification.open({ 
            text : TRIP_CHECK_LIST.NOTI_TEXT_SAVE
        });
    };

    var showSearchResult = function(val){
        var searchData = [];

        for(var i = 0; i < data.length; i++){
            if(data[i].name.includes(val)){
                searchData.push(data[i]);
            }
        }

        myListEl.innerHTML = '';
        listEl.innerHTML = '';

        for(var i = 0; i < searchData.length; i++){
            if(searchData[i].checked === "true"){
                var item = new CheckItem('true', searchData[i]);
                myListEl.append(item);
    
            }else{
                var item = new CheckItem('false', searchData[i]);
                listEl.append(item);
            }
        } 
    };

    var notification = new Notification();
        
    data = JSON.parse(data).sort(function(a, b){
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

    appendToBody(data);
    searchInput.focus();





    // handler
    saveBtnEl.addEventListener('click', function(){
        if(storageAvailable('localStorage')){
            saveData();
            
        }else {
            notification.open({
                text : TRIP_CHECK_LIST.NOTI_TEXT_ERROR
            });
        }
    });

    searchInput.addEventListener('input', function(e){
        var val = e.target.value;

        if(val === ''){
            appendToBody(data);

        }else{
            showSearchResult(val);
        }
    });

})();

// [TODO]
// 사용자 안내하는 dim 만들기
// 검색기능, 포커싱
// 오름차순, 내림차순 
// true, false되는지 확인
// 데이터 id값 생성(날짜시간초등등)
// 리스트가 하나도 없을때 안내
// 초성검색..?