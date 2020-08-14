import data from './data';
import { APP_FLOW, MESSAGE } from './lang';
import { deepCloneObject, isEmptyData } from './utill';
import { UserItem, TotalItem } from './CheckItem';

const CHECKED_LOCAL_DATA = 'CHECKED_LOCAL_DATA';
const originalData = localStorage.getItem(CHECKED_LOCAL_DATA) || data;
const myListNode = document.querySelector('#myListNode');
const allListNode = document.querySelector('#allListNode');
const searchInputNode = document.querySelector('#searchInput');
const saveBtnNode = document.querySelector('#listSave');    

searchInputNode.focus();

let checkListData = deepCloneObject(originalData).sort(function(a, b){
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
});

const setListNode = function(){
    allListNode.innerHTML = '';
    myListNode.innerHTML = '';

    if(isEmptyData(checkListData)) return false;

    checkListData.map((obj, idx) => {
        let listNode = allListNode;
        let itemOpt = {
            data : obj, 
            callback : setListNode 
        }
        let item = new TotalItem(itemOpt);

        if(obj.checked){
            listNode = myListNode;
            item = new UserItem(itemOpt);
        }

        listNode.append(item.node);

        if(idx === checkListData.length){
            allListNode.childNodes.length < 1 && setEmptyList(allListNode);
            myListNode.childNodes.length < 1 && setEmptyList(myListNode);
        }
    });
};

setListNode();

function setEmptyList(targetNode){
    const wrapNode = document.createElement('div');
    wrapNode.classList.add('checklist__text--empty');
    wrapNode.innerText = '아이템이 없습니다';
    targetNode.append(wrapNode);
}




    // const expired = localStorage.getItem('expired') || false;

   

    // init
    // const bodyNode = document.querySelector('body');
    // const coachingNode = document.querySelector('#coachingCover');
    // const coachingCloseNode = document.querySelector('#coachingCover');
    // const listEditNode = document.querySelector('#listEdit');
    // const appEditNode = document.querySelector('#appEdit');

    

    // localStorage.removeItem('expired');
    // localStorage.removeItem('isFirstVisit');
    // if(localStorage.getItem('isFirstVisit') === null){
        // coachingNode.classList.add('on');

        // coachingCloseNode.addEventListener('click', function(){
        //     // coachingNode.classList.remove('on');
        //     localStorage.setItem('isFirstVisit', true);
        // });
    // }

    

    // handler    
    // const notification = new Notification();
    // saveBtnNode.addEventListener('click', function(){
    //     if(storageAvailable('localStorage')){
    //         localStorage.setItem(MESSAGE.CHECK_LIST_DATA, JSON.stringify(checkedData));
    //         notification.open({ 
    //             text : MESSAGE.NOTI_TEXT_SAVE
    //         });

    //     }else {
    //         notification.open({
    //             text : MESSAGE.NOTI_TEXT_ERROR
    //         });
    //     }
    // });

    // searchInputNode.addEventListener('input', function(e){
    //     const val = e.target.value;
    //     let searchData = clone(checkedData);
        
    //     if(val !== ''){
    //         searchData = setSearchData(checkedData, val);
    //     }

    //     appendToBody(searchData);
    // });

    // listEditNode.addEventListener('click', function(){
    //     appEditNode.calssList.add('on');
    //     setEditAllList();
    // });


    // const editListNode = document.querySelector('#editList');
    
    // // [TODO] 제거할 것
    // setEditAllList();

    // function setEditAllList(){
    //     if(hasData(checkedData)){
    //         checkedData.map(function(obj) {
    //             let item = new CheckItem(obj);
    //             // editListNode.append(item.node);
    //         });
    //     }

    //     // setEmptyList();
    // }



    // function setSearchData(data, val){
    //     let arr = [];

    //     data.find(function(obj){
    //         if(obj.name.includes(val)){
    //             arr.push(obj);
    //         }
    //     });

    //     return arr;
    // };


    // [TODO] 매번 데이터를 새로 그리지 않도록 해야하는데, 방법을 찾아보자!!
    

    

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

    