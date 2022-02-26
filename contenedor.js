class Contenedor {
    constructor (archivo) {
        this.archivo = archivo;
    }

    async save(producto) {
        let productos = []; 
        const fs = require('fs');       
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8')
            productos = JSON.parse(contenido);
        }  catch {}
        producto.id = this.leerMaxId(productos) + 1;
        productos.push(producto);
        console.log('Producto Guardado: '+JSON.stringify(producto));
        try {
            await this.guardarProductos(productos); 
        } catch (err ) {
            console.log(`Error al Guardar el Archivo: ${err}`);
        }
    }
    
    leerMaxId(productos) {
        let id = 1;
        productos.map(prod => {
            if (prod.id>id) {
                id = prod.id;
            }
        })
        return id;
    }
    async guardarProductos(productos) {
        const fs = require('fs');
        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify(productos));
            console.log('Productos Guardados.');
        }  catch (err) {
            console.log(`Error al Guardar el Archivo: ${err}`);
        }   
    }

    async getAll() {
        const fs = require('fs');  
        try {     
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8')
            const productos = JSON.parse(contenido);
            return productos;            
        }  catch (err) { 
            console.log('No existen Productos.');
            return null;     
       }      
    }

    async getById(Number) {
        try {           
            const productos = await this.getAll();
            if (productos != null) {
                const prod = productos.find( prod => prod.id==Number);
                return prod;  
            } else {
                console.log('No existen Productos.');
                return null;
            }                          
        }  catch (err) { 
            console.log('No existen Productos.');
            return null;
        }       
    }
    

    async deleteById(Number) {
        let productos = []; 
        const fs = require('fs');       
        productos = fs.readFile(this.archivo, 'utf-8', (error, contenido)  => {
            if (error) {
                console.log('No existen Productos. Nada para Borrar')
            } else {
                productos = JSON.parse(contenido);
                const prod = productos.find( prod => prod.id==Number);
                try {
                    if (prod.length==0) {
                        console.log(`No se Encontró el Producto con ID ${Number}`);
                    } else {
                        const i = productos.indexOf(prod);
                        console.log(`Indice ${i}`)
                        productos.splice(i, 1);
                        this.guardarProductos(productos)
                        console.log(`Producto con ID ${Number} Eliminado ¡¡¡¡`);
                    }
                } catch {
                    console.log(`No se Encontró el Producto con ID ${Number}`);
                }                
            }
        });
    }

    deleteAll() {
        const fs = require('fs');       
        fs.unlink(this.archivo, error => {
            if (error) {
                console.log('No se Pudieron Eliminar los Productos.');
            } else {
                console.log('Productos Eliminados.');
            }
        })  
    }
}

async function Proceso() {
    const iphones = new Contenedor('productos.json');

    const iphone = {
        title: 'Iphone 13 Pro Max 256 GB Sierra Blue',                                                                                                                                 
        price: 1199,                                                                                                                                     
        thumbnail: 'https://www.apple.com/v/iphone-13-pro/d/images/overview/design/finishes_1_sierra_blue__2bovafkl4yaa_large.jpg',             
    }
    await iphones.save(iphone);
    const iphone2 = {
        title: 'Iphone 12 Pro Max 256 GB Sierra Blue',                                                                                                                                 
        price: 1000,                                                                                                                                     
        thumbnail: 'https://www.apple.com/v/iphone-13-pro/d/images/overview/design/finishes_1_sierra_blue__2bovafkl4yaa_large.jpg',             
    }
    await iphones.save(iphone2);
    
    const prod =  await iphones.getById(2);
    console.log('Producto Econtrado: '+JSON.stringify(prod));
       
    const prods = await iphones.getAll()
    console.log('Conjunto de Productos: '+JSON.stringify(prods));
}


module.exports = Contenedor;

//Proceso();

//iphone.deleteById(2);
//iphone.deleteAll();
