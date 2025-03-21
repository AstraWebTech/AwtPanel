const db = require("./index");
const {hash} = require("bcrypt");
require('dotenv').config();

db.serialize( () => {
    db.run("PRAGMA foreign_keys = ON;");

    db.run(`CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        previewImg TEXT,
        description TEXT
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS servers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        login TEXT,
        password TEXT,
        host TEXT
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS database_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        code TEXT NOT NULL UNIQUE
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS databases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        user TEXT NOT NULL,
        password TEXT NOT NULL,
        server_id INTEGER,
        type_id INTEGER,
        FOREIGN KEY (server_id) REFERENCES servers(id) ON DELETE SET NULL,
        FOREIGN KEY (type_id) REFERENCES database_types(id) ON DELETE SET NULL
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS gits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL UNIQUE
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS sites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        previewImg TEXT,
        url TEXT NOT NULL,
        server_id INTEGER,
        database_id INTEGER,
        git_id INTEGER,
        path TEXT,
        FOREIGN KEY (server_id) REFERENCES servers(id) ON DELETE SET NULL,
        FOREIGN KEY (database_id) REFERENCES databases(id) ON DELETE SET NULL,
        FOREIGN KEY (git_id) REFERENCES gits(id) ON DELETE SET NULL
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS site_groups (
        site_id INTEGER,
        group_id INTEGER,
        PRIMARY KEY (site_id, group_id),
        FOREIGN KEY (site_id) REFERENCES sites(id) ON DELETE CASCADE,
        FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        login TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        language TEXT NOT NULL DEFAULT 'en',
        theme TEXT NOT NULL DEFAULT 'theme-light'
    );`);

    console.log("✅  Структура SQLite создана.");

    const insertData = [
        `INSERT INTO groups (name, previewImg, description) VALUES
             ('Group A', 'https://images.unsplash.com/photo-1469285994282-454ceb49e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzIzMTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzA4Mjg2NTh8&ixlib=rb-4.0.3&q=80&w=1080', 'Description A'),
             ('Group B', 'https://images.unsplash.com/photo-1556448851-9359658faa54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzIzMTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzA4MjkyNDR8&ixlib=rb-4.0.3&q=80&w=1080', 'Description B'),
             ('Group C', 'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzIzMTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzA4MjkyODF8&ixlib=rb-4.0.3&q=80&w=1080', 'Description C'),
             ('Group D', 'https://images.unsplash.com/photo-1469285994282-454ceb49e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzIzMTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzA4Mjg2NTh8&ixlib=rb-4.0.3&q=80&w=1080', 'Description D'),
             ('Group E', 'https://images.unsplash.com/photo-1556448851-9359658faa54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzIzMTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzA4MjkyNDR8&ixlib=rb-4.0.3&q=80&w=1080', 'Description E');`,

        `INSERT INTO servers (name, login, password, host) VALUES
            ('Server 1', 'admin1', 'pass1', '192.168.1.1'),
            ('Server 2', 'admin2', 'pass2', '192.168.1.2'),
            ('Server 3', 'admin3', 'pass3', '192.168.1.3'),
            ('Server 4', 'admin4', 'pass4', '192.168.1.4'),
            ('Server 5', 'admin5', 'pass5', '192.168.1.5');`,

        `INSERT INTO database_types (name, code) VALUES
            ('MySQL', 'mysql'),
            ('PostgreSQL', 'postgres'),
            ('MongoDB', 'mongo'),
            ('SQLite', 'sqlite'),
            ('Redis', 'redis');
        `,

        `INSERT INTO databases (name, user, password, server_id, type_id) VALUES
            ('DB1', 'root', 'rootpass', 1, 1),
            ('DB2', 'postgres', 'pgpass', 2, 2),
            ('DB3', 'mongo', 'mongopass', 3, 3),
            ('DB4', 'sqlite', 'sqlitepass', 4, 4),
            ('DB5', 'redis', 'redispass', 5, 5);`,

        `INSERT INTO gits (url) VALUES
            ('https://repo1.git'),
            ('https://repo2.git'),
            ('https://repo3.git'),
            ('https://repo4.git'),
            ('https://repo5.git');`,


        `INSERT INTO sites (name, previewImg, url, path, server_id, database_id, git_id) VALUES
            ('Site 1', 'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzIzMTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzA4MjkyODF8&ixlib=rb-4.0.3&q=80&w=1080', 'https://site1.com', '/var/www/site1.com', 1, 1, 1),
            ('Site 2', 'https://images.unsplash.com/photo-1566274360936-69fae8dc1d95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzIzMTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzE2MTcyNTZ8&ixlib=rb-4.0.3&q=80&w=1080', 'https://site2.com', '/var/www/site2.com', 2, 2, 2),
            ('Site 3', 'https://images.unsplash.com/photo-1614171041130-8998c3b670f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzIzMTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzE2MTcyNDR8&ixlib=rb-4.0.3&q=80&w=1080', 'https://site3.com', '/var/www/site3.com', 3, 3, 3),
            ('Site 4', 'https://images.unsplash.com/photo-1566024349847-9bb4b2deb743?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzIzMTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzE2MTcyMzN8&ixlib=rb-4.0.3&q=80&w=1080', 'https://site4.com', '/var/www/site4.com', 4, 4, 4),
            ('Site 5', 'https://images.unsplash.com/photo-1659946431772-43fcf73d8d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzIzMTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzE2MTcyMjF8&ixlib=rb-4.0.3&q=80&w=1080', 'https://site5.com', '/var/www/site5.com', 5, 5, 5);`,

        `INSERT INTO site_groups (site_id, group_id) VALUES
            (1, 1), (1, 2),
            (2, 2), (2, 3),
            (3, 3), (3, 4),
            (4, 4), (4, 5),
            (5, 5), (5, 1);`
    ];
    insertData.forEach(query => db.run(query));
    console.log("✅  Данные SQLite заполнены.");

    (async () => {
        db.serialize();
        try {
            const adminLogin = process.env.ADMIN_LOGIN || "root";
            const adminPassword = process.env.ADMIN_PASSWORD || "root";

            const hashedPassword = await new Promise((resolve, reject) => {
                hash(adminPassword, 10, (err, hashedPassword) => {
                    if (err) {
                        console.error('Error hashing admin password:', err);
                        return reject(err);
                    }
                    resolve(hashedPassword);
                });
            });

            const adminExists = await new Promise((resolve, reject) => {
                db.get("SELECT id FROM users WHERE login = ?", [adminLogin], (err, row) => {
                    if (err) {
                        console.error('Error checking admin existence:', err);
                        return reject(err);
                    }
                    resolve(row);
                });
            });

            if (!adminExists) {
                await new Promise((resolve, reject) => {
                    db.run(`INSERT INTO users (login, password, language, theme) VALUES (?, ?, ?, ?)`,
                        [adminLogin, hashedPassword, 'en', 'theme-light'],
                        function(err) {
                            if (err) {
                                console.error('Error inserting admin:', err);
                                return reject(err);
                            }
                            console.log('✅  Администратор успешно добавлен');
                            resolve();
                        });
                });
            } else {
                console.log('Администратор уже есть');
            }
        } catch (err) {
            console.error('Error initializing database:', err);
        } finally {
            db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err);
                } else {
                    console.log('✅  База данных успешно закрыта.');
                }
            });
        }
    })();
});












