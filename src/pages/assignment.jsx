import { Helmet } from 'react-helmet-async';

import { AssignmentView } from 'src/sections/assignment/view';

// ----------------------------------------------------------------------

export default function AssignmentPage() {
    return (
        <>
            <Helmet>
                <title> Assignment </title>
            </Helmet>

            <AssignmentView />
        </>
    );
}
