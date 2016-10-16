(function () {
    "use strict";

    var PS = (function () {
        var PS = function () {};

        /**
         * Dom module
         * @constructor
         */
        var DOM = function () {};
        
        DOM.prototype = {
            getElementRect: function (el, includeOffset) {
                var dist = {};
                if(includeOffset) {
                    dist.w = Math.round(el.offsetWidth);
                    dist.h = Math.round(el.offsetHeight);
                } else {
                    dist.w = Math.round(el.clientWidth);
                    dist.h = Math.round(el.clientHeight);
                }
                return dist;
            }
        };
        
        PS.prototype = {
            each: function (o, c) {
                var s, i;
                for(i=0;i<o.length;i++) {
                    // TODO: сделать проверку на кол-во аргументов у cd
                    s = o[i];
                    if(c.call(s, i, s) === false) break;
                }
            },

            bind: function (f, c, a) {
                return function () {
                    return f.call(c, arguments, a);
                }
            },
            
            dom: new DOM()
        };
        
        return new PS();
    })();

    window.PS = PS
})(window);