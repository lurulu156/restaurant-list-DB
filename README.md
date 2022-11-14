# Restaurant List
A simple web application for restaurant list

## Features
#### Main page
- listing restaurants from seeds in MongoDB
- search restaurants by title or category
- show the restaurant detailed info by clicking the info button beneath the picture
- add a new restaurant by clicking the up-right button
- update the restaurant info by clicking the pencil button beneath the picture in main page
- delete the restaurant by clicking the trash button beneath the picture in main page
#### Restaurant page
- update the restaurant info by clicking button on the top center of page
- delete the restaurant by clicking the button on the top right of page

## How to install
1. Install node.js
2. Clone this project to local
3. After opening the file in local, go to the folder by terminal and then input
```bash
  npm install
```
4. After the installation, prepare your own MongoDB link: MONGODB_URI
5. If you already have a list, you could generate the seeds by inputting:
```bash
  npm run seed
```
or  you could just directly run the app by inputting:
```bash
  npm run start
```

7. If you see below message, it means it's running successfully. And just type the URL into the browser.
```bash
  Express is listening on http://localhost:3000
```
8. Exist it by :
```bash
   ctrl + c
```
### Languages
- Javascript
- Express @4.16.4
- Express-Handlebars @3.0.0
- Node.js @16.18.0
- Bootstrap @5.2.2
- Font-awesome @6.2.0
- Mongoose @5.9.7

