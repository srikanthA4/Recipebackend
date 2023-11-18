// recipe-book-backend/routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Get all recipes
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one recipe
router.get('/recipes/:id', getRecipe, (req, res) => {
  res.json(res.recipe);
});

// Create a recipe
router.post('/recipes', async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Middleware function to get recipe by ID
async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.recipe = recipe;
  next();
}

module.exports = router;
