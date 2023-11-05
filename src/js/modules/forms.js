export default class Form {
    constructor(forms) {                                // в скобки можно добавить url
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');  // получим все инпуты, чтобы можно было с ними работать (очищать после отправки, например)
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с Вами свяжемся!',
            failure: 'Что-то пошло не так...'
        };
        this.path = 'assets/question.php';              // сюда вместо фиксированного адреса можно подставить url
    }

    clearInputs() {
        this.inputs.forEach(item => {
            item.value = '';
        });
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');
    
        mailInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {         // нельзя кириллицу, можно латинские, @ и точку (её мы экранировали)
                    e.preventDefault();
                }
            });
        });
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {                   // проверяем есть ли такой метод (старые браузеры не поддерживают)
                elem.setSelectionRange(pos, pos);           // применяем его, если начало и конец выделения совпадают, то это будет просто курсор
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),            // заменяем все НЕ цифры на пустую строку
                val = this.value.replace(/\D/g, '');        // то, что вводит пользователь
            
            if (def.length >= val.length) {              // чтобы не удалили +1
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {     // заменяем каждый символ на значение, которое вернёт колбэк функция для каждого символа
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition (this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();        // читает ответ и возвращает как обычный текст
    }

    init() {
        this.checkMailInputs();

        this.initMask();
        
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                item.parentNode.appendChild(statusMessage); //к родительскому блоку, кот будет в форме, мы добавляем блок, кот только что создали

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(item);    //внутрь помещаем саму форму, на которой произошло событие

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000)
                    });
            });
        });
    }
}