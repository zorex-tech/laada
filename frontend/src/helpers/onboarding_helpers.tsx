export const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-5)}`;
};
// export const connectSocial = async (platform: "twitter" | "discord" | "telegram") => {
//   try {
//     // Simulate OAuth connection
//     setSocialConnections((prev) => ({
//       ...prev,
//       [platform]: true,
//     }));

//     // Update social media handles after successful connection
//     setFormData((prev) => ({
//       ...prev,
//       social_media: {
//         ...prev.social_media,
//         [platform]: `@username_${platform}`, // This would come from OAuth
//       },
//     }));
//   } catch (error) {
//     console.error(`Failed to connect ${platform}:`, error);
//   }
// };
