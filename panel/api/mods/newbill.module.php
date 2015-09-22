<?php

class Newbill extends CreateBill
{
    public function __construct()
    {

        parent::__construct();

    }

    public function billID()
    {
        $district = $_GET['district'];

        $sql = "SELECT building_id from building_product WHERE building_district = $district";

        $statement = $this->db->prepare($sql);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_NUM);

        $num = count($results);

        if ($num == 0) {
            $id = $district . "001";
        } else {
            for ($i = 0; $i < $num; $i++) {
                $ids[$i] = $results[$i][0];
            }
            sort($ids);
            $id = $ids[$num - 1] + 1;
        }

        $return = array();
        $return['bid'] = $id;
        send_json(0, json_encode($return));
    }

    /**
     * 新建房源方法:
     * 数据: $    *        = $_POST[    *       ]
     *
     * 数据参数:
     *       id: 房源ID 310051001
     *       ctime: 创建时间 2015-8-18   15:12
     *       name: 房源名字
     *       extract  {
     *           metro  {
     *               line_1 :false
     *               line_2 :false
     *               line_4 :false
     *               line_5 :false
     *               line_6 :false
     *           } => metro: false|false|false|false|false
     *           description :
     *        }
     *        address  {
     *           district :
     *           area :
     *           address :
     *           pos  {
     *               posx :
     *               posy :
     *           } => pos: posx|posy
     *        }
     *        units  {
     *           units_num :1
     *           ulist  {
     *                0  {
     *                   name :户型1
     *                   size :
     *                   price :
     *                   decoration :
     *                   image :http://7xked6.com2.z0.glb.qiniucdn.com/default_unit.png
     *               }
     *        }
     *        images  {
     *           main :http://7xked6.com2.z0.glb.qiniucdn.com/default_unit.png
     *           contents_num :1
     *           contents  {
     *               0  {
     *                   name :图片1
     *                   url :http://img.static.mzapp.info/default_unit.png
     *               }
     *           }
     *        }
     *       expand  {
     *           size : 1|1 面积范围
     *           cate_size: 1 面积范围代码
     *           price : 1|1 价格范围
     *           cate_price: 1 价格范围代码
     *       }
     */
    public function  create()
    {
        $data = parent::dataCompress($_POST[data]);
//        print_r($data);
        $this->dataSave($data);
    }

}

class CreateBill extends Sampyedhouse
{

    public function __construct()
    {

        parent::__construct();

    }

    protected function dataCompress($data)
    {
        $data[extract][metro] = join($data[extract][metro], "|");
        $data[address][pos] = join($data[address][pos], "|");
        return $data;
    }

    protected function dataSave($data)
    {
        $return = array("0", " ", array());
        $result = $this->mainSave($data);
        if ($result[0] == "success") {
            // 主体信息保存成功
            // 开始循环保存户型
            for ($i = 0; $i < $data[units][units_num]; $i++) {
                $result = $this->unitSave($data[units][ulist][$i], $data[id], $i);
                if ($result[0] == "success") continue;
                else break;
            }
            // 所有户型保存完成后再判断一次   // 逻辑待优化
            if ($result[0] == "success") {
                // 户型保存成功
                // 开始循环保存图片
                for ($i = 0; $i < $data[images][contents_num]; $i++) {
                    $result = $this->imageSave($data[images][contents][$i], $data[id], $i);
                    if ($result[0] == "success") continue;
                    else break;
                }
                if ($result[0] != "success") {
                    // 图片保存失败,返回一个错误
                    $return[0] = $result[0];
                    $return[1] = $result[1];
                } else {
                    $return[2][bid] = $data[id];
                    $return[2][bname] = $data[name];
                }
            } else {
                // 返回一个错误
                $return[0] = $result[0];
                $return[1] = $result[1];
            }
        } else {
            // 返回一个错误
            $return[0] = $result[0];
            $return[1] = $result[1];
        }
        if ($return[0] != 0) {
            // 执行错误回滚
            $this->errorRollback($data[id]);
        }
        send_json($return[0], json_encode($return[2]), $return[1]);
    }

    private function mainSave($data)
    {
        $sql = "INSERT INTO mizhi_app.building_product
                (building_id, building_name, building_type, building_district, building_area, building_address, building_pos, building_metro, building_units_num, building_price, building_cate_price, building_size, building_cate_size, building_pic_num, building_pic, building_description, create_time)
                VALUES
                (:id , :name , :type , :district , :area , :address , :pos , :metro , :units_num , :price , :cate_price , :size , :cate_size , :pic_num , :pic , :description , :create_time)";
        $data = $this->expandData($data);

        $statement = $this->db->prepare($sql);

        // 添加值
        $statement->bindParam(':id', $data[id]);
        $statement->bindParam(':name', $data[name]);
        $statement->bindValue(':type', "none");
        $statement->bindParam(':district', $data[address][district]);
        $statement->bindParam(':area', $data[address][area]);
        $statement->bindParam(':address', $data[address][address]);
        $statement->bindParam(':pos', $data[address][pos]);
        $statement->bindParam(':metro', $data[extract][metro]);
        $statement->bindParam(':units_num', $data[units][units_num]);

        $statement->bindParam(':price', $data[expend][price]);
        $statement->bindParam(':cate_price', $data[expend][cate_price]);
        $statement->bindParam(':size', $data[expend][size]);
        $statement->bindParam(':cate_size', $data[expend][cate_size]);

        $statement->bindParam(':pic_num', $data[images][contents_num]);
        $statement->bindParam(':pic', $data[images][main]);
        $statement->bindParam(':description', $data[extract][description]);
        $statement->bindParam(':create_time', $data[ctime]);

        $statement->execute();
        $error_code = $statement->errorCode();
        $error_info = $statement->errorInfo();
        if ($error_code == "00000") {
            return array("success");
        } else {
            return array("failed", $error_info);
        }

    }

    private function unitSave($data, $bid, $i)
    {
        $sql = "INSERT INTO mizhi_app.unit_items
                (unit_id, building_id, unit_name, unit_price, unit_size, unit_decoration, unit_pic)
                VALUES
                (:uid , :bid , :uname , :uprice , :usize , :udecoration , :upic)";

        $statment = $this->db->prepare($sql);
        $uid = $this->getSubID($bid, $i);
        $statment->bindParam(':uid', $uid);
        $statment->bindParam(':bid', $bid);
        $statment->bindParam(':uname', $data[name]);
        $statment->bindParam(':uprice', $data[price]);
        $statment->bindParam(':usize', $data[size]);
        $statment->bindParam(':udecoration', $data[decoration]);
        $statment->bindParam(':upic', $data[image]);

        $statment->execute();
        $error_code = $statment->errorCode();
        $error_info = $statment->errorInfo();

        if ($error_code == "00000") {
            return array("success");
        } else {
            return array("failed", $error_info);
        }
    }

    private function imageSave($data, $bid, $i)
    {
        $sql = "INSERT INTO mizhi_app.building_img
                (image_id, image_name, building_id, image_avaliable, image_url)
                VALUES
                (:iid , :iname , :bid , :iavaliable, :iurl)";

        $statment = $this->db->prepare($sql);

        $iid = $this->getSubID($bid, $i);
        $statment->bindParam(':iid', $iid);
        $statment->bindParam(':bid', $bid);
        $statment->bindParam(':iname', $data[name]);
        $statment->bindParam(':iurl', $data[url]);
        $statment->bindValue(':iavaliable', '1');

        $statment->execute();
        $error_code = $statment->errorCode();
        $error_info = $statment->errorInfo();

        if ($error_code == "00000") {
            return array("success");
        } else {
            return array("failed", $error_info);
        }
    }

    private function getSubID($bid, $i)
    {
        if ($i >= 0 && $i <= 8) {  // 1<=i<=9
            $i = $bid . "00" . ($i + 1);
        } else if ($i > 8) {  // 10<=i<=98
            $i = $bid . "0" . ($i + 1);
        } else {
            $i = $bid . ($i + 1);
        }
        return $i;
    }

    private function errorRollback($id)
    {
        $sql = "DELETE FROM mizhi_app.building_product , mizhi_app.unit_items , mizhi_app.building_img
                WHERE building_id = :bid";

        $statement = $this->db->prepare($sql);
        $statement->execute();
        print_r("ERROR!");
    }

    private function expandData($data)
    {
        // 面积范围
        $size = array();
        for ($i = 0; $i < $data[units][units_num]; $i++) {
            $unit = $data[units][ulist][$i];
            $size[$i] = $unit[size];
        }
        if ($data[units][units_num] === 1) {
            $data[expend][size] = $size[0];
        } else {
            sort($size);
            $asize = array($size[0], $size[$data[units][units_num] - 1]);
            if ($asize[0] == $asize[1]) {
                $asize[1] = null;
            }
            $data[expend][size] = join($asize, "|");
        }
        //价格范围
        for ($i = 0; $i < $data[units][units_num]; $i++) {
            $unit = $data[units][ulist][$i];
            $price[$i] = $unit[price];
        }
        if ($data[units][units_num] === 1) {
            $data[expend][price] = $size[0];
        } else {
            sort($price);
            $aprice = array($price[0], $price[$data[units][units_num] - 1]);
            if ($aprice[0] == $aprice[1]) {
                $aprice[1] = null;
            }
            $data[expend][price] = join($aprice, "|");
        }

        // 面积等级 根据最小来判断
        if ($size <= 100) {
            $cate_size = 1;
        } else if ($size > 100 && $size <= 200) {
            $cate_size = 2;
        } else if ($size > 100 && $size <= 200) {
            $cate_size = 3;
        } else if ($size > 100 && $size <= 200) {
            $cate_size = 4;
        } else if ($size > 100 && $size <= 200) {
            $cate_size = 5;
        } else {
            $cate_size = 6;
        }
        $data[expend][cate_size] = $cate_size;
        // 价格等级 根据最小来判断
        if ($price <= 2) {
            $cate_price = 1;
        } else if ($price > 2 && $price <= 4) {
            $cate_price = 2;
        } else if ($price > 4 && $price <= 6) {
            $cate_price = 3;
        } else if ($price > 6 && $price <= 8) {
            $cate_price = 4;
        } else if ($price > 8 && $price <= 10) {
            $cate_price = 5;
        } else {
            $cate_price = 6;
        }
        $data[expend][cate_price] = $cate_price;
//        print_r($data);
        return $data;
    }

}
