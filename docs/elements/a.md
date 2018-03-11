# <a> 元素

`<a>`元素用来设置超级链接。除了网页元素的通用接口（`Node`接口、`Element`接口、`HTMLElement`接口），它还继承了`HTMLAnchorElement`接口和`HTMLHyperlinkElementUtils`接口。

## HTMLAnchorElement 接口

### 属性

**（1）HTMLAnchorElement.accessKey**

`accessKey`属性用来读写`<a>`元素的快捷键。

```javascript
// HTML 代码如下
// <a id="test" href="http://example.com">test</a>
var a = document.getElementById('a');
a.accessKey = 'k';
```

上面代码设置`<a>`元素的快捷键为`k`，以后只要按下这个快捷键，浏览器就会跳转到`example.com`。

注意，不同的浏览器在不同的操作系统下，唤起快捷键的功能键组合是[不一样](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey)的。比如，Chrome 浏览器在 Linux 系统下，需要按下`Alt + k`，才会跳转到`example.com`。


