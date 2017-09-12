/**
 * Created by huoqiming on 2017/6/7.
 */
var jsonDataA;
var ServerUrl = "http://10.108.125.20:8900";
(function(){
    var paint1={
        init:function()
        {
            this.load();
        },
        load:function()
        {
            this.x=[];//记录鼠标移动时的X坐标
            this.y=[];//记录鼠标移动时的Y坐标
            this.clickDrag=[];
            this.lock=false;//鼠标移动前，判断鼠标是否按下
            this.isEraser=false;
            //this.Timer=null;//橡皮擦启动计时器
            //this.radius=5;
            this.storageColor="rgba(255,0,0,0.2)";
            this.eraserRadius=10;//擦除半径值
            this.color=["#000000","#FF0000","#80FF00","#00FFFF","#808080","#FF8000","#408080","#8000FF","#CCCC00"];//画笔颜色值
            this.fontWeight=[5,10,15];
            this.$=function(id){return typeof id=="string"?document.getElementById(id):id;};
            this.canvas=this.$("myCanvas");
            if (this.canvas.getContext) {
            } else {
                alert("您的浏览器不支持 canvas 标签");
                return;
            }
            this.cxt=this.canvas.getContext('2d');
            this.cxt.lineJoin = "round";//context.lineJoin - 指定两条线段的连接方式
            this.cxt.lineWidth = 10;//线条的宽度

            this.cxt.strokeStyle = 'rgba(255,0,0,0.2)';

            this.iptClear=this.$("clear");

            this.w=this.canvas.width;//取画布的宽
            this.h=this.canvas.height;//取画布的高

            this.touch =("createTouch" in document);//判定是否为手持设备
            this.StartEvent = this.touch ? "touchstart" : "mousedown";//支持触摸式使用相应的事件替代
            this.MoveEvent = this.touch ? "touchmove" : "mousemove";
            this.EndEvent = this.touch ? "touchend" : "mouseup";


            this.bind();
        },

        bind:function()
        {
            var t=this;
            /*鼠标按下事件，记录鼠标位置，并绘制，解锁lock，打开mousemove事件*/
            this.canvas['on'+t.StartEvent]=function(e)
            {
                if(t.cxt.strokeStyle=="#000000"){
                    t.cxt.strokeStyle="rgba(255,255,255,0.0)";
                }
                var touch=t.touch ? e.touches[0] : e;

                var _x=touch.clientX - $("#Furtherimg").offset().left;//鼠标在画布上的x坐标，以画布左上角为起点
                var _y=touch.clientY - $("#Furtherimg").offset().top + $(document).scrollTop()+7;//鼠标在画布上的y坐标，以画布左上角为起点

                if(t.isEraser)
                {
                    t.resetEraser(_x,_y,touch);
                }else
                {
                    t.movePoint(_x,_y);//记录鼠标位置
                    t.drawPoint();//绘制路线
                }
                t.lock=true;
            };
            /*鼠标移动事件*/
            this.canvas['on'+t.MoveEvent]=function(e)
            {
                if(t.cxt.strokeStyle=="#000000"){
                    t.cxt.strokeStyle="rgba(255,255,255,0.0)";
                }
                var touch=t.touch ? e.touches[0] : e;
                if(t.lock)//t.lock为true则执行
                {
                    var _x=touch.clientX - $("#Furtherimg").offset().left;//鼠标在画布上的x坐标，以画布左上角为起点
                    var _y=touch.clientY - $("#Furtherimg").offset().top + $(document).scrollTop()+7;//鼠标在画布上的y坐标，以画布左上角为起点
                    if(t.isEraser)
                    {
                        t.resetEraser(_x,_y,touch);
                    }
                    else
                    {
                        t.movePoint(_x,_y,true);//记录鼠标位置
                        t.drawPoint();//绘制路线
                    }
                }
            };
            this.canvas['on'+t.EndEvent]=function(e)
            {
                /*重置数据*/
                t.lock=false;
                t.x=[];
                t.y=[];
                t.clickDrag=[];
                clearInterval(t.Timer);
                t.Timer=null;

            };

            this.changeColor();

            this.$("Furtherclear").onclick=function(e)
            {
                document.getElementById("hideBar").style = "height:50px;display: none";
                document.getElementById("row1").style.cursor="url('./static/assets/mouseShape/eraser.ico'),auto";

                t.$("Furtherpaint").className = "btn btn-default btn-lg";
                t.$("Furtherclear").className = "btn btn-primary btn-lg";

                t.$("CropSimple").className = "btn btn-default btn-lg";

                t.$("Furtherfont").getElementsByTagName("button")[0].className = "btn btn-default btn-lg";
                t.$("Furtherfont").getElementsByTagName("button")[1].className = "btn btn-default btn-lg";
                t.$("Furtherfont").getElementsByTagName("button")[2].className = "btn btn-default btn-lg";
                t.isEraser=true;
            };

            this.$("Furtherpaint").onclick=function(e)
            {
                t.$("Furtherclear").className = "btn btn-default btn-lg";
                t.$("Furtherpaint").className = "btn btn-primary btn-lg";
                t.isEraser=false;
            };

        },
        movePoint:function(x,y,dragging)
        {
            if(this.cxt.strokeStyle=="#000000"){
                this.cxt.strokeStyle="rgba(255,255,255,0.0)";
            }
            /*将鼠标坐标添加到各自对应的数组里*/

            this.x.push(x);
            this.y.push(y);
            this.clickDrag.push(y);
        },
        drawPoint:function(x,y,radius)
        {
            if(this.cxt.strokeStyle=="#000000"){
                this.cxt.strokeStyle="rgba(255,255,255,0.0)";
            }
            for(var i=0; i < this.x.length; i++)//循环数组
            {
                this.cxt.beginPath();//context.beginPath() , 准备绘制一条路径

                if(this.clickDrag[i] && i){//当是拖动而且i!=0时，从上一个点开始画线。
                    this.cxt.moveTo(this.x[i-1], this.y[i-1]);//context.moveTo(x, y) , 新开一个路径，并指定路径的起点
                }else{
                    this.cxt.moveTo(this.x[i]-1, this.y[i]);
                }
                this.cxt.lineTo(this.x[i], this.y[i]);//context.lineTo(x, y) , 将当前点与指定的点用一条笔直的路径连接起来
                this.cxt.closePath();//context.closePath() , 如果当前路径是打开的则关闭它
                this.cxt.stroke();//context.stroke() , 绘制当前路径
            }
        },

        changeColor:function()
        {
            if(this.cxt.strokeStyle=="#000000"){
                this.cxt.strokeStyle="rgba(255,255,255,0.0)";
            }
            /*为按钮添加事件*/
            var t=this,fontIptNum=this.$("Furtherfont").getElementsByTagName("button");

            for(var i=0,l=fontIptNum.length;i<l;i++)
            {
                t.cxt.save();
                fontIptNum[i].index=i;
                fontIptNum[i].onclick=function()
                {

                    t.changeBackground(this.index);
                    t.cxt.lineWidth = t.fontWeight[this.index];
                    t.isEraser=false;
                }
            }
        },

        changeBackground:function(num)
        {
            var fontIptNum=this.$("Furtherfont").getElementsByTagName("button");
            for(var j=0,m=fontIptNum.length;j<m;j++)
            {
                fontIptNum[j].className="btn btn-default btn-lg";
                if(j==num) {fontIptNum[j].className="btn btn-primary btn-lg";}
            }
        },

        preventDefault:function(e){
            /*阻止默认*/
            var touch=this.touch ? e.touches[0] : e;
            if(this.touch)touch.preventDefault();
            else window.event.returnValue = false;
        },


        resetEraser:function(_x,_y,touch)
        {
            /*使用橡皮擦-提醒*/
            //this.inita();
            var t=this;
            //this.cxt.lineWidth = 30;
            /*source-over 默认,相交部分由后绘制图形的填充(颜色,渐变,纹理)覆盖,全部浏览器通过*/
            t.cxt.globalCompositeOperation = "destination-out";
            t.cxt.beginPath();
            t.cxt.arc(_x, _y, t.eraserRadius, 0, Math.PI * 2);
            t.cxt.fillStyle = "rgba(255,255,255,255)";
            t.cxt.fill();
            t.cxt.globalCompositeOperation = "source-over";
        }
    };

    $("#Furtherpaint").click(function(){
        $("#Furtherimg").cropper('destroy');
        document.getElementById("hideBar").style = "height:50px;display: block";
        document.getElementById("row1").style.cursor="url('./static/assets/mouseShape/pen.ico'),auto";

        document.getElementById("Furtherpaint").className = "btn btn-primary btn-lg";
        document.getElementById("Furtherclear").className = "btn btn-default btn-lg";

        document.getElementById("CropSimple").className = "btn btn-default btn-lg";

        document.getElementById("Furtherfont").getElementsByTagName("button")[0].className = "btn btn-default btn-lg";
        document.getElementById("Furtherfont").getElementsByTagName("button")[1].className = "btn btn-primary btn-lg";
        document.getElementById("Furtherfont").getElementsByTagName("button")[2].className = "btn btn-default btn-lg";
        paint1.init();
    });

})();

$("#CropSimple").click(function (){

    document.getElementById("hideBar").style = "height:50px;display: none";
    document.getElementById("row1").style.cursor="default";

    document.getElementById("Furtherpaint").className = "btn btn-default btn-lg";
    document.getElementById("Furtherclear").className = "btn btn-default btn-lg";

    document.getElementById("CropSimple").className = "btn btn-primary btn-lg";

    document.getElementById("Furtherfont").getElementsByTagName("button")[0].className = "btn btn-default btn-lg";
    document.getElementById("Furtherfont").getElementsByTagName("button")[1].className = "btn btn-default btn-lg";
    document.getElementById("Furtherfont").getElementsByTagName("button")[2].className = "btn btn-default btn-lg";

    $('#Furtherimg').cropper({
        crop: function(data) {
            // Output the result data for cropping image.
            jsonDataA = [
                '{"x1":' + data.x,
                '"y":' + data.y,
                '"height":' + data.height,
                '"width":' + data.width,
                '"rotate":' + data.rotate + '}'
            ].join();
        }
    });
});

$("#myModalClose").click(function () {
    $("#Furtherimg").cropper('destroy');
    document.getElementById("hideBar").style = "height:50px;display: none";
    document.getElementById("row1").style.cursor="default";

    document.getElementById("Furtherpaint").className = "btn btn-default btn-lg";
    document.getElementById("Furtherclear").className = "btn btn-default btn-lg";

    document.getElementById("CropSimple").className = "btn btn-default btn-lg";



    document.getElementById("Furtherfont").getElementsByTagName("button")[0].className = "btn btn-default btn-lg";
    document.getElementById("Furtherfont").getElementsByTagName("button")[1].className = "btn btn-default btn-lg";
    document.getElementById("Furtherfont").getElementsByTagName("button")[2].className = "btn btn-default btn-lg";
});


/* 图片URL转base64编码 */
function getBase64(img) {
    var canvas = document.createElement("myCanvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}

