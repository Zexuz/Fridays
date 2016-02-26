/**
 * Created by martin on 2016-02-15.
 */
function JobbAPI(){
    this.baseUrl = "http://api.arbetsformedlingen.se/af/v0/platsannonser/";
}

JobbAPI.prototype.getMatchningslista = function(kommunId, nyckelord, callback){

    //var me = this;

    $.get(this.baseUrl + "matchning?nyckelord="+nyckelord, function(data){
        console.log("getMatchningslista");
        console.log(data);

        // anropar callbacken med returnerad data
        callback(data.matchningslista.matchningdata);
    });

}

JobbAPI.prototype.getAnnonsData = function(annonsId, callback, callBackSource){
    $.get(this.baseUrl + annonsId, function(data){
        console.log("getAnnonsData");
        console.log(data);

        // anropar callback
        callback.call(callBackSource, data.platsannons);
    });

}