import { Helmet } from 'react-helmet-async';

import { AssignmentDetailView } from 'src/sections/assignmentDetail/view';

// ----------------------------------------------------------------------

export default function AssignmentDetailPage() {
    return (
        <>
            <Helmet>
                <title> Blog | Minimal UI </title>
            </Helmet>

            <AssignmentDetailView />
        </>
    );
}
