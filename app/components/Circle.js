define(['jquery', 'app/components/Shape'], function ($, Shape) {
    'use strict';
    return class Circle extends Shape {
        /**
          * Represent an abstract shape with the given parameters
          * @constructor
          * @param  {number} iCx x coordinate of the position
          * @param  {number} iCy y coordinate of the position
          * @param  {number} iR  radius of the circle
          * @param  {string} sColor color of the circle
          * @param  {Object} oSvgShape svg DOM shape
          */
        constructor(iCx, iCy, iR, sColor, oSvgShape) {
            super(sColor, oSvgShape);
            oSvgShape.setAttribute('cx', '' + iCx + '');
            oSvgShape.setAttribute('cy', '' + iCy + '');
            oSvgShape.setAttribute('r', '' + iR + '');
        }

        /**
        * @see Shape.setPosition
        */
        setPosition(x, y) {
            this.oShape.setAttribute('cx', '' + x + '');
            this.oShape.setAttribute('cy', '' + y + '');
        }
    }
});