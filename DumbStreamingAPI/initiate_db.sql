-- create and use database
create database if not exists dumb_streaming;
use dumb_streaming;


-- create categories table
create table if not exists categories (
    id int not null auto_increment primary key,
    name varchar(255) not null
)
engine=innodb;


-- create videos table
create table if not exists videos (
    id int not null auto_increment primary key,
    title varchar(255) not null,
    category_id int,
    attache varchar(255),
    thumbnail varchar(255),
    foreign key (category_id)
        REFERENCES categories(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
)
engine=innodb;


-- insert values into both table according to example in the document
insert into categories (name) values('comedy'), ('otomotif'), ('music'), ('kpop');
insert into videos (title, category_id, attache, thumbnail) 
values
('Larva Season 2 Episode 39~ 52', 1, 'admin', 'https://www.youtube.com/embed/uTlm58giv0o'), 
('20 minutes de Grizzy & les Lemmings // Compilation #25 - Grizzy & les Lemmings', 1, 'admin', 'https://www.youtube.com/embed/_I5Cpk3SXIg'), 
('Ketika Mesin Mobil Bekas Di Modif Oleh Para Master Otomotif Lihat Yang Terjadi.', 2, 'admin', 'https://www.youtube.com/embed/oJ83sU03QsY'), 
("Dua Lipa - Dont Start Now (Official Music Video)", 3, 'admin', 'https://www.youtube.com/embed/oygrmJFKYZY'), 
("[IU] eight Acoustic Ver. Live Clip", 4, 'admin', 'https://www.youtube.com/embed/tJM0yIbg8iQ'),
("blackpink lisa speaking english", 4, 'admin', 'https://www.youtube.com/embed/c-9OLvyZ1uc')
;


-- query all videos with their category
select
    videos.id, videos.title, videos.attache, videos.thumbnail,
    categories.id as category_id, categories.name as category_name
from videos
left outer join categories
    on videos.category_id = categories.id
;


-- query all videos which have specific category
select
    videos.id, videos.title, videos.attache, videos.thumbnail,
    categories.id as category_id, categories.name as category_name
from videos
left outer join categories
    on videos.category_id = categories.id
where categories.name = 'music'
;


-- query all videos which associated with category
select
    videos.id, videos.title, videos.attache, videos.thumbnail,
    categories.id as category_id, categories.name as category_name
from videos
inner join categories
    on videos.category_id = categories.id
;