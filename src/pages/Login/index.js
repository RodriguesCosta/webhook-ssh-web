import React, { useState, useEffect } from 'react';

import { Page, Grid, Form, Button } from "tabler-react";
import api from '../../services/api';

import webhooksshLogo from '../../assets/webhookssh.png';

import { Container, FormGroup } from './styles';

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async function () {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          setLoading(true)
          await api.getSsh(token)
          window.location.href = '/dash'
        } catch (e) {
          localStorage.clear()
          setLoading(false)
          console.error(e)
        }
      }
    })()
  }, [])

  async function handleLogin() {
    try {
      setLoading(true)
      const token = btoa(`${username}:${password}`)
      await api.getSsh(token)
      localStorage.setItem('token', token)
      window.location.href = '/dash'
    } catch (e) {
      setLoading(false)
      console.error(e)
    }
  }

  return (
    <Page.Content>
      <Grid.Row>
        <Grid.Col xs={12}>
          <Container>

            <br /><br />
            <img src={webhooksshLogo} alt="Webhook SSH" />
            <br /><br />

            <FormGroup label="Username">
              <Form.Input
                icon="user"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
            </FormGroup>

            <FormGroup label="Password">
              <Form.Input
                icon="lock"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </FormGroup>

            <Button loading={loading} block color="primary" onClick={() => {
              handleLogin()
            }} >Login</Button>

          </Container>
        </Grid.Col>
      </Grid.Row>
    </Page.Content>
  );
}
