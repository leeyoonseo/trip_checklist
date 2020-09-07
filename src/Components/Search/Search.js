import CHECKLIST_DATA from '../../js/data';
class Search {
    constructor(){
        this.name = 'Search';
        return this;
    }

    get init(){
        // const wrap = document.createElement('div');
        // const input = document.createElement('input');
        
        // wrap.classList = 'search';
        // input.id = 'searchInput';
        // input.classList.add('search-input');
        // input.placeholder = '검색어를 입력하세요.';
        // wrap.append(input);

        // this.wrap = wrap;
        // this.input = input;

        // return this;
    }

    set value(value){

    }
}

const t = new Search();


const searchInput = document.querySelector('#searchInput');

searchInput.addEventListener('input', ({ target }) => {
    const val = target.value;
    console.log(val);


});