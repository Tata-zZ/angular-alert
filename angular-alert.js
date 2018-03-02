/**
	angular-lert V1.1
	@param
		title	[Array]		: 标题
		message	[Array]		: 内容
		type	[String]	: 类型('empty'|'text'|'input'|'table'| 'html')
		btn_num	[Number]	: 按钮个数
		html	[String]	: 自定义html(当type为html时)
		placeholder	  [String]	: input占位符(当type为input时)
		btn_no_text	  [String]	: btn_no对文文案
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
*/
angular.module("angularAlert", []).factory('dialog', ['$timeout', '$http', '$compile', '$templateCache', '$rootScope',
	function($timeout, $http, $compile, $templateCache, $rootScope) {
		var NOTIFY_BASE = './angular-alert.html',
			BG_COLOR = '@bnmBlack',
			DIALOG_CLASS = 'dialog-body',
			PATR1_CLASS = 'dialog-body-part1',
			PATR2_CLASS = 'dialog-body-part2',
			PATR3_CLASS = 'dialog-body-part3',

			TITLE = '',
			MESSAGE = '',
			TYPE = 'text',
			// 0:empty part2为空
			// 1:text  part2为纯文本
			// 2:input pert2为输入框
			// 3:table part2为表格
			// 4:html  part2为自定义html
			PLACEHOLDER='',
			HTML = '',
			HTMLCACHE = '',

			BTN_NUM = 2,
			BTN_NO_TEXT = '取消',
			BTN_YES_TEXT = '确定',
			BTN_BACK_TEXT = '返回'
		;

		//初始化scope
		function initScope(scope) {
			if (typeof(scope) == "undefined")
				var myscope = $rootScope.$new();
			else
				var myscope = scope;
			return myscope;
		}

		//初始化数据
		function initData(scope, message, callbcak) {
			scope.title = angular.isUndefined(message.title) ? TITLE : message.title;
			scope.message = angular.isUndefined(message.message) ? MESSAGE : message.message;
			scope.placeholder=angular.isUndefined(message.placeholder)?PLACEHOLDER :message.placeholder;
			scope.type = angular.isUndefined(message.type) ? TYPE : message.type;
			scope.btn_num = angular.isUndefined(message.btn_num) ? BTN_NUM : message.btn_num;
			scope.btn_no_text = angular.isUndefined(message.btn_no_text) ? BTN_NO_TEXT : message.btn_no_text;
			scope.btn_yes_text = angular.isUndefined(message.btn_yes_text) ? BTN_YES_TEXT : message.btn_yes_text;
			scope.btn_back_text = angular.isUndefined(message.btn_back_text) ? BTN_BACK_TEXT : message.btn_back_text;
			HTMLCACHE = angular.isUndefined(message.html) ? HTML : message.html;
			return callbcak;
		}

		//移除弹窗
		function dismiss() {
			angular.element(document.querySelector('.dialog')).remove();
		}

		// 插入弹窗模板html
		function notifyBase(myscope, type) {
			var html = '';
			$http.get(NOTIFY_BASE)
				.success(function(data) {
					// 插入base
					$templateCache.put(NOTIFY_BASE, data);
					var template = $compile($templateCache.get(NOTIFY_BASE))(myscope)
					angular.element(document).find('body').append(template);
					// 插入part2
					return notifyPart2(myscope, type)
				});
		}

		// 插入part2部分
		function notifyPart2(myscope, type) {
			var html;
			if (type == 'text') {
				html = '<div class="text" ng-repeat="m in message">' + '{{m}}' + '</div>';
			} else if (type == 'input') {
				html = '<input class="amount" type="number" placeholder={{placeholder}} ng-model="size" required="true">';
			} else if (type == 'table') {
				html =
					'<div class="table-box">' +
					'<table class="table-list">' +
					'<tr ng-repeat="data in finishedDetailData">' +
					'<td class="td-w-40">{{data.date}}</td>' +
					'<td class="td-w-60">' +
					'完成：' +
					'<span ng-class={"unchecked":data.state<300}>' +
					'{{data.size}}' +
					'</span>' + '亩' +
					'</td>' +
					'</tr>' +
					'</table>' +
					'</div>';
			} else if (type = 'html') {
				html = '<div class="text-center">' + HTMLCACHE + '</div>';
				console.log('HTMLCACHE', HTMLCACHE);
			} else {
				html = null;
				console.log("type=", type);
			}
			$templateCache.put(NOTIFY_BASE, html);
			var template = $compile($templateCache.get(NOTIFY_BASE))(myscope)
			angular.element(document.querySelector('.dialog-part2')).append(template);
		}

		// 三种按钮的函数
		function no() {
			dismiss();
		}
		function yes() {
			dismiss();
		}
		function back() {
			dismiss();
		}

		//按钮回调事件
		function btnMethod(myscope,that){
			that.btn_no = function(fn) {
				var f = fn;
				myscope.no = function(fn) {
					f();
					return no();
				}
				return that;
			};
			that.btn_yes = function(fn) {
				var f = fn;
				myscope.yes = function(fn) {
					f();
					return yes();
				}
				return that;
			};
			that.btn_back = function(fn) {
				var f = fn;
				myscope.back = function(fn) {
					f();
					return back();
				}
				return that;
			};
		}

		var Dialog = function(message) {
			console.log(message.scope);
			//在rootscope下创建scope
			var myscope = initScope(message.scope);
			//notifyInitData
			initData(myscope, message, notifyBase(myscope, message.type));
			//在scope下绑定事件
			//初始化三种按钮事件
			myscope.no = no;
			myscope.yes = yes;
			myscope.back = back;
			console.log("myscope", myscope);
			//绑定三种按钮方法
			btnMethod(myscope,this);
		}
		var newDialog = function(message) {
			return new Dialog(message);
		};
		return newDialog;
	}
])