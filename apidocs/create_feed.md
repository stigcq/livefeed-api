**Create Feed**
----
  Creates a feed for the loggedin user. A user can post messages to specific
  feeds. So a user can have f.x. "My garden feed", "My cooking"

* **URL**

  /create_feed/

* **Method:**

  `POST`
  
*  **URL Params**

None

* **Data Params**

     **Required:**
 
   `feed_title=[String]`<br />
   `session_token=[String]` the session_token related to the user session<br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"user_id":"5bed848a4f4b2969713b4785","feed_title":"Test Feed","feed_date":1542292620956,"id":"5bed848c4f4b2969713b4786"}`
 
* **Error Response:**

  * **Code:** 200  <br />
    **Content:** `{ error : 1, message: "Need to be logged in to create feed" }`



* **Sample Call:**

  ```javascript
    jQuery.post("/create_feed/", { 
        feed_title: "Test Feed",
        session_token: 12718211}, function(data) {
            //do somethng
    });
  ```