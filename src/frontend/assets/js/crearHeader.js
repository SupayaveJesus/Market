document.addEventListener('DOMContentLoaded', crearHeader);

async function crearHeader() {
    const header = document.getElementById('header');

    header.innerHTML = `
        <div class="navbar-container">
            <div class="navbar-logo">
                <a href="../pages/index.html" class="navbar-logo-link">
                    <h1>Marketplace</h1>
                </a>
            </div>
            <div class="navbar-user">
                <button id="login-btn" class="login-icon">
                    <img src="../assets/icons/user-plus-solid.svg" alt="Usuario" width="28" height="28">
                </button>
                <div class="login-dropdown-content" id="userMenu"></div>
            </div>
            <button id="navbar-toggle-btn" class="navbar-toggle-label">
                <div></div>
                <div></div>
                <div></div>
            </button>
            <div class="navbar-search">
                <input type="text" id="searchInput" class="navbar-input" placeholder="Buscar anuncios...">
                <button type="button" id="searchBtn" class="navbar-search-btn">
                    <img src="../assets/icons/magnifying-glass-solid.svg" alt="Buscar" width="20" height="20" style="filter: brightness(0) invert(1);">
                </button>
                <div id="searchError" class="search-error"></div>
            </div>
            <div class="desktop-actions">
                <a href="../pages/login.html" class="navbar-link">Iniciar sesión</a>
                <a href="../pages/register.html" class="navbar-link">Registrarse</a>
            </div>
   
        </div>
        <div class="navbar-content">
            <div class="navbar-actions" id="navbar-actions"></div>
            <div class="navbar-categorias">
                <a href="../pages/listado-anuncio.html?cat=tecnologia" class="navbar-link">Tecnología</a>
                <a href="../pages/listado-anuncio.html?cat=hogar" class="navbar-link">Hogar</a>
                <a href="../pages/listado-anuncio.html?cat=vehiculos" class="navbar-link">Vehículos</a>
                <a href="../pages/listado-anuncio.html?cat=moda" class="navbar-link">Moda</a>
                <a href="../pages/listado-anuncio.html?cat=bicicleta" class="navbar-link">Bicicletas</a>

            </div>
        </div>
    `;


    function getUserMenuOptions(token, username) {
        if (token && username) {
            return `
            <a href="../pages/perfil.html" class="navbar-link">${username}</a>
            <a href="../pages/guardados.html" class="navbar-link">Mis guardados</a>
            <a href="../pages/conversacion.html" class="navbar-link">Mensajes</a>
            <button type="button" class="navbar-link logout-btn">Cerrar sesión</button>
            `;
        } else {
            return `
            <a href="../pages/login.html" class="navbar-link">Iniciar sesión</a>
            <a href="../pages/register.html" class="navbar-link">Registrarse</a>
            `;
        }
    }

    function addLogoutEvent() {
        document.querySelectorAll('.logout-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                location.reload();
            });
        });
    }

    try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const navbar = document.getElementById('navbar-actions');
        
        const userMenu = document.getElementById('userMenu');
        const userBtn = document.getElementById('login-btn');
        
        const menuBtn = document.getElementById('navbar-toggle-btn');
        const menuContent = document.querySelector('.navbar-content');
        
        const desktopActions  = document.querySelector('.desktop-actions');


        if(token && username){
            desktopActions.innerHTML=`
                <a href="../pages/perfil.html" class="navbar-link navbar-user-label">${username}</a>
                <a href="../pages/guardados.html" class="navbar-link">Mis guardados</a>
                <a href="../pages/conversacion.html" class="navbar-link">Mensajes</a>
                <button type="button" class="navbar-link logout-btn">Salir</button>
            `;
            
        }else{
            desktopActions.innerHTML=`
                <a href="../pages/login.html" class="navbar-link">Iniciar sesión</a>
                <a href="../pages/register.html" class="navbar-link">Registrarse</a>
            `;
            
        }

        //mobile-menu

        navbar.innerHTML = getUserMenuOptions(token, username);
        userMenu.innerHTML = getUserMenuOptions(token, username);

        addLogoutEvent();


        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.style.display = userMenu.style.display === 'flex' ? 'none' : 'flex';
            menuContent.style.display = 'none';
        });

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuContent.style.display = menuContent.style.display === 'block' ? 'none' : 'block';
            userMenu.style.display = 'none';
        });


        document.addEventListener('click', () => {
            userMenu.style.display = 'none';
            menuContent.style.display = 'none';
        });


        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        const searchError = document.getElementById('searchError');

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const search = searchInput.value.trim();
                if (search.length > 0) {
                    const url = `../pages/listado-anuncio.html?search=${encodeURIComponent(search)}`;
                    window.location.href = url;
                } else {
                    searchError.textContent = 'Escribe algo para buscar.';
                    searchError.classList.add('visible');
                    setTimeout(() => {
                        searchError.classList.remove('visible');
                    }, 3000);
                }
            });
        }

    } catch (error) {
        console.error('Error al cargar el header:', error);
        header.innerHTML = '<p>Error al cargar la navegación.</p>';
    }
    window.addEventListener('resize' ,  () =>{
        const menuContent=document.querySelector('.navbar-content');
        const userMenu=document.getElementById('userMenu');

        if(window.innerWidth >=765){
            if(menuContent) menuContent.style.display = 'none';
            if(userMenu) userMenu.style.display = 'none';
        }
    });
}
