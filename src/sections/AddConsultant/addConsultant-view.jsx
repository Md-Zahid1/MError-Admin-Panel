import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import FormPageTitle from 'src/components/organisem/FormPageTitle';
import ConsultantForm from 'src/components/organisem/ConsultantForm';

// ----------------------------------------------------------------------

export default function AddConsultantView() {

    const param = useParams()
    console.log("param", param)

    return (
        <Container maxWidth="lg">
            <FormPageTitle
                title={param?.id ? "Update Consultant" : "Create A New Consultant"}
                links={
                    [
                        { label: "Home", value: "/home" },
                        { label: "Consultant", value: "/home/consultant" }
                    ]} />
            <ConsultantForm param={param} />
        </Container>
    );
}
