const { Schema, model } = require("mongoose");

const BlogNotifySchema=new Schema(
    {
      message:{
        type:String,
        required:true
      },
      createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
      },
      blogId:{
        type:Schema.Types.ObjectId,
        ref:"Blog",
        required:true
      },
    },
    { timestamps: true }
  )

const BlogNotify=model("BlogNotify",BlogNotifySchema)

module.exports = BlogNotify;