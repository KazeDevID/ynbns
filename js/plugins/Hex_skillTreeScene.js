
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
 * @help Make A SkillTree Game
 * 
 * Script call to open Card Matching Game - SceneManager.push(Scene_SkillTree);
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
 Zf.SkillTree = {};
 Zf.SkillTree.Parameters = PluginManager.parameters('Hex_Card_Matching_Game');
 Zf.SkillTree.skillArray  = [["Kiss",2],["X-ray Vision Lv-1",2],["NightCrawler",4],["X-ray Vision Lv-2",3],["Hypnotic Musician",4],["Love Song",4],["Lust Song",5],["Time Song",5],["Titjob",4],["ThighSex",6],["ArmSex",5],["Carry me",5],["Blowjob",4],["69",6],["DeepThroat",5],["Sitting Sex",5],["Cowgirl",4],["Rev Cowgirl",6],["Doggy Style",5],["Anal",5]];
 Zf.SkillTree.skillArrayJP = [["キス",3],["抱き枕",4],["ナイトクローラー",6],["オナニー",5],["手コキ",4],["フットジョブ",6],["指使い",5],["プッシー リック",5],["乳首責め",4],["太ももセックス",6],["アームセックス",5],["キャリーミー",5],["フェラチオ",4],["69",6],["ディープスロート",5],["座るセックス",5],["カウガール",4],["リバースカウガール",6],["後背位",5],["アナル",5]];
 
 Zf.SkillTree.timerImages = Number(Zf.SkillTree.Parameters["TimeBeforeDisappear"]) || 90;
 Zf.SkillTree.timerVariableId = Number(Zf.SkillTree.Parameters["TimeVariableID"]) || 18;
 Zf.SkillTree.miniGameTypeVar = Number(Zf.SkillTree.Parameters["MiniGameVariableID"]) || 17;
 Zf.SkillTree.swichid = Number(Zf.SkillTree.Parameters["ResultSwitchID"]) || 40;
 Zf.SkillTree.ceid = Number(Zf.SkillTree.Parameters["CommonEventID"]) || 9;
 Zf.SkillTree.setupMiniGame = function(goldVar){
    Zf.SkillTree.goldVar = goldVar;
    SceneManager.push(Scene_SkillTree);
 };
function Scene_SkillTree() {
    this.initialize(...arguments);
}

Scene_SkillTree.prototype = Object.create(Scene_MenuBase.prototype);
Scene_SkillTree.prototype.constructor = Scene_SkillTree;

Scene_SkillTree.prototype.initialize = function() {
    
    Scene_MenuBase.prototype.initialize.call(this);
    
        
};
Scene_SkillTree.prototype.makeArray = function() {


}
Scene_SkillTree.prototype.resetGame = function() {
    
}
Scene_SkillTree.prototype.helpAreaHeight = function() {
    return 0;
};
Scene_SkillTree.prototype.create = function() {
    
    Scene_MenuBase.prototype.create.call(this);
    
    this.createWindowLayer();
    this.createBackgroundSprite();
    this.createforegroundsprites();
    
};



Scene_SkillTree.prototype.update = function() {
    
    Scene_MenuBase.prototype.update.call(this);
    if(Input.isTriggered("cancel")){
        SceneManager.pop();
        ZF.EventDataManager.setupHeroineWindow();
    }
    
    
};
Scene_SkillTree.prototype.computercardscalculator = function() {

    
        
}


Scene_SkillTree.prototype.calresult = function() {
    
   
};


Scene_SkillTree.prototype.confirmedfromplayer = function() {
   
   
};


Scene_SkillTree.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    //this._statusWindow.refresh();
};


Scene_SkillTree.prototype.resetSkillTree = function() {

    
    
   
};

Scene_SkillTree.prototype.createforegroundsprites = function(){

    Zf.SkillTree._skillTree = new Window_SkillTree(new Rectangle(0,0,1180,720));
    this.addChild(Zf.SkillTree._skillTree);
    Zf.SkillTree._skillpoint  = new Window_SkillPoints(new Rectangle(0, 0, 200, 70));
    this.addChild(Zf.SkillTree._skillpoint);
    Zf.SkillTree._skillcost  = new Window_SkillCost(new Rectangle(0, 560, 500, 70));
    this.addChild(Zf.SkillTree._skillcost);
    this._maidenImage = new Sprite_SkillMaiden(ImageManager.loadBitmap("img/pictures/SkillTree/","Maiden_1"));
    this.addChild(this._maidenImage);
}


//-----------------------------------------------------------------------------
// Window_SkillPoints
//
// The window for displaying the party's gold.

function Window_SkillPoints() {
    this.initialize(...arguments);
}

Window_SkillPoints.prototype = Object.create(Window_Selectable.prototype);
Window_SkillPoints.prototype.constructor = Window_SkillPoints;

Window_SkillPoints.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
};

Window_SkillPoints.prototype.colSpacing = function() {
    return 0;
};

Window_SkillPoints.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.drawText("Skill Points : "+this.value(), x, y, width);
};

Window_SkillPoints.prototype.value = function() {
    return $gameVariables.value(69);
};

Window_SkillPoints.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_SkillPoints.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};


Scene_SkillTree.prototype.createBackgroundSprite = function() {
    
    
    this._bg = new Sprite(ImageManager.loadBitmap("img/pictures/ColorMemoGame/","Background"));
   // this.addChild(this._bg);
    
    
  
};


//-----------------------------------------------------------------------------
// Window_SkillCost
//
// The window for displaying the party's gold.

function Window_SkillCost() {
    this.initialize(...arguments);
}

Window_SkillCost.prototype = Object.create(Window_Selectable.prototype);
Window_SkillCost.prototype.constructor = Window_SkillCost;

Window_SkillCost.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    
    this.name = "???";
    this.cost = "?"
    this.refresh();
    
};

Window_SkillCost.prototype.colSpacing = function() {
    return 0;
};

Window_SkillCost.prototype.refresh = function(index,name) {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    this.cost = index?index:"?";
    this.name = name?name:"???";
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.changeTextColor(ColorManager.textColor(2));
    this.drawText("Skill :", x, y, width);//スキル
    this.changeTextColor(ColorManager.textColor(27));
    this.drawText("            "+this.name, x, y, width);
    this.changeTextColor(ColorManager.textColor(17));
    this.drawText("                                      "+" Cost : "+this.cost, x, y, width);//コスト
};

Window_SkillCost.prototype.value = function() {
    return $gameParty.gold();
};

Window_SkillCost.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_SkillCost.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};






//Window_stats

//-----------------------------------------------------------------------------
// Window_SkillTree
//
// The window for displaying the party's gold.

function Window_SkillTree() {
    this.initialize(...arguments);
}

Window_SkillTree.prototype = Object.create(Window_Selectable.prototype);
Window_SkillTree.prototype.constructor = Window_SkillTree;

Window_SkillTree.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._skillimages=[];
    this.makeSprites();
    this.refresh();
    
    
    
};

Window_SkillTree.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
   
};

Window_SkillTree.prototype.makeSprites = function() {
    var k=0;
    this.background = new Sprite(ImageManager.loadBitmap("img/pictures/SkillTree/","BaseSkillTree"));
    this.addChild(this.background);
    for (let index = 0; index < 5; index++) {
        for (let j = 0; j < 4; j++) {

        if(k==0){
            this._skillimages[k] = new Sprite_skillIcons(ImageManager.loadBitmap("img/pictures/SkillTree/","St_"+k),102+index*144,140+j*112,k);
        }else{
            if(k>4){
                this._skillimages[k] = new Sprite_skillIcons(ImageManager.loadBitmap("img/pictures/SkillTree/","St_"+k),102+index*144,140+j*112,k,this._skillimages[k-1],this._skillimages[k-4]);
            }else
            {
                this._skillimages[k] = new Sprite_skillIcons(ImageManager.loadBitmap("img/pictures/SkillTree/","St_"+k),102+index*144,140+j*112,k,this._skillimages[k-1]);
            }
        }
        this.addChild(this._skillimages[k]);
        console.log(k);
        k+=1;
        }   
        
    }
    
   
    
    

};
Window_SkillTree.prototype.showWindowe = function() {
    this.x = 1080;
    
};
Window_SkillTree.prototype.colSpacing = function() {
    return 0;
};

Window_SkillTree.prototype.refresh = function(name,arr) {
 
    this.draw_ui();

};

Window_SkillTree.prototype.draw_ui = function(name,arr) {
    
    this.contents.clear();
    var k = 0;
    const rect = this.itemLineRect(0);
    const x = rect.x-30;
    const y = rect.y;
    const width = rect.width;
    this.contents.fontSize=16;
    
    for (let index = 0; index < 5; index++) {   
        for (let j = 0; j < 4; j++) {

          var skillname =  Zf.SkillTree.skillArray[k][0];
        this.drawText(skillname,72+index*144,53+j*112,width);
        k+=1;
        }   
        
    }

    
};


Window_SkillTree.prototype.value = function() {
    return $gameParty.gold();
};

Window_SkillTree.prototype.allSpriteRefresh = function() {

    for (let index = 0; index < 20; index++) {
        
        this._skillimages[index].refreshe();
    }



};

Window_SkillTree.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};



function Sprite_skillIcons() {

    this.initialize.apply(this, arguments);

}

Sprite_skillIcons.prototype = Object.create(Sprite.prototype);
Sprite_skillIcons.constructor = Sprite_skillIcons;

Sprite_skillIcons.prototype.initialize = function (bitmap,x,y,index,lastitem,lasthorz){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x=x;
    this.y=y;
    this.lastitem = lastitem;
    this.lasthorz = lasthorz;
    this.parIndex = index;
    this.cost = Zf.SkillTree.skillArray[index][1];
    this.name = Zf.SkillTree.skillArray[index][0];
    this.scale.x = this.scale.y = 1;
    this.anchor.x=this.anchor.y = 0.5;
    this.setColorTone([0,0,0,22]);
    this.unlocked = $gameSwitches.value(81+this.parIndex); 
    if(index==0){
        this.available=true;
    }else{
        if(index>4){
            if(this.parIndex==4||this.parIndex==8||this.parIndex==12||this.parIndex==16)
            {
                this.available = lasthorz.unlocked;
            }
            if(!this.available){
                this.available = lastitem.unlocked;
            }
        }else{
            this.available = lastitem.unlocked;
            
        }
        
    }
    console.log(this.unlocked,this.parIndex);
    
    
}
Sprite_skillIcons.prototype.refreshe = function(exp){

    this.unlocked = $gameSwitches.value(81+this.parIndex); 
    if(this.parIndex==0){
        this.available=true;
    }else{
        if(this.parIndex>4){
            if(this.parIndex==4||this.parIndex==8||this.parIndex==12||this.parIndex==16)
            {
                this.available = this.lasthorz.unlocked;
            }
            if(!this.available){
                this.available = this.lastitem.unlocked;
            }
        }else{
            this.available = this.lastitem.unlocked;
            
        }
        
    }
}

Sprite_skillIcons.prototype.update = function(){

 Sprite.prototype.update.call(this);
 
 if(TouchInput.x>(this.x-this.width/2)&&TouchInput.x<this.x+this.width/2&&TouchInput.y>(this.y-this.height/2)&&TouchInput.y<this.y+this.height/2){
    this.scale.x=this.scale.y = 1.05;
    this.setColorTone([22,22,22,33]);
    Zf.SkillTree._skillcost.refresh(this.cost,this.name);
    if(TouchInput.isTriggered()){
        if(this.available){
            if($gameVariables.value(69)>=this.cost&&this.unlocked==false){
                $gameVariables.setValue(69,$gameVariables.value(69)-this.cost);
                Zf.SkillTree._skillpoint.refresh();
                this.unlocked=true;
                this.scale.x=this.scale.y = 1;
                AudioManager.playSe({name: 'Item3', pan: 0, pitch: 100, volume: 100});
                $gameSwitches.setValue(81+this.parIndex,true);
                Zf.SkillTree._skillTree.allSpriteRefresh();
            }else{
                AudioManager.playSe({name: 'Buzzer1', pan: 0, pitch: 100, volume: 100});
            }
        }else{
            AudioManager.playSe({name: 'Buzzer1', pan: 0, pitch: 100, volume: 100});
        }
        
        
       // this._pressonce = true; 
    }

}else{
    this.scale.x=this.scale.y = 1;
    if(this.unlocked){
        this.setColorTone([0,0,0,0]);
    }else{
        if(this.available){
            this.setColorTone([40,70,70,0]);
            
        }else{
            this.setColorTone([0,0,0,255]);
          
        }
        
    }
    

    }
}






function Sprite_SkillMaiden() {

    this.initialize.apply(this, arguments);

}

Sprite_SkillMaiden.prototype = Object.create(Sprite.prototype);
Sprite_SkillMaiden.constructor = Sprite_SkillMaiden;

Sprite_SkillMaiden.prototype.initialize = function (bitmap,dimW,dimH){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = 700;
    this.y = 110;
    this.scale.x = this.scale.y = 2;
    this.animspeed = 30;
    this._animtimer = this.animspeed;
    this.goingdown = true;
    this.fadingout = false;
    this.fadingin = false;
    this._currentExp = 1;
    
}
Sprite_SkillMaiden.prototype.ChangeExpression = function(exp){

    this.fadingout=true;
    this._currentExp=exp;
 

}

Sprite_SkillMaiden.prototype.update = function(){

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

