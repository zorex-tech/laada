// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="text-center">
//       <h1 className="text-4xl font-bold text-purple-600 mb-6">
//         Welcome to Laada Protocol
//       </h1>
//       <p className="text-xl mb-8">
//         Decentralized Social Media Campaigns and Rewards
//       </p>
//       <div className="space-x-4">
//         <Link
//           href="/projects/create"
//           className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors"
//         >
//           Create Campaign
//         </Link>
//         <Link
//           href="/profile"
//           className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-colors"
//         >
//           Create Profile
//         </Link>
//       </div>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <motion.h1
                className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="block xl:inline">Welcome to</span>{" "}
                <span className="block text-purple-600 xl:inline">
                  Laada Protocol
                </span>
              </motion.h1>
              <motion.p
                className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Decentralized Social Media Campaigns and Rewards
              </motion.p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link
                    href="/projects/create"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
                  >
                    Create Campaign
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link
                    href="/profile/create"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 md:py-4 md:text-lg md:px-10 mt-3 sm:mt-0 sm:ml-3"
                  >
                    Create Profile
                  </Link>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-r from-purple-500 to-teal-500 opacity-25"></div>
      </div>
    </div>
  );
}
