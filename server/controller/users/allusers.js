const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../../models/users/allusers')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

  const { orgName, regNo, password, email, role, firstName, lastName } = req.body
  if (!email || !password || !role) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    orgName, regNo, email, role,  lastName,firstName,
    password: hashedPassword,

  })
  console.log(user, "user");
  if (user) {
    res.status(201).json({
      _id: user.id,
      orgName: user.orgName,
      regNo: user.regNo,
      email: user.email,
      role: user.role,
      regNo: user.regNo,
      role: user.role,
      lastName: user.lastName,
      firstName: user.firstName,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })
  console.log(user);
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      token: generateToken(user._id),
      email: user.email,
      role:user.role,
      adminOrganizationName:user.orgName,
      adminRegNo:user.regNo,
      token: generateToken(user._id),
      msg:"sucess"
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "Rushanth", {
    expiresIn: '30d',
  })
}
const updateUsers = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const updateduser = await User.findByIdAndUpdate(id, req.body, {
      new: true
    });

    console.log(updateduser);
    res.status(201).json(updateduser);

  } catch (error) {
    res.status(422).json(error);
  }
})

const deleteUsers = asyncHandler(async (req, res) => {

  try {
    const { id } = req.params;

    const deletuser = await users.findByIdAndDelete({ _id: id })
    console.log(deletuser);
    res.status(201).json(deletuser);

  } catch (error) {
    res.status(422).json(error);
  }
})


// router.patch("/updateuser/:id",async(req,res)=>{
// try {
//     const {id} = req.params;

//     const updateduser = await users.findByIdAndUpdate(id,req.body,{
//         new:true
//     });

//     console.log(updateduser);
//     res.status(201).json(updateduser);

// } catch (error) {
//     res.status(422).json(error);
// }
// })


// // delete user
// router.delete("/deleteuser/:id",async(req,res)=>{
// try {
//     const {id} = req.params;

//     const deletuser = await users.findByIdAndDelete({_id:id})
//     console.log(deletuser);
//     res.status(201).json(deletuser);

// } catch (error) {
//     res.status(422).json(error);
// }
// })


module.exports = {
  registerUser,
  loginUser,
  getMe,
}
