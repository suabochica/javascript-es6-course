/*
const second = () => {
    setTimeout(() => {
        console.log('Async Hey There');
    }, 2000)
}

const first = () => {
    console.log('Hey There');
    second();
    console.log('The end');
}
first()

function getRecipe() {
    setTimeout(() => {
        const recipeId = [123, 456, 789, 147, 852]
        console.log(recipeId);

        setTimeout(id => {
            const recipe = {
                title: 'Fresh Tomato',
                publisher: 'Edward'
            }

            console.log(`${id}: ${recipe.title}`);

            setTimeout(publisher => {
                const recipeTwo = {
                    title: 'Italian Pizza',
                    publisher: 'Edward'
                }

                console.log(recipe);
            }, 1500, recipe.publisher);
        }, 1500, recipeId[3]);
    }, 1500);
}
getRecipe();

const getIds = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([123, 456, 789, 147, 852]);
    }, 1500);
});

const getRecipe = recipeId => {
    return new Promise((resolve, reject) => {
        setTimeout(id => {
            const recipe = {
                title: 'Fresh Tomato',
                publisher: 'Edward'
            }

            resolve(`${id}: ${recipe.title}`);
        }, 1500, recipeId);
    });
}

const getRelatedByPublisher = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pubilser => {
            const recipeTwo = {
                title: 'Italian Pizza',
                publisher: 'Edward'
            }

            resolve(`${publisher}: ${recipeTwo.title}`);
        }, 1500, publisher)
    });
}


getIds
.then( ids => {
    console.log(ids)
    return getRecipe(ids[2]);
})
.then(recipeId => {
    console.log(recipeId);
    return getRelatedByPublisher(`Edward`);
})
.then(recipeByPublisher => {
    console.log(recipeByPublisher);
})
.catch(error => {
    console.log('Error!')
});


async function getRecipeAwait() {
    const ids = await getIds;
    console.log(ids);

    const recipe = await getRecipe(ids[1]);
    console.log(recipe);

    const related = await getRelatedByPublisher('Edward')
    console.log(related);

    return recipe;
}

getRecipeAwait()
.then(result => {
    console.log(`${result} is delicious!`)
});
*/

function getWeather(woeid) {
    fetch(`https://crossorigin.me/https://www.metaweather.com/api/location/${woeid}/`)
    .then(result => {
        console.log(result);
        return result.json();
    })
    .then(data =>{
        const today = data.consolidated_weather[0];

        console.log(`Temperatures in ${data.title} stay between ${today.min_temp} and ${today.max_temp}`)
    })
    .catch(error => {
        console.log(error);
    });
}

getWeather(2487956);
getWeather(44418);

async function getWeatherAwait(woeid) {
    try {
        const result = await fetch(`https://crossorigin.me/https://www.metaweather.com/api/location/${woeid}/`)
        const data = await result.json();
        const tomorrow = data.consolidated_weather[1];

        console.log(`Temperatures tomorrow in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp}`)

        return data;
    } catch(error) {
        alert(error);
    }
}

getWeatherAwait(2487956);

let dataLondon;

getWeatherAwait(44418)
.then( data => {
    dataLondon - data;
    console.log(dataLondon);
});