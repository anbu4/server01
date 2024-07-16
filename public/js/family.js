import fam from '/dat/datFam.js';

const familySection = document.querySelector('.family_section')
familySection.innerHTML = ''

// function jsx
function createFamItems(arr, caption) {
    if (arr.length == 0) { return }
    const familyBox = document.createElement('div')
    const familyCaption = document.createElement('h2')
    const familyContent = document.createElement('div')
    familyBox.classList.add('family_box')
    familyCaption.classList.add('family_caption')
    familyCaption.classList.add('caption')
    familyContent.classList.add('family_content')
    familyContent.classList.add('item_container')

    familyCaption.innerHTML = caption;

    arr.map(item => {
        // item
        const creatElem = document.createElement('a');
        creatElem.dataset.catigory = item.category
        creatElem.classList.add('item');
        creatElem.href = `/move/${item.category}/${item.id}/${item.title}`;
        creatElem.innerHTML = `
        <div class="item_img">
            <img src="${item.cardImg}" alt="">
        </div>
        <div class="item_content">
            <div class="item_con-title">${item.title}</div>
            <div class="item_con-dp">
            <b class="item_con-year">${item.year}</b>
            </div> 
        </div>
        `;
        // episodes
        if (item.episodes) {
            const episodeNum = document.createElement('div')
            episodeNum.classList.add('item_series')
            episodeNum.innerHTML = `<span>${item.episodes}</span>series`;
            creatElem.append(episodeNum)
        }
        familyContent.append(creatElem)
    })
    familyBox.append(familyCaption)
    familyBox.append(familyContent)
    familySection.append(familyBox)

}
function createFamRecap(arr, caption) {
    if (arr.length == 0) { return }
    const familyBox = document.createElement('div')
    const familyCaption = document.createElement('h2')
    const familyContent = document.createElement('div')
    familyBox.classList.add('family_box')
    familyCaption.classList.add('family_caption')
    familyCaption.classList.add('caption')
    familyContent.classList.add('family_content')
    familyContent.classList.add('recap_container')

    familyCaption.innerHTML = caption;

    arr.map(item => {
        // item
        const card = document.createElement('a');
        card.href = `/moveRecap/${item.id}/${item.title}`
        card.classList.add('recap_card');
        card.innerHTML = `
        <img src="${item.slaydImg}">
            <div>
                <p>${item.title}</p>
            </div>
            <ul class="recap_len">${item.language}</ul>
        `;

        familyContent.append(card)
    })
    familyBox.append(familyCaption)
    familyBox.append(familyContent)
    familySection.append(familyBox)
}


if (fam == 'Netu brat') {
    familySection.innerHTML = `
    <div class="search_err">
        <h1 class="caption" style="color: red;">Извините, мы не нашли Фильмы по Вашему запросу</h1>  
    </div>
    `
} else {
    createFamItems(fam.film, 'Фильмы')
    createFamItems(fam.anime, 'Аниме')
    createFamItems(fam.serial, 'Сериалы')
    createFamItems(fam.cartoon, 'Мультфильмы')
    createFamRecap(fam.recap, 'Обзор')
}


