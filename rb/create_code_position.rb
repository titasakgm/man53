#!/usr/bin/ruby

require 'postgres'

con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
sql = "INSERT INTO code_position (pos_type,pos_code,pos_name,pos_group) "
sql += "VALUES ('[New]','[New]','[New Name]','[New Group]')"
res = con.exec(sql)
sql = "SELECT id FROM code_position "
res = con.exec(sql)
totalCount = res.num_tuples
con.close

data = "{success:'true','totalCount':#{totalCount}, 'msg':'1 record added!'}"

print <<EOF
Content-type: text/html

#{data}
EOF
