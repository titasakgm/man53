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
postype = h['pos_type']
poscode = h['pos_code']
posname = h['pos_name']
posgroup = h['pos_group']

con = PGconn.connect("203.157.240.9",5432,nil,nil,"manpower53","postgres")
sql = "UPDATE code_position "
sql += "SET pos_type='#{postype}',pos_code='#{poscode}',"
sql += "pos_name='#{posname}',pos_group='#{posgroup}' "
sql += "WHERE id=#{id} "
res = con.exec(sql)
con.close

data = "{success:'true', 'msg':'1 record updated!'}"

print <<EOF
Content-type: text/html

#{data}
EOF