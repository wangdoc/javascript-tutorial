# ArrayBuffer 对象

ArrayBuffer 对象表示一段二进制数据，用来模拟内存里面的数据。通过这个对象，JavaScript 可以读写二进制数据。

这个对象是 ES6 才写入标准的，普通的网页编程用不到它，为了教程体系的完整，下面只提供一个简略的介绍，详细介绍请看《ES6 标准入门》里面的章节。

浏览器原生提供`ArrayBuffer`构造函数，用来生成实例。它接受一个整数作为参数，表示这段二进制数据占用多少个字节。

```javascript
var buffer = new ArrayBuffer(8);
```

上面代码中，实例对象`buffer`占用8个字节。

ArrayBuffer 对象有实例属性`length`和`byteLength`，都表示当前实例占用的内存长度（单位字节）。

```javascript
var buffer = new ArrayBuffer(8);
buffer.length // 8
buffer.length // 8
```

ArrayBuffer 对象有实例方法`slice()`，用来复制一部分内存。它接受两个整数参数，分别表示复制的开始位置（从0开始）和结束位置（复制时不包括结束位置），如果省略第二个参数，则表示一直复制到结束。

```javascript
var buf1 = new ArrayBuffer(8);
var buf2 = buf1.slice(0);
```

上面代码表示复制原来的实例。
