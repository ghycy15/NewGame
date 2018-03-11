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
        customerNameLabel: {
            default: null,
            type: cc.Label
        },

        goBackContactsBtn: {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        this.goBackContactsBtn.node.on('touchstart', function (event) {
            const onGoBackContactsEvent = new cc.Event.EventCustom('onGoBackContacts', true);
            // cc.log("clicked go back button");
            onGoBackContactsEvent.setUserData(this._customer);
            self.goBackContactsBtn.node.dispatchEvent( onGoBackContactsEvent );
        }, this);
    },

    start () {

    },

    setName : function (customer) {
        this._customer = customer;
        this.customerNameLabel.string = customer.getName();
    }

    // update (dt) {},
});
