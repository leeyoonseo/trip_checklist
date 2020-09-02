import defaultData from '../dev/data';
import { APP_FLOW, MESSAGE } from './lang';
import { deepCloneObject, isEmpty, isSupportedStorage } from './utill';
import { CheckItem, UserItem, TotalItem } from '../Components/CheckItem/';
import Notification from '../Components/Notification/';
import getSearchData from '../Components/Search/';

console.log('index');

const CHECKED_LOCAL_DATA = 'CHECKED_LOCAL_DATA';

// flow 필요없으면 삭제
let flow = APP_FLOW.MAIN;

// [D] 테스트 도중 데이터 삭제
// localStorage.removeItem(CHECKED_LOCAL_DATA);

let originalData = JSON.parse(localStorage.getItem(CHECKED_LOCAL_DATA)) || defaultData;
const myListArea = document.querySelector('#myListArea');
const allListArea = document.querySelector('#allListArea');
const searchInput = document.querySelector('#searchInput');
const saveBtn = document.querySelector('#listSaveBtn');    
const mainArea = document.querySelector('#mainArea');
const menuArea = document.querySelector('#menuArea');
const menuBtn = document.querySelector('#menuBtn');
const notification = new Notification();

document.body.append(notification.element);
let checkListData = deepCloneObject(originalData).sort(function(a, b){
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
});

const setListNode = function(data){
    allListArea.innerHTML = '';
    myListArea.innerHTML = '';

    if(isEmpty(data)) {
        allListArea.innerHTML = getEmptyListStr();
        myListArea.innerHTML = getEmptyListStr();

        return false;
    }

    [...data].map((obj, idx) => {
        const item = new CheckItem();
        let listNode = obj.checked ? myListArea : allListArea;
        item.element = obj;
        
        // [TODO] 클릭할때마다 다시 새로고쳐지면 데이터 처리비용이..! 확인해보쟈!
        item.element.querySelector('button').addEventListener('click', ({ target }) => {
            Object.values(checkListData).map((val) => {
                if(val.id === item.data.id){
                    item.changeChecked = !val.checked;
                }
            });
            
            setListNode(checkListData);
        });

        listNode.append(item.element.querySelector('div'));

        if((idx + 1) === data.length){
            if(allListArea.childNodes.length < 1){
                allListArea.innerHTML = getEmptyListStr();
            }

            if(myListArea.childNodes.length < 1){
                myListArea.innerHTML = getEmptyListStr();
            }
        }
    });
};

setListNode(checkListData);

function getEmptyListStr(){
    return '<div class="checklist__text--empty">아이템이 없습니다</div>';
}

searchInput.focus();

searchInput.addEventListener('input', ({ target }) => {
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

saveBtn.addEventListener('click', () => {
    notification.text = MESSAGE.NOTI_TEXT_ERROR;

    if(isSameData(originalData, checkListData)){
        notification.text = MESSAGE.NOTI_TEXT_NOT_MODIFY;       
    
    }else{
        if(isSupportedStorage('localStorage')){
            localStorage.setItem(CHECKED_LOCAL_DATA, JSON.stringify(checkListData));
            originalData = [...checkListData];

            notification.text = MESSAGE.NOTI_TEXT_SAVE;
        }
    }
    
    notification.open();
});

function isSameData(originalData, changedData) {
    let sameCount = originalData.length;

    changedData.sort();
    originalData.map((obj, idx) => {
        if(Object.is(obj.checked, changedData[idx].checked)){
            sameCount--;
        }
    });

    return sameCount ? false : true;
}

menuBtn.addEventListener('click', ({ target }) => {
    // 메인
    if(flow === APP_FLOW.MAIN){
        menuArea.classList.add('on');
        mainArea.classList.remove('on');
        target.classList.add('header-menu__button-close');

        flow = APP_FLOW.MENU_LIST;

    // 메뉴
    }else if(flow === APP_FLOW.MENU_LIST){
        menuArea.classList.remove('on');
        mainArea.classList.add('on');
        target.classList.remove('header-menu__button-close');

        flow = APP_FLOW.MAIN;
    }
});

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

    