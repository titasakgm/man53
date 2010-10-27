#!/usr/bin/ruby

require 'postgres'
require 'cgi'
require 'man53_util.rb'

c = CGI::new
hcode = c['per_hcode']
piscode = c['per_piscode']
otype = c['per_otype']
cid = c['per_cid']
fn = c['per_fname']
ln = c['per_lname']
sex = c['per_sex']
edu1 = c['per_edu_first']
edu2 = c['per_edu_top']
pos1 = c['per_pos_j18']
pos2 = c['per_pos_active']
login = c['per_login']
ptype = c['per_type']

input_error = ''
# No validation o piscode for 2553
# Validate input data
#if (piscode.length != 5 || piscode !~  /\d\d\d\d\d/)
#  input_error = "#{input_error}o กรุณาระบุรหัสกอง จ. ให้ถูกต้อง<br>"
#end
if (cid.length != 13 || cid !~  /\d{13}/)
  input_error = "#{input_error}o กรุณาระบุเลขที่บัตรประชาชนให้ถูกต้อง<br>"
end
if (fn.length == 0)
  input_error = "#{input_error}o กรุณาระบุชื่อ<br>"
end
if (ln.length == 0)
  input_error = "#{input_error}o กรุณาระบุนามสกุล<br>"
end
if (sex == '0' || sex.nil?)
  input_error = "#{input_error}o กรุณาระบุเพศ<br>"
end
if (edu1.length != 5 || edu1 == '00000')
  input_error = "#{input_error}o กรุณาระบุวุฒิฯที่บรรจุ<br>"
end
if (edu2.length != 5 || edu2 == '00000')
  input_error = "#{input_error}o กรุณาระบุวุฒิฯสูงสุด<br>"
end
# No validation for j18 in 2553
#if (pos1.length != 5 || pos1 == '00000')
#  input_error = "#{input_error}o กรุณาระบุตำแหน่งตาม จ.18<br>"
#end
if (pos2.length != 5 || pos2 == '00000')
  input_error = "#{input_error}o กรุณาระบุตำแหน่งที่ปฏิบัติงานจริง<br>"
end

if (input_error.length > 0)
  data = "{ success:false, 'msg': '#{input_error}' }"
else
  if (ptype == '1')
    ptype = 'pis'
  elsif (ptype == '2')
    ptype = 'epn'
  elsif (ptype == '3')
    ptype = 'gmp'
  elsif (ptype == '4')
    ptype = 'emp'
  elsif (ptype == '5')
    ptype = 'pcupis'
  elsif (ptype == '6')
    ptype = 'pcuepn'
  elsif (ptype == '7')
    ptype = 'pcugmp'
  elsif (ptype == '8')
    ptype = 'pcuemp'
  end

  #updatePiscode(ptype, hcode, piscode)

  con = PGconn.connect("localhost",5432,nil,nil,"manpower53","postgres")
  sql = "INSERT INTO #{ptype} (hcode,piscode,otype,cid,sex,fname,lname,"
  sql += "edu_first,edu_top,pos_j18,pos_active,staff,lastupdate) "
  sql += "VALUES ('#{hcode}','#{piscode}','#{otype}','#{cid}','#{sex}','#{fn}','#{ln}',"
  sql += "'#{edu1}','#{edu2}','#{pos1}','#{pos2}','#{login}','#{Time.now}') "
  log("ajAddForm.rb-sql: #{sql}")
  res = con.exec(sql)
  con.close

  data = "{success:true, 'msg':'1 record added'}"
end

print <<EOF
Content-type: text/html

#{data}
EOF
