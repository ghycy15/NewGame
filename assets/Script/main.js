const fridgeUI = require('FridgeUI');
const mixerUI = require('MixerUI');
const Global = require('Global');
const Game = require('Game');

const PanelType = cc.Enum({
    Home: -1,
    Contacts: -1,
});

cc.Class({
    extends: cc.Component,

    properties: {
        goldLabel: {
            default: null,
            type: cc.Label
        },
        fridgeUI: fridgeUI,
        mixerUI: mixerUI,
        text: 'Long live LCF!',
        /*homeBtnGroups: {
            default: [],
            type: cc.Node
        },*/
    },

    // use this for initialization
    onLoad: function () {
        //this.label.string = this.text;
        this.curPanel = PanelType.Home;
        //this.DataBus.init('init');
        Global.content = 'init';
        if (!Global.gold) { 
            Global.gold = 100;
        }

        if (!Global.items) {
            // Load all user items here
            Global.items = {};
        }

        if (!Global.game) {
            Global.game = new Game();
            Global.game.init();
        }
    },

    // called every frame
    update: function (dt) {
        this.goldLabel.getComponent(cc.Label).string = Global.gold;
    },

    start: function () {
        this.fridgeUI.init(Global.items);
        this.mixerUI.init(Global.game.getDishesMap());
    },

    toggleHomeBtns: function (enable) {
        /*for (let i = 0; i < this.homeBtnGroups.length; ++i) {
            let group = this.homeBtnGroups[i];
            if (!enable) {
                cc.eventManager.pauseTarget(group, true);
            } else {
                cc.eventManager.resumeTarget(group, true);
            }
        }*/
    },

    gotoContacts: function () {
        cc.director.loadScene("contacts");
    },

    gotoShop: function () {
        cc.director.loadScene("shop");
    }

    /*gotoHome: function () {
        if (this.curPanel === PanelType.Shop) {
            this.shopUI.hide();
            this.curPanel = PanelType.Home;
        }
    },*/
});
