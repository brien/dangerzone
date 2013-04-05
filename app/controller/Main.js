Ext.define('FantasyBaseball.controller.Main', {
    extend: 'Ext.app.Controller',

    stores: [
        'Batters',
        'Pitchers',
        'Positions',
        'UniqueBatters',
        'UniquePitchers'
    ],

    views: [
        'BattersGrid',
        'PitchersGrid'
    ],

    refs: [
        {
            ref: 'battersGrid',
            selector: 'battersGrid'
        },{
            ref: 'pitchersGrid',
            selector: 'pitchersGrid'
        }
    ],

    batterKeepers: [
        'fieldpr01',
        'ramirha01',
        'kempma01',
        'braunry02',
        'tulowtr01',
        'canoro01',
        'troutmi01',
        'cabremi01',
        'hosmeer01',
        'phillbr01',
        'jennide01',
        'wrighda03',
        'gonzaca01',
        'hamiljo03',
        'poseybu01',
        'pujolal01',
        'kinslia01',
        'mccutan01',
        'harpebr03',
        'reyesjo01',
        'ellsbja01',
        'heywaja01',
        'stantmi03',
        'mauerjo01'
    ],

    pitcherKeepers: [
        'kershcl01',
        'gonzagi01',
        'hernafe02',
        'verlaju01',
        'leecl02',
        'shielja02',
        'dickera01',
        'weaveje02',
        'strasst01',
        'priceda01',
        'wainwad01',
        'cainma01',
        'bumgama01',
        'hamelco01',
        'darviyu01',
        'greinza01'
    ],

    init: function() {
        var me = this,
            batters = me.getStore('Batters'),
            pitchers = me.getStore('Pitchers');
        batters.addListener('load', me.battersLoaded, me);
        batters.load();
        pitchers.addListener('load', me.pitchersLoaded, me);
        pitchers.load();
        me.control({
            'tabpanel': {
                tabchange: me.tabChanged,
                added: me.onlyBatters
            },
            'tabpanel > toolbar > combo': {

            },
            'tabpanel > toolbar > checkboxgroup > checkbox': {
                change: me.selectYears
            },
            'battersGrid': {
                selectionchange: me.playerSelected
            },
            'pitchersGrid': {
                selectionchange: me.playerSelected
            },
            'button[text=Process Filters]': {
                click: me.processFilters
            }
        });
    },

    battersLoaded: function(store, records, success) {
        var me = this;
        if(success) {
            var uniqueBatters = me.getStore('UniqueBatters');
            //me.populateUniqueStores(store, uniqueBatters);
            //me.setBatterBenchmarks(store, uniqueBatters);
        }
    },

    pitchersLoaded: function(store, records, success) {
        var me = this;
        if(success) {
            //me.populateUniqueStores(store, me.getStore('UniquePitchers'));
        }
    },

    tabChanged: function(tabPanel, newCard, oldCard) {
        var me = this,
            comparePlayersButton = tabPanel.getDockedItems('toolbar')[0].down('button[text=Compare Players]');

        if(newCard.title == 'Batters') {
            me.onlyBatters();
        } else {
            me.onlyPitchers();
        }
        comparePlayersButton.disable();
    },

    onlyBatters: function() {
        var me = this,
            positions = me.getStore('Positions');

        positions.clearFilter();
        positions.filterBy(function(position) {
            return position.get('value') > 1
        });
    },

    onlyPitchers: function() {
        var me = this,
            positions = me.getStore('Positions');

        positions.clearFilter();
        positions.filterBy(function(position) {
            return position.get('value') < 2
        });
    },

    selectYears: function(checkbox, newValue, oldValue) {
        var me = this,
            parent = checkbox.up(),
            yearCombo = parent.up().down('combo[fieldLabel=Year]'),
            yearsCombo = parent.up().down('combo[fieldLabel=Years]'),
            otherCheckbox;

        if(checkbox.boxLabel == 'Individual Year') {
            otherCheckbox = parent.down('checkbox[boxLabel=Multiple Years]');
            if(newValue) {
                yearCombo.show();
                yearsCombo.hide();
            } else {
                yearCombo.hide();
                yearsCombo.show();
            }
        } else {
            otherCheckbox = parent.down('checkbox[boxLabel=Individual Year]');
            if(newValue) {
                yearCombo.hide();
                yearsCombo.show();
            } else {
                yearCombo.show();
                yearsCombo.hide();
            }
        }

        if(newValue) {
            otherCheckbox.setValue(false);
        } else {
            otherCheckbox.setValue(true);
        }
    },

    playerSelected: function(selectionModel, selected) {
        var me = this,
            comparePlayersButton = me.getBattersGrid().up().getDockedItems('toolbar')[0].down('button[text=Compare Players]');

        if(selected.length > 0) {
            comparePlayersButton.enable();
        } else {
            comparePlayersButton.disable();
        }
    },

    processFilters: function(button) {
        var me = this,
            toolbar = button.up(),
            checkboxgroup = toolbar.down('checkboxgroup'),
            checked = checkboxgroup.getChecked(),
            combo = toolbar.down('combo[hidden=false]'),
            comboValue = combo.getValue(),
            activePanel = toolbar.up().getLayout().getActiveItem(),
            activeTitle = activePanel.title,
            store = Ext.getStore(activeTitle),
            years;

        store.clearFilter();
        if(checked[0].boxLabel == 'Individual Year') {
            years = [comboValue];
        } else {
            years = comboValue;
        }
        if(activeTitle == 'Batters') {
            me.filterBatterStore(activePanel, store, years);
        } else {
            me.filterPitcherStore(activePanel, store, years);
        }

    },

    filterBatterStore: function(activePanel, store, years) {
        var me = this,
            length = years.length,
            uniqueBattersStore = me.getStore('UniqueBatters'),
            count,
            record,
            playerID,
            lastID,
            yearID,
            atBats,
            add,
            i;

        store.sort('yearID', 'ASC');
        store.filterBy(function(player) {
            i = 0;
            add = false;
            atBats = player.get('AB');
            if(atBats < 100 || isNaN(atBats)) {
                return add
            }
            playerID = player.get('playerID');
            if(me.batterKeepers.indexOf(playerID) != -1) {
                return add
            }
            yearID = player.get('yearID');
            for(; i < length; i++) {
                if(years[i] == yearID) {
                    add = true;
                }
            }
            return add
        });
        console.log('Filtering Done');
        count = store.count();
        store.sort('playerID', 'ASC');
        i = 0;
        store.each(function(batter) {
            playerID = batter.get('playerID');
            if(lastID && lastID == playerID) {
                record = uniqueBattersStore.findRecord('playerID', playerID);
                if(record != -1) {
                    record.set('R', record.get('R')+batter.get('R'));
                    record.set('HR', record.get('HR')+batter.get('HR'));
                    record.set('XBH', record.get('XBH')+batter.get('XBH'));
                    record.set('RBI', record.get('RBI')+batter.get('RBI'));
                    record.set('SB', record.get('SB')+batter.get('SB'));
                    record.set('OBP', record.get('OBP')+batter.get('OBP'));
                }
            } else {
                uniqueBattersStore.add({
                    playerID:   batter.get('playerID'),
                    Age:        batter.get('Age'),
                    nameFirst:  batter.get('nameFirst'),
                    nameLast:   batter.get('nameLast'),
                    R:          batter.get('R'),
                    HR:         batter.get('HR'),
                    XBH:        batter.get('XBH'),
                    RBI:        batter.get('RBI'),
                    SB:         batter.get('SB'),
                    OBP:        batter.get('OBP')
                });
            }
            lastID = playerID;
            console.log('Processing Batter #'+i+' of '+count);
            i++;
        });
        console.log('Adding Unique Batters Done');
        me.setBatterBenchmarks(uniqueBattersStore);
    },

    setBatterBenchmarks: function(uniqueBattersStore) {
        var me = this,
            battersGrid = me.getBattersGrid(),
            uniqueBattersStore = uniqueBattersStore || me.getStore('UniqueBatters');

        battersGrid.averageRuns = uniqueBattersStore.average('R');
        battersGrid.maxRuns = uniqueBattersStore.max('R');
        battersGrid.averageHomeRuns = uniqueBattersStore.average('HR');
        battersGrid.maxHomeRuns = uniqueBattersStore.max('HR');
        battersGrid.averageXBH = uniqueBattersStore.average('XBH');
        battersGrid.maxXBH = uniqueBattersStore.max('XBH');
        battersGrid.averageRBI = uniqueBattersStore.average('RBI');
        battersGrid.maxRBI = uniqueBattersStore.max('RBI');
        battersGrid.averageSB = uniqueBattersStore.average('SB');
        battersGrid.maxSB = uniqueBattersStore.max('SB');
        battersGrid.averageOBP = uniqueBattersStore.average('OBP');
        battersGrid.maxOBP = uniqueBattersStore.max('OBP');
        console.log('Benchmarks Done');
        me.valueBatters(uniqueBattersStore);
    },

    valueBatters: function(store) {
        var me = this,
            battersGrid = me.getBattersGrid(),
            rAvg = battersGrid.averageRuns,
            rMax = battersGrid.maxRuns,
            hrAvg = battersGrid.averageHomeRuns,
            hrMax = battersGrid.maxHomeRuns,
            xbhAvg = battersGrid.averageXBH,
            xbhMax = battersGrid.maxXBH,
            rbiAvg = battersGrid.averageRBI,
            rbiMax = battersGrid.maxRBI,
            sbAvg = battersGrid.averageSB,
            sbMax = battersGrid.maxSB,
            obpAvg = battersGrid.averageOBP,
            obpMax = battersGrid.maxOBP,
            count = store.count(),
            i = 0,
            r,
            rValue,
            hr,
            hrValue,
            xbh,
            xbhValue,
            rbi,
            rbiValue,
            sb,
            sbValue,
            obp,
            obpValue,
            total;

        store.each(function(batter) {
            r = batter.get('R');
            rValue = (((r/rAvg)*100)+((r/rMax)*100));
            batter.set('RunValue', rValue);

            hr = batter.get('HR');
            hrValue = (((hr/hrAvg)*100)+((hr/hrMax)*100));
            batter.set('HomerunValue', hrValue);

            xbh = batter.get('XBH');
            xbhValue = (((xbh/xbhAvg)*100)+((xbh/xbhMax)*100));
            batter.set('XBHValue', xbhValue);

            rbi = batter.get('RBI');
            rbiValue = (((rbi/rbiAvg)*100)+((rbi/rbiMax)*100));
            batter.set('RBIValue', rbiValue);

            sb = batter.get('SB');
            sbValue = (((sb/sbAvg)*100)+((sb/sbMax)*100));
            batter.set('SBValue', sbValue);

            obp = batter.get('OBP');
            obpValue = (((obp/obpAvg)*100)+((obp/obpMax)*100));
            batter.set('OBPValue', obpValue);

            total = rValue+hrValue+xbhValue+rbiValue+sbValue+obpValue;
            batter.set('TotalValue', total);

            console.log('Batter #'+i+' of '+count+' Done');
            i++;
        });
        store.sort('TotalValue', 'DESC');
        console.log('All Done');
    },

    filterPitcherStore: function(activePanel, store, years) {
        var me = this,
            length = years.length,
            uniquePitchersStore = me.getStore('UniquePitchers'),
            count,
            record,
            playerID,
            lastID,
            yearID,
            battersFaced,
            gamesStarted,
            add,
            i;

        store.sort('yearID', 'ASC');
        store.filterBy(function(player) {
            i = 0;
            add = false;
            battersFaced = player.get('BFP');
            if(battersFaced < 75 || isNaN(battersFaced)) {
                return add
            }
            gamesStarted = player.get('GS');
            if(gamesStarted > 2 || isNaN(gamesStarted)) {
                return add
            }
            playerID = player.get('playerID');
            if(me.pitcherKeepers.indexOf(playerID) != -1) {
                return add
            }
            yearID = player.get('yearID');
            for(; i < length; i++) {
                if(years[i] == yearID) {
                    add = true;
                }
            }
            return add
        });
        console.log('Filtering Done');
        count = store.count();
        store.sort('playerID', 'ASC');
        i = 0;
        store.each(function(pitcher) {
            playerID = pitcher.get('playerID');
            if(lastID && lastID == playerID) {
                record = uniquePitchersStore.findRecord('playerID', playerID);
                if(record != -1) {
                    record.set('K', record.get('K')+pitcher.get('SO'));
                    record.set('W', record.get('W')+pitcher.get('W'));
                    record.set('ERA', record.get('ERA')+pitcher.get('ERA'));
                    record.set('OBA', record.get('OBA')+pitcher.get('OBA'));
                    record.set('KBB', record.get('KBB')+pitcher.get('KBB'));
                }
            } else {
                uniquePitchersStore.add({
                    playerID:   pitcher.get('playerID'),
                    Age:        pitcher.get('Age'),
                    nameFirst:  pitcher.get('nameFirst'),
                    nameLast:   pitcher.get('nameLast'),
                    K:          pitcher.get('SO'),
                    W:          pitcher.get('W'),
                    ERA:        pitcher.get('ERA'),
                    OBA:        pitcher.get('OBA'),
                    KBB:        pitcher.get('KBB')
                });
            }
            lastID = playerID;
            console.log('Processing Pitcher #'+i+' of '+count);
            i++;
        });
        console.log('Adding Unique Pitchers Done');
        me.setPitcherBenchmarks(uniquePitchersStore);
    },

    setPitcherBenchmarks: function(uniquePitchersStore) {
        var me = this,
            pitchersGrid = me.getPitchersGrid(),
            uniquePitchersStore = uniquePitchersStore || me.getStore('uniquePitchers');

        pitchersGrid.averageK = uniquePitchersStore.average('K');
        pitchersGrid.maxK = uniquePitchersStore.max('K');
        pitchersGrid.averageW = uniquePitchersStore.average('W');
        pitchersGrid.maxW = uniquePitchersStore.max('W');
        pitchersGrid.averageERA = uniquePitchersStore.average('ERA');
        pitchersGrid.minERA = uniquePitchersStore.min('ERA');
        pitchersGrid.averageOBA = uniquePitchersStore.average('OBA');
        pitchersGrid.minOBA = uniquePitchersStore.min('OBA');
        pitchersGrid.averageKBB = uniquePitchersStore.average('KBB');
        pitchersGrid.maxKBB = uniquePitchersStore.max('KBB');
        console.log('Benchmarks Done');
        me.valuePitchers(uniquePitchersStore);
    },

    valuePitchers: function(store) {
        var me = this,
            pitchersGrid = me.getPitchersGrid(),
            kAvg = pitchersGrid.averageK,
            kMax = pitchersGrid.maxK,
            wAvg = pitchersGrid.averageW,
            wMax = pitchersGrid.maxW,
            eraAvg = pitchersGrid.averageERA,
            eraMin = pitchersGrid.minERA,
            obaAvg = pitchersGrid.averageOBA,
            obaMin = pitchersGrid.minOBA,
            kbbAvg = pitchersGrid.averageKBB,
            kbbMax = pitchersGrid.maxKBB,
            count = store.count(),
            i = 0,
            k,
            kValue,
            w,
            wValue,
            era,
            eraValue,
            oba,
            obaValue,
            kbb,
            kbbValue,
            total;

        store.each(function(pitcher) {
            k = pitcher.get('K');
            kValue = (((k/kAvg)*100)+((k/kMax)*100));
            pitcher.set('KValue', kValue);

            w = pitcher.get('W');
            wValue = (((w/wAvg)*100)+((w/wMax)*100));
            pitcher.set('WValue', wValue);

            era = pitcher.get('ERA');
            eraValue = (((eraAvg/era)*100)+((eraMin/era)*100));
            pitcher.set('ERAValue', eraValue);

            oba = pitcher.get('OBA');
            obaValue = (((obaAvg/oba)*100)+((obaMin/oba)*100));
            pitcher.set('OBAValue', obaValue);

            kbb = pitcher.get('KBB');
            kbbValue = (((kbb/kbbAvg)*100)+((kbb/kbbMax)*100));
            pitcher.set('KBBValue', kbbValue);

            total = kValue+wValue+eraValue+obaValue+kbbValue;
            pitcher.set('TotalValue', total);

            console.log('Pitcher #'+i+' of '+count+' Done');
            i++;
        });
        store.sort('TotalValue', 'DESC');
        console.log('All Done');
    }
});