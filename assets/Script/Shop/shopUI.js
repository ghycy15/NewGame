const Global = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {
        slotPrefab: {
            default: null,
            type: cc.Prefab
        },
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        totalCount: 0
    },

    addItemSlot: function (index) {
        let itemSlot = cc.instantiate(this.slotPrefab);
        this.scrollView.content.addChild(itemSlot);
        console.log(itemSlot);
        itemSlot.getComponent('shopItem').init({
            id: index,
        });
        return itemSlot;
    },

    start () {

    },

    onLoad () {
        this.refreshItems();
        //console.log(this.itemSlots);
    },

    refreshItems () {
        console.log(Global.gold);
        this.itemSlots = [];
        for (let i = 0; i < 5; ++i) {
            let itemSlot = this.addItemSlot(i);
            this.itemSlots.push(itemSlot);
        }
    },


    gotoHome: function () {
        cc.director.loadScene("mainScreen");
    },

    update (dt) {
    //cc.DelayTime(1);
      //  this.addConversation("CUSTOMER", tmp[i%5], {});
    },
});