import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BlogListing from "./components/BlogListing";
import BlogPost from "./components/BlogPost";
import { Container, Jumbotron } from "react-bootstrap";

const App = () => (
  <BrowserRouter>
    <header>
      <Jumbotron fluid className="bg-info text-white m-0">
        <Container>
          <h1 className="display-4">React GraphCMS Sample Blog</h1>
        </Container>
      </Jumbotron>
    </header>
    <main>
      <Container className="py-5">
        <Switch>
          <Route exact path="/" component={BlogListing} />
          <Route path="/sample-blog/:slug" component={BlogPost} />
        </Switch>
      </Container>
    </main>
    <footer className="text-center bg-info text-white">
      <Container className="py-3">
        <p className="m-0">
          React GraphCMS Sample Blog | Design & Developed By{" "}
          <a
            href="https://www.linkedin.com/in/santosh-singh-chauhan/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white" }}
          >
            Santosh Singh Chauhan
          </a>
        </p>
      </Container>
    </footer>
  </BrowserRouter>
);

export default App;
