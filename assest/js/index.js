'use strict';

var TripCheckList = (function(){
    var CHECK_LIST_DATA = 'CHECK_LIST_DATA';
    
    // localStorage.removeItem(CHECK_LIST_DATA);
    var data = localStorage.getItem(CHECK_LIST_DATA) || '[{"id":"C01","checked":"true","name":"여벌 옷"},{"id":"C02","checked":"false","name":"실내 복"},{"id":"C03","checked":"false","name":"수영복"},{"id":"C04","checked":"false","name":"모자"},{"id":"C05","checked":"false","name":"슬리퍼"},{"id":"C06","checked":"false","name":"샴푸&린스"},{"id":"C07","checked":"false","name":"바디워시"},{"id":"C08","checked":"false","name":"클렌징"},{"id":"C09","checked":"false","name":"스킨케어"},{"id":"C010","checked":"false","name":"마스크팩"},{"id":"C011","checked":"false","name":"드라이기&고데기"},{"id":"C012","checked":"false","name":"수건"},{"id":"C013","checked":"false","name":"화장품"},{"id":"C014","checked":"false","name":"여권"},{"id":"C015","checked":"false","name":"휴지&물티슈"},{"id":"C016","checked":"false","name":"카메라"},{"id":"C017","checked":"false","name":"충전기"},{"id":"C018","checked":"false","name":"노트북"},{"id":"C019","checked":"false","name":"선글라스"},{"id":"C020","checked":"false","name":"선크림"},{"id":"C021","checked":"false","name":"우산, 비옷"},{"id":"C022","checked":"false","name":"이어폰"},{"id":"C023","checked":"false","name":"비상약"},{"id":"C024","checked":"false","name":"서브가방"},{"id":"C025","checked":"false","name":"지퍼백"},{"id":"C026","checked":"false","name":"속옷"},{"id":"C027","checked":"false","name":"면도기"},{"id":"C028","checked":"false","name":"가이드북"},{"id":"C029","checked":"false","name":"돼지코"}]';
    
    var myListArr = [];
    var listArr = [];
    
    var myListEl = document.querySelector('.app__mylist .list__wrap');
    var listEl = document.querySelector('.app__list .list__wrap');
    var saveBtn = document.querySelector('#saveButton');

    var handlerItem = function(e){
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

    var createItem = function(mode, _data){
        var wrapEl = document.createElement('div');
        var btnEl = document.createElement('button');
        var spanEl = document.createElement('span');

        wrapEl.classList.add('list__items');
        wrapEl.innerText = _data.name;
        
        wrapEl.dataset.id = _data.id;

        btnEl.data = _data;             
        spanEl.classList.add('hidden');
        spanEl.innerText = (mode === 'list') ? '추가 버튼' : '삭제 버튼';

        btnEl.addEventListener('click', handlerItem);

        btnEl.append(spanEl);
        wrapEl.append(btnEl);

        return wrapEl;   
    };

    var appendHTML = function(){
        for(var i = 0; i < data.length; i++){
            if(data[i].checked === "true"){
                myListEl.append(createItem('myList', data[i]));
                myListArr.push(data[i]);

            }else{
                listEl.append(createItem('list', data[i]));
                listArr.push(data[i]);
            }
        }
    };

    var init = function(){
        data = JSON.parse(data).sort(function(a, b){
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });

        appendHTML();
    };

    saveBtn.addEventListener('click', function(){
        myListData.sort(function(a, b){
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });

        for(var i = 0; i < myListData.length; i++){
            for(var j = 0; j < STORAGE_DATA.length; j++){
                if(STORAGE_DATA[j].id === myListData[i].id){
                    STORAGE_DATA[j].checked = "true";
                }
            }
        }

        localStorage.setItem(CHECK_LIST_DATA, JSON.stringify(STORAGE_DATA));
    });

    init();
})();


// [TODO]
// 검색기능, 포커싱
// 오름차순, 내림차순 
// true, false되는지 확인
// 데이터 id값 생성(날짜시간초등등)
// 리스트가 하나도 없을때 안내