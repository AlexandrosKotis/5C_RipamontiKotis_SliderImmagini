export const adminTable = (parentElement, pubSub) => {
    let imagesData = [];

    return {
        build: function () {
        
            pubSub.subscribe("load", (data) => {
                imagesData = data;
                this.render();
            });
        },

        render: function () {
            let html = `
            <div class= "row"><button type="button" id="modalForm" class="btn btn-primary">Insert</button></div>
            <div class="row">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Anteprima</th>
                            <th>Identificativo</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody id="image-list">
            `;
            html += imagesData.map((image, index) => {
                return`
                <tr class="${index % 2 === 0 ? "table-light" : "table-secondary"}">
                    <td><img src="`+image.url+`" alt="`+image.id+`" class="img-thumbnail" style="width: 80px;"></td>
                    <td>`+image.id+`</td>
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
            `}).join("");
            html+="</tbody></table></div>"

            // Gestione eventi per edit e remove
            /*
            document.querySelectorAll(".edit-btn").forEach((button, index) =>
                button.onclick = () => pubSub.publish("images/update", button.dataset.id)
            );*/

            parentElement.innerHTML = html;

            
            document.querySelectorAll(".remove-btn").forEach((button, index) =>{
                button.onclick = () => {
                    pubSub.publish("delete", imagesData[index].id);
                }
            }
            );
            document.getElementById("modalForm").onclick = () => {
                pubSub.publish("modal");
            }
        },
    };
};
