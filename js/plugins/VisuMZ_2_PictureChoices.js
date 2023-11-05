//=============================================================================
// VisuStella MZ - Picture Choices
// VisuMZ_2_PictureChoices.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_PictureChoices = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PictureChoices = VisuMZ.PictureChoices || {};
VisuMZ.PictureChoices.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.00] [PictureChoices]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Page
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to create custom menus using pictures and have them work akin to
 * how "Show Choices" event commands behave? This plugin makes that possible by
 * letting you, the game dev, determine how pictures will behave when selected,
 * deselected, and tie them to the various choices in the "Show Choices" window
 * events. Create vivid menu systems with better visuals!
 *
 * Features include all (but not limited to) the following:
 * 
 * * Use Plugin Commands to determine how specific pictures (by ID or range)
 *   will behave when selected or deselected.
 * * Behaviors include easing options, position adjustments, opacity changes,
 *   blend mode differences, and tinting.
 * * Determine which pictures are bound to which choice through this plugin's
 *   newly added text codes.
 * * Hide the choice window through text codes to make the look more authentic.
 * * Works with touch controls! Hovering over pictures will select the picture
 *   and choice option!
 * * Works with keyboard controls! Even if the choice window is hidden, the
 *   keyboard will still let you scroll through the various pictures as if they
 *   were the ones arranged by the show choice options!
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Mouse Over
 * 
 * - When the mouse is hovering a picture bound to a "Show Choices" option,
 * the Choice Window will automatically select that option in the Choice Window
 * regardless of whether or not hovering is disabled for windows. This decision
 * has been made for a more intuitive user experience.
 * 
 * Pictures without any bindings will not have any effect.
 *
 * ---
 * 
 * Mouse Click
 * 
 * - When the mouse clicks on a picture bound to a "Show Choices" option, the
 * Choice Window will select that option and then prompt an "OK" handler to
 * trigger the action as long as that option is enabled. This action will occur
 * even if click select is the default selection process for windows for a more
 * intuitive user experience.
 * 
 * Pictures without any bindings will not have any effect.
 * 
 * ---
 *
 * ============================================================================
 * Usage Instructions
 * ============================================================================
 *
 * For a quick run through on how to use this plugin properly, follow the
 * instructions listed below, separated into various steps.
 *
 * ---
 *
 * Step 1:
 *
 * - Put out "Show Picture" events where you want them. 
 * - Create their initial positions, their ID's, their images used, and their
 *   origins decided.
 *
 * ---
 * 
 * Step 2:
 * 
 * - Use Plugin Commands for "Picture Settings: Change ID(s)" or the
 *   "Picture Settings: Change Range".
 * - This is used to change how images look when selected or deselected either
 *   by mouse cursor or by keyboard.
 * 
 * *NOTE* Steps 1 and 2 are interchangeable but works best with "Show Picture"
 * before the Plugin Commands.
 * 
 * ---
 * 
 * Step 3:
 * 
 * - Use "Show Choices" event command.
 * - For each Show Choice event command, use the following notetag:
 * 
 *   <Bind Picture: id> where 'id' is the picture ID to bind that choice to.
 * 
 * - ie: <Bind Picture: 3> will have that choice be tied to picture ID 3.
 * 
 * ---
 * 
 * Step 4 (Optional):
 * 
 * - Insert <Hide Choice Window> text code somewhere in the choice list
 *   (doesn't matter where) to hide the choice list window.
 * - This step is optional.
 * 
 * ---
 * 
 * Step 5:
 * 
 * - At the very end, use the Plugin Commands "Clear: All Selection Settings"
 *   or "Clear: Picture ID(s) Selection Settings" or "Clear: Picture Range
 *   Selection Settings" to remove their on select or on deselect changes.
 * - Erase picture will do the same to them.
 * - This is to clear the binding settings so that they do not affect other
 *   "Show Choices" event commands.
 * - This step is optional IF you have the Plugin Parameter "Auto Clear" set
 *   to "true". "Auto Clear" will trigger whenever the OK Handler or Cancel
 *   Handler is processed.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Picture Choice-Related Text Codes ===
 * 
 * ---
 *
 * --------------------   -----------------------------------------------------
 * Text Code              Effect (Show Choice Text Only)
 * --------------------   -----------------------------------------------------
 * 
 * <Bind Picture: id>     Replace 'id' with a Picture ID to bind the choice to.
 *                        If the choice is selected or deselected, the bound
 *                        picture will alter its look accordingly.
 * 
 * <Hide Choice Window>   Hides the Choice Window from view. This is so that if
 *                        any Picture Choices are visible, the screen won't
 *                        look extremely repetitive. Insert this into any of
 *                        the choices. Only once is needed.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Clear Plugin Commands ===
 * 
 * ---
 *
 * Clear: All Selection Settings
 * - Clears all selection settings for all pictures 1 through 100.
 *
 * ---
 *
 * Clear: Picture ID(s) Selection Settings
 * - Clears all selection settings for the ID'd pictures.
 *
 *   Picture ID(s):
 *   - Select which Picture ID(s) to clear.
 *
 * ---
 *
 * Clear: Picture Range Selection Settings
 * - Clears all selection settings for the picture ID's in range.
 *
 *   Starting ID:
 *   - The starting ID of the picture binds to clear.
 *
 *   Ending ID:
 *   - The ending ID of the picture binds to clear.
 *
 * ---
 * 
 * === Picture Settings Plugin Commands ===
 * 
 * ---
 *
 * Picture Settings: Change ID(s)
 * - Changes select and deselect settings for the picture ID(s).
 * 
 *   Step 1:
 *
 *     Picture ID(s):
 *     - Select which Picture ID(s) to change settings for.
 * 
 *   Step 2:
 *
 *     On Select Settings:
 *     - Picture settings when selecting that choice.
 *
 *     On Deselect Settings:
 *     - Picture settings when deselecting that choice.
 *
 * ---
 *
 * Picture Settings: Change ID(s)
 * - Changes select and deselect settings for the picture ID(s).
 * 
 *   Step 1:
 *
 *     Starting ID:
 *     - The starting ID of the picture binds to clear.
 *
 *     Ending ID:
 *     - The ending ID of the picture binds to clear.
 * 
 *   Step 2:
 *
 *     On Select Settings:
 *     - Picture settings when selecting that choice.
 *
 *     On Deselect Settings:
 *     - Picture settings when deselecting that choice.
 *
 * ---
 *
 * Picture Settings
 * - These are the settings used for "On Select" and "On Deselect" settings.
 * 
 *   Easing:
 *
 *     Duration:
 *     - Insert a number to determine duration of the changed settings when
 *       applied.
 *
 *     Easing Type:
 *     - Select which easing type you wish to apply.
 *     - Many of these choices require VisuMZ_0_CoreEngine.
 * 
 *   Position:
 *
 *     Target X:
 *     Target Y:
 *     - Insert a number to determine new X/Y position.
 *     - Use 'Unchanged' to not change the X/Y position.
 *
 *     Target Width %:
 *     Target Height %:
 *     - Insert a number to determine new width/height.
 *     - 'Unchanged' for no changes.
 *     - For 100%, use 100.
 * 
 *   Blend:
 *
 *     Target Opacity:
 *     - Insert a number to determine new opacity level.
 *     - 'Unchanged' for no changes.
 *     - Use a number between 0 and 255.
 *
 *     Blend Mode:
 *     - What kind of blend mode do you wish to apply to the picture?
 * 
 *   Tone:
 *
 *     Target Tone Red:
 *     Target Tone Green:
 *     Target Tone Blue:
 *     - Insert a number to determine new red/green/blue tone tint.
 *     - 'Unchanged' for no changes.
 *     - Use a number between -255 and 255.
 *
 *     Target Tone Gray:
 *     - Insert a number to determine new red/green/blue tone tint.
 *     - 'Unchanged' for no changes.
 *     - Use a number between 0 and 255.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The majority of the settings are unique to the Plugin Commands and not the
 * Plugin Parameters. However, the Plugin Parameters can be used as a quality
 * of life to reduce the amount of work needed if one wants to enable the
 * "Auto Clear" option to reduce steps needed.
 *
 * ---
 *
 * General
 * 
 *   Auto Clear:
 *   - Automatically clear picture selection settings after each Show Choice
 *     command is done?
 *   - Erase picture will do the same to them.
 *   - This is to clear the binding settings so that they do not affect other
 *     "Show Choices" event commands.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.00 Official Release Date: July 5, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command ClearAll
 * @text Clear: All Selection Settings
 * @desc Clears all selection settings for all pictures 1 through 100.
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command ClearPictureID
 * @text Clear: Picture ID(s) Selection Settings
 * @desc Clears all selection settings for the ID'd pictures.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc Select which Picture ID(s) to clear.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command ClearPictureRange
 * @text Clear: Picture Range Selection Settings
 * @desc Clears all selection settings for the picture ID's in range.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the picture binds to clear.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the picture binds to clear.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command ChangePictureChoiceSettingsOne
 * @text Picture Settings: Change ID(s)
 * @desc Changes select and deselect settings for the picture ID(s).
 * 
 * @arg Step1
 * @text Step 1
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @parent Step1
 * @type number[]
 * @min 1
 * @max 100
 * @desc Select which Picture ID(s) to change settings for.
 * @default ["1"]
 * 
 * @arg Step2
 * @text Step 2
 *
 * @arg OnSelectSettings:struct
 * @text On Select Settings
 * @parent Step2
 * @type struct<Picture>
 * @desc Picture settings when selecting that choice.
 * @default {"Easing":"","Duration:num":"10","easingType:str":"Linear","Position":"","TargetX:str":"Unchanged","TargetY:str":"Unchanged","TargetScaleX:str":"Unchanged","TargetScaleY:str":"Unchanged","Blend":"","TargetOpacity:str":"Unchanged","BlendMode:num":"-1","Tone":"","TargetToneRed:str":"Unchanged","TargetToneGreen:str":"Unchanged","TargetToneBlue:str":"Unchanged","TargetToneGray:str":"Unchanged"}
 *
 * @arg OnDeselectSettings:struct
 * @text On Deselect Settings
 * @parent Step2
 * @type struct<Picture>
 * @desc Picture settings when deselecting that choice.
 * @default {"Easing":"","Duration:num":"10","easingType:str":"Linear","Position":"","TargetX:str":"Unchanged","TargetY:str":"Unchanged","TargetScaleX:str":"Unchanged","TargetScaleY:str":"Unchanged","Blend":"","TargetOpacity:str":"Unchanged","BlendMode:num":"-1","Tone":"","TargetToneRed:str":"Unchanged","TargetToneGreen:str":"Unchanged","TargetToneBlue:str":"Unchanged","TargetToneGray:str":"Unchanged"}
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command ChangePictureChoiceSettingsRange
 * @text Picture Settings: Change Range
 * @desc Changes select and deselect settings for the picture ID's in range.
 * 
 * @arg Step1
 * @text Step 1
 *
 * @arg StartID:num
 * @text Starting ID
 * @parent Step1
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to change settings for.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @parent Step1
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to change settings for.
 * @default 100
 * 
 * @arg Step2
 * @text Step 2
 *
 * @arg OnSelectSettings:struct
 * @text On Select Settings
 * @parent Step2
 * @type struct<Picture>
 * @desc Picture settings when selecting that choice.
 * @default {"Easing":"","Duration:num":"10","easingType:str":"Linear","Position":"","TargetX:str":"Unchanged","TargetY:str":"Unchanged","TargetScaleX:str":"Unchanged","TargetScaleY:str":"Unchanged","Blend":"","TargetOpacity:str":"Unchanged","BlendMode:num":"-1","Tone":"","TargetToneRed:str":"Unchanged","TargetToneGreen:str":"Unchanged","TargetToneBlue:str":"Unchanged","TargetToneGray:str":"Unchanged"}
 *
 * @arg OnDeselectSettings:struct
 * @text On Deselect Settings
 * @parent Step2
 * @type struct<Picture>
 * @desc Picture settings when deselecting that choice.
 * @default {"Easing":"","Duration:num":"10","easingType:str":"Linear","Position":"","TargetX:str":"Unchanged","TargetY:str":"Unchanged","TargetScaleX:str":"Unchanged","TargetScaleY:str":"Unchanged","Blend":"","TargetOpacity:str":"Unchanged","BlendMode:num":"-1","Tone":"","TargetToneRed:str":"Unchanged","TargetToneGreen:str":"Unchanged","TargetToneBlue:str":"Unchanged","TargetToneGray:str":"Unchanged"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param PictureChoices
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoClear:eval
 * @text Auto Clear
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically clear picture selection settings after
 * each Show Choice command is done?
 * @default true
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Picture:
 *
 * @param Easing
 *
 * @param Duration:num
 * @text Duration
 * @parent Easing
 * @desc Insert a number to determine duration of the
 * changed settings when applied.
 * @default 10
 *
 * @param easingType:str
 * @text Easing Type
 * @parent Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Many of these choices require VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @param Position
 *
 * @param TargetX:str
 * @text Target X
 * @parent Position
 * @desc Insert a number to determine new X position.
 * Use 'Unchanged' to not change the X position.
 * @default Unchanged
 *
 * @param TargetY:str
 * @text Target Y
 * @parent Position
 * @desc Insert a number to determine new Y position.
 * Use 'Unchanged' to not change the Y position.
 * @default Unchanged
 *
 * @param TargetScaleX:str
 * @text Target Width %
 * @parent Position
 * @desc Insert a number to determine new width.
 * 'Unchanged' for no changes. For 100%, use 100.
 * @default Unchanged
 *
 * @param TargetScaleY:str
 * @text Target Height %
 * @parent Position
 * @desc Insert a number to determine new height.
 * 'Unchanged' for no changes. For 100%, use 100.
 * @default Unchanged
 * 
 * @param Blend
 *
 * @param TargetOpacity:str
 * @text Target Opacity
 * @parent Blend
 * @desc Insert a number to determine new opacity level.
 * 'Unchanged' for no changes. Use a number between 0 and 255.
 * @default Unchanged
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option -1 - Unchanged
 * @value -1
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default -1
 * 
 * @param Tone
 * @text Tone/Tint
 *
 * @param TargetToneRed:str
 * @text Target Tone Red
 * @parent Tone
 * @desc Insert a number to determine new red tone tint.
 * 'Unchanged' for no changes. Use a number between -255 and 255.
 * @default Unchanged
 *
 * @param TargetToneGreen:str
 * @text Target Tone Green
 * @parent Tone
 * @desc Insert a number to determine new green tone tint.
 * 'Unchanged' for no changes. Use a number between -255 and 255.
 * @default Unchanged
 *
 * @param TargetToneBlue:str
 * @text Target Tone Blue
 * @parent Tone
 * @desc Insert a number to determine new blue tone tint.
 * 'Unchanged' for no changes. Use a number between -255 and 255.
 * @default Unchanged
 *
 * @param TargetToneGray:str
 * @text Target Tone Gray
 * @parent Tone
 * @desc Insert a number to determine new gray tone tint.
 * 'Unchanged' for no changes. Use a number between 0 and 255.
 * @default Unchanged
 *
 */
//=============================================================================

const _0x219a=['applyPictureChoiceSelectSettings','_instantPictureChoiceSelect','PvWno','applyPictureChoiceSettings','active','TargetToneGreen','FwEil','1145121FVvNMK','ClearPictureRange','ARRAYEVAL','WjFiV','_choiceListWindow','unchanged','ChangePictureChoiceSettingsRange','2vGQgzO','replace','_targetY','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','makeDeepCopy','setPictureChoiceDeselectedSettings','insine','mJDKw','call','_targetScaleY','map','Window_ChoiceList_makeCommandList','setEasingType','applyPictureChoiceBindings','Window_Selectable_select','TargetToneGray','scale','_pictureChoiceBinding','clone','oeEyl','Settings','showPicture','Game_Screen_showPicture','max','BfRsd','5201ctkisq','Game_Screen_initialize','ARRAYSTR','TargetToneRed','OBcJx','_toneDuration','_pictureChoiceDeselected','exit','toLowerCase','Dikks','_wholeDuration','OnSelectSettings','processOk','PictureChoices','index','50255xPtOKa','aDJcS','initialize','parse','587LDCkvi','_duration','ARRAYFUNC','status','applyHideChoiceWindow','JzbCg','TargetY','msllN','onClick','317MDzobc','Window_ChoiceList_selectDefault','yDZGR','prototype','ChangePictureChoiceSettingsOne','EndingID','TargetX','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','hasPictureChoiceBinding','choices','NUM','nMdom','selectDefault','clearPictureChoiceID','registerCommand','_tone','34095HXQJWT','name','pictureChoiceSelect','parameters','applyPictureChoiceDeselectSettings','playCursorSound','mIvqr','ARRAYNUM','clearPictureChoices','Duration','erasePicture','min','PictureIDs','autoClearPictureChoices','Sprite_Clickable_onClick','easingType','Linear','Sprite_Clickable_onMouseEnter','picture','ClearPictureID','clamp','makeCommandList','sAQxj','_pictureChoicesHidden','Window_ChoiceList','onSelectPictureChoices','return\x200','format','setPictureChoiceSelectedSettings','linear','Keerg','EfBFD','TargetScaleX','select','version','callCancelHandler','552105jCztKs','onMouseEnterPictureChoice','OnDeselectSettings','_list','StartID','EVAL','_pictureId','addPictureChoiceBinding','STR','trim','hkRtp','uHwYs','ConvertParams','onClickPictureChoice','Window_ChoiceList_callOkHandler','getPictureChoiceSelectedSettings','_scene','429530OvdbhL','Window_ChoiceList_callCancelHandler','getPictureChoiceBinding','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','match','onMouseEnter','QQtCG','Unchanged','_toneTarget','BlendMode','getPictureChoiceDeselectedSettings','_blendMode','callOkHandler','TNcgL','TargetScaleY','filter','_easingType','update','_pictureChoiceSelected','TargetToneBlue','vzkBo','TargetOpacity','Game_Screen_erasePicture'];const _0x25efcc=_0x2d7c;(function(_0x13d642,_0x2c1311){const _0x2090ed=_0x2d7c;while(!![]){try{const _0xca75fc=-parseInt(_0x2090ed(0xcf))+parseInt(_0x2090ed(0x83))+-parseInt(_0x2090ed(0xb2))+parseInt(_0x2090ed(0xa3))+parseInt(_0x2090ed(0x104))+-parseInt(_0x2090ed(0xbf))*-parseInt(_0x2090ed(0xb6))+parseInt(_0x2090ed(0x8a))*-parseInt(_0x2090ed(0xf3));if(_0xca75fc===_0x2c1311)break;else _0x13d642['push'](_0x13d642['shift']());}catch(_0x5564be){_0x13d642['push'](_0x13d642['shift']());}}}(_0x219a,0x8cf5b));function _0x2d7c(_0x680d0b,_0x2862fa){return _0x2d7c=function(_0x219af0,_0x2d7c4e){_0x219af0=_0x219af0-0x69;let _0x3d1ee6=_0x219a[_0x219af0];return _0x3d1ee6;},_0x2d7c(_0x680d0b,_0x2862fa);}var label='PictureChoices',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x25efcc(0x74)](function(_0x3a1b54){const _0x535770=_0x25efcc;return _0x3a1b54[_0x535770(0xb9)]&&_0x3a1b54['description']['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x25efcc(0x9e)]||{},VisuMZ[_0x25efcc(0xff)]=function(_0x11cae6,_0x33c519){const _0x5d96f9=_0x25efcc;for(const _0x14d9db in _0x33c519){if(_0x5d96f9(0x91)!==_0x5d96f9(0x82)){if(_0x14d9db[_0x5d96f9(0x69)](/(.*):(.*)/i)){const _0x298d3b=String(RegExp['$1']),_0x2ee8c1=String(RegExp['$2'])['toUpperCase']()[_0x5d96f9(0xfc)]();let _0x2bd9e9,_0x565195,_0x5966fc;switch(_0x2ee8c1){case _0x5d96f9(0xc9):_0x2bd9e9=_0x33c519[_0x14d9db]!==''?Number(_0x33c519[_0x14d9db]):0x0;break;case _0x5d96f9(0xd6):_0x565195=_0x33c519[_0x14d9db]!==''?JSON[_0x5d96f9(0xb5)](_0x33c519[_0x14d9db]):[],_0x2bd9e9=_0x565195['map'](_0x79f8fe=>Number(_0x79f8fe));break;case _0x5d96f9(0xf8):_0x2bd9e9=_0x33c519[_0x14d9db]!==''?eval(_0x33c519[_0x14d9db]):null;break;case _0x5d96f9(0x85):_0x565195=_0x33c519[_0x14d9db]!==''?JSON[_0x5d96f9(0xb5)](_0x33c519[_0x14d9db]):[],_0x2bd9e9=_0x565195[_0x5d96f9(0x94)](_0x55ec5b=>eval(_0x55ec5b));break;case'JSON':_0x2bd9e9=_0x33c519[_0x14d9db]!==''?JSON[_0x5d96f9(0xb5)](_0x33c519[_0x14d9db]):'';break;case'ARRAYJSON':_0x565195=_0x33c519[_0x14d9db]!==''?JSON[_0x5d96f9(0xb5)](_0x33c519[_0x14d9db]):[],_0x2bd9e9=_0x565195['map'](_0x13ed0b=>JSON['parse'](_0x13ed0b));break;case'FUNC':_0x2bd9e9=_0x33c519[_0x14d9db]!==''?new Function(JSON[_0x5d96f9(0xb5)](_0x33c519[_0x14d9db])):new Function(_0x5d96f9(0xe9));break;case _0x5d96f9(0xb8):_0x565195=_0x33c519[_0x14d9db]!==''?JSON['parse'](_0x33c519[_0x14d9db]):[],_0x2bd9e9=_0x565195[_0x5d96f9(0x94)](_0x4ca07d=>new Function(JSON['parse'](_0x4ca07d)));break;case _0x5d96f9(0xfb):_0x2bd9e9=_0x33c519[_0x14d9db]!==''?String(_0x33c519[_0x14d9db]):'';break;case _0x5d96f9(0xa5):_0x565195=_0x33c519[_0x14d9db]!==''?JSON[_0x5d96f9(0xb5)](_0x33c519[_0x14d9db]):[],_0x2bd9e9=_0x565195[_0x5d96f9(0x94)](_0x14650c=>String(_0x14650c));break;case'STRUCT':_0x5966fc=_0x33c519[_0x14d9db]!==''?JSON[_0x5d96f9(0xb5)](_0x33c519[_0x14d9db]):{},_0x2bd9e9=VisuMZ[_0x5d96f9(0xff)]({},_0x5966fc);break;case'ARRAYSTRUCT':_0x565195=_0x33c519[_0x14d9db]!==''?JSON['parse'](_0x33c519[_0x14d9db]):[],_0x2bd9e9=_0x565195[_0x5d96f9(0x94)](_0x3fbd8f=>VisuMZ[_0x5d96f9(0xff)]({},JSON['parse'](_0x3fbd8f)));break;default:continue;}_0x11cae6[_0x298d3b]=_0x2bd9e9;}}else this['clearPictureChoices']();}return _0x11cae6;},(_0x591f39=>{const _0x5a6d6d=_0x25efcc,_0x2cef3f=_0x591f39[_0x5a6d6d(0xd0)];for(const _0x22c4ba of dependencies){if(!Imported[_0x22c4ba]){alert(_0x5a6d6d(0x8d)[_0x5a6d6d(0xea)](_0x2cef3f,_0x22c4ba)),SceneManager[_0x5a6d6d(0xaa)]();break;}}const _0x45555a=_0x591f39['description'];if(_0x45555a[_0x5a6d6d(0x69)](/\[Version[ ](.*?)\]/i)){const _0x5b265e=Number(RegExp['$1']);_0x5b265e!==VisuMZ[label][_0x5a6d6d(0xf1)]&&(_0x5a6d6d(0x7e)!==_0x5a6d6d(0xca)?(alert(_0x5a6d6d(0xc6)[_0x5a6d6d(0xea)](_0x2cef3f,_0x5b265e)),SceneManager[_0x5a6d6d(0xaa)]()):this['clearPictureChoices']());}if(_0x45555a[_0x5a6d6d(0x69)](/\[Tier[ ](\d+)\]/i)){if(_0x5a6d6d(0xfe)===_0x5a6d6d(0xfd))this[_0x5a6d6d(0xd7)]();else{const _0x455233=Number(RegExp['$1']);_0x455233<tier?(alert(_0x5a6d6d(0x107)[_0x5a6d6d(0xea)](_0x2cef3f,_0x455233,tier)),SceneManager[_0x5a6d6d(0xaa)]()):tier=Math[_0x5a6d6d(0xa1)](_0x455233,tier);}}VisuMZ[_0x5a6d6d(0xff)](VisuMZ[label][_0x5a6d6d(0x9e)],_0x591f39[_0x5a6d6d(0xd2)]);})(pluginData),PluginManager[_0x25efcc(0xcd)](pluginData['name'],'ClearAll',_0x478b6a=>{const _0x271c17=_0x25efcc;$gameScreen[_0x271c17(0xd7)]();}),PluginManager[_0x25efcc(0xcd)](pluginData[_0x25efcc(0xd0)],_0x25efcc(0xe2),_0x51c0b5=>{const _0x1b3934=_0x25efcc;VisuMZ[_0x1b3934(0xff)](_0x51c0b5,_0x51c0b5);const _0x47cd2e=_0x51c0b5[_0x1b3934(0xdb)];for(const _0x586e34 of _0x47cd2e){if(_0x1b3934(0xee)!==_0x1b3934(0xee)){const _0x235452=_0x137e92[_0x1b3934(0x103)],_0x4403ad=_0x235452[_0x1b3934(0x87)],_0x54c64a=_0x8463bb[_0x1b3934(0x106)](this['_pictureId']);_0x4403ad['select'](_0x54c64a),_0x4403ad[_0x1b3934(0xaf)]();}else $gameScreen[_0x1b3934(0xcc)](_0x586e34);}}),PluginManager[_0x25efcc(0xcd)](pluginData[_0x25efcc(0xd0)],_0x25efcc(0x84),_0x1cc598=>{const _0x385df8=_0x25efcc;VisuMZ['ConvertParams'](_0x1cc598,_0x1cc598);const _0x22e4b7=Math[_0x385df8(0xda)](_0x1cc598[_0x385df8(0xf7)],_0x1cc598[_0x385df8(0xc4)]),_0x3b18e0=Math[_0x385df8(0xa1)](_0x1cc598[_0x385df8(0xf7)],_0x1cc598['EndingID']);for(let _0x9e14e5=_0x22e4b7;_0x9e14e5<=_0x3b18e0;_0x9e14e5++){_0x385df8(0xc1)===_0x385df8(0xac)?(this[_0x385df8(0x6d)][0x2]=_0x520fec(_0x5c8f7a[_0x385df8(0x78)])[_0x385df8(0xe3)](-0xff,0xff),_0x3ec0bf=!![]):$gameScreen[_0x385df8(0xcc)](_0x9e14e5);}}),PluginManager[_0x25efcc(0xcd)](pluginData[_0x25efcc(0xd0)],_0x25efcc(0xc3),_0x2a3d55=>{const _0x49af92=_0x25efcc;VisuMZ[_0x49af92(0xff)](_0x2a3d55,_0x2a3d55);const _0x396799=_0x2a3d55[_0x49af92(0xdb)],_0x3f7cb3=_0x2a3d55[_0x49af92(0xae)],_0x85c50d=_0x2a3d55[_0x49af92(0xf5)];for(const _0x2af07b of _0x396799){_0x49af92(0x6b)!==_0x49af92(0xb3)?($gameScreen[_0x49af92(0xeb)](_0x2af07b,_0x3f7cb3,![]),$gameScreen[_0x49af92(0x8f)](_0x2af07b,_0x85c50d,!![])):(_0x14e936[_0x49af92(0xb0)][_0x49af92(0xe0)][_0x49af92(0x92)](this),this[_0x49af92(0xc7)]()&&this[_0x49af92(0xf4)]());}}),PluginManager[_0x25efcc(0xcd)](pluginData[_0x25efcc(0xd0)],_0x25efcc(0x89),_0x49ed27=>{const _0x4a245f=_0x25efcc;VisuMZ[_0x4a245f(0xff)](_0x49ed27,_0x49ed27);const _0x23f605=Math[_0x4a245f(0xda)](_0x49ed27['StartID'],_0x49ed27[_0x4a245f(0xc4)]),_0x1d09c3=Math[_0x4a245f(0xa1)](_0x49ed27[_0x4a245f(0xf7)],_0x49ed27['EndingID']),_0xbaee9c=_0x49ed27[_0x4a245f(0xae)],_0x4774c7=_0x49ed27['OnDeselectSettings'];for(let _0x46ddaf=_0x23f605;_0x46ddaf<=_0x1d09c3;_0x46ddaf++){$gameScreen[_0x4a245f(0xeb)](_0x46ddaf,_0xbaee9c,![]),$gameScreen['setPictureChoiceDeselectedSettings'](_0x46ddaf,_0x4774c7,!![]);}}),VisuMZ[_0x25efcc(0xb0)][_0x25efcc(0xa4)]=Game_Screen[_0x25efcc(0xc2)]['initialize'],Game_Screen[_0x25efcc(0xc2)][_0x25efcc(0xb4)]=function(){const _0x4d29b1=_0x25efcc;VisuMZ[_0x4d29b1(0xb0)][_0x4d29b1(0xa4)][_0x4d29b1(0x92)](this),this[_0x4d29b1(0xd7)]();},Game_Screen['prototype'][_0x25efcc(0xd7)]=function(){const _0x510cc6=_0x25efcc;this['_pictureChoiceBinding']={},this['_pictureChoiceSelected']={},this[_0x510cc6(0xa9)]={};},Game_Screen[_0x25efcc(0xc2)][_0x25efcc(0xcc)]=function(_0x2ab09f){const _0x1cd936=_0x25efcc;this[_0x1cd936(0x77)]===undefined&&this[_0x1cd936(0xd7)](),this[_0x1cd936(0xa9)]===undefined&&this[_0x1cd936(0xd7)](),this[_0x1cd936(0x77)]===undefined&&this['clearPictureChoices'](),delete this['_pictureChoiceBinding'][_0x2ab09f],delete this[_0x1cd936(0x77)][_0x2ab09f],delete this[_0x1cd936(0xa9)][_0x2ab09f];},VisuMZ[_0x25efcc(0xb0)][_0x25efcc(0x7b)]=Game_Screen[_0x25efcc(0xc2)][_0x25efcc(0xd9)],Game_Screen[_0x25efcc(0xc2)][_0x25efcc(0xd9)]=function(_0x4e5c75){const _0xae2d3=_0x25efcc;VisuMZ[_0xae2d3(0xb0)][_0xae2d3(0x7b)][_0xae2d3(0x92)](this,_0x4e5c75),this[_0xae2d3(0xcc)](_0x4e5c75);},Game_Screen['prototype'][_0x25efcc(0x106)]=function(_0x358c12){const _0x302aaf=_0x25efcc;this[_0x302aaf(0x77)]===undefined&&this['clearPictureChoices']();const _0x2aaf97=this[_0x302aaf(0x9b)];return _0x2aaf97[_0x358c12]??-0x2;},Game_Screen[_0x25efcc(0xc2)][_0x25efcc(0xfa)]=function(_0x3c60fa,_0x239ba0){const _0x1054f1=_0x25efcc;this[_0x1054f1(0x77)]===undefined&&this[_0x1054f1(0xd7)]();const _0x145693=this[_0x1054f1(0x9b)];_0x145693[_0x3c60fa]=_0x239ba0;},Game_Screen[_0x25efcc(0xc2)]['getPictureChoiceSelectedSettings']=function(_0x2a9d5b){const _0x531afe=_0x25efcc;this[_0x531afe(0xa9)]===undefined&&(_0x531afe(0xbb)!==_0x531afe(0xe5)?this[_0x531afe(0xd7)]():(_0x38c280('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x531afe(0xea)](_0x1ac3bc,_0x6e0cb4)),_0x15fa71[_0x531afe(0xaa)]()));const _0x5f266e=this[_0x531afe(0x77)];return _0x5f266e[_0x2a9d5b]=_0x5f266e[_0x2a9d5b]||{'Duration':0xa,'easingType':_0x531afe(0xdf),'TargetX':'Unchanged','TargetY':_0x531afe(0x6c),'TargetScaleX':_0x531afe(0x6c),'TargetScaleY':_0x531afe(0x6c),'TargetOpacity':_0x531afe(0x6c),'BlendMode':-0x1,'TargetToneRed':_0x531afe(0x6c),'TargetToneGreen':_0x531afe(0x6c),'TargetToneBlue':_0x531afe(0x6c),'TargetToneGray':_0x531afe(0x6c)},_0x5f266e[_0x2a9d5b];},Game_Screen[_0x25efcc(0xc2)][_0x25efcc(0xeb)]=function(_0x2eac48,_0x2a4321){const _0x4cef11=_0x25efcc;this[_0x4cef11(0xa9)]===undefined&&(_0x4cef11(0xed)!==_0x4cef11(0xed)?(this[_0x4cef11(0xf4)](),this[_0x4cef11(0x100)]()):this[_0x4cef11(0xd7)]());const _0x50c327=this['_pictureChoiceSelected'];_0x50c327[_0x2eac48]=JsonEx[_0x4cef11(0x8e)](_0x2a4321);},Game_Screen['prototype']['getPictureChoiceDeselectedSettings']=function(_0x12bfb8){const _0x27883b=_0x25efcc;this[_0x27883b(0xa9)]===undefined&&this['clearPictureChoices']();const _0x34d5b4=this[_0x27883b(0xa9)];return _0x34d5b4[_0x12bfb8]=_0x34d5b4[_0x12bfb8]||{'Duration':0xa,'easingType':_0x27883b(0xdf),'TargetX':_0x27883b(0x6c),'TargetY':_0x27883b(0x6c),'TargetScaleX':_0x27883b(0x6c),'TargetScaleY':'Unchanged','TargetOpacity':'Unchanged','BlendMode':-0x1,'TargetToneRed':_0x27883b(0x6c),'TargetToneGreen':_0x27883b(0x6c),'TargetToneBlue':_0x27883b(0x6c),'TargetToneGray':_0x27883b(0x6c)},_0x34d5b4[_0x12bfb8];},Game_Screen[_0x25efcc(0xc2)][_0x25efcc(0x8f)]=function(_0x3a7c76,_0x345584){const _0xc7256d=_0x25efcc;this[_0xc7256d(0xa9)]===undefined&&this[_0xc7256d(0xd7)]();const _0x5a1770=this[_0xc7256d(0xa9)];_0x5a1770[_0x3a7c76]=JsonEx[_0xc7256d(0x8e)](_0x345584);},Game_Screen[_0x25efcc(0xc2)][_0x25efcc(0x7c)]=function(_0x73fb72,_0x4b53fe){const _0x12eaaa=_0x25efcc,_0x367277=this[_0x12eaaa(0xe1)](_0x73fb72);if(!_0x367277)return;const _0x59ed75=this[_0x12eaaa(0x102)](_0x73fb72);_0x367277[_0x12eaaa(0x7f)](_0x59ed75,_0x4b53fe);},Game_Screen[_0x25efcc(0xc2)]['applyPictureChoiceDeselectSettings']=function(_0x245cb6,_0x48a6eb){const _0x3252f3=_0x25efcc,_0x1c5b4f=this[_0x3252f3(0xe1)](_0x245cb6);if(!_0x1c5b4f)return;const _0x152189=this[_0x3252f3(0x6f)](_0x245cb6);_0x1c5b4f[_0x3252f3(0x7f)](_0x152189,_0x48a6eb);},VisuMZ['PictureChoices']['Game_Screen_showPicture']=Game_Screen['prototype'][_0x25efcc(0x9f)],Game_Screen[_0x25efcc(0xc2)][_0x25efcc(0x9f)]=function(_0x3e14b5,_0x11e493,_0x18a8a1,_0xb7d5ad,_0x1a1b3d,_0x4740f4,_0x5d8fdf,_0x47fabb,_0x4a5ac6){const _0x35bff9=_0x25efcc;this[_0x35bff9(0xa9)]===undefined&&this[_0x35bff9(0xd7)]();VisuMZ['PictureChoices'][_0x35bff9(0xa0)]['call'](this,_0x3e14b5,_0x11e493,_0x18a8a1,_0xb7d5ad,_0x1a1b3d,_0x4740f4,_0x5d8fdf,_0x47fabb,_0x4a5ac6);if(this['_pictureChoiceDeselected'][_0x3e14b5]){if('TNcgL'===_0x35bff9(0x72))this['applyPictureChoiceDeselectSettings'](_0x3e14b5,!![]);else{this['_duration']=0x1,this[_0x35bff9(0xad)]=0x1;if(_0x595746)this['_toneDuration']=0x1;this[_0x35bff9(0x76)]();}}},Game_Picture['prototype']['applyPictureChoiceSettings']=function(_0x23ce77,_0x3fd7ba){const _0x819bb6=_0x25efcc;if(!_0x23ce77)return;if(Imported['VisuMZ_0_CoreEngine'])this[_0x819bb6(0x75)]=0x0,this[_0x819bb6(0x96)](_0x23ce77[_0x819bb6(0xde)]);else{if('kvmeN'==='zUxpz')_0x2a4206[_0x819bb6(0xcc)](_0x49eb0f);else{const _0x5e9d55=_0x23ce77[_0x819bb6(0xde)]['toLowerCase']()[_0x819bb6(0xfc)]();this[_0x819bb6(0x75)]=[_0x819bb6(0xec),_0x819bb6(0x90),'outsine','inoutsine']['indexOf'](_0x5e9d55)||0x0;}}if(_0x23ce77[_0x819bb6(0xc5)][_0x819bb6(0xab)]()[_0x819bb6(0xfc)]()!=='unchanged')this['_targetX']=eval(_0x23ce77[_0x819bb6(0xc5)]);if(_0x23ce77[_0x819bb6(0xbc)]['toLowerCase']()[_0x819bb6(0xfc)]()!==_0x819bb6(0x88))this[_0x819bb6(0x8c)]=eval(_0x23ce77['TargetY']);if(_0x23ce77[_0x819bb6(0xef)]['toLowerCase']()[_0x819bb6(0xfc)]()!==_0x819bb6(0x88))this['_targetScaleX']=eval(_0x23ce77[_0x819bb6(0xef)]);if(_0x23ce77[_0x819bb6(0x73)][_0x819bb6(0xab)]()[_0x819bb6(0xfc)]()!==_0x819bb6(0x88))this[_0x819bb6(0x93)]=eval(_0x23ce77[_0x819bb6(0x73)]);if(_0x23ce77['TargetOpacity']['toLowerCase']()[_0x819bb6(0xfc)]()!=='unchanged')this['_targetOpacity']=eval(_0x23ce77[_0x819bb6(0x7a)]);if(_0x23ce77['BlendMode']>=0x0)this[_0x819bb6(0x70)]=_0x23ce77[_0x819bb6(0x6e)];let _0x49a098=![];if(!this['_tone'])this['_tone']=[0x0,0x0,0x0,0x0];this[_0x819bb6(0x6d)]=this[_0x819bb6(0xce)][_0x819bb6(0x9c)]();_0x23ce77[_0x819bb6(0xa6)][_0x819bb6(0xab)]()[_0x819bb6(0xfc)]()!==_0x819bb6(0x88)&&('gBbMG'==='Aqltl'?_0x24342c[_0x819bb6(0xd3)](_0x105388,_0x34023b):(this[_0x819bb6(0x6d)][0x0]=eval(_0x23ce77[_0x819bb6(0xa6)])[_0x819bb6(0xe3)](-0xff,0xff),_0x49a098=!![]));_0x23ce77[_0x819bb6(0x81)][_0x819bb6(0xab)]()['trim']()!==_0x819bb6(0x88)&&(this[_0x819bb6(0x6d)][0x1]=eval(_0x23ce77['TargetToneGreen'])[_0x819bb6(0xe3)](-0xff,0xff),_0x49a098=!![]);_0x23ce77[_0x819bb6(0x78)][_0x819bb6(0xab)]()['trim']()!==_0x819bb6(0x88)&&(this[_0x819bb6(0x6d)][0x2]=eval(_0x23ce77[_0x819bb6(0x78)])[_0x819bb6(0xe3)](-0xff,0xff),_0x49a098=!![]);if(_0x23ce77['TargetToneGray'][_0x819bb6(0xab)]()[_0x819bb6(0xfc)]()!==_0x819bb6(0x88)){if(_0x819bb6(0xa2)===_0x819bb6(0xbd)){const _0x3ba17e=_0x4de1ed(_0x561608['$1']);_0x3ba17e<_0x15e801?(_0x352ab3(_0x819bb6(0x107)[_0x819bb6(0xea)](_0x5349cf,_0x3ba17e,_0x2bd3c9)),_0x4febe5[_0x819bb6(0xaa)]()):_0x2d3eee=_0x18e4d0[_0x819bb6(0xa1)](_0x3ba17e,_0x579d73);}else this['_toneTarget'][0x3]=eval(_0x23ce77[_0x819bb6(0x99)])['clamp'](0x0,0xff),_0x49a098=!![];}if(_0x49a098)this['_toneDuration']=_0x23ce77['Duration']||0x0;this[_0x819bb6(0xb7)]=_0x23ce77[_0x819bb6(0xd8)]||0x0,this[_0x819bb6(0xad)]=_0x23ce77[_0x819bb6(0xd8)]||0x0;if(_0x3fd7ba||this[_0x819bb6(0xb7)]<=0x0){this[_0x819bb6(0xb7)]=0x1,this[_0x819bb6(0xad)]=0x1;if(_0x49a098)this[_0x819bb6(0xa8)]=0x1;this[_0x819bb6(0x76)]();}},Sprite_Clickable[_0x25efcc(0xc2)][_0x25efcc(0xc7)]=function(){const _0x25391b=_0x25efcc;if(this['constructor'][_0x25391b(0xd0)]!=='Sprite_Picture')return![];const _0x14fab2=SceneManager[_0x25391b(0x103)];if(_0x14fab2&&!_0x14fab2[_0x25391b(0x87)])return![];if(!_0x14fab2['_choiceListWindow'][_0x25391b(0x80)])return![];return $gameScreen[_0x25391b(0x106)](this['_pictureId'])>=0x0;},VisuMZ['PictureChoices'][_0x25efcc(0xe0)]=Sprite_Clickable[_0x25efcc(0xc2)][_0x25efcc(0x6a)],Sprite_Clickable[_0x25efcc(0xc2)][_0x25efcc(0x6a)]=function(){const _0x459833=_0x25efcc;VisuMZ['PictureChoices'][_0x459833(0xe0)][_0x459833(0x92)](this);if(this[_0x459833(0xc7)]()){if(_0x459833(0x9d)===_0x459833(0x9d))this[_0x459833(0xf4)]();else{this['_pictureChoiceSelected']===_0x24ffdf&&this[_0x459833(0xd7)]();const _0x44ddfe=this[_0x459833(0x9b)];_0x44ddfe[_0x4cb5ec]=_0x3ca64b;}}},Sprite_Clickable[_0x25efcc(0xc2)][_0x25efcc(0xf4)]=function(){const _0x2379ae=_0x25efcc,_0xf3689f=SceneManager[_0x2379ae(0x103)],_0x150364=_0xf3689f[_0x2379ae(0x87)],_0x25ca82=$gameScreen['getPictureChoiceBinding'](this[_0x2379ae(0xf9)]);_0x150364[_0x2379ae(0xd1)](_0x25ca82);},VisuMZ[_0x25efcc(0xb0)][_0x25efcc(0xdd)]=Sprite_Clickable[_0x25efcc(0xc2)][_0x25efcc(0xbe)],Sprite_Clickable[_0x25efcc(0xc2)][_0x25efcc(0xbe)]=function(){const _0x13e56e=_0x25efcc;VisuMZ[_0x13e56e(0xb0)][_0x13e56e(0xdd)]['call'](this),this[_0x13e56e(0xc7)]()&&(this[_0x13e56e(0xf4)](),this[_0x13e56e(0x100)]());},Sprite_Clickable['prototype'][_0x25efcc(0x100)]=function(){const _0xde78e9=_0x25efcc,_0x4d0055=SceneManager[_0xde78e9(0x103)],_0x30a853=_0x4d0055[_0xde78e9(0x87)],_0x5c7035=$gameScreen[_0xde78e9(0x106)](this[_0xde78e9(0xf9)]);_0x30a853[_0xde78e9(0xf0)](_0x5c7035),_0x30a853['processOk']();},VisuMZ['PictureChoices']['Window_ChoiceList_makeCommandList']=Window_ChoiceList['prototype']['makeCommandList'],Window_ChoiceList[_0x25efcc(0xc2)][_0x25efcc(0xe4)]=function(){const _0x5d7854=_0x25efcc;VisuMZ[_0x5d7854(0xb0)][_0x5d7854(0x95)][_0x5d7854(0x92)](this),this['applyHideChoiceWindow'](),this[_0x5d7854(0x97)]();},Window_ChoiceList[_0x25efcc(0xc2)][_0x25efcc(0xba)]=function(){const _0x56d979=_0x25efcc;this[_0x56d979(0x9a)]['x']=this[_0x56d979(0x9a)]['y']=0x1;const _0x5eefbd=/<HIDE CHOICE WINDOW>/i;this['_pictureChoicesHidden']=![];const _0x42a503=$gameMessage[_0x56d979(0xc8)]();for(const _0x796d80 of _0x42a503){if(_0x56d979(0x86)===_0x56d979(0x79)){const _0x376696=this[_0x56d979(0xe1)](_0x4e2d9d);if(!_0x376696)return;const _0x44d701=this[_0x56d979(0x6f)](_0x4a415a);_0x376696[_0x56d979(0x7f)](_0x44d701,_0x45bc57);}else{if(_0x796d80[_0x56d979(0x69)](_0x5eefbd)){this['scale']['x']=this[_0x56d979(0x9a)]['y']=0x0,this[_0x56d979(0xe6)]=!![];break;}}}for(const _0x49fe86 of this[_0x56d979(0xf6)]){if(!_0x49fe86)continue;_0x49fe86[_0x56d979(0xd0)]['match'](_0x5eefbd)&&(_0x49fe86[_0x56d979(0xd0)]=_0x49fe86[_0x56d979(0xd0)]['replace'](_0x5eefbd,'')[_0x56d979(0xfc)]());}},Window_ChoiceList[_0x25efcc(0xc2)][_0x25efcc(0x97)]=function(){const _0x18a210=_0x25efcc;let _0xca2a9d=/<BIND (?:PICTURE|PICTURES):[ ](\d+)>/i;for(const _0xec06e0 of this[_0x18a210(0xf6)]){if(!_0xec06e0)continue;if(_0xec06e0[_0x18a210(0xd0)][_0x18a210(0x69)](_0xca2a9d)){const _0x592ea0=Number(RegExp['$1']),_0x4b6d26=this[_0x18a210(0xf6)]['indexOf'](_0xec06e0);$gameScreen[_0x18a210(0xfa)](_0x592ea0,_0x4b6d26),_0xec06e0[_0x18a210(0xd0)]=_0xec06e0[_0x18a210(0xd0)][_0x18a210(0x8b)](_0xca2a9d,'')[_0x18a210(0xfc)]();}}},VisuMZ[_0x25efcc(0xb0)][_0x25efcc(0x101)]=Window_ChoiceList[_0x25efcc(0xc2)][_0x25efcc(0x71)],Window_ChoiceList['prototype'][_0x25efcc(0x71)]=function(){const _0x28f6a1=_0x25efcc;VisuMZ['PictureChoices']['Window_ChoiceList_callOkHandler'][_0x28f6a1(0x92)](this),this[_0x28f6a1(0xdc)]();},VisuMZ[_0x25efcc(0xb0)][_0x25efcc(0x105)]=Window_ChoiceList['prototype'][_0x25efcc(0xf2)],Window_ChoiceList[_0x25efcc(0xc2)][_0x25efcc(0xf2)]=function(){VisuMZ['PictureChoices']['Window_ChoiceList_callCancelHandler']['call'](this),this['autoClearPictureChoices']();},Window_ChoiceList[_0x25efcc(0xc2)][_0x25efcc(0xdc)]=function(){const _0x93cd59=_0x25efcc;VisuMZ[_0x93cd59(0xb0)][_0x93cd59(0x9e)]['AutoClear']&&$gameScreen[_0x93cd59(0xd7)]();},VisuMZ[_0x25efcc(0xb0)][_0x25efcc(0x98)]=Window_Selectable[_0x25efcc(0xc2)][_0x25efcc(0xf0)],Window_Selectable[_0x25efcc(0xc2)][_0x25efcc(0xf0)]=function(_0xf15c2c){const _0x38a2d8=_0x25efcc;VisuMZ[_0x38a2d8(0xb0)][_0x38a2d8(0x98)][_0x38a2d8(0x92)](this,_0xf15c2c),this['constructor'][_0x38a2d8(0xd0)]===_0x38a2d8(0xe7)&&(_0x38a2d8(0xa7)==='OBcJx'?this[_0x38a2d8(0xe8)](_0xf15c2c):this[_0x38a2d8(0xd4)]());},Window_ChoiceList['prototype']['pictureChoiceSelect']=function(_0x5e2737){const _0x260309=_0x25efcc,_0x5271d2=this['index']();this['select'](_0x5e2737),this[_0x260309(0xb1)]()!==_0x5271d2&&this['playCursorSound']();},VisuMZ['PictureChoices'][_0x25efcc(0xc0)]=Window_ChoiceList['prototype'][_0x25efcc(0xcb)],Window_ChoiceList[_0x25efcc(0xc2)][_0x25efcc(0xcb)]=function(){const _0x3844b6=_0x25efcc;this[_0x3844b6(0x7d)]=!![],VisuMZ[_0x3844b6(0xb0)]['Window_ChoiceList_selectDefault'][_0x3844b6(0x92)](this),this['_instantPictureChoiceSelect']=undefined;},Window_ChoiceList[_0x25efcc(0xc2)][_0x25efcc(0xe8)]=function(_0x4b2a36){const _0x5867c3=_0x25efcc;for(let _0x336f70=0x0;_0x336f70<0x64;_0x336f70++){const _0x216d06=$gameScreen[_0x5867c3(0x106)](_0x336f70);if(_0x216d06<0x0)continue;const _0x498960=$gameScreen['picture'](_0x336f70);if(!_0x498960)continue;const _0x302e9d=this[_0x5867c3(0x7d)];_0x216d06===_0x4b2a36?'ufZaW'!==_0x5867c3(0xd5)?$gameScreen[_0x5867c3(0x7c)](_0x336f70,_0x302e9d):_0x1f1f53=_0x3ede89[_0x5867c3(0xa1)](_0x17aea3,_0x31ee99):$gameScreen[_0x5867c3(0xd3)](_0x336f70,_0x302e9d);}};