
// TODO 데이터를 여기서 최초로 만들어야함
import DEV_DATA from '../dev/data';

const LOCALSTORAGE_DATA = 'LOCALSTORAGE_DATA';

// [D] 테스트 도중 데이터 삭제
// localStorage.removeItem(CHECKED_LOCAL_DATA);
const CHECKLIST_DATA = JSON.parse(localStorage.getItem(LOCALSTORAGE_DATA)) || DEV_DATA;

export default CHECKLIST_DATA;

