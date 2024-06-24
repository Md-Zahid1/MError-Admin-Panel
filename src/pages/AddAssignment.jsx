import { Helmet } from 'react-helmet-async';

import { AddAssignmentView } from 'src/sections/AddAssignment';

// ----------------------------------------------------------------------

export default function AddAssignmentPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <AddAssignmentView />
    </>
  );
}

