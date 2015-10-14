<?php

class Plist extends Samoyed
{
    private $city;
    private $district;
    private $size;
    private $price;
    private $page;

    public function __construct()
    {

        parent::__construct();

        //获取城市编号
        if ((!isset($_GET['city'])) || (!$this->checkCity($_GET['city']))) {
            send_json(1020);
            exit;
        }
        $this->city = $_GET['city'];

        // 获取区编号
        if ((!isset($_GET['district'])) || (!$this->checkDistrict($_GET['district']))) {
            send_json(1030);
            exit;
        }
        $this->district = $_GET['district'];

        // 获取房屋面积区间
        if ((!isset($_GET['size'])) || (!$this->checkSize($_GET['size']))) {
            send_json(1040);
            exit;
        }
        $this->size = $_GET['size'];

        // 获取房屋价格区间
        if ((!isset($_GET['price'])) || (!$this->checkPrice($_GET['price']))) {
            send_json(1050);
            exit;
        }
        $this->price = $_GET['price'];

        // send_json();
        // exit;

    }

    //处理默认动作
    public function defaultAction()
    {

        // 接口需要返回的数据是：
        /*
            dog_id
            dog_name
            dog_area
            dog_size
            dog_price
            dog_pic
        */

        // 根据传入的 Size 或者是 price，来生成 SQL 查询语句

        // 如果需要允许无户型建筑存在 应该取消查询中的unit_items.building_id = building_product.building_id

        $sql = "SELECT building_product.building_id AS dog_id,
                                            building_product.building_name AS dog_name,
                                            building_product.building_area AS dog_area,
                                            building_product.building_district AS dog_district,
                                            building_product.building_address AS dog_add,
                                            building_product.building_size AS dog_size,
                                            building_product.building_price AS dog_price,
                                            building_product.building_pic AS dog_pic,
                                            building_product.building_units_num AS units_num
                                            FROM building_product,unit_items
                                            WHERE unit_items.building_id = building_product.building_id
                                            ";

        // 因为是字符串链接，所以需要注意最后面的空格
        // 不然会导致 SQL 语句解析错误
        if ($this->district != 0) {
            $sql .= 'AND building_product.building_district = :district ';
        }

        if ($this->size != 0) {
            $sql .= 'AND building_product.building_cate_size = :size ';
        }

        if ($this->price != 0) {
            $sql .= 'AND building_product.building_cate_price = :price ';
        }

        $sql .= ' GROUP BY building_product.building_id';

        $statement = $this->db->prepare($sql);

        if ($this->district != 0) {
            $statement->bindParam(':district', $this->district);
        }

        if ($this->size != 0) {
            $statement->bindParam(':size', $this->size);
        }

        if ($this->price != 0) {
            $statement->bindParam(':price', $this->price);
        }

        $statement->execute();

        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        send_json(0, json_encode($results), count($results));
    }
}
