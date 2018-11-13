class SetAvatarTest extends Test {

    constructor(dependsOnTest) {
        super();
        this.addDependentOn(dependsOnTest);
      }


    isFinished() {
        
        if(avatarObject == false)
            return false;
        return true;
    }

        test() {

            jQuery.post(testUrl + "set_avatar/", { 
                media_id: mediaObject._id,
                session_token: loggedInUserObject.session_token }, function(result) {
        
                    mediaObject = jQuery.parseJSON( result );
        
                    if(feedObject.error != undefined) {
                        logTest(false, "SetAvatarTest: fail set avatar" + result);
                    } else {
                        logTest(true, "SetAvatarTest: avatar set" + result);
                    }
            }).error(function() {
                logTest(false, "SetAvatarTest: Error in connection");
            });
        }
}