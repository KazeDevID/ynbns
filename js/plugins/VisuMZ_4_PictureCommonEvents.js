//=============================================================================
// VisuStella MZ - Picture Common Events
// VisuMZ_4_PictureCommonEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_PictureCommonEvents = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PictureCommonEvents = VisuMZ.PictureCommonEvents || {};
VisuMZ.PictureCommonEvents.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.01] [PictureCommonEvents]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Picture_Common_Events_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * With RPG Maker MZ having better touch support, it's important that almost
 * everything can be interacted with such as pictures. Pictures on the map
 * screen can have a Common Event bound to them, which will launch once clicked
 * (assuming no other events are running). These pictures can also change the
 * Common Events bound to them and/or clear them during the game.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Functionality to bind Common Events to pictures.
 * * Change which Common Events run during a playthrough.
 * * Clear Common Events from pictures to remove any bindings.
 * * Clicked pictures can require clicking on only opaque pixels and not
 *   fully transparent ones.
 * * Include hover effects like blend mode changes and tone shifts to help
 *   players understand when a picture has been selected.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Compatibility Issues
 * ============================================================================
 *
 * This plugin will most likely have compatibility issues with anything that
 * involves clicking pictures. If you are using another plugin that does
 * something with clicking pictures on the map screen, the likelihood of
 * clashing can occur if these plugins utilize the same pictures and we will
 * not be held accountable for that as it is something within your power to
 * change by simply picking different pictures.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * In the Plugin Parameters, you will see a list of all the pictures that you
 * can bind to a Common Event. If that number is something other than 0, then
 * the number associated with it will be the Common Event that will run. If you
 * assign it to a Common Event ID that does not exist, you will get an error so
 * please be wary of that.
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Change Picture Common Event
 * - Change the Common Event bound to specific picture(s).
 *
 *   Picture ID(s):
 *   - Select which Picture ID(s) to change.
 *
 *   Common Event ID:
 *   - Change the Common Event bound to specific picture(s).
 * 
 *   Custom
 * 
 *     Opaque Only?
 *     - Ignore clicks on transparent pixels and accept only opaque pixels for
 *       this specific picture.
 * 
 *       Error Margin:
 *       - Error margin when clicking for opaque pixels.
 *       - This value determines the radius.
 * 
 *     Change Tone on Hover?
 *     - Change the tone of the picture on hover?
 * 
 *       Hover Tone:
 *       - Tone settings upon hovering.
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Blend Mode on Hover:
 *     - The blend mode used when this picture is hovered over.
 *
 * ---
 *
 * System: Clear All Picture Common Events
 * - Clears all Common Event bound to specific picture(s).
 *
 * ---
 *
 * System: Clear Picture Common Event
 * - Clears any Common Event bound to specific picture(s).
 *
 *   Picture ID(s):
 *   - Select which Picture ID(s) to clear.
 *
 * ---
 *
 * System: Erase & Clear All Pictures
 * - Erases all pictures on the screen and clears their Common Events.
 * 
 * ---
 *
 * System: Erase & Clear Picture
 * - Erases and clears any Common Events attached to specific picture(s).
 *
 *   Picture ID(s):
 *   - Select which Picture ID(s) to erase and clear.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Global Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you to adjust which Pictures will trigger
 * which Common Events upon being clicked.
 *
 * ---
 * 
 * General
 * 
 *   Opaque Only?
 *   - Ignore clicks on transparent pixels and accept only opaque pixels for
 *     the Plugin Parameter bindings.
 * 
 *     Error Margin:
 *     - Error margin when clicking for opaque pixels.
 *     - This value determines the radius.
 * 
 *   Change Tone on Hover?
 *   - Change the tone of the picture on hover?
 * 
 *     Hover Tone:
 *     - Tone settings upon hovering.
 *     - Format: [Red, Green, Blue, Gray]
 * 
 *   Blend Mode on Hover:
 *   - The blend mode used when this picture is hovered over.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Picture Settings
 * ============================================================================
 *
 * Each of the 100 picture slots are listed in the Plugin Parameters and can
 * be assigned a default setting that is already set up at the start of the
 * game without needing to assign a Common Event to it by a Plugin Command.
 * 
 * You can still overwrite their settings through a Plugin Command.
 * 
 * ---
 *
 * Pictures #1 through #100
 * 
 *   Picture #1:
 *   through
 *   Picture #100:
 *   - Default Common Event settings to bind to this picture ID.
 *
 * ---
 * 
 * Picture Settings
 *
 *   Common Event ID:
 *   - The common event settings you wish to tie to this picture.
 * 
 *   Custom
 * 
 *     Opaque Only?
 *     - Ignore clicks on transparent pixels and accept only opaque pixels for
 *       this specific picture.
 * 
 *       Error Margin:
 *       - Error margin when clicking for opaque pixels.
 *       - This value determines the radius.
 * 
 *     Change Tone on Hover?
 *     - Change the tone of the picture on hover?
 * 
 *       Hover Tone:
 *       - Tone settings upon hovering.
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Blend Mode on Hover:
 *     - The blend mode used when this picture is hovered over.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01: November 18, 2021
 * * Compatibility Update!
 * ** Should now work properly with VisuStella MZ Picture Choices.
 *    Update made by Olivia.
 *
 * Version 1.00: September 4, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangePictureCommonEvent
 * @text System: Change Picture Common Event
 * @desc Change the Common Event bound to specific picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc Select which Picture ID(s) to change.
 * @default ["1"]
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Change the Common Event bound to specific picture(s).
 * @default 0
 *
 * @arg Custom
 *
 * @arg UseGlobal:eval
 * @text Use Global?
 * @parent Custom
 * @type boolean
 * @on Use Global Settings
 * @off Use Custom Settings
 * @desc If this uses Global Settings, 
 * then ignore the options below.
 * @default true
 *
 * @arg OpaqueOnly:eval
 * @text Opaque Only?
 * @parent Custom
 * @type boolean
 * @on Opaque Only
 * @off Allow Transparency
 * @desc Ignore clicks on transparent pixels and accept only
 * opaque pixels for this specific picture.
 * @default true
 *
 * @arg OpaqueErrorMargin:num
 * @text Error Margin
 * @parent OpaqueOnly:eval
 * @type number
 * @min 0
 * @max 10
 * @desc Error margin when clicking for opaque pixels.
 * This value determines the radius.
 * @default 3
 *
 * @arg ChangeTone:eval
 * @text Change Tone on Hover?
 * @parent Custom
 * @type boolean
 * @on Change Tone
 * @off Don't Change
 * @desc Change the tone of the picture on hover?
 * @default true
 *
 * @arg HoverTone:eval
 * @text Hover Tone
 * @parent ChangeTone:eval
 * @desc Tone settings upon hovering.
 * Format: [Red, Green, Blue, Gray]
 * @default [128, 128, 128, 0]
 *
 * @arg BlendMode:num
 * @text Blend Mode on Hover
 * @parent Custom
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used when this picture is hovered over.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearAllPictureCommonEvents
 * @text System: Clear All Picture Common Events
 * @desc Clears all Common Event bound to specific picture(s).
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearPictureCommonEvent
 * @text System: Clear Picture Common Event
 * @desc Clears any Common Event bound to specific picture(s).
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
 * @command EraseClearAllPictures
 * @text System: Erase & Clear All Pictures
 * @desc Erases all pictures on the screen and clears their Common Events.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EraseClearPicture
 * @text System: Erase & Clear Picture
 * @desc Erases and clears any Common Events attached to specific picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc Select which Picture ID(s) to erase and clear.
 * @default ["1"]
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
 * @param PictureCommonEvents
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param DefaultGlobal:struct
 * @text Default Global Settings
 * @type struct<DefaultGlobal>
 * @desc Default global settings that are used in general.
 * @default {"OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_1_to_10
 * @text #1 through #10
 * @parent Default
 *
 * @param Picture1:struct
 * @text Picture #1
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture2:struct
 * @text Picture #2
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture3:struct
 * @text Picture #3
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture4:struct
 * @text Picture #4
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture5:struct
 * @text Picture #5
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture6:struct
 * @text Picture #6
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture7:struct
 * @text Picture #7
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture8:struct
 * @text Picture #8
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture9:struct
 * @text Picture #9
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture10:struct
 * @text Picture #10
 * @parent Set_1_to_10
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_11_to_20
 * @text #11 through #20
 * @parent Default
 *
 * @param Picture11:struct
 * @text Picture #11
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture12:struct
 * @text Picture #12
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture13:struct
 * @text Picture #13
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture14:struct
 * @text Picture #14
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture15:struct
 * @text Picture #15
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture16:struct
 * @text Picture #16
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture17:struct
 * @text Picture #17
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture18:struct
 * @text Picture #18
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture19:struct
 * @text Picture #19
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture20:struct
 * @text Picture #20
 * @parent Set_11_to_20
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_21_to_30
 * @text #21 through #30
 * @parent Default
 *
 * @param Picture21:struct
 * @text Picture #21
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture22:struct
 * @text Picture #22
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture23:struct
 * @text Picture #23
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture24:struct
 * @text Picture #24
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture25:struct
 * @text Picture #25
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture26:struct
 * @text Picture #26
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture27:struct
 * @text Picture #27
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture28:struct
 * @text Picture #28
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture29:struct
 * @text Picture #29
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture30:struct
 * @text Picture #30
 * @parent Set_21_to_30
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_31_to_40
 * @text #31 through #40
 * @parent Default
 *
 * @param Picture31:struct
 * @text Picture #31
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture32:struct
 * @text Picture #32
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture33:struct
 * @text Picture #33
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture34:struct
 * @text Picture #34
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture35:struct
 * @text Picture #35
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture36:struct
 * @text Picture #36
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture37:struct
 * @text Picture #37
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture38:struct
 * @text Picture #38
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture39:struct
 * @text Picture #39
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture40:struct
 * @text Picture #40
 * @parent Set_31_to_40
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_41_to_50
 * @text #41 through #50
 * @parent Default
 *
 * @param Picture41:struct
 * @text Picture #41
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture42:struct
 * @text Picture #42
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture43:struct
 * @text Picture #43
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture44:struct
 * @text Picture #44
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture45:struct
 * @text Picture #45
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture46:struct
 * @text Picture #46
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture47:struct
 * @text Picture #47
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture48:struct
 * @text Picture #48
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture49:struct
 * @text Picture #49
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture50:struct
 * @text Picture #50
 * @parent Set_41_to_50
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_51_to_60
 * @text #51 through #60
 * @parent Default
 *
 * @param Picture51:struct
 * @text Picture #51
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture52:struct
 * @text Picture #52
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture53:struct
 * @text Picture #53
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture54:struct
 * @text Picture #54
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture55:struct
 * @text Picture #55
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture56:struct
 * @text Picture #56
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture57:struct
 * @text Picture #57
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture58:struct
 * @text Picture #58
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture59:struct
 * @text Picture #59
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture60:struct
 * @text Picture #60
 * @parent Set_51_to_60
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_61_to_70
 * @text #61 through #70
 * @parent Default
 *
 * @param Picture61:struct
 * @text Picture #61
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture62:struct
 * @text Picture #62
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture63:struct
 * @text Picture #63
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture64:struct
 * @text Picture #64
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture65:struct
 * @text Picture #65
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture66:struct
 * @text Picture #66
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture67:struct
 * @text Picture #67
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture68:struct
 * @text Picture #68
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture69:struct
 * @text Picture #69
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture70:struct
 * @text Picture #70
 * @parent Set_61_to_70
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_71_to_80
 * @text #71 through #80
 * @parent Default
 *
 * @param Picture71:struct
 * @text Picture #71
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture72:struct
 * @text Picture #72
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture73:struct
 * @text Picture #73
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture74:struct
 * @text Picture #74
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture75:struct
 * @text Picture #75
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture76:struct
 * @text Picture #76
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture77:struct
 * @text Picture #77
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture78:struct
 * @text Picture #78
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture79:struct
 * @text Picture #79
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture80:struct
 * @text Picture #80
 * @parent Set_71_to_80
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_81_to_90
 * @text #81 through #90
 * @parent Default
 *
 * @param Picture81:struct
 * @text Picture #81
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture82:struct
 * @text Picture #82
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture83:struct
 * @text Picture #83
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture84:struct
 * @text Picture #84
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture85:struct
 * @text Picture #85
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture86:struct
 * @text Picture #86
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture87:struct
 * @text Picture #87
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture88:struct
 * @text Picture #88
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture89:struct
 * @text Picture #89
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture90:struct
 * @text Picture #90
 * @parent Set_81_to_90
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Set_91_to_100
 * @text #91 through #100
 * @parent Default
 *
 * @param Picture91:struct
 * @text Picture #91
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture92:struct
 * @text Picture #92
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture93:struct
 * @text Picture #93
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture94:struct
 * @text Picture #94
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture95:struct
 * @text Picture #95
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture96:struct
 * @text Picture #96
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture97:struct
 * @text Picture #97
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture98:struct
 * @text Picture #98
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc Default Common Event settings to bind to this picture ID.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture99:struct
 * @text Picture #99
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc The common event settings you wish to tie to this picture.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
 *
 * @param Picture100:struct
 * @text Picture #100
 * @parent Set_91_to_100
 * @type struct<Picture>
 * @desc The common event settings you wish to tie to this picture.
 * @default {"CommonEventID:num":"0","Custom":"","UseGlobal:eval":"true","OpaqueOnly:eval":"true","OpaqueErrorMargin:num":"3","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","BlendMode:num":"0"}
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
 * Default Global Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~DefaultGlobal:
 *
 * @param OpaqueOnly:eval
 * @text Opaque Only?
 * @parent Global
 * @type boolean
 * @on Opaque Only
 * @off Allow Transparency
 * @desc Ignore clicks on transparent pixels and accept only
 * opaque pixels for the Plugin Parameter bindings.
 * @default true
 *
 * @param OpaqueErrorMargin:num
 * @text Error Margin
 * @parent OpaqueOnly:eval
 * @type number
 * @min 0
 * @max 10
 * @desc Error margin when clicking for opaque pixels.
 * This value determines the radius.
 * @default 3
 *
 * @param ChangeTone:eval
 * @text Change Tone on Hover?
 * @parent Global
 * @type boolean
 * @on Change Tone
 * @off Don't Change
 * @desc Change the tone of the picture on hover?
 * @default true
 *
 * @param HoverTone:eval
 * @text Hover Tone
 * @parent ChangeTone:eval
 * @desc Tone settings upon hovering.
 * Format: [Red, Green, Blue, Gray]
 * @default [128, 128, 128, 0]
 *
 * @param BlendMode:num
 * @text Blend Mode on Hover
 * @parent Global
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used when this picture is hovered over.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Picture:
 *
 * @param CommonEventID:num
 * @text Common Event ID
 * @parent NeededData
 * @type common_event
 * @desc The common event settings you wish to tie to this picture.
 * @default 0
 *
 * @param Custom
 *
 * @param UseGlobal:eval
 * @text Use Global?
 * @parent Custom
 * @type boolean
 * @on Use Global Settings
 * @off Use Custom Settings
 * @desc If this uses Global Settings, 
 * then ignore the options below.
 * @default true
 *
 * @param OpaqueOnly:eval
 * @text Opaque Only?
 * @parent Custom
 * @type boolean
 * @on Opaque Only
 * @off Allow Transparency
 * @desc Ignore clicks on transparent pixels and accept only
 * opaque pixels for this specific picture.
 * @default true
 *
 * @param OpaqueErrorMargin:num
 * @text Error Margin
 * @parent OpaqueOnly:eval
 * @type number
 * @min 0
 * @max 10
 * @desc Error margin when clicking for opaque pixels.
 * This value determines the radius.
 * @default 3
 *
 * @param ChangeTone:eval
 * @text Change Tone on Hover?
 * @parent Custom
 * @type boolean
 * @on Change Tone
 * @off Don't Change
 * @desc Change the tone of the picture on hover?
 * @default true
 *
 * @param HoverTone:eval
 * @text Hover Tone
 * @parent ChangeTone:eval
 * @desc Tone settings upon hovering.
 * Format: [Red, Green, Blue, Gray]
 * @default [128, 128, 128, 0]
 *
 * @param BlendMode:num
 * @text Blend Mode on Hover
 * @parent Custom
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used when this picture is hovered over.
 * @default 0
 *
 */
//=============================================================================

const _0x585d44=_0x4f12;(function(_0x56a1a8,_0x2b5ebc){const _0xf5c77a=_0x4f12,_0x2d0408=_0x56a1a8();while(!![]){try{const _0x5d71a4=-parseInt(_0xf5c77a(0xf3))/0x1*(-parseInt(_0xf5c77a(0xcd))/0x2)+parseInt(_0xf5c77a(0xe5))/0x3*(-parseInt(_0xf5c77a(0x11a))/0x4)+-parseInt(_0xf5c77a(0xfb))/0x5*(parseInt(_0xf5c77a(0xd6))/0x6)+parseInt(_0xf5c77a(0x114))/0x7*(parseInt(_0xf5c77a(0x117))/0x8)+parseInt(_0xf5c77a(0xbe))/0x9*(parseInt(_0xf5c77a(0x12f))/0xa)+-parseInt(_0xf5c77a(0x113))/0xb+parseInt(_0xf5c77a(0xe8))/0xc;if(_0x5d71a4===_0x2b5ebc)break;else _0x2d0408['push'](_0x2d0408['shift']());}catch(_0x198a66){_0x2d0408['push'](_0x2d0408['shift']());}}}(_0x3ea5,0x5ded4));function _0x4f12(_0x405a0a,_0x496b6d){const _0x3ea599=_0x3ea5();return _0x4f12=function(_0x4f12e1,_0x3f579a){_0x4f12e1=_0x4f12e1-0xbc;let _0x4bf7c4=_0x3ea599[_0x4f12e1];return _0x4bf7c4;},_0x4f12(_0x405a0a,_0x496b6d);}var label=_0x585d44(0xec),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x585d44(0xe7)](function(_0x3fa024){const _0x2bc293=_0x585d44;return _0x3fa024[_0x2bc293(0xda)]&&_0x3fa024[_0x2bc293(0x104)]['includes']('['+label+']');})[0x0];function _0x3ea5(){const _0x1f04a2=['isClickEnabled','ChangePictureCommonEvent','35eKZrdg','onMouseEnter','Settings','UseGlobal','ARRAYJSON','JSON','initialize','_pictureCommonEvents','_spriteset','description','ConvertParams','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','inBattle','erasePicture','Rsutp','map','version','OpaqueOnly','BlendMode','exit','pictureCommonEvent','name','some','isBusy','1714702DlGqyc','14IqNISv','DefaultGlobal','qbmFN','2259104dRkgKI','isPictureCommonEventOpaqueOnly','isAnyButtonPressed','993108QTTkjm','applyInverse','reserveCommonEvent','prototype','isBeingTouched','onMouseExit','ARRAYEVAL','xmoyU','Scene_Map_isAnyButtonPressed','_frame','qTQXX','rIWtu','match','worldTransform','ARRAYFUNC','round','Game_System_initialize','EraseClearPicture','call','return\x200','visible','262790kUpDAX','isMapTouchOk','contains','OpaqueErrorMargin','Sprite_Picture_updateOther','callCommonEvent','trim','checkCommonEventOpaqueOnly','setPictureCommonEventSettings','setColorTone','_scene','createPictureCommonEventData','doesPictureCommonEventChangeTone','onClick','initPictureCommonEvents','CommonEventID','ARRAYNUM','dAhaM','hwbiB','isPictureCommonEventPressed','hasCommonEvent','18JKsBIz','Picture%1','anchor','picture','ARRAYSTR','_pictureId','bitmap','format','HoverTone','TemplateSettings','PictureIDs','VPCOy','ClearPictureCommonEvent','engku','NUM','2JyJZsz','toUpperCase','height','getPictureCommonEventErrorMargin','blendMode','pictureCommonEventData','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','hasPictureChoiceEvent','VisuMZ_2_PictureChoices','431226BaQGrE','sjUOk','ClearAllPictureCommonEvents','parse','status','isAnyPictureCommonEventPressed','checkCommonEventOpaqueErrorMargin','getAlphaPixel','_pictureCommonEventMouseOver','width','constructor','EraseClearAllPictures','makeDeepCopy','registerCommand','getPictureCommonEventHoverTone','9dRMPIL','ILeUy','filter','7497372OfyGhW','STRUCT','isPressed','ChangeTone','PictureCommonEvents','EMUHN','updateOther','EVAL','updatePictureCommonEventMouseOver','hasPictureChoiceBinding','xasqx','546419BUeiLr','VKjlf','clearPictureCommonEventSettings','EXVoP','children','STR'];_0x3ea5=function(){return _0x1f04a2;};return _0x3ea5();}VisuMZ[label][_0x585d44(0xfd)]=VisuMZ[label][_0x585d44(0xfd)]||{},VisuMZ[_0x585d44(0x105)]=function(_0x546f8d,_0xe9ae0e){const _0x493130=_0x585d44;for(const _0x503992 in _0xe9ae0e){if(_0x503992[_0x493130(0x126)](/(.*):(.*)/i)){if(_0x493130(0x109)===_0x493130(0xcb))this['createPictureCommonEventData'](_0x5e964a);else{const _0x58f81b=String(RegExp['$1']),_0x14c4b9=String(RegExp['$2'])[_0x493130(0xce)]()[_0x493130(0x135)]();let _0x169ca9,_0x3b1127,_0x37fc44;switch(_0x14c4b9){case _0x493130(0xcc):_0x169ca9=_0xe9ae0e[_0x503992]!==''?Number(_0xe9ae0e[_0x503992]):0x0;break;case _0x493130(0x13f):_0x3b1127=_0xe9ae0e[_0x503992]!==''?JSON[_0x493130(0xd9)](_0xe9ae0e[_0x503992]):[],_0x169ca9=_0x3b1127[_0x493130(0x10a)](_0x26fd06=>Number(_0x26fd06));break;case _0x493130(0xef):_0x169ca9=_0xe9ae0e[_0x503992]!==''?eval(_0xe9ae0e[_0x503992]):null;break;case _0x493130(0x120):_0x3b1127=_0xe9ae0e[_0x503992]!==''?JSON['parse'](_0xe9ae0e[_0x503992]):[],_0x169ca9=_0x3b1127[_0x493130(0x10a)](_0x667fe8=>eval(_0x667fe8));break;case _0x493130(0x100):_0x169ca9=_0xe9ae0e[_0x503992]!==''?JSON[_0x493130(0xd9)](_0xe9ae0e[_0x503992]):'';break;case _0x493130(0xff):_0x3b1127=_0xe9ae0e[_0x503992]!==''?JSON[_0x493130(0xd9)](_0xe9ae0e[_0x503992]):[],_0x169ca9=_0x3b1127[_0x493130(0x10a)](_0x4ced39=>JSON['parse'](_0x4ced39));break;case'FUNC':_0x169ca9=_0xe9ae0e[_0x503992]!==''?new Function(JSON[_0x493130(0xd9)](_0xe9ae0e[_0x503992])):new Function(_0x493130(0x12d));break;case _0x493130(0x128):_0x3b1127=_0xe9ae0e[_0x503992]!==''?JSON['parse'](_0xe9ae0e[_0x503992]):[],_0x169ca9=_0x3b1127[_0x493130(0x10a)](_0x4e55f4=>new Function(JSON[_0x493130(0xd9)](_0x4e55f4)));break;case _0x493130(0xf8):_0x169ca9=_0xe9ae0e[_0x503992]!==''?String(_0xe9ae0e[_0x503992]):'';break;case _0x493130(0xc2):_0x3b1127=_0xe9ae0e[_0x503992]!==''?JSON[_0x493130(0xd9)](_0xe9ae0e[_0x503992]):[],_0x169ca9=_0x3b1127['map'](_0x356ff7=>String(_0x356ff7));break;case _0x493130(0xe9):_0x37fc44=_0xe9ae0e[_0x503992]!==''?JSON[_0x493130(0xd9)](_0xe9ae0e[_0x503992]):{},_0x169ca9=VisuMZ[_0x493130(0x105)]({},_0x37fc44);break;case'ARRAYSTRUCT':_0x3b1127=_0xe9ae0e[_0x503992]!==''?JSON[_0x493130(0xd9)](_0xe9ae0e[_0x503992]):[],_0x169ca9=_0x3b1127[_0x493130(0x10a)](_0x53ec15=>VisuMZ[_0x493130(0x105)]({},JSON[_0x493130(0xd9)](_0x53ec15)));break;default:continue;}_0x546f8d[_0x58f81b]=_0x169ca9;}}}return _0x546f8d;},(_0x2c0f44=>{const _0x4bdd17=_0x585d44,_0x4b6ff6=_0x2c0f44[_0x4bdd17(0x110)];for(const _0x59d4dc of dependencies){if(!Imported[_0x59d4dc]){if('rIWtu'!==_0x4bdd17(0x125))_0x1d9dc7['setPictureCommonEventSettings'](_0x4a5494,_0x34996e[_0x4bdd17(0xe2)](_0x54dac0));else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x4bdd17(0xc5)](_0x4b6ff6,_0x59d4dc)),SceneManager[_0x4bdd17(0x10e)]();break;}}}const _0x47b9b8=_0x2c0f44[_0x4bdd17(0x104)];if(_0x47b9b8[_0x4bdd17(0x126)](/\[Version[ ](.*?)\]/i)){if(_0x4bdd17(0xf2)!==_0x4bdd17(0xf2)){if(_0x321e71[_0x4bdd17(0xd5)]&&this[_0x4bdd17(0xd4)]())return!![];if(_0x36ad92[_0x4bdd17(0x112)]())return![];if(_0x39d244[_0x4bdd17(0x107)]())return![];if(!this[_0x4bdd17(0x12e)])return![];if(this['opacity']<=0x0)return![];const _0xb6b8fc=_0x2b0d1[_0x4bdd17(0x139)];if(_0xb6b8fc&&_0xb6b8fc[_0x4bdd17(0xe0)]===_0x3e1b9d){if(!_0xb6b8fc[_0x4bdd17(0x130)]())return![];}return this[_0x4bdd17(0xc1)]()&&_0x5218c2[_0x4bdd17(0x10f)](this[_0x4bdd17(0xc3)])>0x0;}else{const _0x3593c9=Number(RegExp['$1']);_0x3593c9!==VisuMZ[label][_0x4bdd17(0x10b)]&&(_0x4bdd17(0xc9)!==_0x4bdd17(0x116)?(alert(_0x4bdd17(0x106)[_0x4bdd17(0xc5)](_0x4b6ff6,_0x3593c9)),SceneManager[_0x4bdd17(0x10e)]()):(_0x182a5f[_0x4bdd17(0x11d)][_0x4bdd17(0x13c)][_0x4bdd17(0x12c)](this),this['callCommonEvent']()));}}if(_0x47b9b8[_0x4bdd17(0x126)](/\[Tier[ ](\d+)\]/i)){if(_0x4bdd17(0xed)===_0x4bdd17(0x140)){_0x278069['ConvertParams'](_0x3f6f6a,_0x350049);const _0x29f4f9=_0x4961a1[_0x4bdd17(0xc8)]||[0x1],_0x18301d={'CommonEventID':_0x1e82cd[_0x4bdd17(0x13e)],'UseGlobal':_0xeb8847[_0x4bdd17(0xfe)],'OpaqueOnly':_0x395c1f['OpaqueOnly'],'OpaqueErrorMargin':_0x5aba11[_0x4bdd17(0x132)],'ChangeTone':_0x4c4a40['ChangeTone'],'HoverTone':_0x18290e['HoverTone'],'BlendMode':_0x30ca1e['BlendMode']};if(_0x18301d['UseGlobal']){const _0xbc6358=_0x48322a['PictureCommonEvents'][_0x4bdd17(0xfd)][_0x4bdd17(0x115)];_0x18301d[_0x4bdd17(0x10c)]=_0xbc6358[_0x4bdd17(0x10c)],_0x18301d[_0x4bdd17(0x132)]=_0xbc6358[_0x4bdd17(0x132)],_0x18301d['ChangeTone']=_0xbc6358[_0x4bdd17(0xeb)],_0x18301d[_0x4bdd17(0xc6)]=_0xbc6358[_0x4bdd17(0xc6)],_0x18301d[_0x4bdd17(0x10d)]=_0xbc6358[_0x4bdd17(0x10d)];}for(const _0x5c4a5d of _0x29f4f9){_0x5af505[_0x4bdd17(0x137)](_0x5c4a5d,_0x259a92['makeDeepCopy'](_0x18301d));}}else{const _0x1fb360=Number(RegExp['$1']);_0x1fb360<tier?(alert(_0x4bdd17(0xd3)[_0x4bdd17(0xc5)](_0x4b6ff6,_0x1fb360,tier)),SceneManager[_0x4bdd17(0x10e)]()):tier=Math['max'](_0x1fb360,tier);}}VisuMZ[_0x4bdd17(0x105)](VisuMZ[label][_0x4bdd17(0xfd)],_0x2c0f44['parameters']);})(pluginData),PluginManager[_0x585d44(0xe3)](pluginData[_0x585d44(0x110)],_0x585d44(0xfa),_0x478534=>{const _0x514b7d=_0x585d44;VisuMZ['ConvertParams'](_0x478534,_0x478534);const _0x5e55c6=_0x478534[_0x514b7d(0xc8)]||[0x1],_0xfe9b30={'CommonEventID':_0x478534[_0x514b7d(0x13e)],'UseGlobal':_0x478534['UseGlobal'],'OpaqueOnly':_0x478534[_0x514b7d(0x10c)],'OpaqueErrorMargin':_0x478534[_0x514b7d(0x132)],'ChangeTone':_0x478534[_0x514b7d(0xeb)],'HoverTone':_0x478534['HoverTone'],'BlendMode':_0x478534[_0x514b7d(0x10d)]};if(_0xfe9b30['UseGlobal']){if(_0x514b7d(0x124)!==_0x514b7d(0x141)){const _0x33f834=VisuMZ[_0x514b7d(0xec)][_0x514b7d(0xfd)][_0x514b7d(0x115)];_0xfe9b30[_0x514b7d(0x10c)]=_0x33f834[_0x514b7d(0x10c)],_0xfe9b30[_0x514b7d(0x132)]=_0x33f834[_0x514b7d(0x132)],_0xfe9b30[_0x514b7d(0xeb)]=_0x33f834['ChangeTone'],_0xfe9b30[_0x514b7d(0xc6)]=_0x33f834[_0x514b7d(0xc6)],_0xfe9b30['BlendMode']=_0x33f834[_0x514b7d(0x10d)];}else{if(!this[_0x514b7d(0xbd)]())return;if(!this[_0x514b7d(0x136)]())return;const _0x483dfb=_0x1d4287[_0x514b7d(0x10f)](this[_0x514b7d(0xc3)]);_0x64b3a9[_0x514b7d(0x11c)](_0x483dfb),this[_0x514b7d(0x11f)]();}}for(const _0x49fd31 of _0x5e55c6){if(_0x514b7d(0x121)===_0x514b7d(0xf6)){_0x5042b4[_0x514b7d(0x11d)][_0x514b7d(0x11f)][_0x514b7d(0x12c)](this);if(!this[_0x514b7d(0xbd)]())return;this[_0x514b7d(0xde)]=![];}else $gameSystem['setPictureCommonEventSettings'](_0x49fd31,JsonEx['makeDeepCopy'](_0xfe9b30));}}),PluginManager['registerCommand'](pluginData[_0x585d44(0x110)],_0x585d44(0xd8),_0x11b6f5=>{const _0x7c2b88=_0x585d44;for(let _0x106235=0x1;_0x106235<=0x64;_0x106235++){$gameSystem[_0x7c2b88(0xf5)](_0x106235);}}),PluginManager[_0x585d44(0xe3)](pluginData[_0x585d44(0x110)],_0x585d44(0xca),_0x17d335=>{const _0x3e31d1=_0x585d44;VisuMZ[_0x3e31d1(0x105)](_0x17d335,_0x17d335);const _0x387155=_0x17d335[_0x3e31d1(0xc8)];for(const _0x3a18a4 of _0x387155){$gameSystem[_0x3e31d1(0xf5)](_0x3a18a4);}}),PluginManager[_0x585d44(0xe3)](pluginData[_0x585d44(0x110)],_0x585d44(0xe1),_0x520c4b=>{const _0x491db7=_0x585d44;$gameSystem[_0x491db7(0x102)]={};for(let _0x1a5859=0x1;_0x1a5859<=0x64;_0x1a5859++){$gameScreen['erasePicture'](_0x1a5859);}}),PluginManager[_0x585d44(0xe3)](pluginData[_0x585d44(0x110)],_0x585d44(0x12b),_0x54a40a=>{const _0x135bc1=_0x585d44;VisuMZ['ConvertParams'](_0x54a40a,_0x54a40a);const _0x1b56aa=_0x54a40a[_0x135bc1(0xc8)];for(const _0x8aeba2 of _0x1b56aa){if(_0x135bc1(0xd7)!=='sjUOk')for(let _0x458c91=0x1;_0x458c91<=0x64;_0x458c91++){_0x157203[_0x135bc1(0xf5)](_0x458c91);}else $gameScreen[_0x135bc1(0x108)](_0x8aeba2),$gameSystem[_0x135bc1(0xf5)](_0x8aeba2);}}),VisuMZ['PictureCommonEvents'][_0x585d44(0x12a)]=Game_System[_0x585d44(0x11d)][_0x585d44(0x101)],Game_System[_0x585d44(0x11d)][_0x585d44(0x101)]=function(){const _0x27e70b=_0x585d44;VisuMZ[_0x27e70b(0xec)][_0x27e70b(0x12a)][_0x27e70b(0x12c)](this),this[_0x27e70b(0x13d)]();},Game_System[_0x585d44(0x11d)][_0x585d44(0x13d)]=function(){const _0x320ef5=_0x585d44;this['_pictureCommonEvents']={};for(let _0x1f821c=0x1;_0x1f821c<=0x64;_0x1f821c++){this[_0x320ef5(0x13a)](_0x1f821c);}},VisuMZ['PictureCommonEvents']['TemplateSettings']=function(){return{'CommonEventID':0x0,'UseGlobal':!![],'OpaqueOnly':!![],'OpaqueErrorMargin':0x3,'ChangeTone':!![],'HoverTone':[0x80,0x80,0x80,0x0],'BlendMode':0x0};},Game_System['prototype']['createPictureCommonEventData']=function(_0x478b0f){const _0x2f4902=_0x585d44,_0x1b51ce=VisuMZ[_0x2f4902(0xec)]['Settings'],_0x3c2421=VisuMZ[_0x2f4902(0xec)][_0x2f4902(0xfd)][_0x2f4902(0x115)],_0x5456fb=_0x2f4902(0xbf)[_0x2f4902(0xc5)](_0x478b0f),_0x6aa3dd=JsonEx[_0x2f4902(0xe2)](_0x1b51ce[_0x5456fb])||VisuMZ[_0x2f4902(0xec)][_0x2f4902(0xc7)]();this[_0x2f4902(0x102)][_0x478b0f]=_0x6aa3dd;if(!_0x6aa3dd[_0x2f4902(0xfe)])return;_0x6aa3dd['OpaqueOnly']=_0x3c2421[_0x2f4902(0x10c)],_0x6aa3dd['OpaqueErrorMargin']=_0x3c2421[_0x2f4902(0x132)],_0x6aa3dd[_0x2f4902(0xeb)]=_0x3c2421[_0x2f4902(0xeb)],_0x6aa3dd[_0x2f4902(0xc6)]=_0x3c2421[_0x2f4902(0xc6)],_0x6aa3dd[_0x2f4902(0x10d)]=_0x3c2421[_0x2f4902(0x10d)];},Game_System[_0x585d44(0x11d)]['pictureCommonEventData']=function(_0x211aff){const _0x9e29e7=_0x585d44;return this[_0x9e29e7(0x102)]===undefined&&this[_0x9e29e7(0x13d)](),this[_0x9e29e7(0x102)][_0x211aff]===undefined&&this[_0x9e29e7(0x13a)](_0x211aff),this[_0x9e29e7(0x102)][_0x211aff];},Game_System['prototype']['pictureCommonEvent']=function(_0x1e4517){const _0x1fab3d=_0x585d44;if(this[_0x1fab3d(0x102)]===undefined)this['initPictureCommonEvents']();return this[_0x1fab3d(0xd2)](_0x1e4517)[_0x1fab3d(0x13e)];},Game_System[_0x585d44(0x11d)][_0x585d44(0xf5)]=function(_0x29b2d7){const _0x1058ba=_0x585d44;this[_0x1058ba(0x102)][_0x29b2d7]=VisuMZ[_0x1058ba(0xec)][_0x1058ba(0xc7)]();},Game_System['prototype'][_0x585d44(0x137)]=function(_0x5a3af5,_0x5832f5){const _0x5f4ffa=_0x585d44;if(this[_0x5f4ffa(0x102)]===undefined)this[_0x5f4ffa(0x13d)]();this[_0x5f4ffa(0x102)][_0x5a3af5]=_0x5832f5;},Game_System[_0x585d44(0x11d)][_0x585d44(0x118)]=function(_0x5ba91b){const _0x5e8ea4=_0x585d44;if(this[_0x5e8ea4(0x102)]===undefined)this[_0x5e8ea4(0x13d)]();return this[_0x5e8ea4(0xd2)](_0x5ba91b)[_0x5e8ea4(0x10c)];},Game_System[_0x585d44(0x11d)][_0x585d44(0xd0)]=function(_0x5cfd82){const _0x173f07=_0x585d44;if(this['_pictureCommonEvents']===undefined)this[_0x173f07(0x13d)]();return this[_0x173f07(0xd2)](_0x5cfd82)[_0x173f07(0x132)];},Game_System[_0x585d44(0x11d)][_0x585d44(0x13b)]=function(_0x5fb19f){const _0x5a0ebf=_0x585d44;if(this[_0x5a0ebf(0x102)]===undefined)this[_0x5a0ebf(0x13d)]();return this[_0x5a0ebf(0xd2)](_0x5fb19f)[_0x5a0ebf(0xeb)];},Game_System[_0x585d44(0x11d)][_0x585d44(0xe4)]=function(_0x1584e8){const _0x474dc0=_0x585d44;if(this[_0x474dc0(0x102)]===undefined)this['initPictureCommonEvents']();return this[_0x474dc0(0xd2)](_0x1584e8)['HoverTone'];},Game_System[_0x585d44(0x11d)]['getPictureCommonEventBlendMode']=function(_0x287a92){const _0x57526b=_0x585d44;if(this[_0x57526b(0x102)]===undefined)this[_0x57526b(0x13d)]();return this[_0x57526b(0xd2)](_0x287a92)[_0x57526b(0x10d)];},VisuMZ[_0x585d44(0xec)][_0x585d44(0x122)]=Scene_Map[_0x585d44(0x11d)][_0x585d44(0x119)],Scene_Map[_0x585d44(0x11d)][_0x585d44(0x119)]=function(){const _0x2a8ae1=_0x585d44;return VisuMZ['PictureCommonEvents'][_0x2a8ae1(0x122)][_0x2a8ae1(0x12c)](this)||this[_0x2a8ae1(0x103)][_0x2a8ae1(0xdb)]();},Sprite_Picture[_0x585d44(0x11d)][_0x585d44(0xf9)]=function(){const _0x2c4fe7=_0x585d44;if(Imported['VisuMZ_2_PictureChoices']&&this['hasPictureChoiceEvent']())return!![];if($gameMessage[_0x2c4fe7(0x112)]())return![];if($gameParty[_0x2c4fe7(0x107)]())return![];if(!this[_0x2c4fe7(0x12e)])return![];if(this['opacity']<=0x0)return![];const _0x145d53=SceneManager[_0x2c4fe7(0x139)];if(_0x145d53&&_0x145d53[_0x2c4fe7(0xe0)]===Scene_Map){if(!_0x145d53[_0x2c4fe7(0x130)]())return![];}return this['picture']()&&$gameSystem[_0x2c4fe7(0x10f)](this[_0x2c4fe7(0xc3)])>0x0;},Sprite_Picture[_0x585d44(0x11d)]['hasPictureChoiceEvent']=function(){const _0x54c79a=_0x585d44;return this[_0x54c79a(0xf1)]();},Sprite_Picture['prototype'][_0x585d44(0x136)]=function(){const _0x1e99d6=_0x585d44;if(!$gameSystem[_0x1e99d6(0x118)](this[_0x1e99d6(0xc3)]))return!![];const _0x11417f=new Point(TouchInput['x'],TouchInput['y']),_0xa8863f=this[_0x1e99d6(0x127)][_0x1e99d6(0x11b)](_0x11417f);let _0x58e2b7=Math[_0x1e99d6(0x129)](_0xa8863f['x']+this[_0x1e99d6(0x123)]['x']+this[_0x1e99d6(0xc0)]['x']*this['bitmap']['width']),_0x14e3e8=Math['round'](_0xa8863f['y']+this[_0x1e99d6(0x123)]['y']+this['anchor']['y']*this[_0x1e99d6(0xc4)][_0x1e99d6(0xcf)]);return this[_0x1e99d6(0xdc)](_0x58e2b7,_0x14e3e8);},Sprite_Picture[_0x585d44(0x11d)][_0x585d44(0xdc)]=function(_0x5bc487,_0x4937bb){const _0x4c0ef2=_0x585d44,_0x148442=$gameSystem['getPictureCommonEventErrorMargin'](this[_0x4c0ef2(0xc3)]),_0x155c8a=new Rectangle(0x0,0x0,this[_0x4c0ef2(0xc4)][_0x4c0ef2(0xdf)],this[_0x4c0ef2(0xc4)]['height']);for(let _0x2ac4ee=-_0x148442;_0x2ac4ee<=_0x148442;_0x2ac4ee++){if(_0x4c0ef2(0xf4)!==_0x4c0ef2(0xf4))this['setColorTone'](_0x4bdc12[_0x4c0ef2(0xe4)](this[_0x4c0ef2(0xc3)])||[0x0,0x0,0x0,0x0]);else for(let _0x522c59=-_0x148442;_0x522c59<=_0x148442;_0x522c59++){if(_0x4c0ef2(0xe6)!==_0x4c0ef2(0xe6)){if(this['_pictureCommonEvents']===_0x121cab)this[_0x4c0ef2(0x13d)]();return this[_0x4c0ef2(0xd2)](_0x490576)[_0x4c0ef2(0xc6)];}else{const _0x34693b=_0x5bc487+_0x2ac4ee,_0x42c3c6=_0x4937bb+_0x522c59;if(!_0x155c8a[_0x4c0ef2(0x131)](_0x34693b,_0x42c3c6))continue;const _0x6c727a=this[_0x4c0ef2(0xc4)][_0x4c0ef2(0xdd)](_0x34693b,_0x42c3c6);if(_0x6c727a>0x0)return!![];}}}return![];},Sprite_Picture[_0x585d44(0x11d)]['isBeingTouched']=function(){const _0x19f8e7=_0x585d44,_0x5a3517=Sprite_Clickable[_0x19f8e7(0x11d)][_0x19f8e7(0x11e)]['call'](this);return _0x5a3517&&this[_0x19f8e7(0x136)]();},Sprite_Picture[_0x585d44(0x11d)][_0x585d44(0xfc)]=function(){const _0x5cef65=_0x585d44;Sprite_Clickable['prototype'][_0x5cef65(0xfc)][_0x5cef65(0x12c)](this);if(!this[_0x5cef65(0xbd)]())return;this[_0x5cef65(0xde)]=!![];},Sprite_Picture[_0x585d44(0x11d)]['onMouseExit']=function(){const _0x169824=_0x585d44;Sprite_Clickable['prototype'][_0x169824(0x11f)][_0x169824(0x12c)](this);if(!this[_0x169824(0xbd)]())return;this[_0x169824(0xde)]=![];},Sprite_Picture[_0x585d44(0x11d)][_0x585d44(0x13c)]=function(){const _0x78c526=_0x585d44;Sprite_Clickable['prototype'][_0x78c526(0x13c)][_0x78c526(0x12c)](this),this[_0x78c526(0x134)]();},Sprite_Picture['prototype'][_0x585d44(0x134)]=function(){const _0x2fbed8=_0x585d44;if(!this[_0x2fbed8(0xbd)]())return;if(!this['checkCommonEventOpaqueOnly']())return;const _0x49505d=$gameSystem[_0x2fbed8(0x10f)](this[_0x2fbed8(0xc3)]);$gameTemp[_0x2fbed8(0x11c)](_0x49505d),this[_0x2fbed8(0x11f)]();},Sprite_Picture['prototype'][_0x585d44(0xbd)]=function(){const _0x462a7f=_0x585d44,_0x4217fb=$gameSystem[_0x462a7f(0x10f)](this[_0x462a7f(0xc3)]);return _0x4217fb>0x0;},VisuMZ['PictureCommonEvents'][_0x585d44(0x133)]=Sprite_Picture[_0x585d44(0x11d)][_0x585d44(0xee)],Sprite_Picture[_0x585d44(0x11d)]['updateOther']=function(){const _0x472fec=_0x585d44;VisuMZ['PictureCommonEvents'][_0x472fec(0x133)][_0x472fec(0x12c)](this),this[_0x472fec(0xf0)]();},Sprite_Picture[_0x585d44(0x11d)][_0x585d44(0xf0)]=function(){const _0x46ae77=_0x585d44;if(!this[_0x46ae77(0xde)])return;this[_0x46ae77(0xd1)]=$gameSystem['getPictureCommonEventBlendMode'](this[_0x46ae77(0xc3)])||0x0,$gameSystem[_0x46ae77(0x13b)](this[_0x46ae77(0xc3)])&&this[_0x46ae77(0x138)]($gameSystem[_0x46ae77(0xe4)](this[_0x46ae77(0xc3)])||[0x0,0x0,0x0,0x0]);},Sprite_Picture['prototype']['isPictureCommonEventPressed']=function(){const _0x31efbf=_0x585d44;if(!this[_0x31efbf(0xc1)]())return![];if(!this[_0x31efbf(0xea)]())return![];if($gameSystem[_0x31efbf(0x10f)](this[_0x31efbf(0xc3)])<=0x0)return![];if(!this['checkCommonEventOpaqueOnly']())return![];return!![];},Spriteset_Base[_0x585d44(0x11d)][_0x585d44(0xdb)]=function(){const _0x1b8e7e=_0x585d44;return this['_pictureContainer'][_0x1b8e7e(0xf7)][_0x1b8e7e(0x111)](_0x38f894=>_0x38f894[_0x1b8e7e(0xbc)]());};