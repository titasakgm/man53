#!/usr/bin/ruby

require 'postgres'
require 'cgi'
require '/man52/rb/man52_util.rb'

def getHcodeFromPcode(pcode)
  hcodes = []
  con = PGconn.connect("localhost",5432,nil,nil,"manpower52","postgres")
  sql = "SELECT hcode FROM v_locks "
  sql += "WHERE pcode='#{pcode}' "
	sql += "ORDER BY hcode "
  res = con.exec(sql)
  con.close
  res.each do |rec|
    hcode = rec[0]
		hcodes.push(hcode)
  end
  hcodes
end

def getLock(hcode)
  info = nil
	hname = getOffice(hcode)
  con = PGconn.connect("localhost",5432,nil,nil,"manpower52","postgres")
  sql = "SELECT id,hcode,m01,m02,m03,m04,m05,m06,m07,m08 FROM v_locks "
  sql += "WHERE hcode='#{hcode}' "
  res = con.exec(sql)
  con.close
  found = res.num_tuples
  if (found == 0)
    lock = 'F:F:F:F:F:F:F:F'
    info = "{'hcode':'#{hcode}','hname':'#{hname}','lock':'#{lock}'}"
  else
    res.each do |rec|
      id = rec[0]
			hcode = rec[1]
      m01 = rec[2]
      m02 = rec[3]
      m03 = rec[4]
      m04 = rec[5]
      m05 = rec[6]
      m06 = rec[7]
      m07 = rec[8]
      m08 = rec[9]
      info = "{'id':'#{id}', 'hcode':'#{hcode}','hname':'#{hname}','m1':'#{m01}','m2':'#{m02}','m3':'#{m03}','m4':'#{m04}','m5':'#{m05}','m6':'#{m06}','m7':'#{m07}','m8':'#{m08}'}"
    end
  end
  info
end

c = CGI::new
pcode = c['pcode']
hcodes = getHcodeFromPcode(pcode)
start = c['start'].to_i
limit = c['limit'].to_i

a = Array.new
complete = 0

(0..hcodes.size-1).each do |i|
  lock = getLock(hcodes[i])
	if (lock.count('t') == 8)
	  complete += 1
	end
  a.push(lock)
end

progress = complete / (a.size * 1.0)
progress = sprintf("%.2f", progress)
totalCount = a.size
b = []
if (a.size > 15)
  b = a[start..start+limit-1]
else
  b = a
end
data = "{success: true, 'totalCount':#{a.size}, 'progress': '#{progress}', 'rows':[#{b.join(',')}]}"

print <<EOF
Content-type: text/html

#{data}
EOF
