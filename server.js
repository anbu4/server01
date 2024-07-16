const { log } = require('console');
const { name } = require('ejs');
const express = require('express');
const fs = require('fs')

const app = express()
const PORT = 4040

app.set('view engine', 'ejs')
app.use(express.static('public'))

// main
app.get('/',(req,res)=>{
    res.render('main')
})
// master
app.get('/master', (req,res)=>{
    res.render('master')
})
app.get('/master/:catigory/baz', (req,res)=>{
    fs.readFile(`./base/${req.params.catigory}.json`,'utf8', (err, data)=>{
        res.end(data)
    })
})
// recap
app.get('/recap', (req,res)=>{
    res.render('recap')
})

// move
app.get('/move/anime/:id/:name', (req,res)=>{
    const animeDB = JSON.parse(fs.readFileSync('./base/anime.json','utf8'))
    let content = animeDB.find((el) => el.id == +req.params.id)
    costructorItem(content, req.params.name)
    res.render('move')
})
app.get('/move/film/:id/:name', (req,res)=>{
    const filmDB = JSON.parse(fs.readFileSync('./base/film.json','utf8'))
    let content = filmDB.find((el) => el.id == +req.params.id)
    costructorItem(content, req.params.name)
    res.render('move')
})
app.get('/move/serial/:id/:name', (req,res)=>{
    const serialDB = JSON.parse(fs.readFileSync('./base/serial.json','utf8'))
    let content = serialDB.find((el) => el.id == +req.params.id)
    costructorItem(content, req.params.name)
    res.render('move')
})
app.get('/move/cartoon/:id/:name', (req,res)=>{
    const cartoonDB = JSON.parse(fs.readFileSync('./base/cartoon.json','utf8'))
    let content = cartoonDB.find((el) => el.id == +req.params.id)
    costructorItem(content, req.params.name)
    res.render('move')
})

// recapMove
app.get('/moveRecap/:id/:name', (req,res)=>{
    const recapDB = JSON.parse(fs.readFileSync('./base/recap.json','utf8'))
    let content = recapDB.find((el) => el.id == +req.params.id)
    costructorItem(content, req.params.name)
    res.render('moveRecap')
})

// family
app.get('/family/:name', (req, res)=>{
    // search
    let family = undefined;
    let fin = true
   
    if(fin){
        const filmDB = JSON.parse(fs.readFileSync('./base/film.json','utf8'))
        filmDB.map((el)=>{
            if(fin){
                let datTex = el.title.toLowerCase()
                let datPar = req.params.name.toLowerCase()
                if(datTex.search(datPar) == 0){
                    family = el.family
                    fin = false
                }
            }
        })
    }
    if(fin){
        const animeDB = JSON.parse(fs.readFileSync('./base/anime.json','utf8'))
        animeDB.map((el)=>{
            if(fin){
                let datTex = el.title.toLowerCase()
                let datPar = req.params.name.toLowerCase()
                if(datTex.search(datPar) == 0){
                    family = el.family
                    fin = false
                }
            }
        })
    }
    if(fin){
        const serialDB = JSON.parse(fs.readFileSync('./base/serial.json','utf8'))
        serialDB.map((el)=>{
            if(fin){
                let datTex = el.title.toLowerCase()
                let datPar = req.params.name.toLowerCase()
                if(datTex.search(datPar) == 0){
                    family = el.family
                    fin = false
                }
            }
        })
    }
    if(fin){
        const cartoonDB = JSON.parse(fs.readFileSync('./base/cartoon.json','utf8'))
        cartoonDB.map((el)=>{
            if(fin){
                let datTex = el.title.toLowerCase()
                let datPar = req.params.name.toLowerCase()
                if(datTex.search(datPar) == 0){
                    family = el.family
                    fin = false
                }
            }
        })
    }
    if(fin){
        const recapDB = JSON.parse(fs.readFileSync('./base/recap.json','utf8'))
        recapDB.map((el)=>{
            if(fin){
                let datTex = el.title.toLowerCase()
                let datPar = req.params.name.toLowerCase()
                if(datTex.search(datPar) == 0){
                    family = el.family
                    fin = false
                }
            }
        })
    }

    if(family != undefined){
        searchFamily(family)
    }else{
        fs.writeFile('./public/dat/datFam.js', `const famARR = "Netu brat"; export default famARR`, { flag: 'w+' }, err => {});
    }

    res.render('family')
})



app.listen(PORT,()=>{
    console.log(`https://github.com/anbu4/server01:${PORT}`);
})

// function
function searchFamily(family, name){
    const famAR = {}
    const filmDB = JSON.parse(fs.readFileSync('./base/film.json','utf8'))
    const animeDB = JSON.parse(fs.readFileSync('./base/anime.json','utf8'))
    const serialDB = JSON.parse(fs.readFileSync('./base/serial.json','utf8'))
    const cartoonDB = JSON.parse(fs.readFileSync('./base/cartoon.json','utf8'))
    const recapDB = JSON.parse(fs.readFileSync('./base/recap.json','utf8'))
    
    

    famAR.film = new Array
    filmDB.forEach(el => {
        if(el.family == family && el.title != name){
            famAR.film.push(el)
        }
    });
    famAR.anime = new Array
    animeDB.forEach(el => {
        if(el.family == family && el.title != name){
            famAR.anime.push(el)
        }
    });
    famAR.serial = new Array
    serialDB.forEach(el => {
        if(el.family == family && el.title != name){
            famAR.serial.push(el)
        }
    });
    famAR.cartoon = new Array
    cartoonDB.forEach(el => {
        if(el.family == family && el.title != name){
            famAR.cartoon.push(el)
        }
    });
    famAR.recap = new Array
    recapDB.forEach(el => {
        if(el.family == family && el.title != name){
            famAR.recap.push(el)
        }
    });

    fs.writeFile('./public/dat/datFam.js', `const famARR = ${JSON.stringify(famAR)}; export default famARR`, { flag: 'w+' }, err => {});
}

function costructorItem(content, name){
    const family = content.family
    searchFamily(family ,name)
    fs.writeFile('./public/dat/dat.js', `const itemObj = ${JSON.stringify(content)}; export default itemObj`, { flag: 'w+' }, err => {});
}
