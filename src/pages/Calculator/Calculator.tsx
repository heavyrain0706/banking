import { Alert, Button, Form, Input, Select } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IBank } from "../../store/types/IBank";
import { getDate } from "../../utils/date";
import classes from './Calculator.module.scss'
 
const Calculator: FC = () => { 

    const {loadBanksFromDB, setDatabaseStatus, loadBanksHistoryFromDB, addBankHistory} = useActions()
    const {user} = useTypedSelector(state => state.auth)
    const {banks, banksHistory} = useTypedSelector(state => state.banks)
    const [showInitialLoanError, setShowInitialLoanError] = useState<boolean>(false)
    const [showfirstContributionError, setShowFirstContributionError] = useState<boolean>(false)
    let numPattern = /^\d+$/
    const [bankValue, setBankValue] = useState<string | null>('')
    const [chosenBank, setChosenBank] = useState({} as IBank)
    const [monthlyPaymant, setMonthlyPaymant] = useState<number | null>(null);
    const [form] = Form.useForm();
    const [allowBanksHistory, setAllowBanksHistory] = useState<boolean>(false)

    const [inputData, setInputData] = useState({
        initialLoanValue: '',
        firstContributionValue: '',
        numberOfMonthlyPaymants: ''
    })

    //onChangeMultipleHandler
    const handleCalculateMultipleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData({
          ...inputData,
          [name]: value,
        });
      };

    useEffect( () => {
        loadBanksFromDB([] as IBank[])
        let banksFromStorage = JSON.parse( user.username && localStorage.getItem( `${user.username}Banks`) || '{}')
        if (Array.isArray(banksFromStorage) && banksFromStorage.length > 0) {
            loadBanksFromDB(banksFromStorage)
        } else {
            setDatabaseStatus('На данный момент у Вас нет банков')
        }
    }, [])

    useEffect( () => {
                banks.forEach(bank => {
                    if(bankValue == bank.name) {
                        setChosenBank(bank)
                    }
                })
                if(chosenBank && inputData.initialLoanValue != '') {
                    if(parseInt(inputData.initialLoanValue) > parseInt(chosenBank.maxCredit)) {
                        setShowInitialLoanError(true)
                    } else {
                        setShowInitialLoanError(false)
                    }

                    if((parseInt(inputData.firstContributionValue) < parseInt(chosenBank.minContribution))) {
                        setShowFirstContributionError(true)
                    } else {
                        setShowFirstContributionError(false)
                    }
                }
    }, [inputData.initialLoanValue, inputData.firstContributionValue, bankValue])

    const calculate = () => {
        let result = +(parseInt(inputData.initialLoanValue) * (parseInt(chosenBank.interestRate) / 12) * Math.pow((1 + parseInt(chosenBank.interestRate) / 12), parseInt(inputData.numberOfMonthlyPaymants)) /
            (Math.pow((1 + parseInt(chosenBank.interestRate) / 12), parseInt(inputData.numberOfMonthlyPaymants)) - 1)).toFixed(2)
        setMonthlyPaymant(result)
        let banksHistoryFromStorage = user.username && JSON.parse(localStorage.getItem(`${user.username}BanksHistory`) || '{}')
        let newHistoryItem = `Вы рассчитали ежемесячный платеж в банке ${chosenBank.name} ${getDate()}, сумма платежа = ${result}.`
        if (Array.isArray(banksHistoryFromStorage)) {
            banksHistoryFromStorage.push(newHistoryItem)
        } else {
            banksHistoryFromStorage = []
            banksHistoryFromStorage.push(newHistoryItem)
        }
        addBankHistory(newHistoryItem)
        localStorage.setItem(`${user.username}BanksHistory`, JSON.stringify(banksHistoryFromStorage))
        form.resetFields();
    }

    const showBanksHistory = () => {
        loadBanksHistoryFromDB([] as string[])
        let banksHistoryFromStorage = user.username && JSON.parse(localStorage.getItem(`${user.username}BanksHistory`) || '{}')
        if (Array.isArray(banksHistoryFromStorage) && banksHistoryFromStorage.length > 0) {
            loadBanksHistoryFromDB(banksHistoryFromStorage)
        }
        setAllowBanksHistory(true)
    }

    const hideBanksHistory = () => {
        setAllowBanksHistory(false)
    }

    return ( 
        <section className={classes.calculator}> 
            <div className={classes.calculator__header}>
                <div className={classes.calculator__select}>
                    <h2 className={classes.calculator__label}>Выберите банк</h2>
                    <Select style={{ width: 150 }} onChange={bank => setBankValue(bank)}>
                        {banks.map(bank =>
                            <Select.Option key={bank.id} value={bank.name}>
                                {bank.name}
                            </Select.Option>
                        )}
                    </Select>
                </div>
                <div className={classes.calculator__historyBtns}>
                    <button onClick={showBanksHistory} className={classes.calculator__historyBtn}>Показать банковскую историю</button>
                    <button onClick={hideBanksHistory} className={classes.calculator__historyBtn}>Cкрыть банковскую историю</button>
                </div>
            </div>
            {
                bankValue
                ?
                    <div className={classes.calculator__body}>
                        <span className={classes.calculator__bankName}>Вы выбрали {bankValue}</span>
                        <Form className={classes.calculator__form} form={form} onFinish={calculate}>
                            <Form.Item
                                label="общая сумма кредита"
                                name="initialLoanValue"
                                rules={[{ required: true, message: 'Введите общую сумму кредита' },
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
                                <Input name="initialLoanValue" onChange={handleCalculateMultipleInputChange}
                                    value={inputData.initialLoanValue}
                                />
                            </Form.Item>
                            {showInitialLoanError &&
                                    <Alert
                                        message="Ошибка"
                                        description={`Запрашиваемая сумма больше, чем установленный лимит. Ваш лимит в этом банке: ${chosenBank.maxCredit}`}
                                        type="error"
                                        style={{ marginTop: 20, borderRadius: 10, color: '#fff', fontWeight: '700', backgroundColor: '#D93B59', border: 'none' }}
                                    />
                            }
                            <Form.Item
                                label="Первый взнос"
                                name="firstContributionValue"
                                rules={[{ required: true, message: 'Введите первый взнос' },
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
                                <Input name="firstContributionValue" onChange={handleCalculateMultipleInputChange}
                                    value={inputData.firstContributionValue}
                                />
                            </Form.Item>
                            {showfirstContributionError &&
                                    <Alert
                                        message="Ошибка"
                                        description={`Первый взнос меньше минимального взноса в этом банке. Минимальный взнос в этом банке: ${chosenBank.minContribution}`}
                                        type="error"
                                        style={{ marginTop: 20, borderRadius: 10, color: '#fff', fontWeight: '700', backgroundColor: '#D93B59', border: 'none' }}
                                    />
                            }
                            <Form.Item
                                label="Количество месячных платежей"
                                name="numberOfMonthlyPaymants"
                                rules={[{ required: true, message: 'Введите количество месячных платежей' },
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
                                <Input name="numberOfMonthlyPaymants" onChange={handleCalculateMultipleInputChange}
                                    value={inputData.numberOfMonthlyPaymants}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Рассчитать ежемесячный платеж
                                </Button>
                            </Form.Item>
                        </Form>
                        <span className={classes.calculator__result}>
                            Ваш ежемесячный платеж составляет: <span className={classes.calculator__monthlyPaymant}>{monthlyPaymant}</span>
                        </span>
                    </div> 
                :
                    <>
                    </>
            }
            {allowBanksHistory &&
                <div className={classes.calculator__banksHistory}>
                    <h3 className={classes.calculator__historyTitle}>История платежей</h3>
                    {banksHistory.length > 0 
                        ?
                            banksHistory.map(historyItem =>
                                <div className={classes.calculator__historyItem}>{historyItem}</div>
                            )
                        :
                        <div className={classes.calculator__historyItem}>История отсутствует</div>
                    }
                </div>
            }
        </section> 
    ) 
} 
 
export default Calculator;
