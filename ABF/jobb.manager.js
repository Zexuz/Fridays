/**
 * Created by Martin on 2016-02-04.
 */
function JobbManager() {
    this.api = new ABF.jobb.API();

    var me = this;
    this.latestGuid = null;

    // callback för matchningslista
    this._getMatchningslistaCallback = function (data,guid) {
        console.log("getMatchbningslista callback");
        console.log(data);
        // En loop som skapar JobbData-objekt av alla jobb-matchningar

        console.log(guid);
        console.log(me.latestGuid);

        if (data && guid == me.latestGuid)
            for (var i = 0; i < data.length; i++) {
                new ABF.jobb.Data(data[i].annonsid, me._onJobbdataLoaded);
            }
    }

    this._createGuid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}

JobbManager.prototype.getJobb = function (kommunId, nyckelord) {
    $("jobblista").html("");
    //FIX: Vi kan nu inte söka på tomma strängar
    if(nyckelord.trim().length == 0)return;

    var guid = this._createGuid();
    this.latestGuid = guid;

    this.api.getMatchningslista(kommunId, nyckelord,guid, this._getMatchningslistaCallback);
}


// callback för när JobbData-objekt har laddat sin data
JobbManager.prototype._onJobbdataLoaded = function () {
    console.log("Ett jobb har laddats klart");
}