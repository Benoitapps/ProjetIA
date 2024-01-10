const env = import.meta.env
const deleteFoodPreference = async (id) => {
    try {
        const result = await fetch(`http://${env.VITE_URL}:3000/foodPreference`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials : 'include',
            body: JSON.stringify({
                foodId: id,
            })
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

export {deleteFoodPreference};