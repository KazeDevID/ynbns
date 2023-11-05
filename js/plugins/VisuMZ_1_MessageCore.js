//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.26;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.26] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
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
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
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
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

function _0x2993(){const _0x498b83=['innerWidth','vvxkr','3275111nixLhE','isAutoColorAffected','updateDimensions','addContinuousShowTextCommands','_eventId','BOLD','<LINE\x20BREAK>','Scene_Options_maxCommands','resetPositionX','flushTextState','7974BzsChD','_MessageCoreSettings','<WORDWRAP>','gpZcZ','ConfigManager_makeData','addMessageCommonEvent','calcMoveEasing','\x1bCOLORLOCK[1]','initTextAlignement','actorName','resetTextColor','_textAlignment','trim','ChoiceWindowMaxRows','TextMacros','map\x20party','ParseItemNotetags','convertBaseEscapeCharacters','messageCoreTextSpeed','mainFontSize','_subject','refresh','Window_Options_addGeneralOptions','prepareWordWrapEscapeCharacters','ALL','terminateMessage','initialize','wXxSd','kEdza','obtainGold','zGOqv','CreateAutoColorRegExpLists','EVAL','ENABLE','exec','join','<RIGHT>','outlineWidth','numVisibleRows','setMessageWindowRows','toUpperCase','processFontChangeItalic','commandSymbol','MaxCols','exit','IMHeH','length','return\x20\x27','Type','TextCodeActions','_moveTargetX','ARRAYEVAL','iconIndex','convertTextMacros','add','MessageCore','FontBiggerCap','updateBackground','Weapons','clamp','parseChoiceText','easeInOut','faceName','applyData','HyXOD','AutoColorBypassList','isWeapon','blt','\x1bI[%1]','3199360mzeTPJ','setupChoices','close','gainItem','_relativePosition','dhUAL','setPositionType','xCFLw','756788NcsfgW','getPreservedFontSettings','WpXqo','_textDelayCount','VFRCr','RgMCm','registerCommand','khSDo','zZpsv','2119NQStQB','addedHeight','isWordWrapEnabled','ConvertTextAutoColorRegExpFriendly','updateMessageCommonEvents','clearActorNameAutoColor','_index','preemptive','setWordWrap','_showFast','Armors','States','setRelativePosition','CreateAutoColorRegExpListEntries','map\x20event','\x1bWrapBreak[0]','Window_Base_textSizeEx','_colorLock','ParseClassNotetags','stretchDimmerSprite','loadPicture','includes','Window_ChoiceList_updatePlacement','_scene','Settings','ARRAYJSON','max','Window_Options_changeVolume','isChoiceVisible','updateMove','follower','test','setHelpWindowWordWrap','windowWidth','addMessageCoreTextSpeedCommand','returnPreservedFontSettings','isSceneMap','min','Azkkv','SLmlK','partyMemberName','iteSe','battleUserName','isRunning','processAutoPosition','SmlUB','quantity','TqvRo','none','messageWordWrap','updateTransform','battle\x20actor','applyDatabaseAutoColor','round','JHruL','Game_Party_gainItem','ConvertParams','default','\x1bBOLD[1]','clearFlags','changeOutlineColor','Game_Interpreter_setupChoices','NameBoxWindowOffsetY','YiFsL','boxHeight','battleActionName','getConfigValue','processDrawPicture','360EWsxVr','call','victory','moveTo','updatePlacement','rtl','Items','textSpeedStatusText','bind','</CENTER>','list','onDatabaseLoaded','waptY','_data','216YYNcWX','isRTL','Window_Options_statusText','getLastGainedItemData','getChoiceListLineHeight','tliSo','filter','preFlushTextState','createContents','LineHeight','start','messagePositionReset','_dimmerSprite','lastGainedObjectName','yZaYQ','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','width','HxdVe','split','eaPex','iPUpg','_moveEasingType','setColorLock','calcWindowHeight','inputtingAction','right','choicePositionType','getTextAlignment','_wordWrap','boxWidth','Rows','Window_Message_terminateMessage','processFsTextCode','resetRect','true','onChoice','ChoiceWindowTextAlign','updateEvents','textWidth','processDrawCenteredPicture','obtainEscapeParam','kRzFo','slice','onProcessCharacter','obtainExp','isBusy','qMgdY','easeIn','process_VisuMZ_MessageCore_TextCodes_Replace','_centerMessageWindow','Window_Base_initialize','callOkHandler','false','processPyTextCode','code','JvnOU','AutoColorRegExp','Match','\x1bTEXTALIGNMENT[3]','updateForcedPlacement','uGCsw','PICTURE','indexOf','newPage','isVolumeSymbol','tomlN','ParseArmorNotetags','updateRelativePosition','addMessageCoreCommands','format','_target','VWrVq','qNVtp','_autoPositionTarget','VhgOF','convertHardcodedEscapeReplacements','\x1bITALIC[0]','MessageWindowProperties','<%1>','messageWindowRect','fontFace','\x1bTEXTALIGNMENT[0]','currentExt','MessageWindow','textCodeCheck','AddOption','Scene_Boot_onDatabaseLoaded','MaIbh','PsxAJ','addExtraShowChoices','convertNewPageTextStateMacros','_autoPosRegExp','placeCancelButton','_list','ITALIC','wMztO','PnuFh','processFontChangeBold','convertEscapeCharacters','processMessageCoreEscapeActions','process_VisuMZ_MessageCore_TextMacros','processActorNameAutoColorChanges','Window_Message_updatePlacement','setupEvents','addContinuousShowChoices','HelpWindow','3008235ZHNTlm','battle\x20enemy','_nameBoxWindow','mainFontFace','toLowerCase','Window_Base_processNewLine','QsFRN','drawBackCenteredPicture','HjapM','ParseStateNotetags','drawTextEx','Window_NameBox_refresh','duTWA','thjEh','isTriggered','nAZRH','NameBoxWindowDefaultColor','preConvertEscapeCharacters','_moveTargetWidth','windowPadding','setChoiceListMaxColumns','ConfigManager_applyData','padding','substr','tMVjk','_spriteset','Window_NameBox_updatePlacement','xVVsu','<LEFT>','name','<B>','isColorLocked','ParseSkillNotetags','isSceneBattle','loLJF','parameters','ParseAllNotetags','GPXJK','commandName','</B>','jPOsk','setFaceImage','_moveTargetY','URuGw','members','processEscapeCharacter','textColor','textSizeEx','itemHeight','processPreviousColor','hKigv','processAutoColorWords','innerHeight','choiceCols','convertShowChoiceEscapeCodes','TextStr','gEaPM','qwQux','ARRAYSTR','FontChangeValue','Window_Base_changeTextColor','fontBold','maxLines','processNewLine','convertVariableEscapeCharacters','drawing','processCharacter','process_VisuMZ_MessageCore_TextCodes_Action','[0]','defaultColor','outlineColor','Window_Base_update','General','prepareForcedPositionEscapeCharacters','openness','setMessageWindowWidth','makeData','prepareShowTextFollowups','Lafbd','isPressed','updateOffsetPosition','_moveDuration','RelativePXPY','PBAhi','textSizeExWordWrap','registerResetRect','AddAutoColor','center','zYvwQ','wFqjv','faceWidth','GItwv','updateAutoSizePosition','contents','choiceLineHeight','processAutoSize','Window_Help_refresh','_textDelay','_forcedPosition','<COLORLOCK>','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Instant','followers','_wholeMoveDuration','CENTERPICTURE','makeFontBigger','processTextAlignmentX','convertBackslashCharacters','Width','WORD_WRAP_PADDING','convertFontSettingsEscapeCharacters','applyMoveEasing','left','paintOpacity','CreateAutoColorFor','processStoredAutoColorChanges','SWITCHES','startY','28660wkBrcF','parse','_moveTargetHeight','updateOverlappingY','_messageCommonEvents','changeVolume','rREMZ','textSpeed','TextSpeed','Game_Map_updateEvents','makeFontSmaller','map','message','Window_Base_processAllText','Enemies','processWrapBreak','constructor','_autoSizeCheck','FnjzC','actor','lineHeight','FontSmallerCap','processTextAlignmentChange','outputWidth','GYCYv','ParseEnemyNotetags','\x1bTEXTALIGNMENT[2]','prototype','WdKEb','map\x20player','convertMessageCoreEscapeActions','isCommandEnabled','escapeStart','ARRAYSTRUCT','LineBreakSpace','inBattle','obtainItem','height','ChoiceWindowLineHeight','helpWordWrap','TextColor','Game_Map_setupEvents','normalColor','ChoiceWindowProperties','MessageRows','Window_Base_processControlCharacter','ParseWeaponNotetags','isHelpWindowWordWrap','currentCommand','description','Window_Message_newPage','Window_Message_processEscapeCharacter','ActionJS','battle\x20party','</COLORLOCK>','\x1bi[%1]%2','choices','fontSize','resetFontSettings','NameBoxWindowOffsetX','map\x20actor','contentsBack','event','cWnws','initMessageCore','_cancelButton','indent','edkML','setTextAlignment','TextManager_message','COLORLOCK','setupNumInput','ZfvJz','messageWidth','_messageWindow','WRAPBREAK','fnWXc','Window_Message_isTriggered','obtainEscapeString','databaseObjectName','Game_System_initialize','defeat','setMessageWindowWordWrap','createTextState','maxCols',')))','_autoColorActorNames','53545pfIhNp','postConvertEscapeCharacters','izvdw','setChoiceListMaxRows','version','drawBackPicture','XTxzs','adjustShowChoiceExtension','setLastGainedItemData','push','DISABLE','COMMONEVENT','selectDefault','getChoiceListMaxColumns','\x1bC[%1]%2\x1bPREVCOLOR[0]','setup','convertLockColorsEscapeCharacters','synchronizeNameBox','ARRAYFUNC','DrIcr','AutoColor','substring','haLbW','setTextDelay','TextCodeReplace','prepareShowTextCommand','JwtUM','HNHcF','registerActorNameAutoColorChanges','_lastGainedItemData','text','textSizeExTextAlignment','getMessageWindowWidth','floor','Window_Message_clearFlags','makeCommandList','index','battleTargetName','onNewPageMessageCore','canMove','statusText','HIDE','setupItemChoice','status','WordWrap','</RIGHT>','dsQvh','\x1bITALIC[1]','Window_Options_isVolumeSymbol','addGeneralOptions','textCodeResult','</LEFT>','convertChoiceMacros','addCommand','resetWordWrap','VisuMZ_0_CoreEngine','\x1bBOLD[0]','setChoiceListTextAlign','choiceTextAlign','clampPlacementPosition','changeTextSpeed','<I>','instantTextSpeed','SWITCH','_autoSizeRegexp','changeValue','processCustomWait','processColorLock','ceil','SHOW','StretchDimmedBg','_textColorStack','addedWidth','processAllText','isBreakShowTextCommands','process_VisuMZ_MessageCore_AutoColor','isArmor','messageRows','updateAutoPosition','moveBy','STR','itemPadding','maxChoiceWidth','isChoiceEnabled','WAIT','adjustShowChoiceDefault','MaxRows','updateNameBoxMove','shift','convertMessageCoreEscapeReplacements','changeTextColor','activate','Actors','Undefined','command101','processControlCharacter','refreshDimmerBitmap','_commonEventId','match','Skills','_messagePositionReset','\x5c%1','adjustShowChoiceCancel','Name','postFlushTextState','Yeozx','\x1bCOLORLOCK[0]','<BR>','convertTextAlignmentEscapeCharacters','qFFOT','launchMessageCommonEvent','addWrapBreakAfterPunctuation','getChoiceListMaxRows','CLRHF','Window_Message_synchronizeNameBox','EndPadding','Window_ChoiceList_windowX','value','getMessageWindowRows','update','_targets','getChoiceListTextAlign','makeDeepCopy','cHYas','easeOut','yZDUt','isContinuePrepareShowTextCommands','choice','Window_Base_processEscapeCharacter','TextColor%1','isInputting','startWait','prepareAutoSizeEscapeCharacters','itemRectWithPadding','changePaintOpacity','processPxTextCode','setChoiceListLineHeight','outLineColor','windowX','gEKAW','remove','Classes','IfBRI','outputHeight','addLoadListener','TightWrap','processCommonEvent','_resetRect','SortObjectByKeyLength','replace','qfbZC','EcXMv','Center','sort','APMNK','fontItalic','IWALd','nextEventCode','choiceRows','startX','_interpreter','onvIg','TZKXj','type','_indent','ChoiceWindowMaxCols','isMessageWindowWordWrap','maxCommands','clear','qNUTX'];_0x2993=function(){return _0x498b83;};return _0x2993();}function _0x1908(_0x3996b1,_0x2f79a7){const _0x29931d=_0x2993();return _0x1908=function(_0x1908ab,_0x8d1bfa){_0x1908ab=_0x1908ab-0x77;let _0x375782=_0x29931d[_0x1908ab];return _0x375782;},_0x1908(_0x3996b1,_0x2f79a7);}const _0x42d2fb=_0x1908;(function(_0x3f065e,_0x2865b1){const _0x5dcd4a=_0x1908,_0x1f2ab8=_0x3f065e();while(!![]){try{const _0x409c1b=parseInt(_0x5dcd4a(0x1aa))/0x1*(-parseInt(_0x5dcd4a(0x1ee))/0x2)+-parseInt(_0x5dcd4a(0x266))/0x3+parseInt(_0x5dcd4a(0x1a1))/0x4+-parseInt(_0x5dcd4a(0x9e))/0x5*(parseInt(_0x5dcd4a(0x1fc))/0x6)+-parseInt(_0x5dcd4a(0x14a))/0x7+parseInt(_0x5dcd4a(0x199))/0x8+-parseInt(_0x5dcd4a(0x154))/0x9*(-parseInt(_0x5dcd4a(0x2dc))/0xa);if(_0x409c1b===_0x2865b1)break;else _0x1f2ab8['push'](_0x1f2ab8['shift']());}catch(_0x492e2f){_0x1f2ab8['push'](_0x1f2ab8['shift']());}}}(_0x2993,0xd97cf));var label='MessageCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x42d2fb(0x202)](function(_0x25fb16){const _0x3b2178=_0x42d2fb;return _0x25fb16[_0x3b2178(0xc9)]&&_0x25fb16[_0x3b2178(0x78)][_0x3b2178(0x1bf)]('['+label+']');})[0x0];VisuMZ[label][_0x42d2fb(0x1c2)]=VisuMZ[label][_0x42d2fb(0x1c2)]||{},VisuMZ['ConvertParams']=function(_0x3b9c0d,_0xabc51d){const _0x11f1fe=_0x42d2fb;for(const _0x45d2e2 in _0xabc51d){if(_0x45d2e2[_0x11f1fe(0x100)](/(.*):(.*)/i)){const _0x433db4=String(RegExp['$1']),_0x49ebb4=String(RegExp['$2'])[_0x11f1fe(0x17c)]()[_0x11f1fe(0x160)]();let _0x347321,_0xb1cb74,_0x189ac2;switch(_0x49ebb4){case'NUM':_0x347321=_0xabc51d[_0x45d2e2]!==''?Number(_0xabc51d[_0x45d2e2]):0x0;break;case'ARRAYNUM':_0xb1cb74=_0xabc51d[_0x45d2e2]!==''?JSON[_0x11f1fe(0x2dd)](_0xabc51d[_0x45d2e2]):[],_0x347321=_0xb1cb74['map'](_0x3934be=>Number(_0x3934be));break;case _0x11f1fe(0x174):_0x347321=_0xabc51d[_0x45d2e2]!==''?eval(_0xabc51d[_0x45d2e2]):null;break;case _0x11f1fe(0x187):_0xb1cb74=_0xabc51d[_0x45d2e2]!==''?JSON[_0x11f1fe(0x2dd)](_0xabc51d[_0x45d2e2]):[],_0x347321=_0xb1cb74[_0x11f1fe(0x2e7)](_0x47b97a=>eval(_0x47b97a));break;case'JSON':_0x347321=_0xabc51d[_0x45d2e2]!==''?JSON[_0x11f1fe(0x2dd)](_0xabc51d[_0x45d2e2]):'';break;case _0x11f1fe(0x1c3):_0xb1cb74=_0xabc51d[_0x45d2e2]!==''?JSON[_0x11f1fe(0x2dd)](_0xabc51d[_0x45d2e2]):[],_0x347321=_0xb1cb74[_0x11f1fe(0x2e7)](_0x54e0e8=>JSON[_0x11f1fe(0x2dd)](_0x54e0e8));break;case'FUNC':_0x347321=_0xabc51d[_0x45d2e2]!==''?new Function(JSON[_0x11f1fe(0x2dd)](_0xabc51d[_0x45d2e2])):new Function('return\x200');break;case _0x11f1fe(0xb0):_0xb1cb74=_0xabc51d[_0x45d2e2]!==''?JSON['parse'](_0xabc51d[_0x45d2e2]):[],_0x347321=_0xb1cb74[_0x11f1fe(0x2e7)](_0x30a5ad=>new Function(JSON[_0x11f1fe(0x2dd)](_0x30a5ad)));break;case _0x11f1fe(0xee):_0x347321=_0xabc51d[_0x45d2e2]!==''?String(_0xabc51d[_0x45d2e2]):'';break;case _0x11f1fe(0x2a0):_0xb1cb74=_0xabc51d[_0x45d2e2]!==''?JSON[_0x11f1fe(0x2dd)](_0xabc51d[_0x45d2e2]):[],_0x347321=_0xb1cb74[_0x11f1fe(0x2e7)](_0x43c36a=>String(_0x43c36a));break;case'STRUCT':_0x189ac2=_0xabc51d[_0x45d2e2]!==''?JSON[_0x11f1fe(0x2dd)](_0xabc51d[_0x45d2e2]):{},_0x3b9c0d[_0x433db4]={},VisuMZ[_0x11f1fe(0x1e2)](_0x3b9c0d[_0x433db4],_0x189ac2);continue;case _0x11f1fe(0x2fd):_0xb1cb74=_0xabc51d[_0x45d2e2]!==''?JSON['parse'](_0xabc51d[_0x45d2e2]):[],_0x347321=_0xb1cb74[_0x11f1fe(0x2e7)](_0x54d8d0=>VisuMZ[_0x11f1fe(0x1e2)]({},JSON['parse'](_0x54d8d0)));break;default:continue;}_0x3b9c0d[_0x433db4]=_0x347321;}}return _0x3b9c0d;},(_0x7966fa=>{const _0x1a5b8d=_0x42d2fb,_0x562e3d=_0x7966fa['name'];for(const _0x50b538 of dependencies){if(_0x1a5b8d(0x19e)===_0x1a5b8d(0x16f))return this[_0x1a5b8d(0x2c5)](_0x38470,!![],!![]),this['processAutoPosition'](_0x1a5b8d(0x1dd),_0x548050(_0x4e08bb)||0x1),'';else{if(!Imported[_0x50b538]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x1a5b8d(0x241)](_0x562e3d,_0x50b538)),SceneManager['exit']();break;}}}const _0x1c159b=_0x7966fa[_0x1a5b8d(0x78)];if(_0x1c159b[_0x1a5b8d(0x100)](/\[Version[ ](.*?)\]/i)){const _0x29a4e7=Number(RegExp['$1']);if(_0x29a4e7!==VisuMZ[label][_0x1a5b8d(0xa2)]){if(_0x1a5b8d(0x140)!==_0x1a5b8d(0x291))alert(_0x1a5b8d(0x2ca)[_0x1a5b8d(0x241)](_0x562e3d,_0x29a4e7)),SceneManager[_0x1a5b8d(0x180)]();else{if(_0x5b7375<=0x0)return;const _0x56fb36=_0x4d4991[_0x1a5b8d(0x18b)][_0x1a5b8d(0x1c2)][_0x1a5b8d(0xb2)]['TextColor'+_0x69f627];let _0x47f4dd=_0x3cd26d[_0x1a5b8d(0x283)]['trim']();if(/^\d+$/[_0x1a5b8d(0x1c9)](_0x47f4dd))return;if(_0x4569d9[_0x1a5b8d(0x18b)][_0x1a5b8d(0x195)][_0x1a5b8d(0x1bf)](_0x47f4dd['toUpperCase']()))return;_0x47f4dd=_0x47f4dd['replace'](/\\I\[(\d+)\]/gi,''),_0x47f4dd=_0x47f4dd['replace'](/\x1bI\[(\d+)\]/gi,'');if(_0x47f4dd['length']<=0x0)return;if(_0x47f4dd[_0x1a5b8d(0x100)](/-----/i))return;_0x56fb36[_0x1a5b8d(0xa7)](_0x47f4dd);}}}if(_0x1c159b[_0x1a5b8d(0x100)](/\[Tier[ ](\d+)\]/i)){const _0x2ed42d=Number(RegExp['$1']);if(_0x2ed42d<tier){if(_0x1a5b8d(0x93)===_0x1a5b8d(0x1fa)){const _0xc594b5='\x1bi[%1]%2';_0x403cbd=_0xc594b5['format'](_0x6b80c6['iconIndex'],_0x3e17fc[_0x1a5b8d(0x283)]);}else alert(_0x1a5b8d(0x20b)[_0x1a5b8d(0x241)](_0x562e3d,_0x2ed42d,tier)),SceneManager['exit']();}else _0x1a5b8d(0x28e)!==_0x1a5b8d(0x28e)?this[_0x1a5b8d(0x9d)]=[]:tier=Math['max'](_0x2ed42d,tier);}VisuMZ[_0x1a5b8d(0x1e2)](VisuMZ[label][_0x1a5b8d(0x1c2)],_0x7966fa[_0x1a5b8d(0x289)]);})(pluginData),PluginManager[_0x42d2fb(0x1a7)](pluginData[_0x42d2fb(0x283)],_0x42d2fb(0x307),_0x57748b=>{const _0x1936e5=_0x42d2fb;VisuMZ[_0x1936e5(0x1e2)](_0x57748b,_0x57748b);const _0x2c0f05=_0x57748b[_0x1936e5(0x205)]||$gameSystem[_0x1936e5(0x200)]()||0x1,_0x387be6=_0x57748b[_0x1936e5(0xf4)]||$gameSystem['getChoiceListMaxRows']()||0x1,_0x250002=_0x57748b[_0x1936e5(0x17f)]||$gameSystem['getChoiceListMaxColumns']()||0x1,_0x4aac26=_0x57748b['TextAlign'][_0x1936e5(0x26a)]()||_0x1936e5(0x1e3);$gameSystem[_0x1936e5(0x126)](_0x2c0f05),$gameSystem[_0x1936e5(0xa1)](_0x387be6),$gameSystem[_0x1936e5(0x27a)](_0x250002),$gameSystem[_0x1936e5(0xd7)](_0x4aac26);}),PluginManager[_0x42d2fb(0x1a7)](pluginData[_0x42d2fb(0x283)],_0x42d2fb(0x249),_0x1bb551=>{const _0x2a6b21=_0x42d2fb;VisuMZ['ConvertParams'](_0x1bb551,_0x1bb551);const _0x242c80=_0x1bb551[_0x2a6b21(0x21a)]||$gameSystem[_0x2a6b21(0x114)]()||0x1,_0x250e01=_0x1bb551[_0x2a6b21(0x2d2)]||$gameSystem[_0x2a6b21(0xbe)]()||0x1;$gameTemp[_0x2a6b21(0x22d)]=_0x1bb551[_0x2a6b21(0x136)]||![];const _0x172f70=_0x1bb551[_0x2a6b21(0xca)]['toLowerCase']();$gameSystem[_0x2a6b21(0x17b)](_0x242c80),$gameSystem[_0x2a6b21(0x2b1)](_0x250e01);['true',_0x2a6b21(0x230)][_0x2a6b21(0x1bf)](_0x172f70)&&$gameSystem[_0x2a6b21(0x99)](eval(_0x172f70));const _0x515c7f=SceneManager[_0x2a6b21(0x1c1)][_0x2a6b21(0x91)];_0x515c7f&&(_0x2a6b21(0x273)!==_0x2a6b21(0x1e9)?(_0x515c7f[_0x2a6b21(0xd4)](),_0x515c7f[_0x2a6b21(0x14c)](),_0x515c7f['createContents']()):(_0x2f307a[_0x2a6b21(0x18b)]['Window_Base_processControlCharacter'][_0x2a6b21(0x1ef)](this,_0x4af7e0,_0x9520e7),_0x20fff6===_0x2a6b21(0x1b9)&&this[_0x2a6b21(0x2eb)](_0x181d0d)));}),VisuMZ['MessageCore'][_0x42d2fb(0x252)]=Scene_Boot['prototype'][_0x42d2fb(0x1f9)],Scene_Boot[_0x42d2fb(0x2f7)][_0x42d2fb(0x1f9)]=function(){const _0x4fe2ac=_0x42d2fb;VisuMZ['MessageCore'][_0x4fe2ac(0x252)]['call'](this),this['process_VisuMZ_MessageCore_TextCodes_Action'](),this[_0x4fe2ac(0x22c)](),this[_0x4fe2ac(0x260)](),this['process_VisuMZ_MessageCore_AutoColor']();},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x132)]=function(_0x3db18d){const _0xe18060=_0x42d2fb,_0x3374d1=VisuMZ['MessageCore'][_0xe18060(0x1c2)][_0x3db18d];_0x3374d1[_0xe18060(0x137)]((_0x4fc362,_0x1f8874)=>{const _0x46828c=_0xe18060;if('JkeyO'===_0x46828c(0x238))_0x11e7da[_0x46828c(0x159)](_0x38ef55);else{if(!_0x4fc362||!_0x1f8874)return-0x1;return _0x1f8874['Match'][_0x46828c(0x182)]-_0x4fc362[_0x46828c(0x235)][_0x46828c(0x182)];}});},Scene_Boot[_0x42d2fb(0x2f7)][_0x42d2fb(0x2a9)]=function(){const _0x190903=_0x42d2fb;VisuMZ[_0x190903(0x18b)]['SortObjectByKeyLength'](_0x190903(0x185));for(const _0x6323e7 of VisuMZ[_0x190903(0x18b)]['Settings'][_0x190903(0x185)]){_0x6323e7[_0x190903(0x235)]=_0x6323e7[_0x190903(0x235)][_0x190903(0x17c)](),_0x6323e7[_0x190903(0x250)]=new RegExp('\x1b'+_0x6323e7['Match'],'gi'),_0x6323e7[_0x190903(0xd0)]='\x1b'+_0x6323e7[_0x190903(0x235)];if(_0x6323e7['Type']==='')_0x6323e7[_0x190903(0xd0)]+='[0]';}},Scene_Boot[_0x42d2fb(0x2f7)][_0x42d2fb(0x22c)]=function(){const _0x544174=_0x42d2fb;VisuMZ[_0x544174(0x18b)][_0x544174(0x132)]('TextCodeReplace');for(const _0x4e9dfa of VisuMZ[_0x544174(0x18b)]['Settings'][_0x544174(0xb6)]){if('CzAaK'===_0x544174(0x1a8))return _0x48d7ec[_0x544174(0x10e)]();else _0x4e9dfa[_0x544174(0x250)]=new RegExp('\x1b'+_0x4e9dfa[_0x544174(0x235)]+_0x4e9dfa[_0x544174(0x184)],'gi'),_0x4e9dfa[_0x544174(0x29d)]!==''&&_0x4e9dfa[_0x544174(0x29d)]!==_0x544174(0xfb)?_0x4e9dfa[_0x544174(0xd0)]=new Function('return\x20\x27'+_0x4e9dfa[_0x544174(0x29d)][_0x544174(0x133)](/\\/g,'\x1b')+'\x27'):_0x4e9dfa[_0x544174(0xd0)]=_0x4e9dfa['TextJS'];}},Scene_Boot[_0x42d2fb(0x2f7)][_0x42d2fb(0x260)]=function(){const _0x3dfb69=_0x42d2fb;for(const _0x5ef375 of VisuMZ['MessageCore']['Settings'][_0x3dfb69(0x162)]){_0x5ef375[_0x3dfb69(0x250)]=new RegExp('\x5c['+_0x5ef375['Match']+'\x5c]','gi'),_0x5ef375['TextStr']!==''&&_0x5ef375[_0x3dfb69(0x29d)]!==_0x3dfb69(0xfb)?_0x5ef375['textCodeResult']=new Function('return\x20\x27'+_0x5ef375[_0x3dfb69(0x29d)][_0x3dfb69(0x133)](/\\/g,'\x1b')+'\x27'):_0x5ef375[_0x3dfb69(0xd0)]=_0x5ef375['TextJS'];}},Scene_Boot[_0x42d2fb(0x2f7)][_0x42d2fb(0xe9)]=function(){const _0x3442e5=_0x42d2fb,_0x51539a=VisuMZ[_0x3442e5(0x18b)][_0x3442e5(0x1c2)][_0x3442e5(0xb2)];!VisuMZ[_0x3442e5(0x28a)]&&(VisuMZ[_0x3442e5(0x18b)][_0x3442e5(0x2bc)]($dataClasses,_0x51539a[_0x3442e5(0x12b)]),VisuMZ['MessageCore'][_0x3442e5(0x2bc)]($dataSkills,_0x51539a[_0x3442e5(0x101)]),VisuMZ[_0x3442e5(0x18b)][_0x3442e5(0x2bc)]($dataItems,_0x51539a['Items']),VisuMZ[_0x3442e5(0x18b)]['AddAutoColor']($dataWeapons,_0x51539a[_0x3442e5(0x18e)]),VisuMZ[_0x3442e5(0x18b)][_0x3442e5(0x2bc)]($dataArmors,_0x51539a[_0x3442e5(0x1b4)]),VisuMZ['MessageCore'][_0x3442e5(0x2bc)]($dataEnemies,_0x51539a[_0x3442e5(0x2ea)]),VisuMZ[_0x3442e5(0x18b)][_0x3442e5(0x2bc)]($dataStates,_0x51539a[_0x3442e5(0x1b5)])),VisuMZ['MessageCore'][_0x3442e5(0x173)]();},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x195)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x42d2fb(0x284),_0x42d2fb(0x28d),_0x42d2fb(0xdb),'</I>',_0x42d2fb(0x282),_0x42d2fb(0xd1),'<CENTER>',_0x42d2fb(0x1f7),_0x42d2fb(0x178),_0x42d2fb(0xcb),_0x42d2fb(0x2c9),_0x42d2fb(0x7d),'(((',_0x42d2fb(0x9c),_0x42d2fb(0x156),'</WORDWRAP>',_0x42d2fb(0x109),_0x42d2fb(0x150),'PICTURE',_0x42d2fb(0x2ce),_0x42d2fb(0xa9),_0x42d2fb(0xf2),_0x42d2fb(0xe3),_0x42d2fb(0xc7),_0x42d2fb(0x175),_0x42d2fb(0xa8),_0x42d2fb(0xdd),_0x42d2fb(0x2da),_0x42d2fb(0x16c),'ANY'],VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x2bc)]=function(_0x214ea6,_0xd0db6f){const _0x2b8713=_0x42d2fb;if(_0xd0db6f<=0x0)return;const _0x35f532=_0x214ea6;for(const _0x17487d of _0x35f532){if(!_0x17487d)continue;VisuMZ[_0x2b8713(0x18b)][_0x2b8713(0x2d8)](_0x17487d,_0xd0db6f);}},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x173)]=function(){const _0x23f55a=_0x42d2fb;VisuMZ['MessageCore'][_0x23f55a(0x234)]=[];for(let _0x10c869=0x1;_0x10c869<=0x1f;_0x10c869++){const _0x2735a0=_0x23f55a(0x11f)[_0x23f55a(0x241)](_0x10c869),_0x28fdcc=VisuMZ['MessageCore']['Settings'][_0x23f55a(0xb2)][_0x2735a0];_0x28fdcc[_0x23f55a(0x137)]((_0x1d4629,_0x1abadd)=>{const _0x3fee10=_0x23f55a;if(!_0x1d4629||!_0x1abadd)return-0x1;return _0x1abadd['length']-_0x1d4629[_0x3fee10(0x182)];}),this[_0x23f55a(0x1b7)](_0x28fdcc,_0x10c869);}},VisuMZ[_0x42d2fb(0x18b)]['CreateAutoColorRegExpListEntries']=function(_0x7cebb3,_0x1d9785){const _0x1e5085=_0x42d2fb;for(const _0x2ea6d1 of _0x7cebb3){if(_0x2ea6d1[_0x1e5085(0x182)]<=0x0)continue;if(/^\d+$/['test'](_0x2ea6d1))continue;let _0x97e71c=VisuMZ[_0x1e5085(0x18b)][_0x1e5085(0x1ad)](_0x2ea6d1);if(_0x2ea6d1[_0x1e5085(0x100)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0xcf8976=new RegExp(_0x97e71c,'i');else var _0xcf8976=new RegExp('\x5cb'+_0x97e71c+'\x5cb','g');VisuMZ[_0x1e5085(0x18b)]['AutoColorRegExp'][_0x1e5085(0xa7)]([_0xcf8976,_0x1e5085(0xac)['format'](_0x1d9785,_0x2ea6d1)]);}},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x1ad)]=function(_0x49df3f){const _0x143435=_0x42d2fb;return _0x49df3f=_0x49df3f[_0x143435(0x133)](/(\W)/gi,(_0x59df0e,_0x17a62f)=>_0x143435(0x103)[_0x143435(0x241)](_0x17a62f)),_0x49df3f;},VisuMZ['MessageCore'][_0x42d2fb(0x1bc)]=VisuMZ['ParseClassNotetags'],VisuMZ['ParseClassNotetags']=function(_0x408813){const _0x11db68=_0x42d2fb;VisuMZ['MessageCore'][_0x11db68(0x1bc)][_0x11db68(0x1ef)](this,_0x408813);const _0x4d8a92=VisuMZ[_0x11db68(0x18b)][_0x11db68(0x1c2)][_0x11db68(0xb2)];VisuMZ[_0x11db68(0x18b)][_0x11db68(0x2d8)](_0x408813,_0x4d8a92[_0x11db68(0x12b)]);},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x286)]=VisuMZ[_0x42d2fb(0x286)],VisuMZ['ParseSkillNotetags']=function(_0x4e7b04){const _0x28dd38=_0x42d2fb;VisuMZ[_0x28dd38(0x18b)][_0x28dd38(0x286)][_0x28dd38(0x1ef)](this,_0x4e7b04);const _0x37582=VisuMZ[_0x28dd38(0x18b)][_0x28dd38(0x1c2)][_0x28dd38(0xb2)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x4e7b04,_0x37582[_0x28dd38(0x101)]);},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x164)]=VisuMZ[_0x42d2fb(0x164)],VisuMZ[_0x42d2fb(0x164)]=function(_0x334e51){const _0x3fd4ed=_0x42d2fb;VisuMZ['MessageCore'][_0x3fd4ed(0x164)]['call'](this,_0x334e51);const _0x11d549=VisuMZ[_0x3fd4ed(0x18b)][_0x3fd4ed(0x1c2)][_0x3fd4ed(0xb2)];VisuMZ[_0x3fd4ed(0x18b)][_0x3fd4ed(0x2d8)](_0x334e51,_0x11d549['Items']);},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x30a)]=VisuMZ[_0x42d2fb(0x30a)],VisuMZ['ParseWeaponNotetags']=function(_0x5a2f46){const _0x2b5913=_0x42d2fb;VisuMZ['MessageCore'][_0x2b5913(0x30a)][_0x2b5913(0x1ef)](this,_0x5a2f46);const _0x332936=VisuMZ[_0x2b5913(0x18b)]['Settings'][_0x2b5913(0xb2)];VisuMZ['MessageCore'][_0x2b5913(0x2d8)](_0x5a2f46,_0x332936[_0x2b5913(0x18e)]);},VisuMZ[_0x42d2fb(0x18b)]['ParseArmorNotetags']=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x42d2fb(0x23e)]=function(_0x127191){const _0x5f0653=_0x42d2fb;VisuMZ[_0x5f0653(0x18b)][_0x5f0653(0x23e)][_0x5f0653(0x1ef)](this,_0x127191);const _0x186d4b=VisuMZ['MessageCore'][_0x5f0653(0x1c2)][_0x5f0653(0xb2)];VisuMZ[_0x5f0653(0x18b)][_0x5f0653(0x2d8)](_0x127191,_0x186d4b[_0x5f0653(0x1b4)]);},VisuMZ['MessageCore']['ParseEnemyNotetags']=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x42d2fb(0x2f5)]=function(_0x3d09ac){const _0x237017=_0x42d2fb;VisuMZ['MessageCore']['ParseEnemyNotetags'][_0x237017(0x1ef)](this,_0x3d09ac);const _0x239570=VisuMZ[_0x237017(0x18b)]['Settings']['AutoColor'];VisuMZ[_0x237017(0x18b)][_0x237017(0x2d8)](_0x3d09ac,_0x239570['Enemies']);},VisuMZ['MessageCore'][_0x42d2fb(0x26f)]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x42d2fb(0x26f)]=function(_0x3f7374){const _0x2c686d=_0x42d2fb;VisuMZ[_0x2c686d(0x18b)]['ParseStateNotetags'][_0x2c686d(0x1ef)](this,_0x3f7374);const _0xd03b40=VisuMZ[_0x2c686d(0x18b)][_0x2c686d(0x1c2)][_0x2c686d(0xb2)];VisuMZ[_0x2c686d(0x18b)][_0x2c686d(0x2d8)](_0x3f7374,_0xd03b40['States']);},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x2d8)]=function(_0x5ef868,_0x34906a){const _0x34e074=_0x42d2fb;if(_0x34906a<=0x0)return;const _0x1d98d7=VisuMZ[_0x34e074(0x18b)][_0x34e074(0x1c2)][_0x34e074(0xb2)][_0x34e074(0x304)+_0x34906a];let _0x425c01=_0x5ef868[_0x34e074(0x283)][_0x34e074(0x160)]();if(/^\d+$/[_0x34e074(0x1c9)](_0x425c01))return;if(VisuMZ[_0x34e074(0x18b)][_0x34e074(0x195)][_0x34e074(0x1bf)](_0x425c01[_0x34e074(0x17c)]()))return;_0x425c01=_0x425c01[_0x34e074(0x133)](/\\I\[(\d+)\]/gi,''),_0x425c01=_0x425c01['replace'](/\x1bI\[(\d+)\]/gi,'');if(_0x425c01['length']<=0x0)return;if(_0x425c01['match'](/-----/i))return;_0x1d98d7[_0x34e074(0xa7)](_0x425c01);},SceneManager[_0x42d2fb(0x287)]=function(){const _0x5589ba=_0x42d2fb;return this[_0x5589ba(0x1c1)]&&this[_0x5589ba(0x1c1)][_0x5589ba(0x2ec)]===Scene_Battle;},SceneManager[_0x42d2fb(0x1ce)]=function(){const _0x2ca9aa=_0x42d2fb;return this[_0x2ca9aa(0x1c1)]&&this[_0x2ca9aa(0x1c1)][_0x2ca9aa(0x2ec)]===Scene_Map;},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x8c)]=TextManager[_0x42d2fb(0x2e8)],TextManager[_0x42d2fb(0x2e8)]=function(_0x18e717){const _0x3a99a8=_0x42d2fb,_0x3d30c2=['levelUp','emerge',_0x3a99a8(0x1b1),'surprise',_0x3a99a8(0x1f0),_0x3a99a8(0x98),_0x3a99a8(0x2fc),_0x3a99a8(0x228),_0x3a99a8(0x171),_0x3a99a8(0x300)];let _0x808b25=VisuMZ[_0x3a99a8(0x18b)][_0x3a99a8(0x8c)]['call'](this,_0x18e717);return _0x3d30c2[_0x3a99a8(0x1bf)](_0x18e717)&&(_0x808b25='</WORDWRAP>'+_0x808b25),_0x808b25;},ConfigManager[_0x42d2fb(0x2e3)]=VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x1c2)][_0x42d2fb(0x2e4)]['Default'],VisuMZ[_0x42d2fb(0x18b)]['ConfigManager_makeData']=ConfigManager[_0x42d2fb(0x2b2)],ConfigManager[_0x42d2fb(0x2b2)]=function(){const _0x2f918e=_0x42d2fb,_0x4e4067=VisuMZ[_0x2f918e(0x18b)][_0x2f918e(0x158)][_0x2f918e(0x1ef)](this);return _0x4e4067[_0x2f918e(0x2e3)]=this[_0x2f918e(0x2e3)],_0x4e4067;},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x27b)]=ConfigManager[_0x42d2fb(0x193)],ConfigManager[_0x42d2fb(0x193)]=function(_0x13a031){const _0x57118f=_0x42d2fb;VisuMZ[_0x57118f(0x18b)][_0x57118f(0x27b)][_0x57118f(0x1ef)](this,_0x13a031);if(_0x57118f(0x2e3)in _0x13a031)this['textSpeed']=Number(_0x13a031[_0x57118f(0x2e3)])[_0x57118f(0x18f)](0x1,0xb);else{if(_0x57118f(0x272)===_0x57118f(0x25c)){const _0x1a0922=_0x1c36c7[_0x57118f(0x20e)](',')[_0x57118f(0x2e7)](_0x152c43=>_0x436175(_0x152c43)||0x0);if(_0x1a0922[0x0]!==_0x445756)this[_0x57118f(0x2c8)]['width']=_0x851c4e(_0x1a0922[0x2]);if(_0x1a0922[0x1]!==_0x1017f0)this[_0x57118f(0x2c8)][_0x57118f(0x301)]=_0xf6e2fc(_0x1a0922[0x3]);return'';}else this['textSpeed']=VisuMZ[_0x57118f(0x18b)][_0x57118f(0x1c2)][_0x57118f(0x2e4)]['Default'];}},TextManager[_0x42d2fb(0x166)]=VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x1c2)][_0x42d2fb(0x2e4)][_0x42d2fb(0x105)],TextManager[_0x42d2fb(0xdc)]=VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x1c2)][_0x42d2fb(0x2e4)][_0x42d2fb(0x2cb)],VisuMZ['MessageCore']['Game_System_initialize']=Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0x16e)],Game_System['prototype']['initialize']=function(){const _0x1b45fc=_0x42d2fb;VisuMZ['MessageCore'][_0x1b45fc(0x97)]['call'](this),this['initMessageCore']();},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0x87)]=function(){const _0x34d586=_0x42d2fb,_0x1d07f9=VisuMZ[_0x34d586(0x18b)]['Settings'][_0x34d586(0x2ae)],_0x24ec93=VisuMZ[_0x34d586(0x18b)][_0x34d586(0x1c2)][_0x34d586(0xca)];this[_0x34d586(0x155)]={'messageRows':_0x1d07f9[_0x34d586(0x308)],'messageWidth':_0x1d07f9['MessageWidth'],'messageWordWrap':_0x24ec93[_0x34d586(0x24f)],'helpWordWrap':_0x24ec93[_0x34d586(0x265)],'choiceLineHeight':_0x1d07f9[_0x34d586(0x302)],'choiceRows':_0x1d07f9[_0x34d586(0x161)],'choiceCols':_0x1d07f9[_0x34d586(0x143)],'choiceTextAlign':_0x1d07f9[_0x34d586(0x220)]};},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0x114)]=function(){const _0x58f0f2=_0x42d2fb;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x58f0f2(0x155)][_0x58f0f2(0xeb)]===undefined)this['initMessageCore']();return this[_0x58f0f2(0x155)][_0x58f0f2(0xeb)];},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0x17b)]=function(_0x304c38){const _0x4a99ba=_0x42d2fb;if(this[_0x4a99ba(0x155)]===undefined)this['initMessageCore']();if(this[_0x4a99ba(0x155)][_0x4a99ba(0xeb)]===undefined)this[_0x4a99ba(0x87)]();this[_0x4a99ba(0x155)][_0x4a99ba(0xeb)]=_0x304c38||0x1;},Game_System[_0x42d2fb(0x2f7)]['getMessageWindowWidth']=function(){const _0x5ca26e=_0x42d2fb;if(this[_0x5ca26e(0x155)]===undefined)this['initMessageCore']();if(this[_0x5ca26e(0x155)]['messageWidth']===undefined)this[_0x5ca26e(0x87)]();return this[_0x5ca26e(0x155)][_0x5ca26e(0x90)];},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0x2b1)]=function(_0x535315){const _0x24ccb5=_0x42d2fb;if(this[_0x24ccb5(0x155)]===undefined)this[_0x24ccb5(0x87)]();if(this[_0x24ccb5(0x155)][_0x24ccb5(0x90)]===undefined)this[_0x24ccb5(0x87)]();_0x535315=Math[_0x24ccb5(0xe2)](_0x535315);if(_0x535315%0x2!==0x0)_0x535315+=0x1;this[_0x24ccb5(0x155)]['messageWidth']=_0x535315||0x2;},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0x144)]=function(){const _0x18a646=_0x42d2fb;if(this[_0x18a646(0x155)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings']['messageWordWrap']===undefined)this[_0x18a646(0x87)]();return this[_0x18a646(0x155)][_0x18a646(0x1db)];},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0x99)]=function(_0x4b7bff){const _0x3260e5=_0x42d2fb;if(this[_0x3260e5(0x155)]===undefined)this[_0x3260e5(0x87)]();if(this[_0x3260e5(0x155)]['messageWordWrap']===undefined)this[_0x3260e5(0x87)]();this[_0x3260e5(0x155)][_0x3260e5(0x1db)]=_0x4b7bff;},Game_System['prototype'][_0x42d2fb(0x30b)]=function(){const _0x4374d7=_0x42d2fb;if(this[_0x4374d7(0x155)]===undefined)this[_0x4374d7(0x87)]();if(this['_MessageCoreSettings'][_0x4374d7(0x303)]===undefined)this[_0x4374d7(0x87)]();return this[_0x4374d7(0x155)][_0x4374d7(0x303)];},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0x1ca)]=function(_0x4193e1){const _0x16cde0=_0x42d2fb;if(this[_0x16cde0(0x155)]===undefined)this[_0x16cde0(0x87)]();if(this[_0x16cde0(0x155)][_0x16cde0(0x303)]===undefined)this[_0x16cde0(0x87)]();this[_0x16cde0(0x155)]['helpWordWrap']=_0x4193e1;},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0x200)]=function(){const _0x468087=_0x42d2fb;if(this[_0x468087(0x155)]===undefined)this[_0x468087(0x87)]();if(this[_0x468087(0x155)][_0x468087(0x2c4)]===undefined)this['initMessageCore']();return this[_0x468087(0x155)][_0x468087(0x2c4)];},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0x126)]=function(_0x44ec7e){const _0x5d15a2=_0x42d2fb;if(this[_0x5d15a2(0x155)]===undefined)this[_0x5d15a2(0x87)]();if(this['_MessageCoreSettings'][_0x5d15a2(0x2c4)]===undefined)this[_0x5d15a2(0x87)]();this[_0x5d15a2(0x155)][_0x5d15a2(0x2c4)]=_0x44ec7e||0x1;},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0x10e)]=function(){const _0x42c60c=_0x42d2fb;if(this[_0x42c60c(0x155)]===undefined)this[_0x42c60c(0x87)]();if(this[_0x42c60c(0x155)][_0x42c60c(0x13c)]===undefined)this[_0x42c60c(0x87)]();return this[_0x42c60c(0x155)][_0x42c60c(0x13c)];},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0xa1)]=function(_0xebf1e8){const _0x7e208f=_0x42d2fb;if(this[_0x7e208f(0x155)]===undefined)this[_0x7e208f(0x87)]();if(this['_MessageCoreSettings']['choiceRows']===undefined)this[_0x7e208f(0x87)]();this['_MessageCoreSettings'][_0x7e208f(0x13c)]=_0xebf1e8||0x1;},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0xab)]=function(){const _0x3ea07a=_0x42d2fb;if(this[_0x3ea07a(0x155)]===undefined)this[_0x3ea07a(0x87)]();if(this[_0x3ea07a(0x155)][_0x3ea07a(0x29b)]===undefined)this[_0x3ea07a(0x87)]();return this[_0x3ea07a(0x155)]['choiceCols'];},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0x27a)]=function(_0x58a166){const _0x32dbe3=_0x42d2fb;if(this[_0x32dbe3(0x155)]===undefined)this[_0x32dbe3(0x87)]();if(this['_MessageCoreSettings'][_0x32dbe3(0x29b)]===undefined)this[_0x32dbe3(0x87)]();this['_MessageCoreSettings'][_0x32dbe3(0x29b)]=_0x58a166||0x1;},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0x117)]=function(){const _0x1e041d=_0x42d2fb;if(this[_0x1e041d(0x155)]===undefined)this[_0x1e041d(0x87)]();if(this[_0x1e041d(0x155)][_0x1e041d(0xd8)]===undefined)this[_0x1e041d(0x87)]();return this[_0x1e041d(0x155)][_0x1e041d(0xd8)];},Game_System[_0x42d2fb(0x2f7)][_0x42d2fb(0xd7)]=function(_0x474435){const _0x36d6e9=_0x42d2fb;if(this[_0x36d6e9(0x155)]===undefined)this['initMessageCore']();if(this[_0x36d6e9(0x155)]['choiceTextAlign']===undefined)this['initMessageCore']();this[_0x36d6e9(0x155)]['choiceTextAlign']=_0x474435[_0x36d6e9(0x26a)]();},VisuMZ['MessageCore']['Game_Party_initialize']=Game_Party[_0x42d2fb(0x2f7)][_0x42d2fb(0x16e)],Game_Party['prototype'][_0x42d2fb(0x16e)]=function(){const _0x1d4a8f=_0x42d2fb;VisuMZ[_0x1d4a8f(0x18b)]['Game_Party_initialize'][_0x1d4a8f(0x1ef)](this),this[_0x1d4a8f(0x87)]();},Game_Party[_0x42d2fb(0x2f7)][_0x42d2fb(0x87)]=function(){this['_lastGainedItemData']={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party['prototype']['getLastGainedItemData']=function(){const _0x5631b6=_0x42d2fb;if(this['_lastGainedItemData']===undefined)this[_0x5631b6(0x87)]();return this['_lastGainedItemData'];},Game_Party[_0x42d2fb(0x2f7)][_0x42d2fb(0xa6)]=function(_0x242fcb,_0x174b4e){const _0x3cbf9f=_0x42d2fb;if(this[_0x3cbf9f(0xbb)]===undefined)this['initMessageCore']();if(!_0x242fcb)return;if(DataManager['isItem'](_0x242fcb))'oGOmD'===_0x3cbf9f(0x20a)?_0x5453af[_0x3cbf9f(0x18b)][_0x3cbf9f(0x1c2)][_0x3cbf9f(0x2e4)]['AddOption']&&this[_0x3cbf9f(0x1cc)]():this[_0x3cbf9f(0xbb)][_0x3cbf9f(0x141)]=0x0;else{if(DataManager[_0x3cbf9f(0x196)](_0x242fcb))this['_lastGainedItemData'][_0x3cbf9f(0x141)]=0x1;else DataManager[_0x3cbf9f(0xea)](_0x242fcb)&&(this[_0x3cbf9f(0xbb)][_0x3cbf9f(0x141)]=0x2);}this[_0x3cbf9f(0xbb)]['id']=_0x242fcb['id'],this[_0x3cbf9f(0xbb)]['quantity']=_0x174b4e;},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x1e1)]=Game_Party['prototype'][_0x42d2fb(0x19c)],Game_Party[_0x42d2fb(0x2f7)]['gainItem']=function(_0x520b56,_0x5b879e,_0x1d24d3){const _0x1d2f5a=_0x42d2fb;VisuMZ[_0x1d2f5a(0x18b)][_0x1d2f5a(0x1e1)][_0x1d2f5a(0x1ef)](this,_0x520b56,_0x5b879e,_0x1d24d3),_0x5b879e>0x0&&this['setLastGainedItemData'](_0x520b56,_0x5b879e);},VisuMZ[_0x42d2fb(0x18b)]['Game_Map_initialize']=Game_Map[_0x42d2fb(0x2f7)][_0x42d2fb(0x16e)],Game_Map[_0x42d2fb(0x2f7)][_0x42d2fb(0x16e)]=function(){const _0x4de6a5=_0x42d2fb;VisuMZ[_0x4de6a5(0x18b)]['Game_Map_initialize'][_0x4de6a5(0x1ef)](this),this[_0x4de6a5(0x2e0)]=[];},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x305)]=Game_Map[_0x42d2fb(0x2f7)][_0x42d2fb(0x263)],Game_Map[_0x42d2fb(0x2f7)]['setupEvents']=function(){const _0x37f70f=_0x42d2fb;VisuMZ[_0x37f70f(0x18b)][_0x37f70f(0x305)][_0x37f70f(0x1ef)](this),this[_0x37f70f(0x2e0)]=[];},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x2e5)]=Game_Map['prototype']['updateEvents'],Game_Map['prototype'][_0x42d2fb(0x221)]=function(){const _0x2c81b7=_0x42d2fb;VisuMZ[_0x2c81b7(0x18b)][_0x2c81b7(0x2e5)]['call'](this),this[_0x2c81b7(0x1ae)]();},Game_Map[_0x42d2fb(0x2f7)]['addMessageCommonEvent']=function(_0x345238){const _0x1f9660=_0x42d2fb;if(!$dataCommonEvents[_0x345238])return;this[_0x1f9660(0x2e0)]=this[_0x1f9660(0x2e0)]||[];const _0x3d6fcf=this[_0x1f9660(0x13e)]['_eventId'],_0x1cd865=new Game_MessageCommonEvent(_0x345238,_0x3d6fcf);this['_messageCommonEvents'][_0x1f9660(0xa7)](_0x1cd865);},Game_Map[_0x42d2fb(0x2f7)][_0x42d2fb(0x1ae)]=function(){const _0x568af7=_0x42d2fb;this['_messageCommonEvents']=this[_0x568af7(0x2e0)]||[];for(const _0x39812b of this['_messageCommonEvents']){!_0x39812b[_0x568af7(0x13e)]?this[_0x568af7(0x2e0)][_0x568af7(0x12a)](_0x39812b):_0x39812b[_0x568af7(0x115)]();}},Game_Interpreter[_0x42d2fb(0x2f7)][_0x42d2fb(0xfc)]=function(_0x409f35){const _0x38b67e=_0x42d2fb;if($gameMessage[_0x38b67e(0x229)]())return![];return this[_0x38b67e(0xb7)](_0x409f35),this[_0x38b67e(0x14d)](_0x409f35),this[_0x38b67e(0x2b3)](_0x409f35),this['setWaitMode'](_0x38b67e(0x2e8)),!![];},Game_Interpreter[_0x42d2fb(0x2f7)][_0x42d2fb(0xb7)]=function(_0x5bb070){const _0xe1be00=_0x42d2fb;$gameMessage[_0xe1be00(0x28f)](_0x5bb070[0x0],_0x5bb070[0x1]),$gameMessage['setBackground'](_0x5bb070[0x2]),$gameMessage[_0xe1be00(0x19f)](_0x5bb070[0x3]),$gameMessage['setSpeakerName'](_0x5bb070[0x4]);},Game_Interpreter['prototype'][_0x42d2fb(0x14d)]=function(_0x5a4648){const _0xd5c09=_0x42d2fb;while(this[_0xd5c09(0x11c)]()){this[_0xd5c09(0x1b0)]++;this[_0xd5c09(0x77)]()['code']===0x191&&(_0xd5c09(0x275)!==_0xd5c09(0x275)?this[_0xd5c09(0x13e)][_0xd5c09(0x1d5)]()?this[_0xd5c09(0x13e)][_0xd5c09(0x115)]():this[_0xd5c09(0x146)]():$gameMessage[_0xd5c09(0x18a)](this['currentCommand']()[_0xd5c09(0x289)][0x0]));if(this[_0xd5c09(0xe8)]())break;}},Game_Interpreter[_0x42d2fb(0x2f7)][_0x42d2fb(0x11c)]=function(){const _0x575e2e=_0x42d2fb;return this[_0x575e2e(0x13b)]()===0x65&&$gameSystem[_0x575e2e(0x114)]()>0x4?!![]:this[_0x575e2e(0x13b)]()===0x191;},Game_Interpreter[_0x42d2fb(0x2f7)]['isBreakShowTextCommands']=function(){const _0x12804e=_0x42d2fb;return $gameMessage['_texts'][_0x12804e(0x182)]>=$gameSystem[_0x12804e(0x114)]()&&this['nextEventCode']()!==0x191;},Game_Interpreter[_0x42d2fb(0x2f7)][_0x42d2fb(0x2b3)]=function(_0x150eeb){const _0x30a3c8=_0x42d2fb;switch(this[_0x30a3c8(0x13b)]()){case 0x66:this['_index']++,this['setupChoices'](this[_0x30a3c8(0x77)]()[_0x30a3c8(0x289)]);break;case 0x67:this['_index']++,this[_0x30a3c8(0x8e)](this['currentCommand']()[_0x30a3c8(0x289)]);break;case 0x68:this[_0x30a3c8(0x1b0)]++,this[_0x30a3c8(0xc8)](this['currentCommand']()['parameters']);break;}},VisuMZ[_0x42d2fb(0x18b)]['Game_Interpreter_setupChoices']=Game_Interpreter[_0x42d2fb(0x2f7)][_0x42d2fb(0x19a)],Game_Interpreter[_0x42d2fb(0x2f7)][_0x42d2fb(0x19a)]=function(_0x4c317f){const _0xe1b618=_0x42d2fb;_0x4c317f=this[_0xe1b618(0x264)](),VisuMZ[_0xe1b618(0x18b)][_0xe1b618(0x1e7)]['call'](this,_0x4c317f);},Game_Interpreter[_0x42d2fb(0x2f7)]['addContinuousShowChoices']=function(){const _0x2950b6=_0x42d2fb,_0x59711a=this[_0x2950b6(0x1b0)],_0x2b6334=[];let _0x24dba8=0x0;this['_index']++;while(this['_index']<this[_0x2950b6(0x259)]['length']){if(this['currentCommand']()[_0x2950b6(0x89)]===this[_0x2950b6(0x142)]){if(this[_0x2950b6(0x77)]()[_0x2950b6(0x232)]===0x194&&this[_0x2950b6(0x13b)]()!==0x66)break;else{if(this['currentCommand']()['code']===0x66)this[_0x2950b6(0xa5)](_0x24dba8,this[_0x2950b6(0x77)](),_0x59711a),this[_0x2950b6(0x1b0)]-=0x2;else this[_0x2950b6(0x77)]()['code']===0x192&&(this['currentCommand']()[_0x2950b6(0x289)][0x0]=_0x24dba8,_0x24dba8++);}}this[_0x2950b6(0x1b0)]++;}return this[_0x2950b6(0x1b0)]=_0x59711a,this[_0x2950b6(0x77)]()['parameters'];},Game_Interpreter['prototype'][_0x42d2fb(0xa5)]=function(_0x532de6,_0xdcb1d0,_0x41073f){const _0xc0f72c=_0x42d2fb;this[_0xc0f72c(0xf3)](_0x532de6,_0xdcb1d0,_0x41073f),this[_0xc0f72c(0x104)](_0x532de6,_0xdcb1d0,_0x41073f),this[_0xc0f72c(0x255)](_0xdcb1d0,_0x41073f);},Game_Interpreter[_0x42d2fb(0x2f7)][_0x42d2fb(0xf3)]=function(_0x52c01b,_0x3ccde6,_0x1d2ee0){const _0x1127aa=_0x42d2fb;if(_0x3ccde6[_0x1127aa(0x289)][0x2]<0x0)return;const _0x1e9f95=_0x3ccde6[_0x1127aa(0x289)][0x2]+_0x52c01b;this[_0x1127aa(0x259)][_0x1d2ee0][_0x1127aa(0x289)][0x2]=_0x1e9f95;},Game_Interpreter['prototype'][_0x42d2fb(0x104)]=function(_0x111482,_0x8619d,_0x77b80d){const _0x44b91e=_0x42d2fb;if(_0x8619d[_0x44b91e(0x289)][0x1]>=0x0){var _0x4c221e=_0x8619d[_0x44b91e(0x289)][0x1]+_0x111482;this['_list'][_0x77b80d][_0x44b91e(0x289)][0x1]=_0x4c221e;}else{if(_0x8619d[_0x44b91e(0x289)][0x1]===-0x2){if('FnjzC'!==_0x44b91e(0x2ee)){let _0x213e08=_0x428c56[_0x44b91e(0x20c)]+_0x3b410f[_0x44b91e(0x279)]()*0x2+0x6;const _0x3737d3=_0x1c0921[_0x44b91e(0x192)]()!=='',_0x42964a=_0x408029[_0x44b91e(0x2c0)],_0x59e7bb=0x14;_0x213e08+=_0x3737d3?_0x42964a+_0x59e7bb:0x4;if(_0x213e08%0x2!==0x0)_0x213e08+=0x1;_0x34eda2[_0x44b91e(0x2b1)](_0x213e08);}else this[_0x44b91e(0x259)][_0x77b80d][_0x44b91e(0x289)][0x1]=_0x8619d[_0x44b91e(0x289)][0x1];}}},Game_Interpreter[_0x42d2fb(0x2f7)]['addExtraShowChoices']=function(_0x3535e5,_0x56ba66){const _0x1231fd=_0x42d2fb;for(const _0xc88be3 of _0x3535e5['parameters'][0x0]){if('ZTBVD'===_0x1231fd(0x1d0))return _0x31eb42;else this[_0x1231fd(0x259)][_0x56ba66]['parameters'][0x0][_0x1231fd(0xa7)](_0xc88be3);}this[_0x1231fd(0x259)]['splice'](this[_0x1231fd(0x1b0)]-0x1,0x2);};function Game_MessageCommonEvent(){const _0x382c37=_0x42d2fb;this[_0x382c37(0x16e)](...arguments);}Game_MessageCommonEvent[_0x42d2fb(0x2f7)][_0x42d2fb(0x16e)]=function(_0x158664,_0x320173){const _0x438962=_0x42d2fb;this[_0x438962(0xff)]=_0x158664,this[_0x438962(0x14e)]=_0x320173||0x0,this[_0x438962(0x169)]();},Game_MessageCommonEvent[_0x42d2fb(0x2f7)][_0x42d2fb(0x85)]=function(){const _0x28ddcf=_0x42d2fb;return $dataCommonEvents[this[_0x28ddcf(0xff)]];},Game_MessageCommonEvent[_0x42d2fb(0x2f7)]['list']=function(){const _0x2fa9ac=_0x42d2fb;return this[_0x2fa9ac(0x85)]()['list'];},Game_MessageCommonEvent['prototype'][_0x42d2fb(0x169)]=function(){const _0x4f0d83=_0x42d2fb;this[_0x4f0d83(0x13e)]=new Game_Interpreter(),this['_interpreter'][_0x4f0d83(0xad)](this[_0x4f0d83(0x1f8)](),this['_eventId']);},Game_MessageCommonEvent[_0x42d2fb(0x2f7)][_0x42d2fb(0x115)]=function(){const _0x4240ba=_0x42d2fb;this['_interpreter']&&(this[_0x4240ba(0x13e)]['isRunning']()?'aKQCY'===_0x4240ba(0x243)?(this[_0x4240ba(0x2c3)]['fontFace']=_0x4f8cb3[_0x4240ba(0x269)](),this['contents']['fontSize']=_0x2c7ba0[_0x4240ba(0x167)](),this[_0x4240ba(0x2c3)][_0x4240ba(0x2a3)]=![],this[_0x4240ba(0x2c3)]['fontItalic']=![],this[_0x4240ba(0x15e)]()):this[_0x4240ba(0x13e)][_0x4240ba(0x115)]():this[_0x4240ba(0x146)]());},Game_MessageCommonEvent[_0x42d2fb(0x2f7)]['clear']=function(){this['_interpreter']=null;},Scene_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x24b)]=function(){const _0x4518ab=_0x42d2fb,_0x1a7ea2=Math['min'](Graphics[_0x4518ab(0x20c)],$gameSystem[_0x4518ab(0xbe)]()),_0x3f0220=$gameSystem['getMessageWindowRows'](),_0x62b04=this[_0x4518ab(0x213)](_0x3f0220,![]),_0x3386a5=(Graphics[_0x4518ab(0x219)]-_0x1a7ea2)/0x2,_0x2a451a=0x0;return new Rectangle(_0x3386a5,_0x2a451a,_0x1a7ea2,_0x62b04);},VisuMZ['MessageCore'][_0x42d2fb(0x151)]=Scene_Options[_0x42d2fb(0x2f7)][_0x42d2fb(0x145)],Scene_Options[_0x42d2fb(0x2f7)][_0x42d2fb(0x145)]=function(){const _0x14346a=_0x42d2fb;let _0x372b74=VisuMZ[_0x14346a(0x18b)][_0x14346a(0x151)]['call'](this);const _0x428581=VisuMZ[_0x14346a(0x18b)]['Settings'];if(_0x428581[_0x14346a(0x2e4)][_0x14346a(0x251)]&&_0x428581[_0x14346a(0x2e4)]['AdjustRect'])_0x372b74++;return _0x372b74;},VisuMZ['MessageCore'][_0x42d2fb(0x22e)]=Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x16e)],Window_Base['prototype'][_0x42d2fb(0x16e)]=function(_0x283f3e){const _0x4b6e45=_0x42d2fb;this[_0x4b6e45(0x87)](_0x283f3e),VisuMZ['MessageCore'][_0x4b6e45(0x22e)][_0x4b6e45(0x1ef)](this,_0x283f3e);},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x87)]=function(_0x32b7ca){const _0x4b6c68=_0x42d2fb;this[_0x4b6c68(0x15c)](),this[_0x4b6c68(0xd4)](),this['registerResetRect'](_0x32b7ca);},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x15c)]=function(){const _0x216387=_0x42d2fb;this['setTextAlignment'](_0x216387(0x1e3));},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x8b)]=function(_0x3c3a6a){const _0x22a4c2=_0x42d2fb;this[_0x22a4c2(0x15f)]=_0x3c3a6a;},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x217)]=function(){return this['_textAlignment'];},VisuMZ[_0x42d2fb(0x18b)]['Window_Base_textSizeEx']=Window_Base['prototype'][_0x42d2fb(0x295)],Window_Base['prototype'][_0x42d2fb(0x295)]=function(_0x48e739){const _0x196a4d=_0x42d2fb;return this[_0x196a4d(0xd4)](),VisuMZ['MessageCore'][_0x196a4d(0x1ba)][_0x196a4d(0x1ef)](this,_0x48e739);},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x2e9)]=Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0xe7)],Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0xe7)]=function(_0x49777d){const _0x57d7a8=_0x42d2fb;VisuMZ[_0x57d7a8(0x18b)][_0x57d7a8(0x2e9)][_0x57d7a8(0x1ef)](this,_0x49777d);if(_0x49777d[_0x57d7a8(0x2a7)])this[_0x57d7a8(0x8b)]('default');},Window_Base['prototype'][_0x42d2fb(0xd4)]=function(){this['setWordWrap'](![]);},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x1ac)]=function(){const _0x329958=_0x42d2fb;return this[_0x329958(0x218)];},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x1b2)]=function(_0x14c567){return this['_wordWrap']=_0x14c567,'';},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x2bb)]=function(_0x4ce132){const _0x121beb=_0x42d2fb;this[_0x121beb(0x131)]=JsonEx[_0x121beb(0x118)](_0x4ce132);},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x81)]=function(){const _0x56b90b=_0x42d2fb;this[_0x56b90b(0x2c3)][_0x56b90b(0x24c)]=$gameSystem[_0x56b90b(0x269)](),this['contents'][_0x56b90b(0x80)]=$gameSystem[_0x56b90b(0x167)](),this[_0x56b90b(0x2c3)][_0x56b90b(0x2a3)]=![],this[_0x56b90b(0x2c3)][_0x56b90b(0x139)]=![],this[_0x56b90b(0x15e)]();},Window_Base[_0x42d2fb(0x2f7)]['resetTextColor']=function(){const _0x5afc40=_0x42d2fb;this[_0x5afc40(0xf8)](ColorManager[_0x5afc40(0x306)]()),this[_0x5afc40(0x1e6)](ColorManager[_0x5afc40(0x2ac)]());const _0x2a88f1=VisuMZ[_0x5afc40(0x18b)]['Settings'][_0x5afc40(0x2ae)];_0x2a88f1['DefaultOutlineWidth']===undefined&&(_0x2a88f1['DefaultOutlineWidth']=0x3),this[_0x5afc40(0x2c3)][_0x5afc40(0x179)]=_0x2a88f1['DefaultOutlineWidth'],this[_0x5afc40(0x212)](![]);},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x212)]=function(_0x516a1d){const _0x3121ce=_0x42d2fb;this[_0x3121ce(0x1bb)]=_0x516a1d;},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x285)]=function(){const _0x436627=_0x42d2fb;return this[_0x436627(0x1bb)];},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x14b)]=function(){return![];},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x1a2)]=function(){const _0x42029f=_0x42d2fb,_0x42430b=[_0x42029f(0x24c),'fontSize',_0x42029f(0x2a3),_0x42029f(0x139),_0x42029f(0x294),_0x42029f(0x127),_0x42029f(0x179),_0x42029f(0x2d7)];let _0x2208e3={};for(const _0x182acd of _0x42430b){_0x2208e3[_0x182acd]=this[_0x42029f(0x2c3)][_0x182acd];}return _0x2208e3;},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x1cd)]=function(_0x5df885){const _0x2cce26=_0x42d2fb;for(const _0x3a712a in _0x5df885){this[_0x2cce26(0x2c3)][_0x3a712a]=_0x5df885[_0x3a712a];}},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x2ad)]=Window_Base['prototype'][_0x42d2fb(0x115)],Window_Base['prototype'][_0x42d2fb(0x115)]=function(){const _0x2ffbe3=_0x42d2fb;VisuMZ['MessageCore'][_0x2ffbe3(0x2ad)][_0x2ffbe3(0x1ef)](this),this[_0x2ffbe3(0x1c7)]();},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0xc5)]=function(){return![];},Window_Base[_0x42d2fb(0x2f7)]['updateMove']=function(){const _0x140bb0=_0x42d2fb;if(this[_0x140bb0(0x2b7)]>0x0){if(this[_0x140bb0(0xc5)]()){if('pUCul'==='QbBKK'){if(_0x15ec27['isRTL']())return;this[_0x140bb0(0x19d)]=this['_relativePosition']||0x0;const _0x2c233f=this[_0x140bb0(0x91)],_0x3a3ff0=_0x4614bd[_0x140bb0(0xbf)](_0x2c233f[_0x140bb0(0x20c)]*this[_0x140bb0(0x19d)]/0xa);this['x']=_0x2c233f['x']+_0x3a3ff0-_0x4ff5e1[_0x140bb0(0xbf)](this[_0x140bb0(0x20c)]/0x2),this['x']=this['x'][_0x140bb0(0x18f)](_0x2c233f['x'],_0x2c233f['x']+_0x2c233f['width']-this[_0x140bb0(0x20c)]);}else this['x']=this[_0x140bb0(0x2d5)](this['x'],this[_0x140bb0(0x186)]),this['y']=this[_0x140bb0(0x2d5)](this['y'],this[_0x140bb0(0x290)]),this['width']=this[_0x140bb0(0x2d5)](this[_0x140bb0(0x20c)],this['_moveTargetWidth']),this['height']=this['applyMoveEasing'](this['height'],this[_0x140bb0(0x2de)]),this[_0x140bb0(0xd9)]();}this[_0x140bb0(0x2b7)]--;}},Window_Base[_0x42d2fb(0x2f7)]['clampPlacementPosition']=function(_0x37498d,_0x525c2d){const _0x2116e6=_0x42d2fb;!_0x37498d&&(this[_0x2116e6(0x20c)]=Math[_0x2116e6(0x1cf)](this[_0x2116e6(0x20c)],Graphics[_0x2116e6(0x20c)]),this[_0x2116e6(0x301)]=Math[_0x2116e6(0x1cf)](this[_0x2116e6(0x301)],Graphics[_0x2116e6(0x301)]));if(!_0x525c2d){if(_0x2116e6(0x147)!=='frgdQ'){const _0xb28047=-(Math[_0x2116e6(0xbf)](Graphics[_0x2116e6(0x20c)]-Graphics[_0x2116e6(0x219)])/0x2),_0x572849=_0xb28047+Graphics[_0x2116e6(0x20c)]-this[_0x2116e6(0x20c)],_0x2e1868=-(Math['floor'](Graphics[_0x2116e6(0x301)]-Graphics['boxHeight'])/0x2),_0x3339b0=_0x2e1868+Graphics[_0x2116e6(0x301)]-this[_0x2116e6(0x301)];this['x']=this['x'][_0x2116e6(0x18f)](_0xb28047,_0x572849),this['y']=this['y'][_0x2116e6(0x18f)](_0x2e1868,_0x3339b0);}else return _0x5c2ca8;}},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x2d5)]=function(_0x59ff6e,_0x511a1a){const _0x2c9d33=_0x42d2fb,_0x18917f=this[_0x2c9d33(0x2b7)],_0x32f9aa=this[_0x2c9d33(0x2cd)],_0x3148d3=this[_0x2c9d33(0x15a)]((_0x32f9aa-_0x18917f)/_0x32f9aa),_0x284842=this[_0x2c9d33(0x15a)]((_0x32f9aa-_0x18917f+0x1)/_0x32f9aa),_0x464550=(_0x59ff6e-_0x511a1a*_0x3148d3)/(0x1-_0x3148d3);return _0x464550+(_0x511a1a-_0x464550)*_0x284842;},Window_Base['prototype'][_0x42d2fb(0x15a)]=function(_0x1c0bab){const _0x163f00=_0x42d2fb,_0x1364a9=0x2;switch(this['_moveEasingType']){case 0x0:return _0x1c0bab;case 0x1:return this[_0x163f00(0x22b)](_0x1c0bab,_0x1364a9);case 0x2:return this[_0x163f00(0x11a)](_0x1c0bab,_0x1364a9);case 0x3:return this[_0x163f00(0x191)](_0x1c0bab,_0x1364a9);default:if(Imported[_0x163f00(0xd5)])return VisuMZ[_0x163f00(0x2d5)](_0x1c0bab,this['_moveEasingType']);else{if(_0x163f00(0x298)!==_0x163f00(0x20f))return _0x1c0bab;else _0x49be25[_0x163f00(0x250)]=new _0x5241cb('\x5c['+_0x5a546b[_0x163f00(0x235)]+'\x5c]','gi'),_0x217f0e['TextStr']!==''&&_0x34e4aa['TextStr']!==_0x163f00(0xfb)?_0x1f131f[_0x163f00(0xd0)]=new _0x9b8978(_0x163f00(0x183)+_0x3f0ba8[_0x163f00(0x29d)][_0x163f00(0x133)](/\\/g,'\x1b')+'\x27'):_0x2a9e01[_0x163f00(0xd0)]=_0xaf6b98['TextJS'];}}},Window_Base['prototype'][_0x42d2fb(0x1f1)]=function(_0x73d2a3,_0x49428a,_0x4e9c0b,_0x21d764,_0x428f96,_0x43d537){const _0x55f838=_0x42d2fb;this['_moveTargetX']=_0x73d2a3,this[_0x55f838(0x290)]=_0x49428a,this[_0x55f838(0x278)]=_0x4e9c0b||this['width'],this[_0x55f838(0x2de)]=_0x21d764||this[_0x55f838(0x301)],this[_0x55f838(0x2b7)]=_0x428f96||0x1;if(this[_0x55f838(0x2b7)]<=0x0)this[_0x55f838(0x2b7)]=0x1;this[_0x55f838(0x2cd)]=this[_0x55f838(0x2b7)],this['_moveEasingType']=_0x43d537||0x0;if(_0x428f96<=0x0)this[_0x55f838(0x1c7)]();},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0xed)]=function(_0x45bcdf,_0x32480a,_0x30d6d4,_0x5e9bef,_0x1d835e,_0x17a9d3){const _0x96de9d=_0x42d2fb;this['_moveTargetX']=this['x']+_0x45bcdf,this[_0x96de9d(0x290)]=this['y']+_0x32480a,this[_0x96de9d(0x278)]=this[_0x96de9d(0x20c)]+(_0x30d6d4||0x0),this['_moveTargetHeight']=this['height']+(_0x5e9bef||0x0),this['_moveDuration']=_0x1d835e||0x1;if(this['_moveDuration']<=0x0)this[_0x96de9d(0x2b7)]=0x1;this['_wholeMoveDuration']=this[_0x96de9d(0x2b7)],this[_0x96de9d(0x211)]=_0x17a9d3||0x0;if(_0x1d835e<=0x0)this[_0x96de9d(0x1c7)]();},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x21d)]=function(_0x5d21d0,_0x3103cb){const _0x34992d=_0x42d2fb;this[_0x34992d(0x1f1)](this[_0x34992d(0x131)]['x'],this[_0x34992d(0x131)]['y'],this['_resetRect'][_0x34992d(0x20c)],this[_0x34992d(0x131)]['height'],_0x5d21d0,_0x3103cb);},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x2a2)]=Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0xf8)],Window_Base['prototype'][_0x42d2fb(0xf8)]=function(_0x25af9f){const _0x25952d=_0x42d2fb;if(this[_0x25952d(0x285)]())return;_0x25af9f=_0x25af9f[_0x25952d(0x133)](/\,/g,''),this['_textColorStack']=this[_0x25952d(0xe5)]||[],this['_textColorStack']['unshift'](this['contents'][_0x25952d(0x294)]),VisuMZ[_0x25952d(0x18b)]['Window_Base_changeTextColor']['call'](this,_0x25af9f);},Window_Base['prototype'][_0x42d2fb(0x297)]=function(_0x2c0472){const _0xed809c=_0x42d2fb;this['obtainEscapeParam'](_0x2c0472);if(this[_0xed809c(0x285)]())return;_0x2c0472[_0xed809c(0x2a7)]&&(this[_0xed809c(0xe5)]=this[_0xed809c(0xe5)]||[],this[_0xed809c(0x2c3)][_0xed809c(0x294)]=this[_0xed809c(0xe5)]['shift']()||ColorManager[_0xed809c(0x306)]());},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x25e)]=function(_0x2080d5){const _0x416ceb=_0x42d2fb;return _0x2080d5=this[_0x416ceb(0x189)](_0x2080d5),_0x2080d5=this['convertBackslashCharacters'](_0x2080d5),_0x2080d5=this['convertVariableEscapeCharacters'](_0x2080d5),_0x2080d5=this[_0x416ceb(0x277)](_0x2080d5),_0x2080d5=this[_0x416ceb(0x29c)](_0x2080d5),_0x2080d5=this[_0x416ceb(0x2d4)](_0x2080d5),_0x2080d5=this[_0x416ceb(0x10a)](_0x2080d5),_0x2080d5=this[_0x416ceb(0xae)](_0x2080d5),_0x2080d5=this[_0x416ceb(0x165)](_0x2080d5),_0x2080d5=this[_0x416ceb(0x247)](_0x2080d5),_0x2080d5=this[_0x416ceb(0x2fa)](_0x2080d5),_0x2080d5=this[_0x416ceb(0xf7)](_0x2080d5),_0x2080d5=this['postConvertEscapeCharacters'](_0x2080d5),_0x2080d5=this[_0x416ceb(0x2a6)](_0x2080d5),_0x2080d5=this[_0x416ceb(0x299)](_0x2080d5),_0x2080d5=this[_0x416ceb(0x16b)](_0x2080d5),_0x2080d5;},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x189)]=function(_0x163dad){const _0x348ea3=_0x42d2fb;for(const _0x52679b of VisuMZ['MessageCore'][_0x348ea3(0x1c2)][_0x348ea3(0x162)]){_0x163dad['match'](_0x52679b[_0x348ea3(0x250)])&&(_0x163dad=_0x163dad[_0x348ea3(0x133)](_0x52679b['textCodeCheck'],_0x52679b[_0x348ea3(0xd0)]['bind'](this)));}return _0x163dad;},Window_Base['prototype'][_0x42d2fb(0x2d1)]=function(_0x53faaa){const _0x4d0d3e=_0x42d2fb;return _0x53faaa=_0x53faaa[_0x4d0d3e(0x133)](/\\/g,'\x1b'),_0x53faaa=_0x53faaa[_0x4d0d3e(0x133)](/\x1b\x1b/g,'\x5c'),_0x53faaa;},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x2a6)]=function(_0xa51a94){const _0x4b4237=_0x42d2fb;for(;;){if(_0x4b4237(0x201)===_0x4b4237(0x13a))_0x424936[_0x4c4ba7]=this['contents'][_0xd41923];else{if(_0xa51a94[_0x4b4237(0x100)](/\\V\[(\d+)\]/gi))_0xa51a94=_0xa51a94['replace'](/\\V\[(\d+)\]/gi,(_0x525a40,_0x2961c6)=>this[_0x4b4237(0x2d1)](String($gameVariables[_0x4b4237(0x113)](parseInt(_0x2961c6)))));else{if(_0xa51a94['match'](/\x1bV\[(\d+)\]/gi))_0x4b4237(0x2be)==='NZNRX'?_0x27ad21[_0x4b4237(0x18b)][_0x4b4237(0x11e)][_0x4b4237(0x1ef)](this,_0x3246cf,_0x60d36):_0xa51a94=_0xa51a94[_0x4b4237(0x133)](/\x1bV\[(\d+)\]/gi,(_0x13f4f9,_0x1e9685)=>this['convertBackslashCharacters'](String($gameVariables[_0x4b4237(0x113)](parseInt(_0x1e9685)))));else break;}}}return _0xa51a94;},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x277)]=function(_0x35bfe7){return this['registerActorNameAutoColorChanges'](),_0x35bfe7;},Window_Base['prototype']['postConvertEscapeCharacters']=function(_0x2a3758){return _0x2a3758;},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x29c)]=function(_0x3e941d){const _0x202c7d=_0x42d2fb;return _0x3e941d=_0x3e941d[_0x202c7d(0x133)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x3e941d=_0x3e941d[_0x202c7d(0x133)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x3e941d=_0x3e941d[_0x202c7d(0x133)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x3e941d;},Window_Base[_0x42d2fb(0x2f7)]['convertFontSettingsEscapeCharacters']=function(_0x386c5c){const _0x4887b5=_0x42d2fb;return _0x386c5c=_0x386c5c[_0x4887b5(0x133)](/<B>/gi,_0x4887b5(0x1e4)),_0x386c5c=_0x386c5c[_0x4887b5(0x133)](/<\/B>/gi,_0x4887b5(0xd6)),_0x386c5c=_0x386c5c['replace'](/<I>/gi,_0x4887b5(0xcd)),_0x386c5c=_0x386c5c[_0x4887b5(0x133)](/<\/I>/gi,_0x4887b5(0x248)),_0x386c5c;},Window_Base['prototype'][_0x42d2fb(0x10a)]=function(_0x4241b2){const _0x19ca8c=_0x42d2fb;return _0x4241b2=_0x4241b2[_0x19ca8c(0x133)](/<LEFT>/gi,'\x1bTEXTALIGNMENT[1]'),_0x4241b2=_0x4241b2['replace'](/<\/LEFT>/gi,_0x19ca8c(0x24d)),_0x4241b2=_0x4241b2[_0x19ca8c(0x133)](/<CENTER>/gi,_0x19ca8c(0x2f6)),_0x4241b2=_0x4241b2[_0x19ca8c(0x133)](/<\/CENTER>/gi,_0x19ca8c(0x24d)),_0x4241b2=_0x4241b2[_0x19ca8c(0x133)](/<RIGHT>/gi,_0x19ca8c(0x236)),_0x4241b2=_0x4241b2[_0x19ca8c(0x133)](/<\/RIGHT>/gi,_0x19ca8c(0x24d)),_0x4241b2;},Window_Base['prototype'][_0x42d2fb(0xae)]=function(_0x5afa9c){const _0x5846bf=_0x42d2fb;return _0x5afa9c=_0x5afa9c[_0x5846bf(0x133)](/<COLORLOCK>/gi,_0x5846bf(0x15b)),_0x5afa9c=_0x5afa9c[_0x5846bf(0x133)](/<\/COLORLOCK>/gi,_0x5846bf(0x108)),_0x5afa9c=_0x5afa9c[_0x5846bf(0x133)](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0x5afa9c=_0x5afa9c[_0x5846bf(0x133)](/\)\)\)/gi,_0x5846bf(0x108)),_0x5afa9c;},Window_Base['prototype']['convertBaseEscapeCharacters']=function(_0x117d04){const _0xf82163=_0x42d2fb;return _0x117d04=_0x117d04[_0xf82163(0x133)](/\x1bN\[(\d+)\]/gi,(_0x46fa67,_0x35b95c)=>this['actorName'](parseInt(_0x35b95c))),_0x117d04=_0x117d04['replace'](/\x1bP\[(\d+)\]/gi,(_0x4c2a49,_0x2b5c8d)=>this[_0xf82163(0x1d2)](parseInt(_0x2b5c8d))),_0x117d04=_0x117d04[_0xf82163(0x133)](/\x1bG/gi,TextManager['currencyUnit']),_0x117d04;},Window_Base[_0x42d2fb(0x2f7)]['convertHardcodedEscapeReplacements']=function(_0x54bf6d){const _0x388a21=_0x42d2fb;return _0x54bf6d=_0x54bf6d[_0x388a21(0x133)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x388a21(0xc3)]()),_0x54bf6d=_0x54bf6d['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x388a21(0x1d4)]()),_0x54bf6d=_0x54bf6d[_0x388a21(0x133)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x388a21(0x1eb)](!![])),_0x54bf6d=_0x54bf6d[_0x388a21(0x133)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x388a21(0x1eb)](![])),_0x54bf6d;},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0xc3)]=function(){const _0x4dbe5a=_0x42d2fb;if(!SceneManager[_0x4dbe5a(0x287)]())return'';if(BattleManager[_0x4dbe5a(0x242)])return BattleManager[_0x4dbe5a(0x242)]['name']();if(BattleManager[_0x4dbe5a(0x116)][0x0])return BattleManager[_0x4dbe5a(0x116)][0x0][_0x4dbe5a(0x283)]();return'';},Window_Base[_0x42d2fb(0x2f7)]['battleUserName']=function(){const _0xd7d685=_0x42d2fb;if(!SceneManager[_0xd7d685(0x287)]())return'';let _0x3e836d=null;return _0x3e836d=BattleManager[_0xd7d685(0x168)],!_0x3e836d&&BattleManager[_0xd7d685(0x120)]()&&(_0x3e836d=BattleManager[_0xd7d685(0x2ef)]()),_0x3e836d?_0x3e836d[_0xd7d685(0x283)]():'';},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x1eb)]=function(_0x11d6f7){const _0x35d420=_0x42d2fb;if(!SceneManager[_0x35d420(0x287)]())return'';let _0x566dc3=BattleManager['_action']||null;!_0x566dc3&&BattleManager['isInputting']()&&(_0x566dc3=BattleManager[_0x35d420(0x214)]());if(_0x566dc3){let _0x48ca85='';if(_0x11d6f7)_0x48ca85+=_0x35d420(0x198)[_0x35d420(0x241)](_0x566dc3[_0x35d420(0x188)]);return _0x48ca85+=_0x566dc3[_0x35d420(0x283)],_0x48ca85;}return'';},Window_Base['prototype'][_0x42d2fb(0x2fa)]=function(_0x281a54){const _0x4b4718=_0x42d2fb;for(const _0x1e70e1 of VisuMZ['MessageCore'][_0x4b4718(0x1c2)]['TextCodeActions']){if(_0x281a54[_0x4b4718(0x100)](_0x1e70e1[_0x4b4718(0x250)])){if(_0x4b4718(0x254)===_0x4b4718(0x254))_0x281a54=_0x281a54['replace'](_0x1e70e1[_0x4b4718(0x250)],_0x1e70e1['textCodeResult']),_0x281a54=this['convertVariableEscapeCharacters'](_0x281a54);else{_0x2555cc[_0x4b4718(0x235)]=_0x2b6702[_0x4b4718(0x235)][_0x4b4718(0x17c)](),_0x55c341[_0x4b4718(0x250)]=new _0x3529cd('\x1b'+_0xd2f615[_0x4b4718(0x235)],'gi'),_0x1b5cac[_0x4b4718(0xd0)]='\x1b'+_0x1dd9f9[_0x4b4718(0x235)];if(_0x49b15a['Type']==='')_0x4f3b61['textCodeResult']+=_0x4b4718(0x2aa);}}}return _0x281a54;},Window_Base['prototype'][_0x42d2fb(0xf7)]=function(_0x37ccbb){const _0x538e81=_0x42d2fb;for(const _0x5c4521 of VisuMZ[_0x538e81(0x18b)][_0x538e81(0x1c2)][_0x538e81(0xb6)]){_0x538e81(0x12c)!==_0x538e81(0x12c)?(_0x255ece['x']=this[_0x538e81(0x224)](_0x2cd665),_0x42a0b4[_0x538e81(0x18b)]['Settings'][_0x538e81(0x2ae)][_0x538e81(0x2b8)]&&(_0x42030b['x']+=_0x437197['startX'])):_0x37ccbb['match'](_0x5c4521[_0x538e81(0x250)])&&(_0x37ccbb=_0x37ccbb[_0x538e81(0x133)](_0x5c4521['textCodeCheck'],_0x5c4521[_0x538e81(0xd0)][_0x538e81(0x1f6)](this)),_0x37ccbb=this[_0x538e81(0x2a6)](_0x37ccbb));}return _0x37ccbb;},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x15d)]=function(_0x2f3cd0){const _0x5b755c=_0x42d2fb,_0x3b2a43=_0x2f3cd0>=0x1?$gameActors['actor'](_0x2f3cd0):null,_0x5a841c=_0x3b2a43?_0x3b2a43[_0x5b755c(0x283)]():'',_0x119216=Number(VisuMZ['MessageCore'][_0x5b755c(0x1c2)][_0x5b755c(0xb2)]['Actors']);return this['isAutoColorAffected']()&&_0x119216!==0x0?_0x5b755c(0xac)['format'](_0x119216,_0x5a841c):_0x5a841c;},Window_Base['prototype'][_0x42d2fb(0x1d2)]=function(_0x5c53b6){const _0xe9d4e6=_0x42d2fb,_0x522555=_0x5c53b6>=0x1?$gameParty[_0xe9d4e6(0x292)]()[_0x5c53b6-0x1]:null,_0x29209b=_0x522555?_0x522555[_0xe9d4e6(0x283)]():'',_0x5bd3a7=Number(VisuMZ['MessageCore'][_0xe9d4e6(0x1c2)]['AutoColor'][_0xe9d4e6(0xfa)]);return this[_0xe9d4e6(0x14b)]()&&_0x5bd3a7!==0x0?_0xe9d4e6(0xac)[_0xe9d4e6(0x241)](_0x5bd3a7,_0x29209b):_0x29209b;},Window_Base['prototype'][_0x42d2fb(0x299)]=function(_0x2f7880){const _0x124920=_0x42d2fb;return this[_0x124920(0x14b)]()&&(_0x2f7880=this[_0x124920(0x2d9)](_0x2f7880),_0x2f7880=this['processActorNameAutoColorChanges'](_0x2f7880)),_0x2f7880;},Window_Base['prototype']['processStoredAutoColorChanges']=function(_0x5e6c55){const _0x498401=_0x42d2fb;for(autoColor of VisuMZ[_0x498401(0x18b)][_0x498401(0x234)]){if(_0x498401(0x1d1)!==_0x498401(0x10b))_0x5e6c55=_0x5e6c55[_0x498401(0x133)](autoColor[0x0],autoColor[0x1]);else{if(_0x5156fb[_0x498401(0x113)](_0x16b95a))return![];}}return _0x5e6c55;},Window_Base[_0x42d2fb(0x2f7)]['clearActorNameAutoColor']=function(){const _0x135540=_0x42d2fb;this[_0x135540(0x9d)]=[];},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0xba)]=function(){const _0x49647f=_0x42d2fb;this['clearActorNameAutoColor']();const _0x56c46=VisuMZ[_0x49647f(0x18b)][_0x49647f(0x1c2)][_0x49647f(0xb2)],_0x2236f3=_0x56c46[_0x49647f(0xfa)];if(_0x2236f3<=0x0)return;for(const _0x3a39be of $gameActors[_0x49647f(0x1fb)]){if(_0x49647f(0x25b)!==_0x49647f(0x11b)){if(!_0x3a39be)continue;const _0x2c1063=_0x3a39be[_0x49647f(0x283)]();if(_0x2c1063[_0x49647f(0x160)]()[_0x49647f(0x182)]<=0x0)continue;if(/^\d+$/[_0x49647f(0x1c9)](_0x2c1063))continue;if(_0x2c1063[_0x49647f(0x100)](/-----/i))continue;let _0x4984d5=VisuMZ[_0x49647f(0x18b)][_0x49647f(0x1ad)](_0x2c1063);const _0x46df6c=new RegExp('\x5cb'+_0x4984d5+'\x5cb','g'),_0x47dcea='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x49647f(0x241)](_0x2236f3,_0x2c1063);this[_0x49647f(0x9d)][_0x49647f(0xa7)]([_0x46df6c,_0x47dcea]);}else{const _0x159ef2=_0x15905e['parse']('['+_0x5a15af['$1'][_0x49647f(0x100)](/\d+/g)+']');for(const _0x2be8e9 of _0x159ef2){if(!_0x10780f['value'](_0x2be8e9))return!![];}return![];}}},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x261)]=function(_0x40a59f){const _0x12cd24=_0x42d2fb;this[_0x12cd24(0x9d)]===undefined&&this[_0x12cd24(0xba)]();for(autoColor of this['_autoColorActorNames']){'APMNK'===_0x12cd24(0x138)?_0x40a59f=_0x40a59f[_0x12cd24(0x133)](autoColor[0x0],autoColor[0x1]):(_0x3c14e5[_0x12cd24(0x2f7)][_0x12cd24(0x15e)][_0x12cd24(0x1ef)](this),this[_0x12cd24(0xf8)](this[_0x12cd24(0x2ab)]()));}return _0x40a59f;},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x96)]=function(_0x5a241a,_0xcbfa66,_0x3815d1){const _0x2750e4=_0x42d2fb;if(!_0x5a241a)return'';const _0x2d5292=_0x5a241a[_0xcbfa66];let _0xf88a90='';if(_0x2d5292&&_0x3815d1&&_0x2d5292[_0x2750e4(0x188)]){const _0x2dfc26='\x1bi[%1]%2';_0xf88a90=_0x2dfc26[_0x2750e4(0x241)](_0x2d5292[_0x2750e4(0x188)],_0x2d5292[_0x2750e4(0x283)]);}else{if(_0x2d5292){if(_0x2750e4(0x194)===_0x2750e4(0x134)){const _0x2b60ab=(_0x36f0a8['rtl']?-0x1:0x1)*this[_0x2750e4(0x222)]('\x20');_0x3be3f1['x']+=_0x2b60ab;if(this[_0x2750e4(0x224)](_0x435853)>0x0)_0x5d1074['x']+=_0x2b60ab;if(_0x1bc692['rtl'])return;let _0x5d9fcc=_0x11b38a[_0x2750e4(0xbc)][_0x2750e4(0x23a)](_0x2750e4(0x1b9),_0x15cfd9[_0x2750e4(0xc2)]+0x1),_0x31983f=_0x2a8521[_0x2750e4(0xbc)][_0x2750e4(0x23a)]('\x0a',_0x251d2d[_0x2750e4(0xc2)]+0x1);if(_0x5d9fcc<0x0)_0x5d9fcc=_0x17c57d[_0x2750e4(0xbc)][_0x2750e4(0x182)]+0x1;if(_0x31983f>0x0)_0x5d9fcc=_0x76c804[_0x2750e4(0x1cf)](_0x5d9fcc,_0x31983f);const _0x1ed507=_0xad499c[_0x2750e4(0xbc)][_0x2750e4(0xb3)](_0x1374f3[_0x2750e4(0xc2)],_0x5d9fcc),_0x118d16=this[_0x2750e4(0x2ba)](_0x1ed507)[_0x2750e4(0x20c)];let _0x3b5052=_0x13e94a['width']||this[_0x2750e4(0x148)];_0x3b5052-=_0x532281[_0x2750e4(0x2d3)];if(this[_0x2750e4(0x2ec)]===_0x5bd76e){const _0x1ca6c6=_0x513c5f[_0x2750e4(0x192)]()===''?0x0:_0x466c86[_0x2750e4(0x2c0)]+0x14;_0x3b5052-=_0x1ca6c6,_0x36e02a[_0x2750e4(0x18b)]['Settings'][_0x2750e4(0xca)][_0x2750e4(0x12f)]&&(_0x3b5052-=_0x1ca6c6);}let _0x454a92=![];if(_0x116bd4['x']+_0x118d16>_0x4c18e4['startX']+_0x3b5052)_0x454a92=!![];if(_0x118d16===0x0)_0x454a92=!![];_0x454a92&&(_0x27ab8c[_0x2750e4(0xbc)]=_0x3991e9[_0x2750e4(0xbc)][_0x2750e4(0x226)](0x0,_0x111e8f[_0x2750e4(0xc2)])+'\x0a'+_0xff2827[_0x2750e4(0xbc)][_0x2750e4(0x27d)](_0x373ebc[_0x2750e4(0xc2)]));}else _0xf88a90=_0x2d5292['name'];}else _0x2750e4(0x2c1)!==_0x2750e4(0x210)?_0xf88a90='':_0x520491=_0x216e62[_0x2750e4(0x133)](_0x24e6e6[0x0],_0x1e8496[0x1]);}return this['isAutoColorAffected']()&&(_0xf88a90=this[_0x2750e4(0x1de)](_0xf88a90,_0x5a241a)),_0xf88a90;},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x209)]=function(_0x273c0d){const _0xf91a75=_0x42d2fb,_0x11716e=$gameParty[_0xf91a75(0x1ff)]();if(_0x11716e['id']<0x0)return'';let _0x4b0ec8=null;if(_0x11716e[_0xf91a75(0x141)]===0x0)_0x4b0ec8=$dataItems[_0x11716e['id']];if(_0x11716e[_0xf91a75(0x141)]===0x1)_0x4b0ec8=$dataWeapons[_0x11716e['id']];if(_0x11716e[_0xf91a75(0x141)]===0x2)_0x4b0ec8=$dataArmors[_0x11716e['id']];if(!_0x4b0ec8)return'';return _0x273c0d?_0xf91a75(0x7e)[_0xf91a75(0x241)](_0x4b0ec8[_0xf91a75(0x188)],_0x4b0ec8[_0xf91a75(0x283)]):_0x4b0ec8[_0xf91a75(0x283)];},Window_Base[_0x42d2fb(0x2f7)]['lastGainedObjectQuantity']=function(){const _0x2b5110=_0x42d2fb,_0x35e052=$gameParty[_0x2b5110(0x1ff)]();if(_0x35e052['id']<=0x0)return'';return _0x35e052[_0x2b5110(0x1d8)];},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x1de)]=function(_0x2c8f86,_0x427ed6){const _0x452a3a=_0x42d2fb,_0x17fa1a=VisuMZ[_0x452a3a(0x18b)][_0x452a3a(0x1c2)][_0x452a3a(0xb2)];let _0x1af219=0x0;if(_0x427ed6===$dataActors)_0x1af219=_0x17fa1a[_0x452a3a(0xfa)];if(_0x427ed6===$dataClasses)_0x1af219=_0x17fa1a[_0x452a3a(0x12b)];if(_0x427ed6===$dataSkills)_0x1af219=_0x17fa1a['Skills'];if(_0x427ed6===$dataItems)_0x1af219=_0x17fa1a['Items'];if(_0x427ed6===$dataWeapons)_0x1af219=_0x17fa1a['Weapons'];if(_0x427ed6===$dataArmors)_0x1af219=_0x17fa1a[_0x452a3a(0x1b4)];if(_0x427ed6===$dataEnemies)_0x1af219=_0x17fa1a[_0x452a3a(0x2ea)];if(_0x427ed6===$dataStates)_0x1af219=_0x17fa1a[_0x452a3a(0x1b5)];return _0x1af219>0x0&&(_0x2c8f86=_0x452a3a(0xac)[_0x452a3a(0x241)](_0x1af219,_0x2c8f86)),_0x2c8f86;},Window_Base[_0x42d2fb(0x2f7)]['prepareWordWrapEscapeCharacters']=function(_0x127a60){const _0x5d0697=_0x42d2fb;_0x127a60=_0x127a60['replace'](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x5dd87a,_0x1344d4)=>this[_0x5d0697(0x1b2)](!![])),_0x127a60=_0x127a60['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x49537d,_0x57f229)=>this[_0x5d0697(0x1b2)](![])),_0x127a60=_0x127a60[_0x5d0697(0x133)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x3b8a6b,_0x1100fc)=>this[_0x5d0697(0x1b2)](![]));if(_0x127a60[_0x5d0697(0x100)](Window_Message[_0x5d0697(0xde)]))_0x5d0697(0x149)!=='vvxkr'?_0x5a6761=_0x2a24ce[_0x5d0697(0x283)]:this['setWordWrap'](![]);else _0x127a60[_0x5d0697(0x100)](Window_Message['_autoPosRegExp'])&&(_0x5d0697(0x1e0)!=='JHruL'?(this[_0x5d0697(0x1f2)](),this['placeCancelButton']()):this[_0x5d0697(0x1b2)](![]));if(!this[_0x5d0697(0x1ac)]())return _0x127a60;if(_0x127a60[_0x5d0697(0x182)]<=0x0)return _0x127a60;return VisuMZ[_0x5d0697(0x18b)][_0x5d0697(0x1c2)]['WordWrap'][_0x5d0697(0x2fe)]?(_0x127a60=_0x127a60[_0x5d0697(0x133)](/[\n\r]+/g,'\x20'),_0x127a60=_0x127a60[_0x5d0697(0x133)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):_0x5d0697(0x26e)===_0x5d0697(0x26e)?(_0x127a60=_0x127a60[_0x5d0697(0x133)](/[\n\r]+/g,''),_0x127a60=_0x127a60['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a')):this[_0x5d0697(0xdf)](_0x2321a9,_0x50606b[_0x5d0697(0x18f)](0x1,0xb)),_0x127a60=this[_0x5d0697(0x10d)](_0x127a60),_0x127a60=_0x127a60[_0x5d0697(0x20e)]('\x20')[_0x5d0697(0x177)](_0x5d0697(0x1b9)),_0x127a60=_0x127a60[_0x5d0697(0x133)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x127a60=_0x127a60[_0x5d0697(0x133)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x127a60;},Window_Base['prototype'][_0x42d2fb(0x10d)]=function(_0x300bc8){return _0x300bc8;},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x26b)]=Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x2a5)],Window_Base[_0x42d2fb(0x2f7)]['processNewLine']=function(_0x411222){const _0x20e914=_0x42d2fb;VisuMZ[_0x20e914(0x18b)][_0x20e914(0x26b)][_0x20e914(0x1ef)](this,_0x411222),this[_0x20e914(0x2d0)](_0x411222);},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x309)]=Window_Base['prototype'][_0x42d2fb(0xfd)],Window_Base[_0x42d2fb(0x2f7)]['processControlCharacter']=function(_0x441973,_0x57e354){const _0x2673f0=_0x42d2fb;VisuMZ[_0x2673f0(0x18b)][_0x2673f0(0x309)]['call'](this,_0x441973,_0x57e354),_0x57e354===_0x2673f0(0x1b9)&&this['processWrapBreak'](_0x441973);},Window_Base['prototype']['obtainEscapeString']=function(_0x4600b8){const _0x306a13=_0x42d2fb;var _0x5315dd=/^\<(.*?)\>/[_0x306a13(0x176)](_0x4600b8['text'][_0x306a13(0x226)](_0x4600b8[_0x306a13(0xc2)]));if(_0x5315dd){if(_0x306a13(0x157)===_0x306a13(0x157))return _0x4600b8[_0x306a13(0xc2)]+=_0x5315dd[0x0]['length'],String(_0x5315dd[0x0][_0x306a13(0x226)](0x1,_0x5315dd[0x0][_0x306a13(0x182)]-0x1));else{const _0x4cce80=this[_0x306a13(0x17e)](_0x55d1ee);if(_0x4cce80==='textSpeed')return this[_0x306a13(0x1f5)]();return _0x666a[_0x306a13(0x18b)]['Window_Options_statusText'][_0x306a13(0x1ef)](this,_0xe8556a);}}else{if('tMVjk'===_0x306a13(0x27e))return'';else{if(this[_0x306a13(0x155)]===_0x297b58)this['initMessageCore']();if(this[_0x306a13(0x155)][_0x306a13(0x13c)]===_0x372879)this[_0x306a13(0x87)]();return this[_0x306a13(0x155)][_0x306a13(0x13c)];}}},VisuMZ[_0x42d2fb(0x18b)]['Window_Base_processEscapeCharacter']=Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x293)],Window_Base['prototype'][_0x42d2fb(0x293)]=function(_0x15ac4f,_0x3d022b){const _0x5039fb=_0x42d2fb;switch(_0x15ac4f){case'C':_0x3d022b['drawing']?VisuMZ[_0x5039fb(0x18b)][_0x5039fb(0x11e)][_0x5039fb(0x1ef)](this,_0x15ac4f,_0x3d022b):this[_0x5039fb(0x224)](_0x3d022b);break;case'I':case'{':case'}':VisuMZ[_0x5039fb(0x18b)][_0x5039fb(0x11e)][_0x5039fb(0x1ef)](this,_0x15ac4f,_0x3d022b);break;case'FS':this[_0x5039fb(0x21c)](_0x3d022b);break;case'PX':this[_0x5039fb(0x125)](_0x3d022b);break;case'PY':this[_0x5039fb(0x231)](_0x3d022b);break;case _0x5039fb(0x14f):this[_0x5039fb(0x25d)](this[_0x5039fb(0x224)](_0x3d022b));break;case _0x5039fb(0x2ce):this[_0x5039fb(0x223)](_0x3d022b);break;case _0x5039fb(0x8d):this[_0x5039fb(0xe1)](_0x3d022b);break;case'COMMONEVENT':this[_0x5039fb(0x130)](_0x3d022b);break;case _0x5039fb(0x25a):this['processFontChangeItalic'](this[_0x5039fb(0x224)](_0x3d022b));break;case _0x5039fb(0x239):this[_0x5039fb(0x1ed)](_0x3d022b);break;case'PREVCOLOR':this['processPreviousColor'](_0x3d022b);break;case'TEXTALIGNMENT':this[_0x5039fb(0x2f2)](_0x3d022b);break;case _0x5039fb(0xf2):this[_0x5039fb(0xe0)](_0x3d022b);break;case _0x5039fb(0x92):this[_0x5039fb(0x2eb)](_0x3d022b);break;default:this[_0x5039fb(0x25f)](_0x15ac4f,_0x3d022b);}},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x25f)]=function(_0x57549f,_0x235b24){const _0x48b5ec=_0x42d2fb;for(const _0x3c1838 of VisuMZ[_0x48b5ec(0x18b)][_0x48b5ec(0x1c2)][_0x48b5ec(0x185)]){if(_0x3c1838[_0x48b5ec(0x235)]===_0x57549f){if(_0x3c1838[_0x48b5ec(0x184)]==='')this['obtainEscapeParam'](_0x235b24);_0x3c1838[_0x48b5ec(0x7b)][_0x48b5ec(0x1ef)](this,_0x235b24);if(this[_0x48b5ec(0x2ec)]===Window_Message){if('TqvRo'!==_0x48b5ec(0x1d9)){if(this['_MessageCoreSettings']===_0x37e6a5)this['initMessageCore']();if(this[_0x48b5ec(0x155)][_0x48b5ec(0x303)]===_0x207578)this[_0x48b5ec(0x87)]();return this[_0x48b5ec(0x155)][_0x48b5ec(0x303)];}else{const _0x4a8b78=_0x3c1838['CommonEvent']||0x0;if(_0x4a8b78>0x0)this[_0x48b5ec(0x10c)](_0x4a8b78);}}}}},Window_Base['prototype'][_0x42d2fb(0x2cf)]=function(){const _0x969ca5=_0x42d2fb;this[_0x969ca5(0x2c3)]['fontSize']+=VisuMZ['MessageCore']['Settings'][_0x969ca5(0x2ae)][_0x969ca5(0x2a1)],this[_0x969ca5(0x2c3)][_0x969ca5(0x80)]=Math[_0x969ca5(0x1cf)](this[_0x969ca5(0x2c3)][_0x969ca5(0x80)],VisuMZ[_0x969ca5(0x18b)]['Settings'][_0x969ca5(0x2ae)]['FontBiggerCap']);},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x2e6)]=function(){const _0x26386d=_0x42d2fb;this[_0x26386d(0x2c3)][_0x26386d(0x80)]-=VisuMZ['MessageCore'][_0x26386d(0x1c2)][_0x26386d(0x2ae)]['FontChangeValue'],this[_0x26386d(0x2c3)][_0x26386d(0x80)]=Math[_0x26386d(0x1c4)](this['contents'][_0x26386d(0x80)],VisuMZ[_0x26386d(0x18b)][_0x26386d(0x1c2)][_0x26386d(0x2ae)][_0x26386d(0x2f1)]);},Window_Base[_0x42d2fb(0x2f7)]['processFsTextCode']=function(_0x6de95e){const _0x209550=_0x42d2fb,_0x4d7c37=this[_0x209550(0x224)](_0x6de95e);this[_0x209550(0x2c3)][_0x209550(0x80)]=_0x4d7c37['clamp'](VisuMZ[_0x209550(0x18b)][_0x209550(0x1c2)]['General'][_0x209550(0x2f1)],VisuMZ[_0x209550(0x18b)][_0x209550(0x1c2)][_0x209550(0x2ae)][_0x209550(0x18c)]);},Window_Base['prototype']['maxFontSizeInLine']=function(_0x3472d4){const _0x5d2fc0=_0x42d2fb;let _0x5dc4e2=this[_0x5d2fc0(0x2c3)][_0x5d2fc0(0x80)];const _0x37f7be=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){if('gEaPM'===_0x5d2fc0(0x29e)){const _0x58fc20=_0x37f7be[_0x5d2fc0(0x176)](_0x3472d4);if(!_0x58fc20){if(_0x5d2fc0(0xb8)===_0x5d2fc0(0xb8))break;else _0x13c160[_0x5d2fc0(0x2f7)]['refreshDimmerBitmap'][_0x5d2fc0(0x1ef)](this),_0x2e57ce[_0x5d2fc0(0x18b)][_0x5d2fc0(0x1c2)]['General'][_0x5d2fc0(0xe4)]&&this[_0x5d2fc0(0x1bd)]();}const _0x553d7e=String(_0x58fc20[0x1])[_0x5d2fc0(0x17c)]();if(_0x553d7e==='{'){if(_0x5d2fc0(0x20d)!==_0x5d2fc0(0x20d))return _0x57a61e['prototype'][_0x5d2fc0(0x9f)][_0x5d2fc0(0x1ef)](this,_0x5562a9);else this['makeFontBigger']();}else{if(_0x553d7e==='}')'GPXJK'===_0x5d2fc0(0x28b)?this[_0x5d2fc0(0x2e6)]():_0x2b7543-=_0x3b9d48;else{if(_0x553d7e==='FS'){if(_0x5d2fc0(0x1a0)!==_0x5d2fc0(0x2f4))this['contents'][_0x5d2fc0(0x80)]=parseInt(_0x58fc20[0x3])[_0x5d2fc0(0x18f)](VisuMZ[_0x5d2fc0(0x18b)][_0x5d2fc0(0x1c2)]['General'][_0x5d2fc0(0x2f1)],VisuMZ[_0x5d2fc0(0x18b)][_0x5d2fc0(0x1c2)][_0x5d2fc0(0x2ae)][_0x5d2fc0(0x18c)]);else return this[_0x5d2fc0(0x19d)]=_0x41eff7,'';}}}if(this[_0x5d2fc0(0x2c3)][_0x5d2fc0(0x80)]>_0x5dc4e2){if(_0x5d2fc0(0x1a3)==='WpXqo')_0x5dc4e2=this[_0x5d2fc0(0x2c3)][_0x5d2fc0(0x80)];else{if(this[_0x5d2fc0(0x155)]===_0x51690b)this['initMessageCore']();if(this[_0x5d2fc0(0x155)]['choiceLineHeight']===_0xc458d6)this[_0x5d2fc0(0x87)]();return this[_0x5d2fc0(0x155)][_0x5d2fc0(0x2c4)];}}}else{if(_0x25b275[_0x5d2fc0(0x229)]())return![];return this[_0x5d2fc0(0xb7)](_0x5c45e9),this[_0x5d2fc0(0x14d)](_0x2bbca5),this[_0x5d2fc0(0x2b3)](_0x357b9f),this['setWaitMode']('message'),!![];}}return _0x5dc4e2;},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x125)]=function(_0x166286){const _0x3cb1bb=_0x42d2fb;_0x166286['x']=this[_0x3cb1bb(0x224)](_0x166286),VisuMZ['MessageCore']['Settings']['General'][_0x3cb1bb(0x2b8)]&&(_0x166286['x']+=_0x166286['startX']);},Window_Base[_0x42d2fb(0x2f7)]['processPyTextCode']=function(_0x1739fc){const _0x7597ed=_0x42d2fb;_0x1739fc['y']=this[_0x7597ed(0x224)](_0x1739fc);if(VisuMZ[_0x7597ed(0x18b)][_0x7597ed(0x1c2)][_0x7597ed(0x2ae)][_0x7597ed(0x2b8)]){if(_0x7597ed(0xb1)===_0x7597ed(0xb1))_0x1739fc['y']+=_0x1739fc[_0x7597ed(0x2db)];else{const _0x32e14c=this['obtainEscapeString'](_0x1343db)[_0x7597ed(0x20e)](',');if(!_0x39f141[_0x7597ed(0x2a7)])return;const _0x5893f0=_0x32e14c[0x0][_0x7597ed(0x160)](),_0x29f84c=_0x34db88['loadPicture'](_0x5893f0),_0xe591fe=_0x23b7b7[_0x7597ed(0x118)](_0x3c6a05),_0x2ad631=this[_0x7597ed(0x2c3)][_0x7597ed(0x2d7)];_0x29f84c[_0x7597ed(0x12e)](this['drawBackCenteredPicture'][_0x7597ed(0x1f6)](this,_0x29f84c,_0xe591fe,_0x2ad631));}}},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x25d)]=function(_0x1e2735){const _0x4b30df=_0x42d2fb;this[_0x4b30df(0x2c3)][_0x4b30df(0x2a3)]=!!_0x1e2735;},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x17d)]=function(_0x261b6){const _0x103349=_0x42d2fb;this[_0x103349(0x2c3)][_0x103349(0x139)]=!!_0x261b6;},Window_Base['prototype']['processTextAlignmentChange']=function(_0x21aef2){const _0x1483a8=_0x42d2fb,_0x34b177=this[_0x1483a8(0x224)](_0x21aef2);if(!_0x21aef2[_0x1483a8(0x2a7)])return;switch(_0x34b177){case 0x0:this[_0x1483a8(0x8b)](_0x1483a8(0x1e3));return;case 0x1:this['setTextAlignment'](_0x1483a8(0x2d6));break;case 0x2:this[_0x1483a8(0x8b)](_0x1483a8(0x2bd));break;case 0x3:this[_0x1483a8(0x8b)](_0x1483a8(0x215));break;}this[_0x1483a8(0x2d0)](_0x21aef2);},Window_Base['prototype'][_0x42d2fb(0x2d0)]=function(_0x3a0728){const _0x218d12=_0x42d2fb;if(!_0x3a0728[_0x218d12(0x2a7)])return;if(_0x3a0728[_0x218d12(0x1f3)])return;if(this['getTextAlignment']()===_0x218d12(0x1e3))return;let _0x233148=_0x3a0728[_0x218d12(0xbc)][_0x218d12(0x23a)]('\x1bTEXTALIGNMENT',_0x3a0728[_0x218d12(0xc2)]+0x1),_0x3f5b85=_0x3a0728[_0x218d12(0xbc)]['indexOf']('\x0a',_0x3a0728['index']+0x1);if(_0x233148<0x0)_0x233148=_0x3a0728[_0x218d12(0xbc)]['length']+0x1;if(_0x3f5b85>0x0)_0x233148=Math['min'](_0x233148,_0x3f5b85);const _0x1e3ef4=_0x3a0728[_0x218d12(0xbc)][_0x218d12(0xb3)](_0x3a0728['index'],_0x233148),_0x450176=this['textSizeExTextAlignment'](_0x1e3ef4)[_0x218d12(0x20c)],_0x25659c=_0x3a0728[_0x218d12(0x20c)]||this[_0x218d12(0x148)]-0x8,_0x147e1c=this[_0x218d12(0x2ec)]===Window_Message&&$gameMessage[_0x218d12(0x192)]()!=='';switch(this[_0x218d12(0x217)]()){case _0x218d12(0x2d6):_0x3a0728['x']=_0x3a0728[_0x218d12(0x13d)];break;case _0x218d12(0x2bd):_0x3a0728['x']=_0x3a0728['startX'],_0x3a0728['x']+=Math['floor']((_0x25659c-_0x450176)/0x2);_0x147e1c&&(_0x3a0728['x']-=_0x3a0728['startX']/0x2);break;case _0x218d12(0x215):_0x3a0728['x']=_0x25659c-_0x450176+_0x3a0728[_0x218d12(0x13d)];_0x147e1c&&(_0x3a0728['x']-=_0x3a0728[_0x218d12(0x13d)]);break;}},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0xbd)]=function(_0x579206){const _0x13031e=_0x42d2fb;_0x579206=_0x579206[_0x13031e(0x133)](/\x1b!/g,''),_0x579206=_0x579206['replace'](/\x1b\|/g,''),_0x579206=_0x579206[_0x13031e(0x133)](/\x1b\./g,'');const _0x115909=this[_0x13031e(0x9a)](_0x579206,0x0,0x0,0x0),_0x225af7=this[_0x13031e(0x1a2)]();return _0x115909[_0x13031e(0x2a7)]=![],this[_0x13031e(0xe7)](_0x115909),this[_0x13031e(0x1cd)](_0x225af7),{'width':_0x115909[_0x13031e(0x2f3)],'height':_0x115909['outputHeight']};},Window_Base[_0x42d2fb(0x2d3)]=VisuMZ[_0x42d2fb(0x18b)]['Settings'][_0x42d2fb(0xca)][_0x42d2fb(0x111)]||0x0,Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x2eb)]=function(_0x217ae3){const _0x2b32d0=_0x42d2fb,_0x395b7b=(_0x217ae3[_0x2b32d0(0x1f3)]?-0x1:0x1)*this['textWidth']('\x20');_0x217ae3['x']+=_0x395b7b;if(this[_0x2b32d0(0x224)](_0x217ae3)>0x0)_0x217ae3['x']+=_0x395b7b;if(_0x217ae3['rtl'])return;let _0x1a12d4=_0x217ae3[_0x2b32d0(0xbc)][_0x2b32d0(0x23a)]('\x1bWrapBreak[0]',_0x217ae3[_0x2b32d0(0xc2)]+0x1),_0x554942=_0x217ae3['text'][_0x2b32d0(0x23a)]('\x0a',_0x217ae3[_0x2b32d0(0xc2)]+0x1);if(_0x1a12d4<0x0)_0x1a12d4=_0x217ae3[_0x2b32d0(0xbc)][_0x2b32d0(0x182)]+0x1;if(_0x554942>0x0)_0x1a12d4=Math['min'](_0x1a12d4,_0x554942);const _0x3e6822=_0x217ae3[_0x2b32d0(0xbc)][_0x2b32d0(0xb3)](_0x217ae3[_0x2b32d0(0xc2)],_0x1a12d4),_0xc13aa4=this[_0x2b32d0(0x2ba)](_0x3e6822)[_0x2b32d0(0x20c)];let _0x48f7ef=_0x217ae3['width']||this[_0x2b32d0(0x148)];_0x48f7ef-=Window_Base[_0x2b32d0(0x2d3)];if(this['constructor']===Window_Message){if('MIgaj'!==_0x2b32d0(0x253)){const _0x5b591b=$gameMessage['faceName']()===''?0x0:ImageManager[_0x2b32d0(0x2c0)]+0x14;_0x48f7ef-=_0x5b591b;if(VisuMZ[_0x2b32d0(0x18b)]['Settings']['WordWrap'][_0x2b32d0(0x12f)]){if(_0x2b32d0(0x1a6)!==_0x2b32d0(0xb9))_0x48f7ef-=_0x5b591b;else return![];}}else{const _0x1b5798=_0x2ee7bb[_0x2b32d0(0x7f)]();let _0x2a1b69=0x0;for(let _0x2c425f of _0x1b5798){_0x2c425f=this[_0x2b32d0(0xd2)](_0x2c425f);if(this[_0x2b32d0(0x1c6)](_0x2c425f)){const _0x2a0549=this[_0x2b32d0(0x190)](_0x2c425f),_0x7acff5=this[_0x2b32d0(0xf1)](_0x2c425f);this[_0x2b32d0(0xd3)](_0x2a0549,'choice',_0x7acff5,_0x2a1b69);}_0x2a1b69++;}}}let _0x3b571d=![];if(_0x217ae3['x']+_0xc13aa4>_0x217ae3[_0x2b32d0(0x13d)]+_0x48f7ef)_0x3b571d=!![];if(_0xc13aa4===0x0)_0x3b571d=!![];_0x3b571d&&('rUcqx'==='rUcqx'?_0x217ae3['text']=_0x217ae3['text'][_0x2b32d0(0x226)](0x0,_0x217ae3[_0x2b32d0(0xc2)])+'\x0a'+_0x217ae3[_0x2b32d0(0xbc)][_0x2b32d0(0x27d)](_0x217ae3['index']):_0x2af005='');},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x2ba)]=function(_0x2a3d41){const _0x13fbac=_0x42d2fb,_0x2472e3=this['createTextState'](_0x2a3d41,0x0,0x0,0x0),_0x7b685e=this[_0x13fbac(0x1a2)]();return _0x2472e3[_0x13fbac(0x2a7)]=![],this[_0x13fbac(0x1b2)](![]),this[_0x13fbac(0xe7)](_0x2472e3),this[_0x13fbac(0x1b2)](!![]),this[_0x13fbac(0x1cd)](_0x7b685e),{'width':_0x2472e3[_0x13fbac(0x2f3)],'height':_0x2472e3[_0x13fbac(0x12d)]};},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x130)]=function(_0x4d257f){const _0x4b505b=_0x42d2fb;return this[_0x4b505b(0x224)](_0x4d257f);},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x1ed)]=function(_0x418b45){const _0x1a7210=_0x42d2fb,_0x2078f4=this[_0x1a7210(0x95)](_0x418b45)[_0x1a7210(0x20e)](',');if(!_0x418b45[_0x1a7210(0x2a7)])return;const _0x2e4ee1=_0x2078f4[0x0]['trim'](),_0x401279=_0x2078f4[0x1]||0x0,_0x33e9ef=_0x2078f4[0x2]||0x0,_0x56fec2=ImageManager[_0x1a7210(0x1be)](_0x2e4ee1),_0xadb9c=this[_0x1a7210(0x2c3)]['paintOpacity'];_0x56fec2[_0x1a7210(0x12e)](this['drawBackPicture'][_0x1a7210(0x1f6)](this,_0x56fec2,_0x418b45['x'],_0x418b45['y'],_0x401279,_0x33e9ef,_0xadb9c));},Window_Base['prototype'][_0x42d2fb(0xa3)]=function(_0x496385,_0x2373a5,_0x1cb22a,_0x36fbe7,_0x3f1560,_0x4c4563){const _0x1307b7=_0x42d2fb;_0x36fbe7=_0x36fbe7||_0x496385[_0x1307b7(0x20c)],_0x3f1560=_0x3f1560||_0x496385['height'],this[_0x1307b7(0x84)][_0x1307b7(0x2d7)]=_0x4c4563,this['contentsBack'][_0x1307b7(0x197)](_0x496385,0x0,0x0,_0x496385[_0x1307b7(0x20c)],_0x496385[_0x1307b7(0x301)],_0x2373a5,_0x1cb22a,_0x36fbe7,_0x3f1560),this[_0x1307b7(0x84)][_0x1307b7(0x2d7)]=0xff;},Window_Base[_0x42d2fb(0x2f7)][_0x42d2fb(0x223)]=function(_0x2140bb){const _0x3adbe6=_0x42d2fb,_0x437253=this['obtainEscapeString'](_0x2140bb)[_0x3adbe6(0x20e)](',');if(!_0x2140bb[_0x3adbe6(0x2a7)])return;const _0x2baf83=_0x437253[0x0][_0x3adbe6(0x160)](),_0x1efc89=ImageManager[_0x3adbe6(0x1be)](_0x2baf83),_0x414068=JsonEx[_0x3adbe6(0x118)](_0x2140bb),_0x3410b0=this['contents']['paintOpacity'];_0x1efc89[_0x3adbe6(0x12e)](this[_0x3adbe6(0x26d)]['bind'](this,_0x1efc89,_0x414068,_0x3410b0));},Window_Base['prototype'][_0x42d2fb(0x26d)]=function(_0x5da735,_0x3d5fef,_0x3e1be8){const _0x5ae8ab=_0x42d2fb,_0x327c7b=_0x3d5fef[_0x5ae8ab(0x20c)]||this[_0x5ae8ab(0x148)],_0x554de1=this['_index']!==undefined?this['itemHeight']():this[_0x5ae8ab(0x29a)],_0x2d49f1=_0x327c7b/_0x5da735['width'],_0x334cfa=_0x554de1/_0x5da735[_0x5ae8ab(0x301)],_0xfb7a45=Math[_0x5ae8ab(0x1cf)](_0x2d49f1,_0x334cfa,0x1),_0xe171ab=this[_0x5ae8ab(0x1b0)]!==undefined?(this[_0x5ae8ab(0x123)](0x0)[_0x5ae8ab(0x301)]-this[_0x5ae8ab(0x2f0)]())/0x2:0x0,_0x3c2b20=_0x5da735['width']*_0xfb7a45,_0x14b5af=_0x5da735['height']*_0xfb7a45,_0x4326c0=Math[_0x5ae8ab(0xbf)]((_0x327c7b-_0x3c2b20)/0x2)+_0x3d5fef['startX'],_0x2c7730=Math['floor']((_0x554de1-_0x14b5af)/0x2)+_0x3d5fef[_0x5ae8ab(0x2db)]-_0xe171ab*0x2;this[_0x5ae8ab(0x84)][_0x5ae8ab(0x2d7)]=_0x3e1be8,this[_0x5ae8ab(0x84)][_0x5ae8ab(0x197)](_0x5da735,0x0,0x0,_0x5da735['width'],_0x5da735[_0x5ae8ab(0x301)],_0x4326c0,_0x2c7730,_0x3c2b20,_0x14b5af),this[_0x5ae8ab(0x84)][_0x5ae8ab(0x2d7)]=0xff;},Window_Base['prototype'][_0x42d2fb(0xe1)]=function(_0x8c610e){const _0x30ca3d=_0x42d2fb,_0x3d154a=this['obtainEscapeParam'](_0x8c610e);if(_0x8c610e['drawing'])this[_0x30ca3d(0x212)](_0x3d154a>0x0);},Window_Base['prototype']['processCustomWait']=function(_0x48024a){const _0x34b96c=_0x42d2fb,_0x4a0c2e=this[_0x34b96c(0x224)](_0x48024a);this[_0x34b96c(0x2ec)]===Window_Message&&_0x48024a['drawing']&&this[_0x34b96c(0x121)](_0x4a0c2e);},Window_Help[_0x42d2fb(0x2f7)][_0x42d2fb(0xd4)]=function(){const _0x1e964b=_0x42d2fb;this[_0x1e964b(0x1b2)]($gameSystem['isHelpWindowWordWrap']());},Window_Help[_0x42d2fb(0x2f7)][_0x42d2fb(0x14b)]=function(){return!![];},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x2c6)]=Window_Help[_0x42d2fb(0x2f7)][_0x42d2fb(0x169)],Window_Help['prototype']['refresh']=function(){const _0x202972=_0x42d2fb;this[_0x202972(0x1af)](),VisuMZ[_0x202972(0x18b)][_0x202972(0x2c6)][_0x202972(0x1ef)](this),this[_0x202972(0xd4)]();},VisuMZ[_0x42d2fb(0x18b)]['Window_Options_addGeneralOptions']=Window_Options[_0x42d2fb(0x2f7)][_0x42d2fb(0xcf)],Window_Options[_0x42d2fb(0x2f7)][_0x42d2fb(0xcf)]=function(){const _0x55cadd=_0x42d2fb;VisuMZ[_0x55cadd(0x18b)][_0x55cadd(0x16a)][_0x55cadd(0x1ef)](this),this[_0x55cadd(0x240)]();},Window_Options[_0x42d2fb(0x2f7)][_0x42d2fb(0x240)]=function(){const _0x2727b2=_0x42d2fb;VisuMZ[_0x2727b2(0x18b)][_0x2727b2(0x1c2)][_0x2727b2(0x2e4)][_0x2727b2(0x251)]&&this[_0x2727b2(0x1cc)]();},Window_Options[_0x42d2fb(0x2f7)][_0x42d2fb(0x1cc)]=function(){const _0x30aacf=_0x42d2fb,_0xd32804=TextManager[_0x30aacf(0x166)],_0x47bfbf=_0x30aacf(0x2e3);this[_0x30aacf(0xd3)](_0xd32804,_0x47bfbf);},VisuMZ['MessageCore']['Window_Options_statusText']=Window_Options[_0x42d2fb(0x2f7)][_0x42d2fb(0xc6)],Window_Options[_0x42d2fb(0x2f7)][_0x42d2fb(0xc6)]=function(_0x3d490f){const _0x28d72c=_0x42d2fb,_0x1c7bdb=this[_0x28d72c(0x17e)](_0x3d490f);if(_0x1c7bdb===_0x28d72c(0x2e3))return this[_0x28d72c(0x1f5)]();return VisuMZ[_0x28d72c(0x18b)][_0x28d72c(0x1fe)]['call'](this,_0x3d490f);},VisuMZ['MessageCore'][_0x42d2fb(0xce)]=Window_Options['prototype'][_0x42d2fb(0x23c)],Window_Options['prototype'][_0x42d2fb(0x23c)]=function(_0x575043){const _0x426431=_0x42d2fb;if(_0x575043===_0x426431(0x2e3))return!![];return VisuMZ['MessageCore'][_0x426431(0xce)]['call'](this,_0x575043);},Window_Options[_0x42d2fb(0x2f7)][_0x42d2fb(0x1f5)]=function(){const _0x2d9d60=_0x42d2fb,_0x5d545e=this['getConfigValue'](_0x2d9d60(0x2e3));if(_0x5d545e>0xa)return'JDNyX'==='ICyOU'?!![]:TextManager[_0x2d9d60(0xdc)];else{if(_0x2d9d60(0x107)!==_0x2d9d60(0x107)){if(this[_0x2d9d60(0x155)]===_0x46de20)this['initMessageCore']();if(this[_0x2d9d60(0x155)][_0x2d9d60(0xd8)]===_0x2401bb)this[_0x2d9d60(0x87)]();this[_0x2d9d60(0x155)][_0x2d9d60(0xd8)]=_0x1b7759[_0x2d9d60(0x26a)]();}else return _0x5d545e;}},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x1c5)]=Window_Options['prototype'][_0x42d2fb(0x2e1)],Window_Options['prototype']['changeVolume']=function(_0x19ae09,_0x3bc163,_0x4317ba){const _0x5cfc00=_0x42d2fb;if(_0x19ae09==='textSpeed')return this[_0x5cfc00(0xda)](_0x19ae09,_0x3bc163,_0x4317ba);VisuMZ['MessageCore'][_0x5cfc00(0x1c5)][_0x5cfc00(0x1ef)](this,_0x19ae09,_0x3bc163,_0x4317ba);},Window_Options[_0x42d2fb(0x2f7)][_0x42d2fb(0xda)]=function(_0x153189,_0xf99f4e,_0x2c0ad4){const _0x52ce57=_0x42d2fb,_0x4a5477=this[_0x52ce57(0x1ec)](_0x153189),_0x4ce41f=0x1,_0x97414c=_0x4a5477+(_0xf99f4e?_0x4ce41f:-_0x4ce41f);if(_0x97414c>0xb&&_0x2c0ad4){if(_0x52ce57(0x246)===_0x52ce57(0x246))this[_0x52ce57(0xdf)](_0x153189,0x1);else return this[_0x52ce57(0x2c5)](_0x40d2af,!![],!![]),this[_0x52ce57(0x1d6)]('none'),'';}else _0x52ce57(0x2e2)!==_0x52ce57(0x2e2)?(this[_0x52ce57(0xe5)]=this['_textColorStack']||[],this[_0x52ce57(0x2c3)][_0x52ce57(0x294)]=this[_0x52ce57(0xe5)][_0x52ce57(0xf6)]()||_0x2ffd80[_0x52ce57(0x306)]()):this[_0x52ce57(0xdf)](_0x153189,_0x97414c[_0x52ce57(0x18f)](0x1,0xb));},Window_Message['prototype'][_0x42d2fb(0xfe)]=function(){const _0xbed0b7=_0x42d2fb;Window_Base[_0xbed0b7(0x2f7)][_0xbed0b7(0xfe)][_0xbed0b7(0x1ef)](this),VisuMZ[_0xbed0b7(0x18b)][_0xbed0b7(0x1c2)][_0xbed0b7(0x2ae)][_0xbed0b7(0xe4)]&&this[_0xbed0b7(0x1bd)]();},Window_Message['prototype'][_0x42d2fb(0x1bd)]=function(){const _0x2db434=_0x42d2fb;this[_0x2db434(0x208)]['x']=Math[_0x2db434(0x1df)](this[_0x2db434(0x20c)]/0x2),this['_dimmerSprite']['anchor']['x']=0.5,this[_0x2db434(0x208)]['scale']['x']=Graphics['width'];},VisuMZ[_0x42d2fb(0x18b)]['Window_Message_clearFlags']=Window_Message['prototype'][_0x42d2fb(0x1e5)],Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x1e5)]=function(){const _0x1739fd=_0x42d2fb;VisuMZ[_0x1739fd(0x18b)][_0x1739fd(0xc0)][_0x1739fd(0x1ef)](this),this[_0x1739fd(0x1af)](),this[_0x1739fd(0xd4)](),this['setColorLock'](![]),this[_0x1739fd(0x8b)](_0x1739fd(0x1e3)),this[_0x1739fd(0xb5)](VisuMZ[_0x1739fd(0x18b)]['Settings'][_0x1739fd(0x2ae)]['MessageTextDelay']);},Window_Message['prototype'][_0x42d2fb(0xd4)]=function(){const _0xe3781e=_0x42d2fb;this[_0xe3781e(0x1b2)]($gameSystem[_0xe3781e(0x144)]());},Window_Message['prototype'][_0x42d2fb(0x14b)]=function(){return!![];},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0xb5)]=function(_0x5d0549){const _0x3f740c=_0x42d2fb,_0x47e211=0xb-ConfigManager[_0x3f740c(0x2e3)];_0x5d0549=Math[_0x3f740c(0x1df)](_0x5d0549*_0x47e211),this[_0x3f740c(0x1a4)]=_0x5d0549,this[_0x3f740c(0x2c7)]=_0x5d0549;},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x94)]=Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x274)],Window_Message['prototype'][_0x42d2fb(0x274)]=function(){const _0x4c0133=_0x42d2fb;return VisuMZ[_0x4c0133(0x18b)][_0x4c0133(0x94)][_0x4c0133(0x1ef)](this)||Input[_0x4c0133(0x2b5)](VisuMZ['MessageCore'][_0x4c0133(0x1c2)][_0x4c0133(0x2ae)]['FastForwardKey']);},VisuMZ['MessageCore']['Window_Message_updatePlacement']=Window_Message['prototype'][_0x42d2fb(0x1f2)],Window_Message['prototype'][_0x42d2fb(0x1f2)]=function(){const _0x414d43=_0x42d2fb;let _0xd14e1d=this['y'];VisuMZ[_0x414d43(0x18b)][_0x414d43(0x262)][_0x414d43(0x1ef)](this);if(this[_0x414d43(0x245)])this['y']=_0xd14e1d;this['updateForcedPlacement'](),this['clampPlacementPosition']();},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x79)]=Window_Message[_0x42d2fb(0x2f7)]['newPage'],Window_Message['prototype'][_0x42d2fb(0x23b)]=function(_0x296de9){const _0x2779b5=_0x42d2fb;this[_0x2779b5(0x256)](_0x296de9),this[_0x2779b5(0xc4)](_0x296de9),VisuMZ[_0x2779b5(0x18b)]['Window_Message_newPage'][_0x2779b5(0x1ef)](this,_0x296de9),this[_0x2779b5(0x204)]();},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x256)]=function(_0x19dab8){const _0x32e91e=_0x42d2fb;if(!_0x19dab8)return;_0x19dab8[_0x32e91e(0xbc)]=this[_0x32e91e(0x189)](_0x19dab8['text']),_0x19dab8[_0x32e91e(0xbc)]=Window_Base['prototype'][_0x32e91e(0x16b)]['call'](this,_0x19dab8['text']);},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x16b)]=function(_0x31c59c){return _0x31c59c;},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0xc4)]=function(_0x5da0e6){const _0x3cb52d=_0x42d2fb;this['prepareForcedPositionEscapeCharacters'](_0x5da0e6),this[_0x3cb52d(0x122)](_0x5da0e6),this[_0x3cb52d(0x14c)]();},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x21b)]=Window_Message[_0x42d2fb(0x2f7)]['terminateMessage'],Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x16d)]=function(){const _0x2432f4=_0x42d2fb;VisuMZ[_0x2432f4(0x18b)][_0x2432f4(0x21b)][_0x2432f4(0x1ef)](this),this[_0x2432f4(0x1e5)]();if(this[_0x2432f4(0x102)])this[_0x2432f4(0x207)]();},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x14c)]=function(){const _0x2397ed=_0x42d2fb;this[_0x2397ed(0x20c)]=$gameSystem['getMessageWindowWidth']()+this['addedWidth']();;this[_0x2397ed(0x20c)]=Math[_0x2397ed(0x1cf)](Graphics[_0x2397ed(0x20c)],this[_0x2397ed(0x20c)]);const _0x330d01=$gameSystem[_0x2397ed(0x114)]();this[_0x2397ed(0x301)]=SceneManager[_0x2397ed(0x1c1)][_0x2397ed(0x213)](_0x330d01,![])+this[_0x2397ed(0x1ab)](),this[_0x2397ed(0x301)]=Math['min'](Graphics['height'],this[_0x2397ed(0x301)]);if($gameTemp[_0x2397ed(0x22d)])this[_0x2397ed(0x152)]();},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0xe6)]=function(){return 0x0;},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x1ab)]=function(){return 0x0;},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x152)]=function(){const _0x5916dd=_0x42d2fb;this['x']=(Graphics['boxWidth']-this['width'])/0x2,$gameTemp['_centerMessageWindow']=undefined,this[_0x5916dd(0xd9)]();},Window_Message[_0x42d2fb(0x2f7)]['updateMove']=function(){const _0x33699a=_0x42d2fb,_0x4f5fbd={'x':this['x'],'y':this['y']};Window_Base[_0x33699a(0x2f7)]['updateMove']['call'](this),this['updateNameBoxMove'](_0x4f5fbd);},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0xc5)]=function(){return!![];},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0xf5)]=function(_0x367e5d){const _0x49c666=_0x42d2fb;this[_0x49c666(0x268)]&&(this['_nameBoxWindow']['x']+=this['x']-_0x367e5d['x'],this[_0x49c666(0x268)]['y']+=this['y']-_0x367e5d['y']);},Window_Message['prototype'][_0x42d2fb(0x21d)]=function(_0x2de084,_0x11ddac){const _0x32bee9=_0x42d2fb;this[_0x32bee9(0x1f1)](this[_0x32bee9(0x131)]['x'],this['_positionType']*(Graphics[_0x32bee9(0x1ea)]-this[_0x32bee9(0x301)])/0x2,this['_resetRect'][_0x32bee9(0x20c)],this['_resetRect'][_0x32bee9(0x301)],_0x2de084,_0x11ddac);},Window_Message[_0x42d2fb(0x2f7)]['processCommonEvent']=function(_0x2ec5d6){const _0x2c6113=_0x42d2fb,_0x1da450=Window_Base['prototype'][_0x2c6113(0x130)][_0x2c6113(0x1ef)](this,_0x2ec5d6);_0x2ec5d6['drawing']&&this[_0x2c6113(0x10c)](_0x1da450);},Window_Message[_0x42d2fb(0x2f7)]['launchMessageCommonEvent']=function(_0x31f4d5){const _0x292d8c=_0x42d2fb;if($gameParty[_0x292d8c(0x2ff)]()){}else $gameMap[_0x292d8c(0x159)](_0x31f4d5);},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x2a8)]=function(_0x30ca92){const _0x12e40a=_0x42d2fb;this['_textDelayCount']--,this['_textDelayCount']<=0x0&&(this[_0x12e40a(0x227)](_0x30ca92),Window_Base[_0x12e40a(0x2f7)][_0x12e40a(0x2a8)][_0x12e40a(0x1ef)](this,_0x30ca92));},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x227)]=function(_0x488202){const _0x22e173=_0x42d2fb;this[_0x22e173(0x1a4)]=this[_0x22e173(0x2c7)];if(this[_0x22e173(0x2c7)]<=0x0)this[_0x22e173(0x1b3)]=!![];},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x7a)]=Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x293)],Window_Message['prototype']['processEscapeCharacter']=function(_0x22f549,_0x22ebb2){const _0x7d13f5=_0x42d2fb;if(!_0x22ebb2['drawing'])_0x7d13f5(0xa0)!==_0x7d13f5(0x288)?Window_Base['prototype'][_0x7d13f5(0x293)][_0x7d13f5(0x1ef)](this,_0x22f549,_0x22ebb2):this[_0x7d13f5(0x245)]=_0x297cfb[_0x7d13f5(0x2cc)]()['follower'](_0x2eba65-0x1);else{if(_0x7d13f5(0x22a)===_0x7d13f5(0x22a))VisuMZ[_0x7d13f5(0x18b)][_0x7d13f5(0x7a)][_0x7d13f5(0x1ef)](this,_0x22f549,_0x22ebb2);else{const _0x434040=_0x3477e[_0x7d13f5(0x7f)]()[_0x7d13f5(0x2e7)](_0x11278e=>this[_0x7d13f5(0xd2)](_0x11278e))[_0x7d13f5(0x202)](_0x278f2d=>this[_0x7d13f5(0x1c6)](_0x278f2d)),_0x52c353=_0x3bf967[_0x7d13f5(0xe2)](_0x434040[_0x7d13f5(0x182)]/this[_0x7d13f5(0x9b)]());return _0x3f33d9[_0x7d13f5(0x1c4)](0x1,_0x2b6c4a['min'](_0x52c353,this[_0x7d13f5(0x2a4)]()));}}},Window_Message['prototype'][_0x42d2fb(0x2af)]=function(_0x526ba5){const _0x4f2261=_0x42d2fb;let _0x9a59bc=_0x526ba5[_0x4f2261(0xbc)];this['_forcedPosition']={};if(this[_0x4f2261(0x1ac)]())return _0x9a59bc;_0x9a59bc=_0x9a59bc[_0x4f2261(0x133)](/<POSITION:[ ]*(.*)>/gi,(_0x1fe8c8,_0x1178f1)=>{const _0x3700e7=_0x4f2261;if('XTxzs'!==_0x3700e7(0xa4))this[_0x1d22c4]=_0x2674af(this['_forcedPosition'][_0x2fd8d0]);else{const _0x2d7421=_0x1178f1[_0x3700e7(0x20e)](',')[_0x3700e7(0x2e7)](_0x195f0e=>Number(_0x195f0e)||0x0);if(_0x2d7421[0x0]!==undefined)this[_0x3700e7(0x2c8)]['x']=Number(_0x2d7421[0x0]);if(_0x2d7421[0x1]!==undefined)this[_0x3700e7(0x2c8)]['y']=Number(_0x2d7421[0x1]);if(_0x2d7421[0x2]!==undefined)this[_0x3700e7(0x2c8)]['width']=Number(_0x2d7421[0x2]);if(_0x2d7421[0x3]!==undefined)this[_0x3700e7(0x2c8)][_0x3700e7(0x301)]=Number(_0x2d7421[0x3]);return'';}}),_0x9a59bc=_0x9a59bc['replace'](/<COORDINATES:[ ]*(.*)>/gi,(_0x30d732,_0x2a6fcc)=>{const _0x52ecb2=_0x4f2261,_0x109aca=_0x2a6fcc[_0x52ecb2(0x20e)](',')[_0x52ecb2(0x2e7)](_0x39948d=>Number(_0x39948d)||0x0);if(_0x109aca[0x0]!==undefined)this[_0x52ecb2(0x2c8)]['x']=Number(_0x109aca[0x0]);if(_0x109aca[0x1]!==undefined)this[_0x52ecb2(0x2c8)]['y']=Number(_0x109aca[0x1]);return'';}),_0x9a59bc=_0x9a59bc[_0x4f2261(0x133)](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x3ed100,_0xa9216b)=>{const _0x4e4a4c=_0x4f2261;if(_0x4e4a4c(0x2b4)!=='Lafbd'){this['_moveTargetX']=_0x38da0c,this[_0x4e4a4c(0x290)]=_0x27ed86,this['_moveTargetWidth']=_0x318ade||this[_0x4e4a4c(0x20c)],this['_moveTargetHeight']=_0x49fda2||this[_0x4e4a4c(0x301)],this[_0x4e4a4c(0x2b7)]=_0x125d37||0x1;if(this['_moveDuration']<=0x0)this[_0x4e4a4c(0x2b7)]=0x1;this[_0x4e4a4c(0x2cd)]=this[_0x4e4a4c(0x2b7)],this['_moveEasingType']=_0x2c8a6e||0x0;if(_0x4f1f78<=0x0)this[_0x4e4a4c(0x1c7)]();}else{const _0x3aa8fa=_0xa9216b['split'](',')[_0x4e4a4c(0x2e7)](_0x289c53=>Number(_0x289c53)||0x0);if(_0x3aa8fa[0x0]!==undefined)this[_0x4e4a4c(0x2c8)][_0x4e4a4c(0x20c)]=Number(_0x3aa8fa[0x2]);if(_0x3aa8fa[0x1]!==undefined)this[_0x4e4a4c(0x2c8)][_0x4e4a4c(0x301)]=Number(_0x3aa8fa[0x3]);return'';}}),_0x526ba5[_0x4f2261(0xbc)]=_0x9a59bc;},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x237)]=function(){const _0x326f5f=_0x42d2fb;this[_0x326f5f(0x2c8)]=this[_0x326f5f(0x2c8)]||{};const _0x10cf6a=['x','y',_0x326f5f(0x20c),'height'];for(const _0x1c5861 of _0x10cf6a){this[_0x326f5f(0x2c8)][_0x1c5861]!==undefined&&(this[_0x1c5861]=Number(this['_forcedPosition'][_0x1c5861]));}},Window_Message[_0x42d2fb(0x2f7)]['prepareAutoSizeEscapeCharacters']=function(_0x25888d){const _0x4c74b4=_0x42d2fb;let _0x1acc1f=_0x25888d[_0x4c74b4(0xbc)];_0x1acc1f=_0x1acc1f[_0x4c74b4(0x133)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x2ac499=_0x4c74b4;return this[_0x2ac499(0x2c5)](_0x1acc1f,!![],!![]),this[_0x2ac499(0x1d6)]('none'),'';}),_0x1acc1f=_0x1acc1f['replace'](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x57823e=_0x4c74b4;return this[_0x57823e(0x2c5)](_0x1acc1f,!![],![]),this[_0x57823e(0x1d6)](_0x57823e(0x1da)),'';}),_0x1acc1f=_0x1acc1f[_0x4c74b4(0x133)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x5bc5ca=_0x4c74b4;return this[_0x5bc5ca(0x2c5)](_0x1acc1f,![],!![]),this['processAutoPosition'](_0x5bc5ca(0x1da)),'';});if(SceneManager[_0x4c74b4(0x287)]())_0x1acc1f=_0x1acc1f[_0x4c74b4(0x133)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x20d07c,_0x2cd01f)=>{const _0x2d0279=_0x4c74b4;return this['processAutoSize'](_0x1acc1f,!![],!![]),this[_0x2d0279(0x1d6)](_0x2d0279(0x1dd),Number(_0x2cd01f)||0x1),'';}),_0x1acc1f=_0x1acc1f[_0x4c74b4(0x133)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x287ea4,_0x167a52)=>{const _0x151de6=_0x4c74b4;return this[_0x151de6(0x2c5)](_0x1acc1f,!![],!![]),this['processAutoPosition'](_0x151de6(0x7c),Number(_0x167a52)||0x0),'';}),_0x1acc1f=_0x1acc1f[_0x4c74b4(0x133)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x39922e,_0x4d9f56)=>{const _0x37be1f=_0x4c74b4;return this[_0x37be1f(0x2c5)](_0x1acc1f,!![],!![]),this[_0x37be1f(0x1d6)](_0x37be1f(0x267),Number(_0x4d9f56)||0x0),'';});else SceneManager[_0x4c74b4(0x1ce)]()&&(_0x1acc1f=_0x1acc1f[_0x4c74b4(0x133)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x13e354,_0x18f0e9)=>{const _0x1120ea=_0x4c74b4;if(_0x1120ea(0x2bf)==='BlEGk'){if(!_0x2c4530[_0x1120ea(0x287)]())return'';let _0x3add96=null;return _0x3add96=_0x59cbe9[_0x1120ea(0x168)],!_0x3add96&&_0x20bcd6[_0x1120ea(0x120)]()&&(_0x3add96=_0x2184f7[_0x1120ea(0x2ef)]()),_0x3add96?_0x3add96[_0x1120ea(0x283)]():'';}else return this[_0x1120ea(0x2c5)](_0x1acc1f,!![],!![]),this['processAutoPosition']('map\x20player',0x0),'';}),_0x1acc1f=_0x1acc1f['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x47e0c2,_0x38de64)=>{const _0x1bf659=_0x4c74b4;return this[_0x1bf659(0x2c5)](_0x1acc1f,!![],!![]),this[_0x1bf659(0x1d6)](_0x1bf659(0x83),Number(_0x38de64)||0x1),'';}),_0x1acc1f=_0x1acc1f['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x24db5f,_0x39cac5)=>{const _0x336e12=_0x4c74b4;return this[_0x336e12(0x2c5)](_0x1acc1f,!![],!![]),this[_0x336e12(0x1d6)](_0x336e12(0x163),Number(_0x39cac5)||0x0),'';}),_0x1acc1f=_0x1acc1f[_0x4c74b4(0x133)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x4af0a4,_0x5b0a8c)=>{const _0x498e7a=_0x4c74b4;return this['processAutoSize'](_0x1acc1f,!![],!![]),this[_0x498e7a(0x1d6)](_0x498e7a(0x1b8),Number(_0x5b0a8c)||0x0),'';}));_0x25888d['text']=_0x1acc1f;},Window_Message[_0x42d2fb(0xde)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message['_autoPosRegExp']=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message['prototype'][_0x42d2fb(0x2c5)]=function(_0x4b7d42,_0x4dda53,_0x77c46){const _0x5cd76c=_0x42d2fb;_0x4b7d42=_0x4b7d42['replace'](Window_Message[_0x5cd76c(0xde)],''),_0x4b7d42=_0x4b7d42[_0x5cd76c(0x133)](Window_Message[_0x5cd76c(0x257)],''),this['_autoSizeCheck']=!![];const _0x1d1cca=this['textSizeEx'](_0x4b7d42);if(_0x4dda53){let _0x4508c3=_0x1d1cca['width']+$gameSystem['windowPadding']()*0x2+0x6;const _0x4b98c2=$gameMessage[_0x5cd76c(0x192)]()!=='',_0x5e66ae=ImageManager[_0x5cd76c(0x2c0)],_0x49e7c7=0x14;_0x4508c3+=_0x4b98c2?_0x5e66ae+_0x49e7c7:0x4;if(_0x4508c3%0x2!==0x0)_0x4508c3+=0x1;$gameSystem[_0x5cd76c(0x2b1)](_0x4508c3);}if(_0x77c46){let _0x2aa5a4=Math[_0x5cd76c(0xe2)](_0x1d1cca[_0x5cd76c(0x301)]/this['lineHeight']());$gameSystem['setMessageWindowRows'](_0x2aa5a4);}this[_0x5cd76c(0x2c2)](),this[_0x5cd76c(0x2ed)]=![],this[_0x5cd76c(0x102)]=!![];},Window_Message['prototype']['updateAutoSizePosition']=function(){const _0x2da00f=_0x42d2fb;this[_0x2da00f(0x14c)](),this['updatePlacement'](),this['resetPositionX'](),this[_0x2da00f(0x1dc)](),this['contents']['clear'](),this['createContents']();},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x1d6)]=function(_0x2953dc,_0x394abd){const _0x31c390=_0x42d2fb;switch(_0x2953dc[_0x31c390(0x26a)]()[_0x31c390(0x160)]()){case _0x31c390(0x1dd):this[_0x31c390(0x245)]=$gameActors[_0x31c390(0x2ef)](_0x394abd);break;case'battle\x20party':this['_autoPositionTarget']=$gameParty[_0x31c390(0x292)]()[_0x394abd-0x1];break;case _0x31c390(0x267):this[_0x31c390(0x245)]=$gameTroop[_0x31c390(0x292)]()[_0x394abd-0x1];break;case _0x31c390(0x2f9):this[_0x31c390(0x245)]=$gamePlayer;break;case _0x31c390(0x83):const _0x520d7f=$gameActors[_0x31c390(0x2ef)](_0x394abd)[_0x31c390(0xc2)]();_0x520d7f===0x0?this[_0x31c390(0x245)]=$gamePlayer:this[_0x31c390(0x245)]=$gamePlayer['followers']()[_0x31c390(0x1c8)](_0x520d7f-0x1);break;case _0x31c390(0x163):_0x394abd===0x1?this['_autoPositionTarget']=$gamePlayer:this['_autoPositionTarget']=$gamePlayer[_0x31c390(0x2cc)]()[_0x31c390(0x1c8)](_0x394abd-0x2);break;case _0x31c390(0x1b8):this[_0x31c390(0x245)]=$gameMap[_0x31c390(0x85)](_0x394abd);break;}this['_autoPositionTarget']&&this[_0x31c390(0xec)]();},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x110)]=Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0xaf)],Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0xaf)]=function(){const _0x261778=_0x42d2fb;this['updateAutoPosition'](),VisuMZ[_0x261778(0x18b)][_0x261778(0x110)]['call'](this);},Window_Message['prototype'][_0x42d2fb(0xec)]=function(){const _0x22c321=_0x42d2fb;if(!this['_autoPositionTarget'])return;const _0x76b20a=SceneManager[_0x22c321(0x1c1)];if(!_0x76b20a)return;if(!_0x76b20a['_spriteset'])return;const _0x5e2654=_0x76b20a[_0x22c321(0x27f)]['findTargetSprite'](this[_0x22c321(0x245)]);if(!_0x5e2654)return;let _0x20c3ff=_0x5e2654['x'];_0x20c3ff-=this[_0x22c321(0x20c)]/0x2,_0x20c3ff-=(Graphics[_0x22c321(0x20c)]-Graphics[_0x22c321(0x219)])/0x2;let _0xe03b08=_0x5e2654['y'];_0xe03b08-=this[_0x22c321(0x301)],_0xe03b08-=(Graphics[_0x22c321(0x301)]-Graphics[_0x22c321(0x1ea)])/0x2,_0xe03b08-=_0x5e2654[_0x22c321(0x301)]+0x8,this['x']=Math['round'](_0x20c3ff),this['y']=Math[_0x22c321(0x1df)](_0xe03b08),this['clampPlacementPosition'](!![],![]),this[_0x22c321(0x268)][_0x22c321(0x1f2)]();},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x207)]=function(){const _0x5a861b=_0x42d2fb;this[_0x5a861b(0x102)]=![],this[_0x5a861b(0x245)]=undefined,$gameSystem['initMessageCore'](),this[_0x5a861b(0x2c2)](),this[_0x5a861b(0x2b0)]=0x0;},Window_Message['prototype'][_0x42d2fb(0x277)]=function(_0x2c8564){const _0x429f9c=_0x42d2fb;return Window_Base[_0x429f9c(0x2f7)][_0x429f9c(0x277)][_0x429f9c(0x1ef)](this,_0x2c8564);},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x9f)]=function(_0xe7d2cc){const _0x2d97bd=_0x42d2fb;return Window_Base[_0x2d97bd(0x2f7)][_0x2d97bd(0x9f)][_0x2d97bd(0x1ef)](this,_0xe7d2cc);},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x153)]=function(_0x203109){const _0x1c44c6=_0x42d2fb;this[_0x1c44c6(0x203)](_0x203109),Window_Base['prototype']['flushTextState'][_0x1c44c6(0x1ef)](this,_0x203109),this[_0x1c44c6(0x106)](_0x203109);},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x203)]=function(_0x303132){},Window_Message[_0x42d2fb(0x2f7)][_0x42d2fb(0x106)]=function(_0x2c5f8e){},Window_NameBox[_0x42d2fb(0x2f7)][_0x42d2fb(0x14b)]=function(){return![];},Window_NameBox[_0x42d2fb(0x2f7)]['resetTextColor']=function(){const _0x169588=_0x42d2fb;Window_Base[_0x169588(0x2f7)]['resetTextColor'][_0x169588(0x1ef)](this),this[_0x169588(0xf8)](this[_0x169588(0x2ab)]());},Window_NameBox['prototype']['defaultColor']=function(){const _0x85a250=_0x42d2fb,_0x1c142b=VisuMZ[_0x85a250(0x18b)][_0x85a250(0x1c2)][_0x85a250(0x2ae)][_0x85a250(0x276)];return ColorManager[_0x85a250(0x294)](_0x1c142b);},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x280)]=Window_NameBox['prototype'][_0x42d2fb(0x1f2)],Window_NameBox['prototype']['updatePlacement']=function(){const _0x4f086a=_0x42d2fb;VisuMZ[_0x4f086a(0x18b)][_0x4f086a(0x280)][_0x4f086a(0x1ef)](this),this[_0x4f086a(0x23f)](),this[_0x4f086a(0x2b6)](),this[_0x4f086a(0xd9)](),this[_0x4f086a(0x2df)]();},Window_NameBox['prototype'][_0x42d2fb(0x277)]=function(_0x148712){const _0xa4bf96=_0x42d2fb;return _0x148712=_0x148712['replace'](/<LEFT>/gi,this[_0xa4bf96(0x1b6)][_0xa4bf96(0x1f6)](this,0x0)),_0x148712=_0x148712[_0xa4bf96(0x133)](/<CENTER>/gi,this[_0xa4bf96(0x1b6)]['bind'](this,0x5)),_0x148712=_0x148712[_0xa4bf96(0x133)](/<RIGHT>/gi,this[_0xa4bf96(0x1b6)][_0xa4bf96(0x1f6)](this,0xa)),_0x148712=_0x148712[_0xa4bf96(0x133)](/<POSITION:[ ](\d+)>/gi,(_0x1b3b55,_0x30bbff)=>this['setRelativePosition'](parseInt(_0x30bbff))),_0x148712=_0x148712[_0xa4bf96(0x133)](/<\/LEFT>/gi,''),_0x148712=_0x148712[_0xa4bf96(0x133)](/<\/CENTER>/gi,''),_0x148712=_0x148712[_0xa4bf96(0x133)](/<\/RIGHT>/gi,''),Window_Base[_0xa4bf96(0x2f7)][_0xa4bf96(0x277)][_0xa4bf96(0x1ef)](this,_0x148712);},Window_NameBox['prototype']['setRelativePosition']=function(_0xc79c43){const _0x5b2181=_0x42d2fb;return this[_0x5b2181(0x19d)]=_0xc79c43,'';},Window_NameBox[_0x42d2fb(0x2f7)]['updateRelativePosition']=function(){const _0x15b6be=_0x42d2fb;if($gameMessage[_0x15b6be(0x1fd)]())return;this[_0x15b6be(0x19d)]=this['_relativePosition']||0x0;const _0x41d58d=this['_messageWindow'],_0x299b59=Math[_0x15b6be(0xbf)](_0x41d58d[_0x15b6be(0x20c)]*this[_0x15b6be(0x19d)]/0xa);this['x']=_0x41d58d['x']+_0x299b59-Math[_0x15b6be(0xbf)](this[_0x15b6be(0x20c)]/0x2),this['x']=this['x'][_0x15b6be(0x18f)](_0x41d58d['x'],_0x41d58d['x']+_0x41d58d[_0x15b6be(0x20c)]-this['width']);},Window_NameBox['prototype']['updateOffsetPosition']=function(){const _0x34e160=_0x42d2fb;if($gameMessage['isRTL']())return;this[_0x34e160(0x19d)]=this['_relativePosition']||0x0;const _0x5991b0=VisuMZ['MessageCore'][_0x34e160(0x1c2)][_0x34e160(0x2ae)][_0x34e160(0x82)],_0x40518e=VisuMZ[_0x34e160(0x18b)][_0x34e160(0x1c2)][_0x34e160(0x2ae)][_0x34e160(0x1e8)],_0x1bc170=(0x5-this['_relativePosition'])/0x5;this['x']+=Math['floor'](_0x5991b0*_0x1bc170),this['y']+=_0x40518e;},Window_NameBox[_0x42d2fb(0x2f7)]['updateOverlappingY']=function(){const _0x2da941=_0x42d2fb,_0x529bd3=this[_0x2da941(0x91)],_0x2f6b65=_0x529bd3['y'],_0x3778d1=VisuMZ[_0x2da941(0x18b)]['Settings']['General'][_0x2da941(0x1e8)];_0x2f6b65>this['y']&&_0x2f6b65<this['y']+this[_0x2da941(0x301)]-_0x3778d1&&(this['y']=_0x529bd3['y']+_0x529bd3[_0x2da941(0x301)]);},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x271)]=Window_NameBox['prototype'][_0x42d2fb(0x169)],Window_NameBox[_0x42d2fb(0x2f7)][_0x42d2fb(0x169)]=function(){const _0x453b36=_0x42d2fb;this['_relativePosition']=0x0,VisuMZ[_0x453b36(0x18b)][_0x453b36(0x271)][_0x453b36(0x1ef)](this);},Window_ChoiceList[_0x42d2fb(0x2f7)]['isWordWrapEnabled']=function(){return![];},Window_ChoiceList[_0x42d2fb(0x2f7)][_0x42d2fb(0x14b)]=function(){return!![];},Window_ChoiceList[_0x42d2fb(0x2f7)][_0x42d2fb(0x296)]=function(){return $gameSystem['getChoiceListLineHeight']()+0x8;},Window_ChoiceList[_0x42d2fb(0x2f7)][_0x42d2fb(0x9b)]=function(){return $gameSystem['getChoiceListMaxColumns']();},Window_ChoiceList['prototype'][_0x42d2fb(0x206)]=function(){const _0x413dbb=_0x42d2fb;this[_0x413dbb(0x169)](),this[_0x413dbb(0xaa)](),this['open'](),this[_0x413dbb(0xf9)]();},Window_ChoiceList[_0x42d2fb(0x2f7)][_0x42d2fb(0x169)]=function(){const _0x4dd23f=_0x42d2fb;this['clearCommandList'](),this[_0x4dd23f(0xc1)](),this['_messageWindow']&&(this[_0x4dd23f(0x1f2)](),this['placeCancelButton']()),this[_0x4dd23f(0x204)](),this[_0x4dd23f(0x18d)](),this[_0x4dd23f(0xfe)](),Window_Selectable[_0x4dd23f(0x2f7)][_0x4dd23f(0x169)][_0x4dd23f(0x1ef)](this);},Window_ChoiceList[_0x42d2fb(0x2f7)][_0x42d2fb(0xc1)]=function(){const _0x417490=_0x42d2fb,_0x3cd858=$gameMessage[_0x417490(0x7f)]();let _0x4ea5a0=0x0;for(let _0x4ed9de of _0x3cd858){if(_0x417490(0x181)!==_0x417490(0x181)){if(!_0x240933[_0x417490(0x113)](_0xbb737a))return![];}else{_0x4ed9de=this[_0x417490(0xd2)](_0x4ed9de);if(this[_0x417490(0x1c6)](_0x4ed9de)){if('MaAvX'===_0x417490(0x170)){_0x2b8257['ConvertParams'](_0x4b18d2,_0x5561d2);const _0x4c4511=_0x5e44f4['Rows']||_0x1d149b[_0x417490(0x114)]()||0x1,_0x400fae=_0x15c80f[_0x417490(0x2d2)]||_0x36d66e['getMessageWindowWidth']()||0x1;_0x49477a[_0x417490(0x22d)]=_0x3131ce[_0x417490(0x136)]||![];const _0x165a33=_0x56fd88[_0x417490(0xca)][_0x417490(0x26a)]();_0x32633b[_0x417490(0x17b)](_0x4c4511),_0x5d97b0[_0x417490(0x2b1)](_0x400fae);[_0x417490(0x21e),_0x417490(0x230)][_0x417490(0x1bf)](_0x165a33)&&_0x463e36[_0x417490(0x99)](_0xb3bbc(_0x165a33));const _0xa95035=_0x1a7991[_0x417490(0x1c1)]['_messageWindow'];_0xa95035&&(_0xa95035['resetWordWrap'](),_0xa95035[_0x417490(0x14c)](),_0xa95035[_0x417490(0x204)]());}else{const _0x3d2164=this[_0x417490(0x190)](_0x4ed9de),_0x4a9d1d=this['isChoiceEnabled'](_0x4ed9de);this[_0x417490(0xd3)](_0x3d2164,_0x417490(0x11d),_0x4a9d1d,_0x4ea5a0);}}_0x4ea5a0++;}}},Window_ChoiceList[_0x42d2fb(0x2f7)][_0x42d2fb(0xd2)]=function(_0x1516a1){const _0xf97bdd=_0x42d2fb;return Window_Base[_0xf97bdd(0x2f7)][_0xf97bdd(0x189)][_0xf97bdd(0x1ef)](this,_0x1516a1);},Window_ChoiceList['prototype'][_0x42d2fb(0x189)]=function(_0x172fce){return _0x172fce;},Window_ChoiceList[_0x42d2fb(0x2f7)][_0x42d2fb(0x1c6)]=function(_0x33f659){const _0x1cd510=_0x42d2fb;if(_0x33f659[_0x1cd510(0x100)](/<HIDE>/i))return![];if(_0x33f659[_0x1cd510(0x100)](/<SHOW>/i))return!![];if(_0x33f659[_0x1cd510(0x100)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('FyCQA'!==_0x1cd510(0x244)){const _0x3d8dd8=JSON['parse']('['+RegExp['$1'][_0x1cd510(0x100)](/\d+/g)+']');for(const _0x1aabef of _0x3d8dd8){if(_0x1cd510(0xcc)===_0x1cd510(0xcc)){if(!$gameSwitches[_0x1cd510(0x113)](_0x1aabef))return![];}else{this['_autoColorActorNames']===_0xf7edef&&this[_0x1cd510(0xba)]();for(_0x5118fe of this[_0x1cd510(0x9d)]){_0xdbe17b=_0x394f86[_0x1cd510(0x133)](_0xebfc33[0x0],_0x534a1e[0x1]);}return _0x155567;}}return!![];}else{_0x267224[_0x1cd510(0x18b)][_0x1cd510(0x30a)][_0x1cd510(0x1ef)](this,_0x4b74c4);const _0xe37a4e=_0x46801a['MessageCore']['Settings']['AutoColor'];_0x56aacc[_0x1cd510(0x18b)][_0x1cd510(0x2d8)](_0x3d235c,_0xe37a4e[_0x1cd510(0x18e)]);}}if(_0x33f659[_0x1cd510(0x100)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('MwHiu'!==_0x1cd510(0x129)){const _0x5599f6=JSON[_0x1cd510(0x2dd)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2ffb37 of _0x5599f6){if(!$gameSwitches['value'](_0x2ffb37))return![];}return!![];}else{const _0x2fe137=_0x3c600c[_0x1cd510(0x18b)][_0x1cd510(0x1c2)][_0x1cd510(0xb2)];let _0x4984ef=0x0;if(_0x3256d5===_0x47019b)_0x4984ef=_0x2fe137[_0x1cd510(0xfa)];if(_0x64e0fb===_0x32a0d8)_0x4984ef=_0x2fe137[_0x1cd510(0x12b)];if(_0x54d64b===_0x6c42)_0x4984ef=_0x2fe137[_0x1cd510(0x101)];if(_0x2d481d===_0x109ab7)_0x4984ef=_0x2fe137[_0x1cd510(0x1f4)];if(_0x1a166e===_0x410daf)_0x4984ef=_0x2fe137[_0x1cd510(0x18e)];if(_0x3ad3f8===_0x5f2ed9)_0x4984ef=_0x2fe137[_0x1cd510(0x1b4)];if(_0x7b395a===_0x1c0b7b)_0x4984ef=_0x2fe137[_0x1cd510(0x2ea)];if(_0xf1344c===_0x1bfce8)_0x4984ef=_0x2fe137[_0x1cd510(0x1b5)];return _0x4984ef>0x0&&(_0x5176aa='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x1cd510(0x241)](_0x4984ef,_0x5017ca)),_0x1a553a;}}if(_0x33f659[_0x1cd510(0x100)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1cd510(0x29f)==='qwQux'){const _0x53c11c=JSON[_0x1cd510(0x2dd)]('['+RegExp['$1'][_0x1cd510(0x100)](/\d+/g)+']');for(const _0x17662d of _0x53c11c){if($gameSwitches[_0x1cd510(0x113)](_0x17662d))return!![];}return![];}else _0x405a65['setFaceImage'](_0x398b28[0x0],_0x2767e1[0x1]),_0x18e419['setBackground'](_0x5a2dc1[0x2]),_0x3bd01f[_0x1cd510(0x19f)](_0x422eab[0x3]),_0x2f9e9c['setSpeakerName'](_0x3ce6af[0x4]);}if(_0x33f659[_0x1cd510(0x100)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3a1d92=JSON['parse']('['+RegExp['$1'][_0x1cd510(0x100)](/\d+/g)+']');for(const _0x268cc1 of _0x3a1d92){if(_0x1cd510(0x135)!=='HDqfs'){if(!$gameSwitches[_0x1cd510(0x113)](_0x268cc1))return!![];}else return this[_0x1cd510(0x1c1)]&&this[_0x1cd510(0x1c1)][_0x1cd510(0x2ec)]===_0x308c9f;}return![];}if(_0x33f659['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1cd510(0x13f)!=='onvIg'){const _0x32e69f=_0x696996[_0x1cd510(0x283)],_0x5bd862=this[_0x1cd510(0x295)](_0x32e69f)['width'],_0x1f331f=_0x405877[_0x1cd510(0xe2)](_0x5bd862)+this['itemPadding']()*0x2;_0x4e791b<_0x1f331f&&(_0x57f65e=_0x1f331f);}else{const _0x56d9db=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x276aef of _0x56d9db){if(!$gameSwitches['value'](_0x276aef))return!![];}return![];}}if(_0x33f659['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1cd510(0x119)===_0x1cd510(0x1d7)){if(this['_MessageCoreSettings']===_0x402749)this[_0x1cd510(0x87)]();if(this[_0x1cd510(0x155)][_0x1cd510(0x1db)]===_0x3f46f6)this[_0x1cd510(0x87)]();this[_0x1cd510(0x155)]['messageWordWrap']=_0x2cc8d9;}else{const _0x276023=JSON[_0x1cd510(0x2dd)]('['+RegExp['$1'][_0x1cd510(0x100)](/\d+/g)+']');for(const _0x39f512 of _0x276023){if($gameSwitches['value'](_0x39f512))return![];}return!![];}}return!![];},Window_ChoiceList['prototype'][_0x42d2fb(0x190)]=function(_0x5d4670){const _0x1a825f=_0x42d2fb;let _0x5012dd=_0x5d4670;return _0x5012dd=_0x5012dd[_0x1a825f(0x133)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x5012dd=_0x5012dd[_0x1a825f(0x133)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x5012dd;},Window_ChoiceList['prototype'][_0x42d2fb(0xf1)]=function(_0x406780){const _0x1d2344=_0x42d2fb;if(_0x406780[_0x1d2344(0x100)](/<DISABLE>/i))return![];if(_0x406780[_0x1d2344(0x100)](/<ENABLE>/i))return!![];if(_0x406780[_0x1d2344(0x100)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1d2344(0x2f8)!=='WdKEb')this[_0x1d2344(0x19d)]=0x0,_0x29bdce[_0x1d2344(0x18b)]['Window_NameBox_refresh'][_0x1d2344(0x1ef)](this);else{const _0x2cbf51=JSON[_0x1d2344(0x2dd)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x22e557 of _0x2cbf51){if(!$gameSwitches[_0x1d2344(0x113)](_0x22e557))return![];}return!![];}}if(_0x406780[_0x1d2344(0x100)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1d2344(0x1a9)!==_0x1d2344(0x10f)){const _0x3f61df=JSON['parse']('['+RegExp['$1'][_0x1d2344(0x100)](/\d+/g)+']');for(const _0x4a64f5 of _0x3f61df){if('wMgqi'===_0x1d2344(0x233))this['_commonEventId']=_0x121605,this[_0x1d2344(0x14e)]=_0x499a47||0x0,this[_0x1d2344(0x169)]();else{if(!$gameSwitches['value'](_0x4a64f5))return![];}}return!![];}else{const _0x258878=this[_0x1d2344(0x2b7)],_0x44cc9a=this['_wholeMoveDuration'],_0xd9304e=this[_0x1d2344(0x15a)]((_0x44cc9a-_0x258878)/_0x44cc9a),_0x42dc2d=this[_0x1d2344(0x15a)]((_0x44cc9a-_0x258878+0x1)/_0x44cc9a),_0x5864ff=(_0x1367ee-_0x3cef76*_0xd9304e)/(0x1-_0xd9304e);return _0x5864ff+(_0x3b1ead-_0x5864ff)*_0x42dc2d;}}if(_0x406780[_0x1d2344(0x100)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x23732f=JSON[_0x1d2344(0x2dd)]('['+RegExp['$1'][_0x1d2344(0x100)](/\d+/g)+']');for(const _0x25cfe6 of _0x23732f){if('zGOqv'===_0x1d2344(0x172)){if($gameSwitches[_0x1d2344(0x113)](_0x25cfe6))return!![];}else{if(!_0x3d2979||!_0x284db3)return-0x1;return _0x349261[_0x1d2344(0x182)]-_0x2c2ffc['length'];}}return![];}if(_0x406780[_0x1d2344(0x100)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x204f56=JSON['parse']('['+RegExp['$1'][_0x1d2344(0x100)](/\d+/g)+']');for(const _0x1ed3bb of _0x204f56){if(_0x1d2344(0x26c)===_0x1d2344(0x26c)){if(!$gameSwitches[_0x1d2344(0x113)](_0x1ed3bb))return!![];}else _0x29d088[_0x1d2344(0x18b)]['Window_Message_processEscapeCharacter'][_0x1d2344(0x1ef)](this,_0x13c49f,_0x20e24c);}return![];}if(_0x406780[_0x1d2344(0x100)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1d2344(0x8a)!==_0x1d2344(0x86)){const _0x4893f0=JSON[_0x1d2344(0x2dd)]('['+RegExp['$1'][_0x1d2344(0x100)](/\d+/g)+']');for(const _0x18b65a of _0x4893f0){if(!$gameSwitches['value'](_0x18b65a))return!![];}return![];}else this['initMessageCore'](_0x34810f),_0x12a918['MessageCore'][_0x1d2344(0x22e)]['call'](this,_0x1627b0);}if(_0x406780[_0x1d2344(0x100)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('gYDzc'===_0x1d2344(0x1a5))this[_0x1d2344(0x1b2)](_0x5d778c[_0x1d2344(0x30b)]());else{const _0x426071=JSON[_0x1d2344(0x2dd)]('['+RegExp['$1'][_0x1d2344(0x100)](/\d+/g)+']');for(const _0x1f9c81 of _0x426071){if($gameSwitches['value'](_0x1f9c81))return![];}return!![];}}return!![];},VisuMZ[_0x42d2fb(0x18b)][_0x42d2fb(0x1c0)]=Window_ChoiceList[_0x42d2fb(0x2f7)][_0x42d2fb(0x1f2)],Window_ChoiceList[_0x42d2fb(0x2f7)][_0x42d2fb(0x1f2)]=function(){const _0x482d08=_0x42d2fb;VisuMZ[_0x482d08(0x18b)]['Window_ChoiceList_updatePlacement']['call'](this),this[_0x482d08(0xd9)]();},Window_ChoiceList[_0x42d2fb(0x2f7)][_0x42d2fb(0x258)]=function(){const _0x5549ca=_0x42d2fb;if(!this[_0x5549ca(0x88)])return;const _0x3bac71=0x8,_0x554371=this[_0x5549ca(0x88)],_0x3048e8=this['x']+this[_0x5549ca(0x20c)],_0x4d8cfa=Math[_0x5549ca(0xbf)]((Graphics[_0x5549ca(0x20c)]-Graphics[_0x5549ca(0x219)])/0x2);_0x3048e8>=Graphics[_0x5549ca(0x219)]+_0x4d8cfa-_0x554371[_0x5549ca(0x20c)]+_0x3bac71?_0x5549ca(0x1d3)===_0x5549ca(0x1d3)?_0x554371['x']=-_0x554371[_0x5549ca(0x20c)]-_0x3bac71:(this[_0x5549ca(0x2af)](_0x3ecf42),this[_0x5549ca(0x122)](_0x31ab2b),this[_0x5549ca(0x14c)]()):_0x5549ca(0x2b9)===_0x5549ca(0x2b9)?_0x554371['x']=this['width']+_0x3bac71:_0x2ba0ea[_0x5549ca(0xd0)]=_0x2c7f53['TextJS'],_0x554371['y']=this['height']/0x2-_0x554371['height']/0x2;},VisuMZ['MessageCore'][_0x42d2fb(0x112)]=Window_ChoiceList[_0x42d2fb(0x2f7)]['windowX'],Window_ChoiceList[_0x42d2fb(0x2f7)][_0x42d2fb(0x128)]=function(){const _0x53be10=_0x42d2fb;if(this['_messageWindow'])return this['messageCoreWindowX']();else{if(_0x53be10(0xb4)!==_0x53be10(0xb4)){_0x5cdfb3=_0x1cd063[_0x53be10(0x133)](/\x1b!/g,''),_0x57d13f=_0x30cfe0[_0x53be10(0x133)](/\x1b\|/g,''),_0x2b3c6b=_0x5b41b4['replace'](/\x1b\./g,'');const _0x3eaa6b=this[_0x53be10(0x9a)](_0x2d5f80,0x0,0x0,0x0),_0xaf26dc=this['getPreservedFontSettings']();return _0x3eaa6b['drawing']=![],this['processAllText'](_0x3eaa6b),this[_0x53be10(0x1cd)](_0xaf26dc),{'width':_0x3eaa6b[_0x53be10(0x2f3)],'height':_0x3eaa6b[_0x53be10(0x12d)]};}else return VisuMZ[_0x53be10(0x18b)][_0x53be10(0x112)][_0x53be10(0x1ef)](this);}},Window_ChoiceList[_0x42d2fb(0x2f7)]['messageCoreWindowX']=function(){const _0x400822=_0x42d2fb,_0x36aa2a=$gameMessage[_0x400822(0x216)]();if(_0x36aa2a===0x1)return _0x400822(0x225)!==_0x400822(0x225)?(_0x3c543a=_0x54d68c['replace'](/<LEFT>/gi,this[_0x400822(0x1b6)][_0x400822(0x1f6)](this,0x0)),_0xb0d108=_0x18321d[_0x400822(0x133)](/<CENTER>/gi,this[_0x400822(0x1b6)]['bind'](this,0x5)),_0x5536f9=_0x5a564c[_0x400822(0x133)](/<RIGHT>/gi,this[_0x400822(0x1b6)][_0x400822(0x1f6)](this,0xa)),_0x3ee24a=_0x3bc995['replace'](/<POSITION:[ ](\d+)>/gi,(_0x4a53e7,_0x2c78b8)=>this[_0x400822(0x1b6)](_0x41032d(_0x2c78b8))),_0x40a12b=_0x530f18[_0x400822(0x133)](/<\/LEFT>/gi,''),_0x36d078=_0x146e8e[_0x400822(0x133)](/<\/CENTER>/gi,''),_0x378a8c=_0x9bd876['replace'](/<\/RIGHT>/gi,''),_0x40d525[_0x400822(0x2f7)][_0x400822(0x277)][_0x400822(0x1ef)](this,_0x270c40)):(Graphics['boxWidth']-this['windowWidth']())/0x2;else{if(_0x36aa2a===0x2){if(_0x400822(0x8f)!==_0x400822(0x8f))this[_0x400822(0x13e)]=new _0xd61268(),this['_interpreter'][_0x400822(0xad)](this[_0x400822(0x1f8)](),this['_eventId']);else return this['_messageWindow']['x']+this[_0x400822(0x91)][_0x400822(0x20c)]-this[_0x400822(0x1cb)]();}else return this['_messageWindow']['x'];}},Window_ChoiceList[_0x42d2fb(0x2f7)][_0x42d2fb(0x1cb)]=function(){const _0xb43946=_0x42d2fb,_0x26f453=(this[_0xb43946(0xf0)]()+this['colSpacing']())*this[_0xb43946(0x9b)]()+this[_0xb43946(0x27c)]*0x2;return Math[_0xb43946(0x1cf)](_0x26f453,Graphics[_0xb43946(0x20c)]);},Window_ChoiceList[_0x42d2fb(0x2f7)][_0x42d2fb(0x17a)]=function(){const _0x2ade3e=_0x42d2fb,_0x5f4a1b=$gameMessage[_0x2ade3e(0x7f)]()[_0x2ade3e(0x2e7)](_0x38523c=>this['convertChoiceMacros'](_0x38523c))[_0x2ade3e(0x202)](_0x26a895=>this[_0x2ade3e(0x1c6)](_0x26a895)),_0x286af6=Math[_0x2ade3e(0xe2)](_0x5f4a1b['length']/this[_0x2ade3e(0x9b)]());return Math[_0x2ade3e(0x1c4)](0x1,Math[_0x2ade3e(0x1cf)](_0x286af6,this[_0x2ade3e(0x2a4)]()));},Window_ChoiceList['prototype']['maxLines']=function(){const _0x55a21e=_0x42d2fb,_0x1befd8=this[_0x55a21e(0x91)],_0x2f9e09=_0x1befd8?_0x1befd8['y']:0x0,_0x47616f=_0x1befd8?_0x1befd8[_0x55a21e(0x301)]:0x0,_0x45cccd=Graphics[_0x55a21e(0x1ea)]/0x2;return _0x2f9e09<_0x45cccd&&_0x2f9e09+_0x47616f>_0x45cccd?0x4:$gameSystem[_0x55a21e(0x10e)]();},Window_ChoiceList[_0x42d2fb(0x2f7)]['maxChoiceWidth']=function(){const _0x3c00c8=_0x42d2fb;let _0x25a204=0x60;for(const _0x345a7e of this[_0x3c00c8(0x259)]){if(_0x3c00c8(0x281)!==_0x3c00c8(0x23d)){const _0x73b90b=_0x345a7e[_0x3c00c8(0x283)],_0x323889=this[_0x3c00c8(0x295)](_0x73b90b)[_0x3c00c8(0x20c)],_0x195ef0=Math[_0x3c00c8(0xe2)](_0x323889)+this[_0x3c00c8(0xef)]()*0x2;_0x25a204<_0x195ef0&&(_0x25a204=_0x195ef0);}else this[_0x3c00c8(0x102)]=![],this[_0x3c00c8(0x245)]=_0xafe352,_0x4d9a8c[_0x3c00c8(0x87)](),this['updateAutoSizePosition'](),this[_0x3c00c8(0x2b0)]=0x0;}return _0x25a204;},Window_ChoiceList[_0x42d2fb(0x2f7)]['drawItem']=function(_0x573f2a){const _0x2209d4=_0x42d2fb,_0x5b383a=this[_0x2209d4(0x123)](_0x573f2a),_0x3f4822=$gameSystem[_0x2209d4(0x117)]()!==_0x2209d4(0x1e3)?_0x2209d4(0x24a)[_0x2209d4(0x241)]($gameSystem[_0x2209d4(0x117)]()):'',_0x12fa51=_0x3f4822+this[_0x2209d4(0x28c)](_0x573f2a);this[_0x2209d4(0x124)](this[_0x2209d4(0x2fb)](_0x573f2a));const _0x521162=this[_0x2209d4(0x295)](_0x12fa51)[_0x2209d4(0x301)],_0x5a17b6=Math['max'](_0x5b383a['y'],_0x5b383a['y']+Math[_0x2209d4(0x1df)]((_0x5b383a['height']-_0x521162)/0x2));this[_0x2209d4(0x270)](_0x12fa51,_0x5b383a['x'],_0x5a17b6,_0x5b383a['width']);},Window_ChoiceList['prototype'][_0x42d2fb(0x22f)]=function(){const _0x4e1eed=_0x42d2fb;$gameMessage[_0x4e1eed(0x21f)](this[_0x4e1eed(0x24e)]()),this[_0x4e1eed(0x91)][_0x4e1eed(0x16d)](),this[_0x4e1eed(0x19b)]();};