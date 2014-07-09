#Youtube/Vimeo insert video

Plug-in for easy connection of YouTube and Vimeo clips on this page. when the power and the absence of flash player support HTML5 Video in container showered message to people at least have downloaded flash player as YouTube and Vimeo have their own folbek for older browsers
##Usage

###Initial

``` html
<div data-video="vimeo | 99953557"></div>
<div data-video="youtube | vbXR38GZ1QE"></div>

<div data-video="vimeo | id: 99953557, width: 500, height: 300"></div>
<div data-video="youtube | id: vbXR38GZ1QE, width: 500, height: 300"></div>
```

or

``` javascript
$('div').youtube('DLq4pT_N1Wo');
$('div').youtube({
  id: 'DLq4pT_N1Wo',
  width: 500,
  height: 300
});

$('div').vimeo('99953557');
$('div').vimeo({
  id: '99953557',
  width: 500,
  height: 300
});
```

###Controllers
``` javascript
$('.trailer').data('video').playVideo()
```

YouTube container has the following methods

   * `playVideo` - launches video
   * `stopVideo` - stops playback and download video
   * `pauseVideo` - stops playback
   * `seekTo` - rewind the video at a certain moment; takes two arguments, seconds and boolean - whether you want to run the video after rewinding
   * `destroy` - remove all contains

Vimeo container has the following methods

   * `playVideo` - launches video
   * `pauseVideo` - stops playback
   * `destroy` - remove all contains