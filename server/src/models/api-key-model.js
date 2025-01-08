const { Schema, model } = require("mongoose");

const apiKeySchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    scopes: [{ type: String }], 
    expires_at: { type: Date },
  },
  { timestamps: true }
);

module.exports = model('APIKey', apiKeySchema);
