
//change to what url you want test the api on
var testUrl = "http://3.121.5.61:3000/";



var tests = new Array();

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

setAvatarTest = new SetAvatarTest(loginTest, addMediaTest);
tests.push(setAvatarTest);

getUserFeedTest = new GetUserFeedsTest(1, loginTest, createFeedTest);
tests.push(getUserFeedTest);

submitMessageTest = new SubmitMessageTest(loginTest, createFeedTest);
tests.push(submitMessageTest);

getMessageTest = new GetMessageTest(submitMessageTest);
tests.push(getMessageTest);

editMessageTest = new EditMessageTest(loginTest, getMessageTest);
tests.push(editMessageTest);

deleteMessageTest = new DeleteMessageTest(loginTest, editMessageTest);
tests.push(deleteMessageTest);

deleteFeedTest = new DeleteFeedTest(loginTest, deleteMessageTest, createFeedTest);
tests.push(deleteFeedTest);

deleteUserTest = new DeleteUserTest(createUserTest, loginTest, deleteFeedTest);
tests.push(deleteUserTest);

loginTestNoUser = new LoginTestNoUser();
tests.push(loginTestNoUser);

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