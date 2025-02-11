export function adminForm(parentElement, pubSub) {
    let data = [];
    let callback = null;
    let closeRender = null;
    
    return {
        onsubmit: (callbackInput) => { callback = callbackInput },
        closeRender: (callback) => closeRender = callback,
        send: (string, value) => {
            const element = document.getElementById("feed-div");
            const cls = value === true ? "feedback-div" : "error-div";
            for (css of element.classList) {
                element.classList.remove(css);
            }
            element.classList.add(cls);
            element.innerText = string;
        },
        render: () => {
            parentElement.innerHTML =
            data.map(()=>{

                return `<div class="flex flex-col items-center gap-4">
            <input id="file" name="file" type="file" accept="image/*" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 required">
            <button id="button" type="button" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">Upload</button>
        </div>`;
        
            }).join('\n')
            + "<div id='feed-div'></div>"
            + "<button type='button' class='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' id='submit'>INVIA</button>"
            + "<button type='button' class='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cl' id='cancel'>ANNULLA</button>";
            ;

            document.querySelector("#submit").onclick = () => {
                const result = data.map((name) => {
                    return document.querySelector("#" + name[0]).value;
                });
                callback(result);
            }
            document.querySelectorAll(".cl").forEach((e) =>
                e.onclick = () => {
                    closeRender();
                });

                pubSub.publish("formSubmitted");
        },
    };
};