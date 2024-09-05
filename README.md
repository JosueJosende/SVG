![logo codeshape](./imgs/logo.webp)

### Descripción
Esta aplicación web permite a los usuarios crear gráficos vectoriales escalables (SVGs) de manera programática. Los usuarios introducen una secuencia de comandos de dibujo en un textarea, siguiendo el formato específico, y la aplicación renderiza el SVG correspondiente.

### Uso
Interfaz:  
- **Textarea**: Introduce los comandos de dibujo siguiendo el formato especificado.
- **Botón de renderizado**: Inicia el proceso de creación del SVG.
- **Visualización**: El SVG generado se mostrará en un elemento "< svg />" en la aplicación.

Comandos básicos:  
- **M[x y]**: Mueve el puntero al punto (x, y).
- **L[x y]**: Dibuja una línea entre los puntos dados (x, y).

Comandos compuestos [Curvas de Bézier, arcos, etc.]:  
- **Rectángulo**: M 10 10 L 100 10 L 100 100 L 10 100 Z
- **Círculo**: M 50 50 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0
[Más ejemplos complejos]
### Desarrollo
- Vanilla Javascript
- HTML
- CSS

### Contribuciones
[Instrucciones para realizar contribuciones]  
- ...

### Roadmap

- [x] ...
- [ ] Descargar archivo solido .svg  
- [ ] Copiar el elemento svg en formato texto  
- [x] Boton abrir historico de archivos svg creados  
- [x] Boton cerrar historico de archivos svg creados
- [x] Cambiar el entorno visual al seleccionar entre archivos del historico
- [x] Lógica para crear un archivo nuevo
- [x] Borrar un archivo del historico
- [ ] Adaptar grid de edicion de svg a viewBox guardado en localStorage  
- [ ] Mostrar punteros y offsets en el editor
- [ ] Añadir boton y lógica para cambiar el stroke-width del panel de edición
- [ ] Añadir botón y lógica para cambiar el stroke-color del panel de edición
- [x] Cambiar color background del icono fill cuando se seleccione otro color
- [x] Scrollbar en el listado de archivos del historico
- [x] Crear nuevo archivo, ejecutar de nuevo el createHistoryFiles()
- [x] Al actualizar: nombre de archivo, stroke file, nuevo  path, borrar path, actualizar createHistoreFiles()
- [x] Agregar plantilla, que pueda ser una imagen sobre puesta en el view del editor

  

### Licencia
[Especifica la licencia bajo la cual se distribuye el código, e.g., MIT, GPL]