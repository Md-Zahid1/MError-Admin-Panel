import { Helmet } from 'react-helmet-async';

import { UserDetailView } from 'src/sections/userDetail/view';

// ----------------------------------------------------------------------

export default function UserDetailPage() {
    return (
        <>
            <Helmet>
                <title> Blog | Minimal UI </title>
            </Helmet>

            <UserDetailView />
        </>
    );
}
