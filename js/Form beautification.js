createSelect({
	id:'select',//选框的ID
	options:['选项一','选项二','选项三','选项四']//选框的选项
});
createRadio({
	id:'radios',//选择按钮集合的ID
	Max:1,//最大选择数量
	options:['选项一','选项二','选项三','选项四','选项五'],//选项
	choicePic:'images/selected.png'
});
function createSelect(sel) {
	var select=document.getElementById(sel.id),
		selectBox=select.getElementsByTagName('ul')[0],
		input=select.getElementsByTagName('input')[0],
		show=select.getElementsByTagName('span')[0],
		options=sel.options,
		num=options.length,
		flag=0;
	for(var i=0;i<num;i++){
		var option=document.createElement('li');
		option.innerHTML=options[i];
		option.setAttribute('Type','choice');
		selectBox.appendChild(option);
	}
	select.onclick=function(e){
		var e=e||window.event,
			target=e.target||e.srcElement,
			type=target.getAttribute('Type'),
			display=['display:block','display:none'];
		if(type=='show'){
			selectBox.style.cssText=display[flag];
			flag=flag>=1?0:flag+1;
		}
		else if(type='choice'){
			selectBox.style.cssText=display[flag];
			flag=flag>=1?0:flag+1;
			show.firstChild.nodeValue=target.firstChild.nodeValue;
			input.value=show.firstChild.nodeValue;
		}
	}
}
function createRadio(Radios){
	var radios=document.getElementById(Radios.id),
		radiosbox=radios.getElementsByTagName('div');
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
			else {
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