import { AgencyListPage, AgencyCreatePage, AgencyEditPage, AgencyDetailPage } from '../pages/agencies';

const agencyRouter = [
  { path: '/agencies', element: <AgencyListPage /> },
  { path: '/agencies/new', element: <AgencyCreatePage /> },
  { path: '/agencies/:id', element: <AgencyDetailPage /> },
  { path: '/agencies/:id/edit', element: <AgencyEditPage /> },
];

export default agencyRouter;
