#!/usr/bin/ruby

require 'postgres'
require 'cgi'

c = CGI::new
start = c['start'].to_s.to_i
limit = c['limit'].to_s.to_i
limit = 10 if (limit == 0)
kw = c['kw']

con = PGconn.connect("localhost",5432,nil,nil,"manpower52","postgres")
sql = "SELECT * FROM v_members "
if (kw > '')
  sql += "WHERE upper(hcode||name||otype||username||password) LIKE '%#{kw.upcase}%' "
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
  hcode = rec[1]
  name = rec[2]
  otype = rec[3]
  username = rec[4]
  password = rec[5]
  hname = rec[6]
  i = "{'id':'#{id}','hcode':'#{hcode}','hname':'#{hname}',"
  i += "'name':'#{name}','otype':'#{otype}',"
  i += "'username':'#{username}','password':'#{password}'}"
  a.push(i)
end

data = "{success:true,'totalCount':#{totalCount},'records':[#{a.join(',')}]}"

print <<EOF
Content-type: text/html

#{data}
EOF
