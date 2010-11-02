#!/usr/bin/ruby

require 'postgres'

def log(msg)
  log = open("/tmp/man53.log","a")
  log.write(Time.now())
  log.write("\n")
  log.write(msg)
  log.write("\n")
  log.write('-' * 40)
  log.write("\n")
  log.close
end

def checkAdmin(pass)
  hcode = nil
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
  sql = "SELECT * FROM admin "
  sql += "WHERE a_password='#{pass}' "
  res = con.exec(sql)
  con.close
  found = res.num_tuples
  isAdmin = (found == 1) ? true : false
end

def authen(user,pass)
  hcode = nil
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
  sql = "SELECT hcode FROM members "
  sql += "WHERE username='#{user}' AND password='#{pass}' "
	sql += "ORDER BY hcode "
  #log("authen-sql: #{sql}")
  res = con.exec(sql)
  con.close
  found = res.num_tuples
  if (found == 0)
    hcode = 'NA'
  elsif (found == 1)
    hcode = res[0][0]
  elsif (found > 1) # sa1401 สสอ
    hcode = res.collect.join('|')
  end
  hcode
end

def getSSJ(user)
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
  sql = "SELECT o_code FROM moffice "
  sql += "WHERE o_pcode='#{user}' AND o_type='1' "
  res = con.exec(sql)
  log("getSSJ(user)-sql: #{sql}")
  con.close
  found = res.num_tuples
  hcode = (found == 0) ? 'NA' : res[0][0]
end

def getProvCode(hcode)
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
  sql = "SELECT o_pcode FROM moffice "
  sql += "WHERE o_code='#{hcode}' "
  res = con.exec(sql)
  log("getProvCode(hcode)-sql: #{sql}")
  con.close
  found = res.num_tuples
  pcode = (found == 0) ? 'NA' : res[0][0]
end

def getSSO(user)
  pcode = user[0..1]
  acode = user[2..3]
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
  sql = "SELECT o_code FROM moffice "
  sql += "WHERE o_pcode='#{pcode}' AND o_acode = '#{acode}' "
  sql += "AND (o_type='5' OR o_type='6') "
  sql += "ORDER BY o_code "
  log("getSSO(user)-sql: #{sql}")
  res = con.exec(sql)
  con.close
  found = res.num_tuples

  a = Array.new

  res.each do |rec|
    hcode = rec[0]
    a.push(hcode)
  end
  hcode = (found == 0) ? 'NA' : a.join('|')
end

def getOffice(hcode)
  hname = nil
  if (hcode.to_s.length > 5) # Array of hcodes for SSO
    hname = getOffices(hcode)
  else    
    con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
    sql = "SELECT o_name FROM moffice "
    sql += "WHERE o_code='#{hcode}' "
    res = con.exec(sql)
    con.close
    found = res.num_tuples
    hname = (found == 0) ? 'NA' : res[0][0]
  end
  hname
end

def getOffices(hcode)
  a = Array.new
  hcs = hcode.to_s.split('|')
  hcs.each do |hc|
    hname = getOffice(hc)
    a.push(hname)
  end
  hname = a.join('|')
end

def getLock(hcode)
  lock = nil
  hc = hcode.split('|').first
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
  sql = "SELECT m01,m02,m03,m04,m05,m06,m07,m08 FROM locks "
  sql += "WHERE hcode='#{hc}' "
  log("getLock-sql: #{sql}")
  res = con.exec(sql)
  con.close
  res.each do |rec|
    lock = rec.join('|')
  end
  lock
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

def checkHCS(hcode)
  a = Array.new
  hcs = hcode.to_s.split('|')
  hcs.each do |hc|
    flag = checkHC(hc)
    a.push(flag)
  end
  hc_flag = a.join('|')
end

def getEduName(code)
  desc = 'ระบุ'
  if (code.to_s.length == 5)
    con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
    sql = "SELECT e_desc FROM code_education "
    sql += "WHERE e_code='#{code}' "
    res = con.exec(sql)
    con.close
    found = res.num_tuples
    if (found == 1)
      desc = res[0][0]
    end
  end
  desc
end

def getPosName(code, type)
  desc = 'ระบุ'
  if (code.to_s.length == 5)
    con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
    sql = "SELECT pos_name FROM code_position "
    sql += "WHERE pos_code='#{code}' AND pos_type='#{type}' "
    res = con.exec(sql)
    con.close
    found = res.num_tuples
    if (found == 1)
      desc = res[0][0]
    end
  end
  desc
end

def getPiscode(tbl, hcode)
  piscode = 'NA'
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
  sql = "SELECT piscode FROM #{tbl} "
  sql += "WHERE hcode='#{hcode}' "
  res = con.exec(sql)
  con.close
  found = res.num_tuples
  piscode = res[0][0] if (found == 1)
end

def updatePiscode(tbl, hcode, piscode)
  oldpiscode = getPiscode(tbl, hcode)
  return if (oldpiscode == 'NA')
  if (piscode =~ /\d\d\d\d\d/ && oldpiscode != piscode)
    con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")

    sql = "UPDATE pis SET piscode='#{piscode}' WHERE hcode='#{hcode}' " 
    #log("sql-pis: #{sql}")
    res = con.exec(sql)

    sql = "UPDATE epn SET piscode='#{piscode}' WHERE hcode='#{hcode}' " 
    #log("sql-epn: #{sql}")
    res = con.exec(sql)
    
    sql = "UPDATE gmp SET piscode='#{piscode}' WHERE hcode='#{hcode}' " 
    #log("sql-gmp: #{sql}")
    res = con.exec(sql)

    sql = "UPDATE emp SET piscode='#{piscode}' WHERE hcode='#{hcode}' " 
    #log("sql-emp: #{sql}")
    res = con.exec(sql)

    sql = "UPDATE pcupis SET piscode='#{piscode}' WHERE hcode='#{hcode}' " 
    #log("sql-pcupis: #{sql}")
    res = con.exec(sql)

    sql = "UPDATE pcuepn SET piscode='#{piscode}' WHERE hcode='#{hcode}' " 
    #log("sql-pcuepn: #{sql}")
    res = con.exec(sql)

    sql = "UPDATE pcugmp SET piscode='#{piscode}' WHERE hcode='#{hcode}' " 
    #log("sql-pcugmp: #{sql}")
    res = con.exec(sql)

    sql = "UPDATE pcuemp SET piscode='#{piscode}' WHERE hcode='#{hcode}' " 
    #log("sql-pcuemp: #{sql}")
    res = con.exec(sql)

    con.close
  end
end
