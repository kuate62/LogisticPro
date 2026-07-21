import EmployeeListPage from '../pages/employees/EmployeeListPage';
import EmployeeCreatePage from '../pages/employees/EmployeeCreatePage';
import EmployeeEditPage from '../pages/employees/EmployeeEditPage';
import EmployeeDetailPage from '../pages/employees/EmployeeDetailPage';

const employeeRouter = [
  { path: '/employees', element: <EmployeeListPage /> },
  { path: '/employees/new', element: <EmployeeCreatePage /> },
  { path: '/employees/:id', element: <EmployeeDetailPage /> },
  { path: '/employees/:id/edit', element: <EmployeeEditPage /> },
];

export default employeeRouter;
