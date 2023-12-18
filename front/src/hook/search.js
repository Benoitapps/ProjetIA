const search = async (recipe) => {
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
    }
    return [];
}


export default search;