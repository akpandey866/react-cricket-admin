import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilGrid,
  cilLayers,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
  cilElevator,
  cilIndentDecrease,
  cilMugTea,
  cilUser,
  cilGamepad,
  cilVideogame,
  cilShieldAlt,
  cilUserPlus,
  cilControl,
  cilAppsSettings,
  cilSettings,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  /*  {
    component: CNavGroup,
    name: 'Packages',
    to: '/',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
    ],
  }, */
  // {
  //   component: CNavGroup,
  //   name: 'Setup',
  //   to: '/',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Checklist',
  //       to: '/',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Info Pack',
  //       to: '/',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Info Video',
  //       to: '/',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Features ',
  //       to: '/',
  //     },
  //   ],
  // },
  {
    component: CNavTitle,
    name: 'Game Setup',
  },
  {
    component: CNavGroup,
    name: 'Settings',
    to: '/',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'About Game',
        to: '/club-about-game',
      },
      {
        component: CNavItem,
        name: 'Game Structure',
        to: '/game-structure',
      },
      {
        component: CNavItem,
        name: 'Rounds',
        to: '/rounds',
      },
      {
        component: CNavItem,
        name: 'Comps',
        to: '/grades',
      },
      {
        component: CNavItem,
        name: 'Teams',
        to: '/teams',
      },
      {
        component: CNavItem,
        name: 'Point System',
        to: '/point-system',
      },
      {
        component: CNavItem,
        name: 'Bonus Points',
        to: '/bonus-points',
      },
      {
        component: CNavItem,
        name: 'Fantasy Values',
        to: '/fantasy-values',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Controls',
    to: '/',
    icon: <CIcon icon={cilControl} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Spots',
        to: '/spots',
      },
      {
        component: CNavItem,
        name: 'Powers',
        to: '/power-control',
      },
      {
        component: CNavItem,
        name: 'Branding',
        to: '/branding',
      },
      {
        component: CNavItem,
        name: 'Sponsors',
        to: '/sponsors',
      },
      {
        component: CNavItem,
        name: 'Prizes',
        to: '/',
      },
      {
        component: CNavItem,
        name: 'Notifications',
        to: '/game-notifications',
      },
      {
        component: CNavItem,
        name: 'Articles',
        to: '/articles',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Players',
    to: '/',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Players List',
        to: '/players',
      },
      {
        component: CNavItem,
        name: 'Player Availability ',
        to: '/availabilities',
      },
      {
        component: CNavItem,
        name: 'Player Stats ',
        to: '/',
      },
      {
        component: CNavItem,
        name: 'Player Import ',
        to: '/',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Fixtures',
    to: '/',
    icon: <CIcon icon={cilGamepad} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Fixtures List',
        to: '/fixtures',
      },
      {
        component: CNavItem,
        name: 'Manage Fixtures',
        to: '/manage-fixtures',
      },
      {
        component: CNavItem,
        name: 'Completed Fixtures',
        to: '/completed-fixtures',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Members',
    to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Members List',
        to: '/members',
      },
      {
        component: CNavItem,
        name: 'Manage Members',
        to: '/manage-members',
      },
      {
        component: CNavItem,
        name: 'Verify Members ',
        to: '/verify-members',
      },
      {
        component: CNavGroup,
        name: 'Verifications',
        to: '/',
        items: [
          {
            component: CNavItem,
            name: 'Mark as Paid',
            to: '/feedback-fantasy/manage-access-by-team',
          },
          {
            component: CNavItem,
            name: 'Verify as Player',
            to: '/feedback-fantasy/manage-access-by-fixture',
          },
        ],
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Analytics',
  //   to: '/',
  //   icon: <CIcon icon={cilElevator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'danger-gradient',
  //     text: 'PRO',
  //   },
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Members',
  //       to: '/',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Overall',
  //       to: '/',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Players',
  //       to: '/',
  //     },
  //   ],
  // },
  {
    component: CNavTitle,
    name: 'Pro Add-Ons',
  },
  {
    component: CNavGroup,
    name: 'Bonus Cards',
    to: '/',
    icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Activate',
        to: '/',
      },
      {
        component: CNavItem,
        name: 'Bonus Cards',
        to: '/bonus-cards',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Bracket Battle',
    to: '/',
    icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Activate',
        to: '/',
      },
      {
        component: CNavItem,
        name: 'Bracket Settings ',
        to: '/bracket-battle',
      },
      {
        component: CNavItem,
        name: 'Bracket Rounds',
        to: '/bracket-round',
      },
      {
        component: CNavItem,
        name: 'Round Points',
        to: '/',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Feedback Fantasy',
    to: '/',
    icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Activate',
        to: '/',
      },
      {
        component: CNavItem,
        name: 'Categories',
        to: '/feedback-fantasy/category',
      },
      {
        component: CNavItem,
        name: 'Ratings',
        to: '/feedback-fantasy/point-system',
      },
      {
        component: CNavItem,
        name: 'Managers',
        to: '/feedback-fantasy/managers',
      },
      {
        component: CNavGroup,
        name: 'Manager Access',
        to: '/',
        items: [
          {
            component: CNavItem,
            name: 'By Team',
            to: '/feedback-fantasy/manage-access-by-team',
          },
          {
            component: CNavItem,
            name: 'By Fixture',
            to: '/feedback-fantasy/manage-access-by-fixture',
          },
        ],
      },
      {
        component: CNavItem,
        name: 'Display Setting',
        to: '/feedback-fantasy/display-setting',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Team of the Round',
    to: '/',
    icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Activate',
        to: '/',
      },
      {
        component: CNavItem,
        name: 'Team of the Round',
        to: '/team-of-the-round',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Votes',
    to: '/fixture-votes',
    icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Activate Feature',
        to: '/',
      },
      {
        component: CNavItem,
        name: 'Fixture Votes',
        to: '/fixture-voting',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Billings',
  },
  {
    component: CNavItem,
    name: 'Invoices',
    to: '/',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Links',
  },
  {
    component: CNavItem,
    name: 'Help & Support',
    to: '/',
    icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Book Intro Session',
    to: '/',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Community',
    to: '/',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Roadmap / Feature Requests',
    to: '/',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Share Feedback',
    to: '/',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },

  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Multi Select',
  //       to: '/forms/multi-select',
  //       badge: {
  //         color: 'danger-gradient',
  //         text: 'PRO',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Date Picker',
  //       to: '/forms/date-picker',
  //       badge: {
  //         color: 'danger-gradient',
  //         text: 'PRO',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Date Range Picker',
  //       to: '/forms/date-range-picker',
  //       badge: {
  //         color: 'danger-gradient',
  //         text: 'PRO',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Time Picker',
  //       to: '/forms/time-picker',
  //       badge: {
  //         color: 'danger-gradient',
  //         text: 'PRO',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Icons',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success-gradient',
  //         text: 'FREE',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info-gradient',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavItem,
  //   name: 'Smart Table',
  //   icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'danger-gradient',
  //     text: 'PRO',
  //   },
  //   to: '/smart-table',
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Plugins',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Calendar',
  //   icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'danger-gradient',
  //     text: 'PRO',
  //   },
  //   to: '/plugins/calendar',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Charts',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  //   to: '/plugins/charts',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Google Maps',
  //   icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'danger-gradient',
  //     text: 'PRO',
  //   },
  //   to: '/plugins/google-maps',
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Apps',
  //   icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavGroup,
  //       name: 'Invoicing',
  //       icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  //       to: '/apps/invoicing',
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'Invoice',
  //           badge: {
  //             color: 'danger-gradient',
  //             text: 'PRO',
  //           },
  //           to: '/apps/invoicing/invoice',
  //         },
  //       ],
  //     },
  //     {
  //       component: CNavGroup,
  //       name: 'Email',
  //       to: '/apps/email',
  //       icon: <CIcon icon={cilEnvelopeOpen} customClassName="nav-icon" />,
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'Inbox',
  //           badge: {
  //             color: 'danger-gradient',
  //             text: 'PRO',
  //           },
  //           to: '/apps/email/inbox',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Message',
  //           badge: {
  //             color: 'danger-gradient',
  //             text: 'PRO',
  //           },
  //           to: '/apps/email/message',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Compose',
  //           badge: {
  //             color: 'danger-gradient',
  //             text: 'PRO',
  //           },
  //           to: '/apps/email/compose',
  //         },
  //       ],
  //     },
  //   ],
  // },
]

export default _nav
