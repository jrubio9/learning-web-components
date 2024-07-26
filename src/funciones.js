export default function attachCssToShadowDom(nombreArchivo) {
    if (!nombreArchivo) throw new Error('Attach css debe tener un parámetro con el nombre de archivo');
    if (!nombreArchivo.endsWith('.css')) {
        nombreArchivo += '.css';
    }

    // Apply external styles to the shadow dom
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", nombreArchivo);

    return linkElem;
}