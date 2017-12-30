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



}