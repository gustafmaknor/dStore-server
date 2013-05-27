var linkDirections={
	'left':'left',
	'rigth':'rigth',
	'down':'down'
}

//The node base, containing all data
var Node=function(){
	this.id;
	this.createdDate;
	this.changedDate;
	this.relations=[];
	this.items;
}
Node.prototype.save=function(){

}
Node.prototype.delete=function(){

}
var Link=function(){
	this.direction;
}
var Relation=function(){
	this.name;
	this.startPoint;
	this.endPoint;
}
var Item=function(){
	this.node;
	this.required;
	this.type;
	this.value;
	this.changed;
	this.name;

}

module.exports.Node=Node;
module.exports.Relation=Relation;
module.exports.Item=Item;