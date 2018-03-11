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
var Game = require('Game');
const Global = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {

        contactSlotPrefab: {
            default: null,
            type: cc.Prefab
        },

        contactContainer: {
            default: null,
            type: cc.Node
        },

        chatViewPrefab: {
            default: null,
            type: cc.Prefab
        },

        currentChatView: {
            default: null,
            type: cc.Node
        },

        chatViewPlaceHolder: {
            default: null,
            type: cc.Node
        },

        contactChatViewMapper: {
            default: {},
            serializable: true
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._contactsListRefreshInterval = 0;
        var self = this;

        // this.chatViewPlaceHolder.width = this.node.width;
        // this.chatViewPlaceHolder.height = this.height;
        if (!Global.game) {
            Global.game = new Game();
            Global.game.init();
        }

        this.node.on('onContactSelected', function (event) {
            self.onContactSelected(event.getUserData());
        });
        this.node.on('onGoBackContacts', function (event) {
            self.onGoBackContacts(event.getUserData());
        });
        this.init();
    },

    start () {

        
    },

    /*
     * Expected data to init contacts:
     * data : {
     *     contacts: [
     *         {name:xxxx, lastMessage:xxxx, profilePicIndex:xx}
     *     ]
     * }
     *
     */
    init : function () {
        this.setContacts(Global.game.getContactsList());
    },

    setContacts : function(contacts) {
        var self = this;
        self.contactContainer.getComponent(cc.ScrollView).content.removeAllChildren();
        if (!!contacts) {
            contacts.forEach(function(contact) {
                let contactSlot = null;
                contactSlot = cc.instantiate(self.contactSlotPrefab);
                if (!!contactSlot) {
                    self.contactContainer.getComponent(cc.ScrollView).content.addChild(contactSlot);
                    contactSlot.getComponent('contactSlot').init(contact);
                }
            });
        }
    },

    reset : function () {

    },

    onContactSelected : function (data) {
        cc.log(data);
        let chatView = this.contactChatViewMapper[data.getID()];
        if (!!chatView && !this.currentChatView) {
            this._showChatView(chatView);
        } else {
            chatView = cc.instantiate(this.chatViewPrefab);
            this.contactChatViewMapper[data.getID()] = chatView;
            if (!!chatView && !this.currentChatView) {

                this.chatViewPlaceHolder.x = this.node.width;
                this.chatViewPlaceHolder.width = this.node.width;
                this.chatViewPlaceHolder.height = this.node.height;
                this.chatViewPlaceHolder.addChild(chatView);

                this._showChatView(chatView);
                chatView.getComponent('chatView').init(data);
            }
        }
        
    },

    onGoBackContacts : function (data) {
        if (!!this.currentChatView) {
            this._hideChatView(this.currentChatView);
            data.setUnreadMsgNum(0);
        }
    },

    _showChatView : function(chatView) {
        var action = cc.moveBy(0.2, -this.node.width, 0);
        action.easing(cc.easeIn(3.0));
        chatView.runAction(action);
        cc.log(chatView.x + " " + chatView.y);
        this.currentChatView = chatView;
    },

    _hideChatView : function(chatView) {
        var action = cc.moveBy(0.2, this.node.width,0);
        action.easing(cc.easeIn(3.0));
        chatView.runAction(action);
        this.currentChatView = null;
    },

    update (dt) {
        var self = this;
        if (this._contactsListRefreshInterval > 0.1) {
            var contactsOrder = Global.game.getContactsOrderMap();
            self.contactContainer.getComponent(cc.ScrollView).content.children.forEach(function(contactSlot) {
                let id = contactSlot.getComponent('contactSlot').customer.getID();
                contactSlot.setSiblingIndex(contactsOrder[id]);
            });
            this._contactsListRefreshInterval = 0;
        }
        this._contactsListRefreshInterval += dt;
        
    },
});
