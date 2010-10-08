#!/usr/bin/ruby

require 'cgi'
require 'postgres'
require 'man52_util.rb'

c = CGI::new
kw = c['key']
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

start = c['start'].to_s.to_i
limit = c['limit'].to_s.to_i
limit = 10 if (limit == 0)

con = PGconn.connect("203.157.240.9",5432,nil,nil,"manpower52","postgres")
sql = "SELECT pos_code,pos_name "
sql += "FROM code_position "
sql += "WHERE pos_code || pos_name LIKE '%#{kw}%' "
sql += "AND pos_type='#{ptype}' "
res = con.exec(sql)
totalCount = res.num_tuples
sql += "ORDER BY pos_code "
sql += "LIMIT #{limit} OFFSET #{start} "

log("get-pos-store-sql: #{sql}")

res = con.exec(sql)
con.close

a = Array.new
res.each do |rec|
  code = rec[0]
  name = rec[1]
  i = "{'pos_code':'#{code}','pos_name':'#{name}'}"
  a.push(i)
end

data = "{success:'true', 'totalCount':'#{totalCount}','rows':"
data += "[#{a.join(',')}]}"

print <<EOF
Content-type: text/html

#{data}
EOF
