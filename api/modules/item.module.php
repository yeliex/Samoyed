<?php

class Item extends Samoyed
{
    private $id;

    public function __construct()
    {
        parent::__construct();

        // 获取 ID 值
        if ((!isset($_GET['id'])) || (!$this->checkId($_GET['id']))) {
            send_json(1070);
            exit;
        }
        $this->id = $_GET['id'];

    }

    private function checkId($id)
    {
        $statement = $this->db->prepare("SELECT building_id FROM building_product
                            WHERE building_id = :id");
        $statement->bindParam(":id", $id);
        $statement->execute();

        if ($statement->fetch()) {
            return true;
        } else {
            return false;
        }
    }

    public function defaultAction()
    {
        // 前往数据库查询

        // 接口需要返回的数据是：
        /*
            dog_id
            dog_name
            dog_area
            dog_size
            dog_price
            pic_num
            dog_pics
            units_num
            units
        */

        $statement = $this->db->prepare("SELECT building_product.building_id AS dog_id,
                                            building_product.building_name AS dog_name,
                                            building_product.building_area AS dog_area,
                                            building_product.building_district AS dog_district,
                                            building_product.building_address AS dog_add,
                                            building_product.building_pos AS dog_pos,
                                            building_product.building_size AS dog_size,
                                            building_product.building_price AS dog_price,
                                            building_product.building_description AS dog_desc,
                                            building_product.building_pic_num AS pic_num,
                                            building_product.building_pic AS dog_pic,
                                            building_product.building_units_num AS units_num
                                            FROM building_product WHERE
                                            building_product.building_id = :id
                                            ");
        $statement->bindParam(':id', $this->id);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);
        send_json(0, json_encode($result), 1);
    }

    public function units()
    {
        // 前往数据库查询

        // 接口需要返回的数据是：
        /*
            unit_id
            unit_name
            unit_size
            unit_price
            unit_pic
        */

        $statement = $this->db->prepare("SELECT unit_items.unit_id AS unit_id,
                                            unit_items.unit_name AS unit_name,
                                            unit_items.unit_size AS unit_size,
                                            unit_items.unit_price AS unit_price,
                                            unit_items.unit_pic AS unit_pic,
                                            unit_items.unit_decoration AS unit_deco
                                            FROM unit_items WHERE
                                            unit_items.building_id = :id
                                            ");
        $statement->bindParam(':id', $this->id);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        send_json(0, json_encode($result), 1);
    }

    public function images()
    {
        // 前往数据库查询

        // 接口需要返回的数据是：
        /*
            image_id
            image_url
        */

        $statement = $this->db->prepare("SELECT building_img.image_id AS image_id,
                                            building_img.image_url AS image_url,
                                            building_img.image_name AS image_name
                                            FROM building_img WHERE
                                            building_img.building_id = :id AND
                                            building_img.image_avaliable = 1
                                            ");
        $statement->bindParam(':id', $this->id);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        send_json(0, json_encode($result), 1);
    }

    public function all_images()
    {
        // 前往数据库查询

        // 接口需要返回的数据是：
        /*
            image_id
            image_url
        */

        $statement = $this->db->prepare("SELECT building_img.image_id AS image_id,
                                            building_img.image_url AS image_url,
                                            building_img.image_name AS image_name,
                                            building_img.image_avaliable AS image_avaliable
                                            FROM building_img WHERE
                                            building_img.building_id = :id
                                            ");
        $statement->bindParam(':id', $this->id);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        send_json(0, json_encode($result), 1);
    }
}
