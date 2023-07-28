const articleModel = require("../model/articleModel");
const userModel = require("../model/userModel");
const commentsModel=require('../model/commentsModel')

// user section
const checkEmailAndNumber = async (email, number) => {
  try {
    let userExist = await userModel.find({
      $or: [{ email: email }, { number: number }],
    });
    if (userExist.length >= 1) {
      console.log(userExist);
      if (email == userExist[0].email) {
        return { status: false, message: "email duplicate" };
      } else return { status: false, message: "number duplicate" };
    }
    return { status: true, message: "no duplicacy" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

// user data Creation
const createData = async (data) => {
  try {
    return await userModel.create(data);
  } catch (error) {
    return { status: true, message: error.message };
  }
};

const checkEmail = async (object) => {
  try {
    const user = await userModel.findOne(object);
    if (user) return user;
    else return false;
  } catch (error) {
    throw new Error(error);
  }
};

// update data
const updateData = (id, data) => {
  try {
    return userModel.findOneAndUpdate({ _id: id, isDeleted: false }, data, {
      new: true,
    });
  } catch (error) {
     throw new Error(error)
  }
};

// article section

// article data create
const createArticle = async (data) => {
  try {
    return await articleModel.create(data);
  } catch (error) {
    return { status: true, message: error.message };
  }
};
// get article
const getArticle = async (id) => {
  try {
    return await articleModel.findOne({ _id: id });
  } catch (error) {
    return { status: true, message: error.message };
  }
};
// get all article

const getAllArticle = async (obj) => {
  try {
    return await articleModel.find(obj);
  } catch (error) {
    return { status: true, message: error.message };
  }
};

// comment
const comment=async(obj)=>{
    
    return await commentsModel.create(obj)
}

module.exports = {
  checkEmailAndNumber,
  createData,
  checkEmail,
  updateData,
  createArticle,
  getArticle,
  getAllArticle,
  comment,
};
