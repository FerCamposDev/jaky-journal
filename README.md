#### Pasos realizados

- Crear el proyecto
`
npx create-next-app@latest --ts jaky-journal
`

- Borre los estilos que trae el proyecto
- Instale eslint(el que busca errores en el codigo) con el siguiente comando y seleccione las opciones convenientes
`
npm init @eslint/config
`

- Cree un proyecto de firebase
- Instale los paquetes de firebase en el proyecto con los siguientes comandos
`
  npm i firebase react-firebase-hooks react-firebaseui
`
- Instale los paquetes de material ui + emotion que recomienda
`
  npm i @mui/material @mui/icons-material @emotion/cache @emotion/react @emotion/server @emotion/styled
`


### Inicializar el proyecto
- Clonar el repositorio de git desde la terminal con
`
  git clone https://github.com/FerCamposDev/jaky-journal.git
`

- Posicionarse con la terminal en la carpeta del proyecto y ejecutar
`
  npm install
`

- Una vez completada la instalacion ejecutar en la misma terminar
`
  npm run dev
`
accedemos desde http://localhost:3000


#### Tareas a realizar
- [x] Inicializar el proyecto
- [] Configurar firebase
- [] Crear pagina para iniciar sesion
- [] Crear un tema de estilos
- [] Obtener valor del dolar
- [] Descontar comisión %
- [] Calcular el 10%
- [] Pasar a pesos
- [] Libro control de billetes de cada persona