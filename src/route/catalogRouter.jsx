import PublicLayout from './../layouts/PublicLayout'
import CompanyCatalogPage from '../pages/catalog/CompanyCatalogPage';
import CompanyDetailPage from '../pages/catalog/CompanyDetailPage';

const catalogRouter = [
  {
    element: <PublicLayout/>,
    children: [
      { path: 'entreprises', element: <CompanyCatalogPage /> },
      { path: 'entreprises/:id', element: <CompanyDetailPage /> },
    ],
  },
];

export default catalogRouter;
