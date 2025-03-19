const { spawn } = require('child_process');

/**
 * Создание дампа базы данных и скачивание его на компьютер пользователя
 * @param req
 * @param res
 * @return {*}
 */
const createDump = (req, res) => {
    const { type, host, user, password, database } = req;

    if (!type || !database || !user) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    let dumpProcess;
    let fileName = `${database}-${Date.now()}.sql`;

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    if (type === 'mysql') {
        dumpProcess = spawn('mysqldump', [
            '-h', host || 'localhost',
            '-u', user,
            ...(password ? [`-p${password}`] : []),
            database
        ]);
    } else if (type === 'postgresql') {
        dumpProcess = spawn('pg_dump', [
            '-h', host || 'localhost',
            '-U', user,
            '-d', database
        ], { env: { ...process.env, PGPASSWORD: password || '' } });
    } else {
        return res.status(400).json({ error: "Неподдерживаемый тип базы данных" });
    }

    dumpProcess.stdout.pipe(res);

    dumpProcess.stderr.on('data', (data) => {
        console.error(`Ошибка создания дампа: ${data}`);
    });

    dumpProcess.on('error', (err) => {
        console.error("Не удалось запустить процесс дампа:", err);
        res.status(500).json({ error: "Ошибка при создании дампа" });
    });

    dumpProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Завершение процесса дампа с использованием кода ${code}`);
        }
    });
};

module.exports = { createDump };
