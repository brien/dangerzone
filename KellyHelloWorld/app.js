Ext.application({
    name: 'HelloWorld',
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    html : 'Hello World!'
                }
            ]
        });
    }
});