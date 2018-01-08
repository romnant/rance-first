window.onload = function () {
    var banner = document.getElementById("banner");
    var oul = document.getElementById("banner1");
    var oli = oul.getElementsByTagName("li");
    var liwidth = oul.getElementsByTagName("li")[0].offsetWidth;
    var liheight = oul.getElementsByTagName("li")[0].offsetHeight;
    var lilength = oul.getElementsByTagName("li").length;
    var obutton = document.getElementById("button");
    var abutton = obutton.getElementsByTagName("a");
    obutton.style.width = obutton.offsetWidth + "px";
    oul.style.left = -liwidth + "px";//设置初始left值
    var prev = document.getElementById("prev");
	var next = document.getElementById("next");
    var oli1 = document.createElement("li");
	oli1.innerHTML = oli[oli.length - 1].innerHTML;
	banner1.insertBefore(oli1,oli[0]);//插入辅助图实现无缝轮播,第一张
    var oli2 = document.createElement("li");
	oli2.innerHTML = oli[1].innerHTML;
	banner1.appendChild(oli2);//插入辅助图实现无缝轮播,最后一张
    lilength = oul.getElementsByTagName("li").length;//重新赋值li的正确长度
	oul.style.width = liwidth*lilength+"px";//设置ul的长度
    var animated = false;//判断动画是否执行的对象,animate为false时执行动画
	var index = 1;//储存当前圆点位置/图片位置
	var timer;
    function play() {
        timer = setInterval(function(){
            next.onclick();
        }, 3000);
    }
    function stop(){
        clearInterval(timer);
    }
    function showButton(){
        for( var i =0;i<abutton.length;i++){
            abutton[i].className = "";
        }
        abutton[index-1].className = "on";
    }
    function animate(oleft){
        animated = true;
        var newleft = oul.offsetLeft + oleft;//当前left值加上传入的偏移量等于新图片所在位置
        var time = 600;
        var interval = 10;
        var speed = oleft/(time/interval);
        function go(){
            if((speed < 0 && oul.offsetLeft>newleft) || (speed >0 && oul.offsetLeft < newleft)){
                oul.style.left = parseInt(oul.offsetLeft+speed)+"px";
                setTimeout(go,interval);
            }
            else{
                oul.style.left = newleft+"px";
                if(newleft > -liwidth){
                    oul.style.left = -(liwidth*(lilength-2)) + "px";
                }
                if(newleft < -(liwidth*(lilength - 2))){
                    oul.style.left = -liwidth + "px";
                }
                animated = false;
            }
        }
        go();
    }
    next.onclick = function(){
        if(animated){
            return;   
        }
        if(index == abutton.length){
            index = 1;
        }
        else{
            index += 1;
        }
        animate(-liwidth);
        showButton();
    }
    prev.onclick = function(){
        if(animated){
            return;   
        }
        if(index == 1){
			index = abutton.length;
		}
		else{
			index -= 1;
		}
        animate(liwidth);
        showButton();
    }
    for(var i =0;i<abutton.length;i++){
        abutton[i].index = i;
        abutton[i].onclick = function(){
            if (animated) {
                        return;
            }
            if(this.className == "on"){
                return;
            }
            var myindex = this.index;
            var oleft = -liwidth*((myindex+1)-index);
            animate(oleft);
            index = myindex + 1;
            showButton();
        }
    }
    banner.onmouseover = stop;
    banner.onmouseout = play;
    play();
}