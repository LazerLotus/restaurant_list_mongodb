# Restaurant List

 This is a simple restaurant list for Taipei Foodie and built on MongoDB
# Dependency 
This project is build by:
node.js: 14.16.0
nodemon: 2.0.20
bootstrap: 4.3.1
express: 4.16.4
express-handlebars: 3.0.0
body-parser: 1.20.1
mongoose: 5.9.7


# Features

1. Index Page: user can see all restaurants on index page, includes:
- Photo of restaurant
- Name of restaurant
- catagory of restaurant
- rate of restaurant

2. User can click restaurant to see further details, includes:
- catagory
- address
- phone number
- simple description of restaurant
- photo

3. Search name or category to find specific restaurant(s)
- if the keyword is valid, keyword will show on search bar to remind user.

4. Create Restaurant
- User can click "Create a new restaurant" and fulfill a form to create a new restaurant

5. Delete Restaurant
- User can click "Delete" to delete restautant
6. Edit Restaurant
- User can click "edit" to submit form to chagne detail of restaurant
7. Sorting
- User can click sort button and sorting with name, location and category

# Enviroment setup
Node.js

# Install this Project
0. before you start install project, please make sure you already installed node.js and npm
1. Start your Terminal 
```
git clone https://github.com/LazerLotus/restaurant_list_mongodb
```
2. change directory to resraurant_list_mongodb
3. enter following command in your terminal
```
npm install 
```
4. after installation, enter following command in your terminal
```
npm run dev
```
5. check following message is shown on terminal
```
Express is listening on localhost:3000
```
6. open your browser and type http://localhost:3000 on url 
7. if you want to stop service, please press ctrl+c in your terminal

#Create Seed data in db
Use this command to create seed data
```
npm run seed
``` 

# Contributor
Lu-An Tsai
luan.tsai1991@gmail.com


> **Note**
> This is a note

> **Warning**
> This is a note
This is note body

>**Behold, Dog**
>THis is a dog

> **Note**
> This is a note

> **Warning**
> This is a warning
