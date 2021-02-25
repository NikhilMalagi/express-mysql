import './App.css';
import { useCallback, useEffect,useState } from 'react';
import {connect} from 'react-redux';
import * as actionTypes from './store/Actions';
import axios from 'axios';
import {endpoints,header} from './constants/Globalconstant';
import {convertUserArray} from './Utils/Utilities';
import {Button, message,Card,Pagination,Layout, Space,Spin} from 'antd';
import { DeleteTwoTone,UserOutlined,UsergroupDeleteOutlined ,UserAddOutlined,PhoneOutlined   } from "@ant-design/icons";
import UserModal from './Modal/UserModal';
const { Header, Footer, Content } = Layout;
const { Meta } = Card;
const pageSize = 5;

function App(props) {
  const {users,onUserAddtion,onUserDeletion,onAllUsersDeletion} = props
  const [pageNumber,updatePageNumber] = useState(1);
  const [loading,updateLoading] = useState(false);
  
  const [modalInfo,upateModalVisibility] = useState({
    showModal : false,
    uuid : undefined});

    /* Updating page number */
    useEffect(() => {
      if(users.length % pageSize === 1){
        updatePageNumber(Math.ceil(users.length / pageSize))
      }
    },[users])
    
    
  /* Load all the users initially */
  useEffect(() => {
    (async () => {
    try{
      updateLoading(true)
      const response = await axios.get(endpoints.GETALLUSERS_URL,header);
  
      if(response && response.data){
        onUserAddtion(response.data)
        updateLoading(false)
      }else{
        updateLoading(false)
        message.error("Failed to load users");
      }
    }catch(err){
      updateLoading(false)
      message.error("Failed to load users : " + err);
    }
  })()
  },[onUserAddtion])

   /* On Adding user */
  const handleUserAddition = useCallback(async () => {
    try{
    updateLoading(true)
    const response = await axios.get(endpoints.GET_RANDOMUSER_URL,header);

    if(response && response.data && response.data.results){
      const responseUsers = convertUserArray(response.data.results);
      await axios.post(endpoints.ADDUSER_URL,responseUsers[0],header);
      const totalUsers = (users && users.length) + 1;
      onUserAddtion(responseUsers)
      updateLoading(false)
      updatePageNumber(Math.ceil(totalUsers / pageSize))
    }else{
      updateLoading(false)
      message.error("Failed to add user");
    }
    }catch(err){
      updateLoading(false)
      message.error("Failed to add user : " + err);
    }
  },[users,onUserAddtion])

  /* On DeleteAll */
  const deleteAllUsers = useCallback(async (event) => {
    try{
    updateLoading(true)
    await axios.delete(endpoints.DELETEALLUSERS_URL,header);
    onAllUsersDeletion()
    updateLoading(false)

    }catch(err){
      updateLoading(false)
      message.error("Failed to delete all users : " + err);
    }
  },[onAllUsersDeletion])

   /* On Delete User */
  const handleDeleteUser = useCallback(async (event) => {
    event.stopPropagation();
    const uuid = event.currentTarget.dataset.uuid;
    try{
      updateLoading(true)
      await axios.delete(endpoints.DELETE_URL+uuid,header);
      onUserDeletion(uuid)
      updateLoading(false)

    }catch(err){
      updateLoading(false)
      message.error("Failed to delete user : " + err);
    }
  },[onUserDeletion])

   /* Open User Modal */
  const openModal = useCallback((event) => {
    const uuid = event.currentTarget.dataset.uuid;
    upateModalVisibility((prevState) => {
      return {
      ...prevState,
      showModal : true,
      uuid
    }})
  },[])

   /* Close User Modal */
  const closeModal = useCallback((event) => {
    upateModalVisibility((prevState) => {
      return {
      ...prevState,
      showModal : false,
      uuid : undefined
    }})
  },[])

  /*Rendering User Cards */
  const renderUserCards = () => {
    if(users && users.length){
    const visibleUserCount = users.length % pageSize;
    const startIndex = visibleUserCount === 0 ? users.length - pageSize :  users.length - visibleUserCount;
    const currentVisibleUserCards = pageNumber < Math.ceil(users.length / pageSize) ? users.slice((pageNumber * pageSize) - pageSize,pageNumber * pageSize) : users.slice(startIndex,users.length);
    
    const userCards =  currentVisibleUserCards.map((user) => {
      return (
        <div key={user.login_uuid} data-uuid={user.login_uuid} className="app" onClick={openModal}>
        <Card
          hoverable
          style={{ width: 270 }}
          cover={<img alt="example" src={user.picture_large} />}     
          extra={<Button shape="circle" data-uuid={user.login_uuid} onClick={handleDeleteUser} icon={<DeleteTwoTone  />} />}
          // loading={true}
        >
          <Meta title={
          <>
          <div>
          <Space size="middle" align="center">
          <UserOutlined/>{`${user.name_title}. ${user.name_first} ${user.name_last}`}
        </Space>
          </div>
          <div>
          <Space size="middle"align="center">
          <PhoneOutlined />{`${user.phone}`}
        </Space>
          </div>
          </>} />
        </Card>
        </div>
      )
    })
    return (<Space className="user-layout" size={[1, 5]} wrap align="center">{userCards}</Space>)  
   }
  }


  /* Pagination : handling pagenumber */
  const handlePagination = useCallback((page,pageSize) => {
    updatePageNumber(page)
  },[])

  return (
    <Spin
      spinning={loading}
        size="large"
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "black",
          top: "20%",
        }}
    >
    <Layout>
      <Header className="header-content">
      <Space  align="center">
        <UserOutlined/>Random User Generator
        </Space>
        </Header>
      <Content className="site-layout">
      <div className="user-control"> 
      <Space  align="center">
        <Button  shape="round" icon={<UserAddOutlined  />} size={'large'} onClick={handleUserAddition}>
        Add User
          </Button>
        <Button  shape="round" danger icon={<UsergroupDeleteOutlined   />} size={'large'} onClick={deleteAllUsers}>
        Clear All
          </Button>
      </Space>
      </div>{users && users.length > 0 && renderUserCards()}</Content>
      {users && users.length > 5 && <Footer><Pagination className="pagination-layout" defaultPageSize={5} defaultCurrent={1} onChange={handlePagination}current={pageNumber} total={users.length} /></Footer>}
       {modalInfo && modalInfo.showModal && <UserModal user={users ? users.find((user) => user.login_uuid === modalInfo.uuid) : undefined} hideModal={closeModal}/>}
    </Layout>
    </Spin>
  );
}

const mapStateToProps = state => {
    return {
      users : state.users
    }
} 
const mapDispatchToProps = dispatch => {
  return {
    onUserAddtion : (userDetails) => dispatch({type : actionTypes.ADD_USERS,user : userDetails }),
    onUserDeletion : (uuid) => dispatch({type : actionTypes.DELETE_USER,uuid }),
    onAllUsersDeletion : () => dispatch({type : actionTypes.DELETE_ALLUSERS })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
