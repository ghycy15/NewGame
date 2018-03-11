// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var Customer = require('Customer');
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
        chatWindow: {
            default: null,
            type: cc.Node
        }, 

        chatChoices: {
            default: null,
            type: cc.Node
        },

        chatStatusBar: {
            default: null,
            type: cc.Node
        },

        customer: {
            default: null,
            type: Customer
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log(this.chatWindow);
        var self = this;
        this.node.on('onChoiceSelected', function (event) {
            self.onChoiceSelected(event.getUserData());
        });
    },

    init : function (customer) {
        var self = this;
        this.customer = customer;
        var customerName = customer.getName();

        let chatStatusBar = this.chatStatusBar.getComponent('chatStatusBar');
        if (!!chatStatusBar) {
            chatStatusBar.setName(customer);
        }
        customer.getChatHistory().forEach(function(msg) {
            self.addConversation("CUSTOMER", msg.getBody(), {}, false);
        });
        this.addConversation("CUSTOMER", "你好", {}, true, 2, 99, 2);
        this.setChoices(["好的", "不好"]);
    },

    postInit : function () {

    },

    start () {

    },

    update (dt) {

    },

    // This is the callback for choice selected event
    onChoiceSelected : function (data) {
        this.addConversation("USER", data.content, {});
    },

    addConversation : function (type, msg, userData, shouldRecordMsg=true, interval=0, repeat=0, delay=0) {
        var self = this;
        this.schedule(function() {
            if (shouldRecordMsg) {
                self.customer.addDialogue(msg);
            }
            self.chatWindow.getComponent('chatWindow').addConversation(type, msg, userData);
        }, interval, repeat, delay);
    },

    setChoices : function (choices) {
         this.chatChoices.getComponent('chatChoices').setChoices(choices);
    },
});
