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

        btnSpacing: {
            default: 10,
            type: cc.Integer
        }

    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        // this.node.on('say-hello', function (event) {
        //     console.log(event.detail.msg);
        // });
    },
    
    start () {
        
    },

    _addChoice: function (choice) {
        let choiceNode = null;
        choiceNode = cc.instantiate(this.choicePrefab);
        this.choicesContainer.node.addChild(choiceNode);
        choiceNode.getComponent('chatChoiceBtn').init(choice);
        return choiceNode;
    },

    addChoices: function (choices) {
        // cc.log(this.node.width);
        var btnWidth = ((this.node.width - ((choices.length + 1) * this.btnSpacing)) / choices.length) * 0.8;
        var btnHeight = this.node.height - 2 * this.btnSpacing;
        this.choicesContainer.getComponent(cc.Layout).spacingX = this.btnSpacing;
        var self = this;
        choices.forEach(function(choice) {
            var choiceNode = self._addChoice(choice);
            if (!!choiceNode) {
                choiceNode.getComponent(cc.Widget).top += self.btnSpacing;
                choiceNode.width = btnWidth;
                choiceNode.height = btnHeight;
            }
        });
    }

    // update (dt) {},
});
