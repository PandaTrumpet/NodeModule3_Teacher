import {
  getMovieById,
  getMovies,
  adddMOvie,
  upsertMovie,
} from '../services/movie-services.js';
import createHttpError from 'http-errors';
export const getAllMoviesController = async (req, res) => {
  const data = await getMovies();
  res.json({
    status: 200,
    data,
    message: 'Success',
  });
};

export const getMovieByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getMovieById(id);
  // if (!data) {
  //   return res.status(404).json({
  //     status: 404,
  //     message: 'Movie  not found',
  //   });
  // }
  if (!data) {
    throw createHttpError(404, 'Movie not found');
    //   const error = new Error('Movie not found');
    //   error.status = 404;
    //   throw error;
  }

  res.json({
    status: 200,
    data,
    message: `Success with ${id}`,
  });
  //   } catch (error) {
  //     if (error.message.includes('Cast to ObjectId failed')) {
  //       error.status = 404;
  //     }
  //     // const { status = 500 } = error;
  //     // res.status(status).json({
  //     //   status,
  //     //   data: error,
  //     //   message: error.message,
  //     // });
  //     next(error);
  //   }
};

export const addMovieController = async (req, res) => {
  // console.log(req.body);
  const result = await adddMOvie(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successful',
    data: result,
  });
};

export const updateMovieController = async (req, res) => {
  const { id } = req.params;
  const data = await upsertMovie({ _id: id }, req.body, { upsert: true });
  console.log(data);
  const status = data.isNew ? 201 : 200;
  const message = data.isNew ? 'Movie success add' : 'Movie update success';
  res.json({
    status,
    message,
    data: data.value,
  });
};
