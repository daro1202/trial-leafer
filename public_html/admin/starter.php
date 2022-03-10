<?php include_once('./includes/header.php'); ?>
  <body>
    <script>
      var asin = '<?php echo (isset($_POST["asin"]) ? $_POST["asin"] : "B092RNFKXY"); ?>';
      var jsonResult;
    </script>
    <?php
      if(array_key_exists("word", $_GET)) {
        echo('<script>');
          echo('asin = "' . $_GET["word"] . '"');
        echo('</script>');
      }
    ?>
    <main class="main" id="top">
      <div class="container" data-layout="container">
        <script>
          var isFluid = JSON.parse(localStorage.getItem('isFluid'));
          if (isFluid) {
            var container = document.querySelector('[data-layout]');
            container.classList.remove('container');
            container.classList.add('container-fluid');
          }
        </script>
        <?php include_once('./includes/header_nav_common.php'); ?>
        <div class="content">
          <?php include_once('./includes/common_nav.php'); ?>
          <div class="main" id="mainDiv" data-layer="container" style="display:none;">
            <div class="row g-3 mb-3">
              <!-- 画像 -->
              <div class="col-md-6 col-xxl-6">
                <div class="card h-md-100 ecommerce-card-min-width">
                  <div class="card-body h-100">
                    <a id="product-img-a" href="">
                      <img class="img-fluid rounded" id="product-img" src="">
                      <p id="product-name"></p>
                    </a>
                  </div>
                </div>
              </div>
              <!-- 詳細 -->
              <div class="col-md-6 col-xxl-6">
                <div class="card h-md-100 ecommerce-card-min-width">
                  <div class="card-body h-100">
                    <div class="table-responsive scrollbar">
                      <table class="table table-bordered overflow-hidden">
                      <colgroup>
                        <col class="bg-soft-primary" />
                        <col />
                      </colgroup>
                      <thead>
                        <tr class="btn-reveal-trigger">
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="btn-reveal-trigger">
                          <td>カテゴリ</td>
                          <td id="categories"></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td>ランキング</td>
                          <td id="ranking"></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td>ASIN</td>
                          <td><?php echo (isset($_POST["asin"]) ? $_POST["asin"] : "B092RNFKXY"); ?></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td>JAN</td>
                          <td id="janCode"></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td>参考価格</td>
                          <td id="listPricing"></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td>規格番号</td>
                          <td id="partNumber"></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td>メーカー</td>
                          <td id="manufacturer"></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td>発売日</td>
                          <td id="releaseDate"></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td>バリエーション</td>
                          <td id="variations"></td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 損益分岐点 -->
            <div class="mb-3">
              <div class="card h-100">
                <div class="card-header bg-light py-2">
                  <div class="row flex-between-center">
                    <div class="col-auto">
                      <h5 class="mb-0"><b>損益分岐点</b></h5>
                    </div>
                  </div>
                </div>
                <div class="card-body h-100 pe-0">
                  <div class="table-responsive scrollbar">
                    <table class="table table-bordered">
                      <thead class="table-dark">
                        <tr>
                          <th scope="col">コンディション</th>
                          <th scope="col">価格</th>
                          <th scope="col">入金</th>
                          <th scope="col">出品者数</th>
                          <th scope="col">3か月の販売数(販売数/出品者数)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>カート</td>
                          <td id="cartPrice"></td>
                          <td id="paymentFromAmazonCart"></td>
                          <td id="cartSellerTotal">-</td>
                          <td id="cartSoldTotal">-</td>
                        </tr>
                        <tr>
                          <td>新品</td>
                          <td id="newPrice"></td>
                          <td id="paymentFromAmazonNew"></td>
                          <td id="newSellerTotal"></td>
                          <td id="newSoldTotal"></td>
                        </tr>
                        <tr>
                          <td>中古</td>
                          <td id="oldPrice"></td>
                          <td id="paymentFromAmazonOld"></td>
                          <td id="oldSellerTotal"></td>
                          <td id="oldSoldTotal"></td>
                        </tr>
                        <tr>
                          <td>Amazon</td>
                          <td id="amazonPrice"></td>
                          <td id="paymentFromAmazonAmazon"></td>
                          <td id="amazonSellerTotal">-</td>
                          <td id="amazonSoldTotal">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <!-- 期間別価格推移タブ -->
            <div class="mb-3">
              <div class="card h-100">
                <ul id="js-tab" class="list-tab">
                  <li id="oneMonth" data-value="1">１か月</li>
                  <li class="active" id="threeMonth" data-value="3">3か月</li>
                  <li id="sixMonth" data-value="6">6か月</li>
                  <li id="allMonth" data-value="99">全期間</li>
                </ul>
              </div>
            </div>

            <!-- 期間別価格推移 最安値-->
            <div class="mb-3">
              <div class="card h-100">
                <div class="card-header bg-light py-2">
                  <div class="row flex-between-center">
                    <div class="col-auto">
                      <h6 class="mb-0"><b>最安値</b></h6>
                    </div>
                  </div>
                </div>
                <div class="card-body h-100 pe-0">
                  <div class="step-line-chart-lowestPrice" style="min-height: 300px;" data-echart-responsive="true"></div>
                </div>
              </div>
            </div>

            <!-- 期間別価格推移 中古コンディション別価格(送料込み)-->
            <div class="mb-3">
              <div class="card h-100">
                <div class="card-header bg-light py-2">
                  <div class="row flex-between-center">
                    <div class="col-auto">
                      <h6 class="mb-0"><b>中古コンディション別価格(送料込み)</b></h6>
                    </div>
                  </div>
                </div>
                <div class="card-body h-100 pe-0">
                  <div class="echart-stacked-line-chart-oldConditionPrice" style="min-height: 300px;" data-echart-responsive="true"></div>
                </div>
              </div>
            </div>

            <!-- 期間別価格推移 出品者数-->
            <div class="mb-3">
              <div class="card h-100">
                <div class="card-header bg-light py-2">
                  <div class="row flex-between-center">
                    <div class="col-auto">
                      <h6 class="mb-0"><b>出品者数</b></h6>
                    </div>
                  </div>
                </div>
                <div class="card-body h-100 pe-0">
                  <div class="echart-stacked-area-chart-seller" style="min-height: 300px;" data-echart-responsive="true"></div>
                </div>
              </div>
            </div>

            <!-- 期間別価格推移 ランキング-->
            <div class="mb-3">
              <div class="card h-100">
                <div class="card-header bg-light py-2">
                  <div class="row flex-between-center">
                    <div class="col-auto">
                      <h6 class="mb-0"><b>ランキング</b></h6>
                    </div>
                  </div>
                </div>
                <div class="card-body h-100 pe-0">
                  <div class="echart-dynamic-line-chart-ranking" style="min-height: 300px;" data-echart-responsive="true"></div>
                </div>
              </div>
            </div>

            <!-- 期間別価格推移 リーファユーザー-->
            <!--div class="mb-3">
              <div class="card h-100">
                <div class="card-header bg-light py-2">
                  <div class="row flex-between-center">
                    <div class="col-auto">
                      <h6 class="mb-0"><b>リーファユーザー</b></h6>
                    </div>
                  </div>
                </div>
                <div class="card-body h-100 pe-0">
                  <div class="step-line-chart-refers" style="min-height: 300px;" data-echart-responsive="true">
                    リーファユーザーは、keepa APIから取得できません
                  </div>
                </div>
              </div>
            </div-->

            <!-- 期間別価格推移 利益計算-->
            <div class="mb-3">
              <div class="card h-100">
                <div class="card-header bg-light py-2">
                  <div class="row flex-between-center">
                    <div class="col-auto">
                      <h5 class="mb-0"><b>利益計算</b></h5>
                    </div>
                  </div>
                </div>
                <div class="card-body h-100 pe-0">
                  <div class="table-responsive scrollbar">
                    <table class="table">
                    <thead>
                      <tr></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>出品価格</td>
                        <td><input type="text" id="price" value=""></td>
                      </tr>
                      <tr>
                        <td>ポイント</td>
                        <td><input type="text" id="point" value="0"></td>
                      </tr>
                      <tr>
                        <td>出品送料</td>
                        <td><input type="text" id="shipping" value="0"></td>
                      </tr>
                      <tr>
                        <td>仕入値  <div class="form-check"><input class="form-check-input" id="scales" name="scales" type="checkbox" value="" /><label class="form-check-label" for="flexCheckDefault">税込み</label></div></td>
                        <td><input type="text" id="tax-price" value="0"></td>
                      </tr>
                      <tr>
                        <td>
                          <input type="radio" id="fbaDelivery" name="example" value="FBA利用" checked="checked" onClick="setHiddenFbaFees('fbaDelivery')"> FBA利用
                          <input type="radio" id="selfDelivery" name="example" value="自己発送"  onClick="setHiddenFbaFees('selfDelivery')"> 自己発送
                        </td>
                        <td id="fbaFees"></td>
                        <input type="hidden" id="hiddenFbaFees" value="" />
                      </tr>
                      <tr>
                        <td>販売手数料</td>
                        <td id="handdlingFee"></td>
                        <input type="hidden" id="hiddenHanddlingFee" value="" />
                        <input type="hidden" id="hiddenCategoryFees" value="" />
                      </tr>
                    </tbody>
                  </table>
                    <button id="profitCalculate" class="btn btn-primary me-1 mb-1" type="button">利益計算</button>
                </div>
                  <br />
                  <p>粗利(<small>率</small>)　 <b><span id="profitCalculated"></span></b></p>
                </div>
              </div>
            </div>

            <!-- 期間別価格推移 カート取得率-->
            <div class="mb-3">
              <div class="card h-100">
                <div class="accordion" id="accordion">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading1">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                        カート取得率
                      </button>
                    </h2>
                    <div class="accordion-collapse collapse" id="collapse1" aria-labelledby="heading1" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <div class="table-responsive scrollbar">
                          <table id="cartObtainingRate" class="table table-bordered">
                            <thead class="table-dark">
                              <tr>
                                <th scope="col">カート取得率</th>
                                <th scope="col">セラーID</th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 期間別価格推移 Amazon出品者一覧へ-->
            <div class="mb-3">
              <div class="card h-100">
                <div class="d-grid gap-2">
                  <button class="btn btn-falcon-default" type="button" onclick="window.open('https://www.amazon.co.jp/gp/offer-listing/<?php echo (isset($_POST["asin"]) ? $_POST["asin"] : "B092RNFKXY"); ?>', '_blank')">
                    Amazon出品者一覧へ
                  </button>
                </div>
              </div>
            </div>

            <!-- 期間別価格推移 月ごとの販売数-->
            <div class="mb-3">
              <div class="card h-100">
                <div class="card-header bg-light py-2">
                  <div class="row flex-between-center">
                    <div class="col-auto">
                      <h5 class="mb-0"><b>月ごとの販売数</b></h5>
                    </div>
                  </div>
                </div>
                <div class="card-body h-100 pe-0">
                  <div class="table-responsive scrollbar">
                    <table class="table table-bordered">
                      <thead class="table-dark">
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">過去1か月目販売数</th>
                        <th scope="col">過去2か月目販売数</th>
                        <th scope="col">過去3か月目販売数</th>
                        <th scope="col">平均月間販売数</th>
                        <th scope="col">3か月合計販売数</th>
                      </tr>
                    </thead>
                      <tbody>
                      <tr>
                        <td>合計</td>
                        <td id="totalOneMonthSold"></td>
                        <td id="totalTwoMonthSold"></td>
                        <td id="totalThreeMonthSold"></td>
                        <td id="totalSoldTotalMonthlyAverage"></td>
                        <td id="totalSoldTotalMonthly"></td>
                      </tr>
                      <tr>
                        <td>新品</td>
                        <td id="soldNewOneMonths"></td>
                        <td id="soldNewTwoMonths"></td>
                        <td id="soldNewThreeMonths"></td>
                        <td id="newSoldTotalMonthlyAverage"></td>
                        <td id="newSoldTotalMonthly"></td>
                      <tr>
                        <td>中古</td>
                        <td id="soldOldOneMonths"></td>
                        <td id="soldOldTwoMonths"></td>
                        <td id="soldOldThreeMonths"></td>
                        <td id="oldSoldTotalMonthlyAverage"></td>
                        <td id="oldSoldTotalMonthly"></td>
                      </tr>
                    </tbody>
                    </table>
                  </div>
              </div>
              </div>
            </div>

            <!-- 期間別価格推移 最安値一覧-->
            <div class="mb-3">
              <div class="card h-100">
                <div class="accordion" id="accordion2">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading2">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="true" aria-controls="collapse2">
                        最安値一覧
                      </button>
                    </h2>
                    <div class="accordion-collapse collapse" id="collapse2" aria-labelledby="heading2" data-bs-parent="#accordionExample2">
                      <div class="accordion-body">
                        <div class="table-responsive scrollbar">
                          <table id="priceHistory" class="table table-bordered">
                          <thead class="table-dark">
                            <tr>
                              <th scope="col">調査日</th>
                              <th scope="col">ランキング</th>
                              <th scope="col">新品出品者数</th>
                              <th scope="col">新品最安値</th>
                              <th scope="col">中古出品者数</th>
                              <th scope="col">中古最安値</th>
                            </tr>
                          </thead>
                          <tbody>
                          </tbody>
                        </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="main" id="not-found" data-layer="container" style="display:none;">
            <div class="alert alert-info border-2 d-flex align-items-center" role="alert">
              <div class="bg-info me-3 icon-item">
                <span class="far fa-times-circle text-white fs-3"></span>
              </div>
              <p class="mb-0 flex-1" id="api_result_not_found">指定された商品情報が存在しませんでした。</p>
            </div>
          </div>

          <div class="main" id="popup" data-layer="container" style="display:none;">
            <div class="alert alert-info border-2 d-flex align-items-center" role="alert">
              <div class="bg-info me-3 icon-item">
                <span class="fas fa-info-circle text-white fs-3"></span>
              </div>
              <p class="mb-0 flex-1" id="api_result">通信中...</p>
            </div>
          </div>

          <footer class="footer">
            <div class="row g-0 justify-content-between fs--1 mt-4 mb-3">
              <div class="col-12 col-sm-auto text-center">
                <p class="mb-0 text-600"></p>
              </div>
            </div>
          </footer>
        </div>
        <div class="modal fade" id="authentication-modal" tabindex="-1" role="dialog" aria-labelledby="authentication-modal-label" aria-hidden="true">
          <div class="modal-dialog mt-6" role="document">
            <div class="modal-content border-0">
              <div class="modal-header px-5 position-relative modal-shape-header bg-shape">
                <div class="position-relative z-index-1 light">
                  <h5 class="mb-0 text-white" id="authentication-modal-label">Register</h5>
                  <p class="fs--1 mb-0 text-white">Please create your free Falcon account</p>
                </div>
                <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body py-4 px-5">
                <form>
                  <div class="mb-3">
                    <label class="form-label" for="modal-auth-name">Name</label>
                    <input class="form-control" type="text" autocomplete="on" id="modal-auth-name" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="modal-auth-email">Email address</label>
                    <input class="form-control" type="email" autocomplete="on" id="modal-auth-email" />
                  </div>
                  <div class="row gx-2">
                    <div class="mb-3 col-sm-6">
                      <label class="form-label" for="modal-auth-password">Password</label>
                      <input class="form-control" type="password" autocomplete="on" id="modal-auth-password" />
                    </div>
                    <div class="mb-3 col-sm-6">
                      <label class="form-label" for="modal-auth-confirm-password">Confirm Password</label>
                      <input class="form-control" type="password" autocomplete="on" id="modal-auth-confirm-password" />
                    </div>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="modal-auth-register-checkbox" />
                    <label class="form-label" for="modal-auth-register-checkbox">I accept the <a href="#!">terms </a>and <a href="#!">privacy policy</a></label>
                  </div>
                  <div class="mb-3">
                    <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Register</button>
                  </div>
                </form>
                <div class="position-relative mt-5">
                  <hr class="bg-300" />
                  <div class="divider-content-center">or register with</div>
                </div>
                <div class="row g-2 mt-2">
                  <div class="col-sm-6"><a class="btn btn-outline-google-plus btn-sm d-block w-100" href="#"><span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span> google</a></div>
                  <div class="col-sm-6"><a class="btn btn-outline-facebook btn-sm d-block w-100" href="#"><span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span> facebook</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
<?php include_once('./includes/footer.php'); ?>
<script src="../assets/js/leafer.js"></script>
<script src="../vendors/echarts/echarts.min.js"></script>
<script src="../vendors/dayjs/dayjs.min.js"></script>
<script src="../assets/js/keepa.js"></script>
<script src="../assets/js/priceChart.js" type="module"></script>
<script src="../assets/js/sellerChart.js" type="module"></script>
<script src="../assets/js/rankingChart.js" type="module"></script>
<script src="../assets/js/oldConditionPriceChart.js" type="module"></script>
<script type="module">
  import echartsStepLineChartInit from "../assets/js/priceChart.js";
  import oldConditionPriceStackedLineChartInit from "../assets/js/oldConditionPriceChart.js";
  import sellerStackedAreaChartInit from "../assets/js/sellerChart.js";
  import rankingDynamicLineChartInit from "../assets/js/rankingChart.js";

  document.addEventListener('DOMContentLoaded', function(){
    let tabs = document.querySelectorAll('#js-tab li');
    for(let i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', tabSwitch, false);
    }

    function tabSwitch(){
      let tabs = document.querySelectorAll('#js-tab li');
      var node = Array.prototype.slice.call(tabs, 0);
      node.forEach(function (element) {
        element.classList.remove('active');
      });
      this.classList.add('active');

      const arrayTabs = Array.prototype.slice.call(tabs);
      const index = arrayTabs.indexOf(this);

      echartsStepLineChartInit(event.target.dataset.value);
      oldConditionPriceStackedLineChartInit(event.target.dataset.value);
      sellerStackedAreaChartInit(event.target.dataset.value);
      rankingDynamicLineChartInit(event.target.dataset.value);
    };
  });
</script>
<script src="../assets/js/search.js"></script>
<?php
  if(array_key_exists("word", $_GET)) {
    echo('<script>');
      echo('$("#search-text").val("' . $_GET["word"] . '");');
    echo('</script>');
  }
?>
</html>
