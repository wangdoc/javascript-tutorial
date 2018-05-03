# KeyboardEvent 接口，InputType 接口，CustomEvent 接口

## KeyboardEvent 概述

`KeyboardEvent`接口用来描述用户与键盘的互动。这个接口继承了`Event`接口，并且定义了自己的实例属性和实例方法。

浏览器原生提供`KeyboardEvent`构造函数，用来新建键盘事件的实例。

```javascript
new KeyboardEvent(type, options)
```

`KeyboardEvent`构造函数接受两个参数。第一个参数是字符串，表示事件类型；第二个参数是一个事件配置对象，该参数可选。除了`Event`接口提供的属性，还可以配置以下字段，它们都是可选。

- `key`：字符串，当前按下的键，默认为空字符串。
- `code`：字符串，表示当前按下的键的字符串形式，默认为空字符串。
- `location`：整数，当前按下的键的位置，默认为`0`。
- `ctrlKey`：布尔值，是否按下 Ctrl 键，默认为`false`。
- `shiftKey`：布尔值，是否按下 Shift 键，默认为`false`。
- `altKey`：布尔值，是否按下 Alt 键，默认为`false`。
- `metaKey`：布尔值，是否按下 Meta 键，默认为`false`。
- `repeat`：布尔值，是否重复按键，默认为`false`。

## KeyboardEvent 的实例属性

### KeyboardEvent.altKey，KeyboardEvent.metaKey.ctrlKey，KeyboardEvent.metaKey，KeyboardEvent.shiftKey

以下属性都是只读属性，返回一个布尔值，表示是否按下对应的键。

- `KeyboardEvent.altKey`：是否按下 Alt 键
- `KeyboardEvent.ctrlKey`：是否按下 Ctrl 键
- `KeyboardEvent.metaKey`：是否按下 meta 键（Mac 系统是一个四瓣的小花，Windows 系统是 windows 键）
- `KeyboardEvent.shiftKey`：是否按下 Shift 键

下面是一个示例。

```javascript
function showChar(e){
  console.log("ALT: " + e.altKey);
  console.log("CTRL: " + e.ctrlKey);
  console.log("Meta: " + e.metaKey);
  console.log("Meta: " + e.shiftKey);
}

document.body.addEventListener('click', showChar, false);
```

### KeyboardEvent.code

`KeyboardEvent.code`属性返回一个字符串，表示当前按下的键的字符串形式。该属性只读。

下面是一些常用键的字符串形式，其他键请查[文档](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code#Code_values)。

- 数字键0 - 9：返回`digital0` - `digital9`
- 字母键A - z：返回`KeyA` - `KeyZ`
- 功能键F1 - F12：返回 `F1` - `F12`
- 方向键：返回`ArrowDown`、`ArrowUp`、`ArrowLeft`、`ArrowRight`
- Alt 键：返回`AltLeft`或`AltRight`
- Shift 键：返回`ShiftLeft`或`ShiftRight`
- Ctrl 键：返回`ControLeft`或`ControlRight`

### KeyboardEvent.key

`KeyboardEvent.key`属性返回一个字符串，表示按下的键名。该属性只读。

如果按下的键代表可打印字符，则返回这个字符，比如数字、字母。

如果按下的键代表不可打印的特殊字符，则返回预定义的键值，比如 Backspace，Tab，Enter，Shift，Control，Alt，CapsLock，Esc，Spacebar，PageUp，PageDown，End，Home，Left，Right，Up，Down，PrintScreen，Insert，Del，Win，F1～F12，NumLock，Scroll 等。

如果同时按下一个控制键和一个符号键，则返回符号键的键名。比如，按下 Ctrl + a，则返回`a`；按下 Shift + a，则返回大写的`A`。

如果无法识别键名，返回字符串`Unidentified`。

### KeyboardEvent.location

`KeyboardEvent.location`属性返回一个整数，表示按下的键处在键盘的哪一个区域。它可能取以下值。

- 0：处在键盘的主区域，或者无法判断处于哪一个区域。
- 1：处在键盘的左侧，只适用那些有两个位置的键（比如 Ctrl 和 Shift 键）。
- 2：处在键盘的右侧，只适用那些有两个位置的键（比如 Ctrl 和 Shift 键）。
- 3：处在数字小键盘。

### KeyboardEvent.repeat

`KeyboardEvent.repeat`返回一个布尔值，代表该键是否被按着不放，以便判断是否重复这个键，即浏览器会持续触发`keydown`和`keypress`事件，直到用户松开手为止。

## KeyboardEvent 的实例方法

### KeyboardEvent.getModifierState()

`KeyboardEvent.getModifierState()`方法返回一个布尔值，表示是否按下或激活指定的功能键。它的常用参数如下。

- `Alt`：Alt 键
- `CapsLock`：大写锁定键
- `Control`：Ctrl 键
- `Meta`：Meta 键
- `NumLock`：数字键盘开关键
- `Shift`：Shift 键

```javascript
if (
  event.getModifierState('Control') +
  event.getModifierState('Alt') +
  event.getModifierState('Meta') > 1
) {
  return;
}
```

上面代码表示，只要`Control`、`Alt`、`Meta`里面，同时按下任意两个或两个以上的键就返回。

## InputEvent 接口概述

`<input>`或`<textarea>`元素的值发生变化时，会发生`input`事件。这个事件对象就是`InputEvent`接口的实例。

这个事件跟`change`事件很想像，不同之处在于`input`事件在元素的值发生变化后立即发生，而`change`在元素失去焦点时发生，而内容此时可能已经变化多次。另一个区别是`change`事件也适用于`<select>`元素，而`input`事件只发生在可以键盘输入的表单元素。

`InputEvent`接口继承了`Event`接口，还定义了一些自己的实例属性和实例方法。

浏览器原生提供`InputEvent()`构造函数，用来生成实例对象。

```javascript
new InputEvent(type, options)
```

`InputEvent`构造函数可以接受两个参数。第一个参数是字符串，表示事件名称，该参数是必需的。第二个参数是一个配置对象，用来设置事件实例的属性，该参数是可选的。配置对象的字段除了`Event`构造函数的配置属性，还可以设置下面的字段，这些字段都是可选的。

- `inputType`：字符串，表示发生变更的类型（详见下文）。
- `data`：字符串，表示插入的字符串。如果没有插入的字符串（比如删除操作），则返回`null`或空字符串。
- `dataTransfer`：返回一个 DataTransfer 对象实例，该属性通常只在输入框接受富文本输入时有效。

`InputEvent`的实例属性主要就是上面三个属性，这三个实例属性都是只读的。

**（1）InputEvent.data**

`InputEvent.data`属性返回一个字符串，表示变动的内容。

```javascript
// HTML 代码如下
// <input type="text" id="myInput">
var input = document.getElementById('myInput');
input.addEventListener('input', myFunction, false);

function myFunction(e) {
  console.log(e.data);
}
```

上面代码中，如果手动在输入框里面输入`abc`，控制台会先输出`a`，再在下一行输出`b`，再在下一行输出`c`。然后选中`abc`，一次性将它们删除，控制台会输出`null`或一个空字符串。

**（2）InputEvent.inputType**

`InputEvent.inputType`属性返回一个字符串，表示字符串发生变更的类型。

对于常见情况，Chrome 浏览器的返回值如下。完整列表可以参考[文档](https://w3c.github.io/input-events/index.html#dom-inputevent-inputtype)。

- 手动插入文本：`insertText`
- 粘贴插入文本：`insertFromPaste`
- 向后删除：`deleteContentBackward`
- 向前删除：`deleteContentBackward`

**（3）InputEvent.dataTransfer**

`InputEvent.dataTransfer`属性返回一个 DataTransfer 实例。该属性只在文本框接受粘贴内容（insertFromPaste）或拖拽内容（`insertFromDrop`）时才有效。

## CustomEvent 接口

CustomEvent 接口用于生成自定义的事件实例。那些浏览器预定义的事件，虽然可以手动生成，但是往往不能在事件上绑定数据。如果需要在触发事件的同时，传入指定的数据，就可以使用 CustomEvent 接口生成的自定义事件对象。

浏览器原生提供`CustomEvent()`构造函数，用来生成 CustomEvent 事件实例。

```javascript
new CustomEvent(type, options)
```

`CustomEvent()`构造函数接受两个参数。第一个参数是字符串，表示事件的名字，这是必须的。第二个参数是事件的配置对象，这个参数是可选的。`CustomEvent`的配置对象除了接受 Event 事件的配置属性，只有一个自己的属性。

- `detail`：表示事件的附带数据，默认为`null`。

下面是一个例子。

```javascript
var event = new CustomEvent('build', { 'detail': 'hello' });

function eventHandler(e) {
  console.log(e.detail);
}

document.body.addEventListener('build', function (e) {
  console.log(e.detail);
});

document.body.dispatchEvent(event);
```

上面代码中，我们手动定义了`build`事件。该事件触发后，会被监听到，从而输出该事件实例的`detail`属性（即字符串`hello`）。

下面是另一个例子。

```javascript
var myEvent = new CustomEvent('myevent', {
  detail: {
    foo: 'bar'
  },
  bubbles: true,
  cancelable: false
});

el.addEventListener('myevent', function (event) {
  console.log('Hello ' + event.detail.foo);
});

el.dispatchEvent(myEvent);
```

上面代码也说明，CustomEvent 的事件实例，除了具有 Event 接口的实例属性，还具有`detail`属性。

