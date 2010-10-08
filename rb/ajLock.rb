#!/usr/bin/ruby

require 'postgres'
require 'cgi'
require 'man52_util.rb'

c = CGI::new
hcode = c['hcode']
mx = c['mx']

con = PGconn.connect("localhost",5432,nil,nil,"manpower52","postgres")
sql = "UPDATE locks SET #{mx}='T' "
sql += "WHERE hcode='#{hcode}' "
log("ajLock-sql1: #{sql}")
res = con.exec(sql)
sql = "SELECT m01,m02,m03,m04,m05,m06,m07,m08 FROM locks "
sql += "WHERE hcode='#{hcode}' "
log("ajLock-sql2: #{sql}")
res = con.exec(sql)
con.close

lock = nil
res.each do |rec|
  lock = rec.join
end

unlock = lock.count('f')
hc = checkHC(hcode)

log("hcode:#{hcode} hc:#{hc}")

if (unlock == 0)
  if (hc == 't')
    msg = "ท่านได้บันทึกข้อมูลครบทั้ง 4 ประเภทแล้ว"
  else
		msg = "ท่านได้บันทึกข้อมูลครบทั้ง 8 ประเภทแล้ว"
  end
else
  msg = "คงเหลืออีก #{unlock} ประเภท"
end

print <<EOF
Content-type: text/html

{ success:'true','msg':'#{msg}' }
EOF