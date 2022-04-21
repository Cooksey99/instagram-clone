# instagram-clone
Clone this repo: git clone https://github.com/Cooksey99/instagram-clone

Install dependencies in root root directory: npm install

Create user with PASSWORD and CREATEDB in postgres

CREATE USER username WITH password CREATEDB;
Create .env file in directory. Copy the contents of env.example into the newly created .env file. Change the information to match that of which you created

Verify that your proxy matches the one in your .env file.

navigate to /frontend/package.json and add to the bottom: "proxy": "http://localhost:5000"
make sure the number at the end (5000, in this case) matches the PORT from your .env file.
Run the following commands in your terminal to generate, migrate and seed the database

npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
In your terminal, nagivate to /backend.

Run: npm start
In your terminal, navigate to /frontend

Run: npm start

---------------
This operates as a clone of Instagram. 

## Notes on current functionality:
  - Full CRUD of posts and comments are working.
  - Follows, likes, search, and settings are not yet fully functioning. For the purpose of my live site, I have removed those parts entirely to prevent any     attempted interactions with those parts.
  - Any invalid routes are redirected to a 404 route, which has not yet been designed.
  - Users are able to create a post, consisting of a single image and a caption, as long as 2,200 characters long (although, further design is required to     make this fully optimal). The image is posted using an image URL, which is filtered using regex. Some images will not be valid, due link not ending in     a proper format (E.g .jpeg)
  - Error handling is currently working, however, there are no restrictions on posting a space into text boxes.
