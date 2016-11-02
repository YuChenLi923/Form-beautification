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
			input=doc.getElementById(Range.input),
			bar=doc.getElementById(Range.bar),
			min=Range.min,
			max=Range.max,
			flag=false,
			width=rangeArea.offsetWidth-bar.offsetWidth;
		addEvent(rangeArea,'click',function(e){
			var e=e||window.event,
				target=e.target||e.srcElement,
				id=target.id,
				x=e.clientX,
				curX,
				cur;
			if(id!=Range.bar){
				curX=getElementCoordinate(rangeArea).x;
				cur=x-curX;
				if(cur<0){
					cur=0
				}
				if(cur>width){
					cur=width;
				}
				have.style.width=cur+'px';
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
					x=e.clientX;
					curX=getElementCoordinate(bar).x;
					cur=haveArea.offsetWidth+x-curX;
				if(cur<0){
					cur=0
				}
				if(cur>width){
					cur=width;
				}
				have.style.width=cur+'px';
			}
		});
	}
}
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
	scroll:'scroll',//滚动栏ID
	scroll_body:'body',//滚动内容的ID
	scroll_area:'selectArea', //滚动区的ID
	scroll_bar:'bar',//滚动条的ID
	options:['选项一','选项二','选项三','选项四','选项五','选项六','选项七'],//选框的选项
	Max:4,//显示选项的最大数量，若超过这个数量则会出现滚动条
	optionH:28
});

var file1=Object.create(fileObject);
file1.createFile(
	{
		fileBox:'fileBox',
		fileInf:'fileInf',
		fileWarp:'fileWarp',
		input:'files'
	}
); 

var rang1=Object.create(rangeObject);

rang1.createRange({
	min:10,//最小值
	max:100,//最大值
	bar:'rangeBar',//滑动按钮
	have:'have',//滑动条
	range:'range',//总滑动条
	input:'ranges'
});
