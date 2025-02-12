export const adminTable = (parentElement, pubSub) => {
    let imagesData = [];

    return {
        render: function () {
            parentElement.innerHTML = `
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Anteprima</th>
                            <th>Nome</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody id="image-list"></tbody>
                </table>
            `;

            pubSub.subscribe("images/update", (images) => this.build(images));
        },

        build: function (images) {
            imagesData = images;

            document.getElementById("image-list").innerHTML = images.map((image, index) => `
                <tr class="${index % 2 === 0 ? "table-light" : "table-secondary"}">
                    <td><img src="`+image.url+` alt="`+image.name+`" class="img-thumbnail" style="width: 80px;"></td>
                    <td>`+image.name+`</td>
                    <td>
                        <button type="button" data-id="`+image.id+`" class="btn btn-warning edit-btn mx-1">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" data-id="`+image.id+` "class="btn btn-danger remove-btn mx-1">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join("");

            // Gestione eventi per edit e remove
            document.querySelectorAll(".edit-btn").forEach(button =>
                button.onclick = () => pubSub.publish("images/update", button.dataset.id)
            );

            document.querySelectorAll(".remove-btn").forEach(button =>
                button.onclick = () => pubSub.publish("images/delte/:id", button.dataset.id)
            );
        }
    };
};
