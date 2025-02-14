export function adminForm(parentElement, pubSub) {

    return {
        throw: function (string) {
            const element = document.getElementById("feed-div");
            element.innerText = string;
        },
        render: function () {
            parentElement.innerHTML = `
                <div class="flex flex-col items-center gap-4">
                    <input id="file" name="file" type="file" accept="image/*" class="form-control required">
                    <button type='button' class='btn btn-primary w-100' id='submitAdminForm'>Submit</button>
                </div>`
                + "<div id='feed-div' class=''></div>"
                + "<button type='button' class='btn btn-warning w-100 cl' id='cancel'>Cancel</button>";


            document.querySelector("#submitAdminForm").onclick = () => {
                const inputFile = document.querySelector('#file');
                const formData = new FormData();
                formData.append("file", inputFile.files[0]);
                try {
                    pubSub.publish("images/add", formData);
                } catch (e) {
                    console.log(e);
                    this.throw(e.message);
                }
            }
            document.querySelectorAll(".cl").forEach((e) =>
                e.onclick = () => {
                    //implemet close modal
                });
        },
    };
};