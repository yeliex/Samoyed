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

### API interfaces
---

####1. 列表请求接口 
**Address:**
> **api.mzapp.info/plist** 

**Description:**  ***获取所有item列表的接口***

**Request: **

参数 |  类型 | 必填 | 值 | 默认值	|	描述		|	示例
----|-------|-----|-----
district |  string  |	true	|	区域代码	|	0(选择全部)    |   城区选择    |    310051(滨江区)
size	|	int	|	true	|	面积范围编号	|	0(选择全部)    |   选择面积    |    1
price	|	int	|	true	|	价格范围编号	|	0(选择全部)    |   选择价格    |    1
page	|	int	|	true	|	页码			|	0(选择第一页)  |   选择显示页码,每页20     |    1(第一页)
protocol | string | true | 协议 | json | 数据协议 | json
city | int | true | 城市编码 | 0571(杭州) | 选择城市 | 0571

**Return:**

参数 | 类型 | 返回 | 值 | 描述 | 示例
--- | --- | --- 
status | string |	always |	success/failed | 请求是否成功 | status = 成功; failed = 失败
error_code	|	int	 |	status=failed	|	错误代码	|  错误代码  |  10241
error_info	|	string	|	status=failed	|	错误内容   | 错误信息   |   数据库连接失败
num	|	int	|	status=success	|	项目总数 / 0	|   项目总数量(非显示数量)   |   59 / 0(没有时)
overview	|	array	|	status=success && num!= 0	|	详细信息   |   当前页所有值的详细信息 | b1['ID']=310051001; b1['Name']='汇智地';

**overview参数:**

参数	| 类型 | 值	| 描述 | 示例
--- | --- | --- |
dog_id | int | ID |	建筑DI	|	310051001
dog_name	| string | 名字 |	建筑名字	| 汇智地
dog_area	| string | 商圈	|	建筑所在商圈	|	滨江商圈
dog_size | string | 面积 |	建筑面积范围(平方米)	|   300-800
dog_price | string | 价格	|	建筑最低价格(元/月/平方米) |   35
dog_pic	| url	|	连接	 |	标题图片	|	img.domain.com/dogID.img		 

**Notice:**

1. 区域编码 
2. 面积范围对应编号 
3. 价格范围对应编号 


---
####2. 搜索接口 
**Address:**
> **api.mzapp.info/list/search** 

**Description:**  ***根据关键字获取item列表的接口***

**Request:** 

参数 |  类型 | 必填 | 值 | 默认值	|	描述		|	示例
------------ | ------------- | ------------
keyword |  string  |	false	|	关键字	|    不搜索    |   搜索关键字    |    汇智地
district |  string  |	true	|	区域代码	|	0(选择全部)    |   城区选择    |    310051(滨江区)
size	|	int	|	true	|	面积范围编号	|	0(选择全部)    |   选择面积    |    1
price	|	int	|	true	|	价格范围编号	|	0(选择全部)    |   选择价格    |    1
page	|	int	|	true	|	页码			|	0(选择第一页)  |   选择显示页码,每页20     |    1(第一页)
protocol | string | true | 协议 | json | 数据协议 | json
city | int | true | 城市编码 | 0571(杭州) | 选择城市 | 0571

**Return:**

参数 | 类型 | 返回 | 值 | 描述 | 示例
--- | --- | --- 
status | string |	always |	success/failed | 请求是否成功 | status = 成功; failed = 失败
error_code	|	int	 |	status=failed	|	错误代码	|  错误代码  |  10241
error_info	|	string	|	status=failed	|	错误内容   | 错误信息   |   数据库连接失败
num	|	int	|	status=success	|	项目总数 / 0	|   项目总数量(非显示数量)   |   59 / 0(没有时)
overview	|	array	|	status=success && num!= 0	|	详细信息   |   当前页所有值的详细信息 | b1['ID']=310051001; b1['Name']='汇智地';

**Overview参数:**

参数	| 类型 | 值	| 描述 | 示例
--- | --- | --- |
dog_id | int | ID |	建筑DI	|	310051001
dog_name	| string | 名字 |	建筑名字	| 汇智地
dog_area	| string | 商圈	|	建筑所在商圈	|	滨江商圈
dog_aize | string | 面积 |	建筑面积范围(平方米)	|   300-800
dog_price | string | 价格	|	建筑最低价格(元/月/平方米) |   35
dog_pic	| url	|	连接	 |	标题图片	|	img.domain.com/dogID.img	

**Notice:**

1. keyword: 根据标题,区域,商圈,地址检索

---
####3. 详细内容获取
**Address:**
> **api.mzapp.info/item** 

**Description:**  ***根据ID获取item的详细信息***

**Request:** 

参数 |  类型 | 必填 | 值 | 默认值	|	描述		|	示例
------------ | ------------- | ------------
id	|	int	|	true	|	建筑ID	|	∕ |	当前页显示的建筑ID  | 310051
protocol | string | true | 协议 | json | 数据协议 | json

**Return:**

参数 | 类型 | 返回 | 值 | 描述 | 示例
--- | --- | --- 
status | string |	always |	success/failed | 请求是否成功 | success = 成功; false = 失败
error_code	|	int	 |	status=failed	|	错误代码	|  错误代码  |  10241
error_info	|	string	|	status=failed	|	错误内容   | 错误信息   |   ID不存在
num	|	int	|	status=success	|	建筑数	|   当前页的建筑数   |   1 / 0 (不存在时)
overview	|	array	|	status=success && num!= 0	|	详细信息   |   当前建筑的详细信息 | b1['dog_id']=310051001; b1['dog_name']='汇智地';



**overview参数:**

参数	| 类型 | 返回 | 值	| 描述 | 示例
--- | --- | --- |
dog_id | int | status=success |ID |	建筑DI	|	310051001
dog_name	| string | status=success	| 名字 | 	建筑名字 | 汇智地
dog_area	| string | status=success	| 商圈	|	建筑所在商圈 | 滨江商圈
dog_district	| string | status=success	| 区	|	建筑所在区邮编 | 310051
dog_add	| string | status=success	| 地址	|	建筑地址 | 南环路
dog_pos	| array | status=success	| 坐标	|	建筑坐标(经纬度) | 111|111
dog_size | string | status=success	| 面积 | 建筑面积范围(平方米)| 300-800
dog_price | string | status=success | 价格	| 建筑最低价格(元/月/平方米) |  35
dog_desc | string | status=success | 描述	| 建筑详细描述 |  ...
dog_pic | array | status=success | 链接 | 大图图片 | http://domain.com/img.jpg
pic_num	| imt	| status=success | 数量 |	图片数量 | 5
units_num | int | status=success | 数量 | 所有房型的数量 | 5

---
####4. 户型详细内容获取
**Address:**
> **api.mzapp.info/item/units** 

**Description:**  ***根据ID获取units的详细信息***

**Request:** 

参数 |  类型 | 必填 | 值 | 默认值	|	描述		|	示例
------------ | ------------- | ------------
id	|	int	|	true	|	建筑ID	|	∕ |	当前页显示的建筑ID  | 310051
protocol | string | true | 协议 | json | 数据协议 | json

**Return:**

参数 | 类型 | 返回 | 值 | 描述 | 示例
--- | --- | --- 
status | string |	always |	success/failed | 请求是否成功 | success = 成功; false = 失败
error_code	|	int	 |	status=failed	|	错误代码	|  错误代码  |  10241
error_info	|	string	|	status=failed	|	错误内容   | 错误信息   |   ID不存在
num	|	int	|	status=success	|	户型数	|   当前建筑的户型数   |   5 (不会为0)
overview	|	array	|	status=success && num!= 0	|	详细信息   |   当前建筑所有户型的详细信息 | b1['unit_id']=310051001; b1['Name']='汇智地';



**overview参数:**

参数	| 类型 | 值	| 描述 | 示例
--- | --- | --- |
unit_id | int | ID |	户型DI	|	310051001001
unit_name | string | 名字 |	户型名字	| 户型1
unit_size | string | 面积 | 户型面积(平方米) | 200
unit_price | string | 价格 | 户型价格(元/月/平方米) | 35 
unit_deco | string | 装修 | 装修类型 | 精装修 
unit_pic | URL | 链接 | 户型图片 | img.domain.com/unit1.img

---
####4. 建筑展示图片获取
**Address:**
> **api.mzapp.info/item/images** 

**Description:**  ***根据ID获取units的详细信息***

**Request:** 

参数 |  类型 | 必填 | 值 | 默认值	|	描述		|	示例
------------ | ------------- | ------------
id	|	int	|	true	|	建筑ID	|	∕ |	当前页显示的建筑ID  | 310051
protocol | string | true | 协议 | json | 数据协议 | json

**Return:**

参数 | 类型 | 返回 | 值 | 描述 | 示例
--- | --- | --- 
status | string |	always |	success/failed | 请求是否成功 | success = 成功; false = 失败
error_code	|	int	 |	status=failed	|	错误代码	|  错误代码  |  10241
error_info	|	string	|	status=failed	|	错误内容   | 错误信息   |   ID不存在
num	|	int	|	status=success	|	户型数	|   当前建筑的户型数   |   5 (不会为0)
overview	|	array	|	status=success && num!= 0	|	详细信息   |   当前建筑所有图片的详细信息 | i1['image_id']=310051001; i1['image_url']='http://domain.com/image1.jpg';



**overview参数:**

参数	| 类型 | 值	| 描述 | 示例
--- | --- | --- |
image_id | int | ID |	图片DI	|	310051001001
image_name | string | 名字 |	图片名字	|	图片1
image_url | URL | 链接 | 图片连接 | img.domain.com/image1.img

