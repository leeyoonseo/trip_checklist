export const clone = function(obj) {
    if (obj === null || typeof(obj) !== 'object') return obj;
    let copy = obj.constructor();

    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            copy[attr] = clone(obj[attr]);
        }
    }

    return copy;
}