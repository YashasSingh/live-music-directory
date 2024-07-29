// frontend/src/components/UploadFile.js

import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const UploadContainer = styled.div`
    margin: 1rem 0;
`;

const UploadFile = ({ type, onUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append(type, file);

        try {
            const res = await axios.post(`/api/profile/upload-${type}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            onUpload(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <UploadContainer>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload {type}</button>
        </UploadContainer>
    );
};

export default UploadFile;
