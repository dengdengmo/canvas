window.onload=function(){
    var nav = document.getElementById('nav');
    var lis = document.querySelectorAll('li');
    
    var clicked = true;
    lis[lis.length - 1].addEventListener('click', function () {
        
        for (var i = 0; i < lis.length; i++) {
            // 拿i的值
            var n = i - lis.length / 2;
            var deg = 0;
            if(clicked){
                n = n * 15;
            }else{
                n = 360;
            }
            lis[i].style.transform = 'rotate(' + n + 'deg)';   
        }
        clicked = !clicked;
    })

    //给其他li添加点击事件
    for(var i=0; i<lis.length-1; i++){
        lis[i].index = i;
        lis[i].addEventListener('click', function(){
            /**
             * 点击时要做的事情
             * 1、点击的对象要转到 0deg
             * 2、点击的图片左边所有图片依次减去 15deg
             * 3、点击的图片右边所有图片依次加上 15deg（紧邻的加上 30deg）
             */
            var leftDeg = 0;
            var rightDeg = 15;
            // 当前点击图片
            this.style.transform = 'rotate(0deg)';
            // 左边图片
            for(var i=this.index-1; i>=0; i--){
                leftDeg-=15;
                lis[i].style.transform='rotate('+leftDeg+'deg)';
            }

            // 右边图片
            for(var i=this.index+1; i<lis.length; i++){
                rightDeg+=15;
                lis[i].style.transform = 'rotate('+rightDeg+'deg)';
            }
        })
    }


    // canvas 气泡效果
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight + 500;
    var context = canvas.getContext('2d');
    var colors = ['#69D2E7','#A7DBD8','#E0E4CC','#F38630','#FA6900','#FF4E50','#F9D423'];
    var balls = [];
    var timer;

    /**
     * 一个圆
     * 1、半径不同
     * 2、颜色不同
     * 3、位置不同
     * 4、速度不同
     * 
     * var ball={
     *  x: x轴的位置,
     *  y: y轴的位置,
     *  r: 圆的半径,
     *  vx: x轴的速度,
     *  vy: y轴的速度,
     *  color: 颜色
     * }
     */

     // 在canvas 上画圆
     function draw(ball){
         context.beginPath(); // 开始的路径
         // arc(x轴位置，y轴位置，半径，起始弧度，结束弧度)
         context.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
         context.fillStyle = ball.color; // 给圆填充颜色
         context.fill();
     }

     // 取x到y之间随机数：Math.round(Math.random()*(y-x)+x)
     function random(min, max){
         return Math.round(Math.random()*(max-min)+min);
     }

     canvas.addEventListener('mousemove', function(ev){
         for(var i=0; i<2; i++){
             var ball = {
                 x: random(-3,3) + ev.clientX,
                 y: random(-3,3) + ev.clientY+ window.pageYOffset,
                 r: random(2,15),
                 vx: Math.random()-0.5,
                 vy: Math.random()-0.5,
                 color: colors[random(0,colors.length-1)]
             }
             balls.push(ball);
             if(balls.length>200){
                 balls.shift();
             }
         }
         drallBall();
         function drallBall(){
             context.clearRect(0,0,canvas.width,canvas.height);

             for(var i=0; i<balls.length; i++){
                 // 需要在画的时候把球的位置还有半径都改了，这样的话看上去球才会动
                 balls[i].x+=balls[i].vx*5;  // 通过速度改变x轴的位置
                 balls[i].y+=balls[i].vy*5;
                 balls[i].r=balls[i].r*0.93;    // 改变球的半径
                 draw(balls[i])
             }
         }
     })
}