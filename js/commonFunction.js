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

