# 事件种类

浏览器支持大量的事件，本章介绍其中一些主要的事件。

## 键盘事件

键盘事件由用户击打键盘触发，主要有`keydown`、`keypress`、`keyup`三个事件，它们都继承了`KeyboardEvent`接口。

- `keydown`：按下键盘时触发。
- `keypress`：按下有值的键时触发，即按下 Ctrl、Alt、Shift、Meta 这样无值的键，这个事件不会触发。对于有值的键，按下时先触发`keydown`事件，再触发这个事件。
- `keyup`：松开键盘时触发该事件。

如果用户一直按键不松开，就会连续触发键盘事件，触发的顺序如下。

1. keydown
1. keypress
1. keydown
1. keypress
1. ...（重复以上过程）
1. keyup

## 焦点事件

- focus
- blur
- focusin
- focusout

## 表单事件

- input
- select

