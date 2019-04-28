const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema 

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: 'string',
        required: true,
        max: 40
    },
    company: {
        type: 'string'
    },
    website: {
        type: 'string'
    },
    location: {
        type: 'string'
    },
    bio: {
        type: 'string'
    },
   status: {
       type: 'string',
       required: true
   },
    githubusername: {
        type: 'string'
    },
   skills: {
        type: ['string'],
        required: true
        },
   experience: [
       {
           title: {
               type: 'string',
               required: true
           },
           company: {
                type: 'string',
                required: true
           },
           location: {
                type: 'string'
           },
           from: {
                type: Date
           },
           to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: 'string'
            }
       }
    ],
    education: [
        {
            school: {
                type: 'string',
                required: true
            },
            degree: {
                 type: 'string',
                 required: true
            },
            fieldofstudy: {
                 type: 'string',
                 required: true
            },
            from: {
                 type: Date
            },
            to: {
                 type: Date
             },
             current: {
                 type: Boolean,
                 default: false
             },
             description: {
                 type: 'string'
             }
        }
     ],
     social: {
        youtube: {
            type: 'string'
            },
        twitter: {
            type: 'string'
        },
         facebook: {
             type: 'string'
        },
        linkedin: {
            type: 'string'
        },
        instagram: {
            type: 'string'
        }
     },
     date: {
         type: Date,
         default: Date.now
     }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);
