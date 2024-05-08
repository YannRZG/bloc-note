import { useState, useEffect } from 'react';
import { Input, Button, Menu, Layout, Modal, Form } from 'antd';
import { DeleteOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import NoteDisplay from './NoteDisplay';
import './Markdown.css';

const { TextArea } = Input;
const { Sider, Content } = Layout;

const Markdown = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [markdownValue, setMarkdownValue] = useState('');
  const [files, setFiles] = useState([]);
  const [form] = Form.useForm(); // Utilisation du hook useForm pour gérer le formulaire
  const [editingIndex, setEditingIndex] = useState(null); // Indice de la note en cours d'édition

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('files')) || [];
    setFiles(savedFiles);
  }, []);

  const handleMarkdownChange = (e) => {
    setMarkdownValue(e.target.value);
  };

  const addNewNote = () => {
    form.resetFields(); // Réinitialise les champs du formulaire
    setMarkdownValue(''); // Réinitialise la valeur Markdown
    setEditingIndex(null); // Réinitialise l'index d'édition
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      if (editingIndex !== null) {
        // Si une note est en cours d'édition, mettez à jour cette note
        const updatedFiles = [...files];
        updatedFiles[editingIndex] = { name: values.title, content: values.content };
        setFiles(updatedFiles);
        setEditingIndex(null); // Réinitialisez l'état d'édition
      } else {
        // Sinon, ajoutez une nouvelle note
        const newFile = { name: values.title, content: values.content };
        const updatedFiles = [...files, newFile];
        setFiles(updatedFiles);
      }
      localStorage.setItem('files', JSON.stringify(files));
      form.resetFields(); // Réinitialisation des champs du formulaire
    });
  };

  const handleFileSelect = (selectedFile, index) => {
    setMarkdownValue(selectedFile.content);
    setEditingIndex(index); // Définissez l'indice de la note en cours d'édition
    form.setFieldsValue({ title: selectedFile.name, content: selectedFile.content }); // Pré-remplissez le formulaire avec les valeurs de la note sélectionnée
  };

  const handleFileDelete = (deletedFile) => {
    Modal.confirm({
      title: 'Confirmer la suppression',
      content: 'Êtes-vous sûr de vouloir supprimer cette note ?',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Non',
      onOk() {
        const updatedFiles = files.filter(file => file !== deletedFile);
        setFiles(updatedFiles);
        localStorage.setItem('files', JSON.stringify(updatedFiles));
        if (editingIndex !== null && editingIndex === files.indexOf(deletedFile)) {
          // Si la note en cours d'édition est supprimée, réinitialisez l'état d'édition
          setEditingIndex(null);
          form.resetFields(); // Réinitialisez les champs du formulaire
        }
      },
    });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(files)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "notes.txt";
    document.body.appendChild(element); // Ajoute le lien au corps du document
    element.click(); // Déclenche le téléchargement
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={250} className="site-layout-background">
          <div className="new-note-button">
            <Button type="primary" onClick={addNewNote}>
            <PlusOutlined />
            </Button>
          </div>
          <Menu theme="dark" mode="inline">
            {files.map((file, index) => (
              <Menu.Item key={index} onClick={() => handleFileSelect(file, index)}>
                <div className="file-container">
                  <div>
                  <span className="file-name">{file.name}</span>
                  </div>
                  <Button className='delete-button' type="link" onClick={() => handleFileDelete(file)}><DeleteOutlined /></Button>
                  <Button type="primary" onClick={handleDownload}><DownloadOutlined /></Button>
                </div>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Content>

            <div className="markdown-container">
              <Form form={form} layout="vertical" >
                <Form.Item label="Titre" name="title" rules={[{ required: true, message: 'Veuillez saisir un titre' }]} >
                  <Input />
                </Form.Item>
                <Form.Item label="Contenu" name="content" rules={[{ required: true, message: 'Veuillez saisir du contenu' }]}>
                  <TextArea rows={8} onChange={handleMarkdownChange} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={handleSave}>Enregistrer</Button>
                </Form.Item>
              </Form>
            </div>
            <div className="content">
              <NoteDisplay title={form.getFieldValue('title') || ''} markdownValue={markdownValue} />
              </div> 
                         
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Markdown;
