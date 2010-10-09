#!/usr/bin/ruby

require 'postgres'

def insert(hcode,piscode,otype,cid,sex,fname,lname,edu_first,edu_top,pos_j18,pos_active)
  hcode = sprintf("%05d", hcode.to_i)
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53")
  sql = "INSERT INTO gmp (hcode,piscode,otype,cid,sex,fname,"
  sql += "lname,edu_first,edu_top,pos_j18,pos_active) "
  sql += "VALUES ('#{hcode}','#{piscode}','#{otype}','#{cid}',"
  sql += "'#{sex}','#{fname}','#{lname}','#{edu_first}',"
  sql += "'#{edu_top}','#{pos_j18}','#{pos_active}') "
  puts sql
  res = con.exec(sql)
  con.close
end

src = open("/man53/gmp-1087.txt").readlines
n = 0
src.each do |l|
  n += 1
  print l
  f = l.chomp.split('|')
  hcode = f[0]
  piscode = f[1]
  cid = f[4]
  sex = f[5]
  fname = f[6]
  lname = f[7]
  edu_first = f[8]
  edu_top = f[9]
  pos_j18 = f[10]
  pos_active = f[11]
  otype = f[12]
  next if (hcode.to_i == 0)
  sleep(3) if (n % 10000 == 0)
  insert(hcode,piscode,otype,cid,sex,fname,lname,edu_first,edu_top,pos_j18,pos_active)
end
