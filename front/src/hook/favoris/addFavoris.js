const addFavoris = async (id) => {
    try {
        const result = await fetch("http://localhost:3000/favoris", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials : 'include',
            body: JSON.stringify({
                recipeId: id,
            })
        });



        if (result.ok) {
            console.log("ca envoie")
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

export {addFavoris};