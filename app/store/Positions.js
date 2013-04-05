Ext.define('FantasyBaseball.store.Positions', {
    extend: 'Ext.data.Store',
    storeId: 'Positions',
    fields: ['position','value'],
    data: [
        {
            position: 'RP',
            value: 0
        },{
            position: 'SP',
            value: 1
        },{
            position: 'C',
            value: 2
        },{
            position: '1B',
            value: 3
        },{
            position: '2B',
            value: 4
        },{
            position: '3B',
            value: 5
        },{
            position: 'SS',
            value: 6
        },{
            position: 'LF',
            value: 7
        },{
            position: 'CF',
            value: 8
        },{
            position: 'RF',
            value: 9
        },{
            position: 'DH',
            value: 10
        }
    ]
});