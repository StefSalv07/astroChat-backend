const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserSchema = new schema({
    roleId:{
        type: schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    
})
