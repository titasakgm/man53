#!/usr/bin/ruby

require 'postgres'
require 'cgi'
require 'man53_util.rb'

c = CGI::new
user = c['login-user'].to_s.split('').join('')
pass = c['login-pwd'].to_s.split('').join('')

#default test
data = nil
hcode = 'NA'
office = 'NA'
hc_flag = nil

admin = checkAdmin(pass)
if (admin)
  if (user == 'admin')
    data = "{success:'true','login':'admin'}"
  else
    hcode = user
    office = getOffice(hcode)
    if (office == 'NA')
      data = "{success:'false','msg':'HCODE invalid'}"
    else
      lock = getLock(hcode)
      hc_flag = checkHC(hcode)
      data = "{success:'true','login':'admin','hcode':'#{hcode}','office':'#{office}','lock':'#{lock}','hc_flag':'#{hc_flag}'}"
    end
  end
else
  hcode = authen(user,pass)
  if (hcode == 'NA')
    data = "{success:'false','msg':'Username / Password invalid'}"
  else
    office = getOffice(hcode)
    lock = getLock(hcode)
    hc_flag = checkHC(hcode)
    data = "{success:'true','login':'#{user}','hcode':'#{hcode}','office':'#{office}','lock':'#{lock}','hc_flag':'#{hc_flag}'}"
  end
end

print <<EOF
Content-type: text/html

#{data}
EOF
