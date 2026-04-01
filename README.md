Este es un proyecto final de ciclo que simula la web de una Autoescuela... con la idea de fomentar las actividades online para tener una mayor felixibilidad horaria a la hora de hacer tareas durante el día.

Es un proyecto que esta desarrollado en FRONTEND con el framework de ANGULAR(typescript). En el utilizo modelos, rutas para cada componente, componentes y servicios que conectan 
con las rutas que hay en el BACKEND.

En el BACKEND utilizo Node.Js y Express en donde utilizo servicios en los que implemento métodos para coger información de la BBDD, crear, actualizar, eliminar o mostrar.
Todos estos servicios lo guardo en una carpeta llamada CONTROLLERS (que es donde de donde conecto con la base de datos para sacar a traves de métodos información dentro de ella).

De los controladores pasan a las rutas... que es de donde para cada metodo del CONTROLLERS tiene su ruta conectada a ese método.
Y en las rutas se conecta a través del HttpClient al servicio del FRONT. 

En donde llega la información en forma de métodos que creamos con las rutas que definimos en el BACKEND.

Como BBDD relacional, utilizó MySQL. Debido a la facilidad que tiene y lo visual que me parece.
En general ha sido un proyecto bueno, aunque en algunas partes ha habido complicaciones en la implementación. Pero se ha terminado sacando.

He terminado aprendiendo mucho sobre este proyecto.
