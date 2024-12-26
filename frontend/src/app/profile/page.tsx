// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { userSession } from "@/components/ConnectWallet";

// export default function Profile() {
//   const [profile, setProfile] = useState({
//     name: "",
//     socials: {
//       twitter: "",
//       telegram: "",
//       discord: "",
//     },
//     projects: [""],
//   });

//   useEffect(() => {
//     if (userSession.isUserSignedIn()) {
//       setProfile({
//         name: "John Doe",
//         socials: {
//           twitter: "@johndoe",
//           telegram: "@johndoe",
//           discord: "johndoe#1234",
//         },
//         projects: ["Project A", "Project B"],
//       });
//     }
//   }, []);

//   if (!userSession.isUserSignedIn()) {
//     return (
//       <motion.div
//         className="text-center"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="text-3xl font-bold text-purple-600 mb-6">Profile</h1>
//         <p className="text-gray-600">
//           Please connect your wallet to view your profile.
//         </p>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h1 className="text-3xl font-bold text-purple-600 mb-6">Profile</h1>
//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         <div className="px-4 py-5 sm:px-6">
//           <h3 className="text-lg leading-6 font-medium text-gray-900">
//             User Information
//           </h3>
//         </div>
//         <div className="border-t border-gray-200">
//           <dl>
//             <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500">Name</dt>
//               <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                 {profile.name}
//               </dd>
//             </div>
//             {Object.entries(profile.socials).map(
//               ([platform, handle], index) => (
//                 <div
//                   key={platform}
//                   className={`${
//                     index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                   } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
//                 >
//                   <dt className="text-sm font-medium text-gray-500 capitalize">
//                     {platform}
//                   </dt>
//                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                     {handle}
//                   </dd>
//                 </div>
//               )
//             )}
//             <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500">Projects</dt>
//               <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                 <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
//                   {profile.projects.map((project, index) => (
//                     <li
//                       key={index}
//                       className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
//                     >
//                       <div className="w-0 flex-1 flex items-center">
//                         <span className="ml-2 flex-1 w-0 truncate">
//                           {project}
//                         </span>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </dd>
//             </div>
//           </dl>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { userSession } from "@/components/ConnectWallet";
import ConnectWallet from "@/components/ConnectWallet";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    socials: {
      twitter: "",
      telegram: "",
      discord: "",
    },
    projects: [""],
  });

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setProfile({
        name: "John Doe",
        socials: {
          twitter: "@johndoe",
          telegram: "@johndoe",
          discord: "johndoe#1234",
        },
        projects: ["Project A", "Project B"],
      });
    }
  }, []);

  const isAuthenticated = userSession.isUserSignedIn();

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">Profile</h1>
        <p className="text-xl text-gray-600 mb-8">
          Please connect your wallet to view your profile.
        </p>
        <ConnectWallet />
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Profile</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Information
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {profile.name}
              </dd>
            </div>
            {Object.entries(profile.socials).map(
              ([platform, handle], index) => (
                <div
                  key={platform}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                >
                  <dt className="text-sm font-medium text-gray-500 capitalize">
                    {platform}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {handle}
                  </dd>
                </div>
              )
            )}
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Projects</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {profile.projects.map((project, index) => (
                    <li
                      key={index}
                      className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                    >
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">
                          {project}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </motion.div>
  );
}
