var PreloadState = {
    preload: function() {
        
        this.logo = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,"logo");
        this.logo.anchor.setTo(0.5);
        
        this.progressBar = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY+200,"progressBar");
        this.progressBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.progressBar);
        
        this.game.load.image("background","assets/images/background.png");
        this.game.load.image("gameName","assets/images/name.png");
        this.game.load.image("play","assets/images/play.png");
        this.game.load.image("rePlay","assets/images/rePlay.png");
        this.game.load.image("mainMenu","assets/images/mainMenu.png");
        this.game.load.image("bgMenu","assets/images/bgMenu.png");
        this.game.load.image("candy","assets/images/candy.png");
        this.game.load.image("cacke","assets/images/cacke.png");
        this.game.load.image("choco","assets/images/choco.png");
        this.game.load.image("rotate","assets/images/rotate.png");
        this.game.load.image("die","assets/images/die.png");
        this.game.load.image("health","assets/images/health.png");
        this.game.load.image("fun","assets/images/fun.png");
        
        this.game.load.audio("diedSound","assets/sounds/diedSound.ogg");
        this.game.load.audio("bgMusic","assets/sounds/bgMusic.ogg");
        this.game.load.audio("runSound","assets/sounds/runSound.ogg");
        
        this.game.load.spritesheet("pet","assets/images/pet.png",290,433,28,2,2);
    },
    create: function() {
        this.game.time.events.add(2000,function(){
            this.game.state.start('HomeState');
        },this);
    },
};