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
        btnLabel : {
            default: null,
            type: cc.Label
        },

        data : {
            default: {}
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

    init : function (content) {
        this.btnLabel.string = content;
        this.data['content'] = content;
        var self = this;
        this.node.on('touchstart', function (event) {
            const onChoiceSelectedEvent = new cc.Event.EventCustom('onChoiceSelected', true);
            onChoiceSelectedEvent.setUserData(self.data);
            this.node.dispatchEvent( onChoiceSelectedEvent );
        }, this);
    },



    // update (dt) {},
});
