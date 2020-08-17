export const deepCloneObject = function(obj) {
    if (obj === null || typeof(obj) !== 'object') return obj;
    let copy = obj.constructor();

    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            copy[attr] = deepCloneObject(obj[attr]);
        }
    }

    return copy;
};

export const isEmpty = function(target) {
    if(typeof target === 'object'){
        return (target.length < 1) ? true : false;
    }

    if(typeof target === 'string'){
        return (target === '') ? true : false;
    }

    return false;
};