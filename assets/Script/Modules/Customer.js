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
    this._receiveMsgIndex = 0;
    this._readMsgIndex = 0;

    this._chatChoices = null;

    this._unreadMsgNum = 0;
    this._currentChatState = 0;
    this._chatScript = null;

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

Customer.prototype.getUnreadMsgNum = function () {
    return this._chatHistory.length - this._readMsgIndex;
};

Customer.prototype.getChatChoices = function() {
    return this._chatChoices;
};

Customer.prototype.getLastMsg = function() {
    if (this._chatHistory.length > 0) {
        return this._chatHistory[this._chatHistory.length - 1];
    }
    return undefined;
};

Customer.prototype._loadMore = function() {
    if (null === this._currentChatState || this._currentChatState < 0) {
        return;
    }
    cc.log(this._currentChatState);
    var self = this;
    var tmp = this._chatScript.chat[this._currentChatState];
    if (tmp.type == "MSG") {
        
        // Delay to put into msg queue
        setTimeout(function(){
            var data = {};
            data['body'] = tmp.body;
            data['timestamp'] = (!Date.now ? +new Date() : Date.now());
            data['from'] = tmp.from;
            data['to'] = "";

            var msg = new Message(data);
            self._chatHistory.push(msg);
            self._currentChatState = tmp.next;
            self._unreadMsgNum += 1;

            self._loadMore();
        }, tmp.delay * 1000);


    } else if (tmp.type == "CHOICE") {
        //5:{type:"CHOICE", choices:{0:{body:"好的", next:4}, 1:{body:"不好", next:8}}},
        this._chatChoices = tmp.choices;
    }
};

Customer.prototype.replyMsg = function(choice) {
    this._chatChoices = null;
    this._currentChatState = choice.next;
    var data = {};
    data['body'] = choice.body;
    data['timestamp'] = (!Date.now ? +new Date() : Date.now());
    data['from'] = "USER";
    data['to'] = "";

    var msg = new Message(data);
    this._chatHistory.push(msg);
    this._loadMore();
};

Customer.prototype.receiveMsg = function() {
    var msg = null;
    if (this._receiveMsgIndex < this._chatHistory.length) {
        this._chatHistory[this._receiveMsgIndex].setIsReceived(true);
        msg = this._chatHistory[this._receiveMsgIndex];
        this._receiveMsgIndex += 1;
    }
    return msg;
};

Customer.prototype.readMsg = function() {
    this._readMsgIndex = this._chatHistory.length;
};

Customer.prototype.init = function(chatScript) {
    this._chatScript = chatScript;
    this._loadMore();
};

module.exports = Customer;