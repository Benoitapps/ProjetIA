const getAccompagnement = async (question) => {
    const result = await fetch("http://localhost:3000/accompagnement", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            question: question,
        })
    });

    if (result.ok) {
        const data = await result.json();
        console.log(data);
        return data;
    } else {
        throw new Error("La requête a échoué", result);
    }
}
export {getAccompagnement};