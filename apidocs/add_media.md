**Add Media**
----
  Adds a media with the specific user as owner. A media is basicly just a url
  to a file (image). The API doesnt have functions for uploading files, so
  to be able to have user avatars, or photos in messages, one need add a media
  from other source than the API, which could be an uploading system running
  on same server - see the public/test for example with endpoint.php and fineuploader.

* **URL**

  /add_media/

* **Method:**

  `POST`
  
*  **URL Params**

None

* **Data Params**

     **Required:**
 
   `media_url=[String]`<br />
   `session_token=[String]` the session_token related to the user session<br />

     **Not Required:**
  `message_id=[String]` If set to a specific message id obviously the media
  will be attacked to this message. If not set, it will be 0, and per default
  the next time a user submits a message all medias with message_id 0 will be 
  attached to this message. This behaviour can be avoided by setting the message_id
  to some arbitrary value with no existing messages. <br />
 
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `"user_id":"5bed848a4f4b2969713b4785","media_url":"http://pathtophoto.jpg","media_date":1542292621985,"message_id":"1","id":"5bed848d4f4b2969713b4787"`
 
* **Error Response:**

  * **Code:** 200  <br />
    **Content:** `{ error : 1, message: "Need to be logged in" }`



* **Sample Call:**

  ```javascript
    jQuery.post("/add_media/", { 
        media_url: "http://pathtophoto.jpg",
        message_id: 1,
        session_token: 12718211}, function(data) {
            //do somethng
    });
  ```