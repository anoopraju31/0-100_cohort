# Jwt Authentication

- Lets start by creating our assignment for today A website which has 2 endpoints.
    1. POST /signin
        
        ```
            Body - {
                username: string
                password: string
            }

        ```

        - Returns a json web token with username encrypted

    2. GET /users
    
        ```
            Headers - Authorization header
        ```
    
        - Returns an array of all users if user is signed in (token is correct)
        - Returns 403 status code if not