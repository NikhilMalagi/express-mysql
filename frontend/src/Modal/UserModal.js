import {React} from 'react';
import { Modal,Descriptions } from 'antd';
import '../App.css';


const UserModal = (props) => {
    const {user,hideModal} = props

    const date = user.dob_date ?  new Date(user.dob_date) : undefined
    var datestring = date ? date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " : ''     
    return(
    <Modal className="user-modal" width ={1000}title="User info" visible={true} onCancel={hideModal} 
    footer={null}
    >
        <Descriptions layout="horizontal" bordered>
        <Descriptions.Item label="Gender">{`${user.gender}`}</Descriptions.Item>
        <Descriptions.Item label="Firstname">{`${user.name_first}`}</Descriptions.Item>
        <Descriptions.Item label="Firstname">{`${user.name_first}`}</Descriptions.Item>
        <Descriptions.Item label="Email">{`${user.email}`}</Descriptions.Item>
        <Descriptions.Item label="Telephone">{`${user.phone}`}</Descriptions.Item>
        <Descriptions.Item label="Cell">{`${user.cell}`}</Descriptions.Item>
        <Descriptions.Item label="Dob">
        {datestring}
        </Descriptions.Item>
        <Descriptions.Item label="Age">
        {`${user.dob_age}`}
        </Descriptions.Item>
        <Descriptions.Item label="Location">{`${user.location_street_number},${user.location_street_name},${user.location_city},${user.location_country},${user.location_postcode}`}</Descriptions.Item>
       
      </Descriptions>,
      </Modal>
    )
}

export default UserModal;