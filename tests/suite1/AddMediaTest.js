
class AddMediaTest extends Test2 {

    constructor(dependentOnLogin) {
        super();
        this.addDependentOn(dependentOnLogin);
        this.dependentOnLogin = dependentOnLogin; 
      }

      setupTest() {

        const mediaUrl = "http://itselskabet.nu/files/9237ccb4-59cc-4ed6-b4c2-b9857db57db0/1_21FF74FA-8FBD-0D53-1E3C-DDE6777224F920150806.jpg";

        this.setPost(testUrl + "add_media/", { 
            media_url: mediaUrl, 
            message_id: 1,
            session_token: this.dependentOnLogin.responseObject.session_token 
        });
  
        super.assert("Media url match", "media_url", mediaUrl);
        super.assert("", "message_id", 1);
        super.assertDefined("id");
        super.assertNotDefined("error");
  
    }


}