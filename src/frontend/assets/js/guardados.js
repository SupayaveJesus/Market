document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch("/api/saved", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    const container = document.getElementById("guardados-lista");

    container.innerHTML = "";

    if (data.data.length === 0) {
      container.innerHTML = "<p>No tienes anuncios guardados.</p>";
      return;
    }

    data.data.forEach((ad) => {
      let img = ad.images?.[0]?.url_img;
      if (img) {
        // Limpiar URLs duplicadas de forma más agresiva
        img = img.replace(/\/uploads\/+/g, '/uploads/');
        if (!img.startsWith('/uploads/')) {
          img = `/uploads/${img}`;
        }
      } else {
        img = "../images/default.png";
      }

      const card = document.createElement("div");
      card.classList.add("ad-card");

      card.innerHTML = `
        <div class="ad-card__detail">
            <div class="ad-card__image">
              <img src="${img}" alt="${ad.title}">
            </div>
          <div class="ad-card__info">
            <h2>${ad.title}</h4>
            <p>Bs ${ad.price}</p>
            <p class="vendedor"><strong>Vendedor:</strong> ${
              ad.seller_name || "Anónimo"}
            </p>
          </div>  
          <div class="acciones-plus">
            <button class="ver-btn" onclick="location.href='details-ads.html?id=${ad.ad_id}'">Ver</button>
            <button class="quitar-btn" data-id="${ad.ad_id}">Quitar</button>
          </div>
        </div>
      </div>
      `;

      container.appendChild(card);
    });

    document.querySelectorAll(".quitar-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const adId = e.target.dataset.id;
        if (confirm("¿Seguro que quieres quitar este anuncio guardado?")) {
          await fetch(`/api/saved/${adId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          e.target.closest(".ad-card").remove();
        }
      });
    });
  } catch (error) {
    console.error("Error al cargar los anuncios guardados", error);
    document.getElementById("guardados-lista").innerHTML =
      "<p>Error al cargar los anuncios guardados.</p>";
  }
});
