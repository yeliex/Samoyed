<?php

/**
 * Created by PhpStorm.
 * User: yeliex
 * Date: 15/8/19
 * Time: 下午2:51
 */
class Billmanager extends BillManagerAction
{

    public  function  __construct(){
        parent::__construct();
    }

    public function billList(){
        $district = $_GET['district'];

        $sql = "SELECT building_product.building_id AS dog_id,
                       building_product.building_name AS dog_name,
                       building_product.building_area AS dog_area,
                       building_product.building_district AS dog_district,
                       building_product.building_address AS dog_add,
                       building_product.building_metro AS dog_metro,
                       building_product.building_pos AS dog_pos,
                       building_product.building_size AS dog_size,
                       building_product.building_price AS dog_price,
                       building_product.building_pic AS dog_pic,
                       building_product.building_description AS dog_description,
                       building_product.building_units_num AS units_num,
                       building_product.building_pic_num AS images_num
                  FROM mizhi_app.building_product
                      ";
        // 因为是字符串链接，所以需要注意最后面的空格
        // 不然会导致 SQL 语句解析错误
        if($district !="0" && $district!=""){
            $sql .= "WHERE building_product.building_district = :district ";
        }

        $statement = $this->db->prepare($sql);

        if($district !="0"){
            $statement->bindParam(':district',$district);
        }

        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);

        $data = array();
        $data[num] = count($results);
        $data[data] = $results;
        send_json(0,json_encode($data));
    }

    public  function getImage(){
        $id = $_GET['id'];
        if(strlen($id) == 9){
            // 查询主图
            $sql = "SELECT building_product.building_pic AS url
                    FROM mizhi_app.building_product
                    WHERE building_product.building_id = :id";
        }
        else if(strlen($id) == 12) {
            // 查询户型
            $sql = "SELECT unit_items.unit_pic AS url
                    FROM mizhi_app.unit_items
                    WHERE unit_items.unit_id = :id";
        }

        $statement = $this->db->prepare($sql);
        $statement->bindParam(':id',$id);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC); //只需要返回1条数据
        if($result[url] != ""){
            $result[id] = $id;
            send_json(0,json_encode($result));
        }
        else { // 没有结果
            send_json(3301);
        }

    }

    public function getUnits(){
        $id = $_GET['id'];
        $statement = $this->db->prepare("SELECT unit_items.unit_id AS unit_id,
                                            unit_items.unit_name AS unit_name,
                                            unit_items.unit_size AS unit_size,
                                            unit_items.unit_price AS unit_price,
                                            unit_items.unit_pic AS unit_pic,
                                            unit_items.unit_decoration AS unit_deco
                                            FROM unit_items WHERE
                                            unit_items.building_id = :id
                                            ");
        $statement->bindParam(':id',$id);
        $statement->execute();

        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        if(count($results) == 0){
            send_json(3302);
        }
        else{
            send_json(0,json_encode($results));
        }
    }

    public function getImages(){
        $id = $_GET['id'];
        $sql = "SELECT building_img.image_id AS image_id,
                       building_img.image_name AS image_name,
                       building_img.image_url AS image_url,
                       building_img.image_avaliable AS image_avaliable
                FROM building_img
                WHERE building_img.building_id = :id";

        $statement = $this->db->prepare($sql);
        $statement->bindParam(':id',$id);
        $statement->execute();

        $results = $statement->fetchAll(PDO::FETCH_ASSOC);

        if(count($results) == 0){
            send_json(3303);
        }
        else{
            send_json(0,json_encode($results));
        }
    }

    public  function getBasic(){
        $id = $_GET['id'];
        $sql = "SELECT building_product.building_id AS dog_id,
                       building_product.building_name AS dog_name,
                       building_product.building_area AS dog_area,
                       building_product.building_district AS dog_district,
                       building_product.building_address AS dog_add,
                       building_product.building_metro AS dog_metro,
                       building_product.building_pos AS dog_pos,
                       building_product.building_size AS dog_size,
                       building_product.building_price AS dog_price,
                       building_product.building_pic AS dog_pic,
                       building_product.building_description AS dog_description,
                       building_product.building_units_num AS units_num,
                       building_product.building_pic_num AS images_num
                  FROM mizhi_app.building_product
                  WHERE building_product.building_id = :id";

        $statement = $this->db->prepare($sql);
        $statement->bindParam(':id',$id);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);

        if(count($result) == 0){
            send_json(3302);
        }
        else{
            send_json(0,json_encode($result));
        }
    }
    public function deleteBuilding(){
        $id = $_GET['id'];
        for($i=0;$i<3;$i++){
            switch ($i){
                case 0: {
                    $sql = "DELETE FROM mizhi_app.building_product WHERE building_id = :id;";
                    break;
                }
                case 1: {
                    $sql = "DELETE FROM mizhi_app.unit_items WHERE building_id = :id;";
                    break;
                }
                case 2: {
                    $sql = "DELETE FROM mizhi_app.building_img WHERE building_id = :id;";
                    break;
                }
            }
        $statement = $this->db->prepare($sql);
        $statement->bindParam(':id',$id);
        $statement->execute();
        }
        $return = array();
        $return[id] = $id;
        send_json(0,json_encode($return));
    }

    public function deleteUnit(){
        $id = $_GET['id'];
        $bid = substr($id,0,9);
        $sql = "DELETE FROM mizhi_app.unit_items WHERE unit_id = :id";
        $statement = $this->db->prepare($sql);
        $statement->bindParam(':id',$id);
        $statement->execute();

        // 获取户型数量以及价格面积
        $sql_get = "SELECT unit_items.unit_id AS uid,
                           unit_items.unit_price AS uprice,
                           unit_items.unit_size AS usize
                    FROM mizhi_app.unit_items
                    WHERE unit_items.building_id = :bid";

        $statement_get = $this->db->prepare($sql_get);
        $statement_get->bindParam(':bid',$bid);
        $statement_get->execute();


        $results = $statement_get->fetchAll(PDO::FETCH_ASSOC);
        // 获取到需要添加到主信息中的数据
        $bdate = $this->unitSave_BDate($results,$bid);
        $sql_b = "UPDATE mizhi_app.building_product
                  SET building_product.building_size = :size,
                      building_product.building_cate_size = :cate_size,
                      building_product.building_price = :price,
                      building_product.building_cate_price = :cate_price,
                      building_product.building_units_num = :units_num
                  WHERE building_product.building_id = :bid";

        $statement_b = $this->db->prepare($sql_b);
        $statement_b->bindParam(':bid',$bdate[bid]);
        $statement_b->bindParam(':size',$bdate[size]);
        $statement_b->bindParam(':cate_size',$bdate[cate_size]);
        $statement_b->bindParam(':price',$bdate[price]);
        $statement_b->bindParam(':cate_price',$bdate[cate_price]);
        $nuits_num = count($results);
        $statement_b->bindParam(':units_num',$nuits_num);
        $statement_b->execute();

        $return = array();
        $return[id] = $id;
        $return[num] = count($results);

        send_json(0,json_encode($return));
    }

    public function getMainImage(){
        $id = $_GET['id'];
        $sql = "SELECT building_product.building_pic AS image
                FROM mizhi_app.building_product
                WHERE building_product.building_id = :id";

        $statement = $this->db->prepare($sql);
        $statement->bindParam(':id',$id);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);

        $return = array();
        $return[id] = $id;
        $return[url] = $result[image];
        send_json("0",json_encode($return));
    }

    public function newMainImage(){
        $id = $_POST['id'];
        $url = $_POST['url'];
        $sql = "UPDATE mizhi_app.building_product
                SET building_product.building_pic = :url
                WHERE building_product.building_id = :id";

        $statement = $this->db->prepare($sql);
        $statement->bindParam(':url',$url);
        $statement->bindParam(':id',$id);
        $statement->execute();

        $return = array();
        $return[id] = $id;
        $return[url] = $url;
        send_json("0",json_encode($return));
    }

    public function deleteImage(){
        $id = $_GET['id'];
        $bid = substr($id,0,9);
        $sql = "DELETE FROM mizhi_app.building_img WHERE building_img.image_id = :id";
        $statement = $this->db->prepare($sql);
        $statement->bindParam(':id',$id);
        $statement->execute();

        // 获取Image数量
        $sql = "SELECT building_img.image_id FROM mizhi_app.building_img WHERE building_img.building_id = :id AND building_img.image_avaliable = 1";
        $statement_num = $this->db->prepare($sql);
        $statement_num->bindParam(':id',$bid);
        $statement_num->execute();
        $num = count($statement_num->fetchAll(PDO::FETCH_NUM));
        // 更新数量
        $sql = "UPDATE mizhi_app.building_product
                SET building_product.building_pic_num = :num
                WHERE building_product.building_id = :id";
        $statement_set = $this->db->prepare($sql);
        $statement_set->bindParam(':id',$bid);
        $statement_set->bindParam(':num',$num);
        $statement_set->execute();

        $return = array();
        $return[id] = $id;
        $return[num] = $num;

        send_json(0,json_encode($return));
    }

    public function basicSave(){
        $data= parent::dataCompress($_POST[data]);
        $this->basicDataSave($data);
    }

    public function unitSave(){
        $data = $_POST[data];

        // 先保存户型数据
        $sql = "INSERT INTO mizhi_app.unit_items
                (unit_id, building_id, unit_name, unit_price, unit_size, unit_decoration, unit_pic)
                VALUES
                (:id , :bid , :name , :price , :size , :decoration , :image)";

        $statement = $this->db->prepare($sql);
        $statement->bindParam(':id',$data[id]);
        $statement->bindParam(':bid',$data[bid]);
        $statement->bindParam(':name',$data[name]);
        $statement->bindParam(':price',$data[price]);
        $statement->bindParam(':size',$data[size]);
        $statement->bindParam(':decoration',$data[decoration]);
        $statement->bindParam(':image',$data[image]);

        $statement->execute();

        // 获取户型数量以及价格面积
        $sql_get = "SELECT unit_items.unit_id AS uid,
                           unit_items.unit_price AS uprice,
                           unit_items.unit_size AS usize
                    FROM mizhi_app.unit_items
                    WHERE unit_items.building_id = :bid";

        $statement_get = $this->db->prepare($sql_get);
        $statement_get->bindParam(':bid',$data[bid]);
        $statement_get->execute();

        $results = $statement_get->fetchAll(PDO::FETCH_ASSOC);
        // 获取到需要添加到主信息中的数据
        $bdate = $this->unitSave_BDate($results,$data[bid]);
        $sql_b = "UPDATE mizhi_app.building_product
                  SET building_product.building_size = :size,
                      building_product.building_cate_size = :cate_size,
                      building_product.building_price = :price,
                      building_product.building_cate_price = :cate_price,
                      building_product.building_units_num = :units_num
                  WHERE building_product.building_id = :bid";

        $statement_b = $this->db->prepare($sql_b);
        $statement_b->bindParam(':bid',$bdate[bid]);
        $statement_b->bindParam(':size',$bdate[size]);
        $statement_b->bindParam(':cate_size',$bdate[cate_size]);
        $statement_b->bindParam(':price',$bdate[price]);
        $statement_b->bindParam(':cate_price',$bdate[cate_price]);
        $nuits_num = count($results);
        $statement_b->bindParam(':units_num',$nuits_num);
        $statement_b->execute();

        $results = array();
        $return[id] = $data[id];
        $return[name] = $data[name];
        send_json(0,json_encode($return));
    }

    public function unitID()
    {
        $bid = $_GET['bid'];

        $sql = "SELECT unit_items.unit_id FROM unit_items WHERE unit_items.building_id = :bid";

        $statement = $this->db->prepare($sql);
        $statement->bindParam(':bid',$bid);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_NUM);

        $num = count($results);
        for($i=0;$i<$num;$i++){
            $ids[$i] = $results[$i][0];
        }
        sort($ids);
        $id = $ids[$num-1]+1;
        $return = array();
        $return['id'] = $id;
        send_json(0,json_encode($return));
    }

    public function newImageSave(){
        $bid = $_POST['id'];
        $iname = $_POST['name'];
        $iurl = $_POST['url'];
        // 首先获取iid;
        $sql_get = "SELECT building_img.image_id
                FROM mizhi_app.building_img
                WHERE building_img.building_id = :bid";

        $statement_get = $this->db->prepare($sql_get);
        $statement_get->bindParam(':bid',$bid);
        $statement_get->execute();
        $results = $statement_get->fetchAll(PDO::FETCH_NUM);

        $num = count($results);
        for($i=0;$i<$num;$i++){
            $ids[$i] = $results[$i][0];
        }
        sort($ids);
        $iid = $ids[$num-1]+1;

        $sql = "INSERT INTO mizhi_app.building_img
                (image_id, image_name, building_id, image_avaliable, image_url)
                VALUES
                (:iid , :iname , :bid , :iavaliable , :iurl)";

        $statement = $this->db->prepare($sql);
        $statement->bindParam(':iid',$iid);
        $statement->bindParam(':iname',$iname);
        $statement->bindParam(':bid',$bid);
        $statement->bindValue(':iavaliable',"1");
        $statement->bindParam(':iurl',$iurl);
        $statement->execute();

        $return = array();
        $return[iid] = $iid;
        $return[bid] = $bid;
        $return[name] = $iname;
        $return[url] = $iurl;

        send_json(0,json_encode($return));
    }
}

class BillManagerAction extends Sampyedhouse {
    public function __construct()
    {
        parent::__construct();
    }

    protected function dataCompress($data){
        $data[extract][metro] = join($data[extract][metro],"|");
        $data[address][pos] = join($data[address][pos],"|");
        return $data;
    }

    protected function basicDataSave($data){
        $sql = "UPDATE mizhi_app.building_product
                SET building_product.building_name = :name ,
                    building_product.building_district = :district ,
                    building_product.building_area = :area ,
                    building_product.building_address = :address ,
                    building_product.building_pos = :pos ,
                    building_product.building_metro = :metro ,
                    building_product.building_description = :description
                WHERE building_product.building_id = :id ";

        $statement = $this->db->prepare($sql);

        $statement->bindParam(':id',$data[id]);
        $statement->bindParam(':name',$data[name]);
        $statement->bindParam(':district',$data[address][district]);
        $statement->bindParam(':area',$data[address][area]);
        $statement->bindParam(':address',$data[address][address]);
        $statement->bindParam(':pos',$data[address][pos]);
        $statement->bindParam(':metro',$data[extract][metro]);
        $statement->bindParam(':description',$data[extract][description]);

        $statement->execute();
        $error_code = $statement->errorCode();
        $error_info = $statement->errorInfo();

        $return = array();
        $return[id] = $data[id];
        $return[name] = $data[name];
        if($error_code == "00000"){
            send_json(0,json_encode($return));
        }
        else {
            send_json(3311,"",$error_info);
        }
    }

    /**
    * 获取修改户型时 主题信息中要更新的数据
    * @param $data 新的户型数据.包括id,size,price
    * @param $bid 房源ID
    *
    * 需要返回:
    * size: 面积范围
    * price 价格范围
    * catt_size 面积等级
    * cate_price 价格等级
    */
    protected function unitSave_BDate($data,$bid){
        $return = array();
        $temp = array();
        $num = count($data);
        // 通过循环获取所有面积价格存入$temp
        for($i=0;$i<$num;$i++){
            $temp[size][$i] = $data[$i][usize];
            $temp[price][$i] = $data[$i][uprice];
        }
        // 将面积价格进行排序
        sort($temp[size]);
        sort($temp[price]);
        // 获取范围
        $return[size][0] = $temp[size][0];
        $return[size][1] = $temp[size][$num-1];
        $return[price][0] = $temp[price][0];
        $return[price][1] = $temp[price][$num-1];
        // 获取分级
        $size = $return[size][0];
        $price = $return[price][0];
        // 生成范围
        $return[size] = join($return[size],"|");
        $return[price] = join($return[price],"|");
        // 得到分级
        if($size <= 100) {
            $cate_size = 1;
        }
        else if ($size>100 && $size<=200) {
            $cate_size = 2;
        }
        else if ($size>100 && $size<=200) {
            $cate_size = 3;
        }
        else if ($size>100 && $size<=200) {
            $cate_size = 4;
        }
        else if ($size>100 && $size<=200) {
            $cate_size = 5;
        }
        else {
            $cate_size = 6;
        }
        $return[cate_size] = $cate_size;
        // 价格等级 根据最小来判断
        if($price <= 2) {
            $cate_price = 1;
        }
        else if ($price>2 && $price<=4) {
            $cate_price = 2;
        }
        else if ($price>4 && $price<=6) {
            $cate_price = 3;
        }
        else if ($price>6 && $price<=8) {
            $cate_price = 4;
        }
        else if ($price>8 && $price<=10) {
            $cate_price = 5;
        }
        else {
            $cate_price = 6;
        }
        $return[cate_price] = $cate_price;
        $return[bid] = $bid;
        return $return;
    }
}