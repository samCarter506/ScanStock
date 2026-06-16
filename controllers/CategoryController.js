const Category = require('../db_schema/category')

exports.GetCategories = async (req, res)=>{
    try{
        const result = await Category.find()
        res.status(200).json({result})
    }catch(err)
    {
        return res.status(500).json({
            message : err.message,
            success: false
        })
    }
}

exports.getCategory = async (req,res)=>{
    try{
        const categoryCheck = await Category.findOne({CategoryName: req.param.id})

        if(!categoryCheck)
        {
            return res.status(204).json({
                message:"Category not found",
                success:false
            })
        }

        return res.status(200).json({categoryCheck})
    }catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success : false
        })
    }
}

exports.CreateCategory = async (req,res)=>{
    try{
        const checkExist = await Category.findOne({CategoryName:req.body.category})

        if(checkExist)
        {
            return res.status(400).json({
                message:"Category alread exist",
                success:false
            })
        }

        const category = new Category({
            CategoryName:req.body.category
        })
        await Category.create(category)

        return res.status(200).json({
            message:"Category added successfully",
            success:true
        })

    }catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.UpdateCategory = async (req,res)=>{
    try{
        const checkExist = await Category.findOne({CategoryName:req.body.category})

        if(!checkExist)
        {
            return res.status(204).json({
                message:"Category does not exist",
                success:false
            })
        }

     
        checkExist.CategoryName=req.body.category ?? checkExist.CategoryName;
      

        checkExist.save()

        return res.status(200).json({
            message:"Category updated successfully",
            success:true
        })

    }catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.deleteCategory = async (req, res) => {
  try {
    const categoryCheck = await Category.findOneAndDelete({
      CategoryName: req.params.id,
    });

    if (!categoryCheck) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};