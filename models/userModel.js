const mongoose = require('mongoose')

const userSchema = mongoose.Schema(

    {
        name: {
            type: String,
            required: [true, "Please enter a User Name"]
        },

        userID: {
            type: Number,
            required: [true, "Please enter user ID"],
            default: 0
        },

        course: {
            type: String,
            required: true,
        },

        time: {
            type: Date,
            default: Date.now
          },

        location: {
            type: String,
            required: true
        },

        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }

);

userSchema.virtual('createdAtFormatted').get(function () {
    return moment(this.createdAt).format('MMM D, YYYY, HH:mm:ss');
  });


const User = mongoose.model('User', userSchema);

module.exports = User;