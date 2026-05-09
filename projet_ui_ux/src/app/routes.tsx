import { createBrowserRouter } from 'react-router';
import { Home } from './screens/Home';
import { ServiceChoice } from './screens/ServiceChoice';
import { CenterChoice } from './screens/CenterChoice';
import { DateTime } from './screens/DateTime';
import { PersonalInfo } from './screens/PersonalInfo';
import { Summary } from './screens/Summary';
import { Confirmation } from './screens/Confirmation';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/service',
    Component: ServiceChoice,
  },
  {
    path: '/center',
    Component: CenterChoice,
  },
  {
    path: '/datetime',
    Component: DateTime,
  },
  {
    path: '/info',
    Component: PersonalInfo,
  },
  {
    path: '/summary',
    Component: Summary,
  },
  {
    path: '/confirmation',
    Component: Confirmation,
  },
]);
