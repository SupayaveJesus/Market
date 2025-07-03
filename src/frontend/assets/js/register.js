document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();


    document.querySelectorAll('.msg-error').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });

    const first_name = document.getElementById('first_name').value.trim();
    const last_name = document.getElementById('last_name').value.trim();
    const mail = document.getElementById('mail').value.trim();
    const password = document.getElementById('password').value.trim();

    let valid = true;

     // Validación de nombre
    if (!first_name) {
        document.getElementById('msg-error-first_name').textContent = 'Por favor ingrese su nombre';
        document.getElementById('msg-error-first_name').style.display = 'block';
        valid = false;
    }

    // Validación de apellido
    if (!last_name) {
        document.getElementById('msg-error-last_name').textContent = 'Por favor ingrese su apellido';
        document.getElementById('msg-error-last_name').style.display = 'block';
        valid = false;
    }

    // Validación de correo
    if (!mail) {
        document.getElementById('msg-error-mail').textContent = 'Por favor ingrese su correo';
        document.getElementById('msg-error-mail').style.display = 'block';
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
        document.getElementById('msg-error-mail').textContent = 'Ingrese un correo electrónico válido';
        document.getElementById('msg-error-mail').style.display = 'block';
        valid = false;
    }

    // Validación de contraseña
    if (!password || password.length < 6) {
        document.getElementById('msg-error-password').textContent = 'La contraseña debe tener al menos 6 caracteres';
        document.getElementById('msg-error-password').style.display = 'block';
        valid = false;
    }

    if(!valid)return;

    try{

       const response = await fetch ('/api/users/register',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                first_name: first_name, 
                last_name: last_name, 
                mail, 
                password}),
        });
        if(!response.ok){
            const errorData= await response.json();
            document.getElementById('msg-error-mail').textContent = errorData.message || 'Error al registrar el usuario.';
            document.getElementById('msg-error-mail').style.display = 'block';
            return;        
        }

        window.location.href = '../pages/login.html';   
    } catch (error) {
        document.getElementById('msg-error-mail').textContent ="Ha ocurrido un error" + error;
        document.getElementById('msg-error-mail').style.display="block";
    }
});