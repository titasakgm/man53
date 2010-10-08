#!/usr/bin/ruby

require 'postgres'
require 'cgi'

c = CGI::new
id = c['id']
records = c['records']

a = records.tr('{\'\"}','')
b = a.split(',')
h = {}
(0..b.length).each do |i|
  f = b[i].to_s.split(':')
  h[f[0]] = f[1]
end

id = h['id']
ecode = h['e_code']
edesc = h['e_desc']
egroup = h['e_group']
egcode = h['e_gcode']

con = PGconn.connect("203.157.240.9",5432,nil,nil,"manpower52","postgres")
sql = "UPDATE code_educations "
sql += "SET e_code='#{ecode}',e_desc='#{edesc}',"
sql += "e_group='#{egroup}',e_gcode='#{egcode}' "
sql += "WHERE id=#{id} "
res = con.exec(sql)
con.close

data = "{success:'true', 'msg':'1 record updated!'}"

print <<EOF
Content-type: text/html

#{data}
EOF