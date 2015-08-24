# Project-Samoyed Docs

![Project icon](http://25.io/mou/Mou_128.png "Samoyed")

## Api Document

Api document of project-**Samoyed**

### API interfaces
---

####1. 列表请求接口 
**Address:**
> **api.mizhi.pub/plist** 

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
> **api.mizhi.pub/list/search** 

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
> **api.mizhi.pub/item** 

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
dogID | int | status=success |ID |	建筑DI	|	310051001
dogName	| string | status=success	| 名字 | 	建筑名字 | 汇智地
dogArea	| string | status=success	| 商圈	|	建筑所在商圈 | 滨江商圈
dogSize | string | status=success	| 面积 | 建筑面积范围(平方米)| 300-800
dogPrice | string | status=success | 价格	| 建筑最低价格(元/月/平方米) |  35
picNum	| imt	| status=success | 数量 |	图片数量 | 5
dogPics | array | status=success | 链接数组 | 所有图片 | img[1]=img1.img; img[2]=img2.img
unitsNum | int | status=success | 数量 | 所有房型的数量 | 5
units | array | status=success | 房型信息数组 | 所有房型信息 | unit['name]='户型1', unit['id]='...'

**units参数:**

参数	| 类型 | 值	| 描述 | 示例
--- | --- | --- |
unitID | int | ID |	户型DI	|	310051001001
unitName | string | 名字 |	户型名字	| 户型1
unitSize | string | 面积 | 户型面积(平方米) | 200
unitPrice | string | 价格 | 户型价格(元/月/平方米) | 35 
unitPic | URL | 链接 | 户型图片 | img.domain.com/unit1.img

