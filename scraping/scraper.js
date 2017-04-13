var request = require('request');
var cheerio = require('cheerio');
var speaker = require(__dirname + '/speaker.js')
var content = require(__dirname + '/content.js')

exports.folhaSP = function(url) {
    return new Promise(function(resolve, reject){
        request(url, function(error, response, body){
            if(!error){
                cheerio_obj = cheerio.load(body, {decodeEntities: false});
                var autores = speaker.folhaSP(cheerio_obj);
                var conteudo = content.folhaSP(cheerio_obj);
                var merged = JSON.parse((autores + conteudo).replace(/}{/g,","))

                return resolve(merged);
            }else{
                return reject(error);
            }
    })
    })
};

exports.folhaSPLinks = function() {

    return new Promise(function(resolve, reject){
        var __url__ = "http://www.folha.uol.com.br"
        var defaultSections = ["Poder"]

        request(__url__, function(error, response, body){
            if (!error){
                cheerio_obj = cheerio.load(body, {decodeEntities: false});
                var links = content.folhaSPLinks(cheerio_obj)
                return resolve(links);
            }else{
                return reject(error);
            }
        })
    })

};
