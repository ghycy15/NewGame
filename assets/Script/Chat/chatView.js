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
        // cc.log(this.chatWindow);
        this.chatChoicesDisplayed = false;
        var self = this;
        this.node.on('onChoiceSelected', function (event) {
            self.onChoiceSelected(event.getUserData());
        });
    },

    init : function (customer) {
        var self = this;
        this.customer = customer;
        var customerName = customer.getName();

        // init chat status bar
        let chatStatusBar = this.chatStatusBar.getComponent('chatStatusBar');
        if (!!chatStatusBar) {
            chatStatusBar.setName(customer);
        }

        // init the history messages
        cc.log(this.customer.getChatHistory());
            
        this.customer.getChatHistory().forEach(function(msg) {
            if (msg.isRead()) {
                self.addConversation(msg.getFrom(), msg.getBody());
            }
        });

        this.setChoices([]);
    },

    postInit : function () {

    },

    start () {

    },

    update (dt) {
        this._readMsg();
        this._setChoices();
    },

    addConversation : function (type, msg) {
        var self = this;
        self.chatWindow.getComponent('chatWindow').addConversation(type, msg, {});
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
        this.customer.replyMsg(choice);
        this.setChoices([]);
        this.chatChoicesDisplayed = false;
    },

    _readMsg : function() {
        let msg = this.customer.readMsg();
        if (!!msg) {
            this.addConversation(msg.getFrom(), msg.getBody());
        }
    },

    _setChoices : function () {
        let choices = this.customer.getChatChoices();
        if (!!choices && !this.chatChoicesDisplayed) {
            this.chatChoicesDisplayed = true;
            this.setChoices(choices);
        }
    },
});
