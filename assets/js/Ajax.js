function get(url,cb){
	// 3.1 生成请求xhr对象
	var xhr = new XMLHttpRequest();

	// 3.2 配置（请求的方式，请求的目的）
	xhr.open('GET', url, true);

	// 3.3 发送
	xhr.send();

	// 3.4 请求完成的事件
	xhr.onload = function(){
		// 服务器返回的是json字符串，将json字符串转换为json对象
		// console.log(xhr.responseText);
		//var data = JSON.parse(xhr.responseText);
		var data = xhr.responseText
		// console.log(data);

		// ajax返回数据之后，不知道未来做什么事情，于是设置一个回调函数，后期自定义
		cb(data);
	}
}

function post(url,data,cb){
	// 1. 创建请求对象 XMLHttpRequest xml http(协议) request(请求)
	var xhr = new XMLHttpRequest();

	// 2. 配置
	xhr.open('POST', url, true);

	// 3.发送
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send(data);

	// 4.接收post返回的结果
	xhr.onload = function(){
		cb(xhr.responseText);
	}
}