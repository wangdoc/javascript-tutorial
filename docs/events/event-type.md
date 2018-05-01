# 事件种类

## 鼠标事件

- click
- dblclick
- mouseup
- mousedown

## 触摸事件

触摸引发的事件，有以下几种。可以通过`TouchEvent.type`属性，查看到底发生的是哪一种事件。

- `touchstart`：用户开始触摸时触发，它的`target`属性返回发生触摸的元素节点。
- `touchend`：用户不再接触触摸屏时（或者移出屏幕边缘时）触发，它的`target`属性与`touchstart`事件一致的，就是开始触摸时所在的元素节点。它的`changedTouches`属性返回一个`TouchList`实例，包含所有不再触摸的触摸点（即`Touch`实例对象）。
- `touchmove`：用户移动触摸点时触发，它的`target`属性与`touchstart`事件一致。如果触摸的半径、角度、力度发生变化，也会触发该事件。
- `touchcancel`：触摸点取消时触发，比如在触摸区域跳出一个情态窗口（modal window）、触摸点离开了文档区域（进入浏览器菜单栏）、用户的触摸点太多，超过了支持的上限（自动取消早先的触摸点）。

下面是一个例子。

```javascript
var el = document.getElementsByTagName('canvas')[0];
el.addEventListener('touchstart', handleStart, false);
el.addEventListener('touchmove', handleMove, false);

function handleStart(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  for (var i = 0; i < touches.length; i++) {
    console.log(touches[i].pageX, touches[i].pageY);
  }
}

function handleMove(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  for (var i = 0; i < touches.length; i++) {
    var touch = touches[i];
    console.log(touch.pageX, touch.pageY);
  }
}
```

## 键盘事件

- keydown
- keypress
- keyup

## 焦点事件

- focus
- blur
- focusin
- focusout

