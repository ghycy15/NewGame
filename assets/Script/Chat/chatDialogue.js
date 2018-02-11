cc.Class({
    extends: cc.Component,

    properties: {
        chatContentLabel: {
            default: null,
            type: cc.Label
        },
        chatBubble: {
            default: null,
            type: cc.Node
        },
        profilePic: {
            default: null,
            type: cc.Sprite
        },
        maxChatBoxWidth: 100,
        
    },

    // LIFE-CYCLE CALLBACKS:
    init: function (content, type, playerInfo) {
        
        this.type = type;
        var label =  this.chatBubble.getChildByName("chatContent");
        label.getComponent(cc.Label).overflow = cc.Label.Overflow.NONE;
        label.getComponent(cc.Label).string = content;
        // cc.log(label.width);
        if(label.width >= this.maxChatBoxWidth){
            // cc.log()
            label.getComponent(cc.Label).overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            label.width = this.maxChatBoxWidth;
            // cc.log("resize");
        }


        //this.chatContentLabel.overflow = cc.Label.Overflow.NONE;
        //if (this.chatContentLabel.node.width >= 200) { 
            //maxWidth气泡最大宽度
          //  this.chatContentLabel.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
           // this.chatContentLabel.node.width = 200;
        //};
        //this.NodeA.width = this.labelA.node.width;
        //this.NodeA.height = this.labelA.node.height;
        // console.log(this.chatContentLabel.string + " " + this.chatContentLabel.node.width);
        // cc.log("Height " + this.node.height + " " + label.height);
        this.node.height = 50 + label.height;
        //this.node.width = this.chatBubble.node.width;
        //console.log(this.profilePic.getComponent(cc.Widget));
    },
    
    onLoad () {
    },

    start () {

    },

    // update (dt) {},
});
