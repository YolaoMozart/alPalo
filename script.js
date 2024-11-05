// Función para cargar el archivo JSON y renderizar los canales por categoría
async function loadChannels() {
    try {
        const response = await fetch('lista.json');
        const channels = await response.json();
        const channelList = document.getElementById('channel-list');

        // Organiza los canales por categoría
        const categories = {};
        channels.forEach(channel => {
            if (!categories[channel.category]) {
                categories[channel.category] = [];
            }
            categories[channel.category].push(channel);
        });

        // Itera sobre cada categoría y crea los elementos correspondientes
        for (const category in categories) {
            // Crear la cabecera de la categoría
            const categoryHeader = document.createElement('p');
            categoryHeader.className = 'lead text-muted mt-5';
            categoryHeader.textContent = `${category}`;
            channelList.appendChild(categoryHeader);

            // Crear los elementos de los canales de esta categoría
            categories[category].forEach(channel => {
                const channelItem = document.createElement('div');
                channelItem.innerHTML = `<a href="${channel.link}">${channel.name}</a>`;
                channelList.appendChild(channelItem);
            });
        }


        document.getElementById('loading-spinner').remove();
        document.getElementById('content').style.display = 'block';

    } catch (error) {
        console.error('Error al cargar los canales:', error);
    }
}

window.onload = loadChannels;
