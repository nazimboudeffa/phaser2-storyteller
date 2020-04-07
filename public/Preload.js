var preload = {

  init: function () {
    //TODO: LOAD RENJS OWN SPLASH SCREEN
    this.splash = game.add.sprite(game.world.centerX, game.world.centerY, 'splash');
    this.splash.anchor.set(0.5);
    if (globalConfig.splash.loadingBar) {
        var position = globalConfig.splash.loadingBar.position;
        this.loadingBar = game.add.sprite(position.x,position.y , "loading");
    }
  },

  preload: function () {
    this.load.setPreloadSprite(this.loadingBar);
    //load RenJS
    game.load.script('Defaults',  'RenJS/Defaults.js');
    game.load.script('SimpleGUI',  'RenJS/SimpleGUI.js');
    game.load.script('AudioManager',  'RenJS/AudioManager.js');
    game.load.script('BackgroundManager',  'RenJS/BackgroundManager.js');
    game.load.script('CGSManager',  'RenJS/CGSManager.js');
    game.load.script('CharactersManager',  'RenJS/CharactersManager.js');
    game.load.script('LogicManager',  'RenJS/LogicManager.js');
    game.load.script('TextManager',  'RenJS/TextManager.js');
    game.load.script('TweenManager',  'RenJS/TweenManager.js');
    game.load.script('StoryManager',  'RenJS/StoryManager.js');
    game.load.script('RenJS',  'RenJS/RenJS.js');
    game.load.script('Effects',  'RenJS/Effects.js');
    game.load.script('Ambient',  'RenJS/Ambient.js');
    game.load.script('Transitions',  'RenJS/Transitions.js');
    game.load.script('CustomContent',  'RenJS/CustomContent.js');
    //load Story Files
    loadStyle(preparePath(globalConfig.fonts));
    game.load.text("guiConfig", preparePath(globalConfig.guiConfig));
    game.load.text("storySetup", preparePath(globalConfig.storySetup));
    for (var i = globalConfig.storyText.length - 1; i >= 0; i--) {
      game.load.text("story"+i, preparePath(globalConfig.storyText[i]));
    };
  },

  create: function () {
    //load the setup
    RenJS.setup = jsyaml.load(game.cache.getText("storySetup"));
    //load the story text
    var story = {};
    _.each(globalConfig.storyText,function (file,index) {
        var text = jsyaml.load(game.cache.getText("story"+index));
        story = _.extend(story,text);
    });
    RenJS.story = story;
    //load and create the GUI
    var gui = jsyaml.load(game.cache.getText("guiConfig"));
    RenJS.gui = new SimpleGUI(gui);
    //preload the fonts by adding text, else they wont be fully loaded :\
    _.each(RenJS.gui.elements.assets.fonts,function(font){
        // console.log("loading" + font)
        game.add.text(20, 20, font, {font: '42px '+font});
    });
    //start preloading story
    game.state.add('preloadStory', preloadStory);
    game.state.start('preloadStory');
  }
}
