Ext.QuickTips.init();
  //Test
  var cur_pcode;

  function  initCode()
  {
	var store, grid, obj;
	store = rep_lock_store;
	grid = rep_progress_grid;
	store.load({ params: { start: 0, limit: 15} });
	obj = Ext.getCmp('id-center');
	obj.add(grid);
	obj.getLayout().setActiveItem(grid);
  }

  function getTotalProgress()
  {
    var con = new Ext.data.Connection();
    con.request({
      url: 'rb/ajGetTotalProgress.rb'
      ,method: 'POST'
      ,success: function(resp,opt) {
        var info = Ext.util.JSON.decode(resp.responseText);
	    totalProgress = info.totalProgress;
		info = "<font color='green'><b>Total Progress " + totalProgress + "%</b></font>";
	    Ext.getCmp('total_progress_tbar_id').setText(info);
	  }
      ,failure: function(resp,opt) {
        Ext.Msg.alert('Error', 'Cannot get Total Progress');
	  }
    }); // eo request
  }

  var memberFields = [{
    name: 'id'
    ,type: 'int'
    ,disabled: true
  },{
    name: 'hcode'
    ,type: 'string'
  },{
    name: 'hname'
    ,type: 'string'
  },{
    name: 'name'
    ,type: 'string'
  },{
    name: 'username'
    ,type: 'string'
  },{
    name: 'password'
    ,type: 'string'
  }];

  var Member = new Ext.data.Record.create(memberFields);

  var memberEditor = new Ext.ux.grid.RowEditor({
    saveText: 'Update'
  });

  var memberProxy = new Ext.data.HttpProxy({
    api : {
      create: 'rb/create_member.rb'
      ,read: 'rb/read_member.rb'
      ,update: 'rb/update_member.rb'
      ,destroy: 'rb/delete_member.rb'
    }
  });

  var memberWriter = new Ext.data.JsonWriter({
    writeAllFields : true
  });

  var memberStore = new Ext.data.JsonStore({
    proxy: memberProxy
    ,storeId: 'id_memberStore'
    ,root: 'records'
    ,autoLoad: false
    ,totalProperty: 'totalCount'
    ,remoteSort: true
    ,fields: memberFields
    ,idProperty: 'id'
    ,successProperty: 'success'
    ,writer: memberWriter
    ,autoSave: true
  });

  var searchMember = function() {
    var kw = Ext.get('id_member_kw').getValue();
    memberStore.baseParams = { kw: kw};
    memberStore.load({params: {start:0, limit:10} });
  }

  var rowNumberer = function(value, p, record) {
    var ds = record.store
    var i = ds.lastOptions.params.start
    if (isNaN(i)) {
      i = 0;
    }
    return ds.indexOf(record)+i+1;
  };

  var memberGrid = new Ext.grid.EditorGridPanel({
    title: 'Members'
    ,store: memberStore
    ,layout: 'fit'
	,cls: 'no-dirty-mark'
    ,plugins: [memberEditor]
    ,sm: new Ext.grid.RowSelectionModel({
      singleSelect: true
    })
    ,bbar: new Ext.PagingToolbar({
      pageSize: 10
      ,monitorResize: true
      ,store: memberStore
      ,displayInfo: true
      ,displayMsg: 'Displaying {0} - {1} of {2}'
      ,emptyMsg: 'Not found'
    })
    ,tbar: [{
      xtype: 'tbbutton'
	  ,id: 'id_add_btn'
      ,cls: 'x-btn-text-icon'
      ,icon: 'icons/add.png'
      ,text: 'New'
      ,handler: function() { 
        var con = new Ext.data.Connection();
        con.request({
          url: 'rb/create_member.rb'
          ,method: 'POST'
          ,success: function(resp,opt) {
            var info = Ext.util.JSON.decode(resp.responseText);
			var totalCount = parseInt(info.totalCount);
		    var pages = totalCount / 10; 
		    var mod = totalCount % 10;
 			var start = 0;

			Ext.Msg.show({
              title: 'Information'
			  ,msg: '1 record added!'
			  ,icon: Ext.Msg.INFO
			  ,buttons: Ext.Msg.OK
              ,modal: true
			});

            if (mod == 0)
              start = (pages-1) * 10;
            else
              start = pages * 10;
		    memberStore.load({ params: {start: start, limit: 10} });
            memberGrid.getView().refresh();
            memberEditor.stopEditing();
            memberGrid.getSelectionModel().selectRow(
              totalCount-1);
          }
          ,failure: function(resp,opt) {
            Ext.Msg.alert('Error', 'Cannot insert a new record');
          }
        }); // eo con.request
      } // eo handler
    },'-',{
      ref: '../removeBtn'
      ,xtype: 'tbbutton'
	  ,id: 'id_delete_btn'
      ,cls: 'x-btn-text-icon'
      ,icon: 'icons/delete.png'
      ,text: 'Delete'
      ,disabled: true
      ,handler: function() {
        Ext.Msg.show({
          title: 'Warning'
          ,icon: Ext.Msg.QUESTION
          ,msg: 'Are you sure to DELETE this record?'
          ,buttons: Ext.Msg.YESNO
          ,fn: function(btn){
            if (btn == 'no')
              return false;
            else
		    {
              memberEditor.stopEditing();
              var s = memberGrid.getSelectionModel().getSelections();
              for (var i=0,r; r=s[i]; i++) {
                memberStore.remove(r);
              }
		      memberStore.commitChanges();
              memberGrid.getView().refresh();
            }
          }
        });
      }  	
    },'-',{
      xtype: 'tbbutton'
      ,text: '<b>Search:</b>'
      ,cls: 'x-btn-text'
      ,handler: function(b,e) {
        keypress = 0;
        var o = Ext.getCmp('id_member_kw');
        o.setValue('');
        o.focus();
		memberStore.baseParams = { kw: '' };
        memberStore.load({params: {start:0, limit:10} });
      }
    },{
      xtype: 'textfield'
      ,id: 'id_member_kw'
      ,name: 'keyword_member'
      ,enableKeyEvents: true
      ,listeners: {
        keyup: function(field, el){
          keypress = Ext.get('id_member_kw').getValue().length;
          if (keypress > 3)
            searchMember();
        }
      }
    },{
      xtype: 'tbbutton'
      ,cls: 'x-btn-icon'
      ,icon: 'icons/zoom.png'
      ,handler: searchMember
    }]
    ,columns: [
      { id: 'id_rownum', header: "#", width: 50, renderer: rowNumberer.createDelegate(this) }
      ,{ header: 'ID', width: 100, dataIndex: 'id', disabled: true }
      ,{ header: 'HCODE', width: 100, dataIndex: 'hcode',
        sortable: true }
      ,{ id:'hname', header: 'HNAME', width:200, dataIndex: 'hname',
        sortable: true }
      ,{ id:'name', header: 'Name', width:200, dataIndex: 'name',
        sortable: true, editor: new Ext.form.TextField({ allowBlank: false}) }
      ,{ header: 'Username', width: 100, dataIndex: 'username',
        sortable: true, editor: new Ext.form.TextField({ allowBlank: false}) }
      ,{ header: 'Password', width: 100, dataIndex: 'password',
        sortable: true, editor: new Ext.form.TextField({ allowBlank: false}) }
    ]
    ,autoExpandColumn: 'name'
    ,renderTo: Ext.get('id-center')      
    ,loadMask: { msg: 'Loading...' }
    ,stripeRows: true
  });
  memberStore.load({ params: { start:0, limit:10} });
  memberGrid.getSelectionModel().on('selectionchange', function(sm) {
    memberGrid.removeBtn.setDisabled(sm.getCount() < 1);
  });

  var code_educationFields = [{
    name: 'id'
    ,type: 'int'
    ,disabled: true
  },{
    name: 'e_code'
    ,type: 'string'
  },{
    name: 'e_desc'
    ,type: 'string'
  },{
    name: 'e_group'
    ,type: 'string'
  },{
    name: 'e_gcode'
    ,type: 'string'
  }];
  var Code_education = new Ext.data.Record.create(code_educationFields);

  var code_educationEditor = new Ext.ux.grid.RowEditor({
    saveText: 'Update'
  });

  var code_educationProxy = new Ext.data.HttpProxy({
    api : {
      create: 'rb/create_code_education.rb'
      ,read: 'rb/read_code_education.rb'
      ,update: 'rb/update_code_education.rb'
      ,destroy: 'rb/delete_code_education.rb'
    }
  });

  var code_educationWriter = new Ext.data.JsonWriter({
    writeAllFields : true
  });

  var code_educationStore = new Ext.data.JsonStore({
    proxy: code_educationProxy
    ,storeId: 'id_code_educationStore'
    ,root: 'records'
    ,autoLoad: false
    ,totalProperty: 'totalCount'
    ,remoteSort: true
    ,fields: code_educationFields
    ,idProperty: 'id'
    ,successProperty: 'success'
    ,writer: code_educationWriter
    ,autoSave: true
  });

  var search_code_education = function() {
    var kw = Ext.get('id_code_education_kw').getValue();
    code_educationStore.baseParams = { kw: kw};
    code_educationStore.load({params: {start:0, limit:10} });
  }

  var code_educationGrid = new Ext.grid.EditorGridPanel({
    title: 'Education'
    ,store: code_educationStore
    ,layout: 'fit'
    ,cls: 'no-dirty-mark'
    ,plugins: [code_educationEditor]
    ,sm: new Ext.grid.RowSelectionModel({
      singleSelect: true
    })
    ,bbar: new Ext.PagingToolbar({
      pageSize: 10
      ,store: code_educationStore
      ,displayInfo: true
      ,displayMsg: 'Displaying {0} - {1} of {2}'
      ,emptyMsg: 'Not found'
    })
    ,tbar: [{
      xtype: 'tbbutton'
      ,id: 'id_add_btn'
      ,cls: 'x-btn-text-icon'
      ,icon: 'icons/add.png'
      ,text: 'New'
      ,handler: function() { 
        var con = new Ext.data.Connection();
        con.request({
          url: 'rb/create_code_education.rb'
          ,method: 'POST'
          ,success: function(resp,opt) {
            var info = Ext.util.JSON.decode(resp.responseText);
			var totalCount = parseInt(info.totalCount);
		    var pages = totalCount / 10; 
		    var mod = totalCount % 10;
 			var start = 0;

			Ext.Msg.show({
              title: 'Information'
			  ,msg: '1 record added!'
			  ,icon: Ext.Msg.INFO
			  ,buttons: Ext.Msg.OK
              ,modal: true
			});

            if (mod == 0)
              start = (pages-1) * 10;
            else
              start = pages * 10;
		    code_educationStore.load({ params: {start: start, limit: 10} });
            code_educationGrid.getView().refresh();
            code_educationEditor.stopEditing();
            code_educationGrid.getSelectionModel().selectRow(
              totalCount-1);
          }
          ,failure: function(resp,opt) {
            Ext.Msg.alert('Error', 'Cannot insert a new record');
          }
        }); // eo con.request
      } // eo handler
    },'-',{
      ref: '../removeBtn'
      ,xtype: 'tbbutton'
      ,id: 'id_educ_delete_btn'
      ,cls: 'x-btn-text-icon'
      ,icon: 'icons/delete.png'
      ,text: 'Delete'
      ,disabled: true
      ,handler: function() {
        Ext.Msg.show({
          title: 'Warning'
          ,icon: Ext.Msg.QUESTION
          ,msg: 'Are you sure to DELETE this record?'
          ,buttons: Ext.Msg.YESNO
          ,fn: function(btn){
            if (btn == 'no')
              return false;
            else
		    {
              code_educationEditor.stopEditing();
              var s = code_educationGrid.getSelectionModel().getSelections();
              for (var i=0,r; r=s[i]; i++) {
                code_educationStore.remove(r);
              }
              code_educationStore.commitChanges();
              code_educationGrid.getView().refresh();
            }
          }
        });
      }  	
    },'-',{
      xtype: 'tbbutton'
      ,text: '<b>Search:</b>'
      ,cls: 'x-btn-text'
      ,handler: function(b,e) {
        keypress = 0;
        var o = Ext.getCmp('id_code_education_kw');
        o.setValue('');
        o.focus();
        code_educationStore.baseParams = { kw: '' };
        code_educationStore.load({params: {start:0, limit:10} });
      }
    },{
      xtype: 'textfield'
      ,id: 'id_code_education_kw'
      ,name: 'keyword_code_education'
      ,enableKeyEvents: true
      ,listeners: {
        keyup: function(field, el){
          keypress = Ext.get('id_code_education_kw').getValue().length;
          if (keypress > 3)
            search_code_education();
        }
      }
    },{
      xtype: 'tbbutton'
      ,cls: 'x-btn-icon'
      ,icon: 'icons/zoom.png'
      ,handler: search_code_education
    }]
    ,columns: [
      { id: 'id_rownum', header: "#", width: 50, renderer: rowNumberer.createDelegate(this) }     
	  ,{ header: 'ID', width: 100, dataIndex: 'id', disabled: true }
      ,{ header: 'E_CODE', width: 100, dataIndex: 'e_code',
        sortable: true, editor: new Ext.form.TextField({ allowBlank: false}) }
      ,{ id: 'e_desc', header: 'E_DESC', width: 100, dataIndex: 'e_desc',
        sortable: true, editor: new Ext.form.TextField({ allowBlank: false}) }
      ,{ header: 'E_GROUP', width: 100, dataIndex: 'e_group',
        sortable: true, editor: new Ext.form.TextField({ allowBlank: false}) }
      ,{ header: 'E_GCODE', width: 100, dataIndex: 'e_gcode',
        sortable: true, editor: new Ext.form.TextField({ allowBlank: false}) }
    ]
    ,autoExpandColumn: 'e_desc'
    ,renderTo: Ext.get('id-center')
    ,loadMask: { msg: 'Loading...' }
    ,stripeRows: true
  });
  code_educationStore.load({ params: { start:0, limit:10} });
  code_educationGrid.getSelectionModel().on('selectionchange', function(sm) {
  code_educationGrid.removeBtn.setDisabled(sm.getCount() < 1);
});

var code_positionFields = [{
    name: 'id'
    ,type: 'int'
    ,disabled: true
  },{
    name: 'pos_type'
    ,type: 'string'
  },{
    name: 'pos_code'
    ,type: 'string'
  },{
    name: 'pos_name'
    ,type: 'string'
  },{
    name: 'pos_group'
    ,type: 'string'
  }];
  var Code_position = new Ext.data.Record.create(code_positionFields);

  var code_positionEditor = new Ext.ux.grid.RowEditor({
    saveText: 'Update'
  });

  var code_positionProxy = new Ext.data.HttpProxy({
    api : {
      create: 'rb/create_code_position.rb'
      ,read: 'rb/read_code_position.rb'
      ,update: 'rb/update_code_position.rb'
      ,destroy: 'rb/delete_code_position.rb'
    }
  });

  var code_positionWriter = new Ext.data.JsonWriter({
    writeAllFields : true
  });

  var code_positionStore = new Ext.data.JsonStore({
    proxy: code_positionProxy
    ,storeId: 'id_code_positionStore'
    ,root: 'records'
    ,autoLoad: false
    ,totalProperty: 'totalCount'
    ,remoteSort: true
    ,fields: code_positionFields
    ,idProperty: 'id'
    ,successProperty: 'success'
    ,writer: code_positionWriter
    ,autoSave: true
  });

  var search_code_position = function() {
    var kw = Ext.get('id_code_position_kw').getValue();
    code_positionStore.baseParams = { kw: kw};
    code_positionStore.load({params: {start:0, limit:10} });
  }

  var code_positionGrid = new Ext.grid.EditorGridPanel({
    title: 'Position'
    ,store: code_positionStore
    ,layout: 'fit'
    ,cls: 'no-dirty-mark'
    ,plugins: [code_positionEditor]
    ,sm: new Ext.grid.RowSelectionModel({
      singleSelect: true
    })
    ,bbar: new Ext.PagingToolbar({
      pageSize: 10
      ,store: code_positionStore
      ,displayInfo: true
      ,displayMsg: 'Displaying {0} - {1} of {2}'
      ,emptyMsg: 'Not found'
    })
    ,tbar: [{
      xtype: 'tbbutton'
      ,id: 'id_add_btn'
      ,cls: 'x-btn-text-icon'
      ,icon: 'icons/add.png'
      ,text: 'New'
      ,handler: function() { 
        var con = new Ext.data.Connection();
        con.request({
          url: 'rb/create_code_position.rb'
          ,method: 'POST'
          ,success: function(resp,opt) {
            var info = Ext.util.JSON.decode(resp.responseText);
			var totalCount = parseInt(info.totalCount);
		    var pages = totalCount / 10; 
		    var mod = totalCount % 10;
 			var start = 0;

			Ext.Msg.show({
              title: 'Information'
			  ,msg: '1 record added!'
			  ,icon: Ext.Msg.INFO
			  ,buttons: Ext.Msg.OK
              ,modal: true
			});

            if (mod == 0)
              start = (pages-1) * 10;
            else
              start = pages * 10;
		    code_positionStore.load({ params: {start: start, limit: 10} });
            code_positionGrid.getView().refresh();
            code_positionEditor.stopEditing();
            code_positionGrid.getSelectionModel().selectRow(
              totalCount-1);
          }
          ,failure: function(resp,opt) {
            Ext.Msg.alert('Error', 'Cannot insert a new record');
          }
        }); // eo con.request
      } // eo handler
    },'-',{
      ref: '../removeBtn'
      ,xtype: 'tbbutton'
      ,id: 'id_pos_delete_btn'
      ,cls: 'x-btn-text-icon'
      ,icon: 'icons/delete.png'
      ,text: 'Delete'
      ,disabled: true
      ,handler: function() {
        Ext.Msg.show({
          title: 'Warning'
          ,icon: Ext.Msg.QUESTION
          ,msg: 'Are you sure to DELETE this record?'
          ,buttons: Ext.Msg.YESNO
          ,fn: function(btn){
            if (btn == 'no')
              return false;
            else
		    {
              code_positionEditor.stopEditing();
              var s = code_positionGrid.getSelectionModel().getSelections();
              for (var i=0,r; r=s[i]; i++) {
                code_positionStore.remove(r);
              }
              code_positionStore.commitChanges();
              code_positionGrid.getView().refresh();
            }
          }
        });
      }  	
    },'-',{
      xtype: 'tbbutton'
      ,text: '<b>Search:</b>'
      ,cls: 'x-btn-text'
      ,handler: function(b,e) {
        keypress = 0;
        var o = Ext.getCmp('id_code_position_kw');
        o.setValue('');
        o.focus();
        code_positionStore.baseParams = { kw: '' };
        code_positionStore.load({params: {start:0, limit:10} });
      }
    },{
      xtype: 'textfield'
      ,id: 'id_code_position_kw'
      ,name: 'keyword_code_position'
      ,enableKeyEvents: true
      ,listeners: {
        keyup: function(field, el){
          keypress = Ext.get('id_code_position_kw').getValue().length;
          if (keypress > 3)
            search_code_position();
        }
      }
    },{
      xtype: 'tbbutton'
      ,cls: 'x-btn-icon'
      ,icon: 'icons/zoom.png'
      ,handler: search_code_position
    }]
    ,columns: [
      { id: 'id_rownum', header: "#", width: 50, renderer: rowNumberer.createDelegate(this) }     
	  ,{ header: 'ID', width: 100, dataIndex: 'id', disabled: true }
      ,{ header: 'POS_TYPE', width: 100, dataIndex: 'pos_type',
        sortable: true, editor: new Ext.form.TextField({ allowBlank: false}) }
      ,{ header: 'POS_CODE', width: 100, dataIndex: 'pos_code',
        sortable: true, editor: new Ext.form.TextField({ allowBlank: false}) }
      ,{ id: 'pos_name', header: 'POS_NAME', width: 100, dataIndex: 'pos_name',
        sortable: true, editor: new Ext.form.TextField({ allowBlank: false}) }
      ,{ header: 'POS_GROUP', width: 100, dataIndex: 'pos_group',
        sortable: true, editor: new Ext.form.TextField({ allowBlank: false}) }
    ]
    ,autoExpandColumn: 'pos_name'
    ,renderTo: Ext.get('id-center')
    ,loadMask: { msg: 'Loading...' }
    ,stripeRows: true
  });
  code_positionStore.load({ params: { start:0, limit:10} });
  code_positionGrid.getSelectionModel().on('selectionchange', function(sm) {
  code_positionGrid.removeBtn.setDisabled(sm.getCount() < 1);
});

var progressFields = [{
  name: 'khet'
  ,type: 'string'
},{
  name: 'pcode'
  ,type: 'string'
},{
  name: 'pname'
  ,type: 'string'
},{
  name: 'total'
  ,type: 'string'
},{
  name: 'ok'
  ,type: 'string'
},{
  name: 'nok'
  ,type: 'string'
},{
  name: 'pct'
  ,type: 'int'
}];

var progressStore = new Ext.data.JsonStore({
  id: 'id_progressStore'
  ,url: 'rb/ajGetProgress.rb'
  ,root: 'records'
  ,autoLoad: false
  ,totalProperty: 'totalCount'
  ,fields: progressFields
});
progressStore.load({params: {start:0, limit:15} });

var addImage = function(){
  return '<img alt="รายละเอียด" src="icons/page_go.png"/>';
};

// custom plugin Ext.ux.ProgressColumn example
var progressColumn = new Ext.ux.grid.ProgressColumn({
  header : 'Percent'
  ,dataIndex : 'pct'
  ,width : 85
  ,textPst : '%' // string added to the end of the cell value (defaults to '%')
  ,colored : true // True for pretty colors, false for just blue (defaults to false)
});

var progressGrid = new Ext.grid.GridPanel({
  title: 'Progress'
  ,id: 'progress_grid_id'
  ,store: progressStore
  ,layout: 'fit'
  ,sm: new Ext.grid.RowSelectionModel({singleSelect: true})
  ,bbar: new Ext.PagingToolbar({
    pageSize: 15
    ,store: progressStore
    ,displayInfo: true
    ,displayMsg: 'Displaying {0} - {1} of {2}'
    ,emptyMsg: 'Not found'
  })
    ,tbar: [{
      xtype: 'tbbutton'
	  ,id: 'total_progress_tbar_id'
      ,text: 'Total Progress'
    }]
  ,columns: [
    { id: 'id_rownum', header: "#", width: 50, renderer: rowNumberer.createDelegate(this) }     
    ,{ header: 'เขต', width: 100, dataIndex: 'khet' }
    ,{ header: 'รหัสจังหวัด', width: 100, dataIndex: 'pcode', sortable: true }
    ,{ id: 'pname', header: 'จังหวัด', width: 200, dataIndex: 'pname', sortable: true }
    ,{ header: 'ยอดรวม', width: 100, dataIndex: 'total', sortable: true }
    ,{ header: 'บันทึกแล้ว', width: 100, dataIndex: 'ok', sortable: true }
    ,{ header: 'คงเหลือ', width: 100, dataIndex: 'nok', sortable: true }
	,progressColumn
	,{ id: 'id_detail' ,header: '' ,width: 50 ,dataIndex: '' ,renderer: addImage }
    ]
  ,autoExpandColumn: 'pname'
  ,loadMask: { msg: 'Loading...' }
  ,stripeRows: true
  ,listeners: {
    cellclick: function(grid, rowIndex, columnIndex, e){
      var data = grid.getStore().data.items[rowIndex].data;
	  cur_pcode = data.pcode;
      if (columnIndex == 8)
      {
		  Ext.ux.OnDemandLoad.load('js/ext3-rep-progress.js', 'initCode');
      }
    }
  }
})

var northBox = new Ext.BoxComponent({
  region: 'north'
  ,height: 100
  ,style: 'background-image:url(/man52/images/mainpage.png);background-repeat:no-repeat;'
});

var btns = [];

var adm_mnu1 = new Ext.Button({
  text: 'Manage Member Profiles'
  ,id: 'adm_mnu1'
  ,width: '100%'
  ,style: 'padding-bottom:5px;'
  ,toggleGroup: 'adm_mnu_btn'
  ,enableToggle: true
  ,handler: function() {
    Ext.getCmp('id-center').setActiveTab(0);
  }
});
btns.push(adm_mnu1);

var adm_mnu2 = new Ext.Button({
  text: 'Manage Education Codes'
  ,id: 'adm_mnu2'
  ,width: '100%'
  ,style: 'padding-bottom:5px;'
  ,toggleGroup: 'adm_mnu_btn'
  ,enableToggle: true
  ,handler: function() {
    Ext.getCmp('id-center').setActiveTab(1);
  }
});
btns.push(adm_mnu2);

var adm_mnu3 = new Ext.Button({
  text: 'Manage Position Codes'
  ,id: 'adm_mnu3'
  ,width: '100%'
  ,style: 'padding-bottom:5px;'
  ,toggleGroup: 'adm_mnu_btn'
  ,enableToggle: true
  ,handler: function() {
    Ext.getCmp('id-center').setActiveTab(2);
  }
});
btns.push(adm_mnu3);

var adm_mnu4 = new Ext.Button({
  text: 'Show Progress'
  ,id: 'adm_mnu4'
  ,width: '100%'
  ,style: 'padding-bottom:5px;'
  ,toggleGroup: 'adm_mnu_btn'
  ,enableToggle: true
  ,handler: function() {
	getTotalProgress();
    Ext.getCmp('id-center').setActiveTab(3);
  }
});
btns.push(adm_mnu4);

var logout_btn = new Ext.Button({
  text: 'Logout'
  ,width: '100%'
  ,style: 'padding-bottom:10px;'
  ,handler: function() {
    window.location.href = '/man52';
  }
});
btns.push(logout_btn);

westPanel = {
  id: 'id_west'
  ,title: 'Admin Menu'
  ,region: 'west'
  ,height: 200
  ,autoScroll: true
  ,width: 225
  ,margins: '0 0 0 0'
  ,collapsible: false  
  ,items: [btns]
}

centerPanel = {
  id: 'id-center'
  ,region: 'center'
  ,hideCollapseTool: true
  ,hideMode: 'offsets'
  ,xtype: 'tabpanel'
  ,border: false
  ,bodyBorder: false
  ,bodyStyle: 'margins:0;'
  ,listeners: {
    tabchange: function(panel,tab) {
      if (panel.activeTab.title == 'Members')
        adm_mnu1.toggle();
	  else if (panel.activeTab.title == 'Education')
        adm_mnu2.toggle();
	  else if (panel.activeTab.title == 'Position')
        adm_mnu3.toggle();
	  else if (panel.activeTab.title == 'Progress')
        adm_mnu4.toggle();
    }
    ,scope: this
  }
  ,items: [ memberGrid, code_educationGrid, code_positionGrid, progressGrid ]
}

Ext.onReady(function() {
  var container = new Ext.Viewport ({
    layout: 'border'
    ,renderTo: Ext.getBody()
    ,defaults: {
      collapsible: true
      ,split: true
      ,bodyStyle: 'padding:15px'
    }
    ,items: [northBox,westPanel,centerPanel]
  });
});
