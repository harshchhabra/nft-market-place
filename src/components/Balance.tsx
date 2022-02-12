/* eslint-disable no-nested-ternary */
import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

import logger from "../logger";

export function Balance() {
  const { account, library, chainId } = useWeb3React();
  const [balance, setBalance] = useState<number | null>();

  useEffect((): any => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((accountBalance: any) => {
          if (!stale) {
            setBalance(accountBalance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
    return () => {
      logger.warn("Balance component not initialized");
    };
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <div className="sc-btn-top mg-r-12" id="site-header">
      <a
        href="connect-wallet.html"
        id="connectbtn"
        className="sc-button header-slider style style-1 wallet fl-button pri-1"
      >
        <span>
          {balance === null ? "Error" : balance ? `$${Number(formatEther(balance)).toFixed(2)} USD` : "Wallet connect"}
        </span>
      </a>
    </div>
  );
}

export default Balance;
