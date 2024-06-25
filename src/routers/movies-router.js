// import { Router } from 'express';
// const router = Router();
import express from 'express';
import {
  getAllMoviesController,
  getMovieByIdController,
  addMovieController,
  updateMovieController,
} from '../controllers/movies-controller.js';
import isValidId from '../middleware/isValidid.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const moviesRouter = express.Router();
moviesRouter.get('/', ctrlWrapper(getAllMoviesController)),
  moviesRouter.get('/:id', isValidId, ctrlWrapper(getMovieByIdController));
moviesRouter.post('/', ctrlWrapper(addMovieController));
moviesRouter.put('/:id', isValidId, ctrlWrapper(updateMovieController));
export default moviesRouter;
