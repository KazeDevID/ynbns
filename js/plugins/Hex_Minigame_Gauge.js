/*=============================================================================
 * Diary Plugin
 * By Hex - www.fiverr.com/hex_fvx
 * Minigame_Gauge.js
 * Version: 1.0
 * Free for commercial and non commercial use.
 *=============================================================================*/
 /*:
 * @plugindesc This Adds a Gauge to the Game which can be used anywhere
 *             
 * @author Hex
 *
 * @help Using this plugin you can use Gauge and click to progress in the minigame.
 * 
 * and trigger a common event once the bar is full.
 * 
 * There are different Level of Gauge.
 * 
 * 
 * Script call:-
 * 
 * ZF.gaugeSceneMap.setGauge(level of Gauge , common event id when bar is full)
 * 
 * levels of Gauges:-
 *              0 - Easy
 *              1 - Medium
 *              2 - Hard
 *              3 - Impossible
 * 
 * Example:-
 *          ZF.gaugeSceneMap.setGauge(1,1);
 * 
 *         This uses medium level and triggers common event 1 when the bar is full.
 * 
 * 
 * This plugin would only work in 816*624 resolution.
 * 
 * You can only use the plugin for personal project.
 * 
 * 
 * This plugin wouldn't work on other game dimensions.
 * 
 * contact me if you change the game dimensions in future.
 *
 * 
 * 
 */
//kiss hj tit bj sex 3 levels/
var ZF = ZF || {};  
ZF.gaugeSceneMap = ZF.gaugeSceneMap || {}; 
ZF.PlayerUI = ZF.PlayerUI || {}; 
ZF.gaugeSceneMap.recentgaugetype = 0;
ZF.gaugeSceneMap.lastBarcompleted = -1;
ZF.gaugeSceneMap.previousMap = 0;
ZF.gaugeSceneMap.MapVariableArray = [0,0,0,0,24,26,34,36,29,22,38,41,23,25,27,28,33,32,31,35,37,39,42,43,30,0,0,0,0,0,0,0,116,117,118,0,0,0,127,128,131,129,130,133,134,123,123];
                                   //0,1,2,3,4, 5, 6,  7,8,9 ,10, 11, 12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46
Scene_Load.prototype.onLoadSuccess = function() {
    SoundManager.playLoad();
    this.fadeOutAll();
    this.reloadMapIfUpdated();
    
    $gameSwitches.setValue(ZF.gaugeSceneMap.MapVariableArray[$gameMap.mapId()], true);
    SceneManager.goto(Scene_Map);
    this._loadSuccess = true;
};


Game_Event.prototype.list = function() {
    if(!this.page()) return;
    return this.page().list;
};


const alias_ZF_AddingGauge_createAllWindows = Scene_Message.prototype.createAllWindows;
Scene_Message.prototype.createAllWindows = function() {
    alias_ZF_AddingGauge_createAllWindows.call(this);
    this.createGaugeWindow();
};

Scene_Message.prototype.createGaugeWindow = function() {
    ZF.gaugeSceneMap._mousePointerWindow = new Window_MapMousePointer(new Rectangle(Graphics.width+900, 300, 200, 70));
    this.addWindow(ZF.gaugeSceneMap._mousePointerWindow);
    ZF.gaugeSceneMap._goldWindow = new Window_Gold_Custom(new Rectangle(170, 660, 200, 70));
    ZF.gaugeSceneMap._IconsBGWindow = new Window_Base(new Rectangle(585,-5,415,90));
    ZF.gaugeSceneMap._gaugeWindow = new Window_Gauge_Scene_Map(new Rectangle(Graphics.width-60, 267, 50, 250));
    ZF.gaugeSceneMap._HorzgaugeMiniGame = new Sprite_HorizontalGaugeClickerImage(ImageManager.loadBitmap("img/pictures/Gauge_1/","HorizontalBarBorder"));
  //  console.log(ZF.gaugeSceneMap._HorzgaugeMiniGame)
    this.addChild(ZF.gaugeSceneMap._IconsBGWindow);
    this.addWindow(ZF.gaugeSceneMap._gaugeWindow);
    
    
    if($gameSwitches.value(55)){
        if($gameSwitches.value(114)){
            ZF.PlayerUI.playerPortrait = new Sprite_PlayerPortraitAnimated(ImageManager.loadBitmap("img/pictures/","ChadMCTransformed"));
            //.bitmap = ImageManager.loadBitmap("img/pictures/","ChadMCTransformed"+this._currentExp)
        }else{
        ZF.PlayerUI.playerPortrait = new Sprite_PlayerPortraitAnimated(ImageManager.loadBitmap("img/pictures/","ChadMCMainPortraitClothed"));
        }
    }else{
        ZF.PlayerUI.playerPortrait = new Sprite_PlayerPortraitAnimated(ImageManager.loadBitmap("img/pictures/","MCMainPortraitClothed"));
    }
    this.addChild(ZF.PlayerUI.playerPortrait);
    ZF.PlayerUI.MapIcon = new Sprite_MapIcon(ImageManager.loadBitmap("img/pictures/","MapIcon"));
    this.addChild(ZF.PlayerUI.MapIcon);
    ZF.PlayerUI.AnimationText=[];
    for (let index = 0; index < 3; index++) {

        ZF.PlayerUI.AnimationText[index] = new Sprite_AnimationText(ImageManager.loadBitmap("img/pictures/CG_TextAnimation/","Text_"+(index+1)),index);
        this.addChild(ZF.PlayerUI.AnimationText[index]);

    }
    this.addChild(ZF.gaugeSceneMap._HorzgaugeMiniGame);
    ZF.PlayerUI.BackIcon = new Sprite_BackIcon(ImageManager.loadBitmap("img/pictures/","BackButton"),1);
    this.addChild(ZF.PlayerUI.BackIcon);
    ZF.PlayerUI.saveIcon = new Sprite_BackIcon(ImageManager.loadBitmap("img/pictures/","Saveicon"),0);
    this.addChild(ZF.PlayerUI.saveIcon);
    //ZF.PlayerUI.backpackIcon = new Sprite_BackIcon(ImageManager.loadBitmap("img/pictures/","Backpackicon"),2);
    //this.addChild(ZF.PlayerUI.backpackIcon);
    //ZF.PlayerUI.PatreonIcon = new Sprite_PatreonIcon(ImageManager.loadBitmap("img/pictures/","Backpackicon"));
    ZF.PlayerUI.PatreonIcon = new Sprite_PatreonIcon(ImageManager.loadBitmap("img/pictures/","Patreon"));
    //ZF.PlayerUI.PatreonIcon.x+=20;
    //ZF.PlayerUI.PatreonIcon.y+=10;
    this.addChild(ZF.PlayerUI.PatreonIcon);
    ZF.PlayerUI.animnexticon = new Sprite_AnimNextButton(ImageManager.loadBitmap("img/pictures/Gauge_1/","SkipBar"));
    this.addChild(ZF.PlayerUI.animnexticon);
    ZF.PlayerUI.foreground = new Sprite_PlayerHPandStamina(ImageManager.loadBitmap("img/pictures/","PlayerUI"));
    this.addChild(ZF.PlayerUI.foreground);
    this.addChild(ZF.gaugeSceneMap._goldWindow);
};
Scene_Message.prototype.messageWindowRect = function() {
    const ww = 920;
    const wh = 190;
    const wx = 390;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
};

ZF.PlayerUI.BacktoMorning  = function() {
    DataManager.loadGame(0);
    SoundManager.playLoad();
    SceneManager._scene.fadeOutAll();
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        const mapId = $gameMap.mapId();
        const x = $gamePlayer.x;
        const y = $gamePlayer.y;
        const d = $gamePlayer.direction();
        $gamePlayer.reserveTransfer(mapId, x, y, d, 0);
       // $gamePlayer.requestMapReload();
    }
    SceneManager.goto(Scene_Map);
    
};//
ZF.PlayerUI.showMaidenStats = function(){
    
    SceneManager._scene.addChild(new Window_MaidenStats(new Rectangle(1000,-10,280,90)));//Mage 62

};
ZF.PlayerUI.genRandomNumber = function(varid,min,max){
    
    const num = Math.randomInt(max)+min;
    $gameVariables.setValue(varid,num);

};
ZF.PlayerUI.AnimateTexts = function(x,y,count,speed){
    
    for (let index = 0; index < count; index++) {
        ZF.PlayerUI.AnimationText[index].playAnim(x,y);
        ZF.PlayerUI.AnimationText[index].animspeed = speed;
    }

};
ZF.PlayerUI.pauseAnim = function(){
    
    for (let index = 0; index < ZF.PlayerUI.AnimationText.length; index++) {
        ZF.PlayerUI.AnimationText[index].pauseAnim();
    }

};
ZF.PlayerUI.ChangeExpression = function(exp){
    
    ZF.PlayerUI.playerPortrait.ChangeExpression(exp);

};

ZF.gaugeSceneMap.setTargetGauge= function(speed){
    ZF.gaugeSceneMap.targetGauge.startTargauge(speed);
}


ZF.gaugeSceneMap.setGauge= function(type,commonevid){

    ZF.gaugeSceneMap.recentgaugetype = type;
    if(type==0){
        ZF.gaugeSceneMap.gaugeimg.additivespeed = 17;
        ZF.gaugeSceneMap.gaugeimg._speed = 40;
        
    }
    if(type==1){
      ZF.gaugeSceneMap.gaugeimg.additivespeed = 14;
      ZF.gaugeSceneMap.gaugeimg._speed = 30;
        
    }
    if(type==2){
        ZF.gaugeSceneMap.gaugeimg.additivespeed = 11;
        ZF.gaugeSceneMap.gaugeimg._speed = 20;
        
  
    }if(type==3){
        ZF.gaugeSceneMap.gaugeimg.additivespeed = 11;
        ZF.gaugeSceneMap.gaugeimg._speed = 0;
        
  
    }
    ZF.gaugeSceneMap.gaugeimg._commevid = commonevid;
    ZF.gaugeSceneMap.gaugeimg.visheight = 0;
    ZF.gaugeSceneMap.gaugeimg._barfull = false;
    ZF.gaugeSceneMap.lastBarcompleted = -1;
    ZF.gaugeSceneMap.gaugeimg._baravailable = true;
    if(ZF.gaugeSceneMap.recentgaugetype==0){
        ZF.gaugeSceneMap.gaugeimg.bitmap = ImageManager.loadBitmap("img/pictures/Gauge_1/","GaugeLoader");
    
    }
    if(ZF.gaugeSceneMap.recentgaugetype==1){
        ZF.gaugeSceneMap.gaugeimg.bitmap = ImageManager.loadBitmap("img/pictures/Gauge_1/","GaugeLoader2");
    
    }
    if(ZF.gaugeSceneMap.recentgaugetype==2){
        ZF.gaugeSceneMap.gaugeimg.bitmap = ImageManager.loadBitmap("img/pictures/Gauge_1/","GaugeLoader3");
    
    }
}
//-----------------------------------------------------------------------------
// Window_Gold_Custom
//
// The window for displaying the party's gold.

function Window_Gold_Custom() {
    this.initialize(...arguments);
}

Window_Gold_Custom.prototype = Object.create(Window_Selectable.prototype);
Window_Gold_Custom.prototype.constructor = Window_Gold_Custom;

Window_Gold_Custom.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.opacity=0;
    this.refresh();
};

Window_Gold_Custom.prototype.colSpacing = function() {
    return 0;
};

Window_Gold_Custom.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.drawText(this.value(), x, y, width);
};

Window_Gold_Custom.prototype.value = function() {
    return $gameParty.gold();
};

Window_Gold_Custom.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_Gold_Custom.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};
//-----------------------------------------------------------------------------
// Window_Gauge_Scene_Map
//
// The window for displaying the party's gold.

function Window_Gauge_Scene_Map() {
    this.initialize(...arguments);
}

Window_Gauge_Scene_Map.prototype = Object.create(Window_Selectable.prototype);
Window_Gauge_Scene_Map.prototype.constructor = Window_Gauge_Scene_Map;

Window_Gauge_Scene_Map.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
    
    ZF.gaugeSceneMap.targetGauge = new Sprite_GaugeTargetClicker(ImageManager.loadBitmap("img/pictures/Gauge_1/","GaugeType2"));
    this.addChild(ZF.gaugeSceneMap.targetGauge);
    
    ZF.gaugeSceneMap.gaugeimg = new Sprite_GaugeClickerImage(ImageManager.loadBitmap("img/pictures/Gauge_1/","GaugeLoader"));
    this.addChild(ZF.gaugeSceneMap.gaugeimg);
    
};

Window_Gauge_Scene_Map.prototype.colSpacing = function() {
    return 0;
};

Window_Gauge_Scene_Map.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    //this.drawCurrencyValue(this.value(), this.currencyUnit(), x, y, width);
};

Window_Gauge_Scene_Map.prototype.value = function() {
    return $gameParty.gold();
};

Window_Gauge_Scene_Map.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_Gauge_Scene_Map.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};

function Sprite_PlayerPortraitAnimated() {

    this.initialize.apply(this, arguments);

}

Sprite_PlayerPortraitAnimated.prototype = Object.create(Sprite.prototype);
Sprite_PlayerPortraitAnimated.constructor = Sprite_PlayerPortraitAnimated;

Sprite_PlayerPortraitAnimated.prototype.initialize = function (bitmap,dimW,dimH){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = -200;
    this.y = 90;
    this.scale.x = this.scale.y = 2;
    this.animspeed = 30;
    this._animtimer = this.animspeed;
    this.goingdown = true;
    this.fadingout = false;
    this.fadingin = false;
    this._currentExp = 1;
    
}
Sprite_PlayerPortraitAnimated.prototype.ChangeExpression = function(exp){

    this.fadingout=true;
    this._currentExp=exp;
 

}

Sprite_PlayerPortraitAnimated.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if($gameMap.mapId()==12||$gameMap.mapId()==44||$gameMap.mapId()==38||$gameMap.mapId()==32||$gameSwitches.value(71)){
    this.opacity=0;
    return;
 }
//  if(TouchInput.isTriggered()){
    
//     console.log(this.bitmap.getAlphaPixel(TouchInput.x,TouchInput.y))
//     if(TouchInput.x>this.x&&TouchInput.x<this.x+this.width*2&&TouchInput.y>this.y&&TouchInput.y<this.y+this.height*2){
//         this.opacity -= 10;
//         console.log("clicked");
//     }
//  }
 if(this.fadingout){
    this.opacity-=10;
    this.x-=10;
    if(this.opacity==55){
        if($gameSwitches.value(55)){
            if($gameSwitches.value(114)){
                this.bitmap = ImageManager.loadBitmap("img/pictures/","ChadMCTransformed"+this._currentExp)
            }else{
                this.bitmap = ImageManager.loadBitmap("img/pictures/","ChadMCMainPortraitClothed"+this._currentExp)
            }
            
        }else{
            this.bitmap = ImageManager.loadBitmap("img/pictures/","MCMainPortraitClothed"+this._currentExp)
        }
        this.fadingin=true;
        this.fadingout=false;
        return;
    }
 }
 if(this.fadingin){
    this.opacity+=10;
    this.x+=10;
   // console.log(this.opacity)
    if(this.opacity==255){
        this.fadingin=false;
        return;
    }
 }
 if(this._animtimer<=0){
    if(this.goingdown){
        this.y-=2;
    }else{
        this.y+=2;
    }
    
    this.goingdown=!this.goingdown;
    this._animtimer=this.animspeed;
 }else{this._animtimer-=1;}
}


function Sprite_MapIcon() {
    this.initialize.apply(this, arguments);
}

Sprite_MapIcon.prototype = Object.create(Sprite.prototype);
Sprite_MapIcon.constructor = Sprite_MapIcon;

Sprite_MapIcon.prototype.initialize = function (bitmap){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = 820;
    this.y = 0;
    this.scale.x = this.scale.y = 1;
    this.animspeed = 30;
    this._animtimer = this.animspeed;
    this.goingdown = true;
    this.fadingout = false;
    this.fadingin = false;
    this._currentExp = 1;
    if($gameMap.mapId()==12){
        this.bitmap = ImageManager.loadBitmap("img/pictures/","GlobalMap");
    }
    
}
Sprite_MapIcon.prototype.ChangeExpression = function(exp){

    this.fadingout=true;
    this._currentExp=exp;
 

}

Sprite_MapIcon.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if($gameMap.mapId()==32||$gameMap._interpreter.isRunning()||($gameMap._mapId==13&&$gameVariables.value(12)==4)){
    return;
   // this.opacity=0;
    //return;
 }
 
 if(TouchInput.x>this.x&&TouchInput.x<this.x+this.width&&TouchInput.y>this.y&&TouchInput.y<this.y+this.height){
    this.scale.x=this.scale.y = 1.05;
    this.setColorTone([22,22,100,33]);
    if(TouchInput.isTriggered()){
        if($gameVariables.value(5)<=10&&$gameMap.mapId()==13){
            $gameTemp.reserveCommonEvent(190);
            return;
         }
         if($gameMap.mapId()==12){
            $gameTemp.reserveCommonEvent(239);
            return;
         }
        this.scale.x=this.scale.y = 1;
        //$gameTemp.reserveCommonEvent(40);
        $gameSwitches.setValue(116, true);
        $gameSwitches.setValue(23, true);
        $gamePlayer._transferring = true;
        if($gameSwitches.value(55)){
            $gamePlayer.reserveTransfer(32, 12,12, 2, 0);
            
        }else{
            $gamePlayer.reserveTransfer(12, 12,12, 2, 0);
            
        }
        //$gameTemp.reserveCommonEvent(40);
        
       // this._pressonce = true;
        
    }

}else{
    this.scale.x=this.scale.y = 1;
    this.setColorTone([0,0,0,0]);

    }
}

function Sprite_AnimationText() {

    this.initialize.apply(this, arguments);

}

Sprite_AnimationText.prototype = Object.create(Sprite.prototype);
Sprite_AnimationText.constructor = Sprite_AnimationText;

Sprite_AnimationText.prototype.initialize = function (bitmap,index){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = 600;
    this.y = 350;
    this.scale.x = this.scale.y = 1;
    this.animspeed = 1;
    this.animating = false;
    this.opacity = 0;
    this._currentIndex = 1;
    this.indexe = index+1;
    this.animagain = false;
    this._animtimer = 20;
    this.tempx = 0;
    this.tempy = 0;
    
    
}
Sprite_AnimationText.prototype.pauseAnim = function(){
    this.animating = false;
    this.animagain = false;
    this._animtimer = 20;
    this.opacity = 0;
}
Sprite_AnimationText.prototype.playAnim = function(x,y){
    var mul = this.indexe==1?-1:1;
    AudioManager.playSe({name: 'glush', pan: 0, pitch: 100, volume: 30});
                
    //console.log(this.indexe);
    if(this.indexe==1){
        this.x = x-120+20*(Math.randomInt(3));
        this.y = y+80+20*(Math.randomInt(3));
    }else if(this.indexe==2){
        this.x = x+(Math.randomInt(3))
        this.y = y+80+20*(Math.randomInt(3));
    }else if(this.indexe==3){
        this.x = x+80+20*(Math.randomInt(3));
        this.y = y+80+20*(Math.randomInt(3));

    }
   // this.y = y;
   this.scale.x = this.scale.y = Math.random()*0.5+0.5;
    this.tempx = x;
    this.tempy = y;
    this.opacity = 255;
    var randindex = Math.randomInt(4);
    this.bitmap = ImageManager.loadBitmap("img/pictures/CG_TextAnimation/","Text_"+randindex);
    this.animating = true;
    this.animagain = true;
}

Sprite_AnimationText.prototype.update = function(){

 Sprite.prototype.update.call(this);
 
 if(this.opacity<=0){
    //this.opacity=0;
    return;
 }
 if($gameMap._interpreter.isRunning()){
  //  return;
  
 }
 if(this.animating){
    this.y-=this.animspeed;
    this.opacity-=this.animspeed*3;
    if(this.opacity<=0){
        this.animating = false;
    }
 }
 if(this.animating==false&&this.animagain){
        this.playAnim(this.tempx,this.tempy);
        
    
   
 }
}
function Sprite_BackIcon() {

    this.initialize.apply(this, arguments);

}

Sprite_BackIcon.prototype = Object.create(Sprite.prototype);
Sprite_BackIcon.constructor = Sprite_BackIcon;

Sprite_BackIcon.prototype.initialize = function (bitmap,numb){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = 720;
    this.y = 0;
    this.scale.x = this.scale.y = 1;
    this.animspeed = 30;
    this._animtimer = this.animspeed;
    this.goingdown = true;
    this.fadingout = false;
    this.fadingin = false;
    this._currentExp = 1;
    this.issaveIcon = numb;//0 for save, 1 for back 2 for Backpack
    if(this.issaveIcon == 0){
        this.x = 920;
        this.y = 0;
    }else if(this.issaveIcon == 1){
        this.x = 720;
        this.y = 0;
    }else{
        this.x = 510;
        this.y = 0;
    }
    
    
}
Sprite_BackIcon.prototype.ChangeExpression = function(exp){

    this.fadingout=true;
    this._currentExp=exp;
 

}

Sprite_BackIcon.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if($gameMap._interpreter.isRunning()||($gameMap._mapId==13&&$gameVariables.value(12)==4)){
    return;
 }
   
 
 
 if(TouchInput.x>this.x&&TouchInput.x<this.x+this.width&&TouchInput.y>this.y&&TouchInput.y<this.y+this.height){
    this.scale.x=this.scale.y = 1.05;
    this.setColorTone([22,22,100,33]);
    if(ZF.gaugeSceneMap.previousMap==0){
       // return;
    }
    if(TouchInput.isTriggered()){
        
        this.scale.x=this.scale.y = 1;
        if(this.issaveIcon==0){
            $gameTemp.reserveCommonEvent(7);//SceneManager.push(Scene_Save);
        }else if(this.issaveIcon==1){

            if($gameVariables.value(5)<=10&&$gameMap.mapId()==13){
                $gameTemp.reserveCommonEvent(190);
                return;
             }
            var array = JSON.parse($dataMap.meta.backmap);
          //  console.log(array);
            var varid = ZF.gaugeSceneMap.MapVariableArray[array[0]];
           // console.log(varid);
            $gameSwitches.setValue(varid, true);
            $gamePlayer.reserveTransfer(array[0], 12,12, 2, 0);
        }else{
            SceneManager.push(Scene_Item);
        }
        
        // $gameTemp.reserveCommonEvent(40);
        // for (let index = 2; index < 50; index++) {
        //     $gameScreen.erasePicture(index);
            
        // }
       // this._pressonce = true;
        
    }

}else{
    this.scale.x=this.scale.y = 1;
    this.setColorTone([0,0,0,0]);

    }
}

function Sprite_PlayerHPandStamina() {

    this.initialize.apply(this, arguments);

}

Sprite_PlayerHPandStamina.prototype = Object.create(Sprite.prototype);
Sprite_PlayerHPandStamina.constructor = Sprite_PlayerHPandStamina;

Sprite_PlayerHPandStamina.prototype.initialize = function (bitmap,dimW,dimH){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = 0;
    this.y = 0;
    this._hpGauge = new Sprite(ImageManager.loadBitmap("img/pictures/","HpGauge"));
    this._hpGauge.x = 83;
    this._hpGauge.y = 596;
    this.addChild(this._hpGauge);
    this._staminaGauge = new Sprite(ImageManager.loadBitmap("img/pictures/","StaminaGauge"));
    this._staminaGauge.x = 83;
    this._staminaGauge.y = 635;
    this.addChild(this._staminaGauge);
    this.refreshHpandStamina();
    
}
//CG on map as well as windowed new CG window has to be made
Sprite_PlayerHPandStamina.prototype.update = function(){

 Sprite.prototype.update.call(this);
 
}
Sprite_PlayerHPandStamina.prototype.refreshHpandStamina = function(){
    this._hpGauge.setFrame(0,0, $gameVariables.value(4), 720);
    this._staminaGauge.setFrame(0,0, 206*$gameVariables.value(5)/$gameVariables.value(99), 720);
};
function Sprite_HorizontalGaugeClickerImage() {

    this.initialize.apply(this, arguments);

}

Sprite_HorizontalGaugeClickerImage.prototype = Object.create(Sprite.prototype);
Sprite_HorizontalGaugeClickerImage.constructor = Sprite_HorizontalGaugeClickerImage;

Sprite_HorizontalGaugeClickerImage.prototype.initialize = function (bitmap,dimW,dimH){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = 0;
    this.y = 0;
    this.opacity = 0;
    //this.scale.y*=-1;
    this.barenabled = false;
    this.opposingforce = 1;
    this.SpriteLocation = 0;
    this.clickforce = $gameVariables.value(68)*2+5;//68
    this.difflev = 0;
    this.Hand = new Sprite(ImageManager.loadBitmap("img/pictures/Gauge_1/","Hand"));
    this.Hand.x = 630+this.x;
    this.Hand.y = 100;
    
}
Sprite_HorizontalGaugeClickerImage.prototype.update = function(){

 Sprite.prototype.update.call(this);
 
 if(!this.barenabled){
    return;
 }
 this.SpriteLocation-=this.opposingforce;
 if(this.SpriteLocation<=-325){
    this.opacity = this.playerBar.opacity = this.EnemyBar.opacity = 0;
    this.barenabled = false;
    //$gameTemp.reserveCommonEvent(345);
    $gameVariables.setValue(170,-1);
 }
 if(TouchInput.isTriggered()){
    this.SpriteLocation+=this.clickforce;    
    if(this.SpriteLocation>=360){
        this.opacity = this.playerBar.opacity = this.EnemyBar.opacity = 0;
        this.barenabled = false;
        //$gameTemp.reserveCommonEvent(345);
        $gameVariables.setValue(170,1);
    }
    //console.log(30*(240-this.visheight)/240);
 }
 this.updateGaugeFrame();
}

Sprite_HorizontalGaugeClickerImage.prototype.updateGaugeFrame = function(){
    this.playerBar.x = 326;
    this.playerBar.y = 125;
    this.playerBar.setFrame(0,0, 340+this.SpriteLocation,28);
    this.EnemyBar.x = 326;
    this.EnemyBar.y = 125;
    this.EnemyBar.setFrame(-326-this.SpriteLocation,0,680,28);
    this.Hand.x = 630+this.x+this.SpriteLocation;
}

Sprite_HorizontalGaugeClickerImage.prototype.enableBar = function(char){
    this.opacity = 255;
    this.SpriteLocation = 0;
   // this.difflev = difflev;
    if(this.barenabled==false){
      //  this.barenabled = true;
        this.playerBar = new Sprite(ImageManager.loadBitmap("img/pictures/Gauge_1/","HorizontalBarPlayerBase"));
        this.playerPfp = new Sprite(ImageManager.loadBitmap("img/pictures/pfp/","Player_1"));
        this.addChild(this.playerBar);
        this.playerBar.x = 326;
        this.playerBar.y = 125;
        this.playerPfp.x = 268;
        this.playerPfp.y = 64;
        this.playerBar.setFrame(0,0, 340+this.SpriteLocation, 28);
        this.EnemyBar = new Sprite(ImageManager.loadBitmap("img/pictures/Gauge_1/","HorizontalBarPlayer2Base"));
        this.EnemyBar.x = 326;
        this.EnemyBar.y = 125;
       // this.EnemyBarscale.y*=-1;
        this.addChild(this.EnemyBar);
        this.EnemyBar.setFrame(-326,0,680-this.SpriteLocation,28);
        if(char==0){
            this.EnemyPfp = new Sprite(ImageManager.loadBitmap("img/pictures/pfp/","Rei_1"));
        }
        if(char==1){
            this.EnemyPfp = new Sprite(ImageManager.loadBitmap("img/pictures/pfp/","Haru_1"));
            this.EnemyBar.setColorTone([0, 0, 255, 255]);
        }

        this.EnemyPfp.x = 978;
        this.EnemyPfp.y = 64;
        this.addChild(this.playerPfp);
        this.addChild(this.EnemyPfp);
        this.Hand.x = 630+this.x+this.SpriteLocation;
        this.addChild(this.Hand);
    }
    
};

function Sprite_GaugeClickerImage() {

    this.initialize.apply(this, arguments);

}

Sprite_GaugeClickerImage.prototype = Object.create(Sprite.prototype);
Sprite_GaugeClickerImage.constructor = Sprite_GaugeClickerImage;

Sprite_GaugeClickerImage.prototype.initialize = function (bitmap,dimW,dimH){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x += 12;
    this.y += 240;
    this.scale.y*=-1;
    this.visheight = 0;
    this._barfull = false;
    this._speed = 0;
    this.additivespeed = 0;
    this._commevid = 0;
    this._baravailable = false;
}


Sprite_GaugeClickerImage.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if(this._barfull){
     return;
 }
 this.setFrame(this.x,0, this.width, this.visheight);
 this.visheight-=1;
 if(this.visheight<=0){
    this.visheight= 0;
    //this.visheight = 240;
 }
 if(TouchInput.isTriggered()&&this.visheight<=236){
    this.visheight += this.additivespeed+this._speed*(240-this.visheight)/240;
    //console.log(30*(240-this.visheight)/240);
 }
 if(this.visheight>=240){
    $gameSwitches.setValue(10, true);
   // $gameTemp.reserveCommonEvent(this._commevid);
    ZF.gaugeSceneMap.lastBarcompleted = ZF.gaugeSceneMap.recentgaugetype;
    this._barfull = true;
    this._baravailable = false;
}
// if(ZF.gaugeSceneMap.recentgaugetype==0){
//     this.bitmap = ImageManager.loadBitmap("img/pictures/Gauge_1/","GaugeLoader");

// }
// if(ZF.gaugeSceneMap.recentgaugetype==1){
//     this.bitmap = ImageManager.loadBitmap("img/pictures/Gauge_1/","GaugeLoader2");

// }
// if(ZF.gaugeSceneMap.recentgaugetype==2){
//     this.bitmap = ImageManager.loadBitmap("img/pictures/Gauge_1/","GaugeLoader3");

// }
}
Sprite_GaugeClickerImage.prototype.pushcompleteBar = function(){
    if(this._baravailable==false){
        return;
    }
    this.visheight += 50;
};

function Sprite_GaugeTargetClicker() {

    this.initialize.apply(this, arguments);

}

Sprite_GaugeTargetClicker.prototype = Object.create(Sprite.prototype);
Sprite_GaugeTargetClicker.constructor = Sprite_GaugeTargetClicker;

Sprite_GaugeTargetClicker.prototype.initialize = function (bitmap,dimW,dimH){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x += 10;
    this.y += 10;
   // console.log(this.y);
    this.scale.y*=1;
    this._tagspr = new Sprite(ImageManager.loadBitmap("img/pictures/Gauge_1/","Tag"));
    this._tagspr.x -= 40;
    this.addChild(this._tagspr);
    this._speed = 8;
    this.goingdown = true;
    this.score = -1;
    this.opacity = 0;
    this.targetHit = false;
    this._activehit = false;
    this._startfade = false;
}

Sprite_GaugeTargetClicker.prototype.fscore = function(){
    return this.score;
}
Sprite_GaugeTargetClicker.prototype.startTargauge = function(){
 this._startfade = false
 this._activehit = true;
 this.targetHit = false;
 this.opacity = 255;
}
Sprite_GaugeTargetClicker.prototype.startGaugeFade = function(){

    this._startfade  = true;
    
}

Sprite_GaugeTargetClicker.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if(this.opacity>0&&this._startfade){
    this.opacity -=15;
    if(this.opacity<0){
        this._startfade=false;
        return;
    }
 }
 if(this.targetHit||!this._activehit){
     return;
 }
    
    if(this.goingdown){
        this._tagspr.y+= this._speed;
        if(this._tagspr.y>=220){
            this.goingdown = false;
        }
        
    }else{
        this._tagspr.y-= this._speed;
        if(this._tagspr.y<=-14){
            this.goingdown = true;
        }

    }
    
    if(TouchInput.isTriggered()){
        if(this._tagspr.y<=18){
            this.score = 1;
        }
        if(this._tagspr.y>18&&this._tagspr.y<=46){
            this.score = 0;
        }
        if(this._tagspr.y>46&&this._tagspr.y<=134){
            this.score = 2;
        }
        if(this._tagspr.y>134){
            this.score = 1;
        }
        $gameVariables.setValue(20,this.score);
       // console.log(this._tagspr);
        this.targetHit = true;
        this._activehit = false;
        
    }

}
Sprite_GaugeTargetClicker.prototype.pushcompleteBar = function(){
    if(this._baravailable==false){
        return;
    }
    this.visheight += 50;
};
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
    this._previousImageID = null;
    this.opacity=this.contentsOpacity=0;
    this._startdisappear = false;
    this.refresh();
};

Window_MapMousePointer.prototype.colSpacing = function() {
    return 0;
};

Window_MapMousePointer.prototype.refresh = function(mapname) {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.drawText("mapname", x, y, width);
};

Window_MapMousePointer.prototype.drawName = function(name,pic) {
    this.opacity=this.contentsOpacity= 255;

    if(this._previousImageID==pic){
        this._startdisappear=true;
        return;
    }
    this._previousImageID = pic;
  //  console.log(this._previousImageID);
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.drawText(name, x, y, width);
};

Window_MapMousePointer.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_MapMousePointer.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};


Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
    ZF.gaugeSceneMap.previousMap = $gameMap._mapId;
    this._transferring = true;
    this._newMapId = mapId;
    this._newX = x;
    this._newY = y;
    this._newDirection = d;
    this._fadeType = fadeType;
    //console.log(mapId);
};

Game_Party.prototype.gainGold = function(amount) {
    this._gold = (this._gold + amount).clamp(0, this.maxGold());
    ZF.gaugeSceneMap._goldWindow.refresh();
};
Game_Party.prototype.loseGold = function(amount) {
    this.gainGold(-amount);
    ZF.gaugeSceneMap._goldWindow.refresh();
};


function Sprite_PatreonIcon() {

    this.initialize.apply(this, arguments);

}

Sprite_PatreonIcon.prototype = Object.create(Sprite.prototype);
Sprite_PatreonIcon.constructor = Sprite_PatreonIcon;

Sprite_PatreonIcon.prototype.initialize = function (bitmap){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = 600;
    this.y = -10;
    this.scale.x = this.scale.y = 1;
    this.animspeed = 30;
    this._animtimer = this.animspeed;
    this.goingdown = true;
    this.fadingout = false;
    this.fadingin = false;
    this._currentExp = 1;
    
    
}
Sprite_PatreonIcon.prototype.ChangeExpression = function(exp){

    this.fadingout=true;
    this._currentExp=exp;
 

}

Sprite_PatreonIcon.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if($gameMap._interpreter.isRunning()||($gameMap._mapId==13&&$gameVariables.value(12)==4)){
    return;
 }
 
 
 if(TouchInput.x>this.x&&TouchInput.x<this.x+this.width&&TouchInput.y>this.y&&TouchInput.y<this.y+this.height){
    this.scale.x=this.scale.y = 1.05;
    this.setColorTone([22,22,100,33]);
    if(ZF.gaugeSceneMap.previousMap==0){
       // return;
    }
    if(TouchInput.isTriggered()){
       // require('nw.gui').Shell.openExternal('https://www.patreon.com/KazeDevID');
       $gameTemp.reserveCommonEvent(140); 
       //VisuMZ.openURL('https://www.patreon.com/KazeDevID');
        //window.open('https://www.patreon.com/KazeDevID');
    }

}else{
    this.scale.x=this.scale.y = 1;
    this.setColorTone([0,0,0,0]);

    }
}

function Sprite_AnimNextButton() {

    this.initialize.apply(this, arguments);

}

Sprite_AnimNextButton.prototype = Object.create(Sprite.prototype);
Sprite_AnimNextButton.constructor = Sprite_AnimNextButton;

Sprite_AnimNextButton.prototype.initialize = function (bitmap){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = 1227;
    this.y = 526;
    this.scale.x = this.scale.y = 1;
    this.animspeed = 30;
    this._animtimer = this.animspeed;
    this.goingdown = true;
    this.fadingout = false;
    this.fadingin = false;
    this._currentExp = 1;
    
    
}
Sprite_AnimNextButton.prototype.ChangeExpression = function(exp){

    this.fadingout=true;
    this._currentExp=exp;
 

}

Sprite_AnimNextButton.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if(($gameMap._mapId==13&&$gameVariables.value(12)==4)){
    return;
 }
 
 
 if(TouchInput.x>this.x&&TouchInput.x<this.x+this.width&&TouchInput.y>this.y&&TouchInput.y<this.y+this.height){
    this.scale.x=this.scale.y = 1.05;
    this.setColorTone([22,22,100,33]);
    if(ZF.gaugeSceneMap.previousMap==0){
       // return;
    }
    if(TouchInput.isTriggered()){

        ZF.gaugeSceneMap.gaugeimg.pushcompleteBar();
    }

}else{
    this.scale.x=this.scale.y = 1;
    this.setColorTone([0,0,0,0]);

    }
}
//-----------------------------------------------------------------------------
// Window_MaidenStats
//
// The window for displaying the party's gold.

function Window_MaidenStats() {
    this.initialize(...arguments);
}

Window_MaidenStats.prototype = Object.create(Window_Selectable.prototype);
Window_MaidenStats.prototype.constructor = Window_MaidenStats;

Window_MaidenStats.prototype.initialize = function(rect,varid) {
    Window_Selectable.prototype.initialize.call(this, rect);
    //this.opacity=0;
     this.varid = varid;  
     this.refresh();
    
};

Window_MaidenStats.prototype.colSpacing = function() {
    return 0;
};

Window_MaidenStats.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y-10;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 20;
    this.drawText("Girls Impregnated:"+"  0/5", x, y+10, width, "left");
    this.drawText("Sex Maiden Power:"+"  0%", x, y+40, width, "left");
    
    
};

Window_MaidenStats.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};
