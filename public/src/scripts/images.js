export function images(parentElement, pubSub) {
    let imgs = [];

    return {
        render: function () {
            //da fare
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