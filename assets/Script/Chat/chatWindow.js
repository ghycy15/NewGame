cc.Class({
    extends: cc.Component,

    properties: {
        userChatDialogBoxPrefab: {
            default: null,
            type: cc.Prefab
        },
        customerChatDialogBoxPrefab: {
            default: null,
            type: cc.Prefab
        },
        scrollView: {
            default: null,
            type: cc.ScrollView
        }
    },

    addConversation: function (type, msg, userData, scrollToBottom=true) {
        let chatSlot = null;
        if (type === "USER") {
            chatSlot = cc.instantiate(this.userChatDialogBoxPrefab);
        } else if (type === "CUSTOMER") {
            chatSlot = cc.instantiate(this.customerChatDialogBoxPrefab);
        }
        if (!!chatSlot) {
            this.scrollView.content.addChild(chatSlot);
            chatSlot.getComponent('chatDialogue').init(msg, type, userData);
        }
        if (!!scrollToBottom) {
            this.scrollToBottom(0.1);
        }
    },


    scrollToBottom: function() {
        cc.log(this.scrollView.getMaxScrollOffset().y );
        if (this.scrollView.getMaxScrollOffset().y > 0) {
            this.scrollView.scrollToBottom(0.1);
        }
    },
 
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {

    },
});
