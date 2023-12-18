const getRecomendation = async (id) => {
    try {
        const result = await fetch(`http://localhost:3000/recomendation/${id}`, {
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

export {getRecomendation};