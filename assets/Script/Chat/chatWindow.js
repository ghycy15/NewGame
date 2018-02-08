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
 
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        for (let i = 0; i < this.totalCount; i++) {
            let chatSlot1 = cc.instantiate(this.userChatDialogBoxPrefab);
            let chatSlot2 = cc.instantiate(this.customerChatDialogBoxPrefab);
            this.scrollView.content.addChild(chatSlot1);
            
            this.scrollView.content.addChild(chatSlot2);
            chatSlot1.getComponent('chatDialogue').init(tmp[i%5], {});
            chatSlot2.getComponent('chatDialogue').init(tmp[i%5], {});
            
        }
    },

    // update (dt) {},
});