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

## GlobalEventHandlers.onload、GlobalEventHandlers.onloadstart

元素完成加载时，会触发`load`事件，执行`onload()`。它的典型使用场景是`window`对象和`<img>`元素。对于`window`对象来说，只有页面的所有资源加载完成（包括图片、脚本、样式表、字体等所有外部资源），才会触发`load`事件。

对于`<img>`和`<video>`等元素，加载开始时还会触发`loadstart`事件，导致执行`onloadstart`。

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

## GlobalEventHandlers.onclick，GlobalEventHandlers.ondblclick

用户点击元素时，会触发该元素的`onclick`属性。

```javascript
element.onclick = function (event) {
  console.log('moot!');
};
```

`onclick`属性的处理函数的参数是一个 MouseEvent 对象，会包含当前鼠标位置等信息。函数内部的`this`，指向当前元素。

该属性有两点需要注意。一是，它的触发时间在`mousedown`和`mouseup`事件的后面；二是，`keydown`事件最好与`click`事件部署同样的逻辑，以适应用户不使用鼠标或触摸屏、只使用键盘的情况。

用户双击元素时，会触发`dblclick`事件，导致执行`ondblclick()`。

```javascript
element.ondblclick = function () {
  console.log('双击事件发生');
};
```

## GlobalEventHandlers.onscroll

页面或元素滚动时，会触发`scroll`事件，导致执行`onscroll()`。

## GlobalEventHandlers.oncontextmenu，GlobalEventHandlers.onshow

用户在页面上按下鼠标的右键，会触发`contextmenu`事件，导致执行`oncontextmenu()`。如果该属性执行后返回`false`，就等于禁止了右键菜单。`document.oncontextmenu`与`window.oncontextmenu`效果一样。

```javascript
document.oncontextmenu = function () {
  return false;
};
```

上面代码中，`oncontextmenu`属性执行后返回`false`，右键菜单就不会出现。

元素的右键菜单显示时，会触发该元素的`onshow`事件。

## 鼠标相关属性

- GlobalEventHandlers.onmousedown
- GlobalEventHandlers.onmouseenter
- GlobalEventHandlers.onmouseleave
- GlobalEventHandlers.onmousemove
- GlobalEventHandlers.onmouseout
- GlobalEventHandlers.onmouseover
- GlobalEventHandlers.onmouseup
- GlobalEventHandlers.onwheel

## 键盘相关属性

- GlobalEventHandlers.onkeydown
- GlobalEventHandlers.onkeypress
- GlobalEventHandlers.onkeyup

## 表单相关属性

### GlobalEventHandlers.oninput，GlobalEventHandlers.onchange

`<input>`、`<select>`、`<textarea>`元素的值发生任何一点变更时，都会同步触发`input`事件，导致执行`oninput()`。当用户的输入告一段落后，输入框失去焦点之后，才会触发`change`事件，导致执行`onchange()`，也就是说不是每一次输入，都会触发`change`事件。

另外，打开`contenteditable`属性的元素（变成可编辑模式）的内容发生变化时，也会触发`input`事件。

`oninput`和`onchange`的参数就是事件对象，可以从`event.target.value`上拿到用户输入的值。

### GlobalEventHandlers.oninvalid，GlobalEventHandlers.onreset

一个表单元素的值不符合规定条件时，就会触发`invalid`事件，导致`oninvalid()`执行。

用户重置表单时，会触发`reset`事件，导致执行`onreset()`。

### GlobalEventHandlers.onselect

表单的`<input>`文本输入框和`<textarea>`里面的文本被选中，会触发`select`事件，导致执行`onselect()`。

### GlobalEventHandlers.onsubmit

用户提交表单时，会触发表单元素的`submit`事件，导致执行`onsubmit()`。

## 拖动相关属性

拖动相关属性分成两类：一类与被拖动元素相关，另一类接收被拖动元素的容器元素相关。

被拖动元素的相关属性。

- GlobalEventHandlers.ondragstart：拖动开始
- GlobalEventHandlers.ondrag：拖动过程中，每隔几百毫秒触发一次
- GlobalEventHandlers.ondragend：拖动结束

接收被拖动元素的容器元素的相关属性。

- GlobalEventHandlers.ondragenter：被拖动元素进入容器元素。
- GlobalEventHandlers.ondragleave：被拖动元素离开容器元素。
- GlobalEventHandlers.ondragover：被拖动元素在容器元素上方，每隔几百毫秒触发一次。
- GlobalEventHandlers.ondrop：松开鼠标后，被拖动元素放入容器元素。

以上属性的函数参数都是事件对象。

```javascript
element.ondragstart = function (ev) {
  console.log('dragStart');
}

element.ondrag = function (ev) {
  console.log('Drag');
}

element.ondragEnd = function (ev) {
  console.log('dragEnd');
}
```

## 触摸相关事件

- GlobalEventHandlers.ontouchcancel
- GlobalEventHandlers.ontouchend
- GlobalEventHandlers.ontouchmove
- GlobalEventHandlers.ontouchstart

## 特定元素的属性

### GlobalEventHandlers.oncancel，GlobalEventHandlers.onclose

用户点击`<dialog>`的取消按钮或按下`esc`键时，会触发`cancel`事件，导致执行`oncancel`属性。用户关闭`<dialog>`窗口，会触发`onclose`事件，导致执行`onclose`属性。

这两个属性在 DOM 中只对`<dialog>`元素有意义。
