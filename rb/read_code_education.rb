#!/usr/bin/ruby

require 'postgres'
require 'cgi'

c = CGI::new
start = c['start'].to_s.to_i
limit = c['limit'].to_s.to_i
limit = 10 if (limit == 0)
kw = c['kw']

con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
sql = "SELECT * FROM code_educations "
if (kw > '')
  sql += "WHERE upper(e_code||e_desc||e_group||e_gcode) LIKE '%#{kw.upcase}%' "
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
  ecode = rec[1]
  edesc = rec[2]
  egroup = rec[3]
  egcode = rec[4]
  i = "{'id':'#{id}','e_code':'#{ecode}','e_desc':'#{edesc}',"
  i += "'e_group':'#{egroup}','e_gcode':'#{egcode}'}"
  a.push(i)
end

data = "{success:true,'totalCount':#{totalCount},'records':[#{a.join(',')}]}"

print <<EOF
Content-type: text/html

#{data}
EOF
