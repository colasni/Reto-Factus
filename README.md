# Reto Factus <img src = "https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width = 30px> 
<p>
  <a href="https://github.com/DenverCoder1/readme-typing-svg"><img src="https://readme-typing-svg.herokuapp.com?&font=IBM+Plex+Sans&color=abcdef&size=20&lines=Welcome" /></a>
</p>

![Image](https://github.com/user-attachments/assets/0c9738b3-0858-411a-8e20-fb2b5492851a)

<h3>Mi experiencia con este reto fue de mucho aprendizaje, ya que ni siquiera sabia que era una factura electrónica. Creo que mi mayor desafío fue documentarme bien de la api, pero todo fue muy positivo, a pesar de que tuve muchos problemas cuando apenas estaba empezando el reto. </h3>
<br>
Video en el cual explicó su funcionamiento: https://youtu.be/rx8Q4QZl_hs?si=2FCgiSgxESHnDHCS
<br>
<br>
Configuración del Backend
Instalar dependencias

```
cd backend
```
```
npm install
```

Iniciar el servidor
```
node --watch server.js
```
El servidor estará corriendo en: http://localhost:5000

Configuración del Frontend
Instalar dependencias
```
cd frontend
```
```
npm install
```
- crear el archivo .env en la raiz del proyecto
- agrega las variables de entorno
```
VITE_CLIENT_ID = El valor lo obtienes de las credenciales de la api factus
VITE_CLIENT_SECRET =  El valor lo obtienes de las credenciales de la api factus
```
Iniciar la aplicación
```
npm run dev
```
***
<h2>Documentación del Backend</h2>
El backend de la aplicación está construido con MongoDB, Node.js y Express.
<h3>Endpoints de la API invoice-service</h3>

- POST /api/invoice/addinvoice: agrega las facturas a la base de datos.
- GET /api/invoice/getinvoice: Obtener las facturas de la base de datos.

<h3>Endpoints de la API factus (los que se usaron)</h3>

- URL_API https://api-sandbox.factus.com.co
- POST /oauth/token: para autenticación
- POST /v1/bills/validate: Crea y valida facturas
- GET /v1/bills/download-pdf/: Obtiene el pdf en base64



