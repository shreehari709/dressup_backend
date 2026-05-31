import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      contactNumber,
      password
    } = req.body;

    const userExists = await userModel.findOne({
      $or: [
        { email },
        { contactNumber }
      ]
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const newUser = new userModel({
      name,
      email,
      contactNumber,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    const token = createToken(savedUser._id);

  res.json({
  success: true,
  token,
  user: {
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber,
  },
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



const loginUser = async (req, res) => {
    try {
    //    res.json({msg:"Login working"});
        const {email, password} = req.body;
        //check if user exists in database
        const user = await userModel.findOne({ email }); // Replace with actual logic to check if user exists in the database

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
            const token = createToken(user._id)
           res.json({
  success: true,
  token,
  user: {
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber,
  },
});
        }else{
            res.json({success:false, message:'Invalid Credetial'})
        }

        
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }   
};

export { loginUser, registerUser };