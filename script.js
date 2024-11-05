// Función para cargar el archivo JSON y renderizar los canales por categoría
async function loadChannels() {
    try {
        // Cargar los canales
        const response = await fetch('lista.json');
        const channels = await response.json();
        const channelList = document.getElementById('channel-list');

        // Cargar las imágenes de art.json
        const artResponse = await fetch('art.json');
        const artImages = await artResponse.json();

        // Barajar las imágenes para seleccionarlas aleatoriamente
        const shuffledImages = artImages.sort(() => 0.5 - Math.random());

        // Utilizar un array para almacenar las imágenes ya usadas
        const usedImages = [];

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
            // Seleccionar una imagen aleatoria que no se haya usado
            const randomImage = shuffledImages.find(image => !usedImages.includes(image.src));

            // Crear la cabecera de la categoría con la imagen
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header mb-3 mt-5';

            if (randomImage) {
                categoryHeader.style.backgroundImage = `url(${randomImage.src})`;
                usedImages.push(randomImage.src); // Marcar la imagen como usada
                categoryHeader.style.height = '200px'; // Ajusta la altura como desees
            }

            categoryHeader.style.backgroundSize = 'cover'; // Asegura que la imagen cubra el área
            categoryHeader.style.backgroundPosition = 'center'; // Centra la imagen
            categoryHeader.innerHTML = `<h1 class="text-white bg-dark text-center">${category}</h1>`;
            channelList.appendChild(categoryHeader);


            // Crear los elementos de los canales de esta categoría
            categories[category].forEach(channel => {
                const channelItem = document.createElement('div');
                channelItem.innerHTML = `<a class="link-font" href="${channel.link}">${channel.name}</a>`;
                channelList.appendChild(channelItem);
            });
        }

        // Eliminar el spinner y mostrar el contenido
        document.getElementById('loading-spinner').remove();
        document.getElementById('content').style.display = 'block';

    } catch (error) {
        console.error('Error al cargar los canales:', error);
    }
}

window.onload = loadChannels;
