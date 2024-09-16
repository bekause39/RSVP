import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import { Guest} from '../model/index.js'
import { Router } from 'express'

// code to fix error: __dirname is not defined
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const route = express.Router();

// Create a client instance
const guest = new Guest();


route.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../view/index.html'));
})

route.post('/guest', bodyParser.json(), (req, res) => {
    guest.createGuest(req, res);
})
route.get('/getTicket/:id', (req, res) => {
    guest.fetchGuest(req, res);
});
route.get('/guestList', (req, res) => {
    guest.fetchGuests(req, res);
});
route.put('/confirm/:id', (req, res) => {
    guest.confirmAttendance(req, res);
});
route.put('/guest', (req, res) => {
    guest.updateGuest(req, res);
});

export default route;