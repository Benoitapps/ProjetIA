const search = async (recipe) => {
    try {
        const result = await fetch("http://localhost:3000/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ recipe: recipe }),
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


export default search;