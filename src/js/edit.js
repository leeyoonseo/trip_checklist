import defaultData from '../dev/data';
import { APP_FLOW, MESSAGE } from './lang';
import { deepCloneObject, isEmpty, isSupportedStorage } from './utill';
import { CheckItem } from '../Components/CheckItem/CheckItem';
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

const deleteBtn = document.querySelector('#deleteBtn');

var editingList;
var editedListData = deepCloneObject(originalData);
var deleteAfterListData = deepCloneObject(originalData);
var changeCounter = 0;

document.body.append(notification.element);
document.body.addEventListener('click', ({ target }) => {
    var { parentNode } = target;
    var { value } = parentNode.classList;
    var id = parentNode.dataset.id;

    var editingItems = document.querySelectorAll('.editing__item');
    Array.from(editingItems).map((o) => {
        var oId = o.dataset.id;

        // 수정영역 클릭 후 다른 영역 클릭하면
        if(id !== oId){
            console.log(123)
            var btn = o.querySelector('button');
            var input = o.querySelector('input');
            var nameNode = o.querySelector('.checkList__items-name')
            var val = input.value;

            nameNode.innerText = val;

            editedListData.map((e) => {
                if(e.id === oId){
                    e.name = val;
                    changeCounter++;
                }
            });

            btn.classList.remove('btn_edit_submit');
            input.remove();

            o.classList.remove('editing__item');            
        }
    });
    
})

const MODE = {
    ADD : 'ADD',
    DEFAULT : 'DEFAULT',
    DELETE : 'DELETE',
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
            var { parentNode } = target;
            
            // 수정 상태
            if(isStatus === MODE.EDIT){
                var { innerText } = parentNode;
                var input = document.createElement('input');
                
                parentNode.classList.add('editing__item');
                target.classList.add('btn_edit_submit');

                input.type = 'text';
                input.value = innerText;
                parentNode.append(input);

                input.focus();
            
            // 삭제 상태
            }else if(isStatus === MODE.DELETE){
                parentNode.remove();

                deleteAfterListData = deleteAfterListData.filter((e) => {
                    if(e.id !== parentNode.dataset.id){
                        return e;
                    }
                });

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
        // 저장
        if(changeCounter > 0){
            if(isSupportedStorage('localStorage')){
                localStorage.setItem(CHECKED_LOCAL_DATA, JSON.stringify(editedListData));
                notification.text = MESSAGE.NOTI_TEXT_SAVE;
                notification.open();
            }

            changeCounter = 0;

        }else{
            console.log('변화가 없다.');
        }


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

// [TODO] editing도 edit-ing로 변경
// 삭제버튼 클릭
deleteBtn.addEventListener('click', function(){
    editArea.classList.remove('editing');

    if(isStatus === MODE.DELETE){
        deleteBtn.innerText = '삭제';
        editArea.classList.remove('remove-ing');

        if(isSupportedStorage('localStorage')){
            localStorage.setItem(CHECKED_LOCAL_DATA, JSON.stringify(deleteAfterListData));
            console.log('deleteAfterListData',deleteAfterListData)
            notification.text = MESSAGE.NOTI_TEXT_SAVE;
            notification.open();
        }

        // changeCounter = 0;

        isStatus = MODE.DEFAULT;
    }else{
        deleteBtn.innerText = '저장';
        editArea.classList.add('remove-ing');

        isStatus = MODE.DELETE;
    }
});