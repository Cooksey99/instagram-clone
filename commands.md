cd backend:
    npm i

    generate models
        User:   npx sequelize model:generate --name User --attributes username:string,email:string,first_name:string,last_name:string,hashed_password:string
        Post:   npx sequelize model:generate --name Post --attributes user_id:integer,image:string,caption:string
        Comment:   npx sequelize model:generate --name Comment --attributes post_id:integer,user_id:integer,comment:string

        <!-- Follower:   npx sequelize model:generate --name Follower --attributes user_id:integer
        Following:   npx sequelize model:generate --name Following --attributes user_id:integer -->
