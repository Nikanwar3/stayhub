import { useState, useEffect } from "react";
import "./Flash.css";

const Flash = ({ message, type = "success", onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => onClose && onClose(), 300);
        }, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!message) return null;

    return (
        <div className={`flash-message flash-${type} ${visible ? "flash-enter" : "flash-exit"}`}>
            <div className="flash-content">
                <i className={`fa-solid ${type === "success" ? "fa-circle-check" : "fa-circle-exclamation"}`}></i>
                <span>{message}</span>
            </div>
            <button className="flash-close" onClick={() => { setVisible(false); onClose && onClose(); }}>
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>
    );
};

export default Flash;
