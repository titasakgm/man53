#!/usr/bin/ruby

require 'postgres'

con = PGconn.connect("localhost",5432,nil,nil,"manpower52","postgres")
sql = "INSERT INTO code_educations (e_code,e_desc,e_group,e_gcode) "
sql += "VALUES ('[New code]','[New description]','[New group]','[New group code]')"
res = con.exec(sql)
sql = "SELECT id FROM code_educations"
res = con.exec(sql)
totalCount = res.num_tuples
con.close

data = "{success:'true','totalCount':#{totalCount}, 'msg':'1 record added!'}"

print <<EOF
Content-type: text/html

#{data}
EOF
