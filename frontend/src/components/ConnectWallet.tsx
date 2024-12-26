"use client";

import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: "Laada Protocol",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
}

const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && userSession.isUserSignedIn()) {
    return (
      <div className="Container">
        <button       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
 onClick={disconnect}>
          Disconnect Wallet
        </button>
      </div>
    );
  }

  return (
    <button       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
 onClick={authenticate}>
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;

// "use client";

// import { useState } from "react";

// export const userSession = {
//   isUserSignedIn: () => {
//     // Placeholder for actual user session check
//     return false;
//   },
//   signUserIn: () => {
//     // Placeholder for actual sign-in logic
//     console.log("User signed in");
//   },
//   signUserOut: () => {
//     // Placeholder for actual sign-out logic
//     console.log("User signed out");
//   },
// };

// export default function ConnectWallet() {
//   const [isSignedIn, setIsSignedIn] = useState(userSession.isUserSignedIn());

//   const handleAuth = () => {
//     if (isSignedIn) {
//       userSession.signUserOut();
//       setIsSignedIn(false);
//     } else {
//       userSession.signUserIn();
//       setIsSignedIn(true);
//     }
//   };

//   return (
//     <button
//       onClick={handleAuth}
//       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//     >
//       {isSignedIn ? "Disconnect Wallet" : "Connect Wallet"}
//     </button>
//   );
// }
