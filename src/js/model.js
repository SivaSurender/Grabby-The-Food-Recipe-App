import { API_URL } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    //1. geting data from API

    const finalResponse = await getJSON(`${API_URL}${id}`);

    // destructuring recipe to readable terms

    const { recipe } = finalResponse.data;

    // updating the global state variable
    state.recipe = {
      id: recipe.id,
      imageURL: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceURL: recipe.source_url,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
    };
    console.log(state.recipe);
  } catch (error) {
    throw error;
  }
};
