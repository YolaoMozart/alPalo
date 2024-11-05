// Función para cargar el archivo JSON y renderizar los canales
async function loadChannels() {
    try {
        const response = await fetch('lista.json');
        const channels = await response.json();
        const channelList = document.getElementById('channel-list');

        channels.forEach(channel => {
            const channelItem = document.createElement('div');
            channelItem.innerHTML = `<a href="${channel.link}">${channel.name}</a>`;
            channelList.appendChild(channelItem);
        });
    } catch (error) {
        console.error('Error al cargar los canales:', error);
    }
}

window.onload = loadChannels;