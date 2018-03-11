// Dependencies
var Customer = require('Customer');
var Message = require('Message');

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
    this.testInit();
};

Game.prototype.testInit = function() {
    var c1 = new Customer({'name':'小红', 'id':1});
    var c2 = new Customer({'name':'小a', 'id':2});
    var c3 = new Customer({'name':'as', 'id':3});
    var c4 = new Customer({'name':'adaq', 'id':4});
    var c5 = new Customer({'name':'qwe', 'id':5});
    var c6 = new Customer({'name':'azxca', 'id':6});
    c2.addDialogue("test");
    c2.addDialogue("test1");
    c2.addDialogue("test2");
    this.addCustomer(c1);
    this.addCustomer(c2);
    this.addCustomer(c3);
    this.addCustomer(c4);
    this.addCustomer(c5);
    this.addCustomer(c6);
};

Game.prototype.addCustomer = function(customer) {
    this._customerMap[customer.getID()] = customer;
    this._contactsList.push(customer);
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