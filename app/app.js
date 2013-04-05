Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    controllers: ["Main"],
    views: ["BattersGrid","PitchersGrid"],
    stores: ["Batters","Pitchers"],
    name: 'FantasyBaseball',
    autoCreateViewport: true
});
