let recipe = {
    ingredients: [
        {
            amount: 10,
            measurement: "grams",
            name: "ingredient name here",
        }
    ],
    method: [
        {
            description: "step description here",
            length: "HH:mm:SS"
        }
    ],
    length: 0, // sum of time for all instruction array items' length
    title: "recipe title here",
    author: "author name here" // user name
}

// example to be used in server

let pancakesRecipe = {
    ingredients: [
        {
            amount: 1.5,
            measurement: "cup",
            name: "All-purpose Flour",
        },
        {
            amount: 3.5,
            measurement: "teaspoon",
            name: "Baking Powder",
        },
        {
            amount: 1,
            measurement: "teaspoon",
            name: "Table Salt",
        },
        {
            amount: 1,
            measurement: "tablespoon",
            name: "White Sugar",
        },
        {
            amount: 1.25,
            measurement: "cups",
            name: "Milk",
        },
        {
            amount: 1,
            measurement: "",
            name: "Eggs",
        },
        {
            amount: 3,
            measurement: "tablespoons",
            name: "Melted Butter",
        },
    ],
    method: [
        {
            description: `In a large bowl, sift together the flour, baking powder, salt and sugar.
            Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.`,
            length: "00:05:00"
        },
        {
            description: `Heat a lightly oiled griddle or frying pan over medium high heat.
            Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.`,
            length: "00:15:00"
        },
    ],
    length: 20, // sum of time for all instruction array items' length
    title: "Classic Pancakes",
    author: "dakota kelly", // user name
    source: {
        name: "allrecipes",
        url: "https://www.allrecipes.com/recipe/21014/good-old-fashioned-pancakes/"
    }
}