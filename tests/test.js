
//change to what url you want test the api on
var testUrl = "http://3.121.5.61:3000/";

var testUserObject = false;
var loggedInUserObject = false;
var feedObject = false;
var messageObject = false; 
var messageObjectEdited = false; 
var messageObjectDeleted = false; 
var feedObjectDeleted = false; 




var tests = new Array();

tests.push(new CreateUserTest());
tests.push(new LoginTest());
tests.push(new CreateFeedTest());
tests.push(new GetUserFeedsTest());
tests.push(new SubmitMessageTest());
tests.push(new GetMessageTest());
tests.push(new EditMessageTest());
tests.push(new DeleteMessageTest());
tests.push(new DeleteFeedTest());
tests.push(new DeleteUserTest());

var testLengths = tests.length;

/**
 * The following loop is a very simple way of handling tests dependent on other tests
 * It runs through array of tests, run a test if its ready, and removes it from the
 * array, and then keep looping until array is empty. 
 * Probably can be refined some. 
 */
function startLoop() {

    if(tests.length > 0) {
        setTimeout(startLoop, 1000);
        runTests();
    } else {
        logTest(true, "Finished running all tests");
    }

}



function runTests() {

    var noTestsRun = true;

    for(i = 0; i < tests.length; i++) {

        if(tests[i].isReady() == true) {
            runTest = tests[i];
            tests.splice(i, 1);
            runTest.test();
            testLengths = tests.length;
            noTestsRun = false;
        }
            
    }

    if(noTestsRun == true) {
        logTest(false, "No tests ready to run, " + tests.length + " test(s) in unready state");

    }
}

//successOrFail: boolean
function logTest(successOrFail, message) {

    if(successOrFail == true)
        $("#testlogger").append("<b style='color: white; background-color: green;'> &nbsp; Success &nbsp;</b> " + message + "<br/>");
    else
        $("#testlogger").append("<b style='color: white; background-color: red;'> &nbsp; Failure &nbsp;</b> " + message + "<br/>");

}