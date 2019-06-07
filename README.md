# NearestCustomers

This project was generated with node version v8.11.3

## Dependencies

MongoDB used for database managemnent.
Express.js framework for creating Node.js application

## Running the program

1. Run `npm i` to install the dependencies
2. Start the MongoDB server using command `mongod --dbpath = your_dbpath` from your mongodb directory like `C:\Program Files\MongoDB\Server\4.0\bin`.
3. Run `npm start` to run the program.
4. Application will listen on port 4000

Application url: http://localhost:4000/customerLocation

## Seeding Data in MongoDB
When you run the program first time using npm start `db.collection.insertMany()` will populate the customers data into the database.
After first run comment the above mentioned command on `line no. 22` to avoid redundant data.
