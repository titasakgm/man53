#!/usr/bin/ruby

require 'postgres'

def insert(type,code,name,group)
  con = PGconn.connect("localhost",5432,nil,nil,"manpower52","postgres")
  sql = "INSERT INTO poscode (pos_type,pos_code,pos_name,pos_group) "
  sql += "VALUES ('#{type}','#{code}','#{name}','#{group}') "
  res = con.exec(sql)
  con.close
end

cemp = open("pos-emp.utf8").readlines
cemp.each do |l|
  f = l.chomp.split(',')
  insert('emp',f[0],f[1],f[2])
end

cgmp = open("pos-gmp.utf8").readlines
cgmp.each do |l|
  f = l.chomp.split(',')
  insert('gmp',f[0],f[1],f[2])
end

cpcu_emp = open("pos-pcuemp.utf8").readlines
cpcu_emp.each do |l|
  f = l.chomp.split(',')
  insert('pcuemp',f[0],f[1],f[2])
end

cpcu_epn = open("pos-pcuepn.utf8").readlines
cpcu_epn.each do |l|
  f = l.chomp.split(',')
  insert('pcuepn',f[0],f[1],f[2])
end

cpcu_gmp = open("pos-pcugmp.utf8").readlines
cpcu_gmp.each do |l|
  f = l.chomp.split(',')
  insert('pcugmp',f[0],f[1],f[2])
end

cpcu_pis = open("pos-pcupis.utf8").readlines
cpcu_pis.each do |l|
  f = l.chomp.split(',')
  insert('pcupis',f[0],f[1],f[2])
end
