function showLock(val, x, store){
  if(val == 't')
    return '<span><center><font color="green"><b>&#10004;</b></font></center></span>';
  else
    return '<span><center><font color="red"><b>&#10007;</b></font></center></span>';
};

var rep_lock_store = new Ext.data.Store({
  url: 'rb/get-rep-lock-store-by-pcode.rb'
  ,id: 'id_rep_lock_store'
  ,baseParams: { pcode: cur_pcode }
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

var rep_progress_grid = new Ext.grid.GridPanel({
  frame: false
  ,title: 'Locks Detail'
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
