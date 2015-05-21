
/**
// A simple todo model
var Todo = Backbone.Model.extend({
  defaults: { title: "New Todo" }
});
// Create a Firebase collection and set the 'firebase' property
// to the URL of your Firebase
var TodoCollection = Backbone.Firebase.Collection.extend({
  model: Todo,
  url: "https://<your-firebase>.firebaseio.com"
});


var User = Backbone.Model.extend({
	defaults: {
		email: '',
		password: '',
		username: ''
	}
});

var View = Backbone.View.extend({
	t

});

**/
$(document).ready(function(){
    $("#login-btn").click(function(){
      		var ref = new Firebase("https://boiling-torch-2681.firebaseio.com/bc8-linkvoting");
			ref.authWithPassword({
			  email    : String($("#login-email").val()),
			  password : String($("#login-pswrd").val())},
			

			function (error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			  }
			}),

			function() {
			if (userData.uid)
        	$("#login-sec").hide()
    		},

        	function() {
			if (userData.uid)
        	$("#logout-sec").show()
    		},

    		function() {
    		if (userData.uid)
 			$("#login-btn").text("Sign out")
 			}
	});
});



$(document).ready(function(){
    $("#reg-btn").click(function(){

		var ref = new Firebase("https://boiling-torch-2681.firebaseio.com/");
		ref.createUser({email: String($("#reg-email").val()),
						password: String($("#reg-pass").val())},

			function(error, userData) {
			  if (error) {
			    switch (error.code) {
			      case "EMAIL_TAKEN":
			        console.log("The new user account cannot be created because the email is already in use.");

			        break;
			      case "INVALID_EMAIL":
			        console.log("The specified email is not a valid email.");
			        break;
			      default:
			        console.log("Error creating user:", error);
			    }
			  } else {
			    console.log("Successfully created user account with uid:", userData.uid);
			    
			  }
			}
		), 
		function() {
		if (userData.uid)
        	$("#signupModal").hide();
 		},

 		function() {
		if (userData.uid)
        	$("#login-sec").hide();
 		},

 		function() {
		if (userData.uid)
        	$("#logout-sec").show();
 		}


			
	});
});
//reset password
		 
$(document).ready(function(){
    $("#reset-btn").click(function(){

			var ref = new Firebase("https://boiling-torch-2681.firebaseio.com/");
			ref.resetPassword({email: String($("#rcvr-email")).val()},

			  function(error) {
			  if (error) {
			    switch (error.code) {
			      case "INVALID_USER":
			        console.log("The specified user account does not exist.");
			        break;
			      default:
			        console.log("Error resetting password:", error);
			    }
			  } else {
			    console.log("Password reset email sent successfully!");
			  }
			}
			),

			function() {
			if (!error)
        		$("#pswrdModal").hide();
 			}



	});
});