/*
* 运动的流程：
* 1、闪的效果（瞬间高度变为0，scale（0）,随机）
*   
* 2、图片从小变大，透明度opacity变为0
* 3、图片旋转，透明度从0到1,有层次感（位移translate） （图片透明度都变为0 ，再执行第三步）
*/ 
var btn = document.getElementById('btn');
var imgs = document.querySelectorAll('img');
var open = true; // true代表开着呢，点击有效；false代表关上了，点击无效；
btn.addEventListener('click', function(){
    if(!open){
        console.log('无效')
        return;
        
    }
    
    open = false;
    console.log(open)
    var endNum = 0;  // 运动完成的图片数量
     
    for(var i=0; i<imgs.length; i++){
        (function(i){
            setTimeout(function(){
                movefn(imgs[i],'10ms',function(){
                    this.style.transform = 'scale(0)' // 
                }, function (){
                    movefn(this, '1s', function(){
                        this.style.transform = 'scale(1)';
                        this.style.opacity = 0;
                    }, function(){
                        endNum ++;
                        if(endNum==imgs.length){
                            toBig()
                        }
                    })
                })
            },Math.random()*1000)
        })(i)
    }
})

// 运动函数(运动对象，运动时间，运动属性函数，运动结束后的回调函数)
function movefn(obj, time, dofn, callback){  // 如果用户没有传入第四个参数，利用&&的小技巧 见下
    obj.style.transition = time;
    dofn.call(obj);
    var called = false;  // 解决transition调用多次的bug
    obj.addEventListener('transitionend', function(){
        if(!called){
            callback&&callback.call(obj); // && 左边为真返回右侧，左侧为假返回 左侧
            called = true;
        }
        
    },false);
}

function toBig(){
    var allEnd = 0; //
    for(var i=0; i<imgs.length; i++){
        imgs[i].style.transition = '';
        // 想要一个物体有css3当中的一些变化，那就需要给他一个初始值
        imgs[i].style.transform = 'rotateY(0deg) translateZ(' + Math.random()*400 + 'px)';

        (function(i){
            setTimeout(function(){
                movefn(imgs[i], '2s', function(){
                    this.style.opacity = 1;
                    this.style.transform = 'rotateY(-360deg) translateZ(0)';
                },function(){
                    allEnd ++;
                    if(allEnd==imgs.length){
                        open = true;
                    }
                })
            }, Math.random()*1000)
        })(i)
    }
}