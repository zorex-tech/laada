// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { PlusIcon } from "@heroicons/react/24/outline";
// import { userSession } from "@/components/ConnectWallet";

// interface Campaign {
//   id: string;
//   name: string;
//   project: string;
//   status: "active" | "completed" | "pending";
//   participants: number;
//   reward: number;
// }

// export default function Campaigns() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [campaigns, setCampaigns] = useState<Campaign[]>([
//     {
//       id: "1",
//       name: "Twitter Engagement Boost",
//       project: "Social Media Boost",
//       status: "active",
//       participants: 150,
//       reward: 500,
//     },
//     {
//       id: "2",
//       name: "Discord Community Growth",
//       project: "Community Growth",
//       status: "pending",
//       participants: 0,
//       reward: 250,
//     },
//     {
//       id: "3",
//       name: "Product Launch Hype",
//       project: "Social Media Boost",
//       status: "completed",
//       participants: 300,
//       reward: 1000,
//     },
//     // Add more mock campaigns as needed
//   ]);

//   useEffect(() => {
//     setIsAuthenticated(userSession.isUserSignedIn());
//   }, []);

//   const statusColor = (status: string) => {
//     switch (status) {
//       case "active":
//         return "text-green-800 bg-green-100";
//       case "completed":
//         return "text-gray-800 bg-gray-100";
//       case "pending":
//         return "text-yellow-800 bg-yellow-100";
//       default:
//         return "text-gray-800 bg-gray-100";
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
//         <h1 className="text-3xl font-bold text-purple-600 mb-6">Campaigns</h1>
//         <p className="text-xl text-gray-600 mb-8">
//           Please connect your wallet to view campaigns.
//         </p>
//         <Link
//           href="/"
//           className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//         >
//           Go to Home
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="sm:flex sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
//             Campaigns
//           </h1>
//           <p className="mt-2 text-sm text-gray-700">
//             A list of all the campaigns in the Laada Protocol.
//           </p>
//         </div>
//         <div className="mt-4 sm:mt-0">
//           <Link
//             href="/campaigns/create"
//             className="inline-flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//           >
//             <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
//             New Campaign
//           </Link>
//         </div>
//       </div>
//       <div className="mt-8 flow-root">
//         <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="inline-block min-w-full py-2 align-middle">
//             <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
//               <div className="min-w-full divide-y divide-gray-300">
//                 <div className="bg-gray-50 hidden sm:flex">
//                   <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-1/4">
//                     Name
//                   </div>
//                   <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/4">
//                     Status
//                   </div>
//                   <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/4">
//                     Participants
//                   </div>
//                   <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/4">
//                     Reward (STX)
//                   </div>
//                 </div>
//                 <div className="divide-y divide-gray-200 bg-white">
//                   {campaigns.map((campaign) => (
//                     <motion.div
//                       key={campaign.id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.3 }}
//                       className="flex flex-col sm:flex-row hover:bg-gray-50"
//                     >
//                       <div className="py-4 pl-4 pr-3 text-sm sm:w-1/4">
//                         <div className="font-medium text-gray-900">
//                           {campaign.name}
//                         </div>
//                         <div className="text-gray-500 mt-1 sm:hidden">
//                           {campaign.project}
//                         </div>
//                       </div>
//                       <div className="px-3 py-4 text-sm sm:w-1/4">
//                         <div className="sm:hidden font-medium text-gray-900">
//                           Status:
//                         </div>
//                         <span
//                           className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColor(
//                             campaign.status
//                           )}`}
//                         >
//                           {campaign.status.charAt(0).toUpperCase() +
//                             campaign.status.slice(1)}
//                         </span>
//                       </div>
//                       <div className="px-3 py-4 text-sm text-gray-500 sm:w-1/4">
//                         <div className="sm:hidden font-medium text-gray-900">
//                           Participants:
//                         </div>
//                         {campaign.participants}
//                       </div>
//                       <div className="px-3 py-4 text-sm text-gray-500 sm:w-1/4">
//                         <div className="sm:hidden font-medium text-gray-900">
//                           Reward:
//                         </div>
//                         {campaign.reward} STX
//                       </div>
//                       <div className="px-3 py-4 text-sm font-medium text-right sm:w-auto">
//                         <Link
//                           href={`/campaigns/${campaign.id}`}
//                           className="text-purple-600 hover:text-purple-900"
//                         >
//                           View<span className="sr-only">, {campaign.name}</span>
//                         </Link>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";
import { userSession } from "@/components/ConnectWallet";
import ConnectWallet from "@/components/ConnectWallet";

interface Campaign {
  id: string;
  name: string;
  project: string;
  status: "active" | "completed" | "pending";
  participants: number;
  reward: number;
}

export default function Campaigns() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Twitter Engagement Boost",
      project: "Social Media Boost",
      status: "active",
      participants: 150,
      reward: 500,
    },
    {
      id: "2",
      name: "Discord Community Growth",
      project: "Community Growth",
      status: "pending",
      participants: 0,
      reward: 250,
    },
    {
      id: "3",
      name: "Product Launch Hype",
      project: "Social Media Boost",
      status: "completed",
      participants: 300,
      reward: 1000,
    },
    // Add more mock campaigns as needed
  ]);

  useEffect(() => {
    setIsAuthenticated(userSession.isUserSignedIn());
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-800 bg-green-100";
      case "completed":
        return "text-gray-800 bg-gray-100";
      case "pending":
        return "text-yellow-800 bg-yellow-100";
      default:
        return "text-gray-800 bg-gray-100";
    }
  };

    if (!isAuthenticated) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold text-purple-600 mb-6">Campaigns</h1>
          <p className="text-xl text-gray-600 mb-8">
            Please connect your wallet to view campaigns.
          </p>
          <ConnectWallet />
        </div>
      );
    }

  if (isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Campaigns
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the campaigns in the Laada Protocol.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/campaigns/create"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Campaign
            </Link>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <div className="min-w-full divide-y divide-gray-300">
                  <div className="bg-gray-50 hidden sm:flex">
                    <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-1/4">
                      Name
                    </div>
                    <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/4">
                      Status
                    </div>
                    <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/4">
                      Participants
                    </div>
                    <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/4">
                      Reward (STX)
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200 bg-white">
                    {campaigns.map((campaign) => (
                      <motion.div
                        key={campaign.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col sm:flex-row hover:bg-gray-50"
                      >
                        <div className="py-4 pl-4 pr-3 text-sm sm:w-1/4">
                          <div className="font-medium text-gray-900">
                            {campaign.name}
                          </div>
                          <div className="text-gray-500 mt-1 sm:hidden">
                            {campaign.project}
                          </div>
                        </div>
                        <div className="px-3 py-4 text-sm sm:w-1/4">
                          <div className="sm:hidden font-medium text-gray-900">
                            Status:
                          </div>
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColor(
                              campaign.status
                            )}`}
                          >
                            {campaign.status.charAt(0).toUpperCase() +
                              campaign.status.slice(1)}
                          </span>
                        </div>
                        <div className="px-3 py-4 text-sm text-gray-500 sm:w-1/4">
                          <div className="sm:hidden font-medium text-gray-900">
                            Participants:
                          </div>
                          {campaign.participants}
                        </div>
                        <div className="px-3 py-4 text-sm text-gray-500 sm:w-1/4">
                          <div className="sm:hidden font-medium text-gray-900">
                            Reward:
                          </div>
                          {campaign.reward} STX
                        </div>
                        <div className="px-3 py-4 text-sm font-medium text-right sm:w-auto">
                          <Link
                            href={`/campaigns/${campaign.id}`}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            View
                            <span className="sr-only">, {campaign.name}</span>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
