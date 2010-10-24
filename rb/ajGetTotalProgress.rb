#!/usr/bin/ruby

require 'postgres'

def getTotalCount()
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53")
  sql = "SELECT count(*) "
  sql += "FROM v_locks "
  res = con.exec(sql)
  con.close
  count = res[0][0].to_i
end

def getOkCount()
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53")
  sql = "SELECT count(*) "
  sql += "FROM v_locks "
  sql += "WHERE m01=true AND m02=true AND m03=true AND m04=true "
  sql += "AND m05=true AND m06=true AND m07=true AND m08=true "
  res = con.exec(sql)
  con.close
  count = res[0][0].to_i
end

total = getTotalCount
ok = getOkCount
progress = ok.to_i * 100/ (total * 1.0)
progress = sprintf("%.2f", progress)

data = "{success: true, 'totalProgress': '#{progress}' }"

print <<EOF
Content-type: text/html

#{data}
EOF
