import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import AppointmentForm from 'src/components/organisem/AppointmentForm';
import FormPageTitle from 'src/components/organisem/FormPageTitle';

// ----------------------------------------------------------------------

export default function AddUsersView() {

    const param = useParams()
    console.log("param", param)

    return (
        <Container maxWidth="lg">
            <FormPageTitle
                title={param?.id ? "Update Appointment" : "Create A New Appointment"}
                links={
                    [
                        { label: "Home", value: "/home" },
                        { label: "Appointment", value: "/home/appointment" }
                    ]} />
            <AppointmentForm param={param} />
        </Container>
    );
}
