var OverState = {
    create: function() {
        this.game.add.sprite(0,0,"background");
        var bgMenu = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,"bgMenu");
        bgMenu.anchor.setTo(0.5);
        bgMenu.scale.setTo(0.2);
        
		var style = {font:'20px arial',fill:'#000'};
		var gameOver = this.game.add.text(this.game.world.centerX,bgMenu.position.y-105,'Game Over',style);
		gameOver.anchor.setTo(0.5);
		
        var mainMenu = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY-30,"mainMenu");
        mainMenu.anchor.setTo(0.5);
        mainMenu.scale.setTo(0.5);
        mainMenu.inputEnabled = true;
        mainMenu.events.onInputDown.add(function(){
            this.game.state.start("HomeState");
        },this);

        var rePlay = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY+mainMenu.height,"rePlay");
        rePlay.anchor.setTo(0.5);
        rePlay.scale.setTo(0.5);
        rePlay.inputEnabled = true;
        rePlay.events.onInputDown.add(function(){
            this.game.state.start("GameState");
        },this);
    },
};