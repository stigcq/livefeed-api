
class GetMessageTest extends Test {

    constructor() {
        super();
    }

    isReady() {
        if(messageObject == false)
            return false;
        else return true;
    }

    test() {

        jQuery.get(testUrl + "get_message/" + messageObject._id, {}, function(result) {
        
            var message = jQuery.parseJSON( result );
        
            if(message.error != undefined) {
                logTest(false, "GetMessageTest: failed get message " + result);
            } else {
                if(message._id == messageObject._id)
                    logTest(true, "GetMessageTest: fetched message" + result);
            }
            }).error(function() {
                logTest(false, "GetMessageTest: Error in connection");
        });
    }

}