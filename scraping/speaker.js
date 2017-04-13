var request = require('request');
var cheerio = require('cheerio');

exports.folha_sp = function(url, callback) {

    request(url, function(err, resp, html){
        if (!err){
            $ = cheerio.load(html, {decodeEntities: false});

            var json = {autor: "", colunista: true, nome_colunista: "",
                        biografia: ""}

            var nome_colunista = $('.columnist-top-full > .top-wrapper > h2 > a').text();
            var autor = $('.news .author').text();
            var biografia = $('.columnist-top-full .biography .content').text();

            if (typeof nome_colunista !== 'undefined' && nome_colunista !== null){
                var colunista = true
            }else{
                var colunista = false
            }

            json.autor = autor
            json.colunista = colunista
            json.nome_colunista = nome_colunista
            json.biografia = biografia

            return callback(null, JSON.stringify(json, null, 4));
        }
        else{
            return callback(err);
        }
    })
}
