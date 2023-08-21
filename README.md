# instagram-clone
Clone this repo: git clone https://github.com/Cooksey99/instagram-clone

## Steps to get running:

1. Install dependencies in root root directory: npm install

2. Create user with PASSWORD and CREATEDB in PostgreSQL
```
CREATE USER username WITH password CREATEDB;
``` 

3. Create .env file in directory. Copy the contents of env.example into the newly created .env file. Change the information to match that of which you created

4. Verify that your proxy matches the one in your .env file.
>navigate to /frontend/package.json and add to the bottom: "proxy": "http://localhost:5000"
make sure the number at the end (5000, in this case) matches the PORT from your .env file.

5. Run the following commands in your terminal to generate, migrate and seed the database
```
npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```
> Additional information on Sequalize migrations can be found here: https://sequelize.org/docs/v6/other-topics/migrations/
> - Due to this using `dotenv`, where the official documents show `npx sequelize-cli`, use `npx dotenv sequelize` instead.

6. In your terminal, nagivate to /backend and run `npm start`
7. In your terminal, navigate to /frontend and run `npm start`
<br/>
<br/>
---
This operates as a clone of Instagram. 

## Notes on current functionality:
  - Full CRUD of posts and comments are working.
  - Follows, likes, search, and settings are not yet fully functioning. For the purpose of my live site, I have removed those parts entirely to prevent any     attempted interactions with those parts.
  - Any invalid routes are redirected to a 404 route, which has not yet been designed.
  - Users are able to create a post, consisting of a single image and a caption, as long as 2,200 characters long (although, further design is required to     make this fully optimal). The image is posted using an image URL, which is filtered using regex. Some images will not be valid, due link not ending in     a proper format (E.g .jpeg)
  - Error handling is currently working, however, there are no restrictions on posting a space into text boxes.


## Common Issues/Troubleshoot Tips
1. This project was built using Node v16.20.2. If issues are encountered when running `npm start` for `frontend`, try running this in the command line (restart terminal session after this):
```
nvm use 16
```