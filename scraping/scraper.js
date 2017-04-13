var request = require('request');
var cheerio = require('cheerio');
var speaker = require(__dirname + '/speaker.js')
var content = require(__dirname + '/content.js')

exports.folha_sp = function(url) {
    return new Promise(function(resolve, reject){
        request(url, function(error, response, body){
            if(!error){
                cheerio_obj = cheerio.load(body, {decodeEntities: false});
                var autores = speaker.folha_sp(cheerio_obj);
                var conteudo = content.folha_sp(cheerio_obj);
                var merged = JSON.parse((autores + conteudo).replace(/}{/g,","))

                return resolve(merged);
            }else{
                return reject(error);
            }
    })
    })
}
