
/*=============================================================================
 * Slot Machine Game
 * By Hex - www.fiverr.com/hex_fvx
 * Hex_Card_Matching_Game.js
 * Version: 1.0
 * Free for commercial and non commercial use.
 *=============================================================================*/
 /*:
 * @plugindesc Color matching Game MiniGame.
 *             
 * @author Hex
 *
 * @help Make A colormatchingGame Game
 * 
 * Script call to open Card Matching Game - SceneManager.push(Scene_ColorMatching);
 * 
 * 
 * 
 * 
 * @param TimeVariableID
 * @desc Variable which stores time in frames after which the images  disappear, if you don't set it, it'll be 0
 * @default 18
 * 
 * 
 * @param MiniGameVariableID
 * @desc Variable which stores the value of MiniGame type 4,6,8 wouldn't work if otherwise...
 * @default 17
 * 
 * 
 * 
 * @param ResultSwitchID
 * @desc If this switch is on that means player won otherwise lost the game.
 * @default 40
 * 
 * @param CommonEventID
 * @desc The Commone Event ID which is called at the end of Game.
 * @default 9
 * 
 * 
 * 
 * 
 */

 var Zf = Zf || {};
 Zf.colormatchingGame = {};
 Zf.colormatchingGame.Parameters = PluginManager.parameters('Hex_Card_Matching_Game');

 Zf.colormatchingGame.timerImages = Number(Zf.colormatchingGame.Parameters["TimeBeforeDisappear"]) || 90;
 Zf.colormatchingGame.timerVariableId = Number(Zf.colormatchingGame.Parameters["TimeVariableID"]) || 18;
 Zf.colormatchingGame.miniGameTypeVar = Number(Zf.colormatchingGame.Parameters["MiniGameVariableID"]) || 17;
 Zf.colormatchingGame.swichid = Number(Zf.colormatchingGame.Parameters["ResultSwitchID"]) || 40;
 Zf.colormatchingGame.ceid = Number(Zf.colormatchingGame.Parameters["CommonEventID"]) || 9;
 Zf.colormatchingGame.setupMiniGame = function(goldVar){
    Zf.colormatchingGame.goldVar = goldVar;
    SceneManager.push(Scene_ColorMatching);
 };
function Scene_ColorMatching() {
    this.initialize(...arguments);
}

Scene_ColorMatching.prototype = Object.create(Scene_MenuBase.prototype);
Scene_ColorMatching.prototype.constructor = Scene_ColorMatching;

Scene_ColorMatching.prototype.initialize = function() {
    
    Scene_MenuBase.prototype.initialize.call(this);
    this._playerdecmade = 0;
    this._compsumstart = 0;
    this._compcardselected = 0;
    this._targetScore = $gameSwitches.value(Zf.colormatchingGame.mswitchid)? 31 : 21;
    this._finalrescaluclated = false;
    this._timerToRem= 200;
    AudioManager.playBgm({name: 'Dungeon1', pan: 0, pitch: 100, volume: 60});
    this.makeArray();
        
};
Scene_ColorMatching.prototype.makeArray = function() {

    this._OriginalcolorArray = [1,2,3,4];
    this._currentcap = $gameVariables.value(Zf.colormatchingGame.miniGameTypeVar);
    if(this._currentcap==6)
    {
        this._colorArray = [Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1];
    }else if(this._currentcap==4){
        this._colorArray = [Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1];
    }
    else if(this._currentcap==8){

        this._colorArray = [Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1];

    }
    //this._colorArray = this.shuffleArray(this._colorArray);
    console.log(this._colorArray);
    this._colorSprites = [];

}
Scene_ColorMatching.prototype.resetGame = function() {
    this._confirmbutton._pressonce=false;
    this._OriginalcolorArray = [1,2,3,4];
    this._currentcap = $gameVariables.value(Zf.colormatchingGame.miniGameTypeVar);
    if(this._currentcap==6)
    {
        this._colorArray = [Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1];
    }else if(this._currentcap==4){
        this._colorArray = [Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1];
    }
    else if(this._currentcap==8){

        this._colorArray = [Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1,Math.randomInt(4)+1];

    }

    //this._colorArray = this.shuffleArray(this._colorArray);
    console.log(this._colorArray);
    //this._colorSprites = [];

    console.log(this._colorSprites);
    if(this._currentcap==6)
    {
        // 6 colors
        var width = 227*0.6;
        for (let index = 0; index < this._colorArray.length; index++) {
            
            this._colorSprites[index].bitmap = ImageManager.loadBitmap("img/pictures/ColorMemoGame/","Color_"+this._colorArray[index]);
            this._colorSprites[index].timerReset();
           
            
        }
    }
    else if(this._currentcap==4){
        
        // 4 colors
        var width = 227;
        for (let index = 0; index < this._colorArray.length; index++) {
            
            this._colorSprites[index].bitmap = ImageManager.loadBitmap("img/pictures/ColorMemoGame/","Color_"+this._colorArray[index]);
            this._colorSprites[index].timerReset();
            
        }
    }
    else if(this._currentcap==8){

       // 6 colors
       var width = 227*0.5;
       for (let index = 0; index < this._colorArray.length; index++) {
           
           this._colorSprites[index].bitmap = ImageManager.loadBitmap("img/pictures/ColorMemoGame/","Color_"+this._colorArray[index]);
           this._colorSprites[index].timerReset();
           
           
       }
    }
    
}
Scene_ColorMatching.prototype.helpAreaHeight = function() {
    return 0;
};

Scene_ColorMatching.prototype.create = function() {
    
    Scene_MenuBase.prototype.create.call(this);
    
    this.createWindowLayer();
    this.createBackgroundSprite();
    this.createforegroundsprites();
    

   
    


};



Scene_ColorMatching.prototype.update = function() {
    
    Scene_MenuBase.prototype.update.call(this);
    
    
};
Scene_ColorMatching.prototype.computercardscalculator = function() {

    
        
}


Scene_ColorMatching.prototype.calresult = function() {
    
   
};


Scene_ColorMatching.prototype.confirmedfromplayer = function() {
   
    var makefinalArray = [];
    var flag = true;
    for (let index = 0; index < this._colorSprites.length; index++) {
        makefinalArray[index] = this._colorSprites[index].currentIndex();
        if(makefinalArray[index]!=this._colorArray[index]){
            flag =false;
            $gameSwitches.setValue(Zf.colormatchingGame.swichid, false)
        }
    }
    console.log(makefinalArray,this._colorArray,flag)
    if(flag){
        $gameSwitches.setValue(Zf.colormatchingGame.swichid, true);
        if(this._currentcap==4){

            this._scorewindow._score+=10;
        }else if(this._currentcap==6)
        {
            this._scorewindow._score+=25;
        }
        else if(this._currentcap==8)
        {
            this._scorewindow._score+=40;
        }
        this._helpwindowe.setText("Good job!!");
        this._helpwindowe.correctseq = true;
        this._helpwindowe.refresh();
        AudioManager.playSe({name: 'Equip1', pan: 0, pitch: 100, volume: 50});
        this._scorewindow.refresh();
    }else{
        //this._helpwindowe.setText("Try Again🤭");
        this._helpwindowe.refresh();
        AudioManager.playSe({name: 'Buzzer1', pan: 0, pitch: 100, volume: 50});
    }
   // $gameTemp.reserveCommonEvent(Zf.colormatchingGame.ceid);
    this.resetGame();
    //SceneManager.pop();
};

Scene_ColorMatching.prototype.addCardinPlayerStack = function(cid) {
    
    
    
};
Scene_ColorMatching.prototype.addCardinComputerStack = function(cid) {
    
    
    //this._playerscorewin.reshuffle(totalsum);
    
};





Scene_ColorMatching.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    //this._statusWindow.refresh();
};


Scene_ColorMatching.prototype.resetcolormatchingGame = function() {

    
    
   
};

Scene_ColorMatching.prototype.createforegroundsprites = function(){
    var xpos = 250;
    const widthinit = 240
    if(this._currentcap==6)
    {
        // 6 colors
        var width = widthinit*0.5;
        
        this.addChild(new Window_Base(new Rectangle(250,210,725,190)));
        for (let index = 0; index < this._colorArray.length; index++) {
            
            this._colorSprites[index] = new Sprite_ColorCards(ImageManager.loadBitmap("img/pictures/ColorMemoGame/","Color_"+this._colorArray[index]),xpos+width*index,204,this._colorArray[index],0.5*1)
            
            this.addChild(this._colorSprites[index]);
            
        }
    }
    else if(this._currentcap==4){
        
        // 4 colors
        var width = widthinit*0.7;
        this.addChild(new Window_Base(new Rectangle(245,175,678,240)))
        for (let index = 0; index < this._colorArray.length; index++) {
            
            this._colorSprites[index] = new Sprite_ColorCards(ImageManager.loadBitmap("img/pictures/ColorMemoGame/","Color_"+this._colorArray[index]),xpos+width*index,150,this._colorArray[index],0.7*1)
            
            this.addChild(this._colorSprites[index]);
            
        }
        this._confirmbutton.x = 515;
        this._confirmbutton.y = 475;
        
    }
    else if(this._currentcap==8){

       // 6 colors
       var width = widthinit*0.5*0.7;
       for (let index = 0; index < this._colorArray.length; index++) {
           
           this._colorSprites[index] = new Sprite_ColorCards(ImageManager.loadBitmap("img/pictures/ColorMemoGame/","Color_"+this._colorArray[index]),xpos+width*index,224,this._colorArray[index],0.7*1)
           
           this.addChild(this._colorSprites[index]);
           
       }
       this._confirmbutton.x = 455;
       this._confirmbutton.y = 410;
    }
    // // 4 colors
    // var width = 170;
    // for (let index = 0; index < this._colorArray.length; index++) {
        
    //     this._colorSprites[index] = new Sprite_ColorCards(ImageManager.loadBitmap("img/pictures/ColorMemoGame/","Color_"+this._colorArray[index]),75+width*index,175,this._colorArray[index])
    //     this.addChild(this._colorSprites[index]);
        
    // }
    
    this._mageImage = new Sprite_MagePortrait(ImageManager.loadBitmap("img/pictures/CharacterBusts/","Mage_2"));
    this.addChild(this._mageImage);
}



Scene_ColorMatching.prototype.createBackgroundSprite = function() {
    
    
    this._bg = new Sprite(ImageManager.loadBitmap("img/pictures/ColorMemoGame/","Background"));
    //this.addChild(this._bg);
    
    this._helpwindowe = new Window_CakeLayerNames(new Rectangle(410,645,395,75),"Remember The Sequence")//SceneManager._scene.addChild()
    this.addChild(this._helpwindowe);
    this._helpwindowe.refresh();
    
    this._timeLeft = 59;
    if(this._currentcap==4){
        this._timerwindow = new Window_timerColorRememberingMiniGame(new Rectangle(445,100,330,75));//100y - 4 cards
        this.addChild(this._timerwindow);
        this._scorewindow = new Window_ScoreCounterColorRemembering(new Rectangle(515,415,200,60));//415y -  4 cards
        this.addChild(this._scorewindow);
    }else{
        this._timerwindow = new Window_timerColorRememberingMiniGame(new Rectangle(445,135,330,75));//100y - 4 cards
        this.addChild(this._timerwindow);
        this._scorewindow = new Window_ScoreCounterColorRemembering(new Rectangle(515,400,200,60));//415y -  4 cards
        this.addChild(this._scorewindow);
    }
    this.addChild(new Window_Base(new Rectangle(this._scorewindow.x,this._scorewindow.y+this._scorewindow.height,200,60)))
    this._confirmbutton = new Sprite_ColorRemembringConfirm(ImageManager.loadBitmap("img/pictures/ColorMemoGame/","ClickButton"),this._scorewindow.x,this._scorewindow.y+this._scorewindow.height,this._currentcap)
    this.addChild(this._confirmbutton);
    

    
  
};

Scene_ColorMatching.prototype.shuffleArray = function(array) {
   
    
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
        
      
      
      // Used like so
      var arr = [2, 11, 37, 42];
      shuffle(arr);
      console.log(arr);
};

//-----------------------------------------------------------------------------
// Window_timerColorRememberingMiniGame
//
// The window for displaying the party's gold.

function Window_timerColorRememberingMiniGame() {
    this.initialize(...arguments);
}

Window_timerColorRememberingMiniGame.prototype = Object.create(Window_Selectable.prototype);
Window_timerColorRememberingMiniGame.prototype.constructor = Window_timerColorRememberingMiniGame;

Window_timerColorRememberingMiniGame.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._timeremaining = 59;
    this.refresh();
   // this.opacity = 0;
    this.framecounter = 60;
    //setTimeout(this.refresh,100);
    
};
Window_timerColorRememberingMiniGame.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if(this._timeremaining<=0){
        $gameVariables.setValue(Zf.colormatchingGame.goldVar,$gameVariables.value(Zf.colormatchingGame.goldVar)-this.parent._scorewindow._score);
        $gameVariables.setValue(171,this.parent._scorewindow._score)
        SceneManager.pop();
        return;
    }
    if(this.framecounter<=0){
        this.framecounter=60;
        this._timeremaining-=1;
        this.refresh();

    }else{
        this.framecounter-=1;
    }
};

Window_timerColorRememberingMiniGame.prototype.colSpacing = function() {
    return 0;
};

Window_timerColorRememberingMiniGame.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 28;
    this.drawText("Time Remaining 00:"+this._timeremaining, x, y, width);
};

Window_timerColorRememberingMiniGame.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};

//-----------------------------------------------------------------------------
// Window_ScoreCounterColorRemembering
//
// The window for displaying the party's gold.

function Window_ScoreCounterColorRemembering() {
    this.initialize(...arguments);
}

Window_ScoreCounterColorRemembering.prototype = Object.create(Window_Selectable.prototype);
Window_ScoreCounterColorRemembering.prototype.constructor = Window_ScoreCounterColorRemembering;

Window_ScoreCounterColorRemembering.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._score = 0;
    this.refresh();
  //  this.opacity = 0;
    
};

Window_ScoreCounterColorRemembering.prototype.colSpacing = function() {
    return 0;
};

Window_ScoreCounterColorRemembering.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 24;
    this.drawText("Score : "+this._score, x, y-7, width,"center");
};

Window_ScoreCounterColorRemembering.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};




function Sprite_ColorCards() {

    this.initialize.apply(this, arguments);

}

Sprite_ColorCards.prototype = Object.create(Sprite.prototype);
Sprite_ColorCards.constructor = Sprite_ColorCards;

Sprite_ColorCards.prototype.initialize = function (bitmap,x,y,v,s){

    Sprite.prototype.initialize.call(this, bitmap);
    this._startscale = this.scale.x =this.scale.y = s;
    console.log(this._startscale);
    this._yindex = 0;
    this.x = x;
    this.y = y;
    this._value = v;
    this.canBeTouched = false;
    this._timer = $gameVariables.value(Zf.colormatchingGame.timerVariableId);
    this._currentColorIndex = 1;
    
}
Sprite_ColorCards.prototype.timerReset = function(){
    this._currentColorIndex = 1;
    this.canBeTouched = false;
    if(this.parent._helpwindowe.correctseq){
        this.parent._helpwindowe.setText("Great job!!");
        this.parent._helpwindowe.refresh();
    }
    this._timer = $gameVariables.value(Zf.colormatchingGame.timerVariableId);//Zf.colormatchingGame.timerImages;
    
}

Sprite_ColorCards.prototype.update = function(){

 Sprite.prototype.update.call(this);
 
    if(this._timer>0){
        this._timer-=1;
        if(this._timer<=1){
            this.disableSprites();
            this.canBeTouched = true;
            this.parent._helpwindowe.setText("Click the Cards to Match");
            this.parent._helpwindowe.refresh();
            console.log("llskl")
        }
        return;

    }

    if(this.canBeTouched){

        if(TouchInput.x>this.x&&TouchInput.x<this.x+this.width*this._startscale&&TouchInput.y>this.y&&TouchInput.y<this.y+this.height*this._startscale){
            this.scale.x=this.scale.y = this._startscale+0.01;
            if(TouchInput.isTriggered()){
                this.scale.x=this.scale.y = this._startscale;
                AudioManager.playSe({name: 'Switch1', pan: 0, pitch: 100, volume: 50});
                this.bitmap = ImageManager.loadBitmap("img/pictures/ColorMemoGame/","Color_"+this._currentColorIndex);
                console.log(this._currentColorIndex);
                this._currentColorIndex++;
                if(this._currentColorIndex>4){
                    this._currentColorIndex = 1;
                }
                
            }
        
        }else{
            this.scale.x=this.scale.y = this._startscale;
            
        
            }



    }
    
    


}

Sprite_ColorCards.prototype.disableSprites = function(){
    
    this.bitmap = ImageManager.loadBitmap("img/pictures/ColorMemoGame/","Card_hidden");

};

Sprite_ColorCards.prototype.currentIndex = function(){
    var index  = this._currentColorIndex-1;
    if(index==0){
        index =4;
    }
    return index;

};





function Sprite_ColorRemembringConfirm() {

    this.initialize.apply(this, arguments);

}

Sprite_ColorRemembringConfirm.prototype = Object.create(Sprite.prototype);
Sprite_ColorRemembringConfirm.constructor = Sprite_ColorRemembringConfirm;

Sprite_ColorRemembringConfirm.prototype.initialize = function (bitmap,x,y){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = 515;
    this.y = 460;
    this._pressonce = false;
    if(this._currentcap==4){
        this.x = 515;
        this.y = 475;
    }
}


Sprite_ColorRemembringConfirm.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if(this._pressonce||!this.parent._colorSprites[1].canBeTouched){return;}
 if(TouchInput.x>this.x&&TouchInput.x<this.x+this.width&&TouchInput.y>this.y&&TouchInput.y<this.y+this.height){
    this.scale.x=this.scale.y = 1.05;
    if(TouchInput.isTriggered()){
        this.scale.x=this.scale.y = 1;
        AudioManager.playSe({name: 'Decision3', pan: 0, pitch: 100, volume: 60});
        SceneManager._scene.confirmedfromplayer();
       // this._pressonce = true;
        
    }

}else{
    this.scale.x=this.scale.y = 1;
    

    }
}
Sprite_ColorRemembringConfirm.prototype.resetConfirmButton = function(){

    this._pressonce = false;
}
Sprite_ColorRemembringConfirm.prototype.result = function(){
   
  return this._result;

};





function Sprite_MagePortrait() {

    this.initialize.apply(this, arguments);

}

Sprite_MagePortrait.prototype = Object.create(Sprite.prototype);
Sprite_MagePortrait.constructor = Sprite_MagePortrait;

Sprite_MagePortrait.prototype.initialize = function (bitmap,dimW,dimH){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = 800;
    this.y = 110;
    this.scale.x = this.scale.y = 2;
    this.animspeed = 30;
    this._animtimer = this.animspeed;
    this.goingdown = true;
    this.fadingout = false;
    this.fadingin = false;
    this._currentExp = 1;
    
}
Sprite_MagePortrait.prototype.ChangeExpression = function(exp){

    this.fadingout=true;
    this._currentExp=exp;
 

}

Sprite_MagePortrait.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if($gameMap.mapId()==12){
    this.opacity=0;
    return;
 }
 if(this.fadingout){
    this.opacity-=10;
    this.x-=10;
    if(this.opacity==55){
        this.bitmap = ImageManager.loadBitmap("img/pictures/","MCMainPortraitClothed"+this._currentExp)
        this.fadingin=true;
        this.fadingout=false;
        return;
    }
 }
 if(this.fadingin){
    this.opacity+=10;
    this.x+=10;
    console.log(this.opacity)
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
