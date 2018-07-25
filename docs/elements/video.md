# <video>，<audio>

## 概述

`<video>`元素用来加载视频，是`HTMLVideoElement`对象的实例。`<audio>`元素用来加载音频，是`HTMLAudioElement`对象的实例。而`HTMLVideoElement`和`HTMLAudioElement`都继承了`HTMLMediaElement`，所以这两个 HTML 元素有许多共同的属性和方法，可以放在一起介绍。

理论上，这两个 HTML 元素直接用`src`属性指定媒体文件，就可以使用了。

```html
<audio src="background_music.mp3"/>
<video src="news.mov" width=320 height=240/>
```

注意，`<video>`元素有`width`属性和`height`属性，可以指定宽和高。`<audio>`元素没有这两个属性，因为它的播放器外形是浏览器给定的，不能指定。

实际上，不同的浏览器支持不同的媒体格式，我们不得不用`<source>`元素指定同一个媒体文件的不同格式。

```html
<audio id="music">
  <source src="music.mp3" type="audio/mpeg">  
  <source src="music.ogg" type='audio/ogg; codec="vorbis"'>
</audio>
```

浏览器遇到支持的格式，就会忽略后面的格式。

这两个元素都有一个`controls`属性，只有打开这个属性，才会显示控制条。注意，`<audio>`元素如果不打开`controls`属性，根本不会显示，而是直接在背景播放。

## HTMLMediaElement 接口

`HTMLMediaElement`并没有对应的 HTML 元素，而是作为`<video>`和`<audio>`的基类，定义一些它们共同的属性和方法。

`HTMLMediaElement`接口有以下属性。

- HTMLMediaElement.audioTracks：返回一个类似数组的对象，表示媒体文件包含的音轨。
- HTMLMediaElement.autoplay：布尔值，表示媒体文件是否自动播放，对应 HTML 属性`autoplay`。
- HTMLMediaElement.buffered：返回一个 TimeRanges 对象，表示浏览器缓冲的内容。该对象的`length`属性返回缓存里面有多少段内容，`start(rangeId)`方法返回指定的某段内容（从0开始）开始的时间点，`end()`返回指定的某段内容结束的时间点。该属性只读。
- HTMLMediaElement.controls：布尔值，表示是否显示媒体文件的控制栏，对应 HTML 属性`autoplay`。
- HTMLMediaElement.controlsList：返回一个类似数组的对象，表示是否显示控制栏的某些控件。该对象包含三个可能的值：`nodownload`、`nofullscreen`和`noremoteplayback`。该属性只读。
- HTMLMediaElement.crossOrigin：字符串，表示跨域请求时是否附带用户信息（比如 Cookie），对应 HTML 属性`crossorigin`。该属性只有两个可能的值：`anonymous`和`use-credentials`。
- HTMLMediaElement.currentSrc：字符串，表示当前正在播放的媒体文件的绝对路径。该属性只读。
- HTMLMediaElement.currentTime：浮点数，表示当前播放的时间点。
- HTMLMediaElement.defaultMuted：布尔值，表示默认是否关闭音量，对应 HTML 属性`muted`。
- HTMLMediaElement.defaultPlaybackRate：浮点数，表示默认的播放速率，默认是1.0。
- HTMLMediaElement.disableRemotePlayback：布尔值，是否允许远程回放，即远程回放的时候是否会有工具栏。
- HTMLMediaElement.duration：浮点数，表示媒体文件的时间长度（单位秒）。如果当前没有媒体文件，该属性返回0。该属性只读。
- HTMLMediaElement.ended：布尔值，表示当前媒体文件是否已经播放结束。该属性只读。
- HTMLMediaElement.error：返回最近一次报错的错误对象，如果没有报错，返回`null`。
- HTMLMediaElement.loop：布尔值，表示媒体文件是否会循环播放，对应 HTML 属性`loop`。
- HTMLMediaElement.muted：布尔值，表示音量是否关闭。
- HTMLMediaElement.networkState：当前网络状态，共有四个可能的值。0表示没有数据；1表示媒体元素处在激活状态，但是还没开始下载；2表示下载中；3表示没有找到媒体文件。
