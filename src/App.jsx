import 'antd/dist/antd.css';
import './App.css';
// import Menu from './components/SideBar';
import Markdown from './components/Markdown';
// import Layout from './components/Layout';
// import { TwitterOutlined } from '@ant-design/icons';
// import { Cascader, Calendar } from 'antd';
// import { Steps } from 'antd';

const App = () => {
  
  return (
    <div className="sidebar">
      {/* <TwitterOutlined style={{ fontSize: '50px', color: '#08c' }} />
      <Cascader />
      <Steps />
      <Calendar />
      <Menu /> 
      <Layout /> */}
      <Markdown /> 
    </div>
  );
};

export default App;
