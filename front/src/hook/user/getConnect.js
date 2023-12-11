const getUser = async () => {
    try {
        const result = await fetch("http://localhost:3000/connect", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials : 'include',

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

export {getUser};