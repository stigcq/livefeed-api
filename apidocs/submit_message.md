**Submit mesage**
----
  Adds or updates a message, returns the message as JSON object

* **URL**

  /submit_message/

* **Method:**

  `POST`
  
*  **URL Params**

None

* **Data Params**

     **Required:**
 
   `content=[String]` The message content<br />
   `session_token=[String]` The user session token<br />

     **Optional:**

   `message_id=[String]` If editing message<br />
   `feed_id=[String]` If editing irrelevant, if new message and not set messages goes to users default feed<br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"feed_id":"5bd76455d7cc2f0ffc8cf5b5","user_id":"5bd7644cd7cc2f0ffc8cf5b4","content":"Test message","reply_to":0,"feed_time":1541452480097,"feed_title":"NewTestFeed","id":"5be0b2c093054419d428fa38"}`

    feed_time is msecs since 1970.
 
* **Error Response:**

  * **Code:** 200  <br />
    **Content:** `{ error : 1, message: "user not logged in" }`

  * **Code:** 200  <br />
    **Content:** `{ error : 3, message: "No feed for user" }`

  * **Code:** 200  <br />
    **Content:** `{ error : 8, message: "No such feed exists" }`


* **Sample Call Add Message:**

  ```javascript
        jQuery.post("/submit_message/", { 
            feed_id: feedId,
            content: messageContent, 
            session_token: sessionToken }, 
            function(data) {
                //do something
        });
  ```