Ext.QuickTips.init()

var loginForm = {
  xtype: 'form'
  ,id: 'login-form'
  ,bodyStyle: 'padding:15px;background:transparent;'
  ,border: false
  ,url: 'rb/login.rb'
  ,items: [{
    xtype: 'box'
    ,autoEl: {
      tag: 'div'
      ,html: '<div class="app-msg"> \
              <img src="images/people.png" class="app-img" /> \
              Login to Manpower 2553</div>'
    }
  },{
    xtype: 'textfield'
    ,id: 'login-user'
    ,fieldLabel: 'Username'
    ,allowBlank: false
  },{
    xtype: 'textfield'
    ,id: 'login-pwd'
    ,fieldLabel: 'Password'
    ,inputType: 'password'
    ,allowBlank: false
    ,enableKeyEvents: true
    ,listeners: {
      specialkey: function(field, el){
        if (el.getKey() == Ext.EventObject.ENTER)
          loginFormSubmit();
      }
	}
  }]
  ,buttons: [{
    text: 'Login'
    ,id: 'id_login_btn'
    ,handler: loginFormSubmit
  },{
    text: 'Cancel'
    ,handler: function() {
      win.hide();
	}
  },{
    text: 'Download คู่มือการใช้งาน'
    ,handler: function() {
		window.location.href = 'ftp://203.157.240.9/pub/manpower52/manpower52.rar';
    }
  }]
  ,buttonAlign: 'center'
}

function loginFormSubmit()
{
  Ext.getCmp('login-form').getForm().submit({
    method: 'POST'
    ,waitTitle: 'Connecting'
    ,waitMsg: 'Process loggin ...'
    ,success: function(form,action) {
      var json = Ext.util.JSON.decode(action.response.responseText);
      var status = json.success;
      var msg = json.msg;
      var hcode = json.hcode;
      var office = json.office;
      var login = Ext.get('login-user').dom.value;
      var lock  = json.lock;
      var hc_flag = json.hc_flag;

      if (status == 'true')
      {
        win.destroy();
        if (login == 'admin')
          window.location = "/man53/admin-01.rb";
        else
          window.location = "/man53/man-01.rb?hcode=" + hcode + "&office=" + office + "&login=" + login + "&lock=" + lock + "&hc_flag=" + hc_flag;
      }
      else
      {
        Ext.Msg.alert('Warning', msg);
        Ext.getCmp('login-form').getForm().reset();
      }
    }
    ,failure: function(form,action) {
      Ext.Msg.alert('Error', 'Cannot sumbit form');
    }
  });
}  

Ext.onReady(function() {
  Ext.BLANK_IMAGE_URL = '/ext/resources/images/default/s.gif';
  win = new Ext.Window({
    layout: 'form'
    ,width: 340
    ,y: 100
    ,autoHeight: true
    ,closeAction: 'hide'
    ,items: [loginForm]
  });
  win.show();
});

