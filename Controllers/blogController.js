const { blogs,users ,comments} = require("../model/index");

// Home page
exports.getAllBlogs = async (req, res) => {

  const blogsTableblogs = await blogs.findAll({
    include:{
      model:users
    }
  });
  // console.log(blogsTableblogs)
  // console.log(JSON.stringify(blogsTableblogs, null, 2));
  res.render("home", { blogs: blogsTableblogs });
};

// Add blog page
exports.renderAddBlog = (req, res) => {
  res.render("addblog");
};

// Create blog
exports.createBlog = async (req, res) => {
  const {userId}=req
  const { title, subtitle, description } = req.body;

  if (!title || !subtitle || !description) {
    return res.send("Please provide title, subtitle and description");
  }

  if (!req.file) {
    return res.send("Please upload image");
  }

  await blogs.create({
    title: title,
    subTitle: subtitle,
    description: description,
    imageUrl: req.file.filename,
    userId:userId
  });

  res.redirect("/");
};

// Single blog
exports.getSingleBlog = async(req,res) => {
  const id = req.params.id;
  const foundData = await blogs.findByPk(id);
  const commentsData=await comments.findAll({
    where:{
      blogId:id
    },
    include:{
      model:users
    }
  })
  console.log("commentsData",commentsData)
  res.render("singleBlog", { blog: foundData,comments:commentsData });

}
// Delete blog
exports.deleteBlog = async (req, res) => {
  const id = req.params.id;
  await blogs.destroy({
    where: { id: id },
  });

  res.redirect("/");
};

// Update page
exports.renderUpdateBlog = async (req, res) => {
  const id = req.params.id;
  const blog = await blogs.findByPk(id);
  res.render("updateBlog", { id, blog });
};

// Update blog
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, description } = req.body;

  await blogs.update(
    {
      title: title,
      subTitle: subtitle,
      description: description,
    },
    {
      where: { id: id },
    }
  );

  res.redirect("/blog/" + id);
}; 
exports.addComment=async(req,res)=>{
  const userId=req.userId
const { commentMessage, blogId } = req.body;
  console.log("commentMessage",commentMessage)
  console.log("blogId",blogId)
  if(!commentMessage||!blogId ){
    return res.send("plaese send comment")
}
await comments.create({
  CommentMessage:commentMessage,
  userId:userId,
  blogId:blogId
})
res.redirect('/blog/'+blogId)
}
exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  const{ userId} = req // FIXED

  const [comment]= await comments.findAll({
    where: { id }
  });

  if (!comment) {
    return res.send("Comment not found");
  }

  const blogId = comment.blogId;

  console.log("userid", userId);
  console.log("comment userId", comment.userId);

  if (comment.userId !== userId) {
    return res.send("You are not the owner of this comment");
  }

  await comments.destroy({
    where: { id }
  });

  return res.redirect(`/blog/${blogId}`);
};