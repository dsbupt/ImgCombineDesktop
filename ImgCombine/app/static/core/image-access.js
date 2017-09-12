/**
 * Created by huoqiming on 2017/6/12.
 */
var cropimg;
var ServerURL = "http://10.108.125.20:8900";




/* 背景图keypress文本搜索获取内容 */
$("#text-back").keypress(function () {
    if(event.keyCode == "13"){
        $("#resultArea_front").empty();
        var URL = "/bingResult";
        if($("#text-back").val()){
            $.ajax({
                url: URL,
                method: 'POST',
                data: {"queryexpression":$("#text-back").val()},
                dataType: 'json',
                beforeSend: function (){
                    $("#loadingA").css("top",$(document).scrollTop()+'px');
                    $("#loadingA").show();
                },
                success:function (data) {
                    if (data.result.length != 0) {           //背景图
                        /*
                         var html = "<br/><table style='width: 960px; margin:20px auto;'>";
                         for (var i = 0; i < (data.result.length); i++) {

                         if (i % 10 == 0)
                         html += "<tr>";
                         var image = data.result1[i];      //缩略图
                         var image1 = data.result[i];      //原图
                         html += "<td style='width: 80px;height:80px; border: 1px solid black;'><img title='click this to change background image' onclick = 'convertURL(this)' style='width:80px;height:80px' id='" + image1 + "' src='" + image + "'></td>"
                         if (i % 10 == 9)
                         html += "</tr>";
                         }
                         html += "</table>";
                         */
                        var html = "<br/><div class='container'>";
                        for (var i = 0; i < (data.result.length); i++){
                            var image = data.result1[i]; //缩略图
                            var image1 = data.result[i];      //原图

                            html += "<div class='item' style='cursor:pointer;'><img title='点击图片覆盖主面板的画布' onclick = 'convertURL(this)' id='"+ image1 +"' src='" + image + "' style='height:200px'></div>";

                        }
                        html += "</div>";
                        $("#resultArea_front").append(html);


                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("请求服务器超时");
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

});








/* 背景图文本搜索获取内容 */
$("#back-search").click(function () {
    $("#resultArea_front").empty();
    var URL = "/bingResult";
    if($("#text-back").val()){
        $.ajax({
            url: URL,
            method: 'POST',
            data: {"queryexpression":$("#text-back").val()},
            dataType: 'json',
            beforeSend: function (){
                $("#loadingA").css("top",$(document).scrollTop()+'px');
                $("#loadingA").show();
            },
            success:function (data) {
                if (data.result.length != 0) {           //背景图
                    /*
                     var html = "<br/><table style='width: 960px; margin:20px auto;'>";
                     for (var i = 0; i < (data.result.length); i++) {

                     if (i % 10 == 0)
                     html += "<tr>";
                     var image = data.result1[i];      //缩略图
                     var image1 = data.result[i];      //原图
                     html += "<td style='width: 80px;height:80px; border: 1px solid black;'><img title='click this to change background image' onclick = 'convertURL(this)' style='width:80px;height:80px' id='" + image1 + "' src='" + image + "'></td>"
                     if (i % 10 == 9)
                     html += "</tr>";
                     }
                     html += "</table>";
                     */
                    var html = "<br/><div class='container'>";
                    for (var i = 0; i < (data.result.length); i++){
                        var image = data.result1[i]; //缩略图
                        var image1 = data.result[i];      //原图

                        html += "<div class='item' style='cursor:pointer;'><img title='点击图片覆盖主面板的画布' onclick = 'convertURL(this)' id='"+ image1 +"' src='" + image + "' style='height:200px'></div>";

                    }
                    html += "</div>";
                    $("#resultArea_front").append(html);


                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求服务器超时");
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

});

/* 草图搜索方式前景图 onmousedown事件 传递到裁剪框 */
function printA(obj){  
    cropimg =  obj[0].id;
}
