(() => {

    let burgerWidth = 0;
    let lastItemWidth = 0;

    const init = (menu, menuList, itemsMenu, burgerMenu) => {
        itemsMenu.forEach(elem => {
            elem.classList.add('amenu__item');
        });

        burgerMenu.classList.add('amenu__burger');

        const [burgerBtn, burgerList] = createBurgerMenu(burgerMenu);

        updateMenu(menu, menuList, burgerBtn, burgerList, burgerMenu);

        window.addEventListener('resize', () => {
            updateMenu(menu, menuList, burgerBtn, burgerList, burgerMenu);
        });
    };

    const createBurgerMenu = (parentBurger) => {
        const burgerBtn = document.createElement('button');
        parentBurger.append(burgerBtn);
        burgerBtn.classList.add('amenu__burger-btn');

        burgerBtn.addEventListener('click', () => {
            parentBurger.classList.toggle('amenu__burger-open');
        })

        const burgerList = document.createElement('ul');
        parentBurger.append(burgerList);
        burgerList.classList.add('amenu__burger-list');

        return [burgerBtn, burgerList];
    };

    const updateMenu = (menu, menuList, burgerBtn, burgerList, burgerMenu) => {
        menuItems = menuList.querySelectorAll('.amenu__item');
        burgerItems = burgerList.querySelectorAll('.amenu__item');

        const menuWidth = menu.offsetWidth;
        burgerWidth = burgerMenu.offsetWidth || burgerWidth;

        const widthAllItems = [...menuItems].reduce((acc, elem) => {
            return acc + elem.offsetWidth + parseFloat(getComputedStyle(elem).marginRight);
        }, 0) + burgerWidth;

        if (menuWidth < widthAllItems) {
            const lastItem = menuItems[menuItems.length - 1];
            lastItemWidth = lastItem.offsetWidth + parseFloat(getComputedStyle(lastItem).marginRight);
            burgerList.prepend(lastItem);

            return updateMenu(menu, menuList, burgerBtn, burgerList, burgerMenu);
        }

        if (menuWidth > widthAllItems + lastItemWidth && burgerItems.length) {
            const firstElem = burgerItems[0];
            menuList.append(firstElem);

            return updateMenu(menu, menuList, burgerBtn, burgerList, burgerMenu);
        }

        // if (burgerItem.length) {
        //     burgerMenu.style.display = '';
        // } else {
        //     burgerMenu.style.display = 'none';
        // }

        checkBurgerItems(burgerBtn, burgerItems.length);
    };

    const checkBurgerItems = (burgerBtn, burgerItemsCount) => {
        if (burgerItemsCount) {
            burgerBtn.classList.add('amenu__burger-btn_active');
        } else {
            burgerBtn.classList.remove('amenu__burger-btn_active');
        }
    };

    window.amenu = (slMenu, slMenuList, slItemsMenu, slBurgerMenu) => {
        const menu = document.querySelector(slMenu),
            menuList = document.querySelector(slMenuList),
            itemsMenu = document.querySelectorAll(slItemsMenu),
            burgerMenu = document.querySelector(slBurgerMenu);

        init(menu, menuList, itemsMenu, burgerMenu);
    };

})()