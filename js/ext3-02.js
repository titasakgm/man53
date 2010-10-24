Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget = 'side';

// put cursor at rigtmost when focus ??
Ext.override(Ext.Element, {
    focus: function(defer, /* private */dom) {
        var me = this,
            dom = dom || me.dom;
        try {
            if (Number(defer)) {
                me.focus.defer(defer, null, [null, dom]);
            } else {
                dom.focus();
            }
        } catch (e) { }
        //begin override
        if (document.selection) {
            var range = document.selection.createRange();
            if (dom && dom.value) { 
             range.move('character', dom.value.length);
             range.select();
            }           
        }
        //end override
        return me;
    }
});

//FIXED Permission denied to access property 'dom' from a non-chrome context
Ext.lib.Event.resolveTextNode = Ext.isGecko ? function(node){
  if(!node){
    return;
  }
  var s = HTMLElement.prototype.toString.call(node);
  if(s == '[xpconnect wrapped native prototype]' || s == '[object XULElement]'){
    return;
  }
  return node.nodeType == 3 ? node.parentNode : node;
} : function(node){
	return node && node.nodeType == 3 ? node.parentNode : node;
};
/////

var cur_id; // Primary Key for UPDATE table epn,emp,pcupis,pcugmp,pcuepn,pcuemp
var cur_login = login;

var cur_hcode = cur_piscode = cur_otype = cur_hcflag = '';
var cur_office = '';
var cur_man;

var cur_ptype = '';
var cur_cid = cur_fname = cur_lname = '';
var cur_sex = 0;
var cur_edu_first_code = cur_edu_first_text = cur_edu_top_code = cur_edu_top_text = '';
var cur_pos_j18_code = cur_pos_active_code = cur_pos_j18_text = cur_pos_active_text = '';

var cur_edu_level = cur_ecode = cur_edesc = '';
var cur_pos_level = cur_poscode = cur_posname = '';

var kw = '%';
var kws = '';
var keypress = 0;

var searchdegree_win = '';
var searchpos_win = '';

var hcs = [];
var hns = [];
var lck = [];
var hcf = [];

hcs = hcode.split('|');
hns = office.split('|');
lck = lock.split('|');
hcf = hc_flag.split('|');

cur_ssjsso = 'f'
if (office.match('สสจ.'))
  cur_ssjsso = 't';
else if (office.match('สสอ.'))
  cur_ssjsso = 't';

cur_hcode = hcs[0];
cur_office = hns[0];
cur_hcflag = hcf[0];

//var inputform_win;
//var inputform;
//var addform_win;
//var addform;

var m01lock = m02lock = m03lock = m04lock = m05lock = m06lock = m07lock = m08lock = '';
m01lock = lck[0];
m02lock = lck[1];
m03lock = lck[2];
m04lock = lck[3];
m05lock = lck[4];
m06lock = lck[5];
m07lock = lck[6];
m08lock = lck[7];

var cur_gridlock;
var active_tab;

var add_flag, delete_flag, lock_flag, unlock_flag, next_flag, save_flag;

//Add flag to be active when otype=6 (สอ.)
var m01_flag, m05_flag;


////if (cur_hcflag == 't')
////{
  ////cur_gridlock = m05lock;
  ////cur_man = 5;
  ////active_tab = 4;
  ////m01_flag = true;
  ////m05_flag = false;
////}
////else
////{
  ////cur_gridlock = m01lock;
  ////cur_man = 1;
  ////active_tab = 0;
  ////m01_flag = false;
  ////m05_flag = true;
////}

//// For man53 all lock start with 1
cur_gridlock = m01lock;
cur_man = 1;
active_tab = 0;
m01_flag = false;
m05_flag = true;

setAddDeleteLockUnlockNext();

var m01_store = new Ext.data.Store({
  url: 'rb/get-m01-store.rb'
  ,id: 'id_m01_store'
  ,baseParams: { hcode: cur_hcode }
  ,reader: new Ext.data.JsonReader({
    root: 'rows'
    ,totalProperty: 'totalCount'
    ,id: 'id'
    ,fields: [
      'id'
      ,'hcode'
      ,'piscode'
	  ,'otype'
	  ,'office'
      ,'cid'
      ,'sex'
	  ,'fname'
      ,'lname'
      ,'edu_first'
	  ,'edu_top'
	  ,'pos_j18'
	  ,'pos_active'
    ]
  }) 
});

m01_store.load({params:{start:0, limit: 10}});

var m02_store = new Ext.data.Store({
  url: 'rb/get-m02-store.rb'
  ,id: 'id_m02_store'
  ,baseParams: { hcode: cur_hcode }
  ,reader: new Ext.data.JsonReader({
    root: 'rows'
    ,totalProperty: 'totalCount'
    ,id: 'id'
    ,fields: [
      'id'
      ,'hcode'
      ,'piscode'
	  ,'otype'
	  ,'office'
      ,'cid'
      ,'sex'
	  ,'fname'
      ,'lname'
      ,'edu_first'
	  ,'edu_top'
	  ,'pos_j18'
	  ,'pos_active'
    ]
  }) 
});

m02_store.load({params:{start:0, limit: 10}});

var m03_store = new Ext.data.Store({
  url: 'rb/get-m03-store.rb'
  ,id: 'id_m03_store'
  ,baseParams: { hcode: cur_hcode }
  ,reader: new Ext.data.JsonReader({
    root: 'rows'
    ,totalProperty: 'totalCount'
    ,id: 'id'
    ,fields: [
      'id'
      ,'hcode'
      ,'piscode'
	  ,'otype'
	  ,'office'
      ,'cid'
      ,'sex'
	  ,'fname'
      ,'lname'
      ,'edu_first'
	  ,'edu_top'
	  ,'pos_j18'
	  ,'pos_active'
    ]
  }) 
});

m03_store.load({params:{start:0, limit: 10}});

var m04_store = new Ext.data.Store({
  url: 'rb/get-m04-store.rb'
  ,id: 'id_m04_store'
  ,baseParams: { hcode: cur_hcode }
  ,reader: new Ext.data.JsonReader({
    root: 'rows'
    ,totalProperty: 'totalCount'
    ,id: 'id'
    ,fields: [
      'id'
      ,'hcode'
      ,'piscode'
	  ,'otype'
	  ,'office'
      ,'cid'
      ,'sex'
	  ,'fname'
      ,'lname'
      ,'edu_first'
	  ,'edu_top'
	  ,'pos_j18'
	  ,'pos_active'
    ]
  }) 
});

m04_store.load({params:{start:0, limit: 10}});

var m05_store = new Ext.data.Store({
  url: 'rb/get-m05-store.rb'
  ,id: 'id_m05_store'
  ,baseParams: { hcode: cur_hcode }
  ,reader: new Ext.data.JsonReader({
    root: 'rows'
    ,totalProperty: 'totalCount'
    ,id: 'id'
    ,fields: [
      'id'
      ,'hcode'
      ,'piscode'
	  ,'otype'
	  ,'office'
      ,'cid'
      ,'sex'
	  ,'fname'
      ,'lname'
      ,'edu_first'
	  ,'edu_top'
	  ,'pos_j18'
	  ,'pos_active'
    ]
  }) 
});

m05_store.load({params:{start:0, limit: 10}});

var m06_store = new Ext.data.Store({
  url: 'rb/get-m06-store.rb'
  ,id: 'id_m06_store'
  ,baseParams: { hcode: cur_hcode }
  ,reader: new Ext.data.JsonReader({
    root: 'rows'
    ,totalProperty: 'totalCount'
    ,id: 'id'
    ,fields: [
      'id'
      ,'hcode'
      ,'piscode'
	  ,'otype'
	  ,'office'
      ,'cid'
      ,'sex'
	  ,'fname'
      ,'lname'
      ,'edu_first'
	  ,'edu_top'
	  ,'pos_j18'
	  ,'pos_active'
    ]
  }) 
});

m06_store.load({params:{start:0, limit: 10}});

var m07_store = new Ext.data.Store({
  url: 'rb/get-m07-store.rb'
  ,id: 'id_m07_store'
  ,baseParams: { hcode: cur_hcode }
  ,reader: new Ext.data.JsonReader({
    root: 'rows'
    ,totalProperty: 'totalCount'
    ,id: 'id'
    ,fields: [
      'id'
      ,'hcode'
      ,'piscode'
	  ,'otype'
	  ,'office'
      ,'cid'
      ,'sex'
	  ,'fname'
      ,'lname'
      ,'edu_first'
	  ,'edu_top'
	  ,'pos_j18'
	  ,'pos_active'
    ]
  }) 
});

m07_store.load({params:{start:0, limit: 10}});

var m08_store = new Ext.data.Store({
  url: 'rb/get-m08-store.rb'
  ,id: 'id_m08_store'
  ,baseParams: { hcode: cur_hcode }
  ,reader: new Ext.data.JsonReader({
    root: 'rows'
    ,totalProperty: 'totalCount'
    ,id: 'id'
    ,fields: [
      'id'
      ,'hcode'
      ,'piscode'
	  ,'otype'
	  ,'office'
      ,'cid'
      ,'sex'
	  ,'fname'
      ,'lname'
      ,'edu_first'
	  ,'edu_top'
	  ,'pos_j18'
	  ,'pos_active'
    ]
  }) 
});

m08_store.load({params:{start:0, limit: 10}});

var addImage = function(){
  return '<img alt="รายละเอียด" src="icons/table_edit.png"/>';
};

var edu_store = new Ext.data.Store({
  url: 'rb/get-edu-store.rb'
  ,id: 'id_edu_store'
  ,baseParams: { key: kw }
  ,reader: new Ext.data.JsonReader({
    root: 'rows'
    ,totalProperty: 'totalCount'
    ,id: 'id'
    ,fields: [
      'id'
      ,'e_code'
      ,'e_desc'
    ]
  })
});

edu_store.load({params:{start:0, limit: 10}});

var smEdu = new Ext.grid.RowSelectionModel({
  singleSelect: true
  ,listeners: {
    rowselect: {
      fn: function(sm,index,record){
        cur_ecode = record.data.e_code;
        cur_edesc = record.data.e_desc;
		Ext.getCmp(cur_edu_level).setValue(cur_edesc);
		Ext.getCmp('id_searchdegree_win').hide();
        if (cur_edu_level == 'id_addform_per_edu_first' || cur_edu_level == 'id_inputform_per_edu_first' )
		{
          cur_edu_first_code = cur_ecode;
          cur_edu_first_text = cur_edesc;
        }
        else
		{
          cur_edu_top_code = cur_ecode;
          cur_edu_top_text = cur_edesc;
        }
      }
    }
  }
});

var edu_grid = new Ext.grid.GridPanel({
  frame: false
  ,autoHeight: true
  ,layout: 'fit'
  ,id: 'id_edu_grid'
  ,store: edu_store
  ,columns: [{
    id: 'e_code'
    ,header: '<b>รหัส</b>'
    ,dataIndex: 'e_code'
    ,width: 50
    ,sortable: true
  },{
    id: 'e_desc'
    ,header: '<b>วุฒิการศึกษา</b>'
    ,dataIndex: 'e_desc'
    ,width: 100
    ,sortable: true
  }]
  ,sm: smEdu
  ,autoExpandColumn: 'e_desc'
  ,stripeRows: true
  ,viewConfig: {
    forceFit: true
  }
  ,tbar: ['->', {
    xtype: 'tbbutton'
    ,text: '<b>Keyword:</b>'
    ,cls: 'x-btn-text'
    ,handler: function(b,e) {
      keypress = 0;
      var o = Ext.getCmp('id_keyword_edu');
      o.setValue('');
      o.focus();
      edu_store.baseParams = { kw: '' };
      edu_store.load({params: {start:0, limit:10} });
    }
  },{
    xtype: 'textfield'
    ,id: 'id_keyword_edu'
    ,name: 'keyword_edu'
    ,enableKeyEvents: true
    ,listeners: {
      keyup: function(field, el){
        keypress = Ext.get('id_keyword_edu').getValue().length;
        if (keypress > 3)
          doSearchEdu();
      }
    }
  },{
    xtype: 'tbbutton'
    ,cls: 'x-btn-icon'
    ,icon: 'icons/zoom.png'
    ,handler: doSearchEdu
  }]
  ,bbar: new Ext.PagingToolbar({
    pageSize: 10
    ,store: edu_store
    ,displayInfo: true
    ,emptyMsg: 'No record to display'
    ,displayMsg: 'Records {0} - {1} of {2}'
  })
});

function showSearchDegreeForm() {
  if (!searchdegree_win)
  {
    kw = '%';
	searchdegree_win = new Ext.Window({
      width: 400
      ,id: 'id_searchdegree_win'
      ,autoHeight: true
      ,x: 715
	  ,y: 85
      ,title:  'ค้นหารหัสวุฒิการศึกษา'
      ,items: [ edu_grid ]
      ,closable: false
    });
  }
  searchdegree_win.show();
  smEdu.clearSelections();
}

function doSearchEdu()
{
  kw = Ext.get('id_keyword_edu').dom.value;
  edu_store.baseParams = {key: kw}
  edu_store.load({params:{start:0, limit: 10}});
}

var pos_store = new Ext.data.Store({
  url: 'rb/get-pos-store.rb'
  ,id: 'id_pos_store'
  ,baseParams: { key: kw, ptype: cur_man }
  ,reader: new Ext.data.JsonReader({
    root: 'rows'
    ,totalProperty: 'totalCount'
    ,id: 'pos_code'
    ,fields: [
      'pos_code'
      ,'pos_name'
    ]
  })
});

pos_store.load({params:{start:0, limit: 10}});

var smPos = new Ext.grid.RowSelectionModel({
  singleSelect: true
  ,listeners: {
    rowselect: {
      fn: function(sm,index,record){
        cur_poscode = record.data.pos_code;
        cur_posname = record.data.pos_name;
        Ext.getCmp(cur_pos_level).setValue(cur_posname);
        Ext.getCmp('id_searchpos_win').hide();
        if (cur_pos_level == 'id_addform_per_pos_j18' || cur_pos_level == 'id_inputform_per_pos_j18' )
        {
          //cur_pos_j18_code = cur_poscode;
          //cur_pos_j18_text = cur_posname;
          cur_pos_j18_code = '99999'
          cur_pos_j18_text = 'ไม่ต้องระบุ'
        }
        else
        {
          cur_pos_active_code = cur_poscode;
          cur_pos_active_text = cur_posname;
        }
      }
    }
  }
});

var pos_grid = new Ext.grid.GridPanel({
  frame: false
  ,autoHeight: true
  ,layout: 'fit'
  ,id: 'id_pos_grid'
  ,store: pos_store
  ,columns: [{
    id: 'pos_code'
    ,header: '<b>รหัส</b>'
    ,dataIndex: 'pos_code'
    ,width: 30
    ,sortable: true
  },{
    id: 'pos_name'
    ,header: '<b>ตำแหน่ง</b>'
    ,dataIndex: 'pos_name'
    ,width: 100
    ,sortable: true
  }]
  ,sm: smPos
  ,autoExpandColumn: 'pos_name'
  ,stripeRows: true
  ,viewConfig: {
    forceFit: true
  }
  ,tbar: ['->', {
    xtype: 'tbbutton'
    ,text: '<b>Keyword:</b>'
    ,cls: 'x-btn-text'
    ,handler: function(b,e) {
      keypress = 0;
      var o = Ext.getCmp('id_keyword_pos');
      o.setValue('');
      o.focus();
      pos_store.baseParams = {key: '', ptype: cur_man}
      pos_store.load({params:{start:0, limit: 10}});
    }
  },{
    xtype: 'textfield'
    ,id: 'id_keyword_pos'
    ,name: 'keyword_pos'
    ,enableKeyEvents: true
    ,listeners: {
      keyup: function(field, el){
        keypress = Ext.get('id_keyword_pos').getValue().length;
        if (keypress > 3)
          doSearchPos();
      }
    }
  },{
    xtype: 'tbbutton'
    ,cls: 'x-btn-icon'
    ,icon: 'icons/zoom.png'
    ,handler: doSearchPos
  }]
  ,bbar: new Ext.PagingToolbar({
    pageSize: 10
    ,store: pos_store
    ,displayInfo: true
    ,emptyMsg: 'No record to display'
    ,displayMsg: 'Records {0} - {1} of {2}'
  })
});

function showSearchPosForm() {
  if (!searchpos_win)
  {
    kw = '%';
	searchpos_win = new Ext.Window({
      width: 400
      ,id: 'id_searchpos_win'
      ,autoHeight: true
      ,x: 715
	  ,y: 85
      ,title:  'ค้นหารหัสตำแหน่ง'
      ,items: [ pos_grid ]
      ,closable: false
    });
  }
  searchpos_win.show();
  smPos.clearSelections();
}

function doSearchPos()
{
  kw = Ext.getCmp('id_keyword_pos').getValue();
  pos_store.baseParams = {key: kw, ptype: cur_man}
  pos_store.load({params:{start:0, limit: 10}});
}

Ext.apply(Ext.form.VTypes,{
  cid: function(val, field){
    try{
      var cid = field.getValue();
      return  cid.length == 13;
    } catch(e) {
      return false;
    }
  }
  ,cidText: 'รับค่าได้เฉพาะตัวเลข 0-9 จำนวน 13 หลักเท่านั้น'
  ,cidMask: /[0-9]/
});

//Ext.apply(Ext.form.VTypes,{
  //piscode: function(val, field){
    //try{
      //var  piscode = field.getValue();
      //return  piscode.length == 5;
    //} catch(e) {
      //return false;
    //}
  //}
  //,piscodeText: 'รับค่าได้เฉพาะตัวเลข 0-9 จำนวน 5 หลักเท่านั้น'
  //,piscodeMask: /[0-9]/
//});

function showInputForm() {
if (!inputform)
{
    var inputform = new Ext.form.FormPanel({
      id: 'id_inputform'
	  ,url: 'rb/ajSaveInputForm.rb'
      ,autoHeight: true
      ,items: [{
        layout: 'column'
        ,border: false
        ,anchor: '0'
        ,style: 'padding: 10px;'
        ,items:[{
          columnWidth: 1
          ,layout: 'form'
	      ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_id'
            ,id: 'id_inputform_per_id'
			,fieldLabel: 'ID'
            ,labelWidth: 75
            ,xtype: 'textfield'
            ,anchor: '90%'
			,value: cur_id
			,readOnly: true
          }]
        },{
          columnWidth: 1
          ,layout: 'form'
          ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_piscode'
            ,id: 'id_inputform_per_piscode'
            ,fieldLabel: 'รหัส กอง จ'
            ,labelWidth: 75
            ,xtype: 'textfield'
            ,anchor: '90%'
            ,value: cur_piscode
            //,vtype: 'piscode'
          }]
        },{
          columnWidth: 1
          ,layout: 'form'
	      ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_cid'
            ,id: 'id_inputform_per_cid'
            ,fieldLabel: 'เลขที่บัตรประชาชน'
            ,labelWidth: 75
            ,xtype: 'textfield'
            ,anchor: '90%'
            ,value: cur_cid
            ,vtype: 'cid'
          }]
        },{
          columnWidth: 1
          ,layout: 'form'
          ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_fname'
            ,id: 'id_inputform_per_fname'
            ,fieldLabel: 'ชื่อ'
            ,labelWidth: 75
            ,xtype: 'textfield'
            ,anchor: '90%'
			,value: cur_fname
          }]
        },{
          columnWidth: 1
          ,layout: 'form'
          ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_lname'
            ,id: 'id_inputform_per_lname'
            ,fieldLabel: 'นามสกุล'
            ,labelWidth: 75
            ,xtype: 'textfield'
            ,anchor: '90%'
			,value: cur_lname
          }]
        },{
          columnWidth: 1
          ,layout: 'form'
	      ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_sex'
            ,id: 'id_inputform_per_sex'
            ,fieldLabel: 'เพศ'
            ,labelWidth: 75
            ,xtype: 'combo'
            ,value: cur_sex
            ,store:[
              [0, 'ระบุ']
              ,[1, 'ชาย']
              ,[2, 'หญิง']
            ]
            ,mode: 'local'
            ,triggerAction: 'all'
            ,hiddenName: 'per_sex'
            ,width: 100
          }]
        },{
          columnWidth: .9
          ,layout: 'form'
	      ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_edu_first'
			,id: 'id_inputform_per_edu_first'
            ,xtype: 'textfield'
            ,fieldLabel: 'วุฒิฯที่บรรจุ'
            ,labelWidth: 75
            ,emptyText: 'ระบุ'
            ,anchor: '100%'
			,disabled: true
            ,value: cur_edu_first_text
          }]
        },{
          columnWidth: .1
          ,border: false
          ,items: [{
            xtype: 'button'
            ,icon: '/man53/icons/find.png'
            ,handler: function(b,e){
			  cur_edu_level = 'id_inputform_per_edu_first';
              showSearchDegreeForm();
            }
          }]
        },{
          columnWidth: .9
          ,layout: 'form'
          ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_edu_top'
			,id: 'id_inputform_per_edu_top'
            ,xtype: 'textfield'
			,fieldLabel: 'วุฒิฯสูงสุด'
            ,labelWidth: 75
            ,emptyText: 'ระบุ'
            ,anchor: '100%'
			,disabled: true
            ,value: cur_edu_top_text
          }]
        },{
          columnWidth: .1
          ,border: false
          ,items: [{
            xtype: 'button'
            ,icon: '/man53/icons/find.png'
            ,handler: function(b,e){
			  cur_edu_level = 'id_inputform_per_edu_top';
              showSearchDegreeForm();
            }
          }]
        },{
          columnWidth: .9
          ,layout: 'form'
	      ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_pos_j18'
	    ,id: 'id_inputform_per_pos_j18'
            ,xtype: 'textfield'
	    ,fieldLabel: 'ตำแหน่งตาม จ.18'
            ,labelWidth: 75
            ,emptyText: 'ไม่ต้องระบุ'
            ,anchor: '100%'
	    ,disabled: true
            //,value: cur_pos_j18_text
            ,value: 'ไม่ต้องระบุ'
          }]
        },{
          columnWidth: .1
          ,border: false
          ,items: [{
            xtype: 'button'
            ,icon: '/man53/icons/find.png'
            ,handler: function(b,e){
	      //cur_pos_level = 'id_inputform_per_pos_j18';
              //showSearchPosForm();
              Ext.Msg.alert('Info','ยกเลิกข้อมูลนี้แล้ว');
              return false;
            }
          }]
        },{
          columnWidth: .9
          ,layout: 'form'
          ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_pos_active'
            ,id: 'id_inputform_per_pos_active'
            ,xtype: 'textfield'
			,fieldLabel: 'ปฏิบัติงานจริง'
            ,labelWidth: 75
            ,emptyText: 'ระบุ'
            ,anchor: '100%'
			,disabled: true
            ,value: cur_pos_active_text
          }]
        },{
          columnWidth: .1
          ,border: false
          ,items: [{
            xtype: 'button'
            ,icon: '/man53/icons/find.png'
            ,handler: function(b,e){
			  cur_pos_level = 'id_inputform_per_pos_active';
              showSearchPosForm();
            }
          }]
        }]
      }]
    });
};
  //Update inputform with new data from new row and ajGetEduPos.rb
  //Ext.getCmp('id_inputform_per_id').setValue(cur_id);
  //Ext.getCmp('id_inputform_per_piscode').setValue(cur_piscode);
  //Ext.getCmp('id_inputform_per_cid').setValue(cur_cid);
  //Ext.getCmp('id_inputform_per_fname').setValue(cur_fname);
  //Ext.getCmp('id_inputform_per_lname').setValue(cur_lname);
  //Ext.getCmp('id_inputform_per_sex').setValue(cur_sex);
  //Ext.getCmp('id_inputform_per_edu_first').setValue(cur_edu_first_text);
  //Ext.getCmp('id_inputform_per_edu_top').setValue(cur_edu_top_text);
  //Ext.getCmp('id_inputform_per_pos_j18').setValue(cur_pos_j18_text);
  //Ext.getCmp('id_inputform_per_pos_active').setValue(cur_pos_active_text);
 
  if (cur_man == '1')
    cur_gridlock = m01lock;
  else if (cur_man == '2')
    cur_gridlock = m02lock;
  else if (cur_man == '3')
    cur_gridlock = m03lock;
  else if (cur_man == '4')
    cur_gridlock = m04lock;
  else if (cur_man == '5')
    cur_gridlock = m05lock;
  else if (cur_man == '6')
    cur_gridlock = m06lock;
  else if (cur_man == '7')
    cur_gridlock = m07lock;
  else if (cur_man == '8')
    cur_gridlock = m08lock;

  if (!inputform_win) {
    var inputform_win = new Ext.Window({
      id: 'id_inputform_win'
      ,width: 400
      ,autoHeight: true
      ,layout: 'fit'
      ,title: 'รายละเอียดข้อมูลบุคลากร  '+ '<br/><font color="red">:: ' + Ext.getCmp('id_man_' + cur_man).title + '</font><br/><font color="green">:: ' + cur_office + '</font>' 
      ,closable: true
      ,modal: true
	  ,plain: true
      ,items: [ inputform ]
      ,buttonAlign: 'center'
      ,buttons:[{
        text: 'Save'
		,id: 'id_save_inputform_btn'
		,disabled: save_flag
        ,handler: function() {
	  //cur_pos_j18 = Ext.getCmp('id_inputform_per_pos_j18').getValue();
	  cur_pos_j18 = '99999';
	  cur_pos_active = Ext.getCmp('id_inputform_per_pos_active').getValue();
          Ext.getCmp('id_inputform').getForm().submit({
            method: 'POST'
            ,params: {
              per_hcode: cur_hcode
              ,per_otype: cur_otype
              ,per_type: cur_man
              ,per_login: cur_login
              ,per_edu_first: cur_edu_first_code 
              ,per_edu_top: cur_edu_top_code
              //,per_pos_j18: cur_pos_j18_code
              ,per_pos_j18: '99999'
              ,per_pos_active: cur_pos_active_code
            }
            ,success: function(form, action){
              var json = Ext.util.JSON.decode(action.response.responseText);
              msg = json.msg;
              Ext.Msg.show({
                title: 'Success'
                ,msg: msg
                ,icon: Ext.Msg.INFO
                ,buttons: Ext.Msg.OK
                ,modal: true
              });
              Ext.getCmp('id_inputform_win').close();
                reloadCurrentStore();
            }
            ,failure: function(form, action){
              var json = Ext.util.JSON.decode(action.response.responseText);
              msg = json.msg;
              Ext.Msg.show({
                title: 'Warning'
                ,msg: msg
                ,icon: Ext.Msg.WARNING
                ,buttons: Ext.Msg.OK
                ,modal: true
              });
            }
          });
        }
      },{
        text: 'Cancel'
        ,handler: function(){
        //if (inputform_win.hidden == false)
         //inputform_win.hide();
          inputform_win.close();
          if (searchdegree_win.hidden == false)
            searchdegree_win.hide();
          if (searchpos_win.hidden == false)
            searchpos_win.hide();
        }
      }] //eo buttons
    }); //eo new Ext.Window
  }
  //show window
  if (save_flag)
    Ext.getCmp('id_save_inputform_btn').disable();
  else
    Ext.getCmp('id_save_inputform_btn').enable();
  inputform_win.show();
  inputform_win.center();
};

function showAddForm() {
  if (!addform) {
    var addform = new Ext.form.FormPanel({
      id: 'id_addform'
	  ,url: 'rb/ajAddForm.rb'
      ,autoHeight: true
      ,items: [{
        layout: 'column'
        ,border: false
        ,anchor: '0'
        ,style: 'padding: 10px;'
        ,items:[{
          columnWidth: 1
          ,layout: 'form'
	      ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_id'
            ,id: 'id_addform_per_id'
			,fieldLabel: 'ID'
            ,labelWidth: 75
            ,xtype: 'textfield'
            ,anchor: '90%'
			,value: 'auto'
			,disabled: true
          }]
        },{
          columnWidth: 1
          ,layout: 'form'
          ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_piscode'
            ,id: 'id_addform_per_piscode'
            ,fieldLabel: 'รหัส กอง จ'
            ,labelWidth: 75
            ,xtype: 'textfield'
            ,anchor: '90%'
            ,value: cur_piscode
            //,vtype: 'piscode'
          }]
        },{
          columnWidth: 1
          ,layout: 'form'
	      ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_cid'
            ,id: 'id_addform_per_cid'
            ,fieldLabel: 'เลขที่บัตรประชาชน'
            ,labelWidth: 75
            ,xtype: 'textfield'
            ,anchor: '90%'
            ,vtype: 'cid'
          }]
        },{
          columnWidth: 1
          ,layout: 'form'
          ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_fname'
            ,id: 'id_addform_per_fname'
            ,fieldLabel: 'ชื่อ'
            ,labelWidth: 75
            ,xtype: 'textfield'
            ,anchor: '90%'
          }]
        },{
          columnWidth: 1
          ,layout: 'form'
          ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_lname'
            ,id: 'id_addform_per_lname'
            ,fieldLabel: 'นามสกุล'
            ,labelWidth: 75
            ,xtype: 'textfield'
            ,anchor: '90%'
      }]
        },{
          columnWidth: 1
          ,layout: 'form'
	      ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_sex'
            ,id: 'id_addform_per_sex'
            ,fieldLabel: 'เพศ'
            ,labelWidth: 75
            ,xtype: 'combo'
            ,value: 0
            ,store:[
              [0, 'ระบุ']
              ,[1, 'ชาย']
              ,[2, 'หญิง']
            ]
            ,mode: 'local'
            ,triggerAction: 'all'
            ,hiddenName: 'per_sex'
            ,width: 100
          }]
        },{
          columnWidth: .9
          ,layout: 'form'
	      ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_edu_first'
			,id: 'id_addform_per_edu_first'
            ,xtype: 'textfield'
            ,fieldLabel: 'วุฒิฯที่บรรจุ'
            ,labelWidth: 75
            ,emptyText: 'ระบุ'
            ,anchor: '100%'
			,disabled: true
          }]
        },{
          columnWidth: .1
          ,border: false
          ,items: [{
            xtype: 'button'
            ,icon: '/man53/icons/find.png'
            ,handler: function(b,e){
			  cur_edu_level = 'id_addform_per_edu_first';
              showSearchDegreeForm();
            }
          }]
        },{
          columnWidth: .9
          ,layout: 'form'
          ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_edu_top'
			,id: 'id_addform_per_edu_top'
            ,xtype: 'textfield'
			,fieldLabel: 'วุฒิฯสูงสุด'
            ,labelWidth: 75
            ,emptyText: 'ระบุ'
            ,anchor: '100%'
			,disabled: true
          }]
        },{
          columnWidth: .1
          ,border: false
          ,items: [{
            xtype: 'button'
            ,icon: '/man53/icons/find.png'
            ,handler: function(b,e){
			  cur_edu_level = 'id_addform_per_edu_top';
              showSearchDegreeForm();
            }
          }]
        },{
          columnWidth: .9
          ,layout: 'form'
          ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_pos_j18'
            ,id: 'id_addform_per_pos_j18'
            ,xtype: 'textfield'
            ,fieldLabel: 'ตำแหน่งตาม จ.18'
            ,labelWidth: 75
            ,emptyText: 'ไม่ต้องระบุ'
            ,anchor: '100%'
            ,disabled: true
          }]
        },{
          columnWidth: .1
          ,border: false
          ,items: [{
            xtype: 'button'
            ,icon: '/man53/icons/find.png'
            ,handler: function(b,e){
              //cur_pos_level = 'id_addform_per_pos_j18';
              //showSearchPosForm();
              Ext.Msg.alert('Info','ยกเลิกรายการนี้แล้ว');
              return false;
            }
          }]
        },{
          columnWidth: .9
          ,layout: 'form'
          ,autoHeight: true
          ,border: false
          ,items: [{
            name: 'per_pos_active'
            ,id: 'id_addform_per_pos_active'
            ,xtype: 'textfield'
			,fieldLabel: 'ปฏิบัติงานจริง'
            ,labelWidth: 75
            ,emptyText: 'ระบุ'
            ,anchor: '100%'
			,disabled: true
          }]
        },{
          columnWidth: .1
          ,border: false
          ,items: [{
            xtype: 'button'
            ,icon: '/man53/icons/find.png'
            ,handler: function(b,e){
			  cur_pos_level = 'id_addform_per_pos_active';
              showSearchPosForm();
            }
          }]
        }]
      }]
    });
  };

  if (!addform_win) {
    var addform_win = new Ext.Window({
      id: 'id_addform_win'
      ,width: 400
      ,autoHeight: true
      ,x: 285
      ,y: 85
      ,layout: 'fit'
      ,title: 'เพิ่มรายการข้อมูลบุคลากร  '+ '<br/><font color="red">:: ' + Ext.getCmp('id_man_' + cur_man).title + '</font><br/><font color="green">:: ' + cur_office + '</font>'
      ,closable: false
      ,modal: true
      ,items:[ addform ]
      ,buttonAlign: 'center'
      ,buttons:[{
        text: 'Save'
        ,handler: function() {
		  cur_piscode = Ext.getCmp('id_addform_per_piscode').getValue();
          Ext.getCmp('id_addform').getForm().submit({
            method: 'POST'
            ,params: {
              per_hcode: cur_hcode
              ,per_otype: cur_otype
              ,per_type: cur_man
              ,per_login: cur_login
              ,per_edu_first: cur_edu_first_code
              ,per_edu_top: cur_edu_top_code
              //,per_pos_j18: cur_pos_j18_code
              ,per_pos_j18: '99999'
              ,per_pos_active: cur_pos_active_code
            }
            ,success: function(form, action){
              var json = Ext.util.JSON.decode(action.response.responseText);
              msg = json.msg;
              Ext.Msg.show({
                title: 'Success'
                ,msg: msg
                ,icon: Ext.Msg.INFO
                ,buttons: Ext.Msg.OK
                ,modal: true
              });
			  //Ext.getCmp('id_addform_win').hide();
			  //Ext.getCmp('id_addform').getForm().reset();
			  Ext.getCmp('id_addform_win').close();
			  reloadCurrentStore();
			}
			,failure: function(form, action){
              var json = Ext.util.JSON.decode(action.response.responseText);
			  msg = json.msg;
              Ext.Msg.show({
                title: 'Warning'
                ,msg: msg
                ,icon: Ext.Msg.WARNING
                ,buttons: Ext.Msg.OK
                ,modal: true
              });
			}
          });
        }
      },{
        text: 'Clear'
		,handler: function(){
		  cur_sex = 0;
          Ext.getCmp('id_addform').getForm().reset();
        }
      },{
        text: 'Cancel'
		,handler: function(){
		  //if (addform_win.hidden == false)
		    //addform_win.hide();
		  addform_win.close();
		  if (searchdegree_win.hidden == false)
		    searchdegree_win.hide();
		  if (searchpos_win.hidden == false)
		    searchpos_win.hide();
        }
      }] //eo buttons
    }); //eo new Ext.Window
  }
  //show window
  addform_win.show();
}


// m0x_grid.getBottomToolbar().cursor --> current top row --> start
function reloadCurrentStore()
{
  var start = 0;
  if (cur_man == 1)
  {
      start = m01_grid.getBottomToolbar().cursor;
      m01_store.load({params: {start:start, limit:10} });
  }
  else if (cur_man == 2)
  {
      start = m02_grid.getBottomToolbar().cursor;
      m02_store.load({params: {start:start, limit:10} });
  }
  else if (cur_man == 3)
  {
      start = m03_grid.getBottomToolbar().cursor;
      m03_store.load({params: {start:start, limit:10} });
  }
  else if (cur_man == 4)
  {
      start = m04_grid.getBottomToolbar().cursor;
      m04_store.load({params: {start:start, limit:10} });
  }
  else if (cur_man == 5)
  {
      start = m05_grid.getBottomToolbar().cursor;
      m05_store.load({params: {start:start, limit:10} });
  }
  else if (cur_man == 6)
  {
      start = m06_grid.getBottomToolbar().cursor;
      m06_store.load({params: {start:start, limit:10} });
  }
  else if (cur_man == 7)
  {
      start = m07_grid.getBottomToolbar().cursor;
      m07_store.load({params: {start:start, limit:10} });
  }
  else if (cur_man == 8)
  {
      start = m08_grid.getBottomToolbar().cursor;
      m08_store.load({params: {start:start, limit:10} });
  }
}

function sex_string(val, x, store)
{
  var sex_str = '';
  if (val == '1')
    sex_str = 'ชาย';
  else
    sex_str = 'หญิง';
  return sex_str;
}

var rowNumberer = function(value, p, record) {
  var ds = record.store
  var i = ds.lastOptions.params.start
  if (isNaN(i)) {
    i = 0;
  }
  return ds.indexOf(record)+i+1;
};

var searchPerson = function(kw) {
  if (cur_man == '1')
  {
    m01_store.baseParams = { hcode: cur_hcode, kw: kw };
    m01_store.load({params: {start:0, limit:10} });
  }
  else if (cur_man == '2')
  {
    m02_store.baseParams = { hcode: cur_hcode, kw: kw };
    m02_store.load({params: {start:0, limit:10} });
  }
  else if (cur_man == '3')
  {
    m03_store.baseParams = { hcode: cur_hcode, kw: kw };
    m03_store.load({params: {start:0, limit:10} });
  }
  else if (cur_man == '4')
  {
    m04_store.baseParams = { hcode: cur_hcode, kw: kw };
    m04_store.load({params: {start:0, limit:10} });
  }
  else if (cur_man == '5')
  {
    m05_store.baseParams = { hcode: cur_hcode, kw: kw };
    m05_store.load({params: {start:0, limit:10} });
  }
  else if (cur_man == '6')
  {
    m06_store.baseParams = { hcode: cur_hcode, kw: kw };
    m06_store.load({params: {start:0, limit:10} });
  }
  else if (cur_man == '7')
  {
    m07_store.baseParams = { hcode: cur_hcode, kw: kw };
    m07_store.load({params: {start:0, limit:10} });
  }
  else if (cur_man == '8')
  {
    m08_store.baseParams = { hcode: cur_hcode, kw: kw };
    m08_store.load({params: {start:0, limit:10} });
  }
}

var smM01 = new Ext.grid.RowSelectionModel({
  singleSelect: true
  ,listeners: {
    rowselect: {
      fn: function(sm,index,record){
        Ext.getCmp('id_m01_delete_btn').enable();
      }
	}
  }
});

var m01_grid = new Ext.grid.GridPanel({
  frame: false
  ,id: 'm01_grid'
  ,store: m01_store
  ,sm: smM01
  ,stripeRows: true
  ,columns: [{
    id: 'id_rownum'    
    ,header: "#"
    ,width: 30
    ,renderer: rowNumberer.createDelegate(this)
  },{
    id: 'id_hcode'    
    ,header: '<b>รหัส สนย.</b>'
    ,dataIndex: 'hcode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_piscode'
    ,header: '<b>รหัส กอง จ.</b>'
    ,dataIndex: 'piscode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_office'
    ,header: '<b>ชื่อหน่วยงาน</b>'
    ,dataIndex: 'office'
    ,width: 150
    ,sortable: true
  },{
    id: 'id_cid'
    ,header: '<b>เลขที่บัตรประชาชน</b>'
    ,dataIndex: 'cid'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_fname'
    ,header: '<b>ชื่อ</b>'
    ,dataIndex: 'fname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_lname'
    ,header: '<b>นามสกุล</b>'
    ,dataIndex: 'lname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_sex'
    ,header: '<b>เพศ</b>'
    ,dataIndex: 'sex'
    ,width: 50
    ,sortable: true
    ,renderer: sex_string
  },{
    id: 'id_detail'
    ,header: ''
    ,width: 50
    ,dataIndex: ''
    ,renderer: addImage
  }]
  ,autoExpandColumn: 'id_office'
  ,viewConfig: {
    forceFit: true

    // Return CSS class to apply to rows depending upon data values
    ,getRowClass: function(record, index) {
      if (cur_gridlock == 't')
        return 'gridlock';
      else
        return 'default';
    }
  }
  ,tbar: [{
    xtype: 'tbbutton'
	,id: 'id_m01_add_btn'
    ,disabled: add_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/add.png'
    ,text: 'Add'
	,handler: function(b, e){
      // Second addform NOT clear old values
      showAddForm();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m01_delete_btn'
    ,disabled: true
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/delete.png'
    ,text: 'Delete'
	,handler: function(){
      var sm = m01_grid.getSelectionModel();
	  var sel = sm.getSelected();
	  if (sm.hasSelection()){
        Ext.Msg.show({
          title: 'ลบข้อมูลบุคลากร'
		  ,buttons: Ext.Msg.YESNOCANCEL
          ,msg: 'ยืนยันการลบข้อมูล ' + sel.data.fname + ' ' + sel.data.lname + '?'
          ,icon: Ext.Msg.WARNING
		  ,fn: function(btn){
            if (btn == 'yes'){
              var con = new Ext.data.Connection();
			  con.request({
                url: 'rb/ajDeletePerson.rb'
				,params: { id: sel.data.id, ptype: cur_man }
				,success: function(resp, opt){
				  m01_grid.getStore().remove(sel);
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ลบข้อมูล 1 รายการเรียบร้อยแล้ว'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
				}
				,failure: function(resp, opt){
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ไม่สามารถทำการลบข้อมูลได้'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
                }
			  }); // eo con
            } // eo if
          } // eo fn
        }); // eo show
	  } // eo if
    } // eo handler
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m01_unlock_btn'
    ,disabled: unlock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock_open.png'
    ,text: 'Unlock'
	,tooltip: 'กดปุ่มนี้เพื่อปลด Lock และทำการแก้ไขข้อมูลใหม่'
    ,handler: function(b, e){
	  Ext.getCmp('id_m01_lock_btn').enable();
	  Ext.getCmp('id_m01_next_btn').disable();
	  Ext.getCmp('id_m01_add_btn').enable();
	  Ext.getCmp('id_m01_delete_btn').disable();
      this.disable();
	  Ext.getCmp('id_m01_next_btn').disable();
	  m01lock = 'f';
	  save_flag = false;
	  ajUnlock(cur_hcode,'m01');
	  cur_gridlock = m01lock;
	  m01_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m01_lock_btn'
	,disabled: lock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock.png'
    ,text: 'Lock'
	,tooltip: 'กดปุ่มนี้เพื่อ Lock ข้อมูลเมื่อเสร็จสิ้นการแก้ไขข้อมูล และทำการแก้ไขประเภทบุคลากรอื่นต่อไป'
    ,handler: function(b, e){
	  Ext.getCmp('id_m01_unlock_btn').enable();
	  Ext.getCmp('id_m01_next_btn').enable();
	  Ext.getCmp('id_m01_add_btn').disable();
	  Ext.getCmp('id_m01_delete_btn').disable();
	  this.disable();
	  m01lock = 't';
	  save_flag = true;
	  ajLock(cur_hcode,'m01');
	  cur_gridlock = m01lock;
	  m01_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m01_search_text'
    ,cls: 'x-btn-text'
	,text: 'Search'
	,handler: function() {
      var o = Ext.getCmp('id_m01_kw');
	  o.setValue('');
	  o.focus();
	  kws = '';
    }
  },{
    xtype: 'textfield'
	,id: 'id_m01_kw'
    ,value: kws
    ,enableKeyEvents: true
    ,listeners: {
      specialkey: function(field, el){
		if (el.getKey() == Ext.EventObject.ENTER)
		{
          kws = field.getValue();
		  searchPerson(kws);
		}
      }
	}
  },{
    xtype: 'tbbutton'
	,id: 'id_m01_search_btn'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/zoom.png'
	,handler: function() {
      kws= Ext.getCmp('id_m01_kw').getValue();
	  searchPerson(kws);
	}
  },'->',{
    xtype: 'tbbutton'
    ,id: 'id_m01_next_btn'
	,disabled: next_flag
    ,text: 'Next'
    ,tooltip: 'บันทึกข้อมูลบุคลากรประเภทต่อไป!'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/resultset_next.png'
    ,handler: function(b,e) {
      Ext.getCmp('id_man_1').disable();
      cur_man = 2;
      m02_store.baseParams = {hcode: cur_hcode};
      m02_store.load({params:{start:0, limit: 10}});
      Ext.getCmp('id_man_2').enable();
      Ext.getCmp('id_man_2').show();
      cur_gridlock = m02lock;
      if (cur_gridlock == 't')
      {
        Ext.getCmp('id_m02_add_btn').disable();
        Ext.getCmp('id_m02_delete_btn').disable();
        Ext.getCmp('id_m02_unlock_btn').enable();
        Ext.getCmp('id_m02_lock_btn').disable();
        Ext.getCmp('id_m02_next_btn').enable();
        save_flag = true;
      }
      else
      {
        Ext.getCmp('id_m02_add_btn').enable();
        Ext.getCmp('id_m02_delete_btn').disable();
        Ext.getCmp('id_m02_unlock_btn').disable();
        Ext.getCmp('id_m02_lock_btn').enable();
        Ext.getCmp('id_m02_next_btn').disable();
        save_flag = false;
      }
	}
  }]
  ,listeners: {
    cellclick: function(grid, rowIndex, columnIndex, e){
      var data = grid.getStore().data.items[rowIndex].data;
      cur_id = data.id;
      cur_cid = data.cid;
      cur_hcode = data.hcode;
      cur_piscode = data.piscode;
      cur_otype = data.otype;
      cur_fname = data.fname;
      cur_lname = data.lname;
      cur_sex = parseInt(data.sex);

      if (columnIndex == 8)
      {
        var con = new Ext.data.Connection();
        con.request({
          url: 'rb/ajGetEduPos.rb'
	  ,params: {id: cur_id, ptype: cur_man}
	  ,success: function(resp, opt){
            var json = Ext.util.JSON.decode(resp.responseText);
            cur_edu_first_code = json.edu_first_code;
            cur_edu_first_text = json.edu_first_text;
            cur_edu_top_code = json.edu_top_code;
            cur_edu_top_text = json.edu_top_text;
            cur_pos_j18_code = json.pos_j18_code;
            cur_pos_j18_text = json.pos_j18_text;
            cur_pos_active_code = json.pos_active_code;
            cur_pos_active_text = json.pos_active_text;
            showInputForm();
          }
          ,failure: function(resp,opt){
            Ext.Msg.show({
              title: 'Warning'
              ,msg: 'ไม่สามารถเรียกดูข้อมูลจาก Server ได้'
              ,icon: Ext.Msg.WARNING
              ,buttons: Ext.Msg.OK
              ,modal: true
            });
            return false;
          }
	});
      }
    } //eo cellclick
  } //eo listeners
  ,bbar: new Ext.PagingToolbar({
    pageSize: 10
    ,store: m01_store
    ,displayInfo: true
    ,emptyMsg: 'No record to display'
    ,displayMsg: 'Records {0} - {1} of {2}'
  })
});

var smM02 = new Ext.grid.RowSelectionModel({
  singleSelect: true
  ,listeners: {
    rowselect: {
      fn: function(sm,index,record){
        Ext.getCmp('id_m02_delete_btn').enable();
      }
	}
  }
});

var m02_grid = new Ext.grid.GridPanel({
  frame: false
  ,id: 'm02_grid'
  ,store: m02_store
  ,sm: smM02
  ,stripeRows: true
  ,columns: [{
    id: 'id_rownum'    
    ,header: "#"
    ,width: 30
    ,renderer: rowNumberer.createDelegate(this)
  },{
    id: 'id_hcode'    
    ,header: '<b>รหัส สนย.</b>'
    ,dataIndex: 'hcode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_piscode'
    ,header: '<b>รหัส กอง จ.</b>'
    ,dataIndex: 'piscode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_office'
    ,header: '<b>ชื่อหน่วยงาน</b>'
    ,dataIndex: 'office'
    ,width: 150
    ,sortable: true
  },{
    id: 'id_cid'
    ,header: '<b>เลขที่บัตรประชาชน</b>'
    ,dataIndex: 'cid'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_fname'
    ,header: '<b>ชื่อ</b>'
    ,dataIndex: 'fname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_lname'
    ,header: '<b>นามสกุล</b>'
    ,dataIndex: 'lname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_sex'
    ,header: '<b>เพศ</b>'
    ,dataIndex: 'sex'
    ,width: 50
    ,sortable: true
    ,renderer: sex_string
  },{
    id: 'id_detail'
    ,header: ''
    ,width: 50
    ,dataIndex: ''
    ,renderer: addImage
  }]
  ,autoExpandColumn: 'id_office'
  ,viewConfig: {
    forceFit: true

    // Return CSS class to apply to rows depending upon data values
    ,getRowClass: function(record, index) {
      if (cur_gridlock == 't')
        return 'gridlock';
      else
        return 'default';
    }
  }
  ,tbar: [{
    xtype: 'tbbutton'
	,id: 'id_m02_add_btn'
	,disabled: add_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/add.png'
    ,text: 'Add'
	,handler: function(b, e){
      showAddForm();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m02_delete_btn'
	,disabled: true
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/delete.png'
    ,text: 'Delete'
	,handler: function(){
      var sm = m02_grid.getSelectionModel();
	  var sel = sm.getSelected();
	  if (sm.hasSelection()){
        Ext.Msg.show({
          title: 'ลบข้อมูลบุคลากร'
		  ,buttons: Ext.Msg.YESNOCANCEL
          ,msg: 'ยืนยันการลบข้อมูล ' + sel.data.fname + ' ' + sel.data.lname + '?'
          ,icon: Ext.Msg.WARNING
		  ,fn: function(btn){
            if (btn == 'yes'){
              var con = new Ext.data.Connection();
			  con.request({
                url: 'rb/ajDeletePerson.rb'
				,params: { id: sel.data.id, ptype: cur_man }
				,success: function(resp, opt){
				  m02_grid.getStore().remove(sel);
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ลบข้อมูล 1 รายการเรียบร้อยแล้ว'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
				}
				,failure: function(resp, opt){
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ไม่สามารถทำการลบข้อมูลได้'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
                }
			  }); // eo con
            } // eo if
          } // eo fn
        }); // eo show
	  } // eo if
    } // eo handler
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m02_unlock_btn'
	,disabled: unlock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock_open.png'
    ,text: 'Unlock'
	,tooltip: 'กดปุ่มนี้เพื่อปลด Lock และทำการแก้ไขข้อมูลใหม่'
    ,handler: function(b, e){
	  Ext.getCmp('id_m02_lock_btn').enable();
	  Ext.getCmp('id_m02_next_btn').disable();
	  Ext.getCmp('id_m02_add_btn').enable();
	  Ext.getCmp('id_m02_delete_btn').disable();
	  this.disable();
	  m02lock = 'f';
	  save_flag = false;
      ajUnlock(cur_hcode,'m02');
	  cur_gridlock = m02lock;
	  m02_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m02_lock_btn'
	,disabled: lock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock.png'
    ,text: 'Lock'
	,tooltip: 'กดปุ่มนี้เพื่อ Lock ข้อมูลเมื่อเสร็จสิ้นการแก้ไขข้อมูล และทำการแก้ไขประเภทบุคลากรอื่นต่อไป'
    ,handler: function(b, e){
	  Ext.getCmp('id_m02_unlock_btn').enable();
	  Ext.getCmp('id_m02_next_btn').enable();
	  Ext.getCmp('id_m02_add_btn').disable();
	  Ext.getCmp('id_m02_delete_btn').disable();
	  this.disable();
	  m02lock = 't';
	  save_flag = true;
	  ajLock(cur_hcode,'m02');
	  cur_gridlock = m02lock;
	  m02_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m02_search_text'
    ,cls: 'x-btn-text'
	,text: 'Search'
	,handler: function() {
      var o = Ext.getCmp('id_m02_kw');
	  o.setValue('');
	  o.focus();
	  kws = '';
    }
  },{
    xtype: 'textfield'
	,id: 'id_m02_kw'
    ,value: kws
    ,enableKeyEvents: true
    ,listeners: {
      specialkey: function(field, el){
		if (el.getKey() == Ext.EventObject.ENTER)
		{
          kws = field.getValue();
		  searchPerson(kws);
		}
      }
	}
  },{
    xtype: 'tbbutton'
	,id: 'id_m02_search_btn'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/zoom.png'
	,handler: function() {
      kws= Ext.getCmp('id_m02_kw').getValue();
	  searchPerson(kws);
	}
  },'->',{
    xtype: 'tbbutton'
    ,id: 'id_m02_next_btn'
	,disabled: next_flag
    ,text: 'Next'
    ,tooltip: 'บันทึกข้อมูลบุคลากรประเภทต่อไป!'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/resultset_next.png'
    ,handler: function(b,e) {
      Ext.getCmp('id_man_2').disable();
      cur_man = 3;
	  m03_store.baseParams = {hcode: cur_hcode};
	  m03_store.load({params:{start:0, limit: 10}});
      Ext.getCmp('id_man_3').enable();
      Ext.getCmp('id_man_3').show();
	  cur_gridlock = m03lock;
	  if (cur_gridlock == 't')
      {
        Ext.getCmp('id_m03_add_btn').disable();
        Ext.getCmp('id_m03_delete_btn').disable();
        Ext.getCmp('id_m03_unlock_btn').enable();
        Ext.getCmp('id_m03_lock_btn').disable();
        Ext.getCmp('id_m03_next_btn').enable();
        save_flag = true;
      }
	  else
      {
        Ext.getCmp('id_m03_add_btn').enable();
        Ext.getCmp('id_m03_delete_btn').disable();
        Ext.getCmp('id_m03_unlock_btn').disable();
        Ext.getCmp('id_m03_lock_btn').enable();
        Ext.getCmp('id_m03_next_btn').disable();
        save_flag = false;
      }
	}
  }]
  ,listeners: {
    cellclick: function(grid, rowIndex, columnIndex, e){
      var data = grid.getStore().data.items[rowIndex].data;

	  cur_id = data.id;
	  cur_cid = data.cid;
	  cur_hcode = data.hcode;
	  cur_piscode = data.piscode;
	  cur_otype = data.otype;
      cur_fname = data.fname;
      cur_lname = data.lname;
	  cur_sex = parseInt(data.sex);

      if (columnIndex == 8)
      {
        var con = new Ext.data.Connection();
		con.request({
          url: 'rb/ajGetEduPos.rb'
		  ,params: {id: cur_id, ptype: cur_man}
		  ,success: function(resp, opt){
            var json = Ext.util.JSON.decode(resp.responseText);
            cur_edu_first_code = json.edu_first_code;
            cur_edu_first_text = json.edu_first_text;
            cur_edu_top_code = json.edu_top_code;
            cur_edu_top_text = json.edu_top_text;
            //cur_pos_j18_code = json.pos_j18_code;
            //cur_pos_j18_text = json.pos_j18_text;
            cur_pos_j18_code = '99999'
            cur_pos_j18_text = 'ไม่ต้องระบุ'
            cur_pos_active_code = json.pos_active_code;
            cur_pos_active_text = json.pos_active_text;
             showInputForm();
          }
		  ,failure: function(resp,opt){
            Ext.Msg.alert('Error','Cannot retrieve Education and Position data!');
			return false;
          }
		});
      }
    } //eo cellclick
  } //eo listeners
  ,bbar: new Ext.PagingToolbar({
    pageSize: 10
    ,store: m02_store
    ,displayInfo: true
    ,emptyMsg: 'No record to display'
    ,displayMsg: 'Records {0} - {1} of {2}'
  })
});

var smM03 = new Ext.grid.RowSelectionModel({
  singleSelect: true
  ,listeners: {
    rowselect: {
      fn: function(sm,index,record){
        Ext.getCmp('id_m03_delete_btn').enable();
      }
	}
  }
});

var m03_grid = new Ext.grid.GridPanel({
  frame: false
  ,id: 'm03_grid'
  ,store: m03_store
  ,sm: smM03
  ,stripeRows: true
  ,columns: [{
    id: 'id_rownum'    
    ,header: "#"
    ,width: 30
    ,renderer: rowNumberer.createDelegate(this)
  },{
    id: 'id_hcode'    
    ,header: '<b>รหัส สนย.</b>'
    ,dataIndex: 'hcode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_piscode'
    ,header: '<b>รหัส กอง จ.</b>'
    ,dataIndex: 'piscode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_office'
    ,header: '<b>ชื่อหน่วยงาน</b>'
    ,dataIndex: 'office'
    ,width: 150
    ,sortable: true
  },{
    id: 'id_cid'
    ,header: '<b>เลขที่บัตรประชาชน</b>'
    ,dataIndex: 'cid'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_fname'
    ,header: '<b>ชื่อ</b>'
    ,dataIndex: 'fname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_lname'
    ,header: '<b>นามสกุล</b>'
    ,dataIndex: 'lname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_sex'
    ,header: '<b>เพศ</b>'
    ,dataIndex: 'sex'
    ,width: 50
    ,sortable: true
    ,renderer: sex_string
  },{
    id: 'id_detail'
    ,header: ''
    ,width: 50
    ,dataIndex: ''
    ,renderer: addImage
  }]
  ,autoExpandColumn: 'id_office'
  ,viewConfig: {
    forceFit: true

    // Return CSS class to apply to rows depending upon data values
    ,getRowClass: function(record, index) {
      if (cur_gridlock == 't')
        return 'gridlock';
      else
        return 'default';
    }
  }
  ,tbar: [{
    xtype: 'tbbutton'
	,id: 'id_m03_add_btn'
	,disabled: add_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/add.png'
    ,text: 'Add'
	,handler: function(b, e){
      showAddForm();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m03_delete_btn'
	,disabled: true
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/delete.png'
    ,text: 'Delete'
	,handler: function(){
      var sm = m03_grid.getSelectionModel();
	  var sel = sm.getSelected();
	  if (sm.hasSelection()){
        Ext.Msg.show({
          title: 'ลบข้อมูลบุคลากร'
		  ,buttons: Ext.Msg.YESNOCANCEL
          ,msg: 'ยืนยันการลบข้อมูล ' + sel.data.fname + ' ' + sel.data.lname + '?'
          ,icon: Ext.Msg.WARNING
		  ,fn: function(btn){
            if (btn == 'yes'){
              var con = new Ext.data.Connection();
			  con.request({
                url: 'rb/ajDeletePerson.rb'
				,params: { id: sel.data.id, ptype: cur_man }
				,success: function(resp, opt){
				  m03_grid.getStore().remove(sel);
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ลบข้อมูล 1 รายการเรียบร้อยแล้ว'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
				}
				,failure: function(resp, opt){
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ไม่สามารถทำการลบข้อมูลได้'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
                }
			  }); // eo con
            } // eo if
          } // eo fn
        }); // eo show
	  } // eo if
    } // eo handler
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m03_unlock_btn'
	,disabled: unlock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock_open.png'
    ,text: 'Unlock'
	,tooltip: 'กดปุ่มนี้เพื่อปลด Lock และทำการแก้ไขข้อมูลใหม่'
    ,handler: function(b, e){
	  Ext.getCmp('id_m03_lock_btn').enable();
	  Ext.getCmp('id_m03_next_btn').disable();
	  Ext.getCmp('id_m03_add_btn').enable();
	  Ext.getCmp('id_m03_delete_btn').disable();
	  this.disable();
	  m03lock = 'f';
	  save_flag = false;
	  ajUnlock(cur_hcode, 'm03');
	  cur_gridlock = m03lock;
	  m03_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m03_lock_btn'
	,disabled: lock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock.png'
    ,text: 'Lock'
	,tooltip: 'กดปุ่มนี้เพื่อ Lock ข้อมูลเมื่อเสร็จสิ้นการแก้ไขข้อมูล และทำการแก้ไขประเภทบุคลากรอื่นต่อไป'
    ,handler: function(b, e){
	  Ext.getCmp('id_m03_unlock_btn').enable();
	  Ext.getCmp('id_m03_next_btn').enable();
	  Ext.getCmp('id_m03_add_btn').disable();
	  Ext.getCmp('id_m03_delete_btn').disable();
	  this.disable();
	  m03lock = 't';
	  save_flag = true;
	  ajLock(cur_hcode, 'm03');
	  cur_gridlock = m03lock;
	  m03_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m03_search_text'
    ,cls: 'x-btn-text'
	,text: 'Search'
	,handler: function() {
      var o = Ext.getCmp('id_m03_kw');
	  o.setValue('');
	  o.focus();
	  kws = '';
    }
  },{
    xtype: 'textfield'
	,id: 'id_m03_kw'
    ,value: kws
    ,enableKeyEvents: true
    ,listeners: {
      specialkey: function(field, el){
		if (el.getKey() == Ext.EventObject.ENTER)
		{
          kws = field.getValue();
		  searchPerson(kws);
		}
      }
	}
  },{
    xtype: 'tbbutton'
	,id: 'id_m03_search_btn'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/zoom.png'
	,handler: function() {
      kws= Ext.getCmp('id_m03_kw').getValue();
	  searchPerson(kws);
	}
  },'->',{
    xtype: 'tbbutton'
    ,id: 'id_m03_next_btn'
	,disabled: next_flag
    ,text: 'Next'
    ,tooltip: 'บันทึกข้อมูลบุคลากรประเภทต่อไป!'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/resultset_next.png'
    ,handler: function(b,e) {
      Ext.getCmp('id_man_3').disable();
      cur_man = 4;
	  m04_store.baseParams = {hcode: cur_hcode};
	  m04_store.load({params:{start:0, limit: 10}});
      Ext.getCmp('id_man_4').enable();
      Ext.getCmp('id_man_4').show();
	  cur_gridlock = m04lock;
	  if (cur_gridlock == 't')
      {
        Ext.getCmp('id_m04_add_btn').disable();
        Ext.getCmp('id_m04_delete_btn').disable();
        Ext.getCmp('id_m04_unlock_btn').enable();
        Ext.getCmp('id_m04_lock_btn').disable();
        Ext.getCmp('id_m04_next_btn').enable();
        save_flag = true;
      }
	  else
      {
        Ext.getCmp('id_m04_add_btn').enable();
        Ext.getCmp('id_m04_delete_btn').disable();
        Ext.getCmp('id_m04_unlock_btn').disable();
        Ext.getCmp('id_m04_lock_btn').enable();
        Ext.getCmp('id_m04_next_btn').disable();
        save_flag = false;
      }
	}
  }]
  ,listeners: {
    cellclick: function(grid, rowIndex, columnIndex, e){
      var data = grid.getStore().data.items[rowIndex].data;

	  cur_id = data.id;
	  cur_cid = data.cid;
	  cur_hcode = data.hcode;
	  cur_piscode = data.piscode;
	  cur_otype = data.otype;
      cur_fname = data.fname;
      cur_lname = data.lname;
	  cur_sex = parseInt(data.sex);

      if (columnIndex == 8)
      {
        var con = new Ext.data.Connection();
		con.request({
          url: 'rb/ajGetEduPos.rb'
		  ,params: {id: cur_id, ptype: cur_man}
		  ,success: function(resp, opt){
            var json = Ext.util.JSON.decode(resp.responseText);
			cur_edu_first_code = json.edu_first_code;
			cur_edu_first_text = json.edu_first_text;
            cur_edu_top_code = json.edu_top_code;
            cur_edu_top_text = json.edu_top_text;
			cur_pos_j18_code = json.pos_j18_code;
			cur_pos_j18_text = json.pos_j18_text;
			cur_pos_active_code = json.pos_active_code;
			cur_pos_active_text = json.pos_active_text;
			showInputForm();
          }
		  ,failure: function(resp,opt){
            Ext.Msg.alert('Error','Cannot retrieve Education and Position data!');
			return false;
          }
		});
      }
    } //eo cellclick
  } //eo listeners
  ,bbar: new Ext.PagingToolbar({
    pageSize: 10
    ,store: m03_store
    ,displayInfo: true
    ,emptyMsg: 'No record to display'
    ,displayMsg: 'Records {0} - {1} of {2}'
  })
});

var smM04 = new Ext.grid.RowSelectionModel({
  singleSelect: true
  ,listeners: {
    rowselect: {
      fn: function(sm,index,record){
        Ext.getCmp('id_m04_delete_btn').enable();
      }
	}
  }
});

var m04_grid = new Ext.grid.GridPanel({
  frame: false
  ,id: 'm04_grid'
  ,store: m04_store
  ,sm: smM04
  ,stripeRows: true
  ,columns: [{
    id: 'id_rownum'    
    ,header: "#"
    ,width: 30
    ,renderer: rowNumberer.createDelegate(this)
  },{
    id: 'id_hcode'    
    ,header: '<b>รหัส สนย.</b>'
    ,dataIndex: 'hcode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_piscode'
    ,header: '<b>รหัส กอง จ.</b>'
    ,dataIndex: 'piscode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_office'
    ,header: '<b>ชื่อหน่วยงาน</b>'
    ,dataIndex: 'office'
    ,width: 150
    ,sortable: true
  },{
    id: 'id_cid'
    ,header: '<b>เลขที่บัตรประชาชน</b>'
    ,dataIndex: 'cid'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_fname'
    ,header: '<b>ชื่อ</b>'
    ,dataIndex: 'fname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_lname'
    ,header: '<b>นามสกุล</b>'
    ,dataIndex: 'lname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_sex'
    ,header: '<b>เพศ</b>'
    ,dataIndex: 'sex'
    ,width: 50
    ,sortable: true
    ,renderer: sex_string
  },{
    id: 'id_detail'
    ,header: ''
    ,width: 50
    ,dataIndex: ''
    ,renderer: addImage
  }]
  ,autoExpandColumn: 'id_office'
  ,viewConfig: {
    forceFit: true

    // Return CSS class to apply to rows depending upon data values
    ,getRowClass: function(record, index) {
      if (cur_gridlock == 't')
        return 'gridlock';
      else
        return 'default';
    }
  }
  ,tbar: [{
    xtype: 'tbbutton'
    ,id: 'id_m04_add_btn'
	,disabled: add_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/add.png'
    ,text: 'Add'
	,handler: function(b, e){
      showAddForm();
    }
  },'-',{
    xtype: 'tbbutton'
    ,id: 'id_m04_delete_btn'
	,disabled: true
	,cls: 'x-btn-text-icon'
    ,icon: 'icons/delete.png'
    ,text: 'Delete'
	,handler: function(){
      var sm = m04_grid.getSelectionModel();
	  var sel = sm.getSelected();
	  if (sm.hasSelection()){
        Ext.Msg.show({
          title: 'ลบข้อมูลบุคลากร'
		  ,buttons: Ext.Msg.YESNOCANCEL
          ,msg: 'ยืนยันการลบข้อมูล ' + sel.data.fname + ' ' + sel.data.lname + '?'
		  ,fn: function(btn){
            if (btn == 'yes'){
              var con = new Ext.data.Connection();
			  con.request({
                url: 'rb/ajDeletePerson.rb'
				,params: { id: sel.data.id, ptype: cur_man }
				,success: function(resp, opt){
				  m04_grid.getStore().remove(sel);
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ลบข้อมูล 1 รายการเรียบร้อยแล้ว'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
				}
				,failure: function(resp, opt){
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ไม่สามารถทำการลบข้อมูลได้'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
                }
			  }); // eo con
            } // eo if
          } // eo fn
        }); // eo show
	  } // eo if
    } // eo handler
  },'-',{
    xtype: 'tbbutton'
    ,id: 'id_m04_unlock_btn'
    ,disabled: unlock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock_open.png'
    ,text: 'Unlock'
    ,tooltip: 'กดปุ่มนี้เพื่อปลด Lock และทำการแก้ไขข้อมูลใหม่'
    ,handler: function(b, e){
	  Ext.getCmp('id_m04_lock_btn').enable();
	  Ext.getCmp('id_m04_next_btn').disable();
	  Ext.getCmp('id_m04_add_btn').enable();
	  Ext.getCmp('id_m04_delete_btn').disable();
	  this.disable();
	  m04lock = 'f';
	  save_flag = false;
	  ajUnlock(cur_hcode, 'm04');
	  cur_gridlock = m04lock;
	  m04_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
    ,id: 'id_m04_lock_btn'
    ,disabled: lock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock.png'
    ,text: 'Lock'
    ,tooltip: 'กดปุ่มนี้เพื่อ Lock ข้อมูลเมื่อเสร็จสิ้นการแก้ไขข้อมูล และทำการแก้ไขประเภทบุคลากรอื่นต่อไป'
    ,handler: function(b, e){
	  Ext.getCmp('id_m04_unlock_btn').enable();
	  Ext.getCmp('id_m04_next_btn').enable();
	  Ext.getCmp('id_m04_add_btn').disable();
	  Ext.getCmp('id_m04_delete_btn').disable();
	  this.disable();
	  m04lock = 't';
	  save_flag = true;
	  ajLock(cur_hcode, 'm04');
	  cur_gridlock = m04lock;
	  m04_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
    ,id: 'id_m04_search_text'
    ,cls: 'x-btn-text'
    ,text: 'Search'
    ,handler: function() {
      var o = Ext.getCmp('id_m04_kw');
      o.setValue('');
      o.focus();
      kws = '';
    }
  },{
    xtype: 'textfield'
    ,id: 'id_m04_kw'
    ,value: kws
    ,enableKeyEvents: true
    ,listeners: {
      specialkey: function(field, el){
	if (el.getKey() == Ext.EventObject.ENTER)
	{
          kws = field.getValue();
	  searchPerson(kws);
	}
      }
    }
  },{
    xtype: 'tbbutton'
    ,id: 'id_m04_search_btn'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/zoom.png'
    ,handler: function() {
      kws= Ext.getCmp('id_m04_kw').getValue();
      searchPerson(kws);
    }
  },'->',{
    xtype: 'tbbutton'
    ,id: 'id_m04_next_btn'
    ,disabled: next_flag
    ,text: 'Next'
    ,tooltip: 'บันทึกข้อมูลบุคลากรประเภทต่อไป!'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/resultset_next.png'
    ,handler: function(b,e) {
      Ext.getCmp('id_man_4').disable();
      //cur_hcflag = true for otype = 6,,
      if (cur_hcflag == 't' || cur_ssjsso == 't')
      {
        cur_man = 1;
        m01_store.baseParams = {hcode: cur_hcode};
        m01_store.load({params:{start:0, limit: 10}});
        Ext.getCmp('id_man_1').enable();
        Ext.getCmp('id_man_1').show();
        cur_gridlock = m01lock;
        if (cur_gridlock == 't')
        {
          Ext.getCmp('id_m01_add_btn').disable();
          Ext.getCmp('id_m01_delete_btn').disable();
          Ext.getCmp('id_m01_unlock_btn').enable();
          Ext.getCmp('id_m01_lock_btn').disable();
          Ext.getCmp('id_m01_next_btn').enable();
          save_flag = true;
        }
        else
        {
          Ext.getCmp('id_m01_add_btn').enable();
          Ext.getCmp('id_m01_delete_btn').disable();
          Ext.getCmp('id_m01_unlock_btn').disable();
          Ext.getCmp('id_m01_lock_btn').enable();
          Ext.getCmp('id_m01_next_btn').disable();
          save_flag = false;
        }
      }
      else
      {
        cur_man = 5;
        m05_store.baseParams = {hcode: cur_hcode};
        m05_store.load({params:{start:0, limit: 10}});
        Ext.getCmp('id_man_5').enable();  
        Ext.getCmp('id_man_5').show();
        cur_gridlock = m05lock;
        if (cur_gridlock == 't')
        {
          Ext.getCmp('id_m05_add_btn').disable();
          Ext.getCmp('id_m05_delete_btn').disable();
          Ext.getCmp('id_m05_unlock_btn').enable();
          Ext.getCmp('id_m05_lock_btn').disable();
          Ext.getCmp('id_m05_next_btn').enable();
          save_flag = true;
        }
        else
        {
          Ext.getCmp('id_m05_add_btn').enable();
          Ext.getCmp('id_m05_delete_btn').disable();
          Ext.getCmp('id_m05_unlock_btn').disable();
          Ext.getCmp('id_m05_lock_btn').enable();
          Ext.getCmp('id_m05_next_btn').disable();
          save_flag = false;
        }
      }
    }
  }]
  ,listeners: {
    cellclick: function(grid, rowIndex, columnIndex, e){
      var data = grid.getStore().data.items[rowIndex].data;
      cur_id = data.id;
      cur_cid = data.cid;
      cur_hcode = data.hcode;
      cur_piscode = data.piscode;
      cur_otype = data.otype;
      cur_fname = data.fname;
      cur_lname = data.lname;
      cur_sex = parseInt(data.sex);

      if (columnIndex == 8)
      {
        var con = new Ext.data.Connection();
	con.request({
          url: 'rb/ajGetEduPos.rb'
	  ,params: {id: cur_id, ptype: cur_man}
	  ,success: function(resp, opt){
            var json = Ext.util.JSON.decode(resp.responseText);
	    cur_edu_first_code = json.edu_first_code;
	    cur_edu_first_text = json.edu_first_text;
            cur_edu_top_code = json.edu_top_code;
            cur_edu_top_text = json.edu_top_text;
	    cur_pos_j18_code = json.pos_j18_code;
	    cur_pos_j18_text = json.pos_j18_text;
	    cur_pos_active_code = json.pos_active_code;
	    cur_pos_active_text = json.pos_active_text;
	    showInputForm();
          }
	  ,failure: function(resp,opt){
            Ext.Msg.alert('Server Response','Cannot retrieve Education and Position data!');
	    return false;
          }
	});
      }
    } //eo cellclick
  } //eo listeners
  ,bbar: new Ext.PagingToolbar({
    pageSize: 10
    ,store: m04_store
    ,displayInfo: true
    ,emptyMsg: 'No record to display'
    ,displayMsg: 'Records {0} - {1} of {2}'
  })
});

var smM05 = new Ext.grid.RowSelectionModel({
  singleSelect: true
  ,listeners: {
    rowselect: {
      fn: function(sm,index,record){
        Ext.getCmp('id_m05_delete_btn').enable();
      }
	}
  }
});

var m05_grid = new Ext.grid.GridPanel({
  frame: false
  ,id: 'm05_grid'
  ,store: m05_store
  ,sm: smM05
  ,stripeRows: true
  ,columns: [{
    id: 'id_rownum'    
    ,header: "#"
    ,width: 30
    ,renderer: rowNumberer.createDelegate(this)
  },{
    id: 'id_hcode'    
    ,header: '<b>รหัส สนย.</b>'
    ,dataIndex: 'hcode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_piscode'
    ,header: '<b>รหัส กอง จ.</b>'
    ,dataIndex: 'piscode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_office'
    ,header: '<b>ชื่อหน่วยงาน</b>'
    ,dataIndex: 'office'
    ,width: 150
    ,sortable: true
  },{
    id: 'id_cid'
    ,header: '<b>เลขที่บัตรประชาชน</b>'
    ,dataIndex: 'cid'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_fname'
    ,header: '<b>ชื่อ</b>'
    ,dataIndex: 'fname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_lname'
    ,header: '<b>นามสกุล</b>'
    ,dataIndex: 'lname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_sex'
    ,header: '<b>เพศ</b>'
    ,dataIndex: 'sex'
    ,width: 50
    ,sortable: true
    ,renderer: sex_string
  },{
    id: 'id_detail'
    ,header: ''
    ,width: 50
    ,dataIndex: ''
    ,renderer: addImage
  }]
  ,autoExpandColumn: 'id_office'
  ,viewConfig: {
    forceFit: true

    // Return CSS class to apply to rows depending upon data values
    ,getRowClass: function(record, index) {
      if (cur_gridlock == 't')
        return 'gridlock';
      else
        return 'default';
    }
  }
  ,tbar: [{
    xtype: 'tbbutton'
    ,id: 'id_m05_add_btn'
	,disabled: add_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/add.png'
    ,text: 'Add'
	,handler: function(b, e){
      showAddForm();
    }
  },'-',{
    xtype: 'tbbutton'
    ,id: 'id_m05_delete_btn'
	,disabled: true
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/delete.png'
    ,text: 'Delete'
	,handler: function(){
      var sm = m05_grid.getSelectionModel();
	  var sel = sm.getSelected();
	  if (sm.hasSelection()){
        Ext.Msg.show({
          title: 'ลบข้อมูลบุคลากร'
		  ,buttons: Ext.Msg.YESNOCANCEL
          ,msg: 'ยืนยันการลบข้อมูล ' + sel.data.fname + ' ' + sel.data.lname + '?'
		  ,fn: function(btn){
            if (btn == 'yes'){
              var con = new Ext.data.Connection();
			  con.request({
                url: 'rb/ajDeletePerson.rb'
				,params: { id: sel.data.id, ptype: cur_man }
				,success: function(resp, opt){
				  m05_grid.getStore().remove(sel);
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ลบข้อมูล 1 รายการเรียบร้อยแล้ว'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
				}
				,failure: function(resp, opt){
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ไม่สามารถทำการลบข้อมูลได้'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
                }
			  }); // eo con
            } // eo if
          } // eo fn
        }); // eo show
	  } // eo if
    } // eo handler
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m05_unlock_btn'
	,disabled: unlock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock_open.png'
    ,text: 'Unlock'
	,tooltip: 'กดปุ่มนี้เพื่อปลด Lock และทำการแก้ไขข้อมูลใหม่'
    ,handler: function(b, e){
	  Ext.getCmp('id_m05_lock_btn').enable();
	  Ext.getCmp('id_m05_next_btn').disable();
	  Ext.getCmp('id_m05_add_btn').enable();
	  Ext.getCmp('id_m05_delete_btn').disable();
	  this.disable();
	  m05lock = 'f';
	  save_flag = false;
	  ajUnlock(cur_hcode, 'm05');
	  cur_gridlock = m05lock;
	  m05_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m05_lock_btn'
	,disabled: lock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock.png'
    ,text: 'Lock'
	,tooltip: 'กดปุ่มนี้เพื่อ Lock ข้อมูลเมื่อเสร็จสิ้นการแก้ไขข้อมูล และทำการแก้ไขประเภทบุคลากรอื่นต่อไป'
    ,handler: function(b, e){
	  Ext.getCmp('id_m05_unlock_btn').enable();
	  Ext.getCmp('id_m05_next_btn').enable();
	  Ext.getCmp('id_m05_add_btn').disable();
	  Ext.getCmp('id_m05_delete_btn').disable();
	  this.disable();
	  m05lock = 't';
	  save_flag = true;
	  ajLock(cur_hcode, 'm05');
	  cur_gridlock = m05lock;
	  m05_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m05_search_text'
    ,cls: 'x-btn-text'
	,text: 'Search'
	,handler: function() {
      var o = Ext.getCmp('id_m05_kw');
	  o.setValue('');
	  o.focus();
	  kws = '';
    }
  },{
    xtype: 'textfield'
	,id: 'id_m05_kw'
    ,value: kws
    ,enableKeyEvents: true
    ,listeners: {
      specialkey: function(field, el){
		if (el.getKey() == Ext.EventObject.ENTER)
		{
          kws = field.getValue();
		  searchPerson(kws);
		}
      }
	}
  },{
    xtype: 'tbbutton'
	,id: 'id_m05_search_btn'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/zoom.png'
	,handler: function() {
      kws= Ext.getCmp('id_m05_kw').getValue();
	  searchPerson(kws);
	}
  },'->',{
    xtype: 'tbbutton'
    ,id: 'id_m05_next_btn'
	,disabled: next_flag
    ,text: 'Next'
    ,tooltip: 'บันทึกข้อมูลบุคลากรประเภทต่อไป!'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/resultset_next.png'
    ,handler: function(b,e) {
      Ext.getCmp('id_man_5').disable();
      cur_man = 6;
      m06_store.baseParams = {hcode: cur_hcode};
	  m06_store.load({params:{start:0, limit: 10}});
      Ext.getCmp('id_man_6').enable();  
      Ext.getCmp('id_man_6').show();
	  cur_gridlock = m06lock;
      if (cur_gridlock == 't')
      {
        Ext.getCmp('id_m06_add_btn').disable();
        Ext.getCmp('id_m06_delete_btn').disable();
        Ext.getCmp('id_m06_unlock_btn').enable();
        Ext.getCmp('id_m06_lock_btn').disable();
        Ext.getCmp('id_m06_next_btn').enable();
        save_flag = true;
      }
	  else
      {
        Ext.getCmp('id_m06_add_btn').enable();
        Ext.getCmp('id_m06_delete_btn').disable();
        Ext.getCmp('id_m06_unlock_btn').disable();
        Ext.getCmp('id_m06_lock_btn').enable();
        Ext.getCmp('id_m06_next_btn').disable();
        save_flag = false;
      }
	}
  }]
  ,listeners: {
    cellclick: function(grid, rowIndex, columnIndex, e){
      var data = grid.getStore().data.items[rowIndex].data;

	  cur_id = data.id;
	  cur_cid = data.cid;
	  cur_hcode = data.hcode;
	  cur_piscode = data.piscode;
	  cur_otype = data.otype;
      cur_fname = data.fname;
      cur_lname = data.lname;
	  cur_sex = parseInt(data.sex);

      if (columnIndex == 8)
      {
        var con = new Ext.data.Connection();
		con.request({
          url: 'rb/ajGetEduPos.rb'
		  ,params: {id: cur_id, ptype: cur_man}
		  ,success: function(resp, opt){
            var json = Ext.util.JSON.decode(resp.responseText);
			cur_edu_first_code = json.edu_first_code;
			cur_edu_first_text = json.edu_first_text;
            cur_edu_top_code = json.edu_top_code;
            cur_edu_top_text = json.edu_top_text;
			cur_pos_j18_code = json.pos_j18_code;
			cur_pos_j18_text = json.pos_j18_text;
			cur_pos_active_code = json.pos_active_code;
			cur_pos_active_text = json.pos_active_text;
			showInputForm();
          }
		  ,failure: function(resp,opt){
            Ext.Msg.alert('Server Response','Cannot retrieve Education and Position data!');
			return false;
          }
		});
      }
    } //eo cellclick
  } //eo listeners
  ,bbar: new Ext.PagingToolbar({
    pageSize: 10
    ,store: m05_store
    ,displayInfo: true
    ,emptyMsg: 'No record to display'
    ,displayMsg: 'Records {0} - {1} of {2}'
  })
});

var smM06 = new Ext.grid.RowSelectionModel({
  singleSelect: true
  ,listeners: {
    rowselect: {
      fn: function(sm,index,record){
        Ext.getCmp('id_m06_delete_btn').enable();
      }
	}
  }
});

var m06_grid = new Ext.grid.GridPanel({
  frame: false
  ,id: 'm06_grid'
  ,store: m06_store
  ,sm: smM06
  ,stripeRows: true
  ,columns: [{
    id: 'id_rownum'    
    ,header: "#"
    ,width: 30
    ,renderer: rowNumberer.createDelegate(this)
  },{
    id: 'id_hcode'    
    ,header: '<b>รหัส สนย.</b>'
    ,dataIndex: 'hcode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_piscode'
    ,header: '<b>รหัส กอง จ.</b>'
    ,dataIndex: 'piscode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_office'
    ,header: '<b>ชื่อหน่วยงาน</b>'
    ,dataIndex: 'office'
    ,width: 150
    ,sortable: true
  },{
    id: 'id_cid'
    ,header: '<b>เลขที่บัตรประชาชน</b>'
    ,dataIndex: 'cid'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_fname'
    ,header: '<b>ชื่อ</b>'
    ,dataIndex: 'fname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_lname'
    ,header: '<b>นามสกุล</b>'
    ,dataIndex: 'lname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_sex'
    ,header: '<b>เพศ</b>'
    ,dataIndex: 'sex'
    ,width: 50
    ,sortable: true
    ,renderer: sex_string
  },{
    id: 'id_detail'
    ,header: ''
    ,width: 50
    ,dataIndex: ''
    ,renderer: addImage
  }]
  ,autoExpandColumn: 'id_office'
  ,viewConfig: {
    forceFit: true

    // Return CSS class to apply to rows depending upon data values
    ,getRowClass: function(record, index) {
      if (cur_gridlock == 't')
        return 'gridlock';
      else
        return 'default';
    }
  }
  ,tbar: [{
    xtype: 'tbbutton'
    ,id: 'id_m06_add_btn'
	,disabled: add_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/add.png'
    ,text: 'Add'
	,handler: function(b, e){
      showAddForm();
    }
  },'-',{
    xtype: 'tbbutton'
    ,id: 'id_m06_delete_btn'
	,disabled: true
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/delete.png'
    ,text: 'Delete'
	,handler: function(){
      var sm = m06_grid.getSelectionModel();
	  var sel = sm.getSelected();
	  if (sm.hasSelection()){
        Ext.Msg.show({
          title: 'ลบข้อมูลบุคลากร'
		  ,buttons: Ext.Msg.YESNOCANCEL
          ,msg: 'ยืนยันการลบข้อมูล ' + sel.data.fname + ' ' + sel.data.lname + '?'
		  ,fn: function(btn){
            if (btn == 'yes'){
              var con = new Ext.data.Connection();
			  con.request({
                url: 'rb/ajDeletePerson.rb'
				,params: { id: sel.data.id, ptype: cur_man }
				,success: function(resp, opt){
				  m06_grid.getStore().remove(sel);
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ลบข้อมูล 1 รายการเรียบร้อยแล้ว'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
				}
				,failure: function(resp, opt){
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ไม่สามารถทำการลบข้อมูลได้'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
                }
			  }); // eo con
            } // eo if
          } // eo fn
        }); // eo show
	  } // eo if
    } // eo handler
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m06_unlock_btn'
	,disabled: unlock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock_open.png'
    ,text: 'Unlock'
	,tooltip: 'กดปุ่มนี้เพื่อปลด Lock และทำการแก้ไขข้อมูลใหม่'
    ,handler: function(b, e){
	  Ext.getCmp('id_m06_lock_btn').enable();
	  Ext.getCmp('id_m06_next_btn').disable();
	  Ext.getCmp('id_m06_add_btn').enable();
	  Ext.getCmp('id_m06_delete_btn').disable();
	  this.disable();
	  m06lock = 'f';
	  save_flag = false;
	  ajUnlock(cur_hcode, 'm06');
	  cur_gridlock = m06lock;
	  m06_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m06_lock_btn'
	,disabled: lock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock.png'
    ,text: 'Lock'
	,tooltip: 'กดปุ่มนี้เพื่อ Lock ข้อมูลเมื่อเสร็จสิ้นการแก้ไขข้อมูล และทำการแก้ไขประเภทบุคลากรอื่นต่อไป'
    ,handler: function(b, e){
	  Ext.getCmp('id_m06_unlock_btn').enable();
	  Ext.getCmp('id_m06_next_btn').enable();
	  Ext.getCmp('id_m06_add_btn').disable();
	  Ext.getCmp('id_m06_delete_btn').disable();
	  this.disable();
	  m06lock = 't';
	  save_flag = false;
	  ajLock(cur_hcode, 'm06');
	  cur_gridlock = m06lock;
	  m06_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m06_search_text'
    ,cls: 'x-btn-text'
	,text: 'Search'
	,handler: function() {
      var o = Ext.getCmp('id_m06_kw');
	  o.setValue('');
	  o.focus();
	  kws = '';
    }
  },{
    xtype: 'textfield'
	,id: 'id_m06_kw'
    ,value: kws
    ,enableKeyEvents: true
    ,listeners: {
      specialkey: function(field, el){
		if (el.getKey() == Ext.EventObject.ENTER)
		{
          kws = field.getValue();
		  searchPerson(kws);
		}
      }
	}
  },{
    xtype: 'tbbutton'
	,id: 'id_m06_search_btn'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/zoom.png'
	,handler: function() {
      kws= Ext.getCmp('id_m06_kw').getValue();
	  searchPerson(kws);
	}
  },'->',{
    xtype: 'tbbutton'
    ,id: 'id_m06_next_btn'
	,disabled: next_flag
    ,text: 'Next'
    ,tooltip: 'บันทึกข้อมูลบุคลากรประเภทต่อไป!'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/resultset_next.png'
    ,handler: function(b,e) {
      Ext.getCmp('id_man_6').disable();
      cur_man = 7;
      m07_store.baseParams = {hcode: cur_hcode};
	  m07_store.load({params:{start:0, limit: 10}});
      Ext.getCmp('id_man_7').enable();  
      Ext.getCmp('id_man_7').show();
	  cur_gridlock = m07lock;
	  if (cur_gridlock == 't')
      {
        Ext.getCmp('id_m07_add_btn').disable();
        Ext.getCmp('id_m07_delete_btn').disable();
        Ext.getCmp('id_m07_unlock_btn').enable();
        Ext.getCmp('id_m07_lock_btn').disable();
        Ext.getCmp('id_m07_next_btn').enable();
        save_flag = true;
      }
	  else
      {
        Ext.getCmp('id_m07_add_btn').enable();
        Ext.getCmp('id_m07_delete_btn').disable();
        Ext.getCmp('id_m07_unlock_btn').disable();
        Ext.getCmp('id_m07_lock_btn').enable();
        Ext.getCmp('id_m07_next_btn').disable();
        save_flag = false;
      }
	}
  }]
  ,listeners: {
    cellclick: function(grid, rowIndex, columnIndex, e){
      var data = grid.getStore().data.items[rowIndex].data;

	  cur_id = data.id;
	  cur_cid = data.cid;
	  cur_hcode = data.hcode;
	  cur_piscode = data.piscode;
	  cur_otype = data.otype;
      cur_fname = data.fname;
      cur_lname = data.lname;
	  cur_sex = parseInt(data.sex);

      if (columnIndex == 8)
      {
        var con = new Ext.data.Connection();
		con.request({
          url: 'rb/ajGetEduPos.rb'
		  ,params: {id: cur_id, ptype: cur_man}
		  ,success: function(resp, opt){
            var json = Ext.util.JSON.decode(resp.responseText);
			cur_edu_first_code = json.edu_first_code;
			cur_edu_first_text = json.edu_first_text;
            cur_edu_top_code = json.edu_top_code;
            cur_edu_top_text = json.edu_top_text;
			cur_pos_j18_code = json.pos_j18_code;
			cur_pos_j18_text = json.pos_j18_text;
			cur_pos_active_code = json.pos_active_code;
			cur_pos_active_text = json.pos_active_text;
			showInputForm();
          }
		  ,failure: function(resp,opt){
            Ext.Msg.alert('Server Response','Cannot retrieve Education and Position data!');
			return false;
          }
		});
      }
    } //eo cellclick
  } //eo listeners
  ,bbar: new Ext.PagingToolbar({
    pageSize: 10
    ,store: m06_store
    ,displayInfo: true
    ,emptyMsg: 'No record to display'
    ,displayMsg: 'Records {0} - {1} of {2}'
  })
});

var smM07 = new Ext.grid.RowSelectionModel({
  singleSelect: true
  ,listeners: {
    rowselect: {
      fn: function(sm,index,record){
        Ext.getCmp('id_m07_delete_btn').enable();
      }
	}
  }
});

var m07_grid = new Ext.grid.GridPanel({
  frame: false
  ,id: 'm07_grid'
  ,store: m07_store
  ,sm: smM07
  ,stripeRows: true
  ,columns: [{
    id: 'id_rownum'    
    ,header: "#"
    ,width: 30
    ,renderer: rowNumberer.createDelegate(this)
  },{
    id: 'id_hcode'    
    ,header: '<b>รหัส สนย.</b>'
    ,dataIndex: 'hcode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_piscode'
    ,header: '<b>รหัส กอง จ.</b>'
    ,dataIndex: 'piscode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_office'
    ,header: '<b>ชื่อหน่วยงาน</b>'
    ,dataIndex: 'office'
    ,width: 150
    ,sortable: true
  },{
    id: 'id_cid'
    ,header: '<b>เลขที่บัตรประชาชน</b>'
    ,dataIndex: 'cid'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_fname'
    ,header: '<b>ชื่อ</b>'
    ,dataIndex: 'fname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_lname'
    ,header: '<b>นามสกุล</b>'
    ,dataIndex: 'lname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_sex'
    ,header: '<b>เพศ</b>'
    ,dataIndex: 'sex'
    ,width: 50
    ,sortable: true
    ,renderer: sex_string
  },{
    id: 'id_detail'
    ,header: ''
    ,width: 50
    ,dataIndex: ''
    ,renderer: addImage
  }]
  ,autoExpandColumn: 'id_office'
  ,viewConfig: {
    forceFit: true

    // Return CSS class to apply to rows depending upon data values
    ,getRowClass: function(record, index) {
      if (cur_gridlock == 't')
        return 'gridlock';
      else
        return 'default';
    }
  }
  ,tbar: [{
    xtype: 'tbbutton'
    ,id: 'id_m07_add_btn'
	,disabled: add_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/add.png'
    ,text: 'Add'
	,handler: function(b, e){
      showAddForm();
    }
  },'-',{
    xtype: 'tbbutton'
    ,id: 'id_m07_delete_btn'
	,disabled: true
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/delete.png'
    ,text: 'Delete'
	,handler: function(){
      var sm = m07_grid.getSelectionModel();
	  var sel = sm.getSelected();
	  if (sm.hasSelection()){
        Ext.Msg.show({
          title: 'ลบข้อมูลบุคลากร'
		  ,buttons: Ext.Msg.YESNOCANCEL
          ,msg: 'ยืนยันการลบข้อมูล ' + sel.data.fname + ' ' + sel.data.lname + '?'
		  ,fn: function(btn){
            if (btn == 'yes'){
              var con = new Ext.data.Connection();
			  con.request({
                url: 'rb/ajDeletePerson.rb'
				,params: { id: sel.data.id, ptype: cur_man }
				,success: function(resp, opt){
				  m07_grid.getStore().remove(sel);
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ลบข้อมูล 1 รายการเรียบร้อยแล้ว'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
				}
				,failure: function(resp, opt){
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ไม่สามารถทำการลบข้อมูลได้'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
                }
			  }); // eo con
            } // eo if
          } // eo fn
        }); // eo show
	  } // eo if
    } // eo handler
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m07_unlock_btn'
	,disabled: unlock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock_open.png'
    ,text: 'Unlock'
	,tooltip: 'กดปุ่มนี้เพื่อปลด Lock และทำการแก้ไขข้อมูลใหม่'
    ,handler: function(b, e){
	  Ext.getCmp('id_m07_lock_btn').enable();
	  Ext.getCmp('id_m07_next_btn').disable();
	  Ext.getCmp('id_m07_add_btn').enable();
	  Ext.getCmp('id_m07_delete_btn').disable();
      this.disable();
	  m07lock = 'f';
	  save_flag = false;
	  ajUnlock(cur_hcode, 'm07');
	  cur_gridlock = m07lock;
	  m07_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m07_lock_btn'
	,disabled: lock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock.png'
    ,text: 'Lock'
	,tooltip: 'กดปุ่มนี้เพื่อ Lock ข้อมูลเมื่อเสร็จสิ้นการแก้ไขข้อมูล และทำการแก้ไขประเภทบุคลากรอื่นต่อไป'
    ,handler: function(b, e){
	  Ext.getCmp('id_m07_unlock_btn').enable();
	  Ext.getCmp('id_m07_next_btn').enable();
	  Ext.getCmp('id_m07_add_btn').disable();
	  Ext.getCmp('id_m07_delete_btn').disable();
	  this.disable();
	  m07lock = 't';
	  save_flag = true;
	  ajLock(cur_hcode, 'm07');
	  cur_gridlock = m07lock;
	  m07_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m07_search_text'
    ,cls: 'x-btn-text'
	,text: 'Search'
	,handler: function() {
      var o = Ext.getCmp('id_m07_kw');
	  o.setValue('');
	  o.focus();
	  kws = '';
    }
  },{
    xtype: 'textfield'
	,id: 'id_m07_kw'
    ,value: kws
    ,enableKeyEvents: true
    ,listeners: {
      specialkey: function(field, el){
		if (el.getKey() == Ext.EventObject.ENTER)
		{
          kws = field.getValue();
		  searchPerson(kws);
		}
      }
	}
  },{
    xtype: 'tbbutton'
	,id: 'id_m07_search_btn'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/zoom.png'
	,handler: function() {
      kws= Ext.getCmp('id_m07_kw').getValue();
	  searchPerson(kws);
	}
  },'->',{
    xtype: 'tbbutton'
    ,id: 'id_m07_next_btn'
	,disabled: next_flag
    ,text: 'Next'
    ,tooltip: 'บันทึกข้อมูลบุคลากรประเภทต่อไป!'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/resultset_next.png'
    ,handler: function(b,e) {
      Ext.getCmp('id_man_7').disable();
      cur_man = 8;
      m08_store.baseParams = {hcode: cur_hcode};
	  m08_store.load({params:{start:0, limit: 10}});
      Ext.getCmp('id_man_8').enable();  
      Ext.getCmp('id_man_8').show();
	  cur_gridlock = m08lock;
      if (cur_gridlock == 't')
      {
        Ext.getCmp('id_m08_add_btn').disable();
        Ext.getCmp('id_m08_delete_btn').disable();
        Ext.getCmp('id_m08_unlock_btn').enable();
        Ext.getCmp('id_m08_lock_btn').disable();
        Ext.getCmp('id_m08_next_btn').enable();
        save_flag = true;
      }
	  else
      {
        Ext.getCmp('id_m08_add_btn').enable();
        Ext.getCmp('id_m08_delete_btn').disable();
        Ext.getCmp('id_m08_unlock_btn').disable();
        Ext.getCmp('id_m08_lock_btn').enable();
        Ext.getCmp('id_m08_next_btn').disable();
        save_flag = false;
      }
	}
  }]
  ,listeners: {
    cellclick: function(grid, rowIndex, columnIndex, e){
      var data = grid.getStore().data.items[rowIndex].data;

	  cur_id = data.id;
	  cur_cid = data.cid;
	  cur_hcode = data.hcode;
	  cur_piscode = data.piscode;
	  cur_otype = data.otype;
      cur_fname = data.fname;
      cur_lname = data.lname;
	  cur_sex = parseInt(data.sex);

      if (columnIndex == 8)
      {
        var con = new Ext.data.Connection();
		con.request({
          url: 'rb/ajGetEduPos.rb'
		  ,params: {id: cur_id, ptype: cur_man}
		  ,success: function(resp, opt){
            var json = Ext.util.JSON.decode(resp.responseText);
            var json = Ext.util.JSON.decode(resp.responseText);
			cur_edu_first_code = json.edu_first_code;
			cur_edu_first_text = json.edu_first_text;
            cur_edu_top_code = json.edu_top_code;
            cur_edu_top_text = json.edu_top_text;
			cur_pos_j18_code = json.pos_j18_code;
			cur_pos_j18_text = json.pos_j18_text;
			cur_pos_active_code = json.pos_active_code;
			cur_pos_active_text = json.pos_active_text;
			showInputForm();
          }
		  ,failure: function(resp,opt){
            Ext.Msg.alert('Server Response','Cannot retrieve Education and Position data!');
			return false;
          }
		});
      }
    } //eo cellclick
  } //eo listeners
  ,bbar: new Ext.PagingToolbar({
    pageSize: 10
    ,store: m07_store
    ,displayInfo: true
    ,emptyMsg: 'No record to display'
    ,displayMsg: 'Records {0} - {1} of {2}'
  })
});

var smM08 = new Ext.grid.RowSelectionModel({
  singleSelect: true
  ,listeners: {
    rowselect: {
      fn: function(sm,index,record){
        Ext.getCmp('id_m08_delete_btn').enable();
      }
	}
  }
});

var m08_grid = new Ext.grid.GridPanel({
  frame: false
  ,id: 'm08_grid'
  ,store: m08_store
  ,sm: smM08
  ,stripeRows: true
  ,columns: [{
    id: 'id_rownum'    
    ,header: "#"
    ,width: 30
    ,renderer: rowNumberer.createDelegate(this)
  },{
    id: 'id_hcode'    
    ,header: '<b>รหัส สนย.</b>'
    ,dataIndex: 'hcode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_piscode'
    ,header: '<b>รหัส กอง จ.</b>'
    ,dataIndex: 'piscode'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_office'
    ,header: '<b>ชื่อหน่วยงาน</b>'
    ,dataIndex: 'office'
    ,width: 150
    ,sortable: true
  },{
    id: 'id_cid'
    ,header: '<b>เลขที่บัตรประชาชน</b>'
    ,dataIndex: 'cid'
    ,width: 75
    ,sortable: true
  },{
    id: 'id_fname'
    ,header: '<b>ชื่อ</b>'
    ,dataIndex: 'fname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_lname'
    ,header: '<b>นามสกุล</b>'
    ,dataIndex: 'lname'
    ,width: 100
    ,sortable: true
  },{
    id: 'id_sex'
    ,header: '<b>เพศ</b>'
    ,dataIndex: 'sex'
    ,width: 50
    ,sortable: true
    ,renderer: sex_string
  },{
    id: 'id_detail'
    ,header: ''
    ,width: 50
    ,dataIndex: ''
    ,renderer: addImage
  }]
  ,autoExpandColumn: 'id_office'
  ,viewConfig: {
    forceFit: true

    // Return CSS class to apply to rows depending upon data values
    ,getRowClass: function(record, index) {
      if (cur_gridlock == 't')
        return 'gridlock';
      else
        return 'default';
    }
  }
  ,tbar: [{
    xtype: 'tbbutton'
    ,id: 'id_m08_add_btn'
	,disabled: add_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/add.png'
    ,text: 'Add'
	,handler: function(b, e){
      showAddForm();
    }
  },'-',{
    xtype: 'tbbutton'
    ,id: 'id_m08_delete_btn'
	,disabled: true
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/delete.png'
    ,text: 'Delete'
	,handler: function(){
      var sm = m08_grid.getSelectionModel();
	  var sel = sm.getSelected();
	  if (sm.hasSelection()){
        Ext.Msg.show({
          title: 'ลบข้อมูลบุคลากร'
		  ,buttons: Ext.Msg.YESNOCANCEL
          ,msg: 'ยืนยันการลบข้อมูล ' + sel.data.fname + ' ' + sel.data.lname + '?'
		  ,fn: function(btn){
            if (btn == 'yes'){
              var con = new Ext.data.Connection();
			  con.request({
                url: 'rb/ajDeletePerson.rb'
				,params: { id: sel.data.id, ptype: cur_man }
				,success: function(resp, opt){
				  m08_grid.getStore().remove(sel);
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ลบข้อมูล 1 รายการเรียบร้อยแล้ว'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
				}
				,failure: function(resp, opt){
                  Ext.Msg.show({
                    title: 'Success'
                    ,msg: 'ไม่สามารถทำการลบข้อมูลได้'
                    ,icon: Ext.Msg.INFO
                    ,buttons: Ext.Msg.OK
                    ,modal: true
                  });
                }
			  }); // eo con
            } // eo if
          } // eo fn
        }); // eo show
	  } // eo if
    } // eo handler
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m08_unlock_btn'
	,disabled: unlock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock_open.png'
    ,text: 'Unlock'
	,tooltip: 'กดปุ่มนี้เพื่อปลด Lock และทำการแก้ไขข้อมูลใหม่'
    ,handler: function(b, e){
	  Ext.getCmp('id_m08_lock_btn').enable();
	  Ext.getCmp('id_m08_next_btn').disable();
	  Ext.getCmp('id_m08_add_btn').enable();
	  Ext.getCmp('id_m08_delete_btn').disable();
	  this.disable();
	  m08lock = 'f';
	  save_flag = false;
	  ajUnlock(cur_hcode, 'm08');
	  cur_gridlock = m08lock;
	  m08_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m08_lock_btn'
	,disabled: lock_flag
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock.png'
    ,text: 'Lock'
	,tooltip: 'กดปุ่มนี้เพื่อ Lock ข้อมูลเมื่อเสร็จสิ้นการแก้ไขข้อมูล และทำการแก้ไขประเภทบุคลากรอื่นต่อไป'
    ,handler: function(b, e){
	  Ext.getCmp('id_m08_unlock_btn').enable();
	  Ext.getCmp('id_m08_next_btn').enable();
	  Ext.getCmp('id_m08_add_btn').disable();
	  Ext.getCmp('id_m08_delete_btn').disable();
      this.disable();
	  save_flag = true;
	  m08lock = 't';
	  ajLock(cur_hcode, 'm08');
	  cur_gridlock = m08lock;
	  m08_grid.getView().refresh();
    }
  },'-',{
    xtype: 'tbbutton'
	,id: 'id_m08_search_text'
    ,cls: 'x-btn-text'
	,text: 'Search'
	,handler: function() {
      var o = Ext.getCmp('id_m08_kw');
	  o.setValue('');
	  o.focus();
	  kws = '';
    }
  },{
    xtype: 'textfield'
	,id: 'id_m08_kw'
    ,value: kws
    ,enableKeyEvents: true
    ,listeners: {
      specialkey: function(field, el){
	if (el.getKey() == Ext.EventObject.ENTER)
	{
          kws = field.getValue();
	  searchPerson(kws);
	}
      }
    }
  },{
    xtype: 'tbbutton'
	,id: 'id_m08_search_btn'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/zoom.png'
	,handler: function() {
      kws= Ext.getCmp('id_m08_kw').getValue();
	  searchPerson(kws);
	}
  },'->',{
    xtype: 'tbbutton'
    ,id: 'id_m08_next_btn'
    ,disabled: next_flag
    ,text: 'Next'
    ,tooltip: 'บันทึกข้อมูลบุคลากรประเภทต่อไป!'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/resultset_next.png'
    ,handler: function(b,e) {
      Ext.getCmp('id_man_8').disable();
      cur_man = 1;
      m01_store.baseParams = {hcode: cur_hcode};
      m01_store.load({params:{start:0, limit: 10}});
      Ext.getCmp('id_man_1').enable();  
      Ext.getCmp('id_man_1').show();
      cur_gridlock = m01lock;
      if (cur_gridlock == 't')
      {
        Ext.getCmp('id_m01_add_btn').disable();
        Ext.getCmp('id_m01_delete_btn').disable();
        Ext.getCmp('id_m01_unlock_btn').enable();
        Ext.getCmp('id_m01_lock_btn').disable();
        Ext.getCmp('id_m01_next_btn').enable();
        save_flag = true;
      }
      else
      {
        Ext.getCmp('id_m01_add_btn').enable();
        Ext.getCmp('id_m01_delete_btn').disable();
        Ext.getCmp('id_m01_unlock_btn').disable();
        Ext.getCmp('id_m01_lock_btn').enable();
        Ext.getCmp('id_m01_next_btn').disable();
        save_flag = false;
      }
    }
  }]
  ,listeners: {
    cellclick: function(grid, rowIndex, columnIndex, e){
      var data = grid.getStore().data.items[rowIndex].data;

	  cur_id = data.id;
	  cur_cid = data.cid;
	  cur_hcode = data.hcode;
	  cur_piscode = data.piscode;
	  cur_otype = data.otype;
      cur_fname = data.fname;
      cur_lname = data.lname;
	  cur_sex = parseInt(data.sex);

      if (columnIndex == 8)
      {
        var con = new Ext.data.Connection();
		con.request({
          url: 'rb/ajGetEduPos.rb'
		  ,params: {id: cur_id, ptype: cur_man}
		  ,success: function(resp, opt){
            var json = Ext.util.JSON.decode(resp.responseText);
			cur_edu_first_code = json.edu_first_code;
			cur_edu_first_text = json.edu_first_text;
            cur_edu_top_code = json.edu_top_code;
            cur_edu_top_text = json.edu_top_text;
			cur_pos_j18_code = json.pos_j18_code;
			cur_pos_j18_text = json.pos_j18_text;
			cur_pos_active_code = json.pos_active_code;
			cur_pos_active_text = json.pos_active_text;
			showInputForm();
          }
		  ,failure: function(resp,opt){
            Ext.Msg.alert('Server Response','Cannot retrieve Education and Position data!');
			return false;
          }
		});
      }
    } //eo cellclick
  } //eo listeners
  ,bbar: new Ext.PagingToolbar({
    pageSize: 10
    ,store: m08_store
    ,displayInfo: true
    ,emptyMsg: 'No record to display'
    ,displayMsg: 'Records {0} - {1} of {2}'
  })
});

northBox = new Ext.BoxComponent({
  region: 'north'
  ,height: 100
  ,style: 'background-image:url(/man53/images/mainpage.png);background-repeat:no-repeat;'
});

function showLock(val, x, store){
  if(val == 't')
    return '<span><center><font color="green"><b>&#10004;</b></font></center></span>';
  else
    return '<span><center><font color="red"><b>&#10007;</b></font></center></span>';
};

var showLockGrid = function(){
  var rep_lock_store = new Ext.data.Store({
    url: 'rb/get-rep-lock-store.rb'
    ,id: 'id_rep_lock_store'
    ,baseParams: { login: cur_login }
    ,reader: new Ext.data.JsonReader({
      root: 'rows'
      ,totalProperty: 'totalCount'
	  ,progress: 'progress'
      ,id: 'id'
      ,fields: [
        'id'
        ,'hcode'
        ,'hname'
        ,'m1'
        ,'m2'
        ,'m3'
        ,'m4'
        ,'m5'
        ,'m6'
        ,'m7'
        ,'m8'
      ]
    }) 
  });
  //var progress = Ext.getCmp('id_rep_lock_store').progress;
  //var progress  =  0.10;
  //var chart = "<img src='http://chart.apis.google.com/chart?chs=250x100&cht=gom&chd=t:" + progress + "&chl=" + progress + "'/>";
  //var chart_progress = new Ext.Panel({
    //id: 'id_chart_progress'
	//,width: '100%'
	//,height: 50
	//,html: chart
  //});

  var rep_progress_grid = new Ext.grid.GridPanel({
    frame: false
    ,id: 'id_rep_progress_grid'
    ,store: rep_lock_store
    ,stripeRows: true
    ,width: '100%'
    ,autoHeight: true
    ,columns: [{
        id: 'id_rownum'    
        ,header: "#"
        ,width: 30
        ,renderer: rowNumberer.createDelegate(this)
	  },{
        id: 'id_hcode'    
        ,header: '<b>รหัส</b>'
        ,dataIndex: 'hcode'
        ,width: 75
        ,sortable: true
      },{
        id: 'id_office'
        ,header: '<b>ชื่อหน่วยงาน</b>'
        ,dataIndex: 'hname'
       ,width: 150
       ,sortable: true
      },{
        id: 'id_m01_lock'
      ,header: '<b>ข้าราชการ</b>'
      ,dataIndex: 'm1'
      ,width: 150
      ,sortable: true
      ,renderer: showLock
    },{
      id: 'id_m02_lock'
      ,header: '<b>ลูกจ้างประจำ</b>'
      ,dataIndex: 'm2'
      ,width: 100
      ,sortable: false
      ,renderer: showLock
    },{
      id: 'id_m03_lock'
      ,header: '<b>พนักงานราชการ</b>'
      ,dataIndex: 'm3'
      ,width: 100
      ,sortable: false
      ,renderer: showLock
    },{
      id: 'id_m04_lock'
      ,header: '<b>ลูกจ้างชั่วคราว</b>'
      ,dataIndex: 'm4'
      ,width: 100
      ,sortable: false
      ,renderer: showLock
    },{
      id: 'id_m05_lock'
      ,header: '<b>ข้าราชการ PCU</b>'
      ,dataIndex: 'm5' 
      ,width: 100
      ,sortable: false
      ,renderer: showLock
    },{
      id: 'id_m06_lock'
      ,header: '<b>ลูกจ้างประจำ PCU</b>'
      ,dataIndex: 'm6'
      ,width: 100
      ,sortable: false
      ,renderer: showLock
    },{
      id: 'id_m07_lock'
      ,header: '<b>พนักงานราชการ PCU</b>'
      ,dataIndex: 'm7'
      ,width: 100
      ,sortable: false
      ,renderer: showLock
    },{
      id: 'id_m08_lock'
      ,header: '<b>ลูกจ้างชั่วคราว PCU</b>'
      ,dataIndex: 'm8'
      ,width: 100
      ,sortable: false
      ,renderer: showLock
    }]
    ,autoExpandColumn: 'id_office'
    ,viewConfig: {
      forceFit: true
    }
    ,bbar: new Ext.PagingToolbar({
      pageSize: 15
      ,store: rep_lock_store
      ,displayInfo: true
      ,emptyMsg: 'No record to display'
      ,displayMsg: 'Records {0} - {1} of {2}'
    })
  });
  rep_lock_store.load({params:{start:0, limit: 15}});

  if (!win)
  {
    var win = new Ext.Window({
      id: 'id_progress_win'
      ,title: 'Progress Report'
      ,width: 600
      ,autoHeight: true
      ,closable: true
      ,resizable: false
      ,plain	: true
      ,border: false
      ,draggable: true 
      ,modal: true
      ,layout: 'fit'
      ,items: [ rep_progress_grid ]
    });
  }
  win.show();
  //win.center();
};

var btns = [];

hcs = hcode.split('|');
hns = office.split('|');
hcf = hc_flag.split('|')

cur_hcode = hcs[0];
cur_office = hns[0];
cur_hcflag = hcf[0];

for (var i=0;i<hcs.length;i++ )
{
  var btn = new Ext.Button({
    text: hns[i]
    ,id: hcs[i]
    ,hcf: hcf[i]
    ,width: '100%'
    ,style: 'padding-bottom:5px;'
    ,toggleGroup: 'office_btn'
    ,enableToggle: true
    ,handler: function() {
      cur_hcode = this.id;
      cur_office = this.text;
      cur_hcflag = this.hcf;
      var title = '<b>หน่วยงาน' + '<br/><font color="green">:: ' + this.text + '</font></b>';
      Ext.getCmp('id_west').setTitle(title);
      Ext.getCmp('id_man_' + cur_man).disable();
      resetAllLocks();
      cur_man = 1;
      cur_gridlock = m01lock;
      Ext.getCmp('id_man_1').enable();
      Ext.getCmp('id_man_1').show();
      m01_store.baseParams = {hcode: this.id};
      m01_store.load({params:{start:0, limit: 10}});
    }
  });
  btns.push(btn);
}

var progress_btn = new Ext.Button({
  text: 'ดูความคืบหน้า'
  ,width: '100%'
  ,style: 'padding-bottom:10px;'
  ,handler: showLockGrid
});

btns.push(progress_btn);

var logout_btn = new Ext.Button({
  text: 'Logout'
  ,width: '100%'
  ,style: 'padding-bottom:10px;'
  ,handler: function() {
    window.location.href = '/man53';
  }
});

btns.push(logout_btn);

function resetAllLocks()
{
  //Called when Next Button was clicked
  m01lock = m02lock = m03lock = m04lock = m05lock = m06lock = m07lock = m08lock = cur_gridlock = false;

  //Get locks for cur_hcode
  var con = new Ext.data.Connection();
  con.request({
    url: 'rb/ajGetLock.rb'
    ,params: { hcode: cur_hcode }
    ,success: function(resp, opt){
      var json = Ext.util.JSON.decode(resp.responseText);
	  var lock = json.lock;
	  var lck = lock.split('|');
      m01lock = lck[0];
      m02lock = lck[1];
      m03lock = lck[2];
      m04lock = lck[3];
      m05lock = lck[4];
      m06lock = lck[5];
      m07lock = lck[6];
      m08lock = lck[7];
	  if (cur_hcflag == 't')
	  {
        cur_gridlock = m05lock;
		m05_grid.getView().refresh();
        if (cur_gridlock == 't')
	    {
          Ext.getCmp('id_m05_add_btn').disable();
          Ext.getCmp('id_m05_delete_btn').disable();
          Ext.getCmp('id_m05_lock_btn').disable();
          Ext.getCmp('id_m05_unlock_btn').enable();
          Ext.getCmp('id_m05_next_btn').enable();
          save_flag = true;
        }
        else
	    {
          Ext.getCmp('id_m05_add_btn').enable();
          Ext.getCmp('id_m05_delete_btn').disable();
          Ext.getCmp('id_m05_lock_btn').enable();
          Ext.getCmp('id_m05_unlock_btn').disable();
          Ext.getCmp('id_m05_next_btn').disable();
          save_flag = false;
        }
	  }
	  else
	  {
        cur_gridlock = m01lock;
		m01_grid.getView().refresh();
        if (cur_gridlock == 't')
	    {
          Ext.getCmp('id_m01_add_btn').disable();
          Ext.getCmp('id_m01_delete_btn').disable();
          Ext.getCmp('id_m01_lock_btn').disable();
          Ext.getCmp('id_m01_unlock_btn').enable();
          Ext.getCmp('id_m01_next_btn').enable();
          save_flag = true;
        }
        else
	    {
          Ext.getCmp('id_m01_add_btn').enable();
          Ext.getCmp('id_m01_delete_btn').disable();
          Ext.getCmp('id_m01_lock_btn').enable();
          Ext.getCmp('id_m01_unlock_btn').disable();
          Ext.getCmp('id_m01_next_btn').disable();
          save_flag = false;
        }
	  }
    }
    ,failure: function(resp, opt){
      Ext.Msg.alert('Warning', 'Getlock failed!');
    }
  });
}

function ajLock(hcode, mx)
{
  var con = new Ext.data.Connection();
  con.request({
    url: 'rb/ajLock.rb'
    ,params: { hcode: hcode, mx: mx }
    ,success: function(resp, opt){
      var json = Ext.util.JSON.decode(resp.responseText);
	  var msg = json.msg;
      Ext.Msg.show({
        title: 'Lock Success!'
		,width: 250
        ,msg: msg
        ,icon: Ext.Msg.INFO
        ,buttons: Ext.Msg.OK
        ,modal: true
      });
    }
    ,failure: function(resp, opt){
      var json = Ext.util.JSON.decode(resp.responseText);
	  var msg = json.msg;
      Ext.Msg.show({
        title: 'Lock Failed!'
        ,msg: msg
        ,icon: Ext.Msg.WARNING
        ,buttons: Ext.Msg.OK
        ,modal: true
      });
    }
  });
}

function ajUnlock(hcode, mx)
{
  var con = new Ext.data.Connection();
  con.request({
    url: 'rb/ajUnlock.rb'
    ,params: { hcode: hcode, mx: mx }
    ,success: function(resp, opt){
      var json = Ext.util.JSON.decode(resp.responseText);
	  var msg = json.msg;
      Ext.Msg.show({
        title: 'Unlock Success!'
        ,msg: msg
        ,icon: Ext.Msg.INFO
        ,buttons: Ext.Msg.OK
        ,modal: true
      });
    }
    ,failure: function(resp, opt){
      var json = Ext.util.JSON.decode(resp.responseText);
	  var msg = json.msg;
      Ext.Msg.show({
        title: 'Unock Failed!'
        ,msg: msg
        ,icon: Ext.Msg.WARNING
        ,buttons: Ext.Msg.OK
        ,modal: true
      });
    }
  });
}

function setAddDeleteLockUnlockNext()
{
  if (cur_gridlock == 't')
  {
    add_flag = true;
    //delete_flag = true;
    lock_flag = true;
    unlock_flag = false;
    next_flag = false;
	save_flag = true;
  }
  else
  {
    add_flag = false;
    //delete_flag = false;
    lock_flag = false;
    unlock_flag = true;
    next_flag = true;
	save_flag = false;
  }
}

westPanel = {
  id: 'id_west'
  ,title: '<b>หน่วยงาน ' + '<br/><font color="green">:: ' + cur_office + '</font></b>'
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
  ,activeTab: active_tab
  ,items: [{
    title: 'ข้าราชการ'
    ,id: 'id_man_1'
    ,disabled: m01_flag
    ,layout: 'fit'
    ,items: [m01_grid]
  },{
    title: 'ลูกจ้างประจำ'
    ,id: 'id_man_2'
    ,disabled: true
    ,layout: 'fit'
    ,items: [m02_grid]
  },{
    title: 'พนักงานราชการ'
    ,id: 'id_man_3'
    ,disabled: true
    ,layout: 'fit'
    ,items: [m03_grid]
  },{
    title: 'ลูกจ้างชั่วคราว'
    ,id: 'id_man_4'
    ,disabled: true
    ,layout: 'fit'
    ,items: [m04_grid]
  },{
    title: 'ข้าราชการ PCU'
    ,id: 'id_man_5'
    ,disabled: m05_flag
    ,layout: 'fit'
    ,items: [m05_grid]
  },{
    title: 'ลูกจ้างประจำ PCU'
    ,id: 'id_man_6'
    ,disabled: true
    ,layout: 'fit'
    ,items: [m06_grid]
  },{
    title: 'พนักงานราชการ PCU'
    ,id: 'id_man_7'
    ,disabled: true
    ,layout: 'fit'
    ,items: [m07_grid]
  },{
    title: 'ลูกจ้างชั่วคราว PCU'
    ,id: 'id_man_8'
    ,disabled: true
    ,layout: 'fit'
    ,items: [m08_grid]
  }]
  ,deferredRender: true
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
