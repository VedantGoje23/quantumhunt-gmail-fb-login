//sa soon as the document means window is ready this function is ready
$(document).ready(function(){   
 
 // add event listener on the login button
 
 $("#login").click(function(){

    facebookLogin();

 });
 
}
			

//custom function by facebook
				  
function facebookLogin()
  {
// check if logged in to fb or not
    FB.getLoginStatus(function(response) {
        console.log(response);
//this is the custom window that we see when we clicked the login btn
        statusChangeCallback(response);
    });
  }


//custom function by facebook this will check the user is logged in or not if not it will display ui and if not it will show other interface
function statusChangeCallback(response)
  {
      console.log(response);
//	  if already logged in
      if(response.status === "connected")
      {
         $("#login").hide();
         $("#logout").show(); 
         fetchUserProfile();
      }
      else{
//    Logging the user to Facebook by a Dialog Window
          facebookLoginByDialog();
      }
  }


//if not already logged in then this function is called this will show interface that show "ENTER THE USERNAME" "ENTER THE PASSWORD" to log in
function facebookLoginByDialog()
  {
    FB.login(function(response) {
       
        statusChangeCallback(response);
       
    }, {scope: 'public_profile,email'});
  }



//this will fetch the info of user
function fetchUserProfile()
  {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=id,name,email', function(response) {
      console.log(response);
      console.log('Successful login for: ' + response.name);
      var profile = `<h1>Welcome ${response.name}<h1>
      <h2>Your email is ${response.email}</h2>`;
      $("#status").append(profile);
    });
  }
 

// add event listener on the logout button
 
  $("#logout").click(function(){
 
    $("#logout").hide();
    $("#login").show();
    $("#status").empty();
    facebookLogout();
 
  });

//logging out
//logging out
function facebookLogout()
  {
    FB.logout(function(response) {
        statusChangeCallback(response);
    });
  }

