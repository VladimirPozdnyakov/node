import express from "express";
import favicon from "express-favicon";
import { dirname } from "path";
import { fileURLToPath } from "url";
import register from "../controllers/register.js";
import entries from "../controllers/entries.js";
import login from "../controllers/login.js";
import tracks from "../controllers/tracks.js";
import multer from "multer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/uploads/tracks/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.use(favicon(__dirname + "/favicon.ico"));

router.get("/", entries.list);

router.post("/register", register.submit);

router.post("/login", login.submit);

router.get("/logout", login.logout);

router.post("/new", upload.any(), tracks.addTrack);

router.post("/tracks/:id/edit", upload.any(), tracks.updateTrack);
router.get("/tracks/:id/delete", tracks.deleteTrack);
router.post("/tracks/:id/buy", tracks.buyTrack);

export default router;
