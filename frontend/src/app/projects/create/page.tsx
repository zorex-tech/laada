// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { userSession } from "@/components/ConnectWallet";
// import ConnectWallet from "@/components/ConnectWallet";
// import { StacksIcon } from "@/components/icons/StacksIcon";
// import { TelegramIcon } from "@/components/icons/TelegramIcon";
// import { DiscordIcon } from "@/components/icons/DiscordIcon";
// import { Twitter } from "lucide-react";
// import { truncateAddress } from "@/helpers/onboarding_helpers";
// import { signIn, useSession } from "next-auth/react";

// declare global {
//   interface Window {
//     Telegram?: {
//       Login: {
//         auth: (options: any, callback: (user: any) => void) => void;
//       };
//     };
//   }
// }

// export default function CreateCampaign() {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [formData, setFormData] = useState({
//     projectName: "",
//     reward: "",
//     endDate: "",
//     wallet_address: "",
//     socials: {
//       twitter: "",
//       telegram: "",
//       discord: "",
//     },
//     rewardableActions: {
//       follow: false,
//       comment: false,
//       like: false,
//       repost: false,
//     },
//   });

//   const [socialConnections, setSocialConnections] = useState({
//     twitter: false,
//     discord: false,
//     telegram: false,
//   });

//   const [stxAdded, setStxAdded] = useState(false);

//   const isWalletConnected = userSession.isUserSignedIn();

//   useEffect(() => {
//     if (userSession.isUserSignedIn()) {
//       const userData = userSession.loadUserData();
//       setFormData((prev) => ({
//         ...prev,
//         wallet_address: userData.profile.stxAddress.mainnet,
//       }));
//     }
//   }, []);

//   useEffect(() => {
//     if (session && session.provider) {
//       const provider = session.provider as keyof typeof socialConnections;
//       if (socialConnections.hasOwnProperty(provider)) {
//         setSocialConnections((prev) => ({ ...prev, [provider]: true }));
//         setFormData((prev) => ({
//           ...prev,
//           socials: {
//             ...prev.socials,
//             [provider]: session.user?.name || `@${provider}_user`,
//           },
//         }));
//       }
//     }
//   }, [session]);

//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   if (!hasMounted) {
//     return null;
//   }

//   const handleAddSTX = () => {
//     setStxAdded(true);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     if (name === "reward" && parseFloat(value) > 0) {
//       console.log("Value is greater than 0");
//       handleAddSTX();
//     } else {
//       setStxAdded(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     router.push("/projects");
//   };

//   const connectSocial = async (
//     provider: "twitter" | "discord" | "telegram"
//   ) => {
//     if (provider === "telegram") {
//       if (window.Telegram && window.Telegram.Login) {
//         window.Telegram.Login.auth(
//           { bot_id: process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID },
//           (user) => {
//             if (user) {
//               setSocialConnections((prev) => ({ ...prev, telegram: true }));
//               setFormData((prev) => ({
//                 ...prev,
//                 socials: {
//                   ...prev.socials,
//                   telegram: user.username || `@telegram_user`,
//                 },
//               }));
//             }
//           }
//         );
//       } else {
//         console.error("Telegram Login is not available");
//       }
//     } else {
//       try {
//         const result = await signIn(provider, { redirect: false });
//         if (result?.error) {
//           console.error(`Failed to connect ${provider}:`, result.error);
//         } else {
//           setSocialConnections((prev) => ({ ...prev, [provider]: true }));
//           setFormData((prev) => ({
//             ...prev,
//             socials: {
//               ...prev.socials,
//               [provider]: `@${provider}_user`, // You might want to get the actual username from the session
//             },
//           }));
//         }
//       } catch (error) {
//         console.error(`Failed to connect ${provider}:`, error);
//       }
//     }
//   };

//   const isFormValid =
//     isWalletConnected &&
//     (socialConnections.twitter ||
//       socialConnections.discord ||
//       socialConnections.telegram) &&
//     stxAdded;

//   return (
//     <motion.div
//       className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h1 className="text-3xl font-bold text-purple-600 mb-6">
//         Create Campaign
//       </h1>
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-6 bg-white shadow-md rounded-lg p-6"
//       >
//         {/* Project Name */}
//         <div className="space-y-2">
//           <Label htmlFor="projectName">Project Name</Label>
//           <Input
//             id="projectName"
//             name="projectName"
//             value={formData.projectName}
//             onChange={handleChange}
//             placeholder="Enter your project name"
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//           />
//         </div>
//         {/* Total Reward */}
//         <div className="space-y-2">
//           <Label htmlFor="reward">Total Reward (STX)</Label>
//           <Input
//             type="number"
//             id="reward"
//             name="reward"
//             value={formData.reward}
//             onChange={handleChange}
//             placeholder="Enter the total rewards you intend to give out"
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//           />
//         </div>
//         {/* End Date */}
//         <div className="space-y-2">
//           <Label htmlFor="endDate">End Date</Label>
//           <Input
//             type="date"
//             id="endDate"
//             name="endDate"
//             value={formData.endDate}
//             onChange={handleChange}
//             placeholder="Enter your campaign end date"
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//           />
//         </div>
//         {/* Social Accounts */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold text-gray-900">
//             Social Accounts
//           </h3>
//           <div className="flex flex-col md:flex-row items-center gap-4 flex-wrap">
//             <button
//               type="button"
//               onClick={() => connectSocial("twitter")}
//               className="w-full md:w-auto min-w-[256px] flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-[#1DA1F2] hover:bg-[#1a8cd8]"
//               disabled={socialConnections.twitter}
//             >
//               <Twitter className="w-5 h-5" />
//               <span className="font-medium">
//                 {socialConnections.twitter
//                   ? formData.socials.twitter
//                   : "Connect Twitter"}
//               </span>
//             </button>

//             <button
//               type="button"
//               onClick={() => connectSocial("discord")}
//               className="w-full md:w-auto min-w-[256px] flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-[#5865F2] hover:bg-[#4752c4]"
//               disabled={socialConnections.discord}
//             >
//               <DiscordIcon className="w-5 h-5" />
//               <span className="font-medium">
//                 {socialConnections.discord
//                   ? formData.socials.discord
//                   : "Connect Discord"}
//               </span>
//             </button>

//             <button
//               type="button"
//               onClick={() => connectSocial("telegram")}
//               className="w-full md:w-auto min-w-[256px] flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-[#0088cc] hover:bg-[#0077b3]"
//               disabled={socialConnections.telegram}
//             >
//               <TelegramIcon className="w-5 h-5" />
//               <span className="font-medium">
//                 {socialConnections.telegram
//                   ? formData.socials.telegram
//                   : "Connect Telegram"}
//               </span>
//             </button>
//           </div>
//         </div>
//         {/* Blockchain Account */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold text-gray-900">
//             Blockchain Account
//           </h3>
//           <div className="flex flex-col md:flex-row gap-4">
//             {isWalletConnected ? (
//               <div className="w-64 p-4 bg-[#5546FF] text-white rounded-lg flex items-center justify-center gap-2">
//                 <StacksIcon className="w-5 h-5" />
//                 <span className="font-mono text-sm">
//                   {truncateAddress(formData.wallet_address)}
//                 </span>
//               </div>
//             ) : (
//               <div className="w-64">
//                 <ConnectWallet />
//               </div>
//             )}
//           </div>
//         </div>
//         {/* Rewardable Actions */}
//         <div>
//           <h3 className="text-lg font-medium text-gray-700 mb-2">
//             Rewardable Actions
//           </h3>
//           <div className="space-y-2">
//             {Object.entries(formData.rewardableActions).map(
//               ([action, checked]) => (
//                 <div key={action} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={action}
//                     name={action}
//                     checked={checked}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
//                   />
//                   <label
//                     htmlFor={action}
//                     className="ml-2 block text-sm text-gray-700 capitalize"
//                   >
//                     {action}
//                   </label>
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//         {!isFormValid && (
//           <p className="text-red-500 text-sm text-center">
//             Please connect your wallet, add at least one social media account,
//             and add STX to create a campaign.
//           </p>
//         )}
//         {/* Create Campaign Button */}
//         <div className="pt-4 flex justify-center">
//           <button
//             type="submit"
//             disabled={!isFormValid}
//             className="w-64 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Create Campaign
//           </button>
//         </div>
//       </form>
//     </motion.div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { userSession } from "@/components/ConnectWallet";
import ConnectWallet from "@/components/ConnectWallet";
import { StacksIcon } from "@/components/icons/StacksIcon";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { DiscordIcon } from "@/components/icons/DiscordIcon";
import { Twitter } from "lucide-react";
import { truncateAddress } from "@/helpers/onboarding_helpers";
import { signIn, useSession } from "next-auth/react";

declare global {
  interface Window {
    Telegram?: {
      Login: {
        auth: (options: any, callback: (user: any) => void) => void;
      };
    };
  }
}

export default function CreateCampaign() {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    projectName: "",
    reward: "",
    endDate: "",
    wallet_address: "",
    socials: {
      twitter: "",
      telegram: "",
      discord: "",
    },
    rewardableActions: {
      follow: false,
      comment: false,
      like: false,
      repost: false,
    },
  });

  const [socialConnections, setSocialConnections] = useState({
    twitter: false,
    discord: false,
    telegram: false,
  });

  const [stxAdded, setStxAdded] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const isWalletConnected = userSession.isUserSignedIn();

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setFormData((prev) => ({
        ...prev,
        wallet_address: userData.profile.stxAddress.mainnet,
      }));
    }
  }, []);

  useEffect(() => {
    if (session && session.provider) {
      const provider = session.provider as keyof typeof socialConnections;
      if (socialConnections.hasOwnProperty(provider)) {
        setSocialConnections((prev) => ({ ...prev, [provider]: true }));
        setFormData((prev) => ({
          ...prev,
          socials: {
            ...prev.socials,
            [provider]: session.user?.name || `@${provider}_user`,
          },
        }));
      }
    }
  }, [session]);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const handleAddSTX = () => {
    setStxAdded(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "reward" && parseFloat(value) > 0) {
      console.log("Value is greater than 0");
      handleAddSTX();
    } else {
      setStxAdded(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    router.push("/projects");
  };

  const connectSocial = async (
    provider: "twitter" | "discord" | "telegram"
  ) => {
    if (provider === "telegram") {
      if (window.Telegram && window.Telegram.Login) {
        window.Telegram.Login.auth(
          { bot_id: process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID },
          (user) => {
            if (user) {
              setSocialConnections((prev) => ({ ...prev, telegram: true }));
              setFormData((prev) => ({
                ...prev,
                socials: {
                  ...prev.socials,
                  telegram: user.username || `@telegram_user`,
                },
              }));
              setNotification(`Telegram connected successfully!`);
              setTimeout(() => setNotification(null), 3000);
            }
          }
        );
      } else {
        console.error("Telegram Login is not available");
      }
    } else {
      try {
        const result = await signIn(provider, { redirect: false });
        if (result?.error) {
          console.error(`Failed to connect ${provider}:`, result.error);
        } else {
          // The session will be updated automatically, which will trigger the useEffect hook
          setNotification(
            `${
              provider.charAt(0).toUpperCase() + provider.slice(1)
            } connected successfully!`
          );
          setTimeout(() => setNotification(null), 3000);
        }
      } catch (error) {
        console.error(`Failed to connect ${provider}:`, error);
      }
    }
  };

  const isFormValid =
    isWalletConnected &&
    (socialConnections.twitter ||
      socialConnections.discord ||
      socialConnections.telegram) &&
    stxAdded;

  return (
    <motion.div
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-purple-600 mb-6">
        Create Campaign
      </h1>
      {notification && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{notification}</span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-md rounded-lg p-6"
      >
        {/* Project Name */}
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Enter your project name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        {/* Total Reward */}
        <div className="space-y-2">
          <Label htmlFor="reward">Total Reward (STX)</Label>
          <Input
            type="number"
            id="reward"
            name="reward"
            value={formData.reward}
            onChange={handleChange}
            placeholder="Enter the total rewards you intend to give out"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        {/* End Date */}
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            placeholder="Enter your campaign end date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        {/* Social Accounts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Social Accounts
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => connectSocial("twitter")}
              className="w-full md:w-auto min-w-[256px] flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-[#1DA1F2] hover:bg-[#1a8cd8]"
              disabled={socialConnections.twitter}
            >
              <Twitter className="w-5 h-5" />
              <span className="font-medium">
                {socialConnections.twitter
                  ? formData.socials.twitter
                  : "Connect Twitter"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => connectSocial("discord")}
              className="w-full md:w-auto min-w-[256px] flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-[#5865F2] hover:bg-[#4752c4]"
              disabled={socialConnections.discord}
            >
              <DiscordIcon className="w-5 h-5" />
              <span className="font-medium">
                {socialConnections.discord
                  ? formData.socials.discord
                  : "Connect Discord"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => connectSocial("telegram")}
              className="w-full md:w-auto min-w-[256px] flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-[#0088cc] hover:bg-[#0077b3]"
              disabled={socialConnections.telegram}
            >
              <TelegramIcon className="w-5 h-5" />
              <span className="font-medium">
                {socialConnections.telegram
                  ? formData.socials.telegram
                  : "Connect Telegram"}
              </span>
            </button>
          </div>
        </div>
        {/* Blockchain Account */}
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
        {/* Rewardable Actions */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Rewardable Actions
          </h3>
          <div className="space-y-2">
            {Object.entries(formData.rewardableActions).map(
              ([action, checked]) => (
                <div key={action} className="flex items-center">
                  <input
                    type="checkbox"
                    id={action}
                    name={action}
                    checked={checked}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={action}
                    className="ml-2 block text-sm text-gray-700 capitalize"
                  >
                    {action}
                  </label>
                </div>
              )
            )}
          </div>
        </div>
        {!isFormValid && (
          <p className="text-red-500 text-sm text-center">
            Please connect your wallet, add at least one social media account,
            and add STX to create a campaign.
          </p>
        )}
        {/* Create Campaign Button */}
        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-64 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </motion.div>
  );
}
