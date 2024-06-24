import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import CategoryForm from 'src/components/organisem/CategoryForm';
import FormPageTitle from 'src/components/organisem/FormPageTitle';

// ----------------------------------------------------------------------

export default function AddCategoryView() {

    const param = useParams()
    console.log("param", param)

    return (
        <Container maxWidth="lg">
            <FormPageTitle
                title={param?.id ? "Update Category" : "Create A New Category"}
                links={
                    [
                        { label: "Home", value: "/home" },
                        { label: "Category", value: "/home/category" }
                    ]} />
            <CategoryForm param={param}/>
        </Container>
    );
}
