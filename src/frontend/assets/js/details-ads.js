const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId || isNaN(productId)) {
  console.error("ID inválido en la URL");
}

document.addEventListener("DOMContentLoaded", renderAdsDetail);

async function renderAdsDetail() {
  const container = document.getElementById("details-ads");
  container.innerHTML = "<p>Cargando detalles del producto...</p>";

  try {
    const ad = await getAdDetail(productId);
    console.log('Detalle del anuncio obtenido:', ad);
    renderAdHTML(ad);

    const token = localStorage.getItem("token");
    const userId = parseInt(localStorage.getItem("user_id"));
    const btnGuardar = document.getElementById("btn-guardar");
    const btnEnviar = document.getElementById("btn-enviar");

    if (ad.is_saved) marcarComoGuardado(btnGuardar);

    if (!token) return setupAnonimo(btnGuardar, btnEnviar);

    if (userId === ad.id_user) {
      desactivarPropios(btnGuardar, btnEnviar);
    } else {
      setupGuardar(btnGuardar, ad.id, token);
      setupEnviar(btnEnviar, ad.id);
    }

    console.log('Intentando renderizar anuncios relacionados para categoría:', ad.id_category);
    renderRelatedAds(ad.id_category, ad.id);
  } catch (error) {
    console.error("Error al cargar detalle del producto:", error);
    container.innerHTML = "<p>Fallo al cargar el producto</p>";
  }
}

function mostrarMensaje(texto, tipo = "success") {
  const acciones = document.querySelector(".acciones");
  if (!acciones) return;

  const mensajePrevio = acciones.querySelector(".mensaje-anuncio");
  if (mensajePrevio) mensajePrevio.remove();

  const mensaje = document.createElement("p");
  mensaje.className = "mensaje-anuncio";
  mensaje.textContent = texto;
  mensaje.style.marginTop = "10px";
  mensaje.style.fontSize = "15px";
  mensaje.style.color = tipo === "error" ? "#c0392b" : "#2a860e";
  acciones.appendChild(mensaje);

  setTimeout(() => mensaje.remove(), 2000);
}

function renderAdHTML(ad) {
  const container = document.getElementById("details-ads");

  const imageGallery = ad.images?.length
    ? ad.images.map((img) => `<img src="/uploads/${img.url_img}" alt="${ad.title}" class="img-thumbnail">`).join("")
    : `<img src="../assets/images/default.png" alt="Sin imagen" class="img-thumbnail">`;

  container.innerHTML = `
    <section class="ad-detail">
      <div class="ad-detail__image-gallery">${imageGallery}</div>
      <div class="ad-detail__info">
        <h2><strong>${ad.title}</strong></h2>
        <p class="descripcion">${ad.description}</p>
        <p class="precio">Precio: Bs ${ad.price}</p>
        <p class="vendedor"><strong>Vendedor:</strong> ${ad.seller_name || "Anónimo"}</p>
        <div class="acciones">
          <button id="btn-guardar" class="btn-detalle">Guardar anuncio</button>
          <a href="conversacion.html?ad_id=${ad.id}" id="btn-enviar" class="btn-detalle">Enviar mensaje</a>
        </div>
      </div>
    </section>
  `;
}

function marcarComoGuardado(btn) {
  btn.textContent = "Anuncio guardado";
  btn.disabled = true;
  mostrarMensaje("Este anuncio ya está guardado");
}

function desactivarPropios(btnGuardar, btnEnviar) {
  btnGuardar.textContent = "Es tu anuncio";
  btnGuardar.disabled = true;
  btnEnviar.textContent = "No puedes enviarte mensaje";
  btnEnviar.disabled = true;
  mostrarMensaje("No puedes guardar ni enviarte mensaje en tu propio anuncio", "error");
}

function setupAnonimo(btnGuardar, btnEnviar) {
  btnGuardar.addEventListener("click", () => window.location.href = "login.html");
  btnEnviar.addEventListener("click", () => window.location.href = "login.html");
}

function setupGuardar(btn, adId, token) {
  btn.addEventListener("click", async () => {
    try {
      const res = await fetch("/api/saved/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ad_id: adId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "No se pudo guardar");

      marcarComoGuardado(btn);
      mostrarMensaje("Anuncio guardado");
    } catch (error) {
      mostrarMensaje(error.message || "Error al guardar", "error");
    }
  });
}

function setupEnviar(btn, adId) {
  btn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ad_id: adId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "No se pudo iniciar conversación");

      window.location.href = `conversacion.html?id=${data.data.id}`;
    } catch (err) {
      console.error("Error iniciando conversación:", err);
    }
  });
}

async function getAdDetail(id) {
  const response = await fetch(`/api/ads/${id}`);
  if (!response.ok) throw new Error("No se pudo obtener el anuncio");
  const res = await response.json();
  return res.data;
}

async function renderRelatedAds(categoryId, currentAdId) {
  console.log('=== RENDERIZANDO ANUNCIOS RELACIONADOS ===');
  console.log('categoryId:', categoryId);
  console.log('currentAdId:', currentAdId);
  
  const container = document.querySelector(".download-feature");
  console.log('Contenedor encontrado:', !!container);
  
  if (!container) {
    console.error('No se encontró el contenedor .download-feature');
    return;
  }
  
  try {
    console.log('Haciendo fetch a:', `/api/ads/category/${categoryId}`);
    const res = await fetch(`/api/ads/category/${categoryId}`);
    console.log('Respuesta recibida, status:', res.status);
    
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    
    const responseData = await res.json();
    console.log('📦 Datos recibidos:', responseData);

    container.innerHTML = `
      <div class="relacionados">
        <h3 class="subtitle">También te puede interesar:</h3>
        <div class="relacionados-grid"></div>
      </div>
    `;

    const grid = container.querySelector(".relacionados-grid");
    console.log('Grid creado:', !!grid);
    
    // Filtrar anuncios
    const allAds = responseData.data || [];
    console.log('Total anuncios en categoría:', allAds.length);
    
    const filteredAds = allAds.filter((ad) => ad.id !== currentAdId);
    console.log('Anuncios después de filtrar:', filteredAds.length);
    
    const ads = filteredAds.slice(0, 4);
    console.log('Anuncios a mostrar (máximo 4):', ads.length);

    if (ads.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: white;">No hay productos relacionados en esta categoría</p>`;
      console.log('ℹNo hay anuncios relacionados para mostrar');
      return;
    }

    console.log('Renderizando', ads.length, 'anuncios relacionados...');
    
    ads.forEach((ad, index) => {
      console.log(`Renderizando anuncio ${index + 1}:`, ad.title);
      
      const img = ad.images?.[0]?.url_img
        ? `/uploads/${ad.images[0].url_img}`
        : "../assets/images/default.png";

      const el = document.createElement("div");
      el.className = "ad-card";
      el.innerHTML = `
        <img src="${img}" alt="${ad.title}" loading="lazy">
        <h4 class="ad-card-title"><strong>${ad.title}</strong></h4>
        <p><strong>Bs ${ad.price}</strong></p>
        <a href="details-ads.html?id=${ad.id}"><strong>Ver detalles</strong></a>
      `;
      grid.appendChild(el);
    });
    
    console.log('Anuncios relacionados renderizados correctamente');
  } catch (error) {
    console.error("Error en relacionados:", error);
    
    container.innerHTML = `
      <div class="relacionados">
        <h3 class="subtitle">Error al cargar productos relacionados</h3>
        <p style="color: red; text-align: center;">${error.message}</p>
      </div>
    `;
  }
}
