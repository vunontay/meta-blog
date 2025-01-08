const { Schema, model } = require("mongoose");

const userSchema =  new Schema({
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      avatar: { type: String },
      role_id: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
      status: {
            type: String,
            enum: ['active', 'inactive', 'banned'], 
            default: 'active',
          },
      deleted_at: { type: Date },    
},
      { timestamps: true }
);

module.exports = model('User', userSchema);