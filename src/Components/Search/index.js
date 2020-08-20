// [TODO] 검색 기능 향상이나 라이브러리 찾아보기
const getSearchData = function({ data, word }){
    let arr = [];

    data.find(function(obj){
        if(obj.name.includes(word)){
            arr.push(obj);
        }
    });

    return arr;
};

export default getSearchData;