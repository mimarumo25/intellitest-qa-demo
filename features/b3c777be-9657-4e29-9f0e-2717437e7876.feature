# language: es
Característica: Conservar la sesión autenticada al recargar la página
  @case-b3c777be-9657-4e29-9f0e-2717437e7876
  Escenario: Conservar la sesión autenticada al recargar la página
    Dado el usuario ha iniciado sesión con credenciales válidas y el encabezado Dashboard está visible
    Cuando el usuario recarga la página
    Entonces el encabezado Dashboard sigue visible
    Y el texto Login to your account no aparece en la página
