#!/usr/bin/ruby

require 'postgres'
require 'cgi'

def log(msg)
  log = open("/tmp/test.log","a")
  log.write(msg)
  log.write("\n")
  log.close
end

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
hcode = h['hcode']
name = h['name']
otype = h['otype']
username = h['username']
password = h['password']

con = PGconn.connect("203.157.240.9",5432,nil,nil,"manpower53","postgres")
sql = "UPDATE members "
sql += "SET hcode='#{hcode}',name='#{name}',otype='#{otype}',"
sql += "username='#{username}',password='#{password}' "
sql += "WHERE id=#{id} "
log("sql: #{sql}")
res = con.exec(sql)
con.close

data = "{success:'true', 'msg':'1 record updated!'}"

print <<EOF
Content-type: text/html

#{data}
EOF
