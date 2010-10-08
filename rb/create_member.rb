#!/usr/bin/ruby

require 'postgres'

con = PGconn.connect("localhost",5432,nil,nil,"manpower52","postgres")
sql = "INSERT INTO members (hcode,name,otype,username,password) "
sql += "VALUES ('99999','[New name]','[New otype]','[New username]','[New password]')"
res = con.exec(sql)
sql = "SELECT id FROM members"
res = con.exec(sql)
totalCount = res.num_tuples
con.close

data = "{success:'true','totalCount':#{totalCount}, 'msg':'1 record added!'}"

print <<EOF
Content-type: text/html

#{data}
EOF
