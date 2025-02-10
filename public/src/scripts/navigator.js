const hide = (elements) => {
    elements.forEach((element) => {
        element.classList.add("d-none");
    });
}

const show = (element) => {
    element.classList.remove("d-none");
}

export const createNavigator = (parentElement) => {

    const render = () => {
        const pages = Array.from(document.querySelectorAll(".sliderPage"));
        const url = new URL(document.location.href);
        const pageName = url.hash.replace("#", "");
        const selected = pages.filter((page) => page.id === pageName)[0] || pages[0];
        hide(pages);
        show(document.getElementById("spinner"));
        setTimeout(() => {
            console.log("Loading Done!");
            document.getElementById("spinner").classList.add("d-none");
            show(selected);
        }, 2000);
    }
    window.addEventListener('popstate', render);
    render();
}


