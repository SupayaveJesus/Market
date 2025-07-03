
if(document.getElementById('login-form')){
    console.log('Formulario de login encontrado');
    document.getElementById('login-form').addEventListener('submit' , async (e) => {
        e.preventDefault();
    
        // Limpiar mensajes de error previos
        const errorContainer = document.getElementById('msg-error-password');
        if(errorContainer) errorContainer.textContent = '';
    
        const mail = document.getElementById('mail').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Validaciones básicas
        if(!mail) {
            if(errorContainer) errorContainer.textContent = 'El correo es requerido';
            return;
        }
        
        if(!password) {
            if(errorContainer) errorContainer.textContent = 'La contraseña es requerida';
            return;
        }
        
        if(password.length < 6) {
            if(errorContainer) errorContainer.textContent = 'La contraseña debe tener al menos 6 caracteres';
            return;
        }
    
        try{
            const response = await fetch('/api/users/login', {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({email: mail, password})
        });
        
        if(!response.ok){
            const errorData = await response.json().catch(() => ({ message: 'Error de conexión' }));
            if(errorContainer) {
                errorContainer.textContent = errorData.message || 'Credenciales incorrectas';
            }
            return;
        }
    
        const data = await response.json();
        localStorage.setItem('token',data.token);
        localStorage.setItem('username', data.user.first_name);
        localStorage.setItem('user_id', data.user.id_user);
        
        alert('Inicio de sesión exitoso');
        window.location.href = '../pages/index.html';
        } catch (error) {
            const errorContainer = document.getElementById('msg-error-password');
            if(errorContainer) {
                errorContainer.textContent = 'Error de conexión. Intenta nuevamente.';
            }
        }
    });
}else{
    console.error('No se encontró el formulario de inicio de sesión.'); 
}
