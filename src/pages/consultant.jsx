import { Helmet } from 'react-helmet-async';

import { ConsultantView } from 'src/sections/consultant/view';

// ----------------------------------------------------------------------

export default function ConsultantPage() {
  return (
    <>
      <Helmet>
        <title> Consultant </title>
      </Helmet>

      <ConsultantView />
    </>
  );
}
