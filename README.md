## angular-lert V1.1
### Params

名称 | 类型 | 是否必须 | 描述 | 示例值 | 默认值
--- |---|---|---|---|---
title   | Array | 否 | 标题 | ["this is title1","this is title2"]
message | Array | 否 | 内容 | ["this is message1","this is message2"]
type    | String | 是 | 类型 | "input" | "text"
btn_num | Number | 否 | 按钮个数 | 2 | 2
html    | String | 否 | 自定义html(当type为html时) | "\<div>Hello World\</div>"
placeholder | String | 否 | input占位符(当type为input时) | "this is placeholder"
btn_no_text | String | 否 | btn_no对文文案 | "取消" | "取消"
btn_yes_text | String | 否 | btn_no对文文案 | "确定" | "确定"
btn_back_text | String | 否 | btn_no对文文案 | "返回" | "返回"
scope | $scope | Object | 是 | $scope

### Usage
```js
function test ( $scope, dialog ) {
    dialog({
    	title:['this is title'],
    	message:['this is message'],
    	type:'html',
    	html:'<div>Hello World</div>',
    	btn_num: 2,
    	scope:$scope
    }).btn_yes(function(){
    	alert('clicked btn_yes');
    });
}
```

### Require
```js
angular.module('inspinia', [
    'angularAlert'						//bnmAlert
]);
```