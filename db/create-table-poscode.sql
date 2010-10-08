create table poscode (
  id serial,
  pos_type varchar,
  pos_code char(5),
  pos_name varchar,
  pos_group varchar
);
grant all on poscode to public;
