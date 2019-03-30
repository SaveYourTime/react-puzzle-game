import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import PuzzleGame from './components/PuzzleGame';
import Rank from './components/Rank';
import WelcomeModal from "./components/WelcomeModal";
import WinningModal from "./components/WinningModal";

const { Header, Content, Footer } = Layout;

function AppRouter() {
  const hash = window.location.hash;
  const path = hash.slice(hash.lastIndexOf('/') + 1);
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo">Puzzle Game</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[path || 'game']}
          >
            <Menu.Item key="game"><Link to="/">Game</Link></Menu.Item>
            <Menu.Item key="rank"><Link to="/rank">Rank</Link></Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Route path="/" exact component={PuzzleGame} />
          <Route path="/rank" component={Rank} />
          <Route path="/welcome" component={WelcomeModal} />
          <Route path="/win" component={WinningModal} />
        </Content>
        <Footer>SaveYourTime ©2018 Created by Aaron Lu</Footer>
      </Layout>
    </Router>
  );
}

export default AppRouter;