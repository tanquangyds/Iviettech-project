import React from 'react';

import "../comment/Comment.css"
import Formwrite from './Formwrite/Formwrite';
import Listcomment from './Listcomment/Listcomment';

function Comment(props) {
    return (
        <div className="row comment__container">
            <Formwrite/>
            <Listcomment/>
        </div>
    );
}

export default Comment;