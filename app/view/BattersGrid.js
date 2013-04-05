Ext.define("FantasyBaseball.view.BattersGrid", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.battersGrid',

    averageRuns: 0,
    maxRuns: 0,
    averageHomeRuns: 0,
    maxHomeRuns: 0,
    averageXBH: 0,
    maxXBH: 0,
    averageRBI: 0,
    maxRBI: 0,
    averageSB: 0,
    maxSB: 0,
    averageOBP: 0,
    maxOBP: 0,

    initComponent: function() {
        Ext.apply(this, {
            title: 'Batters',
            header: false,
            store: 'UniqueBatters',
            selModel: Ext.create('Ext.selection.CheckboxModel', { checkOnly: true }),
            columns: [
                {
                    text: 'First Name',
                    dataIndex: 'nameFirst',
                    flex: 1
                },{
                    text: 'Last Name',
                    dataIndex: 'nameLast',
                    flex: 1
                },{
                    text: 'R',
                    dataIndex: 'R'
                },{
                    text: 'HR',
                    dataIndex: 'HR'
                },{
                    text: 'XBH',
                    dataIndex: 'XBH'
                },{
                    text: 'RBI',
                    dataIndex: 'RBI'
                },{
                    text: 'SB',
                    dataIndex: 'SB'
                },{
                    xtype: 'numbercolumn',
                    text: 'OBP',
                    dataIndex: 'OBP',
                    format: '0,000.00'
                },{
                    xtype: 'numbercolumn',
                    text: 'Run Value',
                    dataIndex: 'RunValue',
                    format: '0,000.00'
                },{
                    xtype: 'numbercolumn',
                    text: 'Homerun Value',
                    dataIndex: 'HomerunValue',
                    format: '0,000.00'
                },{
                    xtype: 'numbercolumn',
                    text: 'RBI Value',
                    dataIndex: 'RBIValue',
                    format: '0,000.00'
                },{
                    xtype: 'numbercolumn',
                    text: 'XBH Value',
                    dataIndex: 'XBHValue',
                    format: '0,000.00'
                },{
                    xtype: 'numbercolumn',
                    text: 'OBP Value',
                    dataIndex: 'OBPValue',
                    format: '0,000.00'
                },{
                    xtype: 'numbercolumn',
                    text: 'SB Value',
                    dataIndex: 'SBValue',
                    format: '0,000.00'
                },{
                    xtype: 'numbercolumn',
                    text: 'Total Value',
                    dataIndex: 'TotalValue',
                    format: '0,000.00'
                }
            ]
        });

        this.callParent(arguments);
    }
});