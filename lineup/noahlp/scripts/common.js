var tpl = tpl || {};

(function(){
    //settings
    var JSON_PATH = "./common.json";//販社jsonのパス
    
    var deviceType = "pc";
    var data;
    var isJsonLoaded = false;
    var isOnLoad = false;

    //sp判定をsitecatalystと合わせる
    var ua = navigator.userAgent;
    if((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)){
        deviceType = "sp";
    }

    function loadJson(){

        $.ajax({
            url: JSON_PATH,
            type: 'GET',
            dataType: 'json'
        })
        .done(function(json) {

            data = json;
            createGA();
            initStoreName();
            initCVNavigation();
            prepareContentsData();
            initCVButton();
            initContentsGa();
            initCampaign();
            initPlan();
            isJsonLoaded = true;
            setTimeout(function(){
                $(document).trigger("contentsJsonLoaded",[data]);    
            },10)
            
            checkContentsLoaded();
            
        })
        .fail(function() {
            
        })
        .always(function() {
            
        });
    }
    loadJson();

    $(window).load(function(){
        isOnLoad = true;
        checkContentsLoaded();
    });

    function createGA(){
        if(window.ga){
            var tracker = [];
            if(data.h_ga1) tracker.push({name:"newTracker1",id:data.h_ga1});
            if(data.h_ga2) tracker.push({name:"newTracker2",id:data.h_ga2});

            for (var i = 0; i < tracker.length; i++) {
                ga('create', tracker[i].id, 'auto', {'name': tracker[i].name});
                ga(tracker[i].name +'.send', 'pageview');
            }
        }
    }

    //jsonのloadとonloadの両方が完了したら呼び出される
    function checkContentsLoaded(){
        if(isJsonLoaded && isOnLoad){
            setTimeout(function(){
                $(document).trigger("contentsReady",[data]);
            },10)
            
        }
    }


    //pcかspに応じて使用するgaの値を決める。(useragentでの判断)
    function prepareContentsData(){
        
        for(var type in data.cv){            
            data.cv[type].event_header = data.cv[type]["event_header_"+deviceType];
            data.cv[type].event_contents = data.cv[type]["event_contents_"+deviceType];
            data.cv[type].event_footer = data.cv[type]["event_footer_"+deviceType];
        }
    }
    
    //jsonデータをもとにコンバージョンボタンを初期化する
    function initCVButton(){
        //リンク先とonclickの設定

        if(window.ga){
            $('.tpl-cv').each(function(index, el) {

                var type = $(el).data("type");
                if(!type) return;

                var location = $(el).data("location");
                var num = $(el).data("num");
                var useData = data.cv[type];
                var gaClick = getGaCode(useData,location,num);

                

                if(window.ga){
                    $(el).attr("onclick",gaClick);    
                }
            });

            function getGaCode(useData,location,num){
                var baseCode="";
                var trackerName = [];
                if(data.h_ga1) trackerName.push("newTracker1");
                if(data.h_ga2) trackerName.push("newTracker2");

                if(num){
                    baseCode = useData[location]+num+"');";
                }else{
                    baseCode = useData[location]+"');";
                }

                var appendCode = "";
                for (var i = 0; i < trackerName.length; i++) {
                    appendCode += baseCode.replace("send",trackerName[i]+".send");
                }

                return baseCode+appendCode;

            }
        }

        var typeArr = ["store","catalog","online","try","shodan"];
        for (var i = 0; i < typeArr.length; i++) {
            var useData = data.cv[typeArr[i]];
            if(useData.btn == "false"){
                continue;
            }
            $('.tpl-nav-'+typeArr[i]).find("a").attr("href",useData.url);
        }
    }

    function initContentsGa(){
        if(window.ga){
            if($('.tpl-ui-log').length > 0){
                
                $('.tpl-ui-log').on('click',function(e){
                    var toggleOption = $(this).data("toggle");
                    var gavalue = $(this).attr("data-ga");
                    if(!gavalue) return;
                    
                    var val = $(this).attr("data-ga");
                    var cat = val.split(",")[0];
                    var label = val.split(",")[1];

                    ga('send', 'event',data.c_name,cat, deviceType+"_"+label);

                    //出しわけなどしている場合に対応
                    var target = $(".tpl-ui-log[data-ga='"+gavalue+"']");
                    if(toggleOption){
                        var arr = toggleOption.split(",");
                        for (var i = 0; i < arr.length; i++) {
                            if(gavalue.indexOf(arr[i]) > -1){
                                var labelIdx = i == 0 ? 1:0;
                                gavalue = gavalue.replace(new RegExp(arr[i], 'g'),arr[labelIdx]);
                                target.attr("data-ga",gavalue);
                                break;
                            }
                        }
                    } 
                });
            } 
        }
       
    }

    //ナビゲーションの表示非表示等
    function initCVNavigation(){
        var hiddenNav = [];
        for(var type in data.cv){            
            if(data.cv[type].btn == "false"){
                hiddenNav.push(type);
            }
        }
        for(var i = 0;i<hiddenNav.length;i++){
            $('.tpl-nav-'+hiddenNav[i]).remove();
        }

        //cssでスタイルを適用できるように数字をつける
        var len = $('.tpl-nav-item').length;
        $('.tpl-nav').attr("data-number",String(len));

    }

    //キャンペーンエリアの初期化
    function initCampaign(){
        
        var template = Handlebars.compile($("#tpl-campaign-base").html());
        var isExist = data["cp_type"] == "true" ? true : false;
        var useData = data["cp"];
        useData.cp_name1 = useData.cp_name1 == "false" ? false : useData.cp_name1;
        useData.cp_name2 = useData.cp_name2 == "null" ? null : useData.cp_name2;

        useData.cp_detail1 = useData.cp_detail1 == "false" ? false : useData.cp_detail1;
        useData.cp_detail2 = useData.cp_detail2 == "null" ? null : useData.cp_detail2;

        useData.cp_caution1 = useData.cp_caution1 == "false" ? false : useData.cp_caution1;
        useData.cp_caution2 = useData.cp_caution2 == "null" ? null : useData.cp_caution2;

        if(isArray(useData.cp_detail2)){
            useData.cp_detail2 = getListTag(useData.cp_detail2);
        }

        if(isArray(useData.cp_caution2)){
            useData.cp_caution2 = getListTag(useData.cp_caution2,true);
        }


        useData.cp_image_index = getCampaignImageIndex(useData);
        if(!isExist){
            removeCampaign();
            return;
        }

        var html = template(useData);
        $('.tpl-campaign-contents').append(html);


        function isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }

        function getListTag(arr,isCaution){
            var html = '';
            var prepend = isCaution ? "※" : "";
            for (var i = 0; i < arr.length; i++) {
                html += prepend+sanitize(arr[i])+'<br>';
            }
            return html;
        }

        function sanitize(txt){
            return $('<div></div>').text(txt).html();
        }
    }

    function getCampaignImageIndex(data){
        var maxCpImg = 19;//キャンペーン画像の枠の最大値
        var idx = undefined;
        //trueが見つかった時点でそのインデックスを返す
        for (var i = 0; i < maxCpImg; i++) {
            if(data.cp_img["cp_list"+i] == "true"){
                idx = i;
                return String(idx);
            }
        }
        return idx;
    }

    //販社名の初期化
    function initStoreName(){
        var template = Handlebars.compile($("#tpl-storename").html());
        var useData = data;
        useData.h_logo = useData.h_logo == "true" ? true : false;
        
        //useragent spの時は販社リンクのspチェックを行う
        if(deviceType == "sp"){
            useData.h_url = useData.h_url_sp == "null" ? useData.h_url : useData.h_url_sp;          
        }
        var html = template(useData);
        $('.tpl-nav-storename').append(html);
    }

    //買い方エリアの初期化
    function initPlan(){
        var useData = {};
        var template = {};
        var templateDataArr = [];
        var isExist = data["b_plan"] == "true" ? true : false;

        var numKanzen = Number(data["b_select"]["p_kanzen"]);
        var numZanka = Number(data["b_select"]["p_zanka"]);

        for (var i = 0; i < numZanka; i++) {
            var label = "zanka"+(i+1);
            setTemplateData(label);
        }

        for (i = 0; i < numKanzen; i++) {
            var label = "kanzen"+(i+1);
            setTemplateData(label);
        }

        function setTemplateData(label){
            data[label]["pay_caution"]["pay_caution1"] = data[label]["pay_caution"]["pay_caution1"] == "true" ? true : false;
            template[label] =  Handlebars.compile($("#tpl-plan-"+label).html());
            templateDataArr.push({
                label:label,
                template:template[label],
                order:data[label]["order"]
            });

            if(data[label]){
                useData[label] = data[label];
            }
        }

        //買い方エリアが存在するかチェックする
        if(!isExist){
            removePlan();
            return;
        }

        templateDataArr.sort(function(a,b){
            return Number(a.order) - Number(b.order);
        });

        for (var i = 0; i < templateDataArr.length; i++) {
            var type = templateDataArr[i].label;
            useData[type].type = type;
            var html = templateDataArr[i].template(useData[type]);
            $('.tpl-plan-contents').append(html);
        }
    }

    function removeCampaign(){
        $('.tpl-campaign').remove();
    }
    function removePlan(){
        $('.tpl-plan').remove();
        $('.tpl-nav-plan').remove();
        //そのた買い方にかかわる処理があれば削除。
    }
})();