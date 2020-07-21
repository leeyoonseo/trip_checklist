'use strict';

var TripCheckList = (function(){
    console.log('TripCheckList');
    var searchInput = document.querySelector('#searchInput');
    var saveBtn = document.querySelector('#saveButton');

    var myList = document.querySelector('.app__mylist .list__wrap');
    var list = document.querySelector('.app__list .list__wrap');
    var listData = [];
    var myListData = [];

    // [TODO]
    // 1.starage에 저장
    // 2.데이터가 있을 경우 사용
    var _data = [{"id":"C01","checked":false,"name":"여벌 옷"},{"id":"C02","checked":false,"name":"실내 복"},{"id":"C03","checked":false,"name":"수영복"},{"id":"C04","checked":false,"name":"모자"},{"id":"C05","checked":false,"name":"슬리퍼"},{"id":"C06","checked":false,"name":"샴푸&린스"},{"id":"C07","checked":false,"name":"바디워시"},{"id":"C08","checked":false,"name":"클렌징"},{"id":"C09","checked":false,"name":"스킨케어"},{"id":"C010","checked":false,"name":"마스크팩"},{"id":"C011","checked":false,"name":"드라이기&고데기"},{"id":"C012","checked":false,"name":"수건"},{"id":"C013","checked":false,"name":"화장품"},{"id":"C014","checked":false,"name":"여권"},{"id":"C015","checked":false,"name":"휴지&물티슈"},{"id":"C016","checked":false,"name":"카메라"},{"id":"C017","checked":false,"name":"충전기"},{"id":"C018","checked":false,"name":"노트북"},{"id":"C019","checked":false,"name":"선글라스"},{"id":"C020","checked":false,"name":"선크림"},{"id":"C021","checked":false,"name":"우산, 비옷"},{"id":"C022","checked":false,"name":"이어폰"},{"id":"C023","checked":false,"name":"비상약"},{"id":"C024","checked":false,"name":"서브가방"},{"id":"C025","checked":false,"name":"지퍼백"},{"id":"C026","checked":false,"name":"속옷"},{"id":"C027","checked":false,"name":"면도기"},{"id":"C028","checked":false,"name":"가이드북"},{"id":"C029","checked":false,"name":"돼지코"}];
    // var _data = [{"id":"C01","checked":false,"item":"여벌 옷"},{"id":"C02","checked":false,"item":"실내 복"},{"id":"C03","checked":false,"item":"수영복"},{"id":"C04","checked":false,"item":"모자"},{"id":"C05","checked":false,"item":"슬리퍼"},{"id":"C06","checked":false,"item":"샴푸&린스"},{"id":"C07","checked":false,"item":"바디워시"},{"id":"C08","checked":false,"item":"클렌징"},{"id":"C09","checked":false,"item":"스킨케어"},{"id":"C010","checked":false,"item":"마스크팩"},{"id":"C011","checked":false,"item":"드라이기&고데기"},{"id":"C012","checked":false,"item":"수건"},{"id":"C013","checked":false,"item":"화장품"},{"id":"C014","checked":false,"item":"여권"},{"id":"C015","checked":false,"item":"휴지&물티슈"},{"id":"C016","checked":false,"item":"카메라"},{"id":"C017","checked":false,"item":"충전기"},{"id":"C018","checked":false,"item":"노트북"},{"id":"C019","checked":false,"item":"선글라스"},{"id":"C020","checked":false,"item":"선크림"},{"id":"C021","checked":false,"item":"우산, 비옷"},{"id":"C022","checked":false,"item":"이어폰"},{"id":"C023","checked":false,"item":"비상약"},{"id":"C024","checked":false,"item":"서브가방"},{"id":"C025","checked":false,"item":"지퍼백"},{"id":"C026","checked":false,"item":"속옷"},{"id":"C027","checked":false,"item":"면도기"},{"id":"C028","checked":false,"item":"가이드북"},{"id":"C029","checked":false,"item":"돼지코"},];
    _data = _data.sort(function(a, b){
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
        for(var i = 0; i < _data.length; i++){
            // 내꺼
            if(_data[i].checked){
                myList.append(createMyListHTML(_data[i]))
                myListData.push(_data[i]);

            // 리스트
            }else{
                list.append(createListHTML(_data[i]))
                listData.push(_data[i]);
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

    function createListHTML(data){
        var wrap = document.createElement('div');
        var btn = document.createElement('button');
        var span = document.createElement('span');

        wrap.classList.add('list__items');
        wrap.innerText = data.name;
        // [TODO] id 추가한날짜시간초로 만들것
        btn.data = data;             
        btn.dataset.id = data.id;

        span.classList.add('hidden');
        span.innerText = '추가 버튼';

        btn.addEventListener('click', handlerItem);
        btn.append(span);
        wrap.append(btn);

        return wrap;    
    }

    function handlerItem(e){
        var target = e.target;
        var id = target.dataset.id;
        var targetNode = target.parentNode;
        var checked = target.data.checked;

        if(checked){
            for(var i = 0; i < myListData.length; i++){
                if(myListData[i].id === id){
                    listData.push(myListData.splice(i, 1)[0]);
                    break;
                }
            }

            list.append(targetNode);
        }else{
            for(var i = 0; i < listData.length; i++){
                if(listData[i].id === id){
                    myListData.push(listData.splice(i, 1)[0]);
                    break;
                }
            }
            myList.append(targetNode);
        }

        checked = !checked;
    }
    
    function createMyListHTML(data){
        var wrap = document.createElement('div');
        var btn = document.createElement('button');
        var span = document.createElement('span');

        wrap.classList.add('list__items');
        wrap.innerText = data.name;
        btn.data = data;             
        // [TODO] id 추가한날짜시간초로 만들것
        btn.dataset.id = data.id;

        span.classList.add('hidden');
        span.innerText = '삭제 버튼';

        btn.addEventListener('click', handlerItem);
        btn.append(span);
        wrap.append(btn);

        return wrap;    
    }

    saveBtn.addEventListener('click', function(){
        console.log('save');

        myListData.sort(function(a, b){
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });

        // [TODO] _data의 checked 수정 과정
        for(var i = 0; i < _data.length; i++){
            for(var j = 0; j < myListData.length; j++){
                if(_data[i].id === myListData[j].id){
                    _data[i].checked = true;
                
                }else{
                    _data[i].checked = false;
                }
            }
        }

        console.log(_data)
        // localStorage.setItem('tripChecklistData', _data);
    });

    return{
        init
    }
})();

TripCheckList.init();

// 여기서 제어?