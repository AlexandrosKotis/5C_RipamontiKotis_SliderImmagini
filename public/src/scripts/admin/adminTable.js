export const adminTable = (parentElement, pubSub) => {
    let imagesData = [];
    pubSub.subscribe("images/add", (data) => {
        imagesData = data;
        this.render();
    })

    return {
        render: function () {
            let html = `
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Anteprima</th>
                            <th>Nome</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody id="image-list">
            `;
            html = images.map((image, index) => `
                <tr class="${index % 2 === 0 ? "table-light" : "table-secondary"}">
                    <td><img src="`+image.url+` alt="`+image.name+`" class="img-thumbnail" style="width: 80px;"></td>
                    <td>`+image.name+`</td>
                    <td>
                    <!--
                        <button type="button" data-id="`+image.id+`" class="btn btn-warning edit-btn mx-1">
                            <i class="fas fa-edit"></i>
                        </button>
                    -->
                        <button type="button" data-id="`+image.id+` "class="btn btn-danger remove-btn mx-1">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join("");
            html="</tbody></table>"

            // Gestione eventi per edit e remove
            /*
            document.querySelectorAll(".edit-btn").forEach((button, index) =>
                button.onclick = () => pubSub.publish("images/update", button.dataset.id)
            );*/

            document.querySelectorAll(".remove-btn").forEach(button =>
                button.onclick = () => pubSub.publish("images/delte/:id", button.dataset.id)
            );

            parentElement.innerHTML = html;
        },
    };
};
