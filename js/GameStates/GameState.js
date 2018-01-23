var GameState = {
    
    create: function() {
        //background
        this.background = this.game.add.sprite(0,0,"background");
        this.background.inputEnabled = true;
        this.background.events.onInputDown.add(this.placeItem,this);
        
        //sound
        this.backgroundMusic = game.add.audio('bgMusic');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();
        
        //azharna el health and fun
        var style = {font:'15px Arial',fill:'#000'};
            
        this.healthBackground = this.game.add.sprite(55,50,"health");
        this.healthBackground.anchor.setTo(0.5);
        this.healthBackground.scale.setTo(0.5);
        this.healthText = this.game.add.text(55,50,'',style);
        this.healthText.anchor.setTo(0.5);
        
        this.funBackground = this.game.add.sprite(120,50,"fun");
        this.funBackground.anchor.setTo(0.5);
        this.funBackground.scale.setTo(0.2);
        this.funText = this.game.add.text(120,55,'',style);
        this.funText.anchor.setTo(0.5);
        
        //hotena kol el aklat 3al chacha
        this.candy = this.game.add.sprite(50,600,"candy");
        this.candy.customParams = {health:20}
        this.cacke = this.game.add.sprite(130,600,"cacke");
        this.cacke.customParams = {health:10 , fun:10}
        this.choco = this.game.add.sprite(220,600,"choco");
        this.choco.customParams = {health:-10,fun:-20};
        this.rotate = this.game.add.sprite(300,600,"rotate");
        
		this.buttons = [this.candy,this.cacke,this.choco,this.rotate]
		
		for(var i = 0 ; i < this.buttons.length ; i++){
            this.buttons[i].width = 70;
            this.buttons[i].height = 50;
            this.buttons[i].anchor.setTo(0.5);
            this.buttons[i].inputEnabled = true;
            if(this.buttons[i]==this.rotate) {this.buttons[i].events.onInputDown.add(this.rotatePet,this);}
            else{this.buttons[i].events.onInputDown.add(this.pickItem,this);}
		}
        
        //3mlna el Pet ma3 animation lal Idle
        this.pet = this.game.add.sprite(this.game.world.centerX+20,230,"pet");
        this.pet.anchor.setTo(0.5);
        this.pet.scale.setTo(0.3);
        this.pet.customParams = {health:100 , fun:100};
        this.pet.inputEnabled = true;
        this.pet.input.enableDrag();
        this.pet.animations.add('idle',[1,4,5,7,8,11,14,16,17,16,14,11,8,7,5,4,1],5,true);
        this.pet.animations.play('idle');
        
        //hon jbna imet el fun w el health bas ane tal3ten la fo2 la2an el pet 3am ymche thten
        this.refreshStat();
        
        //mayet 5afe
        this.died = this.game.add.image(-100,-100,"die");
        this.died.alpha = 0;
        this.died.width = this.pet.width;
        this.died.height = this.pet.height;
        this.died.scale.setTo(0.3);
		this.died.anchor.setTo(0.5);
        
        //2imten la na3ref eza mn2ayin akla aw la2 w eza el ofel 3an el akel maftuh walla msker
        this.selectedItem = null;
        this.uiBlocked = false;
                
        //hon 3mlna ton2is el stat ma3 el wa2et
        this.statDecresing = this.game.time.events.loop(Phaser.Timer.SECOND * 5 , this.reduceProprieties ,this);
    },
    update: function(){
        if(this.pet.customParams.health <= 0 || this.pet.customParams.fun <= 0) {
            this.pet.alpha = 0;
            this.pet.input.disableDrag();
            this.uiBlocked = true;
            var x = this.pet.position.x;
            var y = this.pet.position.y;
            this.died.position.x = x;
            this.died.position.y = y;
            this.died.alpha = 1;
            var dieSound = game.add.audio('diedSound');
            dieSound.loop = false;
            dieSound.play();
            this.game.time.events.add(1000,this.gameOver,this);
        }
    },
    pickItem: function(sprite,event) {
        if(!this.uiBlocked) {
            this.clearSelection();
            sprite.alpha = 0.4;
            this.selectedItem = sprite;
        }
    },
    rotatePet: function(sprite,event){
        if(!this.uiBlocked) {
            //afalna el akel
            this.uiBlocked = true;
            this.clearSelection();
            sprite.alpha = 0.4;
            var petRotation = this.game.add.tween(this.pet);
            petRotation.to({angle:'+720'},1000);
            petRotation.start();
            //hon ba3ed ma ektamal el rotation zdna el Fun w jadadna imet el nas w raj3naha alpha=1
            petRotation.onComplete.add(function(){
                this.uiBlocked = false;
                sprite.alpha = 1;
                this.pet.customParams.fun += 15;
				this.pet.customParams.health -= 10;
                this.refreshStat();
            },this);
        }
    },
    clearSelection: function() {
        this.buttons.forEach( function(element , index){
            element.alpha = 1;
        } );
    },
    placeItem:function(sprite,event){
        if(this.selectedItem && !this.uiBlocked) {
            //hon 5azana imet el x w el y te3et matrah el kabsa(event)
            var x = event.position.x;
            var y = event.position.y;
            var newItem = this.game.add.sprite(x,y,this.selectedItem.key);
            newItem.width = 70;
            newItem.height = 50;
            newItem.anchor.setTo(0.5);
            //hon a3tayna el New Item nafes mowasafat el Akel(health , fod)
            newItem.customParams = this.selectedItem.customParams;
            //hon 3mlna block lal haraka
            this.uiBlocked = true;
            //son cha8alna el animation t3t el raked wa2afna te3et Idle
            this.pet.animations.add('run',[2,3,6,9,13,9,6,3,2,1],10,false)
            this.pet.animations.stop('idle');
            this.pet.animations.play('run');
            
            //hon 3mlna animation btmshe el Pet lal x w el y te3et el akel
            var petMovement = this.game.add.tween(this.pet);
            petMovement.to({x:x,y:y},600);
            petMovement.start();
            //awel ma yo5las el Animation mnstad3e function
            petMovement.onComplete.add(function(){
                
                newItem.destroy();
                this.uiBlocked = false;
                this.pet.animations.play('idle');
                this.pet.animations.stop('run');
                
                var stat;
                for(stat in newItem.customParams) {
                    //st3mlna hasOwnProprety mn chen momken ykun el Object fi ma3o echya 8er Health w Fun
                    if(newItem.customParams.hasOwnProperty(stat)) {
                        console.log(stat);
                        this.pet.customParams[stat] += newItem.customParams[stat];
                    }
                }
                this.refreshStat();
            },this);
            
        }
    },
    //refresh health and fun
    refreshStat:function() {
        this.healthText.text = this.pet.customParams.health;
        this.funText.text = this.pet.customParams.fun;
    },
    reduceProprieties: function() {
        this.pet.customParams.health -= 10;
        this.pet.customParams.fun -= 15;
        this.refreshStat();
    },
    gameOver: function(){
        this.backgroundMusic.stop();
        this.game.state.start("OverState");
    },
};