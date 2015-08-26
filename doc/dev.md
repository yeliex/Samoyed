# Project-Samoyed Docs

![Project icon](http://25.io/mou/Mou_128.png "Samoyed")

## Development Document

Development document of project-**Samoyed**


### Document Update 
---
Version | Date | Update
--------|------|-------
 V 1.0  | 2015-07-23 | 第一代版本文档
 V 1.5  | 2015-08-07 | 修改数据库名 type_items为unit_items
 V 1.9  | 2015-08-10 | 修改building_product字段:  building_unit_num,building_pic_num
 V 2.0  | 2015-08-10 | 修改数据库: building_img


### Technology Stack
---
#### Database
1. Mysql

#### Web-Server
1. Langiage: PHP

#### Web-Client
1. Language: HTML, HTML5, CSS, CSS3, Javascript
2. Front-End Framework: Semantic-UI
3. Javascrpti Framework: jQuery

#### Web-Background
1. Language: HTML, CSS, Javascript, PHP
2. Front-End Framework: Semantic-UI, Amazi-UI
3. Javascript Framework: jQuery


### Database Structure
---
#### Database
---
##### mizhi_app

Tables | Fields | Intro | Content
--- | ---
admin_users | 8 | 后台管理员数据库 | 有后台使用权限的员工数据
building_product | 17 | 建筑信息数据库 | 所有当前有效的建筑信息
type_items | 6 | 户型数据库 | 所有当前有效建筑的户型信息
building_img | 4 | 图片数据库 | 所有建筑的图片
users_info | 5 | 用户信息 | 预约过的用户信息
user_appointment | 4 | 预约信息 | 用户预约信息

#### Tables
---
##### admin_users

Fields | Type | Collection | Property | Default |Empty | Primary | Unique
--- | ---
uid | int(1) | | | | | true | |
username | varchar(15) | utf8_general_ci
usergroup | varchar(3) |utf8_general_ci
password | varchar(255) | utf8_general_ci
usermail | varchar(255) | utf8_general_ci
salt | varchar(6) | utf8_general_ci
lastip | varchar(15
) | utf8_general_ci	
lastpos | varchar(255) | utf8_general_ci

##### building_product
Fields | Type | Collection | Property | Default |Empty | Primary | Unique
--- | ---
building_id | int(9) | |UNSIGNED |
building_name | varchar(100) | utf8_general_ci	
building_type | varchar(100) | utf8_general_ci	
building_decoration | varchar(100) | utf8_general_ci
building_district | varchar(100) | utf8_general_ci
building_area | varchar(100) | utf8_general_ci	
building_address | varchar(100) | utf8_general_ci
building_pos | varchar(100) | utf8_general_ci	
building_metro | varchar(100) | utf8_general_ci
building_unit_num | int(2)	
building_price | varchar(100) | utf8_general_ci
building_cate_price | int(1)
building_size | varchar(100) | utf8_general_ci	
building_cate_size | int(1)	
building_pic_num | int(2)
building_pic | longtext | utf8_general_ci
building_description | longtext	 | utf8_general_ci

##### unit_items
Fields | Type | Collection | Property | Default |Empty | Primary | Unique
--- | ---
type_id | bigint(12)		
building_id | int(9)
type_name | varchar(100) | utf8_general_ci		
type_price | varchar(10) | utf8_general_ci	
type_size | varchar(100) | utf8_general_ci	
type_pic | longtext | utf8_general_ci

##### building_img
Fields | Type | Collection | Property | Default |Empty | Primary | Unique
--- | ---
img_id | bigint(12) | | UNSIGNED | AUTO_INCREMENT
building_name | varchar(100) | utf8_general_ci	
img_avaliable | tinyint(1) (Boolen)
building_id | int(9) | | UNSIGNED
img_uri | longtext | utf8_general_ci

##### users_info
Fields | Type | Collection | Property | Default |Empty | Primary | Unique
--- | ---
user_id | int(5) | | |AUTO_INCREMENT	
user_name | varchar(10) | latin1_swedish_ci
user_phone | char(11) | latin1_swedish_ci
user_email | varchar(255) | latin1_swedish_ci
user_male | varchar(2) | latin1_swedish_ci

##### user_appointment
Fields | Type | Collection | Property | Default |Empty | Primary | Unique
--- | ---
user_id | char(5) | latin1_swedish_ci
appoint_status | tinyint(1) (Boolen)
appoint_date | date	
appoint_time | varchar(2) | latin1_swedish_ci	