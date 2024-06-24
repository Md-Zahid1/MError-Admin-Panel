import { Helmet } from 'react-helmet-async';

import { AddBlogView } from 'src/sections/AddBlog';

// ----------------------------------------------------------------------

export default function AddBlogPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <AddBlogView />
    </>
  );
}

