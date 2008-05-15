/*
Class: Graphic.Group
	Shape implementation of a group.

  Author:
  	Sébastien Gruhier, <http://www.xilinus.com>

  License:
  	MIT-style license.

  See Also:
    <Shape>
*/
Graphic.Group = Class.create(Graphic.Shape, {
  initialize: function($super, renderer) {    
    $super(renderer, "g");
    this.children = [ ];
  },

  destroy: function() {
    this.children.each(function(e) {
      e.destroy();
    });
    this.children.clear();
    this.renderer.remove(this);
  },
    
  
  add: function(shape) { 
    var hasShape = this.children.find( function(s) { return s == shape });                 
    if (!hasShape) {  
      this.children.push(shape); 
      shape.parent = this; 
      shape.originalMatrix = shape.matrix;
      this.renderer.add(shape, this);
    }
  },

  remove:function(shape) {
    var hasShape = this.children.find( function(s) { return s == shape });                 
    if (hasShape) {
      this.children = this.children.reject( function(s) { return s == shape });
      this.renderer.remove(shape);  
      shape.parent = null;
    }
  },

  get: function(index) {
    return (index >=0 && index < this.children.length ? this.children[index] : null);
  },                            
  
  getNbELements: function() {
    return this.children.length;
  },

  getSize: function() {
    if (this.getNbELements() == 0) 
      return {w: 0, h: 0};
    
    var first = this.children.first()
    var bounds = (first.getBounds());
    var xmin = bounds.x;
    var ymin = bounds.y;
    var xmax = bounds.x + bounds.w;
    var ymax = bounds.y + bounds.h;
    this.children.each(function(shape) {
      var bounds = (shape.getBounds());
      xmin = Math.min(xmin, bounds.x);
      xmax = Math.max(xmax, bounds.x + bounds.w);
      ymin = Math.min(ymin, bounds.y);
      ymax = Math.max(ymax, bounds.y + bounds.h);      
    });
    return {w: xmax - xmin, h: ymax - ymin};
  }, 

  getLocation: function() {
    if (this.getNbELements() == 0) 
      return {x: 0, y: 0};
      
    var first = this.children.first()
    var bounds = (first.getBounds());
    var xmin = bounds.x;
    var ymin = bounds.y;
    this.children.each(function(shape) {
      var bounds = (shape.getBounds());
      xmin = Math.min(xmin, bounds.x);
      ymin = Math.min(ymin, bounds.y);
    });
    return {x: xmin, y: ymin};
  },
  
  postTransform: function($super, matrix) {
    $super(matrix);

    this.children.each(function(shape) {
      shape.postTransform(matrix);
    });
    return this;
  },
  
  preTransform: function($super, matrix) {
    $super(matrix);

    this.children.each(function(shape) {
      shape.preTransform(matrix);
    });
    return this;
  },

  find:function(shapeId) {
    return this.children.find( function(s) { return s.getID() == shapeId });
  },

  findAll:function(shapeType) {
    return this.children.findAll( function(s) { return s.getType() == shapeType });
  }  
});
