import React from "react";

function Address({ address, onDelete }) {
    const formattedDate = new Date(address.created_at).toLocaleDateString("en-UK")

    return (
        <div className="address-container">
            <p className="address-content">{address.content}</p>
            <p className="address-date">Date: {formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(address.id)}>
                Delete
            </button>
        </div>
    );
}

export default Address