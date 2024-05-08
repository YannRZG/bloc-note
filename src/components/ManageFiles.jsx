import { useState } from 'react';
import PropTypes from 'prop-types'; // Importe PropTypes depuis react
import { Button, Menu } from 'antd';

const ManageFiles = ({ files, setFiles }) => {
    const [markdownValue, setMarkdownValue] = useState('');

    const handleFileSelect = (selectedFile) => {
        setMarkdownValue(selectedFile.content);
    };
    
    const handleFileDelete = (deletedFile) => {
        const updatedFiles = files.filter(file => file !== deletedFile);
        setFiles(updatedFiles);
        localStorage.setItem('files', JSON.stringify(updatedFiles));
    };

    return (
        <Menu theme="dark" mode="inline">
            {files.map((file, index) => (
                <Menu.Item key={index} onClick={() => handleFileSelect(file)}>
                    {file.name}
                    <Button type="link" onClick={() => handleFileDelete(file)}>Delete</Button>
                </Menu.Item>
            ))}
        </Menu>
    );
};

// Déclare les propTypes pour valider les types des props
ManageFiles.propTypes = {
    files: PropTypes.array.isRequired,
    setFiles: PropTypes.func.isRequired,
};

export default ManageFiles;
