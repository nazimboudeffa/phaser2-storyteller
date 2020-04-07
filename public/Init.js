var init = {
  create:function(){
    RenJS.storyManager.setupStory();
    RenJS.gui.init();
    RenJS.initInput();
    RenJS.audioManager.init(function(){
        RenJS.gui.showMenu("main");
    });
  },

  render: function() {
    // if (RenJS.gui && RenJS.gui.hud && RenJS.gui.hud.area){
    //     _.each(RenJS.gui.hud.area,function(area){
    //         game.debug.rectangle(area);
    //     });
    // }
  }
}
