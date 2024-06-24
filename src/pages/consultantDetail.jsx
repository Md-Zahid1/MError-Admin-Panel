import { Helmet } from 'react-helmet-async';

import { ConsultantDetailView } from 'src/sections/consultantDetail/view';

// ----------------------------------------------------------------------

export default function ConsultantDetailPage() {
    return (
        <>
            <Helmet>
                <title> Blog | Minimal UI </title>
            </Helmet>

            <ConsultantDetailView />
        </>
    );
}
