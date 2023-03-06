import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';
import {Button, Container, Card} from "reactstrap";
import Footer from 'components/Footer/Footer';
import LoggedInNavbar from 'components/Navbars/LoggedInNavbar';

export default function Milos() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      setSelectedFile(null);
    } else {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile === null) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    const props = {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    };

    toast.promise(
      fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error(response.json);
        }
      }),
      {
        pending: 'Uploading...',
        success: 'Upload successful 🎉',
        error: 'Upload failed 😞 Please make sure your file is a valid .mp3 or .mp4 file',
      },
      props
    ).finally(() => {
      setSelectedFile(null);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'audio/mp3, video/mp4',
    maxFiles: 1,
    onDrop: handleFileSelect,
  });

  return (
    <>
      <LoggedInNavbar />
      <div className="page-header header-filter">
        <div className="content-center">
        <ToastContainer />
          <Container>
            <Card className="card-user">
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              {selectedFile === null ? (
                <p>Drag and drop a file here, or click to select a file <br/> Supported File Types: .MP3 or .MP4</p>
              ) : (
                <p>Selected file: {selectedFile.name}</p>
              )}
            </div>
            <Button onClick={handleUpload} disabled={selectedFile === null} color="success">
              Upload
            </Button>
            </Card>
          </Container>
        </div>
      </div>
      <Footer/>
    </>
  );
}
