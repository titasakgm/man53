#!/usr/bin/ruby

require 'postgres'

def setLockM05ToM08(hcode)
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
  sql = "UPDATE locks SET m05='t',m06='t',m07='t',m08='t' "
  sql += "WHERE hcode='#{hcode}' "
  res = con.exec(sql)
  con.close
end

def checkHC(hcode)
  hc_flag = 'f'
  if (hcode.to_s.length > 5) # Array of hcodes for SSO
    hc_flag = checkHCS(hcode)
  else
    con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
    sql = "SELECT o_type FROM moffice "
    sql += "WHERE o_code='#{hcode}' "
    res = con.exec(sql)
    con.close
    res.each do |rec|
      otype = rec[0]
      # Change ssj sso to input 4 types like hc
      if (otype.to_i == 6 || otype.to_i == 1 || otype.to_i == 5)
        hc_flag = 't'
      end
    end
    hc_flag
  end
end

con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
sql = "SELECT hcode FROM locks "
sql += "ORDER BY hcode"
res = con.exec(sql)
con.close

res.each do |rec|
  hc = rec[0]
  flag = checkHC(hc)
  if (flag)
    setLockM05ToM08(hc)
  end
end


