const getRecipe = async (id) => {
    try {
        const result = await fetch(`http://localhost:3000/recette/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });


        if (result.ok) {
            const data = await result.json();
            return data;
        } else {
            throw new Error("La requête a échoué", result);
        }
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        throw error;
    }
}

const fetchShoppingList = async (recipeId) => {
    console.log("recipeId", recipeId);
    const result = await fetch(`http://localhost:3000/recette/shopping-list/${recipeId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let resultJson = await result.json();
    return resultJson;
};

export { getRecipe, fetchShoppingList };