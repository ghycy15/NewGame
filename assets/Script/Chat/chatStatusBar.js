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
