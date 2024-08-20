document.getElementById("generate-btn").addEventListener("click", async () => {
    const question = document.getElementById("question").value;

    const responseDiv = document.getElementById("response");
    responseDiv.innerHTML = "Generando explicación...";

    try {
        const response = await fetch("/generate-explanation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const explanation = data.explanation || "No explanation provided.";

        // Convertir Markdown a HTML usando marked
        const formattedText = marked.parse(explanation); // Cambia a marked.parse en lugar de marked()

        responseDiv.innerHTML = formattedText;
    } catch (error) {
        console.error("Error:", error);
        responseDiv.innerHTML = "Error al generar la explicación.";
    }
});
