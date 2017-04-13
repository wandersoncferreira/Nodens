var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs')
var extend = require('util')._extend

const url = "http://www1.folha.uol.com.br/colunas/monicabergamo/2017/04/1873788-prefeitura-de-sp-reforca-orientacao-para-cortar-30-dos-comissionados.shtml"
request(url, function(err, resp, html){
    if (!err){
        $ = cheerio.load(html, {decodeEntities: true});

        // some parameters I need to get
        var main_section = $('.section-masthead h1 a').text()
        var title = $('.news').find('h1').text()
        var text = $('.news').find('.content').text()
        var author = $('.news .author').text()
        var datetime = $('#news time').attr("datetime")

        var json = {title: "", text: "", author: "", datetime: "", section: ""};

        json.title = title
        json.text = text
        json.author = author
        json.datetime = datetime
        json.section = main_section

        // temas relacionados
        var relacionados = {palavras_chaves: "", links: ""};
        var ltemas = [];
        var llinks = [];

        $('#tags-related-box li a').each(function() {
            var text = $(this).text();
            var link = $(this).attr('href');

            ltemas.push(text)
            llinks.push(link)
        })

        relacionados.palavras_chaves = ltemas
        relacionados.links = llinks

        var response = extend(json, relacionados)

        // commentarista
        var comentarista = $('.columnist-top-full > .top-wrapper > h2 > a').text();
        var biografia = $('.columnist-top-full .biography .content').text();

        // console.log($('.columnist-top-full .biography .content').text())

        fs.writeFile('output_doria.json', JSON.stringify(response, null, 4), function(err){
            console.log("File successfully written!")
        })
    }
})
