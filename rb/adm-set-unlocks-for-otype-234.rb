#!/usr/bin/ruby

require 'postgres'

def setUnlockM05ToM08(hcode)
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
  sql = "UPDATE locks SET m05='f',m06='f',m07='f',m08='f' "
  sql += "WHERE hcode='#{hcode}' "
  res = con.exec(sql)
  con.close
end

def checkHosp(hcode)
  hosp_flag = 'f'
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
      if (otype.to_i == 2 || otype.to_i == 3 || otype.to_i == 4)
        puts "hc:#{hcode} otype:#{otype}"
        hosp_flag = 't'
      end
    end
    hosp_flag
  end
end

con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
sql = "SELECT hcode FROM locks "
sql += "ORDER BY hcode"
res = con.exec(sql)
con.close

res.each do |rec|
  hc = rec[0]
  flag = checkHosp(hc)
  if (flag == 't')
    setUnlockM05ToM08(hc)
  end
end
