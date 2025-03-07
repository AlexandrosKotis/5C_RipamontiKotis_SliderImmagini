const mysql = require('mysql2');
module.exports = function imagesTable (config) {
    const connection = mysql.createConnection(config);

    function executeQuery(sql) {
        return new Promise((resolve, reject) => {
            connection.query(sql, function (err, result) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(result);
            });
        })
    }

    async function createTable() {
        return await executeQuery(`
           CREATE TABLE IF NOT EXISTS images ( 
              id INT PRIMARY KEY AUTO_INCREMENT, 
              url VARCHAR(255) NOT NULL 
           );
        `);
    }

    createTable();
    return {
        insert: async function (urlImage) {
            const template = `INSERT INTO images (url) VALUES ('$URL');`;
            let sql = template.replace("$URL", urlImage);
            return await executeQuery(sql);
        },
        update: async function (data) {
            const template = `UPDATE images SET url = $URL WHERE id = $ID;`;
            let sql = template.replace("$ID", data.id);
            sql = sql.replace("$URL", data.url);
            return await executeQuery(sql);

        },
        delete: async function (imgs) {
            const template = `DELETE FROM images WHERE id = $ID;`;
            let sql = template.replace("$ID", imgs.id);
            return await executeQuery(sql);
        },
        select: async function () {
            const sql = `SELECT id, url FROM images;`;
            return await executeQuery(sql);
        },
        truncate: async function () {
            const sql = `TRUNCATE TABLE images;`
            return await executeQuery(sql);
        }
    }
}