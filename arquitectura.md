Cliente / Navegador
        |
        v
Capa de entrada HTTP
        |
        v
Capa de routing
        |
        +------------------+-------------------+
        |                  |                   |
        v                  v                   v
Handlers de API     Handlers de vistas   Handler estático
        |                  |                   |
        v                  v                   v
JSON response      Layout HTML + HTML     public/ + fs
        |                  |                   |
        +------------------+-------------------+
                           |
                           v
                    Respuesta HTTP
                           |
                           v
                  Cliente / Navegador