import { Button, Card, Form, Input, Layout, Row } from "antd";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import classes from './Login.module.scss'


const Login: FC = () => { 
    const dispatch = useDispatch()
    const {error} = useTypedSelector(state => state.auth)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {login} = useActions()

    const submit = () => {
        login(username, password)
    }

    return (
        <Layout className={classes.loginContainer}>
            <Row justify="center" align="bottom">
                <Card>
                    <Form onFinish={submit}>
                        {
                            error && <div style={{ color: 'red' }}>
                                {error}
                            </div>
                        }
                        <Form.Item
                            label="Имя пользователя"
                            name="username"
                            rules={[{ required: true, message: 'Введите логин' }]}
                        >
                            <Input value={username} onChange={e => setUsername(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label="Пароль"
                            name="password"
                            rules={[{ required: true, message: 'Введите пароль' }]}
                        >
                            <Input value={password} onChange={e => setPassword(e.target.value)} type={"password"} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Row>
        </Layout> 
    ) 
} 
 
export default Login;