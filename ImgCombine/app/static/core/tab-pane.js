/**
 * Created by huoqiming on 2017/6/12.
 */
var index=4;
var cur_index;

/* 标签页增加操作 */
$("#add").click(function(){
    $("#add").parent().before("<li id='lp" + index + "' class='option'><a href='#panel-" + index + "' data-toggle='tab'>前景获取</a></li>");
    $("#tab-content").append(
        '<div class="tab-pane" id="panel-'+index+'">'+
        '<br/>'+
        '<div class="container">'+
        //'<div class="row" style="height: 60px">'+
        '<div class="row" id="searchTop' + index + '" style="height: 60px;display:block;">'+



        '<div class="col-md-3">'+
        '</div>'+
        '<div class="col-md-6">'+
        '<input class="qb-search-input" placeholder="请输入搜索内容" type="text" value="" onkeypress="keyobjSearch(this.id)" name="search" id="text-obj' + index + '" />'+
        '<span class="qb-icon-select"></span>'+
        '<button type="button" class="qb-search-local" id="obj-select' + index + '" onclick="shiftLocal(this.id)"></button>'+
        '<span class="qb-icon-pencil"></span>'+
        '<button type="button" class="qb-pen-local" id="draft-select' + index + '" onclick="shiftDraft(this.id)"></button>'+
        '<span class="qb-icon-search">搜索一下</span>'+
        '<button type="button" class="qb-search-submit" id="obj-search' + index + '" onclick="objSearch(this.id)"></button>'+
        '</div>'+
        '<div class="col-md-3">'+
        '</div>'+
        '</div>'+
        '<div class="row">'+
        '<div id="obj-local' + index + '" style="display: none">'+
        '<div class="col-md-3">'+
        '</div>'+
        '<div style="border:1px solid #775ba3;" class="col-md-6">'+
        '<div class="col-md-4">'+
        '</div>'+
        '<div class="col-md-4">'+
        '<div style="height: 100px;">'+
        '</div>'+
        '<a href="javascript:;" class="file-back">本地上传文件'+
        '<input type="file" name="imgOne' + index + '" id="imgOne'+ index +'" onchange="upload_obj(this.id);">'+
        '</a>'+
        '</div>'+
        '<div class="col-md-4">'+
        '<button type="button" class="close" id="obj-close' + index + '">'+
        '<span aria-hidden="true">&times;</span>'+
        '<span class="sr-only">Close</span>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div class="col-md-3">'+
        '</div>'+
        '</div>'+
        '</div>'+
        //'<div class="row" >'+
        '<div class="row" style="position:relative;top:0;left:0;z-index:999;">'+


        '<div id="obj-draft' + index + '" style="margin:0 auto;display: none">'+
        //'<div class="col-md-3">'+
        //'</div>'+
        //'<div class="col-md-6" style="border:1px solid #775ba3;padding: 0;">'+
        '<div class="col-md-12" style="border:1px solid #775ba3;padding: 0;">'+
        '<div class="row">'+
        '<div class="col-md-4">'+
        '</div>'+
        '<div class="col-md-4">'+
        '</div>'+
        '<div class="col-md-4" style="padding-right: 35px;">'+
        '<button type="button" class="close" id="draft-close' + index + '">'+
        '<span aria-hidden="true">&times;</span>'+
        '<span class="sr-only">Close</span>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div class="top">'+
        '<div class="row">'+
        '<div class="col-md-4" align="center">'+
        '<button id="paint' + index + '" type="button" class="btn btn-default btn-lg" aria-label="Paint">'+
        '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'+
        '</button>'+
        '</div>'+
        '<div class="col-md-4" align="center">'+
        '<button id="eraser' + index + '" class="btn btn-default btn-lg" aria-label="Eraser">'+
        '<span class="glyphicon glyphicon-erase" aria-hidden="true"></span>'+
        '</button>'+
        '</div>'+
        '<div class="col-md-4" align="center">'+
        '<button class="btn btn-default btn-lg" id="clear' + index + '" aria-label="ClearCanvas">'+
        '清空画布'+
        '</button>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div style="width: 840px;margin:0 auto;">'+
        '<canvas class="obj_canvas" id="canvas' + index + '" width="840px" height="600px" style="margin:0 auto;border:1px solid;">Your pathetic browser does not support Canvas.</canvas>'+
        '</div>'+
        '<div class="row">'+
        '<div class="col-md-9">'+
        '<div class="btn-group">'+
        '</div>'+
        '<div class="btn-group">'+
        '</div>'+
        '</div>'+
        '<div class="col-md-3" style="padding-right: 35px;">'+
        '<button class="btn btn-primary btn-block" id="getImgs' + index + '" aria-label="ClearCanvas" onclick="getImgs(this.id)">'+
        '草图检索'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div style="height: 20px;">'+
        '</div>'+
        '</div>'+
        //'<div class="col-md-3">'+
        //'</div>'+



        '</div>'+
        '</div>'+
        '</div>'+
        '<br/>'+
        '<h3 text-align="center">素材区</h3>'+
        '<div id="resultArea' + index + '">'+
        '</div>'+
        '<br/>'+

        '</div>'

    );

    index = index + 1;

});



/* 标签页删除操作 */
$("#delete").click(function () {
    var delObj = document.getElementsByClassName("option active");
    var deleteIndex = $(delObj).children().attr("href").split("#panel-")[1];
    $(delObj).remove();
    $("#panel-"+deleteIndex).remove();
});



/* 关闭按钮点击收回 */
$("body").on('click','.nav-tabs li',function () {

        var _id = $(this).attr('id');
        if(_id){
            if(_id!="main-panel"){
                cur_index = _id.split("lp")[1];

                $("body").on("click","#obj-close"+ cur_index,function () {

                    var tmpId = "obj-local"+ cur_index;
                    document.getElementById(tmpId).style.display = "none";
                });

                $("body").on("click","#draft-close"+ cur_index,function () {

                    var tmpId = "obj-draft"+ cur_index;
                    document.getElementById(tmpId).style.display = "none";


                    var searchId = "searchTop" + cur_index;

                    document.getElementById(searchId).style.display = "block";

                });

                /*
                $(document).on('click',function(e){
                    // 判断被点击的元素是不是画笔元素，不是的话，就隐藏之
                    if( e.target != document.getElementById("obj-draft"+cur_index) ){
                        if(e.target == document.getElementById("draft-select"+cur_index)){
                            $("#obj-draft"+cur_index).css("display","block");
                        }
                        else if(e.target == (document.getElementById("paint"+cur_index))){

                            $("#obj-draft"+cur_index).css("display","block");
                        }
                        else if(e.target == (document.getElementById("canvas"+cur_index))){

                            $("#obj-draft"+cur_index).css("display","block");
                        }
                        else if(e.target == (document.getElementById("eraser"+cur_index))){

                            $("#obj-draft"+cur_index).css("display","block");
                        }
                        else if(e.target == (document.getElementById("clear"+cur_index))){

                            $("#obj-draft"+cur_index).css("display","block");
                        }
                        else{
                            $("#obj-draft"+cur_index).css("display","none");
                        }

                    }
                    else{
                        $("#obj-draft"+cur_index).css("display","block");
                    }
                });


                $(document).on('click',function(e){
                    // 判断被点击的元素是不是本地按钮元素，不是的话，就隐藏之
                    if( e.target != document.getElementById("obj-local"+cur_index) ){
                        if(e.target == document.getElementById("obj-select"+cur_index)){
                            $("#obj-local"+cur_index).css("display","block");
                        }
                        else{
                            $("#obj-local"+cur_index).css("display","none");
                        }

                    }
                    else{
                        $("#obj-local"+cur_index).css("display","block");
                    }
                });
                */


            }
        }

});



/* 本地按钮点击弹出收回 */
function shiftLocal(obj) {
    var shift_local_index = obj.split("obj-select")[1];
    var tmpId = "obj-local"+ shift_local_index;
    var dmpId = "obj-draft"+ shift_local_index;


    if(document.getElementById(tmpId).style.display == "block") {

        document.getElementById(tmpId).style.display = "none";
    }
    else{
        document.getElementById(tmpId).style.display = "block";
    }
    document.getElementById(dmpId).style.display = "none";
}




/* 手绘按钮点击弹出收回 */
function shiftDraft(obj) {
    var shift_draft_index = obj.split("draft-select")[1];

    var tmpId = "obj-draft"+ shift_draft_index;
    var lmpId = "obj-local"+ shift_draft_index;
    var searchId = "searchTop" + shift_draft_index;

    document.getElementById(searchId).style.display = "none";

    if(document.getElementById(tmpId).style.display == "block"){
        document.getElementById(tmpId).style.display = "none";
    }
    else{
        document.getElementById(tmpId).style.display = "block";
    }

    document.getElementById(lmpId).style.display = "none";
    draw(shift_draft_index);

}



/* 文本搜图请求事件 */
function objSearch(obj) {
    var URL = "/bingResult";
    var page_index = obj.split("obj-search")[1];
    if($("#text-obj"+page_index).val()){
        $.ajax({
            url: URL,
            method: 'POST',
            data: {"queryexpression":$("#text-obj"+page_index).val()},
            dataType: 'json',
            beforeSend: function (){
                $("#loadingA").css("top",$(document).scrollTop()+'px');
                $("#loadingA").show();
            },
            success:function (data) {
                if (data.result.length != 0) {           //背景图
                    $("#resultArea"+page_index).empty();
                    var html = "<br/><div class='container'>";
                    for (var i = 0; i < (data.result.length); i++) {
                        var image = data.result1[i]; //缩略图
                        var image1 = data.result[i];      //原图
                        
                        html += "<div class='avatar-view' onmousedown='printA(this.childNodes)' data-toggle='modal' data-target='#myModal'><img id='"+ image1 +"' src='" + image + "' height='200'></div>";
                    }
                    html += "</div>";
                    
                    $("#resultArea"+page_index).append(html);

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            },

            complete: function (){
                $("#loadingA").css("top",0);
                $("#loadingA").hide();
            }
        });
    }
    else{
        alert("请输入内容");
    }
}



/* 文本搜图请求事件 */
function keyobjSearch(obj,e) {
    var URL = "/bingResult";
    var page_index = obj.split("text-obj")[1];
    var e = e || window.event;
    if(e.keyCode == 13){
        if($("#text-obj"+page_index).val()){
            $.ajax({
                url: URL,
                method: 'POST',
                data: {"queryexpression":$("#text-obj"+page_index).val()},
                dataType: 'json',
                beforeSend: function (){
                    $("#loadingA").css("top",$(document).scrollTop()+'px');
                    $("#loadingA").show();
                },
                success:function (data) {
                    if (data.result.length != 0) {           //背景图
                        $("#resultArea"+page_index).empty();
                        var html = "<br/><div class='container'>";
                        for (var i = 0; i < (data.result.length); i++) {
                            var image = data.result1[i]; //缩略图
                            var image1 = data.result[i];      //原图

                            html += "<div class='avatar-view' onmousedown='printA(this.childNodes)' data-toggle='modal' data-target='#myModal'><img id='"+ image1 +"' src='" + image + "' height='200'></div>";
                        }
                        html += "</div>";

                        $("#resultArea"+page_index).append(html);

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                },

                complete: function (){
                    $("#loadingA").css("top",0);
                    $("#loadingA").hide();
                }
            });
        }
        else{
            alert("请输入内容");
        }
    }

}









/* 判断画布上是否有内容 */
function isCanvasBlank(canvas) {
    var blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;

    return canvas.toDataURL() == blank.toDataURL();
}

/* 手绘搜图请求事件 */
function getImgs(obj) {
    var page_index = obj.split("getImgs")[1];
    var canvas = document.getElementById("canvas"+page_index);
    if(isCanvasBlank(canvas)){
        alert("请在画布上勾出轮廓");
    }
    else{
        var base64 = canvas.toDataURL("image/png");
        base64 = base64.split(",")[1];
        $.ajax({
            url:'/draftSelf',
            method:'POST',
            data:{"value":base64},
            dataType: 'json',
            beforeSend: function (){
                $("#loadingA").css("top",$(document).scrollTop()+'px');
                $("#loadingA").show();
            },
            success:function (data) {
                if (data.result[0].length != 0) {           //背景图
                    $("#resultArea"+page_index).empty();

                    var html = "<br/><div class='container'>";
                    for (var i = 0; i < (data.result[0].length); i++){
                        var image = ServerURL + "/flaskr2/static/Imgs/"+data.result[0][i];      //结果图
                        html += "<div class='avatar-view' onmousedown='printA(this.childNodes)' data-toggle='modal' data-target='#myModal'><img id='"+ image +"' src='" + image + "' height='200'></div>";
                    }
                    html += "</div>";
                    $("#resultArea"+page_index).append(html);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            },

            complete: function (){
                $("#loadingA").css("top",0);
                $("#loadingA").hide();
            }
        });
    }

}


