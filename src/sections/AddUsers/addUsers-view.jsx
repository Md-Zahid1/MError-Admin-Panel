import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import FormPageTitle from 'src/components/organisem/FormPageTitle';
import UserForm from 'src/components/organisem/UserForm';

// ----------------------------------------------------------------------

export default function AddUsersView() {

    const param = useParams()
    console.log("param", param)

    return (
        <Container maxWidth="lg">
            <FormPageTitle
                title={param?.id ? "Update User" : "Create A New User"}
                links={
                    [
                        { label: "Home", value: "/home" },
                        { label: "User", value: "/home/user" }
                    ]} />
            <UserForm param={param} />
        </Container>
    );
}
