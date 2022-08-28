import { useAppDispatch, useAppSelector } from '../hooks'
import { setOpen } from '../stores/NFTBalanceStore'

import { useAccount } from 'wagmi'

import { Modal, Card } from 'antd';
import { useEffect, useState } from 'react';

import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: "iUC0GH6CW_qfRxEzlipX-obRqJZRcnfg", // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const { Meta } = Card;


export default function CreatFishNFT() {
  const { address, } = useAccount()
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state) => state.nftBalance.open)

  const [nfts, setNfts] = useState([])

  const getNFTs = async (addr) => {
    const data = await alchemy.nft.getNftsForOwner(addr, {
      contractAddresses: ['0x6a7a605e8ae80266bafaf349cc8f95d9f3c651a3']
    });
    // Print NFTs
    console.log(data);
    setNfts(data?.ownedNfts)
  }


  useEffect( () => {

    if (isOpen) {
     getNFTs(address)
    }


  }, [address, isOpen])





  const showModal = () => {
    dispatch(setOpen(true));
  };

  const handleOk = () => {
    // dispatch(setOpen(false));

  };

  const handleCancel = () => {
    // setIsModalVisible(false);
    dispatch(setOpen(false));

  };

  const settings = {
    dots: false,
    autoplaySpeed: 50,
    className: "center",
    centerMode: true,
    infinite: true,
    easing: 'easeOutQuint',
    slidesToShow: 4,
  }

  return (
    <>

      <Modal title="Backpack" visible={isOpen} onOk={handleOk} onCancel={handleCancel}>
        {nfts?.map((item)=>(
          <Card
            key={item.tokenId}
            hoverable
            style={{ width: 200 }}
            cover={<img alt="nft" src={item?.media?.[0]?.gateway} />}
          >
            <Meta title={`${item.title} #${item.tokenId}`} description={item?.rawMetadata?.attributes?.[1]?.value} />
          </Card>
        ))}

        {/* <div style={{ marginBottom: 20 }}>Backpack</div> */}
        {/* {write&&'can write'} */}
       
      </Modal>
    </>
  );
};