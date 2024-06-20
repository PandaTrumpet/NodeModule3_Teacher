// import express from "express";
// import cors from "cors";
// import pino from "pino-http";

// import env from "./utils/env.js";

// import movies from "./db/movies.js";

// const port = env("PORT", "3000");

// const startServer = ()=> {
//     const app = express();

//     const logger = pino({
//         transport: {
//             target: "pino-pretty"
//         }
//     });

//     app.use(logger);
//     app.use(cors());

//     app.get("/api/movies", (req, res)=> {
//         res.json(movies);
//     })

//     app.use((req, res)=> {
//         res.status(404).json({
//             message: "Not Found"
//         })
//     })

//     app.listen(port, ()=> console.log(`Server running on ${port} PORT`))
// }

// export default startServer;

// import express from 'express';
// import cors from 'cors';
// import movies from './db/movies.js';
// const startServer = () => {
//   const app = express();
//   app.use(cors());

//   app.get('/api/movies', (req, res) => {
//     res.json(movies);
//   });
//   app.get((req, res) => {
//     res.status(404).json({
//       message: 'Not Found',
//     });
//   });
//   app.listen(3000, () => {
//     console.log('Server is runig 3000');
//   });
// };
// export default startServer;

import express from 'express';
import cors from 'cors';
import movies from './db/movies.js';
import pino from 'pino-http';
import { getMovies, getMovieById } from './services/movie-services.js';
const startServer = () => {
  const app = express();
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use(cors());
  app.use(logger);

  app.get('/api/movies', async (req, res) => {
    const data = await getMovies();
    res.json({
      status: 200,
      data,
      message: 'Success',
    });
  }),
    app.get('/api/movies/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const data = await getMovieById(id);
        if (!data) {
          return res.status(404).json({
            message: 'Movie  not found',
          });
        }

        res.json({
          status: 200,
          data,
          message: `Success with ${id}`,
        });
      } catch (error) {
        if (error.message.includec('Cast to ObjectId failed')) {
          error.status = 404;
        }
        const { status = 500 } = error;
        res.status(status).json({
          message: error.message,
        });
      }
    });
  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });
  app.listen(3000, () => {
    console.log('Server is runnig 3000');
  });
};

export default startServer;
