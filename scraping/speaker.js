exports.folha_sp = function(cheerio_object) {

    var json = {autor: "", colunista: true, nome_colunista: "",
                biografia: ""}

    var nome_colunista = cheerio_object('.columnist-top-full > .top-wrapper > h2 > a').text();
    var autor = cheerio_object('.news .author').text();
    var biografia = cheerio_object('.columnist-top-full .biography .content').text();

    if (typeof nome_colunista !== 'undefined' && nome_colunista !== null){
        var colunista = true
    }else{
        var colunista = false
    }

    json.autor = autor
    json.colunista = colunista
    json.nome_colunista = nome_colunista
    json.biografia = biografia
    return JSON.stringify(json, null, 4);
}
