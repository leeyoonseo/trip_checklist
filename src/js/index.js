import CHECKLIST_DATA from './data';

import CheckItem from '../Components/CheckItem/';
import Notification from '../Components/Notification/';
import { deepCloneObject, isEmpty, isSupportedStorage } from './utill';
import { MESSAGE } from './lang.js';

// TODO localStorage말고 CDN 방법 찾기
const LOCALSTORAGE_DATA = 'LOCALSTORAGE_DATA';
// localStorage.removeItem(LOCALSTORAGE_DATA);

const originData = JSON.parse(localStorage.getItem(LOCALSTORAGE_DATA)) || deepCloneObject(CHECKLIST_DATA);
const searchInput = getNode('#searchInput');
const saveBtn = document.querySelector('#listSaveBtn');
const addBtn = document.querySelector('#addListBtn');
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

let addInput;
let addItem;
addBtn.addEventListener('click', ({ target }) => {
    if(target.classList.contains('on')){
        target.classList.remove('on');

        if(addInput){
            addItem = addInput.value;
            console.log(addItem)
            if(addItem !== ''){
                createID();

            }

            addInput.remove();
            // addInput = null;
        }

    }else{
        target.classList.add('on');

        addInput = document.createElement('input');
        addInput.id = 'addItem';
        addInput.classList.add('checklist_input--add');
        addInput.placeholder = '아이템을 추가해주세요.';
        target.append(addInput);
        addInput.focus();
    }
});

createID();

function createID(){
    let today = new Date();
    let todayArr = String(today).split(' ')
    let month = todayArr[1].substr(0, 1);
    let day = todayArr[2];
    let year = todayArr[3].substr(2, 2);
    let time = todayArr[4].split(':');
    let h = time[0];
    let m = time[1];
    let s = time[2];
// S20-28-
    let id;

    id = `${month}${year}-${day}-${h}.${m}.${s}`;
    console.log(id)
    

}

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