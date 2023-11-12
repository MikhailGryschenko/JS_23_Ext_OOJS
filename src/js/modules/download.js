export default class Download {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);
        this.path = 'assets/img/mainbg.jpg';            // в будущем в зависимости от кнопки мы можем подставлять разные пути (с помощью case, например)
    }

    downloadItem(path) {
        const link = document.createElement('a');       // создаём ссылку

        link.setAttribute('href', path);                // добавляем необходимые аттрибуты
        link.setAttribute('download', 'nice_picture');

        link.style.display = 'none';                // делаем элемент невидимым
        document.body.appendChild(link);            // помещаем его на страницу

        link.click();                       // вызываем событие клик на нашем элементе

        document.body.removeChild(link);           // убираем элемент со страницы
    }

    init() {
        this.btns.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.downloadItem(this.path);
            })
        });
    }

}