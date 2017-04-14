exports.folhaSP = function(cheerio_obj){

    var json = {secao: "", titulo: "", texto: "", data: "", palavras_chaves: "",
                links_pchaves: ""}

    var secao = cheerio_obj('.section-masthead h1 a').text();
    var titulo = cheerio_obj('.news').find('h1').text();
    var texto = cheerio_obj('.news').find('.content').text();
    var data = cheerio_obj('#news time').attr('datetime');

    // calculando as informacoes relacionadas a pagina
    var palavras_chaves = [];
    var lista_links = [];

    cheerio_obj('#tags-related-box li a').each(function(){
        var _texto = cheerio_obj(this).text();
        var _link = cheerio_obj(this).attr('href');

        palavras_chaves.push(_texto);
        lista_links.push(_link);
    })

    json.secao = secao;
    json.titulo = titulo;
    json.texto = texto;
    json.data = data;
    json.palavras_chaves = palavras_chaves;
    json.links_pchaves = lista_links;

    return JSON.stringify(json, null, 4);
}

exports.folhaSPLinks = function(cheerio_obj){
    var $ = cheerio_obj
    var json = {links: "", titles: ""}

    var llinks = [];
    var ltitles = [];

    $('a').each(function(){
        var link = $(this);
        var text = link.text();
        var href = link.attr('href');

        llinks.push(href);
        ltitles.push(text);
    })

    json.links = llinks;
    json.titles = ltitles;

    return JSON.stringify(json, null, 4);
}
