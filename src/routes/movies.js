const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  postMovie,
  getMovieById,
} = require('../controllers/movies');

const { LINK_PATTERN } = require('../utils/constants/LINK_PATTERN');

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(LINK_PATTERN),
    trailerLink: Joi.string().required().pattern(LINK_PATTERN),
    thumbnail: Joi.string().required().pattern(LINK_PATTERN),
    owner: Joi.string().required().hex().length(24),
    movieId: Joi.string().required().hex().length(24),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

router.get('/', getMovies);
router.post('/', createMovieValidation, postMovie);
router.delete('/:movieId', validateMovieId, getMovieById);

module.exports = router;
