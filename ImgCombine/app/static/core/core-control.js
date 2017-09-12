/**
 * Created by huoqiming on 2017/6/12.
 */
var img = new Image();
var canvas2 = document.getElementById("main-canvas");
var stage = new JTopo.Stage(canvas2);
stage.mode = "edit";
var backimg;
var scale = 1;
var cropimg;
var scene;
var nodeScale = 1;
var RandomID;
var node;

/* 本地上传获取图片URL */
function getFileUrl(sourceId) {
    var url;
    if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
        url = document.getElementById(sourceId).value;
    } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    }
    return url;
}



/* 图片预览 */
function preImg(sourceId, targetId) {
    var url = getFileUrl(sourceId);
    var imgPre = document.getElementById(targetId);
    imgPre.src = url;
}



/* 回收站中取回图片 */
function rePut(obj) {
    var add_node = new JTopo.Node();
    add_node.setLocation(50,50);
    var height = document.getElementById(obj.id).height;
    var width = document.getElementById(obj.id).width;
    add_node.setSize(width, height);
    var imgURL = document.getElementById(obj.id).src;
    add_node.imagesrc = imgURL;
    add_node.setImage(imgURL);
    (window.scene).add(add_node);
    $("#"+obj.id).css("display","none");
}


/* 本地上传方式，点击图片即覆盖画布 */
function upload_local(sourceId){

    var url = getFileUrl(sourceId);

    $("#panel-2").attr("class","tab-pane");
    $("#panel-1").attr("class","tab-pane active");

    $("#main-panel").attr("class","active");
    $("#lp2").attr("class","");

    $("#welcome").css("display","none");
    $("#main-panel-canvas").css("display","block");

    $("#back-layer").css("display","block");




    $("#combine-button").css("display","block");

    //$("#node-control-button").css("display","block");

    var canvas2= document.getElementById("main-canvas");
    $(canvas2).css("display", "block");
    scene = new JTopo.Scene(stage);
    scene.mode = "edit";


    img.src = url;

    img.onerror= function(){
        alert("The original image is missing,please select the other images");
    }

    img.onload = function(){

        canvas2.width = 840;
        canvas2.height = 300;
        if(img.height<=img.width)
        {
            canvas2.height = img.height*canvas2.width/img.width;
            scale = img.width/canvas2.width;
            scene.background = img.src;
            document.getElementById("main-panel-canvas").style="margin: 0px auto; width: " + canvas2.width + "px; height:"+ canvas2.height +"px;display: block;";
        }
        else{
            canvas2.height =img.height*canvas2.width/img.width;
            scale = img.width/canvas2.width;
            //canvas2.width = img.width*canvas2.height/img.height;
            //scale = img.height/canvas2.height;
            scene.background = img.src;
            document.getElementById("main-panel-canvas").style="margin: 0px auto; width: " + canvas2.width + "px; height:"+ canvas2.height +"px;display: block;";
        }


        backimg = url;
        if(document.getElementById("combine")){
            $("#combine").remove();
        }
        $("#combine-button").append("<button class='btn btn-block btn-primary' id = 'combine' onclick='complete();'>Combine</button>");

        /* 主面板几项操作 */


        (window.scene).click(function (e) {
            node = e.target;
            if(node) {
                document.getElementById("node-control-button").style.display = "block";
            }
            else{
                document.getElementById("node-control-button").style.display = "none";
            }
        });


    }
}


/* 草图搜索方式前景图 onmousedown事件 传递到裁剪框 */
function printB(obj){
    cropimg =  obj[0].src;
}



/* 本地上传前景图 */
function upload_obj(sourceId) {
    var url = getFileUrl(sourceId);
    var img = new Image();
    img.src = url;
    img.onerror= function(){
        alert("Cannot get the node image");
    }
    img.onload = function (){
        var width = img.width*200/img.height;
        var html = "<br/><div class='container'><div onmousedown='printB(this.childNodes)' class='avatar-view' data-toggle='modal' data-target='#myModal'><img title='click this to crop the image' style='height:200px;width:" + width + "px;' src='" + url + "'></div></div>";
        if(window.cur_index){
            $("#resultArea"+window.cur_index).empty();
            $("#resultArea"+window.cur_index).append(html);
        }
    }

}


/* 获取唯一ID函数 */
function getNow() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + month + strDate + date.getHours() + date.getMinutes() + date.getSeconds() + 'image';
    return currentdate;
}



/* 文本搜索方式，点击图片 下载 即覆盖画布 */
function convertURL(obj){
    $("#panel-2").attr("class","tab-pane");
    $("#panel-1").attr("class","tab-pane active");

    $("#main-panel").attr("class","active");
    $("#lp2").attr("class","");

    $("#welcome").css("display","none");
    $("#main-panel-canvas").css("display","block");


    $("#back-layer").css("display","block");


    $("#combine-button").css("display","block");


    //$("#node-control-button").css("display","block");


    var canvas2= document.getElementById("main-canvas");
    $(canvas2).css("display", "block");

    scene = new JTopo.Scene(stage);
    scene.mode = "edit";


    /* 传送背景图 */

    $.ajax({
        url: '/bingDown',
        method: 'POST',
        //async: false,
        //    contentType:"charset=utf-8",
        data: {"value": obj.id},
        beforeSend: function (){
            $("#loadingA").css("top",$(document).scrollTop()+'px');
            $(".loading").show();

        },
        success: function(data) {
            backimg = data.result;

            var pattern  = '/app';
            backimg = backimg.replace(new RegExp(pattern), "");
            //backimg = ServerURL + backimg;

            img.src = backimg;
            img.onerror= function(){
                alert("The original image is missing,please select the other images");
            }
            img.onload = function(){
                canvas2.width = 840;
                canvas2.height = 300;
                if(img.height<img.width)
                {
                    canvas2.height =img.height*canvas2.width/img.width;
                    scale = img.width/canvas2.width;
                    scene.background = img.src;
                    document.getElementById("main-panel-canvas").style="margin: 0px auto; width: " + canvas2.width + "px; height:"+ canvas2.height +"px; display: block;";
                }
                else{
                    canvas2.height =img.height*canvas2.width/img.width;
                    scale = img.width/canvas2.width;
                    //canvas2.width = img.width*canvas2.height/img.height;
                    //scale = img.height/canvas2.height;
                    scene.background = img.src;
                    document.getElementById("main-panel-canvas").style="margin: 0px auto; width: " + canvas2.width + "px; height:"+ canvas2.height +"px; display: block;";
                }
                if(document.getElementById("combine")){
                    $("#combine").remove();
                }
                $("#combine-button").append("<button class='btn btn-block btn-primary' id = 'combine' onclick='complete();'>Combine</button>");

                /* 主面板几项操作*/

                //var node;
                (window.scene).click(function (e) {
                    node = e.target;
                    if(node) {
                        document.getElementById("node-control-button").style.display = "block";
                    }
                    else{
                        document.getElementById("node-control-button").style.display = "none";
                    }
                });
                /*
                var cur_rotate = 0;
                $("#copy-node").click(function () {
                    console.log("textUpload");
                    cur_rotate = 0;
                    var cur_node = new JTopo.Node();
                    var imgURL = node.imagesrc;
                    cur_node.setLocation(50,50);
                    cur_node.setSize(50*nodeScale, 50);
                    cur_node.imagesrc = imgURL;
                    cur_node.setImage(imgURL);
                    window.scene.add(cur_node);
                });
                $("#delete-node").click(function () {
                    cur_rotate = 0;
                    RandomID =getNow();
                    var imgURL = node.imagesrc;
                    window.scene.remove(node);

                    var img = new Image();
                    img.src = imgURL;
                    img.onerror= function(){
                        alert("Cannot get the node image");
                    }
                    img.onload = function () {
                        nodeScale = img.width/img.height;
                        $("#crop_result3").append("<img title='Click to place the location and size on the background image' onclick='rePut(this);' src='"+ img.src +"' id='"+RandomID +"' style='height:75px;width:" + (75*nodeScale) + "px;margin:10px 10px;'/>");
                    }
                    document.getElementById("node-control-button").style.display = "none";
                });
                $("#rotateL-node").click(function () {
                    var imgURL = node.imagesrc;
                    $.ajax({
                        url:'/rotateLR',
                        method:'POST',
                        data: {"value": imgURL},
                        beforeSend: function (){
                            $("#loadingA").css("top",$(document).scrollTop()+'px');
                            $("#loadingA").show();
                        },
                        success: function(data){
                            var crop_result = data.result;
                            var pattern  = './';
                            crop_result = crop_result.replace(new RegExp(pattern), "/flaskr2/");

                            node.imagesrc = ServerUrl + crop_result;
                            node.setImage(ServerUrl + crop_result);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        },

                        complete: function (){
                            $("#loadingA").css("top",0);
                            $("#loadingA").hide();
                        }

                    });
                });
                $("#rotateR-node").click(function () {
                    var imgURL = node.imagesrc;
                    $.ajax({
                        url:'/rotateTB',
                        method:'POST',
                        data: {"value": imgURL},
                        beforeSend: function (){
                            $("#loadingA").css("top",$(document).scrollTop()+'px');
                            $("#loadingA").show();
                        },
                        success: function(data){
                            var crop_result = data.result;
                            var pattern  = './';
                            crop_result = crop_result.replace(new RegExp(pattern), "/flaskr2/");

                            node.imagesrc = ServerUrl + crop_result;
                            node.setImage(ServerUrl + crop_result);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        },

                        complete: function (){
                            $("#loadingA").css("top",0);
                            $("#loadingA").hide();
                        }

                    });
                });
                */



            }



        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            alert("图片加载超时");
        },
        complete: function (){
            $("#loadingA").css("top",0);
            $(".loading").hide();

        }
    });

}

var cur_rotate = 0;
$("#copy-node").click(function () {
    console.log("localUpload");
    cur_rotate = 0;
    var cur_node = new JTopo.Node();
    var imgURL = node.imagesrc;
    console.log(cur_node);
    cur_node.setLocation(50,50);
    cur_node.setSize(50, 50);
    cur_node.imagesrc = imgURL;
    cur_node.setImage(imgURL);
    window.scene.add(cur_node);
});
$("#delete-node").click(function () {

    cur_rotate = 0;
    RandomID =getNow();
    var imgURL = node.imagesrc;
    window.scene.remove(node);

    var img = new Image();
    img.src = imgURL;
    img.onerror= function(){
        alert("Cannot get the node image");
    }
    img.onload = function () {
        nodeScale = img.width/img.height;
        $("#crop_result3").append("<img title='Click to place the location and size on the background image' src='"+ img.src +"' id='"+RandomID +"' onclick='rePut(this);' style='height:75px;width:" + (75*nodeScale) + "px;margin:10px 10px;'/>");
    }
    document.getElementById("node-control-button").style.display = "none";
});
$("#rotateL-node").click(function () {
    var imgURL = node.imagesrc;
    $.ajax({
        url:'/rotateLR',
        method:'POST',
        data: {"value": imgURL},
        beforeSend: function (){
            $("#loadingA").css("top",$(document).scrollTop()+'px');
            $("#loadingA").show();
        },
        success: function(data){
            var crop_result = data.result;
            var pattern  = './';
            crop_result = crop_result.replace(new RegExp(pattern), "/flaskr2/");

            node.imagesrc = ServerUrl + crop_result;
            node.setImage(ServerUrl + crop_result);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        },

        complete: function (){
            $("#loadingA").css("top",0);
            $("#loadingA").hide();
        }

    });
});
$("#rotateR-node").click(function () {
    var imgURL = node.imagesrc;
    $.ajax({
        url:'/rotateTB',
        method:'POST',
        data: {"value": imgURL},
        beforeSend: function (){
            $("#loadingA").css("top",$(document).scrollTop()+'px');
            $("#loadingA").show();
        },
        success: function(data){
            var crop_result = data.result;
            var pattern  = './';
            crop_result = crop_result.replace(new RegExp(pattern), "/flaskr2/");

            node.imagesrc = ServerUrl + crop_result;
            node.setImage(ServerUrl + crop_result);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        },

        complete: function (){
            $("#loadingA").css("top",0);
            $("#loadingA").hide();
        }

    });
});




/* 前景图裁剪 */
$("#FurtherDone").click(function(){

    $("#panel-"+window.cur_index).attr("class","tab-pane");
    $("#panel-1").attr("class","tab-pane active");

    $("#main-panel").attr("class","active");
    $("#lp"+window.cur_index).attr("class","");

    $("#welcome").css("display","none");
    $("#obj_crop_result").css("display","block");

    document.getElementById("hideBar").style = "height:50px;display: none";

    document.getElementById("Furtherpaint").className = "btn btn-default btn-lg";
    document.getElementById("Furtherclear").className = "btn btn-default btn-lg";

    document.getElementById("CropSimple").className = "btn btn-default btn-lg";

    document.getElementById("Furtherfont").getElementsByTagName("button")[0].className = "btn btn-default btn-lg";
    document.getElementById("Furtherfont").getElementsByTagName("button")[1].className = "btn btn-default btn-lg";
    document.getElementById("Furtherfont").getElementsByTagName("button")[2].className = "btn btn-default btn-lg";



    var myCanvas = document.getElementById("myCanvas");
    if(isCanvasBlank(myCanvas)){
        console.log(jsonDataA);

        var imgFurther = new Image();
        imgFurther.src = document.getElementById("Furtherimg").src;
        imgFurther.onerror= function(){
            alert("Cannot get the Image URL");
        }
        imgFurther.onload = function (){
            var base = getBase64Image(imgFurther);
            base=base.split(",")[1];
            var json = {"value":base,"imagedata":jsonDataA};
            $.ajax({
                url: '/getdata',
                method: 'POST',
                dataType: 'json',
                data: json,
                beforeSend: function (){
                    $("#loadingA").css("top",$(document).scrollTop()+'px');
                    $("#loadingA").show();
                },
                success: function(data){
                    $("#Furtherimg").cropper('destroy');

                    $("#myCanvas").attr("imgsrc","");

                    $("#Furtherimg").attr("src","");

                    var crop_result = data.result;
                    var pattern  = './';
                    crop_result = crop_result.replace(new RegExp(pattern), "/flaskr2/");


                    var img = new Image();
                    img.src = ServerUrl + crop_result;
                    img.onerror= function(){
                        alert("Cannot get the node image");
                    }
                    img.onload = function () {
                        if(img.height < img.width){
                            nodeScale = img.width/img.height;
                            //$("#crop_result3").append("<img title='Click to place the location and size on the background image' src='"+(ServerUrl+crop_result)+"' id='"+RandomID +"' style='height:75px;width:" + (75*nodeScale) + "px;margin:10px 10px;'/>");
                            $("#myModal").modal("hide");

                            var node = new JTopo.Node();
                            node.setLocation(50,50);
                            node.setSize(75*nodeScale, 75);
                            var imgURL = ServerUrl+crop_result;
                            node.setImage(imgURL);
                            (window.scene).add(node);
                        }
                        else{
                            nodeScale = img.width/img.height;
                            //$("#crop_result3").append("<img title='Click to place the location and size on the background image' src='"+(ServerUrl+crop_result)+"' id='"+RandomID +"' style='height:75px;width:" + (75*nodeScale) + "px;margin:10px 10px;'/>");
                            $("#myModal").modal("hide");


                            var node = new JTopo.Node();
                            node.setLocation(50,50);
                            node.setSize(75*nodeScale, 75);
                            var imgURL = ServerUrl+crop_result;
                            node.setImage(imgURL);
                            (window.scene).add(node);
                        }
                    }


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $("#Furtherimg").cropper('destroy');
                    alert(errorThrown);
                },

                complete: function (){
                    $("#loadingA").css("top",0);
                    $("#loadingA").hide();
                }

            });

            
        }
    }


    else{
        
        var base64 = document.getElementById("myCanvas").toDataURL("image/png");
        base64=base64.split(',')[1];
        var imgFurther = new Image();

        imgFurther.src = document.getElementById("Furtherimg").src;
        imgFurther.onerror= function(){
            alert("Cannot get the Image URL");
        }
        imgFurther.onload = function () {
            var base = getBase64Image(imgFurther);
            base=base.split(",")[1];
            console.log(window.FurtherScale);
            var jsonData = {"base64":base,"value": base64,"scale":window.FurtherScale};
            console.log(jsonData);
            $.ajax({
                url: '/furtherCrop',
                method: 'POST',
                dataType: 'json',
                data: jsonData,
                beforeSend: function (){
                    $("#loadingA").css("top",$(document).scrollTop()+'px');
                    $("#loadingA").show();
                },
                success: function(data){
                    $("#myCanvas").attr("imgsrc","");
                    $("#Furtherimg").attr("src","");

                    var crop_result = data.result;
                    var pattern  = './';
                    crop_result = crop_result.replace(new RegExp(pattern), "/flaskr2/");


                    var img = new Image();
                    img.src = ServerUrl + crop_result;
                    img.onerror= function(){
                        alert("Cannot get the node image");
                    }
                    img.onload = function () {
                        if(img.height < img.width){
                            nodeScale = img.width/img.height;
                            //$("#crop_result3").append("<img title='Click to place the location and size on the background image' src='"+(ServerUrl+crop_result)+"' id='"+RandomID +"' style='height:75px;width:" + (75*nodeScale) + "px;margin:10px 10px;'/>");
                            $("#myModal").modal("hide");

                            var node = new JTopo.Node();
                            node.setLocation(50,50);
                            node.setSize(75*nodeScale, 75);
                            var imgURL = ServerUrl+crop_result;
                            node.setImage(imgURL);
                            (window.scene).add(node);
                        }
                        else{
                            nodeScale = img.width/img.height;
                            //$("#crop_result3").append("<img title='Click to place the location and size on the background image' src='"+(ServerUrl+crop_result)+"' id='"+RandomID +"' style='height:75px;width:" + (75*nodeScale) + "px;margin:10px 10px;'/>");
                            $("#myModal").modal("hide");


                            var node = new JTopo.Node();
                            node.setLocation(50,50);
                            node.setSize(75*nodeScale, 75);
                            var imgURL = ServerUrl+crop_result;
                            node.setImage(imgURL);
                            (window.scene).add(node);
                        }
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


});




/* 图片URL转base64编码 */
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}


/* 融合主程序 */
function complete() {
    var point = new Array();
    var base64;
    $('#combineImg').empty();
    var image = new Image();
    image.src =  backimg;
    image.onload = function(){
        var base = getBase64Image(image);
        base64 = base.split(',')[1];
        var nodesList = (window.scene).getDisplayedNodes();
        point.splice(0,point.length);              //清空数组
        if(nodesList.length==0){                   //没有前景节点图，提示错误
            alert("ERROR！请放置前景图");
        }
        else{
            for(var i = 0;i < nodesList.length;i++){      //节点图片获取数量和内容
                var obj = nodesList[i];
                var id = (obj.imagesrc).split("/img/")[1].split("matting")[0];
                var o_rotate = obj.rotate;
                if(o_rotate == 0){             //旋转度为0
                    var x = obj.x*scale;
                    var y = obj.y*scale;
                    var o_width = obj.width*scale;
                    var o_height = obj.height*scale;
                }
                else{                         //带有旋转度
                    var x = obj.x;
                    var y = obj.y;
                    var o_width = obj.width*scale;
                    var o_height = obj.height*scale;
                }
                var info = {                  //数据封装
                    x1: x,
                    y: y,
                    width: o_width,
                    id:id,
                    height: o_height,
                    rotate: o_rotate
                }
                point.push(info);
            }
            var json ={
                "value":base64,
                "imagedata":point
            };
            $.ajax({
                url: '/getimgdata',
                method: 'POST',
                data:json,
                dataType: 'json',
                beforeSend: function (){
                    $("#loadingA").css("top",$(document).scrollTop()+'px');
                    $("#loadingA").fadeIn();

                },
                success: function (data) {
                    //		scene.background = data.result;
                    var final_result = data.result;
                    var pattern  = './';

                    final_result = ServerURL + final_result.replace(new RegExp(pattern), "/flaskr2/");
                    //$("#combineImg").append("<img src='"+ final_result +"' style='width:"+document.getElementById("main-canvas").width+"px;height:"+document.getElementById("main-canvas").height+"px;'/>");

                    window.open("./result","_blank");
                },
                complete: function (){
                    $("#loadingA").css("top",0);
                    $("#loadingA").fadeOut();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown){
                    alert(errorThrown);
                },

            });
        }

    }

}






