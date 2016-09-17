var	sccrollBarObj={
	createScrollBar:function(scrollBar) {
		var scroll=document.getElementById(scrollBar.scroll),
			body=document.getElementById(scrollBar.body),
			bar=document.getElementById(scrollBar.bar),
			warp=document.getElementById(scrollBar.warp),
			warpH=warp.clientHeight,
			bodyH=body.offsetHeight,
			speed=scrollBar.speed,
			barMinH=scrollBar.barMinH,
			scrollH=scroll.offsetHeight,
			flag=scrollBar.flag,
			barH=((bodyH-warpH)/8)>(scrollH-barMinH)?barMinH:(scrollH-(bodyH-warpH)/8),
			curY,
			curBarPos,
			newPos=0;
		bar.style.height=barH+'px';	
		scroll.onmousedown=function(e){
			flag=1;
			var e=e||window.event;
			curBarPos=bar.offsetTop;
			curY=e.clientY;
			document.body.onselectstart = function(){return false};
		}
		window.onmousemove=function(e){
			if(flag==1){
				var e=e||window.event,
					newY=e.clientY;
				newPos=newY-curY+curBarPos;
				 moveBar(newPos);
			}
			document.body.onselectstart = function(){return false};
		}
		window.onmouseup=function(){
			flag=0;
			document.body.onselectstart = function(){return false};
		}

		if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
			document.addEventListener("DOMMouseScroll",function(e){wheel(e);},false);
		}
		else{
			warp.onmousewheel=function(e){wheel(e);}
		}	

		function wheel(e){
			var e=e||window.event;
			if(e.wheelDelta>0&&e.wheelDelta%120==0||e.detail===-3){
				newPos=newPos-5<0?0:newPos-5;
			}
			else if(e.wheelDelta<0&&e.wheelDelta%120==0||e.detail===3){
				newPos=newPos+5>scrollH-barH?(scrollH-barH):newPos+5;
			}
			moveBar(newPos);
		}
		function moveBar(newPos){
			var pos=parseInt(bar.style.marginTop);
			if(newPos<0){
				newPos=0;
			}
			else if(newPos>scrollH-barH){
				newPos=scrollH-barH;
			}
			bar.style.marginTop=newPos+'px';
			body.style.marginTop=(-1)*newPos*(bodyH-warpH)/(scrollH-barH)+'px';
		}
	}
} 
var radioObject={
	createRadio:function(Radios){
		var radios=document.getElementById(Radios.id),
		radiosbox=radios.getElementsByTagName('div'),
		type=Radios.type,
		options=Radios.options,
		num=options.length,
		choicePic=Radios.choicePic,
		flag=[],
		Max=Radios.Max,
		choice=['background:url('+choicePic+')',''],
		choice_num=0;
		for(var i=0;i<num;i++){
			var optionBox=document.createElement('div'),
				optionText=document.createElement('span');
			optionBox.className='radio';
			optionBox.setAttribute('index',i);
			optionText.className='text';
			optionText.innerHTML=options[i],
			radios.appendChild(optionBox);
			radios.appendChild(optionText);
			flag[i]=0;
		}
		radios.onclick=function(e){
			var e=e||window.event,
				target=e.target||e.srcElement,
				className=target.className,
				index=target.getAttribute('index');
			if(className=='radio'){
				target.style.cssText=choice[flag[index]];
				if(flag[index]==0){
					++choice_num;
				}
				else{
					--choice_num;
				}
				if(choice_num>Max){
					choice_num=Max;
					for(var i in flag){
						if(i!=index&&flag[i]==1){
							radiosbox[i].style.cssText=choice[1];
							flag[i]=0;
							break;
						}
					}
				}
				flag[index]=flag[index]>=1?0:flag[index]+1;
			}
		}
	}
};
var SelectObject={
	createSelect:function(sel){
		var select=document.getElementById(sel.select),
			selectBox=select.getElementsByTagName('ul')[0],
			input=select.getElementsByTagName('input')[0],
			show=select.getElementsByTagName('span')[0],
			selectArea=document.getElementById(sel.select+'Area'),
			options=sel.options,
			num=options.length,
			flag=0,
			max=sel.Max,
			optionH=sel.optionH,
			scrollBar;
		for(var i=0;i<num;i++){
			var option=document.createElement('li');
			option.innerHTML=options[i];
			option.setAttribute('Type','choice');
			selectBox.appendChild(option);
		}
		select.onclick=function(e){	
			var e=e||window.event,
				scroll,
				target=e.target||e.srcElement,
				type=target.getAttribute('Type'),
				display=['display:block;height:'+max*optionH+'px;','display:none;height:'+max*optionH+'px;'];
				if(num>max&&!scroll){
					var scroll=document.getElementById(sel.scroll);
					selectBox.style.width=90+'%';
				}
				if(type=='show'&&type){
					scroll.style.cssText=display[flag];
					selectArea.style.cssText=display[flag];
					flag=flag>=1?0:flag+1;
					
				}
				else if(type='choice'&&type){
					scroll.style.cssText=display[flag];
					selectArea.style.cssText=display[flag];
					flag=flag>=1?0:flag+1;
					show.firstChild.nodeValue=target.firstChild.nodeValue;
					input.value=show.firstChild.nodeValue;
				}
				else if(!type){
					return false;
				}
				if(!scrollBar&&max<num){
					var scrollBar=Object.create(scrollBarObj);
					scrollBar.createScrollBar({
						scroll:'scroll',//滚动栏的ID
						body:'body',//滚动内容的ID
						warp:'selectArea',//滚动区的ID
						bar:'bar',//滚动条的ID
						barMinH:20,//滚动条的最小高度
						speed:5,
						flag:0
					});
				}
		}
	}
};
var radio1=Object.create(radioObject);
radio1.createRadio({
	id:'radios',//选择按钮集合的ID
	Max:1,//最大选择数量
	options:['选项一','选项二','选项三','选项四','选项五'],//选项
	choicePic:'images/selected.png'
});
var select1=Object.create(SelectObject);
select1.createSelect({
	select:'select',//选框的ID
	scroll:'scroll',//滚动条ID
	options:['选项一','选项二','选项三','选项四','选项五','选项六','选项七'],//选框的选项
	Max:4,//显示选项的最大数量，若超过这个数量则会出现滚动条
	optionH:28
});

 

