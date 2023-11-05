//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.44;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.44] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
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
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x265d62=_0x5929;(function(_0x2965fd,_0x1377cd){const _0xeef09c=_0x5929,_0x1fe3a1=_0x2965fd();while(!![]){try{const _0x52ee2e=parseInt(_0xeef09c(0x3c3))/0x1+-parseInt(_0xeef09c(0x656))/0x2*(-parseInt(_0xeef09c(0x77e))/0x3)+-parseInt(_0xeef09c(0x598))/0x4*(parseInt(_0xeef09c(0x869))/0x5)+parseInt(_0xeef09c(0x260))/0x6+-parseInt(_0xeef09c(0x34d))/0x7*(-parseInt(_0xeef09c(0x460))/0x8)+-parseInt(_0xeef09c(0x83f))/0x9*(parseInt(_0xeef09c(0x1e0))/0xa)+-parseInt(_0xeef09c(0x296))/0xb*(parseInt(_0xeef09c(0x4f7))/0xc);if(_0x52ee2e===_0x1377cd)break;else _0x1fe3a1['push'](_0x1fe3a1['shift']());}catch(_0x284232){_0x1fe3a1['push'](_0x1fe3a1['shift']());}}}(_0x4719,0xb1cc5));var label=_0x265d62(0x7f2),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x265d62(0x802)](function(_0x13e954){const _0x2f3556=_0x265d62;return _0x13e954[_0x2f3556(0x7a0)]&&_0x13e954[_0x2f3556(0x578)][_0x2f3556(0x734)]('['+label+']');})[0x0];VisuMZ[label][_0x265d62(0x68a)]=VisuMZ[label][_0x265d62(0x68a)]||{},VisuMZ[_0x265d62(0x7c8)]=function(_0xa3d442,_0x2fe29e){const _0x42d912=_0x265d62;for(const _0x286ccf in _0x2fe29e){if(_0x42d912(0x775)===_0x42d912(0x775)){if(_0x286ccf['match'](/(.*):(.*)/i)){if(_0x42d912(0x441)===_0x42d912(0x38c))this['processKeyboardDigitChange']();else{const _0x449700=String(RegExp['$1']),_0x35601c=String(RegExp['$2'])[_0x42d912(0x8d5)]()[_0x42d912(0x1b2)]();let _0x4e6fa4,_0x4d97d7,_0x5c6bfc;switch(_0x35601c){case _0x42d912(0x860):_0x4e6fa4=_0x2fe29e[_0x286ccf]!==''?Number(_0x2fe29e[_0x286ccf]):0x0;break;case'ARRAYNUM':_0x4d97d7=_0x2fe29e[_0x286ccf]!==''?JSON[_0x42d912(0x201)](_0x2fe29e[_0x286ccf]):[],_0x4e6fa4=_0x4d97d7[_0x42d912(0x2e1)](_0x34390a=>Number(_0x34390a));break;case _0x42d912(0x505):_0x4e6fa4=_0x2fe29e[_0x286ccf]!==''?eval(_0x2fe29e[_0x286ccf]):null;break;case'ARRAYEVAL':_0x4d97d7=_0x2fe29e[_0x286ccf]!==''?JSON[_0x42d912(0x201)](_0x2fe29e[_0x286ccf]):[],_0x4e6fa4=_0x4d97d7[_0x42d912(0x2e1)](_0x15a8e7=>eval(_0x15a8e7));break;case'JSON':_0x4e6fa4=_0x2fe29e[_0x286ccf]!==''?JSON[_0x42d912(0x201)](_0x2fe29e[_0x286ccf]):'';break;case _0x42d912(0x70a):_0x4d97d7=_0x2fe29e[_0x286ccf]!==''?JSON[_0x42d912(0x201)](_0x2fe29e[_0x286ccf]):[],_0x4e6fa4=_0x4d97d7[_0x42d912(0x2e1)](_0x5b9ed=>JSON[_0x42d912(0x201)](_0x5b9ed));break;case _0x42d912(0x4c0):_0x4e6fa4=_0x2fe29e[_0x286ccf]!==''?new Function(JSON[_0x42d912(0x201)](_0x2fe29e[_0x286ccf])):new Function('return\x200');break;case'ARRAYFUNC':_0x4d97d7=_0x2fe29e[_0x286ccf]!==''?JSON['parse'](_0x2fe29e[_0x286ccf]):[],_0x4e6fa4=_0x4d97d7['map'](_0x4b59b1=>new Function(JSON[_0x42d912(0x201)](_0x4b59b1)));break;case _0x42d912(0x4f9):_0x4e6fa4=_0x2fe29e[_0x286ccf]!==''?String(_0x2fe29e[_0x286ccf]):'';break;case _0x42d912(0x360):_0x4d97d7=_0x2fe29e[_0x286ccf]!==''?JSON['parse'](_0x2fe29e[_0x286ccf]):[],_0x4e6fa4=_0x4d97d7['map'](_0x5c31e2=>String(_0x5c31e2));break;case'STRUCT':_0x5c6bfc=_0x2fe29e[_0x286ccf]!==''?JSON[_0x42d912(0x201)](_0x2fe29e[_0x286ccf]):{},_0xa3d442[_0x449700]={},VisuMZ[_0x42d912(0x7c8)](_0xa3d442[_0x449700],_0x5c6bfc);continue;case _0x42d912(0x422):_0x4d97d7=_0x2fe29e[_0x286ccf]!==''?JSON[_0x42d912(0x201)](_0x2fe29e[_0x286ccf]):[],_0x4e6fa4=_0x4d97d7[_0x42d912(0x2e1)](_0x9ad63b=>VisuMZ['ConvertParams']({},JSON[_0x42d912(0x201)](_0x9ad63b)));break;default:continue;}_0xa3d442[_0x449700]=_0x4e6fa4;}}}else{const _0xa3031=_0x33e9d0(_0x4b81d2['$1']);_0xa3031<_0x5f1576?(_0x17e42c('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x42d912(0x807)](_0x416679,_0xa3031,_0x3cad3e)),_0x4026e6[_0x42d912(0x245)]()):_0x2abd4c=_0x5044a3[_0x42d912(0x565)](_0xa3031,_0x1ce614);}}return _0xa3d442;},(_0x379a45=>{const _0x24d568=_0x265d62,_0x3784e7=_0x379a45[_0x24d568(0x3e6)];for(const _0x4c4a60 of dependencies){if(_0x24d568(0x57a)==='jIJRf')this[_0x24d568(0x592)]&&(_0x1bbdc5=_0x5a1ee5[_0x24d568(0x379)](_0x424e2b),_0x3ce201['se']&&(_0x558df3['se']['volume']=0x0)),_0x1ef7f5[_0x24d568(0x7f2)][_0x24d568(0x5c2)][_0x24d568(0x58f)](this,_0x1312dd);else{if(!Imported[_0x4c4a60]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x3784e7,_0x4c4a60)),SceneManager['exit']();break;}}}const _0x25e0a4=_0x379a45[_0x24d568(0x578)];if(_0x25e0a4[_0x24d568(0x695)](/\[Version[ ](.*?)\]/i)){const _0x5eec18=Number(RegExp['$1']);_0x5eec18!==VisuMZ[label][_0x24d568(0x544)]&&(alert(_0x24d568(0x282)[_0x24d568(0x807)](_0x3784e7,_0x5eec18)),SceneManager['exit']());}if(_0x25e0a4[_0x24d568(0x695)](/\[Tier[ ](\d+)\]/i)){if(_0x24d568(0x73f)===_0x24d568(0x73f)){const _0xaaf6aa=Number(RegExp['$1']);if(_0xaaf6aa<tier)alert(_0x24d568(0x6c6)[_0x24d568(0x807)](_0x3784e7,_0xaaf6aa,tier)),SceneManager[_0x24d568(0x245)]();else{if(_0x24d568(0x794)===_0x24d568(0x35c)){const _0x191efb=_0x4b9acd[_0x24d568(0x18c)](_0x2c1068)+0x1;let _0x54bcf5=_0x400add+_0x24d568(0x62f),_0x3b512a=_0x24153c[_0x24d568(0x7f2)]['ExtractStrFromList'](_0x2e1e59[_0x24d568(0x50d)]);_0x3b512a['length']>0x0&&(_0x4a7668[_0x24d568(0x33a)]>0x0?_0x222e7e+=_0x4e34fb+_0x24d568(0x1a4):_0x24d2bc+=_0x51333d+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x24d568(0x807)](_0x539751,_0x4cd181['name']||'Unnamed')+_0x6e32c2,_0x3bd32e+=_0x54bcf5[_0x24d568(0x807)](_0x191efb,_0x3b512a));}else tier=Math[_0x24d568(0x565)](_0xaaf6aa,tier);}}else this[_0x24d568(0x64d)]();}VisuMZ[_0x24d568(0x7c8)](VisuMZ[label][_0x24d568(0x68a)],_0x379a45[_0x24d568(0x6b4)]);})(pluginData),PluginManager[_0x265d62(0x77a)](pluginData['name'],_0x265d62(0x2e6),_0x507bf5=>{const _0x3d2c18=_0x265d62;if(!SceneManager['_scene'])return;if(!SceneManager[_0x3d2c18(0x1cd)]['_spriteset'])return;VisuMZ[_0x3d2c18(0x7c8)](_0x507bf5,_0x507bf5);const _0x19e4da=Math['round'](_0x507bf5[_0x3d2c18(0x176)]),_0x37b355=Math[_0x3d2c18(0x1bd)](_0x507bf5[_0x3d2c18(0x328)]);$gameTemp[_0x3d2c18(0x805)](_0x19e4da,_0x37b355,_0x507bf5[_0x3d2c18(0x44f)],_0x507bf5['Mirror'],_0x507bf5[_0x3d2c18(0x82a)]);}),PluginManager['registerCommand'](pluginData['name'],_0x265d62(0x831),_0x362401=>{const _0x95cd9d=_0x265d62;if(!$gameTemp[_0x95cd9d(0x510)]())return;if(!Utils[_0x95cd9d(0x583)]())return;SceneManager[_0x95cd9d(0x1cd)]['_active']=![],VisuMZ[_0x95cd9d(0x7f2)][_0x95cd9d(0x593)]();}),PluginManager[_0x265d62(0x77a)](pluginData['name'],_0x265d62(0x495),_0x1e479b=>{const _0x292ad2=_0x265d62;if(!$gameTemp[_0x292ad2(0x510)]())return;if(!Utils[_0x292ad2(0x583)]())return;SceneManager['_scene']['_active']=![],VisuMZ[_0x292ad2(0x7f2)][_0x292ad2(0x567)]();}),PluginManager[_0x265d62(0x77a)](pluginData[_0x265d62(0x3e6)],'ExportCurMapText',_0x45fb50=>{const _0x2a54e6=_0x265d62;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x2a54e6(0x583)]())return;if(!$gameMap)return;if($gameMap[_0x2a54e6(0x715)]()<=0x0)return;VisuMZ[_0x2a54e6(0x7c8)](_0x45fb50,_0x45fb50);const _0x3b6c45=_0x2a54e6(0x4c9)[_0x2a54e6(0x807)]($gameMap['mapId']()[_0x2a54e6(0x30c)](0x3)),_0x45ecae=VisuMZ[_0x2a54e6(0x7f2)][_0x2a54e6(0x344)]($gameMap[_0x2a54e6(0x715)]());VisuMZ[_0x2a54e6(0x7f2)][_0x2a54e6(0x8b5)](_0x45ecae,_0x3b6c45,!![]);}),PluginManager[_0x265d62(0x77a)](pluginData['name'],_0x265d62(0x749),_0x14559f=>{const _0x52fca5=_0x265d62;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x52fca5(0x583)]())return;if(!$gameParty[_0x52fca5(0x27e)]())return;VisuMZ[_0x52fca5(0x7c8)](_0x14559f,_0x14559f);const _0x3025a8=_0x52fca5(0x318)[_0x52fca5(0x807)]($gameTroop[_0x52fca5(0x84c)][_0x52fca5(0x30c)](0x4)),_0x433567=VisuMZ[_0x52fca5(0x7f2)][_0x52fca5(0x801)]($gameTroop[_0x52fca5(0x84c)]);VisuMZ[_0x52fca5(0x7f2)][_0x52fca5(0x8b5)](_0x433567,_0x3025a8,!![]);}),VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x8b5)]=function(_0xdf5b15,_0x4178cd,_0x4988f8){const _0x4d15b9=_0x265d62,_0x17b369=require('fs');let _0x133d79=_0x4d15b9(0x6c0)[_0x4d15b9(0x807)](_0x4178cd||'0');_0x17b369['writeFile'](_0x133d79,_0xdf5b15,_0x4ef3fe=>{const _0x221861=_0x4d15b9;if(_0x4ef3fe)throw err;else _0x4988f8&&alert(_0x221861(0x535)[_0x221861(0x807)](_0x133d79));});},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x593)]=function(){const _0x5d3b58=_0x265d62,_0x4e8958=[];for(const _0x3fd4c3 of $dataMapInfos){if('bJFzn'===_0x5d3b58(0x4a3)){if(!_0x3fd4c3)continue;_0x4e8958[_0x5d3b58(0x7d0)](_0x3fd4c3['id']);}else _0x239de5[_0x5d3b58(0x7f2)][_0x5d3b58(0x2e5)]['call'](this,_0x23056b,_0x223193,_0x556032,_0x594242,_0x5d51a0),this[_0x5d3b58(0x3ec)]();}const _0x436b8c=_0x4e8958[_0x5d3b58(0x33a)]*0x64+Math[_0x5d3b58(0x4ac)](0x64);alert(_0x5d3b58(0x516)[_0x5d3b58(0x807)](_0x436b8c)),this[_0x5d3b58(0x4d2)]=[],this[_0x5d3b58(0x595)]=$dataMap;for(const _0x1ccd6e of _0x4e8958){VisuMZ['CoreEngine'][_0x5d3b58(0x51b)](_0x1ccd6e);}setTimeout(VisuMZ[_0x5d3b58(0x7f2)][_0x5d3b58(0x89e)][_0x5d3b58(0x858)](this),_0x436b8c);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x51b)]=function(_0x39abbe){const _0x25485e=_0x265d62,_0x2ad301=_0x25485e(0x2da)[_0x25485e(0x807)](_0x39abbe['padZero'](0x3)),_0x2df43e=new XMLHttpRequest(),_0x2f6476=_0x25485e(0x15e)+_0x2ad301;_0x2df43e[_0x25485e(0x310)](_0x25485e(0x4b9),_0x2f6476),_0x2df43e[_0x25485e(0x476)](_0x25485e(0x2a2)),_0x2df43e[_0x25485e(0x55d)]=()=>this[_0x25485e(0x134)](_0x2df43e,_0x39abbe,_0x2ad301,_0x2f6476),_0x2df43e['onerror']=()=>DataManager[_0x25485e(0x5cf)](_0x25485e(0x387),_0x2ad301,_0x2f6476),_0x2df43e[_0x25485e(0x3fe)]();},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x134)]=function(_0x13ea93,_0x4e2345,_0x5237f1,_0x473fee){const _0xfa0dd1=_0x265d62;$dataMap=JSON[_0xfa0dd1(0x201)](_0x13ea93[_0xfa0dd1(0x78d)]),DataManager[_0xfa0dd1(0x3e3)]($dataMap),this[_0xfa0dd1(0x4d2)][_0x4e2345]=VisuMZ[_0xfa0dd1(0x7f2)][_0xfa0dd1(0x344)](_0x4e2345),$dataMap=this[_0xfa0dd1(0x595)];},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x89e)]=function(){const _0x1d08b2=_0x265d62,_0xe933f8=_0x1d08b2(0x793);this['_storedMapText'][_0x1d08b2(0x4f3)](undefined)[_0x1d08b2(0x4f3)]('')[_0x1d08b2(0x4f3)](null);const _0x1c76cf=this[_0x1d08b2(0x4d2)][_0x1d08b2(0x4fd)](_0x1d08b2(0x1a4))['trim']();VisuMZ[_0x1d08b2(0x7f2)][_0x1d08b2(0x8b5)](_0x1c76cf,_0xe933f8,!![]),SceneManager[_0x1d08b2(0x1cd)]['_active']=!![];},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x344)]=function(_0x4e1529){const _0x488a33=_0x265d62;if(!$dataMap)return'';let _0x51f68e='█'[_0x488a33(0x3ba)](0x46)+'\x0a\x0a',_0x49d1c2='═'[_0x488a33(0x3ba)](0x46)+'\x0a\x0a',_0x47ea98='';this['_commonEventLayers']=0x0;for(const _0x599f55 of $dataMap[_0x488a33(0x4c5)]){if(!_0x599f55)continue;let _0x41feb3=_0x599f55['id'],_0x499860=_0x599f55['name'],_0x4fa1c9=_0x599f55[_0x488a33(0x70d)];for(const _0x453319 of _0x4fa1c9){const _0x38c0f0=_0x4fa1c9['indexOf'](_0x453319)+0x1;let _0x218590=_0x49d1c2+'《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a',_0x2af127=VisuMZ[_0x488a33(0x7f2)][_0x488a33(0x814)](_0x453319['list']);if(_0x2af127[_0x488a33(0x33a)]>0x0){if(_0x47ea98['length']>0x0)_0x47ea98+=_0x49d1c2+_0x488a33(0x1a4);else{const _0x3f0696=$dataMapInfos[_0x4e1529][_0x488a33(0x3e6)];_0x47ea98+=_0x51f68e+_0x488a33(0x71e)['format'](_0x4e1529,_0x3f0696||_0x488a33(0x83e))+_0x51f68e;}_0x47ea98+=_0x218590[_0x488a33(0x807)](_0x41feb3,_0x499860,_0x38c0f0,_0x2af127);}}}return _0x47ea98['length']>0x0&&(_0x47ea98+=_0x49d1c2),_0x47ea98;},VisuMZ[_0x265d62(0x7f2)]['ExportStrFromAllTroops']=function(){const _0x2e2912=_0x265d62,_0x4426df=$dataTroops[_0x2e2912(0x33a)]*0xa+Math[_0x2e2912(0x4ac)](0xa);alert(_0x2e2912(0x5f7)[_0x2e2912(0x807)](_0x4426df));const _0x330477=[];for(const _0x2b997d of $dataTroops){if('MbNHE'!=='bHaQO'){if(!_0x2b997d)continue;const _0xb4c65f=_0x2b997d['id'];_0x330477[_0xb4c65f]=VisuMZ['CoreEngine'][_0x2e2912(0x801)](_0xb4c65f);}else return _0x2e2912(0x38a);}setTimeout(VisuMZ[_0x2e2912(0x7f2)][_0x2e2912(0x2c0)][_0x2e2912(0x858)](this,_0x330477),_0x4426df);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x801)]=function(_0x26ee25){const _0x1b253d=_0x265d62;if(!$dataTroops[_0x26ee25])return'';let _0xc74330='█'[_0x1b253d(0x3ba)](0x46)+'\x0a\x0a',_0x4ce8b8='═'[_0x1b253d(0x3ba)](0x46)+'\x0a\x0a',_0x3a01e0='';this[_0x1b253d(0x893)]=0x0;const _0x221d66=$dataTroops[_0x26ee25];let _0x2badd7=_0x221d66[_0x1b253d(0x70d)];for(const _0xc080cf of _0x2badd7){const _0x308084=_0x2badd7['indexOf'](_0xc080cf)+0x1;let _0x3bb7c5=_0x4ce8b8+'《《《\x20Page\x20%1\x20》》》\x0a%2\x0a',_0x5c83f9=VisuMZ[_0x1b253d(0x7f2)][_0x1b253d(0x814)](_0xc080cf['list']);if(_0x5c83f9[_0x1b253d(0x33a)]>0x0){if(_0x1b253d(0x48d)!==_0x1b253d(0x8d6)){if(_0x3a01e0[_0x1b253d(0x33a)]>0x0){if(_0x1b253d(0x48e)!==_0x1b253d(0x4a6))_0x3a01e0+=_0x4ce8b8+'\x0a\x0a\x0a\x0a\x0a';else return this[_0x1b253d(0x5bb)]();}else _0x3a01e0+=_0xc74330+_0x1b253d(0x85e)[_0x1b253d(0x807)](_0x26ee25,_0x221d66[_0x1b253d(0x3e6)]||'Unnamed')+_0xc74330;_0x3a01e0+=_0x3bb7c5[_0x1b253d(0x807)](_0x308084,_0x5c83f9);}else return this['item']()[_0x1b253d(0x72f)]*0.01;}}return _0x3a01e0[_0x1b253d(0x33a)]>0x0&&(_0x3a01e0+=_0x4ce8b8),_0x3a01e0;},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x2c0)]=function(_0x119e6f){const _0x376749=_0x265d62,_0x1a2d2d='AllTroops';_0x119e6f[_0x376749(0x4f3)](undefined)['remove']('')[_0x376749(0x4f3)](null);const _0x207765=_0x119e6f[_0x376749(0x4fd)](_0x376749(0x1a4))['trim']();VisuMZ['CoreEngine'][_0x376749(0x8b5)](_0x207765,_0x1a2d2d,!![]),SceneManager['_scene']['_active']=!![];},VisuMZ[_0x265d62(0x7f2)]['ExtractStrFromList']=function(_0x3bbfb4){const _0x3c26ac=_0x265d62;let _0x1ce736='\x0a'+'─'['repeat'](0x46)+'\x0a',_0x5117d6='\x0a'+'┄'[_0x3c26ac(0x3ba)](0x46)+'\x0a',_0x42cc21='';for(const _0x5d623f of _0x3bbfb4){if(!_0x5d623f)continue;if(_0x5d623f[_0x3c26ac(0x5f2)]===0x65)_0x42cc21+=_0x1ce736+'\x0a',_0x42cc21+=_0x3c26ac(0x838),_0x5d623f[_0x3c26ac(0x6b4)][0x4]!==''&&_0x5d623f[_0x3c26ac(0x6b4)][0x4]!==undefined&&(_0x42cc21+='【%1】\x0a'[_0x3c26ac(0x807)](_0x5d623f[_0x3c26ac(0x6b4)][0x4]));else{if(_0x5d623f[_0x3c26ac(0x5f2)]===0x191)_0x42cc21+='%1\x0a'[_0x3c26ac(0x807)](_0x5d623f['parameters'][0x0]);else{if(_0x5d623f[_0x3c26ac(0x5f2)]===0x192)_0x42cc21+=_0x1ce736,_0x42cc21+='%1〘Choice\x20%2〙\x20%3%1'[_0x3c26ac(0x807)](_0x5117d6,_0x5d623f[_0x3c26ac(0x6b4)][0x0]+0x1,_0x5d623f['parameters'][0x1]);else{if(_0x5d623f[_0x3c26ac(0x5f2)]===0x193)_0x3c26ac(0x1af)!==_0x3c26ac(0x1af)?(_0x305c76=_0xb54b29[_0x3c26ac(0x1bd)](_0x528e9d),_0x10d034=_0x1076db[_0x3c26ac(0x1bd)](_0x162de3),_0x27e995=_0x28362d[_0x3c26ac(0x1bd)](_0x1b6e53),_0x37ee29=_0x2aabee[_0x3c26ac(0x1bd)](_0x38fab7),_0x41d7b7[_0x3c26ac(0x7f2)]['Bitmap_drawText']['call'](this,_0x55d1aa,_0x31fdb2,_0x5eb75b,_0x419490,_0x138e8d,_0x18b122),this[_0x3c26ac(0x3ec)]()):(_0x42cc21+=_0x1ce736,_0x42cc21+=_0x3c26ac(0x299)['format'](_0x5117d6));else{if(_0x5d623f['code']===0x194)_0x42cc21+=_0x1ce736,_0x42cc21+=_0x3c26ac(0x276)['format'](_0x5117d6);else{if(_0x5d623f[_0x3c26ac(0x5f2)]===0x69)_0x42cc21+=_0x1ce736+'\x0a',_0x42cc21+=_0x3c26ac(0x795);else{if(_0x5d623f[_0x3c26ac(0x5f2)]===0x6c)_0x42cc21+=_0x1ce736+'\x0a',_0x42cc21+=_0x3c26ac(0x36b)['format'](_0x5d623f[_0x3c26ac(0x6b4)][0x0]);else{if(_0x5d623f['code']===0x198)_0x42cc21+=_0x3c26ac(0x37a)[_0x3c26ac(0x807)](_0x5d623f[_0x3c26ac(0x6b4)][0x0]);else{if(_0x5d623f[_0x3c26ac(0x5f2)]===0x75){if(_0x3c26ac(0x2e9)!==_0x3c26ac(0x2e9))_0x3062a3['isPlaytest']()&&(_0x19cf6b['log']('Script\x20Call\x20Error'),_0x15bda7[_0x3c26ac(0x77f)](_0x45c8dd));else{const _0x4382e5=$dataCommonEvents[_0x5d623f['parameters'][0x0]];if(_0x4382e5&&this[_0x3c26ac(0x893)]<=0xa){this['_commonEventLayers']++;let _0x318ea3=VisuMZ[_0x3c26ac(0x7f2)][_0x3c26ac(0x814)](_0x4382e5['list']);_0x318ea3[_0x3c26ac(0x33a)]>0x0&&(_0x42cc21+=_0x1ce736,_0x42cc21+=_0x5117d6,_0x42cc21+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0x3c26ac(0x807)](_0x4382e5['id'],_0x4382e5['name']),_0x42cc21+=_0x5117d6,_0x42cc21+=_0x318ea3,_0x42cc21+=_0x5117d6,_0x42cc21+=_0x3c26ac(0x52e)[_0x3c26ac(0x807)](_0x4382e5['id'],_0x4382e5[_0x3c26ac(0x3e6)]),_0x42cc21+=_0x5117d6),this[_0x3c26ac(0x893)]--;}}}}}}}}}}}}return _0x42cc21[_0x3c26ac(0x33a)]>0x0&&(_0x42cc21+=_0x1ce736),_0x42cc21;},PluginManager[_0x265d62(0x77a)](pluginData['name'],_0x265d62(0x454),_0xd135e=>{const _0x1c261e=_0x265d62;VisuMZ[_0x1c261e(0x7c8)](_0xd135e,_0xd135e);const _0x210bd9=_0xd135e[_0x1c261e(0x2d2)];VisuMZ[_0x1c261e(0x37b)](_0x210bd9);}),PluginManager[_0x265d62(0x77a)](pluginData[_0x265d62(0x3e6)],_0x265d62(0x1fb),_0x38d3d1=>{const _0x258a21=_0x265d62;VisuMZ['ConvertParams'](_0x38d3d1,_0x38d3d1);const _0x5740c0=_0x38d3d1[_0x258a21(0x678)]||0x0;$gameParty[_0x258a21(0x38f)](_0x5740c0);}),PluginManager[_0x265d62(0x77a)](pluginData['name'],_0x265d62(0x4e3),_0x3cc94a=>{const _0x3ec0a9=_0x265d62;if(!$gameTemp[_0x3ec0a9(0x510)]())return;if(!Utils[_0x3ec0a9(0x583)]())return;VisuMZ[_0x3ec0a9(0x7c8)](_0x3cc94a,_0x3cc94a);const _0x124d7f=_0x3cc94a[_0x3ec0a9(0x532)]||0x1;$gameTemp[_0x3ec0a9(0x2ae)]=_0x124d7f;}),PluginManager[_0x265d62(0x77a)](pluginData[_0x265d62(0x3e6)],'PictureEasingType',_0x37c3ac=>{const _0x3cced1=_0x265d62;VisuMZ[_0x3cced1(0x7c8)](_0x37c3ac,_0x37c3ac);const _0x16fd55=_0x37c3ac['pictureId']||0x1,_0x378358=_0x37c3ac['easingType']||_0x3cced1(0x24b),_0x331a15=$gameScreen[_0x3cced1(0x1f1)](_0x16fd55);_0x331a15&&(_0x3cced1(0x21c)!==_0x3cced1(0x8b4)?_0x331a15[_0x3cced1(0x54a)](_0x378358):this[_0x3cced1(0x66f)]());}),PluginManager['registerCommand'](pluginData['name'],_0x265d62(0x620),_0x4ba27a=>{const _0x3ea008=_0x265d62;for(let _0x177506=0x1;_0x177506<=0x64;_0x177506++){$gameScreen[_0x3ea008(0x49a)](_0x177506);}}),PluginManager[_0x265d62(0x77a)](pluginData['name'],_0x265d62(0x736),_0x261220=>{const _0x57fd2f=_0x265d62;VisuMZ[_0x57fd2f(0x7c8)](_0x261220,_0x261220);const _0x2b497a=Math[_0x57fd2f(0x16b)](_0x261220[_0x57fd2f(0x8b2)],_0x261220['EndingID']),_0x307e7b=Math[_0x57fd2f(0x565)](_0x261220[_0x57fd2f(0x8b2)],_0x261220['EndingID']);for(let _0x3452b9=_0x2b497a;_0x3452b9<=_0x307e7b;_0x3452b9++){$gameScreen[_0x57fd2f(0x49a)](_0x3452b9);}}),PluginManager[_0x265d62(0x77a)](pluginData[_0x265d62(0x3e6)],'PictureShowIcon',_0x33f3bb=>{const _0x35d7c5=_0x265d62;VisuMZ[_0x35d7c5(0x7c8)](_0x33f3bb,_0x33f3bb);const _0x510f21=Math[_0x35d7c5(0x1bd)](_0x33f3bb['PictureID'])[_0x35d7c5(0x394)](0x1,0x64),_0x72ec4=_0x33f3bb[_0x35d7c5(0x68a)],_0x283699=_0x72ec4[_0x35d7c5(0x6c1)][_0x35d7c5(0x394)](0x0,0x1),_0x4d3faf=Math[_0x35d7c5(0x1bd)](_0x72ec4[_0x35d7c5(0x403)]||0x0),_0x4638eb=Math['round'](_0x72ec4['PositionY']||0x0),_0x1a9522=Math['round'](_0x72ec4[_0x35d7c5(0x720)]||0x0),_0x41cfe6=Math[_0x35d7c5(0x1bd)](_0x72ec4[_0x35d7c5(0x3f7)]||0x0),_0x25434e=Math[_0x35d7c5(0x1bd)](_0x72ec4[_0x35d7c5(0x576)])[_0x35d7c5(0x394)](0x0,0xff),_0x509588=_0x72ec4[_0x35d7c5(0x7ae)],_0x2d6e4d=_0x35d7c5(0x886),_0x9ea836=_0x33f3bb[_0x35d7c5(0x151)]?_0x35d7c5(0x151):_0x35d7c5(0x80a),_0xbb694e=_0x2d6e4d[_0x35d7c5(0x807)](_0x33f3bb['IconIndex'],_0x9ea836);$gameScreen['showPicture'](_0x510f21,_0xbb694e,_0x283699,_0x4d3faf,_0x4638eb,_0x1a9522,_0x41cfe6,_0x25434e,_0x509588);}),PluginManager[_0x265d62(0x77a)](pluginData[_0x265d62(0x3e6)],_0x265d62(0x562),_0x3ab6f1=>{const _0x5e58e8=_0x265d62;VisuMZ['ConvertParams'](_0x3ab6f1,_0x3ab6f1);const _0x114f1b=_0x3ab6f1[_0x5e58e8(0x5ad)]||_0x5e58e8(0x238),_0x53364d=_0x3ab6f1[_0x5e58e8(0x7dd)][_0x5e58e8(0x394)](0x1,0x9),_0x64ce9d=_0x3ab6f1[_0x5e58e8(0x7fa)][_0x5e58e8(0x394)](0x1,0x9),_0x91f27f=_0x3ab6f1[_0x5e58e8(0x661)]||0x1,_0x4b4a8a=_0x3ab6f1[_0x5e58e8(0x5e3)];$gameScreen['setCoreEngineScreenShakeStyle'](_0x114f1b),$gameScreen[_0x5e58e8(0x87c)](_0x53364d,_0x64ce9d,_0x91f27f);if(_0x4b4a8a){const _0x4a012c=$gameTemp[_0x5e58e8(0x483)]();if(_0x4a012c)_0x4a012c[_0x5e58e8(0x34e)](_0x91f27f);}}),PluginManager[_0x265d62(0x77a)](pluginData['name'],'SystemSetFontSize',_0x301595=>{const _0x17552f=_0x265d62;VisuMZ[_0x17552f(0x7c8)](_0x301595,_0x301595);const _0x5b0b4f=_0x301595[_0x17552f(0x51f)]||0x1;$gameSystem[_0x17552f(0x738)](_0x5b0b4f);}),PluginManager[_0x265d62(0x77a)](pluginData[_0x265d62(0x3e6)],_0x265d62(0x2d1),_0x322674=>{const _0xb616c1=_0x265d62;if($gameParty[_0xb616c1(0x27e)]())return;VisuMZ[_0xb616c1(0x7c8)](_0x322674,_0x322674);const _0x5d8ebb=_0x322674[_0xb616c1(0x51f)];if(_0x5d8ebb['match'](/Front/i))$gameSystem['setSideView'](![]);else{if(_0x5d8ebb[_0xb616c1(0x695)](/Side/i)){if(_0xb616c1(0x113)==='iCCSK')$gameSystem[_0xb616c1(0x16c)](!![]);else{if(_0x5f5157[_0xb616c1(0x510)]())_0x380a85[_0xb616c1(0x77f)](_0x30bd77);}}else _0xb616c1(0x435)!==_0xb616c1(0x438)?$gameSystem['setSideView'](!$gameSystem['isSideView']()):_0x3877e7['CoreEngine'][_0xb616c1(0x72e)]['call'](this,_0x3b2bec);}}),PluginManager[_0x265d62(0x77a)](pluginData[_0x265d62(0x3e6)],'SystemLoadAudio',_0x237111=>{const _0x1f476c=_0x265d62;if($gameParty[_0x1f476c(0x27e)]())return;VisuMZ[_0x1f476c(0x7c8)](_0x237111,_0x237111);const _0x500769=[_0x1f476c(0x5be),_0x1f476c(0x185),'me','se'];for(const _0x56bba5 of _0x500769){if(_0x1f476c(0x7b0)===_0x1f476c(0x779)){_0x58714b+=_0x3ad193;if(_0x2cbd5c>=_0x5ae275)_0x3b3314=_0x116319-0x1;this[_0x1f476c(0x4bb)](_0x56c84f);}else{const _0x57805b=_0x237111[_0x56bba5],_0x38761e='%1/'[_0x1f476c(0x807)](_0x56bba5);for(const _0x59883d of _0x57805b){AudioManager[_0x1f476c(0x604)](_0x38761e,_0x59883d);}}}}),PluginManager['registerCommand'](pluginData[_0x265d62(0x3e6)],_0x265d62(0x882),_0x2f7ed6=>{const _0x5dcd69=_0x265d62;if($gameParty['inBattle']())return;VisuMZ[_0x5dcd69(0x7c8)](_0x2f7ed6,_0x2f7ed6);const _0x3b8ec1=[_0x5dcd69(0x43e),_0x5dcd69(0x709),'battlebacks2',_0x5dcd69(0x481),_0x5dcd69(0x5f0),_0x5dcd69(0x406),_0x5dcd69(0x777),_0x5dcd69(0x22b),'sv_actors',_0x5dcd69(0x7a7),'system',_0x5dcd69(0x32a),_0x5dcd69(0x27f),'titles2'];for(const _0x341c1f of _0x3b8ec1){if(_0x5dcd69(0x41f)===_0x5dcd69(0x41f)){const _0x52348c=_0x2f7ed6[_0x341c1f],_0x2f0bf3='img/%1/'[_0x5dcd69(0x807)](_0x341c1f);for(const _0x505ac8 of _0x52348c){if(_0x5dcd69(0x747)===_0x5dcd69(0x88d)){if(_0x24c550[_0x5dcd69(0x7f2)][_0x5dcd69(0x68a)][_0x5dcd69(0x6b6)][_0x5dcd69(0x7c3)])this[_0x5dcd69(0x5e7)]();else return _0x1437b1[_0x5dcd69(0x7f2)][_0x5dcd69(0x68f)][_0x5dcd69(0x58f)](this);}else ImageManager['loadBitmap'](_0x2f0bf3,_0x505ac8);}}else _0x50846c+=_0x5dcd69(0x300);}}),PluginManager[_0x265d62(0x77a)](pluginData['name'],_0x265d62(0x7c2),_0x31f5be=>{const _0x4a0120=_0x265d62;if($gameParty[_0x4a0120(0x27e)]())return;VisuMZ[_0x4a0120(0x7c8)](_0x31f5be,_0x31f5be);const _0x48d266=_0x31f5be[_0x4a0120(0x556)],_0x10079e=(_0x31f5be[_0x4a0120(0x72d)]||0x0)/0x64;for(const _0x5988b3 of _0x48d266){const _0x155cee=Math['random']()<=_0x10079e;$gameSwitches[_0x4a0120(0x4b7)](_0x5988b3,_0x155cee);}}),PluginManager['registerCommand'](pluginData['name'],_0x265d62(0x3ae),_0x2b3a42=>{const _0x604a23=_0x265d62;if($gameParty[_0x604a23(0x27e)]())return;VisuMZ[_0x604a23(0x7c8)](_0x2b3a42,_0x2b3a42);const _0x266357=Math[_0x604a23(0x16b)](_0x2b3a42[_0x604a23(0x8b2)],_0x2b3a42[_0x604a23(0x256)]),_0x4f33c0=Math[_0x604a23(0x565)](_0x2b3a42[_0x604a23(0x8b2)],_0x2b3a42[_0x604a23(0x256)]),_0x162ef0=(_0x2b3a42['Chance']||0x0)/0x64;for(let _0xe12596=_0x266357;_0xe12596<=_0x4f33c0;_0xe12596++){if(_0x604a23(0x5d8)===_0x604a23(0x804))return typeof _0x4b793a==='number'?_0x4ff3c2[_0x604a23(0x7f2)][_0x604a23(0x812)]['call'](this,_0xd323f5):this[_0x604a23(0x5ca)](_0x21477a);else{const _0x5d22ca=Math[_0x604a23(0x238)]()<=_0x162ef0;$gameSwitches['setValue'](_0xe12596,_0x5d22ca);}}}),PluginManager['registerCommand'](pluginData[_0x265d62(0x3e6)],'SwitchToggleOne',_0x366578=>{const _0x45ba56=_0x265d62;if($gameParty[_0x45ba56(0x27e)]())return;VisuMZ[_0x45ba56(0x7c8)](_0x366578,_0x366578);const _0x598c95=_0x366578[_0x45ba56(0x556)];for(const _0x924b8e of _0x598c95){const _0xfc5d46=$gameSwitches['value'](_0x924b8e);$gameSwitches[_0x45ba56(0x4b7)](_0x924b8e,!_0xfc5d46);}}),PluginManager['registerCommand'](pluginData[_0x265d62(0x3e6)],_0x265d62(0x7f3),_0xa4e0c6=>{const _0x57d31e=_0x265d62;if($gameParty[_0x57d31e(0x27e)]())return;VisuMZ['ConvertParams'](_0xa4e0c6,_0xa4e0c6);const _0x3f1509=Math[_0x57d31e(0x16b)](_0xa4e0c6[_0x57d31e(0x8b2)],_0xa4e0c6[_0x57d31e(0x256)]),_0x4737fb=Math['max'](_0xa4e0c6['StartID'],_0xa4e0c6[_0x57d31e(0x256)]);for(let _0x31e951=_0x3f1509;_0x31e951<=_0x4737fb;_0x31e951++){const _0x23f32b=$gameSwitches['value'](_0x31e951);$gameSwitches['setValue'](_0x31e951,!_0x23f32b);}}),PluginManager[_0x265d62(0x77a)](pluginData[_0x265d62(0x3e6)],_0x265d62(0x36a),_0xe99fcf=>{const _0x4d72e8=_0x265d62;if($gameParty['inBattle']())return;VisuMZ[_0x4d72e8(0x7c8)](_0xe99fcf,_0xe99fcf);const _0x3b4ac3=_0xe99fcf[_0x4d72e8(0x51f)]['toUpperCase']()[_0x4d72e8(0x1b2)](),_0x2adb10=VisuMZ[_0x4d72e8(0x7f2)][_0x4d72e8(0x6dc)](_0x3b4ac3);$gameSystem['setBattleSystem'](_0x2adb10);}),VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x6dc)]=function(_0x3b2d42){const _0x423082=_0x265d62;_0x3b2d42=_0x3b2d42||_0x423082(0x566),_0x3b2d42=String(_0x3b2d42)[_0x423082(0x8d5)]()[_0x423082(0x1b2)]();switch(_0x3b2d42){case _0x423082(0x33d):return 0x0;case _0x423082(0x542):if(Imported[_0x423082(0x856)]){if(_0x423082(0x840)!==_0x423082(0x840)){const _0x5c870e=_0xcfa910['y']+(this[_0x423082(0x12e)]()-_0xe64571['iconHeight'])/0x2;this[_0x423082(0x2c3)](_0x5bd4bf,_0x391c32['x'],_0x5c870e);const _0x4edd4f=_0x527201['iconWidth']+0x4;_0x137d65['x']+=_0x4edd4f,_0x431b80['width']-=_0x4edd4f;}else ConfigManager['atbActive']=!![];}return 0x1;case _0x423082(0x2ab):Imported[_0x423082(0x856)]&&(_0x423082(0x55f)!==_0x423082(0x55f)?this[_0x423082(0x2b6)](_0x577fad,_0x2275ab,_0x19d8e6,_0x355384,_0x423082(0x672)):ConfigManager[_0x423082(0x46d)]=![]);return 0x2;case _0x423082(0x156):if(Imported[_0x423082(0x311)])return _0x423082(0x156);break;case _0x423082(0x38a):if(Imported[_0x423082(0x87b)]){if('QWqeB'!==_0x423082(0x3dd)){var _0x1ff6f9=_0x56e514(_0x390c2e['$1']);try{_0x3f8f43+=_0x212f59(_0x1ff6f9);}catch(_0x263eee){if(_0x2b065b['isPlaytest']())_0x2e04ff[_0x423082(0x77f)](_0x263eee);}}else return'STB';}break;case'BTB':if(Imported[_0x423082(0x115)]){if('eWUEv'===_0x423082(0x2f6))_0x2d5f37['_x']=_0x4d4b69['_x'],_0x220661['_y']=_0x14df41['_y'];else return _0x423082(0x508);}break;case _0x423082(0x5bc):if(Imported['VisuMZ_2_BattleSystemFTB']){if(_0x423082(0x890)===_0x423082(0x65e))this[_0x423082(0x455)][_0x423082(0x153)](_0x4daa91['layoutSettings'][_0x423082(0x4c7)]);else return _0x423082(0x5bc);}break;case _0x423082(0x221):if(Imported[_0x423082(0x7b1)])return _0x423082(0x221);break;case _0x423082(0x2e0):if(Imported[_0x423082(0x2d3)])return _0x423082(0x2e0);break;case'PTB':if(Imported[_0x423082(0x38e)]){if(_0x423082(0x499)!=='TBmDC')return'PTB';else _0x2e473e[_0x423082(0x7f2)]['Game_Picture_move']['call'](this,_0x491aa5,_0x32bb72,_0x11ddeb,_0x2984fa,_0x55570a,_0x3f9403,_0x2cf9b5,_0x58298e,_0x451784),this[_0x423082(0x3dc)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x44ce06]||{'x':0x0,'y':0x0});}break;}return $dataSystem[_0x423082(0x86f)];},PluginManager[_0x265d62(0x77a)](pluginData[_0x265d62(0x3e6)],'SystemSetWindowPadding',_0x3d31d2=>{const _0x2081c6=_0x265d62;VisuMZ[_0x2081c6(0x7c8)](_0x3d31d2,_0x3d31d2);const _0x945673=_0x3d31d2[_0x2081c6(0x51f)]||0x1;$gameSystem[_0x2081c6(0x8c4)](_0x945673);}),VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x84d)]=Scene_Boot[_0x265d62(0x7ee)]['onDatabaseLoaded'],Scene_Boot[_0x265d62(0x7ee)][_0x265d62(0x825)]=function(){const _0x9f79e1=_0x265d62;VisuMZ['CoreEngine'][_0x9f79e1(0x84d)][_0x9f79e1(0x58f)](this),this['process_VisuMZ_CoreEngine_RegExp'](),this['process_VisuMZ_CoreEngine_Notetags'](),this[_0x9f79e1(0x847)](),this[_0x9f79e1(0x7eb)](),this[_0x9f79e1(0x1d0)](),VisuMZ[_0x9f79e1(0x6f3)]();},VisuMZ['CoreEngine']['RegExp']={},Scene_Boot[_0x265d62(0x7ee)]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x5a0826=_0x265d62,_0x139c9f=['MAXHP','MAXMP','ATK',_0x5a0826(0x139),_0x5a0826(0x440),_0x5a0826(0x86a),_0x5a0826(0x1f5),_0x5a0826(0x615)],_0x359091=[_0x5a0826(0x124),_0x5a0826(0x29e),_0x5a0826(0x408),_0x5a0826(0x1e6),_0x5a0826(0x745),_0x5a0826(0x1f7),_0x5a0826(0x19a),_0x5a0826(0x3e5),_0x5a0826(0x23e),'TRG'],_0x3a56da=[_0x5a0826(0x247),_0x5a0826(0x48c),'REC',_0x5a0826(0x726),'MCR',_0x5a0826(0x6ad),'PDR',_0x5a0826(0x24c),_0x5a0826(0x385),_0x5a0826(0x1fd)],_0x5deb8e=[_0x139c9f,_0x359091,_0x3a56da],_0x320028=[_0x5a0826(0x2c1),_0x5a0826(0x458),'Plus2',_0x5a0826(0x5e6),'Rate',_0x5a0826(0x412),_0x5a0826(0x73a),_0x5a0826(0x8a5),_0x5a0826(0x23f),'Flat2'];for(const _0x1f144d of _0x5deb8e){let _0x5a6cae='';if(_0x1f144d===_0x139c9f)_0x5a6cae=_0x5a0826(0x884);if(_0x1f144d===_0x359091)_0x5a6cae=_0x5a0826(0x159);if(_0x1f144d===_0x3a56da)_0x5a6cae=_0x5a0826(0x762);for(const _0x49b8ee of _0x320028){let _0xafd010=_0x5a0826(0x290)['format'](_0x5a6cae,_0x49b8ee);VisuMZ['CoreEngine'][_0x5a0826(0x1f0)][_0xafd010]=[],VisuMZ[_0x5a0826(0x7f2)][_0x5a0826(0x1f0)][_0xafd010+'JS']=[];let _0x248688=_0x5a0826(0x539);if([_0x5a0826(0x2c1),'Flat'][_0x5a0826(0x734)](_0x49b8ee))_0x248688+=_0x5a0826(0x300);else{if([_0x5a0826(0x458),_0x5a0826(0x23f)][_0x5a0826(0x734)](_0x49b8ee))_0x5a0826(0x8ae)!=='xPdnI'?_0x248688+=_0x5a0826(0x3fa):this[_0x5a0826(0x755)]['y']=_0x52a776[_0x5a0826(0x8d2)]-this[_0x5a0826(0x396)]();else{if([_0x5a0826(0x361),'Flat2'][_0x5a0826(0x734)](_0x49b8ee))_0x248688+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x49b8ee===_0x5a0826(0x5e6)){if(_0x5a0826(0x3d4)!=='Ajlfm'){var _0x318988=_0x37a6e9(_0x1c6f71['$1']);try{_0xdd4d1c=_0x43774d['max'](_0x5a5af0,_0x1f69ad(_0x32e8ce(_0x318988)));}catch(_0x4438bf){if(_0x4397a7[_0x5a0826(0x510)]())_0x54cba3['log'](_0x4438bf);}}else _0x248688+=_0x5a0826(0x3f2);}else{if(_0x49b8ee===_0x5a0826(0x412))_0x248688+='(\x5cd+)([%％])>';else _0x49b8ee===_0x5a0826(0x73a)&&(_0x5a0826(0x416)==='XwfMS'?this['removeFauxAnimation'](_0x2194a9):_0x248688+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x3ad45b of _0x1f144d){let _0x447e12=_0x49b8ee[_0x5a0826(0x4b3)](/[\d+]/g,'')[_0x5a0826(0x8d5)]();const _0x176e4c=_0x248688['format'](_0x3ad45b,_0x447e12);VisuMZ[_0x5a0826(0x7f2)][_0x5a0826(0x1f0)][_0xafd010][_0x5a0826(0x7d0)](new RegExp(_0x176e4c,'i'));const _0x19174c='<JS\x20%1\x20%2:[\x20](.*)>'[_0x5a0826(0x807)](_0x3ad45b,_0x447e12);VisuMZ[_0x5a0826(0x7f2)]['RegExp'][_0xafd010+'JS'][_0x5a0826(0x7d0)](new RegExp(_0x19174c,'i'));}}}},Scene_Boot['prototype'][_0x265d62(0x757)]=function(){const _0x7091ab=_0x265d62;if(VisuMZ[_0x7091ab(0x6f3)])return;},Scene_Boot[_0x265d62(0x7ee)][_0x265d62(0x847)]=function(){const _0x314aa1=_0x265d62;VisuMZ[_0x314aa1(0x7f2)][_0x314aa1(0x68a)]['QoL'][_0x314aa1(0x33e)]&&VisuMZ['ShowDevTools'](!![]);VisuMZ[_0x314aa1(0x7f2)][_0x314aa1(0x68a)][_0x314aa1(0x6b6)][_0x314aa1(0x4af)]&&(Input[_0x314aa1(0x2c2)][0x23]='end',Input['keyMapper'][0x24]=_0x314aa1(0x11f));if(VisuMZ[_0x314aa1(0x7f2)]['Settings'][_0x314aa1(0x617)]){if(_0x314aa1(0x3a7)!==_0x314aa1(0x3a7))_0x578fab['VisuMZ_2_BattleSystemFTB']&&(this[_0x314aa1(0x6d1)]='FTB');else{const _0x5d58fd=VisuMZ[_0x314aa1(0x7f2)][_0x314aa1(0x68a)][_0x314aa1(0x617)];_0x5d58fd[_0x314aa1(0x15f)]=_0x5d58fd[_0x314aa1(0x15f)]||_0x314aa1(0x79c),_0x5d58fd[_0x314aa1(0x8b7)]=_0x5d58fd[_0x314aa1(0x8b7)]||_0x314aa1(0x294);}}VisuMZ['CoreEngine'][_0x314aa1(0x68a)][_0x314aa1(0x474)][_0x314aa1(0x797)]&&(_0x314aa1(0x7de)==='nVQYQ'?this[_0x314aa1(0x12c)](_0x125485):(Input[_0x314aa1(0x2c2)][0x57]='up',Input[_0x314aa1(0x2c2)][0x41]=_0x314aa1(0x8c7),Input[_0x314aa1(0x2c2)][0x53]=_0x314aa1(0x42b),Input[_0x314aa1(0x2c2)][0x44]=_0x314aa1(0x672),Input[_0x314aa1(0x2c2)][0x45]=_0x314aa1(0x6c3))),VisuMZ[_0x314aa1(0x7f2)][_0x314aa1(0x68a)][_0x314aa1(0x474)][_0x314aa1(0x577)]&&(Input['keyMapper'][0x52]=_0x314aa1(0x854));},Scene_Boot[_0x265d62(0x7ee)][_0x265d62(0x7eb)]=function(){const _0x1c0c99=_0x265d62;this[_0x1c0c99(0x179)]();},Scene_Boot['prototype'][_0x265d62(0x179)]=function(){const _0x5a9ed5=_0x265d62,_0x214277=VisuMZ[_0x5a9ed5(0x7f2)][_0x5a9ed5(0x68a)][_0x5a9ed5(0x479)];for(const _0x3dc3e0 of _0x214277){const _0x3ae51a=_0x3dc3e0[_0x5a9ed5(0x55e)]['replace'](/[ ]/g,''),_0x46e6b2=_0x3dc3e0['CodeJS'];VisuMZ[_0x5a9ed5(0x7f2)][_0x5a9ed5(0x19b)](_0x3ae51a,_0x46e6b2);}},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x19b)]=function(_0x4b8cd7,_0x3f54dd){const _0x26b95a=_0x265d62;if(!!window[_0x4b8cd7]){if(_0x26b95a(0x4b2)!=='fySOZ'){if($gameTemp[_0x26b95a(0x510)]())console[_0x26b95a(0x77f)](_0x26b95a(0x2c9)[_0x26b95a(0x807)](_0x4b8cd7));}else return _0x1c1680['CoreEngine'][_0x26b95a(0x68a)][_0x26b95a(0x1d1)][_0x26b95a(0x6c5)];}const _0x421ea9=_0x26b95a(0x708)[_0x26b95a(0x807)](_0x4b8cd7,_0x3f54dd);window[_0x4b8cd7]=new Function(_0x421ea9);},Scene_Boot[_0x265d62(0x7ee)][_0x265d62(0x1d0)]=function(){const _0x1eed22=_0x265d62,_0x133118=VisuMZ[_0x1eed22(0x7f2)][_0x1eed22(0x68a)][_0x1eed22(0x8b3)];if(!_0x133118)return;for(const _0x1d1bbc of _0x133118){if(!_0x1d1bbc)continue;VisuMZ[_0x1eed22(0x7f2)][_0x1eed22(0x4f2)](_0x1d1bbc);}},VisuMZ[_0x265d62(0x7f2)]['CustomParamNames']={},VisuMZ[_0x265d62(0x7f2)]['CustomParamIcons']={},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x5c9)]={},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x5ab)]={},VisuMZ['CoreEngine']['createCustomParameter']=function(_0x503b25){const _0x946d5d=_0x265d62,_0x3fc02e=_0x503b25[_0x946d5d(0x381)],_0x1a11da=_0x503b25[_0x946d5d(0x8a4)],_0x32b62f=_0x503b25['Icon'],_0x111f2d=_0x503b25[_0x946d5d(0x5ad)],_0x4c68aa=new Function(_0x503b25[_0x946d5d(0x559)]);VisuMZ[_0x946d5d(0x7f2)][_0x946d5d(0x8c5)][_0x3fc02e[_0x946d5d(0x8d5)]()['trim']()]=_0x1a11da,VisuMZ['CoreEngine']['CustomParamIcons'][_0x3fc02e[_0x946d5d(0x8d5)]()[_0x946d5d(0x1b2)]()]=_0x32b62f,VisuMZ[_0x946d5d(0x7f2)][_0x946d5d(0x5c9)][_0x3fc02e['toUpperCase']()[_0x946d5d(0x1b2)]()]=_0x111f2d,VisuMZ['CoreEngine'][_0x946d5d(0x5ab)][_0x3fc02e['toUpperCase']()['trim']()]=_0x3fc02e,Object[_0x946d5d(0x4bd)](Game_BattlerBase[_0x946d5d(0x7ee)],_0x3fc02e,{'get'(){const _0x388ba7=_0x946d5d,_0x264dc2=_0x4c68aa[_0x388ba7(0x58f)](this);return _0x111f2d===_0x388ba7(0x205)?Math[_0x388ba7(0x1bd)](_0x264dc2):_0x264dc2;}});},VisuMZ[_0x265d62(0x6f3)]=function(){const _0x4020f3=_0x265d62;for(const _0x4d5d48 of $dataActors){if('jwYEv'!==_0x4020f3(0x59f)){if(_0x4d5d48)VisuMZ[_0x4020f3(0x157)](_0x4d5d48);}else{const _0x49cb73=_0x2259ea['CoreEngine'][_0x4020f3(0x68a)]['KeyboardInput'];if(!_0x49cb73)return![];const _0x591b39=_0x49cb73[_0x4020f3(0x446)];if(!_0x591b39)return![];const _0x53b44f=this[_0x4020f3(0x1a8)][_0x4020f3(0x3e6)]()[_0x4020f3(0x1c1)]();for(const _0x3b1a08 of _0x591b39){if(_0x53b44f[_0x4020f3(0x734)](_0x3b1a08[_0x4020f3(0x1c1)]()))return!![];}return![];}}for(const _0xe1374a of $dataClasses){if(_0x4020f3(0x1aa)!==_0x4020f3(0x1aa))_0x4e96e9[_0x4020f3(0x6be)]['call'](this,_0x4ab7c2);else{if(_0xe1374a)VisuMZ['ParseClassNotetags'](_0xe1374a);}}for(const _0x27640e of $dataSkills){if(_0x27640e)VisuMZ[_0x4020f3(0x2dc)](_0x27640e);}for(const _0x57101e of $dataItems){if(_0x57101e)VisuMZ[_0x4020f3(0x3b8)](_0x57101e);}for(const _0x4449eb of $dataWeapons){if(_0x4449eb)VisuMZ[_0x4020f3(0x2f5)](_0x4449eb);}for(const _0x5cd618 of $dataArmors){if(_0x4020f3(0x271)===_0x4020f3(0x271)){if(_0x5cd618)VisuMZ[_0x4020f3(0x141)](_0x5cd618);}else{const _0x11a4ab={'x':_0x103c06,'y':_0x4ead99,'animationId':_0x5e4f37,'mirror':_0x3bc0ba,'mute':_0x26b01f};this[_0x4020f3(0x275)]['push'](_0x11a4ab);}}for(const _0x39f90b of $dataEnemies){if(_0x39f90b)VisuMZ['ParseEnemyNotetags'](_0x39f90b);}for(const _0x2c9d7a of $dataStates){if(_0x2c9d7a)VisuMZ[_0x4020f3(0x799)](_0x2c9d7a);}for(const _0x44f13f of $dataTilesets){if(_0x44f13f)VisuMZ[_0x4020f3(0x1b4)](_0x44f13f);}},VisuMZ[_0x265d62(0x157)]=function(_0x33060f){},VisuMZ[_0x265d62(0x1f6)]=function(_0x4aaf10){},VisuMZ[_0x265d62(0x2dc)]=function(_0x442d61){},VisuMZ[_0x265d62(0x3b8)]=function(_0x3b4635){},VisuMZ[_0x265d62(0x2f5)]=function(_0x1da3b0){},VisuMZ['ParseArmorNotetags']=function(_0x5e3bce){},VisuMZ[_0x265d62(0x2b3)]=function(_0x25cebc){},VisuMZ[_0x265d62(0x799)]=function(_0x1992bf){},VisuMZ[_0x265d62(0x1b4)]=function(_0x4d36f5){},VisuMZ['CoreEngine'][_0x265d62(0x157)]=VisuMZ[_0x265d62(0x157)],VisuMZ[_0x265d62(0x157)]=function(_0x3725a1){const _0x8b9b7=_0x265d62;VisuMZ['CoreEngine'][_0x8b9b7(0x157)][_0x8b9b7(0x58f)](this,_0x3725a1);const _0x2b1267=_0x3725a1[_0x8b9b7(0x45a)];if(_0x2b1267[_0x8b9b7(0x695)](/<MAX LEVEL:[ ](\d+)>/i)){_0x3725a1[_0x8b9b7(0x36d)]=Number(RegExp['$1']);if(_0x3725a1[_0x8b9b7(0x36d)]===0x0)_0x3725a1['maxLevel']=Number[_0x8b9b7(0x605)];}_0x2b1267[_0x8b9b7(0x695)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x3725a1['initialLevel']=Math[_0x8b9b7(0x16b)](Number(RegExp['$1']),_0x3725a1['maxLevel']));},VisuMZ['CoreEngine'][_0x265d62(0x1f6)]=VisuMZ[_0x265d62(0x1f6)],VisuMZ[_0x265d62(0x1f6)]=function(_0x36d0de){const _0x4f7e65=_0x265d62;VisuMZ['CoreEngine'][_0x4f7e65(0x1f6)][_0x4f7e65(0x58f)](this,_0x36d0de);if(_0x36d0de[_0x4f7e65(0x7ff)])for(const _0x23269b of _0x36d0de[_0x4f7e65(0x7ff)]){if(_0x23269b[_0x4f7e65(0x45a)][_0x4f7e65(0x695)](/<LEARN AT LEVEL:[ ](\d+)>/i)){if(_0x4f7e65(0x8c3)===_0x4f7e65(0x48a))return _0xcbcfb0[_0x4f7e65(0x891)][_0x4f7e65(0x428)][_0x4f7e65(0x58f)](this);else _0x23269b[_0x4f7e65(0x213)]=Math[_0x4f7e65(0x565)](Number(RegExp['$1']),0x1);}}},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x2b3)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x265d62(0x2b3)]=function(_0x26f015){const _0x5c15b6=_0x265d62;VisuMZ[_0x5c15b6(0x7f2)][_0x5c15b6(0x2b3)]['call'](this,_0x26f015),_0x26f015[_0x5c15b6(0x213)]=0x1;const _0x1add77=_0x26f015['note'];if(_0x1add77[_0x5c15b6(0x695)](/<LEVEL:[ ](\d+)>/i))_0x26f015[_0x5c15b6(0x213)]=Number(RegExp['$1']);if(_0x1add77[_0x5c15b6(0x695)](/<MAXHP:[ ](\d+)>/i))_0x26f015['params'][0x0]=Number(RegExp['$1']);if(_0x1add77[_0x5c15b6(0x695)](/<MAXMP:[ ](\d+)>/i))_0x26f015['params'][0x1]=Number(RegExp['$1']);if(_0x1add77['match'](/<ATK:[ ](\d+)>/i))_0x26f015['params'][0x2]=Number(RegExp['$1']);if(_0x1add77['match'](/<DEF:[ ](\d+)>/i))_0x26f015[_0x5c15b6(0x20c)][0x3]=Number(RegExp['$1']);if(_0x1add77[_0x5c15b6(0x695)](/<MAT:[ ](\d+)>/i))_0x26f015[_0x5c15b6(0x20c)][0x4]=Number(RegExp['$1']);if(_0x1add77['match'](/<MDF:[ ](\d+)>/i))_0x26f015['params'][0x5]=Number(RegExp['$1']);if(_0x1add77[_0x5c15b6(0x695)](/<AGI:[ ](\d+)>/i))_0x26f015[_0x5c15b6(0x20c)][0x6]=Number(RegExp['$1']);if(_0x1add77[_0x5c15b6(0x695)](/<LUK:[ ](\d+)>/i))_0x26f015[_0x5c15b6(0x20c)][0x7]=Number(RegExp['$1']);if(_0x1add77[_0x5c15b6(0x695)](/<EXP:[ ](\d+)>/i))_0x26f015[_0x5c15b6(0x7b5)]=Number(RegExp['$1']);if(_0x1add77[_0x5c15b6(0x695)](/<GOLD:[ ](\d+)>/i))_0x26f015[_0x5c15b6(0x628)]=Number(RegExp['$1']);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x608)]=Graphics[_0x265d62(0x54b)],Graphics[_0x265d62(0x54b)]=function(){const _0xae267e=_0x265d62;switch(VisuMZ['CoreEngine'][_0xae267e(0x68a)][_0xae267e(0x6b6)][_0xae267e(0x24e)]){case _0xae267e(0x43f):return!![];case _0xae267e(0x20d):return![];default:return VisuMZ[_0xae267e(0x7f2)][_0xae267e(0x608)]['call'](this);}},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x13d)]=Graphics[_0x265d62(0x492)],Graphics[_0x265d62(0x492)]=function(_0x9be2db,_0x134fbf,_0x58a888=null){const _0x37a3d8=_0x265d62;VisuMZ[_0x37a3d8(0x7f2)][_0x37a3d8(0x13d)][_0x37a3d8(0x58f)](this,_0x9be2db,_0x134fbf,_0x58a888),VisuMZ[_0x37a3d8(0x81e)](![]);},VisuMZ['CoreEngine'][_0x265d62(0x848)]=Graphics['_centerElement'],Graphics['_centerElement']=function(_0x4caca1){const _0x2da560=_0x265d62;VisuMZ['CoreEngine'][_0x2da560(0x848)][_0x2da560(0x58f)](this,_0x4caca1),this[_0x2da560(0x121)](_0x4caca1);},Graphics['_centerElementCoreEngine']=function(_0x4ee305){const _0x314fbb=_0x265d62;VisuMZ[_0x314fbb(0x7f2)][_0x314fbb(0x68a)][_0x314fbb(0x6b6)][_0x314fbb(0x67d)]&&(_0x314fbb(0x713)!==_0x314fbb(0x14f)?_0x4ee305[_0x314fbb(0x5c8)][_0x314fbb(0x645)]=_0x314fbb(0x7d4):_0x5e9e27=0x0);VisuMZ[_0x314fbb(0x7f2)][_0x314fbb(0x68a)][_0x314fbb(0x6b6)][_0x314fbb(0x1bf)]&&(_0x4ee305['style'][_0x314fbb(0x17e)]=_0x314fbb(0x268));const _0x1f6864=Math[_0x314fbb(0x565)](0x0,Math['floor'](_0x4ee305[_0x314fbb(0x3f1)]*this[_0x314fbb(0x47a)])),_0x31e661=Math[_0x314fbb(0x565)](0x0,Math[_0x314fbb(0x8a0)](_0x4ee305[_0x314fbb(0x4ec)]*this[_0x314fbb(0x47a)]));_0x4ee305['style'][_0x314fbb(0x3f1)]=_0x1f6864+'px',_0x4ee305[_0x314fbb(0x5c8)][_0x314fbb(0x4ec)]=_0x31e661+'px';},Bitmap['prototype']['markCoreEngineModified']=function(){const _0x3f19b6=_0x265d62;this[_0x3f19b6(0x351)]=!![];},VisuMZ[_0x265d62(0x7f2)]['Sprite_destroy']=Sprite[_0x265d62(0x7ee)][_0x265d62(0x7d6)],Sprite[_0x265d62(0x7ee)][_0x265d62(0x7d6)]=function(){const _0x465db6=_0x265d62;VisuMZ[_0x465db6(0x7f2)]['Sprite_destroy']['call'](this),this[_0x465db6(0x81d)]();},Sprite['prototype'][_0x265d62(0x81d)]=function(){const _0x2ac7de=_0x265d62;if(!this['bitmap'])return;if(!this[_0x2ac7de(0x6cc)][_0x2ac7de(0x351)])return;this['bitmap'][_0x2ac7de(0x2cb)]&&!this[_0x2ac7de(0x17a)][_0x2ac7de(0x2cb)][_0x2ac7de(0x81c)]&&(_0x2ac7de(0x69c)===_0x2ac7de(0x61d)?this[_0x2ac7de(0x342)]['setBackgroundType'](_0x22673c[_0x2ac7de(0x891)][_0x2ac7de(0x262)]):this[_0x2ac7de(0x6cc)][_0x2ac7de(0x7d6)]());},VisuMZ['CoreEngine']['Bitmap_resize']=Bitmap[_0x265d62(0x7ee)]['resize'],Bitmap[_0x265d62(0x7ee)]['resize']=function(_0x4a88c,_0x4ffae7){const _0x1b0b88=_0x265d62;VisuMZ[_0x1b0b88(0x7f2)][_0x1b0b88(0x23b)]['call'](this,_0x4a88c,_0x4ffae7),this['markCoreEngineModified']();},VisuMZ[_0x265d62(0x7f2)]['Bitmap_blt']=Bitmap[_0x265d62(0x7ee)][_0x265d62(0x345)],Bitmap[_0x265d62(0x7ee)]['blt']=function(_0x3f3aaf,_0x475b17,_0x2c16c5,_0xb307f1,_0x58b896,_0x1d0300,_0x20a52d,_0x655023,_0x593f3c){const _0x42a9c6=_0x265d62;VisuMZ[_0x42a9c6(0x7f2)][_0x42a9c6(0x69b)][_0x42a9c6(0x58f)](this,_0x3f3aaf,_0x475b17,_0x2c16c5,_0xb307f1,_0x58b896,_0x1d0300,_0x20a52d,_0x655023,_0x593f3c),this[_0x42a9c6(0x3ec)]();},VisuMZ['CoreEngine'][_0x265d62(0x189)]=Bitmap[_0x265d62(0x7ee)]['clearRect'],Bitmap[_0x265d62(0x7ee)][_0x265d62(0x2d6)]=function(_0x144eef,_0x30e8b7,_0x245570,_0x51890f){const _0x4c422d=_0x265d62;VisuMZ[_0x4c422d(0x7f2)][_0x4c422d(0x189)][_0x4c422d(0x58f)](this,_0x144eef,_0x30e8b7,_0x245570,_0x51890f),this[_0x4c422d(0x3ec)]();},VisuMZ[_0x265d62(0x7f2)]['Bitmap_fillRect']=Bitmap['prototype'][_0x265d62(0x6f2)],Bitmap[_0x265d62(0x7ee)][_0x265d62(0x6f2)]=function(_0x5e6a20,_0x467395,_0xde20c2,_0x9cb5f4,_0x59912b){const _0x326508=_0x265d62;VisuMZ[_0x326508(0x7f2)][_0x326508(0x662)][_0x326508(0x58f)](this,_0x5e6a20,_0x467395,_0xde20c2,_0x9cb5f4,_0x59912b),this['markCoreEngineModified']();},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x2e5)]=Bitmap[_0x265d62(0x7ee)][_0x265d62(0x788)],Bitmap[_0x265d62(0x7ee)][_0x265d62(0x788)]=function(_0xff8cc6,_0x29ba09,_0x258c07,_0x186922,_0x49e5f3){const _0x191db1=_0x265d62;VisuMZ['CoreEngine'][_0x191db1(0x2e5)][_0x191db1(0x58f)](this,_0xff8cc6,_0x29ba09,_0x258c07,_0x186922,_0x49e5f3),this['markCoreEngineModified']();},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x7db)]=Bitmap[_0x265d62(0x7ee)][_0x265d62(0x7fe)],Bitmap[_0x265d62(0x7ee)][_0x265d62(0x7fe)]=function(_0x4aeb11,_0x2f172f,_0x18c604,_0xc0875c,_0x40f13c,_0x3a4bdd,_0x39ccc5){const _0x37599b=_0x265d62;VisuMZ['CoreEngine'][_0x37599b(0x7db)][_0x37599b(0x58f)](this,_0x4aeb11,_0x2f172f,_0x18c604,_0xc0875c,_0x40f13c,_0x3a4bdd,_0x39ccc5),this[_0x37599b(0x3ec)]();},VisuMZ[_0x265d62(0x7f2)]['Bitmap_drawCircle']=Bitmap[_0x265d62(0x7ee)]['drawCircle'],Bitmap['prototype']['drawCircle']=function(_0x42e197,_0x233ed7,_0x7f608f,_0x1a2666){const _0x297184=_0x265d62;_0x42e197=Math[_0x297184(0x1bd)](_0x42e197),_0x233ed7=Math[_0x297184(0x1bd)](_0x233ed7),_0x7f608f=Math[_0x297184(0x1bd)](_0x7f608f),VisuMZ[_0x297184(0x7f2)][_0x297184(0x2c6)][_0x297184(0x58f)](this,_0x42e197,_0x233ed7,_0x7f608f,_0x1a2666),this[_0x297184(0x3ec)]();},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x49f)]=Bitmap['prototype']['measureTextWidth'],Bitmap[_0x265d62(0x7ee)][_0x265d62(0x859)]=function(_0x50260b){const _0x16e6d9=_0x265d62;return Math[_0x16e6d9(0x1bd)](VisuMZ[_0x16e6d9(0x7f2)]['Bitmap_measureTextWidth'][_0x16e6d9(0x58f)](this,_0x50260b));},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x211)]=Bitmap[_0x265d62(0x7ee)][_0x265d62(0x2b6)],Bitmap[_0x265d62(0x7ee)][_0x265d62(0x2b6)]=function(_0xfd68de,_0x253732,_0x1d42e2,_0x23344a,_0x148a7b,_0x3f2bf6){const _0x44af4b=_0x265d62;_0x253732=Math[_0x44af4b(0x1bd)](_0x253732),_0x1d42e2=Math['round'](_0x1d42e2),_0x23344a=Math[_0x44af4b(0x1bd)](_0x23344a),_0x148a7b=Math[_0x44af4b(0x1bd)](_0x148a7b),VisuMZ[_0x44af4b(0x7f2)]['Bitmap_drawText'][_0x44af4b(0x58f)](this,_0xfd68de,_0x253732,_0x1d42e2,_0x23344a,_0x148a7b,_0x3f2bf6),this[_0x44af4b(0x3ec)]();},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x7cf)]=Bitmap[_0x265d62(0x7ee)][_0x265d62(0x29b)],Bitmap[_0x265d62(0x7ee)]['_drawTextOutline']=function(_0x166069,_0x3e2eb7,_0x559837,_0x271f82){const _0xb1fb00=_0x265d62;VisuMZ['CoreEngine'][_0xb1fb00(0x68a)][_0xb1fb00(0x6b6)][_0xb1fb00(0x766)]?this[_0xb1fb00(0x61f)](_0x166069,_0x3e2eb7,_0x559837,_0x271f82):'CyBJL'!=='CyBJL'?_0x5b3dcf(_0xb1fb00(0x535)['format'](_0x5ec599)):VisuMZ[_0xb1fb00(0x7f2)]['Bitmap_drawTextOutline'][_0xb1fb00(0x58f)](this,_0x166069,_0x3e2eb7,_0x559837,_0x271f82);},Bitmap['prototype'][_0x265d62(0x61f)]=function(_0x1500df,_0x574dc0,_0x39e28c,_0x51f285){const _0x5b72e4=_0x265d62,_0x364913=this['context'];_0x364913[_0x5b72e4(0x732)]=this[_0x5b72e4(0x116)],_0x364913[_0x5b72e4(0x206)](_0x1500df,_0x574dc0+0x2,_0x39e28c+0x2,_0x51f285);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x65a)]=Input[_0x265d62(0x490)],Input[_0x265d62(0x490)]=function(){const _0x2b983c=_0x265d62;VisuMZ['CoreEngine'][_0x2b983c(0x65a)][_0x2b983c(0x58f)](this),this['_inputString']=undefined,this['_inputSpecialKeyCode']=undefined,this[_0x2b983c(0x320)]=Input[_0x2b983c(0x230)];},VisuMZ['CoreEngine'][_0x265d62(0x5b9)]=Input[_0x265d62(0x6f4)],Input[_0x265d62(0x6f4)]=function(){const _0x1460a1=_0x265d62;VisuMZ[_0x1460a1(0x7f2)][_0x1460a1(0x5b9)][_0x1460a1(0x58f)](this);if(this[_0x1460a1(0x320)])this['_gamepadWait']--;},VisuMZ[_0x265d62(0x7f2)]['Input_pollGamepads']=Input[_0x265d62(0x534)],Input['_pollGamepads']=function(){const _0x1c83d1=_0x265d62;if(this[_0x1c83d1(0x320)])return;VisuMZ[_0x1c83d1(0x7f2)]['Input_pollGamepads'][_0x1c83d1(0x58f)](this);},VisuMZ['CoreEngine'][_0x265d62(0x759)]=Input[_0x265d62(0x85f)],Input[_0x265d62(0x85f)]=function(){const _0x120257=_0x265d62;VisuMZ[_0x120257(0x7f2)][_0x120257(0x759)][_0x120257(0x58f)](this),document[_0x120257(0x666)](_0x120257(0x64a),this[_0x120257(0x132)]['bind'](this));},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x737)]=Input[_0x265d62(0x3ac)],Input[_0x265d62(0x3ac)]=function(_0x389898){const _0x24c2bd=_0x265d62;this['_inputSpecialKeyCode']=_0x389898[_0x24c2bd(0x65d)],VisuMZ['CoreEngine'][_0x24c2bd(0x737)][_0x24c2bd(0x58f)](this,_0x389898);},Input[_0x265d62(0x132)]=function(_0x42fe08){const _0x4f6d04=_0x265d62;this[_0x4f6d04(0x174)](_0x42fe08);},Input[_0x265d62(0x174)]=function(_0x417259){const _0x4674c1=_0x265d62;this[_0x4674c1(0x813)]=_0x417259[_0x4674c1(0x65d)];let _0xaf375f=String[_0x4674c1(0x183)](_0x417259[_0x4674c1(0x2a5)]);if(this[_0x4674c1(0x6eb)]===undefined){if(_0x4674c1(0x7e8)==='RYcGW')return _0x29a1a2[_0x4674c1(0x7f2)][_0x4674c1(0x68a)][_0x4674c1(0x590)][_0x4674c1(0x551)];else this[_0x4674c1(0x6eb)]=_0xaf375f;}else this[_0x4674c1(0x6eb)]+=_0xaf375f;},VisuMZ[_0x265d62(0x7f2)]['Input_shouldPreventDefault']=Input[_0x265d62(0x7b2)],Input[_0x265d62(0x7b2)]=function(_0x1d1ac7){const _0x17c0ae=_0x265d62;if(_0x1d1ac7===0x8)return![];return VisuMZ[_0x17c0ae(0x7f2)][_0x17c0ae(0x7b8)][_0x17c0ae(0x58f)](this,_0x1d1ac7);},Input[_0x265d62(0x39d)]=function(_0x3e04da){const _0x52b46c=_0x265d62;if(_0x3e04da['match'](/backspace/i))return this[_0x52b46c(0x813)]===0x8;if(_0x3e04da[_0x52b46c(0x695)](/enter/i))return this[_0x52b46c(0x813)]===0xd;if(_0x3e04da['match'](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x265d62(0x11b)]=function(){const _0x5015c7=_0x265d62;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x5015c7(0x813)]);},Input[_0x265d62(0x443)]=function(){return[0x25,0x26,0x27,0x28]['contains'](this['_inputSpecialKeyCode']);},Input['isGamepadConnected']=function(){const _0x1bd3fe=_0x265d62;if(navigator[_0x1bd3fe(0x7f8)]){if(_0x1bd3fe(0x7ce)!==_0x1bd3fe(0x7ce)){if(!this[_0x1bd3fe(0x6cc)])return;if(!this[_0x1bd3fe(0x6cc)][_0x1bd3fe(0x351)])return;this[_0x1bd3fe(0x6cc)]['_baseTexture']&&!this['_bitmap'][_0x1bd3fe(0x2cb)]['destroyed']&&this[_0x1bd3fe(0x6cc)][_0x1bd3fe(0x7d6)]();}else{const _0x12cff0=navigator[_0x1bd3fe(0x7f8)]();if(_0x12cff0)for(const _0x505b9d of _0x12cff0){if('yRfMP'!==_0x1bd3fe(0x69d))_0x3df5c0[_0x1bd3fe(0x16c)](![]);else{if(_0x505b9d&&_0x505b9d[_0x1bd3fe(0x5a5)]){if('YqpfH'!==_0x1bd3fe(0x270))return!![];else try{_0x741682[_0x1bd3fe(0x7f2)][_0x1bd3fe(0x404)][_0x1bd3fe(0x58f)](this,_0x4b6613);}catch(_0x11959b){if(_0x19be2b['isPlaytest']())_0x4333bc[_0x1bd3fe(0x77f)](_0x11959b);}}}}}}return![];},Input[_0x265d62(0x8af)]=function(){const _0x58a829=_0x265d62;if(navigator['getGamepads']){if(_0x58a829(0x80b)!==_0x58a829(0x80b)){if(this[_0x58a829(0x721)]===_0x260849)this[_0x58a829(0x3db)]();return this[_0x58a829(0x721)];}else{const _0x15e104=navigator[_0x58a829(0x7f8)]();if(_0x15e104)for(const _0x4483e0 of _0x15e104){if(_0x4483e0&&_0x4483e0[_0x58a829(0x5a5)]){if(_0x58a829(0x6a8)!==_0x58a829(0x203)){if(this['isGamepadButtonPressed'](_0x4483e0))return!![];}else _0x217314[_0x58a829(0x7b1)]&&(this[_0x58a829(0x6d1)]=_0x58a829(0x221));}}}}return![];},Input[_0x265d62(0x4a5)]=function(_0x5189e8){const _0x48bbb1=_0x265d62,_0x4f07b7=_0x5189e8[_0x48bbb1(0x8b6)];for(let _0x5bc205=0x0;_0x5bc205<_0x4f07b7[_0x48bbb1(0x33a)];_0x5bc205++){if(_0x4f07b7[_0x5bc205][_0x48bbb1(0x609)])return!![];}return![];},VisuMZ['CoreEngine'][_0x265d62(0x564)]=Tilemap[_0x265d62(0x7ee)][_0x265d62(0x8b9)],Tilemap[_0x265d62(0x7ee)][_0x265d62(0x8b9)]=function(_0x5bc19d,_0x123458,_0xc1c039,_0x3a9bde){const _0x1f8fff=_0x265d62;if($gameMap&&$gameMap[_0x1f8fff(0x768)]())return;VisuMZ[_0x1f8fff(0x7f2)][_0x1f8fff(0x564)][_0x1f8fff(0x58f)](this,_0x5bc19d,_0x123458,_0xc1c039,_0x3a9bde);},Tilemap[_0x265d62(0x75e)][_0x265d62(0x7ee)]['_createInternalTextures']=function(){const _0x21ca2c=_0x265d62;this[_0x21ca2c(0x6dd)]();for(let _0x12d808=0x0;_0x12d808<Tilemap[_0x21ca2c(0x7f0)][_0x21ca2c(0x5ec)];_0x12d808++){const _0x1c6279=new PIXI['BaseTexture']();_0x1c6279['setSize'](0x800,0x800),VisuMZ[_0x21ca2c(0x7f2)][_0x21ca2c(0x68a)][_0x21ca2c(0x6b6)][_0x21ca2c(0x1bf)]&&(_0x1c6279[_0x21ca2c(0x4f4)]=PIXI[_0x21ca2c(0x78c)]['NEAREST']),this['_internalTextures']['push'](_0x1c6279);}},WindowLayer[_0x265d62(0x7ee)][_0x265d62(0x73b)]=function(){const _0xf94320=_0x265d62;return SceneManager&&SceneManager[_0xf94320(0x1cd)]?SceneManager[_0xf94320(0x1cd)][_0xf94320(0x1e5)]():!![];},VisuMZ['CoreEngine']['WindowLayer_render']=WindowLayer[_0x265d62(0x7ee)]['render'],WindowLayer[_0x265d62(0x7ee)][_0x265d62(0x5c5)]=function render(_0x499a06){const _0x498949=_0x265d62;this[_0x498949(0x73b)]()?VisuMZ[_0x498949(0x7f2)][_0x498949(0x49c)]['call'](this,_0x499a06):this[_0x498949(0x6f1)](_0x499a06);},WindowLayer['prototype'][_0x265d62(0x6f1)]=function render(_0x560197){const _0x39c7d2=_0x265d62;if(!this['visible'])return;const _0x193d11=new PIXI[(_0x39c7d2(0x711))](),_0x96c580=_0x560197['gl'],_0xf9ecc6=this[_0x39c7d2(0x471)][_0x39c7d2(0x7bc)]();_0x560197[_0x39c7d2(0x3a5)]['forceStencil'](),_0x193d11['transform']=this[_0x39c7d2(0x2b5)],_0x560197[_0x39c7d2(0x212)]['flush'](),_0x96c580[_0x39c7d2(0x634)](_0x96c580['STENCIL_TEST']);while(_0xf9ecc6[_0x39c7d2(0x33a)]>0x0){const _0x401235=_0xf9ecc6[_0x39c7d2(0x154)]();_0x401235['_isWindow']&&_0x401235[_0x39c7d2(0x892)]&&_0x401235[_0x39c7d2(0x4da)]>0x0&&(_0x96c580['stencilFunc'](_0x96c580['EQUAL'],0x0,~0x0),_0x96c580[_0x39c7d2(0x767)](_0x96c580[_0x39c7d2(0x7e4)],_0x96c580[_0x39c7d2(0x7e4)],_0x96c580[_0x39c7d2(0x7e4)]),_0x401235[_0x39c7d2(0x5c5)](_0x560197),_0x560197['batch'][_0x39c7d2(0x207)](),_0x193d11[_0x39c7d2(0x490)](),_0x96c580[_0x39c7d2(0x1eb)](_0x96c580[_0x39c7d2(0x719)],0x1,~0x0),_0x96c580[_0x39c7d2(0x767)](_0x96c580[_0x39c7d2(0x587)],_0x96c580[_0x39c7d2(0x587)],_0x96c580['REPLACE']),_0x96c580[_0x39c7d2(0x724)](_0x96c580['ZERO'],_0x96c580[_0x39c7d2(0x509)]),_0x193d11[_0x39c7d2(0x5c5)](_0x560197),_0x560197[_0x39c7d2(0x212)][_0x39c7d2(0x207)](),_0x96c580[_0x39c7d2(0x724)](_0x96c580['ONE'],_0x96c580[_0x39c7d2(0x228)]));}_0x96c580[_0x39c7d2(0x2ba)](_0x96c580[_0x39c7d2(0x3c6)]),_0x96c580[_0x39c7d2(0x490)](_0x96c580[_0x39c7d2(0x8c1)]),_0x96c580['clearStencil'](0x0),_0x560197['batch'][_0x39c7d2(0x207)]();for(const _0x1f7882 of this[_0x39c7d2(0x471)]){if(_0x39c7d2(0x2a8)!==_0x39c7d2(0x2a8))return _0x42987f;else{if(!_0x1f7882['_isWindow']&&_0x1f7882[_0x39c7d2(0x892)]){if(_0x39c7d2(0x369)!=='JxPEo')return _0x18790c[_0x39c7d2(0x7f2)][_0x39c7d2(0x68f)][_0x39c7d2(0x58f)](this);else _0x1f7882['render'](_0x560197);}}}_0x560197['batch'][_0x39c7d2(0x207)]();},DataManager[_0x265d62(0x427)]=function(_0x452f59){const _0x361046=_0x265d62;return this['isItem'](_0x452f59)&&_0x452f59[_0x361046(0x76d)]===0x2;},VisuMZ[_0x265d62(0x7f2)]['DataManager_setupNewGame']=DataManager[_0x265d62(0x122)],DataManager[_0x265d62(0x122)]=function(){const _0xa5320c=_0x265d62;VisuMZ[_0xa5320c(0x7f2)][_0xa5320c(0x55c)]['call'](this),this[_0xa5320c(0x172)](),this['reserveNewGameCommonEvent']();},DataManager[_0x265d62(0x172)]=function(){const _0x104145=_0x265d62;if($gameTemp['isPlaytest']()){const _0x7702c3=VisuMZ['CoreEngine'][_0x104145(0x68a)][_0x104145(0x6b6)][_0x104145(0x8a6)];if(_0x7702c3>0x0)$gameTemp['reserveCommonEvent'](_0x7702c3);}},DataManager[_0x265d62(0x5a6)]=function(){const _0x144dbd=_0x265d62,_0x333057=VisuMZ[_0x144dbd(0x7f2)][_0x144dbd(0x68a)][_0x144dbd(0x6b6)][_0x144dbd(0x2af)]||0x0;if(_0x333057>0x0)$gameTemp[_0x144dbd(0x45f)](_0x333057);},DataManager[_0x265d62(0x809)]=function(_0x3dbdb3){const _0xb9a67c=_0x265d62,_0x3959d0=$dataTroops[_0x3dbdb3];if(!_0x3959d0)return'';let _0x454d52='';_0x454d52+=_0x3959d0['name'];for(const _0x4c0a48 of _0x3959d0[_0xb9a67c(0x70d)]){if(_0xb9a67c(0x3b4)===_0xb9a67c(0x452))_0x3ee5d9[_0xb9a67c(0x7f2)][_0xb9a67c(0x49c)][_0xb9a67c(0x58f)](this,_0xa7390a);else for(const _0x3b6464 of _0x4c0a48[_0xb9a67c(0x50d)]){_0xb9a67c(0x2ee)!==_0xb9a67c(0x5a2)?[0x6c,0x198]['includes'](_0x3b6464[_0xb9a67c(0x5f2)])&&(_0x454d52+='\x0a',_0x454d52+=_0x3b6464['parameters'][0x0]):(_0x4522a4[_0xb9a67c(0x7f2)][_0xb9a67c(0x13d)][_0xb9a67c(0x58f)](this,_0x59f38c,_0x3c4758,_0x3f08bc),_0x4c365f[_0xb9a67c(0x81e)](![]));}}return _0x454d52;},TextManager['stringKeyMap']=['','','',_0x265d62(0x89a),'','',_0x265d62(0x5ce),'','BACKSPACE',_0x265d62(0x6e7),'','',_0x265d62(0x429),_0x265d62(0x800),_0x265d62(0x284),'',_0x265d62(0x790),_0x265d62(0x6fb),_0x265d62(0x1a5),_0x265d62(0x694),_0x265d62(0x301),'KANA','EISU',_0x265d62(0x5f4),'FINAL',_0x265d62(0x531),'',_0x265d62(0x265),_0x265d62(0x63e),_0x265d62(0x8b1),'ACCEPT','MODECHANGE',_0x265d62(0x1e7),_0x265d62(0x3f8),_0x265d62(0x753),_0x265d62(0x6a3),_0x265d62(0x3e2),_0x265d62(0x72b),'UP',_0x265d62(0x3ca),_0x265d62(0x353),_0x265d62(0x520),_0x265d62(0x888),_0x265d62(0x5a1),'PRINTSCREEN','INSERT','DELETE','','0','1','2','3','4','5','6','7','8','9',_0x265d62(0x26f),_0x265d62(0x621),_0x265d62(0x649),_0x265d62(0x1c6),_0x265d62(0x5da),_0x265d62(0x8cc),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x265d62(0x182),'',_0x265d62(0x69f),'',_0x265d62(0x375),'NUMPAD0',_0x265d62(0x839),_0x265d62(0x472),'NUMPAD3',_0x265d62(0x37f),_0x265d62(0x4f0),'NUMPAD6',_0x265d62(0x5eb),_0x265d62(0x7bd),_0x265d62(0x3c1),_0x265d62(0x5b7),_0x265d62(0x177),_0x265d62(0x7df),'SUBTRACT',_0x265d62(0x5e0),_0x265d62(0x411),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x265d62(0x4ed),_0x265d62(0x199),_0x265d62(0x30a),_0x265d62(0x69a),_0x265d62(0x4a9),_0x265d62(0x6ac),'F16',_0x265d62(0x1f3),_0x265d62(0x502),_0x265d62(0x430),_0x265d62(0x3a2),'F21','F22',_0x265d62(0x8bf),_0x265d62(0x317),'','','','','','','','',_0x265d62(0x4b5),_0x265d62(0x879),'WIN_OEM_FJ_JISHO','WIN_OEM_FJ_MASSHOU',_0x265d62(0x87e),_0x265d62(0x43c),_0x265d62(0x3e1),'','','','','','','','','',_0x265d62(0x4ab),'EXCLAMATION',_0x265d62(0x1c7),_0x265d62(0x393),'DOLLAR',_0x265d62(0x38d),_0x265d62(0x469),_0x265d62(0x2ca),'OPEN_PAREN',_0x265d62(0x266),_0x265d62(0x77d),_0x265d62(0x75c),'PIPE','HYPHEN_MINUS',_0x265d62(0x630),_0x265d62(0x528),_0x265d62(0x3a4),'','','','','VOLUME_MUTE',_0x265d62(0x28d),'VOLUME_UP','','','SEMICOLON',_0x265d62(0x1c6),_0x265d62(0x29d),_0x265d62(0x80c),_0x265d62(0x4c1),_0x265d62(0x13b),_0x265d62(0x751),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x265d62(0x85a),_0x265d62(0x707),_0x265d62(0x1a6),_0x265d62(0x25d),'','META',_0x265d62(0x254),'',_0x265d62(0x350),_0x265d62(0x7af),'',_0x265d62(0x13a),'','',_0x265d62(0x144),_0x265d62(0x739),_0x265d62(0x202),_0x265d62(0x27b),_0x265d62(0x23d),_0x265d62(0x548),'WIN_OEM_CUSEL',_0x265d62(0x3e0),_0x265d62(0x74b),'WIN_OEM_COPY',_0x265d62(0x741),_0x265d62(0x67b),_0x265d62(0x181),_0x265d62(0x349),_0x265d62(0x758),'EXSEL',_0x265d62(0x700),'PLAY','ZOOM','',_0x265d62(0x5bd),_0x265d62(0x880),''],TextManager[_0x265d62(0x50e)]=VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x68a)][_0x265d62(0x617)][_0x265d62(0x397)],TextManager['buttonAssistCancel']=VisuMZ[_0x265d62(0x7f2)]['Settings'][_0x265d62(0x617)][_0x265d62(0x341)],TextManager[_0x265d62(0x22a)]=VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x68a)][_0x265d62(0x617)][_0x265d62(0x3ea)],VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x812)]=TextManager[_0x265d62(0x884)],TextManager[_0x265d62(0x884)]=function(_0x4f2cbf){const _0x58a2f3=_0x265d62;return typeof _0x4f2cbf==='number'?VisuMZ[_0x58a2f3(0x7f2)]['TextManager_param'][_0x58a2f3(0x58f)](this,_0x4f2cbf):this[_0x58a2f3(0x5ca)](_0x4f2cbf);},TextManager[_0x265d62(0x5ca)]=function(_0x89e860){const _0x419435=_0x265d62;_0x89e860=String(_0x89e860||'')[_0x419435(0x8d5)]();const _0x47b474=VisuMZ[_0x419435(0x7f2)][_0x419435(0x68a)][_0x419435(0x346)];if(_0x89e860==='MAXHP')return $dataSystem[_0x419435(0x1a2)][_0x419435(0x20c)][0x0];if(_0x89e860===_0x419435(0x32e))return $dataSystem['terms'][_0x419435(0x20c)][0x1];if(_0x89e860===_0x419435(0x865))return $dataSystem[_0x419435(0x1a2)][_0x419435(0x20c)][0x2];if(_0x89e860===_0x419435(0x139))return $dataSystem[_0x419435(0x1a2)][_0x419435(0x20c)][0x3];if(_0x89e860===_0x419435(0x440))return $dataSystem[_0x419435(0x1a2)][_0x419435(0x20c)][0x4];if(_0x89e860===_0x419435(0x86a))return $dataSystem['terms']['params'][0x5];if(_0x89e860===_0x419435(0x1f5))return $dataSystem[_0x419435(0x1a2)][_0x419435(0x20c)][0x6];if(_0x89e860===_0x419435(0x615))return $dataSystem[_0x419435(0x1a2)][_0x419435(0x20c)][0x7];if(_0x89e860===_0x419435(0x124))return _0x47b474[_0x419435(0x1b3)];if(_0x89e860===_0x419435(0x29e))return _0x47b474[_0x419435(0x3fb)];if(_0x89e860===_0x419435(0x408))return _0x47b474[_0x419435(0x482)];if(_0x89e860===_0x419435(0x1e6))return _0x47b474[_0x419435(0x2ac)];if(_0x89e860===_0x419435(0x745))return _0x47b474[_0x419435(0x463)];if(_0x89e860===_0x419435(0x1f7))return _0x47b474['XParamVocab5'];if(_0x89e860===_0x419435(0x19a))return _0x47b474[_0x419435(0x631)];if(_0x89e860==='HRG')return _0x47b474[_0x419435(0x53d)];if(_0x89e860===_0x419435(0x23e))return _0x47b474['XParamVocab8'];if(_0x89e860==='TRG')return _0x47b474[_0x419435(0x82f)];if(_0x89e860==='TGR')return _0x47b474[_0x419435(0x4f1)];if(_0x89e860===_0x419435(0x48c))return _0x47b474[_0x419435(0x53e)];if(_0x89e860===_0x419435(0x20f))return _0x47b474[_0x419435(0x51c)];if(_0x89e860==='PHA')return _0x47b474['SParamVocab3'];if(_0x89e860==='MCR')return _0x47b474[_0x419435(0x449)];if(_0x89e860===_0x419435(0x6ad))return _0x47b474[_0x419435(0x4ef)];if(_0x89e860===_0x419435(0x6a5))return _0x47b474[_0x419435(0x204)];if(_0x89e860===_0x419435(0x24c))return _0x47b474['SParamVocab7'];if(_0x89e860===_0x419435(0x385))return _0x47b474[_0x419435(0x7a5)];if(_0x89e860===_0x419435(0x1fd))return _0x47b474[_0x419435(0x44a)];if(VisuMZ[_0x419435(0x7f2)][_0x419435(0x8c5)][_0x89e860])return VisuMZ[_0x419435(0x7f2)]['CustomParamNames'][_0x89e860];return'';},TextManager['getInputButtonString']=function(_0x15e65b){const _0x327c41=_0x265d62;if(_0x15e65b==='cancel')_0x15e65b=_0x327c41(0x87a);let _0x486fd1=[];for(let _0x24a92c in Input[_0x327c41(0x2c2)]){_0x24a92c=Number(_0x24a92c);if(_0x24a92c>=0x60&&_0x24a92c<=0x69)continue;if([0x12,0x20][_0x327c41(0x734)](_0x24a92c))continue;_0x15e65b===Input['keyMapper'][_0x24a92c]&&_0x486fd1[_0x327c41(0x7d0)](_0x24a92c);}for(let _0x492484=0x0;_0x492484<_0x486fd1[_0x327c41(0x33a)];_0x492484++){_0x486fd1[_0x492484]=TextManager[_0x327c41(0x160)][_0x486fd1[_0x492484]];}return this[_0x327c41(0x333)](_0x486fd1);},TextManager['makeInputButtonString']=function(_0x4bfa0c){const _0x2361c0=_0x265d62,_0x584e5d=VisuMZ['CoreEngine'][_0x2361c0(0x68a)]['ButtonAssist'],_0x3f867f=_0x584e5d[_0x2361c0(0x513)],_0x3a4a1f=_0x4bfa0c[_0x2361c0(0x580)](),_0x412827=_0x2361c0(0x72a)[_0x2361c0(0x807)](_0x3a4a1f);return _0x584e5d[_0x412827]?_0x584e5d[_0x412827]:_0x3f867f[_0x2361c0(0x807)](_0x3a4a1f);},TextManager[_0x265d62(0x4e5)]=function(_0x4901e9,_0x33c4cb){const _0x16124a=_0x265d62,_0x12dd5d=VisuMZ[_0x16124a(0x7f2)][_0x16124a(0x68a)][_0x16124a(0x617)],_0x4990d7=_0x12dd5d['MultiKeyFmt'],_0x3bc820=this[_0x16124a(0x433)](_0x4901e9),_0xa93e54=this['getInputButtonString'](_0x33c4cb);return _0x4990d7[_0x16124a(0x807)](_0x3bc820,_0xa93e54);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x178)]=ColorManager[_0x265d62(0x267)],ColorManager[_0x265d62(0x267)]=function(){const _0x2683f1=_0x265d62;VisuMZ[_0x2683f1(0x7f2)][_0x2683f1(0x178)]['call'](this),this[_0x2683f1(0x2a1)]=this[_0x2683f1(0x2a1)]||{};},ColorManager[_0x265d62(0x291)]=function(_0x265d80,_0x1ac02a){const _0xa07ae=_0x265d62;return _0x1ac02a=String(_0x1ac02a),this[_0xa07ae(0x2a1)]=this[_0xa07ae(0x2a1)]||{},_0x1ac02a[_0xa07ae(0x695)](/#(.*)/i)?this[_0xa07ae(0x2a1)][_0x265d80]='#%1'[_0xa07ae(0x807)](String(RegExp['$1'])):this['_colorCache'][_0x265d80]=this['textColor'](Number(_0x1ac02a)),this[_0xa07ae(0x2a1)][_0x265d80];},ColorManager[_0x265d62(0x400)]=function(_0x4ce698){const _0x5df9cd=_0x265d62;return _0x4ce698=String(_0x4ce698),_0x4ce698[_0x5df9cd(0x695)](/#(.*)/i)?_0x5df9cd(0x25f)[_0x5df9cd(0x807)](String(RegExp['$1'])):this[_0x5df9cd(0x421)](Number(_0x4ce698));},ColorManager['clearCachedKeys']=function(){const _0x2a92a6=_0x265d62;this[_0x2a92a6(0x2a1)]={};},ColorManager[_0x265d62(0x3cd)]=function(){const _0x1cb6c7=_0x265d62,_0x2358df=_0x1cb6c7(0x3bc);this['_colorCache']=this[_0x1cb6c7(0x2a1)]||{};if(this[_0x1cb6c7(0x2a1)][_0x2358df])return this[_0x1cb6c7(0x2a1)][_0x2358df];const _0xd5b19c=VisuMZ[_0x1cb6c7(0x7f2)]['Settings'][_0x1cb6c7(0x1d1)]['ColorNormal'];return this[_0x1cb6c7(0x291)](_0x2358df,_0xd5b19c);},ColorManager[_0x265d62(0x8a3)]=function(){const _0x489141=_0x265d62,_0x2e9098=_0x489141(0x59a);this[_0x489141(0x2a1)]=this[_0x489141(0x2a1)]||{};if(this['_colorCache'][_0x2e9098])return this[_0x489141(0x2a1)][_0x2e9098];const _0x48bbf9=VisuMZ[_0x489141(0x7f2)][_0x489141(0x68a)]['Color'][_0x489141(0x390)];return this[_0x489141(0x291)](_0x2e9098,_0x48bbf9);},ColorManager[_0x265d62(0x7da)]=function(){const _0x36ba9d=_0x265d62,_0x45dad2=_0x36ba9d(0x8b8);this['_colorCache']=this[_0x36ba9d(0x2a1)]||{};if(this[_0x36ba9d(0x2a1)][_0x45dad2])return this[_0x36ba9d(0x2a1)][_0x45dad2];const _0x372bf7=VisuMZ['CoreEngine'][_0x36ba9d(0x68a)]['Color']['ColorCrisis'];return this['getColorDataFromPluginParameters'](_0x45dad2,_0x372bf7);},ColorManager[_0x265d62(0x4ae)]=function(){const _0x18e8bd=_0x265d62,_0x4389da=_0x18e8bd(0x54d);this['_colorCache']=this[_0x18e8bd(0x2a1)]||{};if(this[_0x18e8bd(0x2a1)][_0x4389da])return this[_0x18e8bd(0x2a1)][_0x4389da];const _0x76ad4d=VisuMZ[_0x18e8bd(0x7f2)][_0x18e8bd(0x68a)][_0x18e8bd(0x1d1)][_0x18e8bd(0x7e2)];return this[_0x18e8bd(0x291)](_0x4389da,_0x76ad4d);},ColorManager[_0x265d62(0x60f)]=function(){const _0x3a2281=_0x265d62,_0x1c8f4b='_stored_gaugeBackColor';this[_0x3a2281(0x2a1)]=this['_colorCache']||{};if(this[_0x3a2281(0x2a1)][_0x1c8f4b])return this['_colorCache'][_0x1c8f4b];const _0x3a5744=VisuMZ[_0x3a2281(0x7f2)][_0x3a2281(0x68a)][_0x3a2281(0x1d1)]['ColorGaugeBack'];return this[_0x3a2281(0x291)](_0x1c8f4b,_0x3a5744);},ColorManager[_0x265d62(0x646)]=function(){const _0x4892a3=_0x265d62,_0x465197=_0x4892a3(0x255);this[_0x4892a3(0x2a1)]=this[_0x4892a3(0x2a1)]||{};if(this[_0x4892a3(0x2a1)][_0x465197])return this[_0x4892a3(0x2a1)][_0x465197];const _0x2d0a00=VisuMZ['CoreEngine'][_0x4892a3(0x68a)][_0x4892a3(0x1d1)][_0x4892a3(0x2fd)];return this[_0x4892a3(0x291)](_0x465197,_0x2d0a00);},ColorManager[_0x265d62(0x50a)]=function(){const _0x5c1b02=_0x265d62,_0x2a657c=_0x5c1b02(0x241);this[_0x5c1b02(0x2a1)]=this[_0x5c1b02(0x2a1)]||{};if(this[_0x5c1b02(0x2a1)][_0x2a657c])return this['_colorCache'][_0x2a657c];const _0x3a55f9=VisuMZ[_0x5c1b02(0x7f2)]['Settings']['Color'][_0x5c1b02(0x522)];return this['getColorDataFromPluginParameters'](_0x2a657c,_0x3a55f9);},ColorManager['mpGaugeColor1']=function(){const _0x2d2888=_0x265d62,_0x5dc191=_0x2d2888(0x82e);this[_0x2d2888(0x2a1)]=this['_colorCache']||{};if(this[_0x2d2888(0x2a1)][_0x5dc191])return this[_0x2d2888(0x2a1)][_0x5dc191];const _0x11aa2e=VisuMZ[_0x2d2888(0x7f2)][_0x2d2888(0x68a)]['Color']['ColorMPGauge1'];return this[_0x2d2888(0x291)](_0x5dc191,_0x11aa2e);},ColorManager['mpGaugeColor2']=function(){const _0x13c192=_0x265d62,_0x12fb88=_0x13c192(0x306);this[_0x13c192(0x2a1)]=this[_0x13c192(0x2a1)]||{};if(this[_0x13c192(0x2a1)][_0x12fb88])return this[_0x13c192(0x2a1)][_0x12fb88];const _0x212862=VisuMZ[_0x13c192(0x7f2)][_0x13c192(0x68a)][_0x13c192(0x1d1)]['ColorMPGauge2'];return this[_0x13c192(0x291)](_0x12fb88,_0x212862);},ColorManager[_0x265d62(0x326)]=function(){const _0x54116f=_0x265d62,_0x4f15e7=_0x54116f(0x3bb);this[_0x54116f(0x2a1)]=this[_0x54116f(0x2a1)]||{};if(this['_colorCache'][_0x4f15e7])return this[_0x54116f(0x2a1)][_0x4f15e7];const _0x69b18f=VisuMZ['CoreEngine'][_0x54116f(0x68a)]['Color'][_0x54116f(0x35b)];return this[_0x54116f(0x291)](_0x4f15e7,_0x69b18f);},ColorManager[_0x265d62(0x129)]=function(){const _0xeec35f=_0x265d62,_0x5358ce='_stored_powerUpColor';this['_colorCache']=this[_0xeec35f(0x2a1)]||{};if(this[_0xeec35f(0x2a1)][_0x5358ce])return this[_0xeec35f(0x2a1)][_0x5358ce];const _0x28b54a=VisuMZ[_0xeec35f(0x7f2)]['Settings'][_0xeec35f(0x1d1)][_0xeec35f(0x4d8)];return this[_0xeec35f(0x291)](_0x5358ce,_0x28b54a);},ColorManager[_0x265d62(0x76e)]=function(){const _0x4bcf15=_0x265d62,_0x2d85c1=_0x4bcf15(0x366);this[_0x4bcf15(0x2a1)]=this[_0x4bcf15(0x2a1)]||{};if(this[_0x4bcf15(0x2a1)][_0x2d85c1])return this[_0x4bcf15(0x2a1)][_0x2d85c1];const _0x1d77a3=VisuMZ[_0x4bcf15(0x7f2)][_0x4bcf15(0x68a)][_0x4bcf15(0x1d1)][_0x4bcf15(0x4ad)];return this[_0x4bcf15(0x291)](_0x2d85c1,_0x1d77a3);},ColorManager[_0x265d62(0x684)]=function(){const _0x278021=_0x265d62,_0x420994=_0x278021(0x2ef);this[_0x278021(0x2a1)]=this['_colorCache']||{};if(this[_0x278021(0x2a1)][_0x420994])return this[_0x278021(0x2a1)][_0x420994];const _0x557a61=VisuMZ['CoreEngine'][_0x278021(0x68a)][_0x278021(0x1d1)][_0x278021(0x409)];return this[_0x278021(0x291)](_0x420994,_0x557a61);},ColorManager[_0x265d62(0x363)]=function(){const _0x1c42b0=_0x265d62,_0x1b86b5=_0x1c42b0(0x55b);this[_0x1c42b0(0x2a1)]=this[_0x1c42b0(0x2a1)]||{};if(this[_0x1c42b0(0x2a1)][_0x1b86b5])return this['_colorCache'][_0x1b86b5];const _0x1b5768=VisuMZ[_0x1c42b0(0x7f2)][_0x1c42b0(0x68a)]['Color'][_0x1c42b0(0x7cb)];return this['getColorDataFromPluginParameters'](_0x1b86b5,_0x1b5768);},ColorManager[_0x265d62(0x5c1)]=function(){const _0x31e01b=_0x265d62,_0x54b5c4='_stored_tpGaugeColor1';this[_0x31e01b(0x2a1)]=this[_0x31e01b(0x2a1)]||{};if(this[_0x31e01b(0x2a1)][_0x54b5c4])return this['_colorCache'][_0x54b5c4];const _0x1b70d3=VisuMZ[_0x31e01b(0x7f2)][_0x31e01b(0x68a)][_0x31e01b(0x1d1)][_0x31e01b(0x74d)];return this[_0x31e01b(0x291)](_0x54b5c4,_0x1b70d3);},ColorManager['tpGaugeColor2']=function(){const _0x5c0659=_0x265d62,_0x58386e=_0x5c0659(0x5a7);this[_0x5c0659(0x2a1)]=this[_0x5c0659(0x2a1)]||{};if(this[_0x5c0659(0x2a1)][_0x58386e])return this[_0x5c0659(0x2a1)][_0x58386e];const _0x4a1365=VisuMZ['CoreEngine'][_0x5c0659(0x68a)][_0x5c0659(0x1d1)][_0x5c0659(0x25c)];return this[_0x5c0659(0x291)](_0x58386e,_0x4a1365);},ColorManager[_0x265d62(0x378)]=function(){const _0xb4a987=_0x265d62,_0x15518b=_0xb4a987(0x287);this[_0xb4a987(0x2a1)]=this[_0xb4a987(0x2a1)]||{};if(this[_0xb4a987(0x2a1)][_0x15518b])return this[_0xb4a987(0x2a1)][_0x15518b];const _0x3ce3a9=VisuMZ[_0xb4a987(0x7f2)][_0xb4a987(0x68a)][_0xb4a987(0x1d1)]['ColorTPCost'];return this['getColorDataFromPluginParameters'](_0x15518b,_0x3ce3a9);},ColorManager[_0x265d62(0x613)]=function(){const _0x543f56=_0x265d62,_0x3faab8='_stored_pendingColor';this['_colorCache']=this[_0x543f56(0x2a1)]||{};if(this[_0x543f56(0x2a1)][_0x3faab8])return this[_0x543f56(0x2a1)][_0x3faab8];const _0x1a7ffb=VisuMZ[_0x543f56(0x7f2)][_0x543f56(0x68a)][_0x543f56(0x1d1)]['ColorTPCost'];return this[_0x543f56(0x291)](_0x3faab8,_0x1a7ffb);},ColorManager[_0x265d62(0x40d)]=function(){const _0x31d6ea=_0x265d62,_0x2c1107='_stored_expGaugeColor1';this['_colorCache']=this[_0x31d6ea(0x2a1)]||{};if(this[_0x31d6ea(0x2a1)][_0x2c1107])return this[_0x31d6ea(0x2a1)][_0x2c1107];const _0x511695=VisuMZ['CoreEngine'][_0x31d6ea(0x68a)][_0x31d6ea(0x1d1)]['ColorExpGauge1'];return this[_0x31d6ea(0x291)](_0x2c1107,_0x511695);},ColorManager[_0x265d62(0x145)]=function(){const _0x2b8044=_0x265d62,_0x585350=_0x2b8044(0x5e4);this[_0x2b8044(0x2a1)]=this['_colorCache']||{};if(this[_0x2b8044(0x2a1)][_0x585350])return this[_0x2b8044(0x2a1)][_0x585350];const _0x4dcc0c=VisuMZ[_0x2b8044(0x7f2)][_0x2b8044(0x68a)][_0x2b8044(0x1d1)][_0x2b8044(0x1e8)];return this[_0x2b8044(0x291)](_0x585350,_0x4dcc0c);},ColorManager['maxLvGaugeColor1']=function(){const _0x44890=_0x265d62,_0x3a2076=_0x44890(0x135);this['_colorCache']=this[_0x44890(0x2a1)]||{};if(this['_colorCache'][_0x3a2076])return this[_0x44890(0x2a1)][_0x3a2076];const _0x1e13fe=VisuMZ[_0x44890(0x7f2)][_0x44890(0x68a)][_0x44890(0x1d1)][_0x44890(0x558)];return this[_0x44890(0x291)](_0x3a2076,_0x1e13fe);},ColorManager['maxLvGaugeColor2']=function(){const _0x1668e1=_0x265d62,_0xce84ae=_0x1668e1(0x618);this[_0x1668e1(0x2a1)]=this[_0x1668e1(0x2a1)]||{};if(this['_colorCache'][_0xce84ae])return this[_0x1668e1(0x2a1)][_0xce84ae];const _0x311f0d=VisuMZ[_0x1668e1(0x7f2)]['Settings'][_0x1668e1(0x1d1)][_0x1668e1(0x25b)];return this['getColorDataFromPluginParameters'](_0xce84ae,_0x311f0d);},ColorManager[_0x265d62(0x810)]=function(_0x4b637b){const _0x5ea42b=_0x265d62;return VisuMZ['CoreEngine'][_0x5ea42b(0x68a)]['Color']['ActorHPColor'][_0x5ea42b(0x58f)](this,_0x4b637b);},ColorManager[_0x265d62(0x867)]=function(_0x3a8205){const _0x5aabd0=_0x265d62;return VisuMZ[_0x5aabd0(0x7f2)][_0x5aabd0(0x68a)][_0x5aabd0(0x1d1)][_0x5aabd0(0x555)][_0x5aabd0(0x58f)](this,_0x3a8205);},ColorManager['tpColor']=function(_0x479d92){const _0x9af7cd=_0x265d62;return VisuMZ[_0x9af7cd(0x7f2)][_0x9af7cd(0x68a)][_0x9af7cd(0x1d1)][_0x9af7cd(0x569)][_0x9af7cd(0x58f)](this,_0x479d92);},ColorManager['paramchangeTextColor']=function(_0x2957ca){const _0xb7e348=_0x265d62;return VisuMZ[_0xb7e348(0x7f2)][_0xb7e348(0x68a)][_0xb7e348(0x1d1)][_0xb7e348(0x272)]['call'](this,_0x2957ca);},ColorManager[_0x265d62(0x33f)]=function(_0x4131cb){const _0x210219=_0x265d62;return VisuMZ[_0x210219(0x7f2)][_0x210219(0x68a)][_0x210219(0x1d1)][_0x210219(0x7d5)][_0x210219(0x58f)](this,_0x4131cb);},ColorManager['outlineColor']=function(){const _0x5923b3=_0x265d62;return VisuMZ[_0x5923b3(0x7f2)][_0x5923b3(0x68a)][_0x5923b3(0x1d1)][_0x5923b3(0x498)];},ColorManager[_0x265d62(0x79d)]=function(){const _0x410985=_0x265d62;return VisuMZ[_0x410985(0x7f2)][_0x410985(0x68a)][_0x410985(0x1d1)]['OutlineColorDmg']||_0x410985(0x641);},ColorManager['outlineColorGauge']=function(){const _0x575d3e=_0x265d62;return VisuMZ[_0x575d3e(0x7f2)]['Settings']['Color'][_0x575d3e(0x30e)]||_0x575d3e(0x6d0);},ColorManager[_0x265d62(0x1c0)]=function(){const _0x345fa0=_0x265d62;return VisuMZ[_0x345fa0(0x7f2)][_0x345fa0(0x68a)][_0x345fa0(0x1d1)][_0x345fa0(0x2f3)];},ColorManager[_0x265d62(0x5c3)]=function(){const _0x225f54=_0x265d62;return VisuMZ[_0x225f54(0x7f2)][_0x225f54(0x68a)][_0x225f54(0x1d1)][_0x225f54(0x2e3)];},ColorManager['itemBackColor1']=function(){const _0x20291e=_0x265d62;return VisuMZ[_0x20291e(0x7f2)][_0x20291e(0x68a)][_0x20291e(0x1d1)]['ItemBackColor1'];},ColorManager[_0x265d62(0x5e5)]=function(){const _0xbb8cfc=_0x265d62;return VisuMZ[_0xbb8cfc(0x7f2)][_0xbb8cfc(0x68a)][_0xbb8cfc(0x1d1)][_0xbb8cfc(0x6c5)];},SceneManager[_0x265d62(0x7bf)]=[],SceneManager[_0x265d62(0x68d)]=function(){const _0x58fef7=_0x265d62;return this[_0x58fef7(0x1cd)]&&this[_0x58fef7(0x1cd)][_0x58fef7(0x6bb)]===Scene_Battle;},SceneManager[_0x265d62(0x626)]=function(){const _0x45f39f=_0x265d62;return this['_scene']&&this[_0x45f39f(0x1cd)][_0x45f39f(0x6bb)]===Scene_Map;},SceneManager[_0x265d62(0x7e3)]=function(){const _0x3fac0c=_0x265d62;return this[_0x3fac0c(0x1cd)]&&this[_0x3fac0c(0x1cd)]instanceof Scene_Map;},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x6b5)]=SceneManager['initialize'],SceneManager['initialize']=function(){const _0x487674=_0x265d62;VisuMZ[_0x487674(0x7f2)][_0x487674(0x6b5)][_0x487674(0x58f)](this),this['initVisuMZCoreEngine']();},VisuMZ['CoreEngine'][_0x265d62(0x146)]=SceneManager[_0x265d62(0x226)],SceneManager[_0x265d62(0x226)]=function(_0x12baba){const _0x37dbb9=_0x265d62;if($gameTemp)this[_0x37dbb9(0x486)](_0x12baba);VisuMZ['CoreEngine']['SceneManager_onKeyDown'][_0x37dbb9(0x58f)](this,_0x12baba);},SceneManager[_0x265d62(0x486)]=function(_0x396473){const _0x1724b0=_0x265d62;if(!_0x396473[_0x1724b0(0x66d)]&&!_0x396473[_0x1724b0(0x4b0)])switch(_0x396473[_0x1724b0(0x65d)]){case 0x54:this['playTestCtrlT']();break;case 0x75:this[_0x1724b0(0x8d4)]();break;case 0x76:if(Input[_0x1724b0(0x43d)](_0x1724b0(0x154))||Input[_0x1724b0(0x43d)](_0x1724b0(0x3be)))return;this[_0x1724b0(0x34f)]();break;}},SceneManager[_0x265d62(0x8d4)]=function(){const _0x58f4a9=_0x265d62;if($gameTemp[_0x58f4a9(0x510)]()&&VisuMZ[_0x58f4a9(0x7f2)][_0x58f4a9(0x68a)][_0x58f4a9(0x6b6)][_0x58f4a9(0x830)]){if('PswHa'!==_0x58f4a9(0x6a1)){ConfigManager[_0x58f4a9(0x83d)]!==0x0?(ConfigManager[_0x58f4a9(0x402)]=0x0,ConfigManager[_0x58f4a9(0x7b4)]=0x0,ConfigManager['meVolume']=0x0,ConfigManager[_0x58f4a9(0x83d)]=0x0):(ConfigManager[_0x58f4a9(0x402)]=0x64,ConfigManager[_0x58f4a9(0x7b4)]=0x64,ConfigManager[_0x58f4a9(0x818)]=0x64,ConfigManager[_0x58f4a9(0x83d)]=0x64);ConfigManager['save']();if(this['_scene'][_0x58f4a9(0x6bb)]===Scene_Options){if(this['_scene'][_0x58f4a9(0x41d)])this['_scene']['_optionsWindow'][_0x58f4a9(0x359)]();if(this[_0x58f4a9(0x1cd)][_0x58f4a9(0x7ac)])this[_0x58f4a9(0x1cd)][_0x58f4a9(0x7ac)][_0x58f4a9(0x359)]();}}else _0x51814e[_0x58f4a9(0x7ee)][_0x58f4a9(0x6f4)]['call'](this),this[_0x58f4a9(0x1e3)]();}},SceneManager[_0x265d62(0x34f)]=function(){const _0x476ea0=_0x265d62;$gameTemp[_0x476ea0(0x510)]()&&VisuMZ[_0x476ea0(0x7f2)][_0x476ea0(0x68a)][_0x476ea0(0x6b6)][_0x476ea0(0x1ff)]&&($gameTemp['_playTestFastMode']=!$gameTemp['_playTestFastMode']);},SceneManager['playTestCtrlT']=function(){const _0x3bb924=_0x265d62;if(!$gameTemp[_0x3bb924(0x510)]())return;if(!SceneManager[_0x3bb924(0x68d)]())return;for(const _0x27a919 of $gameParty['members']()){if('mGVXN'!==_0x3bb924(0x450)){var _0x177ff9=_0xc71dd2(_0x2e1fbf['$1']);_0x3e026e*=_0x177ff9;}else{if(!_0x27a919)continue;_0x27a919[_0x3bb924(0x368)](_0x27a919[_0x3bb924(0x6a9)]());}}},SceneManager[_0x265d62(0x2d4)]=function(){const _0x4f4fbc=_0x265d62;this[_0x4f4fbc(0x234)]=![],this[_0x4f4fbc(0x17b)]=!VisuMZ[_0x4f4fbc(0x7f2)][_0x4f4fbc(0x68a)]['UI'][_0x4f4fbc(0x6f6)];},SceneManager['setSideButtonLayout']=function(_0x21c2ef){const _0x173b3c=_0x265d62;VisuMZ[_0x173b3c(0x7f2)]['Settings']['UI'][_0x173b3c(0x127)]&&(this[_0x173b3c(0x234)]=_0x21c2ef);},SceneManager['isSideButtonLayout']=function(){const _0x3c2092=_0x265d62;return this[_0x3c2092(0x234)];},SceneManager[_0x265d62(0x5d3)]=function(){const _0x100f4f=_0x265d62;return this[_0x100f4f(0x17b)];},SceneManager[_0x265d62(0x447)]=function(){return this['areButtonsHidden']()||this['isSideButtonLayout']();},VisuMZ[_0x265d62(0x7f2)]['SceneManager_isGameActive']=SceneManager['isGameActive'],SceneManager['isGameActive']=function(){const _0x1740ec=_0x265d62;return VisuMZ['CoreEngine'][_0x1740ec(0x68a)][_0x1740ec(0x6b6)][_0x1740ec(0x1fe)]?_0x1740ec(0x3fd)!==_0x1740ec(0x3fd)?_0x39e453[_0x1740ec(0x891)][_0x1740ec(0x240)]['call'](this):VisuMZ['CoreEngine'][_0x1740ec(0x21f)][_0x1740ec(0x58f)](this):!![];},SceneManager[_0x265d62(0x1ef)]=function(_0x42c754){const _0x41f1f0=_0x265d62;if(_0x42c754 instanceof Error)'VOAhy'===_0x41f1f0(0x6d7)?this[_0x41f1f0(0x772)](_0x42c754):(_0x460dbe['CoreEngine']['Scene_Equip_create'][_0x41f1f0(0x58f)](this),this[_0x41f1f0(0x6c4)]());else{if(_0x42c754 instanceof Array&&_0x42c754[0x0]===_0x41f1f0(0x32d))this['catchLoadError'](_0x42c754);else{if(_0x41f1f0(0x18b)!==_0x41f1f0(0x7a1))this[_0x41f1f0(0x5bf)](_0x42c754);else{_0x2a0468[_0x41f1f0(0x7c8)](_0x17aba1,_0x242c1f);const _0x4c0fcb=_0x43ae63['pictureId']||0x1,_0x14dedd=_0x40971d['easingType']||_0x41f1f0(0x24b),_0x3019ed=_0xaf464f[_0x41f1f0(0x1f1)](_0x4c0fcb);_0x3019ed&&_0x3019ed[_0x41f1f0(0x54a)](_0x14dedd);}}}this[_0x41f1f0(0x413)]();},VisuMZ['CoreEngine'][_0x265d62(0x68f)]=BattleManager[_0x265d62(0x2db)],BattleManager[_0x265d62(0x2db)]=function(){const _0xbf6840=_0x265d62;if(VisuMZ[_0xbf6840(0x7f2)][_0xbf6840(0x68a)]['QoL'][_0xbf6840(0x7c3)])this[_0xbf6840(0x5e7)]();else return VisuMZ[_0xbf6840(0x7f2)]['BattleManager_processEscape'][_0xbf6840(0x58f)](this);},BattleManager['processAlwaysEscape']=function(){const _0x146b84=_0x265d62;return $gameParty[_0x146b84(0x550)](),SoundManager[_0x146b84(0x6e2)](),this[_0x146b84(0x543)](),!![];},BattleManager[_0x265d62(0x1e1)]=function(){const _0x4f5481=_0x265d62;return $gameSystem[_0x4f5481(0x60e)]()>=0x1;},BattleManager[_0x265d62(0x5ae)]=function(){const _0x206551=_0x265d62;return $gameSystem[_0x206551(0x60e)]()===0x1;},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x62d)]=Game_Temp[_0x265d62(0x7ee)][_0x265d62(0x582)],Game_Temp[_0x265d62(0x7ee)][_0x265d62(0x582)]=function(){const _0x27cdbf=_0x265d62;VisuMZ[_0x27cdbf(0x7f2)][_0x27cdbf(0x62d)][_0x27cdbf(0x58f)](this),this[_0x27cdbf(0x5de)](),this[_0x27cdbf(0x504)](),this[_0x27cdbf(0x75b)]();},Game_Temp[_0x265d62(0x7ee)][_0x265d62(0x5de)]=function(){const _0x59c5cd=_0x265d62;if(VisuMZ[_0x59c5cd(0x7f2)][_0x59c5cd(0x68a)][_0x59c5cd(0x6b6)]['ForceNoPlayTest']){if('auPVS'===_0x59c5cd(0x6ce))this['_isPlaytest']=![];else{const _0xfc9632=_0x59c5cd(0x851);_0x2f89f6[_0x59c5cd(0x4f3)](_0xd67c0d)['remove']('')['remove'](null);const _0x2fe66d=_0x2f5dac[_0x59c5cd(0x4fd)](_0x59c5cd(0x1a4))['trim']();_0x4351dd[_0x59c5cd(0x7f2)][_0x59c5cd(0x8b5)](_0x2fe66d,_0xfc9632,!![]),_0x48c1e4[_0x59c5cd(0x1cd)][_0x59c5cd(0x6ba)]=!![];}}},Game_Temp[_0x265d62(0x7ee)]['setLastPluginCommandInterpreter']=function(_0x5a7b86){const _0x57b31a=_0x265d62;this[_0x57b31a(0x3aa)]=_0x5a7b86;},Game_Temp[_0x265d62(0x7ee)][_0x265d62(0x483)]=function(){const _0x3a7f86=_0x265d62;return this[_0x3a7f86(0x3aa)];},Game_Temp['prototype'][_0x265d62(0x6ec)]=function(){const _0x1c631f=_0x265d62;this['_forcedTroopView']=undefined,this[_0x1c631f(0x6d1)]=undefined;},Game_Temp[_0x265d62(0x7ee)][_0x265d62(0x792)]=function(_0x4f967c){const _0x17baad=_0x265d62;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x17baad(0x26d)]($dataMap['note']);const _0x41ad85=$dataTroops[_0x4f967c];if(_0x41ad85){if(_0x17baad(0x3ff)==='ielLk'){let _0x3db199=DataManager[_0x17baad(0x809)](_0x41ad85['id']);this[_0x17baad(0x26d)](_0x3db199);}else this['doesNameContainBannedWords']()?this['onInputBannedWords']():_0x20918e[_0x17baad(0x7f2)][_0x17baad(0x31d)][_0x17baad(0x58f)](this);}},Game_Temp[_0x265d62(0x7ee)][_0x265d62(0x26d)]=function(_0x20b2ea){const _0xab1a01=_0x265d62;if(!_0x20b2ea)return;if(_0x20b2ea[_0xab1a01(0x695)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))_0xab1a01(0x114)===_0xab1a01(0x4d6)?(_0xe0d89c[_0xab1a01(0x7f2)][_0xab1a01(0x500)][_0xab1a01(0x58f)](this),_0x12ab45['isSideButtonLayout']()&&this['moveMenuButtonSideButtonLayout']()):this[_0xab1a01(0x8cf)]='FV';else{if(_0x20b2ea['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0xab1a01(0x8cf)]='SV';else{if(_0x20b2ea['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2a01a8=String(RegExp['$1']);if(_0x2a01a8[_0xab1a01(0x695)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0xab1a01(0x8cf)]='FV';else _0x2a01a8[_0xab1a01(0x695)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(_0xab1a01(0x41b)!==_0xab1a01(0x41b)?this[_0xab1a01(0x1df)](_0xab1a01(0x722)):this[_0xab1a01(0x8cf)]='SV');}}}if(_0x20b2ea['match'](/<(?:DTB)>/i)){if(_0xab1a01(0x584)==='PNmXq')return _0x2bdb40(_0x28a545['$1']);else this['_forcedBattleSys']=0x0;}else{if(_0x20b2ea[_0xab1a01(0x695)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this['_forcedBattleSys']=0x1;else{if(_0x20b2ea[_0xab1a01(0x695)](/<(?:TPB|ATB)[ ]WAIT>/i)){if(_0xab1a01(0x209)==='BWowT')this[_0xab1a01(0x6d1)]=0x2;else return _0xea9cc1;}else{if(_0x20b2ea[_0xab1a01(0x695)](/<(?:CTB)>/i))Imported[_0xab1a01(0x311)]&&(this[_0xab1a01(0x6d1)]=_0xab1a01(0x156));else{if(_0x20b2ea[_0xab1a01(0x695)](/<(?:STB)>/i)){if(_0xab1a01(0x374)!==_0xab1a01(0x4b1))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0xab1a01(0x6d1)]=_0xab1a01(0x38a));else return _0x3f9ded[_0xab1a01(0x7f2)][_0xab1a01(0x68a)][_0xab1a01(0x4e8)]['length'];}else{if(_0x20b2ea[_0xab1a01(0x695)](/<(?:BTB)>/i))Imported[_0xab1a01(0x115)]&&(this[_0xab1a01(0x6d1)]=_0xab1a01(0x508));else{if(_0x20b2ea[_0xab1a01(0x695)](/<(?:FTB)>/i))Imported[_0xab1a01(0x4e6)]&&(this['_forcedBattleSys']=_0xab1a01(0x5bc));else{if(_0x20b2ea[_0xab1a01(0x695)](/<(?:OTB)>/i))Imported[_0xab1a01(0x7b1)]&&(this['_forcedBattleSys']=_0xab1a01(0x221));else{if(_0x20b2ea[_0xab1a01(0x695)](/<(?:ETB)>/i))Imported['VisuMZ_2_BattleSystemETB']&&(this[_0xab1a01(0x6d1)]=_0xab1a01(0x2e0));else{if(_0x20b2ea[_0xab1a01(0x695)](/<(?:PTB)>/i))Imported[_0xab1a01(0x38e)]&&(this[_0xab1a01(0x6d1)]=_0xab1a01(0x29f));else{if(_0x20b2ea['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x5cc334=String(RegExp['$1']);if(_0x5cc334[_0xab1a01(0x695)](/DTB/i))this[_0xab1a01(0x6d1)]=0x0;else{if(_0x5cc334[_0xab1a01(0x695)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0xab1a01(0x6d1)]=0x1;else{if(_0x5cc334[_0xab1a01(0x695)](/(?:TPB|ATB)[ ]WAIT/i))this['_forcedBattleSys']=0x2;else{if(_0x5cc334[_0xab1a01(0x695)](/CTB/i))_0xab1a01(0x39a)!==_0xab1a01(0x843)?Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0xab1a01(0x6d1)]=_0xab1a01(0x156)):_0x23d246+=_0xcb47b2+_0xab1a01(0x1a4);else{if(_0x5cc334[_0xab1a01(0x695)](/STB/i)){if(_0xab1a01(0x488)!=='odNvW')Imported[_0xab1a01(0x87b)]&&(this['_forcedBattleSys']=_0xab1a01(0x38a));else{if(_0x57dc9c[_0xab1a01(0x7a9)](_0xab1a01(0x652))){var _0x14d6c9=_0x506068(_0xab1a01(0x173))[_0xab1a01(0x590)][_0xab1a01(0x31b)]();_0x3a5943['showDevTools']();if(_0x77609b)_0x14754b(_0x14d6c9[_0xab1a01(0x7e0)][_0xab1a01(0x858)](_0x14d6c9),0x190);}}}else{if(_0x5cc334['match'](/BTB/i))'rvwTW'===_0xab1a01(0x673)?Imported[_0xab1a01(0x115)]&&(this[_0xab1a01(0x6d1)]=_0xab1a01(0x508)):this[_0xab1a01(0x2a1)][_0x26ebd6]=this[_0xab1a01(0x421)](_0x12418e(_0x180e6d));else{if(_0x5cc334[_0xab1a01(0x695)](/FTB/i)){if(Imported[_0xab1a01(0x4e6)]){if('JBTPH'!==_0xab1a01(0x26c)){if(_0x4fbcc3[_0xab1a01(0x27e)]())return;_0x2dbd05['ConvertParams'](_0x8830da,_0x45841a);const _0x3c1b8b=_0x2c2782[_0xab1a01(0x16b)](_0x224549[_0xab1a01(0x8b2)],_0x231278[_0xab1a01(0x256)]),_0x1a6720=_0x33c207[_0xab1a01(0x565)](_0xf54167[_0xab1a01(0x8b2)],_0x533c56['EndingID']);for(let _0x406579=_0x3c1b8b;_0x406579<=_0x1a6720;_0x406579++){const _0x97b83=_0x3ad4a6[_0xab1a01(0x678)](_0x406579);_0x57b5cc['setValue'](_0x406579,!_0x97b83);}}else this[_0xab1a01(0x6d1)]=_0xab1a01(0x5bc);}}else{if(_0x5cc334[_0xab1a01(0x695)](/OTB/i))Imported[_0xab1a01(0x7b1)]&&(this[_0xab1a01(0x6d1)]=_0xab1a01(0x221));else{if(_0x5cc334[_0xab1a01(0x695)](/ETB/i))Imported[_0xab1a01(0x2d3)]&&(this[_0xab1a01(0x6d1)]='ETB');else _0x5cc334['match'](/PTB/i)&&(Imported[_0xab1a01(0x38e)]&&(this[_0xab1a01(0x6d1)]='PTB'));}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x265d62(0x7ee)]['createFauxAnimationQueue']=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x265d62(0x7ee)][_0x265d62(0x2ea)]=function(_0x19ea32,_0xd69722,_0x40bd67,_0x58aa0d){const _0x4f580f=_0x265d62;if(!this[_0x4f580f(0x193)]())return;_0x40bd67=_0x40bd67||![],_0x58aa0d=_0x58aa0d||![];if($dataAnimations[_0xd69722]){const _0x5dc126={'targets':_0x19ea32,'animationId':_0xd69722,'mirror':_0x40bd67,'mute':_0x58aa0d};this[_0x4f580f(0x746)]['push'](_0x5dc126);for(const _0x597b70 of _0x19ea32){if('Kcbca'!==_0x4f580f(0x47d)){if(_0x597b70[_0x4f580f(0x6c9)]){if(_0x4f580f(0x7d9)===_0x4f580f(0x7d9))_0x597b70[_0x4f580f(0x6c9)]();else return _0x522e0e[_0x4f580f(0x7ee)]['buttonAssistText1'][_0x4f580f(0x58f)](this);}}else _0x43c92e['CoreEngine']['Spriteset_Base_update'][_0x4f580f(0x58f)](this),this[_0x4f580f(0x15b)](),this[_0x4f580f(0x1da)](),this[_0x4f580f(0x573)]();}}},Game_Temp['prototype'][_0x265d62(0x193)]=function(){return!![];},Game_Temp[_0x265d62(0x7ee)][_0x265d62(0x12b)]=function(){const _0x4ed6cc=_0x265d62;return this[_0x4ed6cc(0x746)][_0x4ed6cc(0x154)]();},Game_Temp[_0x265d62(0x7ee)]['createPointAnimationQueue']=function(){const _0x2383dd=_0x265d62;this[_0x2383dd(0x275)]=[];},Game_Temp[_0x265d62(0x7ee)][_0x265d62(0x805)]=function(_0xab95f9,_0x2b51d5,_0x41b1d5,_0x273a62,_0x1e3b32){const _0x2cc599=_0x265d62;if(!this[_0x2cc599(0x81f)]())return;_0x273a62=_0x273a62||![],_0x1e3b32=_0x1e3b32||![];if($dataAnimations[_0x41b1d5]){const _0x34fb44={'x':_0xab95f9,'y':_0x2b51d5,'animationId':_0x41b1d5,'mirror':_0x273a62,'mute':_0x1e3b32};this[_0x2cc599(0x275)][_0x2cc599(0x7d0)](_0x34fb44);}},Game_Temp[_0x265d62(0x7ee)][_0x265d62(0x81f)]=function(){return!![];},Game_Temp[_0x265d62(0x7ee)][_0x265d62(0x362)]=function(){const _0x2d35bb=_0x265d62;return this['_pointAnimationQueue'][_0x2d35bb(0x154)]();},VisuMZ['CoreEngine'][_0x265d62(0x782)]=Game_System[_0x265d62(0x7ee)][_0x265d62(0x582)],Game_System[_0x265d62(0x7ee)][_0x265d62(0x582)]=function(){const _0x418305=_0x265d62;VisuMZ[_0x418305(0x7f2)][_0x418305(0x782)][_0x418305(0x58f)](this),this['initCoreEngine']();},Game_System[_0x265d62(0x7ee)]['initCoreEngine']=function(){const _0x189dfd=_0x265d62;this[_0x189dfd(0x3d8)]={'SideView':$dataSystem[_0x189dfd(0x8ac)],'BattleSystem':this[_0x189dfd(0x5fd)](),'FontSize':$dataSystem[_0x189dfd(0x48f)][_0x189dfd(0x62a)],'Padding':0xc};},Game_System[_0x265d62(0x7ee)][_0x265d62(0x147)]=function(){const _0x539b9a=_0x265d62;if($gameTemp[_0x539b9a(0x8cf)]==='SV')return!![];else{if($gameTemp[_0x539b9a(0x8cf)]==='FV')return![];}if(this[_0x539b9a(0x3d8)]===undefined)this[_0x539b9a(0x6ed)]();if(this[_0x539b9a(0x3d8)][_0x539b9a(0x7cc)]===undefined)this[_0x539b9a(0x6ed)]();return this['_CoreEngineSettings'][_0x539b9a(0x7cc)];},Game_System[_0x265d62(0x7ee)]['setSideView']=function(_0x3ddf){const _0x1339a3=_0x265d62;if(this[_0x1339a3(0x3d8)]===undefined)this[_0x1339a3(0x6ed)]();if(this[_0x1339a3(0x3d8)][_0x1339a3(0x7cc)]===undefined)this[_0x1339a3(0x6ed)]();this[_0x1339a3(0x3d8)][_0x1339a3(0x7cc)]=_0x3ddf;},Game_System[_0x265d62(0x7ee)]['resetBattleSystem']=function(){const _0xe1e55d=_0x265d62;if(this['_CoreEngineSettings']===undefined)this[_0xe1e55d(0x6ed)]();this[_0xe1e55d(0x3d8)][_0xe1e55d(0x3b2)]=this[_0xe1e55d(0x5fd)]();},Game_System[_0x265d62(0x7ee)][_0x265d62(0x5fd)]=function(){const _0x28e551=_0x265d62,_0x3a000d=(VisuMZ[_0x28e551(0x7f2)][_0x28e551(0x68a)][_0x28e551(0x3b2)]||_0x28e551(0x566))['toUpperCase']()[_0x28e551(0x1b2)]();return VisuMZ[_0x28e551(0x7f2)][_0x28e551(0x6dc)](_0x3a000d);},Game_System[_0x265d62(0x7ee)]['getBattleSystem']=function(){const _0x480440=_0x265d62;if($gameTemp[_0x480440(0x6d1)]!==undefined){if(_0x480440(0x73d)===_0x480440(0x18d)){if(_0x46aed7[_0x480440(0x510)]())_0x7b1f51[_0x480440(0x77f)](_0x2c3a53);}else return $gameTemp[_0x480440(0x6d1)];}if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x480440(0x3d8)][_0x480440(0x3b2)]===undefined)this[_0x480440(0x4fe)]();return this[_0x480440(0x3d8)]['BattleSystem'];},Game_System[_0x265d62(0x7ee)][_0x265d62(0x787)]=function(_0x4a1efe){const _0x48aab2=_0x265d62;if(this[_0x48aab2(0x3d8)]===undefined)this[_0x48aab2(0x6ed)]();if(this[_0x48aab2(0x3d8)][_0x48aab2(0x3b2)]===undefined)this['resetBattleSystem']();this['_CoreEngineSettings'][_0x48aab2(0x3b2)]=_0x4a1efe;},Game_System['prototype'][_0x265d62(0x51a)]=function(){const _0x180fe6=_0x265d62;if(this[_0x180fe6(0x3d8)]===undefined)this[_0x180fe6(0x6ed)]();if(this['_CoreEngineSettings'][_0x180fe6(0x6cb)]===undefined)this[_0x180fe6(0x6ed)]();return this[_0x180fe6(0x3d8)]['FontSize'];},Game_System[_0x265d62(0x7ee)][_0x265d62(0x738)]=function(_0x250b7f){const _0x5eaa52=_0x265d62;if(this[_0x5eaa52(0x3d8)]===undefined)this[_0x5eaa52(0x6ed)]();if(this[_0x5eaa52(0x3d8)][_0x5eaa52(0x1bb)]===undefined)this[_0x5eaa52(0x6ed)]();this[_0x5eaa52(0x3d8)][_0x5eaa52(0x6cb)]=_0x250b7f;},Game_System[_0x265d62(0x7ee)][_0x265d62(0x663)]=function(){const _0x9858f0=_0x265d62;if(this[_0x9858f0(0x3d8)]===undefined)this[_0x9858f0(0x6ed)]();if(this['_CoreEngineSettings'][_0x9858f0(0x347)]===undefined)this[_0x9858f0(0x6ed)]();return this[_0x9858f0(0x3d8)][_0x9858f0(0x347)];},Game_System[_0x265d62(0x7ee)][_0x265d62(0x8c4)]=function(_0x267253){const _0x32a809=_0x265d62;if(this[_0x32a809(0x3d8)]===undefined)this[_0x32a809(0x6ed)]();if(this[_0x32a809(0x3d8)][_0x32a809(0x1bb)]===undefined)this[_0x32a809(0x6ed)]();this[_0x32a809(0x3d8)]['Padding']=_0x267253;},VisuMZ['CoreEngine']['Game_Screen_initialize']=Game_Screen[_0x265d62(0x7ee)][_0x265d62(0x582)],Game_Screen[_0x265d62(0x7ee)][_0x265d62(0x582)]=function(){const _0x751ace=_0x265d62;VisuMZ[_0x751ace(0x7f2)][_0x751ace(0x57e)][_0x751ace(0x58f)](this),this[_0x751ace(0x4be)]();},Game_Screen[_0x265d62(0x7ee)]['initCoreEngineScreenShake']=function(){const _0xfd2bfb=_0x265d62,_0x4a5cbd=VisuMZ[_0xfd2bfb(0x7f2)][_0xfd2bfb(0x68a)][_0xfd2bfb(0x562)];this[_0xfd2bfb(0x377)]=_0x4a5cbd?.['DefaultStyle']||_0xfd2bfb(0x238);},Game_Screen[_0x265d62(0x7ee)][_0x265d62(0x8a2)]=function(){const _0x5ee98e=_0x265d62;if(this[_0x5ee98e(0x377)]===undefined)this[_0x5ee98e(0x4be)]();return this[_0x5ee98e(0x377)];},Game_Screen[_0x265d62(0x7ee)][_0x265d62(0x232)]=function(_0x1e83c6){const _0x43563e=_0x265d62;if(this[_0x43563e(0x377)]===undefined)this['initCoreEngineScreenShake']();this[_0x43563e(0x377)]=_0x1e83c6['toLowerCase']()[_0x43563e(0x1b2)]();},Game_Picture[_0x265d62(0x7ee)][_0x265d62(0x6da)]=function(){const _0x169e50=_0x265d62;if($gameParty[_0x169e50(0x27e)]())return![];return this[_0x169e50(0x3e6)]()&&this['name']()[_0x169e50(0x31c)](0x0)==='!';},VisuMZ['CoreEngine'][_0x265d62(0x6c8)]=Game_Picture[_0x265d62(0x7ee)]['x'],Game_Picture[_0x265d62(0x7ee)]['x']=function(){const _0x4f505b=_0x265d62;return this['isMapScrollLinked']()?this[_0x4f505b(0x68b)]():VisuMZ['CoreEngine']['Game_Picture_x'][_0x4f505b(0x58f)](this);},Game_Picture[_0x265d62(0x7ee)][_0x265d62(0x68b)]=function(){const _0x2a9635=_0x265d62,_0x3d9643=$gameMap[_0x2a9635(0x3c9)]()*$gameMap[_0x2a9635(0x523)]();return this['_x']-_0x3d9643;},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x6e5)]=Game_Picture[_0x265d62(0x7ee)]['y'],Game_Picture[_0x265d62(0x7ee)]['y']=function(){const _0x37e316=_0x265d62;if(this[_0x37e316(0x6da)]()){if('ogFMR'===_0x37e316(0x20e))return this['yScrollLinkedOffset']();else{const _0x22755c=_0x45cb7a[_0x37e316(0x154)]();_0x22755c['_isWindow']&&_0x22755c['visible']&&_0x22755c[_0x37e316(0x4da)]>0x0&&(_0x1da026[_0x37e316(0x1eb)](_0x2ccfc2[_0x37e316(0x1ba)],0x0,~0x0),_0xefc1eb['stencilOp'](_0x3925e4['KEEP'],_0x22ff79[_0x37e316(0x7e4)],_0x3b38aa['KEEP']),_0x22755c[_0x37e316(0x5c5)](_0x2a8902),_0x3bea40['batch'][_0x37e316(0x207)](),_0x1fdd9b[_0x37e316(0x490)](),_0x504662[_0x37e316(0x1eb)](_0x10bf22[_0x37e316(0x719)],0x1,~0x0),_0x2b4e37[_0x37e316(0x767)](_0x33a9b0[_0x37e316(0x587)],_0x20550b[_0x37e316(0x587)],_0x646bc0[_0x37e316(0x587)]),_0x11c885[_0x37e316(0x724)](_0x3cedc2[_0x37e316(0x3b0)],_0xbf5fb8[_0x37e316(0x509)]),_0x1f55e5[_0x37e316(0x5c5)](_0x2db4a0),_0x12e96f[_0x37e316(0x212)][_0x37e316(0x207)](),_0x3aee93[_0x37e316(0x724)](_0x446053[_0x37e316(0x509)],_0x2d0fd9['ONE_MINUS_SRC_ALPHA']));}}else return VisuMZ['CoreEngine'][_0x37e316(0x6e5)][_0x37e316(0x58f)](this);},Game_Picture['prototype'][_0x265d62(0x31a)]=function(){const _0x5ce764=_0x265d62,_0x1d758a=$gameMap[_0x5ce764(0x5f1)]()*$gameMap['tileHeight']();return this['_y']-_0x1d758a;},Game_Picture[_0x265d62(0x7ee)][_0x265d62(0x54a)]=function(_0x427ffd){const _0xede4a1=_0x265d62;this[_0xede4a1(0x4cf)]=_0x427ffd;},VisuMZ['CoreEngine'][_0x265d62(0x761)]=Game_Picture['prototype']['calcEasing'],Game_Picture['prototype']['calcEasing']=function(_0x20a102){const _0x21eccf=_0x265d62;return this['_coreEasingType']=this[_0x21eccf(0x4cf)]||0x0,[0x0,0x1,0x2,0x3][_0x21eccf(0x734)](this[_0x21eccf(0x4cf)])?VisuMZ[_0x21eccf(0x7f2)]['Game_Picture_calcEasing'][_0x21eccf(0x58f)](this,_0x20a102):VisuMZ[_0x21eccf(0x3c4)](_0x20a102,this[_0x21eccf(0x4cf)]);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x5ff)]=Game_Action['prototype'][_0x265d62(0x5c4)],Game_Action[_0x265d62(0x7ee)][_0x265d62(0x5c4)]=function(_0x36124d){const _0x5b2f1a=_0x265d62;return VisuMZ[_0x5b2f1a(0x7f2)][_0x5b2f1a(0x68a)][_0x5b2f1a(0x6b6)][_0x5b2f1a(0x465)]?this[_0x5b2f1a(0x45b)](_0x36124d):VisuMZ[_0x5b2f1a(0x7f2)][_0x5b2f1a(0x5ff)][_0x5b2f1a(0x58f)](this,_0x36124d);},Game_Action[_0x265d62(0x7ee)][_0x265d62(0x45b)]=function(_0x2cd89d){const _0x6bc9d2=_0x265d62,_0x284276=this['itemSuccessRate'](_0x2cd89d),_0x471406=this['subjectHitRate'](_0x2cd89d),_0x5dae9d=this[_0x6bc9d2(0x6af)](_0x2cd89d);return _0x284276*(_0x471406-_0x5dae9d);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x39f)]=Game_Action[_0x265d62(0x7ee)][_0x265d62(0x3da)],Game_Action['prototype'][_0x265d62(0x3da)]=function(_0x410583){const _0xf3779b=_0x265d62;return VisuMZ[_0xf3779b(0x7f2)]['Settings'][_0xf3779b(0x6b6)][_0xf3779b(0x465)]?0x0:VisuMZ[_0xf3779b(0x7f2)][_0xf3779b(0x39f)][_0xf3779b(0x58f)](this,_0x410583);},Game_Action['prototype']['itemSuccessRate']=function(_0x17801a){const _0x153416=_0x265d62;return this[_0x153416(0x7ab)]()[_0x153416(0x72f)]*0.01;},Game_Action[_0x265d62(0x7ee)][_0x265d62(0x3a1)]=function(_0x328f22){const _0xf0ac6d=_0x265d62;if(VisuMZ[_0xf0ac6d(0x7f2)][_0xf0ac6d(0x68a)][_0xf0ac6d(0x6b6)]['AccuracyBoost']&&this[_0xf0ac6d(0x740)]())return 0x1;if(this['isPhysical']())return _0xf0ac6d(0x676)==='gInSK'?VisuMZ[_0xf0ac6d(0x7f2)]['Settings']['QoL'][_0xf0ac6d(0x79e)]&&this[_0xf0ac6d(0x415)]()[_0xf0ac6d(0x453)]()?_0xf0ac6d(0x48b)!==_0xf0ac6d(0x48b)?this:this['subject']()[_0xf0ac6d(0x251)]+0.05:this['subject']()[_0xf0ac6d(0x251)]:this['_pointAnimationQueue'][_0xf0ac6d(0x154)]();else{if(_0xf0ac6d(0x356)==='PzQar')return 0x1;else _0x3f9a8f[_0xf0ac6d(0x7c1)]&&_0x356225[_0xf0ac6d(0x7c1)]();}},Game_Action[_0x265d62(0x7ee)][_0x265d62(0x6af)]=function(_0x5e1896){const _0x464ba8=_0x265d62;if(this[_0x464ba8(0x415)]()[_0x464ba8(0x453)]()===_0x5e1896[_0x464ba8(0x453)]())return 0x0;if(this[_0x464ba8(0x163)]()){if(_0x464ba8(0x16f)!==_0x464ba8(0x16f)){const _0x483bc6=_0x32bb84['CoreEngine'][_0x464ba8(0x68a)][_0x464ba8(0x474)];return this[_0x464ba8(0x519)][_0x464ba8(0x6d4)]===_0x464ba8(0x637)?_0x483bc6[_0x464ba8(0x1d5)]||_0x464ba8(0x1d5):_0x483bc6[_0x464ba8(0x7f4)]||_0x464ba8(0x7f4);}else{if(VisuMZ[_0x464ba8(0x7f2)][_0x464ba8(0x68a)][_0x464ba8(0x6b6)][_0x464ba8(0x79e)]&&_0x5e1896[_0x464ba8(0x3ad)]()){if(_0x464ba8(0x1cb)===_0x464ba8(0x1cb))return _0x5e1896[_0x464ba8(0x417)]-0.05;else{var _0x4ca401=_0x248044[_0x464ba8(0x7f2)]['Window_Base_createTextState']['call'](this,_0x52d16f,_0x11ebe9,_0x246b73,_0x52afde);if(this[_0x464ba8(0x7fc)]())_0x4ca401[_0x464ba8(0x373)]=_0x2484dc[_0x464ba8(0x164)](_0x4ca401[_0x464ba8(0x373)]);return _0x4ca401;}}else{if(_0x464ba8(0x68e)!==_0x464ba8(0x68e))_0x388e67[_0x464ba8(0x43d)](_0x464ba8(0x154))&&this['allowShiftScrolling']()?this[_0x464ba8(0x1e9)]():this[_0x464ba8(0x66a)](_0x9a814c['isTriggered']('up'));else return _0x5e1896[_0x464ba8(0x417)];}}}else{if(this['isMagical']())return _0x5e1896['mev'];else{if(_0x464ba8(0x895)===_0x464ba8(0x895))return 0x0;else this['scale']['x']!==0x0&&(this[_0x464ba8(0x527)][_0x464ba8(0x3f3)]['x']=0x1/this[_0x464ba8(0x3f3)]['x'],this[_0x464ba8(0x527)]['x']=-(this['x']/this[_0x464ba8(0x3f3)]['x'])),this[_0x464ba8(0x3f3)]['y']!==0x0&&(this[_0x464ba8(0x527)]['scale']['y']=0x1/this['scale']['y'],this[_0x464ba8(0x527)]['y']=-(this['y']/this[_0x464ba8(0x3f3)]['y']));}}},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x87d)]=Game_Action['prototype'][_0x265d62(0x358)],Game_Action['prototype'][_0x265d62(0x358)]=function(_0xbf9448){const _0x55e0b7=_0x265d62;VisuMZ[_0x55e0b7(0x7f2)][_0x55e0b7(0x87d)][_0x55e0b7(0x58f)](this,_0xbf9448);if(VisuMZ[_0x55e0b7(0x7f2)][_0x55e0b7(0x68a)][_0x55e0b7(0x6b6)][_0x55e0b7(0x465)])return;const _0xdaaf18=_0xbf9448['result']();_0xdaaf18[_0x55e0b7(0x442)]&&(0x1-this[_0x55e0b7(0x3da)](_0xbf9448)>this[_0x55e0b7(0x5c4)](_0xbf9448)&&(_0x55e0b7(0x22f)!==_0x55e0b7(0x22f)?this[_0x55e0b7(0x1b0)]():(_0xdaaf18[_0x55e0b7(0x442)]=![],_0xdaaf18[_0x55e0b7(0x899)]=!![])));},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x4fa)]=Game_BattlerBase[_0x265d62(0x7ee)][_0x265d62(0x166)],Game_BattlerBase['prototype'][_0x265d62(0x166)]=function(){const _0x257b80=_0x265d62;this[_0x257b80(0x88e)]={},VisuMZ[_0x257b80(0x7f2)][_0x257b80(0x4fa)][_0x257b80(0x58f)](this);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x731)]=Game_BattlerBase[_0x265d62(0x7ee)][_0x265d62(0x359)],Game_BattlerBase[_0x265d62(0x7ee)][_0x265d62(0x359)]=function(){this['_cache']={},VisuMZ['CoreEngine']['Game_BattlerBase_refresh']['call'](this);},Game_BattlerBase[_0x265d62(0x7ee)][_0x265d62(0x2f0)]=function(_0x145695){const _0xa9620e=_0x265d62;return this[_0xa9620e(0x88e)]=this['_cache']||{},this['_cache'][_0x145695]!==undefined;},Game_BattlerBase[_0x265d62(0x7ee)]['paramPlus']=function(_0x198057){const _0x433785=_0x265d62,_0x3ad7b8=(_0x1b6a41,_0x597bc8)=>{const _0x4f4c6f=_0x5929;if(!_0x597bc8)return _0x1b6a41;if(_0x597bc8[_0x4f4c6f(0x45a)][_0x4f4c6f(0x695)](VisuMZ['CoreEngine'][_0x4f4c6f(0x1f0)][_0x4f4c6f(0x3f0)][_0x198057])){if(_0x4f4c6f(0x53c)!=='phXWf')this[_0x4f4c6f(0x3ce)][_0x4f4c6f(0x62a)]<=0x60&&(this[_0x4f4c6f(0x3ce)]['fontSize']+=0x6);else{var _0x17e656=Number(RegExp['$1']);_0x1b6a41+=_0x17e656;}}if(_0x597bc8['note'][_0x4f4c6f(0x695)](VisuMZ[_0x4f4c6f(0x7f2)][_0x4f4c6f(0x1f0)][_0x4f4c6f(0x844)][_0x198057])){var _0x46ec3e=String(RegExp['$1']);try{if(_0x4f4c6f(0x194)===_0x4f4c6f(0x819)){const _0x347584=_0x355ac0[_0x3594e2[_0x4f4c6f(0x1de)]],_0x17fdb1=this['createPointAnimationTargets'](_0x34275c),_0x351c99=_0x20c0d[_0x4f4c6f(0x3b9)],_0x1713ed=_0x5d6657['mute'];let _0xa77174=this['animationBaseDelay']();const _0x1ae401=this[_0x4f4c6f(0x2c7)]();if(this['isAnimationForEach'](_0x347584))for(const _0x2a222b of _0x17fdb1){this[_0x4f4c6f(0x233)]([_0x2a222b],_0x347584,_0x351c99,_0xa77174,_0x1713ed),_0xa77174+=_0x1ae401;}else this['createPointAnimationSprite'](_0x17fdb1,_0x347584,_0x351c99,_0xa77174,_0x1713ed);}else _0x1b6a41+=eval(_0x46ec3e);}catch(_0x2a1349){if($gameTemp['isPlaytest']())console[_0x4f4c6f(0x77f)](_0x2a1349);}}return _0x1b6a41;};return this[_0x433785(0x3cc)]()[_0x433785(0x198)](_0x3ad7b8,this[_0x433785(0x28b)][_0x198057]);},Game_BattlerBase[_0x265d62(0x7ee)][_0x265d62(0x70c)]=function(_0x3338ef){const _0xe466dd=_0x265d62;var _0x10e63e='Basic'+(this[_0xe466dd(0x453)]()?_0xe466dd(0x7aa):_0xe466dd(0x7ca))+_0xe466dd(0x6bd)+_0x3338ef;if(this[_0xe466dd(0x2f0)](_0x10e63e))return this['_cache'][_0x10e63e];this[_0xe466dd(0x88e)][_0x10e63e]=eval(VisuMZ[_0xe466dd(0x7f2)][_0xe466dd(0x68a)][_0xe466dd(0x346)][_0x10e63e]);const _0x3a5ec5=(_0x4d65e0,_0x527396)=>{const _0x136340=_0xe466dd;if(_0x136340(0x5ac)===_0x136340(0x7ea))for(const _0x214bda of _0x3134e5){this[_0x136340(0x246)]([_0x214bda],_0x288622,_0x37e7f3,_0xed3948,_0x2781dc),_0x1529c5+=_0x5d71b1;}else{if(!_0x527396)return _0x4d65e0;if(_0x527396[_0x136340(0x45a)][_0x136340(0x695)](VisuMZ['CoreEngine']['RegExp']['paramMax'][_0x3338ef])){var _0x3bf7a7=Number(RegExp['$1']);if(_0x3bf7a7===0x0)_0x3bf7a7=Number[_0x136340(0x605)];_0x4d65e0=Math[_0x136340(0x565)](_0x4d65e0,_0x3bf7a7);}if(_0x527396[_0x136340(0x45a)]['match'](VisuMZ[_0x136340(0x7f2)][_0x136340(0x1f0)][_0x136340(0x86c)][_0x3338ef])){var _0x5759dd=String(RegExp['$1']);try{_0x4d65e0=Math[_0x136340(0x565)](_0x4d65e0,Number(eval(_0x5759dd)));}catch(_0x3367f1){if($gameTemp['isPlaytest']())console[_0x136340(0x77f)](_0x3367f1);}}return _0x4d65e0;}};if(this[_0xe466dd(0x88e)][_0x10e63e]===0x0)this[_0xe466dd(0x88e)][_0x10e63e]=Number['MAX_SAFE_INTEGER'];return this[_0xe466dd(0x88e)][_0x10e63e]=this[_0xe466dd(0x3cc)]()['reduce'](_0x3a5ec5,this['_cache'][_0x10e63e]),this['_cache'][_0x10e63e];},Game_BattlerBase[_0x265d62(0x7ee)][_0x265d62(0x235)]=function(_0x317db5){const _0x7caf76=_0x265d62,_0x39e781=this[_0x7caf76(0x6e9)](Game_BattlerBase[_0x7caf76(0x6d5)],_0x317db5),_0x3028a1=(_0xcc4948,_0x13c63d)=>{const _0x3236a6=_0x7caf76;if(_0x3236a6(0x3b6)===_0x3236a6(0x19c)){_0x3a4c89[_0x3236a6(0x7f2)][_0x3236a6(0x269)]['call'](this);if(!_0x35b7ad[_0x3236a6(0x302)])this['levelUpRecovery']();}else{if(!_0x13c63d)return _0xcc4948;if(_0x13c63d[_0x3236a6(0x45a)]['match'](VisuMZ[_0x3236a6(0x7f2)][_0x3236a6(0x1f0)][_0x3236a6(0x292)][_0x317db5])){if(_0x3236a6(0x197)!==_0x3236a6(0x197))return _0x39c809[_0x3236a6(0x891)]['CategoryRect'][_0x3236a6(0x58f)](this);else{var _0x4befef=Number(RegExp['$1'])/0x64;_0xcc4948*=_0x4befef;}}if(_0x13c63d[_0x3236a6(0x45a)]['match'](VisuMZ[_0x3236a6(0x7f2)][_0x3236a6(0x1f0)][_0x3236a6(0x8ce)][_0x317db5])){var _0x4befef=Number(RegExp['$1']);_0xcc4948*=_0x4befef;}if(_0x13c63d['note'][_0x3236a6(0x695)](VisuMZ[_0x3236a6(0x7f2)][_0x3236a6(0x1f0)]['paramRateJS'][_0x317db5])){var _0x45faca=String(RegExp['$1']);try{_0xcc4948*=eval(_0x45faca);}catch(_0x407201){if($gameTemp[_0x3236a6(0x510)]())console[_0x3236a6(0x77f)](_0x407201);}}return _0xcc4948;}};return this[_0x7caf76(0x3cc)]()['reduce'](_0x3028a1,_0x39e781);},Game_BattlerBase['prototype'][_0x265d62(0x553)]=function(_0x321603){const _0x20ed7d=_0x265d62,_0x4181c3=(_0x3778c7,_0x49fc5b)=>{const _0x270afc=_0x5929;if(_0x270afc(0x7b6)!=='JGdEJ'){const _0x9fa409=this[_0x270afc(0x1c4)],_0x196d9f=this['_height'],_0x4988c5=0x18,_0x8c5d9a=_0x4988c5/0x2,_0xe3a21a=0x60+_0x4988c5,_0x58399b=0x0+_0x4988c5;this[_0x270afc(0x305)]['bitmap']=this[_0x270afc(0x414)],this[_0x270afc(0x305)][_0x270afc(0x835)]['x']=0.5,this[_0x270afc(0x305)][_0x270afc(0x835)]['y']=0.5,this[_0x270afc(0x305)]['setFrame'](_0xe3a21a+_0x8c5d9a,_0x58399b+_0x8c5d9a+_0x4988c5,_0x4988c5,_0x8c5d9a),this[_0x270afc(0x305)][_0x270afc(0x5dd)](_0x21c4e5[_0x270afc(0x1bd)](_0x9fa409/0x2),_0x3e62f8[_0x270afc(0x1bd)](_0x196d9f-_0x8c5d9a)),this[_0x270afc(0x170)][_0x270afc(0x6cc)]=this[_0x270afc(0x414)],this[_0x270afc(0x170)]['anchor']['x']=0.5,this[_0x270afc(0x170)][_0x270afc(0x835)]['y']=0.5,this[_0x270afc(0x170)][_0x270afc(0x607)](_0xe3a21a+_0x8c5d9a,_0x58399b,_0x4988c5,_0x8c5d9a),this[_0x270afc(0x170)][_0x270afc(0x5dd)](_0x5ef7ce[_0x270afc(0x1bd)](_0x9fa409/0x2),_0x2ffa83['round'](_0x8c5d9a));}else{if(!_0x49fc5b)return _0x3778c7;if(_0x49fc5b[_0x270afc(0x45a)][_0x270afc(0x695)](VisuMZ[_0x270afc(0x7f2)]['RegExp'][_0x270afc(0x3a0)][_0x321603])){if(_0x270afc(0x8a7)===_0x270afc(0x63c))_0x3d1b57[_0x270afc(0x7f2)][_0x270afc(0x7db)][_0x270afc(0x58f)](this,_0x482dc0,_0x153878,_0xdb9b61,_0x1bb3c7,_0x7f6f77,_0x2dc443,_0x349dc3),this[_0x270afc(0x3ec)]();else{var _0xbf575=Number(RegExp['$1']);_0x3778c7+=_0xbf575;}}if(_0x49fc5b[_0x270afc(0x45a)][_0x270afc(0x695)](VisuMZ[_0x270afc(0x7f2)][_0x270afc(0x1f0)]['paramFlatJS'][_0x321603])){if('VmHJD'!==_0x270afc(0x4bc)){const _0x11e4f1=_0x23269d[_0x270afc(0x7f2)][_0x270afc(0x68a)][_0x270afc(0x562)];if(_0x11e4f1&&_0x11e4f1[_0x270afc(0x365)])return _0x11e4f1['vertJS'][_0x270afc(0x58f)](this);const _0x4387a2=_0x539735['_shakePower']*0.75,_0x1f1caa=_0x2012a4[_0x270afc(0x881)]*0.6,_0x14f84a=_0x4c5b16[_0x270afc(0x5ee)];this['y']+=_0x4e038f[_0x270afc(0x1bd)](_0x3ebc9e[_0x270afc(0x4ac)](_0x4387a2)-_0x102758[_0x270afc(0x4ac)](_0x1f1caa))*(_0x4f4366[_0x270afc(0x16b)](_0x14f84a,0x1e)*0.5);}else{var _0x446195=String(RegExp['$1']);try{_0x3778c7+=eval(_0x446195);}catch(_0x7e07bb){if(_0x270afc(0x3a8)===_0x270afc(0x3a8)){if($gameTemp[_0x270afc(0x510)]())console[_0x270afc(0x77f)](_0x7e07bb);}else this[_0x270afc(0x133)]();}}}return _0x3778c7;}};return this[_0x20ed7d(0x3cc)]()[_0x20ed7d(0x198)](_0x4181c3,0x0);},Game_BattlerBase[_0x265d62(0x7ee)][_0x265d62(0x884)]=function(_0xc0121c){const _0x337bc2=_0x265d62;let _0xe17acf=_0x337bc2(0x884)+_0xc0121c+_0x337bc2(0x70b);if(this[_0x337bc2(0x2f0)](_0xe17acf))return this['_cache'][_0xe17acf];return this[_0x337bc2(0x88e)][_0xe17acf]=Math['round'](VisuMZ[_0x337bc2(0x7f2)][_0x337bc2(0x68a)][_0x337bc2(0x346)][_0x337bc2(0x12f)]['call'](this,_0xc0121c)),this['_cache'][_0xe17acf];},Game_BattlerBase[_0x265d62(0x7ee)]['xparamPlus']=function(_0xcf508d){const _0x5ceaff=_0x265d62,_0x5972a2=(_0x32f5cd,_0x4966a8)=>{const _0x449360=_0x5929;if(_0x449360(0x4d1)!=='sEHwK'){if(!_0x4966a8)return _0x32f5cd;if(_0x4966a8[_0x449360(0x45a)]['match'](VisuMZ['CoreEngine'][_0x449360(0x1f0)][_0x449360(0x280)][_0xcf508d])){if('ZkJFw'===_0x449360(0x4a8))_0x544edf[_0x449360(0x311)]&&(this[_0x449360(0x6d1)]=_0x449360(0x156));else{var _0x193144=Number(RegExp['$1'])/0x64;_0x32f5cd+=_0x193144;}}if(_0x4966a8[_0x449360(0x45a)][_0x449360(0x695)](VisuMZ['CoreEngine'][_0x449360(0x1f0)]['xparamPlus2'][_0xcf508d])){var _0x193144=Number(RegExp['$1']);_0x32f5cd+=_0x193144;}if(_0x4966a8[_0x449360(0x45a)][_0x449360(0x695)](VisuMZ[_0x449360(0x7f2)]['RegExp'][_0x449360(0x4ca)][_0xcf508d])){if(_0x449360(0x88f)===_0x449360(0x88f)){var _0x39bd50=String(RegExp['$1']);try{if('ddhfq'!=='ddhfq'){var _0x5b77aa=_0xe90618('nw.gui')['Window'][_0x449360(0x31b)]();_0x468b42[_0x449360(0x126)]();if(_0x53e578)_0x3dca96(_0x5b77aa[_0x449360(0x7e0)][_0x449360(0x858)](_0x5b77aa),0x190);}else _0x32f5cd+=eval(_0x39bd50);}catch(_0x333367){if($gameTemp[_0x449360(0x510)]())console[_0x449360(0x77f)](_0x333367);}}else return'BTB';}return _0x32f5cd;}else return _0x449360(0x5bc);};return this[_0x5ceaff(0x3cc)]()[_0x5ceaff(0x198)](_0x5972a2,0x0);},Game_BattlerBase[_0x265d62(0x7ee)][_0x265d62(0x49b)]=function(_0x59696c){const _0x45353f=_0x265d62,_0x10d4b4=(_0x2ee9f4,_0x486881)=>{const _0x9195c=_0x5929;if(!_0x486881)return _0x2ee9f4;if(_0x486881[_0x9195c(0x45a)]['match'](VisuMZ[_0x9195c(0x7f2)]['RegExp'][_0x9195c(0x515)][_0x59696c])){if('SCyWr'===_0x9195c(0x11c)){var _0xc7611b=Number(RegExp['$1'])/0x64;_0x2ee9f4*=_0xc7611b;}else _0xda641['x']=_0x3961df['round'](_0x1ed38e['x']),_0x192ff7['y']=_0x3f9792[_0x9195c(0x1bd)](_0x487fdd['y']),_0x532e09[_0x9195c(0x3f1)]=_0x56202a[_0x9195c(0x1bd)](_0x1dec76[_0x9195c(0x3f1)]),_0x3f3fff['height']=_0x2122be['round'](_0x15d97c[_0x9195c(0x4ec)]),this[_0x9195c(0x223)](),_0x3883ea[_0x9195c(0x7f2)][_0x9195c(0x222)]['call'](this,_0x39f1ea),this[_0x9195c(0x125)]();}if(_0x486881[_0x9195c(0x45a)][_0x9195c(0x695)](VisuMZ[_0x9195c(0x7f2)][_0x9195c(0x1f0)]['xparamRate2'][_0x59696c])){var _0xc7611b=Number(RegExp['$1']);_0x2ee9f4*=_0xc7611b;}if(_0x486881[_0x9195c(0x45a)][_0x9195c(0x695)](VisuMZ['CoreEngine']['RegExp'][_0x9195c(0x845)][_0x59696c])){var _0x349cd2=String(RegExp['$1']);try{_0x2ee9f4*=eval(_0x349cd2);}catch(_0x5e3fce){if($gameTemp['isPlaytest']())console[_0x9195c(0x77f)](_0x5e3fce);}}return _0x2ee9f4;};return this[_0x45353f(0x3cc)]()[_0x45353f(0x198)](_0x10d4b4,0x1);},Game_BattlerBase['prototype'][_0x265d62(0x5dc)]=function(_0x4d5a9b){const _0x32cfc9=_0x265d62,_0x1496e8=(_0x218192,_0x4998a5)=>{const _0x6cb35d=_0x5929;if(!_0x4998a5)return _0x218192;if(_0x4998a5[_0x6cb35d(0x45a)][_0x6cb35d(0x695)](VisuMZ[_0x6cb35d(0x7f2)][_0x6cb35d(0x1f0)][_0x6cb35d(0x538)][_0x4d5a9b])){var _0x2baf75=Number(RegExp['$1'])/0x64;_0x218192+=_0x2baf75;}if(_0x4998a5['note'][_0x6cb35d(0x695)](VisuMZ['CoreEngine'][_0x6cb35d(0x1f0)][_0x6cb35d(0x149)][_0x4d5a9b])){if('vJDMS'===_0x6cb35d(0x40c))this[_0x6cb35d(0x5e8)]['setBackgroundType'](_0xe6b1e3['layoutSettings']['ItemBgType']);else{var _0x2baf75=Number(RegExp['$1']);_0x218192+=_0x2baf75;}}if(_0x4998a5[_0x6cb35d(0x45a)][_0x6cb35d(0x695)](VisuMZ['CoreEngine']['RegExp']['xparamFlatJS'][_0x4d5a9b])){var _0x4a8b31=String(RegExp['$1']);try{_0x6cb35d(0x706)===_0x6cb35d(0x706)?_0x218192+=eval(_0x4a8b31):this['_forcedBattleSys']=_0x6cb35d(0x29f);}catch(_0x4e2d92){if($gameTemp['isPlaytest']())console['log'](_0x4e2d92);}}return _0x218192;};return this[_0x32cfc9(0x3cc)]()[_0x32cfc9(0x198)](_0x1496e8,0x0);},Game_BattlerBase['prototype'][_0x265d62(0x159)]=function(_0x4ac51f){const _0x58e661=_0x265d62;let _0x168d73='xparam'+_0x4ac51f+_0x58e661(0x70b);if(this[_0x58e661(0x2f0)](_0x168d73))return this[_0x58e661(0x88e)][_0x168d73];return this[_0x58e661(0x88e)][_0x168d73]=VisuMZ['CoreEngine'][_0x58e661(0x68a)][_0x58e661(0x346)][_0x58e661(0x729)][_0x58e661(0x58f)](this,_0x4ac51f),this[_0x58e661(0x88e)][_0x168d73];},Game_BattlerBase[_0x265d62(0x7ee)][_0x265d62(0x697)]=function(_0x3eb697){const _0x2d64e0=_0x265d62,_0xc64cf7=(_0x153d9c,_0x489779)=>{const _0x3689b7=_0x5929;if(!_0x489779)return _0x153d9c;if(_0x489779[_0x3689b7(0x45a)][_0x3689b7(0x695)](VisuMZ[_0x3689b7(0x7f2)][_0x3689b7(0x1f0)][_0x3689b7(0x31e)][_0x3eb697])){if('PUmNQ'==='PUmNQ'){var _0x51dfa3=Number(RegExp['$1'])/0x64;_0x153d9c+=_0x51dfa3;}else return _0x419927['getInputButtonString']('ok');}if(_0x489779['note'][_0x3689b7(0x695)](VisuMZ[_0x3689b7(0x7f2)][_0x3689b7(0x1f0)][_0x3689b7(0x5ed)][_0x3eb697])){var _0x51dfa3=Number(RegExp['$1']);_0x153d9c+=_0x51dfa3;}if(_0x489779['note'][_0x3689b7(0x695)](VisuMZ[_0x3689b7(0x7f2)][_0x3689b7(0x1f0)][_0x3689b7(0x7f9)][_0x3eb697])){if(_0x3689b7(0x31f)===_0x3689b7(0x31f)){var _0x55b943=String(RegExp['$1']);try{if(_0x3689b7(0x64f)===_0x3689b7(0x606))return 0x0;else _0x153d9c+=eval(_0x55b943);}catch(_0x3c1b13){if($gameTemp[_0x3689b7(0x510)]())console[_0x3689b7(0x77f)](_0x3c1b13);}}else _0x5eedbe[_0x3689b7(0x21a)]=_0x5f3cb9[_0x3689b7(0x16b)](_0x463623(_0x59d365['$1']),_0x245376[_0x3689b7(0x36d)]);}return _0x153d9c;};return this['traitObjects']()[_0x2d64e0(0x198)](_0xc64cf7,0x0);},Game_BattlerBase[_0x265d62(0x7ee)][_0x265d62(0x728)]=function(_0x4507f7){const _0x3fb2cd=_0x265d62,_0x14d0b3=(_0x3663db,_0x19c8ac)=>{const _0x500734=_0x5929;if(!_0x19c8ac)return _0x3663db;if(_0x19c8ac[_0x500734(0x45a)][_0x500734(0x695)](VisuMZ[_0x500734(0x7f2)][_0x500734(0x1f0)][_0x500734(0x84e)][_0x4507f7])){if(_0x500734(0x50b)===_0x500734(0x8a1)){const _0x25598e=_0x53c954['displayY']()*_0x22c43d[_0x500734(0x74a)]();return this['_y']-_0x25598e;}else{var _0x1ecbda=Number(RegExp['$1'])/0x64;_0x3663db*=_0x1ecbda;}}if(_0x19c8ac[_0x500734(0x45a)][_0x500734(0x695)](VisuMZ['CoreEngine'][_0x500734(0x1f0)][_0x500734(0x585)][_0x4507f7])){var _0x1ecbda=Number(RegExp['$1']);_0x3663db*=_0x1ecbda;}if(_0x19c8ac[_0x500734(0x45a)][_0x500734(0x695)](VisuMZ[_0x500734(0x7f2)][_0x500734(0x1f0)]['sparamRateJS'][_0x4507f7])){if(_0x500734(0x872)!=='ZJeLO'){this[_0x500734(0x3ce)][_0x500734(0x490)](),this[_0x500734(0x52b)][_0x500734(0x490)](),this[_0x500734(0x750)]();let _0x432b60=_0x257e5a[_0x500734(0x7f2)][_0x500734(0x68a)][_0x500734(0x474)]['NameInputMessage'][_0x500734(0x3af)]('\x0a'),_0x31b02e=_0x432b60[_0x500734(0x33a)],_0x155c2e=(this[_0x500734(0x3cf)]-_0x31b02e*this[_0x500734(0x12e)]())/0x2;for(let _0x467c94=0x0;_0x467c94<_0x31b02e;++_0x467c94){let _0x3dde00=_0x432b60[_0x467c94],_0x222a6d=this[_0x500734(0x75a)](_0x3dde00)[_0x500734(0x3f1)],_0x1a8ce9=_0x44d33c[_0x500734(0x8a0)]((this['contents']['width']-_0x222a6d)/0x2);this[_0x500734(0x624)](_0x3dde00,_0x1a8ce9,_0x155c2e),_0x155c2e+=this[_0x500734(0x12e)]();}}else{var _0x136c6b=String(RegExp['$1']);try{if(_0x500734(0x603)!==_0x500734(0x5a9))_0x3663db*=eval(_0x136c6b);else{let _0x1156ec=this['currentValue']();this['useDigitGrouping']()&&(_0x1156ec=_0x2128bc['GroupDigits'](_0x1156ec));const _0x1546ab=this[_0x500734(0x1d6)]()-0x1,_0x84aa6c=this[_0x500734(0x6b7)]();this[_0x500734(0x687)](),this[_0x500734(0x6cc)][_0x500734(0x2b6)](_0x1156ec,0x0,0x0,_0x1546ab,_0x84aa6c,_0x500734(0x672));}}catch(_0x1d4e63){if($gameTemp['isPlaytest']())console[_0x500734(0x77f)](_0x1d4e63);}}}return _0x3663db;};return this[_0x3fb2cd(0x3cc)]()[_0x3fb2cd(0x198)](_0x14d0b3,0x1);},Game_BattlerBase[_0x265d62(0x7ee)][_0x265d62(0x63b)]=function(_0xf23688){const _0xd020c0=_0x265d62,_0x522e92=(_0x5ba4c3,_0x2604fc)=>{const _0xaa8c5d=_0x5929;if(_0xaa8c5d(0x10e)!==_0xaa8c5d(0x14d)){if(!_0x2604fc)return _0x5ba4c3;if(_0x2604fc[_0xaa8c5d(0x45a)][_0xaa8c5d(0x695)](VisuMZ[_0xaa8c5d(0x7f2)][_0xaa8c5d(0x1f0)]['sparamFlat1'][_0xf23688])){if(_0xaa8c5d(0x11d)===_0xaa8c5d(0x3d5))return _0xaa8c5d(0x221);else{var _0x3521f2=Number(RegExp['$1'])/0x64;_0x5ba4c3+=_0x3521f2;}}if(_0x2604fc[_0xaa8c5d(0x45a)][_0xaa8c5d(0x695)](VisuMZ[_0xaa8c5d(0x7f2)][_0xaa8c5d(0x1f0)][_0xaa8c5d(0x6ea)][_0xf23688])){if(_0xaa8c5d(0x1a9)!==_0xaa8c5d(0x42a)){var _0x3521f2=Number(RegExp['$1']);_0x5ba4c3+=_0x3521f2;}else return _0x4bdd23[_0xaa8c5d(0x365)][_0xaa8c5d(0x58f)](this);}if(_0x2604fc[_0xaa8c5d(0x45a)][_0xaa8c5d(0x695)](VisuMZ[_0xaa8c5d(0x7f2)][_0xaa8c5d(0x1f0)]['sparamFlatJS'][_0xf23688])){if(_0xaa8c5d(0x18e)!==_0xaa8c5d(0x18e))_0x4ce65d=_0x4eafbf[_0xaa8c5d(0x379)](_0x5442cf),_0x120939['se']&&(_0x2441d6['se'][_0xaa8c5d(0x54c)]=0x0);else{var _0x3acdd4=String(RegExp['$1']);try{_0x5ba4c3+=eval(_0x3acdd4);}catch(_0x34867d){if($gameTemp['isPlaytest']())console['log'](_0x34867d);}}}return _0x5ba4c3;}else _0x1487c8=_0x104729['round'](_0x11fc77),_0x5c2332=_0x2085bf[_0xaa8c5d(0x1bd)](_0x43a6a4),_0x16ba3c[_0xaa8c5d(0x7f2)][_0xaa8c5d(0x647)][_0xaa8c5d(0x58f)](this,_0x9ccde8,_0xb758a5,_0x2d16bf,_0x2f78cc);};return this[_0xd020c0(0x3cc)]()[_0xd020c0(0x198)](_0x522e92,0x0);},Game_BattlerBase[_0x265d62(0x7ee)][_0x265d62(0x762)]=function(_0x4bd2e6){const _0x2958f6=_0x265d62;let _0x24f7b5=_0x2958f6(0x762)+_0x4bd2e6+_0x2958f6(0x70b);if(this[_0x2958f6(0x2f0)](_0x24f7b5))return this[_0x2958f6(0x88e)][_0x24f7b5];return this[_0x2958f6(0x88e)][_0x24f7b5]=VisuMZ[_0x2958f6(0x7f2)][_0x2958f6(0x68a)][_0x2958f6(0x346)]['SParameterFormula']['call'](this,_0x4bd2e6),this[_0x2958f6(0x88e)][_0x24f7b5];},Game_BattlerBase[_0x265d62(0x7ee)][_0x265d62(0x1d9)]=function(_0x42d579,_0x13e9ec){const _0x2c6761=_0x265d62;if(typeof paramId===_0x2c6761(0x7b9))return this[_0x2c6761(0x884)](_0x42d579);_0x42d579=String(_0x42d579||'')['toUpperCase']();if(_0x42d579==='MAXHP')return this[_0x2c6761(0x884)](0x0);if(_0x42d579==='MAXMP')return this['param'](0x1);if(_0x42d579===_0x2c6761(0x865))return this[_0x2c6761(0x884)](0x2);if(_0x42d579==='DEF')return this[_0x2c6761(0x884)](0x3);if(_0x42d579===_0x2c6761(0x440))return this[_0x2c6761(0x884)](0x4);if(_0x42d579===_0x2c6761(0x86a))return this[_0x2c6761(0x884)](0x5);if(_0x42d579===_0x2c6761(0x1f5))return this['param'](0x6);if(_0x42d579==='LUK')return this[_0x2c6761(0x884)](0x7);if(_0x42d579==='HIT')return _0x13e9ec?String(Math[_0x2c6761(0x1bd)](this['xparam'](0x0)*0x64))+'%':this[_0x2c6761(0x159)](0x0);if(_0x42d579==='EVA')return _0x13e9ec?String(Math[_0x2c6761(0x1bd)](this['xparam'](0x1)*0x64))+'%':this[_0x2c6761(0x159)](0x1);if(_0x42d579==='CRI')return _0x13e9ec?String(Math['round'](this[_0x2c6761(0x159)](0x2)*0x64))+'%':this[_0x2c6761(0x159)](0x2);if(_0x42d579===_0x2c6761(0x1e6))return _0x13e9ec?String(Math[_0x2c6761(0x1bd)](this[_0x2c6761(0x159)](0x3)*0x64))+'%':this[_0x2c6761(0x159)](0x3);if(_0x42d579===_0x2c6761(0x745))return _0x13e9ec?String(Math[_0x2c6761(0x1bd)](this[_0x2c6761(0x159)](0x4)*0x64))+'%':this[_0x2c6761(0x159)](0x4);if(_0x42d579===_0x2c6761(0x1f7))return _0x13e9ec?String(Math[_0x2c6761(0x1bd)](this['xparam'](0x5)*0x64))+'%':this[_0x2c6761(0x159)](0x5);if(_0x42d579===_0x2c6761(0x19a))return _0x13e9ec?String(Math[_0x2c6761(0x1bd)](this['xparam'](0x6)*0x64))+'%':this[_0x2c6761(0x159)](0x6);if(_0x42d579==='HRG')return _0x13e9ec?String(Math[_0x2c6761(0x1bd)](this[_0x2c6761(0x159)](0x7)*0x64))+'%':this[_0x2c6761(0x159)](0x7);if(_0x42d579===_0x2c6761(0x23e))return _0x13e9ec?String(Math[_0x2c6761(0x1bd)](this[_0x2c6761(0x159)](0x8)*0x64))+'%':this[_0x2c6761(0x159)](0x8);if(_0x42d579===_0x2c6761(0x52c))return _0x13e9ec?String(Math['round'](this[_0x2c6761(0x159)](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x42d579===_0x2c6761(0x247))return _0x13e9ec?String(Math[_0x2c6761(0x1bd)](this[_0x2c6761(0x762)](0x0)*0x64))+'%':this[_0x2c6761(0x762)](0x0);if(_0x42d579==='GRD')return _0x13e9ec?String(Math['round'](this['sparam'](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x42d579===_0x2c6761(0x20f))return _0x13e9ec?String(Math['round'](this['sparam'](0x2)*0x64))+'%':this[_0x2c6761(0x762)](0x2);if(_0x42d579===_0x2c6761(0x726))return _0x13e9ec?String(Math[_0x2c6761(0x1bd)](this[_0x2c6761(0x762)](0x3)*0x64))+'%':this[_0x2c6761(0x762)](0x3);if(_0x42d579===_0x2c6761(0x336))return _0x13e9ec?String(Math['round'](this[_0x2c6761(0x762)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x42d579===_0x2c6761(0x6ad))return _0x13e9ec?String(Math[_0x2c6761(0x1bd)](this[_0x2c6761(0x762)](0x5)*0x64))+'%':this[_0x2c6761(0x762)](0x5);if(_0x42d579==='PDR')return _0x13e9ec?String(Math['round'](this[_0x2c6761(0x762)](0x6)*0x64))+'%':this[_0x2c6761(0x762)](0x6);if(_0x42d579===_0x2c6761(0x24c))return _0x13e9ec?String(Math[_0x2c6761(0x1bd)](this[_0x2c6761(0x762)](0x7)*0x64))+'%':this[_0x2c6761(0x762)](0x7);if(_0x42d579===_0x2c6761(0x385))return _0x13e9ec?String(Math[_0x2c6761(0x1bd)](this[_0x2c6761(0x762)](0x8)*0x64))+'%':this[_0x2c6761(0x762)](0x8);if(_0x42d579===_0x2c6761(0x1fd))return _0x13e9ec?String(Math[_0x2c6761(0x1bd)](this[_0x2c6761(0x762)](0x9)*0x64))+'%':this[_0x2c6761(0x762)](0x9);if(VisuMZ[_0x2c6761(0x7f2)][_0x2c6761(0x5ab)][_0x42d579]){const _0x56547a=VisuMZ[_0x2c6761(0x7f2)][_0x2c6761(0x5ab)][_0x42d579],_0x380c44=this[_0x56547a];return VisuMZ['CoreEngine'][_0x2c6761(0x5c9)][_0x42d579]===_0x2c6761(0x205)?_0x380c44:_0x13e9ec?String(Math[_0x2c6761(0x1bd)](_0x380c44*0x64))+'%':_0x380c44;}return'';},Game_BattlerBase[_0x265d62(0x7ee)][_0x265d62(0x1e2)]=function(){const _0x101fe7=_0x265d62;return this[_0x101fe7(0x364)]()&&this[_0x101fe7(0x2d8)]<this[_0x101fe7(0x655)]*VisuMZ[_0x101fe7(0x7f2)]['Settings'][_0x101fe7(0x346)][_0x101fe7(0x1fa)];},Game_Battler[_0x265d62(0x7ee)]['performMiss']=function(){const _0x5baf20=_0x265d62;SoundManager[_0x5baf20(0x119)](),this[_0x5baf20(0x589)]('evade');},VisuMZ['CoreEngine'][_0x265d62(0x1c5)]=Game_Actor[_0x265d62(0x7ee)][_0x265d62(0x1b1)],Game_Actor['prototype'][_0x265d62(0x1b1)]=function(_0x3948d3){const _0x416b22=_0x265d62;if(this[_0x416b22(0x213)]>0x63)return this[_0x416b22(0x2a0)](_0x3948d3);return VisuMZ[_0x416b22(0x7f2)]['Game_Actor_paramBase']['call'](this,_0x3948d3);},Game_Actor['prototype'][_0x265d62(0x2a0)]=function(_0x51883d){const _0x5409d0=_0x265d62,_0x3c85c6=this[_0x5409d0(0x80f)]()['params'][_0x51883d][0x63],_0x50a992=this[_0x5409d0(0x80f)]()[_0x5409d0(0x20c)][_0x51883d][0x62];return _0x3c85c6+(_0x3c85c6-_0x50a992)*(this[_0x5409d0(0x213)]-0x63);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x3a6)]=Game_Actor[_0x265d62(0x7ee)][_0x265d62(0x278)],Game_Actor[_0x265d62(0x7ee)][_0x265d62(0x278)]=function(_0x468c71,_0x18df1e){const _0x4fbbc5=_0x265d62;$gameTemp[_0x4fbbc5(0x302)]=!![],VisuMZ[_0x4fbbc5(0x7f2)][_0x4fbbc5(0x3a6)][_0x4fbbc5(0x58f)](this,_0x468c71,_0x18df1e),$gameTemp[_0x4fbbc5(0x302)]=undefined;},VisuMZ['CoreEngine'][_0x265d62(0x269)]=Game_Actor[_0x265d62(0x7ee)][_0x265d62(0x35a)],Game_Actor[_0x265d62(0x7ee)][_0x265d62(0x35a)]=function(){const _0xd7f95a=_0x265d62;VisuMZ[_0xd7f95a(0x7f2)]['Game_Actor_levelUp'][_0xd7f95a(0x58f)](this);if(!$gameTemp[_0xd7f95a(0x302)])this[_0xd7f95a(0x470)]();},Game_Actor['prototype']['levelUpRecovery']=function(){const _0x41da79=_0x265d62;this['_cache']={};if(VisuMZ['CoreEngine'][_0x41da79(0x68a)][_0x41da79(0x6b6)][_0x41da79(0x718)])this[_0x41da79(0x2d8)]=this[_0x41da79(0x655)];if(VisuMZ[_0x41da79(0x7f2)][_0x41da79(0x68a)][_0x41da79(0x6b6)][_0x41da79(0x312)])this[_0x41da79(0x142)]=this['mmp'];},Game_Actor['prototype']['expRate']=function(){const _0x16111d=_0x265d62;if(this[_0x16111d(0x44b)]())return 0x1;const _0x550c21=this['nextLevelExp']()-this['currentLevelExp'](),_0x1fd652=this[_0x16111d(0x1d2)]()-this[_0x16111d(0x295)]();return(_0x1fd652/_0x550c21)['clamp'](0x0,0x1);},Game_Actor['prototype']['traitObjects']=function(){const _0x3da268=_0x265d62,_0xa82e71=Game_Battler[_0x3da268(0x7ee)]['traitObjects'][_0x3da268(0x58f)](this);for(const _0x5f1645 of this[_0x3da268(0x6ee)]()){if(_0x3da268(0x723)===_0x3da268(0x40f))return[0x25,0x26,0x27,0x28][_0x3da268(0x313)](this[_0x3da268(0x813)]);else _0x5f1645&&(_0x3da268(0x136)===_0x3da268(0x3e9)?(_0x14eed1+=_0x12d87d+'\x0a',_0x1207a3+=_0x3da268(0x838),_0x4f2559[_0x3da268(0x6b4)][0x4]!==''&&_0x13cfa7['parameters'][0x4]!==_0x375b51&&(_0x256153+=_0x3da268(0x557)[_0x3da268(0x807)](_0x331618['parameters'][0x4]))):_0xa82e71[_0x3da268(0x7d0)](_0x5f1645));}return _0xa82e71[_0x3da268(0x7d0)](this[_0x3da268(0x80f)](),this[_0x3da268(0x2a3)]()),_0xa82e71;},Object['defineProperty'](Game_Enemy['prototype'],_0x265d62(0x213),{'get':function(){const _0x205322=_0x265d62;return this[_0x205322(0x5bb)]();},'configurable':!![]}),Game_Enemy[_0x265d62(0x7ee)][_0x265d62(0x5bb)]=function(){const _0x300ea2=_0x265d62;return this[_0x300ea2(0x46b)]()[_0x300ea2(0x213)];},Game_Enemy[_0x265d62(0x7ee)][_0x265d62(0x1a3)]=function(){const _0x4c8b95=_0x265d62;if(!this[_0x4c8b95(0x436)]){if(_0x4c8b95(0x610)!==_0x4c8b95(0x610)){var _0x299744=_0x17808f(_0x5c73fe['$1']);try{_0x59934b*=_0x597e30(_0x299744);}catch(_0x3b449a){if(_0x167c65[_0x4c8b95(0x510)]())_0x29b7ba[_0x4c8b95(0x77f)](_0x3b449a);}}else{this[_0x4c8b95(0x8bb)]+=Math[_0x4c8b95(0x1bd)]((Graphics[_0x4c8b95(0x4ec)]-0x270)/0x2),this['_screenY']-=Math[_0x4c8b95(0x8a0)]((Graphics[_0x4c8b95(0x4ec)]-Graphics[_0x4c8b95(0x8d2)])/0x2);if($gameSystem[_0x4c8b95(0x147)]())this['_screenX']-=Math['floor']((Graphics[_0x4c8b95(0x3f1)]-Graphics[_0x4c8b95(0x60c)])/0x2);else{if(_0x4c8b95(0x2f8)===_0x4c8b95(0x2f8))this['_screenX']+=Math[_0x4c8b95(0x1bd)]((Graphics[_0x4c8b95(0x60c)]-0x330)/0x2);else return!![];}}}this['_repositioned']=!![];},Game_Party[_0x265d62(0x7ee)][_0x265d62(0x554)]=function(){const _0x5e9480=_0x265d62;return VisuMZ[_0x5e9480(0x7f2)][_0x5e9480(0x68a)][_0x5e9480(0x24f)]['GoldMax'];},VisuMZ[_0x265d62(0x7f2)]['Game_Party_consumeItem']=Game_Party[_0x265d62(0x7ee)][_0x265d62(0x244)],Game_Party[_0x265d62(0x7ee)]['consumeItem']=function(_0x554712){const _0x22f253=_0x265d62;if(VisuMZ[_0x22f253(0x7f2)][_0x22f253(0x68a)][_0x22f253(0x6b6)][_0x22f253(0x85c)]&&DataManager[_0x22f253(0x427)](_0x554712))return;VisuMZ[_0x22f253(0x7f2)]['Game_Party_consumeItem'][_0x22f253(0x58f)](this,_0x554712);},Game_Party[_0x265d62(0x7ee)][_0x265d62(0x643)]=function(){const _0x101bb7=_0x265d62,_0x56fdf7=VisuMZ[_0x101bb7(0x7f2)][_0x101bb7(0x68a)][_0x101bb7(0x6b6)],_0x3988ed=_0x56fdf7[_0x101bb7(0x89f)]??0x63;let _0x550b27=[];(_0x56fdf7[_0x101bb7(0x399)]??!![])&&(_0x550b27=_0x550b27[_0x101bb7(0x200)]($dataItems));(_0x56fdf7[_0x101bb7(0x2cf)]??!![])&&(_0x550b27=_0x550b27[_0x101bb7(0x200)]($dataWeapons));(_0x56fdf7[_0x101bb7(0x7c9)]??!![])&&(_0x550b27=_0x550b27[_0x101bb7(0x200)]($dataArmors));for(const _0x13f71b of _0x550b27){if(!_0x13f71b)continue;if(_0x13f71b[_0x101bb7(0x3e6)][_0x101bb7(0x1b2)]()<=0x0)continue;if(_0x13f71b[_0x101bb7(0x3e6)][_0x101bb7(0x695)](/-----/i))continue;this[_0x101bb7(0x316)](_0x13f71b,_0x3988ed);}},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x803)]=Game_Troop[_0x265d62(0x7ee)][_0x265d62(0x432)],Game_Troop[_0x265d62(0x7ee)]['setup']=function(_0x35c49a){const _0x123cd8=_0x265d62;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0x123cd8(0x792)](_0x35c49a),VisuMZ[_0x123cd8(0x7f2)][_0x123cd8(0x803)][_0x123cd8(0x58f)](this,_0x35c49a);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x88b)]=Game_Map[_0x265d62(0x7ee)][_0x265d62(0x432)],Game_Map[_0x265d62(0x7ee)][_0x265d62(0x432)]=function(_0x1f479a){const _0x11112c=_0x265d62;VisuMZ[_0x11112c(0x7f2)][_0x11112c(0x88b)][_0x11112c(0x58f)](this,_0x1f479a),this[_0x11112c(0x3db)](_0x1f479a);},Game_Map[_0x265d62(0x7ee)][_0x265d62(0x3db)]=function(){const _0x3f428b=_0x265d62;this[_0x3f428b(0x721)]=VisuMZ[_0x3f428b(0x7f2)][_0x3f428b(0x68a)][_0x3f428b(0x6b6)]['NoTileShadows']||![];if($dataMap&&$dataMap[_0x3f428b(0x45a)]){if($dataMap[_0x3f428b(0x45a)][_0x3f428b(0x695)](/<SHOW TILE SHADOWS>/i))this[_0x3f428b(0x721)]=![];if($dataMap[_0x3f428b(0x45a)][_0x3f428b(0x695)](/<HIDE TILE SHADOWS>/i))this[_0x3f428b(0x721)]=!![];}},Game_Map['prototype']['areTileShadowsHidden']=function(){const _0x525382=_0x265d62;if(this[_0x525382(0x721)]===undefined)this[_0x525382(0x3db)]();return this[_0x525382(0x721)];},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x404)]=Game_Character['prototype'][_0x265d62(0x250)],Game_Character['prototype'][_0x265d62(0x250)]=function(_0xabea7){const _0x10444d=_0x265d62;try{VisuMZ[_0x10444d(0x7f2)][_0x10444d(0x404)]['call'](this,_0xabea7);}catch(_0x24c30d){if($gameTemp[_0x10444d(0x510)]())console['log'](_0x24c30d);}},Game_Player[_0x265d62(0x7ee)][_0x265d62(0x493)]=function(){const _0x1b9ea2=_0x265d62,_0x4d8d23=$gameMap[_0x1b9ea2(0x4d4)]();this[_0x1b9ea2(0x4d0)]=Math[_0x1b9ea2(0x4ac)](_0x4d8d23)+Math[_0x1b9ea2(0x4ac)](_0x4d8d23)+this[_0x1b9ea2(0x4a7)]();},Game_Player['prototype']['encounterStepsMinimum']=function(){const _0x3fa52b=_0x265d62;return $dataMap&&$dataMap[_0x3fa52b(0x45a)]&&$dataMap[_0x3fa52b(0x45a)][_0x3fa52b(0x695)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?_0x3fa52b(0x3bd)==='Atcuk'?Number(RegExp['$1']):_0x14f187[_0x3fa52b(0x7f2)][_0x3fa52b(0x68a)][_0x3fa52b(0x617)][_0x3fa52b(0x76f)]:VisuMZ['CoreEngine'][_0x3fa52b(0x68a)][_0x3fa52b(0x6b6)]['EncounterRateMinimum'];},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x63a)]=Game_Event['prototype'][_0x265d62(0x18f)],Game_Event[_0x265d62(0x7ee)]['isCollidedWithEvents']=function(_0x4acaae,_0x3437c2){const _0x5eac61=_0x265d62;return this['isSmartEventCollisionOn']()?this['checkSmartEventCollision'](_0x4acaae,_0x3437c2):VisuMZ['CoreEngine']['Game_Event_isCollidedWithEvents'][_0x5eac61(0x58f)](this,_0x4acaae,_0x3437c2);},Game_Event[_0x265d62(0x7ee)][_0x265d62(0x30f)]=function(){const _0x580774=_0x265d62;return VisuMZ['CoreEngine'][_0x580774(0x68a)][_0x580774(0x6b6)][_0x580774(0x288)];},Game_Event[_0x265d62(0x7ee)]['checkSmartEventCollision']=function(_0x4ee5a8,_0xba6c47){const _0x3b3d26=_0x265d62;if(!this[_0x3b3d26(0x383)]())return![];else{if(_0x3b3d26(0x78e)!==_0x3b3d26(0x188)){const _0x41208f=$gameMap['eventsXyNt'](_0x4ee5a8,_0xba6c47)[_0x3b3d26(0x802)](_0x5b94af=>_0x5b94af['isNormalPriority']());return _0x41208f['length']>0x0;}else{if(this['_mode']===_0x3b3d26(0x637)&&!_0x287e56[_0x3b3d26(0x443)]())return;if(_0x15dc75[_0x3b3d26(0x11b)]())return;_0x518861[_0x3b3d26(0x7f2)]['Window_NameInput_cursorDown'][_0x3b3d26(0x58f)](this,_0x5dce28),this['switchModes']('default');}}},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x329)]=Game_Interpreter['prototype'][_0x265d62(0x588)],Game_Interpreter[_0x265d62(0x7ee)][_0x265d62(0x588)]=function(_0x2d5825){const _0xab4bf5=_0x265d62,_0x50c570=this[_0xab4bf5(0x654)]();if(_0x50c570[_0xab4bf5(0x695)](/\/\/[ ]SCRIPT[ ]CALL/i))return this['runCombinedScrollingTextAsCode'](_0x50c570);else{if(_0xab4bf5(0x323)===_0xab4bf5(0x323))return VisuMZ['CoreEngine']['Game_Interpreter_command105'][_0xab4bf5(0x58f)](this,_0x2d5825);else this['_helpWindow']['setBackgroundType'](_0x431a13['layoutSettings']['HelpBgType']);}},Game_Interpreter[_0x265d62(0x7ee)]['getCombinedScrollingText']=function(){const _0x394ea9=_0x265d62;let _0xf213f0='',_0x123f8d=this[_0x394ea9(0x832)]+0x1;while(this[_0x394ea9(0x727)][_0x123f8d]&&this[_0x394ea9(0x727)][_0x123f8d]['code']===0x195){_0x394ea9(0x51e)!==_0x394ea9(0x51e)?_0x3599e0[_0x394ea9(0x5c5)](_0x241e70):(_0xf213f0+=this['_list'][_0x123f8d][_0x394ea9(0x6b4)][0x0]+'\x0a',_0x123f8d++);}return _0xf213f0;},Game_Interpreter[_0x265d62(0x7ee)][_0x265d62(0x477)]=function(_0x3270dd){const _0x115245=_0x265d62;try{if(_0x115245(0x629)==='jQwSr')eval(_0x3270dd);else{let _0xd58c33=0x0;for(const _0x35eae1 of _0x5c41da[_0x115245(0x7f2)][_0x115245(0x68a)][_0x115245(0x346)]['DisplayedParams']){const _0x445e49=this['itemPadding'](),_0x2be7c3=this[_0x115245(0x277)](_0xd58c33);this['drawItem'](_0x445e49,_0x2be7c3,_0x35eae1),_0xd58c33++;}}}catch(_0x449bd9){'IVnsH'===_0x115245(0x771)?_0x1bdab9[_0x115245(0x7a9)](_0x115245(0x652))&&_0x2a4bb0[_0x115245(0x7f2)][_0x115245(0x68a)]['QoL'][_0x115245(0x6bf)]?this['startAutoNewGame']():_0x38a4f5[_0x115245(0x7f2)][_0x115245(0x4eb)][_0x115245(0x58f)](this):$gameTemp[_0x115245(0x510)]()&&(console['log']('Show\x20Scrolling\x20Text\x20Script\x20Error'),console[_0x115245(0x77f)](_0x449bd9));}return!![];},VisuMZ['CoreEngine'][_0x265d62(0x28e)]=Game_Interpreter['prototype'][_0x265d62(0x78f)],Game_Interpreter[_0x265d62(0x7ee)]['command111']=function(_0x290a01){const _0xc17550=_0x265d62;try{if(_0xc17550(0x6b8)===_0xc17550(0x6b8))VisuMZ['CoreEngine']['Game_Interpreter_command111']['call'](this,_0x290a01);else{if(_0x4fc9e4)throw _0x521e33;else _0x40c6a0&&_0x30d3ca(_0xc17550(0x535)[_0xc17550(0x807)](_0x12eb4d));}}catch(_0x45dfab){if('gaWwT'!==_0xc17550(0x42e))return _0x2ae104;else $gameTemp[_0xc17550(0x510)]()&&(_0xc17550(0x744)!==_0xc17550(0x744)?(this[_0xc17550(0x246)]([_0x377d93],_0x420aa6,_0x2a43e7,_0x52e27a,_0x50e132),_0x4fb2e5+=_0x4a3274):(console[_0xc17550(0x77f)](_0xc17550(0x7d8)),console[_0xc17550(0x77f)](_0x45dfab))),this['skipBranch']();}return!![];},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x5b0)]=Game_Interpreter[_0x265d62(0x7ee)][_0x265d62(0x789)],Game_Interpreter[_0x265d62(0x7ee)][_0x265d62(0x789)]=function(_0x4f455b){const _0x2b8492=_0x265d62;try{VisuMZ[_0x2b8492(0x7f2)][_0x2b8492(0x5b0)]['call'](this,_0x4f455b);}catch(_0x5cfed4){_0x2b8492(0x137)===_0x2b8492(0x866)?(this['_backgroundFilter']=new _0x4d1cec[(_0x2b8492(0x37c))][(_0x2b8492(0x712))](_0x307282=!![]),this[_0x2b8492(0x6ab)]=new _0x42e853(),this[_0x2b8492(0x6ab)]['bitmap']=_0x22021f[_0x2b8492(0x541)](),this[_0x2b8492(0x6ab)][_0x2b8492(0x37c)]=[this[_0x2b8492(0x8c9)]],this[_0x2b8492(0x158)](this[_0x2b8492(0x6ab)]),this[_0x2b8492(0x74f)](0xc0),this[_0x2b8492(0x74f)](this[_0x2b8492(0x35d)]()),this['createCustomBackgroundImages']()):$gameTemp[_0x2b8492(0x510)]()&&(console[_0x2b8492(0x77f)](_0x2b8492(0x77c)),console[_0x2b8492(0x77f)](_0x5cfed4));}return!![];},VisuMZ['CoreEngine'][_0x265d62(0x6d6)]=Game_Interpreter['prototype'][_0x265d62(0x8a8)],Game_Interpreter[_0x265d62(0x7ee)][_0x265d62(0x8a8)]=function(){const _0x1d5d88=_0x265d62;try{VisuMZ[_0x1d5d88(0x7f2)][_0x1d5d88(0x6d6)][_0x1d5d88(0x58f)](this);}catch(_0xa6d351){if(_0x1d5d88(0x398)===_0x1d5d88(0x6e3)){_0x58d8f9[_0x1d5d88(0x36d)]=_0x1a50b0(_0x4a91c9['$1']);if(_0x451293[_0x1d5d88(0x36d)]===0x0)_0x5a6841['maxLevel']=_0x453631[_0x1d5d88(0x605)];}else{if($gameTemp[_0x1d5d88(0x510)]()){if(_0x1d5d88(0x29a)!==_0x1d5d88(0x29a)){const _0xac19e7=_0x30d9ee['CoreEngine'][_0x1d5d88(0x68a)][_0x1d5d88(0x562)];if(_0xac19e7&&_0xac19e7[_0x1d5d88(0x61e)])return _0xac19e7[_0x1d5d88(0x61e)][_0x1d5d88(0x58f)](this);const _0x31bca9=_0x4123b0[_0x1d5d88(0x625)]*0.75,_0x466959=_0x44a448[_0x1d5d88(0x881)]*0.6,_0x57e4d9=_0x546ea8[_0x1d5d88(0x5ee)];this['x']+=_0xe0423c['round'](_0x12d2ac[_0x1d5d88(0x4ac)](_0x31bca9)-_0x59da0b[_0x1d5d88(0x4ac)](_0x466959))*(_0x7860a5[_0x1d5d88(0x16b)](_0x57e4d9,0x1e)*0.5);}else console[_0x1d5d88(0x77f)]('Script\x20Call\x20Error'),console[_0x1d5d88(0x77f)](_0xa6d351);}}}return!![];},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x37e)]=Game_Interpreter[_0x265d62(0x7ee)][_0x265d62(0x1b9)],Game_Interpreter[_0x265d62(0x7ee)][_0x265d62(0x1b9)]=function(_0x2ace22){const _0x175f1a=_0x265d62;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x175f1a(0x7f2)]['Game_Interpreter_PluginCommand'][_0x175f1a(0x58f)](this,_0x2ace22);},Scene_Base[_0x265d62(0x7ee)]['fadeSpeed']=function(){const _0x559c35=_0x265d62;return VisuMZ[_0x559c35(0x7f2)]['Settings']['UI'][_0x559c35(0x37d)];},Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x849)]=function(){const _0x1771cb=_0x265d62;return VisuMZ[_0x1771cb(0x7f2)]['Settings']['UI'][_0x1771cb(0x7d3)];},Scene_Base[_0x265d62(0x7ee)]['isBottomButtonMode']=function(){const _0x36785b=_0x265d62;return VisuMZ['CoreEngine'][_0x36785b(0x68a)]['UI'][_0x36785b(0x658)];},Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x2b2)]=function(){const _0x51a690=_0x265d62;return VisuMZ[_0x51a690(0x7f2)]['Settings']['UI'][_0x51a690(0x2bc)];},Scene_Base['prototype'][_0x265d62(0x220)]=function(){const _0x37577e=_0x265d62;return VisuMZ['CoreEngine'][_0x37577e(0x68a)]['UI']['CommandWidth'];},Scene_Base['prototype'][_0x265d62(0x396)]=function(){const _0x199d76=_0x265d62;return VisuMZ[_0x199d76(0x7f2)][_0x199d76(0x68a)]['UI'][_0x199d76(0x575)];},Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x1e5)]=function(){const _0x17ee86=_0x265d62;return VisuMZ[_0x17ee86(0x7f2)][_0x17ee86(0x68a)][_0x17ee86(0x590)][_0x17ee86(0x8ba)];},VisuMZ['CoreEngine'][_0x265d62(0x4c6)]=Scene_Base[_0x265d62(0x7ee)]['createWindowLayer'],Scene_Base['prototype'][_0x265d62(0x64b)]=function(){const _0x54ff2c=_0x265d62;VisuMZ['CoreEngine']['Scene_Base_createWindowLayer']['call'](this),this['createButtonAssistWindow'](),this[_0x54ff2c(0x7a8)]['x']=Math[_0x54ff2c(0x1bd)](this[_0x54ff2c(0x7a8)]['x']),this[_0x54ff2c(0x7a8)]['y']=Math[_0x54ff2c(0x1bd)](this[_0x54ff2c(0x7a8)]['y']);},Scene_Base['prototype'][_0x265d62(0x81a)]=function(){},Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x14b)]=function(){const _0x32b5b6=_0x265d62;return TextManager[_0x32b5b6(0x4e5)](_0x32b5b6(0x24a),'pagedown');},Scene_Base[_0x265d62(0x7ee)]['buttonAssistKey2']=function(){const _0x89466b=_0x265d62;return TextManager[_0x89466b(0x433)](_0x89466b(0x49e));},Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x754)]=function(){const _0x210a48=_0x265d62;return TextManager[_0x210a48(0x433)](_0x210a48(0x154));},Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x5e2)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x54e)]=function(){const _0x6b6661=_0x265d62;return TextManager['getInputButtonString'](_0x6b6661(0x5fe));},Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x653)]=function(){const _0x18746f=_0x265d62;if(this[_0x18746f(0x667)]&&this[_0x18746f(0x667)]['visible']){if(_0x18746f(0x84a)==='DSXFv')this[_0x18746f(0x6d1)]=0x2;else return TextManager[_0x18746f(0x22a)];}else{if(_0x18746f(0x5e1)===_0x18746f(0x5e1))return'';else{const _0x9cde97=_0x43d449('fs');let _0x5a246c=_0x18746f(0x6c0)['format'](_0xbd2de8||'0');_0x9cde97['writeFile'](_0x5a246c,_0x41f26e,_0x1437a5=>{const _0x42d991=_0x18746f;if(_0x1437a5)throw _0x50c2b1;else _0x2cc98d&&_0x3b6eb3(_0x42d991(0x535)[_0x42d991(0x807)](_0x5a246c));});}}},Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x601)]=function(){return'';},Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x274)]=function(){return'';},Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x20a)]=function(){const _0x1bec19=_0x265d62;return TextManager[_0x1bec19(0x50e)];},Scene_Base['prototype'][_0x265d62(0x5d0)]=function(){return TextManager['buttonAssistCancel'];},Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x371)]=function(){return 0x0;},Scene_Base[_0x265d62(0x7ee)]['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x808)]=function(){return 0x0;},Scene_Base['prototype'][_0x265d62(0x67e)]=function(){return 0x0;},Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x716)]=function(){return 0x0;},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x1c9)]=Scene_Boot[_0x265d62(0x7ee)][_0x265d62(0x110)],Scene_Boot[_0x265d62(0x7ee)][_0x265d62(0x110)]=function(){const _0x5e84f2=_0x265d62;VisuMZ[_0x5e84f2(0x7f2)][_0x5e84f2(0x1c9)][_0x5e84f2(0x58f)](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x265d62(0x7ee)][_0x265d62(0x184)]=function(){const _0x526b04=_0x265d62,_0x1fba0d=[_0x526b04(0x43e),_0x526b04(0x709),'battlebacks2','characters','enemies',_0x526b04(0x406),_0x526b04(0x777),'pictures','sv_actors','sv_enemies',_0x526b04(0x180),_0x526b04(0x32a),_0x526b04(0x27f),_0x526b04(0x309)];for(const _0x59af36 of _0x1fba0d){const _0x3152ca=VisuMZ[_0x526b04(0x7f2)][_0x526b04(0x68a)][_0x526b04(0x248)][_0x59af36],_0x5dda11=_0x526b04(0x70e)[_0x526b04(0x807)](_0x59af36);for(const _0x4d721e of _0x3152ca){if(_0x526b04(0x1cc)===_0x526b04(0x1cc))ImageManager[_0x526b04(0x52a)](_0x5dda11,_0x4d721e);else{if(_0x51cbb7)_0x382cd5[_0x526b04(0x459)]();_0x25dfa8['CoreEngine'][_0x526b04(0x8d1)][_0x526b04(0x58f)](this);}}}},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x4eb)]=Scene_Boot['prototype'][_0x265d62(0x3c0)],Scene_Boot[_0x265d62(0x7ee)][_0x265d62(0x3c0)]=function(){const _0x3db971=_0x265d62;if(Utils[_0x3db971(0x7a9)](_0x3db971(0x652))&&VisuMZ[_0x3db971(0x7f2)][_0x3db971(0x68a)][_0x3db971(0x6b6)][_0x3db971(0x6bf)]){if(_0x3db971(0x1f8)!==_0x3db971(0x56a))this['startAutoNewGame']();else{const _0x94fbbf=_0x4c518d[_0x3db971(0x5af)]?(_0x165837[_0x3db971(0x7ee)]['blockWidth']()+0x6)*0x2:0x0,_0x330d18=this[_0x3db971(0x46a)](),_0x2fdbca=_0x2e798c[_0x3db971(0x60c)]-_0x94fbbf*0x2,_0x33ae7a=this[_0x3db971(0x396)]();return new _0x3bdbee(_0x94fbbf,_0x330d18,_0x2fdbca,_0x33ae7a);}}else VisuMZ['CoreEngine']['Scene_Boot_startNormalGame'][_0x3db971(0x58f)](this);},Scene_Boot[_0x265d62(0x7ee)]['startAutoNewGame']=function(){const _0x40afb2=_0x265d62;DataManager[_0x40afb2(0x122)](),SceneManager[_0x40afb2(0x773)](Scene_Map);},Scene_Boot[_0x265d62(0x7ee)][_0x265d62(0x63d)]=function(){const _0x15b96d=_0x265d62,_0x5c5dd5=$dataSystem['advanced']['uiAreaWidth'],_0x12d007=$dataSystem[_0x15b96d(0x48f)][_0x15b96d(0x225)],_0x1e5004=VisuMZ['CoreEngine'][_0x15b96d(0x68a)]['UI']['BoxMargin'];Graphics[_0x15b96d(0x60c)]=_0x5c5dd5-_0x1e5004*0x2,Graphics[_0x15b96d(0x8d2)]=_0x12d007-_0x1e5004*0x2,this[_0x15b96d(0x834)]();},VisuMZ[_0x265d62(0x7f2)]['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x265d62(0x7ee)][_0x265d62(0x7ef)],Scene_Boot[_0x265d62(0x7ee)][_0x265d62(0x7ef)]=function(){const _0x405589=_0x265d62;if(this[_0x405589(0x533)]())this[_0x405589(0x1b0)]();else{if(_0x405589(0x1b5)!=='rVuQw')return _0x578a98[_0x405589(0x891)]['StatusParamsRect'][_0x405589(0x58f)](this);else VisuMZ[_0x405589(0x7f2)][_0x405589(0x8cb)][_0x405589(0x58f)](this);}},Scene_Boot['prototype']['isFullDocumentTitle']=function(){const _0xf2b597=_0x265d62;if(Scene_Title[_0xf2b597(0x5b1)]==='')return![];if(Scene_Title[_0xf2b597(0x5b1)]==='Subtitle')return![];if(Scene_Title['version']==='')return![];if(Scene_Title['version']==='0.00')return![];return!![];},Scene_Boot['prototype'][_0x265d62(0x1b0)]=function(){const _0x250447=_0x265d62,_0x240970=$dataSystem[_0x250447(0x681)],_0x418c54=Scene_Title[_0x250447(0x5b1)]||'',_0x27051f=Scene_Title[_0x250447(0x544)]||'',_0x986d2c=VisuMZ['CoreEngine']['Settings'][_0x250447(0x123)][_0x250447(0x66e)][_0x250447(0x468)],_0x4d993d=_0x986d2c[_0x250447(0x807)](_0x240970,_0x418c54,_0x27051f);document['title']=_0x4d993d;},Scene_Boot[_0x265d62(0x7ee)][_0x265d62(0x834)]=function(){const _0x4d4680=_0x265d62;if(VisuMZ[_0x4d4680(0x7f2)][_0x4d4680(0x68a)]['UI']['SideButtons']){if('BZtwh'===_0x4d4680(0x75f))_0x17b2ed[_0x4d4680(0x7f2)][_0x4d4680(0x1c9)][_0x4d4680(0x58f)](this),this['loadGameImagesCoreEngine']();else{const _0x1b291e=Graphics[_0x4d4680(0x3f1)]-Graphics[_0x4d4680(0x60c)]-VisuMZ[_0x4d4680(0x7f2)][_0x4d4680(0x68a)]['UI'][_0x4d4680(0x614)]*0x2,_0x537915=Sprite_Button[_0x4d4680(0x7ee)]['blockWidth'][_0x4d4680(0x58f)](this)*0x4;if(_0x1b291e>=_0x537915)SceneManager[_0x4d4680(0x5b2)](!![]);}}},Scene_Title[_0x265d62(0x5b1)]=VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x68a)][_0x265d62(0x123)][_0x265d62(0x66e)][_0x265d62(0x337)],Scene_Title[_0x265d62(0x544)]=VisuMZ['CoreEngine']['Settings'][_0x265d62(0x123)]['Title'][_0x265d62(0x780)],Scene_Title['pictureButtons']=VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x68a)][_0x265d62(0x4cd)],VisuMZ[_0x265d62(0x7f2)]['Scene_Title_drawGameTitle']=Scene_Title[_0x265d62(0x7ee)][_0x265d62(0x82c)],Scene_Title[_0x265d62(0x7ee)][_0x265d62(0x82c)]=function(){const _0x383209=_0x265d62;VisuMZ['CoreEngine'][_0x383209(0x68a)]['MenuLayout']['Title']['drawGameTitle'][_0x383209(0x58f)](this);if(Scene_Title[_0x383209(0x5b1)]!==''&&Scene_Title[_0x383209(0x5b1)]!==_0x383209(0x337))this[_0x383209(0x4e7)]();if(Scene_Title[_0x383209(0x544)]!==''&&Scene_Title['version']!=='0.00')this[_0x383209(0x2ec)]();},Scene_Title[_0x265d62(0x7ee)]['drawGameSubtitle']=function(){const _0x3d6619=_0x265d62;VisuMZ['CoreEngine'][_0x3d6619(0x68a)][_0x3d6619(0x123)][_0x3d6619(0x66e)][_0x3d6619(0x4e7)]['call'](this);},Scene_Title[_0x265d62(0x7ee)][_0x265d62(0x2ec)]=function(){const _0x32b85e=_0x265d62;VisuMZ['CoreEngine']['Settings'][_0x32b85e(0x123)][_0x32b85e(0x66e)][_0x32b85e(0x2ec)][_0x32b85e(0x58f)](this);},Scene_Title[_0x265d62(0x7ee)][_0x265d62(0x334)]=function(){const _0x293e04=_0x265d62;this[_0x293e04(0x806)]();const _0x496dde=$dataSystem[_0x293e04(0x717)][_0x293e04(0x216)],_0x1b35c4=this[_0x293e04(0x3f4)]();this[_0x293e04(0x774)]=new Window_TitleCommand(_0x1b35c4),this[_0x293e04(0x774)][_0x293e04(0x153)](_0x496dde);const _0x2d3e69=this[_0x293e04(0x3f4)]();this[_0x293e04(0x774)][_0x293e04(0x5dd)](_0x2d3e69['x'],_0x2d3e69['y'],_0x2d3e69[_0x293e04(0x3f1)],_0x2d3e69[_0x293e04(0x4ec)]),this['addWindow'](this[_0x293e04(0x774)]);},Scene_Title[_0x265d62(0x7ee)][_0x265d62(0x5d6)]=function(){const _0x562fb6=_0x265d62;if(this[_0x562fb6(0x774)])return this[_0x562fb6(0x774)][_0x562fb6(0x4c8)]();else{if(_0x562fb6(0x63f)===_0x562fb6(0x63f))return VisuMZ[_0x562fb6(0x7f2)][_0x562fb6(0x68a)][_0x562fb6(0x4e8)]['length'];else{if(_0x4fc246&&_0x4cd206[_0x562fb6(0x768)]())return;_0xd44bab[_0x562fb6(0x7f2)][_0x562fb6(0x564)][_0x562fb6(0x58f)](this,_0x53a464,_0x223678,_0x18412c,_0x1a7ba0);}}},Scene_Title[_0x265d62(0x7ee)][_0x265d62(0x3f4)]=function(){const _0x24f37c=_0x265d62;return VisuMZ[_0x24f37c(0x7f2)][_0x24f37c(0x68a)][_0x24f37c(0x123)][_0x24f37c(0x66e)][_0x24f37c(0x410)][_0x24f37c(0x58f)](this);},Scene_Title['prototype'][_0x265d62(0x806)]=function(){const _0x71f35d=_0x265d62;for(const _0x408260 of Scene_Title[_0x71f35d(0x1cf)]){const _0x53b3f3=new Sprite_TitlePictureButton(_0x408260);this[_0x71f35d(0x158)](_0x53b3f3);}},VisuMZ[_0x265d62(0x7f2)]['Scene_Map_initialize']=Scene_Map[_0x265d62(0x7ee)][_0x265d62(0x582)],Scene_Map['prototype'][_0x265d62(0x582)]=function(){const _0xa0505d=_0x265d62;VisuMZ[_0xa0505d(0x7f2)]['Scene_Map_initialize']['call'](this),$gameTemp[_0xa0505d(0x6ec)]();},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x2aa)]=Scene_Map['prototype']['updateMainMultiply'],Scene_Map[_0x265d62(0x7ee)]['updateMainMultiply']=function(){const _0x157daa=_0x265d62;VisuMZ['CoreEngine']['Scene_Map_updateMainMultiply'][_0x157daa(0x58f)](this),$gameTemp[_0x157daa(0x58a)]&&!$gameMessage[_0x157daa(0x437)]()&&(this[_0x157daa(0x6a6)](),SceneManager[_0x157daa(0x7c0)]());},Scene_Map[_0x265d62(0x7ee)][_0x265d62(0x699)]=function(){const _0x15258f=_0x265d62;Scene_Message[_0x15258f(0x7ee)][_0x15258f(0x699)][_0x15258f(0x58f)](this);if(!SceneManager[_0x15258f(0x489)](Scene_Battle)){if(_0x15258f(0x484)!==_0x15258f(0x503))this['_spriteset'][_0x15258f(0x6f4)](),this['_mapNameWindow'][_0x15258f(0x619)](),this[_0x15258f(0x7a8)][_0x15258f(0x892)]=![],SceneManager['snapForBackground']();else return _0x429cee['horzJS'][_0x15258f(0x58f)](this);}$gameScreen['clearZoom']();},VisuMZ[_0x265d62(0x7f2)]['Scene_Map_createMenuButton']=Scene_Map[_0x265d62(0x7ee)][_0x265d62(0x496)],Scene_Map[_0x265d62(0x7ee)][_0x265d62(0x496)]=function(){const _0x167316=_0x265d62;VisuMZ[_0x167316(0x7f2)][_0x167316(0x500)][_0x167316(0x58f)](this),SceneManager['isSideButtonLayout']()&&(_0x167316(0x343)!==_0x167316(0x6fd)?this['moveMenuButtonSideButtonLayout']():(_0x120f3f[_0x167316(0x325)](),_0x23e10b[_0x167316(0x120)](_0x1a27c4[_0x167316(0x664)]),_0x184071['_pictureCoordinatesWindow']=_0x609939));},Scene_Map[_0x265d62(0x7ee)][_0x265d62(0x28c)]=function(){const _0x4c4459=_0x265d62;this[_0x4c4459(0x521)]['x']=Graphics[_0x4c4459(0x60c)]+0x4;},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x5f3)]=Scene_Map[_0x265d62(0x7ee)][_0x265d62(0x464)],Scene_Map[_0x265d62(0x7ee)][_0x265d62(0x464)]=function(){const _0x51bb72=_0x265d62;VisuMZ[_0x51bb72(0x7f2)][_0x51bb72(0x5f3)]['call'](this),this['updateDashToggle']();},Scene_Map[_0x265d62(0x7ee)][_0x265d62(0x59e)]=function(){const _0x1b577e=_0x265d62;Input[_0x1b577e(0x690)]('dashToggle')&&(_0x1b577e(0x877)!=='GNXDt'?(ConfigManager[_0x1b577e(0x79b)]=!ConfigManager[_0x1b577e(0x79b)],ConfigManager['save']()):_0x46b828+=_0x1b577e(0x37a)[_0x1b577e(0x807)](_0x484e08[_0x1b577e(0x6b4)][0x0]));},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x339)]=Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x15a)],Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x15a)]=function(){const _0x50240b=_0x265d62;let _0x5efe26=0x0;SceneManager[_0x50240b(0x447)]()?_0x50240b(0x155)===_0x50240b(0x155)?_0x5efe26=this[_0x50240b(0x56c)]():_0x2bba51[_0x50240b(0x7f2)][_0x50240b(0x68a)][_0x50240b(0x123)]['Title'][_0x50240b(0x4e7)][_0x50240b(0x58f)](this):_0x5efe26=VisuMZ['CoreEngine'][_0x50240b(0x339)]['call'](this);if(this[_0x50240b(0x683)]()&&this[_0x50240b(0x4df)]()===_0x50240b(0x58d)){if(_0x50240b(0x4d3)!==_0x50240b(0x4d3))return _0x5a6eaf&&_0x2bc614[_0x50240b(0x1cd)]?_0x22c1e4[_0x50240b(0x1cd)]['isWindowMaskingEnabled']():!![];else _0x5efe26+=Window_ButtonAssist[_0x50240b(0x7ee)][_0x50240b(0x12e)]();}return _0x5efe26;},Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x56c)]=function(){const _0x59507d=_0x265d62;if(this['isBottomHelpMode']()){if(_0x59507d(0x32b)!=='breIa')_0x36bc69=_0x5ca250[_0x59507d(0x1bd)](_0x494c80),_0x18ba4b=_0x401e7c[_0x59507d(0x1bd)](_0xeaf884),_0x43f163=_0x326b47[_0x59507d(0x1bd)](_0x3d21f2),_0xf7d328[_0x59507d(0x7f2)]['Bitmap_drawCircle'][_0x59507d(0x58f)](this,_0x1f9f39,_0x31580d,_0x2bb43e,_0x4b0f7e),this[_0x59507d(0x3ec)]();else return this[_0x59507d(0x2bb)]();}else{if(_0x59507d(0x4a0)!==_0x59507d(0x4a0))_0x39301a[_0x59507d(0x115)]&&(this[_0x59507d(0x6d1)]=_0x59507d(0x508));else return 0x0;}},VisuMZ[_0x265d62(0x7f2)]['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x265d62(0x7ee)]['mainAreaTop'],Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x355)]=function(){const _0x14e2f0=_0x265d62;return SceneManager[_0x14e2f0(0x447)]()?this['mainAreaTopSideButtonLayout']():VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaTop'][_0x14e2f0(0x58f)](this);},Scene_MenuBase['prototype'][_0x265d62(0x7a3)]=function(){const _0x136485=_0x265d62;return!this['isBottomHelpMode']()?this[_0x136485(0x3e8)]():0x0;},VisuMZ[_0x265d62(0x7f2)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase['prototype']['mainAreaHeight'],Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x602)]=function(){const _0x59e214=_0x265d62;let _0x3cfd2a=0x0;if(SceneManager[_0x59e214(0x447)]())_0x3cfd2a=this[_0x59e214(0x4ce)]();else{if(_0x59e214(0x27c)!==_0x59e214(0x6ef))_0x3cfd2a=VisuMZ[_0x59e214(0x7f2)][_0x59e214(0x1f4)][_0x59e214(0x58f)](this);else{var _0x44be89=_0x53c4d0(_0x5b7cf6['$1']);_0x26ef57*=_0x44be89;}}return this[_0x59e214(0x683)]()&&this[_0x59e214(0x4df)]()!==_0x59e214(0x57f)&&(_0x3cfd2a-=Window_ButtonAssist['prototype'][_0x59e214(0x12e)]()),_0x3cfd2a;},Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x4ce)]=function(){const _0x30a2f7=_0x265d62;return Graphics[_0x30a2f7(0x8d2)]-this['helpAreaHeight']();},VisuMZ[_0x265d62(0x7f2)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x265d62(0x7ee)]['createBackground'],Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x2b4)]=function(){const _0x5d4c7d=_0x265d62;this[_0x5d4c7d(0x8c9)]=new PIXI[(_0x5d4c7d(0x37c))]['BlurFilter'](clamp=!![]),this[_0x5d4c7d(0x6ab)]=new Sprite(),this[_0x5d4c7d(0x6ab)][_0x5d4c7d(0x6cc)]=SceneManager['backgroundBitmap'](),this[_0x5d4c7d(0x6ab)][_0x5d4c7d(0x37c)]=[this[_0x5d4c7d(0x8c9)]],this[_0x5d4c7d(0x158)](this[_0x5d4c7d(0x6ab)]),this['setBackgroundOpacity'](0xc0),this[_0x5d4c7d(0x74f)](this['getBackgroundOpacity']()),this[_0x5d4c7d(0x419)]();},Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x35d)]=function(){const _0x4b28fb=_0x265d62,_0x3df2e0=String(this[_0x4b28fb(0x6bb)][_0x4b28fb(0x3e6)]),_0xdcdca2=this[_0x4b28fb(0x689)](_0x3df2e0);return _0xdcdca2?_0x4b28fb(0x2be)===_0x4b28fb(0x3d9)?_0x1fca7e['areButtonsOutsideMainUI']()?this[_0x4b28fb(0x7a3)]():_0x45a605[_0x4b28fb(0x7f2)][_0x4b28fb(0x1b6)][_0x4b28fb(0x58f)](this):_0xdcdca2['SnapshotOpacity']:_0x4b28fb(0x836)!=='VMRVi'?_0x3e1014[_0x4b28fb(0x1cd)][_0x4b28fb(0x1e5)]():0xc0;},Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x419)]=function(){const _0x272260=_0x265d62,_0x4c2481=String(this[_0x272260(0x6bb)]['name']),_0x23e2dd=this[_0x272260(0x689)](_0x4c2481);_0x23e2dd&&(_0x23e2dd[_0x272260(0x17d)]!==''||_0x23e2dd[_0x272260(0x6b9)]!=='')&&(this[_0x272260(0x61c)]=new Sprite(ImageManager[_0x272260(0x821)](_0x23e2dd[_0x272260(0x17d)])),this['_backSprite2']=new Sprite(ImageManager[_0x272260(0x13f)](_0x23e2dd['BgFilename2'])),this[_0x272260(0x158)](this[_0x272260(0x61c)]),this[_0x272260(0x158)](this['_backSprite2']),this[_0x272260(0x61c)][_0x272260(0x6cc)][_0x272260(0x786)](this[_0x272260(0x44c)]['bind'](this,this[_0x272260(0x61c)])),this[_0x272260(0x38b)][_0x272260(0x6cc)][_0x272260(0x786)](this['adjustSprite']['bind'](this,this[_0x272260(0x38b)])));},Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x689)]=function(_0x3d3024){const _0x180bb4=_0x265d62;return VisuMZ[_0x180bb4(0x7f2)][_0x180bb4(0x68a)][_0x180bb4(0x319)][_0x3d3024]||VisuMZ['CoreEngine'][_0x180bb4(0x68a)][_0x180bb4(0x319)]['Scene_Unlisted'];},Scene_MenuBase['prototype']['adjustSprite']=function(_0x3d5d37){const _0x18e9b2=_0x265d62;this[_0x18e9b2(0x231)](_0x3d5d37),this[_0x18e9b2(0x42c)](_0x3d5d37);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x32f)]=Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x215)],Scene_MenuBase['prototype']['createCancelButton']=function(){const _0x540a15=_0x265d62;VisuMZ['CoreEngine']['Scene_MenuBase_createCancelButton'][_0x540a15(0x58f)](this),SceneManager[_0x540a15(0x8d3)]()&&this[_0x540a15(0x133)]();},Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x133)]=function(){const _0x3799df=_0x265d62;this[_0x3799df(0x755)]['x']=Graphics[_0x3799df(0x60c)]+0x4;},VisuMZ['CoreEngine']['Scene_MenuBase_createPageButtons']=Scene_MenuBase['prototype'][_0x265d62(0x258)],Scene_MenuBase['prototype'][_0x265d62(0x258)]=function(){const _0x3658bb=_0x265d62;VisuMZ[_0x3658bb(0x7f2)]['Scene_MenuBase_createPageButtons'][_0x3658bb(0x58f)](this);if(SceneManager[_0x3658bb(0x8d3)]()){if(_0x3658bb(0x227)===_0x3658bb(0x7e6)){const _0xf28402=_0x10302e[_0x3658bb(0x3c4)]((_0x203a9f-_0x2ad2b6)/_0x50c382,_0x3361d5||'Linear'),_0x24e19a=_0x49a19e[_0x3658bb(0x3c4)]((_0x1e0182-_0x4f8989+0x1)/_0x557a4b,_0x4e54a9||_0x3658bb(0x24b)),_0x3e7850=(_0x882411-_0x5cdd41*_0xf28402)/(0x1-_0xf28402);return _0x3e7850+(_0x41b016-_0x3e7850)*_0x24e19a;}else this[_0x3658bb(0x76b)]();}},Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x76b)]=function(){const _0x1058b9=_0x265d62;this[_0x1058b9(0x667)]['x']=-0x1*(this['_pageupButton'][_0x1058b9(0x3f1)]+this[_0x1058b9(0x264)][_0x1058b9(0x3f1)]+0x8),this[_0x1058b9(0x264)]['x']=-0x1*(this['_pagedownButton'][_0x1058b9(0x3f1)]+0x4);},Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x683)]=function(){const _0x4deac3=_0x265d62;return VisuMZ['CoreEngine'][_0x4deac3(0x68a)][_0x4deac3(0x617)]['Enable'];},Scene_MenuBase[_0x265d62(0x7ee)]['getButtonAssistLocation']=function(){const _0xf82f9c=_0x265d62;return SceneManager[_0xf82f9c(0x8d3)]()||SceneManager[_0xf82f9c(0x5d3)]()?VisuMZ[_0xf82f9c(0x7f2)][_0xf82f9c(0x68a)][_0xf82f9c(0x617)][_0xf82f9c(0x2d5)]:'JkOJU'!==_0xf82f9c(0x526)?_0xf82f9c(0x57f):_0x3f1a91(_0x59670b)[_0xf82f9c(0x28f)](_0x428668,_0x15dc5d);},Scene_MenuBase['prototype']['createButtonAssistWindow']=function(){const _0x18ec7e=_0x265d62;if(!this[_0x18ec7e(0x683)]())return;const _0x42e625=this[_0x18ec7e(0x3c5)]();this[_0x18ec7e(0x5a8)]=new Window_ButtonAssist(_0x42e625),this[_0x18ec7e(0x898)](this[_0x18ec7e(0x5a8)]);},Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x3c5)]=function(){const _0xa69d49=_0x265d62;if(this[_0xa69d49(0x4df)]()===_0xa69d49(0x57f))return this['buttonAssistWindowButtonRect']();else{if(_0xa69d49(0x5d5)!==_0xa69d49(0x6a2))return this[_0xa69d49(0x6d2)]();else this['hideButtonFromView']();}},Scene_MenuBase['prototype'][_0x265d62(0x3a3)]=function(){const _0x548364=_0x265d62,_0x3c67f4=ConfigManager[_0x548364(0x5af)]?(Sprite_Button[_0x548364(0x7ee)]['blockWidth']()+0x6)*0x2:0x0,_0x70a98c=this[_0x548364(0x46a)](),_0x1fc166=Graphics[_0x548364(0x60c)]-_0x3c67f4*0x2,_0x42c8dd=this[_0x548364(0x396)]();return new Rectangle(_0x3c67f4,_0x70a98c,_0x1fc166,_0x42c8dd);},Scene_MenuBase[_0x265d62(0x7ee)][_0x265d62(0x6d2)]=function(){const _0xd06fcc=_0x265d62,_0x5f00a9=Graphics['boxWidth'],_0x4b083c=Window_ButtonAssist[_0xd06fcc(0x7ee)][_0xd06fcc(0x12e)](),_0x5bb816=0x0;let _0x10ccc5=0x0;return this['getButtonAssistLocation']()===_0xd06fcc(0x58d)?_0x10ccc5=0x0:_0x10ccc5=Graphics[_0xd06fcc(0x8d2)]-_0x4b083c,new Rectangle(_0x5bb816,_0x10ccc5,_0x5f00a9,_0x4b083c);},Scene_Menu['layoutSettings']=VisuMZ[_0x265d62(0x7f2)]['Settings'][_0x265d62(0x123)][_0x265d62(0x8ca)],VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x6ca)]=Scene_Menu[_0x265d62(0x7ee)][_0x265d62(0x1dc)],Scene_Menu[_0x265d62(0x7ee)][_0x265d62(0x1dc)]=function(){const _0x492c91=_0x265d62;VisuMZ['CoreEngine']['Scene_Menu_create']['call'](this),this[_0x492c91(0x6c4)]();},Scene_Menu[_0x265d62(0x7ee)][_0x265d62(0x6c4)]=function(){const _0x506d8b=_0x265d62;if(this[_0x506d8b(0x774)]){if(_0x506d8b(0x89c)!=='klWpj')return _0x1ed5b4=_0x5b91cb[_0x506d8b(0x4b3)](/(\d)/gi,(_0x39ca9f,_0x47d8e0)=>_0x506d8b(0x66b)[_0x506d8b(0x807)](_0x233207(_0x47d8e0))),_0x506d8b(0x249)[_0x506d8b(0x807)](_0x318711,_0x303aa9,_0x19ed2b);else this[_0x506d8b(0x774)]['setBackgroundType'](Scene_Menu[_0x506d8b(0x891)]['CommandBgType']);}if(this[_0x506d8b(0x1ea)]){if('haAwa'!==_0x506d8b(0x497)){if(!this[_0x506d8b(0x1dd)]())return;_0x5d0076[_0x506d8b(0x11b)]()?this[_0x506d8b(0x64d)]():_0x104061[_0x506d8b(0x7ee)]['processCursorMove']['call'](this);}else this[_0x506d8b(0x1ea)][_0x506d8b(0x153)](Scene_Menu[_0x506d8b(0x891)]['GoldBgType']);}this['_statusWindow']&&this[_0x506d8b(0x342)][_0x506d8b(0x153)](Scene_Menu[_0x506d8b(0x891)][_0x506d8b(0x262)]);},Scene_Menu[_0x265d62(0x7ee)][_0x265d62(0x3f4)]=function(){const _0x4dc16c=_0x265d62;return Scene_Menu[_0x4dc16c(0x891)]['CommandRect'][_0x4dc16c(0x58f)](this);},Scene_Menu['prototype'][_0x265d62(0x14e)]=function(){const _0x2e5629=_0x265d62;return Scene_Menu[_0x2e5629(0x891)][_0x2e5629(0x150)][_0x2e5629(0x58f)](this);},Scene_Menu[_0x265d62(0x7ee)]['statusWindowRect']=function(){const _0x488071=_0x265d62;return Scene_Menu[_0x488071(0x891)]['StatusRect'][_0x488071(0x58f)](this);},Scene_Item['layoutSettings']=VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x68a)][_0x265d62(0x123)][_0x265d62(0x6ff)],VisuMZ['CoreEngine']['Scene_Item_create']=Scene_Item[_0x265d62(0x7ee)][_0x265d62(0x1dc)],Scene_Item['prototype'][_0x265d62(0x1dc)]=function(){const _0x10de17=_0x265d62;VisuMZ[_0x10de17(0x7f2)][_0x10de17(0x875)][_0x10de17(0x58f)](this),this[_0x10de17(0x6c4)]();},Scene_Item['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x514a5a=_0x265d62;this['_helpWindow']&&this[_0x514a5a(0x455)][_0x514a5a(0x153)](Scene_Item[_0x514a5a(0x891)][_0x514a5a(0x4c7)]);this[_0x514a5a(0x6bc)]&&this[_0x514a5a(0x6bc)][_0x514a5a(0x153)](Scene_Item[_0x514a5a(0x891)][_0x514a5a(0x571)]);this[_0x514a5a(0x5e8)]&&this[_0x514a5a(0x5e8)][_0x514a5a(0x153)](Scene_Item['layoutSettings'][_0x514a5a(0x41a)]);if(this[_0x514a5a(0x83b)]){if('iXnNl'===_0x514a5a(0x2b0))this[_0x514a5a(0x83b)][_0x514a5a(0x153)](Scene_Item['layoutSettings'][_0x514a5a(0x8d0)]);else{if(_0x331bab[_0x514a5a(0x510)]())_0x4b2e1f[_0x514a5a(0x77f)](_0x55f74f);}}},Scene_Item[_0x265d62(0x7ee)][_0x265d62(0x80e)]=function(){const _0x1508ff=_0x265d62;return Scene_Item[_0x1508ff(0x891)][_0x1508ff(0x11a)][_0x1508ff(0x58f)](this);},Scene_Item['prototype'][_0x265d62(0x5fb)]=function(){const _0xf1031f=_0x265d62;return Scene_Item[_0xf1031f(0x891)][_0xf1031f(0x665)]['call'](this);},Scene_Item[_0x265d62(0x7ee)][_0x265d62(0x257)]=function(){const _0x450b1b=_0x265d62;return Scene_Item[_0x450b1b(0x891)][_0x450b1b(0x240)][_0x450b1b(0x58f)](this);},Scene_Item['prototype'][_0x265d62(0x1f9)]=function(){const _0x2648cb=_0x265d62;return Scene_Item[_0x2648cb(0x891)]['ActorRect'][_0x2648cb(0x58f)](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x68a)][_0x265d62(0x123)][_0x265d62(0x15d)],VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x561)]=Scene_Skill['prototype'][_0x265d62(0x1dc)],Scene_Skill[_0x265d62(0x7ee)][_0x265d62(0x1dc)]=function(){const _0x106893=_0x265d62;VisuMZ['CoreEngine'][_0x106893(0x561)]['call'](this),this[_0x106893(0x6c4)]();},Scene_Skill[_0x265d62(0x7ee)][_0x265d62(0x6c4)]=function(){const _0x4cb18b=_0x265d62;if(this[_0x4cb18b(0x455)]){if(_0x4cb18b(0x693)!==_0x4cb18b(0x494))this['_helpWindow'][_0x4cb18b(0x153)](Scene_Skill[_0x4cb18b(0x891)][_0x4cb18b(0x4c7)]);else return _0x48a4a0[_0x4cb18b(0x7f2)][_0x4cb18b(0x68a)][_0x4cb18b(0x1d1)][_0x4cb18b(0x6db)];}this[_0x4cb18b(0x27d)]&&this['_skillTypeWindow']['setBackgroundType'](Scene_Skill['layoutSettings'][_0x4cb18b(0x862)]);if(this[_0x4cb18b(0x342)]){if(_0x4cb18b(0x286)!==_0x4cb18b(0x286)){if(_0xfd57ab['isPlaytest']())_0x38ee4d[_0x4cb18b(0x77f)]('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x4cb18b(0x807)](_0xde5f5d));}else this['_statusWindow'][_0x4cb18b(0x153)](Scene_Skill[_0x4cb18b(0x891)][_0x4cb18b(0x262)]);}this[_0x4cb18b(0x5e8)]&&this['_itemWindow'][_0x4cb18b(0x153)](Scene_Skill[_0x4cb18b(0x891)]['ItemBgType']),this['_actorWindow']&&this['_actorWindow'][_0x4cb18b(0x153)](Scene_Skill[_0x4cb18b(0x891)][_0x4cb18b(0x8d0)]);},Scene_Skill[_0x265d62(0x7ee)][_0x265d62(0x80e)]=function(){const _0x2d7e4e=_0x265d62;return Scene_Skill[_0x2d7e4e(0x891)][_0x2d7e4e(0x11a)][_0x2d7e4e(0x58f)](this);},Scene_Skill[_0x265d62(0x7ee)][_0x265d62(0x6cf)]=function(){const _0x16eb35=_0x265d62;return Scene_Skill[_0x16eb35(0x891)][_0x16eb35(0x39c)]['call'](this);},Scene_Skill[_0x265d62(0x7ee)][_0x265d62(0x2bd)]=function(){const _0xa74551=_0x265d62;return Scene_Skill[_0xa74551(0x891)][_0xa74551(0x552)][_0xa74551(0x58f)](this);},Scene_Skill[_0x265d62(0x7ee)][_0x265d62(0x257)]=function(){const _0x2f15d=_0x265d62;return Scene_Skill[_0x2f15d(0x891)][_0x2f15d(0x240)][_0x2f15d(0x58f)](this);},Scene_Skill[_0x265d62(0x7ee)][_0x265d62(0x1f9)]=function(){const _0x5cab50=_0x265d62;return Scene_Skill[_0x5cab50(0x891)]['ActorRect'][_0x5cab50(0x58f)](this);},Scene_Equip[_0x265d62(0x891)]=VisuMZ[_0x265d62(0x7f2)]['Settings']['MenuLayout'][_0x265d62(0x50c)],VisuMZ[_0x265d62(0x7f2)]['Scene_Equip_create']=Scene_Equip['prototype'][_0x265d62(0x1dc)],Scene_Equip[_0x265d62(0x7ee)]['create']=function(){const _0x537c1b=_0x265d62;VisuMZ[_0x537c1b(0x7f2)]['Scene_Equip_create'][_0x537c1b(0x58f)](this),this[_0x537c1b(0x6c4)]();},Scene_Equip[_0x265d62(0x7ee)][_0x265d62(0x6c4)]=function(){const _0x2a07ba=_0x265d62;this[_0x2a07ba(0x455)]&&this[_0x2a07ba(0x455)][_0x2a07ba(0x153)](Scene_Equip[_0x2a07ba(0x891)][_0x2a07ba(0x4c7)]);this[_0x2a07ba(0x342)]&&this[_0x2a07ba(0x342)]['setBackgroundType'](Scene_Equip[_0x2a07ba(0x891)][_0x2a07ba(0x262)]);this[_0x2a07ba(0x774)]&&this[_0x2a07ba(0x774)]['setBackgroundType'](Scene_Equip[_0x2a07ba(0x891)]['CommandBgType']);if(this[_0x2a07ba(0x389)]){if(_0x2a07ba(0x536)===_0x2a07ba(0x191)){try{_0x518ff0['CoreEngine'][_0x2a07ba(0x28e)][_0x2a07ba(0x58f)](this,_0x44057c);}catch(_0x26393d){_0x16a74c[_0x2a07ba(0x510)]()&&(_0x2e24ed[_0x2a07ba(0x77f)]('Conditional\x20Branch\x20Script\x20Error'),_0x4461d2[_0x2a07ba(0x77f)](_0x26393d)),this[_0x2a07ba(0x307)]();}return!![];}else this[_0x2a07ba(0x389)][_0x2a07ba(0x153)](Scene_Equip[_0x2a07ba(0x891)]['SlotBgType']);}this[_0x2a07ba(0x5e8)]&&this[_0x2a07ba(0x5e8)][_0x2a07ba(0x153)](Scene_Equip[_0x2a07ba(0x891)][_0x2a07ba(0x41a)]);},Scene_Equip[_0x265d62(0x7ee)][_0x265d62(0x80e)]=function(){const _0x3441cf=_0x265d62;return Scene_Equip[_0x3441cf(0x891)][_0x3441cf(0x11a)]['call'](this);},Scene_Equip[_0x265d62(0x7ee)]['statusWindowRect']=function(){const _0x1b6162=_0x265d62;return Scene_Equip[_0x1b6162(0x891)][_0x1b6162(0x552)]['call'](this);},Scene_Equip[_0x265d62(0x7ee)][_0x265d62(0x3f4)]=function(){const _0x2b59e5=_0x265d62;return Scene_Equip[_0x2b59e5(0x891)][_0x2b59e5(0x410)][_0x2b59e5(0x58f)](this);},Scene_Equip[_0x265d62(0x7ee)][_0x265d62(0x545)]=function(){const _0x31c565=_0x265d62;return Scene_Equip['layoutSettings']['SlotRect'][_0x31c565(0x58f)](this);},Scene_Equip[_0x265d62(0x7ee)][_0x265d62(0x257)]=function(){const _0x5294cc=_0x265d62;return Scene_Equip[_0x5294cc(0x891)][_0x5294cc(0x240)][_0x5294cc(0x58f)](this);},Scene_Status['layoutSettings']=VisuMZ['CoreEngine'][_0x265d62(0x68a)][_0x265d62(0x123)]['StatusMenu'],VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x6d9)]=Scene_Status[_0x265d62(0x7ee)]['create'],Scene_Status[_0x265d62(0x7ee)][_0x265d62(0x1dc)]=function(){const _0x87ae07=_0x265d62;VisuMZ[_0x87ae07(0x7f2)][_0x87ae07(0x6d9)][_0x87ae07(0x58f)](this),this[_0x87ae07(0x6c4)]();},Scene_Status[_0x265d62(0x7ee)][_0x265d62(0x6c4)]=function(){const _0x44214d=_0x265d62;if(this[_0x44214d(0x283)]){if(_0x44214d(0x568)!==_0x44214d(0x817))this['_profileWindow'][_0x44214d(0x153)](Scene_Status[_0x44214d(0x891)][_0x44214d(0x1a0)]);else return this['_pointAnimationSprites'][_0x44214d(0x33a)]>0x0;}this[_0x44214d(0x342)]&&(_0x44214d(0x16e)!=='nifoZ'?_0x111ad8[_0x44214d(0x4f4)]=_0x259cd1[_0x44214d(0x78c)]['NEAREST']:this[_0x44214d(0x342)]['setBackgroundType'](Scene_Status[_0x44214d(0x891)][_0x44214d(0x262)])),this[_0x44214d(0x56b)]&&this['_statusParamsWindow'][_0x44214d(0x153)](Scene_Status[_0x44214d(0x891)][_0x44214d(0x60b)]),this['_statusEquipWindow']&&(_0x44214d(0x77b)!=='JzkFS'?this[_0x44214d(0x161)][_0x44214d(0x153)](Scene_Status[_0x44214d(0x891)]['StatusEquipBgType']):this[_0x44214d(0x1c3)]['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x44214d(0x289)](_0x24a9ef(_0x21c67e['$1'])):_0x4121e1[_0x44214d(0x7f2)][_0x44214d(0x7a2)][_0x44214d(0x58f)](this));},Scene_Status['prototype']['profileWindowRect']=function(){const _0x5a6bc3=_0x265d62;return Scene_Status[_0x5a6bc3(0x891)][_0x5a6bc3(0x51d)][_0x5a6bc3(0x58f)](this);},Scene_Status['prototype'][_0x265d62(0x2bd)]=function(){const _0x2b3d6c=_0x265d62;return Scene_Status[_0x2b3d6c(0x891)][_0x2b3d6c(0x552)][_0x2b3d6c(0x58f)](this);},Scene_Status[_0x265d62(0x7ee)][_0x265d62(0x2c5)]=function(){const _0x3914e7=_0x265d62;return Scene_Status[_0x3914e7(0x891)][_0x3914e7(0x702)]['call'](this);},Scene_Status[_0x265d62(0x7ee)][_0x265d62(0x15c)]=function(){const _0x3c92fe=_0x265d62;return Scene_Status['layoutSettings'][_0x3c92fe(0x14a)][_0x3c92fe(0x58f)](this);},Scene_Options['layoutSettings']=VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x68a)][_0x265d62(0x123)][_0x265d62(0x485)],VisuMZ['CoreEngine']['Scene_Options_create']=Scene_Options[_0x265d62(0x7ee)][_0x265d62(0x1dc)],Scene_Options[_0x265d62(0x7ee)][_0x265d62(0x1dc)]=function(){const _0x551d04=_0x265d62;VisuMZ[_0x551d04(0x7f2)][_0x551d04(0x19e)][_0x551d04(0x58f)](this),this[_0x551d04(0x6c4)]();},Scene_Options[_0x265d62(0x7ee)][_0x265d62(0x6c4)]=function(){const _0xb8e567=_0x265d62;this[_0xb8e567(0x41d)]&&this[_0xb8e567(0x41d)][_0xb8e567(0x153)](Scene_Options[_0xb8e567(0x891)][_0xb8e567(0x22e)]);},Scene_Options[_0x265d62(0x7ee)][_0x265d62(0x448)]=function(){const _0xd467ce=_0x265d62;return Scene_Options[_0xd467ce(0x891)]['OptionsRect'][_0xd467ce(0x58f)](this);},Scene_Save[_0x265d62(0x891)]=VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x68a)][_0x265d62(0x123)][_0x265d62(0x570)],Scene_Save[_0x265d62(0x7ee)][_0x265d62(0x1dc)]=function(){const _0x5ccdd4=_0x265d62;Scene_File[_0x5ccdd4(0x7ee)][_0x5ccdd4(0x1dc)][_0x5ccdd4(0x58f)](this),this[_0x5ccdd4(0x6c4)]();},Scene_Save['prototype'][_0x265d62(0x6c4)]=function(){const _0x3dab16=_0x265d62;this[_0x3dab16(0x455)]&&(_0x3dab16(0x6e6)===_0x3dab16(0x6e6)?this[_0x3dab16(0x455)][_0x3dab16(0x153)](Scene_Save[_0x3dab16(0x891)]['HelpBgType']):(this['drawIconBySize'](_0xb152d1,_0x22ddc4,_0x58e6e4,this['gaugeLineHeight']()),_0x44dab0-=this[_0x3dab16(0x71f)]()+0x2,_0x2d31b7+=this[_0x3dab16(0x71f)]()+0x2)),this[_0x3dab16(0x7ac)]&&this[_0x3dab16(0x7ac)][_0x3dab16(0x153)](Scene_Save['layoutSettings'][_0x3dab16(0x4fb)]);},Scene_Save[_0x265d62(0x7ee)][_0x265d62(0x80e)]=function(){const _0x588a0e=_0x265d62;return Scene_Save['layoutSettings']['HelpRect'][_0x588a0e(0x58f)](this);},Scene_Save[_0x265d62(0x7ee)]['listWindowRect']=function(){const _0x289651=_0x265d62;return Scene_Save['layoutSettings']['ListRect'][_0x289651(0x58f)](this);},Scene_Load[_0x265d62(0x891)]=VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x68a)][_0x265d62(0x123)][_0x265d62(0x763)],Scene_Load[_0x265d62(0x7ee)]['create']=function(){const _0x3c7106=_0x265d62;Scene_File[_0x3c7106(0x7ee)][_0x3c7106(0x1dc)][_0x3c7106(0x58f)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load[_0x265d62(0x7ee)][_0x265d62(0x6c4)]=function(){const _0x4baaef=_0x265d62;this[_0x4baaef(0x455)]&&('kCxBn'!==_0x4baaef(0x7e1)?this[_0x4baaef(0x455)]['setBackgroundType'](Scene_Load[_0x4baaef(0x891)][_0x4baaef(0x4c7)]):(_0x4f7e2d[_0x4baaef(0x7f2)]['DataManager_setupNewGame'][_0x4baaef(0x58f)](this),this[_0x4baaef(0x172)](),this[_0x4baaef(0x5a6)]()));if(this[_0x4baaef(0x7ac)]){if(_0x4baaef(0x8be)!==_0x4baaef(0x18a))this[_0x4baaef(0x7ac)]['setBackgroundType'](Scene_Load['layoutSettings'][_0x4baaef(0x4fb)]);else{if(this[_0x4baaef(0x3d8)]===_0x40096d)this[_0x4baaef(0x6ed)]();if(this[_0x4baaef(0x3d8)][_0x4baaef(0x3b2)]===_0x16b24e)this[_0x4baaef(0x4fe)]();this['_CoreEngineSettings'][_0x4baaef(0x3b2)]=_0x283591;}}},Scene_Load[_0x265d62(0x7ee)][_0x265d62(0x80e)]=function(){const _0x358295=_0x265d62;return Scene_Load['layoutSettings'][_0x358295(0x11a)][_0x358295(0x58f)](this);},Scene_Load[_0x265d62(0x7ee)][_0x265d62(0x5b5)]=function(){const _0x276c8c=_0x265d62;return Scene_Load[_0x276c8c(0x891)][_0x276c8c(0x4c2)][_0x276c8c(0x58f)](this);},Scene_GameEnd[_0x265d62(0x891)]=VisuMZ['CoreEngine'][_0x265d62(0x68a)][_0x265d62(0x123)][_0x265d62(0x461)],VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x85d)]=Scene_GameEnd[_0x265d62(0x7ee)][_0x265d62(0x2b4)],Scene_GameEnd[_0x265d62(0x7ee)][_0x265d62(0x2b4)]=function(){Scene_MenuBase['prototype']['createBackground']['call'](this);},Scene_GameEnd['prototype'][_0x265d62(0x334)]=function(){const _0x557b60=_0x265d62,_0x18cf91=this[_0x557b60(0x3f4)]();this[_0x557b60(0x774)]=new Window_GameEnd(_0x18cf91),this[_0x557b60(0x774)]['setHandler'](_0x557b60(0x5fe),this[_0x557b60(0x828)]['bind'](this)),this[_0x557b60(0x898)](this[_0x557b60(0x774)]),this['_commandWindow'][_0x557b60(0x153)](Scene_GameEnd[_0x557b60(0x891)][_0x557b60(0x3d0)]);},Scene_GameEnd[_0x265d62(0x7ee)][_0x265d62(0x3f4)]=function(){const _0xb582e4=_0x265d62;return Scene_GameEnd[_0xb582e4(0x891)][_0xb582e4(0x410)]['call'](this);},Scene_Shop[_0x265d62(0x891)]=VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x68a)][_0x265d62(0x123)][_0x265d62(0x388)],VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x439)]=Scene_Shop[_0x265d62(0x7ee)][_0x265d62(0x1dc)],Scene_Shop[_0x265d62(0x7ee)][_0x265d62(0x1dc)]=function(){const _0xcb3a9d=_0x265d62;VisuMZ['CoreEngine'][_0xcb3a9d(0x439)][_0xcb3a9d(0x58f)](this),this[_0xcb3a9d(0x6c4)]();},Scene_Shop[_0x265d62(0x7ee)]['setCoreEngineUpdateWindowBg']=function(){const _0x227a2a=_0x265d62;this[_0x227a2a(0x455)]&&this[_0x227a2a(0x455)][_0x227a2a(0x153)](Scene_Shop[_0x227a2a(0x891)]['HelpBgType']);this['_goldWindow']&&this[_0x227a2a(0x1ea)][_0x227a2a(0x153)](Scene_Shop['layoutSettings'][_0x227a2a(0x58c)]);this[_0x227a2a(0x774)]&&this[_0x227a2a(0x774)][_0x227a2a(0x153)](Scene_Shop[_0x227a2a(0x891)][_0x227a2a(0x3d0)]);this['_dummyWindow']&&this[_0x227a2a(0x405)][_0x227a2a(0x153)](Scene_Shop[_0x227a2a(0x891)]['DummyBgType']);this['_numberWindow']&&this[_0x227a2a(0x2cc)][_0x227a2a(0x153)](Scene_Shop['layoutSettings']['NumberBgType']);this['_statusWindow']&&this[_0x227a2a(0x342)]['setBackgroundType'](Scene_Shop[_0x227a2a(0x891)][_0x227a2a(0x262)]);this['_buyWindow']&&(_0x227a2a(0x594)!=='JtDma'?_0x27f362['createBuffer'](_0x4f7d33,_0x1ad5b0):this[_0x227a2a(0x57b)]['setBackgroundType'](Scene_Shop[_0x227a2a(0x891)][_0x227a2a(0x4de)]));this[_0x227a2a(0x6bc)]&&this['_categoryWindow']['setBackgroundType'](Scene_Shop[_0x227a2a(0x891)]['CategoryBgType']);if(this['_sellWindow']){if(_0x227a2a(0x68c)!==_0x227a2a(0x36e))this[_0x227a2a(0x40b)][_0x227a2a(0x153)](Scene_Shop[_0x227a2a(0x891)][_0x227a2a(0x574)]);else{var _0x44f123=_0x353ac4(_0x55a120['$1']);if(_0x44f123===0x0)_0x44f123=_0x19d2e6[_0x227a2a(0x605)];_0x32a562=_0x139efe[_0x227a2a(0x565)](_0x2177aa,_0x44f123);}}},Scene_Shop[_0x265d62(0x7ee)][_0x265d62(0x80e)]=function(){const _0x361d1d=_0x265d62;return Scene_Shop['layoutSettings'][_0x361d1d(0x11a)][_0x361d1d(0x58f)](this);},Scene_Shop[_0x265d62(0x7ee)][_0x265d62(0x14e)]=function(){const _0x68b409=_0x265d62;return Scene_Shop[_0x68b409(0x891)]['GoldRect'][_0x68b409(0x58f)](this);},Scene_Shop[_0x265d62(0x7ee)][_0x265d62(0x3f4)]=function(){const _0x28fd61=_0x265d62;return Scene_Shop[_0x28fd61(0x891)][_0x28fd61(0x410)][_0x28fd61(0x58f)](this);},Scene_Shop[_0x265d62(0x7ee)][_0x265d62(0x7dc)]=function(){const _0x4edd9a=_0x265d62;return Scene_Shop[_0x4edd9a(0x891)]['DummyRect'][_0x4edd9a(0x58f)](this);},Scene_Shop[_0x265d62(0x7ee)]['numberWindowRect']=function(){const _0x4ec445=_0x265d62;return Scene_Shop['layoutSettings'][_0x4ec445(0x2c8)]['call'](this);},Scene_Shop[_0x265d62(0x7ee)]['statusWindowRect']=function(){const _0x5f1e29=_0x265d62;return Scene_Shop[_0x5f1e29(0x891)][_0x5f1e29(0x552)]['call'](this);},Scene_Shop[_0x265d62(0x7ee)][_0x265d62(0x7f6)]=function(){const _0x25dabe=_0x265d62;return Scene_Shop[_0x25dabe(0x891)][_0x25dabe(0x7a6)][_0x25dabe(0x58f)](this);},Scene_Shop[_0x265d62(0x7ee)]['categoryWindowRect']=function(){const _0x2a273f=_0x265d62;return Scene_Shop['layoutSettings'][_0x2a273f(0x665)][_0x2a273f(0x58f)](this);},Scene_Shop[_0x265d62(0x7ee)][_0x265d62(0x118)]=function(){const _0x52039d=_0x265d62;return Scene_Shop[_0x52039d(0x891)][_0x52039d(0x428)][_0x52039d(0x58f)](this);},Scene_Name[_0x265d62(0x891)]=VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x68a)][_0x265d62(0x123)]['NameMenu'],VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x6b2)]=Scene_Name[_0x265d62(0x7ee)][_0x265d62(0x1dc)],Scene_Name[_0x265d62(0x7ee)][_0x265d62(0x1dc)]=function(){const _0x3d2b4d=_0x265d62;VisuMZ[_0x3d2b4d(0x7f2)][_0x3d2b4d(0x6b2)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name[_0x265d62(0x7ee)][_0x265d62(0x6c4)]=function(){const _0x55ae7c=_0x265d62;this[_0x55ae7c(0x1a8)]&&this[_0x55ae7c(0x1a8)][_0x55ae7c(0x153)](Scene_Name[_0x55ae7c(0x891)][_0x55ae7c(0x7e5)]);if(this[_0x55ae7c(0x519)]){if('hTNpl'!==_0x55ae7c(0x82d))this[_0x55ae7c(0x519)][_0x55ae7c(0x153)](Scene_Name[_0x55ae7c(0x891)][_0x55ae7c(0x765)]);else return _0x52c553[_0x55ae7c(0x7f2)][_0x55ae7c(0x68a)][_0x55ae7c(0x6b6)][_0x55ae7c(0x1fe)]?_0x455155[_0x55ae7c(0x7f2)]['SceneManager_isGameActive'][_0x55ae7c(0x58f)](this):!![];}},Scene_Name['prototype'][_0x265d62(0x357)]=function(){return 0x0;},Scene_Name[_0x265d62(0x7ee)][_0x265d62(0x2ff)]=function(){const _0x553511=_0x265d62;return Scene_Name[_0x553511(0x891)]['EditRect'][_0x553511(0x58f)](this);},Scene_Name[_0x265d62(0x7ee)]['inputWindowRect']=function(){const _0x527b7e=_0x265d62;return Scene_Name[_0x527b7e(0x891)][_0x527b7e(0x6e4)][_0x527b7e(0x58f)](this);},Scene_Name['prototype'][_0x265d62(0x823)]=function(){const _0x56b804=_0x265d62;if(!this['_inputWindow'])return![];return VisuMZ[_0x56b804(0x7f2)][_0x56b804(0x68a)][_0x56b804(0x474)][_0x56b804(0x823)];},Scene_Name['prototype'][_0x265d62(0x14b)]=function(){const _0x421274=_0x265d62;return this[_0x421274(0x823)]()?TextManager[_0x421274(0x433)]('tab'):_0x421274(0x55a)==='vbNSf'?_0x3d77b0[_0x421274(0x7f2)]['Settings']['MenuLayout'][_0x421274(0x66e)][_0x421274(0x354)]:Scene_MenuBase['prototype'][_0x421274(0x14b)][_0x421274(0x58f)](this);},Scene_Name[_0x265d62(0x7ee)][_0x265d62(0x653)]=function(){const _0x54b9c1=_0x265d62;if(this[_0x54b9c1(0x823)]()){const _0x8a2d8d=VisuMZ[_0x54b9c1(0x7f2)][_0x54b9c1(0x68a)]['KeyboardInput'];return this[_0x54b9c1(0x519)][_0x54b9c1(0x6d4)]===_0x54b9c1(0x637)?_0x8a2d8d[_0x54b9c1(0x1d5)]||'Keyboard':_0x8a2d8d[_0x54b9c1(0x7f4)]||'Manual';}else return Scene_MenuBase[_0x54b9c1(0x7ee)][_0x54b9c1(0x653)][_0x54b9c1(0x58f)](this);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x31d)]=Scene_Name[_0x265d62(0x7ee)][_0x265d62(0x45c)],Scene_Name[_0x265d62(0x7ee)][_0x265d62(0x45c)]=function(){const _0x4e80ca=_0x265d62;if(this[_0x4e80ca(0x165)]())this[_0x4e80ca(0x380)]();else{if(_0x4e80ca(0x8b0)!==_0x4e80ca(0x8b0)){if(_0x8303a8 instanceof _0x45a833)this[_0x4e80ca(0x772)](_0x55b15f);else _0x28152b instanceof _0x25dbe3&&_0x45c9aa[0x0]===_0x4e80ca(0x32d)?this[_0x4e80ca(0x12c)](_0x2caa07):this[_0x4e80ca(0x5bf)](_0x3ef55d);this[_0x4e80ca(0x413)]();}else VisuMZ[_0x4e80ca(0x7f2)]['Scene_Name_onInputOk'][_0x4e80ca(0x58f)](this);}},Scene_Name['prototype'][_0x265d62(0x165)]=function(){const _0x55e300=_0x265d62,_0xe595c5=VisuMZ[_0x55e300(0x7f2)][_0x55e300(0x68a)]['KeyboardInput'];if(!_0xe595c5)return![];const _0x42b418=_0xe595c5[_0x55e300(0x446)];if(!_0x42b418)return![];const _0x4cc22c=this[_0x55e300(0x1a8)][_0x55e300(0x3e6)]()[_0x55e300(0x1c1)]();for(const _0x2260eb of _0x42b418){if(_0x4cc22c[_0x55e300(0x734)](_0x2260eb[_0x55e300(0x1c1)]()))return!![];}return![];},Scene_Name[_0x265d62(0x7ee)][_0x265d62(0x380)]=function(){const _0x483786=_0x265d62;SoundManager[_0x483786(0x171)]();},VisuMZ['CoreEngine'][_0x265d62(0x5c7)]=Scene_Battle[_0x265d62(0x7ee)]['update'],Scene_Battle['prototype']['update']=function(){const _0x33aa02=_0x265d62;VisuMZ[_0x33aa02(0x7f2)][_0x33aa02(0x5c7)][_0x33aa02(0x58f)](this);if($gameTemp[_0x33aa02(0x58a)])this[_0x33aa02(0x4a4)]();},Scene_Battle[_0x265d62(0x7ee)][_0x265d62(0x4a4)]=function(){const _0x347426=_0x265d62;!BattleManager[_0x347426(0x685)]()&&!this['_playtestF7Looping']&&!$gameMessage[_0x347426(0x437)]()&&(this[_0x347426(0x878)]=!![],this[_0x347426(0x6f4)](),SceneManager[_0x347426(0x7c0)](),this[_0x347426(0x878)]=![]);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x725)]=Scene_Battle[_0x265d62(0x7ee)]['createCancelButton'],Scene_Battle[_0x265d62(0x7ee)]['createCancelButton']=function(){const _0x40153c=_0x265d62;VisuMZ[_0x40153c(0x7f2)]['Scene_Battle_createCancelButton'][_0x40153c(0x58f)](this),SceneManager[_0x40153c(0x8d3)]()&&this[_0x40153c(0x162)]();},Scene_Battle['prototype'][_0x265d62(0x162)]=function(){const _0x342106=_0x265d62;this[_0x342106(0x755)]['x']=Graphics['boxWidth']+0x4;if(this[_0x342106(0x7ad)]())this[_0x342106(0x755)]['y']=Graphics[_0x342106(0x8d2)]-this['buttonAreaHeight']();else{if(_0x342106(0x764)!==_0x342106(0x112))this['_cancelButton']['y']=0x0;else{const _0x264ea7=_0x49790e[_0x342106(0x6aa)],_0x19091d=_0x361a4e[_0x342106(0x579)],_0x1e8115=this['_pictureName'][_0x342106(0x695)](/SMOOTH/i);this['bitmap']=new _0x2fd47a(_0x264ea7,_0x19091d);const _0x19b48f=_0x1f2a27['loadSystem'](_0x342106(0x298)),_0x48525f=_0x29dbdc%0x10*_0x264ea7,_0x1e26dc=_0x354f27['floor'](_0x1f5540/0x10)*_0x19091d;this['bitmap'][_0x342106(0x1ec)]=_0x1e8115,this[_0x342106(0x6cc)][_0x342106(0x345)](_0x19b48f,_0x48525f,_0x1e26dc,_0x264ea7,_0x19091d,0x0,0x0,_0x264ea7,_0x19091d);}}},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x263)]=Sprite_Button[_0x265d62(0x7ee)][_0x265d62(0x582)],Sprite_Button[_0x265d62(0x7ee)][_0x265d62(0x582)]=function(_0x27efbe){const _0xea1426=_0x265d62;VisuMZ[_0xea1426(0x7f2)]['Sprite_Button_initialize'][_0xea1426(0x58f)](this,_0x27efbe),this['initButtonHidden']();},Sprite_Button[_0x265d62(0x7ee)][_0x265d62(0x648)]=function(){const _0x38c82e=_0x265d62,_0x2271a3=VisuMZ['CoreEngine']['Settings']['UI'];this['_isButtonHidden']=![];switch(this[_0x38c82e(0x3f6)]){case _0x38c82e(0x5fe):this['_isButtonHidden']=!_0x2271a3['cancelShowButton'];break;case _0x38c82e(0x24a):case _0x38c82e(0x6c3):this[_0x38c82e(0x642)]=!_0x2271a3['pagedownShowButton'];break;case _0x38c82e(0x42b):case'up':case _0x38c82e(0x857):case _0x38c82e(0x6f7):case'ok':this[_0x38c82e(0x642)]=!_0x2271a3[_0x38c82e(0x3eb)];break;case'menu':this[_0x38c82e(0x642)]=!_0x2271a3['menuShowButton'];break;}},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x2c4)]=Sprite_Button['prototype'][_0x265d62(0x21b)],Sprite_Button['prototype'][_0x265d62(0x21b)]=function(){const _0x135209=_0x265d62;if(SceneManager['areButtonsHidden']()||this[_0x135209(0x642)]){if('HWFkp'!==_0x135209(0x5d1))this[_0x135209(0x3b3)]();else{const _0x2308bd=_0x5367f['loadSystem'](_0x135209(0x298)),_0xf80310=_0x13e032[_0x135209(0x6aa)],_0x2141f7=_0x1ec7ac[_0x135209(0x579)],_0x574a7b=_0x4a0b7b%0x10*_0xf80310,_0x3dc0d1=_0x530b32[_0x135209(0x8a0)](_0x26af67/0x10)*_0x2141f7,_0x3c686a=_0x3f3f8a,_0x16dc22=_0xb539b0;this['contents'][_0x135209(0x239)][_0x135209(0x3d3)]=_0x16a0e2,this['contents']['blt'](_0x2308bd,_0x574a7b,_0x3dc0d1,_0xf80310,_0x2141f7,_0x472cb6,_0x37daa3,_0x3c686a,_0x16dc22),this['contents']['_context'][_0x135209(0x3d3)]=!![];}}else VisuMZ['CoreEngine'][_0x135209(0x2c4)]['call'](this);},Sprite_Button['prototype'][_0x265d62(0x3b3)]=function(){const _0x181b7d=_0x265d62;this[_0x181b7d(0x892)]=![],this[_0x181b7d(0x143)]=0x0,this['x']=Graphics[_0x181b7d(0x3f1)]*0xa,this['y']=Graphics[_0x181b7d(0x4ec)]*0xa;},VisuMZ[_0x265d62(0x7f2)]['Sprite_Battler_startMove']=Sprite_Battler[_0x265d62(0x7ee)][_0x265d62(0x41c)],Sprite_Battler[_0x265d62(0x7ee)][_0x265d62(0x41c)]=function(_0x201cc9,_0x52c817,_0x3fb406){const _0xbb826b=_0x265d62;if(this['_targetOffsetX']!==_0x201cc9||this[_0xbb826b(0x7e7)]!==_0x52c817){if(_0xbb826b(0x376)!=='jUdpy'){const _0x1a187b=_0x241696+(this[_0xbb826b(0x12e)]()-_0x5ed622[_0xbb826b(0x579)])/0x2;this[_0xbb826b(0x2c3)](_0x26bd08,_0x19b0bb+(_0x1aa880-_0x2bcd92[_0xbb826b(0x6aa)]),_0x1a187b),_0x4f3fb1-=_0x40f728[_0xbb826b(0x6aa)]+0x4;}else this['setMoveEasingType']('Linear'),this[_0xbb826b(0x4e9)]=_0x3fb406;}VisuMZ[_0xbb826b(0x7f2)][_0xbb826b(0x2a4)][_0xbb826b(0x58f)](this,_0x201cc9,_0x52c817,_0x3fb406);},Sprite_Battler['prototype'][_0x265d62(0x279)]=function(_0x1758e4){const _0x33d943=_0x265d62;this[_0x33d943(0x281)]=_0x1758e4;},Sprite_Battler[_0x265d62(0x7ee)][_0x265d62(0x635)]=function(){const _0x2e4724=_0x265d62;if(this[_0x2e4724(0x3f5)]<=0x0)return;const _0x5bdbd4=this[_0x2e4724(0x3f5)],_0x7dce32=this[_0x2e4724(0x4e9)],_0x14216b=this['_moveEasingType'];this[_0x2e4724(0x4b4)]=this[_0x2e4724(0x4e4)](this['_offsetX'],this[_0x2e4724(0x2d7)],_0x5bdbd4,_0x7dce32,_0x14216b),this[_0x2e4724(0x2eb)]=this[_0x2e4724(0x4e4)](this['_offsetY'],this[_0x2e4724(0x7e7)],_0x5bdbd4,_0x7dce32,_0x14216b),this['_movementDuration']--;if(this['_movementDuration']<=0x0)this['onMoveEnd']();},Sprite_Battler[_0x265d62(0x7ee)][_0x265d62(0x4e4)]=function(_0x44511b,_0x149185,_0x22bce8,_0x45a711,_0x5f9a58){const _0x4f165d=_0x265d62,_0x1f397b=VisuMZ['ApplyEasing']((_0x45a711-_0x22bce8)/_0x45a711,_0x5f9a58||_0x4f165d(0x24b)),_0x35aa97=VisuMZ['ApplyEasing']((_0x45a711-_0x22bce8+0x1)/_0x45a711,_0x5f9a58||_0x4f165d(0x24b)),_0x2b1ca3=(_0x44511b-_0x149185*_0x1f397b)/(0x1-_0x1f397b);return _0x2b1ca3+(_0x149185-_0x2b1ca3)*_0x35aa97;},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x1c2)]=Sprite_Actor[_0x265d62(0x7ee)]['setActorHome'],Sprite_Actor[_0x265d62(0x7ee)]['setActorHome']=function(_0x31f939){const _0x68cdae=_0x265d62;if(VisuMZ[_0x68cdae(0x7f2)][_0x68cdae(0x68a)]['UI'][_0x68cdae(0x5f5)]){if(_0x68cdae(0x4bf)===_0x68cdae(0x3a9))return 0x0;else this['setActorHomeRepositioned'](_0x31f939);}else{if(_0x68cdae(0x2ed)!==_0x68cdae(0x4d5))VisuMZ[_0x68cdae(0x7f2)][_0x68cdae(0x1c2)]['call'](this,_0x31f939);else{const _0x3f69b0=this['currentClass']()[_0x68cdae(0x20c)][_0x3fa640][0x63],_0x3f3732=this[_0x68cdae(0x80f)]()[_0x68cdae(0x20c)][_0x3e1ab1][0x62];return _0x3f69b0+(_0x3f69b0-_0x3f3732)*(this[_0x68cdae(0x213)]-0x63);}}},Sprite_Actor[_0x265d62(0x7ee)][_0x265d62(0x5c0)]=function(_0x28b6e3){const _0x3c9159=_0x265d62;let _0x22a55e=Math[_0x3c9159(0x1bd)](Graphics[_0x3c9159(0x3f1)]/0x2+0xc0);_0x22a55e-=Math[_0x3c9159(0x8a0)]((Graphics['width']-Graphics[_0x3c9159(0x60c)])/0x2),_0x22a55e+=_0x28b6e3*0x20;let _0x359d77=Graphics['height']-0xc8-$gameParty[_0x3c9159(0x83c)]()*0x30;_0x359d77-=Math[_0x3c9159(0x8a0)]((Graphics[_0x3c9159(0x4ec)]-Graphics['boxHeight'])/0x2),_0x359d77+=_0x28b6e3*0x30,this['setHome'](_0x22a55e,_0x359d77);},Sprite_Actor['prototype']['retreat']=function(){const _0x3cfdfb=_0x265d62;this[_0x3cfdfb(0x41c)](0x4b0,0x0,0x78);},Sprite_Animation['prototype']['setMute']=function(_0xefea52){const _0x280e4a=_0x265d62;this[_0x280e4a(0x592)]=_0xefea52;},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x321)]=Sprite_Animation[_0x265d62(0x7ee)][_0x265d62(0x59c)],Sprite_Animation[_0x265d62(0x7ee)]['processSoundTimings']=function(){const _0x60328a=_0x265d62;if(this['_muteSound'])return;VisuMZ[_0x60328a(0x7f2)][_0x60328a(0x321)][_0x60328a(0x58f)](this);},VisuMZ['CoreEngine']['Sprite_Animation_setViewport']=Sprite_Animation[_0x265d62(0x7ee)][_0x265d62(0x444)],Sprite_Animation[_0x265d62(0x7ee)][_0x265d62(0x444)]=function(_0x5d62f3){const _0x4e38fe=_0x265d62;this[_0x4e38fe(0x826)]()?this[_0x4e38fe(0x639)](_0x5d62f3):VisuMZ[_0x4e38fe(0x7f2)]['Sprite_Animation_setViewport'][_0x4e38fe(0x58f)](this,_0x5d62f3);},Sprite_Animation[_0x265d62(0x7ee)]['isAnimationOffsetXMirrored']=function(){const _0x51bb4e=_0x265d62;if(!this[_0x51bb4e(0x6df)])return![];const _0x5b656b=this[_0x51bb4e(0x6df)]['name']||'';if(_0x5b656b[_0x51bb4e(0x695)](/<MIRROR OFFSET X>/i))return!![];if(_0x5b656b[_0x51bb4e(0x695)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x51bb4e(0x7f2)][_0x51bb4e(0x68a)][_0x51bb4e(0x6b6)][_0x51bb4e(0x78a)];},Sprite_Animation[_0x265d62(0x7ee)][_0x265d62(0x639)]=function(_0x1f59cf){const _0x1094d3=_0x265d62,_0x24bba2=this[_0x1094d3(0x599)],_0x423bcd=this[_0x1094d3(0x599)],_0x44644e=this[_0x1094d3(0x6df)][_0x1094d3(0x384)]*(this[_0x1094d3(0x3b5)]?-0x1:0x1)-_0x24bba2/0x2,_0xd5ed3=this[_0x1094d3(0x6df)][_0x1094d3(0x13c)]-_0x423bcd/0x2,_0x434571=this[_0x1094d3(0x34c)](_0x1f59cf);_0x1f59cf['gl'][_0x1094d3(0x395)](_0x44644e+_0x434571['x'],_0xd5ed3+_0x434571['y'],_0x24bba2,_0x423bcd);},Sprite_Animation['prototype'][_0x265d62(0x35e)]=function(_0x4caa72){const _0x42812a=_0x265d62;if(_0x4caa72['_mainSprite']){}const _0xd1f7d=this[_0x42812a(0x6df)][_0x42812a(0x3e6)];let _0x194a1a=_0x4caa72[_0x42812a(0x4ec)]*_0x4caa72[_0x42812a(0x3f3)]['y'],_0x44e16e=0x0,_0x688342=-_0x194a1a/0x2;if(_0xd1f7d[_0x42812a(0x695)](/<(?:HEAD|HEADER|TOP)>/i))_0x688342=-_0x194a1a;if(_0xd1f7d[_0x42812a(0x695)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x688342=0x0;if(_0xd1f7d[_0x42812a(0x695)](/<(?:LEFT)>/i))_0x44e16e=-_0x4caa72[_0x42812a(0x3f1)]/0x2;if(_0xd1f7d[_0x42812a(0x695)](/<(?:RIGHT)>/i))_0x688342=_0x4caa72[_0x42812a(0x3f1)]/0x2;if(_0xd1f7d['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x44e16e=Number(RegExp['$1'])*_0x4caa72[_0x42812a(0x3f1)];_0xd1f7d['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x42812a(0x1ab)!==_0x42812a(0x1ab)?(this['openness']-=this[_0x42812a(0x3ed)](),this[_0x42812a(0x6fc)]()&&(this[_0x42812a(0x131)]=![])):_0x688342=(0x1-Number(RegExp['$1']))*-_0x194a1a);_0xd1f7d[_0x42812a(0x695)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x44e16e=Number(RegExp['$1'])*_0x4caa72[_0x42812a(0x3f1)],_0x688342=(0x1-Number(RegExp['$2']))*-_0x194a1a);if(_0xd1f7d[_0x42812a(0x695)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x44e16e+=Number(RegExp['$1']);if(_0xd1f7d[_0x42812a(0x695)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x688342+=Number(RegExp['$1']);_0xd1f7d['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x42812a(0x887)!=='VnVES'?(_0x44e16e+=Number(RegExp['$1']),_0x688342+=Number(RegExp['$2'])):_0x441ec2=_0x3255de['concat'](_0x30887e));const _0x332a58=new Point(_0x44e16e,_0x688342);return _0x4caa72[_0x42812a(0x696)](),_0x4caa72[_0x42812a(0x2fe)][_0x42812a(0x6c7)](_0x332a58);},Sprite_AnimationMV['prototype'][_0x265d62(0x2ad)]=function(_0xc9c18){const _0x5cdd11=_0x265d62;this[_0x5cdd11(0x592)]=_0xc9c18;},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x5c2)]=Sprite_AnimationMV[_0x265d62(0x7ee)][_0x265d62(0x86b)],Sprite_AnimationMV[_0x265d62(0x7ee)][_0x265d62(0x86b)]=function(_0x177218){const _0x611161=_0x265d62;if(this[_0x611161(0x592)]){_0x177218=JsonEx['makeDeepCopy'](_0x177218);if(_0x177218['se']){if(_0x611161(0x4a2)==='bhywQ')_0x177218['se']['volume']=0x0;else{if(_0x16eade[_0x611161(0x7f2)]['Settings'][_0x611161(0x6b6)]['KeyItemProtect']&&_0x5e394b[_0x611161(0x427)](_0x5df087))return;_0x405a81[_0x611161(0x7f2)]['Game_Party_consumeItem']['call'](this,_0x2811fe);}}}VisuMZ[_0x611161(0x7f2)][_0x611161(0x5c2)]['call'](this,_0x177218);},Sprite_Damage[_0x265d62(0x7ee)]['createDigits']=function(_0xe05ae4){const _0x32f82c=_0x265d62;let _0x69f26=Math[_0x32f82c(0x52f)](_0xe05ae4)[_0x32f82c(0x39b)]();this[_0x32f82c(0x4b8)]()&&(_0x69f26=VisuMZ[_0x32f82c(0x164)](_0x69f26));const _0x2bbc70=this[_0x32f82c(0x62a)](),_0x103207=Math['floor'](_0x2bbc70*0.75);for(let _0x248dc3=0x0;_0x248dc3<_0x69f26[_0x32f82c(0x33a)];_0x248dc3++){const _0x4fd922=this[_0x32f82c(0x5b4)](_0x103207,_0x2bbc70);_0x4fd922[_0x32f82c(0x6cc)][_0x32f82c(0x2b6)](_0x69f26[_0x248dc3],0x0,0x0,_0x103207,_0x2bbc70,'center'),_0x4fd922['x']=(_0x248dc3-(_0x69f26['length']-0x1)/0x2)*_0x103207,_0x4fd922['dy']=-_0x248dc3;}},Sprite_Damage['prototype']['useDigitGrouping']=function(){const _0xe88de9=_0x265d62;return VisuMZ[_0xe88de9(0x7f2)][_0xe88de9(0x68a)][_0xe88de9(0x6b6)][_0xe88de9(0x3d1)];},Sprite_Damage[_0x265d62(0x7ee)]['valueOutlineColor']=function(){return ColorManager['outlineColorDmg']();},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x2fa)]=Sprite_Gauge[_0x265d62(0x7ee)][_0x265d62(0x5d4)],Sprite_Gauge[_0x265d62(0x7ee)][_0x265d62(0x5d4)]=function(){const _0x5d65fa=_0x265d62;return VisuMZ[_0x5d65fa(0x7f2)][_0x5d65fa(0x2fa)][_0x5d65fa(0x58f)](this)['clamp'](0x0,0x1);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x756)]=Sprite_Gauge[_0x265d62(0x7ee)]['currentValue'],Sprite_Gauge[_0x265d62(0x7ee)]['currentValue']=function(){const _0xc8e088=_0x265d62;let _0x146b91=VisuMZ['CoreEngine'][_0xc8e088(0x756)]['call'](this);return _0x146b91;},Sprite_Gauge[_0x265d62(0x7ee)][_0x265d62(0x829)]=function(){const _0x251a9e=_0x265d62;let _0x57fe26=this[_0x251a9e(0x7ba)]();this[_0x251a9e(0x4b8)]()&&(_0x57fe26=VisuMZ[_0x251a9e(0x164)](_0x57fe26));const _0x1c7b06=this[_0x251a9e(0x1d6)]()-0x1,_0x50e09e=this[_0x251a9e(0x6b7)]();this[_0x251a9e(0x687)](),this['bitmap']['drawText'](_0x57fe26,0x0,0x0,_0x1c7b06,_0x50e09e,'right');},Sprite_Gauge[_0x265d62(0x7ee)][_0x265d62(0x612)]=function(){return 0x3;},Sprite_Gauge['prototype']['useDigitGrouping']=function(){const _0x2199b5=_0x265d62;return VisuMZ[_0x2199b5(0x7f2)][_0x2199b5(0x68a)][_0x2199b5(0x6b6)]['DigitGroupingGaugeSprites'];},Sprite_Gauge[_0x265d62(0x7ee)][_0x265d62(0x6de)]=function(){const _0x2fc625=_0x265d62;return ColorManager[_0x2fc625(0x60a)]();},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x7a2)]=Sprite_Picture['prototype'][_0x265d62(0x52a)],Sprite_Picture[_0x265d62(0x7ee)][_0x265d62(0x52a)]=function(){const _0x227d8f=_0x265d62;this['_pictureName']['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this['loadIconBitmap'](Number(RegExp['$1'])):VisuMZ[_0x227d8f(0x7f2)][_0x227d8f(0x7a2)][_0x227d8f(0x58f)](this);},Sprite_Picture['prototype'][_0x265d62(0x289)]=function(_0x458a22){const _0x30c04b=_0x265d62,_0x4f0aeb=ImageManager[_0x30c04b(0x6aa)],_0x42cd30=ImageManager[_0x30c04b(0x579)],_0x236a85=this[_0x30c04b(0x1c3)][_0x30c04b(0x695)](/SMOOTH/i);this['bitmap']=new Bitmap(_0x4f0aeb,_0x42cd30);const _0x1898f5=ImageManager[_0x30c04b(0x65f)]('IconSet'),_0x814a8d=_0x458a22%0x10*_0x4f0aeb,_0xfc34fa=Math[_0x30c04b(0x8a0)](_0x458a22/0x10)*_0x42cd30;this[_0x30c04b(0x6cc)][_0x30c04b(0x1ec)]=_0x236a85,this[_0x30c04b(0x6cc)][_0x30c04b(0x345)](_0x1898f5,_0x814a8d,_0xfc34fa,_0x4f0aeb,_0x42cd30,0x0,0x0,_0x4f0aeb,_0x42cd30);};function Sprite_TitlePictureButton(){const _0x2ac7a6=_0x265d62;this[_0x2ac7a6(0x582)](...arguments);}Sprite_TitlePictureButton[_0x265d62(0x7ee)]=Object[_0x265d62(0x1dc)](Sprite_Clickable[_0x265d62(0x7ee)]),Sprite_TitlePictureButton[_0x265d62(0x7ee)][_0x265d62(0x6bb)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x265d62(0x7ee)][_0x265d62(0x582)]=function(_0x6c0a01){const _0x50fc68=_0x265d62;Sprite_Clickable[_0x50fc68(0x7ee)]['initialize']['call'](this),this[_0x50fc68(0x35f)]=_0x6c0a01,this[_0x50fc68(0x752)]=null,this[_0x50fc68(0x432)]();},Sprite_TitlePictureButton['prototype'][_0x265d62(0x432)]=function(){const _0x4fc3d8=_0x265d62;this['x']=Graphics[_0x4fc3d8(0x3f1)],this['y']=Graphics[_0x4fc3d8(0x4ec)],this['visible']=![],this[_0x4fc3d8(0x600)]();},Sprite_TitlePictureButton[_0x265d62(0x7ee)][_0x265d62(0x600)]=function(){const _0x191e19=_0x265d62;this['bitmap']=ImageManager['loadPicture'](this[_0x191e19(0x35f)]['PictureFilename']),this[_0x191e19(0x6cc)][_0x191e19(0x786)](this[_0x191e19(0x261)][_0x191e19(0x858)](this));},Sprite_TitlePictureButton[_0x265d62(0x7ee)][_0x265d62(0x261)]=function(){const _0x4b3e67=_0x265d62;this['_data'][_0x4b3e67(0x152)][_0x4b3e67(0x58f)](this),this['_data'][_0x4b3e67(0x66c)]['call'](this),this[_0x4b3e67(0x340)](this[_0x4b3e67(0x35f)][_0x4b3e67(0x53b)][_0x4b3e67(0x858)](this));},Sprite_TitlePictureButton[_0x265d62(0x7ee)][_0x265d62(0x6f4)]=function(){const _0x266e37=_0x265d62;Sprite_Clickable[_0x266e37(0x7ee)][_0x266e37(0x6f4)][_0x266e37(0x58f)](this),this['updateOpacity'](),this[_0x266e37(0x1ed)]();},Sprite_TitlePictureButton[_0x265d62(0x7ee)][_0x265d62(0x1ce)]=function(){const _0x4df6b5=_0x265d62;return VisuMZ[_0x4df6b5(0x7f2)][_0x4df6b5(0x68a)][_0x4df6b5(0x123)][_0x4df6b5(0x66e)]['ButtonFadeSpeed'];},Sprite_TitlePictureButton[_0x265d62(0x7ee)][_0x265d62(0x21b)]=function(){const _0x436fe8=_0x265d62;if(this[_0x436fe8(0x6ae)]||this[_0x436fe8(0x229)])this[_0x436fe8(0x143)]=0xff;else{if(_0x436fe8(0x210)!==_0x436fe8(0x210)){const _0x4ea854=this['index']();_0x2eec93['isTriggered'](_0x436fe8(0x11f))&&this[_0x436fe8(0x4bb)](_0x4cdbc6[_0x436fe8(0x16b)](this[_0x436fe8(0x73e)](),0x0)),_0x58005b[_0x436fe8(0x690)](_0x436fe8(0x2ce))&&this['smoothSelect'](_0x164bbe['max'](this[_0x436fe8(0x73e)](),this[_0x436fe8(0x4c8)]()-0x1)),this[_0x436fe8(0x73e)]()!==_0x4ea854&&this[_0x436fe8(0x3de)]();}else this[_0x436fe8(0x143)]+=this[_0x436fe8(0x892)]?this[_0x436fe8(0x1ce)]():-0x1*this[_0x436fe8(0x1ce)](),this['opacity']=Math[_0x436fe8(0x16b)](0xc0,this[_0x436fe8(0x143)]);}},Sprite_TitlePictureButton[_0x265d62(0x7ee)]['setClickHandler']=function(_0x3304a0){const _0x55d330=_0x265d62;this[_0x55d330(0x752)]=_0x3304a0;},Sprite_TitlePictureButton[_0x265d62(0x7ee)][_0x265d62(0x7f5)]=function(){const _0x1f5787=_0x265d62;if(this[_0x1f5787(0x752)]){if(_0x1f5787(0x67a)==='edWYG')this[_0x1f5787(0x752)]();else return _0x2b04da['getInputButtonString']('cancel');}},VisuMZ['CoreEngine'][_0x265d62(0x669)]=Spriteset_Base[_0x265d62(0x7ee)]['initialize'],Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x582)]=function(){const _0x2adf9a=_0x265d62;VisuMZ[_0x2adf9a(0x7f2)][_0x2adf9a(0x669)]['call'](this),this[_0x2adf9a(0x1bc)]();},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x1bc)]=function(){const _0x148fe5=_0x265d62;this[_0x148fe5(0x5c6)]=[],this['_pointAnimationSprites']=[],this[_0x148fe5(0x386)]=this[_0x148fe5(0x3f3)]['x'],this[_0x148fe5(0x16a)]=this[_0x148fe5(0x3f3)]['y'];},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x846)]=Spriteset_Base[_0x265d62(0x7ee)]['destroy'],Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x7d6)]=function(_0x4b53a9){const _0x1dcf50=_0x265d62;this[_0x1dcf50(0x714)](),this['removeAllPointAnimations'](),VisuMZ['CoreEngine'][_0x1dcf50(0x846)]['call'](this,_0x4b53a9);},VisuMZ['CoreEngine'][_0x265d62(0x4e1)]=Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x6f4)],Spriteset_Base['prototype']['update']=function(){const _0x3d218d=_0x265d62;VisuMZ[_0x3d218d(0x7f2)][_0x3d218d(0x4e1)]['call'](this),this['updatePictureAntiZoom'](),this['updateFauxAnimations'](),this[_0x3d218d(0x573)]();},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x15b)]=function(){const _0x47cdfd=_0x265d62;if(!VisuMZ[_0x47cdfd(0x7f2)][_0x47cdfd(0x68a)][_0x47cdfd(0x6b6)][_0x47cdfd(0x864)])return;if(this[_0x47cdfd(0x386)]===this[_0x47cdfd(0x3f3)]['x']&&this['_cacheScaleY']===this[_0x47cdfd(0x3f3)]['y'])return;this['adjustPictureAntiZoom'](),this[_0x47cdfd(0x386)]=this[_0x47cdfd(0x3f3)]['x'],this[_0x47cdfd(0x16a)]=this[_0x47cdfd(0x3f3)]['y'];},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x822)]=function(){const _0x7e95c8=_0x265d62;this[_0x7e95c8(0x3f3)]['x']!==0x0&&(this[_0x7e95c8(0x527)][_0x7e95c8(0x3f3)]['x']=0x1/this[_0x7e95c8(0x3f3)]['x'],this[_0x7e95c8(0x527)]['x']=-(this['x']/this[_0x7e95c8(0x3f3)]['x'])),this[_0x7e95c8(0x3f3)]['y']!==0x0&&(this[_0x7e95c8(0x527)][_0x7e95c8(0x3f3)]['y']=0x1/this[_0x7e95c8(0x3f3)]['y'],this[_0x7e95c8(0x527)]['y']=-(this['y']/this[_0x7e95c8(0x3f3)]['y']));},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x79f)]=Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x824)],Spriteset_Base[_0x265d62(0x7ee)]['updatePosition']=function(){const _0x1ae582=_0x265d62;VisuMZ[_0x1ae582(0x7f2)]['Spriteset_Base_updatePosition'][_0x1ae582(0x58f)](this),this[_0x1ae582(0x407)]();},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x407)]=function(){const _0x2452f6=_0x265d62;if(!$gameScreen)return;if($gameScreen[_0x2452f6(0x5ee)]<=0x0)return;this['x']-=Math['round']($gameScreen[_0x2452f6(0x1fc)]());const _0x5edad0=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen[_0x2452f6(0x8a2)]()){case _0x2452f6(0x3d2):this[_0x2452f6(0x392)]();break;case _0x2452f6(0x506):this[_0x2452f6(0x418)]();break;case _0x2452f6(0x219):this[_0x2452f6(0x670)]();break;default:this[_0x2452f6(0x335)]();break;}},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x392)]=function(){const _0x4e0ed8=_0x265d62,_0x41dfab=VisuMZ[_0x4e0ed8(0x7f2)][_0x4e0ed8(0x68a)][_0x4e0ed8(0x562)];if(_0x41dfab&&_0x41dfab[_0x4e0ed8(0x6fa)])return _0x41dfab[_0x4e0ed8(0x6fa)][_0x4e0ed8(0x58f)](this);this['x']+=Math[_0x4e0ed8(0x1bd)]($gameScreen['shake']());},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x335)]=function(){const _0x35b4e6=_0x265d62,_0xecf965=VisuMZ[_0x35b4e6(0x7f2)]['Settings']['ScreenShake'];if(_0xecf965&&_0xecf965[_0x35b4e6(0x5fa)])return _0xecf965[_0x35b4e6(0x5fa)]['call'](this);const _0x4e8797=$gameScreen['_shakePower']*0.75,_0x2c1370=$gameScreen[_0x35b4e6(0x881)]*0.6,_0x5ab41b=$gameScreen['_shakeDuration'];this['x']+=Math[_0x35b4e6(0x1bd)](Math[_0x35b4e6(0x4ac)](_0x4e8797)-Math[_0x35b4e6(0x4ac)](_0x2c1370))*(Math[_0x35b4e6(0x16b)](_0x5ab41b,0x1e)*0.5),this['y']+=Math[_0x35b4e6(0x1bd)](Math[_0x35b4e6(0x4ac)](_0x4e8797)-Math[_0x35b4e6(0x4ac)](_0x2c1370))*(Math[_0x35b4e6(0x16b)](_0x5ab41b,0x1e)*0.5);},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x418)]=function(){const _0x5e8e93=_0x265d62,_0x332732=VisuMZ[_0x5e8e93(0x7f2)]['Settings'][_0x5e8e93(0x562)];if(_0x332732&&_0x332732[_0x5e8e93(0x61e)])return _0x332732[_0x5e8e93(0x61e)]['call'](this);const _0x3254d1=$gameScreen['_shakePower']*0.75,_0x1876dd=$gameScreen['_shakeSpeed']*0.6,_0xea8b10=$gameScreen[_0x5e8e93(0x5ee)];this['x']+=Math[_0x5e8e93(0x1bd)](Math[_0x5e8e93(0x4ac)](_0x3254d1)-Math['randomInt'](_0x1876dd))*(Math[_0x5e8e93(0x16b)](_0xea8b10,0x1e)*0.5);},Spriteset_Base['prototype'][_0x265d62(0x670)]=function(){const _0x48f366=_0x265d62,_0x51a022=VisuMZ[_0x48f366(0x7f2)]['Settings'][_0x48f366(0x562)];if(_0x51a022&&_0x51a022['vertJS']){if(_0x48f366(0x42f)!==_0x48f366(0x42f)){var _0x4d5c8a=_0x4dba3b(_0x115520['$1'])/0x64;_0x540d5b*=_0x4d5c8a;}else return _0x51a022[_0x48f366(0x365)][_0x48f366(0x58f)](this);}const _0x32825d=$gameScreen[_0x48f366(0x625)]*0.75,_0x238c48=$gameScreen[_0x48f366(0x881)]*0.6,_0x24b603=$gameScreen[_0x48f366(0x5ee)];this['y']+=Math[_0x48f366(0x1bd)](Math['randomInt'](_0x32825d)-Math['randomInt'](_0x238c48))*(Math[_0x48f366(0x16b)](_0x24b603,0x1e)*0.5);},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x1da)]=function(){const _0x1c56ca=_0x265d62;for(const _0x56c186 of this[_0x1c56ca(0x5c6)]){'KLzbj'!==_0x1c56ca(0x41e)?!_0x56c186['isPlaying']()&&this['removeFauxAnimation'](_0x56c186):this[_0x1c56ca(0x6d1)]=0x1;}this[_0x1c56ca(0x73c)]();},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x73c)]=function(){const _0x11c8bb=_0x265d62;for(;;){const _0x128888=$gameTemp[_0x11c8bb(0x12b)]();if(_0x128888)this[_0x11c8bb(0x816)](_0x128888);else{if('jHByF'!==_0x11c8bb(0x36f)){const _0x201e1a=_0x43774a[_0x11c8bb(0x6cd)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x11c8bb(0x2b6)](_0x12fcf7[_0x11c8bb(0x6cd)](),_0x44f420,_0x3f1728,_0x23a91c);}else break;}}},Spriteset_Base[_0x265d62(0x7ee)]['createFauxAnimation']=function(_0x690946){const _0x99727=_0x265d62,_0x1de957=$dataAnimations[_0x690946[_0x99727(0x1de)]],_0x3ec8c1=_0x690946[_0x99727(0x4c3)],_0x21cab4=_0x690946[_0x99727(0x3b9)],_0x3f3dae=_0x690946['mute'];let _0x2e8dde=this[_0x99727(0x491)]();const _0x2cf599=this[_0x99727(0x2c7)]();if(this['isAnimationForEach'](_0x1de957)){if(_0x99727(0x8c8)==='tvkKf')return _0x2fe399[_0x99727(0x891)]['ItemRect']['call'](this);else for(const _0x1a08be of _0x3ec8c1){this[_0x99727(0x246)]([_0x1a08be],_0x1de957,_0x21cab4,_0x2e8dde,_0x3f3dae),_0x2e8dde+=_0x2cf599;}}else this[_0x99727(0x246)](_0x3ec8c1,_0x1de957,_0x21cab4,_0x2e8dde,_0x3f3dae);},Spriteset_Base[_0x265d62(0x7ee)]['createFauxAnimationSprite']=function(_0x4cc3c7,_0x598caa,_0x32efde,_0x3bd14f,_0x540905){const _0x40bd65=_0x265d62,_0x593608=this[_0x40bd65(0x7d7)](_0x598caa),_0xe37080=new(_0x593608?Sprite_AnimationMV:Sprite_Animation)(),_0x1ed541=this['makeTargetSprites'](_0x4cc3c7);if(this[_0x40bd65(0x730)](_0x4cc3c7[0x0])){if(_0x40bd65(0x49d)==='NlOwF')return _0x5b9e75[_0x40bd65(0x7f2)][_0x40bd65(0x68a)]['UI'][_0x40bd65(0x8bc)];else _0x32efde=!_0x32efde;}_0xe37080[_0x40bd65(0x71c)]=_0x4cc3c7,_0xe37080[_0x40bd65(0x432)](_0x1ed541,_0x598caa,_0x32efde,_0x3bd14f),_0xe37080[_0x40bd65(0x2ad)](_0x540905),this[_0x40bd65(0x2a7)][_0x40bd65(0x158)](_0xe37080),this[_0x40bd65(0x5c6)][_0x40bd65(0x7d0)](_0xe37080);},Spriteset_Base['prototype'][_0x265d62(0x791)]=function(_0x4d882d){const _0xc9cb23=_0x265d62;this[_0xc9cb23(0x5c6)][_0xc9cb23(0x4f3)](_0x4d882d),this[_0xc9cb23(0x2a7)][_0xc9cb23(0x120)](_0x4d882d);for(const _0x43f44a of _0x4d882d[_0xc9cb23(0x71c)]){if('CaRWx'===_0xc9cb23(0x8cd))return this[_0xc9cb23(0x401)];else _0x43f44a[_0xc9cb23(0x7c1)]&&_0x43f44a[_0xc9cb23(0x7c1)]();}_0x4d882d[_0xc9cb23(0x7d6)]();},Spriteset_Base[_0x265d62(0x7ee)]['removeAllFauxAnimations']=function(){const _0x235ee4=_0x265d62;for(const _0x38dbb5 of this[_0x235ee4(0x5c6)]){if(_0x235ee4(0x56e)==='UfwIk'){const _0x1a05a7=this[_0x235ee4(0x4e2)][_0x235ee4(0x6cc)],_0x357c6f=this['width'],_0x2856ec=this['height'],_0x3211f6=this[_0x235ee4(0x2e8)],_0x351bf7=_0x3b1a2b[_0x235ee4(0x1c0)](),_0x2ee031=_0x30d33d[_0x235ee4(0x5c3)]();_0x1a05a7['resize'](_0x357c6f,_0x2856ec),_0x1a05a7[_0x235ee4(0x7fe)](0x0,0x0,_0x357c6f,_0x3211f6,_0x2ee031,_0x351bf7,!![]),_0x1a05a7[_0x235ee4(0x6f2)](0x0,_0x3211f6,_0x357c6f,_0x2856ec-_0x3211f6*0x2,_0x351bf7),_0x1a05a7[_0x235ee4(0x7fe)](0x0,_0x2856ec-_0x3211f6,_0x357c6f,_0x3211f6,_0x351bf7,_0x2ee031,!![]),this[_0x235ee4(0x4e2)][_0x235ee4(0x607)](0x0,0x0,_0x357c6f,_0x2856ec);}else this['removeFauxAnimation'](_0x38dbb5);}},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x820)]=function(){const _0x50f3fb=_0x265d62;return this[_0x50f3fb(0x5c6)][_0x50f3fb(0x33a)]>0x0;},Spriteset_Base[_0x265d62(0x7ee)]['updatePointAnimations']=function(){const _0xc5d165=_0x265d62;for(const _0xd114f of this['_pointAnimationSprites']){'CmNer'===_0xc5d165(0x855)?(_0x11d0d1[_0xc5d165(0x119)](),this[_0xc5d165(0x589)](_0xc5d165(0x7b3))):!_0xd114f[_0xc5d165(0x53a)]()&&(_0xc5d165(0x871)===_0xc5d165(0x85b)?this['cursorRight'](_0x4a0770[_0xc5d165(0x690)](_0xc5d165(0x672))):this['removePointAnimation'](_0xd114f));}this[_0xc5d165(0x5db)]();},Spriteset_Base[_0x265d62(0x7ee)]['processPointAnimationRequests']=function(){const _0x2ab1d5=_0x265d62;for(;;){const _0x53dee6=$gameTemp[_0x2ab1d5(0x362)]();if(_0x53dee6)this['createPointAnimation'](_0x53dee6);else break;}},Spriteset_Base['prototype'][_0x265d62(0x7cd)]=function(_0x5eef92){const _0x3af802=_0x265d62,_0x2ff90b=$dataAnimations[_0x5eef92[_0x3af802(0x1de)]],_0x4df6d3=this['createPointAnimationTargets'](_0x5eef92),_0x11736d=_0x5eef92[_0x3af802(0x3b9)],_0x51b4bf=_0x5eef92[_0x3af802(0x512)];let _0x4ef1f7=this[_0x3af802(0x491)]();const _0x3c823e=this[_0x3af802(0x2c7)]();if(this[_0x3af802(0x62e)](_0x2ff90b)){if('WPTmZ'!==_0x3af802(0x837)){var _0x4220c4=_0x5cb336(_0x4fd781['$1']);try{_0x20cc6d+=_0x361850(_0x4220c4);}catch(_0x583cc7){if(_0x2929b2[_0x3af802(0x510)]())_0x51d9c3[_0x3af802(0x77f)](_0x583cc7);}}else for(const _0x460060 of _0x4df6d3){if('lVTQw'!==_0x3af802(0x885))this['createPointAnimationSprite']([_0x460060],_0x2ff90b,_0x11736d,_0x4ef1f7,_0x51b4bf),_0x4ef1f7+=_0x3c823e;else{if(this[_0x3af802(0x6d4)]===_0x3af802(0x637))return;if(_0x312a62[_0x3af802(0x11b)]())return;_0x5da5da['CoreEngine'][_0x3af802(0x57d)][_0x3af802(0x58f)](this),this[_0x3af802(0x1df)](_0x3af802(0x722));}}}else this[_0x3af802(0x233)](_0x4df6d3,_0x2ff90b,_0x11736d,_0x4ef1f7,_0x51b4bf);},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x868)]=function(_0x6f7b10){const _0x3d08a1=_0x265d62,_0x3d0672=new Sprite_Clickable();_0x3d0672['x']=_0x6f7b10['x'],_0x3d0672['y']=_0x6f7b10['y'],_0x3d0672['z']=0x64;const _0x49fa5e=this[_0x3d08a1(0x4ba)]();return _0x49fa5e[_0x3d08a1(0x158)](_0x3d0672),[_0x3d0672];},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x4ba)]=function(){return this;},Spriteset_Map[_0x265d62(0x7ee)][_0x265d62(0x4ba)]=function(){return this['_tilemap']||this;},Spriteset_Battle[_0x265d62(0x7ee)][_0x265d62(0x4ba)]=function(){const _0x22b14c=_0x265d62;return this[_0x22b14c(0x597)]||this;},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x233)]=function(_0x18d83e,_0xbe2835,_0x4a55a8,_0x2fb53f,_0x178b2d){const _0x2f8c41=_0x265d62,_0x4da6f2=this[_0x2f8c41(0x7d7)](_0xbe2835),_0x585d5c=new(_0x4da6f2?Sprite_AnimationMV:Sprite_Animation)();_0x585d5c[_0x2f8c41(0x71c)]=_0x18d83e,_0x585d5c['setup'](_0x18d83e,_0xbe2835,_0x4a55a8,_0x2fb53f),_0x585d5c['setMute'](_0x178b2d),this[_0x2f8c41(0x2a7)][_0x2f8c41(0x158)](_0x585d5c),this[_0x2f8c41(0x701)][_0x2f8c41(0x7d0)](_0x585d5c);},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x622)]=function(_0x42ffe0){const _0x3ae3b7=_0x265d62;this[_0x3ae3b7(0x701)]['remove'](_0x42ffe0),this[_0x3ae3b7(0x2a7)][_0x3ae3b7(0x120)](_0x42ffe0);for(const _0x25612a of _0x42ffe0[_0x3ae3b7(0x71c)]){if(_0x25612a[_0x3ae3b7(0x7c1)]){if('PIbko'===_0x3ae3b7(0x5b3))return _0x299665['CoreEngine']['Settings'][_0x3ae3b7(0x1d1)][_0x3ae3b7(0x30e)]||'rgba(0,\x200,\x200,\x201.0)';else _0x25612a['endAnimation']();}const _0x49a5ca=this[_0x3ae3b7(0x4ba)]();if(_0x49a5ca)_0x49a5ca[_0x3ae3b7(0x120)](_0x25612a);}_0x42ffe0[_0x3ae3b7(0x7d6)]();},Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x1a7)]=function(){const _0x5cc34e=_0x265d62;for(const _0xaab428 of this[_0x5cc34e(0x701)]){'iVjwG'===_0x5cc34e(0x168)?this[_0x5cc34e(0x27d)][_0x5cc34e(0x153)](_0x51602d[_0x5cc34e(0x891)][_0x5cc34e(0x862)]):this[_0x5cc34e(0x622)](_0xaab428);}},Spriteset_Base['prototype'][_0x265d62(0x529)]=function(){const _0x35f599=_0x265d62;return this[_0x35f599(0x701)][_0x35f599(0x33a)]>0x0;},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x4cc)]=Spriteset_Base[_0x265d62(0x7ee)][_0x265d62(0x3b7)],Spriteset_Base['prototype'][_0x265d62(0x3b7)]=function(){const _0x1dd01f=_0x265d62;return VisuMZ[_0x1dd01f(0x7f2)][_0x1dd01f(0x4cc)][_0x1dd01f(0x58f)](this)||this[_0x1dd01f(0x529)]();},Spriteset_Battle[_0x265d62(0x7ee)][_0x265d62(0x2b4)]=function(){const _0x150bea=_0x265d62;this['_backgroundFilter']=new PIXI[(_0x150bea(0x37c))][(_0x150bea(0x712))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this['_backgroundSprite'][_0x150bea(0x6cc)]=SceneManager['backgroundBitmap'](),this[_0x150bea(0x6ab)]['filters']=[this[_0x150bea(0x8c9)]],this[_0x150bea(0x445)][_0x150bea(0x158)](this[_0x150bea(0x6ab)]);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x54f)]=Spriteset_Battle[_0x265d62(0x7ee)][_0x265d62(0x3f9)],Spriteset_Battle[_0x265d62(0x7ee)]['createEnemies']=function(){const _0x3a8333=_0x265d62;this['coreEngineRepositionEnemies']()&&this[_0x3a8333(0x710)](),VisuMZ[_0x3a8333(0x7f2)][_0x3a8333(0x54f)][_0x3a8333(0x58f)](this);},Spriteset_Battle[_0x265d62(0x7ee)][_0x265d62(0x572)]=function(){const _0x26bdcc=_0x265d62,_0x3d5533=VisuMZ[_0x26bdcc(0x7f2)]['Settings'][_0x26bdcc(0x7b7)];if(!_0x3d5533)return![];if(Utils[_0x26bdcc(0x5cb)]>=_0x26bdcc(0x331)&&!_0x3d5533[_0x26bdcc(0x6b0)]){if(_0x26bdcc(0x3c8)!=='zKvGX')return![];else _0x26ecba[_0x26bdcc(0x7f2)][_0x26bdcc(0x2dd)][_0x26bdcc(0x58f)](this);}return _0x3d5533[_0x26bdcc(0x76c)];},Spriteset_Battle['prototype'][_0x265d62(0x710)]=function(){const _0x1532c3=_0x265d62;for(member of $gameTroop[_0x1532c3(0x679)]()){if('YXQxT'!==_0x1532c3(0x8bd))member[_0x1532c3(0x1a3)]();else{const _0x1b1d96=_0x1532c3(0x17f);this[_0x1532c3(0x2a1)]=this[_0x1532c3(0x2a1)]||{};if(this[_0x1532c3(0x2a1)][_0x1b1d96])return this['_colorCache'][_0x1b1d96];const _0xa4b0c2=_0x207267[_0x1532c3(0x7f2)]['Settings'][_0x1532c3(0x1d1)][_0x1532c3(0x4d8)];return this[_0x1532c3(0x291)](_0x1b1d96,_0xa4b0c2);}}},VisuMZ['CoreEngine']['Window_Base_initialize']=Window_Base[_0x265d62(0x7ee)][_0x265d62(0x582)],Window_Base[_0x265d62(0x7ee)]['initialize']=function(_0x539c26){const _0x5ba9af=_0x265d62;_0x539c26['x']=Math[_0x5ba9af(0x1bd)](_0x539c26['x']),_0x539c26['y']=Math[_0x5ba9af(0x1bd)](_0x539c26['y']),_0x539c26[_0x5ba9af(0x3f1)]=Math[_0x5ba9af(0x1bd)](_0x539c26[_0x5ba9af(0x3f1)]),_0x539c26['height']=Math[_0x5ba9af(0x1bd)](_0x539c26[_0x5ba9af(0x4ec)]),this['initDigitGrouping'](),VisuMZ[_0x5ba9af(0x7f2)]['Window_Base_initialize'][_0x5ba9af(0x58f)](this,_0x539c26),this[_0x5ba9af(0x125)]();},Window_Base[_0x265d62(0x7ee)][_0x265d62(0x223)]=function(){const _0x235759=_0x265d62;this['_digitGrouping']=VisuMZ[_0x235759(0x7f2)]['Settings'][_0x235759(0x6b6)][_0x235759(0x111)],this['_digitGroupingEx']=VisuMZ['CoreEngine'][_0x235759(0x68a)][_0x235759(0x6b6)][_0x235759(0x57c)];},Window_Base[_0x265d62(0x7ee)][_0x265d62(0x12e)]=function(){const _0xa7b39b=_0x265d62;return VisuMZ[_0xa7b39b(0x7f2)][_0xa7b39b(0x68a)][_0xa7b39b(0x590)]['LineHeight'];},Window_Base[_0x265d62(0x7ee)][_0x265d62(0x17c)]=function(){const _0xbf4b8e=_0x265d62;return VisuMZ[_0xbf4b8e(0x7f2)][_0xbf4b8e(0x68a)][_0xbf4b8e(0x590)][_0xbf4b8e(0x1e4)];},Window_Base[_0x265d62(0x7ee)]['updateBackOpacity']=function(){const _0x36e405=_0x265d62;if($gameSystem['windowOpacity']){if('EEEvq'==='Qgztl'){let _0x40f5da=_0x26d76b[_0x36e405(0x7f2)][_0x36e405(0x3ab)][_0x36e405(0x58f)](this,_0x79694d);return _0x40f5da['x']=_0x353e40[_0x36e405(0x1bd)](_0x40f5da['x']),_0x40f5da['y']=_0xa0c0b5[_0x36e405(0x1bd)](_0x40f5da['y']),_0x40f5da[_0x36e405(0x3f1)]=_0x1a017d[_0x36e405(0x1bd)](_0x40f5da[_0x36e405(0x3f1)]),_0x40f5da[_0x36e405(0x4ec)]=_0x1fcf52[_0x36e405(0x1bd)](_0x40f5da['height']),_0x40f5da;}else this[_0x36e405(0x34b)]=$gameSystem[_0x36e405(0x776)]();}else this[_0x36e405(0x34b)]=VisuMZ[_0x36e405(0x7f2)]['Settings'][_0x36e405(0x590)][_0x36e405(0x827)];},Window_Base['prototype'][_0x265d62(0x785)]=function(){const _0x3fd474=_0x265d62;return VisuMZ[_0x3fd474(0x7f2)]['Settings'][_0x3fd474(0x590)][_0x3fd474(0x3df)];},Window_Base[_0x265d62(0x7ee)][_0x265d62(0x3ed)]=function(){const _0x10b2fb=_0x265d62;return VisuMZ[_0x10b2fb(0x7f2)][_0x10b2fb(0x68a)][_0x10b2fb(0x590)][_0x10b2fb(0x81b)];},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x815)]=Window_Base[_0x265d62(0x7ee)][_0x265d62(0x6f4)],Window_Base[_0x265d62(0x7ee)][_0x265d62(0x6f4)]=function(){const _0x3645cb=_0x265d62;VisuMZ[_0x3645cb(0x7f2)][_0x3645cb(0x815)][_0x3645cb(0x58f)](this),this[_0x3645cb(0x7f7)]();},Window_Base['prototype'][_0x265d62(0x208)]=function(){const _0x5e0815=_0x265d62;this[_0x5e0815(0x86d)]&&(this[_0x5e0815(0x4da)]+=this[_0x5e0815(0x3ed)](),this['isOpen']()&&(this[_0x5e0815(0x86d)]=![]));},Window_Base['prototype']['updateClose']=function(){const _0x408ca6=_0x265d62;this[_0x408ca6(0x131)]&&(this[_0x408ca6(0x4da)]-=this[_0x408ca6(0x3ed)](),this[_0x408ca6(0x6fc)]()&&(this['_closing']=![]));},VisuMZ[_0x265d62(0x7f2)]['Window_Base_drawText']=Window_Base[_0x265d62(0x7ee)][_0x265d62(0x2b6)],Window_Base[_0x265d62(0x7ee)]['drawText']=function(_0x4c11c8,_0x5398bf,_0x121c6a,_0x4c2741,_0x9d2fed){const _0x26ccf1=_0x265d62;if(this[_0x26ccf1(0x4b8)]())_0x4c11c8=VisuMZ[_0x26ccf1(0x164)](_0x4c11c8);VisuMZ[_0x26ccf1(0x7f2)][_0x26ccf1(0x423)][_0x26ccf1(0x58f)](this,_0x4c11c8,_0x5398bf,_0x121c6a,_0x4c2741,_0x9d2fed);},Window_Base[_0x265d62(0x7ee)][_0x265d62(0x4b8)]=function(){const _0x2e5f51=_0x265d62;return this[_0x2e5f51(0x524)];},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x760)]=Window_Base['prototype'][_0x265d62(0x314)],Window_Base[_0x265d62(0x7ee)][_0x265d62(0x314)]=function(_0x31d211,_0xaff4e3,_0xca89b5,_0x3a1d07){const _0x61c1c5=_0x265d62;var _0x497960=VisuMZ['CoreEngine'][_0x61c1c5(0x760)][_0x61c1c5(0x58f)](this,_0x31d211,_0xaff4e3,_0xca89b5,_0x3a1d07);if(this[_0x61c1c5(0x7fc)]())_0x497960[_0x61c1c5(0x373)]=VisuMZ[_0x61c1c5(0x164)](_0x497960['text']);return _0x497960;},Window_Base['prototype'][_0x265d62(0x7fc)]=function(){const _0x4977cf=_0x265d62;return this[_0x4977cf(0x686)];},Window_Base['prototype'][_0x265d62(0x6a7)]=function(_0x261cba){const _0xdc5eec=_0x265d62;this[_0xdc5eec(0x524)]=_0x261cba;},Window_Base[_0x265d62(0x7ee)][_0x265d62(0x5aa)]=function(_0x4aee23){const _0x35f9c4=_0x265d62;this[_0x35f9c4(0x686)]=_0x4aee23;},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x743)]=Window_Base[_0x265d62(0x7ee)][_0x265d62(0x2c3)],Window_Base[_0x265d62(0x7ee)]['drawIcon']=function(_0x31e164,_0x1d9283,_0x305715){const _0x5bec10=_0x265d62;_0x1d9283=Math[_0x5bec10(0x1bd)](_0x1d9283),_0x305715=Math[_0x5bec10(0x1bd)](_0x305715),VisuMZ[_0x5bec10(0x7f2)][_0x5bec10(0x743)]['call'](this,_0x31e164,_0x1d9283,_0x305715);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x6f8)]=Window_Base[_0x265d62(0x7ee)][_0x265d62(0x2fc)],Window_Base[_0x265d62(0x7ee)][_0x265d62(0x2fc)]=function(_0x77c534,_0x457a7d,_0x379795,_0x1b82b3,_0x16f932,_0x3a9373){const _0x29e35f=_0x265d62;_0x16f932=_0x16f932||ImageManager[_0x29e35f(0x5a4)],_0x3a9373=_0x3a9373||ImageManager[_0x29e35f(0x4d7)],_0x379795=Math[_0x29e35f(0x1bd)](_0x379795),_0x1b82b3=Math[_0x29e35f(0x1bd)](_0x1b82b3),_0x16f932=Math['round'](_0x16f932),_0x3a9373=Math[_0x29e35f(0x1bd)](_0x3a9373),VisuMZ[_0x29e35f(0x7f2)]['Window_Base_drawFace'][_0x29e35f(0x58f)](this,_0x77c534,_0x457a7d,_0x379795,_0x1b82b3,_0x16f932,_0x3a9373);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x647)]=Window_Base[_0x265d62(0x7ee)]['drawCharacter'],Window_Base['prototype'][_0x265d62(0x457)]=function(_0x82c3a5,_0x4d10de,_0x36e8b4,_0x1d6878){const _0x14d4cf=_0x265d62;_0x36e8b4=Math[_0x14d4cf(0x1bd)](_0x36e8b4),_0x1d6878=Math['round'](_0x1d6878),VisuMZ[_0x14d4cf(0x7f2)][_0x14d4cf(0x647)][_0x14d4cf(0x58f)](this,_0x82c3a5,_0x4d10de,_0x36e8b4,_0x1d6878);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x3ab)]=Window_Selectable[_0x265d62(0x7ee)][_0x265d62(0x1ca)],Window_Selectable['prototype']['itemRect']=function(_0x550d67){const _0x5551c4=_0x265d62;let _0x17684a=VisuMZ[_0x5551c4(0x7f2)][_0x5551c4(0x3ab)][_0x5551c4(0x58f)](this,_0x550d67);return _0x17684a['x']=Math[_0x5551c4(0x1bd)](_0x17684a['x']),_0x17684a['y']=Math[_0x5551c4(0x1bd)](_0x17684a['y']),_0x17684a[_0x5551c4(0x3f1)]=Math[_0x5551c4(0x1bd)](_0x17684a[_0x5551c4(0x3f1)]),_0x17684a[_0x5551c4(0x4ec)]=Math[_0x5551c4(0x1bd)](_0x17684a[_0x5551c4(0x4ec)]),_0x17684a;},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x45e)]=Window_StatusBase['prototype']['drawActorSimpleStatus'],Window_StatusBase[_0x265d62(0x7ee)][_0x265d62(0x6d3)]=function(_0x15ca86,_0x782a97,_0x15cb6d){const _0x203ca6=_0x265d62;_0x782a97=Math['round'](_0x782a97),_0x15cb6d=Math['round'](_0x15cb6d),VisuMZ[_0x203ca6(0x7f2)]['Window_StatusBase_drawActorSimpleStatus'][_0x203ca6(0x58f)](this,_0x15ca86,_0x782a97,_0x15cb6d);},Window_Base['prototype'][_0x265d62(0x125)]=function(){const _0x59b9a8=_0x265d62;this[_0x59b9a8(0x47c)]={'duration':0x0,'wholeDuration':0x0,'type':_0x59b9a8(0x7c5),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x59b9a8(0x3f3)]['x'],'targetScaleY':this[_0x59b9a8(0x3f3)]['y'],'targetOpacity':this[_0x59b9a8(0x143)],'targetBackOpacity':this[_0x59b9a8(0x34b)],'targetContentsOpacity':this[_0x59b9a8(0x507)]};},Window_Base['prototype'][_0x265d62(0x7f7)]=function(){const _0x39d05c=_0x265d62;if(!this['_coreEasing'])return;if(this[_0x39d05c(0x47c)][_0x39d05c(0x58e)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x39d05c(0x47c)][_0x39d05c(0x130)]),this['y']=this[_0x39d05c(0x27a)](this['y'],this[_0x39d05c(0x47c)][_0x39d05c(0x586)]),this[_0x39d05c(0x3f3)]['x']=this[_0x39d05c(0x27a)](this[_0x39d05c(0x3f3)]['x'],this[_0x39d05c(0x47c)]['targetScaleX']),this[_0x39d05c(0x3f3)]['y']=this['applyCoreEasing'](this['scale']['y'],this[_0x39d05c(0x47c)]['targetScaleY']),this[_0x39d05c(0x143)]=this[_0x39d05c(0x27a)](this['opacity'],this[_0x39d05c(0x47c)][_0x39d05c(0x46c)]),this[_0x39d05c(0x34b)]=this[_0x39d05c(0x27a)](this[_0x39d05c(0x34b)],this[_0x39d05c(0x47c)]['targetBackOpacity']),this[_0x39d05c(0x507)]=this['applyCoreEasing'](this[_0x39d05c(0x507)],this[_0x39d05c(0x47c)][_0x39d05c(0x611)]),this[_0x39d05c(0x47c)]['duration']--;},Window_Base[_0x265d62(0x7ee)][_0x265d62(0x27a)]=function(_0x53a8e8,_0x36cd02){const _0x33cfe7=_0x265d62;if(!this[_0x33cfe7(0x47c)])return _0x36cd02;const _0x3c1ccb=this[_0x33cfe7(0x47c)][_0x33cfe7(0x58e)],_0x566382=this['_coreEasing'][_0x33cfe7(0x5b8)],_0x171c50=this[_0x33cfe7(0x5f9)]((_0x566382-_0x3c1ccb)/_0x566382),_0x54c95a=this[_0x33cfe7(0x5f9)]((_0x566382-_0x3c1ccb+0x1)/_0x566382),_0x240c22=(_0x53a8e8-_0x36cd02*_0x171c50)/(0x1-_0x171c50);return _0x240c22+(_0x36cd02-_0x240c22)*_0x54c95a;},Window_Base[_0x265d62(0x7ee)]['calcCoreEasing']=function(_0x58d608){const _0x363155=_0x265d62;if(!this[_0x363155(0x47c)])return _0x58d608;return VisuMZ[_0x363155(0x3c4)](_0x58d608,this[_0x363155(0x47c)][_0x363155(0x4db)]||_0x363155(0x7c5));},Window_Base[_0x265d62(0x7ee)]['anchorCoreEasing']=function(_0x4f0314,_0x1dc6e0){const _0x5570e3=_0x265d62;if(!this[_0x5570e3(0x47c)])return;this['x']=this[_0x5570e3(0x47c)][_0x5570e3(0x130)],this['y']=this['_coreEasing'][_0x5570e3(0x586)],this[_0x5570e3(0x3f3)]['x']=this[_0x5570e3(0x47c)]['targetScaleX'],this[_0x5570e3(0x3f3)]['y']=this[_0x5570e3(0x47c)][_0x5570e3(0x40e)],this[_0x5570e3(0x143)]=this[_0x5570e3(0x47c)][_0x5570e3(0x46c)],this['backOpacity']=this[_0x5570e3(0x47c)][_0x5570e3(0x424)],this['contentsOpacity']=this[_0x5570e3(0x47c)][_0x5570e3(0x611)],this[_0x5570e3(0x352)](_0x4f0314,_0x1dc6e0,this['x'],this['y'],this[_0x5570e3(0x3f3)]['x'],this[_0x5570e3(0x3f3)]['y'],this[_0x5570e3(0x143)],this['backOpacity'],this[_0x5570e3(0x507)]);},Window_Base[_0x265d62(0x7ee)][_0x265d62(0x352)]=function(_0x57d0a6,_0x32f848,_0x597915,_0x15a60e,_0x16a99a,_0x39610e,_0x51264a,_0x39a942,_0x32fba7){const _0x48d76c=_0x265d62;this[_0x48d76c(0x47c)]={'duration':_0x57d0a6,'wholeDuration':_0x57d0a6,'type':_0x32f848,'targetX':_0x597915,'targetY':_0x15a60e,'targetScaleX':_0x16a99a,'targetScaleY':_0x39610e,'targetOpacity':_0x51264a,'targetBackOpacity':_0x39a942,'targetContentsOpacity':_0x32fba7};},Window_Base[_0x265d62(0x7ee)][_0x265d62(0x518)]=function(_0x58bdac,_0x4e692f,_0x9f9c40,_0xdef22a,_0x1aea48){const _0x588b01=_0x265d62;this[_0x588b01(0x4a1)](),this[_0x588b01(0x3ce)][_0x588b01(0x62a)]=VisuMZ['CoreEngine'][_0x588b01(0x68a)][_0x588b01(0x24f)]['GoldFontSize'];const _0x18e40d=VisuMZ[_0x588b01(0x7f2)][_0x588b01(0x68a)][_0x588b01(0x24f)]['GoldIcon'];if(_0x18e40d>0x0&&_0x4e692f===TextManager[_0x588b01(0x2cd)]){const _0xaaa91a=_0xdef22a+(this[_0x588b01(0x12e)]()-ImageManager[_0x588b01(0x579)])/0x2;this[_0x588b01(0x2c3)](_0x18e40d,_0x9f9c40+(_0x1aea48-ImageManager['iconWidth']),_0xaaa91a),_0x1aea48-=ImageManager[_0x588b01(0x6aa)]+0x4;}else{if(_0x588b01(0x117)!=='tyTrS')return _0xa47f09[_0x588b01(0x2bf)](this),_0x2eff7f[_0x588b01(0x7f2)][_0x588b01(0x37e)][_0x588b01(0x58f)](this,_0xa30d15);else this[_0x588b01(0x2d9)](ColorManager[_0x588b01(0x8a3)]()),this[_0x588b01(0x2b6)](_0x4e692f,_0x9f9c40,_0xdef22a,_0x1aea48,_0x588b01(0x672)),_0x1aea48-=this[_0x588b01(0x889)](_0x4e692f)+0x6;}this[_0x588b01(0x750)]();const _0x48c864=this[_0x588b01(0x889)](this[_0x588b01(0x524)]?VisuMZ[_0x588b01(0x164)](_0x58bdac):_0x58bdac);if(_0x48c864>_0x1aea48)_0x588b01(0x19f)!==_0x588b01(0x462)?this[_0x588b01(0x2b6)](VisuMZ[_0x588b01(0x7f2)][_0x588b01(0x68a)][_0x588b01(0x24f)]['GoldOverlap'],_0x9f9c40,_0xdef22a,_0x1aea48,'right'):(this[_0x588b01(0x1a8)]&&this[_0x588b01(0x1a8)]['setBackgroundType'](_0x3da338[_0x588b01(0x891)]['EditBgType']),this[_0x588b01(0x519)]&&this['_inputWindow'][_0x588b01(0x153)](_0x49f8a5[_0x588b01(0x891)][_0x588b01(0x765)]));else{if(_0x588b01(0x52d)===_0x588b01(0x297))return _0x363686[_0x588b01(0x7f2)]['TextManager_param']['call'](this,_0x161170);else this[_0x588b01(0x2b6)](_0x58bdac,_0x9f9c40,_0xdef22a,_0x1aea48,'right');}this[_0x588b01(0x4a1)]();},Window_Base[_0x265d62(0x7ee)][_0x265d62(0x7be)]=function(_0xec4807,_0x5dd7dc,_0x2c38a5,_0x559f9e,_0x334fc){const _0x2f49f6=_0x265d62,_0x53f8bb=ImageManager[_0x2f49f6(0x65f)](_0x2f49f6(0x298)),_0x2c160b=ImageManager['iconWidth'],_0x1a1e80=ImageManager[_0x2f49f6(0x579)],_0x5092c3=_0xec4807%0x10*_0x2c160b,_0x51ecb6=Math['floor'](_0xec4807/0x10)*_0x1a1e80,_0x3acf99=_0x559f9e,_0x1a82fe=_0x559f9e;this[_0x2f49f6(0x3ce)][_0x2f49f6(0x239)][_0x2f49f6(0x3d3)]=_0x334fc,this[_0x2f49f6(0x3ce)][_0x2f49f6(0x345)](_0x53f8bb,_0x5092c3,_0x51ecb6,_0x2c160b,_0x1a1e80,_0x5dd7dc,_0x2c38a5,_0x3acf99,_0x1a82fe),this[_0x2f49f6(0x3ce)][_0x2f49f6(0x239)][_0x2f49f6(0x3d3)]=!![];},Window_Base[_0x265d62(0x7ee)][_0x265d62(0x811)]=function(_0x26bbf8,_0x3fbfd8,_0x148681,_0x5b4aa8,_0x3db34e,_0x4cb1fe){const _0x2ef6c2=_0x265d62,_0x20b6fe=Math[_0x2ef6c2(0x8a0)]((_0x148681-0x2)*_0x5b4aa8),_0x4cd8f2=Sprite_Gauge['prototype']['gaugeHeight'][_0x2ef6c2(0x58f)](this),_0x1b311d=_0x3fbfd8+this[_0x2ef6c2(0x12e)]()-_0x4cd8f2-0x2;this[_0x2ef6c2(0x3ce)]['fillRect'](_0x26bbf8,_0x1b311d,_0x148681,_0x4cd8f2,ColorManager[_0x2ef6c2(0x60f)]()),this['contents'][_0x2ef6c2(0x7fe)](_0x26bbf8+0x1,_0x1b311d+0x1,_0x20b6fe,_0x4cd8f2-0x2,_0x3db34e,_0x4cb1fe);},Window_Selectable[_0x265d62(0x7ee)]['cursorDown']=function(_0x183518){const _0x1054c0=_0x265d62;let _0x19aeaa=this['index']();const _0x1f998a=this[_0x1054c0(0x4c8)](),_0x55f7a4=this[_0x1054c0(0x50f)]();if(this[_0x1054c0(0x1db)]()&&(_0x19aeaa<_0x1f998a||_0x183518&&_0x55f7a4===0x1)){_0x19aeaa+=_0x55f7a4;if(_0x19aeaa>=_0x1f998a)_0x19aeaa=_0x1f998a-0x1;this[_0x1054c0(0x4bb)](_0x19aeaa);}else{if(!this['isUseModernControls']()){if(_0x1054c0(0x84b)===_0x1054c0(0x45d))return _0x20b518[_0x1054c0(0x7f2)][_0x1054c0(0x2fa)][_0x1054c0(0x58f)](this)[_0x1054c0(0x394)](0x0,0x1);else{if(_0x19aeaa<_0x1f998a-_0x55f7a4||_0x183518&&_0x55f7a4===0x1){if(_0x1054c0(0x6e1)!=='IYoMt')this[_0x1054c0(0x4bb)]((_0x19aeaa+_0x55f7a4)%_0x1f998a);else{var _0x437da7=_0x3a9496(_0x39a71d['$1'])/0x64;_0x1f5071*=_0x437da7;}}}}}},VisuMZ['CoreEngine'][_0x265d62(0x64c)]=Window_Selectable[_0x265d62(0x7ee)][_0x265d62(0x273)],Window_Selectable['prototype'][_0x265d62(0x273)]=function(_0x292dd4){const _0x458584=_0x265d62;this[_0x458584(0x1db)]()&&_0x292dd4&&this[_0x458584(0x50f)]()===0x1&&this[_0x458584(0x73e)]()===this[_0x458584(0x4c8)]()-0x1?this[_0x458584(0x4bb)](0x0):VisuMZ[_0x458584(0x7f2)][_0x458584(0x64c)][_0x458584(0x58f)](this,_0x292dd4);},Window_Selectable[_0x265d62(0x7ee)][_0x265d62(0x66a)]=function(_0x197a98){const _0x2831ad=_0x265d62;let _0x460384=Math[_0x2831ad(0x565)](0x0,this[_0x2831ad(0x73e)]());const _0x5d0705=this[_0x2831ad(0x4c8)](),_0x4ce080=this['maxCols']();if(this[_0x2831ad(0x1db)]()&&_0x460384>0x0||_0x197a98&&_0x4ce080===0x1){_0x460384-=_0x4ce080;if(_0x460384<=0x0)_0x460384=0x0;this[_0x2831ad(0x4bb)](_0x460384);}else{if(!this['isUseModernControls']()){if(_0x2831ad(0x7c4)===_0x2831ad(0x6d8)){const _0x28a20b={'targets':_0x2365f4,'animationId':_0x4ea0e4,'mirror':_0x782bb1,'mute':_0x2abe95};this['_fauxAnimationQueue'][_0x2831ad(0x7d0)](_0x28a20b);for(const _0x23c93c of _0x311e14){_0x23c93c[_0x2831ad(0x6c9)]&&_0x23c93c[_0x2831ad(0x6c9)]();}}else(_0x460384>=_0x4ce080||_0x197a98&&_0x4ce080===0x1)&&this[_0x2831ad(0x4bb)]((_0x460384-_0x4ce080+_0x5d0705)%_0x5d0705);}}},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x72e)]=Window_Selectable['prototype']['cursorUp'],Window_Selectable[_0x265d62(0x7ee)][_0x265d62(0x66a)]=function(_0x12a810){const _0x532e90=_0x265d62;this[_0x532e90(0x1db)]()&&_0x12a810&&this[_0x532e90(0x50f)]()===0x1&&this['index']()===0x0?this[_0x532e90(0x4bb)](this[_0x532e90(0x4c8)]()-0x1):VisuMZ[_0x532e90(0x7f2)][_0x532e90(0x72e)][_0x532e90(0x58f)](this,_0x12a810);},Window_Selectable[_0x265d62(0x7ee)][_0x265d62(0x1db)]=function(){const _0x59d2de=_0x265d62;return VisuMZ[_0x59d2de(0x7f2)]['Settings'][_0x59d2de(0x6b6)][_0x59d2de(0x4af)];},VisuMZ[_0x265d62(0x7f2)]['Window_Selectable_processCursorMove']=Window_Selectable['prototype']['processCursorMove'],Window_Selectable[_0x265d62(0x7ee)]['processCursorMove']=function(){const _0x3ae556=_0x265d62;this[_0x3ae556(0x1db)]()?(this['processCursorMoveModernControls'](),this[_0x3ae556(0x36c)]()):VisuMZ['CoreEngine'][_0x3ae556(0x3d6)][_0x3ae556(0x58f)](this);},Window_Selectable[_0x265d62(0x7ee)][_0x265d62(0x870)]=function(){return!![];},Window_Selectable[_0x265d62(0x7ee)][_0x265d62(0x8c6)]=function(){const _0x3c34b9=_0x265d62;if(this[_0x3c34b9(0x1dd)]()){if(_0x3c34b9(0x7c6)!==_0x3c34b9(0x74c)){const _0x215c3a=this[_0x3c34b9(0x73e)]();Input['isRepeated'](_0x3c34b9(0x42b))&&(Input[_0x3c34b9(0x43d)](_0x3c34b9(0x154))&&this[_0x3c34b9(0x870)]()?this[_0x3c34b9(0x4dd)]():this[_0x3c34b9(0x273)](Input[_0x3c34b9(0x690)](_0x3c34b9(0x42b))));Input[_0x3c34b9(0x525)]('up')&&(Input[_0x3c34b9(0x43d)](_0x3c34b9(0x154))&&this[_0x3c34b9(0x870)]()?_0x3c34b9(0x703)!==_0x3c34b9(0x651)?this[_0x3c34b9(0x1e9)]():_0x39174c[_0x3c34b9(0x7f2)][_0x3c34b9(0x5b0)][_0x3c34b9(0x58f)](this,_0x587b12):this['cursorUp'](Input[_0x3c34b9(0x690)]('up')));Input[_0x3c34b9(0x525)](_0x3c34b9(0x672))&&(_0x3c34b9(0x671)!==_0x3c34b9(0x175)?this['cursorRight'](Input[_0x3c34b9(0x690)](_0x3c34b9(0x672))):this[_0x3c34b9(0x686)]=_0x9b47d1);if(Input[_0x3c34b9(0x525)](_0x3c34b9(0x8c7))){if('ipkwl'!==_0x3c34b9(0x88a)){try{_0x27b295(_0x4dbe43);}catch(_0x14d931){_0x189a44['isPlaytest']()&&(_0x10849a[_0x3c34b9(0x77f)]('Show\x20Scrolling\x20Text\x20Script\x20Error'),_0x27212c[_0x3c34b9(0x77f)](_0x14d931));}return!![];}else this[_0x3c34b9(0x2e7)](Input['isTriggered'](_0x3c34b9(0x8c7)));}!this[_0x3c34b9(0x29c)](_0x3c34b9(0x6c3))&&Input['isRepeated'](_0x3c34b9(0x6c3))&&this['cursorPagedown'](),!this[_0x3c34b9(0x29c)](_0x3c34b9(0x24a))&&Input[_0x3c34b9(0x525)](_0x3c34b9(0x24a))&&this['cursorPageup'](),this[_0x3c34b9(0x73e)]()!==_0x215c3a&&this[_0x3c34b9(0x3de)]();}else{if(!this['_animation'])return![];const _0x293b27=this[_0x3c34b9(0x6df)][_0x3c34b9(0x3e6)]||'';if(_0x293b27[_0x3c34b9(0x695)](/<MIRROR OFFSET X>/i))return!![];if(_0x293b27[_0x3c34b9(0x695)](/<NO MIRROR OFFSET X>/i))return![];return _0x666ad3[_0x3c34b9(0x7f2)][_0x3c34b9(0x68a)][_0x3c34b9(0x6b6)][_0x3c34b9(0x78a)];}}},Window_Selectable[_0x265d62(0x7ee)][_0x265d62(0x36c)]=function(){const _0x19cf6c=_0x265d62;if(this['isCursorMovable']()){const _0x303da5=this['index']();Input['isTriggered'](_0x19cf6c(0x11f))&&this['smoothSelect'](Math[_0x19cf6c(0x16b)](this[_0x19cf6c(0x73e)](),0x0)),Input[_0x19cf6c(0x690)]('end')&&this['smoothSelect'](Math['max'](this[_0x19cf6c(0x73e)](),this['maxItems']()-0x1)),this[_0x19cf6c(0x73e)]()!==_0x303da5&&this['playCursorSound']();}},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x315)]=Window_Selectable[_0x265d62(0x7ee)][_0x265d62(0x1ed)],Window_Selectable[_0x265d62(0x7ee)][_0x265d62(0x1ed)]=function(){const _0x1f9652=_0x265d62;if(this[_0x1f9652(0x1db)]()){if('ilZoV'!==_0x1f9652(0x781))this[_0x1f9652(0x426)]();else return _0x23c3c5['layoutSettings']['HelpRect'][_0x1f9652(0x58f)](this);}else{if('UAowJ'!==_0x1f9652(0x873))VisuMZ[_0x1f9652(0x7f2)][_0x1f9652(0x315)]['call'](this);else{const _0x15d26d=_0x1f9652(0x54d);this['_colorCache']=this[_0x1f9652(0x2a1)]||{};if(this[_0x1f9652(0x2a1)][_0x15d26d])return this[_0x1f9652(0x2a1)][_0x15d26d];const _0x1f3ac5=_0x35cb1c['CoreEngine']['Settings'][_0x1f9652(0x1d1)][_0x1f9652(0x7e2)];return this[_0x1f9652(0x291)](_0x15d26d,_0x1f3ac5);}}},Window_Selectable[_0x265d62(0x7ee)]['processTouchModernControls']=function(){const _0x4f92a8=_0x265d62;VisuMZ[_0x4f92a8(0x7f2)]['Window_Selectable_processTouch'][_0x4f92a8(0x58f)](this);},Window_Selectable[_0x265d62(0x7ee)][_0x265d62(0x897)]=function(){const _0x177d1b=_0x265d62;return VisuMZ[_0x177d1b(0x7f2)]['Settings'][_0x177d1b(0x590)]['ColSpacing'];},Window_Selectable['prototype']['rowSpacing']=function(){const _0x3dd96f=_0x265d62;return VisuMZ[_0x3dd96f(0x7f2)][_0x3dd96f(0x68a)][_0x3dd96f(0x590)][_0x3dd96f(0x253)];},Window_Selectable[_0x265d62(0x7ee)][_0x265d62(0x1d4)]=function(){const _0x396746=_0x265d62;return Window_Scrollable[_0x396746(0x7ee)][_0x396746(0x1d4)][_0x396746(0x58f)](this)+VisuMZ[_0x396746(0x7f2)]['Settings'][_0x396746(0x590)][_0x396746(0x682)];;},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x748)]=Window_Selectable[_0x265d62(0x7ee)][_0x265d62(0x5ef)],Window_Selectable[_0x265d62(0x7ee)][_0x265d62(0x5ef)]=function(_0x2d779e){const _0xa5d782=_0x265d62,_0xe6bf97=VisuMZ[_0xa5d782(0x7f2)]['Settings']['Window'];if(_0xe6bf97[_0xa5d782(0x742)]===![])return;if(_0xe6bf97[_0xa5d782(0x6be)]){if(_0xa5d782(0x59d)!==_0xa5d782(0x1c8))_0xe6bf97[_0xa5d782(0x6be)][_0xa5d782(0x58f)](this,_0x2d779e);else return this[_0xa5d782(0x3a3)]();}else VisuMZ[_0xa5d782(0x7f2)][_0xa5d782(0x748)][_0xa5d782(0x58f)](this,_0x2d779e);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x770)]=Window_Gold[_0x265d62(0x7ee)][_0x265d62(0x359)],Window_Gold[_0x265d62(0x7ee)]['refresh']=function(){const _0x3e0fc5=_0x265d62;this[_0x3e0fc5(0x546)]()?'ARTMk'!==_0x3e0fc5(0x214)?this[_0x3e0fc5(0x66f)]():_0x30e1e3+=_0x3eaf53(_0x18b5bb):VisuMZ['CoreEngine'][_0x3e0fc5(0x770)]['call'](this);},Window_Gold[_0x265d62(0x7ee)]['isItemStyle']=function(){const _0x35b312=_0x265d62;if(TextManager['currencyUnit']!==this[_0x35b312(0x2cd)]())return![];return VisuMZ[_0x35b312(0x7f2)]['Settings'][_0x35b312(0x24f)][_0x35b312(0x4f8)];},Window_Gold['prototype'][_0x265d62(0x66f)]=function(){const _0x40ef70=_0x265d62;this[_0x40ef70(0x4a1)](),this[_0x40ef70(0x3ce)][_0x40ef70(0x490)](),this[_0x40ef70(0x3ce)][_0x40ef70(0x62a)]=VisuMZ['CoreEngine']['Settings'][_0x40ef70(0x24f)]['GoldFontSize'];const _0xe42a52=VisuMZ[_0x40ef70(0x7f2)][_0x40ef70(0x68a)][_0x40ef70(0x24f)]['GoldIcon'],_0x27b01a=this[_0x40ef70(0x16d)](0x0);if(_0xe42a52>0x0){if(_0x40ef70(0x636)!==_0x40ef70(0x636))_0x216543[_0x40ef70(0x7f2)][_0x40ef70(0x6ca)]['call'](this),this[_0x40ef70(0x6c4)]();else{const _0x450cd1=_0x27b01a['y']+(this[_0x40ef70(0x12e)]()-ImageManager[_0x40ef70(0x579)])/0x2;this[_0x40ef70(0x2c3)](_0xe42a52,_0x27b01a['x'],_0x450cd1);const _0x1b83fd=ImageManager[_0x40ef70(0x6aa)]+0x4;_0x27b01a['x']+=_0x1b83fd,_0x27b01a['width']-=_0x1b83fd;}}this[_0x40ef70(0x2d9)](ColorManager[_0x40ef70(0x8a3)]()),this[_0x40ef70(0x2b6)](this[_0x40ef70(0x2cd)](),_0x27b01a['x'],_0x27b01a['y'],_0x27b01a[_0x40ef70(0x3f1)],_0x40ef70(0x8c7));const _0x2902d9=this[_0x40ef70(0x889)](this[_0x40ef70(0x2cd)]())+0x6;;_0x27b01a['x']+=_0x2902d9,_0x27b01a['width']-=_0x2902d9,this[_0x40ef70(0x750)]();const _0x2c100c=this[_0x40ef70(0x678)](),_0x40c11e=this[_0x40ef70(0x889)](this[_0x40ef70(0x524)]?VisuMZ[_0x40ef70(0x164)](this[_0x40ef70(0x678)]()):this['value']());_0x40c11e>_0x27b01a[_0x40ef70(0x3f1)]?this[_0x40ef70(0x2b6)](VisuMZ[_0x40ef70(0x7f2)][_0x40ef70(0x68a)][_0x40ef70(0x24f)]['GoldOverlap'],_0x27b01a['x'],_0x27b01a['y'],_0x27b01a['width'],_0x40ef70(0x672)):this[_0x40ef70(0x2b6)](this[_0x40ef70(0x678)](),_0x27b01a['x'],_0x27b01a['y'],_0x27b01a[_0x40ef70(0x3f1)],_0x40ef70(0x672)),this[_0x40ef70(0x4a1)]();},Window_StatusBase['prototype'][_0x265d62(0x3c2)]=function(_0x5128a3,_0x4d24b6,_0x1587b1,_0xc0a766,_0x354841){const _0x5aa637=_0x265d62;_0xc0a766=String(_0xc0a766||'')[_0x5aa637(0x8d5)]();if(VisuMZ[_0x5aa637(0x7f2)][_0x5aa637(0x68a)][_0x5aa637(0x346)][_0x5aa637(0x22d)]){if(_0x5aa637(0x33c)!==_0x5aa637(0x33c)){if(!_0x533273[_0x5aa637(0x7f2)][_0x5aa637(0x68a)][_0x5aa637(0x6b6)]['AntiZoomPictures'])return;if(this[_0x5aa637(0x386)]===this[_0x5aa637(0x3f3)]['x']&&this[_0x5aa637(0x16a)]===this[_0x5aa637(0x3f3)]['y'])return;this[_0x5aa637(0x822)](),this[_0x5aa637(0x386)]=this['scale']['x'],this['_cacheScaleY']=this[_0x5aa637(0x3f3)]['y'];}else{const _0x1c4ca2=VisuMZ[_0x5aa637(0x8d7)](_0xc0a766);_0x354841?(this[_0x5aa637(0x7be)](_0x1c4ca2,_0x5128a3,_0x4d24b6,this[_0x5aa637(0x71f)]()),_0x1587b1-=this[_0x5aa637(0x71f)]()+0x2,_0x5128a3+=this[_0x5aa637(0x71f)]()+0x2):_0x5aa637(0x167)!==_0x5aa637(0x563)?(this[_0x5aa637(0x2c3)](_0x1c4ca2,_0x5128a3+0x2,_0x4d24b6+0x2),_0x1587b1-=ImageManager[_0x5aa637(0x6aa)]+0x4,_0x5128a3+=ImageManager[_0x5aa637(0x6aa)]+0x4):(this['coreEngineRepositionEnemies']()&&this[_0x5aa637(0x710)](),_0x2f50b6[_0x5aa637(0x7f2)][_0x5aa637(0x54f)][_0x5aa637(0x58f)](this));}}const _0x137ed3=TextManager[_0x5aa637(0x884)](_0xc0a766);this['resetFontSettings'](),this['changeTextColor'](ColorManager[_0x5aa637(0x8a3)]());if(_0x354841){if(_0x5aa637(0x8a9)!==_0x5aa637(0x8a9))return![];else this['contents'][_0x5aa637(0x62a)]=this[_0x5aa637(0x4f5)](),this[_0x5aa637(0x3ce)]['drawText'](_0x137ed3,_0x5128a3,_0x4d24b6,_0x1587b1,this[_0x5aa637(0x71f)](),_0x5aa637(0x8c7));}else this[_0x5aa637(0x2b6)](_0x137ed3,_0x5128a3,_0x4d24b6,_0x1587b1);this[_0x5aa637(0x4a1)]();},Window_StatusBase[_0x265d62(0x7ee)][_0x265d62(0x4f5)]=function(){const _0x47c4bc=_0x265d62;return $gameSystem[_0x47c4bc(0x51a)]()-0x8;},Window_StatusBase['prototype']['drawActorClass']=function(_0xa93082,_0xd4cf5,_0x1f63f1,_0x5dd5a4){const _0x399a65=_0x265d62;_0x5dd5a4=_0x5dd5a4||0xa8,this[_0x399a65(0x750)]();if(VisuMZ[_0x399a65(0x7f2)][_0x399a65(0x68a)]['UI'][_0x399a65(0x303)])_0x399a65(0x87f)!=='pxoqz'?this['drawTextEx'](_0xa93082[_0x399a65(0x80f)]()[_0x399a65(0x3e6)],_0xd4cf5,_0x1f63f1,_0x5dd5a4):this['cursorPagedown']();else{const _0x312bcf=_0xa93082[_0x399a65(0x80f)]()[_0x399a65(0x3e6)][_0x399a65(0x4b3)](/\\I\[(\d+)\]/gi,'');this[_0x399a65(0x2b6)](_0x312bcf,_0xd4cf5,_0x1f63f1,_0x5dd5a4);}},Window_StatusBase['prototype'][_0x265d62(0x1ae)]=function(_0x1e13b0,_0x9c068c,_0xdb0734,_0x1f3fe6){const _0x743dd0=_0x265d62;_0x1f3fe6=_0x1f3fe6||0x10e,this[_0x743dd0(0x750)]();if(VisuMZ[_0x743dd0(0x7f2)][_0x743dd0(0x68a)]['UI'][_0x743dd0(0x196)])this[_0x743dd0(0x624)](_0x1e13b0[_0x743dd0(0x6cd)](),_0x9c068c,_0xdb0734,_0x1f3fe6);else{const _0xdeba93=_0x1e13b0[_0x743dd0(0x6cd)]()[_0x743dd0(0x4b3)](/\\I\[(\d+)\]/gi,'');this[_0x743dd0(0x2b6)](_0x1e13b0[_0x743dd0(0x6cd)](),_0x9c068c,_0xdb0734,_0x1f3fe6);}},VisuMZ['CoreEngine']['Window_StatusBase_drawActorLevel']=Window_StatusBase[_0x265d62(0x7ee)][_0x265d62(0x691)],Window_StatusBase[_0x265d62(0x7ee)][_0x265d62(0x691)]=function(_0x35de91,_0x403b9c,_0x429e85){const _0x5df5c0=_0x265d62;if(this['isExpGaugeDrawn']())this[_0x5df5c0(0x71d)](_0x35de91,_0x403b9c,_0x429e85);VisuMZ[_0x5df5c0(0x7f2)][_0x5df5c0(0x733)][_0x5df5c0(0x58f)](this,_0x35de91,_0x403b9c,_0x429e85);},Window_StatusBase[_0x265d62(0x7ee)]['isExpGaugeDrawn']=function(){const _0x391149=_0x265d62;return VisuMZ['CoreEngine'][_0x391149(0x68a)]['UI'][_0x391149(0x30b)];},Window_StatusBase[_0x265d62(0x7ee)][_0x265d62(0x71d)]=function(_0x375bd2,_0x546b3c,_0x169e7a){const _0x344e8d=_0x265d62;if(!_0x375bd2)return;if(!_0x375bd2['isActor']())return;const _0x126d4b=0x80,_0x3c3c73=_0x375bd2[_0x344e8d(0x82b)]();let _0x32dc43=ColorManager['expGaugeColor1'](),_0x20dfcd=ColorManager['expGaugeColor2']();_0x3c3c73>=0x1&&(_0x32dc43=ColorManager[_0x344e8d(0x6e0)](),_0x20dfcd=ColorManager[_0x344e8d(0x5df)]()),this['drawGauge'](_0x546b3c,_0x169e7a,_0x126d4b,_0x3c3c73,_0x32dc43,_0x20dfcd);},Window_EquipStatus[_0x265d62(0x7ee)][_0x265d62(0x478)]=function(){const _0x22d0cd=_0x265d62;let _0x1a93a0=0x0;for(const _0x1faf9b of VisuMZ[_0x22d0cd(0x7f2)]['Settings'][_0x22d0cd(0x346)][_0x22d0cd(0x698)]){const _0x7622f5=this['itemPadding'](),_0x572a31=this[_0x22d0cd(0x277)](_0x1a93a0);this[_0x22d0cd(0x6f9)](_0x7622f5,_0x572a31,_0x1faf9b),_0x1a93a0++;}},Window_EquipStatus[_0x265d62(0x7ee)][_0x265d62(0x169)]=function(_0x3697f2,_0x4549ce,_0x201b60){const _0x562b1c=_0x265d62,_0x30c605=this[_0x562b1c(0x80d)]()-this[_0x562b1c(0x17c)]()*0x2;this['drawParamText'](_0x3697f2,_0x4549ce,_0x30c605,_0x201b60,![]);},Window_EquipStatus[_0x265d62(0x7ee)][_0x265d62(0x451)]=function(_0x13f115,_0xe8a60b,_0x3a7fb8){const _0x4b2dfb=_0x265d62,_0x325a64=this[_0x4b2dfb(0x19d)]();this[_0x4b2dfb(0x750)](),this[_0x4b2dfb(0x2b6)](this['_actor'][_0x4b2dfb(0x1d9)](_0x3a7fb8,!![]),_0x13f115,_0xe8a60b,_0x325a64,_0x4b2dfb(0x672));},Window_EquipStatus['prototype'][_0x265d62(0x23c)]=function(_0x51e010,_0x3e9483){const _0x7d0a54=_0x265d62,_0x54c60d=this[_0x7d0a54(0x42d)]();this[_0x7d0a54(0x2d9)](ColorManager[_0x7d0a54(0x8a3)]());const _0x4b125b=VisuMZ[_0x7d0a54(0x7f2)][_0x7d0a54(0x68a)]['UI'][_0x7d0a54(0x21d)];this[_0x7d0a54(0x2b6)](_0x4b125b,_0x51e010,_0x3e9483,_0x54c60d,'center');},Window_EquipStatus[_0x265d62(0x7ee)][_0x265d62(0x2e2)]=function(_0x3016ca,_0x568fcf,_0x516f37){const _0x2e810e=_0x265d62,_0x1f0555=this[_0x2e810e(0x19d)](),_0x1832b3=this[_0x2e810e(0x7d2)]['paramValueByName'](_0x516f37),_0x32dce4=_0x1832b3-this[_0x2e810e(0x12d)]['paramValueByName'](_0x516f37);this[_0x2e810e(0x2d9)](ColorManager[_0x2e810e(0x44e)](_0x32dce4)),this['drawText'](this['_tempActor']['paramValueByName'](_0x516f37,!![]),_0x3016ca,_0x568fcf,_0x1f0555,'right');},VisuMZ[_0x265d62(0x7f2)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x265d62(0x7ee)][_0x265d62(0x59b)],Window_EquipItem[_0x265d62(0x7ee)][_0x265d62(0x59b)]=function(_0x4aff8a){const _0x45a6c0=_0x265d62;if(_0x4aff8a&&this[_0x45a6c0(0x12d)])return this[_0x45a6c0(0x12d)][_0x45a6c0(0x61a)](_0x4aff8a);else{if('nunAQ'!==_0x45a6c0(0x5cd))return VisuMZ['CoreEngine'][_0x45a6c0(0x4fc)][_0x45a6c0(0x58f)](this,_0x4aff8a);else{if(_0x330173['length']>0x0)_0x21edc2+=_0x20e3f8+_0x45a6c0(0x1a4);else{const _0x42c2d6=_0x49f967[_0x16acf6][_0x45a6c0(0x3e6)];_0xf18f7+=_0x59332b+_0x45a6c0(0x71e)['format'](_0x45e961,_0x42c2d6||'Unnamed')+_0x4eb3e2;}_0x271168+=_0x4aca3b[_0x45a6c0(0x807)](_0x3fd039,_0x1fb287,_0x31e383,_0x66d589);}}},Window_StatusParams[_0x265d62(0x7ee)][_0x265d62(0x4c8)]=function(){const _0x3f3720=_0x265d62;return VisuMZ[_0x3f3720(0x7f2)][_0x3f3720(0x68a)][_0x3f3720(0x346)][_0x3f3720(0x698)][_0x3f3720(0x33a)];},Window_StatusParams['prototype']['drawItem']=function(_0x2f311e){const _0x322589=_0x265d62,_0x48b952=this[_0x322589(0x16d)](_0x2f311e),_0x2408be=VisuMZ[_0x322589(0x7f2)][_0x322589(0x68a)][_0x322589(0x346)][_0x322589(0x698)][_0x2f311e],_0x11edd3=TextManager[_0x322589(0x884)](_0x2408be),_0x58b464=this['_actor'][_0x322589(0x1d9)](_0x2408be,!![]);this[_0x322589(0x3c2)](_0x48b952['x'],_0x48b952['y'],0xa0,_0x2408be,![]),this[_0x322589(0x750)](),this[_0x322589(0x2b6)](_0x58b464,_0x48b952['x']+0xa0,_0x48b952['y'],0x3c,_0x322589(0x672));};function _0x5929(_0x10fca5,_0x33ffd9){const _0x471905=_0x4719();return _0x5929=function(_0x5929cc,_0x384a30){_0x5929cc=_0x5929cc-0x10e;let _0x59e2fd=_0x471905[_0x5929cc];return _0x59e2fd;},_0x5929(_0x10fca5,_0x33ffd9);}if(VisuMZ['CoreEngine'][_0x265d62(0x68a)]['KeyboardInput']['EnableNameInput']){VisuMZ['CoreEngine']['Settings']['KeyboardInput'][_0x265d62(0x623)]&&(Window_NameInput[_0x265d62(0x89b)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK']);;VisuMZ[_0x265d62(0x7f2)]['Window_NameInput_initialize']=Window_NameInput[_0x265d62(0x7ee)][_0x265d62(0x582)],Window_NameInput[_0x265d62(0x7ee)]['initialize']=function(_0x2ce56d){const _0x3e495c=_0x265d62;this[_0x3e495c(0x6d4)]=this['defaultInputMode'](),VisuMZ['CoreEngine'][_0x3e495c(0x71b)][_0x3e495c(0x58f)](this,_0x2ce56d),this[_0x3e495c(0x6d4)]===_0x3e495c(0x722)?this[_0x3e495c(0x688)](0x0):(Input[_0x3e495c(0x490)](),this[_0x3e495c(0x218)]());},Window_NameInput[_0x265d62(0x7ee)]['defaultInputMode']=function(){const _0x5d9044=_0x265d62;if(Input[_0x5d9044(0x10f)]())return'default';return VisuMZ[_0x5d9044(0x7f2)][_0x5d9044(0x68a)][_0x5d9044(0x474)][_0x5d9044(0x852)]||_0x5d9044(0x637);},VisuMZ['CoreEngine'][_0x265d62(0x58b)]=Window_NameInput[_0x265d62(0x7ee)][_0x265d62(0x7e9)],Window_NameInput[_0x265d62(0x7ee)][_0x265d62(0x7e9)]=function(){const _0x7fe0ba=_0x265d62;if(!this['isOpen']())return;if(!this['active'])return;if(this[_0x7fe0ba(0x6d4)]===_0x7fe0ba(0x637)&&Input[_0x7fe0ba(0x8af)]())this[_0x7fe0ba(0x1df)]('default');else{if(Input[_0x7fe0ba(0x39d)](_0x7fe0ba(0x896))){if(_0x7fe0ba(0x644)==='ixYmy')Input[_0x7fe0ba(0x490)](),this[_0x7fe0ba(0x3fc)]();else{if(!this[_0x7fe0ba(0x47c)])return _0x13495b;return _0x1a04cc[_0x7fe0ba(0x3c4)](_0x300f7d,this[_0x7fe0ba(0x47c)][_0x7fe0ba(0x4db)]||_0x7fe0ba(0x7c5));}}else{if(Input['isTriggered']('tab')){Input[_0x7fe0ba(0x490)]();if(this[_0x7fe0ba(0x6d4)]===_0x7fe0ba(0x637))_0x7fe0ba(0x88c)==='rYFbT'?this[_0x7fe0ba(0x1df)](_0x7fe0ba(0x722)):(_0x21d264+=_0x133ed3+'\x0a',_0x5d70f3+='〘Scrolling\x20Text〙\x0a');else{if(_0x7fe0ba(0x6a4)==='aPcbq')this['switchModes']('keyboard');else{const _0x22f63e=[_0x7fe0ba(0x43e),'battlebacks1',_0x7fe0ba(0x5d2),_0x7fe0ba(0x481),_0x7fe0ba(0x5f0),_0x7fe0ba(0x406),_0x7fe0ba(0x777),_0x7fe0ba(0x22b),_0x7fe0ba(0x12a),_0x7fe0ba(0x7a7),'system',_0x7fe0ba(0x32a),_0x7fe0ba(0x27f),_0x7fe0ba(0x309)];for(const _0x124411 of _0x22f63e){const _0x528c43=_0xb6f87b[_0x7fe0ba(0x7f2)][_0x7fe0ba(0x68a)][_0x7fe0ba(0x248)][_0x124411],_0x368a0a=_0x7fe0ba(0x70e)[_0x7fe0ba(0x807)](_0x124411);for(const _0x498fb1 of _0x528c43){_0xc92f30[_0x7fe0ba(0x52a)](_0x368a0a,_0x498fb1);}}}}}else{if(this[_0x7fe0ba(0x6d4)]==='keyboard')this[_0x7fe0ba(0x5ea)]();else{if(Input[_0x7fe0ba(0x39d)](_0x7fe0ba(0x87a))){if(_0x7fe0ba(0x5a3)!==_0x7fe0ba(0x2fb))Input[_0x7fe0ba(0x490)](),this['switchModes'](_0x7fe0ba(0x637));else{if(this[_0x7fe0ba(0x6d4)]===_0x7fe0ba(0x637)){this[_0x7fe0ba(0x3ce)][_0x7fe0ba(0x490)](),this[_0x7fe0ba(0x52b)][_0x7fe0ba(0x490)](),this['resetTextColor']();let _0xa29c21=_0x1efae0[_0x7fe0ba(0x7f2)]['Settings'][_0x7fe0ba(0x474)][_0x7fe0ba(0x21e)][_0x7fe0ba(0x3af)]('\x0a'),_0x2e3c7e=_0xa29c21[_0x7fe0ba(0x33a)],_0x5c306a=(this[_0x7fe0ba(0x3cf)]-_0x2e3c7e*this[_0x7fe0ba(0x12e)]())/0x2;for(let _0xd5c653=0x0;_0xd5c653<_0x2e3c7e;++_0xd5c653){let _0x3361ea=_0xa29c21[_0xd5c653],_0x4b7544=this[_0x7fe0ba(0x75a)](_0x3361ea)[_0x7fe0ba(0x3f1)],_0x5e3457=_0x87737f[_0x7fe0ba(0x8a0)]((this[_0x7fe0ba(0x3ce)][_0x7fe0ba(0x3f1)]-_0x4b7544)/0x2);this['drawTextEx'](_0x3361ea,_0x5e3457,_0x5c306a),_0x5c306a+=this[_0x7fe0ba(0x12e)]();}}else _0x4ea69d[_0x7fe0ba(0x7f2)]['Window_NameInput_refresh']['call'](this);}}else _0x7fe0ba(0x480)!==_0x7fe0ba(0x480)?this[_0x7fe0ba(0x6ae)]||this[_0x7fe0ba(0x229)]?this[_0x7fe0ba(0x143)]=0xff:(this[_0x7fe0ba(0x143)]+=this[_0x7fe0ba(0x892)]?this[_0x7fe0ba(0x1ce)]():-0x1*this[_0x7fe0ba(0x1ce)](),this[_0x7fe0ba(0x143)]=_0x2549f6[_0x7fe0ba(0x16b)](0xc0,this[_0x7fe0ba(0x143)])):VisuMZ[_0x7fe0ba(0x7f2)]['Window_NameInput_processHandling'][_0x7fe0ba(0x58f)](this);}}}}},VisuMZ['CoreEngine']['Window_NameInput_processTouch']=Window_NameInput['prototype']['processTouch'],Window_NameInput[_0x265d62(0x7ee)]['processTouch']=function(){const _0x5390af=_0x265d62;if(!this[_0x5390af(0x7d1)]())return;if(this[_0x5390af(0x6d4)]===_0x5390af(0x637)){if(_0x5390af(0x382)!==_0x5390af(0x382)){const _0x68ae67=_0x2e71d7['_pictureCoordinatesMode']||0x0;(_0x68ae67<0x0||_0x68ae67>0x64||_0x3ed1ef[_0x5390af(0x187)]()||_0x2953cb[_0x5390af(0x690)](_0x5390af(0x5fe)))&&(_0x45958e['_pictureCoordinatesMode']=_0x541fbe,_0x203b30[_0x5390af(0x490)](),_0x450174[_0x5390af(0x490)]());const _0x570e50=_0xad5dd4[_0x5390af(0x1f1)](_0x68ae67);return _0x570e50&&(_0x570e50['_x']=_0x53be2a['_x'],_0x570e50['_y']=_0x47995b['_y']),_0x5c3086[_0x5390af(0x7f2)][_0x5390af(0x1d7)](),_0x558888['_pictureCoordinatesMode']!==_0x28b831;}else{if(TouchInput['isTriggered']()&&this[_0x5390af(0x2d0)]())this['switchModes'](_0x5390af(0x722));else{if(TouchInput[_0x5390af(0x187)]()){if(_0x5390af(0x4ff)!==_0x5390af(0x293))this[_0x5390af(0x1df)](_0x5390af(0x722));else{const _0x1487a6=_0x5390af(0x5a7);this[_0x5390af(0x2a1)]=this[_0x5390af(0x2a1)]||{};if(this['_colorCache'][_0x1487a6])return this[_0x5390af(0x2a1)][_0x1487a6];const _0x58b7e8=_0x5eb9a6['CoreEngine']['Settings']['Color'][_0x5390af(0x25c)];return this[_0x5390af(0x291)](_0x1487a6,_0x58b7e8);}}}}}else VisuMZ[_0x5390af(0x7f2)][_0x5390af(0x128)][_0x5390af(0x58f)](this);},Window_NameInput[_0x265d62(0x7ee)][_0x265d62(0x5ea)]=function(){const _0xe675bb=_0x265d62;if(Input[_0xe675bb(0x39d)](_0xe675bb(0x2de)))_0xe675bb(0x874)==='gbHIm'?(Input['clear'](),this[_0xe675bb(0x332)]()):this[_0xe675bb(0x4bb)](_0x31d91f['max'](this[_0xe675bb(0x73e)](),this[_0xe675bb(0x4c8)]()-0x1));else{if(Input[_0xe675bb(0x6eb)]!==undefined){let _0x2ba5c9=Input['_inputString'],_0x3ba9fa=_0x2ba5c9[_0xe675bb(0x33a)];for(let _0x388096=0x0;_0x388096<_0x3ba9fa;++_0x388096){_0xe675bb(0x640)===_0xe675bb(0x640)?this[_0xe675bb(0x1a8)][_0xe675bb(0x243)](_0x2ba5c9[_0x388096])?SoundManager['playOk']():'voVfx'===_0xe675bb(0x65c)?SoundManager[_0xe675bb(0x171)]():_0x48bd32[_0xe675bb(0x89b)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0xe675bb(0x26b),'OK']:_0x3ae82d['se'][_0xe675bb(0x54c)]=0x0;}Input[_0xe675bb(0x490)]();}}},Window_NameInput[_0x265d62(0x7ee)][_0x265d62(0x1df)]=function(_0x1b9512){const _0xf269e1=_0x265d62;let _0x20c424=this[_0xf269e1(0x6d4)];this[_0xf269e1(0x6d4)]=_0x1b9512,_0x20c424!==this[_0xf269e1(0x6d4)]&&(this[_0xf269e1(0x359)](),SoundManager['playOk'](),this['_mode']===_0xf269e1(0x722)?this[_0xf269e1(0x688)](0x0):this[_0xf269e1(0x688)](-0x1));},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x784)]=Window_NameInput[_0x265d62(0x7ee)][_0x265d62(0x273)],Window_NameInput[_0x265d62(0x7ee)][_0x265d62(0x273)]=function(_0x2715a4){const _0x4e618c=_0x265d62;if(this[_0x4e618c(0x6d4)]===_0x4e618c(0x637)&&!Input['isArrowPressed']())return;if(Input[_0x4e618c(0x11b)]())return;VisuMZ[_0x4e618c(0x7f2)]['Window_NameInput_cursorDown']['call'](this,_0x2715a4),this['switchModes'](_0x4e618c(0x722));},VisuMZ['CoreEngine']['Window_NameInput_cursorUp']=Window_NameInput['prototype'][_0x265d62(0x66a)],Window_NameInput[_0x265d62(0x7ee)][_0x265d62(0x66a)]=function(_0x3d0fa5){const _0x1b435=_0x265d62;if(this[_0x1b435(0x6d4)]==='keyboard'&&!Input[_0x1b435(0x443)]())return;if(Input[_0x1b435(0x11b)]())return;VisuMZ['CoreEngine'][_0x1b435(0x6e8)][_0x1b435(0x58f)](this,_0x3d0fa5),this[_0x1b435(0x1df)](_0x1b435(0x722));},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x74e)]=Window_NameInput[_0x265d62(0x7ee)][_0x265d62(0x370)],Window_NameInput['prototype'][_0x265d62(0x370)]=function(_0x11be56){const _0x5dede6=_0x265d62;if(this[_0x5dede6(0x6d4)]===_0x5dede6(0x637)&&!Input[_0x5dede6(0x443)]())return;if(Input[_0x5dede6(0x11b)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorRight']['call'](this,_0x11be56),this[_0x5dede6(0x1df)]('default');},VisuMZ['CoreEngine'][_0x265d62(0x796)]=Window_NameInput['prototype']['cursorLeft'],Window_NameInput[_0x265d62(0x7ee)][_0x265d62(0x2e7)]=function(_0x311548){const _0x5d6eec=_0x265d62;if(this[_0x5d6eec(0x6d4)]===_0x5d6eec(0x637)&&!Input[_0x5d6eec(0x443)]())return;if(Input[_0x5d6eec(0x11b)]())return;VisuMZ[_0x5d6eec(0x7f2)][_0x5d6eec(0x796)][_0x5d6eec(0x58f)](this,_0x311548),this[_0x5d6eec(0x1df)](_0x5d6eec(0x722));},VisuMZ[_0x265d62(0x7f2)]['Window_NameInput_cursorPagedown']=Window_NameInput[_0x265d62(0x7ee)][_0x265d62(0x4dd)],Window_NameInput[_0x265d62(0x7ee)][_0x265d62(0x4dd)]=function(){const _0x30726e=_0x265d62;if(this[_0x30726e(0x6d4)]===_0x30726e(0x637))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x30726e(0x7f2)]['Window_NameInput_cursorPagedown'][_0x30726e(0x58f)](this),this[_0x30726e(0x1df)]('default');},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x83a)]=Window_NameInput['prototype'][_0x265d62(0x1e9)],Window_NameInput[_0x265d62(0x7ee)][_0x265d62(0x1e9)]=function(){const _0x3ff86a=_0x265d62;if(this['_mode']===_0x3ff86a(0x637))return;if(Input[_0x3ff86a(0x11b)]())return;VisuMZ[_0x3ff86a(0x7f2)]['Window_NameInput_cursorPageup'][_0x3ff86a(0x58f)](this),this['switchModes'](_0x3ff86a(0x722));},VisuMZ[_0x265d62(0x7f2)]['Window_NameInput_refresh']=Window_NameInput[_0x265d62(0x7ee)][_0x265d62(0x359)],Window_NameInput[_0x265d62(0x7ee)]['refresh']=function(){const _0x245051=_0x265d62;if(this[_0x245051(0x6d4)]===_0x245051(0x637)){this[_0x245051(0x3ce)][_0x245051(0x490)](),this[_0x245051(0x52b)]['clear'](),this[_0x245051(0x750)]();let _0x1cda6a=VisuMZ['CoreEngine'][_0x245051(0x68a)]['KeyboardInput'][_0x245051(0x21e)][_0x245051(0x3af)]('\x0a'),_0x26035d=_0x1cda6a[_0x245051(0x33a)],_0x1ee378=(this[_0x245051(0x3cf)]-_0x26035d*this['lineHeight']())/0x2;for(let _0x384c5b=0x0;_0x384c5b<_0x26035d;++_0x384c5b){if(_0x245051(0x28a)===_0x245051(0x28a)){let _0x3e8b26=_0x1cda6a[_0x384c5b],_0x5d3355=this[_0x245051(0x75a)](_0x3e8b26)['width'],_0xab409f=Math['floor']((this[_0x245051(0x3ce)][_0x245051(0x3f1)]-_0x5d3355)/0x2);this[_0x245051(0x624)](_0x3e8b26,_0xab409f,_0x1ee378),_0x1ee378+=this[_0x245051(0x12e)]();}else return _0x7b02dd['CoreEngine'][_0x245051(0x1b6)][_0x245051(0x58f)](this);}}else VisuMZ['CoreEngine'][_0x245051(0x2dd)]['call'](this);};};VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x467)]=Window_ShopSell[_0x265d62(0x7ee)][_0x265d62(0x59b)],Window_ShopSell[_0x265d62(0x7ee)]['isEnabled']=function(_0x40ea22){const _0x4a1726=_0x265d62;return VisuMZ['CoreEngine'][_0x4a1726(0x68a)][_0x4a1726(0x6b6)][_0x4a1726(0x85c)]&&DataManager[_0x4a1726(0x427)](_0x40ea22)?![]:'BJgrB'===_0x4a1726(0x2f2)?VisuMZ[_0x4a1726(0x7f2)][_0x4a1726(0x467)][_0x4a1726(0x58f)](this,_0x40ea22):_0x813e88[_0x4a1726(0x891)][_0x4a1726(0x6e4)]['call'](this);},Window_NumberInput[_0x265d62(0x7ee)][_0x265d62(0x1db)]=function(){return![];};VisuMZ[_0x265d62(0x7f2)]['Settings']['KeyboardInput']['EnableNumberInput']&&(VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x4f6)]=Window_NumberInput[_0x265d62(0x7ee)][_0x265d62(0x705)],Window_NumberInput[_0x265d62(0x7ee)][_0x265d62(0x705)]=function(){const _0x704318=_0x265d62;VisuMZ[_0x704318(0x7f2)][_0x704318(0x4f6)]['call'](this),this[_0x704318(0x688)](this[_0x704318(0x195)]-0x1),Input[_0x704318(0x490)]();},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x540)]=Window_NumberInput[_0x265d62(0x7ee)]['processDigitChange'],Window_NumberInput[_0x265d62(0x7ee)][_0x265d62(0x67c)]=function(){const _0x143d6c=_0x265d62;if(!this[_0x143d6c(0x7d1)]())return;if(Input[_0x143d6c(0x11b)]())this[_0x143d6c(0x64d)]();else{if(Input[_0x143d6c(0x39d)]('backspace')){if(_0x143d6c(0x47e)!==_0x143d6c(0x47e))return 0x1;else this['processKeyboardBackspace']();}else{if(Input['_inputSpecialKeyCode']===0x2e)this[_0x143d6c(0x25a)]();else{if(Input[_0x143d6c(0x813)]===0x24)_0x143d6c(0x1b7)==='SKjNt'?this[_0x143d6c(0x533)]()?this[_0x143d6c(0x1b0)]():_0x5d02ce[_0x143d6c(0x7f2)][_0x143d6c(0x8cb)][_0x143d6c(0x58f)](this):this['processKeyboardHome']();else Input[_0x143d6c(0x813)]===0x23?_0x143d6c(0x34a)!==_0x143d6c(0x627)?this[_0x143d6c(0x2b1)]():(_0x4a722=_0x4c37c1[_0x143d6c(0x6e0)](),_0x44d38=_0xe498e3['maxLvGaugeColor2']()):VisuMZ['CoreEngine'][_0x143d6c(0x540)]['call'](this);}}}},Window_NumberInput[_0x265d62(0x7ee)][_0x265d62(0x675)]=function(){const _0x488127=_0x265d62;if(!this[_0x488127(0x1dd)]())return;Input['isNumpadPressed']()?this[_0x488127(0x64d)]():Window_Selectable[_0x488127(0x7ee)][_0x488127(0x675)]['call'](this);},Window_NumberInput[_0x265d62(0x7ee)][_0x265d62(0x36c)]=function(){},Window_NumberInput[_0x265d62(0x7ee)][_0x265d62(0x64d)]=function(){const _0xba3c78=_0x265d62;if(String(this['_number'])['length']>=this[_0xba3c78(0x195)])return;this['_number']=Number(String(this[_0xba3c78(0x475)])+Input[_0xba3c78(0x6eb)]);const _0x3f3784='9'[_0xba3c78(0x3ba)](this['_maxDigits']);this[_0xba3c78(0x475)]=this['_number']['clamp'](0x0,_0x3f3784),Input[_0xba3c78(0x490)](),this[_0xba3c78(0x359)](),SoundManager['playCursor'](),this[_0xba3c78(0x688)](this[_0xba3c78(0x195)]-0x1);},Window_NumberInput['prototype']['processKeyboardBackspace']=function(){const _0x61dfd3=_0x265d62;this[_0x61dfd3(0x475)]=Number(String(this[_0x61dfd3(0x475)])['slice'](0x0,-0x1)),this[_0x61dfd3(0x475)]=Math[_0x61dfd3(0x565)](0x0,this[_0x61dfd3(0x475)]),Input[_0x61dfd3(0x490)](),this[_0x61dfd3(0x359)](),SoundManager['playCursor'](),this[_0x61dfd3(0x688)](this[_0x61dfd3(0x195)]-0x1);},Window_NumberInput[_0x265d62(0x7ee)][_0x265d62(0x25a)]=function(){const _0x40d881=_0x265d62;this[_0x40d881(0x475)]=Number(String(this[_0x40d881(0x475)])[_0x40d881(0x1ee)](0x1)),this[_0x40d881(0x475)]=Math['max'](0x0,this[_0x40d881(0x475)]),Input[_0x40d881(0x490)](),this[_0x40d881(0x359)](),SoundManager[_0x40d881(0x5b6)](),this[_0x40d881(0x688)](this[_0x40d881(0x195)]-0x1);});;Window_TitleCommand[_0x265d62(0x242)]=VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x68a)]['TitleCommandList'],Window_TitleCommand['prototype']['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand[_0x265d62(0x7ee)][_0x265d62(0x4ea)]=function(){const _0x10dedd=_0x265d62;for(const _0x3ab770 of Window_TitleCommand[_0x10dedd(0x242)]){if(_0x3ab770['ShowJS'][_0x10dedd(0x58f)](this)){const _0x4e653f=_0x3ab770[_0x10dedd(0x5d9)];let _0xf3b346=_0x3ab770[_0x10dedd(0x1be)];if(['',_0x10dedd(0x2b7)][_0x10dedd(0x734)](_0xf3b346))_0xf3b346=_0x3ab770[_0x10dedd(0x62c)][_0x10dedd(0x58f)](this);const _0x340a5c=_0x3ab770[_0x10dedd(0x86e)][_0x10dedd(0x58f)](this),_0x5ea04b=_0x3ab770['ExtJS'][_0x10dedd(0x58f)](this);this[_0x10dedd(0x236)](_0xf3b346,_0x4e653f,_0x340a5c,_0x5ea04b),this[_0x10dedd(0x14c)](_0x4e653f,_0x3ab770['CallHandlerJS'][_0x10dedd(0x858)](this,_0x5ea04b));}}},Window_GameEnd['_commandList']=VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x68a)]['MenuLayout'][_0x265d62(0x461)][_0x265d62(0x5f6)],Window_GameEnd[_0x265d62(0x7ee)][_0x265d62(0x64e)]=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0x265d62(0x7ee)][_0x265d62(0x4ea)]=function(){const _0x10e739=_0x265d62;for(const _0x27a330 of Window_GameEnd[_0x10e739(0x242)]){if(_0x10e739(0x192)!==_0x10e739(0x192)){const _0xb3af4a=_0x22e34a[_0x440ea1],_0xe024ca='img/%1/'[_0x10e739(0x807)](_0x26003b);for(const _0x5a8a5d of _0xb3af4a){_0xd248c6[_0x10e739(0x52a)](_0xe024ca,_0x5a8a5d);}}else{if(_0x27a330['ShowJS'][_0x10e739(0x58f)](this)){const _0x1cbbd6=_0x27a330[_0x10e739(0x5d9)];let _0x443174=_0x27a330['TextStr'];if(['',_0x10e739(0x2b7)][_0x10e739(0x734)](_0x443174))_0x443174=_0x27a330[_0x10e739(0x62c)]['call'](this);const _0x2ee032=_0x27a330[_0x10e739(0x86e)][_0x10e739(0x58f)](this),_0x35b33a=_0x27a330[_0x10e739(0x322)][_0x10e739(0x58f)](this);this[_0x10e739(0x236)](_0x443174,_0x1cbbd6,_0x2ee032,_0x35b33a),this[_0x10e739(0x14c)](_0x1cbbd6,_0x27a330['CallHandlerJS']['bind'](this,_0x35b33a));}}}};function Window_ButtonAssist(){const _0x18b091=_0x265d62;this[_0x18b091(0x582)](...arguments);}function _0x4719(){const _0x541afe=['Power','YsCAk','SEPARATOR','focus','JnCxr','ColorDeath','isInstanceOfSceneMap','KEEP','EditBgType','VLuJb','_targetOffsetY','LhvvI','processHandling','VEnNd','process_VisuMZ_CoreEngine_Functions','IconXParam9','INOUTELASTIC','prototype','updateDocumentTitle','Layer','MIN_SAFE_INTEGER','CoreEngine','SwitchToggleRange','Manual','onClick','buyWindowRect','updateCoreEasing','getGamepads','sparamPlusJS','Speed','OUTQUART','useDigitGroupingEx','IconXParam5','gradientFillRect','learnings','ENTER','ExtractStrFromTroop','filter','Game_Troop_setup','cGPLP','requestPointAnimation','createTitleButtons','format','buttonAssistOffset3','createTroopNote','Pixelated','gBsuf','MINUS','paramX','helpWindowRect','currentClass','hpColor','drawGauge','TextManager_param','_inputSpecialKeyCode','ExtractStrFromList','Window_Base_update','createFauxAnimation','bRamq','meVolume','vWbpd','createButtonAssistWindow','OpenSpeed','destroyed','destroyCoreEngineMarkedBitmaps','ShowDevTools','showPointAnimations','isFauxAnimationPlaying','loadTitle1','adjustPictureAntiZoom','EnableNameInput','updatePosition','onDatabaseLoaded','isAnimationOffsetXMirrored','BackOpacity','popScene','drawValue','Mute','expRate','drawGameTitle','LXofc','_stored_mpGaugeColor1','XParamVocab9','F6key','ExportAllMapText','_index','IconSParam1','determineSideButtonLayoutValid','anchor','VMRVi','WPTmZ','〘Show\x20Text〙\x0a','NUMPAD1','Window_NameInput_cursorPageup','_actorWindow','maxBattleMembers','seVolume','Unnamed','6633qfJkmi','XJqct','makeFontSmaller','INBOUNCE','ydlTr','paramPlusJS','xparamRateJS','Spriteset_Base_destroy','process_VisuMZ_CoreEngine_Settings','Graphics_centerElement','isBottomHelpMode','CleWx','VVyDJ','_troopId','Scene_Boot_onDatabaseLoaded','sparamRate1','VitMx','IconSParam2','AllTroops','DefaultMode','YBGxW','dashToggle','pAmHK','VisuMZ_1_OptionsCore','down2','bind','measureTextWidth','OPEN_BRACKET','PWNJl','KeyItemProtect','Scene_GameEnd_createBackground','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','_setupEventHandlers','NUM','eFTjN','SkillTypeBgType','DcWxE','AntiZoomPictures','ATK','iZYHw','mpColor','createPointAnimationTargets','5MPtbXh','MDF','processTimingData','paramMaxJS','_opening','EnableJS','battleSystem','allowShiftScrolling','sfvKC','ZJeLO','mRFKN','gbHIm','Scene_Item_create','en-US','akwQv','_playtestF7Looping','SCROLL_LOCK','escape','VisuMZ_2_BattleSystemSTB','startShake','Game_Action_updateLastTarget','WIN_OEM_FJ_TOUROKU','QBwxP','WIN_OEM_CLEAR','_shakeSpeed','SystemLoadImages','OUTELASTIC','param','dHZzs','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','wpfJA','PRINT','textWidth','ipkwl','Game_Map_setup','rYFbT','rBtsS','_cache','HfwIn','KTYfm','layoutSettings','visible','_commonEventLayers','innerWidth','AfCKu','backspace','colSpacing','addWindow','evaded','CANCEL','LATIN1','klWpj','rmMAv','exportAllMapStrings','BTestAddedQuantity','floor','lIvxm','getCoreEngineScreenShakeStyle','systemColor','ParamName','Flat','NewGameCommonEvent','wjnuM','command355','ZNYWP','OUTQUAD','filterArea','optSideView','OUTSINE','fKyjB','isGamepadTriggered','Yvyvt','NONCONVERT','StartID','CustomParam','osQTw','ExportString','buttons','KeyTAB','_stored_crisisColor','_addShadow','EnableMasking','_screenY','CommandWidth','VWmKS','YWrTf','F23','sqrt','STENCIL_BUFFER_BIT','Wgqkt','QYACS','setWindowPadding','CustomParamNames','processCursorMoveModernControls','left','qFjKq','_backgroundFilter','MainMenu','Scene_Boot_updateDocumentTitle','QUESTION_MARK','NUAPN','paramRate2','_forcedTroopView','ActorBgType','Scene_Base_terminateAnimationClearBugFix','boxHeight','isSideButtonLayout','playTestF6','toUpperCase','BwqmE','GetParamIcon','fBnJL','isGamepadConnected','loadSystemImages','DigitGroupingStandardText','AdmFm','iCCSK','yEOOL','VisuMZ_2_BattleSystemBTB','outlineColor','tyTrS','sellWindowRect','playMiss','HelpRect','isNumpadPressed','SCyWr','KqOLG','darwin','home','removeChild','_centerElementCoreEngine','setupNewGame','MenuLayout','HIT','initCoreEasing','showDevTools','SideButtons','Window_NameInput_processTouch','powerUpColor','sv_actors','retrieveFauxAnimation','catchLoadError','_actor','lineHeight','BasicParameterFormula','targetX','_closing','_onKeyPress','moveCancelButtonSideButtonLayout','storeMapData','_stored_maxLvGaugeColor1','LQwzp','KeZCi','skills','DEF','WIN_ICO_CLEAR','SLASH','offsetY','Graphics_printError','_pauseSignSprite','loadTitle2','_lastX','ParseArmorNotetags','_mp','opacity','WIN_OEM_RESET','expGaugeColor2','SceneManager_onKeyDown','isSideView','createSpriteset','xparamFlat2','StatusEquipRect','buttonAssistKey1','setHandler','FunND','goldWindowRect','nxOyC','GoldRect','Smooth','OnLoadJS','setBackgroundType','shift','PJLcQ','CTB','ParseActorNotetags','addChild','xparam','helpAreaTop','updatePictureAntiZoom','statusEquipWindowRect','SkillMenu','data/','KeySHIFT','stringKeyMap','_statusEquipWindow','repositionCancelButtonSideButtonLayout','isPhysical','GroupDigits','doesNameContainBannedWords','initMembers','ZvxZg','dtdTg','drawParamName','_cacheScaleY','min','setSideView','itemLineRect','nifoZ','PdQDJ','_upArrowSprite','playBuzzer','reservePlayTestNewGameCommonEvent','nw.gui','_registerKeyInput','CHqHk','pointX','ADD','ColorManager_loadWindowskin','process_VisuMZ_CoreEngine_jsQuickFunctions','_bitmap','_hideButtons','itemPadding','BgFilename1','image-rendering','_stored_powerUpColor','system','WIN_OEM_BACKTAB','OS_KEY','fromCharCode','loadGameImagesCoreEngine','bgs','sdcZb','isCancelled','vCyYe','Bitmap_clearRect','eWFWU','BjVdr','indexOf','GpwlV','topxH','isCollidedWithEvents','setAttack','WOfjW','OAeSC','showFauxAnimations','EGCOh','_maxDigits','TextCodeNicknames','QVwhu','reduce','F11','CNT','createJsQuickFunction','tKWvD','paramWidth','Scene_Options_create','vJPEa','ProfileBgType','initBasic','terms','moveRelativeToResolutionChange','\x0a\x0a\x0a\x0a\x0a','ALT','CLOSE_BRACKET','removeAllPointAnimations','_editWindow','FAObb','EvyCX','sKQfS','_refreshBack','wUjHL','drawActorNickname','dQiRn','makeDocumentTitle','paramBase','trim','XParamVocab0','ParseTilesetNotetags','rVuQw','Scene_MenuBase_mainAreaTop','YcXUU','win32','command357','EQUAL','TimeProgress','initMembersCoreEngine','round','TextStr','PixelateImageRendering','dimColor1','toLowerCase','Sprite_Actor_setActorHome','_pictureName','_width','Game_Actor_paramBase','EQUALS','DOUBLE_QUOTE','OLcbx','Scene_Boot_loadSystemImages','itemRect','ezCAY','jBeDQ','_scene','fadeSpeed','pictureButtons','process_VisuMZ_CoreEngine_CustomParameters','Color','currentExp','QGUUs','itemHeight','Keyboard','bitmapWidth','updatePictureCoordinates','_refreshPauseSign','paramValueByName','updateFauxAnimations','isUseModernControls','create','isCursorMovable','animationId','switchModes','7930Cjpulv','isTpb','isDying','updateData','ItemPadding','isWindowMaskingEnabled','CEV','SPACE','ColorExpGauge2','cursorPageup','_goldWindow','stencilFunc','smooth','processTouch','substring','catchException','RegExp','picture','IconSParam9','F17','Scene_MenuBase_mainAreaHeight','AGI','ParseClassNotetags','MRF','pLxOe','actorWindowRect','CrisisRate','GoldChange','shake','EXR','RequireFocus','F7key','concat','parse','WIN_OEM_PA1','rThUe','SParamVocab6','integer','fillText','flush','updateOpen','BWowT','buttonAssistText4','playLoad','params','normal','ogFMR','REC','erXjz','Bitmap_drawText','batch','level','CRydw','createCancelButton','background','result','deselect','vertical','initialLevel','updateOpacity','MQVGz','ParamArrow','NameInputMessage','SceneManager_isGameActive','mainCommandWidth','OTB','Window_Base_initialize','initDigitGrouping','setActionState','uiAreaHeight','onKeyDown','tIkEl','ONE_MINUS_SRC_ALPHA','_hovered','buttonAssistSwitch','pictures','buttonAssistKey%1','DrawIcons','OptionsBgType','RaXGX','keyRepeatWait','scaleSprite','setCoreEngineScreenShakeStyle','createPointAnimationSprite','_sideButtonLayout','paramRate','addCommand','INOUTCUBIC','random','_context','IconParam0','Bitmap_resize','drawRightArrow','WIN_OEM_PA3','MRG','Flat1','ItemRect','_stored_hpGaugeColor2','_commandList','add','consumeItem','exit','createFauxAnimationSprite','TGR','ImgLoad','%2%1%3','pageup','Linear','MDR','makeFontBigger','AutoStretch','Gold','processMoveCommand','hit','processKeyboardHome','RowSpacing','ALTGR','_stored_hpGaugeColor1','EndingID','itemWindowRect','createPageButtons','IconSParam0','processKeyboardDelete','ColorMaxLvGauge2','ColorTPGauge2','QUOTE','guardSkillId','#%1','5433348icVSJe','onButtonImageLoad','StatusBgType','Sprite_Button_initialize','_pagedownButton','ESC','CLOSE_PAREN','loadWindowskin','pixelated','Game_Actor_levelUp','_timerSprite','Page','JBTPH','parseForcedGameTroopSettingsCoreEngine','EwSKw','COLON','Skcwx','jlCtc','ParamChange','cursorDown','buttonAssistText3','_pointAnimationQueue','%1〘End\x20Choice\x20Selection〙%1','paramY','changeClass','setMoveEasingType','applyCoreEasing','WIN_OEM_PA2','NuHLh','_skillTypeWindow','inBattle','titles1','xparamPlus1','_moveEasingType','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_profileWindow','ENTER_SPECIAL','VVdRH','OQOzq','_stored_tpCostColor','SmartEventCollisionPriority','loadIconBitmap','hhzAg','_paramPlus','moveMenuButtonSideButtonLayout','VOLUME_DOWN','Game_Interpreter_command111','toLocaleString','%1%2','getColorDataFromPluginParameters','paramRate1','oMYbX','\x5c}❪TAB❫\x5c{','currentLevelExp','351901bzcvwp','pXBPl','IconSet','%1〘Choice\x20Cancel〙%1','dcRKz','_drawTextOutline','isHandled','COMMA','EVA','PTB','paramBaseAboveLevel99','_colorCache','application/json','actor','Sprite_Battler_startMove','charCode','\x20Origin:\x20%1','_effectsContainer','YWwHV','ConvertNumberToString','Scene_Map_updateMainMultiply','TPB\x20WAIT','XParamVocab3','setMute','_pictureCoordinatesMode','NewGameCommonEventAll','iXnNl','processKeyboardEnd','isRightInputMode','ParseEnemyNotetags','createBackground','transform','drawText','Untitled','IconSParam6','IconSParam5','disable','mainAreaBottom','RightMenus','statusWindowRect','FiRqD','setLastPluginCommandInterpreter','exportAllTroopStrings','Plus','keyMapper','drawIcon','Sprite_Button_updateOpacity','statusParamsWindowRect','Bitmap_drawCircle','animationNextDelay','NumberRect','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','UNDERSCORE','_baseTexture','_numberWindow','currencyUnit','end','BTestWeapons','isTouchedInsideFrame','SystemSetSideView','URL','VisuMZ_2_BattleSystemETB','initVisuMZCoreEngine','Location','clearRect','_targetOffsetX','_hp','changeTextColor','Map%1.json','processEscape','ParseSkillNotetags','Window_NameInput_refresh','enter','INOUTQUAD','ETB','map','drawNewParam','DimColor2','SyLiC','Bitmap_strokeRect','AnimationPoint','cursorLeft','padding','XvsWL','requestFauxAnimation','_offsetY','drawGameVersion','TJWnI','FfJOb','_stored_ctGaugeColor1','checkCacheKey','Scene_Map_createSpriteset','BJgrB','DimColor1','show','ParseWeaponNotetags','IdbQt','X:\x20%1','RlMht','center','Sprite_Gauge_gaugeRate','ednTL','drawFace','ColorHPGauge1','worldTransform','editWindowRect','([\x5c+\x5c-]\x5cd+)>','CAPSLOCK','_changingClass','TextCodeClassNames','setColorTone','_downArrowSprite','_stored_mpGaugeColor2','skipBranch','origin','titles2','F12','LvExpGauge','padZero','_margin','OutlineColorGauge','isSmartEventCollisionOn','open','VisuMZ_2_BattleSystemCTB','LevelUpFullMp','contains','createTextState','Window_Selectable_processTouch','gainItem','F24','Troop%1','MenuBg','yScrollLinkedOffset','get','charAt','Scene_Name_onInputOk','sparamPlus1','nGaXl','_gamepadWait','Sprite_Animation_processSoundTimings','ExtJS','gSgnK','setSkill','playCancel','mpCostColor','%1:\x20Exit\x20','pointY','Game_Interpreter_command105','tilesets','breIa','alpha','LoadError','MAXMP','Scene_MenuBase_createCancelButton','_balloonQueue','1.3.0','onNameOk','makeInputButtonString','createCommandWindow','updatePositionCoreEngineShakeRand','MCR','Subtitle','attackSkillId','Scene_MenuBase_helpAreaTop','length','fdfJd','DDNSF','DTB','OpenConsole','damageColor','setClickHandler','CancelText','_statusWindow','jQOrU','ExtractStrFromMap','blt','Param','Padding','coSuH','ATTN','IRWPy','backOpacity','targetPosition','301DyZLGQ','wait','playTestF7','WIN_ICO_HELP','_customModified','setupCoreEasing','DOWN','ButtonFadeSpeed','mainAreaTop','PzQar','helpAreaHeight','updateLastTarget','refresh','levelUp','ColorMPCost','oyPWy','getBackgroundOpacity','targetSpritePosition','_data','ARRAYSTR','Plus2','retrievePointAnimation','ctGaugeColor2','isAlive','vertJS','_stored_powerDownColor','platform','gainSilentTp','JxPEo','SystemSetBattleSystem','》Comment《\x0a%1\x0a','processCursorHomeEndTrigger','maxLevel','jhjqS','jHByF','cursorRight','buttonAssistOffset1','setEnemyAction','text','YFjQD','SLEEP','jUdpy','_coreEngineShakeStyle','tpCostColor','makeDeepCopy','%1\x0a','openURL','filters','FadeSpeed','Game_Interpreter_PluginCommand','NUMPAD4','onInputBannedWords','Abbreviation','NgUzJ','isNormalPriority','offsetX','FDR','_cacheScaleX','$dataMap','ShopMenu','_slotWindow','STB','_backSprite2','ohavF','PERCENT','VisuMZ_2_BattleSystemPTB','gainGold','ColorSystem','drawSegment','updatePositionCoreEngineShakeOriginal','HASH','clamp','viewport','buttonAreaHeight','OkText','rLaxf','BTestItems','dKTbm','toString','SkillTypeRect','isSpecialCode','playOk','Game_Action_itemEva','paramFlat','subjectHitRate','F20','buttonAssistWindowButtonRect','TILDE','framebuffer','Game_Actor_changeClass','BTlcl','NhBdq','BYLuG','_lastPluginCommandInterpreter','Window_Selectable_itemRect','_onKeyDown','isEnemy','SwitchRandomizeRange','split','ZERO','Game_Picture_move','BattleSystem','hideButtonFromView','IjOqu','_mirror','prdFz','isAnimationPlaying','ParseItemNotetags','mirror','repeat','_stored_mpCostColor','_stored_normalColor','Atcuk','ctrl','OUTCIRC','startNormalGame','NUMPAD9','drawParamText','1366292AOVZgQ','ApplyEasing','buttonAssistWindowRect','STENCIL_TEST','neSvb','witwq','displayX','RIGHT','RevertPreserveNumbers','traitObjects','normalColor','contents','innerHeight','CommandBgType','DigitGroupingDamageSprites','original','imageSmoothingEnabled','Ajlfm','zXlID','Window_Selectable_processCursorMove','HAwuy','_CoreEngineSettings','kwyfZ','itemEva','setupCoreEngine','setTargetAnchor','QWqeB','playCursorSound','TranslucentOpacity','WIN_OEM_ATTN','WIN_OEM_FJ_ROYA','HOME','onLoad','INQUART','HRG','name','setAnchor','helpAreaBottom','lOgoh','SwitchActorText','numberShowButton','markCoreEngineModified','openingSpeed','DigitGroupingLocale','IconXParam8','paramPlus','width','(\x5cd+)>','scale','commandWindowRect','_movementDuration','_buttonType','ScaleY','PGUP','createEnemies','([\x5c+\x5c-]\x5cd+)([%％])>','XParamVocab1','processBack','slqlr','send','ielLk','getColor','_anchor','bgmVolume','PositionX','Game_Character_processMoveCommand','_dummyWindow','faces','updatePositionCoreEngine','CRI','ColorCTGauge1','wvCgb','_sellWindow','QncQD','expGaugeColor1','targetScaleY','YScYe','CommandRect','DIVIDE','Rate1','stop','_windowskin','subject','ThVoF','eva','updatePositionCoreEngineShakeHorz','createCustomBackgroundImages','ItemBgType','lkbHw','startMove','_optionsWindow','PSRLZ','TuFyi','_backSprite','textColor','ARRAYSTRUCT','Window_Base_drawText','targetBackOpacity','IconParam6','processTouchModernControls','isKeyItem','SellRect','CLEAR','ttKIm','down','centerSprite','rightArrowWidth','gaWwT','ordoh','F19','updateWaitMode','setup','getInputButtonString','_height','srKJW','_repositioned','isBusy','toDRQ','Scene_Shop_create','startAutoNewGame','INQUAD','WIN_OEM_FJ_LOYA','isPressed','animations','stretch','MAT','OtecD','missed','isArrowPressed','setViewport','_baseSprite','BannedWords','areButtonsOutsideMainUI','optionsWindowRect','SParamVocab4','SParamVocab9','isMaxLevel','adjustSprite','Upper\x20Left','paramchangeTextColor','AnimationID','mGVXN','drawCurrentParam','oLULN','isActor','OpenURL','_helpWindow','JsXdl','drawCharacter','Plus1','sceneTerminationClearEffects','note','itemHitImprovedAccuracy','onInputOk','NeTGk','Window_StatusBase_drawActorSimpleStatus','reserveCommonEvent','262952iqHFGi','GameEnd','PFdoS','XParamVocab4','updateScene','ImprovedAccuracySystem','makeAutoBattleActions','Window_ShopSell_isEnabled','DocumentTitleFmt','AMPERSAND','buttonY','enemy','targetOpacity','atbActive','_animationQueue','Game_Interpreter_updateWaitMode','levelUpRecovery','children','NUMPAD2','string','KeyboardInput','_number','overrideMimeType','runCombinedScrollingTextAsCode','drawAllParams','jsQuickFunc','_realScale','IconXParam6','_coreEasing','fQuEQ','ibRiB','IconParam2','zxbPr','characters','XParamVocab2','getLastPluginCommandInterpreter','KswNC','OptionsMenu','onKeyDownKeysF6F7','OUTCUBIC','qHvRr','isNextScene','vzjjG','UUqsr','GRD','GfHHy','vOiDk','advanced','clear','animationBaseDelay','printError','makeEncounterCount','FrmqW','ExportAllTroopText','createMenuButton','haAwa','OutlineColor','uixyy','erasePicture','xparamRate','WindowLayer_render','WSdjc','tab','Bitmap_measureTextWidth','gLOaL','resetFontSettings','bhywQ','bJFzn','updatePlayTestF7','isGamepadButtonPressed','qkJby','encounterStepsMinimum','WuUdT','F14','_lastY','CIRCUMFLEX','randomInt','ColorPowerDown','deathColor','ModernControls','altKey','GVAQV','FKvkh','replace','_offsetX','NUM_LOCK','nah','setValue','useDigitGrouping','GET','getPointAnimationLayer','smoothSelect','VmHJD','defineProperty','initCoreEngineScreenShake','GjUlJ','FUNC','PERIOD','ListRect','targets','OUTBACK','events','Scene_Base_createWindowLayer','HelpBgType','maxItems','Map%1','xparamPlusJS','buttonAssistText%1','Spriteset_Base_isAnimationPlaying','TitlePicButtons','mainAreaHeightSideButtonLayout','_coreEasingType','_encounterCount','MJHZe','_storedMapText','CJgLT','encounterStep','DKtnM','trTmq','faceHeight','ColorPowerUp','Center','openness','type','_lastOrigin','cursorPagedown','BuyBgType','getButtonAssistLocation','INOUTBACK','Spriteset_Base_update','_dimmerSprite','PictureCoordinatesMode','applyEasing','getInputMultiButtonStrings','VisuMZ_2_BattleSystemFTB','drawGameSubtitle','TitleCommandList','_movementWholeDuration','makeCoreEngineCommandList','Scene_Boot_startNormalGame','height','F10','IconXParam7','SParamVocab5','NUMPAD5','SParamVocab0','createCustomParameter','remove','scaleMode','smallParamFontSize','Window_NumberInput_start','804pGdULC','ItemStyle','STR','Game_BattlerBase_initMembers','ListBgType','Window_EquipItem_isEnabled','join','resetBattleSystem','ONFSL','Scene_Map_createMenuButton','Game_Picture_initBasic','F18','DTLKp','createFauxAnimationQueue','EVAL','horizontal','contentsOpacity','BTB','ONE','hpGaugeColor2','UPneV','EquipMenu','list','buttonAssistOk','maxCols','isPlaytest','IconXParam3','mute','KeyUnlisted','sTRLc','xparamRate1','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','cos','drawCurrencyValue','_inputWindow','mainFontSize','loadMapData','SParamVocab2','ProfileRect','NSYVZ','option','SELECT','_menuButton','ColorHPGauge2','tileWidth','_digitGrouping','isRepeated','lBHLs','_pictureContainer','CLOSE_CURLY_BRACKET','isPointAnimationPlaying','loadBitmap','contentsBack','TRG','BtirW','〘Common\x20Event\x20%1:\x20%2〙\x20End','abs','IconParam5','HANJA','pictureId','isFullDocumentTitle','_pollGamepads','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','jiofO','DgToY','xparamFlat1','<%1\x20%2:[\x20]','isPlaying','CallHandlerJS','phXWf','XParamVocab7','SParamVocab1','XeIWi','Window_NumberInput_processDigitChange','backgroundBitmap','TPB\x20ACTIVE','onEscapeSuccess','version','slotWindowRect','isItemStyle','OUTEXPO','WIN_OEM_WSCTRL','MAXHP','setEasingType','_defaultStretchMode','volume','_stored_deathColor','buttonAssistKey5','Spriteset_Battle_createEnemies','performEscape','LineHeight','StatusRect','paramFlatBonus','maxGold','ActorMPColor','IDs','【%1】\x0a','ColorMaxLvGauge1','ValueJS','vpxvs','_stored_ctGaugeColor2','DataManager_setupNewGame','onload','FunctionName','ddEri','INEXPO','Scene_Skill_create','ScreenShake','Kfldw','Tilemap_addShadow','max','DATABASE','ExportStrFromAllTroops','SHqzR','ActorTPColor','eMUBf','_statusParamsWindow','helpAreaTopSideButtonLayout','Y:\x20%1','BGbpZ','skillTypes','SaveMenu','CategoryBgType','coreEngineRepositionEnemies','updatePointAnimations','SellBgType','ButtonHeight','Opacity','DashToggleR','description','iconHeight','qcMFP','_buyWindow','DigitGroupingExText','Window_NameInput_cursorPagedown','Game_Screen_initialize','button','pop','INOUTBOUNCE','initialize','isNwjs','FLreJ','sparamRate2','targetY','REPLACE','command105','requestMotion','_playTestFastMode','Window_NameInput_processHandling','GoldBgType','top','duration','call','Window','TextFmt','_muteSound','ExportStrFromAllMaps','JtDma','_currentMap','_clientArea','_battleField','3121892UkEvCj','_viewportSize','_stored_systemColor','isEnabled','processSoundTimings','QvqqY','updateDashToggle','SMVDa','msGOh','EXECUTE','EwgzP','CcCsq','faceWidth','connected','reserveNewGameCommonEvent','_stored_tpGaugeColor2','_buttonAssistWindow','vTYnC','enableDigitGroupingEx','CustomParamAbb','NTktz','Type','isActiveTpb','touchUI','Game_Interpreter_command122','subtitle','setSideButtonLayout','LfKWs','createChildSprite','listWindowRect','playCursor','MULTIPLY','wholeDuration','Input_update','IconSParam8','getLevel','FTB','PA1','bgm','catchUnknownError','setActorHomeRepositioned','tpGaugeColor1','Sprite_AnimationMV_processTimingData','dimColor2','itemHit','render','_fauxAnimationSprites','Scene_Battle_update','style','CustomParamType','paramName','RPGMAKER_VERSION','INOUTEXPO','feooN','HELP','onXhrError','buttonAssistText5','GHZRt','battlebacks2','areButtonsHidden','gaugeRate','FQBQD','commandWindowRows','makeActionList','HcTYy','Symbol','GREATER_THAN','processPointAnimationRequests','xparamFlatBonus','move','forceOutOfPlaytest','maxLvGaugeColor2','DECIMAL','mrGyo','buttonAssistKey4','Wait','_stored_expGaugeColor2','itemBackColor2','Max','processAlwaysEscape','_itemWindow','jkTSN','processKeyboardHandling','NUMPAD7','MAX_GL_TEXTURES','sparamPlus2','_shakeDuration','drawBackgroundRect','enemies','displayY','code','Scene_Map_updateScene','JUNJA','RepositionActors','CommandList','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','VgdSd','calcCoreEasing','randomJS','categoryWindowRect','FUplE','initialBattleSystem','cancel','Game_Action_itemHit','setupButtonImage','buttonAssistText2','mainAreaHeight','vhUcl','createBuffer','MAX_SAFE_INTEGER','jIqNv','setFrame','Graphics_defaultStretchMode','pressed','outlineColorGauge','StatusParamsBgType','boxWidth','setGuard','getBattleSystem','gaugeBackColor','avAPv','targetContentsOpacity','valueOutlineWidth','pendingColor','BoxMargin','LUK','exec','ButtonAssist','_stored_maxLvGaugeColor2','hide','canEquip','fDXZw','_backSprite1','OThHQ','horzJS','_drawTextShadow','PictureEraseAll','SEMICOLON','removePointAnimation','QwertyLayout','drawTextEx','_shakePower','isSceneMap','EhpOB','gold','jQwSr','fontSize','setAction','TextJS','Game_Temp_initialize','isAnimationForEach','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','OPEN_CURLY_BRACKET','XParamVocab6','outbounce','text%1','enable','updateMove','UJtlD','keyboard','_battlerName','setViewportCoreEngineFix','Game_Event_isCollidedWithEvents','sparamFlatBonus','syvsA','adjustBoxSize','CONVERT','vlNKG','nzVNf','rgba(0,\x200,\x200,\x200.7)','_isButtonHidden','setupBattleTestItems','ixYmy','font-smooth','hpGaugeColor1','Window_Base_drawCharacter','initButtonHidden','LESS_THAN','keypress','createWindowLayer','Window_Selectable_cursorDown','processKeyboardDigitChange','makeCommandList','HKqcY','IconXParam0','RwJBk','test','buttonAssistText1','getCombinedScrollingText','mhp','6Nqksbp','INOUTQUINT','BottomButtons','sin','Input_clear','INCUBIC','voVfx','keyCode','bMzuJ','loadSystem','asin','Duration','Bitmap_fillRect','windowPadding','_pictureCoordinatesWindow','CategoryRect','addEventListener','_pageupButton','Game_Picture_updateMove','Spriteset_Base_initialize','cursorUp','PRESERVCONVERSION(%1)','PositionJS','ctrlKey','Title','drawGoldItemStyle','updatePositionCoreEngineShakeVert','UbuPI','right','rvwTW','pow','processCursorMove','gInSK','itemBackColor1','value','members','edWYG','WIN_OEM_ENLW','processDigitChange','FontSmoothing','buttonAssistOffset4','UhShg','IconXParam4','gameTitle','ItemHeight','isMenuButtonAssistEnabled','ctGaugeColor1','isInputting','_digitGroupingEx','setupValueFont','select','getCustomBackgroundSettings','Settings','xScrollLinkedOffset','yrCWI','isSceneBattle','VCnJg','BattleManager_processEscape','isTriggered','drawActorLevel','Sprite_Picture_updateOrigin','WzTRW','PAUSE','match','updateTransform','sparamPlus','DisplayedParams','terminate','F13','Bitmap_blt','ZNQKt','yRfMP','key%1','CONTEXT_MENU','ceil','DfXQe','EELsc','END','aPcbq','PDR','updateMain','enableDigitGrouping','ndpCK','maxTp','iconWidth','_backgroundSprite','F15','TCR','_pressed','targetEvaRate','RepositionEnemies130','canUse','Scene_Name_create','cpEYk','parameters','SceneManager_initialize','QoL','bitmapHeight','kjxrm','BgFilename2','_active','constructor','_categoryWindow','ParamMax','DrawItemBackgroundJS','NewGameBoot','Exported_Script_%1.txt','Origin','_spriteset','pagedown','setCoreEngineUpdateWindowBg','ItemBackColor2','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','apply','Game_Picture_x','startAnimation','Scene_Menu_create','FontSize','bitmap','nickname','auPVS','skillTypeWindowRect','rgba(0,\x200,\x200,\x201.0)','_forcedBattleSys','buttonAssistWindowSideRect','drawActorSimpleStatus','_mode','TRAIT_PARAM','Game_Interpreter_command355','VOAhy','MVivm','Scene_Status_create','isMapScrollLinked','ItemBackColor1','CreateBattleSystemID','_destroyInternalTextures','valueOutlineColor','_animation','maxLvGaugeColor1','kNNXb','playEscape','vRUgB','InputRect','Game_Picture_y','vFKcF','TAB','Window_NameInput_cursorUp','traitsPi','sparamFlat2','_inputString','clearForcedGameTroopSettingsCoreEngine','initCoreEngine','equips','ZofOm','PreserveNumbers','renderNoMask','fillRect','ParseAllNotetags','update','_origin','ShowButtons','up2','Window_Base_drawFace','drawItem','originalJS','CTRL','isClosed','rjAbe','IconSParam7','ItemMenu','EREOF','_pointAnimationSprites','StatusParamsRect','vLWtA','resize','start','OeAWZ','BACK_SLASH','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','battlebacks1','ARRAYJSON','Total','paramMax','pages','img/%1/','numActions','repositionEnemiesByResolution','Graphics','BlurFilter','APQBY','removeAllFauxAnimations','mapId','buttonAssistOffset5','titleCommandWindow','LevelUpFullHp','ALWAYS','toFixed','Window_NameInput_initialize','targetObjects','drawActorExpGauge','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','gaugeLineHeight','ScaleX','_hideTileShadows','default','XzoBR','blendFunc','Scene_Battle_createCancelButton','PHA','_list','sparamRate','XParameterFormula','Key%1','LEFT','xdg-open','Chance','Window_Selectable_cursorUp','successRate','animationShouldMirror','Game_BattlerBase_refresh','fillStyle','Window_StatusBase_drawActorLevel','includes','CustomParamIcons','PictureEraseRange','Input_onKeyDown','setMainFontSize','WIN_OEM_JUMP','Rate2','isMaskingEnabled','processFauxAnimationRequests','tmelv','index','YCchS','isItem','WIN_OEM_AUTO','ShowItemBackground','Window_Base_drawIcon','WKoJn','MEV','_fauxAnimationQueue','pMMvQ','Window_Selectable_drawBackgroundRect','ExportCurTroopText','tileHeight','WIN_OEM_FINISH','bJJSb','ColorTPGauge1','Window_NameInput_cursorRight','setBackgroundOpacity','resetTextColor','BACK_QUOTE','_clickHandler','PGDN','buttonAssistKey3','_cancelButton','Sprite_Gauge_currentValue','process_VisuMZ_CoreEngine_Notetags','CRSEL','Input_setupEventHandlers','textSizeEx','createPointAnimationQueue','PLUS','_colorTone','Renderer','mKdEy','Window_Base_createTextState','Game_Picture_calcEasing','sparam','LoadMenu','ySoIc','InputBgType','FontShadows','stencilOp','areTileShadowsHidden','needsUpdate','_blank','movePageButtonSideButtonLayout','RepositionEnemies','itypeId','powerDownColor','Enable','Window_Gold_refresh','FhTwm','catchNormalError','goto','_commandWindow','KvNZA','windowOpacity','parallaxes','_targetAnchor','Eahzu','registerCommand','nsyID','Control\x20Variables\x20Script\x20Error','ASTERISK','551355GXRkpv','log','Version','jEkDn','Game_System_initialize','OUTBOUNCE','Window_NameInput_cursorDown','translucentOpacity','addLoadListener','setBattleSystem','strokeRect','command122','AnimationMirrorOffset','updateOrigin','SCALE_MODES','responseText','EVdxZ','command111','SHIFT','removeFauxAnimation','applyForcedGameTroopSettingsCoreEngine','AllMaps','rsJoa','〘Scrolling\x20Text〙\x0a','Window_NameInput_cursorLeft','WASD','buttonAssistOffset%1','ParseStateNotetags','bytnt','alwaysDash','\x5c}❪SHIFT❫\x5c{','outlineColorDmg','AccuracyBoost','Spriteset_Base_updatePosition','status','Ddvya','Sprite_Picture_loadBitmap','mainAreaTopSideButtonLayout','inbounce','SParamVocab8','BuyRect','sv_enemies','_windowLayer','isOptionValid','Actor','item','_listWindow','isBottomButtonMode','BlendMode','WIN_ICO_00','FjUgO','VisuMZ_2_BattleSystemOTB','_shouldPreventDefault','evade','bgsVolume','exp','JGdEJ','ScreenResolution','Input_shouldPreventDefault','number','currentValue','usableSkills','clone','NUMPAD8','drawIconBySize','_storedStack','updateEffekseer','endAnimation','SwitchRandomizeOne','EscapeAlways','VUiex','LINEAR','hhVta','INELASTIC','ConvertParams','BTestArmors','Enemy','ColorCTGauge2','SideView','createPointAnimation','MWBFe','Bitmap_drawTextOutline','push','isOpenAndActive','_tempActor','BottomHelp','none','DamageColor','destroy','isMVAnimation','Conditional\x20Branch\x20Script\x20Error','SaVAL','crisisColor','Bitmap_gradientFillRect','dummyWindowRect'];_0x4719=function(){return _0x541afe;};return _0x4719();}Window_ButtonAssist[_0x265d62(0x7ee)]=Object[_0x265d62(0x1dc)](Window_Base[_0x265d62(0x7ee)]),Window_ButtonAssist[_0x265d62(0x7ee)][_0x265d62(0x6bb)]=Window_ButtonAssist,Window_ButtonAssist[_0x265d62(0x7ee)]['initialize']=function(_0x9365ae){const _0x58c731=_0x265d62;this[_0x58c731(0x35f)]={},Window_Base[_0x58c731(0x7ee)][_0x58c731(0x582)][_0x58c731(0x58f)](this,_0x9365ae),this[_0x58c731(0x153)](VisuMZ[_0x58c731(0x7f2)][_0x58c731(0x68a)][_0x58c731(0x617)]['BgType']||0x0),this['refresh']();},Window_ButtonAssist[_0x265d62(0x7ee)][_0x265d62(0x24d)]=function(){const _0x2394ed=_0x265d62;this[_0x2394ed(0x3ce)]['fontSize']<=0x60&&(this[_0x2394ed(0x3ce)][_0x2394ed(0x62a)]+=0x6);},Window_ButtonAssist['prototype'][_0x265d62(0x841)]=function(){const _0x3b4cab=_0x265d62;this['contents'][_0x3b4cab(0x62a)]>=0x18&&(this[_0x3b4cab(0x3ce)][_0x3b4cab(0x62a)]-=0x6);},Window_ButtonAssist[_0x265d62(0x7ee)][_0x265d62(0x6f4)]=function(){const _0x4c72f7=_0x265d62;Window_Base[_0x4c72f7(0x7ee)]['update'][_0x4c72f7(0x58f)](this),this['updateKeyText']();},Window_ButtonAssist['prototype']['updatePadding']=function(){const _0x187508=_0x265d62;this[_0x187508(0x2e8)]=SceneManager['_scene'][_0x187508(0x4df)]()!==_0x187508(0x57f)?0x0:0x8;},Window_ButtonAssist[_0x265d62(0x7ee)]['updateKeyText']=function(){const _0x19bc60=_0x265d62,_0x3f40e1=SceneManager[_0x19bc60(0x1cd)];for(let _0x208ddc=0x1;_0x208ddc<=0x5;_0x208ddc++){if(this[_0x19bc60(0x35f)][_0x19bc60(0x69e)[_0x19bc60(0x807)](_0x208ddc)]!==_0x3f40e1[_0x19bc60(0x22c)[_0x19bc60(0x807)](_0x208ddc)]())return this[_0x19bc60(0x359)]();if(this[_0x19bc60(0x35f)][_0x19bc60(0x633)[_0x19bc60(0x807)](_0x208ddc)]!==_0x3f40e1[_0x19bc60(0x4cb)['format'](_0x208ddc)]())return this['refresh']();}},Window_ButtonAssist['prototype'][_0x265d62(0x359)]=function(){const _0x2b28bc=_0x265d62;this['contents'][_0x2b28bc(0x490)]();for(let _0x86b720=0x1;_0x86b720<=0x5;_0x86b720++){_0x2b28bc(0x67f)!==_0x2b28bc(0x67f)?_0x46a464[_0x2b28bc(0x7d0)](_0x323e8e):this[_0x2b28bc(0x391)](_0x86b720);}},Window_ButtonAssist['prototype'][_0x265d62(0x391)]=function(_0xc75315){const _0x4a16f7=_0x265d62,_0x5de976=this[_0x4a16f7(0x894)]/0x5,_0x3e57ff=SceneManager['_scene'],_0x58032a=_0x3e57ff[_0x4a16f7(0x22c)[_0x4a16f7(0x807)](_0xc75315)](),_0xeff54a=_0x3e57ff[_0x4a16f7(0x4cb)[_0x4a16f7(0x807)](_0xc75315)]();this[_0x4a16f7(0x35f)][_0x4a16f7(0x69e)[_0x4a16f7(0x807)](_0xc75315)]=_0x58032a,this['_data'][_0x4a16f7(0x633)['format'](_0xc75315)]=_0xeff54a;if(_0x58032a==='')return;if(_0xeff54a==='')return;const _0x411258=_0x3e57ff[_0x4a16f7(0x798)['format'](_0xc75315)](),_0x38135e=this[_0x4a16f7(0x17c)](),_0x4c7890=_0x5de976*(_0xc75315-0x1)+_0x38135e+_0x411258,_0x49a228=VisuMZ[_0x4a16f7(0x7f2)][_0x4a16f7(0x68a)][_0x4a16f7(0x617)][_0x4a16f7(0x591)];this[_0x4a16f7(0x624)](_0x49a228['format'](_0x58032a,_0xeff54a),_0x4c7890,0x0,_0x5de976-_0x38135e*0x2);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x46f)]=Game_Interpreter[_0x265d62(0x7ee)]['updateWaitMode'],Game_Interpreter['prototype'][_0x265d62(0x431)]=function(){const _0x5bdd6c=_0x265d62;if($gameTemp['_pictureCoordinatesMode']!==undefined){if('DgToY'!==_0x5bdd6c(0x537))this[_0x5bdd6c(0x6d1)]='ETB';else return VisuMZ['CoreEngine']['UpdatePictureCoordinates']();}return VisuMZ['CoreEngine'][_0x5bdd6c(0x46f)][_0x5bdd6c(0x58f)](this);},VisuMZ['CoreEngine']['UpdatePictureCoordinates']=function(){const _0x1ae2e0=_0x265d62,_0x52a2df=$gameTemp[_0x1ae2e0(0x2ae)]||0x0;if(_0x52a2df<0x0||_0x52a2df>0x64||TouchInput['isCancelled']()||Input[_0x1ae2e0(0x690)](_0x1ae2e0(0x5fe))){if(_0x1ae2e0(0x456)===_0x1ae2e0(0x456))$gameTemp[_0x1ae2e0(0x2ae)]=undefined,Input['clear'](),TouchInput['clear']();else{const _0x4decb9=this['createChildSprite'](_0x3064be,_0x3ae8ee);_0x4decb9[_0x1ae2e0(0x6cc)][_0x1ae2e0(0x2b6)](_0x247362[_0x280701],0x0,0x0,_0x22496e,_0x293358,_0x1ae2e0(0x2f9)),_0x4decb9['x']=(_0x41cd0e-(_0x13115b[_0x1ae2e0(0x33a)]-0x1)/0x2)*_0x315384,_0x4decb9['dy']=-_0x19bfc8;}}const _0x304c41=$gameScreen[_0x1ae2e0(0x1f1)](_0x52a2df);return _0x304c41&&(_0x1ae2e0(0x33b)===_0x1ae2e0(0x5a0)?this[_0x1ae2e0(0x405)][_0x1ae2e0(0x153)](_0x148258[_0x1ae2e0(0x891)]['DummyBgType']):(_0x304c41['_x']=TouchInput['_x'],_0x304c41['_y']=TouchInput['_y'])),VisuMZ['CoreEngine'][_0x1ae2e0(0x1d7)](),$gameTemp[_0x1ae2e0(0x2ae)]!==undefined;},VisuMZ['CoreEngine']['updatePictureCoordinates']=function(){const _0x138bcf=_0x265d62,_0x2efb0=SceneManager[_0x138bcf(0x1cd)];if(!_0x2efb0)return;!_0x2efb0[_0x138bcf(0x664)]&&(_0x138bcf(0x863)!=='iwmSH'?(SoundManager[_0x138bcf(0x20b)](),_0x2efb0[_0x138bcf(0x664)]=new Window_PictureCoordinates(),_0x2efb0[_0x138bcf(0x158)](_0x2efb0['_pictureCoordinatesWindow'])):(this[_0x138bcf(0x46e)]=[],this[_0x138bcf(0x746)]=[],this['_pointAnimationQueue']=[],this['_balloonQueue']=[])),$gameTemp[_0x138bcf(0x2ae)]===undefined&&('VVdRH'===_0x138bcf(0x285)?(SoundManager[_0x138bcf(0x325)](),_0x2efb0[_0x138bcf(0x120)](_0x2efb0[_0x138bcf(0x664)]),_0x2efb0[_0x138bcf(0x664)]=undefined):(_0x36d04d[_0x138bcf(0x7f2)][_0x138bcf(0x4f6)][_0x138bcf(0x58f)](this),this[_0x138bcf(0x688)](this[_0x138bcf(0x195)]-0x1),_0xa5435c['clear']()));};function Window_PictureCoordinates(){const _0x1eaa69=_0x265d62;this[_0x1eaa69(0x582)](...arguments);}Window_PictureCoordinates['prototype']=Object[_0x265d62(0x1dc)](Window_Base['prototype']),Window_PictureCoordinates[_0x265d62(0x7ee)][_0x265d62(0x6bb)]=Window_PictureCoordinates,Window_PictureCoordinates['prototype']['initialize']=function(){const _0x1bc4f4=_0x265d62;this[_0x1bc4f4(0x4dc)]=_0x1bc4f4(0x4b6),this['_lastX']=_0x1bc4f4(0x4b6),this[_0x1bc4f4(0x4aa)]=_0x1bc4f4(0x4b6);const _0x1b4209=this['windowRect']();Window_Base['prototype']['initialize'][_0x1bc4f4(0x58f)](this,_0x1b4209),this[_0x1bc4f4(0x153)](0x2);},Window_PictureCoordinates['prototype']['windowRect']=function(){const _0x9d2f2c=_0x265d62;let _0x12f1dd=0x0,_0x4e06ff=Graphics[_0x9d2f2c(0x4ec)]-this[_0x9d2f2c(0x12e)](),_0x173201=Graphics[_0x9d2f2c(0x3f1)],_0xe03436=this[_0x9d2f2c(0x12e)]();return new Rectangle(_0x12f1dd,_0x4e06ff,_0x173201,_0xe03436);},Window_PictureCoordinates['prototype']['updatePadding']=function(){this['padding']=0x0;},Window_PictureCoordinates[_0x265d62(0x7ee)][_0x265d62(0x6f4)]=function(){const _0x22f830=_0x265d62;Window_Base[_0x22f830(0x7ee)][_0x22f830(0x6f4)]['call'](this),this[_0x22f830(0x1e3)]();},Window_PictureCoordinates[_0x265d62(0x7ee)][_0x265d62(0x1e3)]=function(){if(!this['needsUpdate']())return;this['refresh']();},Window_PictureCoordinates[_0x265d62(0x7ee)][_0x265d62(0x769)]=function(){const _0x39f783=_0x265d62,_0x576fff=$gameTemp['_pictureCoordinatesMode'],_0x4daebc=$gameScreen[_0x39f783(0x1f1)](_0x576fff);return _0x4daebc?this[_0x39f783(0x4dc)]!==_0x4daebc[_0x39f783(0x6f5)]||this['_lastX']!==_0x4daebc['_x']||this['_lastY']!==_0x4daebc['_y']:![];},Window_PictureCoordinates['prototype'][_0x265d62(0x359)]=function(){const _0x4cf6ed=_0x265d62;this[_0x4cf6ed(0x3ce)][_0x4cf6ed(0x490)]();const _0x5b571=$gameTemp[_0x4cf6ed(0x2ae)],_0x152dbe=$gameScreen[_0x4cf6ed(0x1f1)](_0x5b571);if(!_0x152dbe)return;this[_0x4cf6ed(0x4dc)]=_0x152dbe[_0x4cf6ed(0x6f5)],this[_0x4cf6ed(0x140)]=_0x152dbe['_x'],this[_0x4cf6ed(0x4aa)]=_0x152dbe['_y'];const _0x556237=ColorManager[_0x4cf6ed(0x677)]();this[_0x4cf6ed(0x3ce)]['fillRect'](0x0,0x0,this[_0x4cf6ed(0x894)],this['innerHeight'],_0x556237);const _0x4f602c=_0x4cf6ed(0x2a6)['format'](_0x152dbe[_0x4cf6ed(0x6f5)]===0x0?'Upper\x20Left':_0x4cf6ed(0x4d9)),_0x257c2f=_0x4cf6ed(0x2f7)[_0x4cf6ed(0x807)](_0x152dbe['_x']),_0x7c0d5d=_0x4cf6ed(0x56d)[_0x4cf6ed(0x807)](_0x152dbe['_y']),_0x4dece2=_0x4cf6ed(0x327)['format'](TextManager[_0x4cf6ed(0x433)]('cancel'));let _0x196300=Math[_0x4cf6ed(0x8a0)](this['innerWidth']/0x4);this[_0x4cf6ed(0x2b6)](_0x4f602c,_0x196300*0x0,0x0,_0x196300),this['drawText'](_0x257c2f,_0x196300*0x1,0x0,_0x196300,_0x4cf6ed(0x2f9)),this[_0x4cf6ed(0x2b6)](_0x7c0d5d,_0x196300*0x2,0x0,_0x196300,'center');const _0x43c7cd=this['textSizeEx'](_0x4dece2)['width'],_0x130958=this[_0x4cf6ed(0x894)]-_0x43c7cd;this[_0x4cf6ed(0x624)](_0x4dece2,_0x130958,0x0,_0x43c7cd);},VisuMZ[_0x265d62(0x81e)]=function(_0x1ae4bc){const _0x27648b=_0x265d62;if(Utils[_0x27648b(0x7a9)](_0x27648b(0x652))){if('IaeBn'!==_0x27648b(0x1ad)){var _0x49d8d2=require(_0x27648b(0x173))['Window']['get']();SceneManager['showDevTools']();if(_0x1ae4bc)setTimeout(_0x49d8d2[_0x27648b(0x7e0)][_0x27648b(0x858)](_0x49d8d2),0x190);}else return _0x6a67fa;}},VisuMZ['ApplyEasing']=function(_0x3a1d5,_0x1d26f4){const _0x182e08=_0x265d62;_0x1d26f4=_0x1d26f4[_0x182e08(0x8d5)]();var _0xe7ac77=1.70158,_0x29b245=0.7;switch(_0x1d26f4){case _0x182e08(0x7c5):return _0x3a1d5;case'INSINE':return-0x1*Math[_0x182e08(0x517)](_0x3a1d5*(Math['PI']/0x2))+0x1;case _0x182e08(0x8ad):return Math[_0x182e08(0x659)](_0x3a1d5*(Math['PI']/0x2));case'INOUTSINE':return-0.5*(Math[_0x182e08(0x517)](Math['PI']*_0x3a1d5)-0x1);case _0x182e08(0x43b):return _0x3a1d5*_0x3a1d5;case _0x182e08(0x8aa):return _0x3a1d5*(0x2-_0x3a1d5);case _0x182e08(0x2df):return _0x3a1d5<0.5?0x2*_0x3a1d5*_0x3a1d5:-0x1+(0x4-0x2*_0x3a1d5)*_0x3a1d5;case _0x182e08(0x65b):return _0x3a1d5*_0x3a1d5*_0x3a1d5;case _0x182e08(0x487):var _0x5d74ac=_0x3a1d5-0x1;return _0x5d74ac*_0x5d74ac*_0x5d74ac+0x1;case _0x182e08(0x237):return _0x3a1d5<0.5?0x4*_0x3a1d5*_0x3a1d5*_0x3a1d5:(_0x3a1d5-0x1)*(0x2*_0x3a1d5-0x2)*(0x2*_0x3a1d5-0x2)+0x1;case _0x182e08(0x3e4):return _0x3a1d5*_0x3a1d5*_0x3a1d5*_0x3a1d5;case _0x182e08(0x7fb):var _0x5d74ac=_0x3a1d5-0x1;return 0x1-_0x5d74ac*_0x5d74ac*_0x5d74ac*_0x5d74ac;case'INOUTQUART':var _0x5d74ac=_0x3a1d5-0x1;return _0x3a1d5<0.5?0x8*_0x3a1d5*_0x3a1d5*_0x3a1d5*_0x3a1d5:0x1-0x8*_0x5d74ac*_0x5d74ac*_0x5d74ac*_0x5d74ac;case'INQUINT':return _0x3a1d5*_0x3a1d5*_0x3a1d5*_0x3a1d5*_0x3a1d5;case'OUTQUINT':var _0x5d74ac=_0x3a1d5-0x1;return 0x1+_0x5d74ac*_0x5d74ac*_0x5d74ac*_0x5d74ac*_0x5d74ac;case _0x182e08(0x657):var _0x5d74ac=_0x3a1d5-0x1;return _0x3a1d5<0.5?0x10*_0x3a1d5*_0x3a1d5*_0x3a1d5*_0x3a1d5*_0x3a1d5:0x1+0x10*_0x5d74ac*_0x5d74ac*_0x5d74ac*_0x5d74ac*_0x5d74ac;case _0x182e08(0x560):if(_0x3a1d5===0x0)return 0x0;return Math[_0x182e08(0x674)](0x2,0xa*(_0x3a1d5-0x1));case _0x182e08(0x547):if(_0x3a1d5===0x1){if('rCHZW'!==_0x182e08(0x186))return 0x1;else this[_0x182e08(0x56b)]['setBackgroundType'](_0x2e5a60[_0x182e08(0x891)][_0x182e08(0x60b)]);}return-Math['pow'](0x2,-0xa*_0x3a1d5)+0x1;case _0x182e08(0x5cc):if(_0x3a1d5===0x0||_0x3a1d5===0x1)return'HzErQ'==='HzErQ'?_0x3a1d5:_0x182e08(0x29f);var _0x495d58=_0x3a1d5*0x2,_0x37153a=_0x495d58-0x1;if(_0x495d58<0x1){if(_0x182e08(0x40a)!==_0x182e08(0x40a))this[_0x182e08(0x252)]();else return 0.5*Math[_0x182e08(0x674)](0x2,0xa*_0x37153a);}return 0.5*(-Math[_0x182e08(0x674)](0x2,-0xa*_0x37153a)+0x2);case'INCIRC':var _0x495d58=_0x3a1d5/0x1;return-0x1*(Math[_0x182e08(0x8c0)](0x1-_0x495d58*_0x3a1d5)-0x1);case _0x182e08(0x3bf):var _0x5d74ac=_0x3a1d5-0x1;return Math[_0x182e08(0x8c0)](0x1-_0x5d74ac*_0x5d74ac);case'INOUTCIRC':var _0x495d58=_0x3a1d5*0x2,_0x37153a=_0x495d58-0x2;if(_0x495d58<0x1){if(_0x182e08(0x53f)!==_0x182e08(0x5fc))return-0.5*(Math['sqrt'](0x1-_0x495d58*_0x495d58)-0x1);else{const _0xfa605=_0x182e08(0x2ef);this[_0x182e08(0x2a1)]=this[_0x182e08(0x2a1)]||{};if(this[_0x182e08(0x2a1)][_0xfa605])return this['_colorCache'][_0xfa605];const _0x11b879=_0x3fc672[_0x182e08(0x7f2)][_0x182e08(0x68a)]['Color'][_0x182e08(0x409)];return this[_0x182e08(0x291)](_0xfa605,_0x11b879);}}return 0.5*(Math[_0x182e08(0x8c0)](0x1-_0x37153a*_0x37153a)+0x1);case'INBACK':return _0x3a1d5*_0x3a1d5*((_0xe7ac77+0x1)*_0x3a1d5-_0xe7ac77);case _0x182e08(0x4c4):var _0x495d58=_0x3a1d5/0x1-0x1;return _0x495d58*_0x495d58*((_0xe7ac77+0x1)*_0x495d58+_0xe7ac77)+0x1;break;case _0x182e08(0x4e0):var _0x495d58=_0x3a1d5*0x2,_0x3d9a32=_0x495d58-0x2,_0x8a1f0a=_0xe7ac77*1.525;if(_0x495d58<0x1)return 0.5*_0x495d58*_0x495d58*((_0x8a1f0a+0x1)*_0x495d58-_0x8a1f0a);return 0.5*(_0x3d9a32*_0x3d9a32*((_0x8a1f0a+0x1)*_0x3d9a32+_0x8a1f0a)+0x2);case _0x182e08(0x7c7):if(_0x3a1d5===0x0||_0x3a1d5===0x1){if(_0x182e08(0x5f8)===_0x182e08(0x5f8))return _0x3a1d5;else{_0x5e331e[_0x182e08(0x7f2)][_0x182e08(0x87d)]['call'](this,_0xa8b295);if(_0x38a884[_0x182e08(0x7f2)][_0x182e08(0x68a)][_0x182e08(0x6b6)][_0x182e08(0x465)])return;const _0x48520c=_0x378de5[_0x182e08(0x217)]();_0x48520c[_0x182e08(0x442)]&&(0x1-this['itemEva'](_0x39d401)>this[_0x182e08(0x5c4)](_0x3d55c1)&&(_0x48520c[_0x182e08(0x442)]=![],_0x48520c[_0x182e08(0x899)]=!![]));}}var _0x495d58=_0x3a1d5/0x1,_0x37153a=_0x495d58-0x1,_0x28cbd2=0x1-_0x29b245,_0x8a1f0a=_0x28cbd2/(0x2*Math['PI'])*Math[_0x182e08(0x660)](0x1);return-(Math[_0x182e08(0x674)](0x2,0xa*_0x37153a)*Math['sin']((_0x37153a-_0x8a1f0a)*(0x2*Math['PI'])/_0x28cbd2));case _0x182e08(0x883):var _0x28cbd2=0x1-_0x29b245,_0x495d58=_0x3a1d5*0x2;if(_0x3a1d5===0x0||_0x3a1d5===0x1)return _0x3a1d5;var _0x8a1f0a=_0x28cbd2/(0x2*Math['PI'])*Math[_0x182e08(0x660)](0x1);return Math['pow'](0x2,-0xa*_0x495d58)*Math[_0x182e08(0x659)]((_0x495d58-_0x8a1f0a)*(0x2*Math['PI'])/_0x28cbd2)+0x1;case _0x182e08(0x7ed):var _0x28cbd2=0x1-_0x29b245;if(_0x3a1d5===0x0||_0x3a1d5===0x1)return _0x3a1d5;var _0x495d58=_0x3a1d5*0x2,_0x37153a=_0x495d58-0x1,_0x8a1f0a=_0x28cbd2/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x495d58<0x1)return-0.5*(Math[_0x182e08(0x674)](0x2,0xa*_0x37153a)*Math[_0x182e08(0x659)]((_0x37153a-_0x8a1f0a)*(0x2*Math['PI'])/_0x28cbd2));return Math[_0x182e08(0x674)](0x2,-0xa*_0x37153a)*Math[_0x182e08(0x659)]((_0x37153a-_0x8a1f0a)*(0x2*Math['PI'])/_0x28cbd2)*0.5+0x1;case _0x182e08(0x783):var _0x495d58=_0x3a1d5/0x1;if(_0x495d58<0x1/2.75)return 7.5625*_0x495d58*_0x495d58;else{if(_0x495d58<0x2/2.75){var _0x3d9a32=_0x495d58-1.5/2.75;return 7.5625*_0x3d9a32*_0x3d9a32+0.75;}else{if(_0x495d58<2.5/2.75){if(_0x182e08(0x26e)!==_0x182e08(0x26e))return _0x148fa4[_0x182e08(0x7f2)][_0x182e08(0x68a)][_0x182e08(0x6b6)][_0x182e08(0x79e)]&&_0x5235bf[_0x182e08(0x3ad)]()?_0x5a38bb[_0x182e08(0x417)]-0.05:_0x1220ff[_0x182e08(0x417)];else{var _0x3d9a32=_0x495d58-2.25/2.75;return 7.5625*_0x3d9a32*_0x3d9a32+0.9375;}}else{if(_0x182e08(0x6b3)==='qcSuS'){_0x10f411[_0x182e08(0x7c8)](_0xa90230,_0x58b8a7);const _0x585cae=_0x29fded[_0x182e08(0x2d2)];_0x1dc394[_0x182e08(0x37b)](_0x585cae);}else{var _0x3d9a32=_0x495d58-2.625/2.75;return 7.5625*_0x3d9a32*_0x3d9a32+0.984375;}}}}case _0x182e08(0x842):var _0xacec9=0x1-VisuMZ[_0x182e08(0x3c4)](0x1-_0x3a1d5,_0x182e08(0x632));return _0xacec9;case _0x182e08(0x581):if(_0x3a1d5<0.5)var _0xacec9=VisuMZ[_0x182e08(0x3c4)](_0x3a1d5*0x2,_0x182e08(0x7a4))*0.5;else var _0xacec9=VisuMZ[_0x182e08(0x3c4)](_0x3a1d5*0x2-0x1,_0x182e08(0x632))*0.5+0.5;return _0xacec9;default:return _0x3a1d5;}},VisuMZ[_0x265d62(0x8d7)]=function(_0x3a3399){const _0x49edf5=_0x265d62;_0x3a3399=String(_0x3a3399)['toUpperCase']();const _0x155157=VisuMZ['CoreEngine'][_0x49edf5(0x68a)]['Param'];if(_0x3a3399===_0x49edf5(0x549))return _0x155157[_0x49edf5(0x23a)];if(_0x3a3399===_0x49edf5(0x32e))return _0x155157['IconParam1'];if(_0x3a3399==='ATK')return _0x155157[_0x49edf5(0x47f)];if(_0x3a3399===_0x49edf5(0x139))return _0x155157['IconParam3'];if(_0x3a3399===_0x49edf5(0x440))return _0x155157['IconParam4'];if(_0x3a3399==='MDF')return _0x155157[_0x49edf5(0x530)];if(_0x3a3399===_0x49edf5(0x1f5))return _0x155157[_0x49edf5(0x425)];if(_0x3a3399===_0x49edf5(0x615))return _0x155157['IconParam7'];if(_0x3a3399===_0x49edf5(0x124))return _0x155157[_0x49edf5(0x650)];if(_0x3a3399===_0x49edf5(0x29e))return _0x155157['IconXParam1'];if(_0x3a3399==='CRI')return _0x155157['IconXParam2'];if(_0x3a3399===_0x49edf5(0x1e6))return _0x155157[_0x49edf5(0x511)];if(_0x3a3399==='MEV')return _0x155157[_0x49edf5(0x680)];if(_0x3a3399===_0x49edf5(0x1f7))return _0x155157[_0x49edf5(0x7fd)];if(_0x3a3399===_0x49edf5(0x19a))return _0x155157[_0x49edf5(0x47b)];if(_0x3a3399==='HRG')return _0x155157[_0x49edf5(0x4ee)];if(_0x3a3399==='MRG')return _0x155157[_0x49edf5(0x3ef)];if(_0x3a3399===_0x49edf5(0x52c))return _0x155157[_0x49edf5(0x7ec)];if(_0x3a3399===_0x49edf5(0x247))return _0x155157[_0x49edf5(0x259)];if(_0x3a3399===_0x49edf5(0x48c))return _0x155157[_0x49edf5(0x833)];if(_0x3a3399===_0x49edf5(0x20f))return _0x155157[_0x49edf5(0x850)];if(_0x3a3399===_0x49edf5(0x726))return _0x155157['IconSParam3'];if(_0x3a3399===_0x49edf5(0x336))return _0x155157['IconSParam4'];if(_0x3a3399==='TCR')return _0x155157[_0x49edf5(0x2b9)];if(_0x3a3399===_0x49edf5(0x6a5))return _0x155157[_0x49edf5(0x2b8)];if(_0x3a3399===_0x49edf5(0x24c))return _0x155157[_0x49edf5(0x6fe)];if(_0x3a3399===_0x49edf5(0x385))return _0x155157[_0x49edf5(0x5ba)];if(_0x3a3399==='EXR')return _0x155157[_0x49edf5(0x1f2)];if(VisuMZ[_0x49edf5(0x7f2)][_0x49edf5(0x735)][_0x3a3399]){if(_0x49edf5(0x514)!=='RRsPR')return VisuMZ[_0x49edf5(0x7f2)][_0x49edf5(0x735)][_0x3a3399]||0x0;else _0x38b689[_0x49edf5(0x7f2)][_0x49edf5(0x4eb)][_0x49edf5(0x58f)](this);}return 0x0;},VisuMZ[_0x265d62(0x2a9)]=function(_0x3b8ed6,_0x4a535e,_0x4e935e){const _0x5781e3=_0x265d62;if(_0x4e935e===undefined&&_0x3b8ed6%0x1===0x0)return _0x3b8ed6;if(_0x4e935e!==undefined&&[_0x5781e3(0x549),'MAXMP',_0x5781e3(0x865),_0x5781e3(0x139),_0x5781e3(0x440),_0x5781e3(0x86a),'AGI',_0x5781e3(0x615)]['includes'](String(_0x4e935e)[_0x5781e3(0x8d5)]()['trim']()))return _0x3b8ed6;_0x4a535e=_0x4a535e||0x0;if(VisuMZ[_0x5781e3(0x7f2)][_0x5781e3(0x5ab)][_0x4e935e]){if(VisuMZ[_0x5781e3(0x7f2)][_0x5781e3(0x5c9)][_0x4e935e]==='integer')return _0x3b8ed6;else{if(_0x5781e3(0x2e4)===_0x5781e3(0x2e4))return String((_0x3b8ed6*0x64)[_0x5781e3(0x71a)](_0x4a535e))+'%';else{var _0x59ac59=_0xd64a79(_0x587ce5['$1']);_0x1e62fe+=_0x59ac59;}}}return String((_0x3b8ed6*0x64)[_0x5781e3(0x71a)](_0x4a535e))+'%';},VisuMZ['GroupDigits']=function(_0x568f2b){const _0x53b114=_0x265d62;_0x568f2b=String(_0x568f2b);if(!_0x568f2b)return _0x568f2b;if(typeof _0x568f2b!==_0x53b114(0x473))return _0x568f2b;const _0x58e22c=VisuMZ[_0x53b114(0x7f2)][_0x53b114(0x68a)]['QoL'][_0x53b114(0x3ee)]||_0x53b114(0x876),_0x44ff90={'maximumFractionDigits':0x6};_0x568f2b=_0x568f2b[_0x53b114(0x4b3)](/\[(.*?)\]/g,(_0x2245ec,_0x1d1302)=>{const _0x33e062=_0x53b114;if(_0x33e062(0x5e9)!==_0x33e062(0x84f))return VisuMZ[_0x33e062(0x6f0)](_0x1d1302,'[',']');else{const _0x597766=this[_0x33e062(0x17c)](),_0x57a513=this['paramY'](_0x2e8d99);this['drawItem'](_0x597766,_0x57a513,_0x364818),_0x296095++;}}),_0x568f2b=_0x568f2b[_0x53b114(0x4b3)](/<(.*?)>/g,(_0x352382,_0x16fec7)=>{const _0x3935e3=_0x53b114;return VisuMZ[_0x3935e3(0x6f0)](_0x16fec7,'<','>');}),_0x568f2b=_0x568f2b[_0x53b114(0x4b3)](/\{\{(.*?)\}\}/g,(_0x3b3157,_0x214de7)=>{return VisuMZ['PreserveNumbers'](_0x214de7,'','');}),_0x568f2b=_0x568f2b[_0x53b114(0x4b3)](/(\d+\.?\d*)/g,(_0x3aaecb,_0x25b7c8)=>{const _0x377e99=_0x53b114;let _0x21636d=_0x25b7c8;if(_0x21636d[0x0]==='0')return _0x21636d;if(_0x21636d[_0x21636d[_0x377e99(0x33a)]-0x1]==='.')return Number(_0x21636d)[_0x377e99(0x28f)](_0x58e22c,_0x44ff90)+'.';else{if(_0x21636d[_0x21636d[_0x377e99(0x33a)]-0x1]===','){if('Wgqkt'===_0x377e99(0x8c2))return Number(_0x21636d)[_0x377e99(0x28f)](_0x58e22c,_0x44ff90)+',';else this[_0x377e99(0x43a)]();}else return Number(_0x21636d)[_0x377e99(0x28f)](_0x58e22c,_0x44ff90);}});let _0x56910a=0x3;while(_0x56910a--){_0x568f2b=VisuMZ[_0x53b114(0x3cb)](_0x568f2b);}return _0x568f2b;},VisuMZ[_0x265d62(0x6f0)]=function(_0x39bcbf,_0x20d5d2,_0x482e27){const _0x15bcbf=_0x265d62;return _0x39bcbf=_0x39bcbf[_0x15bcbf(0x4b3)](/(\d)/gi,(_0x39b55d,_0x451e85)=>_0x15bcbf(0x66b)[_0x15bcbf(0x807)](Number(_0x451e85))),'%2%1%3'['format'](_0x39bcbf,_0x20d5d2,_0x482e27);},VisuMZ[_0x265d62(0x3cb)]=function(_0x437fb4){const _0xc5e46b=_0x265d62;return _0x437fb4=_0x437fb4[_0xc5e46b(0x4b3)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x372e28,_0x564d92)=>Number(parseInt(_0x564d92))),_0x437fb4;},VisuMZ[_0x265d62(0x37b)]=function(_0x1676d3){const _0x52a3c5=_0x265d62;SoundManager[_0x52a3c5(0x39e)]();if(!Utils[_0x52a3c5(0x583)]()){if('HAwuy'===_0x52a3c5(0x3d7)){const _0x2d671f=window['open'](_0x1676d3,_0x52a3c5(0x76a));}else{if(this['_CoreEngineSettings']===_0x1052bd)this[_0x52a3c5(0x6ed)]();if(this['_CoreEngineSettings'][_0x52a3c5(0x6cb)]===_0x3fecca)this[_0x52a3c5(0x6ed)]();return this['_CoreEngineSettings'][_0x52a3c5(0x6cb)];}}else{const _0x295c43=process[_0x52a3c5(0x367)]==_0x52a3c5(0x11e)?_0x52a3c5(0x310):process[_0x52a3c5(0x367)]==_0x52a3c5(0x1b8)?_0x52a3c5(0x705):_0x52a3c5(0x72c);require('child_process')[_0x52a3c5(0x616)](_0x295c43+'\x20'+_0x1676d3);}},Game_Picture[_0x265d62(0x7ee)][_0x265d62(0x835)]=function(){return this['_anchor'];},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x501)]=Game_Picture[_0x265d62(0x7ee)][_0x265d62(0x1a1)],Game_Picture['prototype']['initBasic']=function(){const _0x49b595=_0x265d62;VisuMZ[_0x49b595(0x7f2)][_0x49b595(0x501)][_0x49b595(0x58f)](this),this[_0x49b595(0x401)]={'x':0x0,'y':0x0},this[_0x49b595(0x778)]={'x':0x0,'y':0x0};},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x668)]=Game_Picture[_0x265d62(0x7ee)]['updateMove'],Game_Picture[_0x265d62(0x7ee)][_0x265d62(0x635)]=function(){const _0x423d5c=_0x265d62;this['updateAnchor'](),VisuMZ[_0x423d5c(0x7f2)][_0x423d5c(0x668)][_0x423d5c(0x58f)](this);},VisuMZ[_0x265d62(0x7f2)]['Game_Picture_show']=Game_Picture['prototype']['show'],Game_Picture[_0x265d62(0x7ee)][_0x265d62(0x2f4)]=function(_0x133d6b,_0x4bbd99,_0x58462b,_0x5ec708,_0x51796f,_0x258a06,_0x3b7445,_0x5d1a45){const _0x112d53=_0x265d62;VisuMZ[_0x112d53(0x7f2)]['Game_Picture_show'][_0x112d53(0x58f)](this,_0x133d6b,_0x4bbd99,_0x58462b,_0x5ec708,_0x51796f,_0x258a06,_0x3b7445,_0x5d1a45),this[_0x112d53(0x3e7)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4bbd99]||{'x':0x0,'y':0x0});},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x3b1)]=Game_Picture[_0x265d62(0x7ee)][_0x265d62(0x5dd)],Game_Picture['prototype']['move']=function(_0x57f8ba,_0xfc4b50,_0x3898b3,_0x253df0,_0x20ea28,_0x4741ff,_0x4c5c21,_0x1fc9ff,_0x1b3111){const _0x16025b=_0x265d62;VisuMZ[_0x16025b(0x7f2)][_0x16025b(0x3b1)]['call'](this,_0x57f8ba,_0xfc4b50,_0x3898b3,_0x253df0,_0x20ea28,_0x4741ff,_0x4c5c21,_0x1fc9ff,_0x1b3111),this[_0x16025b(0x3dc)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x57f8ba]||{'x':0x0,'y':0x0});},Game_Picture['prototype']['updateAnchor']=function(){const _0x5fb432=_0x265d62;this['_duration']>0x0&&(this[_0x5fb432(0x401)]['x']=this[_0x5fb432(0x4e4)](this[_0x5fb432(0x401)]['x'],this[_0x5fb432(0x778)]['x']),this['_anchor']['y']=this[_0x5fb432(0x4e4)](this[_0x5fb432(0x401)]['y'],this[_0x5fb432(0x778)]['y']));},Game_Picture['prototype'][_0x265d62(0x3e7)]=function(_0x233a13){const _0x23ac80=_0x265d62;this[_0x23ac80(0x401)]=_0x233a13,this[_0x23ac80(0x778)]=JsonEx[_0x23ac80(0x379)](this['_anchor']);},Game_Picture[_0x265d62(0x7ee)]['setTargetAnchor']=function(_0x4ca7d9){const _0x57c291=_0x265d62;this[_0x57c291(0x778)]=_0x4ca7d9;},VisuMZ['CoreEngine']['Sprite_Picture_updateOrigin']=Sprite_Picture[_0x265d62(0x7ee)][_0x265d62(0x78b)],Sprite_Picture[_0x265d62(0x7ee)][_0x265d62(0x78b)]=function(){const _0x1fce85=_0x265d62,_0x345eaa=this['picture']();!_0x345eaa['anchor']()?VisuMZ[_0x1fce85(0x7f2)][_0x1fce85(0x692)]['call'](this):(this[_0x1fce85(0x835)]['x']=_0x345eaa[_0x1fce85(0x835)]()['x'],this[_0x1fce85(0x835)]['y']=_0x345eaa[_0x1fce85(0x835)]()['y']);},Game_Action[_0x265d62(0x7ee)][_0x265d62(0x372)]=function(_0x355c6d){const _0x2ba201=_0x265d62;if(_0x355c6d){if(_0x2ba201(0x1d3)===_0x2ba201(0x853)){_0x3b8c7f[_0x2ba201(0x7c8)](_0x39b68c,_0x2d6a28);const _0x500183=_0x4479dc['value']||0x0;_0x296573['gainGold'](_0x500183);}else{const _0x8db98c=_0x355c6d['skillId'];if(_0x8db98c===0x1&&this[_0x2ba201(0x415)]()[_0x2ba201(0x338)]()!==0x1){if(_0x2ba201(0x861)!==_0x2ba201(0x861)){this[_0x2ba201(0x3ce)][_0x2ba201(0x490)]();const _0x27e638=_0x5eca31[_0x2ba201(0x2ae)],_0x298f46=_0x32a8e1[_0x2ba201(0x1f1)](_0x27e638);if(!_0x298f46)return;this[_0x2ba201(0x4dc)]=_0x298f46[_0x2ba201(0x6f5)],this[_0x2ba201(0x140)]=_0x298f46['_x'],this[_0x2ba201(0x4aa)]=_0x298f46['_y'];const _0x3193a3=_0x30b2a3[_0x2ba201(0x677)]();this[_0x2ba201(0x3ce)][_0x2ba201(0x6f2)](0x0,0x0,this[_0x2ba201(0x894)],this[_0x2ba201(0x3cf)],_0x3193a3);const _0xdd7d78='\x20Origin:\x20%1'[_0x2ba201(0x807)](_0x298f46['_origin']===0x0?_0x2ba201(0x44d):_0x2ba201(0x4d9)),_0x4ce707=_0x2ba201(0x2f7)[_0x2ba201(0x807)](_0x298f46['_x']),_0x365733=_0x2ba201(0x56d)['format'](_0x298f46['_y']),_0x4200fb=_0x2ba201(0x327)[_0x2ba201(0x807)](_0x2407e6['getInputButtonString'](_0x2ba201(0x5fe)));let _0x447447=_0x363bc9[_0x2ba201(0x8a0)](this[_0x2ba201(0x894)]/0x4);this[_0x2ba201(0x2b6)](_0xdd7d78,_0x447447*0x0,0x0,_0x447447),this[_0x2ba201(0x2b6)](_0x4ce707,_0x447447*0x1,0x0,_0x447447,_0x2ba201(0x2f9)),this[_0x2ba201(0x2b6)](_0x365733,_0x447447*0x2,0x0,_0x447447,_0x2ba201(0x2f9));const _0x24e95c=this[_0x2ba201(0x75a)](_0x4200fb)[_0x2ba201(0x3f1)],_0x19b0dc=this[_0x2ba201(0x894)]-_0x24e95c;this[_0x2ba201(0x624)](_0x4200fb,_0x19b0dc,0x0,_0x24e95c);}else this[_0x2ba201(0x190)]();}else{if(_0x8db98c===0x2&&this[_0x2ba201(0x415)]()[_0x2ba201(0x25e)]()!==0x2){if(_0x2ba201(0x3c7)===_0x2ba201(0x3c7))this[_0x2ba201(0x60d)]();else{const _0x36e129=_0xe438e2[_0x2ba201(0x7f8)]();if(_0x36e129)for(const _0x17683f of _0x36e129){if(_0x17683f&&_0x17683f[_0x2ba201(0x5a5)])return!![];}}}else this[_0x2ba201(0x324)](_0x8db98c);}}}else{if(_0x2ba201(0x61b)!==_0x2ba201(0x61b))return _0x4eb7cd[_0x2ba201(0x7f2)][_0x2ba201(0x68a)]['UI'][_0x2ba201(0x2bc)];else this['clear']();}},Game_Actor['prototype'][_0x265d62(0x7bb)]=function(){const _0xbef6e=_0x265d62;return this[_0xbef6e(0x138)]()['filter'](_0x5b1717=>this['canUse'](_0x5b1717)&&this[_0xbef6e(0x56f)]()[_0xbef6e(0x734)](_0x5b1717['stypeId']));},Window_Base[_0x265d62(0x7ee)]['createDimmerSprite']=function(){const _0x31db20=_0x265d62;this[_0x31db20(0x4e2)]=new Sprite(),this[_0x31db20(0x4e2)]['bitmap']=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this['addChildToBack'](this[_0x31db20(0x4e2)]);},Window_Base[_0x265d62(0x7ee)]['refreshDimmerBitmap']=function(){const _0x3c43af=_0x265d62;if(this[_0x3c43af(0x4e2)]){const _0x28837c=this['_dimmerSprite']['bitmap'],_0x226cf9=this[_0x3c43af(0x3f1)],_0x16187c=this[_0x3c43af(0x4ec)],_0x292402=this[_0x3c43af(0x2e8)],_0x3dc669=ColorManager[_0x3c43af(0x1c0)](),_0x37da33=ColorManager[_0x3c43af(0x5c3)]();_0x28837c[_0x3c43af(0x704)](_0x226cf9,_0x16187c),_0x28837c[_0x3c43af(0x7fe)](0x0,0x0,_0x226cf9,_0x292402,_0x37da33,_0x3dc669,!![]),_0x28837c[_0x3c43af(0x6f2)](0x0,_0x292402,_0x226cf9,_0x16187c-_0x292402*0x2,_0x3dc669),_0x28837c[_0x3c43af(0x7fe)](0x0,_0x16187c-_0x292402,_0x226cf9,_0x292402,_0x3dc669,_0x37da33,!![]),this[_0x3c43af(0x4e2)][_0x3c43af(0x607)](0x0,0x0,_0x226cf9,_0x16187c);}},Game_Actor[_0x265d62(0x7ee)][_0x265d62(0x466)]=function(){const _0x33f909=_0x265d62;for(let _0x3135c1=0x0;_0x3135c1<this[_0x33f909(0x70f)]();_0x3135c1++){if(_0x33f909(0x79a)===_0x33f909(0x79a)){const _0x48c752=this[_0x33f909(0x5d7)]();let _0x50e579=Number[_0x33f909(0x7f1)];this[_0x33f909(0x62b)](_0x3135c1,_0x48c752[0x0]);for(const _0x3f3570 of _0x48c752){const _0x9a0a4a=_0x3f3570['evaluate']();_0x9a0a4a>_0x50e579&&(_0x50e579=_0x9a0a4a,this['setAction'](_0x3135c1,_0x3f3570));}}else{if(_0x90d89)_0x4c33aa[_0x33f909(0x1f6)](_0x5c8d73);}}this[_0x33f909(0x224)]('waiting');},Window_BattleItem[_0x265d62(0x7ee)][_0x265d62(0x59b)]=function(_0x2177f6){const _0x51ddd5=_0x265d62;return BattleManager[_0x51ddd5(0x2a3)]()?_0x51ddd5(0x89d)!==_0x51ddd5(0x348)?BattleManager[_0x51ddd5(0x2a3)]()[_0x51ddd5(0x6b1)](_0x2177f6):_0x50bb6f[_0x51ddd5(0x7f2)]['Settings']['UI'][_0x51ddd5(0x30b)]:Window_ItemList['prototype'][_0x51ddd5(0x59b)]['call'](this,_0x2177f6);},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x2f1)]=Scene_Map[_0x265d62(0x7ee)][_0x265d62(0x148)],Scene_Map[_0x265d62(0x7ee)][_0x265d62(0x148)]=function(){const _0x517b87=_0x265d62;VisuMZ[_0x517b87(0x7f2)]['Scene_Map_createSpriteset'][_0x517b87(0x58f)](this);const _0x2bed40=this['_spriteset']['_timerSprite'];if(_0x2bed40)this[_0x517b87(0x158)](_0x2bed40);},VisuMZ[_0x265d62(0x7f2)]['Scene_Battle_createSpriteset']=Scene_Battle[_0x265d62(0x7ee)][_0x265d62(0x148)],Scene_Battle[_0x265d62(0x7ee)][_0x265d62(0x148)]=function(){const _0x4325a7=_0x265d62;VisuMZ[_0x4325a7(0x7f2)]['Scene_Battle_createSpriteset'][_0x4325a7(0x58f)](this);const _0x5b277a=this[_0x4325a7(0x6c2)][_0x4325a7(0x26a)];if(_0x5b277a)this[_0x4325a7(0x158)](_0x5b277a);},Sprite_Actor[_0x265d62(0x7ee)][_0x265d62(0x6f4)]=function(){const _0x5c5a54=_0x265d62;Sprite_Battler['prototype'][_0x5c5a54(0x6f4)]['call'](this),this['updateShadow']();if(this[_0x5c5a54(0x12d)])this['updateMotion']();else this[_0x5c5a54(0x638)]!==''&&(this[_0x5c5a54(0x638)]='');},Window[_0x265d62(0x7ee)]['_refreshArrows']=function(){const _0x59254a=_0x265d62,_0x5cd325=this['_width'],_0x46e4db=this[_0x59254a(0x434)],_0x24aa0d=0x18,_0x1a5fcc=_0x24aa0d/0x2,_0x53d65a=0x60+_0x24aa0d,_0x3193ff=0x0+_0x24aa0d;this[_0x59254a(0x305)][_0x59254a(0x6cc)]=this[_0x59254a(0x414)],this['_downArrowSprite'][_0x59254a(0x835)]['x']=0.5,this['_downArrowSprite']['anchor']['y']=0.5,this[_0x59254a(0x305)][_0x59254a(0x607)](_0x53d65a+_0x1a5fcc,_0x3193ff+_0x1a5fcc+_0x24aa0d,_0x24aa0d,_0x1a5fcc),this[_0x59254a(0x305)][_0x59254a(0x5dd)](Math[_0x59254a(0x1bd)](_0x5cd325/0x2),Math['round'](_0x46e4db-_0x1a5fcc)),this[_0x59254a(0x170)][_0x59254a(0x6cc)]=this[_0x59254a(0x414)],this[_0x59254a(0x170)][_0x59254a(0x835)]['x']=0.5,this[_0x59254a(0x170)]['anchor']['y']=0.5,this[_0x59254a(0x170)][_0x59254a(0x607)](_0x53d65a+_0x1a5fcc,_0x3193ff,_0x24aa0d,_0x1a5fcc),this[_0x59254a(0x170)][_0x59254a(0x5dd)](Math['round'](_0x5cd325/0x2),Math[_0x59254a(0x1bd)](_0x1a5fcc));},Window[_0x265d62(0x7ee)][_0x265d62(0x1d8)]=function(){const _0xbd4dea=_0x265d62,_0xbdb841=0x90,_0x345d9f=0x60,_0x15dcb0=0x18;this[_0xbd4dea(0x13e)]['bitmap']=this[_0xbd4dea(0x414)],this['_pauseSignSprite'][_0xbd4dea(0x835)]['x']=0.5,this[_0xbd4dea(0x13e)][_0xbd4dea(0x835)]['y']=0x1,this['_pauseSignSprite'][_0xbd4dea(0x5dd)](Math['round'](this[_0xbd4dea(0x1c4)]/0x2),this[_0xbd4dea(0x434)]),this[_0xbd4dea(0x13e)]['setFrame'](_0xbdb841,_0x345d9f,_0x15dcb0,_0x15dcb0),this[_0xbd4dea(0x13e)][_0xbd4dea(0x32c)]=0xff;},Window[_0x265d62(0x7ee)]['_updateFilterArea']=function(){const _0x131142=_0x265d62,_0x53ed12=this[_0x131142(0x596)][_0x131142(0x2fe)][_0x131142(0x6c7)](new Point(0x0,0x0)),_0x60f243=this[_0x131142(0x596)][_0x131142(0x8ab)];_0x60f243['x']=_0x53ed12['x']+this[_0x131142(0x308)]['x'],_0x60f243['y']=_0x53ed12['y']+this['origin']['y'],_0x60f243[_0x131142(0x3f1)]=Math[_0x131142(0x6a0)](this[_0x131142(0x894)]*this[_0x131142(0x3f3)]['x']),_0x60f243['height']=Math[_0x131142(0x6a0)](this['innerHeight']*this[_0x131142(0x3f3)]['y']);},Window[_0x265d62(0x7ee)][_0x265d62(0x1ac)]=function(){const _0x2cb82a=_0x265d62,_0x3edcf9=this[_0x2cb82a(0x30d)],_0x10d5d=Math[_0x2cb82a(0x565)](0x0,this['_width']-_0x3edcf9*0x2),_0x42f2af=Math['max'](0x0,this[_0x2cb82a(0x434)]-_0x3edcf9*0x2),_0x344c82=this[_0x2cb82a(0x420)],_0x5058a2=_0x344c82['children'][0x0];_0x344c82['bitmap']=this[_0x2cb82a(0x414)],_0x344c82[_0x2cb82a(0x607)](0x0,0x0,0x60,0x60),_0x344c82[_0x2cb82a(0x5dd)](_0x3edcf9,_0x3edcf9),_0x344c82[_0x2cb82a(0x3f3)]['x']=_0x10d5d/0x60,_0x344c82[_0x2cb82a(0x3f3)]['y']=_0x42f2af/0x60,_0x5058a2[_0x2cb82a(0x6cc)]=this[_0x2cb82a(0x414)],_0x5058a2[_0x2cb82a(0x607)](0x0,0x60,0x60,0x60),_0x5058a2[_0x2cb82a(0x5dd)](0x0,0x0,_0x10d5d,_0x42f2af),_0x5058a2[_0x2cb82a(0x3f3)]['x']=0x1/_0x344c82['scale']['x'],_0x5058a2[_0x2cb82a(0x3f3)]['y']=0x1/_0x344c82[_0x2cb82a(0x3f3)]['y'],_0x344c82[_0x2cb82a(0x304)](this[_0x2cb82a(0x75d)]);},Game_Temp[_0x265d62(0x7ee)][_0x265d62(0x459)]=function(){const _0x49f1e5=_0x265d62;this['_animationQueue']=[],this[_0x49f1e5(0x746)]=[],this[_0x49f1e5(0x275)]=[],this[_0x49f1e5(0x330)]=[];},VisuMZ[_0x265d62(0x7f2)][_0x265d62(0x8d1)]=Scene_Base[_0x265d62(0x7ee)][_0x265d62(0x699)],Scene_Base['prototype'][_0x265d62(0x699)]=function(){const _0x5c9699=_0x265d62;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ[_0x5c9699(0x7f2)]['Scene_Base_terminateAnimationClearBugFix'][_0x5c9699(0x58f)](this);};