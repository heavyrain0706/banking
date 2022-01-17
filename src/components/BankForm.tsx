import { Button, Form, Input } from "antd";
import { FC, useState } from "react"; 
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IBank } from "../store/types/IBank";
 
const BankForm: FC = () => { 

    const {addBank} = useActions()
    const {user} = useTypedSelector(state => state.auth)
    let numPattern = /^\d+$/

    const [bank, setBank] = useState<IBank>({
        id: null,
        name: '',
        interestRate: '',
        maxCredit: '',
        minContribution: ''
    })

    const [form] = Form.useForm();


    //onChangeMultipleHandler
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
            setBank({
                ...bank,
                [name]: value,
            });
    }

    //AddBank
    const addNewBank = () => {
        setBank({...bank, name: ''})
        let banksFromStorage = user.username && JSON.parse(localStorage.getItem(`${user.username}Banks`) || '{}')
        let newBank = { ...bank, id: Date.now() }
        if (Array.isArray(banksFromStorage)) {
            banksFromStorage.push(newBank)
        } else {
            banksFromStorage = []
            banksFromStorage.push(newBank)
        }
        //Push bank to redux
        addBank(newBank)
        //Push bank to storage
        localStorage.setItem(`${user.username}Banks`, JSON.stringify(banksFromStorage))
        
        form.resetFields();
    }

    return ( 
        <Form form={form} onFinish={addNewBank}>
            <Form.Item
                label="Банк"
                name="name"
                rules={[{ required: true, message: 'Введите название банка' }]}
            >
                <Input name="name" onChange={handleInputChange}
                        value={bank.name}
                />
            </Form.Item>
            <Form.Item
                label="Процентная ставка"
                name="interestRate"
                rules={[{ required: true, message: 'Введите процентную ставку' },
                ({
                    validator(_,value) {
                        if(numPattern.test(value)) {
                            return Promise.resolve()
                        } else {
                            return Promise.reject('Вводите только цифры')
                        }
                    }
                })]}
            >
                <Input name="interestRate" onChange={handleInputChange}
                        value={bank.interestRate}
                />
            </Form.Item>
            <Form.Item
                label="Максимальная кредит"
                name="maxCredit"
                rules={[{ required: true, message: 'введите сумму кредита'},
                () => ({
                    validator(_,value) {
                        if(numPattern.test(value)) {
                            return Promise.resolve()
                        } else {
                            return Promise.reject('Вводите только цифры')
                        }
                    }
                })]}
            >
                <Input name="maxCredit" onChange={handleInputChange}
                        value={bank.maxCredit}
                />
            </Form.Item>
            <Form.Item
                label="Минимальный первоначальный взнос"
                name="MinContribution"
                rules={[{ required: true, message: 'введите сумму первого взноса' },
                () => ({
                    validator(_,value) {
                        if(numPattern.test(value)) {
                            return Promise.resolve()
                        } else {
                            return Promise.reject('Вводите только цифры')
                        }
                    }
                })]}
            >
                <Input name="minContribution" onChange={handleInputChange}
                        value={bank.minContribution}
                />
            </Form.Item>
            <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Добавить банк
                    </Button>
            </Form.Item>
        </Form> 
    ) 
} 
 
export default BankForm;