/*=============================================================================
 * Slot Machine Game
 * By Hex - www.fiverr.com/hex_fvx
 * Hex_CakeMakerMiniGame.js
 * Version: 1.0
 * Free for commercial and non commercial use.
 *=============================================================================*/
 /*:
 * @plugindesc CakeMakerMiniGame
 *             
 * @author Hex
 *
 * @help Make A CakeMakerMiniGame Game
 * 
 * Script call to run the miniGame - SceneManager.push(Scene_CakeMinigame)
 * 
 * 
 * 
 * @param ScoreVariable
 * @desc For Collecting score from the game
 * @default 81
 * 
 * @param CommonEventID
 * @desc The Commone Event ID which is called at the end of Game.
 * @default 76
 * 
 * 
 * 
 */
 var Zf = Zf || {};
 Zf.CakeMakerMiniGame = {};
 Zf.CakeMakerMiniGame.Parameters = PluginManager.parameters('CakeMakerMiniGame');
 Zf.CakeMakerMiniGame.seconds = 30;
 Zf.CakeMakerMiniGame.varID = Number(Zf.CakeMakerMiniGame.Parameters["ScoreVariable"]) || 81;

 Zf.CakeMakerMiniGame.CommonEventID = Number(Zf.CakeMakerMiniGame.Parameters["CommonEventID"]) || 76;

function Scene_CakeMinigame() {
    this.initialize(...arguments);
}

Scene_CakeMinigame.prototype = Object.create(Scene_MenuBase.prototype);
Scene_CakeMinigame.prototype.constructor = Scene_CakeMinigame;

Scene_CakeMinigame.prototype.initialize = function() {
    
    Scene_MenuBase.prototype.initialize.call(this);
    this._cakelayers = [1,1,1];
    this._currentVideoindex = 0
    this._binSpeed = 12;
    this._garbagecaught = 0
    this.createGameRectangle();
    this._seconds = Zf.CakeMakerMiniGame.seconds;
    this._stamina = 310;
    this._timercount = 60;
    AudioManager.playBgm({name: 'Dungeon1', pan: 0, pitch: 100, volume: 60});
    this._operandlist = ["+","*","-"]
    this._operator = "+";
    this._operand1 = 0;
    this._operand2 = 0;
    this._score = 0;
    this._waitforinput = 30;
    
    
    this._nextquestiontime = 200;
         
};
Scene_CakeMinigame.prototype. createGameRectangle = function() {
    this._gamerect = new Rectangle(20,0,1100,480);
    
}
Scene_CakeMinigame.prototype.helpAreaHeight = function() {
    return 0;
};

Scene_CakeMinigame.prototype.create = function() {
    
    Scene_MenuBase.prototype.create.call(this);
    this._timergarb = new Timer_CakeGame(new Rectangle(202,480,320,70));
    
    this._cakerandomizer = new Window_FinalCakesRandomizer(new Rectangle(0,0,250,100))
    this.createBackgroundSprite();
    this.createforegroundsprites();
    this.addChild(this._cakerandomizer);
    this.addChild(this._timergarb);
    this.createGameWindows();
    this.createWindowLayer();
    this._baker = new Sprite_Baker(ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","Bakery_1"));
    
    this.addChild(this._baker);
    


};
Scene_CakeMinigame.prototype.createGameWindows = function() {
    const rect = this.choicewindowdim();
    rect.x+=10;
    this._creamselectwindow = new Window_Cakedecorchoices(rect,"cake");
    var rect2 = rect;
    rect2.x +=150;
    this._layerselectwindow = new Window_Cakedecorchoices(rect2,"layer");
    var rect3 = rect2;
    rect3.x +=150;
    
    this._toppinselectwin = new Window_Cakedecorchoices(rect3,"topping");
    
    //this._timereachquestion = new Window_each_cakeTimer(new Rectangle(0,0,200,90));
    this._scorewindow = new Window_ScoreCalculation(new Rectangle(202,81,200,70));
    this.addChild(this._creamselectwindow);
    this.addChild(this._layerselectwindow);
    this.addChild(this._toppinselectwin);
    //this.addChild(this._timereachquestion);
    this.addChild(this._scorewindow);
    this._toppinselectwin.deselect();
    this._toppinselectwin.deactivate();
    this._layerselectwindow.deselect();
    this._layerselectwindow.deactivate();
    this._layerselectwindow.bgspr.opacity = 255;
    this._toppinselectwin.bgspr.opacity = 255
};

Scene_CakeMinigame.prototype.choicewindowdim = function() {
    const ww = 245;
    const wh = 795;
    const wx =  0;
    const wy = 96;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_CakeMinigame.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    $gameScreen.startFadeIn(40);
};
Scene_CakeMinigame.prototype.update = function() {
    
    Scene_MenuBase.prototype.update.call(this);
    if(this._seconds<=0)
    {
        $gameVariables.setValue(Zf.CakeMakerMiniGame.varID, this._score);
       // $gameTemp.reserveCommonEvent(Zf.CakeMakerMiniGame.CommonEventID);
        SceneManager.pop();
        //this._creamselectwindow.deactivate();
     return;
    }
    if(this._nextquestiontime<=0){
       // this.nextquestion();
        this._nextquestiontime=200;
        
    }else{
        this._nextquestiontime-=1;
        //this._timereachquestion.refresh();
    }
     if(this._timercount<=0)
     {   this._seconds-=1;
         this._timergarb.refresh();
         this._timercount = 60;
     }
     else{
         this._timercount-=1;
     }
    if(this._waitforinput>0)
    {
        this._waitforinput-=1;
    }
    if( Input.isTriggered("cancel")){
        //$gameVariables.setValue(Zf.CakeMakerMiniGame.varID, this._score);
        //$gameTemp.reserveCommonEvent(Zf.CakeMakerMiniGame.CommonEventID);
        //SceneManager.pop();
    }
    this.setbgspr();
};

Scene_CakeMinigame.prototype.evalcakecommand = function() {
    this._layerselectwindow.activate();    
    this._toppinselectwin.deselect();
    this._toppinselectwin.deactivate();
    this._creamselectwindow.deselect();
    this._creamselectwindow.deactivate();
    this._cake.bitmap = ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","cake"+(this._cakelayers[0]+1));
    this._cake.canmove = true;
    if(this._creamselectwindow.index()==-1){
        this._creamselectwindow.bgspr.opacity = 0
    }else{
        this._creamselectwindow.bgspr.opacity = 255
    }
    if(this._toppinselectwin.index()==-1){
        this._toppinselectwin.bgspr.opacity = 0
    }else{
        this._toppinselectwin.bgspr.opacity = 255
    }
    this._layerselectwindow.bgspr.opacity = 255
    this._layerselectwindow.select(0);
    this._layerselectwindow._updateCursor();
    
    
}

Scene_CakeMinigame.prototype.evallayercommand = function() {
    this._layerselectwindow.deselect();
    this._layerselectwindow.deactivate();
    this._toppinselectwin.activate();
    this._creamselectwindow.deselect();
    this._creamselectwindow.deactivate();
    this._cake.canmove = true;
    this._cake.makelayer((this._cakelayers[1]+1));
    if(this._layerselectwindow.index()==-1){
        this._layerselectwindow.bgspr.opacity = 0
    }else{
        this._layerselectwindow.bgspr.opacity = 255
    }
    if(this._creamselectwindow.index()==-1){
        this._creamselectwindow.bgspr.opacity = 0
    }else{
       this._creamselectwindow.bgspr.opacity = 255
    }
    this._toppinselectwin.bgspr.opacity = 255
    this._toppinselectwin.select(0);
    this._toppinselectwin._updateCursor();
}

Scene_CakeMinigame.prototype.evaltoppingcommand = function() {
    this._toppinselectwin.deselect();
    this._toppinselectwin.deactivate();
    this._layerselectwindow.deselect();
    this._layerselectwindow.deactivate();
    this._creamselectwindow.activate();
    this._cake.maketopping((this._cakelayers[2]+1));
    this._cake.canmove = true;
    this._cake.resevaluate();
    
    if(this._layerselectwindow.index()==-1){
        this._layerselectwindow.bgspr.opacity = 0
    }else{
        this._layerselectwindow.bgspr.opacity = 255
    }
    if(this._toppinselectwin.index()==-1){
        this._toppinselectwin.bgspr.opacity = 0
    }else{
        this._toppinselectwin.bgspr.opacity = 255
    }
    this._creamselectwindow.bgspr.opacity = 255;
    this._creamselectwindow.select(0);
    this._creamselectwindow._updateCursor();
}
Scene_CakeMinigame.prototype.setbgspr = function() {
    
    

};




Scene_CakeMinigame.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    //this._creamselectwindow.refresh();
};


Scene_CakeMinigame.prototype.makechatbutton = function() {
    
   
};

Scene_CakeMinigame.prototype.createforegroundsprites = function(){
    this._cake = new Sprite_Cakeontrays();
    this.addChild(this._cake)
    
}
Scene_CakeMinigame.prototype.createBackgroundSprite = function() {
    

     //new Sprite(ImageManager.loadBitmap("img/pictures/RoadRashGame/","Roadstraight0001"));
     this._cakemakebg = new Sprite(ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","Cakebackground"));
     this._schoolgirl = new Sprite(ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","cakegirl"));
     
     this._bgcalc = new Sprite(ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","Book"));
     this._bgcalc.x = (Graphics.width)/2 -300;
     this._bgcalc.y = (Graphics.height)/2 -300;
     //this._bgcalc.y = (Graphics.height-this._bgcalc.height)/2;
    this._schoolgirl.x+=400;
   // this._bgcalc.y = Graphics.height/2;
   this.addChild(this._cakemakebg); 
   this._randomizerWindow = new Window_Base(new Rectangle(33,9,168,140));
     this.addChild(this._randomizerWindow);
     for (let index = 0; index < 3; index++) {
        this.addChild(new Window_Base(new Rectangle(15,460+88*index,165,88)))    
    }
    for (let index = 0; index < 3; index++) {
        this.addChild(new Window_Base(new Rectangle(180,460+88*index,130,88)))    
    }
    for (let index = 0; index < 3; index++) {
        this.addChild(new Window_Base(new Rectangle(310,460+88*index,165,88)))    
    }
    //this.addChild(this._cakemakebg); 
    this._BreadName = new Window_CakeLayerNames(new Rectangle(15,406,165,54),"Bread");
    this._BreadName.refresh();
    this.addChild(this._BreadName);
    this._CreamName = new Window_CakeLayerNames(new Rectangle(180,406,130,54),"Cream");
    this._CreamName.refresh();
    this.addChild(this._CreamName);
    this._ToppingName = new Window_CakeLayerNames(new Rectangle(310,406,165,54),"Topping");
    this._ToppingName.refresh();
    this.addChild(this._ToppingName);

   //this.addChild(this._schoolgirl); 
  // this.addChild(this._bgcalc);

    

    

    
};

Scene_CakeMinigame.prototype.videoAnim = function() {
    if(this._currentVideoindex<10)
    {
        this._animsprite.bitmap = ImageManager.loadBitmap("img/pictures/Vana_FullHP/","ezgif-frame-00"+this._currentVideoindex);
    }else if(this._currentVideoindex<99){
        this._animsprite.bitmap = ImageManager.loadBitmap("img/pictures/Vana_FullHP/","ezgif-frame-0"+this._currentVideoindex);
    

    }else{
        this._animsprite.bitmap = ImageManager.loadBitmap("img/pictures/Vana_FullHP/","ezgif-frame-"+this._currentVideoindex);

    }

    this._currentVideoindex+=1
    if(this._currentVideoindex>47)
    {
        this._currentVideoindex = 0
    }
};
//-----------------------------------------------------------------------------
// Timer_CakeGame
//
// The sprite for displaying the timer.

function Timer_CakeGame() {
    this.initialize(...arguments);
}

Timer_CakeGame.prototype = Object.create(Window_Selectable.prototype);
Timer_CakeGame.prototype.constructor = Timer_CakeGame;

Timer_CakeGame.prototype.initialize = function(rect) {
    //rect.x = (Graphics.width - 50) / 2;
    rect.x = Graphics.width/2-120;
    //rect.x = Graphics.width/2-50;
    rect.y = 0;
    Window_Selectable.prototype.initialize.call(this, rect);
    this.opacity = 255;
    //this.backOpacity = 255;
    this.y = 10;
    this.x = 202;
    this.refresh();
    
};

Timer_CakeGame.prototype.colSpacing = function() {
    return 0;
};

Timer_CakeGame.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    this.contents.fontSize = 34;
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.drawText("Time Remaining - 0:"+SceneManager._scene._seconds, x, y, width,"center");
    
};

Timer_CakeGame.prototype.value = function() {
    return $gameParty.gold();
};

Timer_CakeGame.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Timer_CakeGame.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};


function Window_Cakeonroller() {
    this.initialize(...arguments);
}

Window_Cakeonroller.prototype = Object.create(Window_Selectable.prototype);
Window_Cakeonroller.prototype.constructor = Window_Cakeonroller;

Window_Cakeonroller.prototype.initialize = function(rect) {

    Window_Selectable.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this.layer = new Sprite(ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","layer1"))
    this.topping =  new Sprite(ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","topping1"))
    this.cake = new Sprite(ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","cake1"))
    //this.x = 370;
    this.y = 200;
    this.refresh();
    
};

Window_Cakeonroller.prototype.colSpacing = function() {
    return 0;
};

Window_Cakeonroller.prototype.refresh = function() {
    this._opr1 = SceneManager._scene._operand1;
    this._opr2 = SceneManager._scene._operand2;
    this._ope = SceneManager._scene._operator;
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 65;
    //var spr = new Sprite(ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","Schoolgirl"))
    this.addChild(this.cake);
    this.addChild(this.layer);
    this.addChild(this.topping);
    
    
    //this.drawText(""+this._opr1+this._ope+this._opr2, x, y+20, width,"center");
};


Window_Cakeonroller.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_Cakeonroller.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};



  //-----------------------------------------------------------------------------
// Window_FinalCakesRandomizer
//
// The window for displaying the party's gold.

function Window_FinalCakesRandomizer() {
    this.initialize(...arguments);
}

Window_FinalCakesRandomizer.prototype = Object.create(Window_Selectable.prototype);
Window_FinalCakesRandomizer.prototype.constructor = Window_FinalCakesRandomizer;

Window_FinalCakesRandomizer.prototype.initialize = function(rect) {

    Window_Selectable.prototype.initialize.call(this, rect);
    this.layerarr = new Array(3);
    this.opacity = 0;
    this.layer = new Sprite(ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","layer1"))
    this.topping =  new Sprite(ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","topping1"))
    this.cake = new Sprite(ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","cake1"))
    this.x = 45;
    this.y = 40;
    this.scale.x = this.scale.y = 2;
    this.refresh();
    this.addChild(this.cake);
    this.addChild(this.layer);
    this.addChild(this.topping);
    
    
    
};

Window_FinalCakesRandomizer.prototype.colSpacing = function() {
    return 0;
};

Window_FinalCakesRandomizer.prototype.refresh = function() {
    this._opr1 = SceneManager._scene._operand1;
    this._opr2 = SceneManager._scene._operand2;
    this._ope = SceneManager._scene._operator;
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 65;
    this.layerarr[0] =  Math.round(Math.random() * (3 - 1) + 1);
    this.layerarr[1] =  Math.round(Math.random() * (3 - 1) + 1);
    this.layerarr[2] =  Math.round(Math.random() * (3 - 1) + 1);
    console.log(this.layerarr);
    this.layer.bitmap = ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","layer"+this.layerarr[1]);
    this.topping.bitmap =  ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","topping"+this.layerarr[2]);
    this.cake.bitmap =ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","cake"+this.layerarr[0]);
    //var spr = new Sprite(ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","Schoolgirl"))
  
    
    //this.drawText(""+this._opr1+this._ope+this._opr2, x, y+20, width,"center");
};


Window_FinalCakesRandomizer.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_FinalCakesRandomizer.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};




//-----------------------------------------------------------------------------
// Window_Cakedecorchoices
//
// The window for selecting a command on the menu screen.

function Window_Cakedecorchoices() {
    this.initialize(...arguments);
}

Window_Cakedecorchoices.prototype = Object.create(Window_Command.prototype);
Window_Cakedecorchoices.prototype.constructor = Window_Cakedecorchoices;

Window_Cakedecorchoices.prototype.initialize = function(rect,listtype) {
    this._choices = [0,0,0,0];
    rect.width=130;
    this.listtype = listtype;
    this.sprarray = [new Sprite(),new Sprite(),new Sprite()];
    this.bgspr = new Sprite(ImageManager.loadBitmap("img/pictures/Cakemakerminigame/",""+this.listtype+(1)));
    this.bgspr.scale.x = this.bgspr.scale.y = 2;
    Window_Command.prototype.initialize.call(this, rect);
    this.selectLast();
    this._canRepeat = false;
    this.opacity = 0;
    this.changePaintOpacity(0);
    this.backOpacity = 0; 
    this.updateBackOpacity(0);
    this.y = 430;
    if(listtype=="topping")
    {
        this.y+=25;
    }
    this._res = 0;
    this.addChild(this.bgspr);

    
};

Window_Cakedecorchoices.prototype.drawItemBackground = function(index) {
    return;
    const rect = this.itemRect(index);
    this.drawBackgroundRect(rect);
};

Window_Cakedecorchoices._lastCommandSymbol = null;

Window_Cakedecorchoices.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};

Window_Cakedecorchoices.prototype.makeCommandList = function() {
    this.calculatechoices();
    this.addMainCommands();
    // this.addFormationCommand();
    // this.addOriginalCommands();
    // this.addOptionsCommand();
    // this.addSaveCommand();
    // this.addGameEndCommand();
};
Window_Cakedecorchoices.prototype._updateCursor = function() {
    //this._cursorSprite.alpha = this._makeCursorAlpha();
    
    this._cursorSprite.visible = false;
    this._cursorSprite.x = this._cursorRect.x;
    this.bgspr.x = this._cursorSprite.x+10;
    this._cursorSprite.y = this._cursorRect.y;
    this.bgspr.y = this._cursorSprite.y+22;
    this.bgspr.setColorTone([30,30,30,30]);
    this.bgspr.bitmap = ImageManager.loadBitmap("img/pictures/Cakemakerminigame/",""+this.listtype+(this.index()+1));
};
Window_Cakedecorchoices.prototype.itemHeight = function() {
    return 50+this.lineHeight();
};
Window_Cakedecorchoices.prototype.calculatechoices = function() {
    
    //Math.round(Math.random() * (9 - 1) + 1)
};
Window_Cakedecorchoices.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(0);
    this.sprarray[index].bitmap = ImageManager.loadBitmap("img/pictures/Cakemakerminigame/",""+this.listtype+(index+1));
    this.sprarray[index].scale.x =this.sprarray[index].scale.y =  2;
    this.sprarray[index].x = rect.x;
    this.sprarray[index].y = rect.y+index*this.itemHeight();
    this.addChild(this.sprarray[index])
    //this.drawText("SSS",rect.x,rect.y+index*this.itemHeight(),rect.width,rect.height);
    
};
Window_Cakedecorchoices.prototype.addMainCommands = function() {
    const enabled = this.areMainCommandsEnabled();
    
        this.addCommand(""+this._choices[0], this._choices[0], enabled);
        this.addCommand(""+this._choices[1], this._choices[1], enabled);
        this.addCommand(""+this._choices[2], this._choices[2], enabled);
        this.addCommand(""+this._choices[3], this._choices[3], enabled);
    
};
Window_Cakedecorchoices.prototype.maxItems = function() {
    return 3;
};
Window_Cakedecorchoices.prototype.areMainCommandsEnabled = function() {
    return $gameParty.exists();
};

Window_Cakedecorchoices.prototype.isFormationEnabled = function() {
    return $gameParty.size() >= 2 && $gameSystem.isFormationEnabled();
};

Window_Cakedecorchoices.prototype.isOptionsEnabled = function() {
    return true;
};

Window_Cakedecorchoices.prototype.isSaveEnabled = function() {
    return !DataManager.isEventTest() && $gameSystem.isSaveEnabled();
};

Window_Cakedecorchoices.prototype.isGameEndEnabled = function() {
    return true;
};

Window_Cakedecorchoices.prototype.processOk = function() {
    Window_Cakedecorchoices._lastCommandSymbol = this.currentSymbol();
    if(SceneManager._scene._waitforinput>1)
    {
        return;
    }
    AudioManager.playSe({name: 'Cursor1', pan: 0, pitch: 100, volume: 100});
    if(this.listtype=="cake")
    {
        SceneManager._scene._cakelayers[0] = this.index();//currentSymbol();
        SceneManager._scene.evalcakecommand();
        console.log("Caked");
        SceneManager._scene._waitforinput = 30;
        
    }
    if(this.listtype=="layer")
    {
        SceneManager._scene._cakelayers[1] = this.index();
        SceneManager._scene.evallayercommand();
        console.log("Layered    ");
        SceneManager._scene._waitforinput = 30;
    }
    if(this.listtype=="topping")
    {
        SceneManager._scene._cakelayers[2] = this.index();
        SceneManager._scene.evaltoppingcommand();
        console.log("Topped");
        SceneManager._scene._waitforinput = 30;
    }
    //Window_Command.prototype.processOk.call(this);
};

Window_Cakedecorchoices.prototype.selectLast = function() {
    this.selectSymbol(Window_Cakedecorchoices._lastCommandSymbol);
};



//-----------------------------------------------------------------------------
// Window_each_cakeTimer
//
// The window for displaying the party's gold.

function Window_each_cakeTimer() {
    this.initialize(...arguments);
}

Window_each_cakeTimer.prototype = Object.create(Window_Selectable.prototype);
Window_each_cakeTimer.prototype.constructor = Window_each_cakeTimer;

Window_each_cakeTimer.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
    this.opacity =255;
    this._timerpoints = SceneManager._scene._nextquestiontime%5;
    this.x = 400;
    this.y = 347;
};

Window_each_cakeTimer.prototype.colSpacing = function() {
    return 0;
};

Window_each_cakeTimer.prototype.refresh = function() {
    return;
    const rect = this.itemLineRect(0);
    this._timerpoints = Math.round(SceneManager._scene._nextquestiontime/40);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    for (let index = 0; index < 5; index++) {
        if(this._timerpoints>index)
        {this.drawText("♦", index*4*x, y, width);}
        else{
            this.drawText("♢", index*4*x, y, width);
        }
    }
    
};

Window_each_cakeTimer.prototype.value = function() {
    return $gameParty.gold();
};

Window_each_cakeTimer.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_each_cakeTimer.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};
function Window_ScoreCalculation() {
    this.initialize(...arguments);
}

Window_ScoreCalculation.prototype = Object.create(Window_Selectable.prototype);
Window_ScoreCalculation.prototype.constructor = Window_ScoreCalculation;

Window_ScoreCalculation.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
    this.opacity =255;
    this._gamepoints = 0;
};

Window_ScoreCalculation.prototype.colSpacing = function() {
    return 0;
};

Window_ScoreCalculation.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    //this._timerpoints = Math.round(SceneManager._scene._nextquestiontime/40);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this._gamepoints = SceneManager._scene._score;
    this.drawText("Cakes Baked : "+ this._gamepoints,x, y, width);
    
    
};

Window_ScoreCalculation.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};



function Sprite_Cakeontrays() {

    this.initialize.apply(this, arguments);

}

Sprite_Cakeontrays.prototype = Object.create(Sprite.prototype);
Sprite_Cakeontrays.constructor = Sprite_Cakeontrays;

Sprite_Cakeontrays.prototype.initialize = function (bitmap){

    Sprite.prototype.initialize.call(this, bitmap);
    this.cakelayers = SceneManager._scene._cakelayers; 
    this.trailspeed = 8;
    this.waittimer = SceneManager._scene._cakelayers;
    this._dist = 0;
    this.x-=230;
    this.y = 300;
    this.scale.x = this.scale.y = 2;
    this.canmove = false;
    this.correctanswer = false;
    this.wronganswer = false;
    this._layer = new Sprite();
    this._topping = new Sprite();
    this.addChild(this._layer);
    this.addChild(this._topping);
    
}

Sprite_Cakeontrays.prototype.update = function(){

 Sprite.prototype.update.call(this);
    if(this.canmove){
        {
            if(this._dist>=220)
            {
                this.canmove=false;
                this._dist = 0;
            }
        }
        this.x+=this.trailspeed;
        this._dist+=this.trailspeed;
    }
    if(this.correctanswer){
        {   if(this.canmove==true){
            return;
        }
            if(this.x>=1280)
            {
                this.correctanswer=false;
                this.x = -230;
                this._layer.bitmap= null;
                this._topping.bitmap= null;
                SceneManager._scene._cakerandomizer.refresh();
            }
        }
        this.x+=this.trailspeed;
        
    }
    if(this.wronganswer){
        {   
              if(this.canmove==true){
                return;
            }
            if(this.y>=720)
            {
                this.wronganswer=false;
                this.x = -230;
                this.y = 320;
                this.rotation = 0;
                this._layer.bitmap= null;
                this._topping.bitmap= null;
                SceneManager._scene._cakerandomizer.refresh()
            }
        }
        this.y+=this.trailspeed;
        this.x+=this.trailspeed/3;
        this.rotation-=0.01
        
    }


};
Sprite_Cakeontrays.prototype.makelayer = function(id){

    this._layer.bitmap = ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","layer"+id);
    this.cakelayers[1] = id;
    this.cakelayers[0] = SceneManager._scene._cakelayers[0]+1;
};
   
Sprite_Cakeontrays.prototype.maketopping = function(id){

    this._topping.bitmap = ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","topping"+id);
    this.cakelayers[2] = id;
};

Sprite_Cakeontrays.prototype.resevaluate = function(){

    
    if(SceneManager._scene._cakerandomizer.layerarr.equals(SceneManager._scene._cake.cakelayers)){
        this.correctanswer = true;
        SceneManager._scene._score+=1;
        SceneManager._scene._baker.ChangeExpression(2);
        SceneManager._scene._scorewindow.refresh();
    }else{
        this.wronganswer = true;
        SceneManager._scene._baker.ChangeExpression(3);
    };
};



function Sprite_Baker() {

    this.initialize.apply(this, arguments);

}

Sprite_Baker.prototype = Object.create(Sprite.prototype);
Sprite_Baker.constructor = Sprite_Baker;

Sprite_Baker.prototype.initialize = function (bitmap,dimW,dimH){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = 750;
    this.y = 20;
    this.scale.x = this.scale.y = 2;
    this.animspeed = 30;
    this._animtimer = this.animspeed;
    this.goingdown = true;
    this.fadingout = false;
    this.fadingin = false;
    this.changeback = false;
    this._currentExp = 1;
    this._staytimer = 120;
    
}
Sprite_Baker.prototype.ChangeExpression = function(exp){
    console.log(exp)
    this.bitmap = ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","Bakery_"+exp)
    this.changeback = true;    
    this._staytimer = 120;
        
}

Sprite_Baker.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if(this.changeback==true){
    if(this._staytimer<=0){
        console.log(this._staytimer)
        this.bitmap = ImageManager.loadBitmap("img/pictures/Cakemakerminigame/","Bakery_1");
        this.changeback = false;
        this._staytimer = 0;
        
    }else{
        this._staytimer-=1;

    }
 }
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



//-----------------------------------------------------------------------------
// Window_CakeLayerNames
//
// The window for displaying the description of the selected item.

function Window_CakeLayerNames() {
    this.initialize(...arguments);
}

Window_CakeLayerNames.prototype = Object.create(Window_Base.prototype);
Window_CakeLayerNames.prototype.constructor = Window_CakeLayerNames;

Window_CakeLayerNames.prototype.initialize = function(rect,text) {
    Window_Base.prototype.initialize.call(this, rect);
    this._text = text;
};

Window_CakeLayerNames.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};

Window_CakeLayerNames.prototype.clear = function() {
    this.setText("");
};

Window_CakeLayerNames.prototype.setItem = function(item) {
    this.setText(item ? item.description : "");
};

Window_CakeLayerNames.prototype.refresh = function() {
    const rect = this.baseTextRect();
    this.contents.clear();
    this.drawTextEx(this._text, rect.x, rect.y, rect.width,"center");
};