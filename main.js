var speaker = require(__dirname + '/scraping/speaker.js')
var content = require(__dirname + '/scraping/content.js')
var fs = require('fs')
var extend = require('util')._extend

const url = "http://www1.folha.uol.com.br/colunas/monicabergamo/2017/04/1873788-prefeitura-de-sp-reforca-orientacao-para-cortar-30-dos-comissionados.shtml"

// pegar todos os "autores da folha de sp"
speaker.folha_sp(url, function(error, body){
    if (!error){
        console.log(body)
    }else{
        console.log(error);
    }
})

content.folha_sp(url, function(error, body){
    if (!error){
        console.log(body)
    }else{
        console.log(error);
    }
})

// fs.writeFile("output_final.json", JSON.stringify(json_completo, null, 4), function(error){
//     if (!error){
//         console.log("File successfully written!");
//     }else{
//         console.log(error);
//     }
// })

