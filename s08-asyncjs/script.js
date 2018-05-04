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

/*
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
*/

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

/*
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
*/

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