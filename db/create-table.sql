create table pcupis (
  id serial,
  hcode char(5),
  piscode varchar,
  otype char(2),
  cid varchar,
  sex char(1),
  fname varchar,
  lname varchar,
  edu_first varchar,
  edu_top varchar,
  pos_j18 varchar,
  pos_active varchar,
  staff varchar,
  lastupdate timestamp
);
grant all on pcupis to public;

create table pcugmp (
  id serial,
  hcode char(5),
  piscode varchar,
  otype char(2),
  cid varchar,
  sex char(1),
  fname varchar,
  lname varchar,
  edu_first varchar,
  edu_top varchar,
  pos_j18 varchar,
  pos_active varchar,
  staff varchar,
  lastupdate timestamp
);
grant all on pcugmp to public;

create table pcuepn (
  id serial,
  hcode char(5),
  piscode varchar,
  otype char(2),
  cid varchar,
  sex char(1),
  fname varchar,
  lname varchar,
  edu_first varchar,
  edu_top varchar,
  pos_j18 varchar,
  pos_active varchar,
  staff varchar,
  lastupdate timestamp
);
grant all on pcuepn to public;

create table pcuemp (
  id serial,
  hcode char(5),
  piscode varchar,
  otype char(2),
  cid varchar,
  sex char(1),
  fname varchar,
  lname varchar,
  edu_first varchar,
  edu_top varchar,
  pos_j18 varchar,
  pos_active varchar,
  staff varchar,
  lastupdate timestamp
);
grant all on pcuemp to public;

create table pis (
  id serial,
  hcode char(5),
  piscode varchar,
  otype char(2),
  cid varchar,
  sex char(1),
  fname varchar,
  lname varchar,
  edu_first varchar,
  edu_top varchar,
  pos_j18 varchar,
  pos_active varchar,
  staff varchar,
  lastupdate timestamp
);
grant all on pis to public;

create table gmp (
  id serial,
  hcode char(5),
  piscode varchar,
  otype char(2),
  cid varchar,
  sex char(1),
  fname varchar,
  lname varchar,
  edu_first varchar,
  edu_top varchar,
  pos_j18 varchar,
  pos_active varchar,
  staff varchar,
  lastupdate timestamp
);
grant all on gmp to public;

create table epn (
  id serial,
  hcode char(5),
  piscode varchar,
  otype char(2),
  cid varchar,
  sex char(1),
  fname varchar,
  lname varchar,
  edu_first varchar,
  edu_top varchar,
  pos_j18 varchar,
  pos_active varchar,
  staff varchar,
  lastupdate timestamp
);
grant all on epn to public;

create table emp (
  id serial,
  hcode char(5),
  piscode varchar,
  otype char(2),
  cid varchar,
  sex char(1),
  fname varchar,
  lname varchar,
  edu_first varchar,
  edu_top varchar,
  pos_j18 varchar,
  pos_active varchar,
  staff varchar,
  lastupdate timestamp
);
grant all on emp to public;
