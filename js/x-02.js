Ext.QuickTips.init();

var cur_man = 3;

var m03_store = new Ext.data.Store({
  url: 'rb/get-m03-store.rb'
  ,reader: new Ext.data.JsonReader({
    root: 'rows'
    ,totalProperty: 'totalCount'
    ,id: 'id'
    ,fields: [
      'id'
      ,'bhpp_code'
      ,'person_code'
      ,'office'
      ,'pid'
      ,'fname'
      ,'lname'
      ,'sex'
    ]
  }) 
});

m03_store.load();

var addImage = function(){
  return '<img alt="รายละเอียด" src="icons/table_edit.png"/>';
};

var m03_grid = new Ext.grid.GridPanel({
  width: '100%'
  ,frame: false
  ,store: m03_store
  ,columns: [new Ext.grid.RowNumberer({width: 30}),{
    id: 'bhpp_code'    
    ,header: '<b>รหัสหน่วยงาน สนย.</b>'
    ,dataIndex: 'bhpp_code'
    ,width: 100
    ,sortable: true
  },{
    id: 'person_code'
    ,header: '<b>รหัสหน่วยงาน กอง จ.</b>'
    ,dataIndex: 'person_code'
    ,width: 100
    ,sortable: true
  },{
    id: 'office'
    ,header: '<b>ชื่อหน่วยงาน</b>'
    ,dataIndex: 'office'
    ,width: 100
    ,sortable: true
  },{
    id: 'pid'
    ,header: '<b>เลขที่บัตรประชาชน</b>'
    ,dataIndex: 'pid'
    ,width: 100
    ,sortable: true
  },{
    id: 'fname'
    ,header: '<b>ชื่อ</b>'
    ,dataIndex: 'fname'
    ,width: 100
    ,sortable: true
  },{
    id: 'lname'
    ,header: '<b>นามสกุล</b>'
    ,dataIndex: 'lname'
    ,width: 100
    ,sortable: true
  },{
    id: 'sex'
    ,header: '<b>เพศ</b>'
    ,dataIndex: 'sex'
    ,width: 100
    ,sortable: true
  },{
    id: 'detail'
    ,header: ''
    ,width: 30
    ,dataIndex: ''
    ,renderer: addImage
  }]
  ,viewConfig: {
    forceFit: true,
  }
  ,tbar: [{
    xtype: 'tbbutton'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/add.png'
    ,text: 'Add'
  },'-',{
    xtype: 'tbbutton'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/delete.png'
    ,text: 'Delete'
  },'->',{
    xtype: 'tbbutton'
    ,id: 'id_lock'
    ,cls: 'x-btn-text-icon'
    ,icon: 'icons/lock_open.png'
    ,text: 'Lock'
    ,handler: function(b, e) {
      debugger;
      
    }
  }]
  ,bbar: new Ext.PagingToolbar({
    pageSize: 10
    ,store: m03_store
    ,displayInfo: false
    ,emptyMsg: 'No record to display'
  })
});

northBox = new Ext.BoxComponent({
  region: 'north'
  ,height: 100
  ,style: 'background-image:url(/man53/images/mainpage.png);background-repeat:no-repeat;'
});

westPanel = {
  id: 'id-west'
  ,title: office
  ,region: 'west'
  ,height: 175
  ,width: 200
  ,margins: '0 0 0 0'
  ,collapsible: false  
}

centerPanel = {
  id: 'id-center'
  ,region: 'center'
  ,hideCollapseTool: true
  ,xtype: 'tabpanel'
  ,items: [{
    title: 'ข้าราชการ'
    ,id: 'id_man_1'
    ,disabled: true
  },{
    title: 'ลูกจ้างประจำ'
    ,id: 'id_man_2'
    ,disabled: true
  },{
    title: 'พนักงานราชการ'
    ,id: 'id_man_3'
    ,layout: 'fit'
    ,items: [m03_grid]
  },{
    title: 'ลูกจ้างชั่วคราว'
    ,id: 'id_man_4'
    ,disabled: true
  },{
    title: 'ข้าราชการ PCU'
    ,id: 'id_man_5'
    ,disabled: true
  },{
    title: 'ลูกจ้างประจำ PCU'
    ,id: 'id_man_6'
    ,disabled: true
  },{
    title: 'พนักงานราชการ PCU'
    ,id: 'id_man_7'
    ,disabled: true
  },{
    title: 'ลูกจ้างชั่วคราว PCU'
    ,id: 'id_man_8'
    ,disabled: true
  }]
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
