由于select、radio元素不能通过css来改成所需要的样式，必须用其他元素替代并结合JS实现操作，为了偷懒，这次把整个JS全部封装起来，方便以后使用。

JS实现select、radio（方便直接修改样式）
0.1
- 实现了select、radio的元素操作

0.2
- 优化了结构，采用面向委托的设计模式

0.3
- 增加了滚动条，当select不能完全显示所有的option的时候

0.4
- 修复火狐下滚动条鼠标滚动无效的BUG

0.5
- 新增文件按钮