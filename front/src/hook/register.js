const env = import.meta.env


const register = async (data) => {
    try {
        const result = await fetch(`http://${env.VITE_URL}:3000/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            credentials : 'include',
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                name: data.name
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


export default register;