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
            this.scrollView.scrollToBottom(0.1);
        }
    },
 
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //for (let i = 0; i < this.totalCount; i++) {
        //    this.addConversation("USER", tmp[i%5], {});
        //    this.addConversation("CUSTOMER", tmp[i%5], {});
        //}

    },

    update (dt) {
    //cc.DelayTime(1);
      //  this.addConversation("CUSTOMER", tmp[i%5], {});
    },
});
