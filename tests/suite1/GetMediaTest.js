
class GetMediaTest extends Test2 {

    constructor(addMediaTest) {
        super();
        super.addDependentOn(addMediaTest);
        this.dependentOnAddmedia = addMediaTest; 

    }

    setupTest() {

        this.setGet(testUrl + "get_media/" + this.dependentOnAddmedia.responseObject.id);
  
        super.assert("Media id match", "id", this.dependentOnAddmedia.responseObject.id);
        super.assertDefined("id");
        super.assertNotDefined("error");
  
    }



}