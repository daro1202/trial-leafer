<?php

class KeepaProductSearchController
{
    protected $code = 200;
    protected $url;
    protected $request_body;
    protected $stats = 3 * 30; //3ヶ月 * 30日interal
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
      $searchUrl = "https://api.keepa.com/search?";
      $key = $_ENV['KEEPA_KEY'];
      $domain = $_ENV['DOMAIN'];
      $offers = isset($_ENV['OFFERS']) ? $_ENV['OFFERS'] : false;

      // asinがpostされていない
      if (!$asin) {
        return [
          "status"          => "yes",
          "code"            => "400",
          "message"         => "Missing asin",
          "isKeyWordResult" => false,
          "asin"            => $asin,
          "response"        => [],
        ];
      }

      if (!$key || !$domain) {
        return [
          "status"          => "yes",
          "code"            => "400",
          "message"         => "Missing key and/or domain",
          "isKeyWordResult" => false,
          "asin"            => $asin,
          "response"        => [],
        ];
      }

      //API通信
      $search_url = $url . "key=" . $key . "&domain=" . $domain . "&asin=" . $asin . "&stats=" . $this->stats;
      if($this->useBuyBox === true) {
        $search_url .= "&buybox=1";
        $forTwomoths .= "&buybox=1";
      }

      if($offers !== false) {
        $search_url .= "&offers=" . $offers;
      }

      $result = $this->getKeepaApi($search_url);

      //レスポンスがない
      if ($result === false) {
        //API通信
        $search_url = $url . "key=" . $key . "&domain=" . $domain . "&code=" . $asin . "&stats=" . $this->stats;
        if($this->useBuyBox === true) {
          $search_url .= "&buybox=1";
          $forTwomoths .= "&buybox=1";
        }

        if($offers !== false) {
          $search_url .= "&offers=" . $offers;
        }

        $result = $this->getKeepaApi($search_url);

        //レスポンスがない
        if ($result === false) {
          return [
            "status"          => "yes",
            "code"            => "400",
            "message"         => "No response from Keepa #1",
            "isKeyWordResult" => false,
            "asin"            => $asin,
            "response"        => [],
          ];
        }
      }

      $result = json_decode($result, true);

      //echo "<pre>";
      //print_r($result["products"]);
      //echo "</pre>";
      //exit;

      if(array_key_exists("products", $result) === false) {
        //API通信
        $search_url = $url . "key=" . $key . "&domain=" . $domain . "&code=" . $asin . "&stats=" . $this->stats;
        if($this->useBuyBox === true) {
          $search_url .= "&buybox=1";
          $forTwomoths .= "&buybox=1";
        }

        if($offers !== false) {
          $search_url .= "&offers=" . $offers;
        }

        $result = $this->getKeepaApi($search_url);
        //レスポンスがない
        if ($result === false) {
          return [
            "status"          => "yes",
            "code"            => "400",
            "message"         => "No response from Keepa #2",
            "isKeyWordResult" => false,
            "asin"            => $asin,
            "response"        => [],
          ];
        }

        $result = json_decode($result, true);

        //キーワード検索
        $keySearchFound = false;
        if(array_key_exists("products", $result) === false) {
          //API通信
          $search_url = $searchUrl . "key=" . $key . "&domain=" . $domain . "&type=product&term=" . $asin . "&page=9";
          $result = $this->getKeepaApi($search_url);

          //レスポンスがない
          if ($result === false) {
            return [
              "status"          => "yes",
              "code"            => "400",
              "message"         => "No response from Keepa for keyword search",
              "isKeyWordResult" => false,
              "asin"            => $asin,
              "response"        => [],
            ];
          }

          $result = json_decode($result, true);

          //ヒットなし
          if(array_key_exists("products", $result) === false) {
            return [
              "status"          => "yes",
              "code"            => "400",
              "message"         => "No response from Keepa #3",
              "isKeyWordResult" => false,
              "asin"            => $asin,
              "response"        => [],
            ];
          }

          //キーワードヒット
          $keySearchFound = true;
          $keyResponses = [];
          $counter = 1;
          foreach($result["products"] as $product) {
            if($counter === 10) {
              break;
            }

            $image = explode(",", $product["imagesCSV"]);

            //３ヶ月平均
            if($product["csv"][3] !== false && $product["csv"][3] !== "" && is_array($product["csv"][3])) {
              //keeperTimeStamp
              date_default_timezone_set('Asia/Tokyo');
              $threeMonthsAgo = new DateTime(date("Y/m/d", strtotime(date("Y/m/d") . "-3 month")), new DateTimeZone('Asia/Tokyo'));
              $dateStop = ($threeMonthsAgo->format('U') / 60000) - 21564000;

              $totalRankingCounted = 0;
              $rankings = 0;
              $loopthrough = false;
              $threeMonthsAverage = "-";
              foreach($product["csv"][3] as $key => $value) {
                if($key % 2 === 0 || $key === 0) {
                  if($value < $dateStop) {
                    $loopthrough = false;
                    continue;
                  } else {
                    $loopthrough = true;
                  }
                }

                if($loopthrough === true && ($key % 3 === 0 || $key === 1)) {
                  $totalRankingCounted = $totalRankingCounted + 1;
                  $rankings = $rankings + $value;
                }
              }

              //平均
              if($ranking > 0 && $totalRankingCounted > 0) {
                $threeMonthsAverage = $rankings / $totalRankingCounted;
              } else {
                $threeMonthsAverage = "-";
              }
            } else {
              $threeMonthsAverage = "-";
            }

            $keyResponses[] = [
              "image"           => ($image[0]) ? $image[0] : "-",
              "name"            => ($product["title"]) ? $product["title"] : "-",
              "averageRanking"  => $threeMonthsAverage,
              "category"        => $product["categoryTree"][0]["name"],
              "asin"            => $product["asin"],
              "manufacturer"    => ($product["manufacturer"]) ? $product["manufacturer"] : "-",
              "model"           => ($product["model"]) ? $product["model"] : "-",
              "search-term"     => $asin,
            ];

            $counter++;
          }
        }
      }

      if($keySearchFound === false && empty($result["products"])) {
        return [
          "status"          => "yes",
          "code"            => "400",
          "message"         => "No response from Keepa #4",
          "isKeyWordResult" => false,
          "asin"            => $asin,
          "response"        => [],
        ];
      }

      if($keySearchFound === true) {
        return [
          "status"          => "yes",
          "code"            => "400",
          "message"         => "Sucessful",
          "isKeyWordResult" => true,
          "asin"            => $asin,
          "response"        => $keyResponses,
        ];
      } else {
        $resp = [];
        foreach($result["products"] as $results) {
          $imgs = explode(",", $results["imagesCSV"]);

          $resp[] = [
            "img"   => $imgs[0],
            "title" => $results["title"],
          ];
        }

        return [
          "status"          => "yes",
          "code"            => "400",
          "message"         => "Sucessful",
          "isKeyWordResult" => false,
          "asin"            => $asin,
          "response"        => $resp,
        ];
      }
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
