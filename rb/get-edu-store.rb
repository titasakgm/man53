#!/usr/bin/ruby

require 'cgi'
require 'postgres'

c = CGI::new
kw = c['key']
start = c['start'].to_s.to_i
limit = c['limit'].to_s.to_i
limit = 10 if (limit == 0)

con = PGconn.connect("203.157.240.9",5432,nil,nil,"manpower52","postgres")
sql = "SELECT id, e_code,e_desc "
sql += "FROM code_educations "
sql += "WHERE e_code || e_desc LIKE '%#{kw}%' "
res = con.exec(sql)
totalCount = res.num_tuples
sql += "ORDER BY e_code "
sql += "LIMIT #{limit} OFFSET #{start} "
res = con.exec(sql)
con.close

a = Array.new

res.each do |rec|
  id = rec[0]
  code = rec[1]
  desc = rec[2]
  i = "{'id':'#{id}','e_code':'#{code}','e_desc':'#{desc}'}"
  a.push(i)
end

data = "{success:'true', 'totalCount':'#{totalCount}','rows':"
data += "[#{a.join(',')}]}"

print <<EOF
Content-type: text/html

#{data}
EOF
