const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.userPath = '/admin/user'
        this.adminTaskPath = '/admin/task'
        this.authPath = '/api'
        this.programmerPath = '/programmer'
        this.taskPath = '/task'
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.authPath , require('../routes/authRoutes'));
        this.app.use(this.userPath , require('../routes/adminUserRoutes'));
        this.app.use(this.adminTaskPath , require('../routes/adminTaskRoutes'));
        this.app.use(this.taskPath , require('../routes/taskRoutes'));
        this.app.use(this.programmerPath , require('../routes/programmerTaskRoutes'));

        /*this.app.use(this.prefixPath , require('../routes/userRoutes'));
        this.app.use(this.prefixPath , require('../routes/userTaskRoutes'));
        this.app.use(this.prefixPath , require('../routes/accessRoutes'));*/

    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;