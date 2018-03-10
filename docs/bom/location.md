# Location 对象，URL 对象

URL 是互联网的基础设施之一。浏览器提供了一些原生对象，用来管理 URL。

## Location 对象

`Location`对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。通过`window.location`和`document.location`属性，可以拿到这个对象。

### 属性

`Location`对象提供以下属性。

- Location.href：整个 URL。
- Location.protocol：当前 URL 的协议，包括冒号（`:`）。
- Location.host：主机，包括冒号（`:`）和端口（默认的80端口和443端口会省略）。
- Location.hostname：主机名，不包括端口。
- Location.port：端口号。
- Location.pathname：URL 的路径部分，从根路径`/`开始。
- Location.search：查询字符串部分，从问号`?`开始。
- Location.hash：片段字符串部分，从`#`开始。
- Location.username：域名前面的用户名。
- Location.password：域名前面的密码。
- Location.origin：URL 的协议、主机名和端口。

```javascript
// 当前网址为
// http://user:passwd@www.example.com:4097/path/a.html?x=111#part1
document.location.href
// "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
document.location.protocol
// "http:"
document.location.host
// "www.example.com:4097"
document.location.hostname
// "www.example.com"
document.location.port
// "4097"
document.location.pathname
// "/path/a.html"
document.location.search
// "?x=111"
document.location.hash
// "#part1"
document.location.username
// "user"
document.location.password
// "passwd"
document.location.origin
// "http://user:passwd@www.example.com:4097"
```

这些属性里面，只有`origin`属性是只读的，其他属性都可写。

注意，如果对`Location.href`写入新的 URL 地址，浏览器会立刻跳转到这个新地址。

```javascript
// 跳转到新网址
document.location.href = 'http://www.example.com';
```

这个特性常常用于让网页自动滚动到新的锚点。

```javascript
document.location.href = '#top';
// 等同于
document.location.hash = '#top';
```

直接改写`location`，相当于写入`href`属性。

```javascript
document.location = 'http://www.example.com';
// 等同于
document.location.href = 'http://www.example.com';
```

另外，`Location.href`属性是浏览器唯一允许跨域写入的属性，即非同源的窗口可以改写另一个窗口的`Location.href`属性，导致后者的网址跳转。`Location`的其他属性都不允许跨域写入。

### 方法

**（1）Location.assign()**

`assign`方法接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错。

```javascript
// 跳转到新的网址
document.location.assign('http://www.example.com')
```

**（2）Location.replace()**

`replace`方法接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错。

它与`assign`方法的差异在于，`replace`会在浏览器的浏览历史`History`里面删除当前网址，也就是说，一旦使用了该方法，后退按钮就无法回到当前网页了，相当于在浏览历史里面，使用新的 URL 替换了老的 URL。它的一个应用是，当脚本发现当前是移动设备时，就立刻跳转到移动版网页。

```javascript
// 跳转到新的网址
document.location.replace('http://www.example.com')
```

**（3）Location.reload()**

`reload`方法使得浏览器重新加载当前网址，相当于按下浏览器的刷新按钮。

它接受一个布尔值作为参数。如果参数为`true`，浏览器将向服务器重新请求这个网页，并且重新加载后，网页将滚动到头部（即`scrollTop === 0`）。如果参数是`false`或为空，浏览器将从本地缓存重新加载该网页，并且重新加载后，网页的视口位置是重新加载前的位置。

```javascript
// 向服务器重新请求当前网址
window.location.reload(true);
```

**（4）Location.toString()**

`toString`方法返回整个 URL 字符串，相当于读取`Location.href`属性。

## URL 对象

`URL`对象是浏览器的原生对象，可以用来构造、解析和编码 URL。一般情况下，通过`window.URL`可以拿到这个对象。

### 构造函数

`URL`对象本身是一个构造函数，可以生成 URL 实例。

它接受一个表示 URL 的字符串作为参数。如果参数不是合法的 URL，会报错。

```javascript
var url = new URL('http://www.example.com/index.html');
url.href
// "http://www.example.com/index.html"
```

如果参数是另一个 URL 实例，构造函数会自动读取该实例的`href`属性，作为实际参数。

如果 URL 字符串是一个相对路径，那么需要表示绝对路径的第二个参数，作为计算基准。

```javascript
var url1 = new URL('index.html', 'http://example.com');
url1.href
// "http://example.com/index.html"

var url2 = new URL('page2.html', 'http://example.com/page1.html');
url2.href
// "http://example.com/page2.html"

var url3 = new URL('..', 'http://example.com/a/b.html')
url3.href
// "http://example.com/"
```

上面代码中，返回的 URL 实例的路径都是在第二个参数的基础上，切换到第一个参数得到的。最后一个例子里面，第一个参数是`..`，表示上层路径。

### 实例属性

URL 实例的属性与`Location`对象的属性基本一致，返回当前 URL 的信息。

- URL.href：返回整个 URL
- URL.protocol：返回协议，以冒号`:`结尾
- URL.hostname：返回域名
- URL.host：返回域名与端口，包含`:`号，默认的80和443端口会省略
- URL.port：返回端口
- URL.origin：返回协议、域名和端口
- URL.pathname：返回路径，以斜杠`/`开头
- URL.search：返回查询字符串，以问号`?`开头
- URL.searchParams：返回一个`URLSearchParams`实例，该属性是`Location`对象没有的
- URL.hash：返回片段识别符，以井号`#`开头
- URL.password：返回域名前面的密码
- URL.username：返回域名前面的用户名

```javascript
var url = new URL('http://user:passwd@www.example.com:4097/path/a.html?x=111#part1');

url.href
// "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
url.protocol
// "http:"
url.hostname
// "www.example.com"
url.host
// "www.example.com:4097"
url.port
// "4097"
url.origin
// "http://www.example.com:4097"
url.pathname
// "/path/a.html"
url.search
// "?x=111"
url.searchParams
// URLSearchParams {}
url.hash
// "#part1"
url.password
// "passwd"
url.username
// "user"
```

这些属性里面，只有`origin`属性是只读的，其他属性都可写。

```javascript
var url = new URL('http://example.com/index.html#part1');

url.pathname = 'index2.html';
url.href // "http://example.com/index2.html#part1"

url.hash = '#part2';
url.href // "http://example.com/index2.html#part2"
```

上面代码中，改变 URL 实例的`pathname`属性和`hash`属性，都会实时反映在 URL 实例当中。

### 静态方法

**（1）URL.createObjectURL()**

`URL.createObjectURL`方法用来为上传/下载的文件、流媒体文件生成一个 URL 字符串。这个字符串代表了`File`对象或`Blob`对象的 URL。

```javascript
// HTML 代码如下
// <div id="display"/>
// <input
//   type="file"
//   id="fileElem"
//   multiple
//   accept="image/*"
//   onchange="handleFiles(this.files)"
//  >
var div = document.getElementById('display');

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var img = document.createElement('img');
    img.src = window.URL.createObjectURL(files[i]);
    div.appendChild(img);
  }
}
```

上面代码中，`URL.createObjectURL`方法用来为上传的文件生成一个 URL 字符串，作为`<img>`元素的图片来源。

注意，每次使用`URL.createObjectURL`方法，都会在内存里面生成一个 URL 实例。如果不再需要该方法生成的 URL 字符串，为了节省内存，可以使用`URL.revokeObjectURL()`方法释放这个实例。

**（2）URL.revokeObjectURL()**

`URL.revokeObjectURL`方法用来释放`URL.createObjectURL`方法生成的 URL 实例。它的参数就是`URL.createObjectURL`方法返回的 URL 字符串。

下面为上一段的示例加上`URL.revokeObjectURL()`。

```javascript
var div = document.getElementById('display');

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var img = document.createElement('img');
    img.src = window.URL.createObjectURL(files[i]);
    div.appendChild(img);
    img.onload = function() {
      window.URL.revokeObjectURL(this.src);
    }
  }
}
```

上面代码中，一旦图片加载成功以后，为本地文件生成的 URL 字符串就没用了，于是可以在`img.onload`回调函数里面，通过`URL.revokeObjectURL`方法卸载这个 URL 实例。

## URLSearchParams 对象

```javascript
// 当前 URL 为 https://example.com/?id=123
var parsedUrl = new URL(window.location.href);
parsedUrl.searchParams.get('id') // 123
```
