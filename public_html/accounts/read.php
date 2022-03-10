<?php include "../includes/db.php"; ?>
<?php session_start(); ?>

<?php 

if(isset($_POST['login'])) {
  $email = $_POST['email'];

$user = $con->prepare("
	SELECT * FROM users
	WHERE user_email = :email
	");
$user->bindParam(':email', $email);
$user->execute();
$users = $user->fetchall(PDO::FETCH_OBJ);


foreach ($users as $user) {

$user->user_email;
}


    $_SESSION['email'] = $user->user_email;

      header("Location: ../admin/index.php");

    



}


?>