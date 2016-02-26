/**
 * Created by Jottis on 2016-02-22.
 */
function JobbUI(jobbDataObject){
    this.data = jobbDataObject;
}

JobbUI.prototype.getSummaryDOM = function(){
    var dom = document.createElement("div");
    $(dom).addClass("jobb");
    $(dom).addClass("summary");

    // jobb-presentationens titel
    var titel = document.createElement("h3");
    $(titel).addClass("titel");
    $(titel).text(this.data.annons.yrkesbenamning);

    // jobb-presentationens beskrivning
    var desc = document.createElement("p");
    $(desc).addClass("beskrivning");
    $(desc).text(this.data.annons.annonsrubrik);

    // jobb-presentationens stad
    var kommun = document.createElement("p");
    $(kommun).addClass("beskrivning");
    $(kommun).text(this.data.annons.kommunnamn);

    $(dom).append(titel);
    $(dom).append(desc);
    $(dom).append(kommun);

    return dom;
}