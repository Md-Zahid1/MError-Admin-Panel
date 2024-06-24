import { Container } from '@mui/material';
import FormPageTitle from 'src/components/organisem/FormPageTitle';
import BlogForm from 'src/components/organisem/BlogForm';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function AddBlogView() {
    const param = useParams()

    return (
        <Container maxWidth="lg">
            <FormPageTitle
                title={param.id ? "Update Blog" : "Create A New Blog"}
                links={
                    [
                        { label: "Home", value: "/home" },
                        { label: "Blog", value: "/home/blog" }
                    ]
                } />
            <BlogForm param={param} />
        </Container>
    );
}