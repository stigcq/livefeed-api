
class GetMessageTest extends Test {

    constructor(dependsOn) {
        super();
        super.addDependentOn(dependsOn);
    }

    isFinished() {
        
        if(fetchedMessageObject == false)
            return false;
        return true;
    }

    test() {

        jQuery.get(testUrl + "get_message/" + messageObject._id, {}, function(result) {
        
            fetchedMessageObject = jQuery.parseJSON( result );
        
            if(fetchedMessageObject.error != undefined) {
                logTest(false, "GetMessageTest: failed get message " + result);
            } else {
                if(fetchedMessageObject._id == messageObject._id)
                    logTest(true, "GetMessageTest: fetched message" + result);
            }
            }).error(function() {
                logTest(false, "GetMessageTest: Error in connection");
        });
    }

}