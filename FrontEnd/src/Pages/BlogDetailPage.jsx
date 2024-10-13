import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';


const BlogDetails = () => {

    const [blogData, setBlogData] = useState([]); 
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  



    useEffect(() => {
        const fetchBlogs = async () => {
            const url = process.env.REACT_APP_BE_API + '/blogs/';

            try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),  
                },
            });

            if (response.ok) {
                const data = await response.json();
                setBlogData(data);
                console.log(data)
            } else {
                setError('Failed to fetch blogs'); 
            }
            } catch (err) {
            setError('An error occurred while fetching data');  
            } finally {
            setLoading(false);  
            }
        };

        fetchBlogs();  
        }, []);  

        const { id } = useParams();
        const post = blogData[id];
    
        if (!post) {
            return <div>Post not found</div>;
        }

        if (loading) {
    return <div>Loading...</div>;  
    }

    if (error) {
    return <div>{error}</div>; 
    }

    return (
        <div className="blogDetails">
            <div className="card" key={post.id}>
                <img src={post.imageURL} alt={post.title} />
                <div className="articleInfo">
                    <h2>{post.title}</h2>
                    <p className='category'>{post.categories.join(',')}</p>
                    <p>{post.content}</p>
                    <span></span>
                    <div className="author">
                        <p className='authorName'>{post.author.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetails;
