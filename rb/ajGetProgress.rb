#!/usr/bin/ruby

require 'postgres'
require 'cgi'

def getProvCount(pcode)
  con = PGconn.connect("localhost",5432,nil,nil,"manpower52")
  sql = "SELECT count(*) "
  sql += "FROM v_locks "
  sql += "WHERE pcode='#{pcode}' "
  res = con.exec(sql)
  con.close
  count = res[0][0].to_i
end

def getOkCount(pcode)
  con = PGconn.connect("localhost",5432,nil,nil,"manpower52")
  sql = "SELECT count(*) "
  sql += "FROM v_locks "
  sql += "WHERE pcode='#{pcode}' "
  sql += "AND m01=true AND m02=true AND m03=true AND m04=true "
  sql += "AND m05=true AND m06=true AND m07=true AND m08=true "
  res = con.exec(sql)
  con.close
  count = res[0][0].to_i
end

def getPname(pcode)
  con = PGconn.connect("localhost",5432,nil,nil,"manpower52")
  sql = "SELECT pname "
  sql += "FROM areainfo "
  sql += "WHERE pcode='#{pcode}' "
  res = con.exec(sql)
  con.close
  pname = res[0][0]
end

c = CGI::new
start = c['start'].to_i
limit = c['limit'].to_i
limit = 15 if (limit == 0)

con = PGconn.connect("localhost",5432,nil,nil,"manpower52")
sql = "SELECT khet,pcode,count(*) "
sql += "FROM v_locks "
sql += "GROUP BY khet,pcode "
sql += "ORDER BY khet,pcode "
res = con.exec(sql)
con.close

a = []
b = []
res.each do |rec|
  khet = rec[0]
  pcode = rec[1]
  tot = rec[2]
  ok = getOkCount(pcode)
	nok = tot.to_i - ok.to_i
	pct = ok.to_i * 100 / tot.to_i
  pname = getPname(pcode)
	info = "{'khet':'#{khet}','pcode':'#{pcode}','pname':'#{pname}','total':'#{tot}','ok':'#{ok}','nok':'#{nok}','pct':'#{pct}'}"
  a.push(info)
end

b = a[start..start+limit-1]
data = "{success: true, 'totalCount': #{a.size}, 'records':[#{b.join(',')}]}"

print <<EOF
Content-type: text/html

#{data}
EOF
