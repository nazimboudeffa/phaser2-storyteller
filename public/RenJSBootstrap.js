var bootstrap = {

  init: function() {
    if (globalConfig.i18n){
      return;
    }
    if (!(globalConfig.scaleMode == "EXACT_FIT")){
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
    }
    game.scale.scaleMode = Phaser.ScaleManager[globalConfig.scaleMode];
    game.scale.refresh();
  },

  preload: function () {
    game.load.image('splash',  preparePath(globalConfig.splash.loadingScreen));
    if (globalConfig.splash.loadingBar) {
      game.load.image('loading',  preparePath(globalConfig.splash.loadingBar.fullBar));
    }
  },

  create: function () {
    game.state.add('preload', preload);
    game.state.start('preload');
  }

};
