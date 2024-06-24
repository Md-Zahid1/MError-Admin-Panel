import { Helmet } from 'react-helmet-async';

import { AddConsultantView } from 'src/sections/AddConsultant';

// ----------------------------------------------------------------------

export default function AddConsultantPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <AddConsultantView /> 
    </>
  );
}

