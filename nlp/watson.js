var fs = require('fs');
var ini = require('ini');
var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var translationCredentials = function(){
    var config = ini.parse(fs.readFileSync(__ini, 'utf-8'));
    var json = {username: "", password: "", url: ""}
    json.username = config.watson.translation.user
    json.password = config.watson.translation.password
    json.url = config.watson.translation.url
    return json
}

var analyzeCredentials = function(){
    var config = ini.parse(fs.readFileSync(__ini, 'utf-8'));
    var json = {username: "", password: "", version_date: ""};
    json.username = config.watson.analyze.user
    json.password = config.watson.analyze.password
    json.version_date = config.watson.analyze.version_date
    return json
}

var translate = function(text){
    return new Promise(function(resolve, reject){
        var language_translator = new LanguageTranslatorV2(translationURL());
        language_translator.translate({
            text: text,
            source: 'pt',
            target: 'en'
        }, function(err, response){
            if (err){
                return reject(err);
            }else{
                return resolve(JSON.stringify(response, null, 2))
            }
        })
    })   
}

var analyze = function(text, features){
    return new Promise(function(resolve, reject){
        var nlu = new NaturalLanguageUnderstandingV1(analizeCredentials())
        nlu.analyze({
            'text': text,
            'features': features
        }, function(error, response){
            if (error){
                reject(error);
            }else{
                resolve(JSON.stringify(response, null, 2))
            }
        })
    })
}
