module.exports = function (formidable, Channel, aws) {
  return {
    SetRouting: function (router) {
      router.get("/dashboard", this.adminPage);

      router.post("/uploadFile", aws.Upload.any(), this.uploadFile);
      router.post("/dashboard", this.adminPostPage);
    },

    adminPage: function (req, res) {
      res.render("admin/dashboard");
    },

    adminPostPage: function (req, res) {
      const newChannel = new Channel();
      newChannel.name = req.body.channel;
      newChannel.category = req.body.category;
      newChannel.image = req.body.upload;
      newChannel['createdBy'] = req.user._id;
      newChannel.save((err) => {
        if(err){
          res.render("admin/dashboard");          
        }
        res.redirect(`group/${newChannel.name}`);
      });
    },

    uploadFile: function (req, res) {
      const form = new formidable.IncomingForm();

      form.on("file", (field, file) => {});

      form.on("error", (err) => {});

      form.on("end", () => {});

      form.parse(req);
    },
  };
};
