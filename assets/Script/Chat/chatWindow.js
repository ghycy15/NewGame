// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var tmp = ["aaaaa asdxc asdaqw qwezxc qwexz qweqasd sdad", "adaasdadasda","aqweq qweqwe asdaz q" , "bbb", "cccc"];

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
        },
        totalCount: 0
    },

    addConversation: function (type, content, userData, scrollToBottom=true) {
        let chatSlot = null;
        if (type === "USER") {
            chatSlot = cc.instantiate(this.userChatDialogBoxPrefab);
        } else if (type === "CUSTOMER") {
            chatSlot = cc.instantiate(this.customerChatDialogBoxPrefab);
        }
        if (!!chatSlot) {
            this.scrollView.content.addChild(chatSlot);
            chatSlot.getComponent('chatDialogue').init(content, userData);
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
        this.schedule(function() {
            // Here `this` is referring to the component
            this.addConversation("USER", tmp[i%5], {});
        }, 2);
        this.schedule(function() {
            // Here `this` is referring to the component
            this.addConversation("CUSTOMER", tmp[i%5], {});
        }, 3);

    },

    update (dt) {
    //cc.DelayTime(1);
      //  this.addConversation("CUSTOMER", tmp[i%5], {});
    },
});
