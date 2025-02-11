export async function credential(parentElement, pubSub) {
    try {
        let config = await fetch("/configuration");
        config = await config.json();
        config = JSON.parse(config);
    }
    catch (e) {
        throw e;
    }
    let isLogged = localStorage.getItem("isLogged") ?? false;

    return {
        render: function () {
            if(isLogged) return; 
            parentElement = `<div class="bg-dark d-flex justify-content-center align-items-center vh-100">
                                <div class="card shadow-lg p-4" style="width: 22rem;">
                                    <h3 class="text-center mb-3">Login</h3>
                                    <div id="errorMessage" class="alert alert-danger d-none" role="alert">
                                        Credenziali non valide. Riprova.
                                    </div>
                                    <form>
                                        <div class="mb-3">
                                            <label for="username" class="form-label">Username</label>
                                            <input type="text" class="form-control" id="username" name="username" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="password" class="form-label">Password</label>
                                            <input type="password" class="form-control" id="password" name="password" required>
                                        </div>
                                        <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" id="rememberMe">
                                            <label class="form-check-label" for="rememberMe">Remember Me</label>
                                        </div>
                                        <button id="loginSubmit" type="submit" class="btn btn-primary w-100">Login</button>
                                    </form>
                                </div>
                            </div>`;

            document.getElementById("loginSubmit").onclick = async () => {
                const usernameInput = document.getElementById("username").value;
                const passwordInput = document.getElementById("password").value;
                const rememberMeInput = document.getElementById("rememberMe").checked;
                if(!usernameInput || !passwordInput) return document.getElementById("errorMessage").classList.remove("d-none");
                if(await this.login(usernameInput, passwordInput)){
                    if(rememberMeInput) localStorage.setItem("isLogged", true);
                    document.getElementById("errorMessage").classList.add("d-none");
                    pubSub.publish("isLogged", true);
                }
                else{
                    document.getElementById("errorMessage").classList.remove("d-none");
                }
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
                document.getElementById("rememberMe").checked = false;
            };
        },
        login: async function (username, password) {
            try {
                const r = await fetch(config.login, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "key": config.token
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });
                const data = await r.json();
                if (data.result === true) {
                    isLogged = true;
                    return true;
                }
                else {
                    throw Error("Credenziali Errate");
                }
            } catch (error) {
                throw error;
            }
        },
        register: async function (username, password) {
            try {
                const r = await fetch(config.register, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "key": config.token
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });
                const data = await r.json();
                return data;
            } catch (error) {
                throw error;
            }
        }
    }
}