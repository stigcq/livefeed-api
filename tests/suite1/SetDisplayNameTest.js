class SetDisplayNameTest extends Test2 {

    constructor(loginTest) {
        super();
        this.addDependentOn(loginTest);
        this.loginTest = loginTest;
      }


      setupTest() {

        this.setPost(testUrl + "set_display_name/", { 
            display_name: "Change displayname", 
            session_token: this.loginTest.responseObject.session_token 
        });
  
        super.assert("", "n", 1);
        super.assert("", "ok", 1);
  
    }


}