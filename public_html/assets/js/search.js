var url = "../admin/api/v1/keepaProductSearch/";
var amazon_image = "https://images-na.ssl-images-amazon.com/images/I/";

function submitSearch() {
  event.preventDefault();

  //結果サジェスト削除
  $('#search-result__list').empty();

  var searchText = $('#search-text').val();
  if(searchText == "" || searchText == undefined || searchText == null) {
    searchText = $('#search-text-index').val();
  }

  //検索結果が表示
  if(searchText == "" || searchText == undefined || searchText == null) {
    return false;
  }

  $.ajax({
    url:       url + searchText,
    type:     'GET',
    dataType: 'json',
    async :   false,
    timeout:  5000,
  }).done(function(data) {
    let responseProduct = data.response;

    //検索結果がない
    if(responseProduct.length === 0 || responseProduct === undefined) {
      $('<div id="searchRrsult" class="scrollbar list py-3" style="max-height: 24rem;">').appendTo('#search-result__list');
      $('<h6 id="searchResulth6" class="dropdown-header fw-medium text-uppercase px-card fs--2 pt-0 pb-2">検索結果</h6>').appendTo('#searchRrsult');
      let text = '商品がみつかりませんでした';
      $('<div class="text-center mt-n3"><p class="fallback fw-bold fs-1 d-none">').text(text).appendTo('#search-result__list');
      return false;
    }

    var form = document.createElement('form');
    form.method = 'post';
    var q = document.createElement('input');

    if(data.isKeyWordResult === true) {
      //キーワード検索結果
      form.action = "../admin/words.php?word=" + searchText;
      q.value = JSON.stringify(responseProduct);
      q.name = 'searchResult';
    } else {
      // asin検索
      form.action = "../admin/starter.php?word=" + searchText;
      q.value = searchText;
      q.name = 'asin';
    }

    form.appendChild(q);
    document.body.appendChild(form);
    form.submit();

  }).fail(function(jqXHR, textStatus, errorThrown) {
    $('<span>').text('データ取得に失敗しました').appendTo('#search-result__list');
    console.log(jqXHR.responseText);
  });
}
