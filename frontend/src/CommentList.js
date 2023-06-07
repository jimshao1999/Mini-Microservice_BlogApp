import axios from "axios";
import React, { useState, useEffect } from "react";

export default ( { comments } ) => {
    let content;

    const renderedComments = comments.map(c => {
        if(c.status === 'approved') {
            content = c.content;
        }
        if(c.status === 'rejected') {
            content = 'Contains banned word, rejected.';
        }
        if(c.status === 'pending') {
            content = 'this comment is awaiting moderation';
        }

        return <li key={c.id}>{content}</li>;
    });
    
    return <ul>{renderedComments}</ul>;
};