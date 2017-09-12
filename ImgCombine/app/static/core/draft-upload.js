/**
 * Created by huoqiming on 2017/6/12.
 */

/* 未引入 */
$("#draft-select3").click(function () {
    var object = document.getElementById("obj-draft3");
    if(object.style.display == "block"){
        $("#obj-draft3").css("display","none");
    }
    else{
        $("#obj-draft3").css("display","block");
    }
    $("#obj-local3").css("display","none");
});
$("#draft-close3").click(function () {
    $("#obj-draft3").css("display","none");
});

