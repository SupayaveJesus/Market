document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const adId = params.get("id");

  const form = document.getElementById("form-anuncio");
  const inputTitle = document.getElementById("title");
  const inputDescription = document.getElementById("description");
  const inputPrice = document.getElementById("price");
  const inputCategory = document.getElementById("id_category");
  const inputImage = document.getElementById("images");

  if (adId) {
    try {
      const res = await fetch(`/api/ads/${adId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("No se puede cargar el anuncio");

      const data = await res.json();
      const ad = data.data;

      inputTitle.value = ad.title;
      inputDescription.value = ad.description;
      inputPrice.value = ad.price;
      inputCategory.value = ad.id_category;

      document.getElementById("form-title").textContent = "Editar Anuncio";
    } catch (error) {
      console.error("Error cargando anuncio:", error);
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    limpiarErrores();

    const isCreate = !adId;
    const valido = validarFormulario(isCreate);
    if (!valido) return;

    const formData = new FormData();
    formData.append("title", inputTitle.value.trim());
    formData.append("description", inputDescription.value.trim());
    formData.append("price", parseFloat(inputPrice.value));
    formData.append("id_category", parseInt(inputCategory.value));

    // Adjuntar imágenes si hay nuevas seleccionadas (tanto en crear como en editar)
    if (inputImage.files && inputImage.files.length > 0) {
      for (const file of inputImage.files) {
        formData.append("images", file);
      }
    }

    const url = adId ? `/api/ads/${adId}` : `/api/ads`;
    const method = adId ? "PUT" : "POST";

    try {
      const resp = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!resp.ok) throw new Error("Error al guardar el anuncio");
      mostrarExito(isCreate ? "Anuncio creado exitosamente" : "Anuncio actualizado!")
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  });
});

function limpiarErrores() {
  document.querySelectorAll(".msg-error").forEach((el) => {
    el.textContent = "";
    el.style.display = "none";
  });
}

function validarFormulario(isCreate) {
  let valid = true;

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const priceInput = document.getElementById("price");
  const price = parseFloat(priceInput.value);
  const category = document.getElementById("id_category").value;
  const images = document.getElementById("images").files;

  if (!title || title.length < 3) {
    mostrarError("title", "El título debe tener al menos 3 caracteres");
    valid = false;
  }

  if (!description || description.length < 10) {
    mostrarError("description", "La descripción debe tener al menos 10 caracteres");
    valid = false;
  }

  if (!priceInput.value.trim()) {
    mostrarError("price", "El precio es obligatorio");
    valid = false;
  } else if (isNaN(price) || price <= 0) {
    mostrarError("price", "Debe ser un número mayor a 0");
    valid = false;
  } else if (!/^\d+(\.\d{1,2})?$/.test(priceInput.value)) {
    mostrarError("price", "Máximo 2 decimales permitidos");
    valid = false;
  }

  if (!category) {
    mostrarError("id_category", "Selecciona una categoría");
    valid = false;
  }

  if (isCreate && (!images || images.length === 0)) {
    mostrarError("images", "Debes subir al menos una imagen");
    valid = false;
  }

  return valid;
}

function mostrarError(idCampo, mensaje) {
  const cont = document.getElementById(`msg-error-${idCampo}`);
  cont.textContent = mensaje;
  cont.style.display = "block";
}
function mostrarExito(mensaje){
  const msg = document.getElementById('msg-success');
  msg.textContent= mensaje;
  msg.style.display="block";

  setTimeout(()=>{
    msg.style.display= "none";
    window.location.href="perfil.html";
  }, 2000);
}
