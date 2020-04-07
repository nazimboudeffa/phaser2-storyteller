var preloadStory = {

  preload: function () {
    //preload gui
    _.each(RenJS.gui.getAssets(),function(asset){
        if (asset.type == "spritesheet"){
            game.load.spritesheet(asset.key, preparePath(asset.file), asset.w, asset.h);
        } else {
            game.load[asset.type](asset.key, preparePath(asset.file));
        }
    });

    //preload backgrounds
    _.each(RenJS.setup.backgrounds,function(filename,background){
        game.load.image(background, preparePath(filename));
    });
    //preload cgs
    _.each(RenJS.setup.cgs,function(cgs,key){
        if (typeof cgs === 'string' || cgs instanceof String){
            // normal cgs
            game.load.image(key, preparePath(cgs));
        } else {
            // spritesheet animation
            var str = cgs.spritesheet.split(" ");
            game.load.spritesheet(key, preparePath(str[0]), parseInt(str[1]),parseInt(str[2]));
        }

    });
    // preload background music
    _.each(RenJS.setup.music,function(filename,music){
        game.load.audio(music, preparePath(filename));
    });
    //preload sfx
    _.each(RenJS.setup.sfx,function(filename,key){
        game.load.audio(key, preparePath(filename));
    },this);
    //preload characters
    _.each(RenJS.setup.characters,function(character,name){
        _.each(character.looks,function(filename,look){
            game.load.image(name+"_"+look, preparePath(filename));
        });
    });
    if (RenJS.setup.extra){
        _.each(RenJS.setup.extra,function(assets,type){
            if (type=="spritesheets"){
                _.each(assets,function(file,key){
                    var str = file.split(" ");
                    game.load.spritesheet(key, preparePath(str[0]), parseInt(str[1]),parseInt(str[2]));
                });
            } else {
                _.each(assets,function(file,key){
                    // console.log("loading "+key+ " "+file+" of type "+type);
                    game.load[type](key, preparePath(file));
                });
            }
        });
    }
  },

  create: function() {
    //init game and start main menu
    game.state.add('init', init);
    game.state.start('init');
  }
}
