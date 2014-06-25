#Youtube jquery plugin

Plug connects youtube video via HTML5 Video for major browsers. In IE8 connected via flash player. If you disable flash player in IE8, an error message appears in Russian.

##Usage

``` html
<div data-youtube="DLq4pT_N1Wo"></div>
<div data-youtube="id: DLq4pT_N1Wo, width: 500, height: 300"></div>
```

Can use "data-youtube" or "youtube" attribute.

``` html
<div youtube="DLq4pT_N1Wo"></div>
```

or

``` javascript
$('div').youtube('DLq4pT_N1Wo');
$('div').youtube({
  id: 'DLq4pT_N1Wo',
  width: 500,
  height: 300,
  swfSrc: 'http://yandex.st/swfobject/2.2/swfobject.min.js',
  flashPlayerSrc: 'http://www.adobe.com/go/getflashplayer',
  imageFlashPlayerSrc: 'http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif',
  errorMessage: 'Для просмотра содержимого вам необходимо установить Adobe Flash Player.',
  iframeClassName: 'hhpp-iframevideo',
  messageClassName: 'hhpp-youtubeerror-a',
  messageTxClassName: 'hhpp-youtubeerror-a__tx',
  messageTagName: 'span',
  messageTxTagName: 'span'
});
```
