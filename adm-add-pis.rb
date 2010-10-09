#!/usr/bin/ruby

require 'postgres'

def insert(hcode,piscode,otype,cid,sex,fname,lname,edu_top,pos_active)
  hcode = sprintf("%05d", hcode.to_i)
  con = PGconn.connect("localhost",5432,nil,nil,"manpower53")
  sql = "INSERT INTO pis (hcode,piscode,otype,cid,sex,fname,lname,edu_top,pos_active) "
  sql += "VALUES ('#{hcode}','#{piscode}','#{otype}','#{cid}','#{sex}','#{fname}',"
  sql += "'#{lname}','#{edu_top}','#{pos_active}') "
  puts sql
  res = con.exec(sql)
  con.close
end

src = open("/man53/pis-150434.txt").readlines
n = 0
src.each do |l|
  n += 1
  f = l.chomp.split('|')
  hcode = f[0]
  piscode = f[1]
  cid = f[4]
  sex = f[5]
  fname = f[6]
  lname = f[7]
  edu_top = f[8]
  pos_active = f[9]
  otype = f[10]
  next if hcode.to_i == 0
  insert(hcode,piscode,otype,cid,sex,fname,lname,edu_top,pos_active)
  sleep(3) if n % 10000 == 0
end
