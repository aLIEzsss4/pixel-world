import { useAppDispatch, useAppSelector } from '../hooks'
import { setOpen } from '../stores/FishingStore'

import { useContractWrite,  } from 'wagmi'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'


import {  Modal,Carousel } from 'antd';
import { useEffect } from 'react';

const ABI = [{
  "inputs": [],
  "name": "mint",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "requestId",
      "type": "uint256"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
}]

export default function CreatFishNFT() {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state) => state.fishing.open)
  const game = phaserGame.scene.keys.game as Game

 

  const { write,isLoading,data,isSuccess } = useContractWrite({
    addressOrName: '0x6a7a605e8ae80266bafaf349cc8f95d9f3c651a3',
    contractInterface: ABI,
    functionName: 'mint',
    // writeAsync:false
  })

  useEffect(()=>{
    if (isSuccess){
    dispatch(setOpen(false));

    }

  }, [isSuccess])


  // useEffect(()=>{
  //   if(!game) return
  //   if(isOpen){
  //     game.disableKeys()
  //   }else{
  //     game.enableKeys()
  //     game.setMoving(false)
  //   }

  // }, [isOpen, game])

  

  const showModal = () => {
    dispatch(setOpen(true));
  };

  const handleOk = () => {
    write?.()
    // dispatch(setOpen(false));

  };

  const handleCancel = () => {
    // setIsModalVisible(false);
    dispatch(setOpen(false));
    // game.enableKeys()

  };

  const settings = {
    dots: false,
    autoplaySpeed:50,
    className: "center",
    centerMode: true,
    infinite: true,
    easing:'easeOutQuint',
    slidesToShow: 4,
  }

  return (
    <>
      
      <Modal title="Start Fishing" visible={isOpen} onOk={handleOk} onCancel={handleCancel}>
       
        <div style={{marginBottom:20}}> Get a fish randomly (1/10)</div>
        {/* {write&&'can write'} */}
        {isLoading && <div>processing</div>}
        <Carousel autoplay   {...settings}>
            {Array(10).fill(0).map((_,i)=>{
              return(<div key={i}>
                <img style={{
                width: '100px',
                height: '100px',
              }} src={`https://ipfs.filebase.io/ipfs/QmTFtJbt84F2Cxs9zuVLEc5PRFR18szdMnaDXTrCf6VYB6/${i+1}.jpg`} />
              </div> 
              )
            })}
         
        </Carousel>
      </Modal>
    </>
  );
};