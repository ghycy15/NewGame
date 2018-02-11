const Global = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {
        icon: cc.Sprite,
        itemName: cc.Label,
        itemPrice: cc.Label,
        itemIcons: {
            default: [],
            type: cc.SpriteFrame
        },
        itemPrices: [cc.Integer],
        itemNames: [cc.String],
    },

    // data: {id,iconSF,itemName,itemPrice}
    init: function (data) {
        let id = data.id;
        if (id > this.itemIcons.length) {
            // 如果溢出使用默认图标
            id = 0;
        }

        this.icon.spriteFrame = this.itemIcons[id];
        this.itemName.string = this.itemNames[id];
        this.itemPriceValue = this.itemPrices[id];
        this.itemPrice.string = this.itemPrices[id];
    },

    onClick: function () {
        Global.gold = Global.gold - this.itemPriceValue;
        console.log(Global.gold);
    },
});
