import {Layout} from "antd";
import React, {useEffect, useState} from "react";
import { Select, Space, Button, Modal, Drawer} from 'antd';
import {useCrypto} from "../../context/crypto-context.jsx";
import CoinInfoModal from "../CoinInfoModal.jsx";
import AddAssetForm from "../AddAssetForm.jsx";

const headerStyle = {
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export default function AppHeader () {
    const [select, setSelect] = useState(false)
    const [coin, setCoin] = useState(null)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(true)
    const {crypto} = useCrypto()

    useEffect(() => {
        const keypress = event => {
            if (event.key === '/') {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, []);
    function handleSelect(value) {
        setCoin(crypto.find(c => c.id === value))
        setModal(true)
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: '250',
                }}
                open={select}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                value='press / to open'
                optionLabelProp='label'
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 30}} src={option.data.icon} alt={option.data.label} />
                        {option.data.label}
                    </Space>
                            )}
            />
                <Button type="primary" onClick={()=> setDrawer(true)}>Primary Button</Button>
                <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
                <CoinInfoModal  coin={coin} />
            </Modal>
            <Drawer width={600} title="Ass Assets" onClose={()=> setDrawer(false)} open={drawer} destroyOnClose>
            <AddAssetForm onClose={() => setDrawer(false)} />
            </Drawer>
        </Layout.Header>
    )
}