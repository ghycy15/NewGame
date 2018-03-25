
/**
 * @class Order
 * @constructor
 * @param
 */
function Order (data) {
    this._body = data['body'];
    this._timestamp = data['timestamp'];
    this._from = data['from'];
    this._to = data['to'];
    this._isMsgRead = data['isMsgRead'];

    this.reset();
}

/**
 * @method reset
 */
Order.prototype.reset = function () {
   
};

Order.prototype.getBody = function () {
    return this._body;
};

Order.prototype.getTimestamp = function () {
    return this._timestamp;
};

Order.prototype.getFrom = function () {
    return this._from;
};

Order.prototype.getTo = function () {
    return this._to;
};

Order.prototype.isMsgRead = function () {
    return this._isMsgRead;
};

module.exports = Order;