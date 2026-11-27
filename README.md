# Veterinaria San Marcos – Frontend

Aplicación web de la **Veterinaria San Marcos** (Rancagua): los dueños de mascotas consultan los servicios y piden su hora por internet; la recepción y el administrador gestionan citas, servicios y usuarios.

Proyecto del curso **DSY1104 – Desarrollo FullStack II** (Duoc UC), Parcial 3. Integrantes: Martin Cortes, Christian Montecinos y Alejandro Naranjo.

| Recurso | Enlace |
|---|---|
| Backend (repositorio) | https://github.com/MartinCC77/veterinaria-backend |
| Documentación de la API (Swagger) | http://52.45.85.64:8080/swagger-ui.html |
| Aplicación desplegada | http://52.45.85.64:5173 |

## Tecnologías

React 19, Vite, React Router 7, Bootstrap 5, Axios, Vitest y Testing Library.

## Cómo ejecutarlo

Requisitos: Node 20.19 o superior y la API del backend en ejecución.

```bash
npm install
cp .env.example .env     # y ajusta VITE_API_URL a la dirección de la API
npm run dev              # http://localhost:5173
```

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | Dirección base de la API, por ejemplo `http://52.45.85.64:8080/api/v1`. Debe apuntar al backend, nunca a `localhost` si la aplicación se usa desde otro computador. |

El archivo `.env` no se sube al repositorio; `.env.example` sí.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo. |
| `npm run build` | Compila para producción. |
| `npm run test:run` | Ejecuta las pruebas una vez. |
| `npm run test:cov` | Pruebas con reporte de cobertura. |

## Usuarios de demostración

Son datos de prueba que carga el backend al iniciar.

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@sanmarcos.cl | admin123 |
| Recepcionista | recepcion@sanmarcos.cl | recep123 |
| Dueño de mascota | juan@correo.cl | dueno123 |

## Rutas y permisos

| Tipo | Rutas | Quién entra |
|---|---|---|
| Públicas | `/`, `/servicios`, `/servicios/:id`, `/categorias`, `/ofertas`, `/blog`, `/nosotros`, `/contacto`, `/login`, `/registro` | Todos |
| Con sesión | `/solicitar-cita`, `/cita-confirmada/:id`, `/mis-citas` | Cualquier usuario con sesión |
| Personal | `/admin`, `/admin/citas`, `/admin/criticos`, `/admin/reportes`, `/admin/perfil` | Recepcionista y administrador |
| Solo administrador | `/admin/servicios`, `/admin/categorias`, `/admin/usuarios` (y sus formularios) | Administrador |

`RutaProtegida` lleva a `/login` si no hay sesión y muestra «Acceso restringido» si el rol no alcanza. Aun así, **los permisos se vuelven a verificar en el servidor**: ocultar una opción en pantalla no es seguridad por sí solo.

## Comunicación con el backend

Cada pantalla sigue el mismo recorrido:

```
Página → Contexto → DTO → Servicio → api.js (Axios) → API REST
```

| Capa | Responsabilidad |
|---|---|
| `pages/` | Pide la acción y muestra resultado, error y estado de carga. |
| `context/` | Estado compartido; devuelve `{ ok }` o `{ ok: false, error }`. |
| `dto/` | Arma el cuerpo exacto que exige la API. |
| `services/` | Una función por endpoint. |
| `services/api.js` | Instancia de Axios: agrega el token y reacciona a los 401. |

## Sesión y token

- Al iniciar sesión, la API entrega un token JWT que se guarda junto con los datos del usuario en **`sessionStorage`**.
- Al recargar la página se recupera la sesión si el token no ha vencido (dura 2 horas); si venció o está dañado, se descarta.
- Si la API responde 401, se limpia la sesión y se lleva a iniciar sesión.
- **Por qué sessionStorage:** se borra al cerrar la pestaña y no queda guardado por mucho tiempo, a diferencia de localStorage. Una cookie `httpOnly` sería más segura frente a XSS, pero exige cambios en el backend (protección CSRF) y queda como mejora.
- El código no usa `innerHTML` ni `dangerouslySetInnerHTML`, y no se guardan contraseñas en el navegador.

## Arquitectura (Atomic Design)

```
src/
├── components/   atoms, molecules, organisms y templates (LayoutPrincipal, PlantillaAdmin, RutaProtegida)
├── pages/        una página por ruta
├── context/      Auth, Usuarios, Servicios, Citas y Categorías
├── services/     api.js y un servicio por recurso
├── dto/          conversión de los datos de formularios al formato de la API
├── utils/        validaciones, permisos, filtros, precios y mensajes de error
└── hooks/        useTituloPagina
```

## Estado del trabajo

| Parte | Estado |
|---|---|
| Inicio de sesión, registro y sesión con JWT | Conectado a la API |
| Rutas protegidas por rol | Implementado y probado |
| Usuarios (administrador) | Conectado a la API |
| Catálogo de servicios | Conectado a la API |
| Solicitud y gestión de citas | Conectado a la API |
| Categorías, reportes, servicios críticos e historial | Siguen calculándose en el frontend (etapa final) |

## Pruebas

```bash
npm run test:run
```

Hay pruebas unitarias de átomos, moléculas, organismos, plantillas, contextos, servicios y utilidades. Incluyen la gestión de sesión (guardar, recuperar, token vencido o dañado y cierre) y las rutas por rol. Las pruebas de integración de la API están en el repositorio del backend (`scripts/pruebas-integracion.sh`).