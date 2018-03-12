const Global = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {
        icon: cc.Sprite,
        itemName: cc.Label,
        itemIngredient: cc.Label,
        progressBar: {
            default: null,
            type: cc.ProgressBar
        },
        timeRemaining: cc.Label,
        itemIcons: {
            default: [],
            type: cc.SpriteFrame
        },
        preMakeSection: cc.Node,
        makingSection:cc.Node,
        makeButton: cc.Button,
    },

    // data: {id,iconSF,itemName,itemPrice}
    init: function (data) {
        let id = data.id;

        this.icon.spriteFrame = this.itemIcons[0];


        this.itemName.string = this.data[itemName];
        this.itemIngredient = this.data[id];
        this.itemPrice.string = this.itemPrices[id];
        this.id = id;

        this.timer = 0;
    },

    update: function () {

    },

    onClick: function () {
        this.preMakeSection.active = false;
        this.preMakeSection.emit('fade-out');
        this.makingSection.active = true;
        this.makingSection.emit('fade-in');
    },
});