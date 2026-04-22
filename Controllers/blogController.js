const { blogs } = require("../model/index");

// Home page
exports.getAllBlogs = async (req, res) => {
  const blogsTableblogs = await blogs.findAll();
  res.render("home", { blogs: blogsTableblogs });
};

// Add blog page
exports.renderAddBlog = (req, res) => {
  res.render("addblog");
};

// Create blog
exports.createBlog = async (req, res) => {
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
  });

  res.redirect("/");
};

// Single blog
exports.getSingleBlog = async (req, res) => {
  const id = req.params.id;
  const foundData = await blogs.findByPk(id);
  res.render("singleBlog", { blog: foundData });
};

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