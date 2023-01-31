import React from 'react';
import { useDropzone } from 'react-dropzone';

export default function Milos(){
  return (
    <div>
      <input type="file"
       id="video" name="video"
       accept="image/png, image/jpeg"></input>
    </div>
  );
}
