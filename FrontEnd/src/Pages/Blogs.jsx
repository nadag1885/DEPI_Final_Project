import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollButton from '../Components/ScrollButton';

const Blogs = () => {
  const [blogData, setBlogData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(true);  

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
          console.log('Failed to fetch blogs'); 
        }
      } catch (err) {
        console.log('An error occurred while fetching data');  
      } finally {
        setLoading(false);  
      }
    };
    if(blogData.length === 0){
      fetchBlogs();  
    }
  }, []);  

  const filteredPosts = blogData.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;  
  }


  return (
    <div>
      <div className="allPosts">
        <h3>All Posts</h3>
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="cards">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <Link to={`/blog/${index}`} key={index} className="card-link">
                <div className="card">
                  <img src={post.imageURL} alt={post.title} />
                  <div className="articleInfo">
                    <h2>{post.title}</h2>
                    <p className='category'>{post.categories.join(',')}</p>
                    <p>{post.content}</p>
                    <span></span>
                    <div className="author">
                      <p className="authorName">{post.author.name}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No posts found.</p> 
          )}
        </div>
        <ScrollButton />
      </div>
    </div>
  );
};

export default Blogs;
