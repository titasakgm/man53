#!/usr/bin/ruby

require 'postgres'
require 'cgi'

c = CGI::new
start = c['start'].to_s.to_i
limit = c['limit'].to_s.to_i
limit = 10 if (limit == 0)
kw = c['kw']

con = PGconn.connect("localhost",5432,nil,nil,"manpower52","postgres")
sql = "SELECT * FROM code_position "
if (kw > '')
  sql += "WHERE upper(pos_type||pos_code||pos_name||pos_group) LIKE '%#{kw.upcase}%' "
end
res = con.exec(sql)
totalCount = res.num_tuples
sql += "ORDER BY id "
sql += "LIMIT #{limit} OFFSET #{start} "
res = con.exec(sql)
con.close

a = []

res.each do |rec|
  id = rec[0]
  postype = rec[1]
  poscode = rec[2]
  posname = rec[3]
  posgroup = rec[4]
  i = "{'id':'#{id}','pos_type':'#{postype}','pos_code':'#{poscode}',"
  i += "'pos_name':'#{posname}','pos_group':'#{posgroup}'}"
  a.push(i)
end

data = "{success:true,'totalCount':#{totalCount},'records':[#{a.join(',')}]}"

print <<EOF
Content-type: text/html

#{data}
EOF
