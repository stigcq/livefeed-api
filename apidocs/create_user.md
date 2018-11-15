**Create User**
----
  Creates a user, return userobject as JSON

* **URL**

  /create_user/

* **Method:**

  `POST`
  
*  **URL Params**

None

* **Data Params**

     **Required:**
 
   `email=[String]`<br />
   `password=[String]`<br />
   `display_name=[String]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"email":"test@test.com","password":"662f707d5491e9bce8238a6c0be92190","display_name":"tester","session_token":8685659,"id":"5bd1d501cc91c3745021d816"}`
 
* **Error Response:**

  * **Code:** 200  <br />
    **Content:** `{ error : 5, message: "Error creating user, maybe Email already in use" }`

  * **Code:** 200  <br />
    **Content:** `{ error : 9, message: "Some parameters not set" }`


* **Sample Call:**

  ```javascript
    jQuery.post("/create_user/", { 
        email: "joe@doe.com",
        display_name: "Joe", 
        password: "hidden" }, function(data) {
            //do somethng
    });
  ```