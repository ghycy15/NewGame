var Message = require('Message');

/**
 * @class Customer
 * @constructor
 * @param
 */
function Customer (data) {
    this._id = data['id'];
    this._name = data['name'];
    this._chatHistory = [];
    this._unreadMsgNum = 0;
    this.reset();
}

/**
 * @method reset
 */
Customer.prototype.reset = function () {
   
};

Customer.prototype.getID = function () {
    return this._id;
};


Customer.prototype.getName = function () {
    return this._name;
};


Customer.prototype.getChatHistory = function () {
    return this._chatHistory;
};

Customer.prototype.setUnreadMsgNum = function (n) {
    this._unreadMsgNum = n;
};

Customer.prototype.getUnreadMsgNum = function () {
    return this._unreadMsgNum;
};

Customer.prototype.addDialogue = function(content) {
    var data = {};
    data['body'] = content;
    data['timestamp'] = (!Date.now ? +new Date() : Date.now());
    data['from'] = "";
    data['to'] = "";
    data['isMsgRead'] = false;
    var msg = new Message(data);
    this._chatHistory.push(msg);
    this._unreadMsgNum += 1;
};

Customer.prototype.getLastMsg = function() {
    if (this._chatHistory.length > 0) {
        return this._chatHistory[this._chatHistory.length - 1];
    }
    return undefined;
}

module.exports = Customer;