/**
 * Created by huoqiming on 2017/7/4.
 */
var FurtherScale = 1;

/* 模态框弹出触发事件 */
$("#myModal").on('shown.bs.modal',function () {
    var _this = this;
    var substr = "/static/Imgs/";
    var sublocal = "blob";
    if(window.cropimg.indexOf(substr)>=0){  //草图
        $.ajax({
            url: '/convert',
            method: 'POST',
            //    contentType:"charset=utf-8",
            data: {"value": window.cropimg},
            beforeSend: function (){
                $("#loadingA").css("top",$(document).scrollTop()+'px');
                $("#loadingA").fadeIn();

            },
            success: function(data) {

                var frontURL = data.result;
                var pattern  = '/app';
                frontURL = frontURL.replace(new RegExp(pattern), "");
                $("#myCanvas").attr("texsrc",frontURL);
                $("#myCanvas").attr("imgsrc",frontURL);
                $("#Furtherimg").attr("src",frontURL);
                var imageaa =new Image();
                imageaa.src = frontURL;
                imageaa.onerror= function(){
                    alert("The original image is missing,please select the other images");
                }
                imageaa.onload = function() {
                    if(imageaa.width>=imageaa.height){

                        FurtherScale = imageaa.width / 500;
                        document.getElementById("myCanvas").height = imageaa.height*500/imageaa.width;
                        document.getElementById("myCanvas").width = 500;

                        $("#myCanvas").attr("style", "position:absolute;left:" + (300 - document.getElementById("myCanvas").width / 2) + "px; top:15px;background: transparent;");

                        $("#Furtherimg").attr("style", "position:absolute; left:" + (300 - document.getElementById("myCanvas").width / 2) + "px; top:15px;width:500px;height:" + document.getElementById("myCanvas").height + "px");

                        $("#row1").attr("style", "height:" + (document.getElementById("myCanvas").height) + "px;background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');");

                    }

                    else{

                        FurtherScale = imageaa.height / 500;
                        console.log(FurtherScale);
                        document.getElementById("myCanvas").width = imageaa.width*500/imageaa.height;

                        document.getElementById("myCanvas").height = 500;

                        $("#myCanvas").attr("style", "position:absolute;left:" + (300 - document.getElementById("myCanvas").width / 2) + "px; top:15px;background: transparent;");

                        $("#Furtherimg").attr("style", "position:absolute; left:" + (300 - document.getElementById("myCanvas").width / 2) + "px; top:15px;height:500px;width:" + document.getElementById("myCanvas").width + "px");

                        $("#row1").attr("style", "height:" + (document.getElementById("myCanvas").height) + "px;background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');");

                    }


                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("图片加载超时");
            },
            complete: function(){
                $("#loadingA").css("top",0);
                $("#loadingA").fadeOut();
            }
        });
    }
    else if(window.cropimg.indexOf(sublocal)==0){   //本地
                var frontURL = window.cropimg;
                $("#myCanvas").attr("texsrc",frontURL);
                $("#myCanvas").attr("imgsrc",frontURL);
                $("#Furtherimg").attr("src",frontURL);
                var imageaa =new Image();
                imageaa.src = frontURL;
                imageaa.onerror= function(){
                    alert("The original image is missing,please select the other images");
                }
                imageaa.onload = function() {
                    if(imageaa.width>=imageaa.height){
                        FurtherScale = imageaa.width / 500;
                        document.getElementById("myCanvas").height = imageaa.height*500/imageaa.width;
                        document.getElementById("myCanvas").width = 500;

                        $("#myCanvas").attr("style", "position:absolute;left:" + (300 - document.getElementById("myCanvas").width / 2) + "px; top:15px;background: transparent;");

                        $("#Furtherimg").attr("style", "position:absolute; left:" + (300 - document.getElementById("myCanvas").width / 2) + "px; top:15px;width:500px;height:" + document.getElementById("myCanvas").height + "px");

                        $("#row1").attr("style", "height:" + (document.getElementById("myCanvas").height) + "px;background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');");

                    }
                    else{
                        FurtherScale = imageaa.height / 500;
                        console.log(FurtherScale);
                        document.getElementById("myCanvas").width = imageaa.width*500/imageaa.height;

                        document.getElementById("myCanvas").height = 500;

                        $("#myCanvas").attr("style", "position:absolute;left:" + (300 - document.getElementById("myCanvas").width / 2) + "px; top:15px;background: transparent;");

                        $("#Furtherimg").attr("style", "position:absolute; left:" + (300 - document.getElementById("myCanvas").width / 2) + "px; top:15px;height:500px;width:" + document.getElementById("myCanvas").width + "px");

                        $("#row1").attr("style", "height:" + (document.getElementById("myCanvas").height) + "px;background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');");

                    }


                }


    }


    else{      //文本
        $.ajax({
            url: '/convert',
            method: 'POST',
            //    contentType:"charset=utf-8",
            data: {"value": window.cropimg},
            beforeSend: function (){
                $("#loadingA").css("top",$(document).scrollTop()+'px');
                $("#loadingA").fadeIn();

            },
            success: function(data) {

                var frontURL = data.result;
                var pattern  = '/app';
                frontURL = frontURL.replace(new RegExp(pattern), "");

                $("#myCanvas").attr("texsrc",frontURL);
                $("#myCanvas").attr("imgsrc",frontURL);
                $("#Furtherimg").attr("src",frontURL);
                var imageaa =new Image();
                imageaa.src = frontURL;
                imageaa.onerror= function(){
                    alert("The original image is missing,please select the other images");
                }
                imageaa.onload = function() {
                    if(imageaa.width>=imageaa.height){
                        FurtherScale = imageaa.width / 500;
                        document.getElementById("myCanvas").height = imageaa.height*500/imageaa.width;
                        document.getElementById("myCanvas").width = 500;

                        $("#myCanvas").attr("style", "position:absolute;left:" + (300 - document.getElementById("myCanvas").width / 2) + "px; top:15px;background: transparent;");

                        $("#Furtherimg").attr("style", "position:absolute; left:" + (300 - document.getElementById("myCanvas").width / 2) + "px; top:15px;width:500px;height:" + document.getElementById("myCanvas").height + "px");

                        $("#row1").attr("style", "height:" + (document.getElementById("myCanvas").height) + "px;background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');");

                    }

                    else{
                        FurtherScale = imageaa.height / 500;
                        console.log(FurtherScale);
                        document.getElementById("myCanvas").width = imageaa.width*500/imageaa.height;

                        document.getElementById("myCanvas").height = 500;

                        $("#myCanvas").attr("style", "position:absolute;left:" + (300 - document.getElementById("myCanvas").width / 2) + "px; top:15px;background: transparent;");

                        $("#Furtherimg").attr("style", "position:absolute; left:" + (300 - document.getElementById("myCanvas").width / 2) + "px; top:15px;height:500px;width:" + document.getElementById("myCanvas").width + "px");

                        $("#row1").attr("style", "height:" + (document.getElementById("myCanvas").height) + "px;background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');");

                    }

                    /*
                    document.getElementById("myCanvas").height = imageaa.height;
                    document.getElementById("myCanvas").width = imageaa.width;

                    $("#myCanvas").attr("style", "position:absolute;left:" + (300 - imageaa.width / 2) + "px; top:15px;background: transparent;");

                    $("#Furtherimg").attr("style", "position:absolute; left:" + (300 - imageaa.width / 2) + "px; top:15px;");

                    $("#row1").attr("style", "height:" + (imageaa.height) + "px;background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');");
                    */
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("图片加载超时");
            },
            complete: function(){
                $("#loadingA").css("top",0);
                $("#loadingA").fadeOut();
            }
        });
    }
});
