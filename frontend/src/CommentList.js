import axios from "axios";
import React, { useState, useEffect } from "react";

export default ( {postId} ) => {
    const [comments, setComments] = useState([]);
    
    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

        setComments(res.data);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const renderedComments = comments.map(c => {
        return <li key={c.id}>{c.content}</li>;
    });
    
    return <ul>{renderedComments}</ul>;
};