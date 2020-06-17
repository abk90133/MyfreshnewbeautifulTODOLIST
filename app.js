//jsversion6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Exercise", "Take Bath", "Make Breakfast"];
let workitems = [];



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){ //this line of code is for the main todolist we have. so the all functioning in the main page is supported from here.
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("lists", {listtitle: day, newlistitems: items});


});



app.post("/", function(req, res){

  let item = req.body.newitem; //if yes, then we have pushed it to the item array that we have made

  if(req.body.list === "Work"){ //here we have checked whether it is from the work list or not?

  workitems.push(item); //and this item will be pushed to the workitems that we have in the workitems made down in the app.get(/work)
  res.redirect("/work"); //it is redirecting the work route to enter these fields into this file named as work.
  }else{
  items.push(item);
  res.redirect("/");
 }

});

app.get("/work", function(req,res){ //here the all functioning from the /work will take place.
  res.render("lists", {listtitle: "Work List", newlistitems: workitems});
});

app.get("/about", function(req, res) { //this is actually used to get any page just afetr writing our address as: localhost:3201/about
  res.render("about"); //here we are not calling any parameter wriiten into it. But only will show our page specifications
});

app.listen(3202, function(){
  console.log("Server started on port 3202");
});
