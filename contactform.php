<?php
//error_reporting(0);
ini_set("include_path", '/home/wcvz8jakxklg/php:' . ini_get("include_path") );
       @require_once "Mail.php";
if (isset($_POST['Captcha'])) {
$name = filter_var($_POST['Name'] , FILTER_SANITIZE_STRING);
$email = filter_var($_POST['Email'] , FILTER_SANITIZE_EMAIL);
$description = filter_var($_POST['Description'] , FILTER_SANITIZE_STRING);
$spam = filter_var($_POST['usernameofxyunidmlp'] , FILTER_SANITIZE_STRING); // Bot trap
if($spam) 
    {  // If the hidden field is not empty, it's a bot
                die("No spamming allowed bitch!"); 
    } else {
        $from = "sales@chemifor.in";
        $to = "nkore123@gmail.com";
        $subject = "Message from : ".$name;
        $body = "Client's Name : ".$name."\r\n";
        $body .= "Client's Email ID : ".$email."\r\n";
        $body .= "Client's Message : ".$description."\r\n";

        /*$host = "ssl://smtp.gmail.com";
        $port = "465";
        $username = "ganeshghate5@gmail.com";  //<> give errors
        $password = "Gibbbb@47";*/
        $host = "localhost";
        $port = "25";
        $username = "sales@chemifor.in";  //<> give errors
        $password = "SalesC@!963";

        $headers = array ('From' => $from,
          'To' => $to,
          'Subject' => $subject);
        $smtp = @Mail::factory('smtp',
          array ('host' => $host,
            'port' => $port,
            'auth' => true,
            'username' => $username,
            'password' => $password));

        $mail = @$smtp->send($to, $headers, $body);

        if (@PEAR::isError($mail)) {
            //echo("<p>" . $smtp->getMessage() . "\n" . $smtp->getUserInfo() ."</p>");
            //echo("<p>" . $mail->getMessage() . "\n" . $mail->getUserInfo() ."</p>");
            $output['errorclientemail'] = "<div'>
                                                <h2 class='error'>".$mail->getMessage().$mail->getUserInfo()."</h2>
                                                <h2>Oops there was some error we have not received your message</h2>
                                                <h2>Please report the above error to us via skype , email , phone details are on the left side</h2>
                                           </div>"."\r\n";
         } else {
            $output['successclientemail'] = "Thank you we will get back to you soon";
            
         }
        $bodyback = "We have received your message :".$body."\r\n";
        $bodyback .= "We will get back to you soon"."\r\n";
        $bodyback .= "With Regards "."\r\n";
        $bodyback .= "Nitin Kore "."\r\n";
        $subjectback = "Thank You for contacting us";
        $headersreply = array ('From' => $from,
          'To' => $email,
          'Subject' => $subjectback);
        $smtp = @Mail::factory('smtp',
          array ('host' => $host,
            'port' => $port,
            'auth' => true,
            'username' => $username,
            'password' => $password));

        $mail = @$smtp->send($email, $headersreply, $bodyback);

        if (@PEAR::isError($mail)) {
            //echo("<p>" . $smtp->getMessage() . "\n" . $smtp->getUserInfo() ."</p>");
            $output['errorreplyemail'] = "<div'>
                                                <h2 class='error'>".$mail->getMessage().$mail->getUserInfo()."</h2>
                                                <h2>Oops there was some error we have not delivered confirmation email to you</h2>
                                                <h2>Please report the above erorr to us via skype , email , phone details are on the left side</h2>
                                          </div>"."\r\n";
            //echo("<p>" . $mail->getMessage() . "</p>");
         } else {
            $output['successreplyemail'] = "We have sent confirmation email to you. Please check your inbox / junk mail";
         }
         echo json_encode ($output);
    }
}
    ?>  

