const express = require('express');
const passport = require('passport');

const validationProfileInput = require('../../validation/profile');
const validationExperienceInput = require('../../validation/experience');
const validationEducationInput = require('../../validation/education');

// load user and profile models

const User = require('../../models/User');
const Profile = require('../../models/Profile');

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({msg: 'profile work'})
})

// get api/profile   
// access private

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id})
    // .populate('profile')
    .then(profile => {
        if(!profile){
            errors.nonProfile = 'No profiles for this user';
            return res.status(404).json(errors)
        }
            res.json(profile);
    })
    .catch(err => res.send(404).json(err));
})


// get     api/profile/handle/:handle    get user's profiles by handle
// access  public

router.get('/handle/:handle', (req, res) => {
    const errors = {}
    Profile.findOne({ handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noProfile = 'No profile for this user';
            res.send(404).json(errors);
        } else {
            res.json(profile);
        }
    })
    .catch(error => res.status(404).json(errors));
})


// get     api/profile/all  get user profiles
// access  public

router.get('/all', (req, res) => {
    const errors = {}
    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if(!profiles){
            errors.noProfile = 'No profiles for this user';
            return res.send(404).json(errors);
        } 
        res.json(profiles);
    })
    .catch(error => res.status(404).json({ profile: 'There is no profile for this user' }));
})



// get     api/profile/user/:user_id    get user's profiles by user_id
// access  public

router.get('/user/:user_id', (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noProfile = 'No profile for this user';
            return res.send(404).json(errors);
        } 
        res.json(profile);
    })
    .catch(error => res.status(404).json({ profile: 'There is no profile for this user' }));
})



// post api/profile   
// access private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    
      //check validation
      const { errors, isValid } = validationProfileInput(req.body);
      if(!isValid){
          return res.status(400).json(errors);
      }

    const profileFields = {};

    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    // skills split into an array

    if(req.body.skills) {
        profileFields.skills = req.body.skills.split(",");
    }

    // social

    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    
    Profile.findById(req.user.id)
        .then(profile => {
            if(profile) {
                //update
                Profile.findByIdAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
                .then(profile => res.json(profile));
            }else {
                //create
                Profile.findOne({handle: profileFields.handle})
                .then(profile => {
                    if(profile){
                        errors.handle = 'Profile already exists';
                        res.status(400).json(errors);
                    }
                    new Profile(profileFields).save().then(profile => res.json(profile));
                })
            }
        })
})



// post      api/profile/experience
// DESC      Add experience to users profile
// access    private

router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {

     //check validation
     const { errors, isValid } = validationExperienceInput(req.body);
     if(!isValid){
         return res.status(400).json(errors);
     }

    Profile.findOne({ user: req.user.id })

    .then(profile => {

        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }

        // Add experience to profile array
        profile.experience.unshift(newExp);
        // save experience

        profile.save().then(profile => res.json(profile));
    })
   
})

// delete    api/profile/experience/:exp_id
// DESC      Delete experience from users profile
// access    private

router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {

   Profile.findOne({ user: req.user.id })

   .then(profile => {
    const removeExp = profile.experience
    .map(item => item.id)
    .indexOf(req.params.exp_id)
       // Add experience to profile array
       profile.experience.splice(removeExp, 1);
       // save experience

       profile.save().then(profile => res.json(profile));
   })
   .catch(err => res.status(404).json(err));  
})


// post      api/profile/education
// DESC      Add education to users profile
// access    private

router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {

    //check validation
    const { errors, isValid } = validationEducationInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

   Profile.findOne({ user: req.user.id })

   .then(profile => {

       const newEdu = {
           school: req.body.school,
           degree: req.body.degree,
           fieldofstudy: req.body.fieldofstudy,
           from: req.body.from,
           to: req.body.to,
           current: req.body.current,
           description: req.body.description
       }
       // Add experience to profile array
       profile.education.unshift(newEdu);
       // save experience

       profile.save().then(profile => res.json(profile));
   })
  
})

// delete    api/profile/education/:edu_id
// DESC      Delete education from users profile
// access    private

router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOne({ user: req.user.id })
 
    .then(profile => {
     const removeEdu = profile.education
     .map(item => item.id)
     .indexOf(req.params.edu_id)
        // Add experience to profile array
        profile.education.splice(removeEdu, 1);
        // save experience
 
        profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
   
 })


 // delete   api/profile
// DESC      Delete user and profile
// access    private

router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id}).then(() => {
            res.json({ success: true });
        })
    })
 })



module.exports = router;
