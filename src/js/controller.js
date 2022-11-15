const recipeContainer = document.querySelector('.recipe');
import recipeView from './views/recipeView';
import SearchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

// below package imports makes sure that moder es6 works on old browsers
// polyfilling
import 'regenerator-runtime/runtime';
import 'core-js/stable';

import * as model from './model';

if (module.hot) {
  module.hot.accept();
}

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

    //2. rendering html with obtained data
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// search functionality

const controlSearchResults = async function () {
  try {
    // show the spinner before the search result gets loaded
    resultsView.renderSpinner();

    // get query result
    const query = SearchView.getSearchQuery();

    // guard class if there's no search term
    if (!query) return;

    // load search result
    await model.loadSearchResults(query);

    // render page with limited load results
    resultsView.render(model.getResultsPage(6));

    // render page with initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function () {
  console.log('Pagination button clicked');
};
// listening for  events publisher subscriber event with a init
const init = function () {
  recipeView.addHandlerRender(showRecipe);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPaginationClick(controlPagination);
};
init();
