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

export const isEmptyData = function(data) {
    return (data.length < 1) ? true : false;
};