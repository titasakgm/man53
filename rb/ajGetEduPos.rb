#!/usr/bin/ruby

require 'postgres'
require 'cgi'
require 'man53_util.rb'

c = CGI::new
id = c['id'].to_i
ptype = c['ptype'].to_i

tbl = nil
if (ptype == 1)
  tbl = 'pis'
elsif (ptype == 2)
  tbl = 'epn'
elsif (ptype == 3)
  tbl = 'gmp'
elsif (ptype == 4)
  tbl = 'emp'
elsif (ptype == 5)
  tbl = 'pcupis'
elsif (ptype == 6)
  tbl = 'pcuepn'
elsif (ptype == 7)
  tbl = 'pcugmp'
elsif (ptype == 8)
  tbl = 'pcuemp'
end

con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
sql = "SELECT edu_first,edu_top,pos_j18,pos_active "
sql += "FROM #{tbl} "
sql += "WHERE id='#{id}' "
log("ajGetEduPos.rb-sql: #{sql}")
res = con.exec(sql)
con.close

edu1c = edu1t = edu2c = edu2t = pos1c = pos1t = pos2c =pos2t = nil
res.each do |rec|
  edu1c = rec[0]
  edu1t = getEduName(edu1c)
  edu2c = rec[1]
  edu2t = getEduName(edu2c)
  log("edu2c: #{edu2c} edu2t: #{edu2t}")
  pos1c = rec[2]
  pos1t = getPosName(pos1c, tbl)
  pos2c = rec[3]
  pos2t = getPosName(pos2c, tbl)
end

data = "{'edu_first_code':'#{edu1c}','edu_first_text':'#{edu1t}','edu_top_code':'#{edu2c}','edu_top_text':'#{edu2t}',"
data += "'pos_j18_code':'#{pos1c}','pos_j18_text':'#{pos1t}','pos_active_code':'#{pos2c}','pos_active_text':'#{pos2t}'}"

log("data: #{data}")

print <<EOF
Content-type: text/html

#{data}
EOF
