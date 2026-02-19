const URL = "https://script.google.com/macros/s/AKfycbw5xaqx9MOda9BZSAV1ou2rW3-MekG9Afa8kpiQZ77Cj4dY_S9XdXGNe-npXNksoG1upw/exec";

function marcar(tipo) {
    const ci = document.getElementById("ci").value.trim();
    
    if (!ci) {
        alert("Por favor, ingrese su CI");
        return;
    }

    const now = new Date();
    
    // Datos como form-urlencoded (evita OPTIONS preflight)
    const params = new URLSearchParams({
        ci: ci,
        tipo: tipo,
        fecha: now.toISOString().split("T")[0],
        hora: now.toLocaleTimeString("es-PY"), // o tu zona horaria
        dispositivo: navigator.userAgent
    });

    fetch(URL, {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(text => {
        try {
            const data = JSON.parse(text);
            if (data.ok) {
                alert("Registro exitoso ✓");
                document.getElementById("ci").value = "";
            } else if (data.error) {
                alert("Error: " + data.error);
            } else {
                alert("Respuesta inesperada del servidor:\n" + text);
            }
        } catch (e) {
            alert("El servidor respondió algo no válido:\n" + text);
        }
    })
    .catch(error => {
        console.error("Error completo:", error);
        alert("No se pudo conectar con el servidor.\n" + error.message);
    });
}

