
/**
 * @class Customer
 * @constructor
 * @param
 */
function Customer (data) {
    this._id = data['id'];
    this._name = data['name'];
    this._lastMsg = data['lastMsg'];
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


Customer.prototype.getLastMsg = function () {
    return this._lastMsg;
};


module.exports = Customer;