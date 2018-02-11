const Global = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        icon: cc.Sprite,
        itemName: cc.Label,
        itemPrice: cc.Label,
    },

    // data: {id,iconSF,itemName,itemPrice}
    init: function (data) {
        this.id = data.id;
        this.icon.spriteFrame = data.icon;
        this.itemName.string = data.name;
        this.itemPrice.string = data.price;
        this.itemPriceNum = data.price;
    },

    onClick: function () {
        Global.gold = Global.gold - this.itemPriceNum;
        console.log(Global.gold);
    },
});
