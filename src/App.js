import React, { Component, Suspense } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const GameAccount = React.lazy(() => import('./views/GameAccount/GameAccount'))
const ClubRegister = React.lazy(() => import('./views/pages/register/ClubRegister'))
const LeagueRegister = React.lazy(() => import('./views/pages/register/LeagueRegister'))
const DailyRegister = React.lazy(() => import('./views/pages/register/DailyRegister'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// Email App
const EmailApp = React.lazy(() => import('./views/apps/email/EmailApp'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ToastContainer />
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/account" name="Account Page" element={<GameAccount />} />
            <Route
              exact
              path="/club-register"
              name="Club Register Page"
              element={<ClubRegister />}
            />
            <Route
              exact
              path="/league-register"
              name="League Register Page"
              element={<LeagueRegister />}
            />
            <Route
              exact
              path="/daily-register"
              name="Daily Register Page"
              element={<DailyRegister />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="/apps/email/*" name="Email App" element={<EmailApp />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
