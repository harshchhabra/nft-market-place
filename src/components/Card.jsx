/* eslint-disable jsx-a11y/anchor-is-valid */
import Web3 from "web3";
import Image from 'next/image';
import { useWeb3React } from "@web3-react/core";
import Web3EthContract from "web3-eth-contract";
import Author from "../../assets/avatar/avt-11.jpg";

let nftOwner;
let account;

function trasferNFT(abi, address, tokenId) {

    const tokenContract = new Web3EthContract(abi, address);
    tokenContract.setProvider('https://speedy-nodes-nyc.moralis.io/036063875a28828fa0c00596/polygon/mumbai');

    tokenContract.methods.transferOwnership(account.account).send({
        from: account.account,
    })
}

function getNFTOwner(abi, address) {

    const tokenContract = new Web3EthContract(abi, address);
    tokenContract.setProvider('https://speedy-nodes-nyc.moralis.io/036063875a28828fa0c00596/polygon/mumbai');

    tokenContract.methods.owner().call().then(result => {
        nftOwner = result;
    });

}

export default function Card(props) {
    const { contractAbi, contractAddress, image, name } = props;
    getNFTOwner(contractAbi, contractAddress);
    account = useWeb3React();
    
    return (
        <div className="swiper-slide">
            <div className="slider-item">
                <div className="sc-card-product">
                <div className="card-media">
                    <a href="#">
                    <Image src={image} height="200" width="200" alt="Image" />
                    </a>
                    <button className="wishlist-button heart">
                    <span className="number-like"> 100</span>
                    </button>
                    <div className="featured-countdown">
                    <span className="slogan"></span>
                    <span className="js-countdown" data-timer="516400" data-labels=" :  ,  : , : , "></span>
                    </div>
                    <div className="button-place-bid">
                    <a
                        href="#"
                        data-toggle="modal"
                        data-target="#popup_bid"
                        className="sc-button style-place-bid style bag fl-button pri-3"
                    >
                        <span>Place Bid</span>
                    </a>
                    </div>
                </div>
                <div className="card-title">
                    <h5>
                    <a href="item-details.html">{name}</a>
                    </h5>
                    <div className="tags">bsc</div>
                </div>
                <div className="meta-info">
                    <div className="author">
                    <div className="avatar">
                        <Image src={Author} alt="Image" />
                    </div>
                    <div className="info">
                        <span>Creator</span>
                        <h6>
                        {" "}
                        <a href="author02.html">SalvadorDali</a>{" "}
                        </h6>
                    </div>
                    </div>
                    <div className="price">
                    <span>Current Bid</span>
                    <h5> 4.89 ETH</h5>
                    </div>
                </div>
                </div>
            </div>
            </div>
        // <MDBCard style={{ maxWidth: '42rem', backgroundColor: '#222222' }}>
        //     <MDBCardImage src={props.image} position='top' alt='...' />
        //     <MDBCardBody>
        //         <MDBCardTitle>{props.name}</MDBCardTitle>
        //         <MDBCardText>
        //             {props.description}
        //         </MDBCardText>
        //         <hr />
        //         <div style={style}>
        //             {/* Owner: {nftOwner} */}
        //             <br />
        //         </div>
        //         <br />
        //         <MDBBtn onClick={() => {
        //             trasferNFT(props.contractAbi, props.contractAddress, props.tokenID);
        //         }}>Buy NFT</MDBBtn>
        //     </MDBCardBody>
        // </MDBCard>
    );
}