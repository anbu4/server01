// Dom
const navSearchLink = document.querySelector('.nav_search-link');
const navbarInput = document.querySelector('.navbar_input');
const navLinks = document.querySelectorAll('.nav_links');
const navLinksMobile = document.querySelectorAll('.nav_links-mobile');
const genreBtn = document.querySelectorAll('.genre_btn');
const burger = document.querySelector('.burger');
const navbarMobileContent = document.querySelector('.navbar_mobile-content');
const searchInput = document.querySelector('.nav_input')
const searchInputMobile = document.querySelector('.nav_input-mobile')
const navInputPost = document.querySelector('.nav_input-post')
const navInputBtns = document.querySelectorAll('.nav_input-btn')

// Event
navSearchLink.addEventListener('click', () =>{
    navbarInput.classList.toggle('input_active')
    if(navbarInput.className == 'navbar_input'){
        navSearchLink.children[0].src = '/Icons/loupe.png'
    }else{
        navSearchLink.children[0].src = '/Icons/close.png'
    }
})
navInputBtns.forEach(item =>{
    item.addEventListener('click',()=>{
        let valMob = searchInputMobile.value.trim()
        let val = searchInput.value.trim()
        if(val != ''){
            location.href = `/family/${val}`
        }
        if(valMob != ''){
            location.href = `/family/${valMob}`
        }
    })
})
navLinks.forEach(link =>{
    link.addEventListener('click',pullDataCatigory)
})
navLinksMobile.forEach(link =>{
    link.addEventListener('click',pullDataCatigory)
})
genreBtn.forEach(btn =>{
    btn.addEventListener('click', pullDataGenre)
})
burger.addEventListener('click',() =>{
    navbarMobileContent.classList.toggle('nav_mobile-active')
})
searchInput.addEventListener('keypress', function(e){
    let val = searchInput.value.trim()
    if(e.which === 13 && val != ''){
        location.href = `/family/${val}`
    }
});
searchInputMobile.addEventListener('keypress', function(e){
    let val = searchInput.value.trim()
    if(e.which === 13 && val != ''){
        location.href = `/family/${val}`
    }
});

// function
function pullDataCatigory(){
    localStorage.setItem('catigory', this.dataset.catigory)
    localStorage.setItem('genre','')
}
function pullDataGenre(){
    localStorage.setItem('catigory', this.dataset.catigory)
    localStorage.setItem('genre', this.dataset.genre)
}




