**Login**
----
  Login a user, return a JSON object with users id and session_token

* **URL**

  /login/

* **Method:**

  `POST`
  
*  **URL Params**

None

* **Data Params**

     **Required:**
 
   `email=[String]`<br />
   `md5password=[String]` password md5 encrypted<br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id":"5bd1d501cc91c3745021d816", "session_token":8685659,}`
 
* **Error Response:**

  * **Code:** 200  <br />
    **Content:** `{ error : 13, message: "No such user", session_token: 1 }`



* **Sample Call:**

  ```javascript
    jQuery.post("/login/", { 
        email: "joe@doe.com",
        md5password: "md5encryptedpassword"}, function(data) {
            //do somethng
    });
  ```