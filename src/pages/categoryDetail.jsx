import { Helmet } from 'react-helmet-async';

import { CategoryDetailView } from 'src/sections/categoryDetail/view';

// ----------------------------------------------------------------------

export default function CategoryDetailPage() {
    return (
        <>
            <Helmet>
                <title> Blog | Minimal UI </title>
            </Helmet>

            <CategoryDetailView />
        </>
    );
}
