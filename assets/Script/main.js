const contactsUI = require('contactsUI');

const PanelType = cc.Enum({
    Home: -1,
    Contacts: -1,
});

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        contactsUI: contactsUI,
        text: 'Long live LCF!',
        homeBtnGroups: {
            default: [],
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        //this.label.string = this.text;
        this.curPanel = PanelType.Home;
    },

    // called every frame
    update: function (dt) {

    },

    start: function () {
        //this.contactsUI.init(this, PanelType.Contacts);
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
        if (this.curPanel !== PanelType.Contacts) {
            this.contactsUI.show();
        }
    },

    /*gotoHome: function () {
        if (this.curPanel === PanelType.Shop) {
            this.shopUI.hide();
            this.curPanel = PanelType.Home;
        }
    },*/
});
