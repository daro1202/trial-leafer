var url = "../admin/api/v1/keepaProduct/";
var amazon_image = "https://images-na.ssl-images-amazon.com/images/I/";

//初回表示は３ヶ月
$("#not-found").hide();
$('#mainDiv').hide();
$('#popup').show();
// Ajax通信を開始
$.ajax({
  url:       url + asin,
  type:     'GET',
  dataType: 'json',
  async :   false,
  timeout:  5000,
})
.done(function(data) {
  let responseProduct = data.response;
  let twoMonthsStats = data.twoMonths;
  jsonResult = data.response;

  //商品が存在しない
  if(responseProduct.title === null) {
    $('#popup').hide();
    $("#not-found").show();
    return false;
  }

  //商品名
  if(responseProduct.title !== null) {
      $("#product-name").text(responseProduct.title);
  }

  //商品画像
  if(responseProduct.imagesCSV !== null) {
    let imgCsv = responseProduct.imagesCSV.split(',');
    let src =  amazon_image + imgCsv[0];
    $("#product-img").attr('src', src);
    $("#product-img-a").attr("href", "https://www.amazon.co.jp/gp/product/" + asin);
  }

  //カテゴリー
  if(responseProduct.categoryTree !== null) {
    let categoryTree = responseProduct.categoryTree;
    let categories = [];
    $.each(categoryTree, function(index, value) {
      categories.push(value.name);
    });
    categories = categories.join(' > ');

    if(responseProduct.salesRanks !== null) {
      let salesRanks = responseProduct.salesRanks;

      let ranking = "";
      if(responseProduct.categories[0] in salesRanks) {
        ranking = "(" + salesRanks[responseProduct.categories[0]].slice(-1)[0] + "位)";
      }

      $("#categories").text(categories + ranking);
    }
  }

  //ランキング
  if(responseProduct.categoryTree !== null) {
    let rootRanking;
    if(responseProduct.csv[3] !== null) {
      rootRanking = responseProduct.csv[3].slice(-1)[0];
    } else {
      rootRanking = "-";
    }
    let salesRankReference = responseProduct.salesRankReference;
    let category = "";
    $.each(responseProduct.categoryTree, function(index, value) {
      if(value.catId == salesRankReference) {
        category = value.name;
        return false;
      }
    });

    if(rootRanking !== -1) {
      if (category === "") {
        category = responseProduct.categoryTree[0].name;
      }
      $("#ranking").text(rootRanking + "位(" + category + ")");
    }
  }

  //Janコード
  if(responseProduct.eanList !== null) {
    let JAN = responseProduct.eanList[0];
    $("#janCode").text(JAN);
  }


  //参考価格 amazonの一番古い値段を取得
  let listPricing;
  if(responseProduct.csv[0] !== null) {
    $.each(responseProduct.csv[0], function(index, value) {
      if(index % 2 === 0 ) {
        return true;
      }

      if(value == -1) {
        return true;
      }

      listPricing = value;
      return false;
    });

    if(listPricing !== undefined) {
      $("#listPricing").text(listPricing + "円");
    }

  }

  //規格番号
  if(responseProduct.partNumber !== null) {
    let partNumber = responseProduct.partNumber;
    $("#partNumber").text(partNumber);
  }

  //メーカー
  if(responseProduct.manufacturer !== null) {
    let maker = responseProduct.manufacturer;
    $("#manufacturer").text(maker);
  }

  //販売日
  if(responseProduct.releaseDate !== null && responseProduct.releaseDate !== undefined && responseProduct.releaseDate != '-1'  && responseProduct.releaseDate != -1) {
    let releaseDate = String(responseProduct.releaseDate);
    let rDate = releaseDate.substr(0, 4) + '/' + releaseDate.substr(4, 2) + '/' + releaseDate.substr(6, 2);
    $("#releaseDate").text(rDate);
  }

  //バリエーじょん
  let variations = [];
  if(responseProduct.variations != null && responseProduct.variations != "undefined" && responseProduct.variations != "") {
    $.each(responseProduct.variations, function(index, value) {
      variations.push(value.asin);
    });
  } else {
    variations.push("なし");
  }

  variations = variations.join(' , ');
  $("#variations").text(variations);

  //損益分岐点
  //価格
  let cartPrice = 0;
  if(responseProduct.stats.buyBoxPrice !== null) {
    cartPrice = responseProduct.stats.buyBoxPrice;
    if(Number(responseProduct.stats.buyBoxPrice) !== 0) {
      //カート情報 = buyBoxSellerIdHistory
      cartPrice = responseProduct.stats.buyBoxShipping + cartPrice;
      if(isNaN(cartPrice) === false && cartPrice >= 0) {
        $("#cartPrice").text("￥" + cartPrice);
        $("#price").val(cartPrice);
      } else {
        $("#cartPrice").text("-");
        $("#price").val(responseProduct.csv[1].slice(-1)[0]);
      }
    } else {
      $("#cartPrice").text("-");
      $("#price").val(responseProduct.csv[1].slice(-1)[0]);
    }
  } else {
    $("#cartPrice").text("-");
    $("#price").val(responseProduct.csv[1].slice(-1)[0]);
  }

  let newPrice = "-";
  let oldPrice = "-";
  let amazonPrice = "-";
  if(responseProduct.csv !== null) {
    if(responseProduct.csv.length) {
      newPrice = responseProduct.csv[1].slice(-1)[0];
      if(newPrice != -1) {
          $("#newPrice").text("￥" + newPrice);
      } else {
        $("#newPrice").text("-");
      }

      oldPrice = responseProduct.csv[2].slice(-1)[0];
      if(oldPrice != -1) {
        $("#oldPrice").text("￥" + oldPrice);
      } else {
        $("#oldPrice").text("-");
      }

      amazonPrice = responseProduct.csv[0].slice(-1)[0];

      if(amazonPrice != -1) {
        $("#amazonPrice").text("￥" + amazonPrice);
      } else {
        $("#amazonPrice").text("-");
      }
    } else {
      $("#newPrice").text(newPrice);
      $("#oldPrice").text(oldPrice);
      $("#amazonPrice").text(amazonPrice);
    }
  } else {
    $("#newPrice").text(newPrice);
    $("#oldPrice").text(oldPrice);
    $("#amazonPrice").text(amazonPrice);
  }

  //fba
  if(responseProduct.fbaFees !== null) {
    $("#fbaFees").text(responseProduct.fbaFees.pickAndPackFee);
    $("#hiddenFbaFees").val(responseProduct.fbaFees.pickAndPackFee);
  }

  //入金
  let handlingFee = 0.1;
  let salesFee = 30;
  let isInCategory = false;

  if (cartPrice < 0) {
    cartPrice = newPrice;
  }

  //https://sellercentral.amazon.co.jp/gp/help/external/G200336920?language=ja_JP
  let array;
  if(responseProduct.categoryTree !== null) {
    //計算用カテゴリーを取得
    let categoryTreeTop;
    categoryTreeTop = responseProduct.categoryTree[0].name;

    array = ["本","CD","レコード","DVD", "ビデオ", "TVゲーム", "PCソフト"];
    if(array.includes(categoryTreeTop) === true) {
      handlingFee = 0.15;
      isInCategory = true;
      if(cartPrice != "-") {
        salesFee = handlingFee * cartPrice;
      }
    }

    array = ["エレクトロニクス", "カメラ", "パソコン・周辺機器", "家電＆カメラ", "大型家電", "DIY・工具", "産業・研究開発用品"];
    if(array.includes(categoryTreeTop) === true) {
      handlingFee = 0.08;
      isInCategory = true;
      if(cartPrice != "-") {
        if ((handlingFee * cartPrice) > 30) {
          salesFee = handlingFee * cartPrice;
        }
      }
    }

    array = ['（エレクトロニクス、カメラ、パソコン）付属品','(エレクトロニクス、カメラ、パソコン)付属品'];
    if(array.includes(categoryTreeTop) === true) {
      handlingFee = 0.1;
      isInCategory = true;
      if(cartPrice != "-") {
        if ((handlingFee * cartPrice) > 30) {
          salesFee = handlingFee * cartPrice;
        }
      }
    }

    array = ["Amazonデバイス用アクセサリ"];
    if(array.includes(categoryTreeTop) === true) {
      handlingFee = 0.45;
      isInCategory = true;
      if(cartPrice != "-") {
        if ((handlingFee * cartPrice) > 30) {
          salesFee = handlingFee * cartPrice;
        }
      }
    }

    array = ["楽器", "スポーツ&アウトドア", "カー&バイク用品", "ホビー", "おもちゃ&ホビー", "スポーツ＆アウトドア", "カー＆バイク用品", "おもちゃ＆ホビー"];
    if(array.includes(categoryTreeTop) === true) {
      handlingFee = 0.1;
      isInCategory = true;
      if(cartPrice != "-") {
        if ((handlingFee * cartPrice) > 30) {
          salesFee = handlingFee * cartPrice;
        }
      }
    }

    array = ["ドラッグストア", "ビューティ"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      if(cartPrice != "-") {
        if(cartPrice <= 1500) {
          handlingFee = 0.08;
        }

        if ((handlingFee * cartPrice) > 30) {
          salesFee = handlingFee * cartPrice;
        }
      }
    }

    array = ["ペット用品", "ベビー&マタニティ", "ベビー＆マタニティ"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      if(cartPrice != "-") {
        if(cartPrice <= 1500) {
          handlingFee = 0.08;
        } else {
          handlingFee = 0.15;
        }

        if ((handlingFee * cartPrice) > 30) {
          salesFee = handlingFee * cartPrice;
        }
      }
    }

    array = ["文房具・オフィス用品", "ホーム（インテリア・キッチン）", "ホーム&キッチン", "ホーム＆キッチン", "ホーム(インテリア・キッチン)"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      handlingFee = 0.15;

      let isElectronicSubCat = false;
      $.each(responseProduct.categoryTree, function(index, value) {
        if("家電" === value.name) {
          handlingFee = 0.1;
          return true;
        }
      });

      if(cartPrice != "-") {
        if ((handlingFee * cartPrice) > 30) {
          salesFee = handlingFee * cartPrice;
        }
      }
    }

    array = ["ホーム（家具）"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      if(cartPrice != "-") {
        if(cartPrice <= 20000) {
          handlingFee = 0.15;
        }

        if ((handlingFee * cartPrice) > 30) {
          salesFee = handlingFee * cartPrice;
        }
      }
    }

    array = ["ホームアプライアンス"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      handlingFee = 0.15;
      if(cartPrice != "-") {
        if ((handlingFee * cartPrice) > 30) {
          salesFee = handlingFee * cartPrice;
        }
      }
    }

    array = ["食品&飲料", "食品＆飲料"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      if(cartPrice != "-") {
        if(cartPrice <= 1500) {
          handlingFee = 0.08;
        }

        salesFee = handlingFee * cartPrice;
      }
    }

    array = ["腕時計" || $catName == "ジュエリー"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      if(cartPrice != "-") {
        if(cartPrice <= 10000) {
          handlingFee = 0.05;
        }

        if ((handlingFee * cartPrice) > 30) {
          salesFee = handlingFee * cartPrice;
        }
      }
    }

    array = ["服&ファッション小物", "服＆ファッション小物"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      if(cartPrice != "-") {
        if(cartPrice <= 3000) {
          handlingFee = 0.15;
        } else {
          handlingFee = 0.08;
        }

        if ((handlingFee * cartPrice) > 30) {
          salesFee = handlingFee * cartPrice;
        }
      }
    }

    array = ["シューズ&バッグ", "シューズ＆バッグ"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      if(cartPrice != "-") {
        if(cartPrice <= 7500) {
          handlingFee = 0.15;
        } else {
          handlingFee = 0.05;
        }

        if ((handlingFee * cartPrice) > 30) {
          salesFee = handlingFee * cartPrice;
        }
      }
    }

    //カテゴリー
    $("#hiddenCategoryFees").val(categoryTreeTop);
  }

  if (isInCategory === false) {
    if(cartPrice != "-") {
      salesFee = cartPrice * 0.1;
    }
  }

  //販売手数料
  $("#handdlingFee").text(salesFee.toFixed(0));
  $("#hiddenHanddlingFee").val(handlingFee);


  //成約料は、小口として計算
  let contractFee = 100;

  //FBAコスト
  let fbaFee;
  if(responseProduct.fbaFees !== null) {
    fbaFee = Number(responseProduct.fbaFees.pickAndPackFee);
  } else {
    fbaFee = 0;
  }

  //計算
  let paymentFromAmazonCar;
  if(cartPrice != "-") {
    paymentFromAmazonCart = cartPrice - salesFee - contractFee - fbaFee;

    if(isNaN(paymentFromAmazonCart) === false && paymentFromAmazonCart >= 0) {
      $("#paymentFromAmazonCart").text("¥" + paymentFromAmazonCart.toFixed(0));
    } else {
      paymentFromAmazonCart = "-";
      $("#paymentFromAmazonCart").text(paymentFromAmazonCart);
    }
  } else {
    paymentFromAmazonCart = "-";
    $("#paymentFromAmazonCart").text(paymentFromAmazonCart);
  }

  let paymentFromAmazonNew;
  if(newPrice != "-") {
    paymentFromAmazonNew = newPrice  - (newPrice * handlingFee) - contractFee - fbaFee;

    if(isNaN(paymentFromAmazonNew) === false && paymentFromAmazonNew >= 0) {
      $("#paymentFromAmazonNew").text("¥" + paymentFromAmazonNew.toFixed(0));
    } else {
      paymentFromAmazonNew = "-";
      $("#paymentFromAmazonNew").text(paymentFromAmazonNew);
    }
  } else {
    paymentFromAmazonNew = "-";
    $("#paymentFromAmazonNew").text(paymentFromAmazonNew);
  }

  let paymentFromAmazonOld;
  if(oldPrice != "-") {
    paymentFromAmazonOld = oldPrice  - (oldPrice * handlingFee) - contractFee - fbaFee;

    if(isNaN(paymentFromAmazonOld) === false && paymentFromAmazonOld >= 0) {
      $("#paymentFromAmazonOld").text("¥" + paymentFromAmazonOld.toFixed(0));
    } else {
      paymentFromAmazonOld = "-";
      $("#paymentFromAmazonOld").text(paymentFromAmazonOld);
    }
  } else {
    paymentFromAmazonOld = "-";
    $("#paymentFromAmazonOld").text(paymentFromAmazonOld);
  }

  let paymentFromAmazonAmazon;
  if(amazonPrice != "-") {
    paymentFromAmazonAmazon = amazonPrice - (amazonPrice * handlingFee) - contractFee - fbaFee;

    if(isNaN(paymentFromAmazonAmazon) === false && paymentFromAmazonAmazon >= 0) {
      $("#paymentFromAmazonAmazon").text("¥" + paymentFromAmazonAmazon.toFixed(0));
    } else {
      paymentFromAmazonAmazon = "-";
      $("#paymentFromAmazonAmazon").text(paymentFromAmazonAmazon);
    }
  } else {
    paymentFromAmazonAmazon = "-";
    $("#paymentFromAmazonAmazon").text(paymentFromAmazonAmazon);
  }

  //出品者数
  let newSellers = 0;
  let oldSellers = 0;
  if (responseProduct.csv[11] !== null) {
    if(responseProduct.csv[11].length) {
      newSellers = responseProduct.csv[11][responseProduct.csv[11].length-1];
      if(newSellers != -1) {
        $('#newSellerTotal').text(newSellers);
      } else {
        $('#newSellerTotal').text('-');
      }
    } else {
      $('#newSellerTotal').text('-');
    }
  } else {
    $('#newSellerTotal').text('-');
  }

  if(responseProduct.csv[12] !== null) {
    if(responseProduct.csv[12].length) {
      oldSellers = responseProduct.csv[12][responseProduct.csv[12].length-1];
      if(oldSellers != -1) {
        $('#oldSellerTotal').text(oldSellers);
      } else {
        $('#oldSellerTotal').text("-");
      }
    } else {
      $('#oldSellerTotal').text('-');
    }
  } else {
    $('#oldSellerTotal').text('-');
  }

  //3か月の販売数(販売数/出品者数)
  //中古
  let totalOld = 0;
  let dt;

  //販売個数
  let soldAmontTotal = 0;
  let previousRanking = 0;

  //３ヶ月
  let now = new Date();
  now = now.setMonth(now.getMonth() - 3);
  let nowStopDate = new Date(now);
  nowStopDate = (nowStopDate.getTime() / 60000) - 21564000;

  if(responseProduct.csv[3] !== null) {
    let loopthrough = false;
    $.each(responseProduct.csv[3], function(key, value) {
      if(key % 2 === 0 || key === 0) {
        if(value < nowStopDate) {
          loopthrough = false;
          return true;
        } else {
          loopthrough = true;
        }
      }

      if(loopthrough === true && (key % 3 === 0 || key === 1)) {
        if(key === 1) {
          previousRanking = value;
        }

        if(key !== 1 && previousRanking > value) {
          soldAmontTotal = soldAmontTotal + 1;
          previousRanking = value;
        } else if(key !== 1 && previousRanking < value) {
          previousRanking = value;
        }
      }
    });
  }

  //2ヶ月
  //販売個数
  let twosoldAmontTotal = 0;
  let twopreviousRanking = 0;
  let twoNow = new Date();
  twoNow = twoNow.setMonth(twoNow.getMonth() - 2);
  let twoNowStopDate = new Date(twoNow);
  twoNowStopDate = (twoNowStopDate.getTime() / 60000) - 21564000;

  if(responseProduct.csv[3] !== null) {
    let twoloopthrough = false;
    $.each(responseProduct.csv[3], function(key, value) {
      if(key % 2 === 0 || key === 0) {
        if(value < twoNowStopDate) {
          twoloopthrough = false;
          return true;
        } else {
          twoloopthrough = true;
        }
      }

      if(twoloopthrough === true && (key % 3 === 0 || key === 1)) {
        if(key === 1) {
          twopreviousRanking = value;
        }

        if(key !== 1 && twopreviousRanking > value) {
          twosoldAmontTotal = twosoldAmontTotal + 1;
          twopreviousRanking = value;
        } else if(key !== 1 && twopreviousRanking < value) {
          twopreviousRanking = value;
        }
      }
    });
  }

  //1ヶ月
  //販売個数
  let onesoldAmontTotal = 0;
  let onepreviousRanking = 0;
  let oneNow = new Date();
  oneNow = oneNow.setMonth(oneNow.getMonth() - 1);
  let oneNowStopDate = new Date(oneNow);
  oneNowStopDate = (oneNowStopDate.getTime() / 60000) - 21564000;

  if(responseProduct.csv[3] !== null) {
    let oneloopthrough = false;
    $.each(responseProduct.csv[3], function(key, value) {
      if(key % 2 === 0 || key === 0) {
        if(value < oneNowStopDate) {
          oneloopthrough = false;
          return true;
        } else {
          oneloopthrough = true;
        }
      }

      if(oneloopthrough === true && (key % 3 === 0 || key === 1)) {
        if(key === 1) {
          onepreviousRanking = value;
        }

        if(key !== 1 && onepreviousRanking > value) {
          onesoldAmontTotal = onesoldAmontTotal + 1;
          onepreviousRanking = value;
        } else if(key !== 1 && onepreviousRanking < value) {
          onepreviousRanking = value;
        }
      }
    });
  }

  //新品 ３ヶ月
  if (soldAmontTotal > 0 && newSellers > 0) {
    let threeMonthsNewSt = soldAmontTotal / newSellers;
    $('#newSoldTotal').text(String(soldAmontTotal) + "個(" + String(threeMonthsNewSt.toFixed(1)) + ")");
    $('#soldNewThreeMonths').text(soldAmontTotal);
  } else {
    $('#newSoldTotal').text('-');
    $('#soldNewThreeMonths').text('-');
  }

  //新品 2ヶ月
  if (twosoldAmontTotal > 0 && newSellers > 0) {
    $('#soldNewTwoMonths').text(twosoldAmontTotal.toFixed());
  } else {
    $('#soldNewTwoMonths').text('-');
  }

  //新品 1ヶ月
  if (onesoldAmontTotal > 0 && newSellers > 0) {
    $('#soldNewOneMonths').text(onesoldAmontTotal.toFixed());
  } else {
    $('#soldNewOneMonths').text('-');
  }

  //中古 ３ヶ月
  let threeMonthsOld = 0;
  if(responseProduct.stats.avg90[12] !== -1) {
    threeMonthsOld = responseProduct.stats.avg90[12];

    if(threeMonthsOld >= 1) {
      threeMonthsOldSt = threeMonthsOld / oldSellers;
      $('#oldSoldTotal').text(String(threeMonthsOld) + "個(" + String(threeMonthsOldSt.toFixed(1)) + ")");
      $('#soldOldThreeMonths').text(threeMonthsOld.toFixed());
    } else {
      $('#oldSoldTotal').text('-');
      $('#soldOldThreeMonths').text('-');
    }
  } else {
    $('#oldSoldTotal').text('-');
    $('#soldOldThreeMonths').text('-');
  }

  //2ヶ月
  let twoMonthsOld = 0;
  if(twoMonthsStats[12] !== -1 && twoMonthsStats[12] >= 1) {
    twoMonthsOld = twoMonthsStats[12];
    $('#soldOldTwoMonths').text(twoMonthsOld.toFixed());
  } else {
    $('#soldOldTwoMonths').text('-');
  }

  //1ヶ月
  let oneMonthsOld = 0;
  if(responseProduct.stats.avg30[12] !== -1 && responseProduct.stats.avg30[12] >= 1) {
    oneMonthsOld = responseProduct.stats.avg30[12];
    $('#soldOldOneMonths').text(oneMonthsOld.toFixed());
  } else {
    $('#soldOldOneMonths').text('-');
  }

  //新品　総合
  let totalNew = onesoldAmontTotal + twosoldAmontTotal + soldAmontTotal;
  if(totalNew > 0) {
    $('#newSoldTotalMonthly').text(totalNew);
    $('#newSoldTotalMonthlyAverage').text(String((totalNew / 3).toFixed(1)));
  } else {
    $('#newSoldTotalMonthly').text('-');
    $('#newSoldTotalMonthlyAverage').text('-');
  }

  //中古　総合
  totalOld = oneMonthsOld + twoMonthsOld + threeMonthsOld;
  if(totalOld > 0) {
    $('#oldSoldTotalMonthly').text(totalOld);
    $('#oldSoldTotalMonthlyAverage').text(String((totalOld / 3).toFixed(1)));
  } else {
    $('#oldSoldTotalMonthly').text('-');
    $('#oldSoldTotalMonthlyAverage').text('-');
  }

  //月ごとの販売数 合計
  let soldTotalOneMonth = oneMonthsOld + onesoldAmontTotal;
  if(soldTotalOneMonth > 0) {
    $('#totalOneMonthSold').text(soldTotalOneMonth);
  } else {
    $('#totalOneMonthSold').text('-');
  }

  let soldTotalTwoMonth = twoMonthsOld + twosoldAmontTotal;
  if(soldTotalTwoMonth > 0) {
    $('#totalTwoMonthSold').text(soldTotalTwoMonth);
  } else {
    $('#totalTwoMonthSold').text('-');
  }

  let soldTotalThreeMonth = threeMonthsOld + soldAmontTotal;
  if(soldTotalThreeMonth > 0) {
    $('#totalThreeMonthSold').text(soldTotalThreeMonth);
  } else {
    $('#totalThreeMonthSold').text('-');
  }

  let totalMonthly = totalOld + totalNew;
  if(totalMonthly) {
    $('#totalSoldTotalMonthly').text(totalMonthly);
  } else {
    $('#totalSoldTotalMonthly').text('-');
  }

  let totalMonthlyAverage = totalMonthly / 3;
  if(totalMonthlyAverage > -1) {
    $('#totalSoldTotalMonthlyAverage').text(totalMonthlyAverage.toFixed(1));
  } else {
    $('#totalSoldTotalMonthlyAverage').text('-');
  }

  //カート取得率
  let sellers = [];
  $.each(responseProduct.buyBoxSellerIdHistory, function(index, value) {
    if(index % 2 === 0) {
      return true;
    }

    if(value === "-1" || value === "-2") {
      return true;
    }

    sellers.push(value);
  });

  let count = {};
  for (let i = 0; i < sellers.length; i++) {
    var elm = sellers[i];
    count[elm] = (count[elm] || 0) + 1;
  }

  let sellersArray = Object.keys(count).map((k)=>({ key: k, value: count[k] }));
  sellersArray.sort((a, b) => b.value - a.value);

  //３ヶ月でストップする用にする
  let threenow = new Date();
  threenow = threenow.setMonth(threenow.getMonth() - 3);
  let nowThreeMonthAgo = new Date(threenow);
  nowThreeMonthAgo = (nowThreeMonthAgo.getTime() / 60000) - 21564000;

  let table = document.getElementById('cartObtainingRate');
  let tbodyElem = table.createTBody();
  $.each(sellersArray, function(key, value) {
    // 出現回数 / トータル
    let obtainRate = ((100 * value.value) / (responseProduct.buyBoxSellerIdHistory.length / 2)).toFixed(1);
    let newRow = tbodyElem.insertRow();
    let newCell = newRow.insertCell();
    let newText = document.createTextNode(String(obtainRate) + "%");
    newCell.appendChild(newText);

    newCell = newRow.insertCell();
    newText = document.createTextNode(value.key);
    newCell.appendChild(newText);
  });

  //timestampソートを行う
  let timeStampSort = [];
  if(responseProduct.csv[3] !== null) {
    $.each(responseProduct.csv[3], function(key, value) {
      if(key % 2 === 0 || String(key) === "0") {
        if(value < nowThreeMonthAgo) {
          return true;
        }

        timeStampSort.push(value);
      }
    });
  }

  //新しい日付順に直す
  timeStampSort.sort((a, b) => b - a);

  // ランキング (最安値一覧)
  let rankingLenghtCount = 0;
  if(responseProduct.csv[3] !== null) {
    rankingLenghtCount = responseProduct.csv[3].length - 1;
  }

  //新品出品者数 (最安値一覧)
  let countNewLenghtCount = 0;
  if(responseProduct.csv[1] !== null) {
    countNewLenghtCount = responseProduct.csv[1].length - 1;
  }

  //新品最安値 (最安値一覧)
  let priceNewLenghtCount = 0;
  if(responseProduct.csv[11] !== null) {
    priceNewLenghtCount = responseProduct.csv[11].length - 1;
  }

  //新品出品者数 (最安値一覧)
  let countOldLenghtCount = 0;
  if(responseProduct.csv[2] !== null) {
    countOldLenghtCount = responseProduct.csv[2].length - 1;
  }

  //新品最安値 (最安値一覧)
  let priceOldLenghtCount = 0;
  if(responseProduct.csv[12] !== null) {
    priceOldLenghtCount = responseProduct.csv[12].length - 1;
  }

  //最安値一覧
  let priceHistory = [];
  let countNew, priceNew, countOld, priceOld, priceRanking;
  $.each(timeStampSort, function(keystamp, valuestamp) {
    if(responseProduct.csv[3][rankingLenghtCount] === undefined) {
      priceRanking = "-";
    } else {
      if(responseProduct.csv[3][rankingLenghtCount] !== -1 && responseProduct.csv[3][rankingLenghtCount] !== "-1") {
        priceRanking = responseProduct.csv[3][rankingLenghtCount];
      } else {
        priceRanking = "-";
      }
    }
    rankingLenghtCount = rankingLenghtCount - 2;

    if(responseProduct.csv[1][countNewLenghtCount] === undefined) {
      countNew = "-";
    } else {
      if(responseProduct.csv[1][countNewLenghtCount] !== -1 && responseProduct.csv[1][countNewLenghtCount] !== "-1") {
        countNew = responseProduct.csv[1][countNewLenghtCount];
      } else {
        countNew = "-";
      }
    }
    countNewLenghtCount = countNewLenghtCount - 2;

    if(responseProduct.csv[11][priceNewLenghtCount] === undefined) {
      priceNew = "-";
    } else {
      if(responseProduct.csv[11][priceNewLenghtCount] !== -1 && responseProduct.csv[11][priceNewLenghtCount] !== "-1") {
        priceNew = responseProduct.csv[11][priceNewLenghtCount];
      } else {
        priceNew = "-";
      }
    }
    priceNewLenghtCount = priceNewLenghtCount - 2;

    if(responseProduct.csv[2][countOldLenghtCount] === undefined) {
      countOld = "-";
    } else {
      if(responseProduct.csv[2][countOldLenghtCount] !== -1 && responseProduct.csv[2][countOldLenghtCount] !== "-1") {
        countOld = responseProduct.csv[2][countOldLenghtCount];
      } else {
        countOld = "-";
      }
    }
    countOldLenghtCount - countOldLenghtCount - 2;

    if(responseProduct.csv[12] !== null) {
      if(responseProduct.csv[12][priceOldLenghtCount] === undefined) {
        priceOld = "-";
      } else {
        if(responseProduct.csv[12][priceOldLenghtCount] !== -1 && responseProduct.csv[12][priceOldLenghtCount] !== "-1") {
          priceOld = responseProduct.csv[12][priceOldLenghtCount];
        } else {
          priceOld = "-";
        }
      }
    } else {
      priceOld = "-";
    }

    priceOldLenghtCount = priceOldLenghtCount - 2;

    let temValue = {
      "timestamp" : valuestamp,
      "ranking"   : priceRanking,
      "countNew"  : countNew,
      "priceNew"  : priceNew,
      "countOld"  : countOld,
      "priceOld"  : priceOld
    };

    priceHistory.push(temValue);
  });

  let priceTable = document.getElementById('priceHistory');
  let priceTabletbodyElem = priceTable .createTBody();
  $.each(priceHistory, function(key, value) {
    //調査日
    let keeperTimeStamp = 60000 * (value.timestamp + 21564000);
    let dateTime = new Date(keeperTimeStamp);
    let obtainDate = document.createTextNode((dateTime.getMonth() + 1).toString().padStart(2, '0') + "/" + dateTime.getDate().toString().padStart(2, '0') + " " + dateTime.getHours().toString().padStart(2, '0') + ":" + dateTime.getMinutes().toString().padStart(2, '0'));

    let newPriceRow = priceTabletbodyElem.insertRow();
    let newPriceCell = newPriceRow.insertCell();
    newPriceCell.appendChild(obtainDate);

    //ランキング
    newPriceCell = newPriceRow.insertCell();
    newPriceRankingText = document.createTextNode(value.ranking);
    newPriceCell.appendChild(newPriceRankingText);

    //新品出品者数
    newPriceCell = newPriceRow.insertCell();
    newPriceNewMinText = document.createTextNode(value.priceNew);
    newPriceCell.appendChild(newPriceNewMinText);

    //新品最安値
    newPriceCell = newPriceRow.insertCell();
    newPriceNewText = document.createTextNode(value.countNew);
    newPriceCell.appendChild(newPriceNewText);

    //中古出品者数
    newPriceCell = newPriceRow.insertCell();
    newPriceOldMinText = document.createTextNode(value.priceOld);
    newPriceCell.appendChild(newPriceOldMinText);

    //中古最安値
    newPriceCell = newPriceRow.insertCell();
    newPriceOldText = document.createTextNode(value.countOld);
    newPriceCell.appendChild(newPriceOldText);
  });

  //画面表示
  $('#popup').hide();
  $("#not-found").hide();
  $('#mainDiv').show();
})
.fail(function(jqXHR, textStatus, errorThrown) {
  $('#api_result').text('データ取得に失敗しました');
  console.log(jqXHR.responseText);
});
