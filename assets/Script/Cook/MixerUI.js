const Global = require('Global');
const Game = require('Game');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        slotPrefab: {
            default: null,
            type: cc.Prefab
        },
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function (dishes) {
        this.refreshItems(dishes);
    },

    addItem: function () {
        let item = cc.instantiate(this.slotPrefab);
        this.scrollView.content.addChild(item);
        return item;
    },

    refreshItems (items) {
        if (!items ) {
            return;   
        }
        console.log(items);
        this.itemSlots = [];
        const itemIDs = Object.keys(items);

        var self = this;
        itemIDs.forEach(function(itemID) {
            self.addItemSlot(itemID, items[itemID]);
        });
    },

    addItemSlot: function (index, quantity) {
        let itemSlot = cc.instantiate(this.slotPrefab);
        this.scrollView.content.addChild(itemSlot);
        itemSlot.getComponent('CookItem').init({
            id: index,
        });
        return itemSlot;
    },

    show: function () {
        this.node.active = true;
        this.node.emit('fade-in');
        //this.home.toggleHomeBtns(false);
    },

    hide: function () {
        this.node.active = false;
        this.node.emit('fade-out');
        //this.home.toggleHomeBtns(true);
    },


    // update (dt) {},
});
