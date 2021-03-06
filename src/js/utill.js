const deepCloneObject = function(obj) {
    if (obj === null || typeof(obj) !== 'object') return obj;
    let copy = obj.constructor();

    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            copy[attr] = deepCloneObject(obj[attr]);
        }
    }

    return copy;
};

const isEmpty = function(target) {
    if(typeof target === 'object'){
        return (target.length < 1) ? true : false;
    }

    if(typeof target === 'string'){
        return (target === '') ? true : false;
    }

    return false;
};

// polyfill
const isSupportedStorage = function(type){
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

// TODO: 전체화면만들기
const getFullHeight = function(){
    return document.documentElement.clientHeight;
};

export {
    getFullHeight,
    deepCloneObject,
    isEmpty,
    isSupportedStorage,
}