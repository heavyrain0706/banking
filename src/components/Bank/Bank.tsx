import { Button, Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import  React, { FC, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IBank } from "../../store/models/IBank";
import classes from './Bank.module.scss'

interface BankProps {
    bank: IBank,
    creditTerm: number
}
 
const Bank: FC<BankProps> = ({bank, creditTerm}) => {

    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const {user} = useTypedSelector(state => state.auth)
    const {loadBanksFromDB} = useActions()
    const [form] = Form.useForm()
    let numPattern = /^\d+$/

    //EditBank
    const [editedBank, setEditedBank] = useState<IBank>({
        ...bank
    })
    
    //onChangeMultipleHandler
    const handleEditedMultipleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedBank({
          ...editedBank,
          [name]: value,
        });
      };
  
    const editBank = () => {
        let banksFromStorage: IBank[] = JSON.parse(localStorage.getItem(`${user.username}Banks`) || '{}')
        let storageAfterEdit = banksFromStorage.filter(bankFromStorage => bankFromStorage.id !== editedBank.id)
        storageAfterEdit.push(editedBank)
        localStorage.setItem(`${user.username}Banks`, JSON.stringify(storageAfterEdit))
        loadBanksFromDB(storageAfterEdit)
        setModalVisible(false)
        form.resetFields();
    }

    //Delete bank
    const deleteBank = (e:React.MouseEvent<HTMLButtonElement>) => {
        let banksFromStorage: IBank[] = JSON.parse(localStorage.getItem(`${user.username}Banks`) || '{}')
        let storageAfterDelete = banksFromStorage.filter(bankFromStorage => bankFromStorage.id !== bank.id)
        localStorage.setItem(`${user.username}Banks`, JSON.stringify(storageAfterDelete))
        loadBanksFromDB(storageAfterDelete)
    }

    return ( 
        <div className={classes.bank}> 
            <h3 className={classes.bank__name}>{bank.name}</h3>
            <div className={classes.bank__item}>
                <span className={classes.bank__interestRate}>???????????????????? ????????????: {bank.interestRate}</span>
            </div>
            <div className={classes.bank__item}>
                <span className={classes.bank__maxCredit}>???????????????????????? ????????????: {bank.maxCredit}</span>
            </div>
            <div className={classes.bank__item}>
                <span className={classes.bank__minContribution}>?????????????????????? ???????????? ??????????: {bank.minContribution}</span>
            </div>
            <div className={classes.bank__item}>
                <span className={classes.bank__creditTerm}>???????? ??????????????: {creditTerm} ????????????</span>
            </div>
            <div className={classes.bank__options}>
                <button className={classes.bank__optionsBtn} onClick={deleteBank}>??????????????</button>
                <button className={classes.bank__optionsBtn} onClick={() => setModalVisible(true)}>??????????????????????????</button>
            </div>
            <Modal title="?????????????????????????? ????????????"
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}>
                <Form form={form} onFinish={editBank}>
                    <Form.Item
                        label="????????"
                        name="name"
                        rules={[{ required: true, message: '?????????????? ???????????????? ??????????' }]}
                    >
                        <Input name="name" onChange={handleEditedMultipleInputChange}
                            value={editedBank.name} defaultValue={editedBank.name}
                        />
                    </Form.Item>
                    <Form.Item
                        label="???????????????????? ????????????"
                        name="interestRate"
                        rules={[{ required: true, message: '?????????????? ???????????????????? ????????????' },
                        () => ({
                            validator(_,value) {
                                if(numPattern.test(value)) {
                                    return Promise.resolve()
                                } else {
                                    return Promise.reject('?????????????? ???????????? ??????????')
                                }
                            }
                        })
                    ]}
                    >
                        <Input name="interestRate" onChange={handleEditedMultipleInputChange}
                            value={editedBank.interestRate} defaultValue={editedBank.interestRate}
                        />
                    </Form.Item>
                    <Form.Item
                        label="???????????????????????? ????????????"
                        name="maxCredit"
                        rules={[{ required: true, message: '?????????????? ?????????? ??????????????' },
                        () => ({
                            validator(_,value) {
                                if(numPattern.test(value)) {
                                    return Promise.resolve()
                                } else {
                                    return Promise.reject('?????????????? ???????????? ??????????')
                                }
                            }
                        })]}
                    >
                        <Input name="maxCredit" onChange={handleEditedMultipleInputChange}
                            value={editedBank.maxCredit} defaultValue={editedBank.maxCredit}
                        />
                    </Form.Item>
                    <Form.Item
                        label="?????????????????????? ???????????????????????????? ??????????"
                        name="minContribution"
                        rules={[{ required: true, message: '?????????????? ?????????? ?????????????? ????????????' },
                        () => ({
                            validator(_,value) {
                                if(numPattern.test(value)) {
                                    return Promise.resolve()
                                } else {
                                    return Promise.reject('?????????????? ???????????? ??????????')
                                }
                            }
                        })]}
                    >
                        <Input name="minContribution" onChange={handleEditedMultipleInputChange}
                            value={editedBank.minContribution} defaultValue={editedBank.minContribution}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            ???????????? ??????????????????
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
} 
 
export default Bank;
