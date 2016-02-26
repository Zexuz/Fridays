/**
 * Created by Martin on 2016-01-18.
 */

// start
$(document).ready(function(){

    var jobbmanager = new ABF.jobb.Manager();
    //jobbmanager.getJobb(12345, "buss");

    $("#search-text").on("keyup", function(ev){
        $("p").remove();
        $("h3").remove();
        var searchtext = ev.target.value;
        jobbmanager.getJobb(12345, searchtext);
    });

});

function ABF(){}

ABF.jobb = {};

ABF.jobb.Data = JobbData;
ABF.jobb.API = JobbAPI;
ABF.jobb.UI = JobbUI;
ABF.jobb.Manager = JobbManager;



// Funktion som gör AJAX-anrop
// Hämtar mer detaljer om ett jobb via ett annons-id (fås av jobbslista (getJobb()))
function getAnnons(annonsid, item){
    $.get("http://api.arbetsformedlingen.se/af/v0/platsannonser/"+annonsid, function(data){
        console.log("jobb");
        console.log(data);

        // rensar förgående utskruft
        $("#jobblista").html('');

        // sparar listan med API:ts sökresultat i egen variabel
        var annons = data.platsannons;
        console.log(annons);

        // Skapar en tag som cointiner för yrket
        //var item = document.createElement("div");
        // om yrker ha lediga jobb, stoppa text i a-tagg, annats låt bli

        var rubrikDOM = document.createElement("h3");
        $(rubrikDOM).text(annons.annons.annonsrubrik);
        var textDOM = document.createElement("p");
        $(textDOM).text(annons.annons.annonstext);

        // lägger till de nya taggarna till item
        $(item).append(rubrikDOM);
        $(item).append(textDOM);

        // Lägger till taggen <p>Ledigt-jobb-titel</p> till den befitnliga taggen med id="jobblista"
        $("#jobblista").append(item);

    });

}


// Funktion som gör AJAX-anrop
// Hämtar lediga jobb för ett "jobb-id" (fås av yrkeslista (getYrken()))
function getJobb(yrkesId){

    $.get("http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?yrkesid="+yrkesId, function(data){
        console.log("jobb");
        console.log(data);

        // rensar förgående utskruft
        $("#jobblista").html('');

        // sparar listan med API:ts sökresultat i egen variabel
        var jobblista = data.matchningslista.matchningdata;

        // Loopar igenom listan
        for(var i = 0; i < jobblista.length; i++){
            // Sparar ett objekt från resuyltatlistan i egen variabel
            var jobb = jobblista[i];
            // Skapar en tag som cointiner för yrket
            var item = document.createElement("div");
            // om yrker ha lediga jobb, stoppa text i a-tagg, annats låt bli

            var rubrik = jobb.annonsrubrik;
            var arbetsplats = jobb.arbetsplatsnamn;
            var kommun = jobb.kommunnamn;

            var rubrikDOM = document.createElement("h3");
            $(rubrikDOM).text(rubrik);
            var arbeteDOM = document.createElement("p");
            $(arbeteDOM).text(arbetsplats);
            var kommunDOM = document.createElement("p");
            $(kommunDOM).text(kommun);
            var annonsDOM = document.createElement("button");
            $(annonsDOM).text("Visa annons");
            $(annonsDOM).attr("data-annonsid", jobb.annonsid);
            getAnnons(jobb.annonsid, item);
            /*$(annonsDOM).on("click", function(ev){

                var annonsid = $(annonsDOM).attr("data-annonsid");
                getAnnons(annonsid);

            });*/


            // lägger till de nya taggarna till item
            $(item).append(rubrikDOM);
            $(item).append(arbeteDOM);
            $(item).append(kommunDOM);
            $(item).append(annonsDOM);

            // Lägger till taggen <p>Ledigt-jobb-titel</p> till den befitnliga taggen med id="jobblista"
            $("#jobblista").append(item);
        }

    });

}



// Funktion som gör AJAX-anrop
// Hämtar och skriver ut yrken efter sökterm
// men kan fungera som en "mall" för andra anrop
function getYrken(searchterm){

    $.get("http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrken/"+searchterm+"/?antalrader=100", function(data){
        console.log(data);

        // rensar förgående utskruft
        $("#jobblista").html('');

        // sparar listan med API:ts sökresultat i egen variabel
        var yrken = data.soklista.sokdata;

        // Loopar igenom listan
        for(var i = 0; i < yrken.length; i++){
            // Sparar ett objekt från resuyltatlistan i egen variabel
            var yrke = yrken[i];
            // Skapar en tag som cointiner för yrket
            var item = document.createElement("p");
            // om yrker ha lediga jobb, stoppa text i a-tagg, annats låt bli
            if(yrke.antal_ledigajobb > 0){
                // om lediga jobb
                // skapa a-tagg, lägg titel i a-taggen
                var link = document.createElement("a");
                $(link).attr("href", "#");
                $(link).attr("data-yrkes-id", yrke.id);
                $(link).text(yrke.namn + " ("+yrke.antal_ledigajobb+")");
                // lägg till klick-lyssnare
                /*
                $(link).on("click", function(ev){
                    var linkDOM = ev.target;
                    var yrkesId = $(linkDOM).attr("data-yrkes-id");
                    getJobb(yrkesId);
                });
                */
                (function (yrkesId) {
                    $(link).on("click", function(ev){
                        var linkDOM = ev.target;
                        getJobb(yrkesId);
                    });
                })(yrke.id);
                // LÄgger till a-taggen i p-taggen
                $(item).append(link);
            } else {
                // inga lediga jobb
                // Lägger titeln/namnet i p-taggen
                $(item).text(yrke.namn + " ("+yrke.antal_ledigajobb+")");
            }

            // Lägger till taggen <p>Ledigt-jobb-titel</p> till den befitnliga taggen med id="jobblista"
            $("#jobblista").append(item);
        }

    });

}
