$('#formulario').on('submit', (ev) => {
    ev.preventDefault();

    const nombre = $('#nombre').val();
    const noticia = $('#noticia').val();
    const contraplano = $('#contraplano').val();

    const links = {
        'YT': $('#YT').val(),
        'LINKEDIN': $('#LINKEDIN').val(),
        'FB': $('#FB').val(),
        'IG': $('#IG').val(),
        'TIKTOK': $('#TIKTOK').val(),
        'TIKTOK2': $('#TIKTOK2').val(),
        'TWITTER': $('#TWITTER').val()
    }

    const url = 'https://tinyurl.com/api-create.php?url=';
    let reporte = `Reporte ${new Date().toLocaleDateString()}\n${nombre}\nNoticia: ${noticia}\n\n${contraplano}`;

    Promise.all(Object.entries(links).map(([key, value]) => $.get(`${url}${value}`).then(data => `${key}: ${data}`)))
        .then(results => {
            const final = results.join('\n');
            reporte += `\n${final}`;

            navigator.clipboard.writeText(reporte);
            alert('Reporte copiado al portapapeles.');
        })
        .catch(error => console.error('An error occurred:', error));
});
