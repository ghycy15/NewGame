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

        customer: {
            default: null,
            type: Customer
        }

        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    init : function (data) {
        this.customer = new Customer(data);
        this.nameLabel.string = this.customer.getName();
        this.lastMsgLabel.string = this.customer.getLastMsg();

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

    }

    // update (dt) {},
});