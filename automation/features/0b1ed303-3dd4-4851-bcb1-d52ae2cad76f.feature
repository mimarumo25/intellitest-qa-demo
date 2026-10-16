# language: es
Característica: Iniciar sesión con credenciales válidas y abrir el Dashboard
  @case-0b1ed303-3dd4-4851-bcb1-d52ae2cad76f
  Escenario: Iniciar sesión con credenciales válidas y abrir el Dashboard
    Dado la página de acceso del ambiente configurado en TARGET_URL está abierta en el navegador
    Y el formulario muestra los campos Username, Password y el botón Sign In
    Y se dispone de credenciales válidas de prueba provistas como secretos del proyecto
    Cuando el usuario introduce esas credenciales válidas en Username y Password y pulsa Sign In
    Entonces la aplicación abre la página raíz
    Y la página muestra el encabezado Dashboard
