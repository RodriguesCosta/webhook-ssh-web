import React, { useState, useEffect } from 'react';

import { Page, Grid, Form, Button, Card, Table } from "tabler-react";
import api from '../../services/api';
import { envApiBase } from '../../config/environment';
import SiteWrapper from '../../components/SiteWrapper';
import copyClipboard from 'copy-to-clipboard';

export default function HomePage() {
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [host, setHost] = useState('')
  const [port, setPort] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [command, setCommand] = useState('')

  const [listSsh, setListSsh] = useState([])

  const token = localStorage.getItem('token')

  async function loadList() {
    try {
      const listSsh = await api.getSsh(token)
      setListSsh(listSsh.ssh_config)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    (async function () {
      try {
        const listSsh = await api.getSsh(token)
        setListSsh(listSsh.ssh_config)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [token])

  async function handleSave() {
    try {
      setLoading(true)
      await api.newSsh(token, {
        name,
        host,
        port,
        username,
        password,
        command,
      })
      loadList()
      setHost('')
      setUsername('')
      setPassword('')
      setCommand('')
      setPort('')
      setName('')
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.error(e)
    }
  }

  async function handleDelete(id) {
    try {
      setLoading(true)
      await api.deleteSsh(token, id)
      loadList()
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.error(e)
    }
  }

  return (
    <SiteWrapper>
      <Page.Content>
        <Grid.Row>

          <Grid.Col md={6}>
            <Card>
              <Card.Header>
                <Card.Title>List SSH</Card.Title>
              </Card.Header>
              <Table
                cards={true}
                striped={true}
                responsive={true}
                className="table-vcenter"
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColHeader>Name</Table.ColHeader>
                    <Table.ColHeader>Command</Table.ColHeader>
                    <Table.ColHeader />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {listSsh.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Col>{item.name}</Table.Col>
                      <Table.Col>{item.command}</Table.Col>
                      <Table.Col>
                        <Button icon="copy" size="sm" onClick={() => {
                          copyClipboard(`${envApiBase}/ssh/${item.id}`)
                        }}></Button>
                        <Button icon="trash" size="sm" onClick={() => {
                          handleDelete(item.id)
                        }}></Button>
                      </Table.Col>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card>
          </Grid.Col>


          <Grid.Col md={6}>

            <Form className="card">
              <Card.Body>
                <Card.Title>Cadastrar SSH</Card.Title>
                <Grid.Row>

                  <Grid.Col md={4}>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      />
                    </Form.Group>
                  </Grid.Col>

                  <Grid.Col md={5}>
                    <Form.Group>
                      <Form.Label>Host</Form.Label>
                      <Form.Input
                        type="text"
                        placeholder="Host"
                        value={host}
                        onChange={(e) => {
                          setHost(e.target.value)
                        }}
                      />
                    </Form.Group>
                  </Grid.Col>

                  <Grid.Col md={3}>
                    <Form.Group>
                      <Form.Label>Port</Form.Label>
                      <Form.Input
                        type="number"
                        placeholder="Port"
                        value={port}
                        onChange={(e) => {
                          setPort(e.target.value)
                        }}
                      />
                    </Form.Group>
                  </Grid.Col>

                  <Grid.Col md={6}>
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value)
                        }}
                      />
                    </Form.Group>
                  </Grid.Col>

                  <Grid.Col md={6}>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                    </Form.Group>
                  </Grid.Col>

                  <Grid.Col md={12}>
                    <Form.Group>
                      <Form.Label>Command</Form.Label>
                      <Form.Textarea
                        type="text"
                        placeholder="Command"
                        rows="12"
                        onChange={(e) => {
                          setCommand(e.target.value)
                        }}
                      >{command}</Form.Textarea>
                    </Form.Group>
                  </Grid.Col>

                </Grid.Row>
              </Card.Body>

              <Card.Footer className="text-right">
                <Button type="button" loading={loading} block color="primary" onClick={() => {
                  handleSave()
                }}>Salvar</Button>
              </Card.Footer>
            </Form>

          </Grid.Col>

        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}
