import React, { useState } from 'react';
import MessageList from '../../components/message/message-list';
import MessageDetail from '../../components/message/message-detail';
import './style.scss'
import Layout from '../../components/layout';

import './style.scss';

const Messages = () => {        
    const [selectedMessageItem, setSelectedMessageItem] = useState({})

    return (
        <div className="messages-container">
            <div className="messages-space">
                <MessageList setClickedMessageItem={setSelectedMessageItem} />
                <MessageDetail clickedMessageItem={selectedMessageItem}  />
            </div>
        </div>
    )
}

export default Layout(Messages);