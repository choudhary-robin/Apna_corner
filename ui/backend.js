const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const alert=require("alert");
const app = express();
app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Robin@123",
    database: "demo"
});

// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.get("/",function(req,res){
    res.sendFile(__dirname + "/login.html");
})

app.post("/",encoder, function(req,res){
	
   var username = req.body.username;
   var password = req.body.password;
	//console.log(req.body);
    connection.query("select * from form where Email = ? and Password = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/welcome");
        } else {
			  const username = req.body.username;
			  const password = req.body.password;
			  console.log(username);
			  
			//res.send(400,"Wrong username or password");
			var sql = "INSERT INTO form(Email,Password) VALUES('"+username+"','"+password+"')";
			
			//+ is used to insert valueOf variable  and also find the difference between single and double quote in nodejs;
			
			connection.query(sql, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
			res.redirect("/");
		});
     
        }
        
    })
})



// when login is success
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/index.html")
})


app.get("/order",function(req,res){
    res.sendFile(__dirname + "/order-food.html")
})

app.post("/orders",encoder,function(req,res){
	var x=req.body.s1;
	var y=req.body.s2;
	//console.log(x);
	//console.log(y);
     var sql = "INSERT INTO orders (oid, quantity) VALUES ('"+x+"','"+y+"')";
     connection.query(sql, function (err, result) {
     if (err) throw err;
     console.log("1 record inserted");
	 alert("order successfully taken");
	 res.redirect("/welcome");
   });
	
})


// set app port 
app.listen(3000);