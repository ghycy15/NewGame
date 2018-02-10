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
        iconSF: cc.SpriteFrame,
        totalCount: 0
    },



    addItemSlot: function () {
        let itemSlot = cc.instantiate(this.slotPrefab);
        this.scrollView.content.addChild(itemSlot);
        console.log(itemSlot);
        itemSlot.getComponent('ItemTemplate').init({
            id: i,
            name: 'abc',
            price: '200',
            icon: this.iconSF,
        });
        return itemSlot;
    },

    start () {
        console.log(Global.content);
        this.itemSlots = [];
        for (let i = 0; i < this.totalCount; ++i) {
            let itemSlot = this.addItemSlot();
            this.itemSlots.push(itemSlot);
        }
        //console.log(this.itemSlots);
    },

    update (dt) {
    //cc.DelayTime(1);
      //  this.addConversation("CUSTOMER", tmp[i%5], {});
    },
});