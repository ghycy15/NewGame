/**
 * @class Ingredient
 * @constructor
 * @param
 */
function Ingredient (data) {
    this._id = data['id'];
    this._name = data['name'];
    this._price = data['price'];
    this.reset();
}

/**
 * @method reset
 */
Ingredient.prototype.reset = function () {
   
};

Ingredient.prototype.getID = function () {
    return this._id;
};

Ingredient.prototype.getName = function () {
    return this._name;
};

Ingredient.prototype.getPrice = function () {
    return this._price;
};

module.exports = Ingredient;