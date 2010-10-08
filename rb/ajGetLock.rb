#!/usr/bin/ruby

require 'postgres'
require 'cgi'

c = CGI::new
hcode = c['hcode']

con = PGconn.connect("localhost",5432,nil,nil,"manpower52","postgres")
sql = "SELECT m01,m02,m03,m04,m05,m06,m07,m08 "
sql += "FROM locks "
sql += "WHERE hcode='#{hcode}' "
res = con.exec(sql)
con.close

lock = nil
res.each do |rec|
  lock = rec.join('|')
end

print <<EOF
Content-type: text/html

{ success:'true', 'lock':'#{lock}' }
EOF