import React, { useState } from 'react';
import './AddNewArticle.css';
import { useNavigate } from 'react-router-dom';

const AddNewArticle = ({ addNewArticle }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        imageURL: '',
        categories:''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    console.log(formData)


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = process.env.REACT_APP_BE_API + '/blogs/';  
        formData.categories = formData.categories.split(',')
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(formData),  
            }).then((response) => {
                response.json().then((data)=>console.log(data))
                if (response.ok) {
                    navigate('/');
                } else {
                    console.error('Failed to add article:', response.statusText);
                }
            })}
    return (
        <div className="wrapper">
            <div className="flip-card__inner">
                <div className="flip-card__front">
                    <h2 className="title">Add New Article</h2>
                    <form className="flip-card__form" onSubmit={handleSubmit}>
                        <input
                            className="flip-card__input"
                            type="text"
                            name="title"
                            value={formData.title}
                            placeholder="Title"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="flip-card__input"
                            type="text"
                            name="categories"
                            value={formData.categories}
                            placeholder="categories"
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            className="flip-card__input"
                            name="content"  
                            value={formData.content}
                            placeholder="Content"
                            rows="4"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="flip-card__input"
                            type="text"
                            name="imageURL"  
                            value={formData.imageURL}
                            placeholder="Image URL"
                            onChange={handleChange}
                            required
                        />
                        <button className="flip-card__btn" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewArticle;
