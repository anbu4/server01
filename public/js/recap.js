fetch('https://server01-production-56d3.up.railway.app/master/recap/baz')
    .then(res => res.json())
    .then(arr => {
        console.log(arr);
        const arrRev = arr.toReversed()
        // DOM
        const recapContainer = document.querySelector('.recap_container');
        const navLinks = document.querySelectorAll('.nav_links');
        const navLinksMobile = document.querySelectorAll('.nav_links-mobile');
        const localCatigory = localStorage.getItem('catigory')
        recapContainer.innerHTML = ''

        // Function
        let ii = 0
        let length = arrRev.length
        let iter = 20
        function createRecapCard() {
            for (let i = ii; i <= iter; i++) {
                if (i > iter) break
                const card = document.createElement('a');
                card.href = `/moveRecap/${arrRev[i].id}/${arrRev[i].title}`
                card.classList.add('recap_card');
                card.innerHTML = `
                <img src="${arrRev[i].slaydImg}">
                    <div>
                        <p>${arrRev[i].title}</p>
                    </div>
                    <ul class="recap_len">${arrRev[i].language}</ul>
                `;
                recapContainer.append(card);
                ii++
            }
            if (length - iter > 20) {
                iter += 20
            } else if (length - iter <= 20) {
                iter += length - iter
            }
        }
        createRecapCard()

        // Event
        window.addEventListener('scroll', function () {
            const docRect = document.documentElement.getBoundingClientRect();
            if (docRect.bottom <= document.documentElement.clientHeight + 700) {
                createRecapCard()
            }
        })
        navLinks.forEach(link => {
            if (link.dataset.catigory == localCatigory) {
                link.classList.add('nav_link-active')
            }
        })
        navLinksMobile.forEach(link => {
            if (link.dataset.catigory == localCatigory) {
                link.classList.add('link-active')
            }
        })
    })

    .catch(err => {
        document.body.innerHTML = `
        <h1>Сервер перегружен или не отвечает</h1>
        <h2>Перезагрузите или передите на главную</h2>
        <a href="/" class="nav_logo-link">
            <img class="logo-link_img" src="Icons/cinema.png" alt="">
        </a>
        `
        console.log(err);
    })