Ext.define('FantasyBaseball.store.UniqueBatters', {
    extend: 'Ext.data.Store',
    storeId: 'UniqueBatters',
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
            name: 'R',
            type: 'int'
        },{
            name: 'HR',
            type: 'int'
        },{
            name: 'XBH',
            type: 'int'
        },{
            name: 'RBI',
            type: 'int'
        },{
            name: 'SB',
            type: 'int'
        },{
            name: 'OBP',
            type: 'float'
        },{
            name: 'RunValue',
            type: 'float',
            defaultValue: 0
        },{
            name: 'HomerunValue',
            type: 'float',
            defaultValue: 0
        },{
            name: 'RBIValue',
            type: 'float',
            defaultValue: 0
        },{
            name: 'XBHValue',
            type: 'float',
            defaultValue: 0
        },{
            name: 'OBPValue',
            type: 'float',
            defaultValue: 0
        },{
            name: 'SBValue',
            type: 'float',
            defaultValue: 0
        },{
            name: 'TotalValue',
            type: 'float',
            defaultValue: 0
        }
    ]
});