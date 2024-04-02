const express=require('express')
const pool=require('./db')

const app=express()
app.use(express.json())

//create new user
app.post("/signup",async(req,res)=>{
    try {
        const {username,password,email}=req.body
        const user=await pool.query(
            "INSERT INTO users (username,password,email) VALUES($1,$2,$3) RETURNING *",
             [username,password,email]
        );
        res.json(user.rows[0])
    } catch (error) {
        console.log(error)
    }
})

//get all users
app.get("/users", async (req, res) => {
    try {
      const allusers = await pool.query("SELECT * FROM users");
      res.json(allusers.rows);
    } catch (err) {
      console.error(err.message);
    }
});

//get one user
app.get("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM users WHERE todo_id = $1", [
        id
      ]);
  
      res.json(todo.rows[0]);
    } 
    catch (err) {
      console.error(err.message);
    }
});

//update user
app.put("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { username,password,email } = req.body;
      const updateuser = await pool.query(
        "UPDATE users SET username = $1, password = $2, email = $3 WHERE u_id = $4",
        [username, password, email, id]
      );
      res.json("User updated");
    } 
    catch (err) {
      console.error(err.message);
    }
});


//delete user
app.delete("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM users WHERE todo_id = $1", [
        id
      ]);
      res.json("User deleted");
    } 
    catch (err) {
      console.log(err.message);
    }
});


app.listen(8002,()=>{
    console.log("Running on port")
})