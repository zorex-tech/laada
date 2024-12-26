// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Twitter } from "lucide-react";
// import { DiscordIcon } from "@/components/icons/DiscordIcon";
// import { TelegramIcon } from "@/components/icons/TelegramIcon";
// import { StacksIcon } from "@/components/icons/StacksIcon";
// import ConnectWallet, { userSession } from "@/components/ConnectWallet";
// import { truncateAddress } from "@/helpers/onboarding_helpers";

// interface Project {
//   id: string;
//   name: string;
//   description: string;
// }

// interface ProfileFormData {
//   name: string;
//   wallet_address: string;
//   total_rewards: number;
//   social_media: {
//     twitter: string;
//     discord: string;
//     telegram: string;
//   };
//   interested_projects: string[];
//   reward_data: Map<
//     string,
//     {
//       completed_tasks: number;
//       total_points: number;
//       pending_tasks: string[];
//     }
//   >;
// }

// export default function CreateProfile() {
//   const [formData, setFormData] = useState<ProfileFormData>({
//     name: "",
//     wallet_address: "",
//     total_rewards: 0,
//     social_media: {
//       twitter: "",
//       discord: "",
//       telegram: "",
//     },
//     interested_projects: [],
//     reward_data: new Map(),
//   });

//   const [availableProjects] = useState<Project[]>([
//     {
//       id: "1",
//       name: "Social Media Campaign",
//       description: "Boost social media presence",
//     },
//     {
//       id: "2",
//       name: "Community Growth",
//       description: "Expand Discord community",
//     },
//     {
//       id: "3",
//       name: "Content Creation",
//       description: "Create educational content",
//     },
//   ]);

//   const [socialConnections, setSocialConnections] = useState({
//     twitter: false,
//     discord: false,
//     telegram: false,
//   });

//   useEffect(() => {
//     if (userSession.isUserSignedIn()) {
//       const userData = userSession.loadUserData();
//       setFormData((prev) => ({
//         ...prev,
//         wallet_address: userData.profile.stxAddress.mainnet,
//       }));
//     }
//   }, []);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleProjectSelection = (projectId: string) => {
//     setFormData((prev) => {
//       const updatedProjects = prev.interested_projects.includes(projectId)
//         ? prev.interested_projects.filter((id) => id !== projectId)
//         : [...prev.interested_projects, projectId];

//       return {
//         ...prev,
//         interested_projects: updatedProjects,
//       };
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!userSession.isUserSignedIn()) {
//       alert("Please connect your wallet first");
//       return;
//     }

//     try {
//       // Here you would typically send the data to your backend
//       console.log("Submitting profile:", {
//         ...formData,
//         reward_data: Object.fromEntries(formData.reward_data),
//       });

//       // Initialize reward data for selected projects
//       const initialRewardData = new Map(
//         formData.interested_projects.map((projectId) => [
//           projectId,
//           {
//             completed_tasks: 0,
//             total_points: 0,
//             pending_tasks: [],
//           },
//         ])
//       );

//       setFormData((prev) => ({
//         ...prev,
//         reward_data: initialRewardData,
//       }));
//     } catch (error) {
//       console.error("Failed to create profile:", error);
//     }
//   };

//   const isWalletConnected = userSession.isUserSignedIn();

//   const connectSocial = async (
//     platform: "twitter" | "discord" | "telegram"
//   ) => {
//     try {
//       // Simulate OAuth connection
//       setSocialConnections((prev) => ({
//         ...prev,
//         [platform]: true,
//       }));

//       // Update social media handles after successful connection
//       setFormData((prev) => ({
//         ...prev,
//         social_media: {
//           ...prev.social_media,
//           [platform]: `@username_${platform}`, // This would come from OAuth
//         },
//       }));
//     } catch (error) {
//       console.error(`Failed to connect ${platform}:`, error);
//     }
//   };

//   return (
//     <motion.div
//       className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="px-6 py-4">
//           <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
//             Create Your Profile
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="name">Name (Optional)</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>

//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Social Accounts
//               </h3>
//               <div className="flex flex-col md:flex-row items-center gap-4">
//                 <button
//                   type="button"
//                   onClick={() => connectSocial("twitter")}
//                   className="w-64 md:w-auto flex-1 flex items-center gap-3 px-4 py-2.5 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg transition-colors"
//                   disabled={socialConnections.twitter}
//                 >
//                   <Twitter className="w-5 h-5" />
//                   <span className="font-medium">
//                     {socialConnections.twitter
//                       ? formData.social_media.twitter
//                       : "Twitter"}
//                   </span>
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => connectSocial("discord")}
//                   className="w-64 md:w-auto flex-1 flex items-center gap-3 px-4 py-2.5 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-lg transition-colors"
//                   disabled={socialConnections.discord}
//                 >
//                   <DiscordIcon className="w-5 h-5" />
//                   <span className="font-medium">
//                     {socialConnections.discord
//                       ? formData.social_media.discord
//                       : "Discord"}
//                   </span>
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => connectSocial("telegram")}
//                   className="w-64 md:w-auto flex-1 flex items-center gap-3 px-4 py-2.5 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-lg transition-colors"
//                   disabled={socialConnections.telegram}
//                 >
//                   <TelegramIcon className="w-5 h-5" />
//                   <span className="font-medium">
//                     {socialConnections.telegram
//                       ? formData.social_media.telegram
//                       : "Telegram"}
//                   </span>
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Blockchain Account
//               </h3>
//               <div className="flex justify-center">
//                 {isWalletConnected ? (
//                   <div className="w-64 p-4 bg-[#5546FF] text-white rounded-lg flex items-center justify-center gap-2">
//                     <StacksIcon className="w-5 h-5" />
//                     <span className="font-mono text-sm">
//                       {truncateAddress(formData.wallet_address)}
//                     </span>
//                   </div>
//                 ) : (
//                   <div className="w-64">
//                     <ConnectWallet />
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Interested Projects
//               </h3>
//               <div className="flex flex-col items-center gap-4">
//                 {availableProjects.map((project) => (
//                   <label
//                     key={project.id}
//                     className={`w-64 flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
//                       formData.interested_projects.includes(project.id)
//                         ? "border-purple-600 bg-purple-50"
//                         : "border-gray-200 hover:border-purple-300"
//                     }`}
//                   >
//                     <input
//                       type="checkbox"
//                       className="sr-only"
//                       checked={formData.interested_projects.includes(
//                         project.id
//                       )}
//                       onChange={() => handleProjectSelection(project.id)}
//                     />
//                     <div>
//                       <div className="font-medium text-gray-900">
//                         {project.name}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {project.description}
//                       </div>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div className="pt-4 flex justify-center">
//               <button
//                 type="submit"
//                 disabled={!isWalletConnected}
//                 className="w-64 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Create Profile
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Twitter } from "lucide-react";
import { DiscordIcon } from "@/components/icons/DiscordIcon";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { StacksIcon } from "@/components/icons/StacksIcon";
import ConnectWallet, { userSession } from "@/components/ConnectWallet";
import { truncateAddress } from "@/helpers/onboarding_helpers";

interface Project {
  id: string;
  name: string;
  description: string;
}

interface ProfileFormData {
  name: string;
  wallet_address: string;
  total_rewards: number;
  social_media: {
    twitter: string;
    discord: string;
    telegram: string;
  };
  interested_projects: string[];
  reward_data: Map<
    string,
    {
      completed_tasks: number;
      total_points: number;
      pending_tasks: string[];
    }
  >;
}

export default function CreateProfile() {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    wallet_address: "",
    total_rewards: 0,
    social_media: {
      twitter: "",
      discord: "",
      telegram: "",
    },
    interested_projects: [],
    reward_data: new Map(),
  });

  const [availableProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Social Media Campaign",
      description: "Boost social media presence",
    },
    {
      id: "2",
      name: "Community Growth",
      description: "Expand Discord community",
    },
    {
      id: "3",
      name: "Content Creation",
      description: "Create educational content",
    },
  ]);

  const [socialConnections, setSocialConnections] = useState({
    twitter: false,
    discord: false,
    telegram: false,
  });

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setFormData((prev) => ({
        ...prev,
        wallet_address: userData.profile.stxAddress.mainnet,
      }));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProjectSelection = (projectId: string) => {
    setFormData((prev) => {
      const updatedProjects = prev.interested_projects.includes(projectId)
        ? prev.interested_projects.filter((id) => id !== projectId)
        : [...prev.interested_projects, projectId];

      return {
        ...prev,
        interested_projects: updatedProjects,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSession.isUserSignedIn()) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      // Here you would typically send the data to your backend
      console.log("Submitting profile:", {
        ...formData,
        reward_data: Object.fromEntries(formData.reward_data),
      });

      // Initialize reward data for selected projects
      const initialRewardData = new Map(
        formData.interested_projects.map((projectId) => [
          projectId,
          {
            completed_tasks: 0,
            total_points: 0,
            pending_tasks: [],
          },
        ])
      );

      setFormData((prev) => ({
        ...prev,
        reward_data: initialRewardData,
      }));
    } catch (error) {
      console.error("Failed to create profile:", error);
    }
  };

  const isWalletConnected = userSession.isUserSignedIn();

  const connectSocial = async (
    platform: "twitter" | "discord" | "telegram"
  ) => {
    try {
      // Simulate OAuth connection
      setSocialConnections((prev) => ({
        ...prev,
        [platform]: true,
      }));

      // Update social media handles after successful connection
      setFormData((prev) => ({
        ...prev,
        social_media: {
          ...prev.social_media,
          [platform]: `@username_${platform}`, // This would come from OAuth
        },
      }));
    } catch (error) {
      console.error(`Failed to connect ${platform}:`, error);
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
            Create Your Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name (Optional)</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Social Accounts
              </h3>
              <div className="flex flex-col md:flex-row gap-4 flex-wrap">
                <button
                  type="button"
                  onClick={() => connectSocial("twitter")}
                  className="w-64 md:w-auto flex-1 flex items-center gap-3 px-4 py-2.5 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg transition-colors"
                  disabled={socialConnections.twitter}
                >
                  <Twitter className="w-5 h-5" />
                  <span className="font-medium">
                    {socialConnections.twitter
                      ? formData.social_media.twitter
                      : "Twitter"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => connectSocial("discord")}
                  className="w-64 md:w-auto flex-1 flex items-center gap-3 px-4 py-2.5 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-lg transition-colors"
                  disabled={socialConnections.discord}
                >
                  <DiscordIcon className="w-5 h-5" />
                  <span className="font-medium">
                    {socialConnections.discord
                      ? formData.social_media.discord
                      : "Discord"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => connectSocial("telegram")}
                  className="w-64 md:w-auto flex-1 flex items-center gap-3 px-4 py-2.5 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-lg transition-colors"
                  disabled={socialConnections.telegram}
                >
                  <TelegramIcon className="w-5 h-5" />
                  <span className="font-medium">
                    {socialConnections.telegram
                      ? formData.social_media.telegram
                      : "Telegram"}
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Blockchain Account
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                {isWalletConnected ? (
                  <div className="w-64 p-4 bg-[#5546FF] text-white rounded-lg flex items-center justify-center gap-2">
                    <StacksIcon className="w-5 h-5" />
                    <span className="font-mono text-sm">
                      {truncateAddress(formData.wallet_address)}
                    </span>
                  </div>
                ) : (
                  <div className="w-64">
                    <ConnectWallet />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Interested Projects
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-4">
                {availableProjects.map((project) => (
                  <label
                    key={project.id}
                    className={`w-full md:w-auto flex-1 flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      formData.interested_projects.includes(project.id)
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={formData.interested_projects.includes(
                        project.id
                      )}
                      onChange={() => handleProjectSelection(project.id)}
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {project.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {project.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={!isWalletConnected}
                className="w-64 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
