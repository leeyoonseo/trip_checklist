import CHECKLIST_DATA from './data';

// [TODO] CheckItem 하위에 index일때 중복해서 이름을 안쓸 방법?
import CheckItem from '../Components/CheckItem/';
import { deepCloneObject, isEmpty, isSupportedStorage } from './utill';

const LOCALSTORAGE_DATA = 'LOCALSTORAGE_DATA';
// localStorage.removeItem(LOCALSTORAGE_DATA);

const originalData = JSON.parse(localStorage.getItem(LOCALSTORAGE_DATA)) || deepCloneObject(CHECKLIST_DATA);

let checklistData = originalData.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
let viewData = deepCloneObject(checklistData);
const searchInput = getNode('#searchInput');
const saveBtn = document.querySelector('#listSaveBtn');
const enabledList = document.getElementById('enabledList');
const disabledList = document.getElementById('disabledList');
let enabledArr = [];
let disabledArr = [];

searchInput.focus();
searchInput.addEventListener('input', ({ target }) => {
    let { value } = target;
    let searchData = deepCloneObject(checklistData);

    if(isEmpty(value)){
        viewData = searchData;

    }else{
        viewData = searchData.filter((o) => {
            let { name } = o;
            name = removeWhiteSpace(name).toLowerCase();
            value = removeWhiteSpace(value).toLowerCase();

            if(name.includes(value)){
                return o;
            }
        });
    }

    CheckList.init(viewData);
});

function getNode(selectorStr){
    return document.querySelector(selectorStr);
}

saveBtn.addEventListener('click', () => {
    // let saveData = enabledArr.concat(disabledArr);
    // saveData = saveData.map((o) => o.itemData);

    // originalData.map((o) => {
    //     saveData.map((obj) => {
    //         if(o.id === obj.id){
    //             o.checked = obj.checked;
    //         }
    //     });
    // });
    if(isSupportedStorage('localStorage')){
        localStorage.setItem(LOCALSTORAGE_DATA, JSON.stringify(originalData));
    }


    // notification.text = MESSAGE.NOTI_TEXT_ERROR;

    // if(isSameData(CHECKLIST_DATA, checkListData)){
    //     notification.text = MESSAGE.NOTI_TEXT_NOT_MODIFY;       
    
    // }else{
    //     if(isSupportedStorage('localStorage')){
    //         localStorage.setItem(LOCALSTORAGE_DATA, JSON.stringify(checkListData));
    //         CHECKLIST_DATA = [...checkListData];

    //         notification.text = MESSAGE.NOTI_TEXT_SAVE;
    //     }
    // }
    
    // notification.open();
});

/**
 * 문자열 공백 제거
 * @param {String} str 
 */
function removeWhiteSpace(str){
    return str.replace(/ /gi, "");
}

const CheckList = {
    reset(){
        enabledList.innerHTML = '';
        disabledList.innerHTML = '';
    },

    init(data){
        this.reset();

        if(!isEmpty(data)){
            

            deepCloneObject(data).map((obj, i) => {
                const { checked } = obj;
 
                let item = new CheckItem({
                    data : obj,
                    clickabled : true,
                    addEvent : function(element, data){
                        const targetId = data.id;
                        let { checked } = data;

                        element.remove();

                        // My Checklist
                        if(checked){
                            for(var i = 0; i < enabledArr.length; i++){
                                const target = enabledArr[i];
                                const { itemData } = target;
                                const { id } = itemData;
                                
                                if(id === targetId){                           
                                    disabledArr.push(target);
                                    disabledList.append(target.el);

                                    // 아이템이 없음
                                    if(!enabledList.childNodes.length){
                                        enabledList.innerHTML = '<span class="empty">아이템이 없습니다.</span>';
                                    }
                                    
                                    const emptyTextNode = disabledList.querySelector('.empty');
                                    if(emptyTextNode){
                                        emptyTextNode.remove();
                                    }

                                    const removeIndex = enabledArr.findIndex(({ itemData }) => itemData.id === targetId);
                                    enabledArr.splice(removeIndex, 1);

                                    break;
                                }
                            }

                        // All CheckList
                        }else{

                            for(var i = 0; i < disabledArr.length; i++){
                                const target = disabledArr[i];
                                const { itemData } = target;
                                const { id } = itemData;

                                if(id === targetId){                           
                                    console.log(target)
                                    enabledArr.push(target);
                                    enabledList.append(target.el);

                                    // 아이템이 없음
                                    if(!disabledList.childNodes.length){
                                        disabledList.innerHTML = '<span class="empty">아이템이 없습니다.</span>';
                                    }

                                    const emptyTextNode = enabledList.querySelector('.empty');
                                    if(emptyTextNode){
                                        emptyTextNode.remove();
                                    }

                                    const removeIndex = disabledArr.findIndex(({ itemData }) => itemData.id === targetId);
                                    disabledArr.splice(removeIndex, 1);

                                    break;
                                }
                            }
                        }

                        data.checked = !checked;
                    }
                });

                if(checked){
                    enabledList.appendChild(item.el);
                    enabledArr.push(item);
                }else{
                    disabledList.appendChild(item.el);
                    disabledArr.push(item);
                }
            });
        }

    }
};

CheckList.init(checklistData);




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




// function isSameData(CHECKLIST_DATA, changedData) {
//     let sameCount = CHECKLIST_DATA.length;

//     changedData.sort();
//     CHECKLIST_DATA.map((obj, idx) => {
//         if(Object.is(obj.checked, changedData[idx].checked)){
//             sameCount--;
//         }
//     });

//     return sameCount ? false : true;
// }

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

// // polyfill
// if (!String.prototype.includes) {
//     String.prototype.includes = function(search, start) {
//         if (typeof start !== 'number') start = 0;
//         if (start + search.length > this.length) {
//             return false;
    
//         } else {
//             return this.indexOf(search, start) !== -1;
//         }
//     };
// };

    