import defaultData from '../dev/data';
import { APP_FLOW, MESSAGE } from './lang';
import { deepCloneObject, isEmpty, isSupportedStorage } from './utill';
import { CheckItem } from '../Components/CheckItem/';
import Notification from '../Components/Notification/';


const CHECKED_LOCAL_DATA = 'CHECKED_LOCAL_DATA';
let originalData = JSON.parse(localStorage.getItem(CHECKED_LOCAL_DATA)) || defaultData;
const backBtn = document.querySelector('#backBtn');
const allListArea = document.querySelector('#allListArea');
const editArea = document.querySelector('#editArea');
const editBtn = document.querySelector('#editBtn');
const openControlsBtn = document.querySelector('#openControlsBtn');
const addBtn = document.querySelector('#addBtn');
const addInput = document.querySelector('#addInput');
const notification = new Notification();

var editingList;

document.body.append(notification.element);
document.body.addEventListener('click', ({ target }) => {
    var { parentNode } = target;
    var { value } = parentNode.classList;
    var id = parentNode.dataset.id;

    var editingItems = document.querySelectorAll('.editing__item');
    Array.from(editingItems).map((o) => {
        var oId = o.dataset.id;

        if(id !== oId){
            var btn = o.querySelector('button');
            var input = o.querySelector('input');
            var nameNode = o.querySelector('.checkList__items-name')
            var val = input.value;
            console.log(val);

            nameNode.innerText = val;

            btn.classList.remove('btn_edit_submit');
            input.remove();

            o.classList.remove('editing__item');            
        }
    });
    
})

const MODE = {
    ADD : 'ADD',
    DEFAULT : 'DEFAULT',
    DELETD : 'DELETE',
    EDIT : 'EDIT',
};
let isStatus = 'DEFAULT'; 

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
            if(isStatus === MODE.DEFAULT) return false;

            // 수정 상태
            if(isStatus === MODE.EDIT){
                var { parentNode } = target;
                var { innerText } = parentNode;
                var prev = target.previousSibling;
                var originVal = parentNode.innerText;
                var { value } = parentNode.classList
                var input = document.createElement('input');
                
                parentNode.classList.add('editing__item');
                target.classList.add('btn_edit_submit');

                input.type = 'text';
                input.value = innerText;

                parentNode.append(input);

                input.focus();
                

            
            
            // 삭제 상태
            }else if(isStatus === MODE.DELETD){

            }else{
                Object.values(checkListData).map((val) => {
                    if(val.id === item.data.id){
                        item.changeChecked = !val.checked;
                    }
                });
                
                setListNode(checkListData);
            }

           
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


const addInputArea = document.querySelector('.controls-add');
const addListData = deepCloneObject(originalData);

openControlsBtn.addEventListener('click', ({ target }) => {
    if(isStatus === MODE.DEFAULT){
        target.classList.add('on');
        target.innerText = '닫기';

        addInputArea.style.display = 'block';
        isStatus = MODE.ADD;
        addInput.focus();

    }else if(isStatus === MODE.ADD){
        // TODO 네이밍바꾸기
        target.classList.remove('on');
        target.innerText = '추가';
        addInputArea.style.display = 'none';
        isStatus = MODE.DEFAULT;
    }
});

addBtn.addEventListener('click', () => {
    console.log('add');
    const value = addInput.value;

    if(value.trim() !== ''){
            const itemData = {
                id : 'S1',
                checked : false,
                name : value
            };
            const checkListData = deepCloneObject(originalData);   
            checkListData.push(itemData);

            allListArea.append(createItem(itemData));
            localStorage.setItem(CHECKED_LOCAL_DATA, JSON.stringify(checkListData));

            addInput.value = null;
            addInput.focus();
    }
});

editBtn.addEventListener('click', ({ target }) => {
    if(isStatus === MODE.EDIT){
        target.innerText = '편집';
        editArea.classList.remove('editing');
        isStatus = MODE.DEFAULT;

        // TODO  화살표 툴팁으로 버튼 클릭해서 바꾸는거 안내


    }else{
        target.innerText = '저장';
        editArea.classList.add('editing');
        isStatus = MODE.EDIT;
    }
});

addInput.addEventListener('keydown', (e) => {
    if(e.keyCode == 13){
        addBtn.click();
    }
});

function createItem(el){
    const item = new CheckItem();
    item.element = el;
    
    // [TODO] 클릭할때마다 다시 새로고쳐지면 데이터 처리비용이..! 확인해보쟈!
    item.element.querySelector('button').addEventListener('click', ({ target }) => {
        if(isStatus === 'ADD_MODE'){
            console.log('add입니다.');
        }else if(isStatus === 'EDIT_MODE'){
            console.log('edit입니다.');
        }
    });
    return item.element.querySelector('div');
}

// TODO id는 년월일시간분초까지