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
        choiceBtnList: {
            default: [],
            type: cc.Node
        },
        
        choiceTextList: {
            default: [],
            type: 'String'
        },

        choicePrefab: {
            default: null,
            type: cc.Prefab
        },

        choicesContainer: {
            default: null,
            type: cc.Layout
        },
        
        chatWindow: {
            default: null,
            type: cc.ScrollView
        }

    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        // this.node.on('say-hello', function (event) {
        //     console.log(event.detail.msg);
        // });
    },
    
    start () {
        this.addChoice("aaa");
        this.addChoice("bbbbbbbbb");
        this.node.dispatchEvent( new cc.Event.EventCustom('foobar', true) );

    },

    addChoice: function (content) {
        let choice = null;
        choice = cc.instantiate(this.choicePrefab);
        choice.getComponent(cc.Button).node.getChildByName('Label').getComponent(cc.Label).string = content;
        this.choicesContainer.node.addChild(choice);
        choice.getComponent('chatChoiceBtn').init();
        //var self = this;
        //
        //choice.on('touchstart', function (event) {
        //    this.chatWindow.getComponent('chatWindow').addConversation("USER", "aaaa", {});

        //}, this);
    }

    // update (dt) {},
});
