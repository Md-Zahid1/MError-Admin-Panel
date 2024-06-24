import { Helmet } from 'react-helmet-async';

import { AddCategoryView } from 'src/sections/AddCategory';

// ----------------------------------------------------------------------

export default function AddCategoryPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <AddCategoryView /> 
    </>
  );
}

