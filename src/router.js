const routes = {
    404: {
        template: "src/404.html",
        title: "404",
        description: "Page not found",
    },
    "/": {
        template: "src/index.html",
        title: "Home",
        description: "This is the home page",
    },
    calendar: {
        template: "src/calendar/index.html",
        title: "Calendar",
        description: "Calendar Web Component",
        script: () => import("./calendar/calendar.js")
    },
    kanban: {
        template: "src/kanban/index.html",
        title: "Kanban",
        description: "Kanban Web Component",
        script: () => import("./kanban/kanban.js"),
    },
    vacations: {
        template: "src/vacations-calendar/index.html",
        title: "Vacations",
        description: "Auto-managed Vacations calendar",
        script: () => import("./vacations-calendar/vacations.js"),
    },
    components: {
        template: "src/components/index.html",
        title: "Components",
        description: "Components Web Component",
        script: () => import("./components/components.js"),
    }
};

const locationHandler = async () => {
    // get the url path, replace hash with empty string
    var location = window.location.hash.replace("#", "");
    // if the path length is 0, set it to primary page route
    if (location.length == 0) {
        location = "/";
    }
    // get the route object from the routes object
    const route = routes[location] || routes["404"];
    // get the html from the template
    const html = await fetch(route.template).then((response) => response.text());

    // set the content of the content div to the html
    document.getElementById("content").innerHTML = html;
    // set the title of the document to the title of the route
    document.title = route.title;
    // set the description of the document to the description of the route
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);

    // Load the script if it exists
    if (route.script) {
        await route.script();
        console.log("Ejecutamos el script");
        dispatchEvent(new Event(location + "Creado"));
    }

};

// create a function that watches the hash and calls the urlLocationHandler
window.addEventListener("hashchange", locationHandler);
// call the urlLocationHandler to load the page
locationHandler();