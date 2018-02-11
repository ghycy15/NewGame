// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

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
        chatWindow: {
            default: null,
            type: cc.Node
        }, 

        chatChoices: {
            default: null,
            type: cc.Node
        },


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log(this.chatWindow);
        var self = this;
        this.node.on('onChoiceSelected', function (event) {
            self.onChoiceSelected(event.getUserData());
        });

        this.schedule(function() {
            // Here `this` is referring to the component
            self.chatWindow.getComponent('chatWindow').addConversation("USER", "不好", {});
        }, 2);
        this.schedule(function() {
            // Here `this` is referring to the component
            self.chatWindow.getComponent('chatWindow').addConversation("CUSTOMER", "你好", {});
        }, 3);

        this.chatChoices.getComponent('chatChoices').addChoices(["好的", "不好"]);

    },

    // This is the callback for choice selected event
    onChoiceSelected : function (data) {
        this.chatWindow.getComponent('chatWindow').addConversation("USER", data.content, {});
    },

    init : function (data) {

    },

    postInit : function () {

    },

    start () {

    },

    // update (dt) {},
});
