Ext.define("FantasyBaseball.view.PitchersGrid", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pitchersGrid',

    averageK: 0,
    maxK: 0,
    averageW: 0,
    maxW: 0,
    averageERA: 0,
    minERA: 0,
    averageOBA: 0,
    minOBA: 0,
    averageKBB: 0,
    maxKBB: 0,

    initComponent: function() {
        Ext.apply(this, {
            title: 'Pitchers',
            header: false,
            store: 'UniquePitchers',
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
                    text: 'K',
                    dataIndex: 'K'
                },{
                    text: 'W',
                    dataIndex: 'W'
                },{
                    xtype: 'numbercolumn',
                    text: 'ERA',
                    dataIndex: 'ERA',
                    format: '0,000.00'
                },{
                    xtype: 'numbercolumn',
                    text: 'OBA',
                    dataIndex: 'OBA',
                    format: '0,000.00'
                },{
                    xtype: 'numbercolumn',
                    text: 'KBB',
                    dataIndex: 'KBB',
                    format: '0,000.00'
                },{
                    xtype: 'numbercolumn',
                    text: 'K Value',
                    dataIndex: 'KValue',
                    format: '0,000.00'
                },{
                    xtype: 'numbercolumn',
                    text: 'W Value',
                    dataIndex: 'WValue',
                    format: '0,000.00'
                },{
                    xtype: 'numbercolumn',
                    text: 'ERA Value',
                    dataIndex: 'ERAValue',
                    format: '0,000.00'
                },{
                    xtype: 'numbercolumn',
                    text: 'OBA Value',
                    dataIndex: 'OBAValue',
                    format: '0,000.00'
                },{
                    xtype: 'numbercolumn',
                    text: 'KBB Value',
                    dataIndex: 'KBBValue',
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