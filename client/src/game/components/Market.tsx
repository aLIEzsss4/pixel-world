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


export default function Market() {
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


  useEffect(() => {

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

  

  const getImg = (url) => {
    if (!url) {
      return '';
    }
    if (url.includes("https://ipfs.io/ipfs/QmTFtJbt84F2Cxs9zuVLEc5PRFR18szdMnaDXTrCf6VYB6")) {
      return url.replace("https://ipfs.io/ipfs/QmTFtJbt84F2Cxs9zuVLEc5PRFR18szdMnaDXTrCf6VYB6", "https://ipfs.filebase.io/ipfs/QmTFtJbt84F2Cxs9zuVLEc5PRFR18szdMnaDXTrCf6VYB6/");
    }
    return url
  }

  return (
    <>

      <Modal title="Market" visible={isOpen} onOk={handleOk} onCancel={handleCancel} width={500}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)'
        }}>
          {nfts?.map((item) => (
            <Card
              key={item.tokenId}
              hoverable
              style={{ width: 150 }}
              cover={<img alt="nft" src={getImg(item?.media?.[0]?.gateway)} />}
              actions={[
                <div>Approve</div>,
                <div>Sell</div>,
              ]}
            >
              <Meta title={`#${item.tokenId}`} description={item?.rawMetadata?.attributes?.[1]?.value} />
            </Card>
          ))}
        </div>

     

      </Modal>
    </>
  );
};