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
 
   `email=[String]`
   `password=[String]`
   `display_name=[String]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"email":"test@test.com","password":"662f707d5491e9bce8238a6c0be92190","display_name":"tester","session_token":8685659,"_id":"5bd1d501cc91c3745021d816"}`
 
* **Error Response:**

  * **Code:** 200  <br />
    **Content:** `{ error : 9, message: "Error creating user, maybe Email already in use" }`



* **Sample Call:**

  ```javascript
    jQuery.post("/create_user/", { 
        email: "joe@doe.com",
        display_name: "Joe", 
        password: "hidden" }, function(data) {
            //do somethng
    });
  ```