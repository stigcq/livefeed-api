
//change to what url you want test the api on
var testUrl = "http://3.121.5.61:3000/";

var testUserObject = false;
var loggedInUserObject = false;
var feedObject = false;
var messageObject = false; 
var messageObjectEdited = false; 

function randomEmail() {

    return Math.floor(Math.random()*1000000) + "@" + Math.floor(Math.random()*1000000) + ".com";
}

class Test {

    constructor() {
        this.subTests = new Array();
        this.result = false;
      }

    test() {
        logTest(false, this.constructor.name  + " Test not implemented");
    }

    isReady() {
        return false;
    }
    
}

class CreateUserTest extends Test {

    constructor() {
        super();
      }

    test() {

        jQuery.post(testUrl + "create_user/", { 
            email: randomEmail(),
            display_name: Math.floor(Math.random()*1000000), 
            password: Math.floor(Math.random()*1000000) }, this.onTest).error(function() {
            logTest(false, "Error in connection");
        });
    }

    onTest(data) {

        testUserObject = jQuery.parseJSON(data);

        if(testUserObject.error != undefined) {
            logTest(false, testUserObject.message);
            testUserObject = false;
        } else if(testUserObject.session_token != 1) {
            logTest(true, "CreateUserTest: user created " + data);
        }

    }


    isReady() {
        return true;
    }
    
}


class LoginTest extends Test {

    constructor() {
        super();
      }

      isReady() {
          if(testUserObject == false)
              return false;
          else return true;
        }

    test() {

        var currentSessionToken = testUserObject.session_token;

        jQuery.post(testUrl + "login/", 
        { email: testUserObject.email, 
            md5password: testUserObject.password}, function(data) {

            console.log(testUserObject.email + " " + testUserObject.password);
            //data = jQuery.parseJSON( data );

            if(data.session_token != 1 && currentSessionToken != data.session_token) {
                logTest(true, "LoginTest: successfully logged in" + data);
                loggedInUserObject = jQuery.parseJSON(data);
            } else {
                logTest(false, "LoginTest: fail logged in" + data);
                
            }
        }).error(function() {
            logTest(false, "LoginTest: Error in connection");
        });
    }
}


class CreateFeedTest extends Test {

    constructor() {
        super();
      }

      isReady() {
          if(loggedInUserObject == false)
              return false;
          else return true;
        }

        test() {

            jQuery.post(testUrl + "create_feed/", { 
                feed_title: "Test Feed",
                session_token: loggedInUserObject.session_token }, function(result) {
        
                    feedObject = jQuery.parseJSON( result );
        
                    if(feedObject.error == 1) {
                        logTest(false, "CreateFeedTest: fail create feed" + result);
                    } else {
                        logTest(true, "CreateFeedTest: created a feed" + result);
                    }
            }).error(function() {
                logTest(false, "LoginTest: Error in connection");
            });
        }
}


class GetUserFeedsTest extends Test {

    constructor() {
        super();
      }

    isReady() {
        if(feedObject == false)
            return false;
        else return true;
    }

    test() {

        jQuery.get(testUrl + "get_user_feeds/" + loggedInUserObject._id, {}, function(result) {
        
            var userFeeds = jQuery.parseJSON( result );
        
            if(userFeeds.error == 1) {
                logTest(false, "GetUserFeedsTest: failed get feeds" + result);
            } else {

                if(userFeeds.length == 1)
                    logTest(true, "GetUserFeedsTest: fetched users feeds" + result);
                else
                    logTest(false, "GetUserFeedsTest: fetched users feeds count dont match" + result);
            }
            }).error(function() {
                logTest(false, "GetUserFeedsTest: Error in connection");
            });
        }
}


class SubmitMessageTest extends Test {

    constructor() {
        super();
      }

      isReady() {
          if(feedObject == false)
              return false;
          else return true;
        }

        test() {

            jQuery.post(testUrl + "submit_message/", 
            { feed_id: feedObject.feed_id, 
                content: "automated test message",
                session_token: loggedInUserObject.session_token
                }, function(data) {
                    
                 messageObject = jQuery.parseJSON( data );
        
            if(messageObject.error == 1) {
                logTest(false, "SubmitMessageTest: user has been logged out");        
            } else if(data.error == 2) {
                logTest(false, "SubmitMessageTest: user dont have perms for feed");        

            } else {
                logTest(true, "SubmitMessageTest: message added"+ data);    
            }
        }).error(function() {
                logTest(false, "SubmitMessageTest: Error in connection");
            });
        }
}


class EditMessageTest extends Test {

    constructor() {
        super();
      }

      isReady() {
          if(messageObject == false)
              return false;
          else return true;
        }

        test() {

            jQuery.post(testUrl + "submit_message/", {
                message_id: messageObject._id, 
                content: "edited automated test message",
                session_token: loggedInUserObject.session_token }, function(data) {

                messageObjectEdited = jQuery.parseJSON( data );

                if(messageObjectEdited.content != "edited automated test message")
                logTest(false, "EditMessageTest: message edited but content different "+ data);    
                else
                logTest(true, "EditMessageTest: message edited"+ data);    

            }).error(function() {
                logTest(false, "EditMessageTest: Error in connection");
            });

        }
}

class DeleteMessageTest extends Test {

    constructor() {
        super();
      }

      isReady() {
          if(messageObjectEdited == false)
              return false;
          else return true;
        }

        test() {

            jQuery.post(testUrl + "delete_message/", 
            { message_id: messageObject._id, 
                session_token: loggedInUserObject.session_token }, function(data) {
        
                logTest(true, "DeleteMessageTest: message deleted"+ data);    

            }).error(function() {
                logTest(false, "DeleteMessageTest: Error in connection");
            });

        }
}


var tests = new Array();

tests.push(new CreateUserTest());
tests.push(new LoginTest());
tests.push(new CreateFeedTest());
tests.push(new GetUserFeedsTest());
tests.push(new SubmitMessageTest());
tests.push(new EditMessageTest());
tests.push(new DeleteMessageTest());




function startLoop() {

    if(tests.length > 0) {
        setTimeout(startLoop, 1000);
        runTests();
    } else {
        logTest(true, "Finished running all tests");
    }

}

function runTests() {

    for(i = 0; i < tests.length; i++) {

        if(tests[i].isReady() == true) {
            runTest = tests[i];
            tests.splice(i, 1);
            runTest.test();
        }
            
    }
}

//datatype = success, failure
function logTest(successOrFail, message) {

    if(successOrFail == true)
        $("#testlogger").append("<b style='color: white; background-color: green;'>Success:</b> " + message + "<br/>");
    else
        $("#testlogger").append("<b style='color: red'>Failure: " + message + "</b><br/>");

}