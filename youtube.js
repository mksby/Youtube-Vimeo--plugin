// Youtube jquery plugin 
;(function() {
    var countVideo = 0;

    $.fn.youtube = function(params) {
        var IE8 = /msie 8.0/i.test(navigator.appVersion),
            videoWidth = parseInt(params.width) || $(this).width(),
            videoHeight = parseInt(params.height) || $(this).height() || 300,
            videoID = params.id || params,
            swfSrc = params.swfSrc || 'http://yandex.st/swfobject/2.2/swfobject.min.js',
            flashPlayerSrc = params.swfSrc || 'http://www.adobe.com/go/getflashplayer',
            imageFlashPlayerSrc = params.swfSrc || 'http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif',
            errorMessage = params.errorMessage || 'Для просмотра содержимого вам необходимо установить Adobe Flash Player.',
            iframeClassName = params.iframeClassName || 'hhpp-iframevideo',
            messageClassName = params.messageClassName || 'hhpp-youtubeerror-a',
            messageTxClassName = params.messageTxClassName || 'hhpp-youtubeerror-a__tx',
            messageTagName = params.messageTagName || 'span',
            messageTxTagName = params.messageTxTagName || 'span',
            tmpNotIE = '<iframe class="'+ iframeClassName +'" width=' + videoWidth + ' height=' + videoHeight + ' src="http://www.youtube.com/embed/' + videoID + '?rel=0&amp;autohide=1&amp;showinfo=0&amp;wmode=transparent" frameborder="0" allowfullscreen="allowfullscreen"></iframe>',
            tmpIE = '<'+ messageTagName +' class="'+ messageClassName +'"><a href="'+ flashPlayerSrc +'" target="_blank"><img alt="Get Adobe Flash player" src="'+ imageFlashPlayerSrc +'"></a><'+ messageTxTagName +' class="'+ messageTxClassName +'">'+errorMessage+'</'+ messageTxTagName +'></'+ messageTagName +'>';

        var self = this;

        if (!IE8) {
           $(self).append(tmpNotIE);
        } else {
            if (!this.id) this[0].id = new Date().getTime() + countVideo++;
            var swfParams = ['http://www.youtube.com/v/' + videoID + '?rel=0&amp;autohide=1&amp;showinfo=0&amp;wmode=transparent', this[0].id, '' + videoWidth, '' + videoHeight, '9.0.0', null, null, { 'allowfullscreen': 'true' }, null],
                script = document.createElement('script');
                
            script.src = swfSrc;
            document.head.appendChild(script);
            script.onload = function() {
                $(self).append(tmpIE);
                swfobject.embedSWF.apply(null, swfParams);
            }
        }

        return self;
    };

    var dataHandler = {
        vocabulary: ['youtube', 'data-youtube'],
        start: function(string) {
            $('['+ string +']').length && $('['+ string +']').each(function(index, element) {
               var attr = element.getAttribute(string);
               if (/:/.test(attr)) {
                   attr = element.getAttribute(string).split(/:|,/).map(function(element) {
                       return element.replace(/^\s+|\'|\s+$/g, '')
                   }).reduce(function(o, element, index, array) {
                     (index % 2 === 0) && (o[element] = array[index + 1]);
                     return o;
                   }, {});
               }
               $(element).youtube(attr);
            });
        }
    };

    for(var i = 0, len = dataHandler.vocabulary.length; i < len; i += 1) {
        dataHandler.start(dataHandler.vocabulary[i])
    }

}());
