# 表单

## 概述

表单（`<form>`）用来收集用户提交的数据，发送到服务器。比如，用户提交用户名和密码，让服务器验证，就要通过表单。表单提供多种控件，让开发者使用，具体的控件种类和用法请参考 HTML 语言的教程。本章主要介绍 JavaScript 与表单的交互。

```html
<form action="/handling-page" method="post">
  <div>
    <label for="name">用户名：</label>
    <input type="text" id="name" name="user_name" />
  <div>
  <div>
    <label for="passwd">密码：</label>
    <input type="password" id="passwd" name="user_passwd" />
  </div>
  <div>
    <input type="submit" id="submit" name="submit_button" value="提交" />
  </div>
</form>
```

上面代码就是一个简单的表单，包含三个控件：用户名输入框、密码输入框和提交按钮。

用户点击“提交”按钮，每一个控件都会生成一个键值对，键名是控件的`name`属性，键值是控件的`value`属性，键名和键值之间由等号连接。比如，用户名输入框的`name`属性是`user_name`，`value`属性是用户输入的值，假定是“张三”，提交到服务器的时候，就会生成一个键值对`user_name=张三`。

所有的键值对都会提交到服务器。但是，提交的数据格式跟`<form>`元素的`method`属性有关。该属性指定了提交数据的 HTTP 方法。如果是 GET 方法，所有键值对会以 URL 的查询字符串形式，提交到服务器，比如`/handling-page?user_name=张三&user_passwd=123&submit_button=提交`。下面就是 GET 请求的 HTTP 头信息。

```http
GET /handling-page?user_name=张三&user_passwd=123&submit_button=提交
Host: example.com
```

如果是 POST 方法，所有键值对会连接成一行，作为 HTTP 请求的数据体发送到服务器，比如`user_name=张三&user_passwd=123&submit_button=提交`。下面就是 POST 请求的头信息。

```http
POST /handling-page HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 74

user_name=张三&user_passwd=123&submit_button=提交
```

注意，实际提交的时候，只要键值不是 URL 的合法字符（比如汉字“张三”和“确定”），浏览器会自动对其进行编码。

## 表单验证

## 文件上传

用户上传文件，也是通过表单。具体来说，就是通过文件输入框选择本地文件，提交表单的时候，浏览器就会把这个文件发送到服务器。

```html
<input type="file" id="file" name="myFile">
```

此外，还需要将表单`<form>`元素的`method`属性设为`POST`，`enctype`属性设为`multipart/form-data`。其中，`enctype`属性决定了 HTTP 头信息的`Content-Type`字段的值，默认情况下这个字段的值是`application/x-www-form-urlencoded`，但是文件上传的时候要改成`multipart/form-data`。

```html
<form method="post" enctype="multipart/form-data">
  <div>
    <label for="file">选择一个文件</label>
    <input type="file" id="file" name="myFile">
  </div>
  <div>
    <input type="submit" id="submit" name="submit_button" value="上传" />
  </div>
</form>
```

