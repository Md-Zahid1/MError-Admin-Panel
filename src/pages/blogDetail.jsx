import { Helmet } from 'react-helmet-async';

import { BlogDetailView } from 'src/sections/blogDetail/view';

// ----------------------------------------------------------------------

export default function BlogDetailPage() {
    return (
        <>
            <Helmet>
                <title> Blog | Minimal UI </title>
            </Helmet>

            <BlogDetailView />
        </>
    );
}
