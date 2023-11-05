//=============================================================================
// FontEditor.js
//=============================================================================

/*:
* This plugin overwrites the default behaviour of Window_Base.
* Use more than one font name separated by a comma to auto search for the
* next font if preceding cannot be found.
* Window_Base functions overwritten: standardFontFace
* standardFontSize
* resetFontSettings
* Bitmap functions redefined: drawText
*
* @plugindesc Alter the default font settings used by Window_Base and its inheritors... and load custom fonts.
* @author Traverse (31/10/2015)
*
* @param Load Custom Fonts
* @desc Add custom fonts to LOAD (not USE) here. Check Help for instructions.
* @default
*
* @param Font Name (English)
* @desc Change the default English font used by Window_Base.
* @default GameFont
*
* @param Font Size
* @desc Change the default font used by Window_Base. Default = 28.
* @default 28
*
* @param Outline Width
* @desc Change the width of the font outline. Default = 4.
* @default 4
*
* @param Outline Color
* @desc Change the color of the font outline. Default = rgba(0, 0, 0, 0.5).
* @default rgba(0, 0, 0, 0.5)
*
* @param Font Name (Japanese)
* @desc Change the default Japanese font used by Window_Base.
* @default GameFont
*
* @param Font Name (Chinese)
* @desc Change the default Chinese font used by Window_Base.
* @default SimHei, Heiti TC, sans-serif
*
* @param Font Name (Korean)
* @desc Change the default Korean font used by Window_Base.
* @default Dotum, AppleGothic, sans-serif
*
* @param Font Name (Russian)
* @desc Change the default Russian font used by Window_Base.
* @default GameFont
*
* @param Text X-Offset
* @desc Add a custom x-coordinate pixel offset to all drawn text. Use for fonts chopped off from the left. Default = 0.
* @default 0
*
* @param Text Y-Offset
* @desc Add a custom y-coordinate pixel offset to all drawn text. Use for fonts cut off from top or bottom. Default = 0.
* @default 0
*
* @help In order to use a custom font, it must first be placed in the fonts folder.
Then it must be LOADED by the game. After loading, it must be SET to be used,
either with this plugin, or another one, or by modifying the core code directly.
The format for LOADING (not SETTING) custom fonts with this plugin is:

refname,fontname/refname2,fontname2/refname3,fontname3/ect.
Example: Arial,Arial.ttf/Courier New,Courier New.ttf/ComSns,Comic Sans.ttf

Each 'refname' is a unique identifier. This is what you put in when SETTING
the font for use in the Font Name boxes of this plugin and what you will call
(as a string) if you want to set the font in a script/plugin/modification to
the core code.

Each fontname is the filename of the font you are using as it appears in the
fonts folder, and COMPLETE WITH FILE EXTENSION.

Due to how this plugin parses the strings, there must NOT be any spaces between
the commas and slashes that do not exist in the original filename.
E.g. Arial, Arial.ttf/... will NOT be loaded.
*/

(function() {
    var substrBegin = document.currentScript.src.lastIndexOf('/');
    var substrEnd = document.currentScript.src.indexOf('.js');
    var scriptName = document.currentScript.src.substring(substrBegin+1, substrEnd);
    var parameters = PluginManager.parameters(scriptName);
    
    var eng_font_name = String(parameters['Font Name (English)'] || 'GameFont');
    var jap_font_name = String(parameters['Font Name (Japanese)'] || 'GameFont');
    var cn_font_name = String(parameters['Font Name (Chinese)'] || 'SimHei, Heiti TC, sans-serif');
    var kr_font_name = String(parameters['Font Name (Korean)'] || 'Dotum, AppleGothic, sans-serif');
    var rus_font_name = String(parameters['Font Name (Russian)'] || 'GameFont');
    var font_size = Number(parameters['Font Size'] || 28);
    var font_outline_width = Number(parameters['Outline Width'] || 4);
    var font_outline_color = String(parameters['Outline Color'] || 'rgba(0, 0, 0, 0.5)');
    var draw_text_XOffset = Number(parameters['Text X-Offset'] || 0);
    var draw_text_YOffset = Number(parameters['Text Y-Offset'] || 0);
    
    var directory = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    var font_array_string = String(parameters['Load Custom Fonts']);
    var split_strings = (font_array_string.split('/'));
    var cust_font_hash = {};
    split_strings.forEach(function(x) {
    Object.defineProperty(cust_font_hash,
    x.split(',')[0], {
    value : x.split(',')[1],
    enumerable : true})
    });
    Object.keys(cust_font_hash).forEach(function(refname) {
    var fontname = cust_font_hash[refname];
    var font_dir = directory + '/fonts/' + fontname;
    console.log(refname);
    console.log(font_dir);
   // Graphics.loadFont(refname, font_dir);
    });
    
    Window_Base.prototype.standardFontFace = function() {
    if ($gameSystem.isJapanese()) {
    return jap_font_name }
    else if ($gameSystem.isChinese()) {
    return cn_font_name }
    else if ($gameSystem.isKorean()) {
    return kr_font_name }
    else if ($gameSystem.isRussian()) {
    return rus_font_name }
    else {
    return eng_font_name }
    };
    
    Window_Base.prototype.standardFontSize = function() {
    return font_size;
    };
    
    Window_Base.prototype.resetFontSettings = function() {
    this.contents.fontFace = this.standardFontFace();
    this.contents.fontSize = this.standardFontSize();
    this.resetTextColor();
    this.contents.outlineWidth = font_outline_width;
    this.contents.outlineColor = font_outline_color;
    };
    
    var _bitmap_drawtext_trav_fontedit_271015 = Bitmap.prototype.drawText;
    Bitmap.prototype.drawText = function(text, x_base, y_base, maxWidth, lineHeight, align) {
    var x = Number(x_base + draw_text_XOffset);
    var y = Number(y_base + draw_text_YOffset);
    _bitmap_drawtext_trav_fontedit_271015.call(this, text, x, y, maxWidth, lineHeight, align);
    };
    
    }) ();