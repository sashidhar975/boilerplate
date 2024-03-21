import React, { useState, useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';
import './Documents.css';

function Documents() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      fetch('http://localhost:3000/api/documents/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            setUploadStatus({ type: 'success', message: 'File uploaded successfully!' });
            setSelectedFile(null);
            fetchUploadedFiles();
          } else {
            throw new Error('Failed to upload file');
          }
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          setUploadStatus({ type: 'danger', message: 'Error uploading file. Please try again.' });
        });
    } else {
      setUploadStatus({ type: 'warning', message: 'Please select a file to upload.' });
    }
  };

  const fetchUploadedFiles = () => {
    fetch('http://localhost:3000/api/documents')
      .then((response) => response.json())
      .then((data) => {
        setUploadedFiles(data);
      })
      .catch((error) => console.error('Error fetching uploaded files:', error));
  };

  const handleDownload = (file) => {
    window.open(`http://localhost:3000/${file.path}`, '_blank');
  };

  const handleDelete = (file) => {
    fetch(`http://localhost:3000/api/documents/${file._id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setUploadedFiles(uploadedFiles.filter((uploadedFile) => uploadedFile._id !== file._id));
      })
      .catch((error) => console.error('Error deleting file:', error));
  };

  return (
    <div>
      <h2>Documents</h2>
      <p style={{ fontSize: "14px", color: "#888" }}>You can drag files to a specific area, to upload. Alternatively, you can also upload by selecting.</p>
      <div className="container mt-5">
        <label htmlFor="customFile" className="upload-area">
          <center><FiUpload className="upload-icon" /></center>
          <p>Click or drag file to this area to upload</p>
          <input type="file" id="customFile" onChange={handleFileChange} style={{ display: 'none' }} />
        </label>
        {uploadStatus && (
          <div className={`alert alert-${uploadStatus.type} mt-3`} role="alert">
            {uploadStatus.message}
          </div>
        )}
        <div className="mt-4">
          {uploadedFiles.length > 0 ? (
            uploadedFiles.map((file, index) => (
              <div key={index} className="d-flex align-items-center justify-content-between mb-2">
                <div>{file.name}</div>
                <div>
                  <button className="btn btn-danger" onClick={() => handleDelete(file)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div>No files uploaded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Documents;
