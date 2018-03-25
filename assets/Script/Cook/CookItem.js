const Global = require('Global');
const Game = require('Game');

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
        cookTime: cc.Label,
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
        const id = data.id;

        this.dish = Global.game.getDishByID(id);

        this.icon.spriteFrame = this.itemIcons[0];

        this.itemName.string = this.dish.getName();
        this.cookTime.string = "制作时间： " + this.dish.getCookTime();
        //this.itemIngredient.string = ;
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