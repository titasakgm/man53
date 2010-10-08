#!/usr/bin/ruby

require 'postgres'

def insert(tbl,hcode,otype,cid,sex,fname,lname)
  con = PGconn.connect("localhost",5432,nil,nil,"manpower52","postgres")
  sql = "INSERT INTO #{tbl} (hcode,otype,cid,sex,fname,lname) "
  sql += "VALUES ('#{hcode}','#{otype}','#{cid}','#{sex}','#{fname}','#{lname}') "
  puts sql
  res = con.exec(sql)
  con.close
end

pcu = open("/tmp/pcu-51-utf8.csv").readlines

n = 0
pcu.each do |l|
  n += 1
  sleep(1) if (n % 1000 == 0)
  f = l.chomp.split(',')
  insert(f[0],f[1],f[2],f[3],f[4],f[5],f[6])
end

emp = open("/tmp/emp-51-utf8.csv").readlines
emp.each do |l|
  n += 1
  sleep(1) if (n % 1000 == 0)
  f = l.chomp.split(',')
  insert(f[0],f[1],f[2],f[3],f[4],f[5],f[6])
end
