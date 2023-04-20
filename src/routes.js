import React from 'react'
import BonusCard from './views/BonusCard/BonusCard'
import TeamOfTheWeek from './views/TeamOfTheWeek/TeamOfTheWeek'
import AddMoreDemo from './views/BonusCard/AddMoreDemo'
import ClubAboutGame from './views/club/ClubAboutGame'
import Index from './views/FantasyValue'
import GameStructure from './views/GameStructure/GameStructure'
import Grade from './views/Grade/Grade'
import Player from './views/Player/Player'
import Team from './views/Team/Team'
import Fixture from './views/Fixture/Fixture'
import TeamPlayer from './views/TeamPlayer/TeamPlayer'
import ScoreCard from './views/ScoreCard/ScoreCard'
import PowerControl from './views/PowerControl/PowerControl'
import Article from './views/Article/Article'
import GradePoint from './views/GradePoint/GradePoint'
import Round from './views/Round/Round'
import Branding from './views/Branding/Branding'
import Sponsor from './views/Sponsor/Sponsor'
import BonusPoint from './views/BonusPoint/BonusPoint'
import PlayerAvailability from './views/PlayerAvailability/PlayerAvailability'
import VerifyUser from './views/VerifyUser/VerifyUser'
import User from './views/User/User'
import GameNotification from './views/GameNotification/GameNotification'
import FeedbackCategory from './views/FeedbackFantasy/FeedbackCategory/FeedbackCategory'
import FeedbackCoach from './views/FeedbackFantasy/FeedbackCoach/FeedbackCoach'
import ManageAccessByTeam from './views/FeedbackFantasy/ManageAccess/ManageAccessByTeam'
import ManageAccessByFixture from './views/FeedbackFantasy/ManageAccessByFixture/ManageAccessByFixture'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

//Club controller
const BasicSetting = React.lazy(() => import('./views/club/BasicSetting'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const LoadingButtons = React.lazy(() => import('./views/buttons/loading-buttons/LoadingButtons'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const DatePicker = React.lazy(() => import('./views/forms/date-picker/DatePicker'))
const DateRangePicker = React.lazy(() => import('./views/forms/date-range-picker/DateRangePicker'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const MultiSelect = React.lazy(() => import('./views/forms/multi-select/MultiSelect'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const TimePicker = React.lazy(() => import('./views/forms/time-picker/TimePicker'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const SmartTable = React.lazy(() => import('./views/smart-table/SmartTable'))

// Plugins
const Calendar = React.lazy(() => import('./views/plugins/calendar/Calendar'))
const Charts = React.lazy(() => import('./views/plugins/charts/Charts'))
const GoogleMaps = React.lazy(() => import('./views/plugins/google-maps/GoogleMaps'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const Invoice = React.lazy(() => import('./views/apps/invoicing/Invoice'))

const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/basic-settings', name: 'BasicSetting', element: BasicSetting },
  { path: '/club-about-game', name: 'BasicSetting', element: ClubAboutGame },
  { path: '/game-structure', name: 'Game Structure & Salary Cap', element: GameStructure },
  { path: '/fantasy-values', name: 'Fantasy Values', element: Index },
  { path: '/players', name: 'Players', element: Player },
  { path: '/grades', name: 'Grades', element: Grade },
  { path: '/point-system', name: 'Grades', element: GradePoint },
  { path: '/teams', name: 'Teams', element: Team },
  { path: '/bonus-cards', name: 'BonusCard', element: BonusCard },
  { path: '/team-of-the-round', name: 'TeamOfTheRound', element: TeamOfTheWeek },
  { path: '/add-more-demo', name: 'TeamOfTheRound', element: AddMoreDemo },
  { path: '/fixtures', name: 'Fixtures', element: Fixture },
  { path: '/team-players/:fixtureId', name: 'Team Players', element: TeamPlayer },
  { path: '/scorecard/:fixtureId', name: 'Scorecard', element: ScoreCard },
  { path: '/power-control', name: 'PowerControl', element: PowerControl },
  { path: '/articles', name: 'Article', element: Article },
  { path: '/rounds', name: 'Round', element: Round },
  { path: '/branding', name: 'Branding', element: Branding },
  { path: '/sponsors', name: 'Sponsor', element: Sponsor },
  { path: '/bonus-points', name: 'Bonus Point', element: BonusPoint },
  { path: '/availabilities', name: 'Player Availability', element: PlayerAvailability },
  { path: '/verify-users', name: 'Verify Users', element: VerifyUser },
  { path: '/users', name: 'Users', element: User },
  { path: '/game-notifications', name: 'Game Notifications', element: GameNotification },
  { path: '/feedback-fantasy/category', name: 'Category', element: FeedbackCategory },
  { path: '/feedback-fantasy/managers', name: 'Feedback Manager', element: FeedbackCoach },
  {
    path: '/feedback-fantasy/manage-access-by-team',
    name: 'Manage Access by Team',
    element: ManageAccessByTeam,
  },
  {
    path: '/feedback-fantasy/manage-access-by-fixture',
    name: 'Manage Access by Fixture',
    element: ManageAccessByFixture,
  },

  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/buttons/loading-buttons', name: 'Loading Buttons', element: LoadingButtons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/multi-select', name: 'Multi Select', element: MultiSelect },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/date-picker', name: 'Date Picker', element: DatePicker },
  { path: '/forms/date-range-picker', name: 'Date Range Picker', element: DateRangePicker },
  { path: '/forms/time-picker', name: 'Time Picker', element: TimePicker },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/plugins', name: 'Plugins', element: Calendar, exact: true },
  { path: '/plugins/calendar', name: 'Calendar', element: Calendar },
  { path: '/plugins/charts', name: 'Charts', element: Charts },
  { path: '/plugins/google-maps', name: 'GoogleMaps', element: GoogleMaps },
  { path: '/smart-table', name: 'Smart Table', element: SmartTable },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/apps', name: 'Apps', element: Invoice, exact: true },
  { path: '/apps/invoicing', name: 'Invoice', element: Invoice, exact: true },
  { path: '/apps/invoicing/invoice', name: 'Invoice', element: Invoice },
  { path: '/apps/email', name: 'Email', exact: true },
  { path: '/apps/email/inbox', name: 'Inbox', exact: true },
  { path: '/apps/email/compose', name: 'Compose', exact: true },
  { path: '/apps/email/message', name: 'Message', exact: true },
]

export default routes