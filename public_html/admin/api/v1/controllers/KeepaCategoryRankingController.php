<?php

class KeepaCategoryRankingController
{
    protected $perPage = 100;
    protected $productType = [0, 1];
    protected $avg30_SALES_gte = 1;
    protected $avg30_SALES_lte = 10000;
    protected $sort = [["current_SALES","asc"]];

    function __construct()
    {
        $this->url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://').$_SERVER['HTTP_HOST'].mb_substr($_SERVER['SCRIPT_NAME'],0,-9).basename(__FILE__, ".php")."/";
        $this->request_body = json_decode(mb_convert_encoding(@file_get_contents('php://input'),"UTF8","ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN"),true);
    }

    public function get($rootCategory, $page = 0):array
    {
      return $this->getCateogryList($rootCategory, $page);
    }

    private function getCateogryList($rootCategory, $page) {
      $url = "https://api.keepa.com/query?";
      $key = $_ENV['KEEPA_KEY'];
      $domain = $_ENV['DOMAIN'];

      // categoryがpostされていない
      if (!$rootCategory) {
        return [
          "status"          => "no",
          "code"            => "400",
          "message"         => "Missing rootCategory",
          "isKeyWordResult" => false,
          "rootCategory"    => $rootCategory,
          "response"        => [],
        ];
      }

      if (!$key || !$domain) {
        return [
          "status"          => "no",
          "code"            => "400",
          "message"         => "Missing key and/or domain",
          "isKeyWordResult" => false,
          "rootCategory"    => $rootCategory,
          "response"        => [],
        ];
      }

      //json
      $selectionJson = [
        "perPage"         => $this->perPage,
        "productType"     => $this->productType,
        "avg30_SALES_gte" => $this->avg30_SALES_gte,
        "avg30_SALES_lte" => $this->avg30_SALES_lte,
        "sort"            => $this->sort,
        "rootCategory"    => $rootCategory,
        "page"            => (empty($page)) ? 0 : $page,
      ];

      $selectionJson = json_encode($selectionJson, JSON_PRETTY_PRINT);

      //API通信
      $search_url = $url . "key=" . $key . "&domain=" . $domain . "&selection=" . urlencode($selectionJson);
      $result = $this->getKeepaApi($search_url);

      //レスポンスがない
      if ($result === false) {
        return [
          "status"          => "no",
          "code"            => "400",
          "message"         => "No response from Keepa #1",
          "isKeyWordResult" => false,
          "rootCategory"    => $rootCategory,
          "response"        => [],
        ];
      }

      $result = json_decode($result, true);

      if(array_key_exists("asinList", $result) === false) {
        return [
          "status"          => "no",
          "code"            => "400",
          "message"         => "No response from Keepa #2",
          "isKeyWordResult" => false,
          "rootCategory"    => $rootCategory,
          "response"        => [$result],
        ];
      }

      //リスト取得
      $asinList = implode(',', $result["asinList"]);
      $search_url = "https://api.keepa.com/product?key=" . $_ENV['KEEPA_KEY'] . "&domain=" . $_ENV['DOMAIN'];
      $search_url .= "&asin=" . $asinList;

      //API通信
      $result = $this->getKeepaApi($search_url);
      $result = json_decode($result, true);

      if(array_key_exists("products", $result) === false) {
        return [
          "status"          => "no",
          "code"            => "400",
          "message"         => "No response from Keepa #2",
          "isKeyWordResult" => false,
          "rootCategory"    => $rootCategory,
          "response"        => [$result],
        ];
      }

      $res      = [];
      if($page == 0) {
        $ranking = $from = 1;
        $to = $this->perPage;
      } else {
        $ranking = $from = ($page * $this->perPage) + 1;
        $to = $from + $this->perPage - 1;
      }

      foreach($result["products"] as $product) {
        $image = explode(",", $product["imagesCSV"]);

        $res[] = [
          "image"           => ($image[0]) ? $image[0] : "-",
          "name"            => ($product["title"]) ? $product["title"] : "-",
          "averageRanking"  => $ranking,
          "asin"            => $product["asin"],
          "manufacturer"    => ($product["manufacturer"]) ? $product["manufacturer"] : "-",
          "category"        => $rootCategory,
        ];

        $ranking++;
      }

      return [
        "status"          => "yes",
        "code"            => "400",
        "message"         => "Sucessful",
        "isKeyWordResult" => false,
        "rootCategory"    => $rootCategory,
        "nextRanking"     => $ranking,
        "response"        => $res,
        "from"            => $from,
        "to"              => $to,
      ];
    }

    public function options():array
    {
        header("Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE");
        header("Access-Control-Allow-Headers: Content-Type");
        return [];
    }

    private function getKeepaApi($url) {
      $header = [
        "Content-Type: application/json",
        "Accept: application/json",
        "Authorization: Bearer HogeHoge",
      ];

      $curl = curl_init();
      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
      curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl, CURLOPT_ENCODING, "gzip");

      $output = curl_exec($curl);
      $errno = curl_errno($curl);
      curl_close($curl);

      if ($errno !== CURLE_OK) {
        return false;
      }

      return $output;
    }
}
