const express = require('express');
const passport = require('passport');

const validationPostInput = require('../../validation/post');

// load profile model

const Profile = require('../../models/Profile');

// load post model

const Post = require('../../models/Post');

const router = express.Router();


router.get('/test', (req, res) => {
    res.json({msg: 'posts work'})
})

//post      api/posts   
// access   private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
       //check validation
       const { errors, isValid } = validationPostInput(req.body);

       if(!isValid){
           return res.status(400).json(errors);
       }
 
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
    })
    newPost.save().then(post => res.json(post));
})


// get      api/posts  
// desc     getting all posts by sorting by date
// access   public

router.get('/', (req, res) => {
    Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ message: 'No posts found' }));
})

// get      api/posts/:id
// desc     get post by id
// access   public

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ message: 'No post found for this user' }));
})

// delete      api/posts/:id
// desc        remove selected post
// access      private

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            if(post.user.toString() !== req.user.id){
                return res.status(401).json({ notauthorized: 'User not authorized' });
            }
            post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }) 
})

// post      api/posts/like/:id
// desc      add like to post
// access    private

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
           if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
               return res.status(400).json({ alreadyliked: "User already liked this post" })
           }

           // add userid to likes array

           post.likes.unshift({ user: req.user.id });
           post.save().then(post => res.json(post));

        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }) 
})


// post      api/posts/unlike/:id
// desc      remove like
// access    private

router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
           if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
               return res.status(400).json({ notliked: "User hasn't liked this post" })
           }

           // remove index of the like

           const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id)
           post.likes.splice(removeIndex, 1);
           post.save().then(post => res.json(post));

        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }) 
})


// post    api/posts/comment/:id
// desc    add a comment to post
// access  private


router.post('/comment/:id', passport.authenticate('jwt', {session: false }), (req, res) => {

     //check validation
     const { errors, isValid } = validationPostInput(req.body);

     if(!isValid){
         return res.status(400).json(errors);
     }

    Post.findById(req.params.id)
    .then(post => {
        const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        }
        console.log(newComment, 'lllllll')

        // add to comment array

        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'Post not found' }))
})


// delete  api/posts/comment/:id/:comment_id
// desc    delete comment
// access  private


router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false }), (req, res) => {

   Post.findById(req.params.id)
   .then(post => {
    if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
        return res.status(400).json({ nocomment: "No comment to delete" })
    }

    // remove index of the comment

    const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)
    post.comments.splice(removeIndex, 1);
    post.save().then(post => res.json(post));

   })
   .catch(err => res.status(404).json({ postnotfound: 'Post not found' }))
})



module.exports = router;
