var Customer = require('Customer');

cc.Class({
    extends: cc.Component,

    properties: {

        profilePic: {
            default: null,
            type: cc.Sprite
        },

        lastMsgLabel: {
            default: null,
            type: cc.Label
        },

        nameLabel: {
            default: null,
            type: cc.Label
        },

        notificationLabel: {
            default: null,
            type: cc.Node
        },

        customer: {
            default: null,
            type: Customer
        }
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    init : function (customer) {
        this.customer = customer;
        this.nameLabel.string = this.customer.getName();
        this.setLastMsg(this.customer.getLastMsg());

        // cc.log(this.customer);
        var self = this;
        this.node.on('click', function (event) {
            const onContactSelectedEvent = new cc.Event.EventCustom('onContactSelected', true);
            // cc.log(this.nameLabel.string);
            onContactSelectedEvent.setUserData(self.customer);
            this.node.dispatchEvent( onContactSelectedEvent );
        }, this);
    },

    setName : function (name) {
        this.nameLabel.string = name;
    },

    setLastMsg: function (msg) {
        this.lastMsgLabel.string = msg;
    },

    setProfilePic: function () {

    },

    update (dt) {
        let lastMsg = this.customer.getLastMsg();
        if (!!lastMsg) {
            this.setLastMsg(lastMsg.getBody());
        } else {
            this.setLastMsg("");
        }
        if (this.customer.getUnreadMsgNum() != 0) {
            this.notificationLabel.active = true;
            this.notificationLabel.getChildByName('number').getComponent(cc.Label).string = this.customer.getUnreadMsgNum();
        } else {
            this.notificationLabel.active = false;
        }
    },
});
