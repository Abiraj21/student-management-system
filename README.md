# student-management-system

This is a web application system which has been created for manage student information for the ABC university. Using this system the Staffs can manage their students by adding information, giving access and search for student information. This application is help to save time for the staff to reduce the manual labour work of maintain the data.

Functional requirement

1. User Login
2. User registration
3. Student Create
4. Student View
5. Student Update
6. Student Delete
7. Student Search
8. User can upload image
9. User logout
10. View own profile

Non-functional Requirement

1. Passwords must be encrypted.
2. REST API must return JSON.
3. Responsive UI.
4. JWT Authentication.
5. Input validation.
6. Error handling.
7. Environment variables.
8. Scalable folder structure.
9. Fast response time.

API Endpoints

User route endpoints

1. POST /api/auth/register
2. POST /api/auth/login
3. GET /api/auth/profile

Students route endpoint

1. GET /api/students
2. GET /api/students/:id
3. POST /api/students
4. PUT /api/students/:id
5. DELETE /api/students/:id

Database COllection Structure

User

1. _id
2. name
3. email
4. password
5. role
6. createdAt
7. updatedAt

Students

1. _id
2. firstName
3. lastName
4. email
5. phone
6. course
7. year
8. profileImage
9. createdBy
10. createdAt
11. updatedAt