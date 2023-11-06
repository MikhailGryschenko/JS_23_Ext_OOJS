export default class Slider {
    constructor({container = "",
    btns = null,
    modal = null,
    next = null,
    prev = null,
    activClass = '',
    animate,
    autoplay } = {}){
        this.container = document.querySelector(container);
        try {this.slides = this.container.children;} catch(e){}
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activClass = activClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
        this.modal = document.querySelectorAll(modal);
    }

}