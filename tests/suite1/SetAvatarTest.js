class SetAvatarTest extends Test2 {

    constructor(loginTest, addMediaTest) {
        super();
        this.addDependentOn(loginTest);
        this.addDependentOn(addMediaTest);
        this.loginTest = loginTest;
        this.addMediaTest = addMediaTest;
      }


      setupTest() {

        this.setPost(testUrl + "set_avatar/", { 
            media_id: this.addMediaTest.responseObject.id, 
            session_token: this.loginTest.responseObject.session_token 
        });
  
        super.assert("", "n", 1);
        super.assert("", "ok", 1);
  
    }


}