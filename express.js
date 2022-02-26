const express = require('express');
const Contenedor = require('./contenedor.js');

const app = express()
const PORT = 8080;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

const srv = app.listen(PORT, () => {
    const iphone13 = {
        title: 'Iphone 13 Pro Max 256 GB Sierra Blue',                                                                                                                                 
        price: 1199,                                                                                                                                     
        thumbnail: 'https://www.apple.com/v/iphone-13-pro/d/images/overview/design/finishes_1_sierra_blue__2bovafkl4yaa_large.jpg',             
    }
    const iphone12 = {
        title: 'Iphone 12 Pro Max 256 GB Sierra Blue',                                                                                                                                 
        price: 1000,                                                                                                                                     
        thumbnail: 'https://www.apple.com/v/iphone-12/key-features/e/images/overview/hero/hero_purple__dqiol61kx9oy_large.jpg',             
    }
    const iphone11 = {
        title: 'Iphone 11 Pro Max 256 GB Sierra Blue',                                                                                                                                 
        price: 800,                                                                                                                                     
        thumbnail: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-select-2019-family?wid=441&hei=529&fmt=jpeg&qlt=95&.v=1567022175704',             
    }
    // const prod = new Contenedor('productos.json')
    // prod.save(iphone13, res => {
    //      prod.save(iphone12, res => {
    //          prod.save(iphone11, res => {

    //          });
    //      });
    // });
   console.log(`Servidor http escuchando en el puerto ${srv.address().port}`)
})

srv.on("error", error => console.log(`Error en servidor ${error}`))

function contenedorProd(nombre, price, thumbnail) {
    let html = `<h1 style="background-color: blue;">Producto SELECCIONADO</h1>`;
    html += `<br>`;
    html += `<ul>`
    html += `   <li>Nombre: ${nombre}</li>`
    html += `   <li>Precio USD: ${price}</li>`
    html += `<ul>`
    html += `<img style="width: 500px" src="${thumbnail}" alt="${nombre}"</td>`;
    html += `<br>`
    html += `<a href="/"> Inicio</a>`
    html += `<br>`
    html += `<a href="/productos"> Ver Productos</a>`;
    return html;
}

app.get('/', (req, res) => {
    res.send(`
        <h1> Bienvenido al Portal de Celulares Iphone.</h1>
        <br>
        <br>
        <a href="/productos"> Ver Productos</a>
        <br>
        <a href="/productoRandom"> Ver UN Producto</a>
    `); 
    
})

app.get('/productos', async (req, res) => {
    const productos = new Contenedor('productos.json');
    const prods = await productos.getAll();
    let html = `<h1 style="background-color: red;">Productos en Stock</h1>`;
    html += `<br>`
    html += `<table>`
    html += `   <tr>`
    html += `       <th>Nombre</th>`
    html += `       <th>Precio</th>`
    html += `       <th>Foto</th>`
    html += `   </tr>`
    for (let p of prods){
                html += `<tr>`;
                html += ` <td>${p.title}</td>`;  
                html += ` <td> USD ${p.price}</td>`;  
                html += ` <td><img style="width: 50px" src="${p.thumbnail}" alt="${p.title}"</td>`;  
                html += `</tr>`;
    }
    html += `</table>`
    html += `<br>`
    html += `<a href="/"> Inicio</a>`
    html += `<br>`
    html += `<a href="/productoRandom"> Ver UN Producto</a>`
    res.send(html); 
})

app.get('/productoRandom', async (req, res) => {
    const productos = new Contenedor(`productos.json`);
    const prods = await productos.getAll();   
    const id = getRandomInt(1, prods.length)
    const prod = prods[id];
    console.log(id);
    console.log(prod);
    res.send(contenedorProd(prod.title, prod.price, prod.thumbnail)); 
})


