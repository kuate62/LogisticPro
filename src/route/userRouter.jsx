import UserListPage from '../pages/users/UserListPage';
import UserCreatePage from '../pages/users/UserCreatePage';
import UserEditPage from '../pages/users/UserEditPage';
import UserDetailPage from '../pages/users/UserDetailPage';

const userRouter = [
  { path: '/users', element: <UserListPage /> },
  { path: '/users/new', element: <UserCreatePage /> },
  { path: '/users/:id', element: <UserDetailPage /> },
  { path: '/users/:id/edit', element: <UserEditPage /> },
];

export default userRouter;
