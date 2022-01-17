import { Modal} from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bank from "../../components/Bank/Bank";
import BankForm from "../../components/BankForm";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { RouteNames } from "../../router/routes";
import { IBank } from "../../store/types/IBank";
import classes from './Banks.module.scss'

const Banks: FC = () => { 

    const navigate = useNavigate()
    const {loadBanksFromDB, setDatabaseStatus} = useActions()
    const {user} = useTypedSelector(state => state.auth)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const {banks, creditTerm, databaseStatus} = useTypedSelector(state => state.banks)

    useEffect( () => {
        loadBanksFromDB([] as IBank[])
        let banksFromStorage = JSON.parse( user.username && localStorage.getItem( `${user.username}Banks`) || '{}')
        if (Array.isArray(banksFromStorage) && banksFromStorage.length > 0) {
            loadBanksFromDB(banksFromStorage)
        } else {
            setDatabaseStatus('На данный момент у Вас нет банков')
        }
    }, [])

    return ( 
       <section className={classes.banks}>
            <h1 className={classes.banks__title}>Ваши банки</h1>
            <div className={classes.banks__inner}>
                {banks.length > 0
                    ? 
                    banks?.map(bank =>
                        <Bank key={bank.id} bank={bank}
                            creditTerm={creditTerm}
                        />
                    )
                    : 
                    databaseStatus
                } 
            </div>
            <div className={classes.banks__optionsBtns}>
                <button className={classes.banks__optionsBtn} onClick={() => setModalVisible(true)} >Добавить банк</button>
                <button className={classes.banks__optionsBtn} onClick={() => navigate(RouteNames.CALCULATOR)}>Ипотечный калькулятор</button>
            </div>
            <Modal title="Заполните поля ниже" 
                   visible={modalVisible}
                   footer={null}
                   onCancel={() => setModalVisible(false)}>
                   <BankForm />
            </Modal>
       </section>
    ) 
} 
 
export default Banks;