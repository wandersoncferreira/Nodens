var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var speaker = require(__dirname + '/speaker.js')
var content = require(__dirname + '/content.js')

exports.folhaSP = function(url) {
    return new Promise(function(resolve, reject){
        request({url: url, encoding: null}, function(error, response, body){
            if(!error){
                var decoded_buf = iconv.decode(new Buffer(body), "latin-1")
                cheerio_obj = cheerio.load(decoded_buf);
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

        request({url: __url__, encoding: null}, function(error, response, body){
            if (!error){
                var decoded_buff = iconv.decode(new Buffer(body), "latin-1")
                cheerio_obj = cheerio.load(decoded_buff);
                var links = content.folhaSPLinks(cheerio_obj)
                return resolve(links);
            }else{
                return reject(error);
            }
        })
    })

};
