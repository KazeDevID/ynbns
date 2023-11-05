// Trilobytes - Gradient Text Extensions/
// TLB_GradientTextExtensions.js
//=============================================================================
 
window.Imported = window.Imported || {};
window.Imported.TLB_GradientTextExtensions = true;
 
window.TLB = window.TLB || {};
TLB.GTE ??= {};
TLB.GTE.version = 1.09;
 
/*:
 * @target MZ
 * @plugindesc This plugin adds functions for gradients in text.
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin facilitates drawing of text with gradient colours as opposed to
 * solid colour, which is the only option by default. It also allows for
 * gradient outlines and angled text as well as drop shadow.
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 * None
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * None
 *
 * ============================================================================
 * HOW TO USE
 * ============================================================================
 * 
 * There is a new function available to Window_Base called drawGradientText.
 * It takes the following parameters:
 * 	text - The text to draw
 * 	gradient - The array of colours that make up the gradient. Stops will be
 *             calculated automatically and uniformly distributed.
 * 	x - The X coordinate for the text
 *  y - The Y coordinate for the text
 *  align - The alignment ("left", "center" or "right")
 *  options - an object containing any or all of the following:
 * 		bitmap - Set this if you wish to draw the text on a bitmap other than
 *               a window's contents.
 * 		bold - Set this to draw the text bolded.
 * 		angle - The radial angle at which to draw the text.
 * 		outlineOpacity - The opacity of the text outline from 0-255.
 * 		outlineThickness - The thickness of the outline stroke.
 * 		outlineGradient - The array of colours that make up the outline.
 * 		dropShadow - Boolean, true to draw drop shadow, false otherwise.
 * 		shadowOpacity - Opacity of the drop shadow.
 * 		dropShadowX - X offset of the drop shadow.
 * 		dropShadowY - Y offset of the drop shadow.
 * 		opacity - Opacity of the text body.		
 * 
 * ============================================================================
 * Compatibility
 * ============================================================================
 *
 * There shouldn't be any compatibility issues.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * Copyright 2022 Trilobytes
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.09:
 * - Fixed a help section mistake with the drop shadow offset options.
 * 
 * Version 1.08:
 * - Moved letterSpacing to be a property of Bitmap, implemented default.
 * 
 * Version 1.07:
 * - Refactoring, addition of comments, added help section and TOS.
 * 
 * Version 1.06:
 * - Moved proprietary level-drawing function to the plugin it was for.
 * - Added letterSpacing option to gradient text and regular text drawing.
 *
 * Version 1.05:
 * - Major refactor to eliminate redundant and repetitive code.
 * - Redesigned code for gradient stops to dynamically handle any number of
 *   colours.
 * - Added support for separate opacity options for outline, body and shadow.
 *
 * Version 1.04:
 * - Made several bug fixes ahead of eventual refactoring work.
 * - Added a dedicated function for drawing level due to the outline gradient
 *   requirements.
 *
 * Version 1.03:
 * - Incorporated double calls into these functions to avoid repetition.
 * - Added experimental option for drawing the level text as its gradient
 *   isn't coming out right.
 *
 * Version 1.02:
 * - Implemented an options object.
 * - Fixed a bug with transparency.
 *
 * Version 1.00:
 * - Finished plugin!
 * 
 * @param defaultLetterspacing
 * @text Default Letter Spacing
 * @desc The default spacing to place between letters.
 * @type number
 * @default 1
*/

window.parameters = PluginManager.parameters('TLB_GradientTextExtensions');
TLB.Param ??= {};
TLB.Param.GTE ??= {};

TLB.Param.GTE.defaultLetterspacing = parseInt(parameters.defaultLetterspacing);

//-----------------------------------------------------------------------------
//
// Bitmap (existing class)
//
// New function: drawGradientText(text, gradient, x, y, maxWidth, lineHeight, align, options)
// New function: _drawGradientTextOutline(text, tx, ty, maxWidth, angle, outlineThickness, outlineGradient)
// New function: _drawGradientTextBody(text, gradient, tx, ty, maxWidth, angle)
// New function: createGradient(text, gradient, x1, y1, x2, y2, angle)
//
//-----------------------------------------------------------------------------
 
Bitmap.prototype.drawGradientText = function(text, gradient, x, y, maxWidth, lineHeight, align, options) {
	const context = this.context;
	const alpha = context.globalAlpha;
	maxWidth = maxWidth || 0xffffffff;
	let tx = x;
	let ty = Math.round(y + lineHeight / 2 + this.fontSize * 0.35);
	if (align === "center") {
		tx += maxWidth / 2;
	}
	if (align === "right") {
		tx += maxWidth;
	}
	context.save();
	context.font = this._makeFontNameText();
	context.textAlign = align;
	context.textBaseline = "alphabetic";
	if (options.angle) {
		context.translate(tx, ty);
		context.rotate(options.angle);
		tx = 0;
		ty = 0;
	}
	context.globalAlpha = options.outlineOpacity || 1;
	this._drawGradientTextOutline(text, tx, ty, maxWidth, options.angle, options.outlineThickness, options.outlineGradient);
	if (options.dropShadow) {
		context.globalAlpha = options.shadowOpacity || 1;
		context.shadowColor = "#000000";
		context.shadowOffsetX = options.dropShadowX;
		context.shadowOffsetY = options.dropShadowY;
		context.shadowBlur = 2;
		this._drawGradientTextBody(text, gradient, tx, ty, maxWidth, options.angle);
		context.globalAlpha = alpha;
		context.shadowColor = "rgba(0, 0, 0, 0)";
	}
	context.globalAlpha = options.opacity || 1;
	this._drawGradientTextBody(text, gradient, tx, ty, maxWidth, options.angle);
	context.globalAlpha = alpha;
	context.restore();
	this.paintOpacity = 255;
	this._baseTexture.update();
};

 Bitmap.prototype._drawGradientTextOutline = function(text, tx, ty, maxWidth, angle, outlineThickness, outlineGradient = null) {
	const context = this.context;
	context.strokeStyle = outlineGradient ? this.createGradient(text, outlineGradient, tx, ty, tx, ty, angle) : this.outlineColor;
	context.lineWidth = outlineThickness;
	context.lineJoin = "round";
	context.strokeText(text, tx, ty, maxWidth);
};
 
Bitmap.prototype._drawGradientTextBody = function(text, gradient, tx, ty, maxWidth, angle) {
	const context = this.context;
	const grad = this.createGradient(text, gradient, tx, ty, tx, ty, angle);
	context.fillStyle = grad;
	context.fillText(text, tx, ty, maxWidth);
};

Bitmap.prototype.createGradient = function(text, gradient, x1, y1, x2, y2, angle) {
	const context = this.context;
	const metrics = context.measureText(text);
	const ascent = metrics.actualBoundingBoxAscent;
	if (angle) {
		const descent = metrics.actualBoundingBoxDescent;
		x1 = 0;
		y1 = -(ascent + descent);
		x2 = 1;
		y2 = descent;
	} else {
		y1 -= ascent;
	}
	const grad = context.createLinearGradient(x1, y1, x2, y2);
	if (gradient) {
		const numColors = gradient.length;
		const numStops = numColors - 1;
		const stopGap = 1 / numStops;
		let currentStop = 0;
		for (let i = 0; i < numColors; i++) {
			const color = gradient[i];
			grad.addColorStop(currentStop, color);
			currentStop += stopGap;
		}
	}
	return grad;
}

TLB.GTE.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
	TLB.GTE.Bitmap_initialize.call(this, width, height);
	this.letterSpacing = TLB.Param.GTE.defaultLetterspacing;
};

Bitmap.prototype.resetLetterSpacing = function() {
	this.letterSpacing = TLB.Param.GTE.defaultLetterspacing;
};

//-----------------------------------------------------------------------------
//
// Window_Base (existing class)
// Inherits from Window
//
// Override: drawText(text, x, y, maxWidth align letterSpacing)
// New function: drawGradientText(text, gradient, x, y, maxWidth, align, options)
//
//-----------------------------------------------------------------------------

Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
	if (this.contents.letterSpacing > 0) {
		text = text.toString().split("").join(String.fromCharCode(8202).repeat(this.contents.letterSpacing));
	}
    this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
};
 
Window_Base.prototype.drawGradientText = function(text, gradient, x, y, maxWidth, align, options = {}) {
	if (!options.bitmap) options.bitmap = this.contents;
	if (options.bold) options.bitmap.fontBold = true;
	const letterSpacing = this.contents.letterSpacing;
	if (letterSpacing > 0) text = text.toString().split("").join(String.fromCharCode(8202).repeat(letterSpacing));
	options.bitmap.drawGradientText(text, gradient, x, y, maxWidth, this.lineHeight(), align, options);
	options.bitmap.fontBold = false;
};

TLB.GTE.Window_Base_textWidth = Window_Base.prototype.textWidth;
Window_Base.prototype.textWidth = function(text) {
	const letterSpacing = this.contents.letterSpacing;
	if (letterSpacing > 0) {
		text = text.toString().split("").join(String.fromCharCode(8202).repeat(letterSpacing));
	}
    return TLB.GTE.Window_Base_textWidth.call(this, text);
};