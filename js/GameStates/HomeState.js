var HomeState = {
    create: function(){
        this.game.add.sprite(0,0,"background");
        var nameGame = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY+100,"gameName");
        nameGame.anchor.setTo(0.5);
        nameGame.scale.setTo(0.5);
        var play = this.game.add.sprite(this.game.world.centerX,500,"play");
        play.anchor.setTo(0.5);
        play.scale.setTo(0.5);
        play.inputEnabled = true;
        play.events.onInputDown.add(function(){
            this.game.state.start("GameState");
        },this);
    },
};