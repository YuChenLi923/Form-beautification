//向某个对象添加事件
function addEvent(Obj,e,func) {
	if(window.addEventListener){
		Obj.addEventListener(e,func);
		addEvent=function(Obj,e,func){
			Obj.addEventListener(e,func);
		};
	}
	else if(Obj.attachEvent){
		Obj.attachEvent('on'+e,func);
		addEvent=function(Obj,e,func){
			Obj.attachEvent('on'+e,func);
		};
	}
	else{
		Obj['on'+e]=func;
		addEvent=function(Obj,e,func){
			Obj['on'+e]=func;
		};
	}
}
//获取元素左上角的坐标
function getElementCoordinate(elem){
	var x=y=0;
	while(elem.offsetParent){
		x=x+elem.offsetLeft;
		y=y+elem.offsetTop;
		elem=elem.offsetParent;
	}
	return {
		x:x,
		y:y
	}
}
//获取页面相关的大小信息
function getPageSizeInf(){
	var doc=document,
		scrollTop = window.pageYOffset|| doc.documentElement.scrollTop || doc.body.scrollTop,
		viewHeight =Math.min(doc.documentElement.scrollHeight,doc.clientHeight),
		docHeight=Math.max(doc.documentElement.scrollHeight,doc.documentElement.clientHeight),
		scrollBottom=docHeight-viewHeight-scrollTop;
	return {
		scrollTop:scrollTop,
		viewHeight:viewHeight,
		docHeight:docHeight,
		scrollBottom:scrollBottom
	};
}
//最大程度优化元素获取
function getElement(obj,select,dynamic){
	var  doc=document,
		elem=null,
		flag=select.charAt(0);
	if(flag==='#'){
		if(doc.querySelector&&dynamic==false){
			elem=obj.querySelector(select);
		}
		else{
			elem=obj.getElementById(select.slice(1));
		}
	}
	if(flag==='.'){
		if(doc.querySelectorAll&&dynamic==false){
			elem=obj.querySelectorAll(select);
		}
		else{
			if(doc.getElementsByClassName){
				elem=obj.getElementsByClassName(select.slice(1));
			}
			else{
				var AllElem=doc.getElementsByTagName('*'),
					result=[];

				for(var i=0,max=AllElem.length;i<max;i++){
					if(AllElem[i].className==select.slice(1)){
						result.push(AllElem[i]);
					}
				}
				elem=result;
			}
		}
	}
	if(flag!='.'&&select.charAt(0)!='#'){
		if(doc.querySelectorAll&&dynamic==false){
			elem=obj.querySelectorAll(select);
		}
		else{
			elem=obj.getElementsByTagName(select);
		}
	}
	return elem;
}


var	scrollBarObj={
	createScrollBar:function(scrollBar) {
		var doc=document,
			scroll=doc.getElementById(scrollBar.scroll),
			body=doc.getElementById(scrollBar.body),
			bar=doc.getElementById(scrollBar.bar),
			warp=doc.getElementById(scrollBar.warp),
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
			doc.body.onselectstart = function(){return false};
		}
		window.onmousemove=function(e){
			if(flag==1){
				var e=e||window.event,
					newY=e.clientY;
				newPos=newY-curY+curBarPos;
				 moveBar(newPos);
			}
			doc.body.onselectstart = function(){return false};
		}
		window.onmouseup=function(){
			flag=0;
			doc.body.onselectstart = function(){return false};
		}

		if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
			doc.addEventListener("DOMMouseScroll",function(e){wheel(e);},false);
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
			optionText.innerHTML=options[i];
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
			selectArea=document.getElementById(sel.scroll_area),
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
						scroll:sel.scroll,//滚动栏的ID
						body:sel.scroll_body,//滚动内容的ID
						warp:sel.scroll_area,//滚动区的ID
						bar:sel.scroll_bar,//滚动条的ID
						barMinH:20,//滚动条的最小高度
						speed:5,
						flag:0
					});
				}
		}
	}
};
var fileObject={
	createFile:function(file){
		var fileBox=document.getElementById(file.fileBox),
			fileInf=document.getElementById(file.fileInf),
			fileWarp=document.getElementById(file.fileWarp),
			input=document.getElementById(file.input),
			fileUp=fileWarp.getElementsByTagName('input')[0];
		fileUp.onchange=function(e){
			var e=e||window.event;
			fileInf.innerHTML=this.value;
		}
	}
}
var rangeObject={
	createRange:function(Range){
		var doc=document,
			rangeArea=doc.getElementById(Range.range),
			haveArea=doc.getElementById(Range.have),
			bar=doc.getElementById(Range.bar),
			flag=false,
			width=rangeArea.offsetWidth-bar.offsetWidth,
			height=rangeArea.offsetHeight-bar.offsetHeight,
			Handler=Range.Handler||null,
			direction=Range.direction;
		function makePos(e){
			var cur;
			if(direction=='horizontal'){
					var x=e.clientX,
						curX=getElementCoordinate(rangeArea).x;
					cur=x-curX;
					if(cur<0){
						cur=0;
					}	
					if(cur>width){
						cur=width;
					}
					haveArea.style.width=cur+'px';
				}
			if(direction=='vertical'){
					var y=e.clientY,
						curY=getElementCoordinate(rangeArea).y;
					cur=height-(y-curY);
					if(cur<0){
						cur=0;
					}
					if(cur>height){
						cur=height;
					}
					haveArea.style.height=cur+'px';
					bar.style.bottom=cur+'px';
			}
			if(Handler){
					Handler(cur);
			}
		}
		addEvent(rangeArea,'click',function(e){
			var e=e||window.event,
				target=e.target||e.srcElement,
				id=target.id;
			if(id!=Range.bar){
				makePos(e);
			}
		});
		addEvent(bar,'mousedown',function(){
			flag=true;
		});
		addEvent(window,'mouseup',function(){
			flag=false;
		});
		addEvent(window,'mousemove',function(e){
			if(flag){
				var e=e||window.event,
					x=e.clientX,
					cur;
				makePos(e);
			}
		});
	}
}
