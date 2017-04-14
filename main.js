var fs = require('fs')
var scraper = require(__dirname + '/scraping/scraper.js')

global.__ini = __dirname + "/nodens.ini";

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

// mongoose !!! ODM
var mongoose = require('mongoose');
var database = require(__dirname + '/database/connection.js');
mongoose.connect(database.url());

var db = mongoose.connection

var models = require(__dirname + '/entity/models.js')(mongoose);

var poder = new models.Page();
poder.author = "Wanderson"
poder.title = "Primeiro documento no Banco do Mongo"
poder.content = "NADA"
poder.related_tags = ["mongodb", "node", "bem legal"]
poder.save()

var doria = new models.User();
doria.name = "Doria"
doria.party = "PSDB"
doria.biography = "Nao sou um politico"
doria.save()

var folha = new models.Site();
folha.company = "Folha de Sao Paulo"
folha.link = "http://www.folhadesaopaulo.com"
folha.pages.push(poder)
folha.scrap_links.push(["www.teste.com", "www.agoravai.com"])
folha.save()

db.close()
