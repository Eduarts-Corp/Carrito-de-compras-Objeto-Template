// 1.Empezamos siempre por lo que queremos capturar en este caso el carrito donde se van a pintar los elementos y multiplico esas lineas ya que tambien necesitare el template 

const carrito = document.querySelector('#carrito');
const template = document.querySelector('#template');

// 2.Ahora necesitamos el fragment para evitar el reflow.

const fragment = document.createDocumentFragment();

// 3. Ahora vamos a seleccionar todos los botones de nuestras tarjetas ya que tiene ese data-fruta que nos servira para saber que boton presionamos.Aqui con el queryselector podemos seleccionarlo a traves de la clase card y su subclase btn

const btnesBotones = document.querySelectorAll('.card .btn');


// // 4. Aca vamos a probar que estas constarntes funcionen, fragment y template no se ven por eso no las pruebo las otras 2 si
// console.log(carrito);
// console.log(btnesBotones);

// 5. Ahora aca debemos preguntarnos DONDE VAMOS A ALMACENAR LOS PRODUCTOS.???. PoPodriamos hacer un array pero vamos a practicar con Objetos. Entonces tenemos una const

const carritoObjeto = {}


// 6.Ahora vamos a hacer la funcion de agregar al carrito lo que va dentro de los parametros de la funcion flecha (e) es el elemento y abajo en el clg lo que decimos es de ese elemento muestreme el objetivo y si vemos cada vez que presionamos un agregar nos muestra en consola el elemento pero para ser mas especificos podemos ponerle el dataset.fruta. Ese dataset es para efectivamente poder leer ese data-fruta del html. Al darle en Agregar a cada boton ahora si nos va a mostrar solo el nombre de la fruta.

// 9.1 continuando aca el titulo del objeto sera el que me arroja el  nombre de la fruta osea el e.target.database.fruta. Tambien tendra un id y como se que las frutas no se repiten tambien puede ser el mismo e.target....
const agregarAlCarrito = (e) => {
    console.log(e.target.dataset.fruta);

    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1 // Por el momento ponemos esa cantidad pero se supone tiene que aumentar. Por el momento vamos a empujar este objeto a nuestro carrito y como lo hacemos? paso(10)
    };

    // Paso 22. Le preguntamos si el carritoObjeto tiene la propiedad hasOwnPorperty(aqui la propiedad que no se repita como el id o el titulo que sabemos que no se repite, entonces le ponemos producto.id). SI eso no existe dentro de nuestra coleccion de objetos que pase aca dentro del if, en caso de que pase le vamos a decir que ese producto lo podemo modificar y decimos que producto.cantidad va a ser igual a carritoObjeto, buscamos el producto en si, que en este caso puede ser como lo llamamos (producto.titulo) y .cantidad y le sumamos 1 con esto estamos capturando la cantidad que viene de nuestro carritoObjeto y le sumamos 1. Con esto entonces

    // NOTA: Al precionar la primer vez a cada agregar aparece 1 porque no entra al if, por lo tanto la cantidad siempre sera 1 como el elemento estatico. Ahora si presiono nuevamente sobre una fruta, existe esa propiedad ya dentro de mi carritoObjeto(lo busca por producto.titulo), por lo tanto modifico la cantidad

    if (carritoObjeto.hasOwnProperty(producto.titulo)) {
        producto.cantidad = carritoObjeto[producto.titulo].cantidad + 1;
    }

    // Paso 10. aqui le decimo que carrito Objeto que es donde vamos a tener nuestros productos es igual al producto que es nuestro objeto
    carritoObjeto[producto.titulo] = producto;
    // y aca dentro una vez que agregamos un elemento tenemos que ejecutar la funcion pintarCarrito (paso14)

    // paso14. Aqui a la funcion le pasamos el producto, se lo enviamos y lo vamos a recibir como parametro en el paso 13. Luego que vemos que funciona vamos a hacer el recorrido del carritoObjeto entonces vamos al paso 13 y alli vamos a hacer ese proceso.
     pintarCarrito(producto)

// Paso 11. Lo Probamos y como sabemos que efectivamente a nuestro carrito se le estan agregando cosas vamos a pintarlo a traves de nuestro templatepero para ello vamos a necesitar efectivamente otra funcion que sea como pintarCarrito (paso 12) 
    console.log(carritoObjeto);
};

// Paso 13. Vamos a poner la funcion de pintar carrito

const pintarCarrito = (producto) => {

    // paso 15. PAra convertir esto en un array y poder recorrerlo con un forEach recordemos que tenemos poner el Object.values del objeto que queremos recorrer que es carritoObjeto y ahi si le hacemos el forEach, aqui lo representamos como un item y cada item va a ser el de cada objeto en cuestion que se esta recorriendo y ahora como usamos el template donde nosotros queremos pintar el carrito en cuestion? ese template el el li que tenemos en el html, por lo tanto sabemos que ese esta en template(linea 4) pero recordemos que es necesario primero clonarlo de manera que vamos a hacer eso en paso 16

    
    Object.values(carritoObjeto).forEach((item) => {

        // Paso 21. Aqui es necesario que nuestro carrito parta o inicialice vacio siempre para que no se nos repitan los elementos al momento de seleccionarlos.Ahora la probarlo vemos que ya no se repiten pero no aumenta el marcador si seleccionamos 2 veces o mas la misma fruta para ello vamos al paso 22. Ese numero es estatico porque asi lo tenemos en elhtml pero de alguna manera debemos preguntarle al objeto que si el producto ya existe tome la cantidad y le sume 1 y eso se puede hacer mediante un if (revisar paso 22)

        carrito.textContent = " ";

        // Paso 16. creamos la constante del clon y le decimos casi como si fuese una plantilla template.content.firstEle...... y le pasamos el true
        const clone = template.content.firstElementChild.cloneNode(true);
        // 16.1 Perfecto ya tenemos la clonacion y ahora a traves delclon buscamos los elementos, por eje eso que dice patilla en el template, entonces podemos cogernos de la clase lead ya que no esta en otra parte entonces vamos al paso 17
        
        // Paso 17.Entonces aca lo seleccionamos con el querySelector y con textContent lo remplazamos por o sera igual a el item.titulo que ese titulo sabemos que se captura del dataset y el item porque es el que deja cada vez que da la vuelta el forEach
        clone.querySelector('.lead').textContent = item.titulo;

        // Paso 18. Luego hacemos un clone del elemento dinamico que en este caso es el 12 que tenemos en el otro span del html.Lo seleccionamos por una de sus clases y le decimos item.cantidad que es el valor que nos va a aroojar.

        clone.querySelector('.badge').textContent = item.cantidad;
        
    // Paso 19. Una vez que tenemos esos clones aprendimos que para evitar el reflow podemos usar el fragment.appendChild y le pasamos el clone
        fragment.appendChild(clone); // Aqui una vez que se termina el ciclo, o de hacer ese reflow, nosotros en el carrito queremos pintar la informacion por eso lo hacemos en el paso 20
    });

// Paso 20. Aqui invocamos la constante de la linea 3 y aqui le pasamos el frgment. Lo probamos y veremos que se nos repite el producto por lo que es necesario en el paso 21 inicialicemos nuestro carrito siempre vacio.(ver paso 21)
    
    carrito.appendChild(fragment);

    //  console.log('pintarCarrito', producto); // aca lo pintamos tambien(venimos del paso 14). Una vez que vemos que funciona ahora si lo podemos pintar donde entonces dejamos este console log comentado
 }
 


// 7. Ahora tambien debemos hacer una funcion para realizar el recorrido. TEnemos que recorrer cada uno de esos botones para detectarlos (al darle agregar a c/u )

// 8.Vamos a poner el forEach y dentro el addEventListener con su evento click que lo agregue al carrito
btnesBotones.forEach((btn) => {
    btn.addEventListener('click',agregarAlCarrito )
})

// 9. YA tenemnos un evento por cada uno de los botones hasta aca, ahora que tendriamos que hacer?. Pues agregaros al carrito osea la paso 5. PAra ello primero podemos poner dentro de la funcion agregarAlCarrito (paso 6) un objeto que se llamara const producto.veamos el paso 6






































































































































































