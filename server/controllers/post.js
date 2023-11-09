import ErrorHandler from "../middlewares/error.js";
import { Post } from "../models/post.js";

export const newPost = async (req, res, next) => {
  try {
    const { name, number, address, aitem,oitem,special} = req.body;
       console.log(req.user.role);
    await Post.create({ name, number, address, aitem,oitem,special,role:req.user.role,userid: req.user,});

    res.status(201).json({
      success: true,
      message: "post added Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getAllPost=async(req,res,next) =>{
  try {
    const postss = await Post.find({"role":"donor"});
    res.status(200).json({
      success: true,
      postss,
    });
  } catch (error) {
    next(error);
  }
}

export const getMyPost = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const posts = await Post.find({ userid: userid });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};
export const getpost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
  
      
  
      res.status(200).json({
        success: true,
        post,
      });
    } catch (error) {
      next(error);
    }
  };

export const updatePost = async (req, res, next) => {
 const  { name, number, address, aitem,oitem,special} =req.body;

    
    try{
      console.log(req.user);
      if(req.user.role=="agent"){
        await Post.findByIdAndUpdate({_id: req.params.id},{ userid: req.user,role:req.user.role,name, number, address, aitem,oitem,special} );
        // try {
        //   console.log("kjnsdkjn")
        //   console.log({ name, number, address, aitem,oitem,special});
        //    await Post.findByIdAndUpdate(req.params.id, { name, number, address, aitem,oitem,special});
      
          res.status(200).json({
            success: true,
            message: "post Updated!",
          });
      }else{
        await Post.findByIdAndUpdate({_id: req.params.id},{ name, number, address, aitem,oitem,special} );


    res.status(200).json({
      success: true,
      message: "post Updated!",
    });
  }
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    // const post = await Post.findById(req.params.id);

    // if (!post) return next(new ErrorHandler("post not found", 404));
    await Post.deleteOne({_id: req.params.id});

    res.status(200).json({
      message: "post Deleted!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};