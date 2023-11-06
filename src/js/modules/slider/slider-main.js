import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor (btns, modal) {
        super (btns, modal);
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        Array.from(this.slides).forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';

        this.modal.forEach(item => {
            item.style.display = 'none';
            if(this.slideIndex === 3) {
                setTimeout(() => {
                    item.style.display = 'block';
                    item.classList.add('animated', 'fadeInUp')
                }, 3000);
            }
        });
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers() {
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        document.querySelectorAll('.prevmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            });
        });
        
        document.querySelectorAll('.nextmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();                    // Отменяем всплытие, т.к. next есть выше, срабатывает 2 раза и перелистывает на 2 вперёд.
                e.preventDefault();
                this.plusSlides(1);
            });
        });
    }

    render() {
        if(this.container) {

            this.showSlides(this.slideIndex);
            this.bindTriggers();

        }
    }
}