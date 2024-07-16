let xmlLink;
const localCatigory = localStorage.getItem('catigory')
const localGanre = localStorage.getItem('genre')
const localPage = localStorage.getItem('page')
if(localCatigory == 'film'){
    xmlLink = 'http://localhost:4040/master/film/baz';
}
if(localCatigory == 'cartoon'){
    xmlLink = 'http://localhost:4040/master/cartoon/baz';
}
if(localCatigory == 'anime' || localCatigory == 'recap'){
    xmlLink = 'http://localhost:4040/master/anime/baz';
}
if(localCatigory == 'serial'){
    xmlLink = 'http://localhost:4040/master/serial/baz'
}

fetch(xmlLink)
    .then(res=> res.json())
    .then(arr =>{
    const arrRev = arr.toReversed()
// jsx fucntion
function creatSlaydCard() {
    const slaydBox = document.querySelector('.slayd_box');
    slaydBox.innerHTML = ''
    const caption = document.querySelector('.caption');
    let cap;
    if(localCatigory == 'film'){cap = 'фильмы'}
    if(localCatigory == 'serial'){cap = 'сериалы'}
    if(localCatigory == 'anime'){cap = 'аниме'}
    if(localCatigory == 'cartoon'){cap = 'мультфильмы'}
    caption.innerHTML = cap;

    for(let count = 1; count<=7; count++){
        if(arr.length == 0){return}
        let num = Math.floor(Math.random() * arr.length)
        let rem = arr.splice(num,1)
        const creatItem = document.createElement('a');
            creatItem.dataset.catigory = rem[0].category
            creatItem.classList.add('slayd_card');
            creatItem.id = 'item' + count;
            creatItem.href = `/move/${rem[0].category}/${rem[0].id}/${rem[0].title}`;
            creatItem.innerHTML = ` 
            <div class="slayd_item">
            <img src="${rem[0].slaydImg}" alt="">
            <div class="slayd_card-content">
            <h5 class="slayd_card-title">${rem[0].title}</h5>
            <div>
            <p class="slayd_card-genres">${rem[0].genre[0]}, ${rem[0].genre[1]}</p>
            <p class="slayd_card-year">${rem[0].year}</p>
            </div>
            </div>
            </div>`
            slaydBox.append(creatItem) 
    }
}

const itemObj = {}
function itemParsePages(genre){
    let count = 1
    itemObj['itemPage'+count] = [];

    if(genre == '' ||genre == null){
        arrRev.forEach(item=>{
            if(itemObj['itemPage'+count].length >= 20){
                count++
                itemObj['itemPage'+count] = []
            }
            itemObj['itemPage'+count].push(item)
        })
        return
    }

    arrRev.forEach(item=>{
        let v = item.genre.find(el=>el==genre);
        if(itemObj['itemPage'+count].length >= 20){
            count++
            itemObj['itemPage'+count] = []
        }
        if(v){itemObj['itemPage'+count].push(item)}
    })
}
function creatItemList(i){
    if(i==''){i = 1}
    const itemContainer = document.querySelector('.item_container');
    itemContainer.innerHTML = ''
    itemObj['itemPage' + i].map(item => {
        // item
        const creatElem = document.createElement('a');
        creatElem.dataset.catigory = item.category
        creatElem.classList.add('item');
        creatElem.href = `move/${item.category}/${item.id}/${item.title}`;
        let genre = item.genre.toString().replaceAll(",",",  ")
        creatElem.innerHTML = `
        <div class="item_img">
            <img src="${item.cardImg}" alt="">
        </div>
        <div class="item_content">
            <div class="item_con-title">${item.title}</div>
            <div class="item_con-dp">
            <p class="item_con-genre">${genre}</p>
            <b class="item_con-year">${item.year}</b>
            </div> 
        </div>
        `;
        // episodes
        if(item.episodes){
            const episodeNum = document.createElement('div')
            episodeNum.classList.add('item_series')
            episodeNum.innerHTML = `<span>${item.episodes}</span>series`;
            creatElem.append(episodeNum)
        }
        itemContainer.append(creatElem)
    })

   
}
function creatPageNumber(length){
    const pageControlsNum = document.querySelector('.page_controls-num');
    const pageNumLocal = +localStorage.getItem('page');

    for(let num = 1; num <= length; num++){
        const itemNum = document.createElement('a');
        itemNum.href = 'master'
        itemNum.dataset.pageid = num;
        itemNum.innerHTML = num;
        itemNum.addEventListener('click', itemNumPageEvent);
        pageControlsNum.append(itemNum)
        if(num == pageNumLocal || num == 1 && pageNumLocal == 0){
            itemNum.classList.add('active_page');
        }
    }
}
creatSlaydCard();
itemParsePages(localGanre);
creatItemList(+localStorage.getItem('page'))
const itemObjLength = Object.keys(itemObj).length;
creatPageNumber(itemObjLength)
localStorage.setItem('page','')


// DOM
const slaydCards = document.querySelectorAll('.slayd_card')
const navLinks = document.querySelectorAll('.nav_links');
const navLinksMobile = document.querySelectorAll('.nav_links-mobile');
const genreBtn = document.querySelectorAll('.genre_btn');
const genreBtnMobile = document.querySelectorAll('.genre_btn-mobile');
const pageBtnPlus = document.querySelector('.page_btn-plus');
const pageBtnMinus = document.querySelector('.page_btn-minus');
const filterContent = document.querySelector('.filter_content');
const filterBtn = document.querySelector('.filter_btn');
const filterViewCard = document.querySelector('.filter_view-card');
// 
// let countPageii = 1


// Event
navLinks.forEach(link =>{
    if(link.dataset.catigory == localCatigory){
        link.classList.add('nav_link-active')
    }
})
navLinksMobile.forEach(link =>{
    if(link.dataset.catigory == localCatigory){
        link.classList.add('link-active')
    }
})
genreBtn.forEach(btn =>{
    if(btn.dataset.genre == localGanre && btn.dataset.catigory == localCatigory){
        btn.classList.add('link-active')
    }
})
genreBtnMobile.forEach(btn =>{
    btn.addEventListener('click', pullDataGenre)
    if(btn.dataset.genre == localGanre){
        btn.classList.add('link-active')
    }
})
pageBtnPlus.addEventListener('click',() =>{
    let pageNum = ++document.querySelector('.active_page').dataset.pageid;
    if(pageNum > itemObjLength){
       pageNum = 1;
    }
    localStorage.setItem('page',pageNum)
})
pageBtnMinus.addEventListener('click',() =>{
    let pageNum = --document.querySelector('.active_page').dataset.pageid;
    if(pageNum <= 0){
       pageNum = itemObjLength;
    }
    localStorage.setItem('page',pageNum)
})
filterBtn.addEventListener('click', () =>{
    filterContent.classList.toggle('filter_content-active')
})
filterViewCard.addEventListener('click', ()=>{
    const itemContainer = document.querySelector('.item_container');
    const items = document.querySelectorAll('.item')
    let btnS = [filterViewCard.children[0],filterViewCard.children[1]]
    btnS.forEach(item=>{
        item.classList.toggle('flex')
    })
    items.forEach(i=>{
        i.classList.toggle('item-corecting')
    })
    if(filterViewCard.children[1].className == 'flex'){
        itemContainer.style.rowGap = '10px'
        itemContainer.style.columnGap = '1px'
        itemListCorect()
    }else{
        itemContainer.style.columnGap = '2%'
        itemContainer.style.rowGap = '30px'
        creatItemList(+localPage)
    }
    
})

// function
function eventSlayder(slaydBoxCards) {
    slaydBoxCards.forEach(function (card) {
        let i = card.id.replace(/[A-z]/g, '')
        let ii = --i
        if (ii < 1) {
            ii = 7
        }
        card.id = card.id.replace(/.$/, ii);
    })
}
function pullDataGenre(){
    if(this.dataset.catigory == undefined){
        return localStorage.setItem('genre', this.dataset.genre)
    }
    localStorage.setItem('genre', this.dataset.genre)
    localStorage.setItem('catigory', this.dataset.catigory)
}
function itemNumPageEvent(){
    localStorage.setItem('page', this.dataset.pageid)
}
function itemListCorect(){
    const itemConDp = document.querySelectorAll('.item_con-dp')
    const itemSeries = document.querySelectorAll('.item_series')

    itemSeries.forEach(ii=>{
        let child = ii.children[0]
        ii.innerHTML = ''
        ii.append(child)
    })
    itemConDp.forEach(ii=>{
        ii.remove()
    })
}


// Interval
setInterval(() => {
    eventSlayder(slaydCards)
}, 3200);


})
.catch(err =>{
        document.body.innerHTML = `
        <h1>Сервер перегружен или не отвечает</h1>
        <h2>Перезагрузите или передите на главную</h2>
        <a href="/" class="nav_logo-link">
            <img class="logo-link_img" src="Icons/cinema.png" alt="">
        </a>
        `
        console.log(err);
})


localStorage.setItem('episodeNum', '');
localStorage.removeItem('scrollEp');


