import { Helmet } from 'react-helmet-async';

import { AppointmentView } from 'src/sections/appointment/view';

// ----------------------------------------------------------------------

export default function ConsultantPage() {
  return (
    <>
      <Helmet>
        <title> Appointment </title>
      </Helmet>

      <AppointmentView />
    </>
  );
}
