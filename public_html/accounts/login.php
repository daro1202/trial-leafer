<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <title>ログイン</title>
</head>
<body>
  <div class="container">
    <div class="row" style="margin-top:20px">
      <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
      <h2><img src="../assets/img/icons/spot-illustrations/falcon.png" width="50px">Falcon ログイン</h2>
      <!-- <p class="my-4">メールでログイン</p> -->
      <form role="form" action="read.php" method="post">
        <fieldset>
          <div class="form-group">
            <!-- <input type="email" name="email" id="user" class="form-control input-lg" placeholder="メールアドレスを入力してください" required> -->
            <select name="email" class="form-control input-lg" >
              <option value="falcon1@gmail.com">falcon1@gmail.com</option>
              <option value="falcon2@gmail.com">falcon2@gmail.com</option>
            </select>
          </div>
          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6">
              <input type="submit" name="login" class="btn btn-lg btn-success btn-block" value="ログイン">
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://js.stripe.com/v3/"></script>
</body>
</html>