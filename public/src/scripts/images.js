export function images(parentElement, pubSub) {
    let imgs = [];

    return {
        build: function () {
            pubSub.subscribe("images/add",  async (data) => {
                await this.send(data);
                await this.load();
            });
        },
        render: function () {
            let html = `<div id="carouselImagesIndicators" class="carousel slide">
                <div class="carousel-indicators">
                    ${
                        imgs.map((img, index) => {
                            return `<button type="button" data-bs-target="#carouselImagesIndicators" data-bs-slide-to="${index}" aria-current="${index === 0 ? "true" : "false"}" aria-label="Slide ${index}"></button>`
                        }).join("")
                    }
                </div>
                <div class="carousel-inner">
                    ${
                        imgs.map((img, index) => {
                            return `<div class="carousel-item ${index == 0 ? "active" : ""}">
                                        <img src="${img.url}" class="d-block w-100" alt="Immagine n° ${img.id}">
                                    </div>`
                        }).join("")
                    }
                </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselImagesIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselImagesIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>`;
            
            parentElement.innerHTML = html;
        },

        send: async function (img) {
            try {
                const response = await fetch("/image/add", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(img)
                });
                const json = await response.json();
                return json;
            }
            catch (error) {
                throw error;
            }
        },

        load: async function () {
            try {
                const response = await fetch("/images");
                const json = await response.json();
                images = json.images;
                this.render();
                return json;
            }
            catch (error) {
                throw error;
            }
        },

        complete: async function (img) {
            try {
                const response = await fetch("/image/update", {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(img)
                });
                const json = await response.json();
                return json;
            }
            catch (error) {
                throw error;
            }
        },

        delete: async function (id) {
            try {
                const response = await fetch("/image/delete/" + id, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const json = await response.json();
                return json;
            }
            catch (error) {
                throw error;
            }
        }
    }
} 