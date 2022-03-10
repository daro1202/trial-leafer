function sendPostDetail(e) {
  e.preventDefault();
  var form = document.createElement('form');
  var q = document.createElement('input');
  form.action = "../admin/starter.php?word=" + e.target.getAttribute('data-asin');
  form.method = 'post';

  q.value = e.target.getAttribute('data-asin');
  q.name = 'asin';
  form.appendChild(q);
  document.body.appendChild(form);

  form.submit();

}
