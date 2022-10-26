import { useAppDispatch, useAppSelector } from '../hooks'
import { setOpen } from '../stores/NFTBalanceStore'

import { useAccount, useContractWrite, useContractReads } from 'wagmi'

import { Modal, Card, Tooltip,Input } from 'antd';
import { useEffect, useState } from 'react';

import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: "iUC0GH6CW_qfRxEzlipX-obRqJZRcnfg", // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const { Meta } = Card;

const ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "AlreadyListed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "buyItem",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "cancelListing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "listItem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "NotApprovedForMarketplace",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "NotListed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "PriceMustBeAboveZero",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "PriceNotMet",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "ItemBought",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ItemCanceled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "ItemListed",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newPrice",
        "type": "uint256"
      }
    ],
    "name": "updateListing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allList",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getListing",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "seller",
            "type": "address"
          }
        ],
        "internalType": "struct NftMarketplace.Listing",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "s_listings",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
export default function NFTBalance() {
  const { address, } = useAccount()
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state) => state.nftBalance.open)

  const [nfts, setNfts] = useState([])
  const [nftToSell, setNftToSell] = useState()
  const [price, setPrice] = useState<any>()

  const nftAddrs ='0x6a7a605e8ae80266bafaf349cc8f95d9f3c651a3'

  const { write,isLoading,data,isSuccess } = useContractWrite({
    addressOrName: '0xf6e2c371fdfBD409c523c25c13bC61DC17321801',
    contractInterface: ABI,
    functionName: 'listItem',
    args:[
      nftAddrs,
      nftToSell,
      price
    ]
    // writeAsync:false
  })

  const { write: setApprovalForAllFn, isLoading: setApprovalForAllLoading, } = useContractWrite({
    addressOrName: nftAddrs,
    contractInterface: [{ "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
    functionName: 'setApprovalForAll',
    args:['0xf6e2c371fdfBD409c523c25c13bC61DC17321801',true]
  })

   const wagmigotchiContract = {
     addressOrName: '0xf6e2c371fdfBD409c523c25c13bC61DC17321801',
    contractInterface: ABI,
  }

   const { data:lists, isError, isLoading:listLoading } = useContractReads({
    contracts: [
      {
        ...wagmigotchiContract,
        functionName: 'getListing',
        args: [nftAddrs,'0']
      },
      {
        ...wagmigotchiContract,
        functionName: 'getListing',
        args: [nftAddrs,'1']
      },
    ],
  })


  const getNFTs = async (addr) => {
    const data = await alchemy.nft.getNftsForOwner(addr, {
      contractAddresses: [nftAddrs]
    });
    // Print NFTs
    console.log(data);
    setNfts(data?.ownedNfts)
  }

  useEffect(()=>{
    console.log(lists)
  }, [lists])

  useEffect(()=>{
    if (isSuccess){
      setNftToSell(null)
      setPrice(null)
    }

  }, [isSuccess])


  useEffect( () => {

    if (isOpen) {
     getNFTs(address)
    }


  }, [address, isOpen])





  const showModal = () => {
    dispatch(setOpen(true));
  };

  const handleOk = () => {
    dispatch(setOpen(false));

  };

  const handleCancel = () => {
    // setIsModalVisible(false);
    dispatch(setOpen(false));

  };

  const ApproveFn=()=>  {
    setApprovalForAllFn?.()
  }

  const BugFn=()=>{
    write?.()

  }

  // const setSell=()=>{
  //   setNftToSell()
  // }

  const getImg=(url)=>{
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

      <Modal title="Backpack" visible={isOpen} onOk={handleOk}  onCancel={handleCancel} width={500}>
        <div style={{
          display: 'grid',
          gridTemplateColumns:'repeat(3, 1fr)',
          gridGap: '10px',
          justifyItems: 'center',
          alignItems: 'stretch',
          justifyContent: 'center'
        }}>
        {nfts?.map((item)=>(
          <Card
            key={item.tokenId}
            hoverable
            style={{ width: 150 }}
            cover={<img alt="nft" src={getImg(item?.media?.[0]?.gateway)} />}
            actions={[
              <div onClick={ApproveFn}>Approve</div>,
              <div onClick={() =>setNftToSell(item.tokenId)}>Sell</div>,
            ]}
          >
            <Meta title={`#${item.tokenId}`} description={<Tooltip>{item?.rawMetadata?.attributes?.[1]?.value}</Tooltip> } />
          </Card>
        ))}
        </div>

        {/* <div style={{ marginBottom: 20 }}>Backpack</div> */}
        {/* {write&&'can write'} */}
       
      </Modal>

      {
        (
          <Modal  visible={!!(nftToSell)} onOk={BugFn}  onCancel={()=>setNftToSell(null)} >
            <Input autoFocus
              placeholder={`Listing Price}`}
              onChange={(e) => setPrice(e.target.value)} />
          </Modal>
        )
      }

      
    </>
  );
};