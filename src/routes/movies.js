import express from 'express';
import { deleteMovieById, getMovies, postMovie } from '../controllers/movies';
import { createMovieValidation, validateMovieId } from '../validation/movies';

const router = express.Router();

router.get('/', getMovies);
router.post('/', createMovieValidation, postMovie);
router.delete('/:movieId', validateMovieId, deleteMovieById);

export default router;
