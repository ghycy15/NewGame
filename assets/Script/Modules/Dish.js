
/**
 * @class Dish
 * @constructor
 * @param
 */
function Dish (data) {
    this._id = data['id'];
    this._name = data['name'];
    this._ingredients = data['ingredients'];
    this._cookTime = data['cook_time'];
    this.reset();
}

/**
 * @method reset
 */
Dish.prototype.reset = function () {
   
};


Dish.prototype.getID = function () {
    return this._id;
};


Dish.prototype.getName = function () {
    return this._name;
};


Dish.prototype.getLastMsg = function () {
    return this._lastMsg;
};


module.exports = Dish;