/*
Class: Graphic.Polygon
	Shape implementation of a polygon.

  Author:
  	Sébastien Gruhier, <http://www.xilinus.com>

  License:
  	MIT-style license.

  See Also:
    <Shape>
*/
Graphic.Polygon = Class.create(Graphic.Polyline, {
  initialize: function($super, renderer) {
    $super(renderer, "polygon");
  }
});
