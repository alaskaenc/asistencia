const URL = "https://script.google.com/macros/s/AKfycbynIZqS-fkR-mLMMPpFvIK2m1taBb8OxUCQEeE9ZYKCpttmcuWZMlheglBZErqeYNegRw/exec";

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
        hora: now.toLocaleTimeString(),
        dispositivo: navigator.userAgent
    };

    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(text => {
        try {
            const resp = JSON.parse(text);
            if (resp.error) {
                alert("Error: " + resp.error);
            } else if (resp.ok) {
                alert("Registro exitoso");
                document.getElementById("ci").value = "";
            } else {
                alert("Respuesta desconocida: " + text);
            }
        } catch (e) {
            alert("Error al procesar la respuesta:\n" + text);
        }
    })
    .catch(err => {
        alert("Error de conexión: " + err.message);
    });
}
