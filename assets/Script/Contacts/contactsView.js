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
        this.init({'contacts':[{'name':'小红'},{'name':'小芳'},{'name':'小兰'},{'name':'小绿'},{'name':'小紫'},{'name':'abc'},{'name':'abc'}]});
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
        let chatView = null;
        chatView = cc.instantiate(this.chatViewPrefab);
        if (!!chatView && !this.currentChatView) {
            this.currentChatView = chatView;
            

            // this.node.addChild(chatView);
            cc.log(this.node.width);
            this.chatViewPlaceHolder.width = this.node.width;
            this.chatViewPlaceHolder.addChild(chatView);

            // chatView.x = -chatView.width;
            // chatView.position.x *= 2;
            // chatView.getComponent(cc.Widget).left = chatView.width * 2;
            var action = cc.moveTo(0.2, 0, chatView.height);
            // // // 执行动作
            action.easing(cc.easeIn(3.0));
            chatView.runAction(action);
            // chatView.getComponent(cc.Widget).left = 0;
            // // 停止一个动作
            // chatView.stopAction(action);
            
            chatView.getComponent('chatView').init(data);
            //contactSlot.getComponent('contactSlot').init(contact);
        }
    },

    onGoBackContacts : function (data) {
        cc.log(this.currentChatView);
        // cc.log(this.currentChatView);
        if (!!this.currentChatView) {
            var action = cc.moveTo(0.2, this.currentChatView.width, this.currentChatView.height / 2);
            // // // 执行动作
            action.easing(cc.easeIn(3.0));
            this.currentChatView.runAction(action);

            //this.currentChatView.active = false;
            this.currentChatView = null;
        }
    }

    // update (dt) {},
});
