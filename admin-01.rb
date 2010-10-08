#!/usr/bin/ruby

require 'cgi'
require 'postgres'

c = CGI::new

print <<EOF
Content-type: text/html

<html>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<head>
<title>Project Manpower 2553</title>
<link rel="shortcut icon" href="http://203.157.240.9/man53/favicon.ico" />
<link rel="stylesheet" type="text/css" href="/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="css/man53.css" />
<link rel="stylesheet" type="text/css" href="/ext/examples/ux/css/RowEditor.css" />
<link rel="stylesheet" type="text/css" href="css/Ext.ux.grid.ProgressColumn.css" />
<link rel="stylesheet" type="text/css" href="css/grid-progress.css" />
<style>
.x-item-disabled {
  filter: none;
}
</style>
<script src="http://extjs.cachefly.net/ext-3.0.0/adapter/ext/ext-base.js"></script>
<script src="http://extjs.cachefly.net/ext-3.0.0/ext-all.js"></script>
<script src="js/Ext.ux.OnDemandLoad.js" type="text/javascript"></script>
<script type="text/javascript">
  var sessid = 'sessid';
</script>
<script type="text/javascript" src="/ext/examples/ux/RowEditor.js"></script>
<script type="text/javascript" src="js/Ext.ux.grid.ProgressColumn.js"></script>
<script type="text/javascript" src="js/ext3-admin-menu.js"></script>
</head>
<body>
</body>
</html>
EOF
