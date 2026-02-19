const URL = "PEGAR_AQUI_TU_URL";

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
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(resp => {
    if (resp.error) {
      alert(resp.error);
    } else {
      alert("Registro exitoso");
      document.getElementById("ci").value = "";
    }
  })
  .catch(() => alert("Error de conexión"));
}
