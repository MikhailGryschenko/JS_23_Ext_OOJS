import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import VideoPlayer from "./modules/playVideo";
import Difference from "./modules/difference";
import Form from "./modules/forms";

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({container: '.page', btns: '.next', modal: '.hanson'});
    slider.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activClass: 'feed__item-active'
    });
    feedSlider.init();

    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();

/*     const difference = new Difference('.officerold', '.officernew', '.officer__card-item');
    difference.init(); */
    new Difference('.officerold', '.officernew', '.officer__card-item').init(); // можно так, этот экземпляр один раз отработает и больше не пригодится нам
    new Form('.form').init();
});