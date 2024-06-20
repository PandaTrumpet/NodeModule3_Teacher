import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
  director: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['film', 'serial'],
    default: 'film',
  },
});

const Movie = model('movie', movieSchema);
export default Movie;
