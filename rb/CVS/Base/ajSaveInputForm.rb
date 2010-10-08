#!/usr/bin/ruby

require 'postgres'
require 'cgi'

c = CGI::new
id = c['per_id']
hcode = c['per_hcode']
cid = c['per_cid']
fn = c['per_fname']
ln = c['per_lname']
sex = c['per_sex']
cid = c['per_cid']
edu1 = c['per_edu_first']
edu2 = c['per_edu_top']
pos1 = c['per_pos_j18']
pos2 = c['per_pos_active']
login = c['per_login']
ptype = c['per_type']

if (ptype == '3')
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

con = PGconn.connect("localhost",5432,nil,nil,"manpower52","postgres")
sql = "UPDATE #{ptype} SET hcode='#{hcode}',cid='#{cid}',sex='#{sex}',"
sql += "fname='#{fn}',lname='#{ln}',edu_first='#{edu1}',edu_top='#{edu2}',"
sql += "pos_j18='#{pos1}',pos_active='#{pos2}',staff='#{login}',lastupdate='#{Time.now}' "
sql += "WHERE id='#{id}' "
res = con.exec(sql)
con.close

msg = res.pg_status
data = "#{success:true, 'msg':'#{msg}'}"

print <<EOF
Content-type: text/html

#{data}
EOF
