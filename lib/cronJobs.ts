// utils/cleanupCron.ts
import cron from "node-cron";
import dbConnect from "../lib/dbConnect";
import UserModel from "@/model/User";

// Function to clean up expired unverified users
async function cleanupExpiredUsers() {
    try {
      await dbConnect();
      console.log('Database connected successfully for cleanup');
  
      const expiredUsers = await UserModel.find({
        isVerified: false,
        verifyCodeExpiry: { $lt: new Date() },
      });
      console.log('Expired users to delete:', expiredUsers);
  
      const result = await UserModel.deleteMany({
        isVerified: false,
        verifyCodeExpiry: { $lt: new Date() },
      });
      console.log(`Deleted ${result.deletedCount} users`);
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }
  

// Schedule cron job to run every day at midnight
export function startCleanupCron() {
  cron.schedule("0 0 * * *", () => {
    console.log("Running cleanup cron job...");
    cleanupExpiredUsers();
  });
}

// For testing purposes - run cleanup immediately
export function runCleanupNow() {
  cleanupExpiredUsers();
}
