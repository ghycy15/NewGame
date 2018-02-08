cc.Class({
    extends: cc.Component,

    properties: {
        slotPrefab: {
            default: null,
            type: cc.Prefab
        },
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        totalCount: 0
    },

    init: function (/*home*/) {
        this.itemSlots = [];
        this.home = home;
        for (let i = 0; i < this.totalCount; ++i) {
            let itemSlot = this.addHeroSlot();
            this.itemSlots.push(itemSlot);
        }
    },

    addItemSlot: function () {
        let itemSlot = cc.instantiate(this.slotPrefab);
        this.scrollView.content.addChild(itemSlot);
        return itemSlot;
    },

    show: function () {
        //this.node.active = true;
        //this.node.emit('fade-in');
        //this.home.toggleHomeBtns(false);
    },

    hide: function () {
        //this.node.emit('fade-out');
        //this.home.toggleHomeBtns(true);
    },
});