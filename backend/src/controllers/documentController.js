const Document = require('../models/Document');

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const { originalname, path } = req.file;
    const document = new Document({ name: originalname, path });
    await document.save();
    
    res.json({ message: 'Document uploaded successfully' });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Error uploading document' });
  }
};

exports.getUploadedDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    console.error('Error fetching uploaded documents:', error);
    res.status(500).json({ error: 'Error fetching uploaded documents' });
  }
};
