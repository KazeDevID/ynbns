
/*=============================================================================
 * Slot Machine Game
 * By Hex - www.fiverr.com/hex_fvx
 * Hex_Card_Matching_Game.js
 * Version: 1.0
 * Free for commercial and non commercial use.
 *=============================================================================*/
 /*:
 * @plugindesc cardmatchingGame MiniGame.
 *             
 * @author Hex
 *
 * @help Make A cardmatchingGame Game
 * 
 * Script call to open Card Matching Game - SceneManager.push(Scene_CardMatching);
 * 
 * 
 * 
 * 
 * @param ModeSwitchID
 * @desc When this switch is turned on 31 card matching game will be played. otherwise 21.
 * @default 20
 * 
 * @param ResultSwitchID
 * @desc If this switch is on that means player won otherwise lost the game.
 * @default 21
 * 
 * @param CommonEventID
 * @desc The Commone Event ID which is called at the end of Game.
 * @default 7
 * 
 * 
 * 
 * 
 */

 var Zf = Zf || {};
 Zf.cardmatchingGame = {};
 Zf.cardmatchingGame.Parameters = PluginManager.parameters('Hex_Card_Matching_Game');

 Zf.cardmatchingGame.mswitchid = Number(Zf.cardmatchingGame.Parameters["ModeSwitchID"]) || 20;
 Zf.cardmatchingGame.swichid = Number(Zf.cardmatchingGame.Parameters["ResultSwitchID"]) || 21;
 Zf.cardmatchingGame.ceid = Number(Zf.cardmatchingGame.Parameters["CommonEventID"]) || 7;

function Scene_CardMatching() {
    this.initialize(...arguments);
}

Scene_CardMatching.prototype = Object.create(Scene_MenuBase.prototype);
Scene_CardMatching.prototype.constructor = Scene_CardMatching;

Scene_CardMatching.prototype.initialize = function() {
    
    Scene_MenuBase.prototype.initialize.call(this);
    this._playerdecmade = 0;
    this._compsumstart = 0;
    this._compcardselected = 0;
    this._targetScore = $gameSwitches.value(Zf.cardmatchingGame.mswitchid)? 31 : 21;
    this._finalrescaluclated = false;
    this._timerToRem= 200;
        
};
Scene_CardMatching.prototype. createGameRectangle = function() {
   
    
}
Scene_CardMatching.prototype.helpAreaHeight = function() {
    return 0;
};

Scene_CardMatching.prototype.create = function() {
    
    Scene_MenuBase.prototype.create.call(this);
    
    this.createBackgroundSprite();
    this.createforegroundsprites();
    this.createWindowLayer();

   
    


};

Scene_CardMatching.prototype.update = function() {
    
    Scene_MenuBase.prototype.update.call(this);
    if(this._playerdecmade&&this._compcardselected<=4){
        this.computercardscalculator();   
    }
    if(this._compcardselected>=5){

        this.calresult();
    }
    if(this._finalrescaluclated){
        if(this._timerToRem<=0){
            $gameTemp.reserveCommonEvent(Zf.cardmatchingGame.ceid);
            SceneManager.pop();
        }else{
            this._timerToRem-=1;
        }
    }
    
};
Scene_CardMatching.prototype.computercardscalculator = function() {

    this.addCardinComputerStack(Math.randomInt(10)+1);
    this._compcardselected+=1;
    if(this._targetScore==21){
        if(this._compsumstart>=21){
            this._compcardselected = 5;
        }
        if(this._compsumstart>18&&this._compsumstart<21){
    
            this._compcardselected = 5;
        }

    }else{

        if(this._compsumstart>=31){
            this._compcardselected = 5;
        }
        if(this._compsumstart>28&&this._compsumstart<31){
    
            this._compcardselected = 5;
        }
    }
    
    
        
}


Scene_CardMatching.prototype.calresult = function() {
    if(this._targetScore==21){

        if(this._playerscorewin._value==21){
            //lost
            console.log("Win");
            $gameSwitches.setValue(Zf.cardmatchingGame.swichid, true);
            this._bartender.ChangeExpression(3);
            this._finalrescaluclated = true;
            return;
        }
        if(this._playerscorewin._value>21){
            //lost
            console.log("Lose");
            this._finalrescaluclated = true;
            this._bartender.ChangeExpression(2);
            $gameSwitches.setValue(Zf.cardmatchingGame.swichid, false);
            return;
        }
        if(this._playerscorewin._value>=this._compsumstart){
            //win
            console.log("Win");
            $gameSwitches.setValue(Zf.cardmatchingGame.swichid, true);
            this._bartender.ChangeExpression(3);
            this._finalrescaluclated = true;
    
        }else{
            if(this._compsumstart>21){
                if(this._playerscorewin._value<=21){
                    //lost
                    console.log("Win");
                    $gameSwitches.setValue(Zf.cardmatchingGame.swichid, true);
                    this._bartender.ChangeExpression(3);
                    this._finalrescaluclated = true;
                    return;
                }
            }
            console.log("Lose");
            $gameSwitches.setValue(Zf.cardmatchingGame.swichid, false);
            this._bartender.ChangeExpression(2);
            this._finalrescaluclated = true;
            
        }


    }else{


        if(this._playerscorewin._value==31){
            //lost
            console.log("Win");
            this._finalrescaluclated = true;
            this._bartender.ChangeExpression(3);
            $gameSwitches.setValue(Zf.cardmatchingGame.swichid, true);
            return;
        }
        if(this._playerscorewin._value>31){
            //lost
            console.log("Lose");
            this._finalrescaluclated = true;
            this._bartender.ChangeExpression(2);
            $gameSwitches.setValue(Zf.cardmatchingGame.swichid, false);
            return;
        }
        if(this._playerscorewin._value>=this._compsumstart){
            //win
            console.log("Win");
            this._finalrescaluclated = true;
            this._bartender.ChangeExpression(3);
            $gameSwitches.setValue(Zf.cardmatchingGame.swichid, true);
    
        }else{
            if(this._compsumstart>31){
                if(this._playerscorewin._value<=31){
                    //lost
                    console.log("Win");
                    this._finalrescaluclated = true;
                    this._bartender.ChangeExpression(3);
                    $gameSwitches.setValue(Zf.cardmatchingGame.swichid, true);
                    return;
                }
            }
            console.log("Lose");
            this._finalrescaluclated = true;
            this._bartender.ChangeExpression(2);
            $gameSwitches.setValue(Zf.cardmatchingGame.swichid, false);
        }

    }
    
   
};


Scene_CardMatching.prototype.confirmedfromplayer = function() {
    this._playerdecmade = true;
   
};

Scene_CardMatching.prototype.addCardinPlayerStack = function(cid) {
    
    this._nexid += 1;
    var totalsum=0;
    var newcard = new Sprite_CardPlayersCard(ImageManager.loadBitmap("img/pictures/BlackJack/","Card"+(cid)),this._nexx+25*this._nexid,this._nexy,cid);
    this._selectedPlayer.push(newcard);  
    this.addChild(this._selectedPlayer[this._nexid]);
    for (let index = 0; index < this._selectedPlayer.length; index++) {
        
        totalsum+=this._selectedPlayer[index]._value
        
    }
    this._playerscorewin.reshuffle(totalsum);
    
};
Scene_CardMatching.prototype.addCardinComputerStack = function(cid) {
    
    this._nexide =this._nexide+1;
    var totalsum = 0;
    var newcard = new Sprite_ComputerCardPlayable(ImageManager.loadBitmap("img/pictures/BlackJack/","Card"+(cid)),this._nexx+25*this._nexide,this._nexye,cid);
    this._compselectedcards.push(newcard); 
    //console.log(newcard); 
    this.addChild(this._compselectedcards[this._nexide]);
    
    this._compsumstart += this._compselectedcards[this._nexide]._value;
       
    this._compscorewin.reshuffle(this._compsumstart);
    //this._playerscorewin.reshuffle(totalsum);
    
};





Scene_CardMatching.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    //this._statusWindow.refresh();
};


Scene_CardMatching.prototype.resetcardmatchingGame = function() {

    var currvalue = 0;
    for (let index = 0; index < this._compselectedcards.length; index++) {
        
        currvalue += this._compselectedcards[index]._value;
    }
    for (let index = 0; index < this._compcardsspare.length; index++) {

        currvalue += this._compcardsspare[index]._value;
        if(currvalue==31){console.log("WOWee")}
        if(currvalue>24){
            console.log("Just Above dat",this._compcardsspare[index]._value)
        }
    }
    
    
   
};

Scene_CardMatching.prototype.createforegroundsprites = function(){
    
    this._bartender = new Sprite_Bartender(ImageManager.loadBitmap("img/pictures/BlackJack/","Bartender_Norm"));
    
    this.addChild(this._bartender);
}
Scene_CardMatching.prototype.createBackgroundSprite = function() {
    var y = 450;
    var x = 300;
    var y2 = 100;
    this._bg = new Sprite(ImageManager.loadBitmap("img/pictures/BlackJack/","Background"));
    this._playercards = [];
    this._selectedPlayer = [];
    this._compcardsspare = [];
    this._compselectedcards = [];
    this._nexx = 490;
    this._nexy = 580;
    this._nexye = 225;
    this._nexid = 0;
    this._nexide = 0;
   // this.addChild(this._bg);
   
    this.addChild(new Window_Base(new Rectangle(265,85,535,125)));
    this.addChild(new Window_Base(new Rectangle(265,440,535,125)));
    this._playerdescription = new Window_CardDescription(new Rectangle(265,565,410,90),0);
    this._Hanadescription = new Window_CardDescription(new Rectangle(265,210,410,90),1);
    this.addChild(this._playerdescription);
    this.addChild(this._Hanadescription);
   
    this._confirmbutton = new Sprite_BlackJackConfirmPlayer(ImageManager.loadBitmap("img/pictures/BlackJack/","ClickButton"),665,380)
    this.addChild(this._confirmbutton);


    for (let j = 0; j < 5; j++) {
            
            var cardid = Math.randomInt(10)+1;
            this._playercards[j] = new Sprite_CardBlackJack(ImageManager.loadBitmap("img/pictures/BlackJack/","Card"+(cardid)),x+90*j,y,cardid);
            this.addChild(this._playercards[j]);
            
            var cardide = Math.randomInt(10)+1;
            this._compcardsspare[j] = new Sprite_ComputerCards(ImageManager.loadBitmap("img/pictures/BlackJack/","Card"+(cardide)),x+90*j,y2,cardide);
            this.addChild(this._compcardsspare[j]);

    }   
    for (let i = 0; i < 2; i++) {
        var cardid = Math.randomInt(10)+1;
        this._nexid = i;
        this._selectedPlayer[i] = new Sprite_CardPlayersCard(ImageManager.loadBitmap("img/pictures/BlackJack/","Card"+(cardid)),this._nexx+20*i,this._nexy,cardid);
        this.addChild(this._selectedPlayer[i]);
        
        this._nexide = i;
        var cardide = Math.randomInt(10)+1;
        this._compselectedcards[i] = new Sprite_ComputerCardPlayable(ImageManager.loadBitmap("img/pictures/BlackJack/","Card"+(cardide)),this._nexx+25*this._nexide,this._nexye,cardide);
        this.addChild(this._compselectedcards[i]);
        this._compsumstart += this._compselectedcards[i]._value;
       
    }    
    
    this._playerscorewin = new WindowScoreTotalPlayerBlackJack(new Rectangle(675, 565, 125, 90));
    this._compscorewin = new WindowScoreTotalComputerBlackJack(new Rectangle(675, 210, 125, 90))
    this.addChild(this._playerscorewin);
    this.addChild(this._compscorewin);
    this._compscorewin.reshuffle(this._compsumstart);
    var totalsum = 0;
    for (let index = 0; index < this._selectedPlayer.length; index++) {
        
        totalsum+=this._selectedPlayer[index]._value;
        
    }
    this._playerscorewin.reshuffle(totalsum);
    
  
};

Scene_CardMatching.prototype.videoAnim = function() {
   
};





function Sprite_CardBlackJack() {

    this.initialize.apply(this, arguments);

}

Sprite_CardBlackJack.prototype = Object.create(Sprite.prototype);
Sprite_CardBlackJack.constructor = Sprite_CardBlackJack;

Sprite_CardBlackJack.prototype.initialize = function (bitmap,x,y,v){

    Sprite.prototype.initialize.call(this, bitmap);
    this._yindex = 0;
    this.x = x;
    this.y = y;
    this._value = v;
    this._starttransit = false;
    this.assigned = false;
    this._tempbitmap = this.bitmap;
    this.bitmap = ImageManager.loadBitmap("img/pictures/BlackJack/","Card_hidden");
    // Math.randomInt(300)+200;
}


Sprite_CardBlackJack.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if(SceneManager._scene._playerdecmade){
     return;
 }
 if(this.assigned){
     return;
 }
 if(this._starttransit){
     if(this.x<0)
     {
         return;
     }
     SceneManager._scene.addCardinPlayerStack(this._value);
        //this.x=-50;
        this.assigned = true;
    //  this.y+=2;
    //  this.scale.x = this.scale.y-=0.05;
    //  if(this.scale.x<0.1){
        

    //  }
     return;
 }else{

 }
 if(TouchInput.x>this.x&&TouchInput.x<this.x+this.width&&TouchInput.y>this.y&&TouchInput.y<this.y+this.height){
        this.scale.x = this.scale.y = 1.05;
        if(TouchInput.isTriggered()){
            this.opacity = 100;
            this.bitmap = this._tempbitmap;
            this._starttransit=true;
            
            
            //console.log(this.row,this.col)
        }
    }else{
        this.scale.x = this.scale.y = 1;
    }
}

Sprite_CardBlackJack.prototype.readjust = function(){
    

};

Sprite_CardBlackJack.prototype.result = function(){


};



function Sprite_CardPlayersCard() {

    this.initialize.apply(this, arguments);

}

Sprite_CardPlayersCard.prototype = Object.create(Sprite.prototype);
Sprite_CardPlayersCard.constructor = Sprite_CardPlayersCard;

Sprite_CardPlayersCard.prototype.initialize = function (bitmap,x,y,v){

    Sprite.prototype.initialize.call(this, bitmap);
    this._yindex = 0;
    this.x = x;
    this.y = y;
    this._yoffy = y;
    this._value = v;
    this.scale.x = this.scale.y = 1;
    // Math.randomInt(300)+200;
}


Sprite_CardPlayersCard.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if(TouchInput.x>this.x&&TouchInput.x<this.x+this.width&&TouchInput.y>this.y&&TouchInput.y<this.y+this.height){
        this.scale.x = this.scale.y = 0.45;
        
        if(TouchInput.isTriggered()){
            //this.opacity = 100;
            
            console.log(this.row,this.col)
        }
    }else{
        this.scale.x = this.scale.y = 0.3;
       // this.y = this._yoffy;
    }
}

Sprite_CardPlayersCard.prototype.readjust = function(){
    

};

Sprite_CardPlayersCard.prototype.result = function(){


};


//-----------------------------------------------------------------------------
// WindowScoreTotalPlayerBlackJack
//
// The window for displaying the party's gold.

function WindowScoreTotalPlayerBlackJack() {
    this.initialize(...arguments);
}

WindowScoreTotalPlayerBlackJack.prototype = Object.create(Window_Selectable.prototype);
WindowScoreTotalPlayerBlackJack.prototype.constructor = WindowScoreTotalPlayerBlackJack;

WindowScoreTotalPlayerBlackJack.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
    this._value = 0;
    //this.gaugeimg = new Sprite_GaugeClickerImage(ImageManager.loadBitmap("img/pictures/Gauge_1/","GaugeLoader"));
    //this.addChild(this.gaugeimg);
    
};

WindowScoreTotalPlayerBlackJack.prototype.colSpacing = function() {
    return 0;
};

WindowScoreTotalPlayerBlackJack.prototype.refresh = function() {
    this.contents.clear();
    this.reshuffle(0);
};


WindowScoreTotalPlayerBlackJack.prototype.reshuffle = function(val) {
    
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 45;
    this._value = val;
    this.drawText(""+val+"/"+SceneManager._scene._targetScore, x, y+10, width,"center");
};



//-----------------------------------------------------------------------------
// WindowScoreTotalComputerBlackJack
//
// The window for displaying the party's gold.

function WindowScoreTotalComputerBlackJack() {
    this.initialize(...arguments);
}

WindowScoreTotalComputerBlackJack.prototype = Object.create(Window_Selectable.prototype);
WindowScoreTotalComputerBlackJack.prototype.constructor = WindowScoreTotalComputerBlackJack;

WindowScoreTotalComputerBlackJack.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
    this._value = 0;
    //this.gaugeimg = new Sprite_GaugeClickerImage(ImageManager.loadBitmap("img/pictures/Gauge_1/","GaugeLoader"));
    //this.addChild(this.gaugeimg);
    
};

WindowScoreTotalComputerBlackJack.prototype.colSpacing = function() {
    return 0;
};

WindowScoreTotalComputerBlackJack.prototype.refresh = function() {
    this.contents.clear();
    this.reshuffle(0);
};


WindowScoreTotalComputerBlackJack.prototype.reshuffle = function(val) {
    
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 45;
    this.drawText(""+val+"/"+SceneManager._scene._targetScore, x, y+10, width,"center");
};









function Sprite_ComputerCards() {

    this.initialize.apply(this, arguments);

}

Sprite_ComputerCards.prototype = Object.create(Sprite.prototype);
Sprite_ComputerCards.constructor = Sprite_ComputerCards;

Sprite_ComputerCards.prototype.initialize = function (bitmap,x,y,v){

    Sprite.prototype.initialize.call(this, bitmap);
    this._yindex = 0;
    this.x = x;
    this.y = y;
    this._value = v;
    this._starttransit = false;
    this.assigned = false;
    this.bitmap = ImageManager.loadBitmap("img/pictures/BlackJack/","Card_hidden");
    // Math.randomInt(300)+200;
}


Sprite_ComputerCards.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if(this.assigned){
     return;
 }
 if(this._starttransit){
     if(this.x<0)
     {
         return;
     }
     //this.x-=12;
     //this.scale.x = this.scale.y-=0.02;
     //if(this.x<30){
        SceneManager._scene.addCardinPlayerStack(this._value);
       // this.x=-50;
        this.assigned = true;

     //}
     return;
 }else{

 }
}

Sprite_ComputerCards.prototype.readjust = function(){
    

};

Sprite_ComputerCards.prototype.result = function(){


};




function Sprite_ComputerCardPlayable() {

    this.initialize.apply(this, arguments);

}

Sprite_ComputerCardPlayable.prototype = Object.create(Sprite.prototype);
Sprite_ComputerCardPlayable.constructor = Sprite_ComputerCardPlayable;

Sprite_ComputerCardPlayable.prototype.initialize = function (bitmap,x,y,v){

    Sprite.prototype.initialize.call(this, bitmap);
    this._yindex = 0;
    this.x = x;
    this.y = y;
    this._yoffy = y;
    this._value = v;
    this.scale.x = this.scale.y = 0.3;
    // Math.randomInt(300)+200;
}


Sprite_ComputerCardPlayable.prototype.update = function(){

 Sprite.prototype.update.call(this);

}

Sprite_ComputerCardPlayable.prototype.readjust = function(){
    

};

Sprite_ComputerCardPlayable.prototype.result = function(){


};



function Sprite_BlackJackConfirmPlayer() {

    this.initialize.apply(this, arguments);

}

Sprite_BlackJackConfirmPlayer.prototype = Object.create(Sprite.prototype);
Sprite_BlackJackConfirmPlayer.constructor = Sprite_BlackJackConfirmPlayer;

Sprite_BlackJackConfirmPlayer.prototype.initialize = function (bitmap,x,y){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = x;
    this.y = y;
    this._pressonce = false;
}


Sprite_BlackJackConfirmPlayer.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if(this._pressonce){return;}
 if(TouchInput.x>this.x&&TouchInput.x<this.x+this.width&&TouchInput.y>this.y&&TouchInput.y<this.y+this.height){
    this.scale.x=this.scale.y = 1.05;
    if(TouchInput.isTriggered()){
        this.scale.x=this.scale.y = 1;
        SceneManager._scene.confirmedfromplayer();
        this._pressonce = true;
        this.x = this.x+1000;
    }

}else{
    this.scale.x=this.scale.y = 1;
    

    }
}

Sprite_BlackJackConfirmPlayer.prototype.result = function(){
   
  return this._result;

};


function Sprite_Bartender() {

    this.initialize.apply(this, arguments);

}

Sprite_Bartender.prototype = Object.create(Sprite.prototype);
Sprite_Bartender.constructor = Sprite_Bartender;

Sprite_Bartender.prototype.initialize = function (bitmap,dimW,dimH){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = 750;
    this.y = 20;
    this.scale.x = this.scale.y = 2;
    this.animspeed = 30;
    this._animtimer = this.animspeed;
    this.goingdown = true;
    this.fadingout = false;
    this.fadingin = false;
    this._currentExp = 1;
    
}
Sprite_Bartender.prototype.ChangeExpression = function(exp){

    this.bitmap = ImageManager.loadBitmap("img/pictures/BlackJack/","Bartender_Norm"+exp)
        

}

Sprite_Bartender.prototype.update = function(){

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



//-----------------------------------------------------------------------------
// Window_CardDescription
//
// The window for displaying the description of the selected item.

function Window_CardDescription() {
    this.initialize(...arguments);
}

Window_CardDescription.prototype = Object.create(Window_Base.prototype);
Window_CardDescription.prototype.constructor = Window_CardDescription;

Window_CardDescription.prototype.initialize = function(rect,text) {
    this._cardnumber = $gameSwitches.value(76)?31:21;
    Window_Base.prototype.initialize.call(this, rect);
    this._text = text;
    this.refresh();
};

Window_CardDescription.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};

Window_CardDescription.prototype.clear = function() {
    this.setText("");
};

Window_CardDescription.prototype.setItem = function(item) {
    this.setText(item ? item.description : "");
};

Window_CardDescription.prototype.refresh = function() {
    const rect = this.baseTextRect();
    this.contents.clear();
    if(this._text==1){//computer
        this.drawTextEx("\\c[2]Hana's Cards   -", rect.x, rect.y, rect.width,"center");

    }else{//player

        this.drawTextEx("\\c[17]\\n[1]'s Cards   -", rect.x, rect.y, rect.width,"center");
       // this.changeTextColor(ColorManager.textColor(1));
        this.drawTextEx("\\c[1]Reach \\c[27]"+this._cardnumber+"\\c[1] to WIN" , rect.x, rect.y+26, rect.width,"center");
    }
    
};