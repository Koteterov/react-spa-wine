const { model, Schema, Types: { ObjectId } } = require('mongoose');

const itemSchema = new Schema({

  name: {
    type: String,
    minLength: [3, 'Name min length is 3 characters']
  },

  type: {
    type: String,
    enum: {
      values: ['Red', 'White', 'Rose', 'Sparkling'],
      message: 'Please choose from the list - Red, White, Rose or Sparkling'
    }

  },
  origin: {
    type: String,
    required: [true, "Origin is required"],
    minLength: [3, 'Origin min length is 3 characters']

  },

  price: {
    type: Number,
    min: [0.01, "Price must be a positive number"],
  },

  image: {
    type: String,
    required: [true, "Image is required"],
    validate: {
      validator: /(^https?:\/\/)|(^\/images)/i,
      message: "Invalid image url",
    },

  },

  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: [5, 'Description min length is 5 characters']

  },


  _ownerId: { type: ObjectId, ref: "User" },

  likesList: [{ type: ObjectId, ref: "User" }],

},
  { timestamps: true }
);

const Item = model("Item", itemSchema);

module.exports = Item;

