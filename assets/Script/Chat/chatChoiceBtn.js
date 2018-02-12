cc.Class({
    extends: cc.Component,

    properties: {
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
        // TODO: need to parse the content
        this.btnLabel.string = content;
        this.data['content'] = content;
        var self = this;
        this.node.on('click', function (event) {
            const onChoiceSelectedEvent = new cc.Event.EventCustom('onChoiceSelected', true);
            onChoiceSelectedEvent.setUserData(self.data);
            this.node.dispatchEvent( onChoiceSelectedEvent );
        }, this);
    },



    // update (dt) {},
});
