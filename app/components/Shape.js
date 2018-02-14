define(['jquery'], function ($) {
    'use strict';
    return class Shape {
        /**
           * Represent an abstract shape with the given parameters
           * @constructor
           * @param  {string} sColor color of the circle
           * @param  {Object} oSvgShape svg DOM shape
           */
        constructor(sColor, oSvgShape) {
            oSvgShape.setAttribute('fill', sColor);
            oSvgShape.setAttribute('style', 'padding:10');
            oSvgShape.addEventListener('click', this.selectShape.bind(this, oSvgShape));
            oSvgShape.addEventListener('mousedown', this.beginMove.bind(this));
            oSvgShape.addEventListener('mousemove', this.move.bind(this));
            oSvgShape.addEventListener('mouseup', this.endMove.bind(this));
            oSvgShape.addEventListener('mouseout', this.endMove.bind(this));
            this.oShape = oSvgShape;
            this.bClick = false;
        }

        /**
         * Gets svg shape representation
         */
        get svgShape() {
            return this.oShape;
        }

        /**
         * Selects shape
         * @param  {Object} oShape
         */
        selectShape() {
            var bSelected = $(this.oShape).hasClass('selected');
            if (bSelected === true) {
                this.oShape.removeAttribute('stroke');
                this.oShape.removeAttribute('stroke-width');
                $(this.oShape).removeClass('selected');
                this.oShape.style.opacity = null;
            } else {
                this.oShape.setAttribute('stroke', 'black');
                this.oShape.setAttribute('stroke-width', '5');
                $(this.oShape).addClass('selected');
                this.oShape.style.opacity = 1.0;
            }
        }

        /**
         * Function is called when mousedown event is fired
         */
        beginMove(oEvt) {
            oEvt.preventDefault(); // Needed for Firefox to allow dragging correctly
            this.bClick = true;
        }

        /**
        * Moves shape on mousemove event
        */
        move(oEvt) {
            oEvt.preventDefault();
            var bSelected = $(this.oShape).hasClass('selected');
            if (this.bClick === true && bSelected === true) {
                var oSvgPoint = this.svgPoint(this.oShape.parentElement, this.oShape, oEvt.clientX, oEvt.clientY);
                this.setPosition(oSvgPoint.x, oSvgPoint.y);
            }
        }

        /**
         * Converts coordinates of the point from DOM to SVG
         * @param  {Object} oSvg SVG drawing area
         * @param  {Object} oElement svg element
         * @param  {number} iX DOM x coordinate
         * @param  {number} iY DOM y coordinate
         */
        svgPoint(oSvg, oElement, iX, iY) {
            var pt = oSvg.createSVGPoint();

            pt.x = iX;
            pt.y = iY;

            return pt.matrixTransform(oElement.getScreenCTM().inverse());
        }

        /**
         * Implementation required
         * Sets new position of the shape 
         * @param  {number} iX DOM x coordinate
         * @param  {number} iY DOM y coordinate
         */
        setPosition(x, y) {
            throw new Error('You have to implement the method setPosition!');
        }

        /**
        * Function is called when mouseup event is fired
        */
        endMove(oEvt) {
            oEvt.preventDefault();
            this.bClick = false;
        }
    }
});