**Deletes a message**
----
    Deletes a message. Only owner of the message can delete it. 

* **URL**

  /delete_message/

* **Method:**

  `POST`
  
*  **URL Params**

None

* **Data Params**

     **Required:**
 
   `message_id=[String]`<br />
   `session_token=[String]` the session_token related to the user session<br />

 
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"n":1,"ok":1}`

* **Success Response :**

  * **Code:** 200 <br />
    **Content:** `{"n":0,"ok":1}`

No message was deleted (probably dont exists)
 
* **Error Response:**

  * **Code:** 200  <br />
    **Content:** `{ error : 1, message: "Need to be logged in" }`

  * **Code:** 200  <br />
    **Content:** `{ error : 6, message: "ID is not a valid ID" }`


* **Sample Call:**

  ```javascript
    jQuery.post("/delete_message/", { 
        message_id: 121212121,
        session_token: 12718211}, function(data) {
            //do somethng
    });
  ```