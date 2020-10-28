var firstNumber = Math.floor(Math.random() * 10) + 1;  
var secondNumber = Math.floor(Math.random() * 10) + 1; 
var total = firstNumber + secondNumber;
$("#showFN").text(firstNumber); 
$("#showSN").text(secondNumber); 
var Name = new LiveValidation('Name');
Name.add( Validate.Format, { pattern: /[a-z]/i , failureMessage: "Only Alphanumeric Ex. Bond007" } );
var Email = new LiveValidation('Email');
Email.add( Validate.Email );
Email.add( Validate.Presence );
var Captcha = new LiveValidation('Captcha');
Captcha.add( Validate.Numericality , { is: total } );
Captcha.add( Validate.Presence );
var Description = new LiveValidation('Description');
Description.add( Validate.Format, { pattern: /[a-z]/i , failureMessage: "Alphanumeric" } );
//Description.add( Validate.Presence );
 

$(".submitbutton").click(function(){
	var CaptchaClick = new LiveValidation('Captcha');
	CaptchaClick.add(Validate.Numericality , { is: total } );
	CaptchaClick.add(Validate.Presence);
	CaptchaClick.doOnBlur();
	var Email = new LiveValidation('Email');
	Email.add(Validate.Presence);
	Email.doOnBlur();
	if ($("#Captcha").siblings("span").hasClass("LV_valid") && $("#Email").siblings("span").hasClass("LV_valid") && $("#CompanyName").siblings("span").hasClass("LV_valid")) {
	var Name = $("input[name=Name]").val();
	var Email = $("input[name=Email]").val();
	var Captcha = $("input[name=Captcha]").val();
	var usernameofxyunidmlp = $("input[name=usernameofxyunidmlp]").val();
	var Description = $("textarea[name=Description]").val();
	var thankyoueheight = $("#contactform").height();
	var thankyouehightforthankyou = thankyoueheight / 4;
	var thankyouheightforthankyoureplyemail = thankyouehightforthankyou * 2;
	$("#sales").children().remove();
	var load = "<div id='loadimage' style='text-align: center; width:100%;'><img style='height:50px; width:50px;' src='724.GIF'></div>";
	$("#sales").append(load);
	$("#loadimage").css({"margin-top" :thankyouehightforthankyou});
	$.ajax({
		  type: 'POST',
		  url: 'contactform.php',
		  data : {Name:Name, CompanyName:CompanyName, Email:Email, Phone:Phone, Captcha:Captcha, usernameofxyunidmlp:usernameofxyunidmlp, Description:Description},
		  dataType : 'json',
		  success: function (result) {
										//$("#sales").children().remove();
										console.log(result);
										$("#loadimage").remove();
										$("#ctnt_heading").hide();
										if (typeof result['errorclientemail'] === "undefined") {
											$("#sales").append("<div class='col-md-12 col-lg-12 thankyouclientemail'><h3>"+result['successclientemail']+"</h3></div>");
										}else{
											$("#sales").append("<div class='col-md-12 col-lg-12 thankyouclientemail'><h3>"+result['errorclientemail']+"</h3></div>");
										}
										if (typeof result['errorreplyemail'] === "undefined") {
											$("#sales").append("<div class='col-md-12 col-lg-12 thankyoureplyemail'><h3>"+result['successreplyemail']+"</h3></div>");
										}else {
											$("#sales").append("<div class='col-md-12 col-lg-12 thankyoureplyemail'><h3>"+result['errorreplyemail']+"</h3></div>");
										}
										$(".thankyouclientemail").css({"margin-top" : thankyouehightforthankyou , "text-align" : "center"});
										$(".thankyoureplyemail").css({"margin-top" : thankyouehightforthankyou , "text-align" : "center"});
										$(".thankyouclientemail h3 , .thankyoureplyemail h3").css({"font-size" : "20px"});
										$(".error").css({"color" : "#e0282a"});
									 },
		  error: function (jqXHR, exception) {
												console.log(jqXHR);
												console.log(exception);
												if (jqXHR.status === 0) {
													var messageerror = 'Not able to connect. Please Verify Network.';
												} else if (jqXHR.status == 404) {
													var messageerror =  'Requested page not found. [404]';
												} else if (jqXHR.status == 500) {
													var messageerror = 'Internal Server Error [500].';
												} else if (exception === 'parsererror') {
													var messageerror = 'Requested JSON parse failed.';
												} else if (exception === 'timeout') {
													var messageerror = 'Time out error.';
												} else if (exception === 'abort') {
													var messageerror = 'Ajax request aborted.';
												} else {
													var messageerror = 'Uncaught Error. ' + jqXHR.responseText;
												}
										//$("#sales").children().remove();
										$("#loadimage").remove();
										$("#sales").append("<div class='col-md-12 col-lg-12 thankyouclientemail'><h3>There was <span class='error'>'"+messageerror+"'</span> error your message was not sent please report the problem via skype , email , phone details are on left side</h3><p>Refresh the page and try again.</p></div>");
										$(".thankyouclientemail").css({"margin-top" : thankyouehightforthankyou , "text-align" : "center"});
										$(".error").css({"color" : "#e0282a"});
										$(".thankyouclientemail h3").css({"font-size" : "20px"});
							  }
		  });
	}
	return false;
});

