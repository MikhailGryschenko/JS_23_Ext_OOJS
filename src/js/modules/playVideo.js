export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);     //!!! мы жёстко привязываем контекст вызова к этому методу и этому классу
    }

    bindTriggers() {
        this.btns.forEach((btn, i) => {
            try {
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;

                if(i % 2 == 0) {
                    blockedElem.setAttribute('data-disabled', 'true');
                }
            } catch(e){}

            btn.addEventListener('click', () => {
                if(!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
                    this.activeBtn = btn;

                    if(document.querySelector('iframe#frame')) {      // если вызвано модальное окно
                        this.overlay.style.display = 'flex';
                        if(this.path !== btn.getAttribute('data-url')) {        // проверяем, чтобы было вызвано другое видео, а не снова это же
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path});
                        }
                    } else {                                          // если ещё не вызвано модальное окно
                        this.path = btn.getAttribute('data-url');   // то создаём новое инициализирующее свойство this.path, которое принимает дата урл из той кнопки, по которой был произведён клик
                        this.createPlayer(this.path);               // и будем создавать плеер
                    }
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
              }
        });

        this.overlay.style.display = 'flex';
    }

    onPlayerStateChange(state) {            //метод будет срабатывать каждый раз, когда будет изменяться состояние нашего плеера
        try {
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
    
            if(state.data === 0) {          // из документации YouTube Player API, 0 - это когда видео завершено
                if(blockedElem.querySelector('.play__circle').classList.contains('closed')) {
                    blockedElem.querySelector('.play__circle').classList.remove('closed');
                    blockedElem.querySelector('svg').remove();
                    blockedElem.querySelector('.play__circle').appendChild(playBtn);
                    blockedElem.querySelector('.play__text').textContent = 'play video';
                    blockedElem.querySelector('.play__text').classList.remove('attention');
                    blockedElem.style.opacity = 1;
                    blockedElem.style.filter = 'none';
    
                    blockedElem.setAttribute('data-disabled', 'false');
                }
            }
        } catch(e){}
    }

    init() {
        if(this.btns.length > 0) {
            const tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}