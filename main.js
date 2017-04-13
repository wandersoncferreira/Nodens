var fs = require('fs')
var scraper = require(__dirname + '/scraping/scraper.js')

const url = "http://www1.folha.uol.com.br/colunas/monicabergamo/2017/04/1873788-prefeitura-de-sp-reforca-orientacao-para-cortar-30-dos-comissionados.shtml"

scraper.folhaSP(url).then(function(json_completo){
    fs.writeFile("output_final.json", JSON.stringify(json_completo, null, 4), function(error){
        if (!error){
            console.log("File successfully written!");
        }else{
            console.log(error);
        }
    })
})

scraper.folhaSPLinks().then(function(val){
    fs.writeFile("links_folhaSP.json", val, function(error){
        if (!error){
            console.log("Links da Folha de Sao Paulo salvos!")
        }else{
            console.log(error);
        }
    })
})
