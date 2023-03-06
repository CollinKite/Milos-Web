import React, { useState, Fragment } from 'react';
import { Table, Button, Card, CardBody, FormGroup, Label, Input, Container} from 'reactstrap';
import LoggedInNavbar from 'components/Navbars/LoggedInNavbar';
import { toast, ToastContainer } from 'react-toastify';
import Footer from './Footer/Footer';


const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [refreshedAt, setRefreshedAt] = useState(new Date());

  function getBlogs() {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://api.getmilos.app/blogs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setBlogs(
            data.blogs.map((blog) => ({
              ...blog,
              showEdit: false,
              originalName: blog.name,
              originalBlog: blog.blog,
            }))
          );
          setRefreshedAt(new Date());
        })
        .catch((error) => console.log(error));
    }
  }

  const props = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  }

  useState(() => {
    getBlogs();
  }, []);

  const toggleBlog = (index) => {
    // Copy the blogs array
    const updatedBlogs = [...blogs];
    //make sure the user is not editing the blog
    updatedBlogs[index].showEdit = false;
    // Toggle the "show" property of the clicked blog
    updatedBlogs[index].show = !updatedBlogs[index].show;
    // Update the state with the updated array
    setBlogs(updatedBlogs);
  };

  const toggleEdit = (index) => {
    // Copy the blogs array
    const updatedBlogs = [...blogs];
    //make sure the user is not viewing the blog
    updatedBlogs[index].show = false;
    // Toggle the "showEdit" property of the clicked blog
    updatedBlogs[index].showEdit = !updatedBlogs[index].showEdit;
    // Update the state with the updated array
    setBlogs(updatedBlogs);
  };

  const handleNameChange = (index, event) => {
    // Copy the blogs array
    const updatedBlogs = [...blogs];
    // Update the "name" property of the clicked blog with the new value
    updatedBlogs[index].name = event.target.value;
    // Update the state with the updated array
    setBlogs(updatedBlogs);
  };

  const handleBlogChange = (index, event) => {
    // Copy the blogs array
    const updatedBlogs = [...blogs];
    // Update the "blog" property of the clicked blog with the new value
    updatedBlogs[index].blog = event.target.value;
    // Update the state with the updated array
    setBlogs(updatedBlogs);
  };

  const handleSaveChanges = (index) => {
    
    const token = localStorage.getItem('token');
    const blog = blogs[index];
    fetch(`https://api.getmilos.app/blogs`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        blog_name: blog.originalName,
        blog_new_name: blog.name,
        blog_content: blog.blog,
      }),
    })
    //if the response is 200, then the blog was updated successfully
    .then((response) => {
        if (response.status === 200) {
            toast.success("Blog updated successfully", props);
        }
        else {
            toast.error("Blog update failed", props);
        }
    })
    .catch((error) => {
        toast.error("Blog update failed", props);
    });
    // Copy the blogs array
    const updatedBlogs = [...blogs];
    // Reset the "showEdit" property of the clicked blog
    updatedBlogs[index].showEdit = false;
    // Update the state with the updated array
    setBlogs(updatedBlogs);
  };

  const handleDeleteBlog = (blogName, index) => {
    const token = localStorage.getItem('token');
    fetch(`https://api.getmilos.app/blogs`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        blog_name: blogName,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Blog deleted successfully', props);
          const updatedBlogs = blogs.filter((blog, i) => i !== index);
          setBlogs(updatedBlogs);
        } else {
          toast.error('Blog deletion failed', props);
        }
      })
      .catch((error) => {
        toast.error('Blog deletion failed', props);
      });
  };

  return (
    <>
      <LoggedInNavbar />
      <div className="page-header header-filter">
        <div className="section">
          <Container>
            <ToastContainer/>
            <Card className="card-user">
                <CardBody>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>
                            <br />
                            <br />
                            Name
                            </th>
                            <th className="text-right">
                            Last Refeshed At{' '}
                            {refreshedAt.toLocaleTimeString() + ' - ' +
                                refreshedAt.toLocaleDateString() +
                                '‎ ‎ ‎ '}
                            <Button className="btn-icon" color="info" size="sm" onClick={getBlogs}>
                                <i className="tim-icons icon-refresh-02"></i>
                            </Button>
                            <br />
                            <br />
                            Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {blogs.map((blog, index) => (
                            <Fragment key={blog.id}>
                                <tr>
                                    <td>{blog.name}</td>
                                    <td className="text-right">
                                        <Button
                                        className="btn-icon"
                                        color="info"
                                        size="sm"
                                        onClick={() => toggleBlog(index)}
                                        >
                                        <i className="fa fa-eye"></i>
                                        </Button>{' '}
                                        <Button
                                        className="btn-icon"
                                        color="success"
                                        size="sm"
                                        onClick={() => toggleEdit(index)}
                                        >
                                        <i className="fa fa-edit"></i>
                                        </Button>{' '}
                                        <Button className="btn-icon" color="danger" size="sm"  onClick={() => handleDeleteBlog(blog.name, index)}>
                                        <i className="fa fa-times" />
                                        </Button>
                                    </td>
                                </tr>
                                        {blog.show && (
                                            <tr>
                                                <td colSpan="2">
                                                    <p>{blog.blog}</p>
                                                </td>
                                            </tr>
                                        )}
                                        {blog.showEdit && (
                                            <div>
                                                <form>
                                                    <FormGroup>
                                                    <Label for={`name-${index}`}>Name</Label>
                                                        <Input
                                                        type="text"
                                                        id={`name-${index}`}
                                                        value={blog.name}
                                                        onChange={(event) =>
                                                            handleNameChange(index, event)
                                                        }
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for={`blog-${index}`}>Blog</Label>
                                                        <Input
                                                        type="textarea"
                                                        id={`blog-${index}`}
                                                        value={blog.blog}
                                                        onChange={(event) =>
                                                            handleBlogChange(index, event)
                                                        }
                                                        />
                                                    </FormGroup>
                                                    <Button
                                                        className="btn-round btn btn-info btn-lg"
                                                        color="success"
                                                        size="large"
                                                        onClick={() => handleSaveChanges(index)}
                                                    >
                                                        Save Changes
                                                    </Button>
                                                </form>
                                            </div>
                                        )}
                            </Fragment>
                        ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
          </Container>
        </div>
      </div>
    <Footer/> 
    </>
  );
};

export default BlogPage;
