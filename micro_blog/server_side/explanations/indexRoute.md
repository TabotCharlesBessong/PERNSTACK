
# fetchTodos

This code is a function named `fetchTodos` that takes in three arguments: `req`, `res`, and `next`. It appears to be part of an Express.js application.

The function uses the `db.all` method to query a database for all rows in the `todos` table where the `owner_id` column matches the `id` property of the `user` object on the `req` object. The results of this query are passed to a callback function as the second argument to `db.all`.

If there is an error with the database query, the callback function will pass the error to the `next` function and return early.

If there is no error, the callback function maps over the rows returned by the database query and creates a new array of objects representing todos. Each todo object has an `id`, `title`, `completed`, and `url` property. The value of the `completed` property is determined by whether the value of the `completed` column in the database row is equal to 1.

The array of todos is then assigned to the `todos` property of the `res.locals` object. The number of active todos (todos that are not completed) is calculated by filtering the array of todos and counting how many have a `completed` property that is false. This value is assigned to the `activeCount` property of the `res.locals` object.

The number of completed todos is calculated by subtracting the number of active todos from the total number of todos. This value is assigned to the `completedCount` property of the `res.locals` object.

Finally, the callback function calls the `next` function to move on to the next middleware or route handler in the Express.js application.

Is there anything else you would like me to explain? 😊