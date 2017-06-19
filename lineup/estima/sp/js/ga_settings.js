var gaUtil =  gaUtil || {};

gaUtil.trackingItem = [{"name":"dlps","id":"aaaa"},{"name":"dts","id":"bbbb"},{"name":"store","id":"cccc"}];
gaUtil.trackCategory = "estima";

gaUtil.AGC_PARAM = "from_agc";
gaUtil.AD_TYPE_PARAM = "ad_type";

gaUtil.labels = {
    DTS:"dts",
    DLP:"dlps",
    NORMAL:"normal"
};

gaUtil.adLabel = {
    SEARCH:"search",
    DISPLAY:"display",
    NORMAL:""
};

 function getURLParam(){
    var arg = new Object;
    var pair=location.search.substring(1).split('&');
    for(var i=0;pair[i];i++) {
        var kv = pair[i].split('=');
        arg[kv[0]]=kv[1];
    }
    return arg;
}

gaUtil.setGoogleAnalyticsMode = function(){
    var param = getURLParam();

    switch(param[gaUtil.AGC_PARAM]){
        case gaUtil.labels.DTS:
        gaUtil.mode = gaUtil.labels.DTS;
        break;
        case gaUtil.labels.DLP:
        gaUtil.mode = gaUtil.labels.DLP;
        break;
        default:
        gaUtil.mode = gaUtil.labels.NORMAL;
        break;
    }
}

gaUtil.setGoogleAnalyticsAdType = function(){
    var param = getURLParam();

    switch(param[gaUtil.AD_TYPE_PARAM]){
        case gaUtil.adLabel.SEARCH:
        gaUtil.adType = gaUtil.adLabel.SEARCH;
        break;
        case gaUtil.adLabel.DISPLAY:
        gaUtil.adType = gaUtil.adLabel.DISPLAY;
        break;
        default:
        gaUtil.adType = gaUtil.adLabel.NORMAL;
        break;
    }
}

gaUtil.setGoogleAnalyticsMode();
gaUtil.setGoogleAnalyticsAdType();