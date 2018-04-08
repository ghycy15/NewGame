
/**
 * @class Message
 * @constructor
 * @param
 */
function Message (data) {
    this._body = data['body'];
    this._timestamp = data['timestamp'];
    this._from = data['from'];
    this._to = data['to'];
    this._isRead = false;
    this._isReceived = false;
    this._type = data['type'];
    this.reset();
}

/**
 * @method reset
 */
Message.prototype.reset = function () {
   
};

Message.prototype.getBody = function () {
    return this._body;
};

Message.prototype.getTimestamp = function () {
    return this._timestamp;
};

Message.prototype.getFrom = function () {
    return this._from;
};

Message.prototype.getTo = function () {
    return this._to;
};

Message.prototype.isRead = function () {
    return this._isRead;
};

Message.prototype.setIsRead = function(isRead) {
    this._isRead = isRead;
};

Message.prototype.isReceived = function () {
    return this._isReceived;
};

Message.prototype.setIsReceived = function(isReceived) {
    this._isReceived = isReceived;
};

Message.prototype.getType = function() {
    return this._type;
};

module.exports = Message;