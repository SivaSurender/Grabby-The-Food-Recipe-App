const recipeContainer = document.querySelector('.recipe');
import recipeView from './views/recipeView';
import SearchView from './views/searchView';

// below package imports makes sure that moder es6 works on old browsers
// polyfilling
import 'regenerator-runtime/runtime';
import 'core-js/stable';

import * as model from './model';

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
    // const recipe = model.state.recipe;

    //2. rendering hhtml with obtained data
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// search functionality

const controlSearchResults = async function () {
  try {
    // get query result
    const query = SearchView.getSearchQuery();

    // guard class if there's no search term
    if (!query) return;

    // load search result
    await model.loadSearchResults('lamb');
    console.log(model.state.search.results);
  } catch (error) {
    console.error(error);
  }
};

// listening for hash change event
const init = function () {
  recipeView.addHandlerRender(showRecipe);
  SearchView.addHandlerSearch(controlSearchResults);
};
init();
