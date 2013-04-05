Ext.define('FantasyBaseball.store.Batters', {
    extend: 'Ext.data.Store',
    storeId: 'Batters',
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
            name: 'G',
            type: 'int'
        },{
            name: 'AB',
            type: 'int'
        },{
            name: 'R',
            type: 'int',
            convert: function(v, record) {
                return parseInt(record.raw.R,10) || 0
            }
        },{
            name: 'H',
            type: 'int'
        },{
            name: 'Doubles',
            type: 'int'
        },{
            name: 'Triples',
            type: 'int'
        },{
            name: 'HR',
            type: 'int',
            convert: function(v, record) {
                return parseInt(record.raw.HR,10) || 0
            }
        },{
            name: 'XBH',
            type: 'int',
            convert: function(v, record) {
                return (record.get('Doubles') + record.get('Triples') + record.get('HR')) || 0
            }
        },{
            name: 'RBI',
            type: 'int',
            convert: function(v, record) {
                return parseInt(record.raw.RBI,10) || 0
            }
        },{
            name: 'SB',
            type: 'int',
            convert: function(v, record) {
                return parseInt(record.raw.SB,10) || 0
            }
        },{
            name: 'BB',
            type: 'int'
        },{
            name: 'SO',
            type: 'int'
        },{
            name: 'OBP',
            type: 'float',
            convert: function(v, record) {
                var top = record.get('H')+record.get('BB')+record.get('HBP'),
                    bottom = record.get('AB')+record.get('BB')+record.get('HBP')+record.get('SF');
                return top/bottom || 0
            }
        },{
            name: 'IBB',
            type: 'int'
        },{
            name: 'HBP',
            type: 'int'
        },{
            name: 'SH',
            type: 'int'
        },{
            name: 'SF',
            type: 'int'
        },{
            name: 'Age',
            type: 'int',
            convert: function(v, record) {
                var extDate = Ext.Date;
                return Math.floor(extDate.getElapsed(extDate.parse(record.raw.birthYear+'-'+record.raw.birthMonth+'-'+record.raw.birthDay, 'Y-n-j'))*(1/31556952000))
            }
        },{
            name: 'nameFirst',
            type: 'string'
        },{
            name: 'nameLast',
            type: 'string'
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
    ],
    proxy: {
        type: 'ajax',
        url: 'resources/data/batters.json',
        reader: {
            type: 'json'
        }
    }
});