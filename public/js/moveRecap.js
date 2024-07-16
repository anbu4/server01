import localItem from '/dat/dat.js';
import fam from '/dat/datFam.js';

const recapHeader = document.querySelector('.recap_header');
const recapVideoIframe = document.querySelector('.recap_video-iframe');
const itemFamSection = document.querySelector('.item_fam-section');


// function jsx
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
function pushData(){
    recapHeader.innerHTML = `
    <img src="${localItem.slaydImg}">
    <div class="recap_content">
    <h2 class="recap_title">${localItem.title}</h2>
    <p class="recap_channel">Канал: <span>${localItem.channel}</span></p>
    <ul class="recap_language">Язык: <span>${localItem.language}</span></ul>
    </div>
    `
    recapVideoIframe.src = localItem.videoUrl
}
pushData()
itemFamSection.innerHTML = ''
creatFamBox(fam.film, 'Фильмы')
creatFamBox(fam.anime, 'Аниме')
creatFamBox(fam.serial, 'Сериалы')
creatFamBox(fam.cartoon, 'Мультфильмы')
creatFamBox(fam.recap, 'Обзор')