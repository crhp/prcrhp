$(function() {
    var hour_right = $(".hour:odd");
    var hour_left = $(".hour:even");
    hour_left.addClass('left');
    hour_right.addClass('right');


    var array = [];
    console.log(array);
    for (var i = 0; i < $(".hour").length; i++) {

        array.push($(".hour").eq(i).height());

        // $(".hour").css({"margin-top":-array[i]})
    }


});
