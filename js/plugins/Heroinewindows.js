


var ZF = ZF || {};          // Galv's main object
ZF.EventDataManager = ZF.EventDataManager || {};  


ZF.EventDataManager.genrandomnums = function(min,max,varid) {
	//$gameVariables.setValue(varid,Math.floor(Math.random() * (max - min) ) + min);
    return Math.floor(Math.random() * (max - min) ) + min;
};
ZF.EventDataManager.findstripgameWinner = function() {
	var pl = $gameVariables.value(174);
    var da = $gameVariables.value(176);
    var result = -1;
    if(pl==0&&da==0||pl==1&&da==1||pl==2&&da==2){
        
        result = 0; //Draw
        
    }
    if(pl==0&&da==1||pl==1&&da==2||pl==2&&da==0){
        
        result = 1; //Player Lose
        
    }
    if(pl==1&&da==0||pl==2&&da==1||pl==0&&da==2){
        
        result = 2; //Olivia Lose
        
    }
    return result;
};
ZF.EventDataManager.FemaleObjects = [ {Name:"Player", Mapid:13,varArray:[12,13,14,15]},{Name:"Daughter", Mapid:14,varArray:[12,13,14,15]}
]
ZF.EventDataManager.currentMap = -1;
ZF.EventDataManager.companionList = ['Null','Rika_1','Hana_1','Lucie_1','Mio_1','Marie_1'];
ZF.EventDataManager.RikaCompatiblity = [2];
ZF.EventDataManager.HanaCompatiblity = [1];

ZF.EventDataManager.lastMap = 0;
ZF.EventDataManager.refreshWindows= function() {
    // for (let index = 0; index < ZF.EventDataManager.FemaleObjects.length; index++) {
    //     if(ZF.EventDataManager.FemaleObjects[index].Mapid==$gameMap.mapId())
    //     {
    //        //
    //        if(ZF.EventDataManager._heroinestat) 
    //        {
    //            ZF.EventDataManager._heroinestat.refresh(ZF.EventDataManager.FemaleObjects[index].Name,ZF.EventDataManager.FemaleObjects[index].varArray);
               

    //         }
    //     }
        
        
    // }
    ZF.EventDataManager.setupHeroineWindow();
}

ZF.EventDataManager.PlayerName = "Player";
ZF.EventDataManager.PlayerName2 = "Player";



Scene_Map.prototype.isReady = function() {
    if (!this._mapLoaded && DataManager.isMapLoaded()) {
        this.onMapLoaded();
        this._mapLoaded = true;
    }
    // for (let index = 0; index < ZF.EventDataManager.FemaleObjects.length; index++) {
    //     if(ZF.EventDataManager.FemaleObjects[index].Mapid==$gameMap.mapId())
    //     {
    //        //
    //        if(ZF.EventDataManager._heroinestat) 
    //        {
    //            ZF.EventDataManager._heroinestat.refresh(ZF.EventDataManager.FemaleObjects[index].Name,ZF.EventDataManager.FemaleObjects[index].varArray);
               

    //         }
    //     }
        
        
    // }
    ZF.EventDataManager.setupHeroineWindow();
  

    return this._mapLoaded && Scene_Message.prototype.isReady.call(this);
    
};

const alias_ZF_HeroineWindowUpdate_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    alias_ZF_HeroineWindowUpdate_update.call(this);
    if($gameSwitches._data[15]){
      //  ZF.EventDataManager._heroinestat.hidewindowe();
       // ZF.EventDataManager._datephase.hidewindowe();
    }else{
       // ZF.EventDataManager._heroinestat.showWindowe();
        //ZF.EventDataManager._datephase.showWindowe();
    }
    if(ZF.EventDataManager.currentMap != ZF.EventDataManager.lastMap)
    {
        console.log("SetupHeroine")
        ZF.EventDataManager.setupHeroineWindow();
    }
    if(ZF.gaugeSceneMap._mousePointerWindow.opacity>=200){
        if(ZF.gaugeSceneMap._mousePointerWindow._startdisappear){
            if(!ZF.gaugeSceneMap._mousePointerWindow._previousImageID._hovered){
                this.disappearPointerWindow();
            }
            
        }
        ZF.gaugeSceneMap._mousePointerWindow.x= TouchInput.x;
        ZF.gaugeSceneMap._mousePointerWindow.y= TouchInput.y;
        
    }
};
Scene_Map.prototype.disappearPointerWindow = function() {
    ZF.gaugeSceneMap._mousePointerWindow.opacity = 0;
    ZF.gaugeSceneMap._mousePointerWindow.contentsOpacity=0;
    ZF.gaugeSceneMap._mousePointerWindow._startdisappear=false;
}

Game_Player.prototype.clearTransferInfo = function() {
    ZF.EventDataManager.currentMap = this._newMapId;
    this._transferring = false;
    this._newMapId = 0;
    this._newX = 0;
    this._newY = 0;
    this._newDirection = 0;
    for (let index = 2; index < 50; index++) {
        $gameScreen.erasePicture(index);
        
    }
};

ZF.EventDataManager.setupHeroineWindow = function() {
    ZF.EventDataManager.currentMap = ZF.EventDataManager.lastMap = $gameMap._mapId;
    if(!$dataMap){
        return;
    }
    var array = JSON.parse($dataMap.meta.character);
    var charName = array[0];
    var variableArray = array[1];
    ZF.EventDataManager._heroinestat.refresh(charName,variableArray);
    $gameTemp.reserveCommonEvent(8);
    //console.log(charName,variableArray);
}




Scene_Message.prototype.createGoldWindow = function() {
    const rect = this.goldWindowRect();
    this._goldWindow = new Window_Gold(rect);
    this._goldWindow.openness = 0;
    
    this.addWindow(this._goldWindow);
    
    ZF.EventDataManager._heroinestat = new Window_Heroine_Stats(new Rectangle(1080,75,269,190));
    ZF.EventDataManager._datephase = new Window_DateAndPhase(new Rectangle(0,-5,180,90));
    ZF.EventDataManager._companion = new Window_companion(new Rectangle(180,-5,90,90));
    ZF.EventDataManager._skillWindow = new Window_SpecialSkills(new Rectangle(270,-5,310,70));
    //ZF.EventDataManager._animecontrolwindow = new Window_CGAnimControl(new Rectangle(1020,267,260,450));
   // ZF.EventDataManager._skillWindow.refreshSkillsunlocked();
    this.addWindow(ZF.EventDataManager._heroinestat);
    this.addWindow(ZF.EventDataManager._datephase);
    this.addWindow(ZF.EventDataManager._companion);
    this.addWindow(ZF.EventDataManager._skillWindow);
    //this.addWindow(ZF.EventDataManager._skillTree);
   // this.addWindow(ZF.EventDataManager._animecontrolwindow);
    //this._datephase = new Window_DateAndPhase(new Rectangle(-25,100,150,150));
    
    
 
};
// const alias_Window_SavefileList = Window_SavefileList.prototype.drawPlaytime;
// Window_SavefileList.prototype.drawPlaytime = function(info, x, y, width) {
    
//     if (info.dayVariable) {
//         this.drawText("DAY - "+info.dayVariable, x-100, y, width, "center");
//     }
//     alias_Window_SavefileList.call(this,info, x, y, width);
// };
//Window_stats

//-----------------------------------------------------------------------------
// Window_Heroine_Stats
//
// The window for displaying the party's gold.

function Window_Heroine_Stats() {
    this.initialize(...arguments);
}

Window_Heroine_Stats.prototype = Object.create(Window_Selectable.prototype);
Window_Heroine_Stats.prototype.constructor = Window_Heroine_Stats;

Window_Heroine_Stats.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.hername = "Female";
    this.herlevel = 0;
    this.herpfp = "female";
    this.lust = 2;
    this.affection = 4;
    this.trust = 2;
    this.strength = 0;
    this.charm = 0;
    this.intelligence = 0;
    this.obedience = 0;
    this.dominance = 0;
    this.femaleface = "Nio";
    this.ActorStatus = "Virgin";
    this.pfp = new Sprite(ImageManager.loadBitmap("img/pictures/pfp/",this.femaleface));
    this.pfp.x = 10;
    this.hidden = false;
    this.hiding = false;
    this.showing=false;
    this.hidespeed=9;
    this.addChild(this.pfp);
    //this.refresh("Elf",[21,22,23,24]);
    
};

Window_Heroine_Stats.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    
    if(TouchInput.x>this.x&&TouchInput.y>this.y&&TouchInput.y<this.y+this.width){
        if(TouchInput.isTriggered())
        {
            if(this.hidden){
                this.showing=true;
            }else{
                this.hiding=true;
            }
            
            //this.hidewindowe();
        }
    }
    if(this.hiding){
        this.x+=this.hidespeed;
        if(this.x>1210){
            this.hidden=true;
            this.hiding=false;
        }
    }
    if(this.showing){
        this.x-=this.hidespeed;
        if(this.x<=1080){
            this.hidden=false;
            this.showing=false;
        }
    }
};

Window_Heroine_Stats.prototype.hidewindowe = function() {
    this.x = 1500;

};
Window_Heroine_Stats.prototype.showWindowe = function() {
    this.x = 1080;
    
};
Window_Heroine_Stats.prototype.colSpacing = function() {
    return 0;
};

Window_Heroine_Stats.prototype.refresh = function(name,arr) {
    ZF.EventDataManager.lustvar = arr[0];
    //console.log(arr[0])
    if(name=="Player"){
        this.draw_ui_player_stats(name,arr);
    }else if(name=="Kana"){
        this.draw_ui_slave_stats(name,arr);
    }else if(name=="Hana"){
        this.draw_ui_Barten_stats(name,arr);
    }else if(name=="Player2"){
        this.draw_ui_player2_stats(name,arr);
    }else if(name=="Lucie"){
        this.draw_ui_Lucie_stats(name,arr);
    }else if(name=="Maki"){
        this.draw_ui_maki_stats(name,arr);
    }else if(name=="Haru"){
        this.draw_ui_Barten_stats(name,arr);
    }else if(name=="Rika"){
        //230 love route 231 slave route
        if($gameSwitches.value(230)){
            //love
            this.draw_ui_LoveRoute(name,arr);
        }else if($gameSwitches.value(231)){
            //SlaveRout e
            this.draw_ui_slaveRoute(name,arr);
        }else{
            this.draw_ui(name,arr);
        }
        
    }else{
        this.draw_ui(name,arr);
    }
   
};

Window_Heroine_Stats.prototype.draw_ui_LoveRoute = function(name,arr) {
    this.hername = name;
    this.herlevel = $gameVariables.value(arr[3])+1;
    this.herpfp = name;
    this.lust = $gameVariables.value(arr[0]);
    this.trust = $gameVariables.value(arr[1]);
    if($gameVariables.value(arr[2])==0){
        this.ActorStatus = "Virgin";
    }else if($gameVariables.value(arr[2])==1){
        this.ActorStatus = "Deflowered";
    }else if($gameVariables.value(arr[2])==2){
        this.ActorStatus = "Broken";
    }else if($gameVariables.value(arr[2])==3){
        this.ActorStatus = "Pregnant";
    }else if($gameVariables.value(arr[2])==5){
        this.ActorStatus = "Mother";
    }
    const rect = this.itemLineRect(0);
    const x = rect.x-30;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 34;
    const zex = arr[4];
    this.changeTextColor(ColorManager.textColor(2));
    
    this.drawText(this.hername,x+118, y+4, width);
    this.changeTextColor(ColorManager.textColor(1));
    this.pfp.bitmap = ImageManager.loadBitmap("img/pictures/pfp/",this.hername+"_"+1);
    this.contents.fontSize = 16;
    this.drawText("Progress "+this.herlevel,x+118, y+42, width);
    this.contents.fontSize = 22;
    this.changeTextColor(ColorManager.textColor(10));
    this.changeTextColor(ColorManager.textColor(2));
    this.drawText("Love "+"",x+30, y+72, width);
    this.drawText("Preg Chance "+"",x+30, y+102, width);
    this.changeTextColor(ColorManager.textColor(0));
    this.drawText("30%",x+160, y+102, width);
    this.changeTextColor(ColorManager.textColor(4));
    this.drawText("Status ",x+30, y+132, width);
    for (let index = 0; index < 5; index++) {
        this.changeTextColor(ColorManager.textColor(10));
        if(this.lust>index)
        {
            this.drawText("♥",x+100+index*20, y+72, width);
        }else{
            this.drawText("♡",x+100+index*20, y+72, width);
        }  
        this.changeTextColor(ColorManager.textColor(0));
    }
    this.changeTextColor(ColorManager.textColor(27));
    
    this.drawText("            "+this.ActorStatus,x+30, y+132, width);
   
};
Window_Heroine_Stats.prototype.draw_ui_slaveRoute = function(name,arr) {
    this.hername = name;
    this.herlevel = $gameVariables.value(arr[3])+1;
    this.herpfp = name;
    this.lust = $gameVariables.value(arr[0]);
    this.trust = $gameVariables.value(arr[1]);
    if($gameVariables.value(arr[2])==0){
        this.ActorStatus = "Virgin";
    }else if($gameVariables.value(arr[2])==1){
        this.ActorStatus = "Deflowered";
    }else if($gameVariables.value(arr[2])==2){
        this.ActorStatus = "Broken";
    }else if($gameVariables.value(arr[2])==3){
        this.ActorStatus = "Pregnant";
    }
    const rect = this.itemLineRect(0);
    const x = rect.x-30;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 34;
    const zex = arr[4];
    this.changeTextColor(ColorManager.textColor(2));
    
    this.drawText(this.hername,x+118, y+4, width);
    this.changeTextColor(ColorManager.textColor(1));
    this.pfp.bitmap = ImageManager.loadBitmap("img/pictures/pfp/",this.hername+"_"+1);
    this.contents.fontSize = 16;
    this.drawText("Progress "+this.herlevel,x+118, y+42, width);
    this.contents.fontSize = 22;
    this.changeTextColor(ColorManager.textColor(10));
    this.changeTextColor(ColorManager.textColor(27));
    this.drawText("Obeidience "+"",x+30, y+72, width);
    this.drawText("Submissive "+"",x+30, y+102, width);
    this.changeTextColor(ColorManager.textColor(0));
    this.drawText(""+this.lust,x+150, y+72, width);
    this.drawText(""+this.lust,x+150, y+102, width);
    
    this.changeTextColor(ColorManager.textColor(4));
    this.drawText("Status ",x+30, y+132, width);
    this.changeTextColor(ColorManager.textColor(27));
    this.drawText("            "+this.ActorStatus,x+30, y+132, width);
    this.changeTextColor(ColorManager.textColor(10));
};
Window_Heroine_Stats.prototype.draw_ui = function(name,arr) {
    this.hername = name;
    this.herlevel = $gameVariables.value(arr[3])+1;
    this.herpfp = name;
    this.lust = $gameVariables.value(arr[0]);
    this.trust = $gameVariables.value(arr[1]);
    if($gameVariables.value(arr[2])==0){
        this.ActorStatus = "Virgin";
    }else if($gameVariables.value(arr[2])==1){
        this.ActorStatus = "Deflowered";
    }else if($gameVariables.value(arr[2])==2){
        this.ActorStatus = "Broken";
    }else if($gameVariables.value(arr[2])==3){
        this.ActorStatus = "Pregnant";
    }
    //console.log(arr,arr[4]);
    //this.ActorStatus = $gameVariables.value(arr[2]);
    //this.affection = $gameVariables.value(arr[2]);
    const rect = this.itemLineRect(0);
    const x = rect.x-30;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 34;
    const zex = arr[4];
   // if(arr[4]){
    this.changeTextColor(ColorManager.textColor(2));
//    / }
    
    this.drawText(this.hername,x+118, y+4, width);
    this.changeTextColor(ColorManager.textColor(1));
   // this.pfp.bitmap = ImageManager.loadBitmap("img/pictures/pfp/",this.hername+"_"+this.herlevel);
    this.pfp.bitmap = ImageManager.loadBitmap("img/pictures/pfp/",this.hername+"_"+1);
    //this.pfp.scale.x = this.pfp.scale.y = 2
    this.contents.fontSize = 16;
    this.drawText("Progress "+this.herlevel,x+118, y+42, width);
    this.contents.fontSize = 22;
    this.changeTextColor(ColorManager.textColor(10));
    if(name=="Rei"||name == "Olivia"||name == "Kaori")
    {
        this.drawText("Love ",x+30, y+72, width);
    }else{
        this.drawText("Lust ",x+30, y+72, width);
    }
    
    this.changeTextColor(ColorManager.textColor(3));
    this.drawText("Trust ",x+30, y+102, width);
    this.changeTextColor(ColorManager.textColor(4));
    this.drawText("Status ",x+30, y+132, width);
    this.changeTextColor(ColorManager.textColor(27));
    this.drawText("            "+this.ActorStatus,x+30, y+132, width);
    this.changeTextColor(ColorManager.textColor(10));
    //this.changeTextColor(ColorManager.textColor(23));
    //this.drawText("Trust ",x+30, y+132, width);
    for (let index = 0; index < 5; index++) {
        this.changeTextColor(ColorManager.textColor(10));
        if(this.lust>index)
        {
            this.drawText("♥",x+100+index*20, y+72, width);
        }else{
            this.drawText("♡",x+100+index*20, y+72, width);
        }  
        this.changeTextColor(ColorManager.textColor(3));
        if(this.trust>index)
        {
            this.drawText("♥",x+100+index*20, y+102, width);
        }else{
            this.drawText("♡",x+100+index*20, y+102, width);
        } 
        this.changeTextColor(ColorManager.textColor(0));
        // if(this.trust>index)
        // {
        //     this.drawText("♥",x+100+index*20, y+132, width);
        // }else{
        //     this.drawText("♡",x+100+index*20, y+132, width);
        // }  
    }
   // this.drawText(this.lust,x, y+52, width);
};
Window_Heroine_Stats.prototype.draw_ui_player_stats = function(name,arr) {
    this.hername = name;
    this.herlevel = $gameVariables.value(arr[3])+1;
    this.herpfp = name;
    this.charm = 0;
    this.lust = $gameVariables.value(arr[0]);
    this.trust = $gameVariables.value(arr[1]);
    this.charm = $gameVariables.value(arr[2]);
    //this.affection = $gameVariables.value(arr[2]);
    const rect = this.itemLineRect(0);
    const x = rect.x-30;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 34;
    this.changeTextColor(ColorManager.textColor(14));
    this.drawText(ZF.EventDataManager.PlayerName,x+118, y+4, width);
    this.pfp.bitmap = ImageManager.loadBitmap("img/pictures/pfp/",this.hername+"_"+1);
    //this.pfp.scale.x = this.pfp.scale.y = 2
    this.contents.fontSize = 16;
    this.drawText("Level "+this.herlevel,x+118, y+42, width);
    this.contents.fontSize = 20;
    this.changeTextColor(ColorManager.textColor(2));
    this.drawText("Str ",x+30, y+72, width);
    this.changeTextColor(ColorManager.textColor(4));
    this.drawText("Int ",x+30, y+92, width);
    this.changeTextColor(ColorManager.textColor(24));
    this.drawText("Charm ",x+30, y+112, width);
    //this.drawText("Trust ",x+30, y+132, width);
    for (let index = 0; index < 5; index++) {
        this.changeTextColor(ColorManager.textColor(2));
        if(this.lust>index)
        {
            this.drawText("♦",x+100+index*20, y+72, width);
        }else{
            this.drawText("♢",x+100+index*20, y+72, width);
        }  
        this.changeTextColor(ColorManager.textColor(4));
        if(this.trust>index)
        {
            this.drawText("♦",x+100+index*20, y+92, width);
        }else{
            this.drawText("♢",x+100+index*20, y+92, width);
        } 
        this.changeTextColor(ColorManager.textColor(24));
        if(this.charm>index)
        {
            this.drawText("♦",x+100+index*20, y+112, width);
        }else{
            this.drawText("♢",x+100+index*20, y+112, width);
        } 
        this.changeTextColor(ColorManager.textColor(0));
        // if(this.trust>index)
        // {
        //     this.drawText("♥",x+100+index*20, y+132, width);
        // }else{
        //     this.drawText("♡",x+100+index*20, y+132, width);
        // }  
    }
    var maxStamina = $gameVariables.value(99);
    if(maxStamina==0){
        $gameVariables.setValue(99,206)
    }
    this.changeTextColor(ColorManager.textColor(12));
    this.drawText("M.Stamina    "+maxStamina,x+30, y+132, width);

   // this.drawText(this.lust,x, y+52, width);
};
Window_Heroine_Stats.prototype.draw_ui_player2_stats = function(name,arr) {
    this.hername = name;
    this.herlevel = $gameVariables.value(arr[3])+1;
    this.herpfp = name;
    this.charm = 0;
    this.lust = $gameVariables.value(arr[0]);
    this.trust = $gameVariables.value(arr[1]);
    this.charm = $gameVariables.value(arr[2]);
    var status = "";
    if(this.charm==0){
        status = "Hopeful"
    }
    else if(this.charm==1){
        status = "Angry"
    }else if(this.charm==2){
        status = "Depressed"
    }else if(this.charm>=3){
        status = "Broken"
    }
    
    
    //this.affection = $gameVariables.value(arr[2]);
    const rect = this.itemLineRect(0);
    const x = rect.x-30;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 34;
    this.changeTextColor(ColorManager.textColor(14));
    this.drawText(ZF.EventDataManager.PlayerName2,x+118, y+4, width);
    this.pfp.bitmap = ImageManager.loadBitmap("img/pictures/pfp/",this.hername+"_"+1);
    //this.pfp.scale.x = this.pfp.scale.y = 2
    this.contents.fontSize = 16;
    this.drawText("Progress "+this.herlevel+"%",x+118, y+42, width);
    this.contents.fontSize = 24;
    this.changeTextColor(ColorManager.textColor(2));
    this.drawText("Str ",x+30, y+76, width);
    this.changeTextColor(ColorManager.textColor(17));
    this.drawText("Goal     " + this.trust+"G",x+30, y+102, width);
    this.changeTextColor(ColorManager.textColor(24));
    this.drawText("Status  "+status,x+30, y+132, width);
    //this.drawText("Trust ",x+30, y+132, width);
    for (let index = 0; index < 5; index++) {
        this.changeTextColor(ColorManager.textColor(2));
        if(this.lust>index)
        {
            this.drawText("♦",x+100+index*20, y+76, width);
        }else{
            this.drawText("♢",x+100+index*20, y+76, width);
        }  
       
    }
    var maxStamina = $gameVariables.value(99);
    if(maxStamina==0){
        $gameVariables.setValue(99,206)
    }
   // this.drawText(this.lust,x, y+52, width);
};
Window_Heroine_Stats.prototype.draw_ui_slave_stats = function(name,arr) {
    this.hername = name;
    this.herlevel = $gameVariables.value(arr[3])+1;
    this.herpfp = name;
    this.charm = 0;
    this.lust = $gameVariables.value(arr[0]);
    this.trust = $gameVariables.value(arr[1]);
    this.ActorGold = $gameVariables.value(arr[2]);
    //this.affection = $gameVariables.value(arr[2]);
    const rect = this.itemLineRect(0);
    const x = rect.x-30;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 34;
    this.drawText(this.hername,x+118, y+4, width);
    this.pfp.bitmap = ImageManager.loadBitmap("img/pictures/pfp/",this.hername+"_"+this.herlevel);
    //this.pfp.scale.x = this.pfp.scale.y = 2
    this.contents.fontSize = 16;
    this.drawText("Progress "+this.herlevel+"%",x+118, y+42, width);
    this.contents.fontSize = 15;
    this.drawText("Obedience ",x+30, y+72, width);
    this.drawText("Dominance ",x+30, y+102, width);
    this.drawText("Trust ",x+30, y+132, width);
    //this.drawText("Trust ",x+30, y+132, width);
    for (let index = 0; index < 3; index++) {
        if(this.lust>index)
        {
            this.drawText("♦",x+100+index*20, y+72, width);
        }else{
            this.drawText("♢",x+100+index*20, y+72, width);
        }  
        if(this.trust>index)
        {
            this.drawText("♦",x+100+index*20, y+102, width);
        }else{
            this.drawText("♢",x+100+index*20, y+102, width);
        } 
        if(this.charm>index)
        {
            this.drawText("♦",x+100+index*20, y+132, width);
        }else{
            this.drawText("♢",x+100+index*20, y+132, width);
        } 
        // if(this.trust>index)
        // {
        //     this.drawText("♥",x+100+index*20, y+132, width);
        // }else{
        //     this.drawText("♡",x+100+index*20, y+132, width);
        // }  
    }
   // this.drawText(this.lust,x, y+52, width);
};
Window_Heroine_Stats.prototype.draw_ui_maki_stats = function(name,arr) {
    this.hername = name;
    this.herlevel = $gameVariables.value(arr[3])+1;
    this.herpfp = name;
    this.lust = $gameVariables.value(arr[0]);
    this.trust = $gameVariables.value(arr[1]);
    if($gameVariables.value(arr[2])==0){
        this.ActorStatus = "Virgin";
    }else if($gameVariables.value(arr[2])==1){
        this.ActorStatus = "Deflowered";
    }else if($gameVariables.value(arr[2])==2){
        this.ActorStatus = "Broken";
    }else if($gameVariables.value(arr[2])==3){
        this.ActorStatus = "Pregnant";
    }
    //console.log(arr,arr[4]);
    //this.ActorStatus = $gameVariables.value(arr[2]);
    //this.affection = $gameVariables.value(arr[2]);
    const rect = this.itemLineRect(0);
    const x = rect.x-30;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 34;
    const zex = arr[4];
   // if(arr[4]){
    this.changeTextColor(ColorManager.textColor(2));
//    / }
    
    this.drawText(this.hername,x+118, y+4, width);
    this.changeTextColor(ColorManager.textColor(1));
   // this.pfp.bitmap = ImageManager.loadBitmap("img/pictures/pfp/",this.hername+"_"+this.herlevel);
    this.pfp.bitmap = ImageManager.loadBitmap("img/pictures/pfp/",this.hername+"_"+1);
    //this.pfp.scale.x = this.pfp.scale.y = 2
    this.contents.fontSize = 16;
    this.drawText("Progress "+this.herlevel,x+118, y+42, width);
    this.contents.fontSize = 16;
    this.changeTextColor(ColorManager.textColor(10));
    this.drawText("Obedience ",x+30, y+66, width);
    this.changeTextColor(ColorManager.textColor(3));
    this.drawText("Training ",x+30, y+86, width);
    this.changeTextColor(ColorManager.textColor(4));
    this.drawText("Status ",x+30, y+108, width);
    this.changeTextColor(ColorManager.textColor(17));
    this.drawText("Control :    "+$gameVariables.value(arr[4]),x+30, y+132, width);
    this.changeTextColor(ColorManager.textColor(1));
    this.changeTextColor(ColorManager.textColor(27));
    this.drawText("            "+this.ActorStatus,x+30, y+108, width);
    this.changeTextColor(ColorManager.textColor(10));
    //this.changeTextColor(ColorManager.textColor(23));
    //this.drawText("Trust ",x+30, y+132, width);
    for (let index = 0; index < 5; index++) {
        this.changeTextColor(ColorManager.textColor(10));
        if(this.lust>index)
        {
            this.drawText("♥",x+110+index*20, y+66, width);
        }else{
            this.drawText("♡",x+110+index*20, y+66, width);
        }  
        this.changeTextColor(ColorManager.textColor(3));
        if(this.trust>index)
        {
            this.drawText("♥",x+110+index*20, y+86, width);
        }else{
            this.drawText("♡",x+110+index*20, y+86, width);
        } 
        this.changeTextColor(ColorManager.textColor(0));
        // if(this.trust>index)
        // {
        //     this.drawText("♥",x+100+index*20, y+132, width);
        // }else{
        //     this.drawText("♡",x+100+index*20, y+132, width);
        // }  
    }
   // this.drawText(this.lust,x, y+52, width);
};
Window_Heroine_Stats.prototype.draw_ui_Barten_stats = function(name,arr) {
    this.hername = name;
    this.herlevel = $gameVariables.value(arr[3])+1;
    this.herpfp = name;
    this.lust = $gameVariables.value(arr[0]);
    this.trust = $gameVariables.value(arr[1]);
    if($gameVariables.value(arr[2])==0){
        this.ActorStatus = "Virgin";
    }else if($gameVariables.value(arr[2])==1){
        this.ActorStatus = "Deflowered";
    }else if($gameVariables.value(arr[2])==2){
        this.ActorStatus = "Broken";
    }else if($gameVariables.value(arr[2])==3){
        this.ActorStatus = "Pregnant";
    }
    //console.log(arr,arr[4]);
    //this.ActorStatus = $gameVariables.value(arr[2]);
    //this.affection = $gameVariables.value(arr[2]);
    const rect = this.itemLineRect(0);
    const x = rect.x-30;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 34;
    const zex = arr[4];
   // if(arr[4]){
    this.changeTextColor(ColorManager.textColor(2));
//    / }
    
    this.drawText(this.hername,x+118, y+4, width);
    this.changeTextColor(ColorManager.textColor(1));
   // this.pfp.bitmap = ImageManager.loadBitmap("img/pictures/pfp/",this.hername+"_"+this.herlevel);
    this.pfp.bitmap = ImageManager.loadBitmap("img/pictures/pfp/",this.hername+"_"+1);
    //this.pfp.scale.x = this.pfp.scale.y = 2
    this.contents.fontSize = 16;
    this.drawText("Progress "+this.herlevel,x+118, y+42, width);
    this.contents.fontSize = 20;
    this.changeTextColor(ColorManager.textColor(10));
    this.drawText("Lust ",x+30, y+66, width);
    this.changeTextColor(ColorManager.textColor(3));
    this.drawText("Trust ",x+30, y+86, width);
    this.changeTextColor(ColorManager.textColor(4));
    this.drawText("Status ",x+30, y+108, width);
    this.changeTextColor(ColorManager.textColor(17));
    this.drawText("Gold :    "+$gameVariables.value(arr[4]),x+30, y+132, width);
    this.changeTextColor(ColorManager.textColor(1));
    this.changeTextColor(ColorManager.textColor(27));
    this.drawText("            "+this.ActorStatus,x+30, y+108, width);
    this.changeTextColor(ColorManager.textColor(10));
    //this.changeTextColor(ColorManager.textColor(23));
    //this.drawText("Trust ",x+30, y+132, width);
    for (let index = 0; index < 5; index++) {
        this.changeTextColor(ColorManager.textColor(10));
        if(this.lust>index)
        {
            this.drawText("♥",x+100+index*20, y+66, width);
        }else{
            this.drawText("♡",x+100+index*20, y+66, width);
        }  
        this.changeTextColor(ColorManager.textColor(3));
        if(this.trust>index)
        {
            this.drawText("♥",x+100+index*20, y+86, width);
        }else{
            this.drawText("♡",x+100+index*20, y+86, width);
        } 
        this.changeTextColor(ColorManager.textColor(0));
        // if(this.trust>index)
        // {
        //     this.drawText("♥",x+100+index*20, y+132, width);
        // }else{
        //     this.drawText("♡",x+100+index*20, y+132, width);
        // }  
    }
   // this.drawText(this.lust,x, y+52, width);
};
Window_Heroine_Stats.prototype.draw_ui_Lucie_stats = function(name,arr) {
    this.hername = name;
    this.herlevel = "99+";//$gameVariables.value(arr[3])+1;
    this.herpfp = name;
    this.lust = $gameVariables.value(arr[0]);
    this.trust = $gameVariables.value(arr[1]);
    if($gameVariables.value(arr[1])==0){
        this.ActorStatus = "Virgin";
    }else if($gameVariables.value(arr[1])==1){
        this.ActorStatus = "Deflowered";
    }else if($gameVariables.value(arr[1])==2){
        this.ActorStatus = "Broken";
    }else if($gameVariables.value(arr[1])>=3){
        this.ActorStatus = "Pregnant";
    }
    //console.log(arr,arr[4]);
    //this.ActorStatus = $gameVariables.value(arr[2]);
    //this.affection = $gameVariables.value(arr[2]);
    const rect = this.itemLineRect(0);
    const x = rect.x-30;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 34;
    const zex = arr[4];
   // if(arr[4]){
    this.changeTextColor(ColorManager.textColor(2));
//    / }
    
    this.drawText(this.hername,x+118, y+4, width);
    this.changeTextColor(ColorManager.textColor(1));
    this.pfp.bitmap = ImageManager.loadBitmap("img/pictures/pfp/",this.hername+"_"+1);
    this.contents.fontSize = 16;
    this.drawText("Progress "+this.herlevel,x+108, y+42, width);
    this.contents.fontSize = 24;
    this.changeTextColor(ColorManager.textColor(27));
    this.drawText("Love ",x+30, y+76, width);
    this.changeTextColor(ColorManager.textColor(4));
    this.contents.fontSize = 18;
    this.drawText("Status ",x+30, y+128, width);
    this.changeTextColor(ColorManager.textColor(31));
    this.drawText("Magic     "+$gameVariables.value(arr[2]),x+30, y+102, width);
    this.changeTextColor(ColorManager.textColor(2));
    this.drawText("            "+this.ActorStatus,x+30, y+128, width);
    this.changeTextColor(ColorManager.textColor(10));
    //this.changeTextColor(ColorManager.textColor(23));
    //this.drawText("Trust ",x+30, y+132, width);
    for (let index = 0; index < 5; index++) {
        this.changeTextColor(ColorManager.textColor(10));
        if(this.lust>index)
        {
            this.drawText("♥",x+100+index*20, y+76, width);
        }else{
            this.drawText("♡",x+100+index*20, y+76, width);
        }  
        
        this.changeTextColor(ColorManager.textColor(0));
        // if(this.trust>index)
        // {
        //     this.drawText("♥",x+100+index*20, y+132, width);
        // }else{
        //     this.drawText("♡",x+100+index*20, y+132, width);
        // }  
    }
   // this.drawText(this.lust,x, y+52, width);
};


Window_Heroine_Stats.prototype.value = function() {
    return $gameParty.gold();
};

Window_Heroine_Stats.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_Heroine_Stats.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};



//-----------------------------------------------------------------------------
// Window_DateAndPhase
//
// The window for displaying the party's gold.

function Window_DateAndPhase() {
    this.initialize(...arguments);
}

Window_DateAndPhase.prototype = Object.create(Window_Selectable.prototype);
Window_DateAndPhase.prototype.constructor = Window_DateAndPhase;

Window_DateAndPhase.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.dayphase = $gameVariables.value(12);
    this.daycount = $gameVariables.value(13);
    this.pfp = new Sprite(ImageManager.loadBitmap("img/pictures/pfp/",this.femaleface));
    this.pfp.x = 20 
    //this.addChild(this.pfp);
    this.refresh();
    
};
Window_DateAndPhase.prototype.hidewindowe = function() {
    this.x = -300;

};
Window_DateAndPhase.prototype.showWindowe = function() {
    this.x = 0;
    
};
Window_DateAndPhase.prototype.colSpacing = function() {
    return 0;
};

Window_DateAndPhase.prototype.refresh = function() {
   this.draw_ui();
};

Window_DateAndPhase.prototype.draw_ui = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    var daystr = "SUN";
    this.dayphase = $gameVariables.value(12);
    this.daycount = $gameVariables.value(13);
    this.contents.clear();
    this.contents.fontSize = 24;
    this.changeTextColor(ColorManager.textColor(9));
    if(this.daycount%7==0){
        daystr = "SUN";
        this.changeTextColor(ColorManager.textColor(14));
    }else if(this.daycount%7==1){
        daystr = "MON";
    }else if(this.daycount%7==2){
        daystr = "TUE";
    }else if(this.daycount%7==3){
        daystr = "WED";
    }else if(this.daycount%7==4){
        daystr = "THU";
    }else if(this.daycount%7==5){
        daystr = "FRI";
    }else if(this.daycount%7==6){
        daystr = "SAT";
        this.changeTextColor(ColorManager.textColor(14));
    }
    this.drawText(daystr,x, y-10, width);
    this.changeTextColor(ColorManager.textColor(0));
    this.drawText("- Day "+this.daycount,x+50, y-10, width);
    this.changeTextColor(ColorManager.textColor(23));
    for (let index = 0; index < 4; index++) {
        if(this.dayphase>index)
        {
            this.drawText("▰",x+index*25, y+25, width);
        }else{
            this.drawText("▱",x+index*25, y+25, width);
        }  
    }
    this.contents.fontSize = 45;
    this.changeTextColor(ColorManager.textColor(14));
    if(this.dayphase == 1)
    {
        this.drawText("☄",x+100, y+20, width);

    }else if(this.dayphase == 2)
    {
        this.drawText("☀",x+100, y+20, width);
    }else if(this.dayphase == 3)
    {
        this.drawText("☁",x+100, y+20, width);
    }else if(this.dayphase == 4){
        
        this.drawText("☾",x+100, y+20, width);
    }
    
    
   // this.drawText(this.lust,x, y+52, width);
};

Window_DateAndPhase.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_DateAndPhase.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};


function Window_companion() {
    this.initialize(...arguments);
}

Window_companion.prototype = Object.create(Window_Selectable.prototype);
Window_companion.prototype.constructor = Window_companion;

Window_companion.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.dayphase = $gameVariables.value(12);
    this.daycount = $gameVariables.value(13);
    this.femaleface = ZF.EventDataManager.companionList[$gameVariables.value(102)];
    if($gameVariables.value(102)==0)
    {   
        this.pfp = new Sprite_Companion(ImageManager.loadBitmap("img/pictures/pfp/",'Rika_1'));
        this.pfp.visible = false;
        
    }else
    {
        this.pfp = new Sprite_Companion(ImageManager.loadBitmap("img/pictures/pfp/",this.femaleface));
        this.pfp.visible = true;
    }
    
    this.pfp.y -= 5
    this.pfp.x -= 5 
    this.commoneventIDtoTrigger = 0;
    this.addChild(this.pfp);
    this.refresh();

    
};
Window_companion.prototype.hidewindowe = function() {
    this.x = -300;

};
Window_companion.prototype.showWindowe = function() {
    this.x = 0;
    
};
Window_companion.prototype.colSpacing = function() {
    return 0;
};

Window_companion.prototype.refresh = function() {
    this.femaleface = ZF.EventDataManager.companionList[$gameVariables.value(102)];
    // 
    if($gameVariables.value(102)==0)
    {   

        this.pfp.bitmap = ImageManager.loadBitmap("img/pictures/pfp/",'Rika_1');
        this.pfp.visible = false;
        this.isUsable = false;
    }else
    {
        this.pfp.bitmap = ImageManager.loadBitmap("img/pictures/pfp/",this.femaleface);
        this.pfp.visible = true;
        this.pfp.setColorTone([0,0,0,222]);
        this.isUsable = false;
      //  console.log(ZF.EventDataManager.lustvar);
        if($gameVariables.value(102)==2){ //Hana
                this.pfp.setColorTone([0,0,0,0]);  
                if($gameMap._mapId==20){
                    this.isUsable = true;
                    //$gameTemp.reserveCommonEvent(306); //Rika-HanaEvent
                    this.commoneventIDtoTrigger = 306;
                }else if($gameMap._mapId==23){
                    this.isUsable = true;
                    this.commoneventIDtoTrigger = 307;
                }else if($gameMap._mapId==13){
                    this.isUsable = true;
                    this.commoneventIDtoTrigger = 309;
                }else{
                    this.pfp.setColorTone([0,0,0,222]);  
                }
        }
        if($gameVariables.value(102)==1){  //Rika
                this.pfp.setColorTone([0,0,0,0]); 
                if($gameMap._mapId==22){
                    this.isUsable = true;
                    //$gameTemp.reserveCommonEvent(306); //Rika-HanaEvent
                    this.commoneventIDtoTrigger = 306;
                }else if($gameMap._mapId==13){
                    this.isUsable = true;
                    this.commoneventIDtoTrigger = 308;
                }else if($gameMap._mapId==35){
                    this.isUsable = true;
                    this.commoneventIDtoTrigger = 313;
                }else if($gameMap._mapId==48){
                    this.isUsable = true;
                    this.commoneventIDtoTrigger = 410;
                }else{
                    this.pfp.setColorTone([0,0,0,222]);  
                }
        }
        if($gameVariables.value(102)==3){ //Lucie
            this.pfp.setColorTone([0,0,0,0]); 
            if($gameMap._mapId==22){
                this.isUsable = true;
                //$gameTemp.reserveCommonEvent(306); 
                this.commoneventIDtoTrigger = 307;
            }else if($gameMap._mapId==13){
                this.isUsable = true;
                this.commoneventIDtoTrigger = 310;
            }else{
                this.pfp.setColorTone([0,0,0,222]);  
            }
        }
        if($gameVariables.value(102)==4){ //Mio
            this.pfp.setColorTone([0,0,0,0]); 
            if($gameMap._mapId==13){
                this.isUsable = true;
                this.commoneventIDtoTrigger = 311;
            }else{
                this.pfp.setColorTone([0,0,0,222]);  
            }
        }
        

        // ['Null','Rika_1','Hana_1','Lucie_1','Mio_1','Marie_1']
  
    }
};

Window_companion.prototype.draw_ui = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    
  
};
Window_companion.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};




//-----------------------------------------------------------------------------
// Window_CGAnimControl
//
// The window for displaying the party's gold.

function Window_CGAnimControl() {
    this.initialize(...arguments);
}

Window_CGAnimControl.prototype = Object.create(Window_Selectable.prototype);
Window_CGAnimControl.prototype.constructor = Window_CGAnimControl;

Window_CGAnimControl.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.dayphase = 4;
    this.daycount = 25;
    var yoff = 105;
    var x = 35;
    this._lvl1 = new Sprite_Animcontrol(ImageManager.loadBitmap("img/pictures/AnimController/","Lvl1"),x,90,1,1,3);
    this._lvl2 = new Sprite_Animcontrol(ImageManager.loadBitmap("img/pictures/AnimController/","Lvl2"),x,90+yoff,1,1,2);
    this._lvl3 = new Sprite_Animcontrol(ImageManager.loadBitmap("img/pictures/AnimController/","Lvl3"),x,90+yoff*2,1,1,1);
    this._cumim = new Sprite_Animcontrol(ImageManager.loadBitmap("img/pictures/AnimController/","Cum"),x,90+yoff*3,0.6,0.6);
    this._cumim.anchor.x= -0.3; 
    
    this.addChild(this._lvl1);
    this.addChild(this._lvl2);
    this.addChild(this._lvl3);
    this.addChild(this._cumim);
    
    this.refresh();
    
};

Window_CGAnimControl.prototype.colSpacing = function() {
    return 0;
};

Window_CGAnimControl.prototype.refresh = function() {
   this.draw_ui();
};

Window_CGAnimControl.prototype.draw_ui = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.contents.fontSize = 24;
    this.changeTextColor(ColorManager.textColor(0));
    this.drawText("Day "+this.daycount,x+8, y-10, width);
    this.changeTextColor(ColorManager.textColor(23));
    for (let index = 0; index < 4; index++) {
        if(this.dayphase>index)
        {
            this.drawText("▰",x+index*25, y+92, width);
        }else{
            this.drawText("▱",x+index*25, y+92, width);
        }  
    }
    this.contents.fontSize = 74;
    this.changeTextColor(ColorManager.textColor(14));
    if(this.dayphase == 1)
    {
        this.drawText("☄",x+100, y+44, width);

    }else if(this.dayphase == 2)
    {
        this.drawText("☀",x+100, y+44, width);
    }else if(this.dayphase == 3)
    {
        this.drawText("☁",x+100, y+44, width);
    }else if(this.dayphase == 4){
        
        this.drawText("☾",x+100, y+44, width);
    }
    
    
   // this.drawText(this.lust,x, y+52, width);
};

Window_CGAnimControl.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_CGAnimControl.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};



function Sprite_Animcontrol() {
    this.initialize.apply(this, arguments);
}

Sprite_Animcontrol.prototype = Object.create(Sprite.prototype);
Sprite_Animcontrol.constructor = Sprite_Animcontrol;

Sprite_Animcontrol.prototype.initialize = function (bitmap,x,y,scx,scy,speed){

    Sprite.prototype.initialize.call(this, bitmap);
   this.x = x;
   this.y = y;
   this.scale.x = scx;
   this.scale.y = scy;
   this.commscale = scx;
}


Sprite_Animcontrol.prototype.update = function(){

 Sprite.prototype.update.call(this);
   this.onClick();
}

Sprite_Animcontrol.prototype.onClick = function(){
    
    if(OrangeMouseData.mouseX>this.x&&OrangeMouseData.mouseX<this.width){
        this.scale.x = this.scale.y =1.1*this.commscale;
      //  console.log("SSS")
    }else{
        this.scale.x = this.scale.y =1*this.commscale;
    }
    
  };


const alias_Sprite_Picture_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
    if(SceneManager._scene.constructor.name!="Scene_Map"){
        return;
    }
     alias_Sprite_Picture_update.call(this);
     if(this._hovered&&this._pictureName.includes('$')){
        this.makeMousePointer();
     }
     if(this._pictureName.includes('%')){
        this.setColorTone($gameScreen._tone);
     }
     
     
};

Sprite_Picture.prototype.makeMousePointer = function() {
    
    var mapNameSprite = this._pictureName;
    if(mapNameSprite==ZF.gaugeSceneMap._mousePointerWindow._previousImageName)
    {return;}
    mapNameSprite = mapNameSprite.substring(mapNameSprite.indexOf('$') + 1);
    ZF.gaugeSceneMap._mousePointerWindow.drawName(mapNameSprite,this);
   // console.log("Yaoo");

};








function Window_SpecialSkills() {
    this.initialize(...arguments);
}

Window_SpecialSkills.prototype = Object.create(Window_Selectable.prototype);
Window_SpecialSkills.prototype.constructor = Window_SpecialSkills;

Window_SpecialSkills.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.dayphase = $gameVariables.value(12);
    this.daycount = $gameVariables.value(13);
    this._skills = [];
    this.femaleface = ZF.EventDataManager.companionList[$gameVariables.value(115)];//0 X-ray 1- Lust Spells 2- Exploration 3- 
    for (let index = 0; index < 5; index++) {
        this._skills[index] = new Sprite_PlayerSkill(ImageManager.loadBitmap("img/pictures/SpecialSkills/",'Skill'+(index+1)),index);
        this._skills[index].x+=12+index*58;
        this._skills[index].y+=8;
        this.addChild(this._skills[index]);
    }
   // this._skills[0] = new Sprite(ImageManager.loadBitmap("img/pictures/SpecialSkills/",'Skill1'));
    
    
    this.refresh();
    
};
Window_SpecialSkills.prototype.hidewindowe = function() {
    this.x = -300;

};
Window_SpecialSkills.prototype.showWindowe = function() {
    this.x = 0;
    
};
Window_SpecialSkills.prototype.colSpacing = function() {
    return 0;
};
Window_SpecialSkills.prototype.refreshSkillsunlocked = function() {
    for (let index = 0; index < 5; index++) {
        this._skills[index].checkifActive();
    }
};

Window_SpecialSkills.prototype.refresh = function() {
    
};

Window_SpecialSkills.prototype.draw_ui = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    
  
};
Window_SpecialSkills.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};


function Sprite_PlayerSkill() {

    this.initialize.apply(this, arguments);

}

Sprite_PlayerSkill.prototype = Object.create(Sprite.prototype);
Sprite_PlayerSkill.constructor = Sprite_PlayerSkill;

Sprite_PlayerSkill.prototype.initialize = function (bitmap,numb){

    Sprite.prototype.initialize.call(this, bitmap);
    //x-ray s
    this.indexe = numb;
   // console.log(this.indexe);
    this.setColorTone([0,0,0,222]);
    this.isUsable = false;
    this.checkifActive();
}
Sprite_PlayerSkill.prototype.checkifActive = function(){

    if(this.indexe==0&&$gameSwitches._data[82]){
        this.setColorTone([0,0,0,0]);
        this.isUsable = true;
        //console.log("Usable")
    }
    if(this.indexe==1&&$gameSwitches._data[85]){
        this.setColorTone([0,0,0,0]);
        this.isUsable = true;
        //console.log("Usable")
    }
}

Sprite_PlayerSkill.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if(!this.isUsable){
    return;
 }
 if($gameMap._interpreter.isRunning()||($gameMap._mapId==13&&$gameVariables.value(12)==4)){
  //  return;
 }
 if(TouchInput.x>this.x+this.parent.x&&TouchInput.x<this.x+this.width+this.parent.x&&TouchInput.y>this.y&&TouchInput.y<this.y+this.height){
    this.scale.x=this.scale.y = 1.05;
    this.setColorTone([22,22,100,0]);
    if(TouchInput.isTriggered()){
        if(this.indexe==0){ // XraySpecialSkill
            $gameTemp.reserveCommonEvent(253);
        }
        if(this.indexe==1){ // MusicNoteSkill
            $gameTemp.reserveCommonEvent(254);
        }
        
        this.scale.x=this.scale.y = 1;
        
    }

}else if(this.scale.y!=1){
    this.scale.x=this.scale.y = 1;
    this.setColorTone([0,0,0,50]);
    
    

    }
}


function Sprite_Companion() {

    this.initialize.apply(this, arguments);

}

Sprite_Companion.prototype = Object.create(Sprite.prototype);
Sprite_Companion.constructor = Sprite_Companion;

Sprite_Companion.prototype.initialize = function (bitmap){

    Sprite.prototype.initialize.call(this, bitmap);
}

Sprite_Companion.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if(this.visible==false||this.parent.isUsable==false){
    return;
 }
 
 if($gameMap._interpreter.isRunning()){
    return;
 }

 if(TouchInput.x>this.x+this.parent.x&&TouchInput.x<this.x+this.width+this.parent.x&&TouchInput.y>this.y&&TouchInput.y<this.y+this.height){
    this.scale.x=this.scale.y = 1.05;
    this.setColorTone([22,22,100,0]);
    if(TouchInput.isTriggered()){
        $gameTemp.reserveCommonEvent(this.parent.commoneventIDtoTrigger);
        this.setColorTone([0,0,0,0]);
        this.scale.x=this.scale.y = 1;
        
    }

}else if(this.scale.y!=1){
    this.scale.x=this.scale.y = 1;
    this.setColorTone([0,0,0,50]);
}
}