Ext.define('FantasyBaseball.store.UniquePitchers', {
    extend: 'Ext.data.Store',
    storeId: 'UniquePitchers',
    fields: [
        {
            name: 'playerID',
            type: 'string'
        },{
            name: 'Age',
            type: 'int'
        },{
            name: 'nameFirst',
            type: 'string'
        },{
            name: 'nameLast',
            type: 'string'
        },{
            name: 'K',
            type: 'int'
        },{
            name: 'W',
            type: 'int'
        },{
            name: 'ERA',
            type: 'float'
        },{
            name: 'OBA',
            type: 'float'
        },{
            name: 'KBB',
            type: 'float'
        },{
            name: 'KValue',
            type: 'float',
            defaultValue: 0
        },{
            name: 'WValue',
            type: 'float',
            defaultValue: 0
        },{
            name: 'ERAValue',
            type: 'float',
            defaultValue: 0
        },{
            name: 'OBAValue',
            type: 'float',
            defaultValue: 0
        },{
            name: 'KBBValue',
            type: 'float',
            defaultValue: 0
        },{
            name: 'TotalValue',
            type: 'float',
            defaultValue: 0
        }
    ]
});