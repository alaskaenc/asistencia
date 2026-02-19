const URL = "https://script.google.com/macros/s/AKfycbw5xaqx9MOda9BZSAV1ou2rW3-MekG9Afa8kpiQZ77Cj4dY_S9XdXGNe-npXNksoG1upw/exec";

function marcar(tipo) {
    const ci = document.getElementById("ci").value.trim();
    if (!ci) {
        alert("Ingrese su CI");
        return;
    }

    const now = new Date();
    const data = {
        ci: ci,
        tipo: tipo,
        fecha: now.toISOString().split("T")[0],
        hora: now.toLocaleTimeString("es-PY"),
        dispositivo: navigator.userAgent
    };

    fetch(URL, {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        headers: {
            "Content-Type": "text/plain;charset=UTF-8"  // ← Esto evita el preflight
        },
        body: JSON.stringify(data)  // ← Envía JSON pero como texto plano
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Status: ${res.status}`);
        }
        return res.text();
    })
    .then(text => {
        console.log("Respuesta cruda del servidor:", text);  // ← Para debug en consola
        try {
            const resp = JSON.parse(text);
            if (resp.ok) {
                alert("Registro exitoso");
                document.getElementById("ci").value = "";
            } else if (resp.error) {
                alert("Error: " + resp.error);
            } else {
                alert("Respuesta extraña: " + text);
            }
        } catch (e) {
            alert("El servidor no devolvió JSON válido: " + text);
        }
    })
    .catch(err => {
        console.error("Error completo:", err);
        alert("No se pudo conectar con el servidor.\n" + err.message);
    });
}
