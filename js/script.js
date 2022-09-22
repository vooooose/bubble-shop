const items = [{
        title: 'mixtape - stray kids - debut album',
        price: 31.95,
        img: '../img/1.jpg',
        date: '2018-0-8'
    },
    {
        title: 'i am not - stray kids - 1st mini album',
        price: 31.95,
        img: '../img/2.jpg',
        date: '2018-2-26'
    },
    {
        title: 'i am who - stray kids - 2nd mini album',
        price: 33.95,
        img: '../img/3.jpg',
        date: '2018-7-6'
    },
    {
        title: 'i am you - stray kids - 3rd mini album',
        price: 33.95,
        img: '../img/4.jpg',
        date: '2018-9-22'
    },
    {
        title: 'clé 1: miroh - stray kids - mini album',
        price: 29.95,
        img: '../img/5.jpg',
        date: '2019-2-25'
    },
    {
        title: 'clé 2: yellow wood - stray kids - special album',
        price: 29.95,
        img: '../img/6.jpg',
        date: '2019-5-19'
    },
    {
        title: 'clé: levanter - stray kids',
        price: 32.95,
        img: '../img/7.jpg',
        date: '2019-11-9'
    },
    {
        title: 'GO生 (go live) - stray kids - 1st studio album',
        price: 38.95,
        img: '../img/8.jpg',
        date: '2020-5-17'
    },
    {
        title: 'IN生 (in life) - stray kids - 1st studio album repackage',
        price: 39.95,
        img: '../img/9.jpg',
        date: '2020-8-14'
    },
    {
        title: 'noeasy - stray kids - 2nd studio album',
        price: 29.95,
        img: '../img/10.jpg',
        date: '2021-7-23'
    },
    {
        title: 'christmas evel (limited ver.) - stray kids - holiday special single',
        price: 33.95,
        img: '../img/11.jpg',
        date: '2021-10-29'
    },
    {
        title: 'christmas evel (standard ver.) - stray kids - holiday special single',
        price: 33.95,
        img: '../img/12.jpg',
        date: '2021-10-29'
    },
    {
        title: 'oddinary (standard ver.) - stray kids - mini album',
        price: 37.95,
        img: '../img/13.jpg',
        date: '2022-2-18'
    },
    {
        title: 'maxident (limited edition go ver.) - stray kids - 7th mini album',
        price: 35.95,
        img: '../img/14.jpg',
        stickerPreOrder: 'pre-order',
        stickerSoldOut: 'sold-out',
        date: '2022-9-7'
    },
    {
        title: 'maxident (standard edition go ver.) - stray kids - 7th mini album',
        price: 35.95,
        img: '../img/15.jpg',
        stickerPreOrder: 'pre-order',
        date: '2022-9-7'
    },
]

/////////////////////////////////////////////////////////////////////////

const sectionTitleContainer = document.querySelector('#section-header-name');
const sectionTitle = document.querySelectorAll('.menu__item');
const filters = document.querySelector('.filters-sort');

for (let name of sectionTitle) {
    name.addEventListener('click', function() {
        sectionTitleContainer.textContent = name.textContent;
        renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));
        filters.classList.add('hidden');
    });
}

/////////////////////////////////////////////////////////////////////////

const itemsContainer = document.querySelector('#shop-items');
const itemTemplate = document.querySelector('#item-template');
const nothingFound = document.querySelector('#nothing-found');
const start = document.querySelector('#start');

function prepareShopItem(shopItem) {
    const { title, price, img, stickerPreOrder, stickerSoldOut, date } = shopItem;

    const item = itemTemplate.content.cloneNode(true);

    item.querySelector('.shop-item__title').textContent = title;
    item.querySelector('.shop-item__price').textContent = `${price}$`;
    item.querySelector('img').src = img;

    if ('stickerPreOrder' in shopItem) {
        const stickerTemplate = item.querySelector('.shop-item__stickers');
        const element = document.createElement('span');
        element.classList.add('shop-item__pre-order');
        element.textContent = stickerPreOrder;
        stickerTemplate.append(element);
    }

    if ('stickerSoldOut' in shopItem) {
        const stickerTemplate = item.querySelector('.shop-item__stickers');
        const element = document.createElement('span');
        element.classList.add('shop-item__sold-out');
        element.textContent = stickerSoldOut;
        stickerTemplate.prepend(element);
    }

    return item;
}

/////////////////////////////////////////////////////////////////////////

let currentState = [...items];

/////////////////////////////////////////////////////////////////////////

function renderItems(arr) {
    start.textContent = '';
    nothingFound.textContent = '';
    itemsContainer.innerHTML = '';

    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    })

    if (!arr.length) {
        nothingFound.textContent = 'Ничего не найдено';
    }
}

/////////////////////////////////////////////////////////////////////////

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }

    if (a.title === b.title) {
        return 0;
    }

    if (a.title < b.title) {
        return -1;
    }
}

/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////

const sortControl = document.querySelector('#sort');

function sortByDate(a, b) {
    const date1 = new Date(a.date);
    const date2 = new Date(b.date);

    if (+date1 > +date2) {
        return -1;
    }

    if (+date1 === +date2) {
        return 0;
    }

    if (+date1 < +date2) {
        return 1;
    }
}

sortControl.addEventListener('change', (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
        case 'a-z':
            currentState.sort((a, b) => sortByAlphabet(a, b))
            break;
        case 'z-a':
            currentState.sort((a, b) => sortByAlphabet(b, a))
            break;
        case 'cheap':
            currentState.sort((a, b) => a.price - b.price)
            break;
        case 'expensive':
            currentState.sort((a, b) => b.price - a.price)
            break;
        case 'new':
            currentState.sort((a, b) => sortByDate(a, b))
            break;
        case 'old':
            currentState.sort((a, b) => sortByDate(b, a))
            break;
    }

    renderItems(currentState);
})

/////////////////////////////////////////////////////////////////////////

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );

    currentState.sort((a, b) => sortByAlphabet(a, b));

    sortControl.selectedIndex = 0;

    renderItems(currentState);

    searchInput.value = '';

    filters.classList.add('hidden');
}

searchInput.addEventListener('search', applySearch);
searchButton.addEventListener('click', applySearch);

/////////////////////////////////////////////////////////////////////////

const contactButton = document.querySelector('.contact');
const icon = contactButton.querySelector('.fa-comment-dots');
const formContainer = document.querySelector('.form-container');

contactButton.addEventListener('click', function() {
    formContainer.classList.toggle('hidden');

    icon.classList.toggle('fa-comment-dots');
    icon.classList.toggle('fa-xmark');
})

/////////////////////////////////////////////////////////////////////////