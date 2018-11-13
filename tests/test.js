
//change to what url you want test the api on
var testUrl = "http://3.121.5.61:3000/";

//dont like these here, but not sure how to do it yet, f.x.
//loginTest is dependent on createusertest, and the testuserobject
var testUserObject = false;
var mediaObject = false;
var loggedInUserObject = false;
var feedObject = false;
var messageObject = false; 
var fetchedMessageObject = false;
var messageObjectEdited = false; 
var messageObjectDeleted = false; 
var feedObjectDeleted = false; 
var avatarObject = false;
var fetchedMediaObject = false;

var tests = new Array();

//testing doing some test dependency
createUserTest = new CreateUserTest();
loginTest = new LoginTest(createUserTest);
tests.push(createUserTest);
tests.push(loginTest);

createFeedTest = new CreateFeedTest(loginTest);
tests.push(createFeedTest);

addMediaTest = new AddMediaTest(loginTest);
tests.push(addMediaTest);

getMediaTest = new GetMediaTest(addMediaTest);
tests.push(getMediaTest);

setAvatarTest = new SetAvatarTest(addMediaTest);
tests.push(setAvatarTest);

getUserFeedTest = new GetUserFeedsTest(1, createFeedTest);
tests.push(getUserFeedTest);

submitMessageTest = new SubmitMessageTest(createFeedTest);
tests.push(submitMessageTest);

getMessageTest = new GetMessageTest(submitMessageTest);
tests.push(getMessageTest);

editMessageTest = new EditMessageTest(getMessageTest);
tests.push(editMessageTest);

deleteMessageTest = new DeleteMessageTest(editMessageTest);
tests.push(deleteMessageTest);

deleteFeedTest = new DeleteFeedTest(deleteMessageTest);
tests.push(deleteFeedTest);

//tests.push(new GetUserFeedsTest(0, deleteFeedTest));

deleteUserTest = new DeleteUserTest(deleteFeedTest);
tests.push(deleteUserTest);

var stopRunning = false;

function stopLoop() {

    stopRunning = true;
    logTest(true, "Stopping running tests");

}

/**
 * The following loop is a very simple way of handling tests dependent on other tests
 * It runs through array of tests, run a test if its ready, and removes it from the
 * array, and then keep looping until array is empty. 
 * Probably can be refined some. 
 */
function startLoop() {

    if(stopRunning) {
        return;
    }

    if(tests.length > 0) {
        setTimeout(startLoop, 1000);
        runTests();
    } else {
        logTest(true, "Finished running all tests");
    }

}



function runTests() {

    var noTestsRun = true;

    for(var i = 0; i < tests.length; i++) {

        if(tests[i].isReady() == true) {
            runTest = tests[i];
            tests.splice(i, 1);
            runTest.test();
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