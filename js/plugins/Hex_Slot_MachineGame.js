
/*=============================================================================
 * Slot Machine Game
 * By Hex - www.fiverr.com/hex_fvx
 * Hex_Slot_MachineGame.js
 * Version: 1.0
 * Free for commercial and non commercial use.
 *=============================================================================*/
 /*:
 * @plugindesc SlotMachine MiniGame.
 *             
 * @author Hex
 *
 * @help Make A slotMachine Game
 * 
 * Script call to open Slot Machine - SceneManager.push(Scene_SlotMachine);
 * 
 * 
 * 
 * 
 * @param VariableID
 * @desc The Item ID which it returns when you win.
 * @default 15
 * 
 * @param SwitchID
 * @desc The Switch is set to ON when you win all 3 combinations and OFF when you only win 2 combinations out of 3.
 * @default 15
 * 
 * @param CommonEventID
 * @desc The Commone Event ID which is called at the end of Game and When you win something.
 * @default 6
 * 
 * 
 * 
 * 
 */

 var Zf = Zf || {};
 Zf.slotmachine = {};
 Zf.slotmachine.Parameters = PluginManager.parameters('Hex_Slot_MachineGame');

 Zf.slotmachine.varid = Number(Zf.slotmachine.Parameters["VariableID"]) || 15;
 Zf.slotmachine.swichid = Number(Zf.slotmachine.Parameters["SwitchID"]) || 15;
 Zf.slotmachine.ceid = Number(Zf.slotmachine.Parameters["CommonEventID"]) || 6;
 Zf.slotmachine.difficulty = 70;
Input.keyMapper = {
    9: "tab", // tab
    13: "ok", // enter
    16: "shift", // shift
    17: "control", // control
    18: "control", // alt
    27: "escape", // escape
    32: "ok", // space
    33: "pageup", // pageup
    34: "pagedown", // pagedown
    37: "left", // left arrow
    38: "up", // up arrow
    39: "right", // right arrow
    40: "down", // down arrow
    45: "escape", // insert
    81: "pageup", // Q
    87: "pagedown", // W
    88: "escape", // X
    90: "ok", // Z
    96: "escape", // numpad 0
    98: "down", // numpad 2
    100: "left", // numpad 4
    102: "right", // numpad 6
    104: "up", // numpad 8
    120: "debug", // F9
    71: "SlotMachine" // G    
};

function Scene_SlotMachine() {
    this.initialize(...arguments);
}

Scene_SlotMachine.prototype = Object.create(Scene_MenuBase.prototype);
Scene_SlotMachine.prototype.constructor = Scene_SlotMachine;

Scene_SlotMachine.prototype.initialize = function() {
    
    Scene_MenuBase.prototype.initialize.call(this);
    this._currentVideoindex = 0
    this._binSpeed = 12;
    this._garbagecaught = 0
    this.createGameRectangle();
    this._seconds = 30;
    this._stamina = 310;
    this._timercount = 60;
    this._playershift = false;
    this._playermoving = false;
    //AudioManager.playBgm({name: 'Dungeon1', pan: 0, pitch: 100, volume: 60});
    this._animbgframe = 1;
    this._animbgtime = 20;
    this._animbgspeed = 1;
    this._canshowwarning = false;
    this._playerdir = 0;
    this._vehiclehealth = 240;
    this._calculated = false;
    this._waitforresulttime = 180;
    this._notwin = false;
        
};
Scene_SlotMachine.prototype. createGameRectangle = function() {
    this._gamerect = new Rectangle(20,0,1100,480);
    
}
Scene_SlotMachine.prototype.helpAreaHeight = function() {
    return 0;
};

Scene_SlotMachine.prototype.create = function() {
    
    Scene_MenuBase.prototype.create.call(this);
    
    this.createBackgroundSprite();
    this.createforegroundsprites();
    this.createWindowLayer();
    


};

Scene_SlotMachine.prototype.update = function() {
    
    Scene_MenuBase.prototype.update.call(this);
    if(this._slot1.result()>0&&this._slot1.result()>0&&this._slot1.result()>0)
    {
        this.calcresult();

    }
    if(this._calculated==true){
        if(this._waitforresulttime<=0){
            if(this._notwin)
            {
                $gameTemp.clearCommonEventReservation();
            }else{
                
            }
            //$gameTemp.reserveCommonEvent(Zf.slotmachine.ceid);
            SceneManager.pop();
        }else{
            this._waitforresulttime-=1;
        };
        if(Input.isTriggered("cancel")){
            SceneManager.pop();
        }
        
    }
    
};

Scene_SlotMachine.prototype.animbg = function() {

   
};

Scene_SlotMachine.prototype.calcresult = function() {
    
    if(this._calculated){
        return;
    }
   if(this._slot1.result()==this._slot2.result()&&this._slot2.result()==this._slot3.result()){
    console.log("WOW!!!",this._slot1.result());  
    $gameSwitches.setValue(Zf.slotmachine.swichid, true);
    $gameVariables.setValue(Zf.slotmachine.varid,this._slot1.result()) ;
    $gameTemp.clearCommonEventReservation();
    
    this._calculated = true;

   }else if(this._slot1.result()!=0&&this._slot2.result()!=0&&this._slot3.result()!=0){
       {
       if(this._slot1.result()==this._slot2.result()||this._slot1.result()==this._slot3.result()){
           console.log("You won!"+this._slot1.result());
           $gameVariables.setValue(Zf.slotmachine.varid,this._slot1.result());
           this._calculated = true;
       }else if(this._slot2.result()==this._slot3.result()||this._slot1.result()==this._slot3.result())
       {
           console.log("You won!"+this._slot3.result());
           $gameVariables.setValue(Zf.slotmachine.varid,this._slot3.result());
           this._calculated = true;
       
       }else if(this._slot2.result()==this._slot3.result()||this._slot2.result()==this._slot1.result())
       {
           console.log("You won!"+this._slot2.result());
           $gameVariables.setValue(Zf.slotmachine.varid,this._slot2.result());
           this._calculated = true;
       
       }else{
           
        this._calculated = true;
        this._notwin = true;
        //this._button._pressonce = false;
        //this._button.x=338;
       }
       $gameSwitches.setValue(Zf.slotmachine.swichid, false);
       $gameTemp.clearCommonEventReservation();
       
       
    }
   }else{
    this._calculated = false;
    
   }
   var totalperc = parseInt((this._slot1._perc+this._slot2._perc+this._slot3._perc)/2.4);
    this.overallscoretext.bitmap.clear();
    this.overallscoretext.bitmap.drawText("Overall Chance: "+totalperc+" %",0,0,500,100,"center");
    $gameVariables.setValue(14,totalperc);
           
  
  
};





Scene_SlotMachine.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    //this._statusWindow.refresh();
};


Scene_SlotMachine.prototype.resetslotmachine = function() {
    this._slot1.reset();
    this._slot2.reset();
    this._slot3.reset();
    
    $gameTemp.clearCommonEventReservation();
    this._calculated = false;
    this._waitforresulttime = 180;
   
};

Scene_SlotMachine.prototype.createforegroundsprites = function(){
    
    
}
Scene_SlotMachine.prototype.createBackgroundSprite = function() {
    var y = 275;
    var x = 400;
    this.addChild(new Window_Base(new Rectangle(330,100,720,140)));
    var textsprites = [];
    for (let index = 0; index < 3; index++) {
        textsprites[index] = new Sprite(new Bitmap(200,100));
        this.addChild(new Window_Base(new Rectangle(390+200*index,240,200,260)));
        this.addChild(new Window_Base(new Rectangle(390+200*index,500,200,50)));
        this.addChild(textsprites[index]);
        
       
    }
    this._difficultyspr = new Sprite(new Bitmap(700,100));
    const difficulty = Zf.slotmachine.difficulty;
    this.overallscore = 0;
    this.addChild(this._difficultyspr);
    var diffstr = "Easy";
    if(difficulty<50){
        diffstr = "Easy";
        this._difficultyspr.bitmap.textColor = ('green');
    }else if(difficulty<65){
        diffstr = "Normal";
        this._difficultyspr.bitmap.textColor = ('gold');
        //this._difficultyspr.bitmap.changeTextColor(ColorManager.textColor(3));
    }else if(difficulty<80){
        diffstr = "Hard";
        this._difficultyspr.bitmap.textColor = ('red');
        //this._difficultyspr.bitmap.changeTextColor(ColorManager.textColor(3));
    }else if(difficulty<95){
        diffstr = "Impossible";
        this._difficultyspr.bitmap.textColor = ('purple');
        //this._difficultyspr.bitmap.changeTextColor(ColorManager.textColor(3));
    }
    this._difficultyspr.x = 330;
    this._difficultyspr.y = 90;
    this._difficultyspr.bitmap.fontSize = 40;
    this._difficultyspr.bitmap.drawText("        "+diffstr+" "+Zf.slotmachine.difficulty+"%",370,0,500,100,"left");
    this._difficultyspr.bitmap.textColor = ('white');
    this._difficultyspr.bitmap.drawText("Impregnation Chance: ",0,0,500,100,"center");
    this.overallscoretext = new Sprite(new Bitmap(700,100));
    this.addChild(this.overallscoretext);
    this.overallscoretext.x = 430;
    this.overallscoretext.y = 150;
    this.overallscoretext.bitmap.fontSize = 40;
    this.overallscoretext.bitmap.drawText("Overall Chance: "+this.overallscore+" %",0,0,500,100,"center");
    this._bg = new Sprite(ImageManager.loadBitmap("img/pictures/SlotMachine/","Background"));
    this.addChild(this._bg);
    this._slot1 = new Sprite_ItemMoving(ImageManager.loadBitmap("img/pictures/SlotMachine/","Slots"),x,y,textsprites[0])
    
    this.addChild(this._slot1);
    this._slot2 = new Sprite_ItemMoving(ImageManager.loadBitmap("img/pictures/SlotMachine/","Slots"),x+200,y,textsprites[1])
    this.addChild(this._slot2);
    this._slot3 = new Sprite_ItemMoving(ImageManager.loadBitmap("img/pictures/SlotMachine/","Slots"),x+200*2,y,textsprites[2])
    this.addChild(this._slot3);
    
    this._button = new Sprite_ButtonSlotMachine(ImageManager.loadBitmap("img/pictures/SlotMachine/","ClickButton"),x+225,300+y)
    this.addChild(this._button);
    
    
};

Scene_SlotMachine.prototype.videoAnim = function() {
   
};





function Sprite_ItemMoving() {

    this.initialize.apply(this, arguments);

}

Sprite_ItemMoving.prototype = Object.create(Sprite.prototype);
Sprite_ItemMoving.constructor = Sprite_ItemMoving;

Sprite_ItemMoving.prototype.initialize = function (bitmap,x,y,texspr){

    Sprite.prototype.initialize.call(this, bitmap);
    this._yindex = 0;
    this.x = x;
    this.y = y;
    this._result = 0;
    this.textsprite = texspr; 
    this.textsprite.bitmap.fontSize = 40;
    this.textsprite.bitmap.drawText("0 %",0,0,100,100,"center");
    this.textsprite.x = this.x+35;
    this.textsprite.y = this.y+200;
    this.scale.x = this.scale.y = 2;
    this.setFrame(0,90*this._yindex,90,90);
    this._speed = 30;
    this._perc = 0;
    this._time =0// Math.randomInt(300)+200;
}


Sprite_ItemMoving.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if(this._time<=0){
    
    this.setFrame(0, 90*Math.round(this._yindex/90),90,90);
    this.maptofive(this._yindex);
     return;
 }else{
        this._time-=1;
        this.maptofive(this._yindex);
 }
 this.setFrame(0,this._yindex,90,90);
 this._yindex+=  this._speed; 
 
 if(this._yindex>=415){
     this._yindex = 0;
 }
 if(this._time<=0){
    this._result = Math.round(this._yindex/90)+1;
    this.setFrame(0, 90*Math.round(this._yindex/90),90,90);
}

}
Sprite_ItemMoving.prototype.reset = function(){
    this._result = 0;
    this.setFrame(0,90*this._yindex,90,90);
    this._time = Math.randomInt(300)+200;
  
};
Sprite_ItemMoving.prototype.maptofive = function(value){
    // Map the input value to a range between 0 and 1
    console.log(Math.round(value/90),value);
    this.textsprite.bitmap.clear();
    var val = Math.round(value/90);
    var perc = (val/5)*100;
    this._perc = perc;
    this.textsprite.bitmap.drawText(perc+"%",0,0,100,100,"center");
    return val;
    
  }
Sprite_ItemMoving.prototype.result = function(){
   
  if(this._result!=0&&this._time<=0){
    //return this._perc;
    return this._result;
    
  }else{
        return 0;
  }

};

  //-----------------------------------------------------------------------------
// Window_GarbageCount
//
// The window for displaying the party's gold.

function Window_GarbageCount() {
    this.initialize(...arguments);
}

Window_GarbageCount.prototype = Object.create(Window_Selectable.prototype);
Window_GarbageCount.prototype.constructor = Window_GarbageCount;

Window_GarbageCount.prototype.initialize = function(rect) {

    Window_Selectable.prototype.initialize.call(this, rect);
    this.opacity = 255;
    this.refresh();
};

Window_GarbageCount.prototype.colSpacing = function() {
    return 0;
};

Window_GarbageCount.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 65;
    this.drawCurrencyValue(SceneManager._scene._garbagecaught, this.currencyUnit(), x-95, y+20, width,"center");
};

Window_GarbageCount.prototype.value = function() {
    return $gameParty.gold();
};

Window_GarbageCount.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_GarbageCount.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};



function Sprite_ButtonSlotMachine() {

    this.initialize.apply(this, arguments);

}

Sprite_ButtonSlotMachine.prototype = Object.create(Sprite.prototype);
Sprite_ButtonSlotMachine.constructor = Sprite_ButtonSlotMachine;

Sprite_ButtonSlotMachine.prototype.initialize = function (bitmap,x,y){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = x;
    this.y = y;
    this._pressonce = false;
}


Sprite_ButtonSlotMachine.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if(this._pressonce){return;}
 if(TouchInput.x>this.x&&TouchInput.x<this.x+this.width&&TouchInput.y>this.y&&TouchInput.y<this.y+this.height){
    this.scale.x=this.scale.y = 1.05;
    if(TouchInput.isTriggered()){
        this.scale.x=this.scale.y = 1;
        SceneManager._scene.resetslotmachine();
        this._pressonce = true;
        this.x = this.x+1000;
    }

}else{
    this.scale.x=this.scale.y = 1;
    

    }
}

Sprite_ButtonSlotMachine.prototype.result = function(){
   
  return this._result;

};
