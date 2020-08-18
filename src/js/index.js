import data from './data';
import { APP_FLOW, MESSAGE } from './lang';
import { deepCloneObject, isEmpty, storageAvailable } from './utill';
import { CheckItem, UserItem, TotalItem } from './CheckItem';
import { getSearchData } from './Search';

const CHECKED_LOCAL_DATA = 'CHECKED_LOCAL_DATA';
const originalData = localStorage.getItem(CHECKED_LOCAL_DATA) || data;
const myListNode = document.querySelector('#myListNode');
const allListNode = document.querySelector('#allListNode');
const searchInputNode = document.querySelector('#searchInput');
const saveBtnNode = document.querySelector('#listSave');    

let checkListData = deepCloneObject(originalData).sort(function(a, b){
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
});



const setListNode = function(data){
    allListNode.innerHTML = '';
    myListNode.innerHTML = '';

    if(isEmpty(data)) {
        allListNode.innerHTML = getEmptyListStr();
        myListNode.innerHTML = getEmptyListStr();

        return false;
    }

    [...data].map((obj, idx) => {
        const item = new UserItem();
        let listNode = obj.checked ? myListNode : allListNode;
        item.itemElement = obj;
        
        // [TODO] 클릭할때마다 다시 새로고쳐지면 레거시는???
        item.itemElement.querySelector('button').addEventListener('click', ({ target }) => {
            Object.values(checkListData).map((val) => {
                if(val.id === item.data.id){
                    item.changeChecked = !val.checked;
                }
            });
            
            setListNode(checkListData);
        });

        listNode.append(item.itemElement.querySelector('div'));

        if((idx + 1) === data.length){
            if(allListNode.childNodes.length < 1){
                allListNode.innerHTML = getEmptyListStr();
            }

            if(myListNode.childNodes.length < 1){
                myListNode.innerHTML = getEmptyListStr();
            }
        }
    });
};

setListNode(checkListData);

function getEmptyListStr(){
    return '<div class="checklist__text--empty">아이템이 없습니다</div>';
}

searchInputNode.focus();

searchInputNode.addEventListener('input', ({ target }) => {
    const { value } = target;
    let data = deepCloneObject(checkListData);

    if(!isEmpty(value)){
        data = getSearchData({
            data, 
            word : value
        });
    }
    
    setListNode(data);
});

// const notification = new Notification();
saveBtnNode.addEventListener('click', () => {
    console.log('save')
    if(storageAvailable('localStorage')){
        // localStorage.setItem(MESSAGE.CHECK_LIST_DATA, JSON.stringify(checkedData));
        // notification.open({ 
        //     text : MESSAGE.NOTI_TEXT_SAVE
        // });

    }else {
        // notification.open({
        //     text : MESSAGE.NOTI_TEXT_ERROR
        // });
    }
});



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



    


    // [TODO] 매번 데이터를 새로 그리지 않도록 해야하는데, 방법을 찾아보자!!
    

    

    // polyfill
    

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

    