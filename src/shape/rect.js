/*
Class: Graphic.Rectangle
	Shape implementation of a rectangle. A Rectangle can have rounded corners

  Author:
  	Sébastien Gruhier, <http://www.xilinus.com>

  License:
  	MIT-style license.
*/
Graphic.Rectangle = Class.create(Graphic.Shape, {
  initialize: function($super, renderer) {    
    $super(renderer, "rect");
    Object.extend(this.attributes, {x:0, y:0, w:0, h:0, rx: 0, ry: 0});
  },
    
  getSize: function() {        
    return {w: this.attributes.width, h: this.attributes.height}
  },
  
  setSize: function(width, height) {     
    this._setAttributes({width: width, height: height});
    return this;
  },
    
  getLocation: function() {
    return {x: this.attributes.x, y: this.attributes.y}
  },
  
  setLocation: function(x, y) {
    this._setAttributes({x: x, y: y});
    return this;
  },
  
  // Group: Specific Rectangle Functions
  /*
    Function: setRoundCorner
      Sets round corners values in pixel
      
    Parameters:
      rx - round X value
      ry - round Y value
      
    Returns:
      this
  */
  setRoundCorner: function(rx, ry) {
    rx = Math.max(0, rx);
    ry = Math.max(0, ry);
    if (! ry)
      ry = rx;
    this._setAttributes({rx: rx, ry: ry});
    return this;
  },
  
  /*
    Function: getRoundCorner
      Gets round corners values in pixel
      
    Returns:
      An hash table {rx:, ry:}
  */
  getRoundCorner: function(rx, ry) {
    return  {rx: this.attributes.rx, ry: this.attributes.ry}
  }
});
