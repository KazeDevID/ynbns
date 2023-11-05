//-----------------------------------------------------------------------------
// Window_MapMousePointer
//
// The window for displaying the party's gold.

function Window_MapMousePointer() {
    this.initialize(...arguments);
}

Window_MapMousePointer.prototype = Object.create(Window_Selectable.prototype);
Window_MapMousePointer.prototype.constructor = Window_MapMousePointer;

Window_MapMousePointer.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
};

Window_MapMousePointer.prototype.colSpacing = function() {
    return 0;
};

Window_MapMousePointer.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.drawCurrencyValue(this.value(), this.currencyUnit(), x, y, width);
};

Window_MapMousePointer.prototype.value = function() {
    return $gameParty.gold();
};

Window_MapMousePointer.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_MapMousePointer.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};