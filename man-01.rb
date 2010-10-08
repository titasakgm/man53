#!/usr/bin/ruby

require 'cgi'
require 'iconv'
require 'postgres'

c = CGI::new
hcode = c['hcode']
office = c['office']
login = c['login']
lock = c['lock']
hc_flag = c['hc_flag']

print <<EOF
Content-type: text/html

<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>Project Manpower 2553</title>
<link rel="shortcut icon" href="http://203.157.240.9/man53/favicon.ico" />
<link rel="stylesheet" type="text/css" href="/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="css/man53.css" />
<style>
.x-item-disabled {
  filter: none;
}
</style>
<script src="http://extjs.cachefly.net/ext-3.0.0/adapter/ext/ext-base.js"></script>
<script src="http://extjs.cachefly.net/ext-3.0.0/ext-all.js"></script>
<script type="text/javascript">
  var office = '#{office}';
  var hcode = '#{hcode}';
  var login = '#{login}';
  var lock = '#{lock}';
  var hc_flag = '#{hc_flag}';
</script>
<script type="text/javascript" src="js/ext3-02.js"></script>
</head>
<body>
<div id='div_progress'></div>
</body>
</html>
EOF
