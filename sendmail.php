<?php
   use PHPMailer\PHPMailer\PHPMailer;
   use PHPMailer\PHPMailer\Exception;

   require 'phpmailer/src/Exception.php';
   require 'phpmailer/scr/PHPMailer.php';

   $mail = new PHPMailer(true);
   $mail->CharSet = 'UTF-8';
   $mail->setLanguage('ru', 'phpmailer/language/');
   $mail->IsHTML(true);

   // От кого письмо
   $mail->setFrom('info@fls.guru', 'Фрилансер по жизни');
   // Кому отправить
   $mail->addAddress('andrew270504cska@gmail.com');
   // Тема письма
   $mail->Subject = 'Привет! Это фрилансер';

   // ТЕЛО ПИСЬМА
   $body = '<h1>Встречай супер письмо!</h1>';

   if(trim(!empty($_POST['name']))){
      $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
   }
   if(trim(!empty($_POST['email']))){
      $body.='<p><strong>E-Mail:</strong> '.$_POST['email'].'</p>';
   }
   if(trim(!empty($_POST['message']))){
      $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
   }

   // Send
   if (!$mail->send()){
      $message = 'Ошибка';
   } else {
      $message = 'Данные отправлены!';
   }

   $response = ['message => $message'];

   header('Content-type: application/json');
   echo json_encode($response);
?>