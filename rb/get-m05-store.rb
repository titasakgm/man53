#!/usr/bin/ruby

require 'postgres'
require 'cgi'
require 'man53_util.rb'

c = CGI::new
hcode = c['hcode']
office = getOffice(hcode)
start = c['start'].to_s.to_i
limit = c['limit'].to_s.to_i
limit = 10 if (limit == 0)
kw = c['kw'].to_s

#View v_pcupis
#id|pcode|acode|hcode|piscode|otype|cid|sex|fname|lname|edu_first|edu_top|pos_j18|pos_active

con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
sql = "SELECT * FROM v_pcupis "
sql += "WHERE hcode='#{hcode}' "
if (kw.length > 0)
  sql += "AND cid||fname||lname LIKE '%#{kw}%' "
end
res = con.exec(sql)
totalCount = res.num_tuples
sql += "ORDER BY cid "
sql += "LIMIT #{limit} OFFSET #{start}"
res = con.exec(sql)
con.close

a = Array.new

res.each do |rec|
  id = rec[0]
  pcode = rec[1]
  acode = rec[2]
  hcode = rec[3]
  piscode = rec[4]
  otype = rec[5]
  cid = rec[6]
  sex = rec[7]
  fname = rec[8]
  lname = rec[9]
  edu_first = rec[10]
  edu_top = rec[11]
  pos_j18 = rec[12]
  pos_active = rec[13]

  i = "{'id':'#{id}','hcode':'#{hcode}','piscode':'#{piscode}','otype':'#{otype}','office':'#{office}',"
  i += "'cid':'#{cid}','sex':'#{sex}','fname':'#{fname}','lname':'#{lname}',"
  i += "'edu_first':'#{edu_first}','edu_top':'#{edu_top}','pos_j18':'#{pos_j18}',"
  i += "'pos_active':'#{pos_active}'}"
  a.push(i)
end

data = "{success:'true','totalCount':#{totalCount},"
data += "'rows':[#{a.join(',')}]}"

print <<EOF
Content-type: text/html

#{data}
EOF
