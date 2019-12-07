
function runIntCode(arr){
    var inputArray = arr.slice();
    var idx = 0;
    while(inputArray[idx] != 99){
        if(inputArray[idx]== 1){
            // addition     
            inputArray[inputArray[idx+3]] = inputArray[inputArray[idx+1]] + inputArray[inputArray[idx+2]]
        } else if(inputArray[idx]==2){
            // multiplication     
            inputArray[inputArray[idx+3]] = inputArray[inputArray[idx+1]] * inputArray[inputArray[idx+2]]
        }
        idx += 4;
    }
    return inputArray[0]; 
}

function Point(x, y){
	this.x = x || 0;
	this.y = y || 0;
};

Point.prototype.x = null;
Point.prototype.y = null;
Point.prototype.add = function(v){
	return new Point(this.x + v.x, this.y + v.y);
};
Point.prototype.copy = function(){
	return new Point(this.x, this.y);
};
Point.prototype.degreesTo = function(v){
	var dx = this.x - v.x;
	var dy = this.y - v.y;
	var angle = Math.atan2(dy, dx); // radians
	return angle * (180 / Math.PI); // degrees
};
Point.prototype.distance = function(v){
	var x = this.x - v.x;
	var y = this.y - v.y;
	return Math.sqrt(x * x + y * y);
};
Point.prototype.equals = function(toCompare){
	return this.x == toCompare.x && this.y == toCompare.y;
};
Point.prototype.interpolate = function(v, f){
	return new Point( v.x + (this.x - v.x) * f, v.y + (this.y - v.y) * f );
};
Point.prototype.length = function(){
	return Math.sqrt(this.x * this.x + this.y * this.y);
};
Point.prototype.normalize = function(thickness){
	var l = this.length();
	this.x = this.x / l * thickness;
	this.y = this.y / l * thickness;
};
Point.prototype.orbit = function(origin, arcWidth, arcHeight, degrees){
	var radians = degrees * (Math.PI / 180);
	this.x = origin.x + arcWidth * Math.cos(radians);
	this.y = origin.y + arcHeight * Math.sin(radians);
};
Point.prototype.offset = function(dx, dy){
	this.x += dx;
	this.y += dy;
};
Point.prototype.subtract = function(v){
	return new Point(this.x - v.x, this.y - v.y);
};
Point.prototype.toString = function(){
	return "(x=" + this.x + ", y=" + this.y + ")";
};
Point.prototype.manhattanDistance = function(pt){
	return Math.abs(this.x-pt.x)+Math.abs(this.y-pt.y);
};

Point.interpolate = function(pt1, pt2, f){
	return pt1.interpolate(pt2, f);
};
Point.polar = function(len, angle){
	return new Point(len * Math.cos(angle), len * Math.sin(angle));
};
Point.distance = function(pt1, pt2){
	var x = pt1.x - pt2.x;
	var y = pt1.y - pt2.y;
	return Math.sqrt(x * x + y * y);
};
exports.Point = Point;
exports.runIntCode = runIntCode;