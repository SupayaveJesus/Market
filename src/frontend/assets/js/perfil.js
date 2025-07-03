document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const container = document.getElementById("mis-anuncios");

  try {
    const res = await fetch("/api/users/my-ads", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const result = await res.json();
    container.innerHTML = "";

    if (!result.ads || result.ads.length === 0) {
      container.innerHTML = "<p>No tienes ningún Anuncio Publicado.</p>";
      return;
    }

    result.ads.forEach(ad => {
      let image = ad.image;
      if (image) {
        // Limpiar URLs duplicadas de forma más agresiva
        image = image.replace(/\/uploads\/+/g, '/uploads/');
        if (!image.startsWith('/uploads/')) {
          image = `/uploads/${image}`;
        }
      } else {
        image = "../images/default.png";
      }

      const card = document.createElement("div");
      card.classList.add("anuncio-card");

      card.innerHTML = `
        <img src="${image}" alt="${ad.title}">
        <div class="anuncio-info">
          <h3 class="ad-card-title">${ad.title}</h3>
          <p class="descripcion">${ad.description}</p>
          <p class="precio"><strong>Precio:</strong> Bs ${ad.price}</p>
          <p class="estado"><strong>Estado:</strong> ${ad.is_active ? "Activo" : "Deshabilitado"}</p>
          <div class="acciones-plus">
            <button class="ver-btn btn-editar" onclick="location.href='form-anuncio.html?id=${ad.id}'">Editar</button>
            <button class="quitar-btn btn-toggle" data-id="${ad.id}" data-active="${ad.is_active}">
              ${ad.is_active ? "Deshabilitar" : "Habilitar"}
            </button>
            <button class="quitar-btn btn-eliminar" data-id="${ad.id}">Eliminar</button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    activarBotones(token);
  } catch (error) {
    console.error("Error al cargar tus anuncios:", error);
    container.innerHTML = "<p>Error al cargar tus anuncios.</p>";
  }
});

function activarBotones(token) {
  // Eliminar anuncio
  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      if (!confirm("¿Seguro que deseas eliminar este anuncio?")) return;

      try {
        const res = await fetch(`/api/ads/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Error al eliminar");

        btn.closest(".anuncio-card").remove();
      } catch (err) {
        console.error("Error eliminando anuncio:", err);
      }
    });
  });

  // Activar / Desactivar
  document.querySelectorAll(".btn-toggle").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const activo = btn.dataset.active === "true";

      try {
        const res = await fetch(`/api/ads/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ is_active: !activo })
        });

        if (!res.ok) throw new Error("Error al actualizar estado");

        window.location.reload(); // refrescar para ver el cambio
      } catch (err) {
        console.error("Error actualizando anuncio:", err);
      }
    });
  });
}
