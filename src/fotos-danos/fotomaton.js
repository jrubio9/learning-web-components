let canvas = document.createElement("canvas");
let ctx = null;
let stream = null;

const mostrarAviso = (mensaje) => {
    console.warn(mensaje.replace(/<[^>]+>/g, ""));
};

const inicializar = async videoElement => {

    if (stream) {
        videoElement.srcObject = stream;
        return true;
    }

    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        // ui.tostada No se pueden listar camaras del dispositivo
        console.warn("getUserMedia not supported on your browser!");
        return false;
    }
    // facingMode --> User para camara frontal, environment para camara trasera.
    try {
        stream = await navigator.mediaDevices.getUserMedia({video: {
                width: {ideal: 1920},
                height: {ideal: 1080},
                facingMode: "environment"
            }, audio: false
        });

        if (!stream) {
            // ui.tostada Sin camera
            console.warn("No hay ninguna camara disponible!");
            return false;
        }
        videoElement.srcObject = stream;
        let streamSettings = stream.getVideoTracks()[0].getSettings();
        canvas.height = streamSettings.height;
        canvas.width = streamSettings.width;
        // En iPad la camara se inicia siempre en portrait, así que giramos los parámetros.
        if ((/iPhone|iPad|iPod|Macintosh/i).test(navigator.userAgent)) {
            canvas.height = streamSettings.width;
            canvas.width = streamSettings.height;
        }
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return true;

    } catch (error) {
        console.error(`The following getUserMedia error occurred: ${error}`);
        if (error.name === "NotFoundError") {
            mostrarAviso("<i>No se ha detectado ninguna camara.</i>");
        } else {
            mostrarAviso("<i>Error al solicitar permisos de camara.</i>");
        }
        return false;
    }
};

const getSettings = () => stream.getVideoTracks()[0].getSettings();

const finalizar = () => {
    if (!stream) {
        return;
    }
    let tracks = stream.getTracks();
    if (tracks.length) {
        tracks[tracks.length - 1].stop();
        stream.removeTrack(tracks[tracks.length - 1]);
        if (!(tracks.length - 1)) {
            stream = null;
        }
    }
};

const capturar = video => {

    if (!stream) {
        return;
    }

    try {
        video.classList.add("shoot-anim");
        setTimeout(function () {
            video.classList.remove("shoot-anim");
        }, 1000);

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // width (500), height (400)
        //download(canvas.toDataURL("image/jpeg"));
        return canvas.toDataURL("image/jpeg");
    } catch (error) {
        console.error(`Error capturando imagen: ${error}`);
    }
};

// Solo para testear

//function download(data) {
//    let link = document.createElement("a");
//    link.download = "filename.jpeg";
//    link.href = data;
//    link.click();
//}

export default {inicializar, finalizar, capturar, getSettings};
