const Post = require('../models/postn');

const savePost = (req, res) => {
    console.log(req.body);
    const newPost = new Post({
        fullName: req.body.fullName,
        phone: req.body.phone,
        profession: req.body.profession,
        city: req.body.city,
        profileImg: req.body.profileImg,
        title: req.body.title,
        postImg: req.body.postImg,
        likes: req.body.likes,
        comments: req.body.comments
      });
    
    // Save the new user to the database
        newPost.save()
        .then(createdPost => {
        console.log('Post saved successfully:', createdPost);
        res.status(201).json({ message: 'Post created successfully'});
        })
        .catch(err => {
        console.error('Error :', err);
        res.status(500).json({ error: 'Error', message: err.message });
        });
};

const postData = async (req, res) => {

    try {
      const posts = req?.query?.phone ? await Post.find({phone: req.query.phone}).sort({ createdAt: -1 }) : await Post.find().sort({ createdAt: -1 }); // Find all users (no conditions specified)
      
      if (!posts || posts.length === 0) {
          return res.status(404).json({ error: 'No posts found' });
      }
  
      // If users are found, send them as a JSON response
      res.status(200).json(posts);
  } catch (err) {
      console.error('Error fetching posts:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const updateLikeCount = async (req, res) => {
    const phoneNumber = req.query.phone; // Assuming phone number is part of the route parameters
    const newData = { likes : (parseInt(req.query.likes) + 1)}; // Assuming new data is sent in the request body
  
    try {
  
        // Find the user by phone number and update data
        const updatedPost = await Post.findOneAndUpdate(
            { phone: phoneNumber, createdAt: req.query.createdAt },
            newData,
            { new: true, useFindAndModify: false }
        );
  
        // Check if user was found and updated
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
  
        // Send the updated user data in the response
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating user by phone:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  };

  const updateComments = async (req, res) => {
    const phoneNumber = req.query.phone; // Assuming phone number is part of the route parameters
  
    try {
  
        // Find the user by phone number and update data
        const updatedPost = await Post.findOneAndUpdate(
            { phone: phoneNumber, createdAt: req.query.createdAt },
            { $push: { comments: { img: req.query.profileImg, name: req.query.fullname, value: req.query.value } } },
            { new: true, useFindAndModify: false }
        );
  
        // Check if user was found and updated
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
  
        // Send the updated user data in the response
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating user by phone:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  };

const deletePost = async (req, res) => {

    try {
        // Use findOneAndDelete to delete an object based on a condition
        const deletedObject = await Post.findOneAndDelete({ phone: req.query.phone, createdAt: req.query.createdAt  });
        if (!deletedObject) {
            return res.status(404).json({ message: 'Object not found or already deleted.' });
        }
        res.status(200).json({ message: 'Object deleted successfully', deletedObject });
    } catch (error) {
        console.error('Error deleting object:', error);
        res.status(500).json({ message: 'Error deleting object', error });
    }
};

// Export the controller function
module.exports = {savePost, postData, updateLikeCount, deletePost, updateComments};