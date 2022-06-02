import Router from "express";

import * as controllers from "./controllers.js";

const router = Router();

router.get('/', controllers.index);
router.get('/table', controllers.getTable);

export default router;