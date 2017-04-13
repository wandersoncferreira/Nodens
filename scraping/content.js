var request = require('request');
var cheerio = require('cheerio');

exports.folha_sp = function(url, callback){

    request(url, function(error, resp, body){
        if (!error){
            $ = cheerio.load(body, {decodeEntities: false});

            var json = {secao: "", titulo: "", texto: "", data: "", palavras_chaves: "",
                        links_pchaves: ""}

            var secao = $('.section-masthead h1 a').text();
            var titulo = $('.news').find('h1').text();
            var texto = $('.news').find('.content').text();
            var data = $('#news time').attr('datetime');

            // calculando as informacoes relacionadas a pagina
            var palavras_chaves = [];
            var lista_links = [];

            $('#tags-related-box li a').each(function(){
                var _texto = $(this).text();
                var _link = $(this).attr('href');

                palavras_chaves.push(_texto);
                lista_links.push(_link);
            })

            json.secao = secao;
            json.titulo = titulo;
            json.texto = texto;
            json.data = data;
            json.palavras_chaves = palavras_chaves;
            json.links_pchaves = lista_links;

            return callback(null, JSON.stringify(json, null, 4));

        }else{
            return callback(error);
        }
    })
}
