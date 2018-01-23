var BootState = {
    init: function() {
        //5alena el chacha tokbar w toz8ar
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload: function() {
        this.game.load.image("logo","assets/images/logo.png");
        this.game.load.image("progressBar","assets/images/progressBar.png");
    },
    create: function() {
        this.game.stage.backgroundColor = "#fff";
        this.game.state.start('PreloadState');
    },
};