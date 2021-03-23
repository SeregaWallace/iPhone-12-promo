document.addEventListener('DOMContentLoaded', () => {



    const getData = (url, callback) => {
        const request = new XMLHttpRequest(); 
        request.open('GET', url);
        request.send();
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                const response = JSON.parse(request.response);
                callback(response);
            } else {
                connsole.error(new Error('Error:' + request.status));
            }
        });
    };

    const tabs = () => {
        const cardDetailsChangeElems = document.querySelectorAll('.card-detail__change'),
            cardDetailsTitleElem = document.querySelector('.card-details__title'),
            cardImageItemElem = document.querySelector('.card__image_item'),
            cardDetailsPriceElem = document.querySelector('.card-details__price'),
            descriptionMemoryElem = document.querySelector('.description__memory');


        const data = [
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
                img: 'img/iPhone-graphite.png',
                price: 1250,
                memoryROM: 128,
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
                img: 'img/iPhone-silver.png',
                price: 1350,
                memoryROM: 256,
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
                img: 'img/iPhone-blue.png',
                price: 1450,
                memoryROM: 128,
            },
        ];

        const deactivatedClasses = () => {
            cardDetailsChangeElems.forEach(btn => btn.classList.remove('active'));
        };

        cardDetailsChangeElems.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                if (!btn.classList.contains('active')) {
                    deactivatedClasses();
                    btn.classList.add('active');

                    cardDetailsTitleElem.textContent = data[i].name;
                    cardImageItemElem.src = data[i].img;
                    cardImageItemElem.alt = data[i].name;
                    cardDetailsPriceElem.textContent = data[i].price + '$';
                    descriptionMemoryElem.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`;
                }
            });
        });
    };

    const accordion = () => {
        const haracteristicsListElem = document.querySelector('.characteristics__list'),
            characteristicsItemsElems = document.querySelectorAll('.characteristics__item');

        // add to html class 'active', if you need to open first elem

        // characteristicsItemsElems.forEach(elem => {
        //     if (elem.children[1].classList.contains('active')) {
        //         elem.children[1].style.height = `${elem.children[1].scrollHeight}px`;
        //     }
        // })

        const openHaracteristics = (btn, dropDown) => {
            closeAllDrops(btn, dropDown);
            dropDown.style.height = `${dropDown.scrollHeight}px`;
            btn.classList.add('active');
            dropDown.classList.add('active');
        };
    
        const closeHaracteristics = (btn, dropDown) => {
            btn.classList.remove('active');
            dropDown.classList.remove('active');
            dropDown.style.height = '';
        };

        const closeAllDrops = (btn, dropDown) => {
            characteristicsItemsElems.forEach(elem => {
                if (elem.children[0] !== btn && elem.children[1] !== dropDown) {
                    closeHaracteristics(elem.children[0], elem.children[1]);
                }
            });
        };
        
        haracteristicsListElem.addEventListener('click', event => {
            const target = event.target;
        
            if (target.classList.contains('characteristics__title')) {
                const parent = target.closest('.characteristics__item');
                const description = parent.querySelector('.characteristics__description');
                description.classList.contains('active') ?
                    closeHaracteristics(target, description) : openHaracteristics(target, description);
            }
        });

        document.body.addEventListener('click', event => {
            const target = event.target;
            if (!target.closest('.characteristics__list')) {
                closeAllDrops();
            }
        })
    };

    const modal = () => {
        const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy'),
            cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery'),
            modalWindow = document.querySelector('.modal'),
            modalTitle = document.querySelector('.modal__title'),
            cardDetailsTitleElem = document.querySelector('.card-details__title'),
            modalSubTitleElem = document.querySelector('.modal__subtitle'),
            modalTitleSubmit = document.querySelector('.modal__title-submit');

        const openModal = event => {
            const target = event.target;
            modalWindow.classList.add('open');
            document.addEventListener('keydown', escapeHandler);
            modalTitle.textContent = cardDetailsTitleElem.textContent;
            modalTitleSubmit.value = cardDetailsTitleElem.textContent;
            modalSubTitleElem.textContent = target.dataset.buttonBuy;
        };

        const closeModal = () => {
            modalWindow.classList.remove('open');
            document.removeEventListener('keydown', escapeHandler);
        };

        const escapeHandler = event => {
            if (event.code === 'Escape') {
                closeModal();
            }
        };

        modalWindow.addEventListener('click', event => {
            const target = event.target;
            if (target.classList.contains('modal__close') || target === modalWindow) {
                closeModal();
            }
        });

        cardDetailsButtonBuy.addEventListener('click', openModal);
        cardDetailsButtonDelivery.addEventListener('click', openModal);

    };

    const renderCrossSell = () => {
        const crossSellList = document.querySelector('.cross-sell__list');
        const crossSellMore = document.querySelector('.cross-sell__more');
        const shuffle = arr => arr.sort(() => Math.random() - 0.5);

        const createCrossSellItem = good => {
            const liElem = document.createElement('li');
            liElem.innerHTML = `
                <article class="cross-sell__item">
                    <img class="cross-sell__image" src="${good.photo}" alt="${good.name}">
                    <h3 class="cross-sell__title">${good.name}</h3>
                    <p class="cross-sell__price">${good.price}$</p>
                    <button type="button" class="button button_buy cross-sell__button">Купить</button>
                </article>
            `;
            return liElem;
        };

        const renderMore = arr => {
            arr.forEach(item => {
                crossSellList.append(createCrossSellItem(item));
            });
        };

        const createCrossSellList = goods => {
            const shuffleGoods = shuffle(goods);
            const fourGoods = shuffleGoods.splice(0, 4);
            renderMore(fourGoods);
        };

        // crossSellMore.addEventListener('click', () => {
        //     renderMore(arr);
        // });

        getData('cross-sell-dbase/dbase.json', createCrossSellList);
    };

    
    tabs();
    accordion();
    modal();
    renderCrossSell();
    amenu('.header__menu', '.header-menu__list', '.header-menu__item', '.header-menu__burger');
});