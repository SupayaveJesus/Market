const ads_url = '/api/ads/featured/all?limit=4&offset=0';
const img_url = '/uploads';

async function cargarAdsDestacados() {
  const grid = document.getElementById('anuncios-grid');
  grid.innerHTML = '<p>Cargando anuncios destacados...</p>';

  try {
    const response = await fetch(ads_url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    const ads = result.data;

    grid.innerHTML = ''; // Limpiar mensaje de carga

    if (!ads || ads.length === 0) {
      grid.innerHTML = '<p>No hay anuncios disponibles.</p>';
      return;
    }

    ads.forEach((ad) => {
      const fileName = ad.images?.[0]?.url_img?.split('/').pop(); // extraer nombre del archivo
      const imagen = fileName
        ? `${img_url}/${fileName}`
        : '../assets/images/default.png';

      const card = document.createElement('div');
      card.classList.add('anuncio-card');

      card.innerHTML = `
        <img src="${imagen}" alt="${ad.title}" class="anuncio-image">
        <h3 class="anuncio-title">${ad.title}</h3>
        <p class="anuncio-description">Descripcion: ${ad.description}</p>
        <p class="anuncio-precio">Precio: Bs${ad.price}</p>
        <p class="anuncio-vendedor">Vendedor: ${ad.seller_name || 'No disponible'}</p>
        <a href="details-ads.html?id=${ad.id}" class="btn-detalle">Ver más</a>
      `;

      grid.appendChild(card);
    });
  } catch (error) {
    console.error('Error al cargar los anuncios:', error);
    grid.innerHTML = '<p>Error al cargar los anuncios.</p>';
  }
}

document.addEventListener('DOMContentLoaded', cargarAdsDestacados);
