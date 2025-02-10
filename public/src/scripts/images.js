export function images(parentElement, pubSub) {
    let imgs = [];

    return {
        render: function () {
            `<div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
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