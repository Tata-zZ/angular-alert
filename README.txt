angular-lert V1.1
	@param
		title	[Array]		: 标题
		message	[Array]		: 内容
		type	[String]	: 类型('empty'|'text'|'input'|'table'| 'html')
		btn_num	[Number]	: 按钮个数
		html	[String]	: 自定义html(当type为html时)
		placeholder   [String]	: input占位符(当type为input时)
		btn_no_text   [String]	: btn_no对文文案
		btn_yes_text  [String]	: btn_yes对文文案
		btn_back_text [String]	: btn_back对文文案
		scope : $scope
	@author Lin

	可链式调用，绑定对应按钮的回调事件
	eg.
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