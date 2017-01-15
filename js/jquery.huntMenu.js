(function ($) {
    "use strict";

    // TODO: create vertical hunter
    // TODO: add hide effect to right side

    function moveHunter(data, index) {
        data['current'] = index+1; // can be 0
        data.hunter.css({
            'width': data[index].width,
            'left': data[index].coordX
        });
    }

    function hideHunter(data) {
        data.hunter.css('width', 0);
        data['current'] = null;
    }

    function toggleVisible(hunt_block, ww) {
        if(ww > 991) {
            hunt_block.css('display', 'block');
        } else {
            hunt_block.css('display', 'none');
        }
    }

    $.fn._huntMenuSetData = function (settings, data) {
        var coordX = 0, computedStyle, rectValue, $node;
        this.each(function (i, node) {
            $node = $(node);
            $node.attr('data-index', i);
            $node.off('mouseenter');
            $node.on('mouseenter', function () {
                moveHunter(data, i);
            });

            if(settings.setCss) {
                $node.css({
                    'display': 'inline-block',
                    'font-size': settings.size
                });
            }

            rectValue = {
                w: $node.outerWidth(),
                h: $node.outerHeight()
            };

            data[i] = {
                width: rectValue.w,
                coordX: coordX
            };

            computedStyle = $node.css('marginRight');
            coordX = coordX+rectValue.w + parseInt(computedStyle);
        });
    };

    $.fn.huntMenu = function (options) {
        var settings = $.extend({
            height: '3px',
            color: '#333',
            size: '18px',
            setCss: true,
            hideOnPhoneTablet: true
        }, options);

        var $node, $nav, $navElms, $hunt_block, $hunter,
            cssBlockHunters = 'position:relative; height:' + settings.height,
            cssHunters = 'position:absolute; top: 0; height: 100%; transition: left 300ms ease, width 300ms ease; background-color:' +settings.color;
        var ww = window.screen.width;

        if(settings.setCss) {
            var cssBlock = {
                    'box-sizing': 'border-box'
                },
                cssNav = {
                    'list-style-type': 'none',
                    'margin': 0,
                    'padding-left': 0,
                    'font-size': 0
                };
        }

        this.each(function (i, node) {
            var elmsData = {};
            // get nodes
            $node = $(node);
            $nav = $(node.firstElementChild);
            $navElms = $nav.children();

            // set css
            if(settings.setCss) {
                $node.css(cssBlock);
                $nav.css(cssNav);
            }

            // create hunter
            $hunt_block = $('<div/>', {
                class: 'hunt_block',
                style: cssBlockHunters
            });
            $hunter = $('<div/>', {
                class: 'hunter',
                style: cssHunters
            });
            elmsData['hunter'] = $hunter;

            $hunt_block.append($hunter);
            $node.append($hunt_block);

            $navElms._huntMenuSetData(settings, elmsData);
            $node.on('mouseleave', function () {
                hideHunter(elmsData);
            });

            toggleVisible($hunt_block, ww);
            $(window).on('resize', function () {
                ww = window.screen.width;
                toggleVisible($hunt_block, ww);
                $navElms._huntMenuSetData(settings, elmsData);
                if(elmsData.current)
                    moveHunter(elmsData, elmsData.current-1);
            });
        });
    };

})(jQuery);
