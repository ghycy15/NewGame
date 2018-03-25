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
    this._bufferedMsg = [];
    this._unreadMsgNum = 0;
    this._currentChatState = 0;
    this._chatScript = null;
    this._isWaitingUser = false;
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

Customer.prototype.getBufferedMsgQueue = function () {
    return this._bufferedMsg;
};

Customer.prototype.setUnreadMsgNum = function (n) {
    this._unreadMsgNum = n;
};

Customer.prototype.getUnreadMsgNum = function () {
    return this._unreadMsgNum;
};

Customer.prototype.isWaitingUser = function () {
    return this._isWaitingUser;
};


Customer.prototype.onMsgRead = function(msg) {
    // this._chatHistory.push(msg);
    // this.loadMore();
};

Customer.prototype.getLastMsg = function() {
    // if (this._bufferedMsg.length > 0) {
    //     return this._bufferedMsg[this._bufferedMsg.length - 1];
    // }
    if (this._chatHistory.length > 0) {
        return this._chatHistory[this._chatHistory.length - 1];
    }
    return undefined;
};

Customer.prototype.loadMore = function() {
    if (this._isWaitingUser) {
        return;
    }

    if (null == this._currentChatState && this._currentChatState < 0) {
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

            self._bufferedMsg.push(tmp);
            self.loadMore();
        }, tmp.delay * 1000);


    } else if (tmp.type == "CHOICE") {
        //5:{type:"CHOICE", choices:{0:{body:"好的", next:4}, 1:{body:"不好", next:8}}},
        this._isWaitingUser = true;
        this._bufferedMsg.push(tmp);
    }
};

Customer.prototype.reply = function(choice) {
    this._isWaitingUser = false;
    this._currentChatState = choice.next;
    var data = {};
    data['body'] = choice.body;
    data['timestamp'] = (!Date.now ? +new Date() : Date.now());
    data['from'] = choice.from;
    data['to'] = "";

    var msg = new Message(data);
    this._chatHistory.push(msg);
    this.loadMore();
};

Customer.prototype.init = function(chatScript) {
    this._chatScript = chatScript;
    this.loadMore();
};

module.exports = Customer;