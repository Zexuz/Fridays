/**
 * Created by Martin on 2016-02-01.
 */
/**
 * Objekt som håller data för ett ledigt jobb
 * @constructor
 */


function JobbData(annonsid, onDataLoadedCallback){
    this.data = null; // lagrar ABF annnonsdata för jobb
    this.annonsid = annonsid;
    this.onDataLoaded = onDataLoadedCallback || null;

    this.api = new ABF.jobb.API();

    var me = this;

    // Callback för när annonsdatan har laddats
    this._onGetAnnonsData = function(data){
        console.log("onGetAnnonsData");
        console.log(data);

        me.data = data;

        // unit-test av JobbUI
        var ui = new ABF.jobb.UI(me.data);
        // lägger till esummary html till #jobblista-diven
        $("#jobblista").append(ui.getSummaryDOM());

        // kör callbacken
        me.onDataLoaded();
    }

    this.update();
}

JobbData.prototype.update = function(){
    this.api.getAnnonsData(this.annonsid, this._onGetAnnonsData);
    // och kanske andra saker som behöver göras vid update
}



