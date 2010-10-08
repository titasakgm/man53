#!/usr/bin/ruby

require 'postgres'
require 'cgi'

c = CGI::new
id = c['id']
ptype = c['ptype']

if (ptype == '1')
  ptype = 'pis'
elsif (ptype == '2')
  ptype = 'epn'
elsif (ptype == '3')
  ptype = 'gmp'
elsif (ptype == '4')
  ptype = 'emp'
elsif (ptype == '5')
  ptype = 'pcupis'
elsif (ptype == '6')
  ptype = 'pcuepn'
elsif (ptype == '7')
  ptype = 'pcugmp'
elsif (ptype == '8')
  ptype = 'pcuemp'
end

con = PGconn.connect("localhost",5432,nil,nil,"manpower52","postgres")
sql = "DELETE FROM #{ptype} "
sql += "WHERE id='#{id}' "
#log("ajDeletePerson.rb-sql: #{sql}")
res = con.exec(sql)
con.close

data = "{success:true, 'msg':'1 record deleted!'}"

print <<EOF
Content-type: text/html

#{data}
EOF
