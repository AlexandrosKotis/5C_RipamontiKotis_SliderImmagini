export function adminForm(parentElement, pubSub) {

    return {
        throw: function (string) {
            const element = document.getElementById("feed-div");
            element.innerText = string;
        },
        render: function () {
            parentElement.innerHTML = `
                <div class="d-flex justify-content-center align-items-center">
    <div class="card shadow-lg p-4" style="width: 22rem;">
        <h3 class="text-center mb-3">Carica Immagine</h3>
        <div id="feed-div" class="alert alert-danger d-none" role="alert">
            Errore nel caricamento. Riprova.
        </div>
        <form>
            <div class="mb-3">
                <label for="file" class="form-label">Seleziona un file</label>
                <input id="file" name="file" type="file" accept="image/*" class="form-control required">
            </div>
            <button type="button" class="btn btn-primary w-100 mb-2" id="submitAdminForm">Submit</button>
            <button type="button" class="btn btn-warning w-100" id="cancel">Cancel</button>
        </form>
    </div>
</div>
`;


            document.querySelector("#submitAdminForm").onclick = () => {
                const inputFile = document.querySelector('#file');
                const formData = new FormData();
                formData.append("file", inputFile.files[0]);
                try {
                    pubSub.publish("images/add", formData);
                    pubSub.publish("submit", formData);
                } catch (e) {
                    console.log(e);
                    this.throw(e.message);
                }
            }
            document.querySelector("#cancel").onclick = () => {
                pubSub.publish("cancel");
            }
        },
    };
};