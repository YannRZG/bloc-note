import { useState, useEffect } from 'react';
import Markdown from './Markdown'; // Importe le composant Markdown
import ManageFiles from './ManageFiles';
import { Button, Modal } from 'antd'; // Importe le composant Button et Modal d'Ant Design
import {
  FileOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedContent = localStorage.getItem('blocNote');
    if (savedContent) {
      setNotes(JSON.parse(savedContent));
    }
  }, []); // Seulement exécuté lors du premier rendu

  // Fonction pour sauvegarder les notes dans le localStorage
  const saveNotesToLocalStorage = () => {
    localStorage.setItem('blocNote', JSON.stringify(notes));
    console.log('Content saved to localStorage');
  };

  // Fonction pour ajouter une nouvelle note
  const addNewNote = () => {
    const newNote = {
      label: `Note ${notes.length + 1}`, // Créer un label unique pour la nouvelle note
      content: '' // Contenu initial de la nouvelle note
    };
    setNotes([...notes, newNote]); // Ajouter la nouvelle note à la liste des notes
    saveNotesToLocalStorage(); // Mettre à jour le localStorage
  };

  // Fonction pour supprimer une note
  const deleteNote = (index) => {
    Modal.confirm({
      title: 'Confirmer la suppression',
      content: 'Êtes-vous sûr de vouloir supprimer cette note ?',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Non',
      onOk() {
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
        saveNotesToLocalStorage(); // Mettre à jour le localStorage
      },
    });
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
            <Button onClick={addNewNote}>Ajouter une note</Button>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {notes.map((note, index) => (
            <Menu.Item key={index} icon={<FileOutlined />}>
              {note.label}
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteNote(index)}
              />
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content>
          <div className="site-layout-content">           
            <h1>Hello</h1>
            {/* Passer le contenu de la première note comme prop */}
            <Markdown markdownValue={notes.length > 0 ? notes[0].content : ''} /> 
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
