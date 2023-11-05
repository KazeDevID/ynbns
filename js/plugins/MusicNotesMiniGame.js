
/*=============================================================================
 * Slot Machine Game
 * By Hex - www.fiverr.com/hex_fvx
 * MusicNotesMiniGame.js
 * Version: 1.0
 * Free for commercial and non commercial use.
 *=============================================================================*/
 /*:
 * @plugindesc Music matching Game MiniGame.
 *             
 * @author Hex
 *
 * @help Make A Music Game
 * 
 * Script call to open music Matching Game - SceneManager.push(Scene_MusicMatching);
 * 
 * script calls:
 * 
 * Zf.musicMatching.MainNotes = [[1,2,4,5,6,2],[1,2,5,6,1,2],[2,5,6,1,2,1]];
 * Each array inside the array is a song.
 * keys upto 6 relating to the image files in the folder.
 * 
 * Zf.musicMatching.switchIDs = [41,42,43];
 * Swith relating to the songs. check from index 0 in MainNotes array;
 * 
 * Zf.musicMatching.soundEffects = ["Chime1","Coin","Bow1","Bow2","Bow3","Bow4"];
 * 
 * Sound effects relating to the keys from 1-6.
 * 
 * @param CommonEventID
 * @desc The Commone Event ID which is called at the end of Game.
 * @default 17
 * 
 * 
 * 
 * 
 */

 var Zf = Zf || {};
 Zf.musicMatching = {};
 //Zf.musicMatching.MainNotes = [[1,2,4,5,6,2],[1,2,5,6,1,2],[2,5,6,1,2,1]];
 Zf.musicMatching.currentSongIndex = 0;
 Zf.musicMatching.switchIDs = [41,42,43];
 Zf.musicMatching.soundEffects = ["Chime1","Coin","Bow1","Bow2","Bow3","Bow4"];
 Zf.musicMatching.Parameters = PluginManager.parameters('MusicNotesMiniGame');
 Zf.musicMatching.ceid = Number(Zf.musicMatching.Parameters["CommonEventID"]) || 17;
 Zf.musicMatching.soundEffect ="PianoMG" //"GlassScratch"//"Electrocardiogram"//Tunn
 Zf.musicMatching.learningsong = true;
 Zf.musicMatching.FreePlayMode = false;
 Zf.musicMatching.MainNotes = [[0,0,0,0,0,0],[1,2,5,6,1,2],[1,2,3,1,5,1]];
function Scene_MusicMatching() {
    this.initialize(...arguments);
}

Scene_MusicMatching.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MusicMatching.prototype.constructor = Scene_MusicMatching;

Scene_MusicMatching.prototype.initialize = function() {
    
    Scene_MenuBase.prototype.initialize.call(this);
    const key = 65;
    Input.keyMapper[key] = "A";
    this._closetimer = 60;
    this._startClosing = false;
    this.freeplaymodeOn = false;
    this.freeplaynote = 0;
    AudioManager.stopBgm ();
    
        
};
Scene_MusicMatching.prototype.closeinstrument = function() {
    this._startClosing = true;
    
}
Scene_MusicMatching.prototype.helpAreaHeight = function() {
    return 0;
};

Scene_MusicMatching.prototype.create = function() {
    
    Scene_MenuBase.prototype.create.call(this);
    this.musicNoteSprite = [];
    this.createBackgroundSprite();
    this.createforegroundsprites();
    this.createWindowLayer();

   
    


};



Scene_MusicMatching.prototype.update = function() {
    
    Scene_MenuBase.prototype.update.call(this);
    if(Input.isTriggered("cancel")){
        $gameTemp.reserveCommonEvent(Zf.musicMatching.ceid);
        Zf.musicMatching.FreePlayMode = false;
        SceneManager.pop();
    }
    if(this._startClosing ==true)
    {
        if(this._closetimer==0){
            this._closetimer = 0;
            $gameTemp.reserveCommonEvent(144);
            Zf.musicMatching.FreePlayMode = false;
            SceneManager.pop();

        }else{
            this._closetimer-=1;
        }
    }
    if(this.freeplaymodeOn == true){
        if(Input.isTriggered("left")){
            this.freeplaynote = 1;
        }
        else if(Input.isTriggered("right")){
            this.freeplaynote = 3;
        }
        else if(Input.isTriggered("up")){
            this.freeplaynote = 2;
        }
        else if(Input.isTriggered("down")){
            this.freeplaynote = 4;
        }else if(Input.isTriggered("A")){
            this.freeplaynote = 5;
        }else if(Input.isTriggered("ok")){
            this.freeplaynote = 6;
        }else{
            this.freeplaynote = 0;
        }
        if(this.freeplaynote==0)return;
        se = {name: "Key"+this.freeplaynote, volume: 100, pitch: 50, pan: 0};
        AudioManager.playSe(se);
        for (let index = 0; index < 6; index++) {
            if(!this.musicNoteSprite[index].noted){
                this.musicNoteSprite[index].addNote(this.freeplaynote);
               // index++;
                
            }
        }
    }
    
    
};
Scene_MusicMatching.prototype.computercardscalculator = function() {

    
        
}


Scene_MusicMatching.prototype.calresult = function() {
    
   
};


Scene_MusicMatching.prototype.confirmedfromplayer = function() {
   
   
};

Scene_MusicMatching.prototype.addCardinPlayerStack = function(cid) {
    
    
    
};
Scene_MusicMatching.prototype.addCardinComputerStack = function(cid) {
    
    
    //this._playerscorewin.reshuffle(totalsum);
    
};





Scene_MusicMatching.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    //this._statusWindow.refresh();
};


Scene_MusicMatching.prototype.resetnotes = function() {

    for (let index = 0; index < 6; index++) {
        this.musicNoteSprite[index].resetnote();
        
    }
    
    
   
};

Scene_MusicMatching.prototype.createforegroundsprites = function(){
    var x = 470;
    var y = 270;
    if(Zf.musicMatching.FreePlayMode == true){
        this.freeplaymodeOn = true;
        for (let index = 0; index < 6; index++) {
            var note = Zf.musicMatching.MainNotes[Zf.musicMatching.currentSongIndex][index];
            if(index<3){
                this.musicNoteSprite[index] = new Sprite_FreeStylemusicNotes(ImageManager.loadBitmap("img/pictures/MusicMiniGame/","Note_"+note),x+72*index,y+72*index,note,index);
            }else{
                this.musicNoteSprite[index] =  new Sprite_FreeStylemusicNotes(ImageManager.loadBitmap("img/pictures/MusicMiniGame/","Note_"+note),x+72*(index-3)+300,y+72*(index-3),note,index);
    
            }
            this.addChild(this.musicNoteSprite[index]);
        }
    }else{
        for (let index = 0; index < 6; index++) {
            var note = Zf.musicMatching.MainNotes[Zf.musicMatching.currentSongIndex][index];
            if(index<3){
                this.musicNoteSprite[index] = new Sprite_musicNotes(ImageManager.loadBitmap("img/pictures/MusicMiniGame/","Note_"+note),x+72*index,y+72*index,note,index);
            }else{
                this.musicNoteSprite[index] =  new Sprite_musicNotes(ImageManager.loadBitmap("img/pictures/MusicMiniGame/","Note_"+note),x+72*(index-3)+300,y+72*(index-3),note,index);
    
            }
            this.addChild(this.musicNoteSprite[index]);
            
        }
    }
    
    this.songnameText = new Sprite();
    this.songnameText.bitmap = new Bitmap(1280,624);
    this.songnameText.bitmap.fontSize = 72;
    this.songnameText.bitmap.fontFace = "alagard";
    this.songnameText.bitmap.textColor = ColorManager.textColor(3);
   // this.songnameText.bitmap.changeTextColor(ColorManager.textColor(10));
    this.songnameText.opacity = 255;
    if( Zf.musicMatching.FreePlayMode == true){
        this.songnameText.bitmap.textColor = ColorManager.textColor(17);
        this.songnameText.bitmap.drawText("Free Play Mode",60,90,Graphics.width,200,'center');
   
    }else{
        this.songnameText.bitmap.drawText("Song of Time",60,90,Graphics.width,200,'center');
   
    }
    this.addChild(this.songnameText);
    //this.songnameSprite = new Sprite();
    //this.songnameSprite.bitmap.drawText("Song of Lust",400,250,1280,720);
    //this.addChild(this.songnameSprite);
    this.enableTouchControls =  new Sprite_musicButtons(ImageManager.loadBitmap("img/pictures/MusicMiniGame/","touchEnable"));
    this.addChild(this.enableTouchControls);

}



Scene_MusicMatching.prototype.createBackgroundSprite = function() {
    this._bg = new Sprite(ImageManager.loadBitmap("img/pictures/MusicMiniGame/","Background"));
    this.addChild(this._bg);
    
    


    
  
};

Scene_MusicMatching.prototype.nextIndex = function(index) {
    if(index==5)
    {this.closeinstrument();
    return;}
    this.musicNoteSprite[index+1].active= true;
};




function Sprite_musicNotes() {

    this.initialize.apply(this, arguments);

}

Sprite_musicNotes.prototype = Object.create(Sprite.prototype);
Sprite_musicNotes.constructor = Sprite_musicNotes;

Sprite_musicNotes.prototype.initialize = function (bitmap,x,y,note,index){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = x;
    this.y = y;
    this.note = note;
    this.noteArrow = "up"
    if(note==1){
        this.noteArrow = "left";
    }
    
        if(note==2){
            this.noteArrow = "up";
        }
        if(note==3){
            this.noteArrow = "right";
        }
        if(note==4){
            this.noteArrow = "down";
        }
        if(note==5){
            this.noteArrow = "A";
        }
        if(note==6){
            this.noteArrow = "ok";
        }
    
   // this.prevnote = prevnote;
    console.log(this.prevnote);
    this.setColorTone([0,0,0,255]);
    this.noted=false;
    this.index = index;
    this.active = (index==0)?true:false;
    console.log(this.active);
    this.waitfr = 5;
    this.learningnote = Zf.musicMatching.learningsong;
    if(this.learningnote==false){
        this.bitmap = ImageManager.loadBitmap("img/pictures/MusicMiniGame/","EmptyNote")
    }

}
Sprite_musicNotes.prototype.resetnote = function(){
    if(this.learningnote){
        this.setColorTone([0,0,0,255]);
        this.noted=false;
        this.waitfr = 5;   
        this.active = (this.index==0)?true:false;
        this.scale.x = this.scale.y = 1;
    }else{
        this.bitmap = ImageManager.loadBitmap("img/pictures/MusicMiniGame/","EmptyNote")
        this.noted=false;
        this.waitfr = 5;   
        this.active = (this.index==0)?true:false;
        this.scale.x = this.scale.y = 1;
    }
    
}

Sprite_musicNotes.prototype.update = function(){

 Sprite.prototype.update.call(this);
    if(this.noted){
        return;
    }
    //if(!this.prevnote||this.prevnote.noted)
    if(this.active){
        if(this.waitfr>0){
            this.waitfr--;
            return;
        }
        if(Input.isTriggered(this.noteArrow)||this.parent.enableTouchControls.checktriggered(this.noteArrow) ){
            if(this.learningnote){
                this.setColorTone([0,0,0,0]);
                
            }else{
                this.setColorTone([0,0,0,0]);
               this.bitmap = ImageManager.loadBitmap("img/pictures/MusicMiniGame/","Note_"+this.note)
            }
            let se = {name: "Key1", volume: 100, pitch: 50, pan: -75};
          //  Zf.musicMatching.soundEffect = "PianoMG";
            if(this.note==1||this.note==0){
                se = {name: "Key1", volume: 100, pitch: 50, pan: -75};
            }if(this.note==2||this.note==0){
                se = {name: "Key2", volume: 100, pitch: 75, pan: 0};
            }if(this.note==3||this.note==0){
                se = {name: "Key3", volume: 100, pitch: 50, pan: 80};
            }if(this.note==4||this.note==0){
                se = {name:"Key4", volume: 100, pitch: 40, pan: 0};
            }if(this.note==5||this.note==0){
                se = {name: "Key5", volume: 100, pitch: 90, pan: 0};
            }
            if(this.note==6||this.note==0){
                se = {name: "Key6", volume: 100, pitch: 40, pan: 0};
            }
            AudioManager.playSe(se);
            this.noted=true;
            this.scale.x = this.scale.y = 1.06;
            SceneManager._scene.nextIndex(this.index);

            return;
        }else if(Input.isTriggered("left")||Input.isTriggered("right")||Input.isTriggered("up")||Input.isTriggered("down")||Input.isTriggered("ok")||Input.isTriggered("A")){
            if(this.note==0){
                
                return;
            }
            this.parentReset();
        }
         
       
    }
        


}

Sprite_musicNotes.prototype.parentReset = function(){
    console.log("Stupidshit",Input._latestButton,this.noteArrow);
    
    SceneManager._scene.resetnotes()
};

Sprite_musicNotes.prototype.currentIndex = function(){

};




function Sprite_musicButtons() {

    this.initialize.apply(this, arguments);

}

Sprite_musicButtons.prototype = Object.create(Sprite.prototype);
Sprite_musicButtons.constructor = Sprite_musicButtons;

Sprite_musicButtons.prototype.initialize = function (bitmap){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x  = 480;
    this.y = 550;
    this.spriteButton = [];
    this.triggerleft = false;
    this.triggerright = false;
    this.triggerup = false;
    this.triggerdown = false;
    this.triggerA = false;
    this.pressedtime = 5;
    this.triggerZ = false;
    this.dumx = 75;
    this.dumy = 0;
    for (let index = 1; index <= 6; index++) {
        this.spriteButton[index] = new Sprite(ImageManager.loadBitmap("img/pictures/MusicMiniGame/","Note_"+index));
        this.spriteButton[index].x = (index-1)*this.dumx;
        this.spriteButton[index].y +=50;
        this.addChild(this.spriteButton[index]);
    }

    
}
Sprite_musicButtons.prototype.checktriggered = function(noteArrow){
    if(noteArrow =="left"){
        return this.triggerleft;
    }else if(noteArrow =="right"){
        return this.triggerright;
    }else if(noteArrow =="up"){
        return this.triggerup;
    }else if(noteArrow =="down"){
        return this.triggerdown;
    }else if(noteArrow =="A"){
        return this.triggerA;
    }else if(noteArrow =="ok"){
        return this.triggerZ;
    }
}

Sprite_musicButtons.prototype.update = function(){

 Sprite.prototype.update.call(this);
 if(this.pressedtime<=0){
    this.triggerleft = false;
    this.triggerright = false;
    this.triggerup = false;
    this.triggerdown = false;
    this.triggerA = false;
    this.triggerZ = false;
    this.pressedtime = 0;
 }else{
    this.pressedtime--;
 }
 if(TouchInput.isTriggered()){
    for (let index = 1; index <= 6; index++) {
        //this.spriteButton[index] = new Sprite(ImageManager.loadBitmap("img/pictures/MusicMiniGame/","Note_"+index));
        if(TouchInput.x>this.x+this.spriteButton[index].x &&TouchInput.x<this.x+this.spriteButton[index].x+62 &&TouchInput.y>this.y+this.spriteButton[index].y&&TouchInput.y<this.y+62+this.spriteButton[index].y)
        {
            console.log("Index"+index);
            if(index==1){
                this.triggerleft = true;
                this.pressedtime = 5;
                break;
            }else if(index==2){ this.triggerup = true;
               this.pressedtime = 5; }
            else if(index==3){ this.triggerright = true;
               this.pressedtime = 5;
               break; }
            else if(index==4){ this.triggerdown = true;
                this.pressedtime = 5;
                break;}
            else if(index==5){ this.triggerA = true;
                this.pressedtime = 5;
                break;}
            else if(index==6){ this.triggerZ = true;
                this.pressedtime = 5;
                break;}

            
        }
    }
    
 }
       


}


function Sprite_FreeStylemusicNotes() {

    this.initialize.apply(this, arguments);

}

Sprite_FreeStylemusicNotes.prototype = Object.create(Sprite.prototype);
Sprite_FreeStylemusicNotes.constructor = Sprite_FreeStylemusicNotes;

Sprite_FreeStylemusicNotes.prototype.initialize = function (bitmap,x,y,note,index){

    Sprite.prototype.initialize.call(this, bitmap);
    this.x = x;
    this.y = y;
    this.noted = false;

}
Sprite_FreeStylemusicNotes.prototype.resetnote = function(){
    this.noted = false;
    this.scale.x = this.scale.y = 1;
}
Sprite_FreeStylemusicNotes.prototype.addNote = function(freeplaynote){
    console.log("Freeplau"+freeplaynote);
    this.bitmap = ImageManager.loadBitmap("img/pictures/MusicMiniGame/","Note_"+freeplaynote);
    
    //this.noted = true;
}

Sprite_FreeStylemusicNotes.prototype.update = function(){

 Sprite.prototype.update.call(this);
    
}