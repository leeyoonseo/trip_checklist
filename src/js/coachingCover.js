class coachingCover {
    constructor(){
        this.el = this.create();

        return this;
    }

    create(){
        const cover = document.createElement('div');
        const inner = document.createElement('div');
        const nav = document.createElement('div');
        const close = document.createElement('div');
        const closeButton = document.createElement('button');


        cover.classList.add('coaching-cover');
        inner.classList.add('coaching-cover__inner');
        nav.classList.add('coaching-cover__nav');
        close.classList.add('coaching-cover__close');
        closeButton.innerText = '닫기';

        close.append(closeButton);
        inner.append(nav).append(close);
        cover.append(inner);

        return cover;
    }
}

export default coachingCover;