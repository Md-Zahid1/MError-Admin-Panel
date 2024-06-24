import { Helmet } from 'react-helmet-async';

import { AddAppointmentView } from 'src/sections/AddAppointment';

// ----------------------------------------------------------------------

export default function AddAssignmentPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <AddAppointmentView />
    </>
  );
}

