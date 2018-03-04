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
        var self = this;

        // this.chatViewPlaceHolder.width = this.node.width;
        // this.chatViewPlaceHolder.height = this.height;
        
        this.node.on('onContactSelected', function (event) {
            self.onContactSelected(event.getUserData());
        });
        this.node.on('onGoBackContacts', function (event) {
            self.onGoBackContacts(event.getUserData());
        });
        this.init({'contacts':[{'name':'小红', 'id':1, 'lastMsg':'你好'},{'name':'小芳','id':2},{'name':'小兰', 'id':3},{'name':'小绿', 'id':4}]});
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
    init : function (data) {
        let contacts = data['contacts'];
        var self = this;
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

    onContactSelected : function (data) {
        cc.log(data);
        let chatView = this.contactChatViewMapper[data.getID()];
        if (!!chatView && !this.currentChatView) {
            this.showChatView(chatView);
        } else {
            chatView = cc.instantiate(this.chatViewPrefab);
            this.contactChatViewMapper[data.getID()] = chatView;
            if (!!chatView && !this.currentChatView) {

                this.chatViewPlaceHolder.x = this.node.width;
                this.chatViewPlaceHolder.width = this.node.width;
                this.chatViewPlaceHolder.height = this.node.height;
                this.chatViewPlaceHolder.addChild(chatView);

                this.showChatView(chatView);
                chatView.getComponent('chatView').init(data);
            }
        }
        
    },

    onGoBackContacts : function (data) {
        if (!!this.currentChatView) {
            this.hideChatView(this.currentChatView);
        }
    },

    showChatView : function(chatView) {
        var action = cc.moveBy(0.2, -this.node.width, 0);
        action.easing(cc.easeIn(3.0));
        chatView.runAction(action);
        cc.log(chatView.x + " " + chatView.y);
        this.currentChatView = chatView;
    },

    hideChatView : function(chatView) {
        var action = cc.moveBy(0.2, this.node.width,0);
        action.easing(cc.easeIn(3.0));
        chatView.runAction(action);
        this.currentChatView = null;
    }

    // update (dt) {},
});
