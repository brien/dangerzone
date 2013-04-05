var yearRange = Ext.create('Ext.data.Store', {
        storeId: 'YearRange',
        fields: ['year'],
        data: [
            { year: 2008 },
            { year: 2009 },
            { year: 2010 },
            { year: 2011 },
            { year: 2012 }
        ]
    }),
    numYears = Ext.create('Ext.data.Store', {
        storeId: 'NumYears',
        fields: ['numYears','value'],
        data: [
            {
                numYears: 'Past 2 Years',
                value: [2012,2011]
            },{
                numYears: 'Past 3 Years',
                value: [2012,2011,2010]
            },{
                numYears: 'Past 4 Years',
                value: [2012,2011,2010,2009]
            },{
                numYears: 'Past 5 Years',
                value: [2012,2011,2010,2009,2008]
            }
        ]
    });

Ext.define('FantasyBaseball.view.Viewport', {
    renderTo: Ext.getBody(),
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    items: [{
        region: 'center',
        xtype: 'tabpanel',
        items:[
            {
                xtype: 'battersGrid'
            },{
                xtype: 'pitchersGrid'
            }
        ],
        lbar: [
            {
                xtype: 'combo',
                store: 'Positions',
                displayField: 'position',
                valueField: 'value',
                queryMode: 'local',
                fieldLabel: 'Position',
                labelWidth: 70,
                hidden: true
            },{
                xtype: 'checkboxgroup',
                columns: 1,
                fieldLabel: 'Select Years',
                labelWidth: 70,
                items: [
                    { boxLabel: 'Individual Year', inputValue: '1', checked: true},
                    { boxLabel: 'Multiple Years', inputValue: '2'}
                ]
            },{
                xtype: 'combo',
                store: yearRange,
                displayField: 'year',
                valueField: 'year',
                queryMode: 'local',
                fieldLabel: 'Year',
                labelWidth: 70
            },{
                xtype: 'combo',
                hidden: true,
                store: numYears,
                displayField: 'numYears',
                valueField: 'value',
                queryMode: 'local',
                fieldLabel: 'Years',
                labelWidth: 70
            },{
                text: 'Process Filters',
                margin: '5 0 0 0',
                border: 2,
                style: {
                    borderColor: 'grey',
                    borderStyle: 'solid'
                }
            },{
                text: 'Compare Players',
                margin: '10 0 0 0',
                border: 2,
                style: {
                    borderColor: 'grey',
                    borderStyle: 'solid'
                },
                disabled: true
            }
        ]
    }]
});