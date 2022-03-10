<?php

class KeepaProductController
{
    protected $code = 200;
    protected $url;
    protected $request_body;
    protected $stats = 3 * 30; //3ヶ月 * 30日interal
    protected $forTwoMonths = 2 * 30;
    protected $useBuyBox = true;

    function __construct()
    {
        $this->url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://').$_SERVER['HTTP_HOST'].mb_substr($_SERVER['SCRIPT_NAME'],0,-9).basename(__FILE__, ".php")."/";
        $this->request_body = json_decode(mb_convert_encoding(@file_get_contents('php://input'),"UTF8","ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN"),true);
    }

    public function get($asin = null):array
    {
      return $this->getAsinInfo($asin);
    }

    private function getAsinInfo($asin) {
      $url = "https://api.keepa.com/product?";
      $key = $_ENV['KEEPA_KEY'];
      $domain = $_ENV['DOMAIN'];
      $offers = isset($_ENV['OFFERS']) ? $_ENV['OFFERS'] : false;

      // asinがpostされていない
      if (!$asin) {
        return [
          "status"      => "yes",
          "code"        => "400",
          "message"     => "Missing asin",
          "asin"        => $asin,
          "response"    => [],
          "twoMonths"   => [],
        ];
      }

      if (!$key || !$domain) {
        return [
          "status"      => "yes",
          "code"        => "400",
          "message"     => "Missing key and/or domain",
          "asin"        => $asin,
          "response"    => [],
          "twoMonths"   => [],
        ];
      }

      //API通信
      $search_url = $url . "key=" . $key . "&domain=" . $domain . "&asin=" . $asin . "&stats=" . $this->stats;
      $forTwomoths = $url . "key=" . $key . "&domain=" . $domain . "&asin=" . $asin . "&stats=" . $this->forTwoMonths;
      if($this->useBuyBox === true) {
        $search_url .= "&buybox=1";
        $forTwomoths .= "&buybox=1";
      }

      if($offers !== false) {
        $search_url .= "&offers=" . $offers;
        $forTwomoths .= "&offers=" . $offers;
      }

      $result = $this->getKeepaApi($search_url);
      $twoMonthsResult = $this->getKeepaApi($forTwomoths);

      //レスポンスがない
      if ($result === false) {
        //API通信
        $search_url = $url . "key=" . $key . "&domain=" . $domain . "&code=" . $asin . "&stats=" . $this->stats;
        $forTwomoths = $url . "key=" . $key . "&domain=" . $domain . "&code=" . $asin . "&stats=" . $this->forTwoMonths;
        if($this->useBuyBox === true) {
          $search_url .= "&buybox=1";
          $forTwomoths .= "&buybox=1";
        }

        if($offers !== false) {
          $search_url .= "&offers=" . $offers;
          $forTwomoths .= "&offers=" . $offers;
        }

        $result = $this->getKeepaApi($search_url);
        $twoMonthsResult = $this->getKeepaApi($forTwomoths);

        //レスポンスがない
        if ($result === false) {
          return [
            "status"      => "yes",
            "code"        => "400",
            "message"     => "No response from Keepa",
            "asin"        => $asin,
            "response"    => [],
            "twoMonths"   => [],
          ];
        }
      }

      $result = json_decode($result, true);

      if(array_key_exists("products", $result) === false) {
        //API通信
        $search_url = $url . "key=" . $key . "&domain=" . $domain . "&code=" . $asin . "&stats=" . $this->stats;
        $forTwomoths = $url . "key=" . $key . "&domain=" . $domain . "&code=" . $asin . "&stats=" . $this->forTwoMonths;
        if($this->useBuyBox === true) {
          $search_url .= "&buybox=1";
          $forTwomoths .= "&buybox=1";
        }

        if($offers !== false) {
          $search_url .= "&offers=" . $offers;
          $forTwomoths .= "&offers=" . $offers;
        }

        $result = $this->getKeepaApi($search_url);
        $twoMonthsResult = $this->getKeepaApi($forTwomoths);

        //レスポンスがない
        if ($result === false) {
          return [
            "status"      => "yes",
            "code"        => "400",
            "message"     => "No response from Keepa",
            "asin"        => $asin,
            "response"    => [],
            "twoMonths"   => [],
          ];
        }
        $result = json_decode($result, true);
        if(array_key_exists("products", $result) === false) {
          return [
            "status"      => "yes",
            "code"        => "400",
            "message"     => "No response from Keepa",
            "asin"        => $asin,
            "response"    => [],
            "twoMonths"   => [],
          ];
        }
      }

      $twoMonthsResult = json_decode($twoMonthsResult, true);

      //echo "<pre>";
      //print_r($result["products"]);
      //echo "</pre>";
      //exit;

      return [
        "status"    => "yes",
        "code"      => "400",
        "message"   => "Sucessful",
        "asin"      => $asin,
        "response"  => $result["products"][0],
        "twoMonths" => $twoMonthsResult["products"][0]["stats"]["avg"],
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
