/**
 * Created by Martin on 2016-02-04.
 */
function JobbManager() {
    this.api = new ABF.jobb.API();

    var me = this;

    // callback för matchningslista
    this._getMatchningslistaCallback = function (data) {
        console.log("getMatchbningslista callback");
        console.log(data);

        // En loop som skapar JobbData-objekt av alla jobb-matchningar
        if (data)
            for (var i = 0; i < data.length; i++) {
                new ABF.jobb.Data(data[i].annonsid, me._onJobbdataLoaded);
            }
    }
}

JobbManager.prototype.getJobb = function (kommunId, nyckelord) {
    $("jobblista").html("");
    //FIX: Vi kan nu inte söka på tomma strängar
    if(nyckelord.trim().length == 0)return;
    this.api.getMatchningslista(kommunId, nyckelord, this._getMatchningslistaCallback);
}


// callback för när JobbData-objekt har laddat sin data
JobbManager.prototype._onJobbdataLoaded = function () {
    console.log("Ett jobb har laddats klart");
}