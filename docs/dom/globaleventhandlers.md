# GlobalEventHandlers 接口

`GlobalEventHandlers`接口主要用于为各种事件指定回调函数。

`HTMLElement`、`Document`和`Window`这三种接口继承了这个接口，也就是说，各种 HTML 元素、`document`对象、`window`对象上面都可以使用`GlobalEventHandlers`接口提供的属性。

## GlobalEventHandlers.onabort

某个对象的`abort`事件（停止加载）发生时，就会调用`onabort`属性指定的回调函数。

各种元素的停止加载事件，到底如何触发，目前并没有统一的规定。因此实际上，这个属性现在一般只用在`<img>`元素上面。

```javascript
// HTML 代码如下
// <img src="example.jpg" id="img">
var img = document.getElementById('img');
img.onabort = function () {
  console.log('image load aborted.');
}
```

## GlobalEventHandlers.onerror

`error`事件发生时，就会调用`onerror`属性指定的回调函数。

`error`事件分成两种。

一种是 JavaScript 的运行时错误，这会传到`window`对象，导致`window.onerror()`。

```javascript
window.onerror = function (message, source, lineno, colno, error) {
  // ...
}
```

`window.onerror`的处理函数共接受五个参数，含义如下。

- message：错误信息字符串
- source：报错脚本的 URL
- lineno：报错的行号，是一个整数
- colno：报错的列号，是一个整数
- error： 错误对象

另一种是资源加载错误，比如`<img>`或`<script>`加载的资源出现加载错误。这时，Error 对象会传到对应的元素，导致该元素的`onerror`属性开始执行。

```javascript
element.onerror = function (event) {
  // ...
}
```

注意，一般来说，资源的加载错误不会触发`window.onerror`。

## GlobalEventHandlers.onfocus，GlobalEventHandlers.onblur

当前元素获得焦点时，会触发`element.onfocus`；失去焦点时，会触发`element.onblur`。

```javascript
element.onfocus = function () {
  console.log("onfocus event detected!");
};
element.onblur = function () {
  console.log("onblur event detected!");
};
```

注意，如果不是可以接受用户输入的元素，要触发`onfocus`，该元素必须有`tabindex`属性。

### GlobalEventHandlers.onclick

用户点击元素时，会触发该元素的`onclick`属性。

```javascript
element.onclick = function (event) {
  console.log('moot!');
};
```

`onclick`属性的处理函数的参数是一个 MouseEvent 对象，会包含当前鼠标位置等信息。函数内部的`this`，指向当前元素。

该属性有两点需要注意。一是，它的触发时间在`mousedown`和`mouseup`事件的后面；二是，`keydown`事件最好与`click`事件部署同样的逻辑，以适应用户不使用鼠标或触摸屏、只使用键盘的情况。

## 表单相关的属性

### GlobalEventHandlers.onchange

`<input>`、`<select>`、`<textarea>`元素的值发生变更时，会触发`change`事件，导致执行`onchange()`。

## 特定元素的属性

### GlobalEventHandlers.oncancel

用户取消`<dialog>`的取消按钮或`esc`键时，会触发`oncancel`属性。该属性只对`<dialog>`元素有意义。
