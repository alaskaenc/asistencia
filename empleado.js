const URL = "https://script.google.com/macros/s/AKfycbzitdsffJe9itFQ4QfNFjAMjmkl-gl6Ny9Ytuz_yUUaxqFoNI8pKZCkgE5nRIRJWfsQWA/exec";

// Función para mostrar toast
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  // Ícono según tipo
  const icon = type === 'success' 
    ? '<i class="fas fa-check-circle"></i>' 
    : '<i class="fas fa-exclamation-triangle"></i>';
  
  toast.innerHTML = `${icon} ${message}`;
  
  container.appendChild(toast);
  
  // Aparece
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Desaparece después de 4 segundos
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);  // tiempo para la animación de salida
  }, 4000);
}

function marcar(tipo) {
    const ci = document.getElementById("ci").value.trim();
   
    if (!ci) {
        showToast("Por favor ingrese su CI", 'error');
        return;
    }

    const now = new Date();
    const formData = new URLSearchParams();
    formData.append("ci", ci);
    formData.append("tipo", tipo);
    formData.append("fecha", now.toISOString().split("T")[0]);
    formData.append("hora", now.toLocaleTimeString("es-PY"));
    formData.append("dispositivo", navigator.userAgent);

    // Debug
    console.log("Enviando:", Object.fromEntries(formData));

    fetch(URL, {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(text => {
        console.log("Respuesta cruda:", text);
        try {
            const data = JSON.parse(text);
            if (data.ok) {
                showToast(data.mensaje || "Registro guardado exitosamente", 'success');
                document.getElementById("ci").value = "";
            } else {
                showToast(data.error || "Respuesta inesperada", 'error');
            }
        } catch (err) {
            showToast("Error al procesar respuesta del servidor", 'error');
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        showToast("Error de conexión: " + error.message, 'error');
    });
}

