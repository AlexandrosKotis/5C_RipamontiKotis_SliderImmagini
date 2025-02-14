
const express = require("express");
const bodyParser = require('body-parser');
let http = require("http");
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const database = require("./database.js");
const config = JSON.parse(fs.readFileSync('config.json'));
config.ssl.ca = fs.readFileSync(__dirname + '/ca.pem');
const app = express();
const imagesTable = database(config);

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "dist/assets/images"));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage }).single('file');

if (!fs.existsSync("./dist/assets/images")) fs.mkdirSync("./dist/assets/images", { recursive: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/dist", express.static(path.join(__dirname, "dist")));

app.post("/image/add", async (req, res) => {
    await upload(req, res, async (err) => {
        const filename = req.file.filename;
        await imagesTable.insert(("/dist/assets/images/"+filename));
        //res.json({ result: "Ok" });   
        res.json({ url: "/dist/assets/images/" + req.file.filename });
    });
});

app.get("/images", async (req, res) => {
    const images = await imagesTable.select();
    res.json({ images: images });
});


app.get("/configuration", async (req, res) => {
    const config = JSON.parse(fs.readFileSync('configuration.json'));
    res.json(config);
});

app.put("/image/update", async (req, res) => {
    const todo = req.body;
    await upload(req, res, async (err) => {
        console.log(req.file.filename);
        const filename = req.file.filename;

        try {
            await (await imagesTable.select()).map(async (element) => {
                if (element.url === filename) {
                    element.url = filename;
                    await imagesTable.update(element);
                }
                return element;
            })
        } catch (e) {
            console.error(e);
        }
        //res.json({ result: "Ok" });
        res.json({ url: "/dist/assets/images/" + req.file.filename });
    })
});

app.delete("/image/delete/:id", async (req, res) => {
    const imgs = await imagesTable.select();
    const toDelete = imgs.filter((element) => element.id == req.params.id);
    await imagesTable.delete(toDelete[0]);
    res.json({ result: "Ok" });
})

const server = http.createServer(app);


server.listen(80, () => {
    console.log("- server running");
});