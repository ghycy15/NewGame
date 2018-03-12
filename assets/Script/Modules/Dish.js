
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

    if (data['start_time']) {
    	this.start_time = data['start_time'];
    }
    this.reset();
}

/**
 * @method reset
 */
Dish.prototype.reset = function () {
   
};

Dish.prototype.setStartTime = function(start_time) {
    this.start_time = start_time;
}


Dish.prototype.getID = function () {
    return this._id;
};


Dish.prototype.getName = function () {
    return this._name;
};

Dish.prototype.getIngredients = function () {
    return this._ingredients;
};

Dish.prototype.getCookTime = function () {
    return this._cookTime;
};

module.exports = Dish;