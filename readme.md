这是一个用纯JS实现的按钮、选框的一个demo。您只需要引入相应js文件即可。

## 使用说明
引入Form-beautification.js文件

如果想要创建下拉列表，要确保下拉列表使用正常，务必设置好对应的css，可以参考源码。JS和HTML代码如下

``` html
	<div class="sort" id='select'>
		<span Type='show'>请选择</span>
		<div class="selectArea" id='selectArea'>
			<ul id='body'>
			</ul>
			<div id='scroll'>
				<button id='bar' onclick="return false"></button>
			</div>
		</div>
		<input name='select' type="hidden" value=""></input>
	</div>
	
```


``` js

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

``` 

选择框

``` html
	<div id='radios'>
	</div>
	
```


``` js

	var radio1=Object.create(radioObject);
		radio1.createRadio({
		id:'radios',//选择按钮集合的ID
		Max:1,//最大选择数量
		options:['选项一','选项二','选项三','选项四','选项五'],//选项
		choicePic:'images/selected.png'
	});

``` 

文件上传按钮

``` html
	<div id='fileBox'>
			<span id='fileInf'></span>
			<a id='fileWarp'>选择<input type="file"></input></a>
			<input id='files' type="hidden"></input>
	</div>
	
```


``` js

	var file1=Object.create(fileObject);
		file1.createFile(
			{
				fileBox:'fileBox',
				fileInf:'fileInf',
				fileWarp:'fileWarp',
				input:'files'
			}
		); 

``` 

滑动按钮


``` html
	<div id='range' class='range'>
		<div id='have' class='have'></div>
		<button id='rangeBar' class='Bar' onclick='return false'></button>
		<input type='hidden' id='ranges'></input>
	</div>
	
```


``` js

	var rang1=Object.create(rangeObject);
		rang1.createRange({
			bar:'rangeBar',//滑动按钮
			have:'have',//滑动条
			range:'range',//总滑动
			direction:'horizontal',//方向,horizontal-为水平滑动条,vertical-垂直滑动条
			Handler:Handler//range按钮数值变化时自定义函数
		});

```

自定义滚动条

``` html
	<div id='warp'>
		<div id='body'>	
		</div>
		<div id='scroll'>
			<button id='bar'  onclick="return false"></button>
		</div>
	</div>
	
```


``` js

	var scrollBar=Object.create(sccrollBarObj);
	scrollBar.createScrollBar({
		scroll:'scroll',//滚动栏的ID
		body:'body',//滚动内容的ID
		warp:'warp',//滚动区的ID
		bar:'bar',//滚动条的ID
		barMinH:40,//滚动条的最小高度
		speed:5,//滚动条移动的速度
		flag:0
	});
	

```


## 更新历史
JS实现select、radio（方便直接修改样式）
0.1
- 实现了select、radio的来元素操作

0.2
- 优化了结构，采用面向委托的设计模式

0.3
- 增加了滚动条，当select不能完全显示所有的option的时候

0.4
- 修复火狐下滚动条鼠标滚动无效的BUG

0.5
- 新增文件按钮

0.6
- 新增滑动按钮