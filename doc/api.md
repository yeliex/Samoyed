# Project-Samoyed Docs

![Project icon](http://25.io/mou/Mou_128.png "Samoyed")

## API Document

Api document of project-**Samoyed**

### Document Update 
---
Version | Date | Update
--------|------|-------
 V 1.0  | 2015-07-1  | 第一代版本文档 
 V 1.1  | 2015-07-20 | 更新了请求接口: 新增全局参数(协议),列表参数(城市编码)
 V 2.0  | 2015-07-23 | 项目文档更新
 V 2.1  | 2015-07-25 | 启用新的API域名
 V 2.5  | 2015-08-1 | 更新了item接口中的价格/面积/图片获取(直接获取具体数值)
 V 3.0  | 2015-08-7 | 新增units接口获取户型,更新了所有接口的返回数据(下划线连接)
 V 3.1  | 2015-08-10 | item接口更新: 新增返回参数: dog_add(返回地址),dog_desc(返回详细介绍)
 V 4.0  | 2015-08-10 | 新增item/images接口获取建筑图片，修改units接口为item/units

### 通用接口
---
#### 相关约定
* 接口地址:
	* 服务接口为api.mzapp.info
	* 开发测试接口为 api.dev.mzapp.info
* 接口格式: domain.com/class/function/argument?parameters
	* domain.com: 相关接口域名,必填
	* class: 相关接口类,对应modules文件夹下的class.module.php文件,必填
	* function: 调用的方法,必填
	* argument: 附加的方法参数,在调用方法时传递给function,选填
	* parameters: 请求时附加的GET参数,无论POST还是GET都应附加protocol参数.必填
* 请求方式: 
	* GET
	* POST
* 附加约定:
	* 无论是POST还是GET请求都应该以GET方式传递一个protocol参数,默认为json.用以获取json格式的返回值.
	* 接口中的class与function应注意保留值以避免冲突(如list使用plist代替)
	* 为了避免格式冲突,请求的参数都应该使用string字符串类型
* 返回值约定
	* 根据请求参数中的protocol返回不同的内容
	* json类型: 返回json格式的字符串
		* php中使用send_json()发送固定格式的返回值,可以有三个参数.
			* error_code: 预定义的错误代码,成功为0返回success
			* data: json格式的数组,代表返回值,可以为空
			* num: data中的数据条数,可以为空	
		* 返回值具有五个参数.考虑到解析问题,每个参数必须带上
			* status: 请求状态.一般代表操作是否成功,如果操作成功没有结果也会返回success
			* error_code: 预定义的错误代码,成功则为0
			* error_info: 预定义的错误信息,成功则为空
			* num: 返回的数据条数,某些情况可能为0
			* overview: 返回的json格式的数据组.为符合全局接口规范,日后应修改为data

---
####1. 列表请求接口类
**Address:**
> **/plist** 

**Description:**  ***获取符合条件的item列表的接口***

**Request: **

参数 | 必填 | 值 | 默认值	|	描述		|	示例
-----|-----|-----
city | true | 城市编码 | 0571(杭州) | 选择城市 | 0571
district | true	| 区域代码	|	0(选择全部)    |   城区选择    |    310051(滨江区)
size	| true	|	面积区间编号	|	0(选择全部)    |   选择面积    |    1
price	| true	|	价格区间编号	|	0(选择全部)    |   选择价格    |    1
page	| false	|	页码			|	0(选择第一页)  |   选择显示页码,预留参数 | 1(第一页)
target | false | 搜索行为(list/search) | list | 表示是显示列表/搜索,不填/keyword为空时则默认list | list
keyword | false | 搜索关键字 | / | 搜索关键字,仅当target=search时有效 | keyword


**Return:**

参数 | 值 | 描述 | 示例
--- | --- 
overview	| 详细信息   |   当前页所有值的详细信息 | b1['ID']=310051001; b1['Name']='汇智地';

**overview参数:**

参数	| 值	| 描述 | 示例
--- | --- |
dog_id | ID |	建筑DI	|	310051001
dog_name	| 名字 |	建筑名字	| 汇智地
dog_area	|  商圈	|	建筑所在商圈	|	滨江商圈
dog_size | 面积 |	建筑面积范围(平方米)	|   300-800
dog_price | 价格	|	建筑最低价格(元/月/平方米) |   35
dog_pic	| 连接	 |	标题图片	|	img.domain.com/dogID.img		 

**Notice:**

1. 区域编码 
2. 面积区间对应编号 
3. 价格区间对应编号 

---
####2. 详细内容获取类
**Class**
> ** /item **

---
#####1.  获取item详细信息
**Path:**
> **/** 

**Description:**  ***根据ID获取item的详细信息***

**Request:**   ***GET***

参数 | 值 | 默认值	|	描述		|	示例
------------ | ------------- | ------------
id	|	建筑ID	|	∕ |	当前页显示的建筑ID  | 310051

**Return:**

参数 | 值 | 描述 | 示例
--- | --- | --- 
overview	|	详细信息   |   当前建筑的详细信息 | b1['dog_id']=310051001; b1['dog_name']='汇智地';



**overview参数:**

参数	| 值	| 描述 | 示例
--- | --- | --- |
dog_id | ID |	建筑DI	|	310051001
dog_name	| 名字 | 	建筑名字 | 汇智地
dog_area	| 商圈	|	建筑所在商圈 | 滨江商圈
dog_district | 区	|	建筑所在区邮编 | 310051
dog_add	| 地址	|	建筑地址 | 南环路
dog_pos	| 坐标	|	建筑坐标(经纬度) | 111|111
dog_size | 面积 | 建筑面积范围(平方米)| 300-800
dog_price | 价格	| 建筑最低价格(元/月/平方米) |  35
dog_desc | 描述	| 建筑详细描述 |  ...
dog_pic | 链接 | 大图图片 | http://domain.com/img.jpg
pic_num	| 数量 |	图片数量 | 5
units_num | 数量 | 所有房型的数量 | 5

---
#####2. 获取item详细信息
**Path:**
> **/item/units** 

**Description:**  ***根据ID获取units的详细信息***

**Request:**   ***GET***

参数 |  值 | 默认值	|	描述		|	示例
------------ | ------------- | ------------
id	|	建筑ID	|	∕ |	当前页显示的建筑ID  | 310051

**Return:**

参数 | 值 | 描述 | 示例
--- | --- | --- 
overview	|	详细信息   |   当前建筑所有户型的详细信息 | b1['unit_id']=310051001; b1['Name']='汇智地';



**overview参数:**

参数	| 值	| 描述 | 示例
--- | --- | --- |
unit_id | ID |	户型DI	|	310051001001
unit_name | 名字 |	户型名字	| 户型1
unit_size | 面积 | 户型面积(平方米) | 200
unit_price | 价格 | 户型价格(元/月/平方米) | 35 
unit_deco | 装修 | 装修类型 | 精装修 
unit_pic | 链接 | 户型图片 | img.domain.com/unit1.img

---
#####3. 获取item图片信息
**Path:**
> **/item/images** 

**Description:**  ***根据ID获取Item的图片信息***

**Request:**   ***GET***

参数 |  值 | 默认值	|	描述		|	示例
------------ | ------------- | ------------
id	| 建筑ID	|	∕ |	当前页显示的建筑ID  | 310051

**Return:**

参数 |值 | 描述 | 示例
--- | --- | --- 
overview	| 详细信息   |   当前建筑所有图片的详细信息 | i1['image_id']=310051001; i1['image_url']='http://domain.com/image1.jpg';

**overview参数:**

参数	| 值	| 描述 | 示例
--- | --- | --- |
image_id | ID |	图片DI	|	310051001001
image_name | 名字 |	图片名字	|	图片1
image_url | 链接 | 图片连接 | img.domain.com/image1.img

---
#####4. 获取item所有图片信息
**Path:**
> **/item/allImages** 

**Description:**  ***根据ID获取Item的所有图片信息(包括不可用图片)***

**Request:**  ***GET***

参数 |  值 | 默认值	|	描述		|	示例
------------ | ------------- | ------------
id	| 建筑ID	|	∕ |	当前页显示的建筑ID  | 310051

**Return:**

参数 |值 | 描述 | 示例
--- | --- | --- 
overview	| 详细信息   |   当前建筑所有图片的详细信息 | i1['image_id']=310051001; i1['image_url']='http://domain.com/image1.jpg';

**overview参数:**

参数	| 值	| 描述 | 示例
--- | --- | --- |
image_id | ID |	图片DI	|	310051001001
image_name | 名字 |	图片名字	|	图片1
image_url | 链接 | 图片连接 | img.domain.com/image1.img
image_avaliable | 是否可用 | 图片是否可用| true/false

---
####3. 预约用户相关类
**Class**
> ** /appointuser **

---
#####1.  判断用户是否存在
**Path:**
> **/userExisted** 

**Description:**  ***根据手机号判断用户是否已存在***

**Request:**   ***GET***

参数 | 值 | 默认值	|	描述		|	示例
------------ | ------------- | ------------
phone	|	手机号	|	∕ |	用户手机号  | 13111111111

**overview参数:**

参数	| 值	| 描述 | 示例
--- | --- | --- |
status | error/success | 当前号码用户数是否为1 | error/success
uid | 用户ID | 当前号码用户ID | 1

---
#####2.  用户登录
**Path:**
> **/userLogin** 

**Description:**  ***判断用户是否存在,存在则写入session登录,不存在返回错误***

**Request:**   ***POST***

参数 | 值 | 默认值	|	描述		|	示例
------------ | ------------- | ------------
uid	|	用户ID	|	∕ |	用户在数据库中的唯一标示符  | 1

**Return:**

参数	| 值	| 描述 | 示例
--- | --- | --- |
status | error/success | 登录是否成功 | error/success

---
#####3.  用户注销
**Path:**
> **/userLogout** 

**Description:**  ***直接删除session用户登录信息以注销***

**Request:**   ***GET***

	* 无需参数

**overview参数:**

	* 只会返回success
	
---
#####4.  用户信息
**Path:**
> **/userLogin** 

**Description:**  ***工具用户ID返回用户信息***

**Request:**   ***GET***

参数 | 值 | 默认值	|	描述		|	示例
------------ | ------------- | ------------
uid	|	用户ID	|	∕ |	用户在数据库中的唯一标示符  | 1

**Overview参数:**

参数	|描述 | 示例
--- | --- | --- |
user_id | 用户ID | 1
user_name | 用户名称 | user
user_phone | 用户手机号 | 13111111111
user_title | 用户称呼 | 先生/女士 
contacts_email | 用户email地址 | mail@domain.com
contacts_phone | 备用联系方式 | 0571-8717171
team_type | 团队类型 | 团队/个人
team_info | 团队信息 | 10人以下
extract_district | 所在区 | 滨江区
extract_address | 默认接送地址 | 南环路
selection_ads | 是否允许后续邮件广告 | true/false

---
#####5.  保存用户(新用户信息保存)
**Path:**
> **/userSave** 

**Description:**  ***保存新用户的信息***

**Request:**   ***POST***

参数 |  描述		|	示例
------------ | ------------- | ------------
phone	| 用户在数据库中的唯一标示符  | 1
personal['name'] | 用户名字 | user
personal['title'] | 用户称呼 | 先生/女士
contacts['email'] | 用户电子邮件地址 | mail@domain.com
contacts['phone'] | 用户备用联系号码 | 0571-87111111
team['team'] | 团队类型 | 个人/团队
team['info'] | 团队信息 | 10人以下
extract['district'] | 用户所在区 | 滨江区
extract['address'] | 默认接送地址 | 南环路
selection['ads'] | 允许广告 | true/false
reg_date | 注册日期 | 20151005

**Overview参数:**

参数	|描述 | 示例
--- | --- | --- |
status | 注册是否成功| success/failed

---
#####6.  注册回滚
**Path:**
> **/registerFailed** 

**Description:**  ***注册失败以后的回滚操作***

**Request:**   ***POST***

参数 |  描述		|	示例
------------ | ------------- | ------------
id | 要回滚的用户ID | 1

**Overview参数:**
	
	* 只返回success
	
---
####4. 预约操作相关类
**Class**
> ** /appointment **

---
####1. 用户登录查询
**Path:**
> **/logined** 

**Description:**  ***查询用户是否已登录***

**Request:**   ***GET***

**Return**
	
	*只会返回success
	
**Overview参数**
参数 |  描述		|	示例
------------ | ------------- | ------------
user_status | 是否已登录 | success/failed
user_id | 用户ID | 1

---
####2. 验证短信发送
**Path:**
> **/sendVarify** 

**Description:**  ***向用户发送验证短信***

**Request:**   ***POST***
参数 |  描述		|	示例
------------ | ------------- | ------------
phone | 需要发送验证码的目标手机号 | 13111111111

**Return**
参数 |  描述		|	示例
------------ | ------------- | ------------
status | 是否允许发送(手机号长度不为11返回failed) | success/failed  
	
**Overview参数**
参数 |  描述		|	示例
------------ | ------------- | ------------
respCode | 发送结果代码 | 000000
varifyCode | 发送的验证码 | 123456

####3. 预约保存接口
**Path:**
> **/saveAppointment** 

**Description:**  ***保存用户提交的预约信息***

**Request:**   ***POST***
参数 |  描述		|	示例
------------ | ------------- | ------------
uid | 用户ID | 1
bid | 建筑ID | 310051001
time['date'] | 预约日期 | 20151005
time['time'] | 预约时间 | 上午/下午/晚上
uaddress | 接送地址 | 滨江区汇智地
ucontacts['uphone'] | 备用联系方式 | 0571-87101110
	
**OverView**
参数 |  描述		|	示例
------------ | ------------- | ------------
id | 预约ID编号 | 20151005001

	* 无论预约成功与否都会返回id
	
---
#####4.  预约回滚
**Path:**
> **/appointmentFailed** 

**Description:**  ***预约保存失败以后的回滚操作***

**Request:**   ***GET***

参数 |  描述		|	示例
------------ | ------------- | ------------
id | 要回滚的预约ID | 1

**Overview参数:**
	
	* 只返回success

---
#####5. 判断预约是否已存在
**Path:**
> **/alreadyAppointed** 

**Description:**  ***判断预约是否已存在***

**Request:**   ***POST***
参数 |  描述		|	示例
------------ | ------------- | ------------
uid | 用户ID | 1
bid | 建筑ID | 310051001
	
**OverView**
参数 |  描述		|	示例
------------ | ------------- | ------------
apointed | 预约是否已存在 | yes/no

---
#####5. 发送预约成功提醒邮件
**Path:**
> **/simpleAppointment** 

**Description:**  ***发送预约成功提醒邮件***

**Request:**   ***POST***
参数 |  描述		|	示例
------------ | ------------- | ------------
mail | 邮件地址 | mail@domain.com
type | 团队类型 | 个人/团队
user | 用户名+成为 | user 显示
phone | 手机号 | 13111111111
info | 额外信息 | 地址etc
	
**OverView**

	* 直接返回邮件发送方返回结果
	
	
