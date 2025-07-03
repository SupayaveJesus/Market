document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const userId = parseInt(localStorage.getItem("user_id"));
  const username = localStorage.getItem("username");
  const urlParams = new URLSearchParams(window.location.search);
  const adIdRedirect = urlParams.get("ad_id");

  if (!token || !userId || !username) return window.location.href = "login.html";

  const panelComprador = document.getElementById("panel-comprador");
  const panelVendedor = document.getElementById("panel-vendedor");
  const btnComprador = document.getElementById("modo-comprador");
  const btnVendedor = document.getElementById("modo-vendedor");

  const listaConversaciones = document.getElementById("lista-conversaciones");
  const listaAnuncios = document.getElementById("lista-anuncios");
  const listaInteresados = document.getElementById("lista-interesados");

  const chatHeader = document.getElementById("chat-header");
  const chatHeaderComp = document.getElementById("chat-header-comp");
  const chatMensajes = document.getElementById("chat-mensajes");
  const chatMensajesComp = document.getElementById("chat-mensajes-comp");

  const inputVendedor = document.getElementById("input-vendedor");
  const inputComprador = document.getElementById("input-comprador");

  const formVendedor = document.getElementById("form-vendedor");
  const formComprador = document.getElementById("form-comprador");

  let conversaciones = [];
  let activeConversation = null;
  let polling = null;

  btnComprador?.addEventListener("click", () => {
    panelComprador.classList.remove("hidden");
    panelVendedor.classList.add("hidden");
    renderConversacionesComprador();
  });

  btnVendedor?.addEventListener("click", () => {
    panelComprador.classList.add("hidden");
    panelVendedor.classList.remove("hidden");
    renderConversacionesVendedor();
  });

  async function cargarConversaciones() {
    try {
      const res = await fetch("/api/conversations", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      conversaciones = data.data || [];
    } catch (err) {
      console.error("Error al cargar conversaciones:", err);
    }
  }

  function renderConversacionesComprador() {
    listaConversaciones.innerHTML = "";
    const mias = conversaciones.filter(c => c.sender_id === userId);
    mias.forEach(conv => {
      const li = document.createElement("li");
      li.textContent = `${conv.ad_title} - ${conv.receiver_name}`;
      li.addEventListener("click", () => iniciarConversacion(conv, "comprador"));
      listaConversaciones.appendChild(li);
    });
  }

  function renderConversacionesVendedor() {
    listaAnuncios.innerHTML = "";
    listaInteresados.innerHTML = "";

    const anunciosUnicos = [...new Set(
      conversaciones.filter(c => c.receiver_id === userId).map(c => c.ad_id)
    )];

    anunciosUnicos.forEach(adId => {
      const convAd = conversaciones.find(c => c.ad_id === adId);
      const li = document.createElement("li");
      li.textContent = convAd?.ad_title || `Anuncio #${adId}`;
      li.addEventListener("click", () => {
        listaInteresados.innerHTML = "";
        const interesados = conversaciones.filter(c => c.ad_id === adId && c.receiver_id === userId);
        interesados.forEach(conv => {
          const li2 = document.createElement("li");
          li2.textContent = conv.sender_name;
          li2.addEventListener("click", () => iniciarConversacion(conv, "vendedor"));
          listaInteresados.appendChild(li2);
        });
      });
      listaAnuncios.appendChild(li);
    });
  }

  async function iniciarConversacion(conversacion, modo) {
    activeConversation = conversacion;
    clearInterval(polling);

    const header = modo === "comprador" ? chatHeaderComp : chatHeader;
    header.innerHTML = `
      Conversando con <strong>${modo === "comprador" ? conversacion.receiver_name : conversacion.sender_name}</strong>
      / <span class="chat-anuncio">${conversacion.ad_title}</span>
    `;

    await cargarMensajes(modo);
    polling = setInterval(() => cargarMensajes(modo), 3000);
  }

  async function cargarMensajes(modo) {
    const panel = modo === "comprador" ? chatMensajesComp : chatMensajes;
    if (!activeConversation || !panel) return;
    panel.innerHTML = '<p style="color:gray">Cargando mensajes...</p>';

    try {
      const res = await fetch(`/api/messages/${activeConversation.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      panel.innerHTML = "";
      data.data.forEach(msg => {
        const div = document.createElement("div");
        div.classList.add("mensaje");
        div.classList.add(msg.sender_id === userId ? "mensaje-propio" : "mensaje-ajeno");
        div.textContent = msg.message; 
        panel.appendChild(div);
      });
      panel.scrollTop = panel.scrollHeight;
    } catch (err) {
      console.error("Error cargando mensajes:", err);
    }
  }

  async function enviarMensaje(modo) {
    const input = modo === "comprador" ? inputComprador : inputVendedor;
    const mensaje = input.value.trim();
    if (!mensaje || !activeConversation) return;

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          conversation_id: activeConversation.id,
          message: mensaje
        })
      });
      input.value = "";
      await cargarMensajes(modo);
    } catch (err) {
      console.error("Error enviando mensaje:", err);
    }
  }

  formVendedor?.addEventListener("submit", e => {
    e.preventDefault();
    enviarMensaje("vendedor");
  });

  formComprador?.addEventListener("submit", e => {
    e.preventDefault();
    enviarMensaje("comprador");
  });

  await cargarConversaciones();

  if (adIdRedirect) {
    const target = conversaciones.find(c => c.ad_id == adIdRedirect && c.sender_id == userId);
    if (target) {
      panelComprador.classList.remove("hidden");
      panelVendedor.classList.add("hidden");
      renderConversacionesComprador();
      iniciarConversacion(target, "comprador");
      return;
    }
  }

  if (conversaciones.some(c => c.sender_id === userId)) {
    panelComprador.classList.remove("hidden");
    panelVendedor.classList.add("hidden");
    renderConversacionesComprador();
  } else {
    panelComprador.classList.add("hidden");
    panelVendedor.classList.remove("hidden");
    renderConversacionesVendedor();
  }
});
