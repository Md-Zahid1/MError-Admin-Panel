import { Helmet } from 'react-helmet-async';

import { AddUsersView } from 'src/sections/AddUsers';

// ----------------------------------------------------------------------

export default function AddUsersPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <AddUsersView /> 
    </>
  );
}

