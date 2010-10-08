#!/usr/bin/ruby

require 'postgres'
require 'cgi'

c = CGI::new
id = c['records'].to_s.tr('"','')

con = PGconn.connect("203.157.240.9",5432,nil,nil,"manpower52","postgres")
sql = "DELETE FROM code_position "
sql += "WHERE id=#{id} "
res = con.exec(sql)
con.close

data = "{success:'true', 'msg':'1 record deleted!'}"

print <<EOF
Content-type: text/html

#{data}
EOF