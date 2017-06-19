$(function() {

  var invisibleNavNum = [];

  for (var i = 0; i < recruit_pages.length; i++) {
    if ((recruit_pages[i]["display_flg"]) == 0) {
      var _elm = recruit_pages[i];
      invisibleNavNum.push(_elm["page_id"]);
    }
  }

  console.log(invisibleNavNum)


  var navList = $("#recruit-nav li");
  for (var j = 0; j < navList.length; j++) {

      // console.log(invisibleNavNum)
    for (var k = 0; k < invisibleNavNum.length; k++) {


      // console.log($(navList[j]).data('num'))


      if ($(navList).data('num') == $(invisibleNavNum)) {


      }


    }

  }

});
