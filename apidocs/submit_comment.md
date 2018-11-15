**Submit a comment**
----
  Adds a comment to a message. The API currently allow every user to
  post comments to every message. 

* **URL**

  /submit_comment/

* **Method:**

  `POST`
  
*  **URL Params**

None

* **Data Params**

     **Required:**
 
   `content=[String]`<br />
   `message_id=[String]`<br />
   `session_token=[String]` the session_token related to the user session<br />

     **Not Required:**
 
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `coming soon! :)`
 
* **Error Response:**

  * **Code:** 200  <br />
    **Content:** `{ error : 1, message: "Need to be logged in" }`

  * **Code:** 200  <br />
    **Content:** `{ error : 12, message: "no message with messageid exists" }`


* **Sample Call:**

  ```javascript
    jQuery.post("/submit_comment/", { 
        content: "My super funny comment",
        message_id: 1,
        session_token: 12718211}, function(data) {
            //do somethng
    });
  ```