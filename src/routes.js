import Router from "express";

import * as controllers from "./controllers.js";

const router = Router();

router.get('/', controllers.index);
router.get('/table', controllers.getTable);
router.put('/restore', controllers.restoreTable);
router.delete('/delete', controllers.deleteEntry);
router.patch('/update', controllers.updateEntry);
router.put('/insert', controllers.insertEntry);

export default router;