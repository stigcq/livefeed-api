**Set avatar for a user**
----
    this messages sets avatar (profilephoto) for a user. It takes
    existing media id as argument. After setting avatar the media_url
    is accessible on the user object as avatar_url.

* **URL**

  /set_avatar/

* **Method:**

  `POST`
  
*  **URL Params**

None

* **Data Params**

     **Required:**
 
   `media_id=[String]`<br />
   `session_token=[String]` the session_token related to the user session<br />

     **Not Required:**
 
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"n":1,"nModified":1,"ok":1}`
 
* **Error Response:**

  * **Code:** 200  <br />
    **Content:** `{ error : 1, message: "Need to be logged in" }`

  * **Code:** 200  <br />
    **Content:** `{ error : 14, message: "No media with ID exists" }`


* **Sample Call:**

  ```javascript
    jQuery.post("/set_avatar/", { 
        media_id: 121212121,
        session_token: 12718211}, function(data) {
            //do somethng
    });
  ```