// Dependencies
var Customer = require('Customer');
var Message = require('Message');
const Dish = require('Dish');
var chatScript = require('chat1');

/**
 * @class Game
 * @constructor
 * @param
 */
function Game () {
    this.reset();
}

/**
 * @method reset
 */
Game.prototype.reset = function () {

};

Game.prototype.init = function() {
    this._customerMap = {};
    this._contactsList = [];
    this._dishesMap = {};
    /* 
        finishing_time: number,
        item_id: number,
    */
    this._MixingItemList = [];
    this._dishesInventory = {};
    this.testInit();
};

Game.prototype.testInit = function() {
    var c1 = new Customer({'name':'小红', 'id':1});
    cc.log(chatScript);
    c1.init(chatScript.chatScript[1]);
    this.addCustomer(c1);

    var c2 = new Customer({'name':'小方', 'id':2});
    cc.log(chatScript);
    c2.init(chatScript.chatScript[2]);
    this.addCustomer(c2);

    const d1 = new Dish({'name':'蛋糕', 'id':1, 'cook_time': 10, 'ingredients': [1, 2, 3]});
    //debugger;
    this.addDish(d1);
};

Game.prototype.addCustomer = function(customer) {
    this._customerMap[customer.getID()] = customer;
    this._contactsList.push(customer);
};

Game.prototype.getTotalUnreadMsgNum = function() {
    var total = 0;
    this.getContactsList().forEach(function(contact, index) {
        total += contact.getUnreadMsgNum();
    });
    return total;
};

Game.prototype.addDish = function(dish) {
	this._dishesMap[dish.getID()] = dish;
};


Game.prototype.getDishByID = function(number) {
	return this._dishesMap[number];
};

Game.prototype.getDishesMap = function() {
    return this._dishesMap;
};

Game.prototype.addToDishesInventory = function(dish) {
	if (!this._dishesInventory[dish.getID()]) {
		this._dishesInventory[dish.getID()] = 1;
	} else {
		this._dishesInventory[dish.getID()] ++;
	}
};

Game.prototype.getDishesInventory = function() {
    return this._dishesInventory;
};

// Should sort the customers by the last message timestamp
Game.prototype.getContactsList = function() {
    this._contactsList.sort(function(a,b){
        if (!a.getLastMsg() && !!b.getLastMsg()) {
            return true;
        } else if (!b.getLastMsg() && !!a.getLastMsg()) {
            return false;
        } else if (!a.getLastMsg() && !b.getLastMsg()) {
            return a.getID() > b.getID();
        } else {
            return new Date(b.getLastMsg().getTimestamp()) - new Date(a.getLastMsg().getTimestamp());
        }
    });
    return this._contactsList;
};

Game.prototype.getContactsOrderMap = function() {
    var res = {};
    this.getContactsList().forEach(function(contact, index) {
        res[contact.getID()] = index;
    });
    return res;
};

module.exports = Game;