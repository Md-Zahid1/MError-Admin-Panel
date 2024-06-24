import { Container } from '@mui/material';
import FormPageTitle from 'src/components/organisem/FormPageTitle';
import AssignmentForm from 'src/components/organisem/AssignmentForm';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function AddAssignmentView() {

    const param = useParams()
    console.log("param", param)

    return (
        <Container maxWidth="lg">
            <FormPageTitle
                title={param.id ? "Update Assignment" : "Create A New Assignment"}
                links={
                    [
                        { label: "Home", value: "/home" },
                        { label: "Assignment", value: "/home/assignment" }
                    ]
                } />
            <AssignmentForm param={param} />
        </Container>
    );
}
