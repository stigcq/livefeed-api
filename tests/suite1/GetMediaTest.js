
class GetMediaTest extends Test {

    constructor(dependsOn) {
        super();
        super.addDependentOn(dependsOn);
    }

    isFinished() {
        
        if(fetchedMediaObject == false)
            return false;
        return true;
    }

    test() {

        jQuery.get(testUrl + "get_media/" + mediaObject._id, {}, function(result) {
        
            fetchedMediaObject = jQuery.parseJSON( result );
        
            if(fetchedMessageObject.error != undefined) {
                logTest(false, "GetMediaTest: failed get media " + result);
            } else {
                if(fetchedMediaObject.id == mediaObject._id)
                    logTest(true, "GetMediaTest: fetched media" + result);
                else
                    logTest(false, "GetMediaTest: fetched media ID differs" + result);
            }
            }).error(function() {
                logTest(false, "GetMediaTest: Error in connection");
        });
    }

}