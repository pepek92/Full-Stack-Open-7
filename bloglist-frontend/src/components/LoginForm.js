import React from 'react'
import { Form, Button } from 'react-bootstrap'

const loginForm = (props) => {
  return (
    <div>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={props.uname}
            name="Username"
            onChange={props.handleName}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={props.passwd}
            name="Password"
            onChange={props.handlePasswd}
          />
          <Button variant="primary" id="login-button" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default loginForm
