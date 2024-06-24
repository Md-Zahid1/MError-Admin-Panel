import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const AssignmentPage = lazy(() => import('src/pages/assignment'));
export const UserDetail = lazy(() => import('src/pages/userDetail'))
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ConsultantPage = lazy(() => import('src/pages/consultant'))
export const AppointmentPage = lazy(() => import('src/pages/appointment'))
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const AddConsultantPage = lazy(() => import('src/pages/AddConsultant'))
export const AddUsersPage = lazy(() => import('src/pages/AddUsers'))
export const AddBlogPage = lazy(() => import('src/pages/AddBlog'))
export const BlogDetail = lazy(() => import('src/pages/blogDetail'))
export const AddAssignmentPage = lazy(() => import('src/pages/AddAssignment'))
export const AssignmentDetail = lazy(() => import('src/pages/assignmentDetail'))
export const AddAppointmentPage = lazy(() => import('src/pages/AddAppointment'))
export const ConsultantDetail = lazy(() => import('src/pages/consultantDetail'))
export const AppointmentDetail = lazy(() => import('src/pages/appointmentDetail'))
export const CategoryPage = lazy(() => import('src/pages/category'))
export const AddCategoryPage = lazy(() => import('src/pages/AddCategory'))
export const CategoryDetail = lazy(() => import('src/pages/categoryDetail'))
export const SettingPage = lazy(() => import('src/pages/setting'))
export const FeedbackPage = lazy(() => import('src/pages/feedback'))

// ----------------------------------------------------------------------

export default function Router() {
  const user = localStorage.getItem('user')
  const routes = useRoutes([
    {
      element: user ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : <Navigate to='/login' />,
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: "add-users", element: <AddUsersPage /> },
        { path: "edit-users/:id", element: <AddUsersPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'add-blog', element: <AddBlogPage /> },
        { path: 'blog-detail/:id', element: <BlogDetail /> },
        { path: 'edit-blog/:id', element: <AddBlogPage /> },
        { path: 'assignment', element: <AssignmentPage /> },
        { path: 'add-assignment', element: <AddAssignmentPage /> },
        { path: 'edit-assignment/:id', element: <AddAssignmentPage /> },
        { path: 'assignment-detail/:id', element: <AssignmentDetail /> },
        { path: 'userDetail/:id', element: <UserDetail /> },
        { path: 'consultant', element: <ConsultantPage /> },
        { path: 'add-consultant', element: <AddConsultantPage /> },
        { path: 'edit-consultant/:id', element: <AddConsultantPage /> },
        { path: 'consultant-detail/:id', element: <ConsultantDetail /> },
        { path: 'appointment', element: <AppointmentPage /> },
        { path: 'add-appointment', element: <AddAppointmentPage /> },
        { path: 'edit-appointment/:id', element: <AddAppointmentPage /> },
        { path: 'appointment-detail/:id', element: <AppointmentDetail /> },
        { path: 'category', element: <CategoryPage /> },
        { path: 'add-category', element: <AddCategoryPage /> },
        { path: 'edit-category/:id', element: <AddCategoryPage /> },
        { path: 'category-detail/:id', element: <CategoryDetail /> },
        { path: 'setting', element: <SettingPage /> },
        { path: 'feedback', element: <FeedbackPage /> }
      ],
    },
    {
      path: 'login',
      element: user ? <Navigate to='/' /> : <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
