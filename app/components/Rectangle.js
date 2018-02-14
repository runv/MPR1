define(['jquery', 'app/components/Shape'], function ($, Shape) {
    'use strict';
    return class Rectangle extends Shape {
        /**
          * Represent an abstract shape with the given parameters
          * @constructor
          * @param  {number} iCx x coordinate of the position
          * @param  {number} iCy y coordinate of the position
          * @param  {number} iWidth width of the ractangle
          * @param  {number} iHeight height of the rectangle
          * @param  {string} sColor color of the circle
          * @param  {Object} oSvgShape svg DOM shape
          */
        constructor(iCx, iCy, iWidth, iHeight, sColor, oSvgShape) {
            super(sColor, oSvgShape);
            oSvgShape.setAttribute('x', '' + iCx + '');
            oSvgShape.setAttribute('y', '' + iCy + '');
            oSvgShape.setAttribute('width', '' + iWidth + '');
            oSvgShape.setAttribute('height', '' + iHeight + '');
        }

        /**
         * @see Shape.setPosition
         */
        setPosition(x, y) {
            var iWidth = this.oShape.getAttribute('width');
            var iHeight = this.oShape.getAttribute('height');
            var iNewX = x - (iWidth / 2);
            var iNewY = y - (iHeight / 2);
            this.oShape.setAttribute('x', '' + iNewX + '');
            this.oShape.setAttribute('y', '' + iNewY + '');
        }
    }
});