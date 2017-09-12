/**
 * Created by huoqiming on 2017/6/12.
 */

var draw = function(index){(function(){
    var paint={
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
            this.storageColor="#000000";
            this.eraserRadius=15;//擦除半径值
            this.color=["#000000","#FF0000","#80FF00","#00FFFF","#808080","#FF8000","#408080","#8000FF","#CCCC00"];//画笔颜色值
            this.fontWeight=[1,5,8];
            this.$=function(id){return typeof id=="string"?document.getElementById(id):id;};
            this.canvas=this.$("canvas"+index);

            if (this.canvas.getContext) {
            } else {
                alert("您的浏览器不支持 canvas 标签");
                return;
            }

            this.cxt=this.canvas.getContext('2d');
            this.cxt.lineJoin = "round";//context.lineJoin - 指定两条线段的连接方式
            this.cxt.lineWidth = 1;//线条的宽度
            this.iptClear=this.$("clear"+index);
            this.revocation=this.$("revocation");
            this.imgurl=this.$("imgurl");//图片路径按钮
            this.w=this.canvas.width;//取画布的宽
            this.h=this.canvas.height;//取画布的高
            // this.cxt.fillStyle = "#fff";
            // this.cxt.fillRect(0, 0, this.w, this.h);
            this.touch =("createTouch" in document);//判定是否为手持设备
            this.StartEvent = this.touch ? "touchstart" : "mousedown";//支持触摸式使用相应的事件替代
            this.MoveEvent = this.touch ? "touchmove" : "mousemove";
            this.EndEvent = this.touch ? "touchend" : "mouseup";
            this.bind();
        },
        bind:function()
        {
            var t=this;
            /*清除画布*/
            this.iptClear.onclick=function()
            {
                document.getElementById("paint"+index).className = "btn btn-default btn-lg";
                document.getElementById("clear"+index).className = "btn btn-primary btn-lg";
                document.getElementById("eraser"+index).className = "btn btn-default btn-lg";
                t.clear();
            };

            function windowToCanvas(canvas, x, y) {
                var bbox = canvas.getBoundingClientRect();
                return {
                    x: x - bbox.left * (canvas.width / bbox.width),
                    y: y - bbox.top * (canvas.width / bbox.width)
                };
            }

            this.canvas['on'+t.StartEvent]=function(e)
            {
                var canvas = t.canvas;
                var loc = windowToCanvas(canvas, e.x, e.y);
                var touch=t.touch ? e.touches[0] : e;
                var _x=loc.x;//鼠标在画布上的x坐标，以画布左上角为起点
                var _y=loc.y+7;//鼠标在画布上的y坐标，以画布左上角为起点，加7为了更正图标大小
                //var _y=loc.y;
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
                var touch=t.touch ? e.touches[0] : e;
                if(t.lock)//t.lock为true则执行
                {
                    var canvas = t.canvas;
                    var loc = windowToCanvas(canvas, e.x, e.y);
                    var _x=loc.x;//鼠标在画布上的x坐标，以画布左上角为起点
                    var _y=loc.y+7;//鼠标在画布上的y坐标，以画布左上角为起点，加7为了更正图标大小
                    //var _y=loc.y;
                    if(t.isEraser)
                    {
                        //if(t.Timer)clearInterval(t.Timer);
                        //t.Timer=setInterval(function(){
                        t.resetEraser(_x,_y,touch);
                        //},10);
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






            /*鼠标按下事件，记录鼠标位置，并绘制，解锁lock，打开mousemove事件
            this.canvas['on'+t.StartEvent]=function(e)
            {
                var touch=t.touch ? e.touches[0] : e;
                var _x=touch.clientX - touch.target.offsetLeft;//鼠标在画布上的x坐标，以画布左上角为起点
                var _y=touch.clientY - touch.target.offsetTop + document.body.scrollTop - document.getElementById("hHeader").offsetHeight;//鼠标在画布上的y坐标，以画布左上角为起点

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
             */
            /*鼠标移动事件
            this.canvas['on'+t.MoveEvent]=function(e)
            {
                var touch=t.touch ? e.touches[0] : e;
                if(t.lock)//t.lock为true则执行
                {
                    var _x=touch.clientX - touch.target.offsetLeft;//鼠标在画布上的x坐标，以画布左上角为起点
                    var _y=touch.clientY - touch.target.offsetTop + document.body.scrollTop - document.getElementById("hHeader").offsetHeight;//鼠标在画布上的y坐标，以画布左上角为起点
                    
                    if(t.isEraser)
                    {
                        //if(t.Timer)clearInterval(t.Timer);
                        //t.Timer=setInterval(function(){
                        t.resetEraser(_x,_y,touch);
                        //},10);
                    }
                    else
                    {
                        t.movePoint(_x,_y,true);//记录鼠标位置
                        t.drawPoint();//绘制路线
                    }
                }
            };
             */
            /*重置数据
            this.canvas['on'+t.EndEvent]=function(e)
            {

                t.lock=false;
                t.x=[];
                t.y=[];
                t.clickDrag=[];
                clearInterval(t.Timer);
                t.Timer=null;

            };
            */
            /*橡皮擦*/
            this.$("eraser"+index).onclick=function(e)
            {
                document.getElementById("canvas"+index).style.cursor="url('./static/assets/mouseShape/eraser.ico'),auto";
                document.getElementById("paint"+index).className = "btn btn-default btn-lg";
                document.getElementById("clear"+index).className = "btn btn-default btn-lg";
                document.getElementById("eraser"+index).className = "btn btn-primary btn-lg";
                t.isEraser=true;

            };
        },
        movePoint:function(x,y,dragging)
        {
            /*将鼠标坐标添加到各自对应的数组里*/
            this.x.push(x);
            this.y.push(y);
            this.clickDrag.push(y);
        },
        drawPoint:function(x,y,radius)
        {
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
        clear:function()
        {
            this.cxt.clearRect(0, 0, this.w, this.h);//清除画布，左上角为起点
            $('#crop_result').empty();
            $('#resultArea_front').empty();
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
            var t=this;
            //this.cxt.lineWidth = 30;
            /*source-over 默认,相交部分由后绘制图形的填充(颜色,渐变,纹理)覆盖,全部浏览器通过*/

            t.cxt.globalCompositeOperation = "destination-out";
            t.cxt.beginPath();
            t.cxt.arc(_x, _y, t.eraserRadius, 0, Math.PI * 2);
            t.cxt.fillStyle = "rgba(255,255,255,255)";
            t.cxt.fill();
            t.cxt.globalCompositeOperation = "source-over"

        }
    };
    $("#paint"+index).click(function () {
        document.getElementById("canvas"+index).style.cursor="url('./static/assets/mouseShape/pen.ico'),auto";
        document.getElementById("paint"+index).className = "btn btn-primary btn-lg";
        document.getElementById("clear"+index).className = "btn btn-default btn-lg";
        document.getElementById("eraser"+index).className = "btn btn-default btn-lg";
        paint.init();
    });

})();
}


$.extend({
    StandardPost:function(url,args){
        var form = $("<form method='post'></form>"),
            input;
        form.attr({"action":url});
        $.each(args,function(key,value){
            input = $("<input type='hidden'>");
            input.attr({"name":key});
            input.val(value);
            form.append(input);
        });
        form.submit();
    }
});
