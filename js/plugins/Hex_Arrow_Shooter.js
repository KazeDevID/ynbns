
/*=============================================================================
 * Arrow Shooter Game
 * By Hex - www.fiverr.com/hex_fvx
 * Hex_Arrow_Shooting.js
 * Version: 1.0
 * Free for commercial and non commercial use.
 *=============================================================================*/
 /*:
 * @plugindesc Arrow_Shooter MiniGame.
 *             
 * @author Hex
 * @target MZ 
 * @help Make An Arrow Shooter Game
 * 
 * The Graphics for the MiniGame are located in img/pictures/Arrow_Shooter/
 * 
 * To Start the MiniGame you can check the Plugin Command of this plugin.
 * 
 * The following are the plugin commands you can use:
 *  Target Speed
 *  Mini Game Time
 *  
 * Feel free to use this plugin for commercial and non commercial use. 
 * 
 * 
 * If you want custom modifications to the plugin, please contact me.
 * If you want a similar miniGame for your project, please contact me.
 * Discord - jackfuryy99#2303
 * 
 * 
 * 
 * @param VariableID
 * @desc The Item ID which Stores the Score from Last Game player
 * @default 15
 * 
 * 
 * 
 * @param Animation ID
 * @desc The Animation used in the mini game.
 * @default 1
 * 
 * 
 * @param CommonEventID
 * @desc The Commone Event ID which is plays when you win the game(if you don't want common event to play, set it to 0)
 * @default 0
 * 
 * 
 * @param Game End Text
 * @desc The Text which is displayed when the mini game is over.
 * @default Stop!!!
 * 
 * @param BGM
 * @desc The Background Music used in the mini game.
 * @default Dungeon4
 * 
 * @param BGM Volume
 * @desc The Background Volume.
 * @default 90
 * 
 * @param Score Multiplyer
 * @desc Score Multiplayer for the variable ID.
 * @default 2
 * 
 * 
 * 
 * @command play_minigame
 * @desc Speed of the target
 * @text Play Mini Game
 * 
 * 
 * @command mini_game_time
 * @desc Time Of the MiniGame
 * @text Mini Game Time
 * 
 * @arg Time
 * @desc Time of Mini Game.
 * 
 * 
 * @command target_speed
 * @desc Speed of the target
 * @text Target Speed
 * 
 * @arg Speed
 * @desc Speed of the target.
 * 
 * 
 * 
 * 
 * 
 * 
 */

 var Zf = Zf || {};
 Zf.Arrow_Shooter = {};
 Zf.Arrow_Shooter.Parameters = PluginManager.parameters('Hex_Arrow_Shooting');
 Zf.Arrow_Shooter.pluginName = "Hex_Arrow_Shooting";
 Zf.Arrow_Shooter.varid = Number(Zf.Arrow_Shooter.Parameters["VariableID"]) || 15;
 Zf.Arrow_Shooter.swichid = Number(Zf.Arrow_Shooter.Parameters["SwitchID"]) || 15;
 Zf.Arrow_Shooter.ceid = Number(Zf.Arrow_Shooter.Parameters["CommonEventID"]) || 18;
 Zf.Arrow_Shooter.animId = Number(Zf.Arrow_Shooter.Parameters["Animation ID"]) || 1;
 Zf.Arrow_Shooter.bgmvolume = Number(Zf.Arrow_Shooter.Parameters["BGM Volume"]) || 30;
 Zf.Arrow_Shooter.scoremultiplyer = Number(Zf.Arrow_Shooter.Parameters["Score Multiplyer"]) || 2;
 Zf.Arrow_Shooter.stopText = Zf.Arrow_Shooter.Parameters["Game End Text"] || "Stop!!!";
 Zf.Arrow_Shooter.bgm = Zf.Arrow_Shooter.Parameters["BGM"] || "Dungeon4";
 Zf.Arrow_Shooter.timeRemaining = 10;
 Zf.Arrow_Shooter.arrowspeed = 10;
 Zf.Arrow_Shooter.targetSpeed = 8;
 Zf.Arrow_Shooter._progress = 0;
 Zf.Arrow_Shooter.targetArr = [];
 Zf.Arrow_Shooter.setupMiniGame = function(goldVar){
    Zf.Arrow_Shooter.goldVar = goldVar;
    SceneManager.push(Scene_ArrowShooter);
 };

 //=============================================================================
// ** Plugin Manager
//=============================================================================
PluginManager.registerCommand(Zf.Arrow_Shooter.pluginName,"play_minigame", data => {
	SceneManager.push(Scene_ArrowShooter)
});
PluginManager.registerCommand(Zf.Arrow_Shooter.pluginName,"target_speed", data => {
	Zf.Arrow_Shooter.targetSpeed = data.Speed
});
PluginManager.registerCommand(Zf.Arrow_Shooter.pluginName,"mini_game_time", data => {
	Zf.Arrow_Shooter.timeRemaining = data.Time
});




function Scene_ArrowShooter() {
    this.initialize(...arguments);
}
Scene_ArrowShooter.prototype = Object.create(Scene_MenuBase.prototype);
Scene_ArrowShooter.prototype.constructor = Scene_ArrowShooter;

Scene_ArrowShooter.prototype.initialize = function() {
    
    Scene_MenuBase.prototype.initialize.call(this);
    this.startFadeIn(60, false);
    this._curranim = Zf.Arrow_Shooter.animId;
    this._score = 0;
    this._timeRemaining = Zf.Arrow_Shooter.timeRemaining; 
    this._timee = this._timeRemaining*60;
    this._gamerem = true;     
    this._phase = 0;  
    this._waitphase4 = 100;
    let bgm = {name: Zf.Arrow_Shooter.bgm, volume: 30, pitch: 100};
    //AudioManager.playBgm(bgm);
};
Scene_ArrowShooter.prototype.createGameRectangle = function() {
    this._gamerect = new Rectangle(0,0,1280,720);
    
}
Scene_ArrowShooter.prototype.helpAreaHeight = function() {
    return 0;
};

Scene_ArrowShooter.prototype.create = function() {
    
    Scene_MenuBase.prototype.create.call(this);
    this._arrowobj = new Game_ArrowTarget();

    
   
    Zf.Arrow_Shooter.targetArr.push(this._arrowobj);
    //this.addChild(this._arrowobj);
   // console.log(Zf.Arrow_Shooter.targetArr);
    this._spriteset = new Spriteset_ArrowShooterBase();
     this.addChild(this._spriteset);
     this._blackScreen = new ScreenSprite();
    this._blackScreen.opacity = 0;
    this.createBackgroundSprite();
    this.createforegroundsprites();
    this.createWindowLayer();
    this._scorewindow = new Window_ScoreArrowMiniGame(new Rectangle(Graphics.width-125,Graphics.height-75,125,75));
    this.addChild(this._scorewindow);
    this._timerWind = new Window_TimerArrowMiniGame(new Rectangle((Graphics.width-125)/2,0,125,75));
    this.addChild(this._timerWind);
    this._framwindow = new Window_Base(new Rectangle(100,100,(Graphics.width-200),40));
    this.addChild(this._framwindow);
    this._scoreBar = new Sprite_Gauge_Shooter(new Bitmap(1280,720));
    this.addChild(this._scoreBar);

    this._dik = new Sprite(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","Dik3"));
    this._dik.x = Graphics.width/2 - 40;
    this._dik.y = 75
    this._dik.anchor.x = this._dik.anchor.y
    this._dik.scale.x = this._dik.scale.y = 2;
    this.addChild(this._dik);
    this.addChild(this._blackScreen);
    
    this._Stoptex = new Sprite();
    this._Stoptex.bitmap = new Bitmap(816,624);
    this._Stoptex.bitmap.fontSize = 72;
    this._Stoptex.opacity = 0;
    this._Stoptex.bitmap.drawText(Zf.Arrow_Shooter.stopText,0,0,Graphics.width,200,'center');
    this.addChild(this._Stoptex);
    
};

Scene_ArrowShooter.prototype.update = function() {
    
    Scene_MenuBase.prototype.update.call(this);
    if(this._phase==4){
        if(this._waitphase4<=0){
            Zf.Arrow_Shooter.targetArr = [];
            $gameVariables.setValue(Zf.Arrow_Shooter.varid,this._score*Zf.Arrow_Shooter.scoremultiplyer) ;
            $gameVariables.setValue(Zf.Arrow_Shooter.goldVar,$gameVariables.value(Zf.Arrow_Shooter.goldVar)-this._score);
            $gameTemp.reserveCommonEvent(18);
            $gameParty.gainGold(this._score+5);
            SceneManager.pop();
            
           
        }else{
            this._waitphase4--;
        }
    }
    if(this._phase==3){
        if(this._blackScreen.opacity<200){
            this._blackScreen.opacity += 5;
            this._Stoptex.opacity+=12;
            AudioManager.fadeOutBgm(3);
        }else{
            this._phase = 4;
        }
        
    }
    if(this._gamerem==false){
        return;
    }
    if(TouchInput.isTriggered()){
       if(this._spriteset._target.isfiring()){
            return;
        }
        this._spriteset._target.releaseArrow();
        AudioManager.playSe({name: 'Bow1', pan: 0, pitch: 100, volume: 100});
         $gameTemp.requestAnimation([this._arrowobj],123, false);
            //this._curranim++;
   }
   this.bowcontrol();
   this.updatetimerwindow();

};
Scene_ArrowShooter.prototype.updatetimerwindow = function() {

    if(this._timee<=0){
        this._gamerem = false;
        //$gameScreen.startFadeOut(255);
        this._phase = 3;
    }else{
        this._timee--;
        this._timeRemaining = Math.floor(this._timee/60);
    }
    this._timerWind.refresh();
 };
Scene_ArrowShooter.prototype.bowcontrol = function() {

   this._spriteset._bow.x = TouchInput.x;
   this._spriteset._bow.y = Graphics.height-44;
   
    
};
Scene_ArrowShooter.prototype.addpoints = function(points) {
    this._score+=points;
    this._scoreBar.addpoints(points);
    this._scorewindow.refresh();
  
};

Scene_ArrowShooter.prototype.calcresult = function() {
    
  
  
};





Scene_ArrowShooter.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    
};


Scene_ArrowShooter.prototype.resetArrow_Shooter = function() {


   
};

Scene_ArrowShooter.prototype.createforegroundsprites = function(){
   
    
}
Scene_ArrowShooter.prototype.createBackgroundSprite = function() {
    var y = 215;
    var x = 138;
    // this._bg = new Sprite(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","Background"));
    // this.addChild(this._bg);
    // this._slot1 = new Sprite_ItemMoving(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","Slots"),x,y)
    // this.addChild(this._slot1);
    // this._slot2 = new Sprite_ItemMoving(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","Slots"),x+200,y)
    // this.addChild(this._slot2);
    // this._slot3 = new Sprite_ItemMoving(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","Slots"),x+200*2,y)
    // this.addChild(this._slot3);
    // this._button = new Sprite_ButtonArrow_Shooter(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","ClickButton"),x+200,200+y)
    // this.addChild(this._button);
};

Scene_ArrowShooter.prototype.videoAnim = function() {
   
};

function Spriteset_ArrowShooterBase() {

    this.initialize.apply(this, arguments);

}

Spriteset_ArrowShooterBase.prototype = Object.create(Spriteset_Base.prototype);
Spriteset_ArrowShooterBase.constructor = Spriteset_ArrowShooterBase;

Spriteset_ArrowShooterBase.prototype.initialize = function (){

   Spriteset_Base.prototype.initialize.call(this);
    //this._arrowobj = new Game_ArrowTarget();
   // this.addChild(this._arrowobj);
   this._objects = [];
   this._target = new Sprite_ArrowShooterTarget(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","Arrow"),Zf.Arrow_Shooter.targetArr[0]);
   this._bg = new Sprite(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","BackgroundImage"));
   this.addChild(this._bg);
   this._fg = new Sprite(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","Foreground"));
   this._bow = new Sprite(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","BowRelaxed"));
   this._bow.scale.x = this._bow.scale.y = 2;
   this._bow.anchor.x = this._bow.anchor.y = 0.5;
   this._bow.y = Graphics.height- 44;
   this._target.x = this._bow.x;
   this._target.y = this._bow.y;
   
   for (let index = 0; index < 4; index++) {
    var id = Math.randomInt(3)+1;
    if(index<3){
        var obj = new Sprite_TargetArrowPr(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","Target"+(index+1)+"_1"),index);
    }else{
        var obj = new Sprite_TargetArrowPr(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","Target"+id+"_1"),id);
    
    }
    this._objects.push(obj);
    this.addChild(this._objects[index]);
   }
   this.addChild(this._fg);
   this.addChild(this._bow);
   this.addChild(this._target);
  // this.addChild(this._dik);
    
   this.createBaseSprite();
   this.createTilemap();
    
}

Spriteset_ArrowShooterBase.prototype.update = function(){

    Spriteset_Base.prototype.update.call(this);
    if(this._target.isfiring()){
        this._bow.bitmap = ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","BowRelaxed");
        for (let index = 0; index < this._objects.length; index++) {
            this._objects[index].checkcollisionwithArrow();
            this._bow.y = Graphics.height-44;
        }
        this._bow.y = Graphics.height-44;
        
        return;
    }
    this._target.x = this._bow.x;
    this._bow.bitmap = ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","BowStretched");

   
        
}
Spriteset_ArrowShooterBase.prototype.areRectanglesOverlap = function(){
    
};

Spriteset_ArrowShooterBase.prototype.createBaseSprite = function() {
    this._baseSprite = new Sprite();
    this._blackScreen = new ScreenSprite();
    this._blackScreen.opacity = 255;
    //this.addChild(this._baseSprite);
    //this._baseSprite.addChild(this._blackScreen);
};

Spriteset_ArrowShooterBase.prototype.createTilemap = function() {
    const tilemap = new Tilemap();
    // tilemap.tileWidth = $gameMap.tileWidth();
    // tilemap.tileHeight = $gameMap.tileHeight();
    // tilemap.setData($gameMap.width(), $gameMap.height(), $gameMap.data());
    // tilemap.horizontalWrap = $gameMap.isLoopHorizontal();
    // tilemap.verticalWrap = $gameMap.isLoopVertical();
   // this._baseSprite.addChild(tilemap);
    //this.addChild(tilemap);
    this._effectsContainer = this._bg;
    this._tilemap = tilemap;
    //this.loadTileset();
};
Spriteset_ArrowShooterBase.prototype.findTargetSprite = function(target) {
    console.log(target);
    return this._target.checkCharacter(target);
};

//-----------------------------------------------------------------------------
// Game_ArrowTarget
//
// The superclass of Game_Player, Game_Follower, GameVehicle, and Game_Event.

function Game_ArrowTarget() {
    this.initialize(...arguments);
}

Game_ArrowTarget.prototype = Object.create(Game_CharacterBase.prototype);
Game_ArrowTarget.prototype.constructor = Game_ArrowTarget;

Game_ArrowTarget.prototype.initialize = function() {
    Game_CharacterBase.prototype.initialize.call(this);
};





function Sprite_ArrowShooterTarget() {

    this.initialize.apply(this, arguments);

}

Sprite_ArrowShooterTarget.prototype = Object.create(Sprite.prototype);
Sprite_ArrowShooterTarget.constructor = Sprite_ArrowShooterTarget;

Sprite_ArrowShooterTarget.prototype.initialize = function (bitmap,targetgameobj){

    Sprite.prototype.initialize.call(this, bitmap);
    this._gameobj = targetgameobj;
  //  this.opacity = 100;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this._arrowfired = false;
    this._arrowresettime = 45;
    this._arrowspeed = 30;
    //$gameTemp.requestAnimation([this._target], 2, false);
    
}
Sprite_ArrowShooterTarget.prototype.checkCharacter = function(character) {
    if(this._gameobj === character){
        
        return this;

    }
    
};

Sprite_ArrowShooterTarget.prototype.update = function(){

        Sprite.prototype.update.call(this);
        if(this._arrowfired){
            if(this.y>300){
                this.y-=1*this._arrowspeed;
            }
            this._arrowresettime-=1;
            if(this.scale.x>0.01){
                this.scale.x-=0.07;
                this.scale.y-=0.07;
            }
            
            if(this._arrowresettime<=0){
                this.resetarrow();
            }
        }
}
Sprite_ArrowShooterTarget.prototype.releaseArrow = function(){
   
    this._arrowfired = true;
};
Sprite_ArrowShooterTarget.prototype.isfiring = function(){
   
    return this._arrowfired;
};

Sprite_ArrowShooterTarget.prototype.resetarrow = function(){
   
    this._arrowfired = false;
    this.scale.x = this.scale.y =1;
    this._arrowresettime = 45;
    this.y = Graphics.height-24;
    this.x = SceneManager._scene._spriteset._bow.x;
};






function Sprite_TargetArrowPr() {

    this.initialize.apply(this, arguments);

}

Sprite_TargetArrowPr.prototype = Object.create(Sprite.prototype);
Sprite_TargetArrowPr.constructor = Sprite_TargetArrowPr;

Sprite_TargetArrowPr.prototype.initialize = function (bitmap,indexe){

    Sprite.prototype.initialize.call(this, bitmap);
    this.y = indexe==(0)? 380:320;
    this.resettimer = Math.random()*100+100;
    this.x = 96*Math.round(Math.randomInt(Graphics.width)/96);
    this.requireReset= false;
    this._ismovingright = false;
    this._speed = Zf.Arrow_Shooter.targetSpeed;
    this.indexe = indexe;
    this._animwaitframe = 5;
    this._framee = 1;
    //$gameTemp.requestAnimation([this._target], 2, false);
    
}
Sprite_TargetArrowPr.prototype.checkCharacter = function(character) {
 
    
};

Sprite_TargetArrowPr.prototype.update = function(){

        Sprite.prototype.update.call(this);

        if(SceneManager._scene._phase>=3){
            this.opacity = 0;
            return;
        }
        if(this.requireReset){
            if(this.resettimer<=0){
                this.resetTarget();
                this.resettimer = Math.random()*100+100;
                this.requireReset = false;
            }else{
                this.resettimer-=1;
            }
        }
        this.updatemovement();
        this.updateanimation();
       
}
Sprite_TargetArrowPr.prototype.checkcollisionwithArrow = function(){
    if(this.requireReset){
        return;
    }
    var arrow = SceneManager._scene._spriteset._target;
    let x1 = this.x;
    let x2 = this.x+this.width;
    let y1 = this.y;
    let y2 = this.y+this.height;
    let x3 = arrow.x;
    let x4 = arrow.x+arrow.width*arrow.scale.x;
    let y3 = arrow.y;
    let y4 = arrow.y+arrow.height*arrow.scale.y;
   // console.log(x1,x2,y1,y2,x3,x4,y3,y4);
    if(x1<x4 && x2>x3 && y1<y4 && y2>y3){
        this.opacity = 0;
        this.requireReset = true;
        SceneManager._scene.addpoints((1+this.indexe));
        AudioManager.playSe({name: 'Crossbow', pan: 0, pitch: 100, volume: 100});
       
        //AudioManager.playSe({name: 'Scream_'+Math.randomInt(3), pan: 0, pitch: 100, volume: (50+Math.randomInt(50))});
        console.log("collision");
    }
   
   
};
Sprite_TargetArrowPr.prototype.updatemovement = function(){
    
    if(this._ismovingright){
        this.x+=1*this._speed;
        if(this.x>=Graphics.width){
            this._ismovingright = false;
        }
    }else if(!this._ismovingright){
        this.x-=1*this._speed;
        if(this.x<=0){
            this._ismovingright = true;
        }
    }


};
Sprite_TargetArrowPr.prototype.updateanimation = function(){
    console.log(this._animwaitframe);
    if(this._animwaitframe<=0){
        this._framee = this._framee==1? 2:1;
        
        this.bitmap =  ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","Target"+(this.indexe +1)+"_"+this._framee);
        this._animwaitframe = 5+Math.randomInt(30);
    }else{
        this._animwaitframe-=1;
    }


};

Sprite_TargetArrowPr.prototype.resetTarget = function(){
   this.opacity = 255;
   this.x = 96*Math.round(Math.randomInt(Graphics.width)/96);
   let r = Math.randomInt(2);
   this._ismovingright = r===1?true:false;
    
};


//-----------------------------------------------------------------------------
// Window_ScoreArrowMiniGame
//
// The window for displaying the party's gold.

function Window_ScoreArrowMiniGame() {
    this.initialize(...arguments);
}

Window_ScoreArrowMiniGame.prototype = Object.create(Window_Selectable.prototype);
Window_ScoreArrowMiniGame.prototype.constructor = Window_ScoreArrowMiniGame;

Window_ScoreArrowMiniGame.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
};

Window_ScoreArrowMiniGame.prototype.colSpacing = function() {
    return 0;
};

Window_ScoreArrowMiniGame.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 40;
    if(this.value()%10==0){
        AudioManager.playSe({name: 'Wind3', pan: 0, pitch: 100, volume: 100});
        
    }
    this.drawText(" x "+this.value(), x, y, width,"center");
};

Window_ScoreArrowMiniGame.prototype.value = function() {
    return SceneManager._scene._score;
};

Window_ScoreArrowMiniGame.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};

//-----------------------------------------------------------------------------
// Window_TimerArrowMiniGame
//
// The window for displaying the party's gold.

function Window_TimerArrowMiniGame() {
    this.initialize(...arguments);
}

Window_TimerArrowMiniGame.prototype = Object.create(Window_Selectable.prototype);
Window_TimerArrowMiniGame.prototype.constructor = Window_TimerArrowMiniGame;

Window_TimerArrowMiniGame.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
};

Window_TimerArrowMiniGame.prototype.colSpacing = function() {
    return 0;
};

Window_TimerArrowMiniGame.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 40;
    this.drawText(this.value(), x, y, width,"center");
};

Window_TimerArrowMiniGame.prototype.value = function() {
    return SceneManager._scene._timeRemaining;
};

Window_TimerArrowMiniGame.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};

function Sprite_Gauge_Shooter() {

    this.initialize.apply(this, arguments);

}

Sprite_Gauge_Shooter.prototype = Object.create(Sprite.prototype);
Sprite_Gauge_Shooter.constructor = Sprite_Gauge_Shooter;

Sprite_Gauge_Shooter.prototype.initialize = function (bitmap){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = 0;
    this.y = 0;
    this._negativeSpr = new Sprite(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","RedBar"));
    this._positiveSpr = new Sprite(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","BlueBar"));
    this._negativeSpr.x = 104;
    this._negativeSpr.y = 104;
    this._positiveSpr.x = 650;
    this._positiveSpr.y = 104;
    this.addChild(this._negativeSpr);
    this.addChild(this._positiveSpr);
    this._winsprite = new Sprite(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","RikaBarfinish1"));
    this._losesprite = new Sprite(ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","RikaBarfinish2"));
    this._progress = 0;
    this._winsprite.x = Graphics.width-200;
    this._winsprite.y = this._losesprite.y =  32;
    this._losesprite.x = 35;
    this._winsprite.scale.x = this._winsprite.scale.y = this._losesprite.scale.x = this._losesprite.scale.y = 2;
    this._losesprite.scale.x = this._losesprite.scale.y
    this.addChild(this._winsprite);
    this.addChild(this._losesprite);
    this._positiveSpr.setFrame(0,0,0+this._progress, 300);
    this._multiplier = 20;
    this._decspeed = 1;
    this._dectimer = 35;
    
    this._initdickposx = Graphics.width/2 - 40;
}


Sprite_Gauge_Shooter.prototype.update = function(){

 Sprite.prototype.update.call(this);
 //this.setFrame(this.x,0, this.width, this.visheight);
    if(this.parent._blackScreen.opacity>10){
        return ;
    };
    if(this._dectimer<=0&&this._progress>-520){
        this._progress -=this._decspeed;
        this.refreshdikpos(this._progress);

    }else{
        this._dectimer-=1;
    }
    console.log(this._progress);
        this.updatepositive();
   
        this.updatenegative();
    Zf.Arrow_Shooter._progress = this._progress;   
    
}

Sprite_Gauge_Shooter.prototype.updatepositive = function(){

    this._positiveSpr.setFrame(0,0,0+this._progress, 300);
    

}
Sprite_Gauge_Shooter.prototype.refreshdikpos = function(pos){

    this.parent._dik.x = this._initdickposx + pos;
    if(pos<-100){
        this.parent._dik.bitmap = ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","Dik2");
    }
    if(pos<-300){
        this.parent._dik.bitmap = ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","Dik1");
    }
    if(pos>0){
        this.parent._dik.bitmap = ImageManager.loadBitmap("img/pictures/Arrow_Shooter/","Dik3");
    }

}
Sprite_Gauge_Shooter.prototype.addpoints = function(points){
    if(this._progress>520){
        return;
    }
    this._progress += points*this._multiplier;
    this._dectimer = 50;
    this.refreshdikpos(this._progress);
    
}
Sprite_Gauge_Shooter.prototype.updatenegative = function(){

    this._negativeSpr.setFrame(520+this._progress,0,600, 300);
    this._negativeSpr.x = 620 +this._progress;
    //this._negativeSpr.x = 300;
}