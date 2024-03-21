const express = require('express');
const router = express.Router();
const uploads = require('../middleware/uploads');
const documentController = require('../controllers/documentController');

router.post('/upload', uploads.single('file'), documentController.uploadDocument);
router.get('/', documentController.getUploadedDocuments);

module.exports = router;
