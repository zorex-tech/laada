// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { PlusIcon } from "@heroicons/react/24/outline";
// import { userSession } from "@/components/ConnectWallet";

// interface Project {
//   id: string;
//   name: string;
//   description: string;
//   reward: number;
//   endDate: string;
// }

// export default function Projects() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [projects, setProjects] = useState<Project[]>([
//     {
//       id: "1",
//       name: "Social Media Boost",
//       description: "Increase engagement on our latest product launch",
//       reward: 1000,
//       endDate: "2023-12-31",
//     },
//     {
//       id: "2",
//       name: "Community Growth",
//       description: "Expand our Discord community",
//       reward: 500,
//       endDate: "2023-11-30",
//     },
//     // Add more mock projects as needed
//   ]);

//   useEffect(() => {
//     setIsAuthenticated(userSession.isUserSignedIn());
//   }, []);

//   if (!isAuthenticated) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
//         <h1 className="text-3xl font-bold text-purple-600 mb-6">Projects</h1>
//         <p className="text-xl text-gray-600 mb-8">
//           Please connect your wallet to view projects.
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
//             Projects
//           </h1>
//           <p className="mt-2 text-sm text-gray-700">
//             A list of all the projects in the Laada Protocol.
//           </p>
//         </div>
//         <div className="mt-4 sm:mt-0">
//           <Link
//             href="/projects/create"
//             className="inline-flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//           >
//             <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
//             New Project
//           </Link>
//         </div>
//       </div>
//       <div className="mt-8 flow-root">
//         <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="inline-block min-w-full py-2 align-middle">
//             <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
//               <div className="min-w-full divide-y divide-gray-300">
//                 <div className="bg-gray-50 hidden sm:flex">
//                   <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-1/3">
//                     Name
//                   </div>
//                   <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/3">
//                     Reward (STX)
//                   </div>
//                   <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/3">
//                     End Date
//                   </div>
//                 </div>
//                 <div className="divide-y divide-gray-200 bg-white">
//                   {projects.map((project) => (
//                     <motion.div
//                       key={project.id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.3 }}
//                       className="flex flex-col sm:flex-row hover:bg-gray-50"
//                     >
//                       <div className="py-4 pl-4 pr-3 text-sm sm:w-1/3">
//                         <div className="font-medium text-gray-900">
//                           {project.name}
//                         </div>
//                         <div className="text-gray-500 mt-1 sm:hidden">
//                           {project.description}
//                         </div>
//                       </div>
//                       <div className="px-3 py-4 text-sm text-gray-500 sm:w-1/3">
//                         <div className="sm:hidden font-medium text-gray-900">
//                           Reward:
//                         </div>
//                         {project.reward} STX
//                       </div>
//                       <div className="px-3 py-4 text-sm text-gray-500 sm:w-1/3">
//                         <div className="sm:hidden font-medium text-gray-900">
//                           End Date:
//                         </div>
//                         {project.endDate}
//                       </div>
//                       <div className="px-3 py-4 text-sm font-medium text-right sm:w-auto">
//                         <Link
//                           href={`/projects/${project.id}`}
//                           className="text-purple-600 hover:text-purple-900"
//                         >
//                           Edit<span className="sr-only">, {project.name}</span>
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

interface Project {
  id: string;
  name: string;
  description: string;
  reward: number;
  endDate: string;
}

export default function Projects() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Social Media Boost",
      description: "Increase engagement on our latest product launch",
      reward: 1000,
      endDate: "2023-12-31",
    },
    {
      id: "2",
      name: "Community Growth",
      description: "Expand our Discord community",
      reward: 500,
      endDate: "2023-11-30",
    },
    // Add more mock projects as needed
  ]);

  useEffect(() => {
    setIsAuthenticated(userSession.isUserSignedIn());
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">Projects</h1>
        <p className="text-xl text-gray-600 mb-8">
          Please connect your wallet to view projects.
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
              Projects
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the projects in the Laada Protocol.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/projects/create"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Project
            </Link>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <div className="min-w-full divide-y divide-gray-300">
                  <div className="bg-gray-50 hidden sm:flex">
                    <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-1/3">
                      Name
                    </div>
                    <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/3">
                      Reward (STX)
                    </div>
                    <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/3">
                      End Date
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200 bg-white">
                    {projects.map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col sm:flex-row hover:bg-gray-50"
                      >
                        <div className="py-4 pl-4 pr-3 text-sm sm:w-1/3">
                          <div className="font-medium text-gray-900">
                            {project.name}
                          </div>
                          <div className="text-gray-500 mt-1 sm:hidden">
                            {project.description}
                          </div>
                        </div>
                        <div className="px-3 py-4 text-sm text-gray-500 sm:w-1/3">
                          <div className="sm:hidden font-medium text-gray-900">
                            Reward:
                          </div>
                          {project.reward} STX
                        </div>
                        <div className="px-3 py-4 text-sm text-gray-500 sm:w-1/3">
                          <div className="sm:hidden font-medium text-gray-900">
                            End Date:
                          </div>
                          {project.endDate}
                        </div>
                        <div className="px-3 py-4 text-sm font-medium text-right sm:w-auto">
                          <Link
                            href={`/projects/${project.id}`}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            Edit
                            <span className="sr-only">, {project.name}</span>
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
