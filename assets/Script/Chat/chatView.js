var Customer = require('Customer');
const Global = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {

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
        // this._readFromMsgQueue();
        // this.addConversation("CUSTOMER", "你好", {}, true, 2, 99, 2);
        this.setChoices([]);
    },

    postInit : function () {

    },

    start () {

    },

    update (dt) {
        this._readFromMsgQueue();
    },

    addConversation : function (type, msg, userData, shouldRecordMsg=true, interval=0, repeat=0, delay=0) {
        var self = this;
        this.schedule(function() {
            // if (shouldRecordMsg) {
            //     self.customer.addDialogue(msg);
            // }
            self.chatWindow.getComponent('chatWindow').addConversation(type, msg, userData);
        }, interval, repeat, delay);
    },

    setChoices : function (choices) {
        if (choices.length == 0) {
            this.chatChoices.active = false;
        } else {
            this.chatChoices.active = true;
            this.chatChoices.getComponent('chatChoices').setChoices(choices);
        }
    },

    // This is the callback for choice selected event
    onChoiceSelected : function (choice) {
        this.addConversation("USER", choice.body, {});
        this.customer.reply(choice);
        this.setChoices([]);
    },

    _readFromMsgQueue : function () {
        if (this.customer.getBufferedMsgQueue().length != 0) {
            var msg = this.customer.getBufferedMsgQueue().shift();
            if (msg.type == "MSG") {
                this.addConversation(msg.from, msg.body, {}, false);
            } else if (msg.type == "CHOICE") {
                this.setChoices(msg.choices);
            }
        }
    },
});
