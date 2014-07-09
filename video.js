;(function($, window, undefined) {

    var init = function() {
        var hasSupportHTML5Video = !!$('<video>').get(0).canPlayType,
            hasFlash = false;

        try {
          var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
          if (fo) {
            hasFlash = true;
          }
        } catch(e) {
          if(navigator.mimeTypes["application/x-shockwave-flash"] != undefined) {
            hasFlash = true;
          }
        }

        var canInitVideo = hasSupportHTML5Video || hasFlash;

        $.fn.youtube = (function() {
            if (canInitVideo) {                
                window.onYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady || function(params) {
                    $(window).trigger('loadYoutubeAPI');

                    if (!params) return;

                    var self = this;

                    var player = new YT.Player(params.id, {
                        height: params.videoHeight,
                        width: params.videoWidth,
                        videoId: params.videoID,
                        playerVars: {
                            autohide: 1,
                            showinfo: 0,
                            transparent: 'transparent'
                        }
                    });

                    var playVideo = function() {
                        player.playVideo();
                    };

                    var stopVideo = function() {
                        player.stopVideo();
                    };

                    var pauseVideo = function() {
                        player.pauseVideo();
                    };

                    var seekTo = function(_seconds, _allowSeekAhead) {
                        var seconds = parseInt(_seconds) || 0,
                            allowSeekAhead = _allowSeekAhead || false;

                        player.seekTo(seconds, allowSeekAhead);
                    };

                    var destroy = function() {
                        player.destroy()
                        $(self).children('*').remove()
                    };

                    $(self).data('video', $.extend($(self).data('video'), {
                        playVideo: playVideo,
                        stopVideo: stopVideo,
                        pauseVideo: pauseVideo,
                        seekTo: seekTo,
                        destroy: destroy
                    }))
                }
            };

            return function(params) {
                if (!('YT' in window)) {
                    return (function(_this, _params) {
                        getYoutubeAPIScript(function() {
                            $.fn.youtube.call(_this, _params)
                        });
                    }(this, params));
                }               

                if (canInitVideo) {

                    var videoWidth = parseInt(params.width) || $(this).width(),
                        videoHeight = parseInt(params.height) || $(this).height() || 300,
                        videoID = params.id || params,
                        id = this[0].id || 'youtube' + new Date().getTime(),
                        sendParams = {
                            id: id,
                            videoHeight: videoHeight,
                            videoWidth: videoWidth,
                            videoID: videoID
                        };

                    $(this).removeAttr('id').append($('<div>', {id: id}));
                    onYouTubeIframeAPIReady.call(this, sendParams);

                } else {
                    insertErrorMessage(this)
                }
            };
        }());

        $.fn.vimeo = function(params) {
            if (!('$f' in window)) {
                return (function(_this, _params) {
                    getVimeoAPIScript(function() {
                        $.fn.vimeo.call(_this, _params)
                    });
                }(this, params));
            }

            if (canInitVideo) {
                var videoWidth = parseInt(params.width) || $(this).width(),
                    videoHeight = parseInt(params.height) || $(this).height() || 300
                    videoID = params.id || params,
                    id = this[0].id || 'vimeo' + new Date().getTime();

                var self = this;

                var iframe = $("<iframe src=\"//player.vimeo.com/video/"+ videoID +"?api=1\" height="+ videoHeight +" width="+ videoWidth +" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen id="+ id +"></iframe>")
                $(self).removeAttr('id').append(iframe);
                
                var player = $f(iframe.get(0));

                var playVideo = function() {
                    player.api("play");
                };

                var pauseVideo = function() {
                    player.api("pause");
                };

                var destroy = function() {
                    $(self).children('*').remove()
                };

                $(self).data('video', $.extend($(self).data('video'), {
                    playVideo: playVideo,
                    pauseVideo: pauseVideo,
                    destroy: destroy
                }))
            } else {
                insertErrorMessage(this)
            }
        };

        var eachVideoHandler = function(index, element) {
            var typeVideo = element.getAttribute('data-video').split(/\s?\|\s?/)[0],
                paramsVideo = element.getAttribute('data-video').split(/\s?\|\s?/)[1];
                
            if (/:/.test(paramsVideo)) {
               paramsVideo = paramsVideo.split(/:|,/).map(function(element) {
                   return element.replace(/^\s+|\'|\s+$/g, '')
               }).reduce(function(o, element, index, array) {
                 (index % 2 === 0) && (o[element] = array[index + 1]);
                 return o;
               }, {});
            }

            if (!!$(element)[typeVideo]) {
                $(element)[typeVideo](paramsVideo);
            } else {
                throw new Error('Unknown "'+ typeVideo +'" video service.')
            }
        };

        var getYoutubeAPIScript = function(callback) {
            $.getScript('http://www.youtube.com/player_api', function(data, textStatus, jqxhr) {
                if (jqxhr.status !== 200) return;

                if (canInitVideo && !(window.YT || {}).Player) {
                    $(window).on('loadYoutubeAPI', function() {
                        $(this).off('loadYoutubeAPI');
                        callback()
                    })
                } else {
                    callback()
                }
            })
        };

        var getVimeoAPIScript = function(callback) {
            var Froogaloop=function(){function e(a){return new e.fn.init(a)}function h(a,c,b){if(!b.contentWindow.postMessage)return!1;var f=b.getAttribute("src").split("?")[0],a=JSON.stringify({method:a,value:c});"//"===f.substr(0,2)&&(f=window.location.protocol+f);b.contentWindow.postMessage(a,f)}function j(a){var c,b;try{c=JSON.parse(a.data),b=c.event||c.method}catch(f){}"ready"==b&&!i&&(i=!0);if(a.origin!=k)return!1;var a=c.value,e=c.data,g=""===g?null:c.player_id;c=g?d[g][b]:d[b];b=[];if(!c)return!1;void 0!==
            a&&b.push(a);e&&b.push(e);g&&b.push(g);return 0<b.length?c.apply(null,b):c.call()}function l(a,c,b){b?(d[b]||(d[b]={}),d[b][a]=c):d[a]=c}var d={},i=!1,k="";e.fn=e.prototype={element:null,init:function(a){"string"===typeof a&&(a=document.getElementById(a));this.element=a;a=this.element.getAttribute("src");"//"===a.substr(0,2)&&(a=window.location.protocol+a);for(var a=a.split("/"),c="",b=0,f=a.length;b<f;b++){if(3>b)c+=a[b];else break;2>b&&(c+="/")}k=c;return this},api:function(a,c){if(!this.element||
            !a)return!1;var b=this.element,f=""!==b.id?b.id:null,d=!c||!c.constructor||!c.call||!c.apply?c:null,e=c&&c.constructor&&c.call&&c.apply?c:null;e&&l(a,e,f);h(a,d,b);return this},addEvent:function(a,c){if(!this.element)return!1;var b=this.element,d=""!==b.id?b.id:null;l(a,c,d);"ready"!=a?h("addEventListener",a,b):"ready"==a&&i&&c.call(null,d);return this},removeEvent:function(a){if(!this.element)return!1;var c=this.element,b;a:{if((b=""!==c.id?c.id:null)&&d[b]){if(!d[b][a]){b=!1;break a}d[b][a]=null}else{if(!d[a]){b=
            !1;break a}d[a]=null}b=!0}"ready"!=a&&b&&h("removeEventListener",a,c)}};e.fn.init.prototype=e.fn;window.addEventListener?window.addEventListener("message",j,!1):window.attachEvent("onmessage",j);return window.Froogaloop=window.$f=e}();         
            callback()
        };

        var insertErrorMessage = function(element) {
            var errorMessage = '<span class="hhpp-youtubeerror-a">'+
                '<a href="http://www.adobe.com/go/getflashplayer" target="_blank">'+
                    '<img alt="Get Adobe Flash player" src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif">'+
                '</a>'+
                '<span class="hhpp-youtubeerror-a__tx">Для просмотра содержимого вам необходимо установить Adobe Flash Player.</span>'+
            '</span>'; 

            $(element).append(errorMessage)
        };

        var $youtubeElements = $('[data-video*=youtube]'),
            $vimeoElements = $('[data-video*=vimeo]');

        if ($youtubeElements.length) {
            if (!(window.YT || {}).Player) {
                getYoutubeAPIScript(function() {
                    $youtubeElements.each(eachVideoHandler);
                });
            } else {
                $youtubeElements.each(eachVideoHandler);
            }
        };

        if ($vimeoElements.length) {
            if (!('$f' in window)) {
                getVimeoAPIScript(function() {
                    $vimeoElements.each(eachVideoHandler);
                })
            } else {
                $vimeoElements.each(eachVideoHandler);
            }
        }; 
    };

    $.getScript('http://cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.min.js', init)

}(jQuery, this));
