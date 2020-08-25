import defaultData from '../dev/data';
import { APP_FLOW, MESSAGE } from './lang';
import { deepCloneObject, isEmpty, isSupportedStorage } from './utill';
import { CheckItem } from '../Components/CheckItem/';
import Notification from '../Components/Notification/';

console.log('edit',originalData);

const CHECKED_LOCAL_DATA = 'CHECKED_LOCAL_DATA';
let originalData = JSON.parse(localStorage.getItem(CHECKED_LOCAL_DATA)) || defaultData;
const backBtn = document.querySelector('#backBtn');
const allListArea = document.querySelector('#allListArea');
const editArea = document.querySelector('#editArea');
const editBtn = document.querySelector('#editBtn');
const addInput = document.querySelector('#addInput');

const notification = new Notification();

document.body.append(notification.element);

let checkListData = deepCloneObject(originalData).sort(function(a, b){
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
});

const setListNode = function(data){
    allListArea.innerHTML = '';

    if(isEmpty(data)) {
        allListArea.innerHTML = getEmptyListStr();

        return false;
    }

    [...data].map((obj, idx) => {
        const item = new CheckItem();
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

        allListArea.append(item.element.querySelector('div'));

        if((idx + 1) === data.length){
            if(allListArea.childNodes.length < 1){
                allListArea.innerHTML = getEmptyListStr();
            }
        }
    });
};

setListNode(checkListData);


backBtn.addEventListener('click', () => {
    window.history.back();
});

editBtn.addEventListener('click', ({ target }) => {
    console.log('edit');
    const { value } = editArea.classList;
    if(value.includes('editing')){
        editArea.classList.remove('editing');
        target.innerText = '추가/편집';

    }else{
        editArea.classList.add('editing');
        target.innerText = '저장';
        addInput.focus();

    }
});