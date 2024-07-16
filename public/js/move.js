
import itemObj from '/dat/dat.js';
import fam from '/dat/datFam.js';


// DOM
const header = document.querySelector('.header');
const videoIframe = document.querySelector('.video_iframe');
const videoBoxBg = document.querySelector('.video_box-bg img');
const languageBox = document.querySelector('.language_box')
const itemFamSection = document.querySelector('.item_fam-section')

// jsx
function creatHeader() {
    let genre = itemObj.genre.toString().replaceAll(",", ",  ")
    header.innerHTML = `
    <div class="header_item-img">
        <img src="${itemObj.cardImg}" alt="">
    </div>
    <div class="header_item-content">
        <h1 class="header_title">${itemObj.title}</h1>
        <div class="header_content">
            <div class="head_genre">
                <ul>Жанр:</ul>
                <p class="head_genre-volue">${genre}</p>
            </div>
            <div class="head_year">
                <ul>Год:</ul>
                <p class="head_year-volue">${itemObj.year}</p>
            </div>
            <div class="head_genre head_episode">
                <ul>Эпизоды:</ul>
                <p class="head_genre-volue">${itemObj.episodes}</p>
            </div>
            <div class="head_year">
                <ul>Страна:</ul>
                <p class="head_year-volue">${itemObj.count}</p>
            </div>
            <div class="head_description">
                <ul>Описания:</ul>
                <img class="burger_summary" src="/Icons/left-chevron.png">
                <li class="head_description-volue">${itemObj.summary}</li>
            </div>
        </div>
    </div>
    
    `;
    if (itemObj.episodes == undefined || itemObj.episodes == '') {
        header.querySelector('.head_episode').remove()
    }
    if (itemObj.summary == undefined || itemObj.summary == '') {
        header.querySelector('.head_description').remove()
    }
}
function creatVideo(language) {
    if (language == null || language == '') { language = 'Eng' }

    if (itemObj.episodes == undefined) {
        videoIframe.src = itemObj.videoUrl[language];
        videoBoxBg.src = itemObj.slaydImg;
        return
    }

    let count = localStorage.getItem('episodeNum')
    if (count == null || count == '') { count = 1 }
    videoIframe.src = itemObj.videoUrl[language][count];
    videoBoxBg.src = itemObj.slaydImg;
}
function creatNumEpisode() {
    const episodeNumBox = document.querySelector('.episode_num-box');
    let num = localStorage.getItem('episodeNum')
    if (itemObj.episodes == undefined) { return episodeNumBox.remove() };

    for (let i = 1; i <= itemObj.episodes; i++) {
        const btnNum = document.createElement('a');
        btnNum.href = ''
        btnNum.addEventListener('click', function () { localStorage.setItem('episodeNum', i) });
        btnNum.innerHTML = i;
        if (num == null || num == '' && i == 1) {
            btnNum.classList.add('episode_num-active')
        }
        if (num == i) {
            btnNum.classList.add('episode_num-active')
        }
        episodeNumBox.append(btnNum);
    }

    // scroll
    episodeNumBox.scrollLeft = localStorage.getItem('scrollEp')
    episodeNumBox.addEventListener('scroll', function () {
        localStorage.setItem('scrollEp', episodeNumBox.scrollLeft)
    })
}
function languageView() {
    let lan = localStorage.getItem('language')
    const btnEng = document.createElement('a');
    btnEng.href = ' '
    btnEng.addEventListener('click', languagePush)
    btnEng.innerHTML = 'Eng'

    languageBox.append(btnEng)
    if (itemObj.videoUrl.Ru != undefined) {
        const btnRu = document.createElement('a');
        btnRu.href = ' '
        btnRu.addEventListener('click', languagePush)
        btnRu.innerHTML = 'Ru'
        languageBox.append(btnRu)

        if (lan == 'Ru') { btnRu.classList.add('language_link-active') }
    }


    if (lan == undefined || lan == 'Eng') { btnEng.classList.add('language_link-active') }
}
function creatFamBox(arr, title) {
    if (arr.length == 0) { return }
    const itemFamBox = document.createElement('div')
    const itemFamBoxCaption = document.createElement('h5')
    const itemFamBoxSection = document.createElement('div')

    itemFamBox.classList.add('item_fam-box')
    itemFamBoxCaption.classList.add('item_fam-box_caption')
    itemFamBoxSection.classList.add('item_fam-box_section')

    itemFamBoxCaption.innerHTML = title
    arr.map(elem => {
        const item = document.createElement('a')
        item.classList.add('item_fam-box_content')
        if(title == 'Обзор'){
            item.href = `/moveRecap/${elem.id}/${elem.title}`
        }else{
            item.href = `/move/${elem.category}/${elem.id}/${elem.title}`;
        }
        item.innerHTML = `
        <img src="${elem.slaydImg}" alt="">
        <p class="item_fam-box_con-title">${elem.title}</p>
        `

        if (elem.year != undefined) {
            const year = document.createElement('p')
            year.classList.add('item_fam-box_con-year')
            year.innerHTML = elem.year
            item.append(year)
        }

        if (elem.episodes != undefined) {
            const episode = document.createElement('p')
            episode.classList.add('item_fam-box_con-episode')
            episode.innerHTML = elem.episodes
            item.append(episode)
        }


        itemFamBoxSection.append(item)
    })


    itemFamBox.append(itemFamBoxCaption)
    itemFamBox.append(itemFamBoxSection)
    itemFamSection.append(itemFamBox)
}
creatHeader()
creatVideo(localStorage.getItem('language'))
creatNumEpisode()
languageView()
// Fambx
itemFamSection.innerHTML = ''
creatFamBox(fam.film, 'Фильмы')
creatFamBox(fam.anime, 'Аниме')
creatFamBox(fam.serial, 'Сериалы')
creatFamBox(fam.cartoon, 'Мультфильмы')
creatFamBox(fam.recap, 'Обзор')

// jsxDom
const burgerSummary = document.querySelector('.burger_summary');
const headSummary = document.querySelector('.head_description-volue');


// Event
if(burgerSummary != null){
    burgerSummary.addEventListener('click', () => {
        headSummary.classList.toggle('flex');
    })
}



// function

function languagePush() {
    localStorage.setItem('language', this.innerText)
}



