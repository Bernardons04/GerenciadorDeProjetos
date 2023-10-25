import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import Conta from './components/Usuarios/Conta'
import NewConta from './components/Usuarios/NewConta'
import NewProject from './components/pages/NewProject'
import Projects from './components/pages/Projects'
import Project from './components/pages/Project'

import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route
            exact path="/"
            element={<Conta />}
          />

          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/newproject"
            element={<NewProject />}
          />

          <Route
            path="/newconta"
            element={<NewConta />}
          />

          <Route
            path="/project/:id"
            element={<Project />}
          />
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

export default App
