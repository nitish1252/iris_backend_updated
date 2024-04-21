const SignUp = require('../models/signup');

// Define your controller function
const userSignUp = (req, res) => {
    console.log(req.body);
    const newUser = new SignUp({
        fullName: req.body.fullName,
        phone: req.body.phone,
        profession: req.body.profession,
        city: req.body.city,
        password: req.body.password,
        repeatPassword: req.body.repeatPassword,
        profileImg: req.body.profileImg, 
        coverImg: req.body.coverImg,
        bio: req.body.bio
      });
    
    // Save the new user to the database
        newUser.save()
        .then(savedUser => {
        console.log('User signed up successfully:', savedUser);
        res.status(201).json({ message: 'User signed up successfully'});
        })
        .catch(err => {
        console.error('Error in sign up:', err);
        res.status(500).json({ error: 'Error in sign up', message: err.message });
        });

};

const userSignIn = (req, res) => {
  console.log(req.body);
  
  const { phone, password } = req.body;

  // Find the user in the database based on phone and password
  SignUp.findOne({ phone, password })
    .then(user => {
      if (user) {
        console.log('User found:', user);
        res.status(200).json({ message: 'User found', user });
      } else {
        console.log('User not found');
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(err => {
      console.error('Error finding user:', err);
      res.status(500).json({ error: 'Error finding user', message: err.message });
    });

};

const userData = async (req, res) => {

  try {
    const users = await SignUp.find({phone: req.query.phone}); // Find all users (no conditions specified)
    
    if (!users || users.length === 0) {
        return res.status(404).json({ error: 'No users found' });
    }

    // If users are found, send them as a JSON response
    res.status(200).json(users);
} catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
}
};

const fetchSelectedData = async (req, res) => {

  try {
    const users = await SignUp.find({profession: req.query.profession}); // Find all users (no conditions specified)
    
    if (!users || users.length === 0) {
      console.log('No user found');
    }

    // If users are found, send them as a JSON response
    res.status(200).json(users);
} catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
}
};

const fetchSearchData = async (req, res) => {

  const { query } = req.query;
  console.log(query);

  try {
      let searchResults = [];
      if (query) {
          // Perform the search query using Mongoose
          searchResults = await SignUp.find({
              $or: [
                  { fullName: { $regex: new RegExp(query, 'i') } }, // Case-insensitive search for full name
                  { city: { $regex: new RegExp(query, 'i') } }, // Case-insensitive search for city
              ],
          });
      }

      res.status(200).json({ success: true, data: searchResults });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to perform search', error: error.message });
  }
};

const updateCoverImg = async (req, res) => {
  const phoneNumber = req.query.phone; // Assuming phone number is part of the route parameters
  const newData = {coverImg : req.query.filename}; // Assuming new data is sent in the request body

  try {

      // Find the user by phone number and update data
      const updatedUser = await SignUp.findOneAndUpdate(
          { phone: phoneNumber },
          newData,
          { new: true, useFindAndModify: false }
      );

      // Check if user was found and updated
      if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Send the updated user data in the response
      res.status(200).json(updatedUser);
  } catch (error) {
      console.error('Error updating user by phone:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProfileImg = async (req, res) => {
  const phoneNumber = req.query.phone; // Assuming phone number is part of the route parameters
  const newData = {profileImg : req.query.filename}; // Assuming new data is sent in the request body

  try {

      // Find the user by phone number and update data
      const updatedUser = await SignUp.findOneAndUpdate(
          { phone: phoneNumber },
          newData,
          { new: true, useFindAndModify: false }
      );

      // Check if user was found and updated
      if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Send the updated user data in the response
      res.status(200).json(updatedUser);
  } catch (error) {
      console.error('Error updating user by phone:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserData = async (req, res) => {
  const phoneNumber = req.query.phone; // Assuming phone number is part of the route parameters
  const newData = {fullName : req.body.name, profession : req.body.profession, city: req.body.city, bio: req.body.bio}; // Assuming new data is sent in the request body

  try {

      // Find the user by phone number and update data
      const updatedUser = await SignUp.findOneAndUpdate(
          { phone: phoneNumber },
          newData,
          { new: true, useFindAndModify: false }
      );

      // Check if user was found and updated
      if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Send the updated user data in the response
      res.status(200).json(updatedUser);
  } catch (error) {
      console.error('Error updating user by phone:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


// Export the controller function
module.exports = {userSignUp, userSignIn, userData, updateCoverImg, updateProfileImg, fetchSelectedData, fetchSearchData, updateUserData};