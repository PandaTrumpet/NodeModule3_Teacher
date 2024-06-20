// import { Router } from 'express';
// const router = Router();
import express from 'express';
import {
  getAllMoviesController,
  getMovieByIdController,
} from '../controllers/movies-controller.js';
import isValidId from '../middleware/isValidid.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const moviesRouter = express.Router();
moviesRouter.get('/', ctrlWrapper(getAllMoviesController)),
  moviesRouter.get('/:id', isValidId, ctrlWrapper(getMovieByIdController));
export default moviesRouter;
