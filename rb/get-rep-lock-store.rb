#!/usr/bin/ruby

require 'postgres'
require 'cgi'
require '/man53/rb/man53_util.rb'

def getHcodeFromUser(user)
  hcode = nil
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
  sql = "SELECT hcode FROM members "
  sql += "WHERE username='#{user}' "
	sql += "ORDER BY hcode "
  res = con.exec(sql)
  con.close

	found = res.num_tuples
  if (found == 0)
    hcode = 'NA'
  elsif (found == 1)
    hcode = res[0][0]
  elsif (found > 1) # sa1401 สสอ
	  if (res[0][0].to_i < 77) # สสจ.
		  hcode = res[0][0]
		else
      hcode = res.collect.join('|')
		end
  end
  hcode
end

def getHcodeFromPcode(pcode)
  hcodes = []
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
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
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
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
user = c['login']
hcode = getHcodeFromUser(user)
start = c['start'].to_i
limit = c['limit'].to_i

a = Array.new

hcs = hcode.split('|')
complete = 0
if (hcs.size == 1 && hcs[0].to_i < 76) # SSJ
  pcode = getProvCode(hcs[0])
	hcs = getHcodeFromPcode(pcode)
end

(0..hcs.size-1).each do |i|
  lock = getLock(hcs[i])
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
