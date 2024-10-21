const express= require("express");
const { blogs } = require("./model/index");
const { storage ,multer } = require("./middleware/multerConfig");
const upload =multer({storage : storage})
const app=express()


require("./model/index");

app.set('view engine' ,'ejs')
app.use(express.urlencoded({extended:true}))


app.get("/", async(req,res)=>{
  const blogsTableblogs = await blogs.findAll()
   res.render("home",{blogs:blogsTableblogs}) 
})
app.get("/about",(req,res)=>{
   //blogs table bata data nikalna paryo
    res.render("about") 
 })
 app.get("/addblog",(req,res)=>{
    res.render("addblog") 
 })
 app.post("/addblog",upload.single('image') ,async(req,res)=>{
  console.log(process.env.name)
  
  const {title ,subtitle, description}=req.body
    if(!title || !subtitle || !description){
      return res.send("please provide title,subtitle description")
    }
  await blogs.create ({
   title :title,
   subTitle :subtitle,
   description :description,
   image: "http://localhost:3000" + req.file.filename
  })
  res.redirect("/")
 })
app.get("/blog/:id",async(req,res)=>{
  const id =req.params.id
  const foundData =await blogs.findByPk(id)
  console.log(foundData)
  res.render("singleBlog",{blog : foundData})
})
app.get("/delete/:id",async(req,res)=>{
  const id =req.params.id
 await  blogs.destroy({
    where :{
id : id
    }
  })
  
  res.send("Deleted Successfully")
})
app.get("/update/:id",async(req,res)=>{
  const id = req.params.id
  const blog =await blogs.findByPk(id)
  res.render("updateBlog",{id ,blog})
})
app.post("/update/:id",async(req,res)=>{
  const {id}= req.params
  const {title, subtitle, description}=req.body
 await blogs.update({
  title :title,
  subTitle : subtitle,
  description: description
 },{
  where : {
    id : id
  }
})
res.redirect("/blog/"+id)
})
app.use(express.static("./uploads/"))
const PORT=3000
app.listen(PORT,()=>{
    console.log(`nodejs project has started at port 3000`)
})