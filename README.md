
#ArticleXpress


# Project Description:

Welcome to ArticleXpress, a web-based platform built with Node.js, Express.js, MongoDB, and JWT authentication for a seamless and secure user experience. ArticleXpress provides users with access to a wide range of articles, ensuring a premium reading experience for all. The application prioritizes security, validation, and ease of use, offering a reliable platform for users to explore, engage, and connect.



### Features

* `User Authentication and Authorization:` .User registration and login are facilitated through a robust authentication system that supports both email and phone number verification. Passwords are hashed using bcrypt for added security, and duplicate emails or numbers are prohibited, ensuring a unique user base.

* `Public Access and Premium Content:` ArticleXpress welcomes all users to access non-premium articles without any login requirements. However, exclusive premium articles are protected, reserved only for premium users. Users can easily upgrade their accounts to premium by making a payment.`

* `User-Friendly Profile Management` Users have complete control over their profiles, allowing them to update personal information and manage their accounts with ease.`

* `Article Exploration:` All users can browse through the collection of articles available on the platform, giving them a glimpse of the rich content ArticleXpress offers.`

* `Comment Interaction:` Once logged in, users can actively engage with articles by leaving comments, fostering a sense of community and interaction`

* ` Secure Token Handling:` JWT tokens are utilized for user authentication and authorization. These tokens are securely sent using cookies, enhancing the application's security.`

* ` Scalability with Clustering: `To ensure high availability and smooth user experience, ArticleXpress incorporates clustering to distribute the application workload across multiple Node.js processes. Clustering allows the application to efficiently utilize system resources, reducing response time and increasing overall performance. With clustering, ArticleXpress is well-prepared to handle increasing traffic and concurrent user requests, providing a scalable platform for users.`




## Installation

Install my-project with npm

Clone the repository. Run npm install to install dependencies. Create a .env file and add your MongoDB connection URI, port, and JWT keys. Run npm start to start the application.
    
https://github.com/ankushsingh7997/Article.git



Clone the repository and navigate to the project directory
Install dependencies using npm install
Create a .env file with the following variables:
* `URI` - MongoDB Atlas connection string
* `PORT` - Port to run the server on
* `JWT_ACCESS_KEY` - Secret key for JWT access token 
* `JWT_ACCESS_EXPIRE` - Expiration time for JWT access token

## Database Schema
1.User Collection
* name (String)
* number (String)
* email (String)
* password (String)
* is_premium (Boolean)

2.Article Collection
* title (String)
* content (String)
* is_premium (Boolean)

3.Comment Collection
* article_reference (Reference to Article Collection)
* user_reference (Reference to User Collection)
* comment (String)




## Technical Highlights:

* Backend: Node.js and Express.js form the backbone of ArticleXpress, offering a flexible and scalable server architecture.

* Database: MongoDB serves as the robust database solution, ensuring efficient data storage and retrieval.

* Authentication: JWT authentication ensures a secure login mechanism, enabling access control for premium articles.

* Password Security: Bcrypt encryption protects user passwords, safeguarding sensitive information.

* Clustering: Node.js clustering is implemented to achieve scalability and optimal utilization of system resources.


## API Endpoints
User Signup (POST) - /signup        
* Allows users to sign up with their name, number, email, and password.

User Login (POST) - /login
* Allows users to log in using their number or email and password.

User Profile Edit (POST) - /editUser
* Allows logged-in users to edit their profile information.

User Delete (DELETE) - /deleteUser
* Allows logged-in users to delete their profiles.

Get Article (GET) - /getArticle/:id
* Fetches a specific article by ID. Premium articles require authentication.

Get All Articles (GET) - /getAllArticles
* Fetches all articles. Premium articles require authentication.

Comment on Articles (POST) - /comment
* Allows logged-in users to comment on articles.

Go Premium (POST) - /goPremium
* Allows logged-in users to upgrade to premium (change is_premium field).



## Depedencies
*"bcrypt": "^5.1.0",

*"dotenv": "^16.3.1",

*"express": "^4.18.2",

*"helmet": "^7.0.0",

*"jsonwebtoken": "^9.0.1",

*"mongoose": "^7.4.1",

*"morgan": "^1.10.0"





## Conclusion

 the ArticleXpress REST API backend, built with Node.js, Express.js, and MongoDB, successfully fulfills the specified task requirements. The platform offers secure user authentication, scalable clustering, and intuitive user interactions, creating a robust and enjoyable reading experience for users. With a strong foundation in place, ArticleXpress is poised for future growth and enhancements.