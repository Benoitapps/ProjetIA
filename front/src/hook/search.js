const search = async (recipe) => {
    await fetch("http://localhost:3000/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipe: recipe }),
    });
} 

export default search;