import axios from "axios";
import React, { useState, useEffect } from "react";

export default ( { comments } ) => {

    const renderedComments = comments.map(c => {
        return <li key={c.id}>{c.content}</li>;
    });
    
    return <ul>{renderedComments}</ul>;
};