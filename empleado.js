const URL = "https://script.google.com/macros/s/AKfycbzSkKNhEJex2nSunrRx7IkrKcHsO-bddhqolYFvFPw0yhggXVkeeKtQv2Qigwd_9j3c5A/exec";  // actualiza si cambiaste el despliegue

function marcar(tipo) {
    const ci = document.getElementById("ci").value.trim();
    
    if (!ci) {
        alert("Por favor ingrese su CI");
        return;
    }

    const now = new Date();

    const formData = new URLSearchParams();
    formData.append("ci", ci);
    formData.append("tipo", tipo);
    formData.append("fecha", now.toISOString().split("T")[0]);
    formData.append("hora", now.toLocaleTimeString("es-PY"));
    formData.append("dispositivo", navigator.userAgent);

    // Debug: mira en consola qué se envía
    console.log("Enviando:", Object.fromEntries(formData));

    fetch(URL, {
        method: "POST",
        body: formData  // ← navegador pone automáticamente el Content-Type correcto
    })
    .then(response => response.text())
    .then(text => {
        console.log("Respuesta cruda:", text);
        try {
            const data = JSON.parse(text);
            if (data.ok) {
                alert("Registro guardado exitosamente");
                document.getElementById("ci").value = "";
            } else {
                alert("Error: " + (data.error || "Respuesta inesperada"));
            }
        } catch (err) {
            alert("Error al procesar respuesta: " + text);
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        alert("Error de conexión: " + error.message);
    });
}
