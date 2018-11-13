
class GetMediaTest2 extends Test2 {

    constructor(loginTest, addMediaTest) {
        super();
        super.addDependentOn(loginTest);
        super.addDependentOn(addMediaTest);
        this.dependentOnLogin = loginTest; 
        this.dependentOnAddmedia = addMediaTest; 

    }

    setupTest() {

        this.setGet(testUrl + "get_media/" + this.dependentOnAddmedia.responseObject.id);
  
        super.assert("Media id match", "id", this.dependentOnAddmedia.responseObject.id);
        super.assertDefined("id");
        super.assertNotDefined("error");
  
    }



}