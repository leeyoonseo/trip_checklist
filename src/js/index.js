import CHECKLIST_DATA from './data';

import CheckItem from '../Components/CheckItem/';
import Notification from '../Components/Notification/';
import { deepCloneObject, isEmpty, isSupportedStorage } from './utill';
import { APP_FLOW, MESSAGE } from './lang.js';

// TODO localStorage말고 CDN 방법 찾기
const LOCALSTORAGE_DATA = 'LOCALSTORAGE_DATA';
// localStorage.removeItem(LOCALSTORAGE_DATA);

const originData = JSON.parse(localStorage.getItem(LOCALSTORAGE_DATA)) || deepCloneObject(CHECKLIST_DATA);
const searchInput = getNode('#searchInput');
const saveBtn = document.querySelector('#listSaveBtn');
const enabledList = document.getElementById('enabledList');
const disabledList = document.getElementById('disabledList');
const notification = new Notification();

let checklistData = originData.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
let displayData = deepCloneObject(checklistData);
let enabledItemArr = [];
let disabledItemArr = [];

const CheckList = {
    reset(){
        enabledList.innerHTML = '';
        disabledList.innerHTML = '';
    },

    init(data){
        const emptyHtmlStr = '<span class="empty">아이템이 없습니다.</span>';

        this.reset();

        if(!isEmpty(data)){
            deepCloneObject(data).map((obj, i) => {
                const { checked } = obj;       
                let checkedArr = enabledItemArr;
                let checkedList = enabledList;
                let unCheckedArr = disabledItemArr;
                let unCheckedList = disabledList;
              
                let item = new CheckItem({
                    data : obj,
                    clickabled : true,
                    addEvent : function(element, data){
                        const { id, checked } = data;
                        
                        element.remove();

                        if(!checked){
                            checkedArr = disabledItemArr;
                            checkedList = disabledList;
                            unCheckedArr = enabledItemArr;
                            unCheckedList = enabledList;
                        }

                        handlerClick({
                            checkedArr, 
                            checkedList,
                            unCheckedArr,
                            unCheckedList, 
                            targetID : id
                        });

                        data.checked = !checked;
                    }
                });

                if(!checked){
                    checkedArr = disabledItemArr;
                    checkedList = disabledList;
                }

                checkedList.appendChild(item.el);
                checkedArr.push(item);

                // last
                if(i === (data.length - 1) ){
                    if(enabledItemArr.length === 0) enabledList.innerHTML = emptyHtmlStr;
                    if(disabledItemArr.length === 0) disabledList.innerHTML = emptyHtmlStr;
                }
            });

            function handlerClick({ 
                checkedArr, 
                checkedList, 
                unCheckedArr, 
                unCheckedList, 
                targetID 
            }){
                for(var i = 0; i < checkedArr.length; i++){
                    const target = checkedArr[i];
                    const { itemData } = target;
                    const { id } = itemData;
                    
                    if(id === targetID){                           
                        unCheckedArr.push(target);
                        unCheckedList.append(target.el);

                        if(!checkedList.childNodes.length){
                            checkedList.innerHTML = emptyHtmlStr;
                        }
                        
                        const emptyTextNode = unCheckedList.querySelector('.empty');
                        if(emptyTextNode){
                            emptyTextNode.remove();
                        }

                        const removeIndex = checkedArr.findIndex(({ itemData }) => itemData.id === targetID);
                        checkedArr.splice(removeIndex, 1);

                        break;
                    }
                }
            };

        }else{
            enabledList.innerHTML = emptyHtmlStr;
            disabledList.innerHTML = emptyHtmlStr;
        }
    }
};

CheckList.init(checklistData);

document.querySelector('body').append(notification.el);
searchInput.focus();
searchInput.addEventListener('input', ({ target }) => {
    let { value } = target;
    let searchData = deepCloneObject(checklistData);

    if(isEmpty(value)){
        displayData = searchData;

    }else{
        displayData = searchData.filter((o) => {
            let { name } = o;
            name = removeWhiteSpace(name).toLowerCase();
            value = removeWhiteSpace(value).toLowerCase();

            if(name.includes(value)){
                return o;
            }
        });
    }

    CheckList.init(displayData);
});

function getNode(selectorStr){
    return document.querySelector(selectorStr);
}

saveBtn.addEventListener('click', () => {
    let saveData = enabledItemArr.concat(disabledItemArr);
    saveData = saveData.map((o) => o.itemData);    
    
    if(isSameData(originData, saveData)){
        notification.text = MESSAGE.NOTI_TEXT_NOT_MODIFY;       
    
    }else{
        originData.map((o) => {
            saveData.map((obj) => {
                if(o.id === obj.id){
                    o.checked = obj.checked;
                }
            });
        });
    
        if(isSupportedStorage('localStorage')){
            localStorage.setItem(LOCALSTORAGE_DATA, JSON.stringify(originData));
            notification.text = MESSAGE.NOTI_TEXT_SAVE;
        }
    }

    notification.open();
});

/**
 * 문자열 공백 제거
 * @param {String} str 
 */
function removeWhiteSpace(str){
    return str.replace(/ /gi, "");
}

function isSameData(selectToCompareData, compareWithSelectData) {
    const copyData1 = deepCloneObject(selectToCompareData);
    const copyData2 = deepCloneObject(compareWithSelectData);

    let sameCount = copyData1.length;

    copyData1.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    copyData2.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);

    copyData1.sort().map((obj, idx) => {
        if(obj.checked === copyData2[idx].checked){
            sameCount--;
        }
    });

    return sameCount ? false : true;
}

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



//출처: https://uxgjs.tistory.com/170 [UX 공작소]
// import { APP_FLOW, MESSAGE } from './lang';
// import CheckItem from '../Components/CheckItem/CheckItem';
// import Notification from '../Components/Notification/';
// import getSearchData from '../Components/Search/';
// import '../../src/Components/Search/Search';

//     
// const mainArea = document.querySelector('#mainArea');
// const menuArea = document.querySelector('#menuArea');
// const appMenuButton = document.querySelector('#appMenuButton');

// const notification = new Notification();

// document.body.append(notification.element);

// appMenuButton.addEventListener('click', ({ target }) => {
//     // 메인
//     if(flow === APP_FLOW.MAIN){
//         menuArea.classList.add('on');
//         mainArea.classList.remove('on');
//         target.classList.add('header-menu__button-close');

//         flow = APP_FLOW.MENU_LIST;

//     // 메뉴
//     }else if(flow === APP_FLOW.MENU_LIST){
//         menuArea.classList.remove('on');
//         mainArea.classList.add('on');
//         target.classList.remove('header-menu__button-close');

//         flow = APP_FLOW.MAIN;
//     }
// });



    