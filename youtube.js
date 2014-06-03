$.fn.youtube = function(params) {
    var isNotIE8 = window.navigator.appVersion.toLowerCase().indexOf('msie 8.0') !== -1,
        videoWidth = params.width || $(this).width(),
        videoHeight = params.height || $(this).height() || 300,
        videoID = params.idVideo || params,
        srcSwf = params.srcSwf || 'http://yandex.st/swfobject/2.2/swfobject.min.js',
        srcFlashPlayer = params.srcSwf || 'http://www.adobe.com/go/getflashplayer',
        srcImageFlashPlayer = params.srcSwf || 'http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif',
        errorMessage = params.errorMessage || 'Для просмотра содержимого вам необходимо установить Adobe Flash Player.',
        classNameIframe = params.classNameIframe || 'hhpp-iframevideo',
        classNameMessage = params.classNameMessage || 'hhpp-youtubeerror-a',
        classNameMessageTx = params.classNameMessageTx || 'hhpp-youtubeerror-a__tx',
        tagNameMessage = params.tagNameMessage || 'span',
        tagNameMessageTx = params.tagNameMessageTx || 'span',
        tmpNotIE = '<iframe class="'+ classNameIframe +'" width=' + videoWidth + ' height=' + videoHeight + ' src="http://www.youtube.com/embed/' + videoID + '?rel=0&amp;autohide=1&amp;showinfo=0&amp;wmode=transparent" frameborder="0" allowfullscreen="allowfullscreen"></iframe>',
        tmpIE = '<'+ tagNameMessage +' class="'+ classNameMessage +'"><a href="http://www.adobe.com/go/getflashplayer" target="_blank"><img alt="Get Adobe Flash player" src="'+ srcImageFlashPlayer +'"></a><'+ tagNameMessageTx +' class="'+ classNameMessageTx +'">'+errorMessage+'</'+ tagNameMessageTx +'></'+ tagNameMessage +'>',
        swfParams = ['http://www.youtube.com/v/' + videoID + '?rel=0&amp;autohide=1&amp;showinfo=0&amp;wmode=transparent', this[0].id, '' + videoWidth, '' + videoHeight, '9.0.0', null, null, { 'allowfullscreen': 'true' }, null];

    var self = this;

    if (isNotIE8) {
        $(self).append(tmpNotIE);
    } else {
        var script = document.createElement('script');
        script.src = srcSwf;
        document.head.appendChild(script);
        script.onload = function() {
            $(self).append(tmpIE);
            swfobject.embedSWF.apply(null, swfParams);
        }
    }

    return self;
}
