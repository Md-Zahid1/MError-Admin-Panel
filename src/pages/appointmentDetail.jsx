import { Helmet } from 'react-helmet-async';

import { AppointmentDetailView } from 'src/sections/appointmentDetail/view';

// ----------------------------------------------------------------------

export default function AppointmentDetailPage() {
    return (
        <>
            <Helmet>
                <title> Blog | Minimal UI </title>
            </Helmet>

            <AppointmentDetailView />
        </>
    );
}
