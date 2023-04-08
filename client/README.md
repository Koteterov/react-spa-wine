# Catalog for Wine Connoisseurs
React single page application generated with Create React App.
## :speech_balloon: Concept
An application where wine connoisseurs, after authentication, can share their wine preferences as well as edit, delete, like, unlike and see all their own wine posts. Also, they can visit their user's profile summary page. 
## :information_source: Structure
The application has the following parts:
### Home page
![home](https://user-images.githubusercontent.com/102145445/206907516-a0e10634-60eb-4c20-923c-3ac555c07cd8.jpg)
* Static page for all guests.
* They can visit all other sections depending on the authentication status - header information is changed on login and logout and shows the current user after login.
### All Wines Page
![all](https://user-images.githubusercontent.com/102145445/206907921-f47fc6a0-2e05-40b9-acea-b5630f278d2d.jpg)
* Guests can browse all wines posted so far using pagination. They can choose how many pages to see or jump to first or last page.
* Search for wines.
* The guest can see wine details by clicking the 'Details' button which will open the details page.
### Details Page - available by:
1. 'Details' button in Home Page - available for all. Without authentication it will show only general information such as detailed wine information as well as summary of total likes and a list of people who liked the wine post. If authenticated, the user can take advantage of the full functionality of this page, which is:
* Edit and Delete if the user is an owner of the post (described in more details below).
* Like and Unlike if the user is NOT an owner of the post.
2. 'Details' button in Wines of... Page - the list displays owner's wines, therefore buttons 'Edit' and 'Delete' are available.
3. 'See more...' button in Profile Page - users see buttons 'Edit' and 'Delete' or 'Like' and 'Unlike' depending on whether 'created wines' list or 'liked wines' list is chosen.

Details Page before login:
![details](https://user-images.githubusercontent.com/102145445/206908370-99030bb8-5511-4ee6-addc-c8337cb11b8c.jpg)
Details Page after login:
![details2](https://user-images.githubusercontent.com/102145445/206914035-a1460259-8cc2-4771-b333-6bc2728ff777.jpg)

### Register Page
![register](https://user-images.githubusercontent.com/102145445/206908551-3e9b03b6-506d-4254-bf36-ca0b009fc811.jpg)
* Guests should register in order to use the functionality of the application.
* The sign up form validates each field and shows the necessary information for filling.
* After successful registration the user is automatically logged in and a 'success' message is shown.
### Login Page
![login](https://user-images.githubusercontent.com/102145445/206908775-9c861855-b559-4cbd-8704-17a6c9a737bf.jpg)
* Registered users can log in by their email and password.
* The login up form validates each field.
* After successful login, a 'success' message is shown.
* The application can be tested with email: peter@abv.bg, password: 22222

## After authentication the users can use the following parts:
### Create Wine Post Page
![create](https://user-images.githubusercontent.com/102145445/206909016-f8e21ac9-7826-48c7-9802-ad63e24c96be.jpg)
* The create form validates each field and shows the necessary information for filling.
### Edit Wine Page
* Available only for logged in users who are creators of the wine post.
* The edit form validates each field and shows the necessary information for filling.
### Delete Wines - available only for creators of wine posts
### Wines of...(user's email) Page
![my](https://user-images.githubusercontent.com/102145445/206909140-fbdd8485-2524-4733-be2e-f1235408834a.jpg)
* A list with the created wine posts of the user.
* Details page can be accessed by 'Details' button.
### Profile Page showing user information as below:
![profile](https://user-images.githubusercontent.com/102145445/206909252-6d45b4ba-690a-48b1-8abc-76e724c06dd1.jpg)
* Full name, email, count of created wines, count of liked wines.
* A list with created wines.
* A list with liked wines.
### Errors
Errors from the backend are also displayed for better user experience. For example, when the email address has already been taken. These are shown in red for one second.
## Some technical stuff
* Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

* Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


