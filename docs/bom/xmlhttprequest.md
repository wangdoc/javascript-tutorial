# XMLHttpRequest 对象

## Navigator.sendBeacon()

用户卸载网页的时候，有时需要向服务器发一些数据。很自然的做法是在`unload`事件或`beforeunload`事件的监听函数里面，使用`XMLhttpRequest`对象发送数据。但是，这样做不是很可靠，因为`XMLhttpRequest`对象是异步发送，很可能在它即将发送的时候，页面已经卸载了，从而导致发送取消或者发送失败。

解决方法就是改成同步发送，即只有发送完成，页面才能卸载。

```javascript
window.addEventListener('unload', logData, false);

function logData() {
  var client = new XMLHttpRequest();
  // 第三个参数表示同步发送
  client.open('POST', '/log', false);
  client.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
  client.send(analyticsData);
}
```

上面代码指定`XMLHttpRequest`同步发送。类似的做法还有新建一个`<img>`元素，然后将数据通过设置图片元素的`src`属性发出去，这时浏览器会等待图片加载完成，再进行卸载。另一种做法是创建一个循环，规定执行时间为几秒钟，在这几秒钟内把数据发出去，然后再卸载页面。

这些做法的共同问题是，把卸载的时间硬生生拖长了，后面的页面的加载被推迟了，用户体验不好。

为了解决这个问题，浏览器引入了`Navigator.sendBeacon()`方法。这个方法可以保证在页面卸载前异步发出数据，不拖延卸载流程。

```javascript
window.addEventListener('unload', logData, false);

function logData() {
  navigator.sendBeacon('/log', analyticsData);
}
```

`Navigator.sendBeacon`方法接受两个参数，第一个参数是目标服务器的 URL，第二个参数是所要发送的数据（可选），可以是任意类型（字符串、表单对象、二进制对象等等）。

```javascript
navigator.sendBeacon(url, data)
```

这个方法的返回值是一个布尔值，成功发送数据为`true`，否则为`false`。

该方法发送数据的 HTTP 方法是 POST，可以跨域，类似于表单提交数据。它不能指定回调函数。

下面是一个例子。

```javascript
// HTML 代码如下
// <body onload="analytics('start')" onunload="analytics('end')">

function analytics(state) {
  if (!navigator.sendBeacon) return;

  var URL = 'http://example.com/analytics';
  var data = 'state=' + state + '&location=' + window.location;
  navigator.sendBeacon(URL, data);
}
```
