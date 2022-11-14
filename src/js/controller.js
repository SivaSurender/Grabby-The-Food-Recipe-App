const recipeContainer = document.querySelector('.recipe');
import recipeView from './views/recipeView';

// below package imports makes sure that moder es6 works on old browsers
// polyfilling
import 'regenerator-runtime/runtime';
import 'core-js/stable';

import * as model from './model';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// spinner wheel

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    // guard class
    if (!id) return;

    // adding the spinner
    recipeView.renderSpinner();

    // load and fetch results from api
    // load the recipe
    await model.loadRecipe(id);
    const recipe = model.state.recipe;

    //2. rendering hhtml with obtained data
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// listening for hash change event

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
