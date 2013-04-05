Ext.define('FantasyBaseball.store.Pitchers', {
    extend: 'Ext.data.Store',
    storeId: 'Pitchers',
    fields: [
        {
            name: 'playerID',
            type: 'string'
        },{
            name: 'yearID',
            type: 'int'
        },{
            name: 'teamID',
            type: 'string'
        },{
            name: 'W',
            type: 'int'
        },{
            name: 'GS',
            type: 'int'
        },{
            name: 'G',
            type: 'int'
        },{
            name: 'CG',
            type: 'int'
        },{
            name: 'SHO',
            type: 'int'
        },{
            name: 'SV',
            type: 'int'
        },{
            name: 'H',
            type: 'int'
        },{
            name: 'ER',
            type: 'int'
        },{
            name: 'HR',
            type: 'int'
        },{
            name: 'BB',
            type: 'int'
        },{
            name: 'SO',
            type: 'int'
        },{
            name: 'OBA',
            type: 'float',
            convert: function(v, record) {
                if(record.raw.BAOpp === 'NULL') {
                    return (record.get('H')/(record.get('BFP')-record.get('BB')-record.get('HBP')))
                }
            }
        },{
            name: 'ERA',
            type: 'float'
        },{
            name: 'KBB',
            type: 'float',
            convert: function(v, record) {
                return (record.get('SO')/record.get('BB'))
            }
        },{
            name: 'IBB',
            type: 'int'
        },{
            name: 'HBP',
            type: 'int'
        },{
            name: 'BFP',
            type: 'int'
        },{
            name: 'Birthday',
            type: 'date',
            convert: function(v, record) {
                return Ext.Date.parse(record.raw.birthYear+'-'+record.raw.birthMonth+'-'+record.raw.birthDay, 'Y-n-j')
            }
        },{
            name: 'nameFirst',
            type: 'string'
        },{
            name: 'nameLast',
            type: 'string'
        }
    ],
    proxy: {
        type: 'ajax',
        url: 'resources/data/pitchers.json',
        reader: {
            type: 'json'
        }
    }
});