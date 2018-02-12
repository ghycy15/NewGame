// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
const Global = require('Global');

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

    init: function (items) {
        this.refreshItems(items);
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
        itemSlot.getComponent('bagItem').init({
            id: index,
            quantity: quantity,
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
