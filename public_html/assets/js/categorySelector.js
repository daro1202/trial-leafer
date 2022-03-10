var rankingUrl = "../admin/api/v1/keepaCategoryRanking/";

$(document).ready(function(){
  var select = $("#categorySelector").val();
  api(false, select, 0);

  $("#categorySelector").change(function(){
    var select = $("#categorySelector").val();
    api(false, select, 0);
  });
});

function api(event, categoryId, pager) {
  if(event !== false) {
    event.preventDefault();
  }

  $('#mainDiv').hide();
  $('#popup').show();

  setTimeout(function(){}, 500);

  // Ajax通信を開始
  $.ajax({
    url:       rankingUrl + categoryId + "/" + pager + "/",
    type:     'GET',
    dataType: 'json',
    async :   false,
  })
  .done(function(data) {
    let response = data.response;

    //検索結果がない
    if(response.length === 0 || response === undefined || data.status === "no") {
      console.log(data);
      return false;
    }

    var closingCount = 2;
    var html = "";
    $.each(response, function(index, value) {
      if(index === 0 || index % 3 === 0) {
        html += '<div class="row" data-index="' + index + '">';
      }

      html += '<div class="mb-4 col-md-6 col-lg-4">';
      html += '<div class="border rounded-1 h-100 d-flex flex-column justify-content-between pb-3 rank_item_img_box"><div class="overflow-hidden">';

      html += '<div class="position-relative rounded-top overflow-hidden">';
      html += '<a class="d-block" href="' + '../admin/starter.php?word=' + value.asin + '" onclick="sendPostDetail(event);" data-asin="' + value.asin + '" >';
      html += '<img class="img-fluid rounded-top rank_item_img" src="https://m.media-amazon.com/images/I/' + value.image + '" alt="" data-asin="' + value.asin + '" /></a></div>';

      html += '<div class="p-3"><h5 class="fs-0">';
      html += '<a class="text-dark" href="' + '../admin/starter.php?word=' + value.asin + '" onclick="sendPostDetail(event);" data-asin="' + value.asin + '" >';
      html += value.name + '</a></h5><br />';

      html += '<div style="text-align:left; color: #0B1727; font-size: smaller;">';
      html += '30日平均カテゴリー内ランキング： ' + value.averageRanking + '位<br />';
      html += 'カテゴリー： ' + value.category + '<br />';
      html += 'ASIN： ' + value.asin + '<br />';
      html += 'メーカー： ' +  value.manufacturer + '</div>';

      html += '</div></div><div class="d-flex flex-between-center px-3">';
      html += '<div style="margin-left: auto;"><a class="btn btn-sm btn-falcon-default me-2" href="#!" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wish List">';
      html += '<span class="far fa-heart"></span></a></div></div></div></div>';

      if(index % closingCount === 0 && index !== 0) {
        html += "</div>";
        closingCount = closingCount + 3;
      }
    });

    //DOM操作
    $("#mainDiv").empty();
    $("#mainDiv").append(html);

    //検索表示件数
    $("#displaying").text("1000件中" + data.from + "件〜" + data.to + "件を表示");

    //ペイジャー
    let button = "";
    if(String(pager) !== "0") {
      button = '<button class="btn btn-falcon-default btn-sm me-2" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Prev" id="previewPage" onclick="api(event, '+ categoryId + ',' +  String(pager + 1) + ')">';
    } else {
      button = '<button class="btn btn-falcon-default btn-sm me-2" type="button" disabled="disabled" data-bs-toggle="tooltip" data-bs-placement="top" title="Prev" id="previewPage">';
    }
    button += '<span class="fas fa-chevron-left"></span>';
    button += '</button>';

    if (String(pager) === "0") {
      button += '<a class="btn btn-sm btn-falcon-default text-primary me-2" href="" data-page="0" onclick="api(event, '+ categoryId + ', 0)">1</a>';
      button += '<a class="btn btn-sm btn-falcon-default me-2" href="" data-page="1" onclick="api(event, '+ categoryId + ', 1)">2</a>';
      button += '<a class="btn btn-sm btn-falcon-default me-2" href="" data-page="2" onclick="api(event, '+ categoryId + ', 2)"><span class="fas fa-ellipsis-h"></span></a>';
      button += '<a class="btn btn-sm btn-falcon-default me-2" href="" data-page="9" onclick="api(event, '+ categoryId + ', 9)">10</a>';
    }

    if(String(pager) !== "0" && String(pager) !== "9") {
      if(String(pager) !== "1") {
        button += '<a class="btn btn-sm btn-falcon-default me-2" href="" data-page="' +  String(pager - 1) + '" onclick="api(event, '+ categoryId + ',' + String(pager - 1) + ')"><span class="fas fa-ellipsis-h"></span></a>';
      }

      button += '<a class="btn btn-sm btn-falcon-default me-2" href="" data-page="' +  String(pager) + '" onclick="api(event, '+ categoryId + ',' + String(pager) + ')">' + String(pager) + '</a>';
      button += '<a class="btn btn-sm btn-falcon-default text-primary me-2" href="" data-page="' +  String(pager + 1) + '" onclick="api(event, '+ categoryId + ',' + String(pager + 1) + ')">' + String(pager + 1) + '</a>';
      button += '<a class="btn btn-sm btn-falcon-default me-2" href="" data-page="' +  String(pager + 2) + '" onclick="api(event, '+ categoryId + ',' +  String(pager + 2) + ')">' + String(pager + 2) + '</a>';

      if(String(pager) !== "8" && String(pager) !== "9") {
        button += '<a class="btn btn-sm btn-falcon-default me-2" href="" data-page="' +  String(pager + 3) + '" onclick="api(event, '+ categoryId + ',' + String(pager + 3) + ')"><span class="fas fa-ellipsis-h"></span></a>';
      }
    }

    if (String(pager) === "9") {
      button += '<a class="btn btn-sm btn-falcon-default me-2" href="" data-page="0" onclick="api(event, '+ categoryId + ', 0)">1</a>';
      button += '<a class="btn btn-sm btn-falcon-default me-2" href="" data-page="7" onclick="api(event, '+ categoryId + ', 7)"><span class="fas fa-ellipsis-h"></span></a>';
      button += '<a class="btn btn-sm btn-falcon-default me-2" href="" data-page="8" onclick="api(event, '+ categoryId + ', 8)">9</a>';
      button += '<a class="btn btn-sm btn-falcon-default text-primary me-2" href="" data-page="9" onclick="api(event, '+ categoryId + ', 9)">10</a>';
      button += '<button class="btn btn-falcon-default btn-sm" type="button" disabled="disabled" data-bs-toggle="tooltip" data-bs-placement="top" title="Next" id="nextPage">';
    } else {
      button += '<button class="btn btn-falcon-default btn-sm" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Next" id="nextPage" onclick="api(event, '+ categoryId + ',' +  String(pager + 1) + ')">';
    }

    button += '<span class="fas fa-chevron-right"></span>';
    button += '</button>';

    $("#pagerButtons").empty();
    $("#pagerButtons").append(button);

    //画面表示
    $('#popup').hide();
    $('#mainDiv').show();
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR.responseText);
  });
}
