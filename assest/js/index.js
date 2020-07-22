'use strict';

var TripCheckList = (function(){
    var CHECK_LIST_DATA = 'TRIP_CHECK_LIST_DATA';

    var searchInput = document.querySelector('#searchInput');
    var saveBtn = document.querySelector('#saveButton');

    var myList = document.querySelector('.app__mylist .list__wrap');
    var list = document.querySelector('.app__list .list__wrap');
    var listData = [];
    var myListData = [];

    // [TODO]
    // 1.starage에 저장
    // 2.데이터가 있을 경우     
    localStorage.removeItem(CHECK_LIST_DATA);
    var STORAGE_DATA = localStorage.getItem(CHECK_LIST_DATA);

    if(!STORAGE_DATA){
        STORAGE_DATA = '[{"id":"C01","checked":true,"name":"여벌 옷"},{"id":"C02","checked":false,"name":"실내 복"},{"id":"C03","checked":false,"name":"수영복"},{"id":"C04","checked":false,"name":"모자"},{"id":"C05","checked":false,"name":"슬리퍼"},{"id":"C06","checked":false,"name":"샴푸&린스"},{"id":"C07","checked":false,"name":"바디워시"},{"id":"C08","checked":false,"name":"클렌징"},{"id":"C09","checked":false,"name":"스킨케어"},{"id":"C010","checked":false,"name":"마스크팩"},{"id":"C011","checked":false,"name":"드라이기&고데기"},{"id":"C012","checked":false,"name":"수건"},{"id":"C013","checked":false,"name":"화장품"},{"id":"C014","checked":false,"name":"여권"},{"id":"C015","checked":false,"name":"휴지&물티슈"},{"id":"C016","checked":false,"name":"카메라"},{"id":"C017","checked":false,"name":"충전기"},{"id":"C018","checked":false,"name":"노트북"},{"id":"C019","checked":false,"name":"선글라스"},{"id":"C020","checked":false,"name":"선크림"},{"id":"C021","checked":false,"name":"우산, 비옷"},{"id":"C022","checked":false,"name":"이어폰"},{"id":"C023","checked":false,"name":"비상약"},{"id":"C024","checked":false,"name":"서브가방"},{"id":"C025","checked":false,"name":"지퍼백"},{"id":"C026","checked":false,"name":"속옷"},{"id":"C027","checked":false,"name":"면도기"},{"id":"C028","checked":false,"name":"가이드북"},{"id":"C029","checked":false,"name":"돼지코"}]';
    };

    var viewData = clone(STORAGE_DATA);

    viewData = JSON.parse(viewData).sort(function(a, b){
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;

        // [TODO]
        // 내림차순, 오름차순 정렬 만들기
        // return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
    });

    var init = function(){

        // [TODO] 검색기능구현
        searchInput.focus();
        
        // [TODO] 
        // 1.데이터 그리기
        for(var i = 0; i < viewData.length; i++){
            // 내꺼
            if(viewData[i].checked){
                myList.append(createItem('mylist', viewData[i]))
                myListData.push(viewData[i]);

            // 리스트
            }else{
                list.append(createItem('list', viewData[i]))
                listData.push(viewData[i]);
            }
        }

        // [TODO] 리스트들이 없을때, 있을때 안내
        // if(!myListArr.length){}else{
        //     myList.innerHTML = myListArr;
        // }
        // if(!listArr.length){}else{
        //     list.innerHTML = listArr;
        // }
    };

    function createItem(mode, data){
        var wrap = document.createElement('div');
        var btn = document.createElement('button');
        var span = document.createElement('span');

        wrap.classList.add('list__items');
        wrap.innerText = data.name;
        
        // [TODO] id 추가한날짜시간초로 만들것
        wrap.dataset.id = data.id;

        btn.data = data;             
        span.classList.add('hidden');
        span.innerText = (mode === 'list') ? '추가 버튼' : '삭제 버튼';

        btn.addEventListener('click', handlerItem);
        btn.append(span);
        wrap.append(btn);

        return wrap;   
    }
    
    function handlerItem(e){
        var target = e.target;
        var parentNode = target.parentNode;
        var id = parentNode.dataset.id;
        var thisDOM = document.querySelector('[data-id='+ id +']');

        var checked = target.data.checked;
        
        if(checked){
            thisDOM.remove();
            list.append(parentNode);
            checked = false;
        }else{
            thisDOM.remove();
            myList.append(parentNode);
            checked = true;
        }

        // checked = !checked;
        console.log(checked)
    }

    function clone(obj) {
        if (obj === null || typeof(obj) !== 'object') return obj;

        var copy = obj.constructor();

        for(var i = 0; i < obj.length; i++){
            if (obj.hasOwnProperty(obj[i].attr)) {
                copy[i].attr = clone(obj[i].attr);
            }
        }
        
        return copy;
    }

    // handler
    saveBtn.addEventListener('click', function(){
        myListData.sort(function(a, b){
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });

        for(var i = 0; i < myListData.length; i++){
            for(var j = 0; j < STORAGE_DATA.length; j++){
                if(STORAGE_DATA[j].id === myListData[i].id){
                    STORAGE_DATA[j].checked = true;
                }
            }
        }

        console.log(STORAGE_DATA)
        localStorage.setItem(CHECK_LIST_DATA, JSON.stringify(STORAGE_DATA));
    });


    return{
        init
    }
})();

TripCheckList.init();

// 여기서 제어?