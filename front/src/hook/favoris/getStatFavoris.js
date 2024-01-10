const env = import.meta.env
const getStatsFavoris = async (id) => {
    try {
        const result = await fetch(`http://${env.VITE_URL}:3000/favoris/stats/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials : 'include',

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

export {getStatsFavoris};