#Youtube jquery plugin

Плагин подключает youtube видео через iframe для основных браузеров. В IE8 подключается через флеш плеер. При отключенном флеш плеере в IE8 появляется сообщение об ошибке на русском языке.

##Пример использования

``` javascript
$('#video').youtube('DLq4pT_N1Wo');
```

``` javascript
$('#video').youtube({
  videoWidth: 500,
  videoHeight: 300,
  videoID: 'DLq4pT_N1Wo',
  srcSwf: 'http://yandex.st/swfobject/2.2/swfobject.min.js',
  srcFlashPlayer: 'http://www.adobe.com/go/getflashplayer',
  srcImageFlashPlayer: 'http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif',
  errorMessage: 'Для просмотра содержимого вам необходимо установить Adobe Flash Player.',
  classNameIframe: 'hhpp-iframevideo',
  classNameMessage: 'hhpp-youtubeerror-a',
  classNameMessageTx: 'hhpp-youtubeerror-a__tx',
  tagNameMessage: 'span',
  tagNameMessageTx: 'span'
});
```
