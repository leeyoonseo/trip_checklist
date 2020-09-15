import CHECKLIST_DATA from './data';

// [TODO] CheckItem 하위에 index일때 중복해서 이름을 안쓸 방법?
import CheckItem from '../Components/CheckItem/';
import { deepCloneObject, isEmpty, isSupportedStorage } from './utill';


let checklistData = deepCloneObject(CHECKLIST_DATA).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
let viewData = deepCloneObject(checklistData);

const searchInput = getNode('#searchInput');
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
});

function getNode(selectorStr){
    return document.querySelector(selectorStr);
}

/**
 * 문자열 공백 제거
 * @param {String} str 
 */
function removeWhiteSpace(str){
    return str.replace(/ /gi, "");
}

const enabledList = document.getElementById('enabledList');
const disabledList = document.getElementById('disabledList');

const CheckList = {
    reset(){
        enabledList.innerHTML = '';
        disabledList.innerHTML = '';
    },

    // [...DEV_DATA].map((obj) => {
    //     const items = new CheckItem({
    //         data : obj,
    //         className : 'test',
    //         clickabled : true,
    //         clickFunction : function(){
    //             console.log('test');
    //         }
    //     });
    
    //     checkListNode.append(items.element.querySelector('div'));
    // });

    set(data){
        this.reset();

        if(isEmpty(data)){
            enabledList.innerHTML = getEmptyListStr();
            disabledList.innerHTML = getEmptyListStr();

        }else{
            deepCloneObject(data).map((obj, i) => {
                const { checked } = obj;
                let enabledArr = [];
                let disabledArr = [];
                let item = new CheckItem({
                    data : obj,
                    clickabled : true
                });

                if(checked){
                    item.addEvent = function(e, data){
                        console.log('true 입니다.', e, data);

                        // data.checked = false;
                    };

                    enabledList.appendChild(item.el);
                    enabledArr.push(item);
                }else{
                    item.addEvent = function(){
                        console.log('false 입니다.');
                    };

                    disabledList.appendChild(item.el);
                    disabledArr.push(item);
                }

                

                // last idx
                if((i + 1) === data.length){
                    // console.log('?')
                }

                // const item = new CheckItem({
                //     data : obj,
                //     clickabled : 
                // });
                // let listNode = obj.checked ? myListArea : allListArea;
                // item.element = obj;
                
                // // [TODO] 클릭할때마다 다시 새로고쳐지면 데이터 처리비용이..! 확인해보쟈!
                // item.element.querySelector('button').addEventListener('click', ({ target }) => {
                //     Object.values(checkListData).map((val) => {
                //         if(val.id === item.data.id){
                //             item.changeChecked = !val.checked;
                //         }
                //     });
                    
                //     setCheckList(checkListData);
                // });
        
                // listNode.append(item.element.querySelector('div'));
        
                // if((idx + 1) === data.length){
                //     if(allListArea.childNodes.length < 1){
                //         allListArea.innerHTML = getEmptyListStr();
                //     }
        
                //     if(myListArea.childNodes.length < 1){
                //         myListArea.innerHTML = getEmptyListStr();
                //     }
                // }
            });
        }

    }
}

CheckList.set(checklistData);



// import { APP_FLOW, MESSAGE } from './lang';
// import CheckItem from '../Components/CheckItem/CheckItem';
// import Notification from '../Components/Notification/';
// import getSearchData from '../Components/Search/';
// import '../../src/Components/Search/Search';

// const saveBtn = document.querySelector('#listSaveBtn');    
// const mainArea = document.querySelector('#mainArea');
// const menuArea = document.querySelector('#menuArea');
// const appMenuButton = document.querySelector('#appMenuButton');

// const notification = new Notification();

// document.body.append(notification.element);



// function getEmptyListStr(){
//     return '<div class="checklist__text--empty">아이템이 없습니다</div>';
// }

// searchInput.focus();

// searchInput.addEventListener('input', ({ target }) => {
//     const { value } = target;
//     let data = deepCloneObject(checkListData);

//     if(!isEmpty(value)){
//         data = getSearchData({
//             data, 
//             word : value
//         });
//     }
    
//     setListNode(data);
// });

// saveBtn.addEventListener('click', () => {
//     notification.text = MESSAGE.NOTI_TEXT_ERROR;

//     if(isSameData(CHECKLIST_DATA, checkListData)){
//         notification.text = MESSAGE.NOTI_TEXT_NOT_MODIFY;       
    
//     }else{
//         if(isSupportedStorage('localStorage')){
//             localStorage.setItem(LOCALSTORAGE_DATA, JSON.stringify(checkListData));
//             CHECKLIST_DATA = [...checkListData];

//             notification.text = MESSAGE.NOTI_TEXT_SAVE;
//         }
//     }
    
//     notification.open();
// });

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

    