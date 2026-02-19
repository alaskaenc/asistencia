const URL = "https://script.google.com/macros/s/AKfycbw3g8drFAWBp0jOXRZQ_ytMEu2mQN7NO8KgwzJeUkiFb9adK-Ny8FZdfQxxTyCTz939IA/exec";

function marcar(tipo) {
    const ci = document.getElementById("ci").value.trim();
    if (!ci) {
        alert("Ingrese su CI");
        return;
    }

    const now = new Date();

    // ← Enviamos como formulario (evita problemas de parseo)
    const formData = new URLSearchParams();
    formData.append("ci", ci);
    formData.append("tipo", tipo);
    formData.append("fecha", now.toISOString().split("T")[0]);
    formData.append("hora", now.toLocaleTimeString("es-PY"));
    formData.append("dispositivo", navigator.userAgent);

    fetch(URL, {
        method: "POST",
        body: formData  // ← sin headers Content-Type (el navegador lo pone solo)
    })
    .then(res => res.text())
    .then(text => {
        console.log("Respuesta del servidor:", text); // ← para ver en consola
        try {
            const resp = JSON.parse(text);
            if (resp.ok) {
                alert("¡Registro exitoso!");
                document.getElementById("ci").value = "";
            } else {
                alert("Error: " + (resp.error || "Respuesta desconocida"));
            }
        } catch (e) {
            alert("Problema con la respuesta: " + text);
        }
    })
    .catch(err => {
        alert("Error de conexión: " + err.message);
    });
}
