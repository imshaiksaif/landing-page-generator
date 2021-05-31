import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Heading, Button } from "rebass"

import { useAuth } from 'react-use-auth';

const IndexPage = () => {
  const { isAuthenticated, user } = useAuth();

  const data = useStaticQuery(graphql`
    query {
      mdlapi {
        hello {
          world
        }
      }
    }
  `)

  console.log({user});
  return (
    <Layout>
    <Seo title="Markdown Landing Page" />
    <Heading fontSize={[5, 6, 7 ]}>Markdown Landing Page</Heading>
    <p>Write a landing page for anything</p>
    <p>From Graphql server: {data.mdlapi.hello.world}</p>
    {isAuthenticated() ? <p>{user.name}</p> : <p>Not Logged In</p>}
    <Login />
  </Layout>
  )
}


const Login = () => {
  const { isAuthenticated, login, logout } = useAuth();

  if (isAuthenticated()) {
      return <Button bg='highlight' onClick={logout}>Logout</Button>;
  } else {
      return <Button bg='highlight' onClick={login}>Login</Button>;
  }
};


export default IndexPage


