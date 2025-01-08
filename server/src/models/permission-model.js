const { Schema, model } = require("mongoose");

const permissionSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    resource: { type: String, required: true }, 
    action: { type: String, required: true },  
  },
  { timestamps: true }
);

module.exports = model('Permission', permissionSchema);
