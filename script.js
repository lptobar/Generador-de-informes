$('#reporte').on('submit', (ev) => {
    ev.preventDefault();

    const nombre = $('#nombre').val();
    const noticia = $('#noticia').val();

    localStorage.setItem('nombre', nombre);
    
    const options = {
        'YT': $('#youtube').val(),
        'LINKEDIN': $('#linkedin').val(),
        'FB': $('#facebook').val(),
        'IG': $('#instagram').val(),
        'TIKTOK': $('#twitter').val(),
        'TWITTER': $('#tiktok').val()
    }

    const url = 'https://tinyurl.com/api-create.php?url=';
    let format = '';

    const promises = Object.entries(options).map(([option, value]) => {
        return $.get(`${url}${value}`).then((data) => {
            return `${option}: ${data}\n`;
        });
    });

    Promise.all(promises).then((results) => {
        format = results.join('');
        
        const reporte = `Reporte ${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/')}\n${nombre}\n\nNoticia: ${noticia}`;
        navigator.clipboard.writeText(`${reporte}\n${format}`);

        alert('Reporte copiado al portapapeles.');
    });
});