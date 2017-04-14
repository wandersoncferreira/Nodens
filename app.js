var express = require('express');
var schedule = require('node-schedule');
var fs = require('fs');
var scraper = require(__dirname + '/scraping/scraper.js')
var app = express();

global.__ini = __dirname + "/nodens.ini";

app.get('/', function(req, res){

    const url = "http://www1.folha.uol.com.br/colunas/monicabergamo/2017/04/1873788-prefeitura-de-sp-reforca-orientacao-para-cortar-30-dos-comissionados.shtml"

    var j = schedule.scheduleJob('*/1 * * * *', function(){
        scraper.folhaSP(url).then(function(json_completo){
            fs.writeFile("output_final.json", JSON.stringify(json_completo, null, 4), function(error){
                if (!error){
                    console.log("File successfully written!");
                }else{
                    console.log(error);
                }
            })
        })
    })
})

app.listen('8081')
console.log('Porta sendo usada pelo node-server: 8081');
exports = module.exports = app;
