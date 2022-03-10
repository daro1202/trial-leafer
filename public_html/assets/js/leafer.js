function setHiddenFbaFees(deliveryType) {
  if(deliveryType === "fbaDelivery") {
    let cost = $("#hiddenFbaFees").val();
    $("#fbaFees").text(cost);
  } else {
    $("#fbaFees").text(0);
  }
}

//グラフを変更
document.getElementsByClassName("tab-switch").onclick = function() {
  var tabs = document.TAB;
  let selectedValue;
  for(var i = 0; i < tabs.length; i++){
    if(tabs[ i ].checked) {
      selectedValue = tabs[ i ].value;
      break;
    }
  }
};

//期間別価格推移 利益計算
document.getElementById("profitCalculate").onclick = function() {
  let price = $("#price").val();

  //仕入値
  let scalesChecked = document.getElementById('scales');
  let scalesPrice = $("#tax-price").val();
  if(scalesChecked.checked) {
    scalesPrice = scalesPrice * 1.1;
    scalesPrice = scalesPrice.toFixed(0);
  }

  //出品送料
  let listingShipping = $("#shipping").val();

  //ポイント
  let point = $("#point").val();

  //fba
  let delivery = $("#fbaFees").text();

  let handlingFee = 0.1;
  let salesFee = 30;
  let isInCategory = false;

  //https://sellercentral.amazon.co.jp/gp/help/external/G200336920?language=ja_JP
  let array;
  //計算用カテゴリーを取得
  let categoryTreeTop;
  categoryTreeTop = $("#hiddenCategoryFees").val();
  if(categoryTreeTop !== null && categoryTreeTop !== "") {
    array = ["本","CD","レコード","DVD", "ビデオ", "TVゲーム", "PCソフト"];
    if(array.includes(categoryTreeTop) === true) {
      handlingFee = 0.15;
      isInCategory = true;
      if(price != "-") {
        salesFee = handlingFee * price;
      }
    }

    array = ["エレクトロニクス", "カメラ", "パソコン・周辺機器", "家電＆カメラ", "大型家電", "DIY・工具", "産業・研究開発用品"];
    if(array.includes(categoryTreeTop) === true) {
      handlingFee = 0.08;
      isInCategory = true;
      if(price != "-") {
        if ((handlingFee * price) > 30) {
          salesFee = handlingFee * price;
        }
      }
    }

    array = ['（エレクトロニクス、カメラ、パソコン）付属品','(エレクトロニクス、カメラ、パソコン)付属品'];
    if(array.includes(categoryTreeTop) === true) {
      handlingFee = 0.1;
      isInCategory = true;
      if(price != "-") {
        if ((handlingFee * price) > 30) {
          salesFee = handlingFee * price;
        }
      }
    }

    array = ["Amazonデバイス用アクセサリ"];
    if(array.includes(categoryTreeTop) === true) {
      handlingFee = 0.45;
      isInCategory = true;
      if(price != "-") {
        if ((handlingFee * price) > 30) {
          salesFee = handlingFee * price;
        }
      }
    }

    array = ["楽器", "スポーツ&アウトドア", "カー&バイク用品", "ホビー", "おもちゃ&ホビー", "スポーツ＆アウトドア", "カー＆バイク用品", "おもちゃ＆ホビー"];
    if(array.includes(categoryTreeTop) === true) {
      handlingFee = 0.1;
      isInCategory = true;
      if(price != "-") {
        if ((handlingFee * price) > 30) {
          salesFee = handlingFee * price;
        }
      }
    }

    array = ["ドラッグストア", "ビューティ"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      if(price != "-") {
        if(price <= 1500) {
          handlingFee = 0.08;
        }

        if ((handlingFee * price) > 30) {
          salesFee = handlingFee * price;
        }
      }
    }

    array = ["ペット用品", "ベビー&マタニティ", "ベビー＆マタニティ"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      if(price != "-") {
        if(price <= 1500) {
          handlingFee = 0.08;
        } else {
          handlingFee = 0.15;
        }

        if ((handlingFee * price) > 30) {
          salesFee = handlingFee * price;
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

      if(price != "-") {
        if ((handlingFee * price) > 30) {
          salesFee = handlingFee * price;
        }
      }
    }

    array = ["ホーム（家具）"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      if(price != "-") {
        if(price <= 20000) {
          handlingFee = 0.15;
        }

        if ((handlingFee * price) > 30) {
          salesFee = handlingFee * price;
        }
      }
    }

    array = ["ホームアプライアンス"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      handlingFee = 0.15;
      if(price != "-") {
        if ((handlingFee * price) > 30) {
          salesFee = handlingFee * price;
        }
      }
    }

    array = ["食品&飲料", "食品＆飲料"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      if(price != "-") {
        if(price <= 1500) {
          handlingFee = 0.08;
        }

        salesFee = handlingFee * price;
      }
    }

    array = ["腕時計" || $catName == "ジュエリー"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      if(price != "-") {
        if(price <= 10000) {
          handlingFee = 0.05;
        }

        if ((handlingFee * price) > 30) {
          salesFee = handlingFee * price;
        }
      }
    }

    array = ["服&ファッション小物", "服＆ファッション小物"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      if(price != "-") {
        if(price <= 3000) {
          handlingFee = 0.15;
        } else {
          handlingFee = 0.08;
        }

        if ((handlingFee * price) > 30) {
          salesFee = handlingFee * price;
        }
      }
    }

    array = ["シューズ&バッグ", "シューズ＆バッグ"];
    if(array.includes(categoryTreeTop) === true) {
      isInCategory = true;
      if(price != "-") {
        if(price <= 7500) {
          handlingFee = 0.15;
        } else {
          handlingFee = 0.05;
        }

        if ((handlingFee * price) > 30) {
          salesFee = handlingFee * price;
        }
      }
    }
  }

  if (isInCategory === false) {
    if(price != "-") {
      salesFee = price * 0.1;
    }
  }

  //販売手数料
  $("#hiddenHanddlingFee").val(handlingFee);

  //販売手数料
  $("#handdlingFee").text(salesFee.toFixed(0));

  //粗利計算
  let profit = price - salesFee - Number(delivery) - Number(point)  - Number(listingShipping)  - Number(scalesPrice);
  let profitRate = profit.toFixed(0) / price;
  profitRate = profitRate * 100;
  $("#profitCalculated").text("¥" + String(profit.toFixed(0)) + "(" + String(profitRate.toFixed(1)) + "%)");
};
