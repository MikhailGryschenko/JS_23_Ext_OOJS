export default class Slider {
    constructor({container = "", btns = null, modal = null, next = null, prev = null} = {}){
        this.container = document.querySelector(container);
        this.slides = this.container.children;
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.slideIndex = 1;
        this.modal = document.querySelectorAll(modal);
    }

}