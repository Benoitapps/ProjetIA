const env = import.meta.env


const chatbot = async (question) => {
    const result = await fetch(`http://${env.VITE_URL}:3000/chat`, {
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
        return data;
    } else {
        throw new Error("La requête a échoué", result);
    }
}

export default chatbot;