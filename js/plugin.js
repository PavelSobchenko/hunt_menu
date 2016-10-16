'use strict';

var HuntMenu = function (id, settings) {
    this.id = id || '';
    this.ElmsData = {};

    // default settings
    this.settings = settings || {};
    this.settings.height = settings.height || '3px';
    this.settings.color = settings.color || '#333';
    this.settings.size = settings.size || '18px';

    this.init();
};

HuntMenu.prototype = {
    init: function () {
        var cssBlock, cssNav, cssBlockHunters, cssHunters;

        cssBlock = 'box-sizing: border-box;';
        cssNav = 'list-style-type: none; margin: 0; padding-left: 0; font-size:0;';
        cssBlockHunters = 'position:relative; height:' + this.settings.height;
        cssHunters = 'position:absolute; top: 0; height: 100%; transition: left 300ms ease, width 300ms ease; background-color:' +this.settings.color;

        this.block = document.getElementById(this.id);
        this.nav = this.block.firstElementChild;
        this.navElms = this.nav.children;

        // create HTML
        this.block.style.cssText = cssBlock;
        this.nav.style.cssText = cssNav;

        this.hunt_block = document.createElement('div');
        this.hunt_block.className = 'hunt_block';
        this.hunt_block.style.cssText = cssBlockHunters;

        this.hunter = document.createElement('div');
        this.hunter.className = 'hunter';
        this.hunter.style.cssText = cssHunters;

        this.hunt_block.appendChild(this.hunter);
        this.block.appendChild(this.hunt_block);

        //set all data
        this.setElmsData();

        //set events
        this.block.addEventListener('mouseleave', PS.bind(this.hideHunter, this));
    },

    moveHunter: function (event, num) {
        this.hunter.style.width = this.ElmsData[num].width + 'px';
        this.hunter.style.left = this.ElmsData[num].coordX + 'px';
    },

    hideHunter: function () {
        this.hunter.style.width = '0px';
    },

    setElmsData: function () {
        var self = this, coordX = 0, computedStyle;
        PS.each(this.navElms, function (num, elem) {
            elem.setAttribute('data-index', num);
            elem.addEventListener('mouseenter', PS.bind(self.moveHunter, self, num));
            elem.style.cssText = 'display:inline-block; font-size: '+self.settings.size+';';

            var rectValue = PS.dom.getElementRect(elem, true);

            self.ElmsData[num] = {
                width : rectValue.w,
                coordX: coordX
            };

            computedStyle = getComputedStyle(elem);

            coordX = coordX+rectValue.w + parseInt(computedStyle.marginRight);
        });
    }
};