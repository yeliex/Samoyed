<?php

class Search extends Samoyed
{

    private $keyword;
    private $district = 0;
    private $size = 0;
    private $price = 0;
    private $page = 0;

    public function __construct()
    {
        parent::__construct();

        //获取关键字
        if ((!isset($_GET['keyword'])) || (htmlspecialchars(trim($_GET['keyword']) == ""))) {
            send_json(1060);
            exit;
        }
        $this->keyword = htmlspecialchars(trim($_GET['keyword']));

        //获取区编号
        if ((isset($_GET['district'])) && ($this->checkDistrict($_GET['district']))) {
            $this->district = $_GET['district'];
        }

        //获取房屋面积区间
        if ((isset($_GET['size'])) && ($this->checkSize($_GET['size']))) {
            $this->size = $_GET['size'];
        }

        //获取房屋价格区间
        if ((isset($_GET['price'])) && ($this->checkPrice($_GET['price']))) {
            $this->price = $_GET['price'];
            exit;
        }
    }

    // 默认动作
    public function defaultAction()
    {
        // 接口需要返回的数据
        /*
            dog_id
            dog_name
            dog_area
            dog_size
            dog_price
            dog_pic
        */

        $statement = $this->db->prepare("SELECT building_product.building_id AS dog_id,
                                            building_product.building_name AS dog_name,
                                            building_product.building_area AS dog_area,
                                            building_product.building_size AS dog_size,
                                            building_product.building_price AS dog_price,
                                            building_product.building_cate_size AS dog_cate_size,
                                            building_product.building_cate_price AS dog_cate_price,
                                            building_product.building_pic AS dog_pic
                                            FROM building_product
                                            GROUP BY building_product.building_id
                                            ");

        $statement->execute();

        $return_array = [];
        while ($result = $statement->fetch(PDO::FETCH_ASSOC)) {


            // 关键字检索
            // 对于大楼的名称和商圈

            if (
                (!strstr($result['dog_name'], $this->keyword)) &&
                (!strstr($result['dog_area'], $this->keyword))
            ) {
                continue;
            }

            array_push($return_array, $result);

        }

        send_json(0, json_encode($return_array), count($return_array));
    }
}
