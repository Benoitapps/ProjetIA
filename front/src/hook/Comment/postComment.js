const env = import.meta.env
const postComment = async (id,message,note) => {
    try {
        const result = await fetch(`http://${env.VITE_URL}:3000/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials : 'include',
            body: JSON.stringify({
                recipeId: id,
                message: message,
                note: note,
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

export {postComment};