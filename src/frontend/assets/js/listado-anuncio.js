function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get("search") || "",
    category_id: params.get("category_id") || "",
  };
}

async function cargarAnuncios() {
  const { search, category_id } = getParams();
  const container = document.getElementById("resultados-ads");
  container.innerHTML = "<p>Cargando anuncios...</p>";

  const url = category_id
    ? `/api/ads/category/${category_id}?search=${encodeURIComponent(
        search
      )}`
    : `/api/ads/search?search=${encodeURIComponent(
        search
      )}`;

  try {
    const res = await fetch(url);
    const { data } = await res.json();

    console.log("Datos recibidos de la API:", data);

    container.innerHTML = "";

    if (!data || data.length === 0) {
      container.innerHTML = "<p>No se encontraron anuncios.</p>";
      return;
    }

    data.forEach((ad) => {
      let img = ad.images?.[0]?.url_img;
      if (img) {
        // Limpiar URLs duplicadas de forma más agresiva
        img = img.replace(/\/uploads\/+/g, '/uploads/');
        if (!img.startsWith('/uploads/')) {
          img = `/uploads/${img}`;
        }
      } else {
        img = "../assets/images/default.png";
      }

      const card = document.createElement("div");
      card.classList.add("anuncio-card");
      card.innerHTML = `
    <img src="${img}" alt="${ad.title}" class="anuncio-image">
    <h3 class="anuncio-title">${ad.title}</h3>
    <p class="anuncio-description">${ad.description}</p>
    <p class="anuncio-precio"><strong>Precio:</strong> Bs ${ad.price}</p>
    <p class="anuncio-vendedor"><strong>Vendedor:</strong> ${ad.seller_name}</p>
    <a href="details-ads.html?id=${ad.id}" class="btn-detalle">Ver detalles</a>
  `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error cargando anuncios:", err);
    container.innerHTML = "<p>Hubo un error al cargar los anuncios.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get("category_id");

  const btnVerTodos = document.getElementById("btn-ver-todos");

  if (btnVerTodos) {
    btnVerTodos.style.display = categoryId ? "inline-block" : "none";
  }

  cargarAnuncios();
});
